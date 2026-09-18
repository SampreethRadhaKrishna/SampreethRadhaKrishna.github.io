import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { humanBrain, streamCloud, robotBrainSlots, type RobotBrain } from '../lib/field';

export type Telemetry = { fps: number; particles: number; cycles: number; perSecond: number; disturbed: number };

type Props = {
  onTelemetry?: (t: Telemetry) => void;
  onReady?: () => void;
};

const N = 30000;
const CYCLE_S = 11; // one particle's full life: human brain → data → robot brain → respawn

// Life-cycle segments (fractions of the cycle). Both brains stay populated because
// particle phases are spread evenly.
const SEG = { restHome: 0.3, disperse: 0.14, converge: 0.14 }; // remainder (0.42) rests in the robot brain

const vert = /* glsl */ `
  attribute vec3 aHome;
  attribute vec3 aMid;
  attribute vec3 aDest;
  attribute float aSeed;
  attribute float aBrightHome;
  attribute float aBrightDest;
  attribute float aTrace;
  attribute float aT;
  attribute float aCore;   // 1 = part of the revolving core inside the chip

  uniform float uTime;
  uniform float uCycle;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform vec3 uHomeOffset;
  uniform vec3 uDestOffset;
  uniform float uHomeRot;
  uniform float uDestTilt;
  uniform vec3 uPointer;   // field-space pointer, z = 0
  uniform float uPointerOn;
  uniform float uRestHome;
  uniform float uDisperse;
  uniform float uConverge;
  uniform float uDim;
  uniform float uFan;      // vertical spread of the stream: 1 in the hero, wider once scrolled
  uniform vec3 uChip;      // chip centre in robot-brain space

  varying float vBright;
  varying float vStage;    // 0 = human, 1 = data, 2 = robot
  varying float vAlpha;
  varying float vDepth;

  float ease(float t) { return t * t * (3.0 - 2.0 * t); }
  float easeOut(float t) { return 1.0 - pow(1.0 - t, 3.0); }
  float hash1(float p) { return fract(sin(p * 127.1) * 43758.5453); }

  vec3 rotY(vec3 p, float a) {
    float c = cos(a), s = sin(a);
    return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
  }
  vec3 rotZ(vec3 p, float a) {
    float c = cos(a), s = sin(a);
    return vec3(p.x * c - p.y * s, p.x * s + p.y * c, p.z);
  }
  vec3 rotX(vec3 p, float a) {
    float c = cos(a), s = sin(a);
    return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
  }

  void main() {
    float phase = fract(uTime / uCycle + aSeed);
    float a = uRestHome, b = uRestHome + uDisperse, c = uRestHome + uDisperse + uConverge;

    vec3 home = rotY(aHome, uHomeRot) + uHomeOffset;
    // the core spins about the chip's vertical axis; everything else is a fixed slot
    // the core spins about its own axis, and that axis is tipped diagonally in the chip plane
    // ...and the whole tilted assembly turns slowly about the axis perpendicular to the board
    vec3 destLocal = aCore > 0.5 ? uChip + rotZ(rotX(rotZ(rotY(aDest, uTime * 0.42), -0.62), 0.35), uTime * 0.16) : aDest;
    vec3 dest = rotY(destLocal, uDestTilt) + uDestOffset;
    // data cloud, rebuilt every frame between wherever the two brains are, then drifting
    float w = uTime * 0.5 + aSeed * 6.2831;
    vec3 span = uDestOffset - uHomeOffset;
    vec3 mid = uHomeOffset + span * aMid.x + vec3(0.0, aMid.y * uFan, aMid.z * (1.0 + 0.4 * (uFan - 1.0)));
    mid += vec3(sin(w * 1.3 + aMid.y * 2.0), cos(w * 0.9 + aMid.x * 6.0), sin(w * 1.1 + aMid.z * 2.0)) * (0.18 + 0.12 * (uFan - 1.0));

    vec3 p;
    float bright;
    float alpha = 1.0;
    float stage;
    if (phase < a) {
      // resting in the human brain, breathing
      float k = phase / a;
      p = home + vec3(sin(w * 0.7), cos(w * 0.6), sin(w * 0.8)) * 0.006;
      bright = min(1.0, aBrightHome * 1.2);
      alpha = smoothstep(0.0, 0.08, k);
      stage = 0.0;
    } else if (phase < b) {
      // dispersing: burst outward along an arc, growing brighter
      float k = ease((phase - a) / uDisperse);
      p = mix(home, mid, k);
      p.y += sin(k * 3.14159) * 0.12 * (0.5 + aSeed);
      bright = mix(aBrightHome, 0.85, k);
      stage = k;
    } else if (phase < c) {
      // converging onto the circuit brain
      float k = easeOut((phase - b) / uConverge);
      p = mix(mid, dest, k);
      bright = mix(0.85, aBrightDest, k);
      stage = 1.0 + k;
    } else {
      // resting in the robot brain: pulses run along traces, chip flickers, then fade out
      float k = (phase - c) / (1.0 - c);
      p = dest;
      float pulse = 0.0;
      if (aTrace >= 0.0) {
        float head = fract(uTime * 0.22 + hash1(aTrace + 3.0));
        float dd = abs(aT - head);
        pulse = smoothstep(0.09, 0.0, dd) * 0.9;
        // a second, dimmer pulse behind the first
        float head2 = fract(head + 0.5);
        pulse += smoothstep(0.06, 0.0, abs(aT - head2)) * 0.35;
      }
      bright = min(1.3, aBrightDest * (aCore > 0.5 ? 1.25 : 1.15) + pulse);
      alpha = 1.0 - smoothstep(0.92, 1.0, k);
      stage = 2.0;
    }

    // pointer repulsion in field space
    if (uPointerOn > 0.5) {
      vec2 d = p.xy - uPointer.xy;
      float len = length(d);
      float R = 0.55;
      if (len < R) {
        float push = (R - len) / R;
        p.xy += normalize(d + vec2(0.0001)) * push * push * 0.35;
        bright += push * 0.4;
      }
    }

    p *= uScale;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vBright = bright;
    vStage = stage;
    float inFlight = (stage > 0.05 && stage < 1.95) ? 1.0 : 0.0;
    vAlpha = alpha * mix(mix(1.0, uDim, 0.5), uDim, inFlight);
    vDepth = clamp((mv.z + 7.5) / 4.5, 0.0, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.6 + 2.4 * clamp(bright, 0.0, 1.0)) * uPixelRatio;
    if (stage > 0.05 && stage < 1.95) size *= 1.25; // data in flight reads a touch larger
    gl_PointSize = size * (5.2 / -mv.z);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying float vBright;
  varying float vStage;
  varying float vAlpha;
  varying float vDepth;
  uniform vec3 uHuman;   // warm white
  uniform vec3 uData;    // ember
  uniform vec3 uRobot;   // deep ember
  uniform vec3 uHot;     // near-white amber for pads and pulses
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float disc = smoothstep(0.5, 0.1, d);
    vec3 base;
    if (vStage <= 1.0) base = mix(uHuman, uData, vStage);
    else base = mix(uData, uRobot, clamp(vStage - 1.0, 0.0, 1.0));
    float b = clamp(vBright, 0.0, 1.25);
    vec3 col = mix(base * 0.7, base, min(b, 1.0));
    col = mix(col, uHot, clamp((b - 0.75) * 2.2, 0.0, 1.0));
    float a = disc * vAlpha * (0.45 + 0.55 * min(b, 1.0)) * (0.6 + 0.4 * vDepth);
    gl_FragColor = vec4(col * a, a);
  }
`;

