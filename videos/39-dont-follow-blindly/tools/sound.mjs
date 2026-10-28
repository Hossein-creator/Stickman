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

// ---- "don't follow blindly": marching feet, wind from the drop, far screams, cloth pull, heartbeat, the push (strain + skidding), his fall in slow motion ----
const EDGE = 560, V = 120, GAP = 100, VP = 36, XH = 375, T_STOP = 1.9;
const T_PULL = 2.4, T_BAND = 2.95, T_LOOK = 3.0, T_TURN = 3.35, T_CONTACT = T_STOP + (340 - GAP) / V;
const T_SLIP = T_CONTACT + (EDGE - 62 - XH) / VP, T_FALL = T_SLIP + 0.32;
const SLOWS = [[T_SLIP - 0.05, T_FALL + 0.9]], SLOWK = 0.35;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const rFall = realOf(T_FALL);

// dark pad, wind from the drop on the right
bed([[0, [38, 45, 50]], [realOf(T_LOOK), [37, 44, 49]], [realOf(T_CONTACT), [36, 43, 48, 51]], [rFall, [31, 38]]], DUR - 1.4, 41);
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.008; add(i, lp * 0.1 * (0.7 + 0.3 * Math.sin(t * 0.8)), 0.5); } }
// marching: soft footfalls from the whole crowd, never stopping
for (let t = 0.05, k = 0; t < DUR - 0.5; t += 0.135 + 0.05 * ((k * 7) % 3) / 3, k++) {
  const g = (k % 4 === 0 ? 0.07 : 0.035) * (t > rFall - 0.3 && t < rFall + 1.2 ? 0.4 : 1);
  step(t, g, -0.6 + ((k * 13) % 12) / 10);
}
// far screams falling away (descending)
function scream(t, f0, gain, pan) {
  const s0 = Math.floor(t * SR), n = Math.floor(1.1 * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 - 0.55 * p) + 6 * Math.sin(i / SR * 38); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.3 * Math.sin(ph * 2.01)) * Math.sin(Math.PI * Math.min(1, p * 4)) * (1 - p) * gain, pan); }
}
for (let t = 0.3, k = 0; t < DUR - 1.2; t += 0.75 + 0.35 * ((k * 5) % 3) / 2, k++) scream(t, 520 + ((k * 97) % 260), k % 3 === 0 ? 0.018 : 0.009, 0.5 + ((k * 3) % 4) / 10);
// the blindfold comes off: cloth rustle, it drops
noise(realOf(T_PULL), 0.35, 0.05, 0, 0.35, (p) => Math.sin(Math.PI * p));
noise(realOf(T_BAND + 0.35), 0.05, 0.03, 0, 0.3, (p) => 1 - p);
// he sees it: sting + heartbeat
tone(realOf(T_LOOK), hz(40), 1.2, 0.05, 0, 0.01, 1.8);
bell(realOf(T_LOOK), 63, 0.015, 0.2, 1.2);
[T_LOOK + 0.3, T_LOOK + 1.0, T_TURN + 1.3, T_TURN + 2.0].forEach((s) => { thump(realOf(s), 0.12, 46, 0); thump(realOf(s) + 0.17, 0.08, 42, 0); });
// "stop!": a shout
tone(realOf(T_TURN + 0.05), 210, 0.35, 0.04, -0.1, 0.01, 5); tone(realOf(T_TURN + 0.05), 315, 0.3, 0.015, -0.1, 0.01, 6);
// contact + the push: thud, strain grunts, feet skidding the whole time
thump(realOf(T_CONTACT), 0.18, 70, -0.1);
for (let s = T_CONTACT + 0.3; s < T_SLIP; s += 0.55) tone(realOf(s), 130 + 20 * Math.sin(s * 3), 0.3, 0.025, -0.1, 0.03, 5);
noise(realOf(T_CONTACT + 0.2), realOf(T_SLIP) - realOf(T_CONTACT + 0.2), 0.035, 0.1, 0.12, (p) => Math.min(1, p * 8) * (0.7 + 0.3 * Math.sin(p * 60)));
// slip: scrape, whoosh, slow-motion boom, his long fall
noise(realOf(T_SLIP), 0.25, 0.08, 0.2, 0.5, (p) => Math.exp(-p * 4));
sweep(rFall - 0.1, 1.2, 0.1, 0.3, 0.02, 0.35);
thump(rFall, 0.3, 40, 0); tone(rFall, hz(29), 2.2, 0.05, 0, 0.03, 1.1);
scream(rFall + 0.05, 420, 0.03, 0.3);
// last line
const h2 = [0, 1, 2, 3, 4].map((i) => rFall + 0.15 + i * 0.16);
[2.7, 2.85, 3.0].forEach((t, i) => thump(t, i === 2 ? 0.09 : 0.05, i === 2 ? 52 : 70, 0));
h2.forEach((t, i) => { thump(t, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(t, 0.04, 0); });
// end card: message words, quote chime
[11.6, 11.75, 11.9].forEach((t, i) => thump(t, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[12.3, 12.42, 12.54, 12.66, 12.8].forEach((t, i) => { thump(t, i === 4 ? 0.13 : 0.05, i === 4 ? 44 : 70, 0); click(t, 0.04, 0); });
bell(13.3, 69, 0.02, 0, 1.0); bell(13.36, 76, 0.015, 0, 1.0);

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
