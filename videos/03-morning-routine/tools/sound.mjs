// Music bed + SFX from code for "morning routine: winner vs loser". Writes assets/audio/mix.wav.
// Timings mirror index.html. Sound rules: REFERENCE-ANALYSIS.md. Pan: winner (top) a bit left, loser (bottom) a bit right.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 14, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 31;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - pan) * 0.7071;
  R[i] += v * (1 + pan) * 0.7071;
};
const WP = -0.3, LP = 0.3;

// ---- bed: soft low pad, warmer as the sun rises, drops at the punchline ----
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = Math.min(1, t / 0.8) * (1 - 0.6 * smooth(t, 11.2, 12.2));
  const warm = smooth(t, 2, 10);
  let v = 0;
  for (const [m, a] of [[40, 0.05], [47, 0.03], [52, 0.016]]) v += a * Math.sin(2 * Math.PI * hz(m) * t);
  for (const [m, a] of [[56, 0.012], [59, 0.01], [64, 0.008]]) v += a * warm * Math.sin(2 * Math.PI * hz(m) * t + m);
  add(i, v * g * (0.85 + 0.15 * Math.sin(t * 1.1)), 0);
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
function thump(t, gain, f0 = 60, pan = 0) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.4; i++) {
    const tt = i / SR, f = f0 * (1 + Math.exp(-tt * 30));
    add(s0 + i, Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 10) * gain, pan);
  }
}
function step(t, gain, pan, bright = 0.18) {
  noise(t, 0.09, gain, pan, bright, (p) => Math.exp(-p * 5));
  tone(t, 120, 0.1, gain * 0.5, pan, 0.001, 45);
}
function alarm(a, b, gain, pan) {
  for (let t = a; t < b; t += 0.25) for (let k = 0; k < 2; k++) {
    const s0 = Math.floor((t + k * 0.09) * SR);
    for (let i = 0; i < SR * 0.06; i++) {
      const tt = i / SR;
      add(s0 + i, (Math.sign(Math.sin(2 * Math.PI * 2300 * tt)) * 0.35 + Math.sin(2 * Math.PI * 2300 * tt) * 0.65) * gain, pan);
    }
  }
}
const click = (t, gain, pan) => { noise(t, 0.006, gain, pan, 0.9, (p) => 1 - p); tone(t + 0.004, 1800, 0.03, gain * 0.4, pan, 0.001, 120); };
const swish = (t, dur, gain, pan) => noise(t, dur, gain, pan, 0.08, (p) => Math.sin(Math.PI * p) ** 2);
function clink(t, gain, pan) { for (const [f, d] of [[3200, 30], [4700, 40], [6900, 55]]) tone(t, f, 0.4, gain / 2, pan, 0.001, d); }
function gulp(t, gain, pan) {
  const s0 = Math.floor(t * SR);
  let ph = 0;
  for (let i = 0; i < SR * 0.12; i++) {
    const tt = i / SR, f = 160 + 260 * (tt / 0.12);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, Math.sin(ph) * Math.sin((Math.PI * tt) / 0.12) * gain, pan);
  }
}
function chirp(t, gain, pan) {
  const s0 = Math.floor(t * SR);
  let ph = 0;
  for (let i = 0; i < SR * 0.09; i++) {
    const tt = i / SR, f = 3200 + 1500 * Math.sin((tt / 0.09) * Math.PI) + 400 * Math.sin(tt * 260);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, Math.sin(ph) * Math.sin((Math.PI * tt) / 0.09) * gain, pan);
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

// ---- 6:00 both alarms ----
alarm(0.0, 0.5, 0.07, 0);
click(0.5, 0.25, WP);
click(0.53, 0.25, LP);

// ---- WINNER ----
swish(0.85, 0.45, 0.22, WP); // blanket off
step(1.6, 0.35, WP);
swish(2.0, 0.3, 0.2, WP); // make bed
swish(2.4, 0.3, 0.2, WP);
landings(2.95, 0.34, 5).forEach((t) => step(t, 0.35, WP));
clink(4.88, 0.12, WP);
[5.12, 5.27, 5.42].forEach((t) => gulp(t, 0.12, WP));
clink(5.72, 0.1, WP);
thump(6.25, 0.25, 70, WP); // hands hit the floor
[6.62, 7.42].forEach((t) => noise(t, 0.25, 0.12, WP, 0.12, (p) => Math.exp(-p * 3))); // exhale on the way up
step(7.05, 0.2, WP);
swish(7.6, 0.35, 0.18, WP);
landings(8.0, 0.27, 7).forEach((t) => step(t, 0.33, WP));
click(9.55, 0.18, WP); // door latch
noise(9.6, 0.45, 0.05, WP, 0.05);
bell(9.75, 69, 0.05, WP); // sunlight
bell(10.1, 73, 0.04, WP);
bell(10.45, 76, 0.035, WP);
[9.8, 9.95, 10.4, 10.55, 11.0, 11.6, 11.75, 12.4, 13.0].forEach((t, i) => chirp(t, 0.045, -0.5 + (i % 3) * 0.2)); // birds outside

// ---- LOSER ----
for (let t = 1.65; t < 6.4; t += 0.42) if (!(t > 2.9 && t < 3.7) && !(t > 5.9 && t < 6.4)) click(t, 0.07, LP); // scrolling
alarm(3.0, 3.3, 0.06, LP);
click(3.32, 0.2, LP);
alarm(6.0, 6.3, 0.06, LP);
click(6.36, 0.2, LP);
for (const t0 of [6.9, 7.75]) {
  noise(t0, 0.55, 0.06, LP, 0.04); // snore in
  tone(t0 + 0.1, 85, 0.5, 0.04, LP, 0.1, 3);
}
alarm(8.6, 9.05, 0.11, LP); // LATE
thump(8.62, 0.35, 45, LP);
tone(8.62, hz(49), 1.2, 0.05, LP, 0.005, 2.5); // dissonant sting
tone(8.62, hz(50), 1.2, 0.05, LP, 0.005, 2.5);
swish(8.78, 0.35, 0.25, LP);
landings(9.25, 0.2, 8).forEach((t) => step(t, 0.42, LP, 0.25));
click(10.45, 0.2, LP);
thump(11.25, 0.4, 55, LP); // door slam
noise(11.25, 0.15, 0.35, LP, 0.5, (p) => Math.exp(-p * 6));

// ---- punchline ----
for (let c = 0; c < 15; c++) noise(11.4 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
bell(12.0, 52, 0.06, 0);

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
reverb(L, [37, 53, 71, 89], 0.55, 0.25);
reverb(R, [41, 57, 75, 93], 0.55, 0.25);

let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, g = Math.min(1, t / 0.02) * Math.min(1, (DUR - t) / 0.6);
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
