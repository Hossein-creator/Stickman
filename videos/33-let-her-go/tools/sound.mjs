// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
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

// ---- "let her go": steps, rope creak and jolt on each tug, a "hey" chirp wave, a sulky thud, a yawn, knot fiddling, the rope falls in slow motion, heartbeat, sprint, a warm clasp and bells, walking together ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[7.25, 8.25]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_GO = 0.15, T_STOP = 1.15, T_TUG = [1.5, 1.8];
const T_STR = 2.3, T_WAVE = 3.05, T_CHECK = 3.8;
const T_SIT = 4.35, T_PEEK = 5.0, T_YAWN = 5.0;
const T_UNTIE = 6.1, T_OFFER = 6.85, T_DROP = 7.3, T_STAND = 8.2, T_LETGO = 8.6, T_RUN = 8.8, T_HOLD = 9.35, T_WALK = 9.75, T_END = 11.2;
const rH = realOf(T_HOLD);

// tense, teasing bed; it empties when the rope falls; warm major after the hand-hold
bed([[0, [45, 52, 55]], [realOf(2.2), [43, 50, 53]], [realOf(4.3), [41, 48, 52]], [realOf(6.0), [45, 52]], [realOf(T_DROP), [40, 47]], [rH, [48, 55, 59, 64]], [realOf(10.6), [53, 57, 60, 65]]], 10.7, 45);
// she walks off
for (let k = 0; k < 6; k++) step(realOf(T_GO + 0.1 + k * 0.17), 0.05, 0.1 + k * 0.08);
// tugs: creak + jolt
T_TUG.forEach((t0) => { const t = realOf(t0); noise(t - 0.06, 0.12, 0.05, 0, 0.12, (p) => Math.sin(Math.PI * p)); tone(t - 0.05, 240, 0.12, 0.02, 0, 0.01, 18); thump(t, 0.12, 70, -0.2); });
// the stranger walks in, a "hey!" chirp as she waves
for (let k = 0; k < 5; k++) step(realOf(T_STR + 0.1 + k * 0.15), 0.035, 0.6);
const chirp = (t, m0, m1, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(0.14 * SR); for (let i = 0; i < n; i++) { const p = i / n, f = hz(lerp(m0, m1, p)); add(s0 + i, Math.sin(2 * Math.PI * f * i / SR) * Math.sin(Math.PI * p) * 0.03, pan); } };
chirp(realOf(T_WAVE + 0.05), 76, 81, 0.3); chirp(realOf(T_WAVE + 0.25), 79, 84, 0.3); chirp(realOf(T_WAVE + 0.45), 70, 74, 0.6);
// she sits down in a huff
thump(realOf(T_SIT + 0.3), 0.12, 60, 0.3); noise(realOf(T_SIT + 0.3), 0.15, 0.04, 0.3, 0.2, (p) => 1 - p);
// his yawn: a slow sliding tone
{ const t0 = realOf(T_YAWN), n = Math.floor(0.7 * SR), s0 = Math.floor(t0 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n; ph += lerp(260, 150, p) / SR; add(s0 + i, Math.sin(2 * Math.PI * ph) * Math.sin(Math.PI * p) * 0.025, -0.3); } }
// untie: little rope clicks
for (let k = 0; k < 8; k++) click(realOf(T_UNTIE + 0.15 + k * 0.07), 0.025, -0.3);
// he offers it... opens his hand: silence, then the rope hits the floor (slow)
noise(realOf(T_DROP), realOf(T_DROP + 0.55) - realOf(T_DROP), 0.04, -0.2, 0.05, (p) => p);
thump(realOf(T_DROP + 0.55), 0.3, 40, -0.2); noise(realOf(T_DROP + 0.55), 0.3, 0.06, -0.2, 0.2, (p) => Math.exp(-p * 5));
tone(realOf(T_DROP + 0.55), hz(33), 1.6, 0.04, 0, 0.03, 1.4);
[realOf(7.9), realOf(8.1)].forEach((t) => { thump(t, 0.1, 48, 0); thump(t + 0.16, 0.07, 44, 0); });
// she stands, drops her end, sprints back
click(realOf(T_LETGO + 0.25), 0.04, 0.4); thump(realOf(T_LETGO + 0.25), 0.06, 60, 0.4);
sweep(realOf(T_RUN) - 0.05, 0.45, 0.06, 0.2, 0.03, 0.3);
for (let k = 0; k < 4; k++) step(realOf(T_RUN + 0.08 + k * 0.13), 0.05, 0.4 - k * 0.12);
// the hand-hold: soft clap + chord bells
noise(rH, 0.03, 0.08, 0, 0.6, (p) => 1 - p); thump(rH, 0.1, 80, 0);
[[0, 72], [0.06, 76], [0.12, 79], [0.2, 84]].forEach(([d, m]) => bell(rH + d, m, 0.025, 0, 1.4));
// walking together
for (let k = 0; k < 7; k++) { step(realOf(T_WALK + 0.1 + k * 0.2), 0.035, -0.1 + k * 0.05); step(realOf(T_WALK + 0.2 + k * 0.2), 0.03, 0.1 + k * 0.05); }
// last lines
[10.9, 11.04, 11.18, 11.34].forEach((t, i) => thump(t, i === 3 ? 0.09 : 0.05, i === 3 ? 52 : 70, 0));
[11.95, 12.08, 12.2, 12.34, 12.56].forEach((t, i) => { thump(t, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.56, 76, 0.02, 0, 1.2); bell(12.6, 83, 0.015, 0, 1.2);

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
