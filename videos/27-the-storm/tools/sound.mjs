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

// ---- "the storm" TEST: howling wind + rain that follow the storm, a crash per problem, thunder, slow-mo heartbeat on the catch ----
const SLOW0 = 6.4, SLOW1 = 7.8, SLOWK = 0.35;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => 1 - (1 - SLOWK) * wn(t, SLOW0, SLOW0 + 0.1) * (1 - wn(t, SLOW1 - 0.3, SLOW1));
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const storyOf = (t) => TS[Math.min(TS.length - 1, Math.floor(t / TSTEP))];
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const storm = (s) => clamp(0.12 + 0.88 * wn(s, 0.6, 5.0), 0, 1) * (1 - wn(s, 8.8, 10.4));

bed([[0, [45, 52, 57]], [1.5, [43, 50, 55]], [4.0, [41, 48, 53, 56]], [6.25, [40, 47, 52]], [realOf(6.75), [45, 52, 57, 61]], [realOf(7.5), [50, 57, 62, 66, 69]], [11.2, [50, 57, 62, 66]]], 99, 38);
// wind: band noise whose brightness and loudness follow the storm, ducked in slow motion
{
  let lp = 0, lp2 = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR, s = storyOf(t), I = storm(s), slow = speedAt(t);
    lp += (rnd() - lp) * (0.01 + 0.05 * I * (0.7 + 0.3 * Math.sin(t * 1.7)));
    lp2 += (rnd() - lp2) * 0.35;
    const g = (0.05 + 0.18 * I) * (0.35 + 0.65 * slow) * Math.min(1, t / 0.4);
    add(i, lp * g, 0.3 * Math.sin(t * 0.9));
    add(i, lp2 * 0.012 * I * slow, -0.2); // rain hiss
  }
}
// hook slams
[0.15, 0.4, 0.65].forEach((t, i) => { thump(t, 0.11, 55 + i * 6, 0); noise(t, 0.08, 0.06, 0, 0.6, (p) => 1 - p); });
// each problem: whoosh in, crash, debris
const DEB = [[1.6, 600], [2.6, 120], [3.5, 520], [4.4, 170], [5.3, 560]];
for (const [s, x] of DEB) {
  const t = realOf(s);
  sweep(t - 0.6, 0.6, 0.07, panX(x + 300), 0.05, 0.5);
  thump(t, 0.15, 48, panX(x)); noise(t, 0.5, 0.12, panX(x), 0.45, (p) => Math.exp(-p * 6));
  for (let i = 0; i < 7; i++) click(t + 0.06 + i * 0.05 + 0.03 * rnd(), 0.035, panX(x) + 0.3 * rnd());
}
// thunder
for (const t of [3.0, 5.0]) { noise(t, 0.08, 0.12, 0, 0.9, (p) => 1 - p); noise(t + 0.05, 2.2, 0.14, 0, 0.015, (p) => Math.exp(-p * 2) * (0.6 + 0.4 * Math.sin(p * 40))); thump(t + 0.1, 0.1, 34, 0); }
// DOUBT tears between them
sweep(realOf(5.9), 0.55, 0.12, 0, 0.08, 0.7);
tone(realOf(6.25), hz(40), 1.4, 0.07, 0, 0.01, 1.4);
// slow motion: heartbeat, then the catch
const tc = realOf(6.75);
for (const t of [realOf(6.42), realOf(6.6)]) { thump(t, 0.12, 44, 0); thump(t + 0.2, 0.08, 40, 0); }
thump(tc, 0.18, 52, 0); noise(tc, 0.12, 0.06, 0, 0.5, (p) => 1 - p);
[64, 69, 73, 76].forEach((m, i) => bell(tc + 0.05 + i * 0.1, m, 0.035, 0, 1.0));
// hug and the walk into the wind: steps
for (let k = 0; k < 4; k++) step(realOf(8.4 + 0.45 * k + 0.2), 0.07, 0);
// the storm breaks: soft birds
const chirp = (t, f, pan) => { const s0 = Math.floor(t * SR); for (let i = 0; i < SR * 0.09; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (f + 1800 * tt) * tt) * Math.sin(Math.PI * tt / 0.09) * 0.025, pan); } };
for (let i = 0; i < 8; i++) chirp(10.6 + i * 0.32 + 0.1 * rnd(), 2700 + 500 * rnd(), 0.5 * rnd());
// punchline slams
[11.2, 11.38, 11.56, 11.76].forEach((t) => { thump(t, 0.06, 70, 0); click(t, 0.05, 0); });
thump(12.3, 0.13, 48, 0); thump(12.6, 0.1, 55, 0); noise(12.3, 0.3, 0.05, 0, 0.3, (p) => Math.exp(-p * 5));

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
