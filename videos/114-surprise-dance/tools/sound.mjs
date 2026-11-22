// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 20, N = SR * DUR;
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

// ---- "surprise dance": party chatter bed, lights-off thump + crowd "ooh", spotlight clunk; from T_MUS an upbeat 120 bpm dance track (kick, clap, hats, dhol-like low toms, pentatonic bell melody); surprise hit; crying sniffs; the guests cheer when they dance together; typing; FOLLOW: tile lights up, her step on the beat + bright chime ----
const T_DARK = 1.6, T_SPOT = 2.2, T_MUS = 2.4, T_IN = 2.5, T_AT = 3.4, T_SURP = 3.8, T_CRY = 6.4, T_PULL = 9.0, T_UP = 9.5, T_TOG = 9.9, T_END = 12.0, T_L2 = 12.6, T_L3 = 13.6, T_CTA = 15.6, T_TILE = 16.0, T_TAP = 17.4;
const BEAT = 0.5;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.05; const chat = t < T_DARK ? 1 : 0.25; add(i, lp * 0.06 * chat * Math.min(1, t / 0.4) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
thump(T_DARK, 0.1, 50, 0); noise(T_DARK + 0.1, 0.8, 0.03, 0, 0.2, (p) => Math.sin(Math.PI * p));
click(T_SPOT, 0.06, 0.3); thump(T_SPOT, 0.05, 90, 0.3);
const MUS_END = T_CTA + 0.6;
const MEL = [72, 74, 76, 79, 76, 74, 72, 69, 72, 76, 79, 81, 79, 76, 74, 72];
for (let b = 0; T_MUS + b * BEAT < MUS_END; b++) {
  const t = T_MUS + b * BEAT, g = t > T_PULL && t < T_TOG ? 0.5 : 1;
  thump(t, 0.07 * g, 55, 0);
  if (b % 2 === 1) noise(t, 0.08, 0.05 * g, 0, 0.7, (p) => Math.exp(-p * 7));
  noise(t + BEAT / 2, 0.03, 0.02 * g, 0.2, 0.95, (p) => Math.exp(-p * 9)); noise(t, 0.03, 0.015 * g, -0.2, 0.95, (p) => Math.exp(-p * 9));
  tone(t + BEAT * 0.75, 140, 0.15, 0.03 * g, -0.3, 0.002, 18); tone(t + BEAT * 0.25, 220, 0.1, 0.02 * g, 0.3, 0.002, 25);
  bell(t, MEL[b % 16], 0.012 * g, 0.1, 0.5); if (b % 2 === 0) bell(t + BEAT / 2, MEL[(b + 3) % 16] - 12, 0.008 * g, -0.1, 0.4);
}
sweep(T_SURP - 0.15, 0.4, 0.05, -0.2, 0.05, 0.5); thump(T_SURP, 0.06, 70, -0.2);
for (let k = 0; k < 3; k++) noise(T_CRY + 0.4 + k * 0.6, 0.18, 0.02, -0.3, 0.4, (p) => Math.sin(Math.PI * p));
noise(T_TOG, 3.0, 0.06, 0, 0.5, (p) => Math.min(1, p * 4) * (1 - p) * (0.6 + 0.4 * Math.sin(p * 60)));
for (let k = 0; k < 18; k++) click(T_TOG + 0.1 + k * 0.13 + 0.04 * Math.sin(k * 3), 0.02, (k % 5) / 5 - 0.4);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
typing(T_L2, 19, 26); typing(T_L3, 17, 26);
tone(T_TILE, 1320, 0.08, 0.015, 0, 0.002, 30);
thump(T_TAP, 0.06, 120, 0); click(T_TAP, 0.05, 0);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);

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
