// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 16, N = SR * DUR;
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

// ---- shared extras ----
// slow dark pad: chords = [[startTime, [midi...]], ...]; fades down under the punchline (quiet from tq)
function bed(chords, tq = 10.6, drone = 55) {
  let lp = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    let k = 0;
    for (let c = 0; c < chords.length; c++) if (t >= chords[c][0]) k = c;
    const t0 = chords[k][0];
    const g = Math.min(1, t / 1.0) * (1 - 0.45 * smooth(t, tq, tq + 1));
    let v = Math.sin(2 * Math.PI * drone * t) * 0.024;
    for (const m of chords[k][1]) v += (Math.sin(2 * Math.PI * hz(m) * t) + 0.2 * Math.sin(4 * Math.PI * hz(m) * t)) * 0.011 * Math.min(1, (t - t0) / 0.5 + (k ? 0 : 1));
    lp += (rnd() - lp) * 0.008;
    add(i, v * g + lp * 0.06, Math.sin(t * 0.25) * 0.2);
  }
}
// key clicks for a typed headline line
const typing = (t0, n, cps = 26) => { for (let c = 0; c < n; c++) noise(t0 + c / cps, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5)); };

// ---- "love is a fire": night wind, a crackling fire in each panel (louder as it grows, the bottom one dies), a wooden thunk for every stick, warm chord on "warm", two small rejections, low drop on "he stops asking", typing, end card ----
const TRIP = 1.75, TS0 = 0.4, TM0 = 0.75, TN = 3, B1 = 0.5, B2 = 4.25, B_P1 = 3.3, B_P2 = 7.05;
const T_MEET = 7.3, T_HOLD = 8.0, T_GIVE = 8.8, T_COLD = 10.4, T_CARD = 12.7;
const toss = [];
for (let k = 0; k < TN; k++) { toss.push([TS0 + k * TRIP + 1.45, -0.3]); toss.push([TM0 + k * TRIP + 1.45, -0.3]); }
const btoss = [B1 + 1.45, B2 + 1.45];
// wind
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.006; add(i, lp * 0.14 * (0.7 + 0.3 * Math.sin(t * 0.6)) * Math.min(1, t / 0.8) * (1 - smooth(t, DUR - 1.2, DUR)), Math.sin(t * 0.3) * 0.4); } }
// crackle: random pops whose density follows the fire strength
const strength = (arr, t, b) => { let I = b; for (const x of arr) I += 0.24 * smooth(t, x + 0.25, x + 0.75); return I; };
for (let t = 0.05; t < T_CARD + 0.5; t += 0.02) {
  const it = strength(toss.map((x) => x[0]), t, 0.45), ib = strength(btoss, t, 0.5) * (1 - 0.97 * smooth(t, T_GIVE, T_COLD + 0.3));
  if (rnd() < 0.18 * it) noise(t + rnd() * 0.02, 0.008 + rnd() * 0.01, 0.05 * Math.min(1.3, it), -0.35, 0.95, (p) => Math.exp(-p * 6));
  if (rnd() < 0.18 * ib) noise(t + rnd() * 0.02, 0.008 + rnd() * 0.01, 0.045 * ib, 0.35, 0.95, (p) => Math.exp(-p * 6));
}
// fire roar (low noise bed), top grows, bottom fades
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.04; const it = strength(toss.map((x) => x[0]), t, 0.45) * (1 - smooth(t, T_CARD, DUR)); const ib = strength(btoss, t, 0.5) * (1 - smooth(t, T_GIVE, T_COLD + 0.3)); add(i, lp * 0.05 * it, -0.35); add(i, lp * 0.05 * ib, 0.35); } }
// sticks: thunk + flare
toss.forEach(([t]) => { wood(t + 0.33, 0.06, -0.3); noise(t + 0.35, 0.3, 0.04, -0.3, 0.5, (p) => Math.exp(-p * 4)); });
btoss.forEach((t) => { wood(t + 0.33, 0.05, 0.3); noise(t + 0.35, 0.3, 0.035, 0.3, 0.5, (p) => Math.exp(-p * 4)); });
// footsteps on the trips
for (let k = 0; k < TN; k++) for (const [t0, pan] of [[TS0, -0.4], [TM0, -0.2]]) [0.12, 0.34, 0.97, 1.19].forEach((d) => step(t0 + k * TRIP + d, 0.025, pan));
// they meet; warm chord
sweep(T_MEET - 0.1, 0.5, 0.03, 0, 0.02, 0.15);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, 12.6, [57, 61, 64, 69], 0.012);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// pulled away: a small sour two-note sting each time
[B_P1, B_P2].forEach((t, i) => { tone(t, hz(64 - i), 0.5, 0.02, 0.35, 0.01, 4); tone(t + 0.12, hz(63 - i), 0.6, 0.02, 0.35, 0.01, 3.5); noise(t, 0.2, 0.02, 0.35, 0.3); });
// he stops asking: the stick drops, low drop; fire hisses out
wood(T_GIVE + 0.1, 0.05, 0.4);
thump(T_GIVE + 0.3, 0.12, 40, 0.3);
noise(T_COLD - 0.6, 1.2, 0.04, 0.35, 0.6, (p) => Math.sin(Math.PI * p) * (1 - p));
{ const s0 = Math.floor((T_GIVE + 0.8) * SR), n = Math.floor((T_CARD + 0.4 - T_GIVE - 0.8) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.05 * e, 0); } }
typing(10.9, 25, 30); typing(11.75, 19, 30);
// end card
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.7, 0.82, 0.94, 1.06, 1.2].forEach((d, i) => { thump(T_CARD + d, i === 4 ? 0.13 : 0.05, i === 4 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.6, 69, 0.02, 0, 1.2); bell(T_CARD + 1.66, 76, 0.015, 0, 1.2);

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
