// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 17, N = SR * DUR;
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

// ---- "pastry peace": street murmur + bakery bell, a dreamy chime when she stares, his "!" ping; evening room, an angry phone call, phone thrown, thunder rumbles under her cloud; door, footsteps, box lid pop + sparkle, cloud melts into a warm chord; flashback whoosh; end card ----
const T_STOP = 0.9, T_STARE = 1.0, T_NOTICE = 1.7, T_GO = 2.2, S_HOME = 2.7, T_CALL = 2.9, T_HANG = 3.7, T_CROSS = 4.2;
const T_DOOR = 5.9, T_KNEEL = 6.9, T_OPEN = 7.5, T_PEEK = 8.0, T_MELT = 8.4, T_HUG = 9.2, T_HOW = 9.6, S_FLASH = 10.1, S_BACK = 10.9, T_H1 = 11.8, T_H2 = 12.7, T_CARD = 14.0;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.05; lp2 += (lp - lp2) * 0.1; const street = t < S_HOME || (t >= S_FLASH && t < S_BACK); add(i, lp2 * (street ? 0.35 : 0.1) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.1; t < T_STOP; t += 0.28) { step(t, 0.025, -0.2); step(t + 0.1, 0.02, -0.1); }
bell(0.3, 91, 0.012, 0.3, 0.6); bell(0.36, 96, 0.01, 0.3, 0.6);
[[0, 81], [0.12, 84], [0.24, 88]].forEach(([d, m]) => bell(T_STARE + d, m, 0.015, 0.1, 1.2));
tone(T_NOTICE, 1500, 0.12, 0.03, -0.1, 0.002, 25);
for (let t = T_GO; t < S_HOME; t += 0.28) step(t, 0.02, 0);
// call: muffled voice from the phone, she snaps, hangs up, throws it
for (let t = T_CALL + 0.1; t < T_HANG - 0.2; t += 0.18) tone(t, 260 + 60 * rnd(), 0.1, 0.008, 0.2, 0.01, 20);
tone(T_HANG - 0.2, 300, 0.2, 0.035, 0, 0.005, 10); tone(T_HANG - 0.1, 240, 0.25, 0.03, 0, 0.005, 10);
click(T_HANG + 0.05, 0.06, 0); sweep(T_HANG + 0.15, 0.3, 0.03, -0.3, 0.02, 0.3); thump(T_HANG + 0.45, 0.06, 80, -0.3);
for (let t = T_CROSS; t < T_MELT; t += 0.75) { thump(t, 0.05, 36, 0); noise(t, 0.6, 0.02, 0, 0.05, (p) => Math.exp(-p * 3)); }
// door + steps + kneel
noise(T_DOOR - 0.2, 0.35, 0.03, 0.4, 0.25, (p) => Math.sin(Math.PI * p)); wood(T_DOOR - 0.15, 0.04, 0.4);
for (let t = T_DOOR; t < T_KNEEL; t += 0.3) step(t, 0.025, 0.3);
noise(T_KNEEL + 0.1, 0.2, 0.02, 0.2, 0.3);
click(T_OPEN, 0.05, 0); [[0, 88], [0.06, 93], [0.12, 100]].forEach(([d, m]) => bell(T_OPEN + 0.05 + d, m, 0.022, 0, 1.0));
// melt: warm chord
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_MELT, T_CARD + 0.6, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_MELT + 0.2 + d, m, 0.02, 0, 1.2));
tone(T_HOW, 560, 0.12, 0.03, 0, 0.005, 25); tone(T_HOW + 0.07, 700, 0.12, 0.025, 0, 0.005, 25);
sweep(S_FLASH - 0.1, 0.3, 0.04, 0, 0.02, 0.4); sweep(S_BACK - 0.1, 0.3, 0.04, 0, 0.02, 0.4);
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.1, 0.2, 0.34, 0.44, 0.54].forEach((d, i) => { thump(T_H2 + d, i === 5 ? 0.12 : 0.05, i === 5 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.95, 1.1].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);

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
