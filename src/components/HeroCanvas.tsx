import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { humanBrain, streamCloud, robotBrainSlots, type RobotBrain } from '../lib/field';
import { asset, heroLabels } from '../content/site';

const PARTICLES = 30000;
const CYCLE_S = 11; // one particle's full life: human brain → data → robot brain → respawn

// Life-cycle segments (fractions of the cycle). Both brains stay populated because
// particle phases are spread evenly.
const SEG = { restHome: 0.3, disperse: 0.14, converge: 0.14 }; // remainder (0.42) rests in the robot brain

// The cursor black hole, in field units. Shared by the shader and the DOM disc drawn under it.
const HOLE_REACH = 0.5;     // R: reach of the well (kept tight)
const HOLE_HORIZON = 0.13;  // Rh: event horizon
const HOLE_RING = 1.2;      // photon ring radius, as a multiple of the horizon
const HOLE_DISC = 2.6;      // the DOM disc's diameter, as a multiple of the ring's (its gradient puts the ring at 1 / 2.6)
const HOLE_SPIN = 1.7;      // frame dragging: rad/s of rotation per unit of well depth
const HOLE_LANES = 8;       // the well's differential rotation is stepped into this many rate lanes
const DISK_RATE_STEP = 0.05; // rad/s: accretion-disk orbit rates are whole multiples of this, so their clock can wrap

// Backlights and labels, in field units relative to a brain's centre.
const GLOW_DIAMETER = 1.35 * 2.4;
const GLOW_DEST_BOOST = 1.1; // the ember glow behind the circuit brain is a touch larger
const LABEL_LIFT = 1.08;     // label baseline sits just above the top of a brain (both reach about y = 1.0)

const DEST_TILT = -0.28;     // resting yaw of the circuit board
const LOAD_EASE_MS = 1500;   // the stream and circuit brain ease in over this once the data arrives
const URL_BAR_PX = 120;      // height-only changes below this on touch devices are the URL bar, not a resize
const STILL_T = 23.7;        // reduced motion: a moment where both brains are formed and the stream is mid-air

const TAU = Math.PI * 2;
const glsl = (n: number) => n.toFixed(4);
const wrap = (v: number, period: number) => v - Math.floor(v / period) * period;
// Per-frame easing factor `k` (tuned at 60 Hz) made frame-rate independent.
const damp = (k: number, dt: number) => 1 - Math.pow(1 - k, dt * 60);

// Two layouts per breakpoint: `hero` (scrolled to top) and `page` (scrolled into content).
// `spread` in [0,1] blends between them; the stream keeps flowing throughout.
type Layout = { scale: number; home: [number, number]; dest: [number, number]; cam: number };
type Breakpoint = 'phone' | 'tablet' | 'desktop';
const HERO_LAYOUT: Record<Breakpoint, Layout> = {
  phone: { scale: 0.5, home: [0, 3.0], dest: [0, 1.0], cam: 7.6 },
  tablet: { scale: 0.84, home: [-1.45, 0.65], dest: [1.45, 0.6], cam: 6.6 },
  desktop: { scale: 1.08, home: [-1.5, 0.42], dest: [1.5, 0.38], cam: 6.2 },
};
const BRAIN_HALF_WIDTH = 1.55; // in unscaled field units, with margin

// The scrolled layout pushes the brains into the page margins. `halfW`/`halfH` are the visible
// extent of the z = 0 plane in world units, so it adapts to any aspect ratio.
function pageLayout(bp: Breakpoint, halfW: number, halfH: number, cam: number): Layout {
  const R = BRAIN_HALF_WIDTH;
  if (bp === 'phone') {
    const sc = 0.34;
    const x = (halfW - R * sc * 0.75) / sc, y = (halfH - R * sc) / sc;
    return { scale: sc, home: [-x, y], dest: [x, -y], cam };
  }
  const sc = bp === 'tablet'
    ? Math.min(0.62, Math.max(0.36, (halfH * 0.4) / R))
    : Math.min(0.8, Math.max(0.4, (halfH * 0.42) / R));
  const x = (halfW - R * sc) / sc, y = (halfH * 0.2) / sc;
  return { scale: sc, home: [-x, y], dest: [x, y], cam };
}

