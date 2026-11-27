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

// ---- "love is a couch": quiet stairwell room tone; couch lift grunt-thud, heavy steps on wooden stairs (both / him alone), couch scrape on each stair, slip + slide back, he drops to the floor; phone taps; top: set-down thud, sofa squeak when they sit, warm chord + heart bells; low drone after he collapses; typing; FOLLOW: pillow whoosh + soft bounce, tap + bells ----
const T_BEND = 0.3, T_LIFT = 0.9, T_GO = 1.3, T_UP = 5.0, T_DOWN = 5.6, T_SIT = 5.9, T_SAT = 6.5, T_LEAN = 6.9, T_HEART = 7.6, T_BGRAB = 0.8, T_SLIP = 4.4, T_BTOP = 8.0, T_DROP = 8.3, T_H2 = 9.6, T_H3 = 10.8, T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() * 0.5 - lp) * 0.01; add(i, (lp * 0.12 + 0.004 * Math.sin(2 * Math.PI * 60 * t)) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const scrape = (t, d, g, pan) => noise(t, d, g, pan, 0.12, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)));
// top: lift, steps together, set down
noise(T_LIFT - 0.2, 0.3, 0.03, -0.2, 0.2, (p) => Math.sin(Math.PI * p));
for (let t = T_GO + 0.15; t < T_UP; t += 0.48) { wood(t, 0.022, -0.3); wood(t + 0.06, 0.018, 0.1); }
thump(T_DOWN, 0.12, 80, 0.2); wood(T_DOWN + 0.02, 0.03, 0.2);
const squeak = (t, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(0.25 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 520 + 300 * tt / 0.25; add(s0 + i, Math.sin(2 * Math.PI * f * tt) * g * Math.sin(Math.PI * tt / 0.25), pan); } };
squeak(T_SAT - 0.2, 0.012, 0.1); squeak(T_SAT, 0.01, 0.3);
// bottom: he pushes alone, slow heavy steps + scrape per stair
for (let t = T_BGRAB + 0.7; t < T_BTOP; t += 0.6) { if (t > T_SLIP && t < T_SLIP + 1.0) continue; wood(t, 0.026, 0.4); scrape(t + 0.1, 0.35, 0.03, 0.3); }
sweep(T_SLIP, 0.35, 0.05, 0.3, 0.1, 0.5); scrape(T_SLIP + 0.05, 0.35, 0.05, 0.3); thump(T_SLIP + 0.3, 0.1, 70, 0.3);
thump(T_DROP + 0.15, 0.15, 65, 0.1); noise(T_DROP + 0.15, 0.2, 0.04, 0.1, 0.4, (p) => Math.exp(-p * 6));
for (let t = 0.4; t < 12; t += 0.55) click(t, 0.006, 0.5);
{ const s0 = Math.floor((T_DROP + 0.2) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.032 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_SIT - 0.3, T_CTA + 0.5, [53, 57, 60, 65], 0.01);
[[0, 74], [0.08, 79], [0.16, 83]].forEach(([d, m]) => bell(T_HEART + d, m, 0.022, 0, 1.2));
typing(T_H2, 16, 30); typing(T_H3, 16, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
sweep(T_TAG, 0.8, 0.04, 0.3, 0.1, 0.4); thump(T_TAG + 0.9, 0.06, 110, 0.3);
click(T_TAP, 0.06, 0.2);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.024, 0.2, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.011);

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
