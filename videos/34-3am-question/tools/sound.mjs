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

// ---- "3 am question": night hum, clock flips, a poke, her "hm?" chirps, sleepy grunts, lamp click, a pillow whoosh + THWUMP in slow motion, heartbeat stare, a warm hug chord, snoring ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[6.0, 7.0]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_POKE = 0.8, T_W1 = 1.05, T_ASK1 = 1.3, T_UP1 = 1.8, T_DOWN1 = 2.45;
const T_CLK2 = 2.9, T_LAMP = 3.25, T_W2 = 3.4, T_ASK2 = 3.7, T_UP2 = 4.2, T_DOWN2 = 4.8, T_OFF = 5.05;
const T_CLK3 = 5.35, T_PICK = 5.6, T_THROW = 5.95, T_HIT = 6.2, T_SIT = 6.45, T_TURN = 6.9, T_ARMS = 7.75, T_CRAWL = 8.0, T_HUG = 8.4, T_LIE = 8.9, T_CLK4 = 9.4;
const rHit = realOf(T_HIT), rHug = realOf(T_HUG);

// quiet night bed: a little music-box feel; empties for the stare; warm after the hug
bed([[0, [50, 57, 62]], [realOf(T_CLK2), [48, 55, 60]], [realOf(T_CLK3), [46, 53, 58]], [rHit, [41, 48]], [rHug, [50, 57, 62, 66]], [realOf(10.4), [55, 59, 62, 67]]], 10.6, 50);
const music = [[0.2, 74], [0.6, 79], [1.0, 78], [1.4, 74], [3.0, 72], [3.4, 77], [3.8, 76], [4.2, 72], [5.4, 70], [5.7, 74]];
music.forEach(([s, m]) => bell(realOf(s), m, 0.012, 0.2, 2.2));
// clock flips
[T_CLK2, T_CLK3, T_CLK4].forEach((c) => { click(realOf(c), 0.06, 0); click(realOf(c) + 0.04, 0.04, 0); tone(realOf(c), 1500, 0.06, 0.015, 0, 0.001, 40); });
// snores while he sleeps
const snore = (t) => { const s0 = Math.floor(t * SR), n = Math.floor(0.6 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.04; add(s0 + i, (lp * 0.25 + Math.sin(2 * Math.PI * 70 * i / SR) * 0.3) * Math.sin(Math.PI * p) * 0.06 * (0.6 + 0.4 * Math.sin(i / SR * 60)), -0.3); } };
[0.1, 2.75, 5.15, 9.6, 10.7, 11.8].forEach((s) => snore(realOf(s)));
// poke
click(realOf(T_POKE), 0.05, -0.1); thump(realOf(T_POKE), 0.05, 90, -0.1);
// her "hm?" questions: little rising chirps
const hm = (t, m, n) => { for (let k = 0; k < n; k++) { const s0 = Math.floor((t + k * 0.16) * SR), len = Math.floor(0.13 * SR); for (let i = 0; i < len; i++) { const p = i / len, f = hz(m + 4 * p + k); add(s0 + i, Math.sin(2 * Math.PI * f * i / SR) * Math.sin(Math.PI * p) * 0.03, 0.3); } } };
hm(realOf(T_ASK1), 74, 1); hm(realOf(T_ASK2), 76, 2); hm(realOf(T_TURN + 0.25), 78, 3);
// his sleepy grunts + heart pop
const grunt = (t) => { tone(t, 120, 0.2, 0.04, -0.3, 0.02, 8); tone(t + 0.02, 180, 0.15, 0.015, -0.3, 0.02, 10); };
[T_W1, T_W2].forEach((s) => grunt(realOf(s)));
[T_UP1 + 0.15, T_UP2 + 0.15].forEach((s) => { tone(realOf(s), hz(84), 0.2, 0.025, -0.2, 0.003, 12); tone(realOf(s) + 0.07, hz(88), 0.2, 0.02, -0.2, 0.003, 12); });
// lamp on / off
[T_LAMP, T_OFF].forEach((s) => { click(realOf(s), 0.08, 0.6); tone(realOf(s), 2400, 0.03, 0.02, 0.6, 0.001, 80); });
noise(realOf(T_LAMP), realOf(T_OFF) - realOf(T_LAMP), 0.01, 0.6, 0.9, (p) => 1);
// pillow: wind-up, whoosh, THWUMP (slow motion)
sweep(realOf(T_THROW) - 0.05, rHit - realOf(T_THROW) + 0.05, 0.08, 0, 0.02, 0.3);
thump(rHit, 0.32, 55, -0.3); noise(rHit, 0.4, 0.12, -0.3, 0.12, (p) => Math.exp(-p * 5));
tone(rHit, hz(36), 1.4, 0.04, 0, 0.03, 1.6);
// the stare: heartbeat in silence
[6.95, 7.3].forEach((s) => { thump(realOf(s), 0.12, 48, 0); thump(realOf(s) + 0.16, 0.08, 44, 0); });
// arms open, she crawls in: blanket rustle and a warm chord
noise(realOf(T_CRAWL), 0.45, 0.04, 0.1, 0.25, (p) => Math.sin(Math.PI * p));
[[0, 69], [0.06, 74], [0.12, 78], [0.2, 81]].forEach(([d, m]) => bell(rHug + d, m, 0.025, 0, 1.4));
noise(realOf(T_LIE + 0.2), 0.5, 0.04, 0, 0.2, (p) => Math.sin(Math.PI * p));
// last lines
[10.9, 11.03, 11.14, 11.26, 11.4].forEach((t, i) => thump(t, i === 4 ? 0.09 : 0.05, i === 4 ? 52 : 70, 0));
[12.1, 12.25, 12.4, 12.6].forEach((t, i) => { thump(t, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.6, 76, 0.02, 0, 1.2); bell(12.65, 83, 0.015, 0, 1.2);

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
