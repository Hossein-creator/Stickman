// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 24, N = SR * DUR;
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

// ---- "the wall": low room tone + sad sparse piano; shouts = harsh low growl + pop; every brick = stone click + knock; knocks on the wall; whoosh + hit on every cut; push strain + big collapse (rumble, many brick thumps, dust hiss); silence after; FOLLOW: bricks clink into the sign, tap click, warm chord ----
const T_S1 = 0.6, T_H1 = 2.1, T_S2 = 3.0, T_S3 = 4.4, C1 = 6.0, T_K1 = 6.7, T_K2 = 7.05, T_LEAN = 7.6, C2 = 9.0, C3 = 11.0, T_LEAVE = 12.2, T_GONE = 13.4, C4 = 13.4, T_SORRY = 14.1, T_PUSH = 14.7, T_COL = 15.2, C5 = 15.7, T_KNEEL = 16.9, T_L2 = 18.0, T_L3 = 19.1, T_SIGN = 21.6, T_TAP = 22.6;
const GROUPS = [[T_S1, 0, 6], [T_S2, 7, 12], [T_S3, 13, 19]];
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
// sad piano, pauses for the collapse
const MEL = [64, 67, 71, 69, 67, 64, 62, 60, 59, 60, 64, 62];
for (let t = 0.2, i = 0; t < T_SIGN; i++) { if (t < T_COL - 0.2 || t > C5 + 0.6) { bell(t, MEL[i % MEL.length] - 12, 0.015, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.011, 0, 0.8); } t += 0.85 + (t > C5 ? 0.25 : 0); }
// shouts: low growl + bubble pop
[T_S1, T_S2, T_S3].forEach((t) => { tone(t, 700, 0.08, 0.025, 0.25, 0.002, 30); for (let k = 0; k < 5; k++) tone(t + 0.02 + k * 0.06, 150 + 30 * (k % 2), 0.09, 0.03, 0.3, 0.004, 25); noise(t, 0.35, 0.03, 0.3, 0.25, (p) => Math.sin(Math.PI * p)); });
tone(T_H1, 700, 0.08, 0.02, -0.3, 0.002, 30);
// bricks rising: one click + stone knock each
for (const [t0, a, b] of GROUPS) for (let r = a; r <= b; r++) { const t = t0 + 0.35 + (r - a) * 0.13; click(t, 0.05, 0); wood(t + 0.01, 0.04, 0); }
// knocks
[T_K1, T_K2].forEach((t) => { wood(t + 0.07, 0.09, -0.2); thump(t + 0.07, 0.05, 110, -0.2); });
// cut whooshes
[C1, C2, C3, C4, C5].forEach((c) => { sweep(c - 0.22, 0.35, 0.05, 0, 0.05, 0.45); thump(c, 0.05, 50, 0); });
// she walks away
for (let t = T_LEAVE + 0.1; t < T_GONE + 0.5; t += 0.45) step(t, 0.03, -0.4);
tone(T_SORRY, 700, 0.08, 0.02, 0.2, 0.002, 30);
// push strain + collapse
noise(T_PUSH, T_COL - T_PUSH, 0.03, 0.1, 0.1, (p) => p);
thump(T_COL, 0.16, 38, 0); noise(T_COL, 1.4, 0.12, 0, 0.35, (p) => Math.exp(-p * 3));
for (let k = 0; k < 26; k++) { const t = T_COL + 0.25 + k * 0.035 + rnd() * 0.04; wood(t, 0.05 + 0.03 * Math.abs(rnd()), (rnd() * 0.6)); }
noise(T_COL + 0.3, 2.0, 0.03, 0, 0.6, (p) => Math.sin(Math.PI * p) * (1 - p));
// kneel
thump(T_KNEEL + 0.6, 0.05, 90, 0.1);
typing(T_L2 - 0.6, 9, 26); typing(T_L2, 28, 26); typing(T_L3, 28, 26);
// FOLLOW: six bricks clink into the sign
for (let k = 0; k < 6; k++) { click(T_SIGN - 0.15 + k * 0.07, 0.05, 0); wood(T_SIGN - 0.13 + k * 0.07, 0.04, 0); }
tone(T_SIGN + 0.1, 880, 0.12, 0.03, 0, 0.002, 20); typing(T_SIGN + 0.3, 25, 30);
click(T_TAP, 0.09, 0); thump(T_TAP, 0.05, 90, 0);
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(T_TAP + 0.2 + d, m, 0.022, 0, 1.3));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.2, DUR, [60, 64, 67, 72], 0.01);

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
