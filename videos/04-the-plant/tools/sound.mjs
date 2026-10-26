// Music bed + SFX from code for "the plant" (relationship test). Writes assets/audio/mix.wav.
// Timings mirror index.html. Pan: present couple (top) a bit left, distracted couple (bottom) a bit right.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 14, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 41;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - pan) * 0.7071;
  R[i] += v * (1 + pan) * 0.7071;
};
const TP = -0.3, BP = 0.3;

// ---- bed: soft, bittersweet pad (A minor -> F -> C -> G), quiet at the punchline ----
const chords = [[45, 57, 60, 64], [41, 53, 57, 60], [48, 55, 60, 64], [43, 55, 59, 62]];
const CH = 10 / 4;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const c = Math.min(3, Math.floor(t / CH));
  const g = Math.min(1, t / 1.0) * (1 - 0.55 * smooth(t, 10.0, 11.0));
  let v = 0;
  for (const m of chords[c]) {
    const f = hz(m);
    const local = t - c * CH;
    const env = Math.min(1, local / 0.6);
    v += (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t)) * 0.014 * env;
  }
  add(i, v * g * (0.9 + 0.1 * Math.sin(t * 1.4)), 0);
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
const click = (t, gain, pan) => { noise(t, 0.006, gain, pan, 0.9, (p) => 1 - p); tone(t + 0.004, 1800, 0.03, gain * 0.4, pan, 0.001, 120); };
function clink(t, gain, pan) { for (const [f, d] of [[3200, 30], [4700, 40], [6900, 55]]) tone(t, f, 0.4, gain / 2, pan, 0.001, d); }
function pop(t, gain, pan) {
  const s0 = Math.floor(t * SR);
  let ph = 0;
  for (let i = 0; i < SR * 0.1; i++) {
    const tt = i / SR, f = 500 + 900 * Math.min(1, tt / 0.04);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, Math.sin(ph) * Math.exp(-tt * 30) * gain, pan);
  }
}
function bell(t, m, gain, pan = 0, decay = 1.7) {
  const f = hz(m), s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 2.4; i++) {
    const tt = i / SR;
    add(s0 + i, (Math.sin(2 * Math.PI * f * tt) + 0.3 * Math.sin(2 * Math.PI * f * 2.01 * tt)) * Math.exp(-tt * decay) * gain, pan);
  }
}
function ping(t, gain, pan) { tone(t, 1568, 0.25, gain, pan, 0.002, 18); tone(t + 0.08, 2093, 0.25, gain * 0.8, pan, 0.002, 18); }

// ---- PRESENT (top) ----
pop(0.3, 0.08, TP); // talk bubble
pop(1.0, 0.08, TP);
for (let k = 0; k < 6; k++) tone(1.85 + k * 0.11, 880 + (k % 2) * 220, 0.08, 0.03, TP, 0.002, 40); // light giggle notes
clink(3.05, 0.1, TP); // picks up the glass
noise(3.5, 0.75, 0.09, TP, 0.35, (p) => Math.sin(Math.PI * p) * (0.7 + 0.3 * Math.sin(p * 90))); // pouring water
clink(4.58, 0.08, TP);
thump(5.4, 0.18, 55, TP); // heartbeat when the hands meet
thump(5.62, 0.14, 55, TP);
bell(5.7, 76, 0.05, TP); // bloom
bell(5.95, 81, 0.04, TP);
[6.8, 7.35, 7.9, 8.45, 9.0].forEach((t, i) => tone(t, hz(84 + (i % 3) * 2), 0.5, 0.022, TP, 0.01, 6)); // floating hearts

// ---- DISTRACTED (bottom) ----
for (let t = 1.1; t < 10; t += 0.45) if (!(t > 5.2 && t < 6.2)) click(t, 0.06, BP); // scrolling taps
[1.8, 4.3, 7.1].forEach((t) => ping(t, 0.035, BP)); // notifications
{ // slow sad bend of the plant
  const s0 = Math.floor(4.0 * SR), n = Math.floor(4.5 * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n, f = hz(64) * Math.pow(2, (-5 * p) / 12);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, Math.sin(ph) * Math.sin(Math.PI * p) * 0.018, BP);
  }
}
thump(8.95, 0.22, 80, BP); // heart drops on the table
tone(8.95, 420, 0.25, 0.04, BP, 0.002, 25);

// ---- punchline ----
for (let c = 0; c < 17; c++) noise(10.2 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 30; c++) noise(11.3 + c / 30, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
bell(12.4, 45, 0.07, 0, 1.2);

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
reverb(L, [37, 53, 71, 89], 0.58, 0.3);
reverb(R, [41, 57, 75, 93], 0.58, 0.3);

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
