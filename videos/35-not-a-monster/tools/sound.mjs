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

// ---- "not a monster": heavy steps, crowd gasp, a kid's run and fall, the ball bouncing, a spike clinks off, the rope snaps, sprint, leap, CATCH in slow motion, silence while he walks away, a light chord when the kid takes his hand, steps of the crowd coming ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[4.7, 5.7]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_IN = 0.1, T_FLINCH = 0.65, T_KIDRUN = 1.0, T_TRIP = 1.55, T_BALLSTOP = 2.05, T_PICK = 2.2, T_WALK = 2.45, T_KNEEL = 3.0, T_TAKE = 3.4;
const T_SNAP = 4.15, T_SPRINT = 4.25, T_JUMP = 4.62, T_CATCH = 4.85, T_LAND = 5.25, T_SET = 5.9, T_TURN = 6.45, T_AWAY = 6.6;
const T_KIDGO = 7.2, T_HAND = 7.9, T_LIGHT = 8.2, T_CROWD = 8.6;
const SPIKES = [3.5, 4.95, 5.0, 8.22, 8.26, 8.3, 8.32, 8.36];
const rC = realOf(T_CATCH), rL = realOf(T_LIGHT);

// dark low bed, a little lighter with each deed, empty while he walks away, warm at the end
bed([[0, [38, 45, 48]], [realOf(3.5), [40, 47, 50]], [realOf(T_SNAP), [41, 48, 51]], [rC, [43, 50, 55]], [realOf(T_AWAY), [38, 45]], [rL, [48, 55, 59, 64]], [realOf(10.3), [53, 57, 60, 64]]], 10.6, 38);
// his heavy steps
for (let k = 0; k < 5; k++) { thump(realOf(T_IN + 0.15 + k * 0.17), 0.08, 50, -0.4); }
// crowd gasp
noise(realOf(T_FLINCH), 0.35, 0.06, 0.5, 0.5, (p) => Math.sin(Math.PI * p) * (1 - p));
tone(realOf(T_FLINCH), 330, 0.2, 0.015, 0.5, 0.01, 10); tone(realOf(T_FLINCH) + 0.03, 400, 0.2, 0.012, 0.5, 0.01, 10);
// kid runs and falls
for (let k = 0; k < 4; k++) step(realOf(T_KIDRUN + 0.08 + k * 0.12), 0.03, 0.4 - k * 0.1);
thump(realOf(T_TRIP + 0.15), 0.12, 70, 0); noise(realOf(T_TRIP + 0.15), 0.2, 0.05, 0, 0.3, (p) => 1 - p);
// ball bounces
[0, 0.18, 0.32, 0.42].forEach((d, i) => { const t = realOf(T_TRIP + 0.05) + d; tone(t, 220 + i * 20, 0.08, 0.03 * (1 - i * 0.2), -0.2, 0.001, 30); });
// he picks it up, walks, kneels
for (let k = 0; k < 3; k++) thump(realOf(T_WALK + 0.1 + k * 0.18), 0.06, 55, -0.2);
// spikes clink off
SPIKES.forEach((s, i) => { const t = realOf(s); tone(t, hz(86 + (i % 3) * 2), 0.4, 0.02, 0, 0.001, 9); click(realOf(s + 0.35), 0.03, 0.1 * (i % 3 - 1)); });
bell(realOf(3.5), 76, 0.02, 0, 1.2);
// rope snaps, sprint, leap, catch
noise(realOf(T_SNAP), 0.05, 0.12, 0.4, 0.9, (p) => 1 - p); tone(realOf(T_SNAP), 900, 0.08, 0.03, 0.4, 0.001, 40);
for (let k = 0; k < 3; k++) step(realOf(T_SPRINT + 0.05 + k * 0.12), 0.06, -0.1 + k * 0.15);
sweep(realOf(T_JUMP) - 0.05, rC - realOf(T_JUMP) + 0.1, 0.08, 0.3, 0.03, 0.35);
thump(rC, 0.36, 38, 0.3); wood(rC, 0.1, 0.3); noise(rC, 0.6, 0.08, 0.3, 0.12, (p) => Math.exp(-p * 4));
tone(rC, hz(33), 1.6, 0.05, 0, 0.03, 1.2);
thump(realOf(T_LAND), 0.2, 45, 0.3); noise(realOf(T_LAND), 0.4, 0.06, 0.3, 0.1, (p) => Math.exp(-p * 4));
wood(realOf(T_SET), 0.07, 0.3);
// he walks away: slow steps in silence, a heartbeat
for (let k = 0; k < 5; k++) thump(realOf(T_AWAY + 0.15 + k * 0.24), 0.05, 50, 0.2 - k * 0.1);
[7.0, 7.5].forEach((s) => { thump(realOf(s), 0.1, 48, 0); thump(realOf(s) + 0.16, 0.07, 44, 0); });
// the kid runs, takes his hand: light chord
for (let k = 0; k < 4; k++) step(realOf(T_KIDGO + 0.25 + k * 0.12), 0.03, 0.2 - k * 0.1);
[[0, 64], [0.06, 71], [0.12, 76], [0.18, 79], [0.26, 83]].forEach(([d, m]) => bell(rL + d, m, 0.025, 0, 1.6));
sweep(rL - 0.2, 0.6, 0.04, 0, 0.02, 0.2);
// the crowd walks over
for (let i = 0; i < 3; i++) for (let k = 0; k < 4; k++) step(realOf(T_CROWD + i * 0.25 + 0.1 + k * 0.2), 0.03, 0.5 - i * 0.1);
// last lines
[10.9, 11.06, 11.24].forEach((t, i) => thump(t, i === 2 ? 0.09 : 0.05, i === 2 ? 52 : 70, 0));
[12.0, 12.14, 12.28, 12.5].forEach((t, i) => { thump(t, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(t, 0.04, 0); });
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
