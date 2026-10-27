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

// ---- "wait for it": soft sad bed, steps, a glint chime, sprint, a brush swish + bloop per stroke, silence + heartbeat, SPLAT, two laughs, bright chords ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[7.7, 8.7]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_IN = 0.3, T_SEE = 1.25, T_GLINT = 1.55, T_RUN = 1.85, T_GRAB = 2.45, T_BACK = 2.6, T_KNEEL = 3.2;
const STROKES = [3.6, 4.05, 4.5, 4.95, 5.4, 5.85];
const T_TOUCH = 6.35, T_LOOKHAND = 6.75, T_GRABB = 7.45, T_SPLAT = 7.9, T_LAUGH = 8.75, T_COLOR = 9.0;
const rS = realOf(T_SPLAT), rC = realOf(T_COLOR);

// sad minor bed, it drops out for the tense beat, comes back major after the splat
bed([[0, [45, 48, 52]], [2.0, [41, 45, 48, 52]], [3.4, [43, 46, 50]], [5.0, [45, 48, 52, 55]], [6.3, [40, 47]], [rC, [48, 52, 55, 60]], [10.6, [53, 57, 60, 64]]], 10.8, 45);
// walk in, stop
for (let k = 0; k < 5; k++) step(realOf(T_IN + 0.1 + k * 0.19), 0.05, -0.6 + k * 0.1);
// glint chime on the paint box
bell(realOf(T_GLINT), 88, 0.03, -0.6, 2.5); bell(realOf(T_GLINT) + 0.06, 95, 0.02, -0.6, 2.5);
// sprint there and back, whooshes
sweep(realOf(T_RUN) - 0.05, 0.35, 0.06, -0.4, 0.03, 0.3);
for (let k = 0; k < 4; k++) step(realOf(T_RUN + 0.1 + k * 0.14), 0.05, -0.4 - k * 0.08);
wood(realOf(T_GRAB), 0.06, -0.7);
sweep(realOf(T_BACK) - 0.05, 0.35, 0.06, -0.4, 0.03, 0.3);
for (let k = 0; k < 4; k++) step(realOf(T_BACK + 0.08 + k * 0.14), 0.05, -0.6 + k * 0.12);
thump(realOf(T_KNEEL), 0.08, 70, 0);
// brush strokes: a wet swish and a little bloop, each one a step up
STROKES.forEach((t0, i) => {
  const t = realOf(t0);
  sweep(t + 0.02, 0.24, 0.05, 0.1, 0.08, 0.5);
  tone(t + 0.16, hz(72 + [0, 3, 5, 7, 10, 12][i]), 0.18, 0.03, 0.1, 0.004, 14);
  tone(t + 0.16, hz(84 + [0, 3, 5, 7, 10, 12][i]), 0.1, 0.012, 0.1, 0.004, 20);
});
// she touches her cheek ... silence, a heartbeat, a nervous gulp
click(realOf(T_TOUCH + 0.2), 0.03, 0.2);
[6.8, 7.2].forEach((s) => { thump(realOf(s), 0.12, 48, 0); thump(realOf(s) + 0.16, 0.08, 44, 0); });
tone(realOf(7.05), 300, 0.12, 0.02, -0.1, 0.01, 12); tone(realOf(7.1), 220, 0.12, 0.02, -0.1, 0.01, 12);
// the grab and the SPLAT (slow motion)
sweep(realOf(T_GRABB) , realOf(T_SPLAT) - realOf(T_GRABB), 0.08, 0, 0.02, 0.35);
thump(rS, 0.36, 40, 0); noise(rS, 0.5, 0.14, 0, 0.35, (p) => Math.exp(-p * 6));
for (let i = 0; i < 12; i++) click(rS + 0.05 + i * 0.05 + 0.02 * rnd(), 0.03, 0.4 * rnd());
tone(rS, hz(36), 1.2, 0.05, 0, 0.02, 2.2);
// two laughs: his lower, hers higher
const laugh = (t0, f0, pan) => { for (let k = 0; k < 6; k++) { const t = t0 + k * 0.14; noise(t, 0.05, 0.025, pan, 0.4, (p) => 1 - p); tone(t + 0.01, f0 * (1 + 0.05 * Math.sin(k)), 0.1, 0.025, pan, 0.01, 16); } };
laugh(realOf(T_LAUGH), 170, -0.2); laugh(realOf(T_LAUGH) + 0.07, 290, 0.2);
laugh(realOf(T_LAUGH) + 1.1, 160, -0.2); laugh(realOf(T_LAUGH) + 1.15, 300, 0.2);
// colour back: bright bells
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(rC + d, m, 0.025, 0, 1.4));
// last lines
[11.0, 11.14, 11.26, 11.38, 11.52].forEach((t, i) => thump(t, i === 4 ? 0.09 : 0.05, i === 4 ? 52 : 70, 0));
[12.0, 12.12, 12.26, 12.4, 12.52, 12.7].forEach((t, i) => { thump(t, i === 5 ? 0.12 : 0.05, i === 5 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.7, 76, 0.02, 0, 1.2); bell(12.75, 83, 0.015, 0, 1.2);

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
