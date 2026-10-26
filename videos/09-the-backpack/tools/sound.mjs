// Music bed + SFX from code for "the backpack" (overthinking). Writes assets/audio/mix.wav.
// Event timings mirror DROP / RELEASE in index.html. Pan: by where the sound happens on screen.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 14, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 71;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - pan) * 0.7071;
  R[i] += v * (1 + pan) * 0.7071;
};
const panX = (x) => clamp((540 + (x - 400) * 1.45 - 540) / 600, -0.7, 0.7);

// ---- bed: dark pad that gets heavier with every thought, opens up after the release ----
const DROP = [1.2, 2.4, 3.6, 4.8, 6.0], RELEASE = 8.2;
{
  let lp = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const load = DROP.filter((d) => t > d).length * (t < RELEASE + 0.4 ? 1 : 0);
    const open = smooth(t, RELEASE + 0.5, RELEASE + 1.5);
    const g = Math.min(1, t / 1.0) * (1 - 0.45 * smooth(t, 10.6, 11.6));
    let v = Math.sin(2 * Math.PI * 55 * t) * (0.025 + 0.008 * load) * (1 - open);
    for (const m of [45, 52, 57]) v += Math.sin(2 * Math.PI * hz(m - load * 0.4) * t) * 0.011 * (1 - open);
    for (const m of [48, 55, 60, 64, 67]) v += (Math.sin(2 * Math.PI * hz(m) * t) + 0.2 * Math.sin(4 * Math.PI * hz(m) * t)) * 0.011 * open;
    lp += (rnd() - lp) * 0.008;
    add(i, v * g + lp * 0.06, Math.sin(t * 0.25) * 0.2);
  }
}

// ---- helpers ----
function tone(t, f, dur, gain, pan, attack = 0.002, decay = 40) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * dur; i++) {
    const tt = i / SR;
    add(s0 + i, Math.sin(2 * Math.PI * f * tt) * Math.min(1, tt / attack) * Math.exp(-tt * decay) * gain, pan);
  }
}
function noise(t, dur, gain, pan, bright = 0.2, shape = (p) => Math.sin(Math.PI * p)) {
  const s0 = Math.floor(t * SR), n = Math.floor(SR * dur);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    lp += (rnd() - lp) * bright;
    add(s0 + i, lp * shape(i / n) * gain, pan);
  }
}
function sweep(t, dur, gain, pan, b0, b1) { // whoosh: noise whose brightness rises then falls
  const s0 = Math.floor(t * SR), n = Math.floor(SR * dur);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n;
    lp += (rnd() - lp) * (b0 + (b1 - b0) * Math.sin(Math.PI * p));
    add(s0 + i, lp * Math.sin(Math.PI * p) ** 1.5 * gain, pan);
  }
}
function thump(t, gain, f0 = 60, pan = 0) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.45; i++) {
    const tt = i / SR, f = f0 * (1 + Math.exp(-tt * 30));
    add(s0 + i, Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 9) * gain, pan);
  }
}
function wood(t, gain, pan) { // hollow plyo box knock
  for (const [f, d, a] of [[180, 20, 1], [390, 28, 0.6], [720, 42, 0.3]]) tone(t, f, 0.32, gain * a, pan, 0.001, d);
  noise(t, 0.02, gain * 0.7, pan, 0.6, (p) => 1 - p);
}
function buzz(t, gain) { // short low FAIL buzz
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.2; i++) {
    const tt = i / SR, ph = (110 * tt) % 1;
    add(s0 + i, (ph < 0.5 ? 1 : -1) * 0.5 * Math.min(1, tt / 0.005) * Math.min(1, (0.2 - tt) / 0.03) * gain, 0);
  }
}
const step = (t, gain, pan) => { tone(t, 150, 0.12, gain, pan, 0.001, 40); noise(t, 0.05, gain * 0.5, pan, 0.25, (p) => Math.exp(-p * 5)); };
const click = (t, gain, pan = 0) => { noise(t, 0.006, gain, pan, 0.9, (p) => 1 - p); tone(t + 0.004, 1800, 0.03, gain * 0.4, pan, 0.001, 120); };
function bell(t, m, gain, pan = 0, decay = 1.6) {
  const f = hz(m), s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 2.4; i++) {
    const tt = i / SR;
    add(s0 + i, (Math.sin(2 * Math.PI * f * tt) + 0.3 * Math.sin(2 * Math.PI * f * 2.01 * tt)) * Math.exp(-tt * decay) * gain, pan);
  }
}

// ---- steps: slower and heavier as he carries more ----
{
  const X0 = 150, X1 = 420, STRIDE = 64;
  const hipX = (t) => X0 + (X1 - X0) * (1 - Math.pow(1 - Math.min(1, t / 7.6), 1.7));
  let last = 0;
  for (let t = 0; t < 7.6; t += 0.005) {
    const p = (hipX(t) - X0) / STRIDE * 2; // two steps per stride
    if (Math.floor(p) > last) {
      last = Math.floor(p);
      const n = DROP.filter((d) => t > d).length;
      step(t, 0.06 + 0.012 * n, panX(hipX(t)));
      if (n > 2) noise(t, 0.06, 0.02 * n, panX(hipX(t)), 0.05, (q) => Math.exp(-q * 4));
    }
  }
}
// ---- each thought lands on his back ----
DROP.forEach((d, k) => {
  sweep(d - 0.05, 0.32, 0.06 + 0.02 * k, 0, 0.02, 0.12);
  thump(d + 0.33, 0.14 + 0.05 * k, 70 - 4 * k, -0.1);
  wood(d + 0.33, 0.06 + 0.02 * k, -0.1);
});
// ---- the release ----
sweep(RELEASE, 0.5, 0.15, -0.2, 0.02, 0.2);
for (let k = 0; k < 5; k++) { thump(RELEASE + 0.55 + 0.05 * k, 0.22, 52, -0.25); wood(RELEASE + 0.55 + 0.05 * k, 0.1, -0.25); }
noise(RELEASE + 0.55, 0.9, 0.12, -0.25, 0.04, (q) => Math.exp(-q * 3));
noise(RELEASE + 0.9, 1.4, 0.05, 0, 0.03); // long breath out
[72, 76, 79].forEach((m, i) => bell(RELEASE + 1.3 + i * 0.18, m, 0.045, 0));
// ---- punchline typing ----
for (let c = 0; c < 24; c++) noise(9.8 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 27; c++) noise(11.0 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));

// ---- light reverb ----
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
reverb(L, [43, 61, 79, 97], 0.6, 0.3);
reverb(R, [47, 67, 83, 101], 0.6, 0.3);

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
