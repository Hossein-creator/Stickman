// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 18, N = SR * DUR;
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

// ---- "love is a tent": heavy rain bed + wind, thunder rumbles with the flashes, gust whooshes (panned to the side), fabric flaps, pole creaks; bottom: his splashing running steps; storm ends: rain fades to drips, his heavy breathing; top: lantern + warm chord + heart bells; bubble pop + typing; FOLLOW: zipper rising, pop when the door opens, bright chime ----
const GUSTS = [[1.2, -1], [2.9, 1], [4.6, -1], [6.2, 1], [7.6, -1]], GD = 1.0, T_FLASH = [0.15, 4.3], T_CALM = 8.8;
const T_LETGO = 9.0, T_HUG = 9.9, T_HEART = 10.3, T_KNEE = 9.0, T_DOOR = 9.6, T_ASK = 10.0, T_H2 = 10.7, T_H3 = 11.6;
const T_CTA = 13.4, T_TAG = T_CTA + 1.0, T_ZIP = T_TAG + 0.7, T_OPEN = T_ZIP + 1.0;
const RUNS = GUSTS.map(([a, sd], i) => [a - (i === 4 ? 0.45 : 0.75), sd]);
{ let lp = 0, hp = 0; for (let i = 0; i < N; i++) { const t = i / SR, r = rnd(); lp += (r - lp) * 0.25; hp = r - lp; const k = 1 - smooth(t, T_CALM - 0.4, T_CALM + 1.2); add(i, (hp * 0.05 * k + lp * 0.02 * k) * Math.min(1, t / 0.3), 0.1 * Math.sin(t)); } }
T_FLASH.forEach((t) => { thump(t + 0.1, 0.12, 36, 0); noise(t + 0.05, 1.6, 0.05, 0, 0.15, (p) => Math.exp(-p * 3)); });
GUSTS.forEach(([a, sd]) => { sweep(a - 0.1, GD + 0.4, 0.1, sd * 0.6, 0.03, 0.4); for (let k = 0; k < 6; k++) noise(a + 0.1 + k * 0.13, 0.05, 0.03, sd * 0.5, 0.6, (p) => 1 - p); tone(a + 0.3, 140, 0.4, 0.012, sd * 0.6, 0.05, 5); });
RUNS.forEach(([r0, sd]) => { for (let k = 0; k < 4; k++) { const t = r0 + 0.05 + k * 0.15; step(t, 0.04, 0.3); noise(t, 0.06, 0.025, 0.3, 0.7, (p) => 1 - p); } });
for (let t = T_CALM; t < DUR; t += 0.35 + 0.4 * Math.abs(rnd())) tone(t, 1800 + 600 * rnd(), 0.04, 0.006, (rnd() - 0.5), 0.001, 70);
for (let k = 0; k < 4; k++) noise(T_KNEE + 0.4 + k * 0.6, 0.35, 0.012, 0.3, 0.2, (p) => Math.sin(Math.PI * p));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HEART - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
noise(T_DOOR, 0.5, 0.03, 0, 0.8, (p) => Math.sin(Math.PI * p));
tone(T_ASK, 700, 0.08, 0.02, 0, 0.002, 30); typing(T_ASK + 0.1, 21, 34);
thump(T_ASK + 0.8, 0.07, 46, 0);
{ const s0 = Math.floor((T_ASK + 0.8) * SR), n = Math.floor(2.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
typing(T_H2, 24, 30); typing(T_H3, 23, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
tone(T_TAG, 880, 0.12, 0.03, 0, 0.002, 18);
{ const s0 = Math.floor(T_ZIP * SR), n = Math.floor((T_OPEN - T_ZIP) * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, (rnd() - 0.5) * 0.05 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (60 + 90 * tt) * tt)), 0); } }
click(T_OPEN, 0.08, 0); thump(T_OPEN, 0.05, 90, 0);
[[0, 84], [0.07, 88], [0.14, 91]].forEach(([d, m]) => bell(T_OPEN + 0.05 + d, m, 0.022, 0, 1.4));
chord(T_OPEN, DUR, [60, 64, 67, 72], 0.01);
typing(T_TAG + 0.4, 17, 30); typing(T_TAG + 1.1, 9, 30);

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
