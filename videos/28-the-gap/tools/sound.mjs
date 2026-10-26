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

// ---- "the gap": angry muffled fight, the crack, stone grinding while they walk away, silence, heartbeat, leap, catch, slam ----
const SLOW0 = 6.45, SLOW1 = 7.95, SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => 1 - (1 - SLOWK) * wn(t, SLOW0, SLOW0 + 0.1) * (1 - wn(t, SLOW1 - 0.3, SLOW1));
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const tCrack = realOf(1.55), tJump = realOf(6.5), tCatch = realOf(6.85), tSlam = realOf(8.95);

bed([[0, [45, 52, 56]], [tCrack, [41, 48, 53]], [4.6, [43, 50, 55, 58]], [5.6, [45, 52, 57]], [tCatch, [47, 54, 59, 62]], [tSlam, [50, 57, 62, 66, 69]], [11.4, [50, 57, 62, 66]]], 99, 40);
// the fight: muffled angry "voices" (square-ish blips, no words), one per burst
const yell = (t, m, pan) => { const s0 = Math.floor(t * SR); let lp = 0; for (let i = 0; i < SR * 0.26; i++) { const tt = i / SR, f = hz(m) * (1 + 0.15 * Math.sin(tt * 40)); const v = Math.sign(Math.sin(2 * Math.PI * f * tt)) * Math.sin(Math.PI * tt / 0.26); lp += (v - lp) * 0.08; add(s0 + i, lp * 0.05, pan); } };
[[0.12, 64, -0.3], [0.42, 52, 0.3], [0.7, 66, -0.3], [0.95, 50, 0.3], [1.2, 67, -0.3], [1.4, 49, 0.3]].forEach(([t, m, p]) => { yell(t, m, p); yell(t + 0.12, m + 2, p); thump(t, 0.05, 70, p); });
// the crack: snap + rumble, then stone grinding while the gap grows
noise(tCrack, 0.06, 0.16, 0, 0.9, (p) => 1 - p); thump(tCrack, 0.2, 38, 0); noise(tCrack, 1.2, 0.1, 0, 0.06, (p) => Math.exp(-p * 3));
{ const s0 = Math.floor((tCrack + 0.2) * SR), n = Math.floor(2.9 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.03; add(s0 + i, lp * 0.07 * Math.sin(Math.PI * p) * (0.7 + 0.3 * Math.sin(i / SR * 37)), 0); } }
for (let i = 0; i < 10; i++) click(tCrack + 0.1 + i * 0.14, 0.03, 0.3 * rnd()); // pebbles
// walking away: slow steps on both sides
for (const t of [1.9, 2.5, 3.1]) { step(t, 0.05, -0.4); step(t + 0.1, 0.05, 0.4); }
for (const t of [3.8, 4.4]) step(t, 0.05, 0.5);
// she turns: near silence, one heartbeat; he turns: heartbeat again
thump(4.75, 0.08, 46, -0.3); thump(4.95, 0.06, 42, -0.3);
thump(5.35, 0.09, 46, 0.3); thump(5.55, 0.07, 42, 0.3);
// the sprint
for (let i = 0; i < 6; i++) step(5.65 + i * 0.15, 0.08, 0.3 - i * 0.05);
sweep(5.6, 0.9, 0.06, 0, 0.05, 0.4);
// leap (slow motion): low whoosh, he slams into the edge, she grabs him
sweep(tJump, 0.9, 0.08, 0, 0.02, 0.2);
tone(tJump, hz(36), 2.0, 0.06, 0, 0.2, 1.0);
thump(tCatch, 0.16, 54, -0.1); noise(tCatch, 0.15, 0.06, -0.1, 0.4, (p) => 1 - p);
for (let i = 0; i < 6; i++) click(tCatch + 0.05 + i * 0.1, 0.03, -0.1);
thump(tCatch + 0.5, 0.1, 46, 0); thump(tCatch + 0.75, 0.08, 42, 0);
// the pull: straining stone scrape
{ const s0 = Math.floor((tCatch + 0.4) * SR), n = Math.floor(1.6 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.08; add(s0 + i, lp * 0.03 * Math.sin(Math.PI * p), -0.1); } }
// the ground slams shut, gold seam rings
thump(tSlam, 0.3, 36, 0); thump(tSlam + 0.04, 0.16, 30, 0);
noise(tSlam, 1.6, 0.13, 0, 0.1, (p) => Math.exp(-p * 3));
[64, 69, 73, 76, 81].forEach((m, i) => bell(tSlam + 0.2 + i * 0.13, m, 0.035, 0, 1.0));
// last line
[11.5, 11.68, 11.9].forEach((t, i) => thump(t, i === 2 ? 0.13 : 0.06, i === 2 ? 50 : 70, 0));
[12.4, 12.55, 12.7, 12.9].forEach((t) => { thump(t, 0.06, 70, 0); click(t, 0.05, 0); });

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
