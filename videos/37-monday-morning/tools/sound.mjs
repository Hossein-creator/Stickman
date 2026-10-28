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

// ---- "monday morning": beeping alarm, two slaps, gum-stretch creaks, snap-back boings, the TEAR in slow motion, a tired sigh ----
const SLOWS = [[8.55, 9.6]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_SLAP1 = 1.2, T_SLAP2 = 1.85, T_WAKE = 2.4;
const TRIES = [[3.0, 3.75, 4.05], [5.2, 6.1, 6.45]];
const T_A3 = 7.5, T_GRAB = 8.0, T_TEAR = 8.8, T_UPR = 9.2;
const rTear = realOf(T_TEAR);

// sleepy bed; empties under the tear; tired after
bed([[0, [45, 52, 57]], [realOf(3.0), [43, 50, 55]], [realOf(5.2), [41, 48, 53]], [realOf(7.5), [40, 47]], [rTear + 0.6, [45, 52, 57, 60]]], 10.6, 45);
// alarm: beep-beep until the second slap
for (let s = 0.05; s < T_SLAP2 - 0.05; s += 0.45) [0, 0.12].forEach((d) => { if (s + d < T_SLAP2) tone(s + d, 2093, 0.08, 0.05, -0.4, 0.002, 6); });
// one snore under the alarm
noise(0.0, 0.7, 0.04, 0, 0.04, (p) => Math.sin(Math.PI * p));
// slaps on the clock
[T_SLAP1, T_SLAP2].forEach((s) => { thump(realOf(s), 0.14, 90, -0.4); click(realOf(s), 0.09, -0.4); noise(realOf(s), 0.05, 0.08, -0.4, 0.5, (p) => Math.exp(-p * 6)); });
// wake: a groan
tone(realOf(T_WAKE), 110, 0.5, 0.035, 0, 0.05, 3); tone(realOf(T_WAKE) + 0.05, 165, 0.4, 0.012, 0, 0.05, 4);
// gum stretch: a rising rubbery creak with wobble
function creak(t0, t1, f0, f1, gain) {
  const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n, f = f0 + (f1 - f0) * p * p + 6 * Math.sin(i / SR * 50);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(ph * 2.02)) * gain * Math.min(1, p * 6) * (0.6 + 0.4 * p), 0);
  }
}
// snap back: whip, thwump into the pillow, boing
function boing(t, f, gain) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.7; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * f * tt * (1 + 0.25 * Math.sin(tt * 40) * Math.exp(-tt * 5))) * Math.exp(-tt * 6) * gain, 0); }
}
TRIES.forEach(([a, m, sn], k) => {
  creak(realOf(a + 0.1), realOf(sn), 120 + k * 20, 260 + k * 60, 0.025);
  sweep(realOf(sn) - 0.08, 0.14, 0.07, 0, 0.05, 0.4);
  thump(realOf(sn), 0.2, 70, -0.2); noise(realOf(sn), 0.12, 0.06, -0.2, 0.1, (p) => Math.exp(-p * 6));
  boing(realOf(sn) + 0.03, 180 + k * 30, 0.05);
});
// try 3: a longer, higher creak, a grab squelch
creak(realOf(T_A3 + 0.1), rTear, 140, 420, 0.03);
noise(realOf(T_GRAB), 0.12, 0.05, -0.2, 0.15, (p) => Math.sin(Math.PI * p));
// the TEAR (slow motion): wet pop, deep boom, splats
noise(rTear, 0.08, 0.2, 0, 0.7, (p) => 1 - p);
thump(rTear, 0.32, 48, 0); tone(rTear, hz(33), 1.4, 0.05, 0, 0.03, 1.5);
[0.35, 0.5, 0.62].forEach((d, i) => { noise(rTear + d, 0.05, 0.05, (i - 1) * 0.3, 0.3, (p) => Math.exp(-p * 5)); thump(rTear + d, 0.04, 120, (i - 1) * 0.3); });
// sits there: long tired sigh
noise(realOf(T_UPR + 0.4), 1.0, 0.035, 0, 0.06, (p) => Math.sin(Math.PI * p) * (1 - p * 0.5));
// last lines
[11.0, 11.2].forEach((t, i) => thump(t, i === 1 ? 0.09 : 0.05, i === 1 ? 52 : 70, 0));
[12.0, 12.15, 12.3, 12.5].forEach((t, i) => { thump(t, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.5, 76, 0.02, 0, 1.2); bell(12.55, 83, 0.015, 0, 1.2);

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
