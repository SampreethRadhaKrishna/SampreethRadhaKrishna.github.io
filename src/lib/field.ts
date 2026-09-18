// Point-field generators for the hero. The human brain is procedural; the robot brain
// (a circuit-board brain profile) is precomputed offline into public/data/robot_brain.json.

export type Cloud = { pos: Float32Array; bright: Float32Array };

// Deterministic PRNG so the field is identical on every load.
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Cheap layered sine "noise" for sulci. Not real simplex; it only has to look organic.
function sulci(x: number, y: number, z: number) {
  return (
    0.045 * Math.sin(7.3 * x + 2.1 * Math.sin(3.7 * y)) * Math.cos(5.1 * z + 1.3) +
    0.035 * Math.sin(11.0 * y + 1.7 * Math.cos(4.3 * x)) * Math.sin(6.2 * z) +
    0.02 * Math.sin(17.0 * z + 2.9 * y) * Math.cos(9.1 * x + 0.4)
  );
}

// A brain: two hemispheres on an ellipsoid, folded by sulci, with a cerebellum and stem.
export function humanBrain(n: number): Cloud {
  const rnd = mulberry32(1337);
  const pos = new Float32Array(n * 3);
  const bright = new Float32Array(n);
  const A = 1.05, B = 0.88, C = 1.3;
  for (let i = 0; i < n; i++) {
    const r = rnd();
    let x: number, y: number, z: number, b: number;
    if (r < 0.06) {
      const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1);
      const rr = 0.45 * Math.cbrt(rnd());
      x = 0.42 * rr * Math.sin(v) * Math.cos(u);
      y = -0.52 + 0.26 * rr * Math.sin(v) * Math.sin(u);
      z = -0.72 + 0.34 * rr * Math.cos(v);
      x += 0.02 * Math.sin(40 * y);
      b = 0.55;
    } else if (r < 0.085) {
      const t = rnd(), ang = rnd() * Math.PI * 2, rad = 0.13 * Math.sqrt(rnd());
      x = rad * Math.cos(ang);
      y = -0.55 - 0.7 * t;
      z = -0.35 + rad * Math.sin(ang) - 0.1 * t;
      b = 0.45;
    } else {
      const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1);
      const interior = rnd() < 0.22;
      let rad = interior ? 0.55 + 0.4 * Math.cbrt(rnd()) : 1;
      let sx = Math.sin(v) * Math.cos(u), sy = Math.cos(v), sz = Math.sin(v) * Math.sin(u);
      if (sy < -0.35) sy = -0.35 - (sy + 0.35) * 0.55;
      const s = sulci(sx * 2.0, sy * 2.0, sz * 2.0);
      rad *= 1 + (interior ? 0.5 : 1) * s;
      x = A * rad * sx;
      y = B * rad * sy + 0.05;
      z = C * rad * sz;
      const gap = 0.07 * Math.exp(-Math.pow(x / 0.12, 2));
      x += Math.sign(x || 1) * gap;
      if (z > 0.6) y -= 0.08 * (z - 0.6);
      b = interior ? 0.35 : 0.7 + 0.3 * Math.max(0, s * 8);
    }
    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
    bright[i] = Math.min(1, b);
  }
  return { pos, bright };
}

// Where a particle goes while it is "data": a wide, drifting cloud between the brains.
// Stored as (along, offsetY, offsetZ): `along` is the fraction of the way from the human
// brain to the robot brain, so the shader can rebuild the cloud between wherever the two
// brains currently sit. The lateral x-spread is folded into `along`.
export function streamCloud(n: number): Cloud {
  const rnd = mulberry32(777);
  const pos = new Float32Array(n * 3);
  const bright = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const along = rnd();
    const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1);
    const r = 0.35 + 1.5 * Math.pow(rnd(), 0.7) * Math.sin(along * Math.PI); // widest mid-way
    const ox = r * Math.sin(v) * Math.cos(u) / 3.1; // as a fraction of the brain-to-brain distance
    pos[i * 3] = along + ox;
    pos[i * 3 + 1] = r * Math.cos(v) * 0.8;
    pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u) * 0.7;
    bright[i] = 0.35 + 0.55 * rnd();
  }
  return { pos, bright };
}

export type RobotBrain = { n: number; traces: number; data: number[] };

// Expand the precomputed circuit brain into per-particle destinations.
// Each particle is assigned one slot; extra particles double up with a small jitter.
export function robotBrainSlots(rb: RobotBrain, n: number) {
  const rnd = mulberry32(4242);
  const pos = new Float32Array(n * 3);
  const bright = new Float32Array(n);
  const trace = new Float32Array(n);
  const t = new Float32Array(n);
  const m = rb.n;
  const scale = 1.18;
  for (let i = 0; i < n; i++) {
    const k = i < m ? i : Math.floor(rnd() * m);
    const o = k * 6;
    const j = i < m ? 0 : 0.006;
    pos[i * 3] = rb.data[o] * scale + (rnd() - 0.5) * j;
    pos[i * 3 + 1] = rb.data[o + 1] * scale + (rnd() - 0.5) * j;
    pos[i * 3 + 2] = rb.data[o + 2] * scale + (rnd() - 0.5) * 0.02;
    bright[i] = Math.min(1, rb.data[o + 3] * (i < m ? 1.15 : 0.95));
    trace[i] = rb.data[o + 4];
    t[i] = rb.data[o + 5];
  }
  return { pos, bright, trace, t };
}
