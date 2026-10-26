// Music bed + SFX from code for "the bridge" (relationship). Writes assets/audio/mix.wav.
// Cycle timings mirror makeBuilder() in index.html. Pan: by where the sound happens on screen.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 14, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 53;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - pan) * 0.7071;
  R[i] += v * (1 + pan) * 0.7071;
};
const LE = 300, RE = 1121, W = (RE - LE) / 14;
const panX = (x) => clamp((x - 710) / 600, -0.7, 0.7);

// ---- bed: warm pad (C - G - Am - F), wind in the gap, quieter at the punchline ----
const chords = [[48, 55, 60, 64], [43, 55, 59, 62], [45, 57, 60, 64], [41, 53, 57, 60]];
{
  let lp = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const c = Math.min(3, Math.floor(t / 2.6));
    const g = Math.min(1, t / 1.0) * (1 - 0.55 * smooth(t, 10.6, 11.6));
    let v = 0;
    for (const m of chords[c]) {
      const f = hz(m);
      v += (Math.sin(2 * Math.PI * f * t) + 0.22 * Math.sin(4 * Math.PI * f * t)) * 0.013 * Math.min(1, (t - c * 2.6) / 0.5);
    }
    lp += (rnd() - lp) * 0.01;
    add(i, v * g + lp * 0.12 * (0.6 + 0.4 * Math.sin(t * 0.8)), Math.sin(t * 0.3) * 0.3);
  }
}

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
function thump(t, gain, f0 = 60, pan = 0) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.4; i++) {
    const tt = i / SR, f = f0 * (1 + Math.exp(-tt * 30));
    add(s0 + i, Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 10) * gain, pan);
  }
}
function wood(t, gain, pan) { // hollow plank knock
  for (const [f, d, a] of [[210, 22, 1], [430, 30, 0.6], [780, 45, 0.3]]) tone(t, f, 0.3, gain * a, pan, 0.001, d);
  noise(t, 0.02, gain * 0.6, pan, 0.6, (p) => 1 - p);
}
const step = (t, gain, pan) => { tone(t, 150, 0.12, gain, pan, 0.001, 40); noise(t, 0.05, gain * 0.5, pan, 0.25, (p) => Math.exp(-p * 5)); };
const click = (t, gain, pan) => { noise(t, 0.006, gain, pan, 0.9, (p) => 1 - p); tone(t + 0.004, 1800, 0.03, gain * 0.4, pan, 0.001, 120); };
function bell(t, m, gain, pan = 0, decay = 1.7) {
  const f = hz(m), s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 2.4; i++) {
    const tt = i / SR;
    add(s0 + i, (Math.sin(2 * Math.PI * f * tt) + 0.3 * Math.sin(2 * Math.PI * f * 2.01 * tt)) * Math.exp(-tt * decay) * gain, pan);
  }
}
function builder(f, e0, start, durs, gain, pan0) {
  let T = start;
  durs.forEach((D, k) => {
    const e = e0 + f * W * k, p = pan0 !== undefined ? pan0 : panX(e);
    noise(T + 0.05 * D, 0.22 * D, gain * 0.25, p, 0.08); // crouch swish
    wood(T + 0.52 * D, gain, p); // plank lands
    step(T + 0.75 * D, gain * 0.7, p);
    step(T + 0.96 * D, gain * 0.6, p);
    T += D;
  });
}

// ---- top: both build (top half a bit left in the stereo field) ----
builder(1, LE, 0.6, Array(7).fill(0.92), 0.16, -0.25);
builder(-1, RE, 0.75, Array(7).fill(0.92), 0.14, 0.05);
step(7.45, 0.1, -0.1);
step(7.55, 0.1, 0.0);
thump(7.95, 0.2, 55, -0.1); // heartbeat in the hug
thump(8.18, 0.15, 55, -0.1);
bell(8.05, 72, 0.05, -0.1);
bell(8.35, 76, 0.045, -0.1);
bell(8.65, 79, 0.04, -0.1);

// ---- bottom: she builds alone, slower each time; he scrolls ----
builder(-1, RE, 0.6, [0.95, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.3], 0.15, 0.3);
for (let t = 1.0; t < 13; t += 0.5) click(t, 0.05, 0.35);
noise(9.4, 1.4, 0.12, 0.3, 0.02); // wind through the gap when she reaches out
thump(11.55, 0.16, 50, 0.3); // sits down
tone(11.7, hz(57), 2.0, 0.045, 0.3, 0.01, 1.3); // lonely low note

// ---- punchline ----
for (let c = 0; c < 22; c++) noise(10.9 + c / 28, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 17; c++) noise(11.9 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));

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
reverb(L, [43, 61, 79, 97], 0.6, 0.32);
reverb(R, [47, 67, 83, 101], 0.6, 0.32);

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
