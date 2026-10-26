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

// ---- "they laughed": chisel strikes, the crowd laughing, the step breaks, slow-mo fall, silence + heartbeat, the comeback, laughter dies one by one, the catch, the top ----
const SLOWS = [[2.5, 3.6], [9.0, 9.9]], SLOWK = 0.35;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T0 = 0.15, PER = 0.7, T_BREAK = 2.55, T_LAND = 2.95, T_STRIKE = 5.625, T_C2 = 6.2, PER2 = 0.4;
const T_JUMP = 8.25, T_SLIP = 8.45, T_GRAB = 8.6, T_TOP = 9.3, T_F = 9.6;
const STOP = [6.9, 7.5, 6.6, 7.9, 7.2], CXS = [-320, -200, -80, 40, 160], F0 = [190, 150, 235, 170, 210];
const rB = realOf(T_BREAK), rL = realOf(T_LAND), rS = realOf(T_STRIKE), rTop = realOf(T_TOP);

// music: tense pad, near silence while he is down, a driving climb, bright chord at the top
const pad = (t0, t1, ms, g, fi = 0.4, fo = 0.5) => {
  const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR);
  for (let i = 0; i < n; i++) {
    const tt = i / SR, ta = t0 + tt, e = Math.min(1, tt / fi, (t1 - t0 - tt) / fo);
    let v = 0;
    for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * ta) + 0.2 * Math.sin(4 * Math.PI * hz(m) * ta);
    add(s0 + i, v * g * e, 0);
  }
};
pad(0, rB + 0.3, [45, 52, 57], 0.011, 0.6, 0.4);
pad(rB, rL + 0.2, [41, 48, 53], 0.009, 0.2, 0.3);
pad(rL + 0.4, rS, [38, 45], 0.008, 0.8, 0.2);
[64, 62, 60, 57].forEach((m, i) => bell(realOf(4.1) + i * 0.42, m, 0.022, 0, 1.4)); // sad notes while he sits
const CL = [[45, 52, 57], [47, 54, 59], [48, 55, 60], [50, 57, 62]];
for (let k = 0; k < 4; k++) {
  const a = rS + k * 0.62, b = k === 3 ? realOf(T_JUMP) : a + 0.62;
  pad(a, b + 0.05, CL[k], 0.011, 0.05, 0.08);
  for (let p = a; p < b; p += 0.2) thump(p, 0.05, 50, 0); // pulse
}
pad(realOf(T_JUMP), rTop, [41, 48, 53], 0.009, 0.1, 0.1);
tone(realOf(T_JUMP), hz(33), 1.6, 0.06, 0, 0.2, 1.2);
pad(rTop, 14, [50, 57, 62, 66, 69], 0.012, 0.15, 1.5);

// a "ha": breath, then a voiced vowel through two formant filters
const bp = (f, Q) => { const w = (2 * Math.PI * f) / SR, al = Math.sin(w) / (2 * Q), a0 = 1 + al; return [al / a0, -al / a0, (-2 * Math.cos(w)) / a0, (1 - al) / a0]; };
function ha(t, f0, g, pan, cut) {
  noise(t, 0.03, g * 0.25, pan, 0.5 * cut, (p) => 1 - p);
  const s0 = Math.floor((t + 0.02) * SR), n = Math.floor(0.12 * SR);
  const F = [bp(760 * cut, 4), bp(1250 * cut, 5)], st = [[0, 0, 0, 0], [0, 0, 0, 0]];
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const tt = i / SR, f = f0 * (1 - 0.12 * (tt / 0.12));
    ph += f / SR;
    const x = 2 * (ph % 1) - 1;
    let out = 0;
    F.forEach(([b0, b2, a1, a2], j) => { const z = st[j], y = b0 * x + b2 * z[1] - a1 * z[2] - a2 * z[3]; z[1] = z[0]; z[0] = x; z[3] = z[2]; z[2] = y; out += y * (j ? 0.6 : 1); });
    const env = Math.min(1, tt / 0.012) * Math.pow(1 - tt / 0.12, 1.3);
    add(s0 + i, out * g * env, pan);
  }
}
const laugh = (t, f0, n, g, pan, cut = 1, gap = 0.14) => { for (let k = 0; k < n; k++) ha(t + k * gap + 0.012 * rnd(), f0 * (1 - 0.035 * k) * (1 + 0.03 * rnd()), g * (1 - 0.08 * k), pan, cut); };
// laughing runs per crowd member, placed in story time so slow motion stretches them
function laughRun(i, s0, s1, g, gap, cut, pitch) {
  let s = s0 + 0.05 * i;
  while (s < s1) {
    const n = 4 + ((i + Math.floor(s * 3)) % 3);
    laugh(realOf(s), F0[i] * pitch, n, g, panX(CXS[i]), cut, gap);
    s += n * gap + 0.12 + 0.08 * ((i * 7 + Math.floor(s * 5)) % 3);
  }
}
for (let i = 0; i < 5; i++) {
  laughRun(i, 0.65, 2.45, 0.05, 0.14, 1, 1);
  laughRun(i, T_LAND + 0.03, 3.95, 0.07, 0.11, 1.05, 1.15); // the fall: hardest
  laughRun(i, 4.2, 5.55, 0.02, 0.15, 0.55, 1); // muffled while he is down
  laughRun(i, 5.85, STOP[i], 0.045, 0.14, 1, 1); // laughing again, then each goes quiet
  laugh(realOf(STOP[i]), F0[i], 2, 0.03, panX(CXS[i]), 0.9, 0.18);
}