// Every clock reaches the shader already wrapped (the CPU keeps the running time in double
// precision), so nothing loses float32 precision however long the page stays open.
const vert = /* glsl */ `
  attribute vec3 aHome;
  attribute vec3 aMid;
  attribute vec3 aDest;
  attribute float aSeed;
  attribute float aBrightHome;
  attribute float aBrightDest;
  attribute float aTrace;  // >= 0: id of the path this point lies on (routed traces, the outlines, the chip, core edges); < 0: none
  attribute float aT;      // position along that path, 0..1
  attribute float aCore;   // 1 = part of the revolving core inside the chip

  uniform float uPhase;    // life-cycle clock: fract(t / cycle)
  uniform float uPulse;    // trace-pulse clock: fract(t * 0.22)
  uniform float uDrift;    // drift clock in seconds, wrapped at 40 pi (a whole period of every drift term below)
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uCamZ;
  uniform vec3 uHomeOffset;
  uniform vec3 uDestOffset;
  uniform float uHomeRot;
  uniform vec2 uSway;      // the board's sway: x = pitch, y = yaw (resting tilt included)
  uniform vec2 uCoreSpin;  // the chip core: x = spin about its own axis, y = slow turn about the board normal
  uniform vec3 uPointer;   // field-space pointer, z = 0
  uniform float uPointerOn;
  uniform float uHoleSpin; // well rotation clock: one lane step of angle, wrapped at 2 pi
  uniform float uDiskPhase; // disk orbit clock: one rate step of angle, wrapped at 2 pi
  uniform float uRestHome;
  uniform float uDisperse;
  uniform float uConverge;
  uniform float uLoaded;   // 0 until the circuit brain's data has arrived, then eased to 1
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
  vec2 rot2(vec2 v, float a) {
    float c = cos(a), s = sin(a);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
  }

  void main() {
    float phase = fract(uPhase + aSeed);
    float restEnd = uRestHome;
    float disperseEnd = restEnd + uDisperse;
    float convergeEnd = disperseEnd + uConverge;

    vec3 home = rotY(aHome, uHomeRot) + uHomeOffset;

    // While a particle rests in the circuit, pulses run along whatever path it lies on. That is
    // every id >= 0: the routed traces, but also the outline (a pulse circles it), the inner
    // outline, the chip and the core's edges.
    float pulse = 0.0;
    if (phase >= convergeEnd && aTrace >= 0.0) {
      float head = fract(uPulse + hash1(aTrace + 3.0));
      pulse = smoothstep(0.09, 0.0, abs(aT - head)) * 0.9;
      // a second, dimmer pulse behind the first
      float head2 = fract(head + 0.5);
      pulse += smoothstep(0.06, 0.0, abs(aT - head2)) * 0.35;
    }

    // The core spins about its own axis, that axis is tipped diagonally in the chip plane, and the
    // whole tilted assembly turns slowly about the axis perpendicular to the board. Everything else
    // is a fixed slot, with the pulse riding just above the copper.
    vec3 destLocal = aCore > 0.5
      ? uChip + rotZ(rotX(rotZ(rotY(aDest, uCoreSpin.x), -0.62), 0.35), uCoreSpin.y)
      : aDest + vec3(0.0, 0.0, pulse * 0.07);
    // the board sways so its layers read as depth
    vec3 dest = rotY(rotX(destLocal, uSway.x), uSway.y) + uDestOffset;

    // data cloud, rebuilt every frame between wherever the two brains are, then drifting
    float drift = uDrift * 0.5 + aSeed * 6.2831;
    vec3 span = uDestOffset - uHomeOffset;
    vec3 mid = uHomeOffset + span * aMid.x + vec3(0.0, aMid.y * uFan, aMid.z * (1.0 + 0.4 * (uFan - 1.0)));
    mid += vec3(sin(drift * 1.3 + aMid.y * 2.0), cos(drift * 0.9 + aMid.x * 6.0), sin(drift * 1.1 + aMid.z * 2.0)) * (0.18 + 0.12 * (uFan - 1.0));

    vec3 p;
    float bright;
    float alpha;
    float stage;
    if (phase < restEnd) {
      // resting in the human brain, breathing
      float k = phase / restEnd;
      p = home + vec3(sin(drift * 0.7), cos(drift * 0.6), sin(drift * 0.8)) * 0.006;
      bright = min(1.0, aBrightHome * 1.2);
      alpha = smoothstep(0.0, 0.08, k);
      // with no circuit brain to leave for, a particle fades out where it rests
      alpha *= mix(1.0 - smoothstep(0.9, 1.0, k), 1.0, uLoaded);
      stage = 0.0;
    } else if (phase < disperseEnd) {
      // dispersing: burst outward along an arc, growing brighter
      float k = ease((phase - restEnd) / uDisperse);
      p = mix(home, mid, k);
      p.y += sin(k * 3.14159) * 0.12 * (0.5 + aSeed);
      bright = mix(aBrightHome, 0.85, k);
      alpha = uLoaded;
      stage = k;
    } else if (phase < convergeEnd) {
      // converging onto the circuit brain
      float k = easeOut((phase - disperseEnd) / uConverge);
      p = mix(mid, dest, k);
      bright = mix(0.85, aBrightDest, k);
      alpha = uLoaded;
      stage = 1.0 + k;
    } else {
      // resting in the robot brain: pulses run along traces, chip flickers, then fade out
      float k = (phase - convergeEnd) / (1.0 - convergeEnd);
      p = dest;
      bright = min(1.3, aBrightDest * (aCore > 0.5 ? 1.25 : 1.15) + pulse);
      alpha = (1.0 - smoothstep(0.92, 1.0, k)) * uLoaded;
      stage = 2.0;
    }

    // The cursor is a black hole, drawn the way NASA's visualisations show one edge-on:
    // a thin bright band of disk crossing in front of the shadow, the far side of the disk
    // lensed into arcs over and under it, a photon ring at the shadow's edge, and the
    // approaching (left) side brighter than the receding one.
    if (uPointerOn > 0.01) {
      vec2 d = p.xy - uPointer.xy;
      float r = length(d);
      const float R = ${glsl(HOLE_REACH)};
      const float Rh = ${glsl(HOLE_HORIZON)};
      if (r < R) {
        float k = 1.0 - r / R;
        float g = k * k * uPointerOn; // depth in the well: 0 at its rim, 1 at the centre
        vec2 radial = r > 0.0001 ? d / r : vec2(1.0, 0.0);

        // Outer well: frame dragging and infall. A static twist that tightens with depth, plus
        // differential rotation. The rotation rate is not g itself: g changes continuously as the
        // pointer moves or the hole fades, and rate * time would turn every small change of g into
        // a jump of many radians once the clock is large. Instead g is dithered per particle into
        // a few lanes of fixed rate (the mean rate at any depth is still g * spin, and it is still
        // zero at the rim). A lane's angle is a whole multiple of one wrapped clock, so the wrap
        // is seamless, and a particle crossing between lanes is blended across rather than popped.
        float twist = g * 2.2;
        float lanePos = g * ${glsl(HOLE_LANES)} + hash1(aSeed * 53.9 + 5.3);
        float lane = floor(lanePos);
        float laneBlend = smoothstep(0.0, 0.25, lanePos - lane);
        vec2 dirBelow = rot2(radial, twist + max(lane - 1.0, 0.0) * uHoleSpin);
        vec2 dirLane = rot2(radial, twist + lane * uHoleSpin);
        vec2 dirMix = mix(dirBelow, dirLane, laneBlend);
        float dirLen = length(dirMix);
        vec2 dir = dirLen > 0.001 ? dirMix / dirLen : dirLane;

        float ring = Rh * ${glsl(HOLE_RING)} * uPointerOn;
        float rr = max(r * (1.0 - 0.62 * g), ring + (aSeed - 0.5) * 0.02 * uPointerOn);
        vec2 swirl = uPointer.xy + dir * rr;
        p.z = mix(p.z, 0.0, smoothstep(0.08, 0.5, g));

        // captured matter joins the disk
        // a sharp threshold: a soft blend would drag half-captured particles across the shadow
        float cap = smoothstep(0.30, 0.325, g);
        float h1 = hash1(aSeed * 91.7 + 3.1);
        float h2 = hash1(aSeed * 17.3 + 7.9);
        float rd = ring * (1.15 + 0.6 * h2 * h2);            // lane radius: a short disk, denser toward the hole
        // inner lanes orbit faster; the rate is rounded to a whole number of clock steps so the clock can wrap
        float orbitSteps = floor((1.9 / (0.6 + 2.0 * h2)) * ${glsl(1 / DISK_RATE_STEP)} + 0.5);
        float ph = atan(dir.y, dir.x) + orbitSteps * uDiskPhase;
        float sp = sin(ph), cp = cos(ph);
        vec2 q;
        float beam;
        if (h1 < 0.8) {
          if (sp < 0.0) {
            // near side: the bright line across the front of the hole
            q = vec2(cp * rd, sp * rd * 0.06);
          } else {
            // far side: bent up and over, or down and under, the shadow; meets the band at the sides
            float side = h1 < 0.4 ? 1.0 : -1.0;
            float ra = ring * (1.28 + 0.75 * h2);
            q = vec2(cp * mix(rd, ra, sp), side * sp * ra);
          }
          q = vec2(q.x * 0.9659 - q.y * 0.2588, q.x * 0.2588 + q.y * 0.9659); // the disk is tipped 15 degrees
          beam = 0.95 - 0.5 * cp; // Doppler beaming: the side coming toward you burns brighter
        } else {
          q = dir * ring * (1.0 + 0.1 * h2); // photon ring, with a little radial depth
          beam = 1.0;
        }
        p.xy = mix(swirl, uPointer.xy + q, cap);
        bright += cap * beam + (1.0 - cap) * g * 0.3;
      }
    }

    p *= uScale;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vBright = bright;
    vStage = stage;
    vAlpha = alpha;
    // depth shading is relative to the camera distance, so every breakpoint shades like the desktop (z = 6.2)
    vDepth = clamp((mv.z + uCamZ + 1.3) / 4.5, 0.0, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.6 + 2.4 * clamp(bright, 0.0, 1.0)) * uPixelRatio;
    bool inFlight = stage > 0.05 && stage < 1.95;
    if (inFlight) size *= 1.25; // data in flight reads a touch larger
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

// A DOM element that follows something in the scene. Glows and the hole disc keep a fixed CSS size
// (`base`, set on resize) and are sized with transform: scale, so their blurs are never
// re-rasterised; labels are anchored by their bottom centre. Styles are written only on change.
type Overlay = { el: HTMLElement | null; anchor: 'centre' | 'above'; base: number; x: number; y: number; s: number; o: number };
const overlay = (el: HTMLElement | null, anchor: Overlay['anchor']): Overlay => ({ el, anchor, base: 1, x: NaN, y: NaN, s: NaN, o: NaN });

function placeOverlay(ov: Overlay, x: number, y: number, sizePx: number, opacity: number) {
  if (!ov.el) return;
  const s = ov.anchor === 'centre' ? sizePx / ov.base : 1;
  if (!(Math.abs(x - ov.x) < 0.1 && Math.abs(y - ov.y) < 0.1 && Math.abs(s - ov.s) < 0.0005)) {
    ov.x = x; ov.y = y; ov.s = s;
    ov.el.style.transform = ov.anchor === 'centre'
      ? `translate(${(x - ov.base / 2).toFixed(2)}px, ${(y - ov.base / 2).toFixed(2)}px) scale(${s.toFixed(4)})`
      : `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
  }
  const o = opacity < 0.004 ? 0 : opacity > 0.996 ? 1 : opacity;
  if (o !== ov.o && !(Math.abs(o - ov.o) < 0.004 && o !== 0 && o !== 1)) {
    ov.o = o;
    ov.el.style.opacity = o.toFixed(3);
  }
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const glowHomeRef = useRef<HTMLDivElement>(null);
  const glowDestRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const labelHomeRef = useRef<HTMLSpanElement>(null);
  const labelDestRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // No WebGL (blocked, blocklisted GPU, out of contexts): the scene is decoration, so leave the
    // container empty and let the page work. The overlays stay unsized and transparent.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'default' });
    } catch (err) {
      console.warn('[HeroCanvas] WebGL is unavailable; the particle scene is switched off.', err);
      return;
    }
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0, HERO_LAYOUT.desktop.cam);
    const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360);

    // Layout in field space (before uScale): human brain left, robot brain right.
    const human = humanBrain(PARTICLES);
    const seed = new Float32Array(PARTICLES);
    for (let i = 0; i < PARTICLES; i++) seed[i] = Math.random();

    // The circuit brain's attributes stay empty until its data arrives; uLoaded keeps every
    // particle at home (and invisible past its rest there) until then.
    const geo = new THREE.BufferGeometry();
    const attrs = {
      position: new THREE.BufferAttribute(new Float32Array(PARTICLES * 3), 3), // unused by the shader; three takes the draw count from it
      aHome: new THREE.BufferAttribute(human.pos, 3),
      aMid: new THREE.BufferAttribute(streamCloud(PARTICLES), 3),
      aDest: new THREE.BufferAttribute(new Float32Array(PARTICLES * 3), 3),
      aSeed: new THREE.BufferAttribute(seed, 1),
      aBrightHome: new THREE.BufferAttribute(human.bright, 1),
      aBrightDest: new THREE.BufferAttribute(new Float32Array(PARTICLES), 1),
      aTrace: new THREE.BufferAttribute(new Float32Array(PARTICLES).fill(-1), 1),
      aT: new THREE.BufferAttribute(new Float32Array(PARTICLES), 1),
      aCore: new THREE.BufferAttribute(new Float32Array(PARTICLES), 1),
    };
    for (const [name, attr] of Object.entries(attrs)) geo.setAttribute(name, attr);
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    const uniforms = {
      uPhase: { value: 0 },
      uPulse: { value: 0 },
      uDrift: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uScale: { value: 1 },
      uCamZ: { value: camera.position.z },
      uHomeOffset: { value: new THREE.Vector3(-1.5, 0.42, 0) },
      uDestOffset: { value: new THREE.Vector3(1.5, 0.38, 0) },
      uHomeRot: { value: 0 },
      uSway: { value: new THREE.Vector2(0, DEST_TILT) },
      uCoreSpin: { value: new THREE.Vector2(0, 0) },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uPointerOn: { value: 0 },
      uHoleSpin: { value: 0 },
      uDiskPhase: { value: 0 },
      uRestHome: { value: SEG.restHome },
      uDisperse: { value: SEG.disperse },
      uConverge: { value: SEG.converge },
      uLoaded: { value: 0 },
      uFan: { value: 1 },
      uChip: { value: new THREE.Vector3(0, 0, 0) },
      uHuman: { value: new THREE.Color('#FFE3C8') },
      uData: { value: new THREE.Color('#FF7A1A') },
      uRobot: { value: new THREE.Color('#FF6E12') },
      uHot: { value: new THREE.Color('#FFF1E0') },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms,
    });
    scene.add(new THREE.Points(geo, mat));

    // All the scene's clocks, from one running time in seconds.
    const setClocks = (t: number) => {
      uniforms.uPhase.value = wrap(t / CYCLE_S, 1);
      uniforms.uPulse.value = wrap(t * 0.22, 1);
      uniforms.uDrift.value = wrap(t, 20 * TAU);
      uniforms.uHomeRot.value = reduced ? 0.4 : wrap(t * 0.16, TAU);
      uniforms.uSway.value.set(0.05 * Math.sin(t * 0.27), DEST_TILT + 0.07 * Math.sin(t * 0.19));
      uniforms.uCoreSpin.value.set(wrap(t * 0.42, TAU), wrap(t * 0.16, TAU));
      uniforms.uHoleSpin.value = wrap((t * HOLE_SPIN) / HOLE_LANES, TAU);
      uniforms.uDiskPhase.value = wrap(t * DISK_RATE_STEP, TAU);
    };

    const glowHome = overlay(glowHomeRef.current, 'centre');
    const glowDest = overlay(glowDestRef.current, 'centre');
    const hole = overlay(holeRef.current, 'centre');
    const labelHome = overlay(labelHomeRef.current, 'above');
    const labelDest = overlay(labelDestRef.current, 'above');

    let heroL = HERO_LAYOUT.desktop, pageL = HERO_LAYOUT.desktop;
    let spread = 0, targetSpread = 0;
    let viewW = 0, viewH = 0;     // the container's current size
    let layoutW = 0, layoutH = 0; // the size the layout was computed for (differs only while a URL bar is toggled)
    let contextLost = false;

    const applyLayout = () => {
      const mix = (a: number, b: number) => a + (b - a) * spread;
      uniforms.uScale.value = mix(heroL.scale, pageL.scale);
      uniforms.uHomeOffset.value.set(mix(heroL.home[0], pageL.home[0]), mix(heroL.home[1], pageL.home[1]), 0);
      uniforms.uDestOffset.value.set(mix(heroL.dest[0], pageL.dest[0]), mix(heroL.dest[1], pageL.dest[1]), 0);
      camera.position.z = mix(heroL.cam, pageL.cam);
      uniforms.uCamZ.value = camera.position.z;
      uniforms.uFan.value = 1 + 2.0 * spread; // the stream fans out to fill the viewport once scrolled
    };

    // Visible half-height of the z = 0 plane in world units, and CSS pixels per world unit there.
    const halfHeight = () => (tanHalfFov * camera.position.z) / camera.zoom;
    const pxPerUnit = () => viewH / (2 * halfHeight());

    // Pointer. Kept in client pixels and mapped onto the z = 0 plane every frame, so the hole stays
    // under a still cursor while the layout (uScale) changes with scroll.
    const pointer = { x: 0, y: 0, on: false };
    const holeWorld = new THREE.Vector2(); // smoothed position, world units
    let holeOn = 0;

    // keep the backlights, labels and the horizon on the brains and the cursor wherever they are
    const placeOverlays = () => {
      const fieldPx = pxPerUnit() * uniforms.uScale.value; // CSS pixels per field unit
      const cx = viewW / 2, cy = viewH / 2;
      const home = uniforms.uHomeOffset.value, dest = uniforms.uDestOffset.value;
      const loaded = uniforms.uLoaded.value;
      placeOverlay(glowHome, cx + home.x * fieldPx, cy - home.y * fieldPx, GLOW_DIAMETER * fieldPx, 1);
      placeOverlay(glowDest, cx + dest.x * fieldPx, cy - dest.y * fieldPx, GLOW_DIAMETER * GLOW_DEST_BOOST * fieldPx, loaded);
      // labels show only in the hero
      placeOverlay(labelHome, cx + home.x * fieldPx, cy - (home.y + LABEL_LIFT) * fieldPx, 0, 1 - spread);
      placeOverlay(labelDest, cx + dest.x * fieldPx, cy - (dest.y + LABEL_LIFT) * fieldPx, 0, (1 - spread) * loaded);
      // the horizon: a black disc with a lensing ring, tracking the (smoothed) pointer
      const worldPx = pxPerUnit();
      placeOverlay(hole, cx + holeWorld.x * worldPx, cy - holeWorld.y * worldPx, HOLE_HORIZON * HOLE_RING * 2 * HOLE_DISC * fieldPx, holeOn);
    };

    const draw = () => {
      if (contextLost || !viewW) return;
      renderer.render(scene, camera);
      placeOverlays();
    };

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (w === viewW && h === viewH && dpr === pixelRatio) return;
      if (dpr !== pixelRatio) {
        pixelRatio = dpr;
        renderer.setPixelRatio(dpr);
        uniforms.uPixelRatio.value = dpr;
      }
      viewW = w; viewH = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;

      // A mobile URL bar sliding in or out changes only the height, by a little. The drawing buffer
      // follows it (no stretch), but the layout does not: the zoom below holds pixels-per-unit
      // steady, so the brains keep their size. Orientation changes and real resizes re-lay out.
      const urlBarOnly = coarsePointer && w === layoutW && Math.abs(h - layoutH) < URL_BAR_PX;
      if (!urlBarOnly) {
        layoutW = w; layoutH = h;
        const bp: Breakpoint = w < 700 ? 'phone' : w < 1100 ? 'tablet' : 'desktop';
        heroL = HERO_LAYOUT[bp];
        const halfH = tanHalfFov * heroL.cam;
        pageL = pageLayout(bp, halfH * (w / h), halfH, heroL.cam);
      }
      camera.zoom = layoutH / h;
      camera.updateProjectionMatrix();
      applyLayout();

      // Overlays get their CSS size here only, at the largest scale they will reach.
      const basePx = (layoutH / (2 * tanHalfFov * heroL.cam)) * Math.max(heroL.scale, pageL.scale);
      const setBase = (ov: Overlay, fieldSize: number) => {
        if (!ov.el) return;
        ov.base = Math.max(1, Math.round(fieldSize * basePx));
        ov.el.style.width = ov.el.style.height = `${ov.base}px`;
        ov.x = ov.y = ov.s = NaN; // force the transform to be rewritten against the new base
      };
      setBase(glowHome, GLOW_DIAMETER);
      setBase(glowDest, GLOW_DIAMETER * GLOW_DEST_BOOST);
      setBase(hole, HOLE_HORIZON * HOLE_RING * 2 * HOLE_DISC);

      // setSize cleared the drawing buffer and this frame's rAF has already run: draw now, or the
      // browser presents an empty frame.
      draw();
    };

    // Scroll drives two things: where the brains sit (spread) and how fast the stream runs.
    let lastY = window.scrollY, lastScrollAt = performance.now(), velocity = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const elapsed = Math.max(16, now - lastScrollAt);
      velocity = Math.min(4, (Math.abs(y - lastY) / elapsed) * 4); // px/ms → boost
      lastY = y; lastScrollAt = now;
      targetSpread = Math.min(1, Math.max(0, (y - window.innerHeight * 0.15) / (window.innerHeight * 0.75)));
      start(); // under reduced motion the loop sleeps until something moves
    };

    let raf = 0;
    let clock = 0, lastNow = 0;
    let loadedAt = -1; // when the circuit brain's data arrived (performance.now), -1 until then

    // Advances the scene by dt seconds. Returns whether anything is still easing toward its target,
    // which is all that keeps the loop alive under reduced motion.
    const update = (dt: number, now: number) => {
      let easing = false;
      velocity *= Math.pow(0.92, dt * 60); // scroll energy decays
      clock += dt * (1 + velocity);
      setClocks(reduced ? STILL_T : clock);

      if (Math.abs(targetSpread - spread) > 0.0005) {
        spread += (targetSpread - spread) * damp(0.08, dt);
        applyLayout();
        easing = true;
      }

      if (loadedAt >= 0 && uniforms.uLoaded.value < 1) {
        const k = reduced ? 1 : Math.min(1, (now - loadedAt) / LOAD_EASE_MS);
        uniforms.uLoaded.value = k * k * (3 - 2 * k);
        easing = easing || k < 1;
      }

      // the hole: mouse and pen only, never under reduced motion
      const halfH = halfHeight();
      const targetX = viewW ? ((pointer.x / viewW) * 2 - 1) * halfH * camera.aspect : 0;
      const targetY = viewH ? -((pointer.y / viewH) * 2 - 1) * halfH : 0;
      if (holeOn < 0.02) holeWorld.set(targetX, targetY); // closed: open where the cursor is rather than sweeping in
      else holeWorld.set(holeWorld.x + (targetX - holeWorld.x) * damp(0.15, dt), holeWorld.y + (targetY - holeWorld.y) * damp(0.15, dt));
      holeOn += ((pointer.on ? 1 : 0) - holeOn) * damp(0.1, dt);
      if (!pointer.on && holeOn < 0.001) holeOn = 0;
      const scale = uniforms.uScale.value;
      uniforms.uPointer.value.set(holeWorld.x / scale, holeWorld.y / scale, 0);
      uniforms.uPointerOn.value = holeOn;
      return easing;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000)); // clamped: the clock never jumps after a stall
      lastNow = now;
      const easing = update(dt, now);
      draw();
      if (!reduced || easing) raf = requestAnimationFrame(tick);
    };
    function start() {
      if (raf || document.hidden || contextLost) return;
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    }
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // a finger scrolling the page is not a cursor
      pointer.x = e.clientX; pointer.y = e.clientY;
      pointer.on = true;
    };
    const closeHole = () => { pointer.on = false; };
    // Leaving the window: pointerleave on the root element covers Chrome and Firefox; a pointerout
    // with no relatedTarget covers engines that skip it. Both are harmless if they double up.
    const onOut = (e: PointerEvent) => { if (!e.relatedTarget) closeHole(); };
    const onVisibility = () => {
      if (document.hidden) { pointer.on = false; holeOn = 0; stop(); } else start();
    };
    const onContextLost = (e: Event) => { e.preventDefault(); contextLost = true; stop(); };
    const onContextRestored = () => { contextLost = false; draw(); start(); };

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerout', onOut, { passive: true });
      window.addEventListener('pointercancel', closeHole);
      window.addEventListener('blur', closeHole);
      document.documentElement.addEventListener('pointerleave', closeHole);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    setClocks(reduced ? STILL_T : 0);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    onScroll();
    start();

    // The circuit brain. Until it arrives (or if it never does) the scene is the human brain alone.
    let disposed = false;
    const abort = new AbortController();
    fetch(asset('/data/robot_brain.json'), { signal: abort.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<RobotBrain>;
      })
      .then((rb) => {
        if (disposed) return;
        const slots = robotBrainSlots(rb, PARTICLES);
        const fill = (attr: THREE.BufferAttribute, values: Float32Array) => { attr.set(values); attr.needsUpdate = true; };
        fill(attrs.aDest, slots.pos);
        fill(attrs.aBrightDest, slots.bright);
        fill(attrs.aTrace, slots.trace);
        fill(attrs.aT, slots.t);
        fill(attrs.aCore, slots.core);
        uniforms.uChip.value.set(slots.chip[0], slots.chip[1], 0.04);
        loadedAt = performance.now();
        start();
      })
      .catch((err: unknown) => {
        if (disposed || (err instanceof DOMException && err.name === 'AbortError')) return;
        console.warn('[HeroCanvas] Could not load the circuit brain; showing the human brain only.', err);
      });

    return () => {
      disposed = true;
      abort.abort();
      stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onOut);
      window.removeEventListener('pointercancel', closeHole);
      window.removeEventListener('blur', closeHole);
      document.documentElement.removeEventListener('pointerleave', closeHole);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.forceContextLoss(); // hand the GL context back now; StrictMode mounts twice in dev
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return (
    <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 [&>canvas]:relative [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" aria-hidden="true">
      {/* backlights: warm behind the human brain, ember behind the robot brain; sized on resize, moved by transform */}
      <div ref={glowHomeRef} className="absolute left-0 top-0 rounded-full bg-[radial-gradient(circle,rgba(255,200,150,0.16)_0%,rgba(255,122,26,0.07)_40%,transparent_70%)] blur-2xl will-change-transform" />
      <div ref={glowDestRef} className="absolute left-0 top-0 rounded-full bg-[radial-gradient(circle,rgba(255,122,26,0.24)_0%,rgba(217,82,14,0.09)_40%,transparent_70%)] blur-2xl will-change-transform" />
      <div ref={holeRef} className="absolute left-0 top-0 rounded-full opacity-0 will-change-transform bg-[radial-gradient(circle_closest-side,#000_0%,#000_34.5%,rgba(255,215,170,0.75)_37%,rgba(255,190,130,0.6)_40.5%,rgba(255,122,26,0.22)_46%,transparent_60%)]">
        {/* the edge-on disk's glow, brighter on the approaching side */}
        <div className="absolute left-[16%] top-[48.4%] h-[3.2%] w-[68%] -rotate-[15deg] rounded-full blur-[1.5px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,235,210,0.95)_16%,rgba(255,205,150,0.85)_40%,rgba(255,160,80,0.6)_64%,rgba(255,122,26,0.32)_86%,transparent_100%)]" />
      </div>
      {/* labels for the two brains, so the idea reads even before the eye finishes; they follow the brains and fade with scroll */}
      <span ref={labelHomeRef} style={{ opacity: 0 }} className="hud absolute left-0 top-0 z-[1] hidden whitespace-nowrap text-ash md:block">{heroLabels.human}</span>
      <span ref={labelDestRef} style={{ opacity: 0 }} className="hud absolute left-0 top-0 z-[1] hidden whitespace-nowrap text-ember-soft md:block">{heroLabels.robot}</span>
    </div>
  );
}
