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

// ---- "spear stairs": war drums + a jeering crowd, spear whooshes and THUNKs into rock, jumps and landings, slow-motion boom on top. Then the crowd goes quiet: only wind, one dropped spear, a heartbeat ----
const SLOWS = [[9.95, 10.95]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const JP = [[1.3, 1.85, 0], [2.75, 3.2, 0], [4.05, 4.5, 0], [5.35, 5.85, 1], [7.3, 7.75, 0], [8.7, 9.15, 0], [10.0, 10.55, 1]];
const HITS = [2.35, 3.65, 4.95, 6.62, 6.76, 6.9, 8.3];
const T_QUIET = 11.75, T_DROP = 12.35;
const rTop = realOf(JP[6][1]), rQuiet = realOf(T_QUIET);

// wind the whole time (louder when everything else stops)
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.006; add(i, lp * (0.12 + 0.1 * smooth(t, rQuiet, rQuiet + 1) - 0.12 * smooth(t, DUR - 0.8, DUR)) * (0.7 + 0.3 * Math.sin(t * 0.7)), Math.sin(t * 0.3) * 0.4); } }
// tense low pad until the top, then gone
bed([[0, [38, 45, 50]], [realOf(4.95), [37, 44, 49]], [realOf(8.3), [36, 43, 48]], [rTop, [31]]], realOf(T_QUIET) - 0.6, 41);
// war drums: two hits per beat, stop dead when he lands on top
for (let s = 0.1; s < JP[6][0]; s += 0.5) { const t = realOf(s); thump(t, 0.13, 52, -0.5); thump(t + 0.12, 0.07, 60, -0.5); }
// the crowd: jeers and "ha ha" bursts (left side), stop at the quiet
function laugh(t, f0, n, gain, pan) {
  for (let k = 0; k < n; k++) {
    const s0 = Math.floor((t + k * 0.13) * SR), len = Math.floor(0.09 * SR);
    let lp = 0;
    for (let i = 0; i < len; i++) { const p = i / len, f = f0 * (1 - 0.15 * p); lp += (rnd() - lp) * 0.3; add(s0 + i, (Math.sin(2 * Math.PI * f * i / SR) * 0.6 + Math.sin(2 * Math.PI * f * 2.1 * i / SR) * 0.3 + lp * 0.4) * Math.sin(Math.PI * p) * gain, pan); }
  }
}
const jeers = [0.15, 0.55, 0.9, 1.5, 2.0, 2.6, 3.3, 3.9, 4.6, 5.2, 6.0, 6.3, 6.6, 7.4, 8.0, 8.9, 9.5];
jeers.forEach((s, i) => laugh(realOf(s), 170 + (i * 37) % 90, 3 + (i % 3), 0.035, -0.5 + (i % 3) * 0.15));
noise(0, rQuiet, 0.03, -0.4, 0.05, (p) => Math.min(1, p * 20) * (p > 0.97 ? (1 - p) / 0.03 : 1));
// spears: throw grunt, whoosh, THUNK into rock, a twang
HITS.forEach((h) => {
  const r = realOf(h - 0.4), t = realOf(h);
  tone(r - 0.05, 140, 0.15, 0.03, -0.5, 0.01, 10);
  sweep(r, t - r, 0.09, 0.2, 0.03, 0.45);
  thump(t, 0.22, 85, 0.4); wood(t, 0.12, 0.4); noise(t, 0.05, 0.12, 0.4, 0.7, (p) => 1 - p);
  tone(t + 0.01, 230, 0.6, 0.03, 0.4, 0.002, 6);
});
// jumps + landings
JP.forEach(([a, b, flip], i) => {
  sweep(realOf(a), realOf(b) - realOf(a), flip ? 0.08 : 0.05, 0.2, 0.02, flip ? 0.5 : 0.3);
  if (i < 6) { step(realOf(b), 0.12, 0.3); tone(realOf(b), 200, 0.3, 0.025, 0.3, 0.002, 9); }
});
// on top: slow-motion boom, then the crowd goes silent
thump(rTop, 0.35, 42, 0); tone(rTop, hz(31), 2.0, 0.05, 0, 0.03, 1.2); noise(rTop, 0.5, 0.1, 0, 0.12, (p) => Math.exp(-p * 5));
bell(rTop + 0.3, 69, 0.02, 0.3, 0.9);
// silence... one spear drops and clatters, a heartbeat
const rd = realOf(T_DROP + 0.42);
[0, 0.07, 0.16].forEach((d, i) => { wood(rd + d, 0.09 / (i + 1), -0.4); noise(rd + d, 0.03, 0.05 / (i + 1), -0.4, 0.8, (p) => 1 - p); });
[realOf(12.0), realOf(12.0) + 0.9].forEach((t) => { thump(t, 0.12, 46, 0); thump(t + 0.17, 0.08, 42, 0); });
// last lines
[13.75, 13.9, 14.05].forEach((t, i) => thump(t, i === 2 ? 0.09 : 0.05, i === 2 ? 52 : 70, 0));
[14.65, 14.8, 15.0].forEach((t, i) => { thump(t, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(15.0, 74, 0.02, 0, 1.2); bell(15.05, 81, 0.015, 0, 1.2);

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
