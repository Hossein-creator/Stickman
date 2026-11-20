// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 21, N = SR * DUR;
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

// ---- "breaking news": evening city bed (low traffic rumble + far horns); phone ring; fast running steps (her + cameraman); a short news jingle when LIVE; his soft steps behind her; turn whoosh + surprise hit; ring box pop + sparkle; mic drop thud + small feedback squeal; "yes" bells; warm chord + heart bells on the hug; typing; FOLLOW: REC button pop, tap + bright chime ----
const T_CALL = 0.5, T_RUN = 1.9, T_ARR = 3.4, T_LIVE = 3.7, T_TALK = 4.1, T_IN = 4.5, T_KNEE = 5.4, T_POINT = 6.0, T_TURN = 6.6, T_NEWS = 7.0, T_SURP = 7.3, T_DROP = 7.8, T_MARRY = 8.4, T_YES = 9.8, T_RISE = 10.3, T_HUG = 10.6, T_L2 = 12.2, T_L3 = 13.2, T_CTA = 15.6, T_LT = 16.1, T_TAP = 17.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.01; add(i, (lp * 0.3 + Math.sin(2 * Math.PI * 55 * t) * 0.003) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
tone(2.6, 440, 0.25, 0.004, 0.8, 0.02, 6); tone(2.85, 392, 0.3, 0.004, 0.8, 0.02, 6);
for (let k = 0; k < 4; k++) { tone(T_CALL - 0.4 + k * 0.12, 1300, 0.08, 0.012, 0.1, 0.002, 30); tone(T_CALL - 0.34 + k * 0.12, 1600, 0.06, 0.01, 0.1, 0.002, 30); }
for (let t = T_RUN + 0.05; t < T_ARR; t += 0.2) step(t, 0.03, 0.0);
for (let t = T_RUN + 0.15; t < T_ARR + 0.2; t += 0.22) step(t, 0.022, -0.3);
[[0, 72], [0.12, 76], [0.24, 79], [0.36, 84]].forEach(([d, m]) => tone(T_LIVE + d, hz(m), 0.18, 0.012, 0, 0.004, 14));
thump(T_LIVE, 0.05, 60, 0);
for (let t = T_IN + 0.1; t < T_KNEE - 0.1; t += 0.4) step(t, 0.012, 0.5);
sweep(T_TURN - 0.2, 0.4, 0.06, 0, 0.05, 0.5); thump(T_TURN, 0.08, 55, 0); noise(T_TURN, 0.15, 0.05, 0, 0.8, (p) => Math.exp(-p * 6));
click(T_NEWS, 0.05, 0.3); for (let k = 0; k < 5; k++) tone(T_NEWS + 0.05 + k * 0.06, 2600 + 300 * k, 0.08, 0.006, 0.3, 0.001, 30);
thump(T_DROP + 0.4, 0.06, 90, 0.1); noise(T_DROP + 0.4, 0.08, 0.04, 0.1, 0.6, (p) => Math.exp(-p * 8)); tone(T_DROP + 0.42, 2900, 0.5, 0.006, 0.1, 0.05, 4);
[[0, 76], [0.1, 81], [0.2, 85]].forEach(([d, m]) => bell(T_YES + d, m, 0.022, 0, 1.2));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_YES, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 79], [0.08, 84], [0.16, 88]].forEach(([d, m]) => bell(T_HUG + d, m, 0.02, 0, 1.2));
typing(T_L2, 27, 26); typing(T_L3, 17, 26);
sweep(T_CTA - 0.1, 1.0, 0.05, 0, 0.04, 0.4);
tone(T_LT, 1320, 0.08, 0.015, 0, 0.002, 30);
click(T_TAP, 0.06, -0.2); thump(T_TAP, 0.04, 140, 0);
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
