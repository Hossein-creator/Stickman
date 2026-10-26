// Music bed + SFX from code for "the lock". Writes assets/audio/mix.wav.
// Timings mirror the constants in index.html. Sound rules: REFERENCE-ANALYSIS.md.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 13, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 23;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - pan) * 0.7071;
  R[i] += v * (1 + pan) * 0.7071;
};

// ---- dark drone bed: low D + A, slow breathing; quieter at the punchline ----
const bedGain = (t) => (1 - 0.55 * smooth(t, 8.3, 9.3)) * Math.min(1, t / 1.2);
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = bedGain(t) * (0.85 + 0.15 * Math.sin(t * 1.3));
  let v = 0;
  for (const [m, a] of [[38, 0.05], [45, 0.035], [50, 0.02], [53, 0.012]]) {
    const f = hz(m);
    v += a * (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t + 0.5));
  }
  add(i, v * g, Math.sin(t * 0.4) * 0.2);
}

// ---- the sound "opens" when the door opens: high airy chord + soft wind ----
{
  let lp = 0;
  for (let i = Math.floor(3.9 * SR); i < N; i++) {
    const t = i / SR;
    const g = smooth(t, 3.9, 7.4) * (1 - 0.7 * smooth(t, 8.4, 9.6));
    let v = 0;
    for (const m of [62, 69, 74, 76]) v += Math.sin(2 * Math.PI * hz(m) * t) * 0.012 * (0.7 + 0.3 * Math.sin(t * 2 + m));
    lp += (rnd() - lp) * 0.03;
    add(i, (v + lp * 0.09) * g, Math.sin(t * 0.7) * 0.4);
  }
}

// ---- SFX helpers ----
function thump(t, gain, f0 = 60) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.4; i++) {
    const tt = i / SR, f = f0 * (1 + Math.exp(-tt * 30));
    add(s0 + i, Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 10) * gain);
  }
}
function step(t, gain, pan, bright = 0.18) {
  const s0 = Math.floor(t * SR);
  let lp = 0;
  for (let i = 0; i < SR * 0.1; i++) {
    const tt = i / SR;
    lp += (rnd() - lp) * bright;
    add(s0 + i, (lp + Math.sin(2 * Math.PI * 120 * tt) * 0.45) * Math.exp(-tt * 50) * gain, pan);
  }
}
function metal(t, gain, pan, freqs = [1180, 2730, 4150, 5600], decay = 18) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.6; i++) {
    const tt = i / SR;
    let v = i < SR * 0.004 ? rnd() * 0.6 : 0;
    freqs.forEach((f, k) => (v += Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * decay * (1 + k * 0.6)) / (k + 1)));
    add(s0 + i, v * gain, pan);
  }
}
function blip(t, gain, pan) {
  const s0 = Math.floor(t * SR);
  let ph = 0;
  for (let i = 0; i < SR * 0.12; i++) {
    const tt = i / SR, f = 520 + 700 * Math.min(1, tt / 0.05);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, Math.sin(ph) * Math.exp(-tt * 28) * gain, pan);
  }
}
function creak(a, b, gain, pan) {
  // stick-slip: a train of small resonant clicks whose rate wobbles
  let next = a;
  while (next < b) {
    const p = (next - a) / (b - a);
    const rate = 28 + 40 * Math.sin(p * Math.PI) + 12 * Math.sin(p * 23);
    const s0 = Math.floor(next * SR);
    const f = 700 + 260 * Math.sin(p * 9);
    const env = Math.sin(Math.PI * p);
    for (let i = 0; i < SR * 0.02; i++) {
      const tt = i / SR;
      add(s0 + i, (Math.sin(2 * Math.PI * f * tt) + 0.5 * Math.sin(2 * Math.PI * f * 2.3 * tt)) * Math.exp(-tt * 260) * gain * env, pan);
    }
    next += 1 / rate;
  }
}
function ticks(t0, n) {
  for (let c = 0; c < n; c++) {
    const s0 = Math.floor((t0 + c / 30) * SR);
    for (let i = 0; i < SR * 0.012; i++) add(s0 + i, rnd() * Math.exp((-i / SR) * 400) * 0.05, 0.1);
  }
}
function bell(t, m, gain, pan = 0) {
  const f = hz(m), s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 2.4; i++) {
    const tt = i / SR;
    add(s0 + i, (Math.sin(2 * Math.PI * f * tt) + 0.3 * Math.sin(2 * Math.PI * f * 2.01 * tt)) * Math.exp(-tt * 1.7) * gain, pan);
  }
}
const landings = (t0, md, n) => Array.from({ length: n }, (_, k) => t0 + k * md + 0.8 * md);