// chisel strikes: grey on the first climb, bright and heavy on the second
const chisel = (t, g, pan) => { tone(t, 2300 + 300 * rnd(), 0.18, g, pan, 0.001, 35); tone(t, 3900, 0.1, g * 0.4, pan, 0.001, 60); noise(t, 0.04, g * 0.9, pan, 0.7, (p) => 1 - p); };
const pebbles = (t, pan, n = 4) => { for (let i = 0; i < n; i++) click(t + 0.1 + i * 0.07 + 0.03 * rnd(), 0.025, pan); };
const pan0 = panX(520);
for (let k = 0; k < 4; k++) for (const o of [0.0825, 0.3575]) { const t = realOf(T0 + k * PER + PER * o); chisel(t, 0.06, pan0); pebbles(t, pan0, 3); }
for (let k = 0; k < 3; k++) { step(realOf(T0 + k * PER + PER * 0.72), 0.05, pan0); tone(realOf(T0 + k * PER + PER * 0.75), hz([55, 57, 59][k]), 0.7, 0.018, 0, 0.02, 3); }
// the break: snap, rumble, the long slow fall, the landing
noise(rB, 0.06, 0.15, pan0, 0.9, (p) => 1 - p); thump(rB, 0.16, 40, pan0); pebbles(rB, pan0, 8);
sweep(rB + 0.05, rL - rB, 0.07, panX(480), 0.02, 0.18);
tone(rB, hz(40), rL - rB + 0.3, 0.05, 0, 0.1, 1.5);
thump(rL, 0.34, 34, panX(450)); thump(rL + 0.03, 0.18, 52, panX(450)); noise(rL, 0.9, 0.14, panX(450), 0.12, (p) => Math.exp(-p * 4));
pebbles(rL + 0.05, panX(500), 6);
tone(rL + 0.1, 3100, 1.8, 0.008, 0, 0.3, 1.2); // ringing ears
// he is down: heartbeat, then he looks up and clenches his fist
for (const s of [4.15, 4.7, 5.2]) { const t = realOf(s); thump(t, 0.13, 46, 0); thump(t + 0.2, 0.09, 42, 0); }
{
  const t0 = realOf(4.9), n = Math.floor((rS - t0) * SR), s0 = Math.floor(t0 * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) { const p = i / n; ph += hz(38 + 12 * p) / SR; add(s0 + i, Math.sin(2 * Math.PI * ph) * 0.05 * p * p, 0); }
}
sweep(rS - 0.35, 0.35, 0.06, pan0, 0.05, 0.5);
// the comeback strike
thump(rS, 0.32, 44, pan0); chisel(rS, 0.12, pan0); noise(rS, 0.4, 0.1, pan0, 0.3, (p) => Math.exp(-p * 6)); pebbles(rS, pan0, 6);
step(realOf(5.85), 0.06, pan0); step(realOf(6.1), 0.06, pan0);
// power climb: heavy strikes and a rising note per new step
const SC2 = [59, 60, 62, 64, 66];
for (let k = 2; k < 7; k++) {
  for (const o of [0.0825, 0.3575]) { const t = realOf(T_C2 + (k - 2) * PER2 + PER2 * o); chisel(t, 0.08, pan0); thump(t, 0.08, 60, pan0); pebbles(t, pan0, 3); }
  const tu = realOf(T_C2 + (k - 2) * PER2 + PER2 * 0.75);
  step(tu, 0.06, pan0); tone(tu, hz(SC2[k - 2]), 0.6, 0.022, 0, 0.01, 3);
}
// the leap, the slip, the catch, the pull
sweep(realOf(T_JUMP), 0.5, 0.08, pan0, 0.04, 0.4); noise(realOf(T_JUMP), 0.05, 0.08, pan0, 0.8, (p) => 1 - p); pebbles(realOf(T_JUMP), pan0, 6);
{
  const t = realOf(T_SLIP), n = Math.floor((realOf(T_GRAB) - t) * SR), s0 = Math.floor(t * SR);
  let lp = 0;
  for (let i = 0; i < n; i++) { lp += (rnd() - lp) * 0.4; add(s0 + i, lp * 0.06 * (1 - i / n), pan0); }
}
pebbles(realOf(T_SLIP), pan0, 7);
thump(realOf(T_GRAB), 0.2, 54, pan0); noise(realOf(T_GRAB), 0.12, 0.08, pan0, 0.5, (p) => 1 - p);
thump(realOf(8.75), 0.1, 50, pan0);
{
  const t = realOf(8.8), n = Math.floor((rTop - t) * SR), s0 = Math.floor(t * SR);
  let lp = 0;
  for (let i = 0; i < n; i++) { lp += (rnd() - lp) * 0.06; add(s0 + i, lp * 0.05 * Math.sin((Math.PI * i) / n), pan0); }
}
// the top: boom, light, bells
thump(rTop, 0.3, 36, 0); noise(rTop, 1.4, 0.08, 0, 0.08, (p) => Math.exp(-p * 3));
[62, 66, 69, 74, 78, 81].forEach((m, i) => bell(rTop + 0.1 + i * 0.12, m, 0.03, 0.2, 1.4));
step(realOf(9.9), 0.05, panX(620));
// the one who follows
for (let k = 0; k < 6; k++) step(realOf(T_F + 0.45 + k * 0.12), 0.045, panX(200 + k * 60));
// last lines
[11.5, 11.72].forEach((t, i) => thump(t, i ? 0.13 : 0.07, i ? 50 : 70, 0));
[12.35, 12.52, 12.75].forEach((t, i) => { thump(t, i === 2 ? 0.12 : 0.06, i === 2 ? 48 : 70, 0); click(t, 0.05, 0); });

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
