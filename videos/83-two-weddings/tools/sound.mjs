// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 15, N = SR * DUR;
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

// ---- "two weddings": act 1 party music (bright plucks on a beat) + crowd hum, price-tag "cha-ching" pops, firework whistles + booms; bottom: soft bells for the rings and kiss. Cut: whoosh + low hit. Act 2: rain-like room tone, mail drops (paper slap), clock-like tick (interest), argument stings, photo crash; coins clink into the jar, hammer/build knocks, warm chord when the light goes on. Headline typing, quote bells, CTA: hammer knocks, sign writing, tag swing, tap click + happy chime ----
const M = (s) => { const WV = [0, 4.5, 9.7, 11.2], WS = [0, 9.0, 19.4, 21.8]; if (s >= 25.6) return 11.2 + (s - 25.6) * (DUR - 11.2) / 7.4; if (s >= 21.8) return 11.2; for (let i = 0; i < 3; i++) if (s < WS[i + 1]) return WV[i] + (s - WS[i]) * (WV[i + 1] - WV[i]) / (WS[i + 1] - WS[i]); return 11.2; };
const T_CUT = M(9.0), TAGS = [1.0, 2.0, 3.0, 4.0, 5.2].map(M), FW = [3.8, 4.4, 5.0, 5.7, 6.4, 7.2].map(M), T_RINGS = M(1.6), T_SCAKE = M(2.8), T_KISS = M(4.4);
const MAIL = [9.8, 10.6, 11.3, 11.9, 12.4, 12.9, 13.3].map(M), T_ARG1 = M(14.4), T_ARG2 = M(15.9), T_BACK = M(17.4), T_PHOTO = M(18.0);
const COINS = [9.8, 10.5, 11.2, 11.9, 12.6, 13.3].map(M), T_WALK = M(13.8), T_BUILD = M(14.0), T_ROOF = M(15.6), T_LIGHT = M(16.8), T_HUG = M(17.3);
const T_H2 = M(19.4), T_H3 = M(20.4), T_Q = 99, T_CTA = M(25.6), T_NAIL = M(26.8), T_WRITE = M(27.9), T_TAG = M(28.6), T_TAP = M(30.0);
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.4) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
// party plucks (act 1)
const PL = [72, 76, 79, 76, 74, 77, 81, 77];
for (let k = 0; k * 0.25 < T_CUT - 0.4; k++) { const t = 0.2 + k * 0.25; tone(t, hz(PL[k % 8]), 0.18, 0.018, (k % 2 ? 0.2 : -0.2), 0.002, 14); if (k % 2 === 0) thump(t, 0.035, 70, 0); }
noise(0.2, T_CUT - 0.4, 0.012, 0, 0.08, (p) => Math.min(1, p * 8) * Math.min(1, (1 - p) * 8));
TAGS.forEach((t) => { tone(t, 1760, 0.12, 0.03, 0.3, 0.001, 18); tone(t + 0.06, 2637, 0.15, 0.025, 0.3, 0.001, 16); noise(t, 0.05, 0.03, 0.3, 0.9, (p) => 1 - p); });
FW.forEach((t) => { for (let i = 0; i < 20; i++) tone(t - 0.6 + i * 0.025, 900 + i * 60, 0.03, 0.006, -0.2, 0.002, 30); thump(t, 0.08, 45, 0.1); noise(t, 0.6, 0.04, 0.1, 0.5, (p) => Math.exp(-p * 5)); });
bell(T_RINGS + 0.3, 84, 0.015, 0, 1.4); bell(T_RINGS + 0.4, 88, 0.012, 0, 1.4); bell(T_KISS + 0.3, 79, 0.016, 0, 1.4); bell(T_KISS + 0.4, 84, 0.014, 0, 1.4);
tone(T_SCAKE, 1320, 0.1, 0.015, -0.3, 0.001, 20);
sweep(T_CUT - 0.3, 0.5, 0.08, 0, 0.05, 0.5); thump(T_CUT, 0.09, 44, 0);
// act 2
MAIL.forEach((t, i) => { noise(t + 0.45, 0.06, 0.05 + 0.005 * i, 0.3, 0.6, (p) => 1 - p); thump(t + 0.45, 0.02, 120, 0.3); });
for (let t = MAIL[0]; t < T_BACK; t += 0.25) tone(t, 1200, 0.03, 0.008, 0.4, 0.001, 60);
[T_ARG1, T_ARG2].forEach((t) => { tone(t, 220, 0.4, 0.03, 0, 0.005, 6); tone(t, 233, 0.4, 0.02, 0, 0.005, 6); });
thump(T_PHOTO + 0.35, 0.08, 90, 0); for (let k = 0; k < 5; k++) tone(T_PHOTO + 0.36 + k * 0.03, 3000 + 300 * k, 0.08, 0.015, 0, 0.001, 40);
COINS.forEach((t, i) => { tone(t + 0.45, 2200 + 120 * i, 0.12, 0.02, -0.3, 0.001, 30); tone(t + 0.47, 3300 + 120 * i, 0.1, 0.012, -0.3, 0.001, 30); });
for (let t = T_BUILD; t < T_ROOF + 0.25; t += 0.16) { thump(t, 0.035, 110, -0.3); noise(t, 0.03, 0.02, -0.3, 0.6, (p) => 1 - p); }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 1.0); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIGHT, T_Q + 1.0, [57, 60, 64, 69], 0.008);
{ const s0 = Math.floor(T_BACK * SR), n = Math.floor((T_Q - T_BACK) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 1) * Math.min(1, (n / SR - tt) / 1); add(s0 + i, Math.sin(2 * Math.PI * 46 * tt) * 0.018 * e, 0); } }
typing(T_H2, 28, 42); typing(T_H3, 20, 42);
bell(T_Q, 57, 0.02, 0, 0.9); bell(T_Q + 0.6, 60, 0.018, 0, 0.9); bell(T_Q + 1.2, 64, 0.018, 0, 0.9);
sweep(T_CTA - 0.1, 1.0, 0.07, 0, 0.04, 0.4);
for (let k = 0; k < 6; k++) { const t = M(26.8 + k / 3 + 1 / 6); if (t < T_WRITE - 0.2) { thump(t, 0.05, 160, 0.3); click(t, 0.05, 0.3); } }
typing(T_WRITE, 16, 47);
tone(T_TAG, 660, 0.15, 0.02, 0, 0.002, 18);
click(T_TAP, 0.09, 0); thump(T_TAP, 0.05, 90, 0);
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(T_TAP + 0.15 + d, m, 0.022, 0, 1.3));
chord(T_TAP + 0.15, DUR, [60, 64, 67, 72], 0.01);
typing(M(28.9), 38, 58);

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