// ---- overthinker: anxious pacing steps (duller), "?" pops, bar rattle, sit ----
[...landings(0.3, 0.38, 4), ...landings(2.05, 0.38, 4)].forEach((t) => step(t, 0.32, -0.35, 0.1));
[1.15, 1.9, 2.7, 5.6, 5.85, 6.1].forEach((t, i) => blip(t, 0.09, -0.3 + (i % 2) * 0.15));
for (let t = 3.9; t < 5.05; t += 0.112) metal(t, 0.05 + 0.03 * Math.sin(t * 7), -0.4, [380, 910, 1650], 30);
thump(7.3, 0.3, 70);
step(7.32, 0.3, -0.35, 0.1);

// ---- doer: steps, lock, door ----
[...landings(1.0, 0.5, 2), ...landings(5.1, 0.38, 6)].forEach((t) => step(t, 0.45, 0.25));
for (let k = 0; k < 4; k++) metal(2.4 + k * 0.07, 0.035, 0.1, [3100, 5200, 7400], 40); // touching the lock
metal(2.75, 0.06, 0.1, [2400, 4300], 50); // pull
metal(2.95, 0.14, 0.1, [1900, 3600, 5100], 30); // shackle snaps open: it was never closed
metal(3.36, 0.2, 0.05, [1180, 2730, 4150, 5600], 14); // lock hits the floor
metal(3.52, 0.07, 0.0, [1180, 2730, 4150], 20); // small bounce
creak(3.9, 5.0, 0.07, 0.35); // cage door
thump(4.95, 0.12, 52); // door stops
bell(7.45, 74, 0.05, 0.3); // steps into the light
bell(7.9, 78, 0.035, 0.4);

// ---- punchline: quiet, typewriter, one low note at the end ----
ticks(8.6, 26);
ticks(10.0, 25);
bell(10.9, 50, 0.06, 0);

// ---- light reverb (feedback combs) ----
function reverb(buf, delays, fb, mix) {
  const out = new Float32Array(N);
  for (const dms of delays) {
    const d = Math.floor((dms / 1000) * SR);
    const line = new Float32Array(N);
    for (let i = 0; i < N; i++) line[i] = buf[i] + (i >= d ? line[i - d] * fb : 0);
    for (let i = 0; i < N; i++) out[i] += line[i] / delays.length;
  }
  for (let i = 0; i < N; i++) buf[i] = buf[i] * (1 - mix) + out[i] * mix;
}
reverb(L, [41, 59, 77, 95], 0.62, 0.33);
reverb(R, [45, 63, 81, 99], 0.62, 0.33);

// ---- fades, normalize, write 16-bit WAV ----
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, g = Math.min(1, t / 0.05) * Math.min(1, (DUR - t) / 0.6);
  L[i] *= g;
  R[i] *= g;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.89 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + N * 4, 4);
buf.write("WAVEfmt ", 8);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20);
buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32);
buf.writeUInt16LE(16, 34);
buf.write("data", 36);
buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(clamp(L[i] * norm, -1, 1) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(clamp(R[i] * norm, -1, 1) * 32767), 46 + i * 4);
}
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1"));
const out = path.join(here, "..", "assets", "audio", "mix.wav");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buf);
console.log("wrote", out, "peak", peak.toFixed(3));