export default function HeroCanvas({ onTelemetry, onReady }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cbRef = useRef({ onTelemetry, onReady });
  cbRef.current = { onTelemetry, onReady };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0, 6.2);

    // Layout in field space (before uScale): human brain left, robot brain right.
    const human = humanBrain(N);
    const stream = streamCloud(N);

    const geo = new THREE.BufferGeometry();
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) seed[i] = Math.random();
    const destPos = new Float32Array(N * 3), destB = new Float32Array(N), trace = new Float32Array(N).fill(-1), tt = new Float32Array(N);
    // until the robot brain loads, destinations sit on the human brain (particles fade in place)
    destPos.set(human.pos); destB.set(human.bright);
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('aHome', new THREE.BufferAttribute(human.pos, 3));
    geo.setAttribute('aMid', new THREE.BufferAttribute(stream.pos, 3));
    geo.setAttribute('aDest', new THREE.BufferAttribute(destPos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.setAttribute('aBrightHome', new THREE.BufferAttribute(human.bright, 1));
    geo.setAttribute('aBrightDest', new THREE.BufferAttribute(destB, 1));
    geo.setAttribute('aTrace', new THREE.BufferAttribute(trace, 1));
    geo.setAttribute('aT', new THREE.BufferAttribute(tt, 1));
    geo.setAttribute('aCore', new THREE.BufferAttribute(new Float32Array(N), 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uCycle: { value: CYCLE_S },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uScale: { value: 1 },
        uHomeOffset: { value: new THREE.Vector3(-1.5, 0.42, 0) },
        uDestOffset: { value: new THREE.Vector3(1.5, 0.38, 0) },
        uHomeRot: { value: 0 },
        uDestTilt: { value: -0.28 },
        uPointer: { value: new THREE.Vector3(0, 0, 0) },
        uPointerOn: { value: 0 },
        uRestHome: { value: SEG.restHome },
        uDisperse: { value: SEG.disperse },
        uConverge: { value: SEG.converge },
        uDim: { value: 1 },
        uFan: { value: 1 },
        uChip: { value: new THREE.Vector3(0, 0, 0) },
        uHuman: { value: new THREE.Color('#FFE3C8') },
        uData: { value: new THREE.Color('#FF7A1A') },
        uRobot: { value: new THREE.Color('#FF6E12') },
        uHot: { value: new THREE.Color('#FFF1E0') },
      },
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let robotLoaded = false;
    fetch('/data/robot_brain.json')
      .then((r) => r.json())
      .then((rb: RobotBrain) => {
        const slots = robotBrainSlots(rb, N);
        (geo.getAttribute('aDest') as THREE.BufferAttribute).set(slots.pos).needsUpdate = true;
        (geo.getAttribute('aBrightDest') as THREE.BufferAttribute).set(slots.bright).needsUpdate = true;
        (geo.getAttribute('aTrace') as THREE.BufferAttribute).set(slots.trace).needsUpdate = true;
        (geo.getAttribute('aT') as THREE.BufferAttribute).set(slots.t).needsUpdate = true;
        (geo.getAttribute('aCore') as THREE.BufferAttribute).set(slots.core).needsUpdate = true;
        (mat.uniforms.uChip.value as THREE.Vector3).set(slots.chip[0], slots.chip[1], 0.04);
        robotLoaded = true;
      })
      .catch(() => {});

    // Pointer: convert to field space on the z = 0 plane.
    const pointer = { x: 0, y: 0, on: false };
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3();
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        pointer.x = hit.x / mat.uniforms.uScale.value;
        pointer.y = hit.y / mat.uniforms.uScale.value;
        pointer.on = true;
      }
    };
    const onLeave = () => { pointer.on = false; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    // Two layouts per breakpoint: `hero` (scrolled to top) and `page` (scrolled into content).
    // `spread` in [0,1] blends between them; the stream keeps flowing throughout.
    type Layout = { scale: number; home: [number, number]; dest: [number, number]; cam: number };
    let heroL: Layout, pageL: Layout;
    let spread = 0;
    const applyLayout = () => {
      const k = spread;
      const lerp = (a: number, b: number) => a + (b - a) * k;
      mat.uniforms.uScale.value = lerp(heroL.scale, pageL.scale);
      mat.uniforms.uHomeOffset.value.set(lerp(heroL.home[0], pageL.home[0]), lerp(heroL.home[1], pageL.home[1]), 0);
      mat.uniforms.uDestOffset.value.set(lerp(heroL.dest[0], pageL.dest[0]), lerp(heroL.dest[1], pageL.dest[1]), 0);
      camera.position.z = lerp(heroL.cam, pageL.cam);
      mat.uniforms.uDim.value = 1; // full brightness everywhere on the page, by the owner's call
      mat.uniforms.uFan.value = 1 + 2.0 * k; // the stream fans out to fill the viewport once scrolled
    };
    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Visible extent of the z = 0 plane in field units, so the page layout adapts to any aspect ratio.
      const hh = Math.tan((camera.fov * Math.PI) / 360) * (w < 700 ? 7.6 : w < 1100 ? 6.6 : 6.2);
      const hw = hh * camera.aspect;
      const R = 1.55; // brain half-width in unscaled field units, with margin
      if (w < 700) {
        heroL = { scale: 0.5, home: [0, 3.0], dest: [0, 1.0], cam: 7.6 };
        const sc = 0.34;
        pageL = { scale: sc, home: [-(hw - R * sc * 0.75) / sc, (hh - R * sc * 1.0) / sc], dest: [(hw - R * sc * 0.75) / sc, -(hh - R * sc * 1.0) / sc], cam: 7.6 };
      } else if (w < 1100) {
        heroL = { scale: 0.84, home: [-1.45, 0.65], dest: [1.45, 0.6], cam: 6.6 };
        const sc = Math.min(0.62, Math.max(0.36, (hh * 0.4) / R));
        pageL = { scale: sc, home: [-(hw - R * sc * 1.0) / sc, (hh * 0.2) / sc], dest: [(hw - R * sc * 1.0) / sc, (hh * 0.2) / sc], cam: 6.6 };
      } else {
        heroL = { scale: 1.08, home: [-1.5, 0.42], dest: [1.5, 0.38], cam: 6.2 };
        const sc = Math.min(0.8, Math.max(0.4, (hh * 0.42) / R));
        pageL = { scale: sc, home: [-(hw - R * sc * 1.0) / sc, (hh * 0.2) / sc], dest: [(hw - R * sc * 1.0) / sc, (hh * 0.2) / sc], cam: 6.2 };
      }
      applyLayout();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Scroll drives two things: where the brains sit (spread) and how fast the stream runs.
    let targetSpread = 0, lastY = window.scrollY, lastScrollAt = performance.now(), velocity = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(16, now - lastScrollAt);
      velocity = Math.min(4, Math.abs(y - lastY) / dt * 4); // px/ms → boost
      lastY = y; lastScrollAt = now;
      targetSpread = Math.min(1, Math.max(0, (y - window.innerHeight * 0.15) / (window.innerHeight * 0.75)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let raf = 0;
    let frames = 0, fpsAt = performance.now(), fps = 60, lastTele = 0, ready = false;
    const t0 = performance.now();
    const still = 23.7; // a frame where both brains are formed and the stream is mid-air
    const px = new THREE.Vector3();
    let clock = 0, lastNow = t0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      velocity *= 0.92; // scroll energy decays
      clock += dt * (1 + velocity);
      const t = reduced ? still : clock;
      mat.uniforms.uTime.value = t;
      if (Math.abs(targetSpread - spread) > 0.0005) {
        spread += (targetSpread - spread) * 0.08;
        applyLayout();
      }
      mat.uniforms.uHomeRot.value = reduced ? 0.4 : t * 0.16;
      px.set(pointer.x, pointer.y, 0);
      (mat.uniforms.uPointer.value as THREE.Vector3).lerp(px, 0.15);
      mat.uniforms.uPointerOn.value += ((pointer.on && !reduced ? 1 : 0) - mat.uniforms.uPointerOn.value) * 0.1;

      renderer.render(scene, camera);

      frames++;
      if (now - fpsAt > 500) { fps = Math.round((frames * 1000) / (now - fpsAt)); frames = 0; fpsAt = now; }
      if (!ready && robotLoaded && now - t0 > 80) { ready = true; cbRef.current.onReady?.(); }
      if (now - lastTele > 200) {
        lastTele = now;
        const p = mat.uniforms.uPointerOn.value as number;
        cbRef.current.onTelemetry?.({
          fps,
          particles: N,
          cycles: Math.floor(t / CYCLE_S),
          perSecond: Math.round((N / CYCLE_S) * (1 + velocity)),
          disturbed: Math.round(p * 1400),
        });
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" aria-hidden="true" />;
}
