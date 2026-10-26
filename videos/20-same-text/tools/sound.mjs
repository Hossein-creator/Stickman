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

// ---- "same text": night room tone, buzz, his heartbeat speeds up while he spirals, birds at sunrise ----
bed([[0, [45, 52, 57]], [2.6, [44, 51, 56]], [4.6, [43, 50, 55, 58]], [6.4, [41, 48, 53]], [8.4, [48, 55, 60, 64]], [10.4, [50, 57, 62, 66]]], 10.9, 43);
noise(0, 13.9, 0.01, 0, 0.01);
// both phones buzz at 11:14 PM
const buzz2 = (t, g, pan) => {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.34; i++) {
    const tt = i / SR, on = Math.floor(tt / 0.07) % 2 === 0 ? 1 : 0.15;
    add(s0 + i, Math.sin(2 * Math.PI * 170 * tt) * Math.sign(Math.sin(2 * Math.PI * 85 * tt)) * 0.5 * on * g, pan);
  }
};
buzz2(0.6, 0.08, panX(212)); buzz2(0.62, 0.08, panX(588));
tone(0.62, 1760, 0.25, 0.04, 0, 0.002, 14); tone(0.72, 2350, 0.3, 0.03, 0, 0.002, 12);
// he sits up; she... the chill one replies and the message whooshes away
noise(0.85, 0.3, 0.03, panX(212), 0.05);
sweep(1.6, 0.25, 0.04, panX(588), 0.1, 0.5);
tone(1.72, 1320, 0.15, 0.02, panX(588), 0.002, 25);
// thought pops, one per line
for (let i = 0; i < 7; i++) { tone(2.6 + i * 0.68, hz(64 - i), 0.12, 0.03, panX(212), 0.003, 22); noise(2.6 + i * 0.68, 0.03, 0.03, panX(212), 0.5, (p) => 1 - p); }
// heartbeat: slow -> fast while he spirals, gone when he finally falls asleep
{
  let t = 2.4, per = 0.95;
  while (t < 7.8) {
    const g = 0.05 + 0.05 * smooth(t, 2.4, 6.5);
    thump(t, g, 48, panX(212)); thump(t + 0.16, g * 0.7, 44, panX(212));
    per = Math.max(0.42, per - 0.055); t += per;
  }
}
// chill: slow sleeping breath
for (let t = 2.6; t < 8.6; t += 2.2) noise(t, 1.6, 0.018, panX(588), 0.015);
// sunrise: birds, then the morning buzz
const chirp = (t, f, pan) => { const s0 = Math.floor(t * SR); for (let i = 0; i < SR * 0.09; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (f + 1800 * tt) * tt) * Math.sin(Math.PI * tt / 0.09) * 0.03, pan); } };
for (let i = 0; i < 14; i++) chirp(7.6 + i * 0.37 + 0.1 * rnd(), 2600 + 500 * rnd(), 0.5 * rnd());
buzz2(8.6, 0.07, panX(212)); buzz2(8.62, 0.07, panX(588));
tone(8.62, 1760, 0.25, 0.04, 0, 0.002, 14); tone(8.72, 2350, 0.3, 0.03, 0, 0.002, 12);
// chill wakes and stretches, replies ROME!
sweep(9.3, 0.5, 0.03, panX(588), 0.02, 0.15);
sweep(10.4, 0.25, 0.04, panX(588), 0.1, 0.5);
// overthinker jolts awake
sweep(10.15, 0.3, 0.05, panX(212), 0.05, 0.4);
thump(10.3, 0.06, 70, panX(212));
typing(0.4, 10, 20);
typing(11.1, 24, 22);

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
