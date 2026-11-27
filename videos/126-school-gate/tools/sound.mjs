// Music bed + SFX from code. Built by tools/kit/build.mjs: snd-head + the reel's tools/sfx.mjs + snd-tail.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 20, N = SR * DUR;
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

// ---- "school gate": phone scene = message pop + typing dots + reply pop over a soft pad; cut whoosh; afternoon street (birds, far traffic); school bell rings; gate rattles open; chatter of students + steps; friend gasp-like blip; her phone drops; running steps; hug: warm chord swell + heart bells; typing; FOLLOW: card flick + tap + chime ----
const T_MSG1 = 0.5, T_TYP = 1.1, T_MSG2 = 1.8, T_CUT = 3.2, T_POCKET = 4.0, T_ROSES = 4.6, T_BELL = 5.8, T_GATE = 6.3, T_OUT = 7.6, T_STOP = 9.0, T_POINT = 8.9, T_UP = 9.4, T_DROP = 9.8, T_RUN = 10.0, T_HUG = 10.8, T_HEART = 11.3, T_L2 = 12.6, T_L3 = 13.8, T_CTA = 15.2, T_CARD = 15.5, T_TAP = 16.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * smooth(t, T_CUT - 0.2, T_CUT + 0.3) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(0.1, T_CUT + 0.3, [57, 60, 64], 0.008);
const pop = (t, f, g) => { tone(t, f, 0.12, g, 0, 0.001, 30); tone(t + 0.05, f * 1.5, 0.12, g * 0.7, 0, 0.001, 30); };
pop(T_MSG1, 880, 0.03); for (let t = T_TYP; t < T_MSG2 - 0.1; t += 0.17) click(t, 0.008, 0); pop(T_MSG2, 660, 0.03);
sweep(T_CUT - 0.3, 0.5, 0.06, 0, 0.05, 0.5);
for (let t = T_CUT + 0.4; t < DUR - 1; t += 1.3 + 0.4 * Math.sin(t)) { const f = 3200 + 600 * Math.sin(t * 3); tone(t, f, 0.08, 0.006, 0.5, 0.002, 40); tone(t + 0.1, f * 1.1, 0.08, 0.005, 0.5, 0.002, 40); }
for (let k = 0; k < 14; k++) tone(T_BELL + k * 0.07, 1400 + (k % 2) * 90, 0.12, 0.022, -0.3, 0.001, 18);
for (let k = 0; k < 6; k++) noise(T_GATE + k * 0.1, 0.06, 0.03, -0.3, 0.6, (p) => Math.exp(-p * 6)); wood(T_GATE + 0.6, 0.03, -0.3);
noise(T_GATE + 0.3, 4.0, 0.025, -0.2, 0.35, (p) => Math.min(1, p * 4) * (1 - p) * (0.6 + 0.4 * Math.sin(p * 60)));
for (let t = 6.6; t < 11; t += 0.3) step(t, 0.008, -0.3 + 0.1 * Math.sin(t * 5));
for (let t = T_OUT; t < T_DROP; t += 0.5) click(t, 0.005, -0.2);
tone(T_POINT, 700, 0.2, 0.015, -0.2, 0.01, 10); tone(T_POINT + 0.12, 940, 0.2, 0.012, -0.2, 0.01, 10);
sweep(T_UP, 0.3, 0.03, 0, 0.2, 0.5);
click(T_DROP + 0.45, 0.04, -0.1); click(T_DROP + 0.52, 0.02, -0.1);
for (let t = T_RUN + 0.05; t < T_HUG; t += 0.2) step(t, 0.02, 0.1);
thump(T_HUG, 0.08, 80, 0.2); noise(T_HUG, 0.3, 0.03, 0.2, 0.3, (p) => Math.sin(Math.PI * p));
chord(T_HUG - 0.2, T_CTA + 0.6, [60, 64, 67, 71], 0.011);
[[0, 76], [0.08, 81], [0.16, 84], [0.4, 88]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0.2, 1.3));
typing(T_L2, 16, 26); typing(T_L3, 16, 26);
sweep(T_CTA - 0.1, 1.0, 0.05, 0, 0.04, 0.4);
noise(T_CARD, 0.12, 0.03, 0.2, 0.6, (p) => Math.sin(Math.PI * p));
click(T_TAP, 0.06, 0.2); noise(T_TAP + 0.05, 0.15, 0.03, 0.2, 0.6, (p) => Math.sin(Math.PI * p));
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
