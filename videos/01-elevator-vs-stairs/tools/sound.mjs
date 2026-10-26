// Music bed + SFX from code for "elevator vs stairs". Writes assets/audio/mix.wav.
// Timings mirror the constants in index.html.
import fs from "node:fs";
import path from "node:path";

const SR = 48000, DUR = 13, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
const T0 = 0.85, MD = 0.84, NM = 9;

let seed = 11;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - pan) * 0.5 * 2 * 0.7071;
  R[i] += v * (1 + pan) * 0.5 * 2 * 0.7071;
};

// ---- pad: Am - F - C - G, soft additive tones ----
const chords = [
  [45, 52, 57, 60],
  [41, 48, 53, 57],
  [48, 55, 60, 64],
  [43, 50, 55, 59],
];
const CH = DUR / 4;
for (let c = 0; c < 4; c++) {
  const t0 = c * CH;
  for (const m of chords[c]) {
    for (const det of [-0.06, 0.06]) {
      const f = hz(m + det);
      const s0 = Math.floor(t0 * SR), s1 = Math.min(N, Math.floor((t0 + CH + 0.8) * SR));
      for (let i = s0; i < s1; i++) {
        const t = (i - s0) / SR;
        const env = Math.min(1, t / 1.1) * Math.min(1, Math.max(0, (CH + 0.8 - t) / 0.9));
        const ph = 2 * Math.PI * f * t;
        const v = (Math.sin(ph) + 0.35 * Math.sin(2 * ph) + 0.12 * Math.sin(3 * ph)) * env * 0.028;
        add(i, v, det > 0 ? 0.35 : -0.35);
      }
    }
  }
}

// ---- heartbeat pulse on every stair step ----
function thump(t, gain, f0 = 58) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.45; i++) {
    const tt = i / SR;
    const f = f0 * (1 + 1.2 * Math.exp(-tt * 30));
    add(s0 + i, Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 9) * gain);
  }
}
for (let k = 0; k < NM; k++) thump(T0 + k * MD, 0.22);

// ---- footsteps on stone ----
function step(t, gain) {
  const s0 = Math.floor(t * SR);
  let lp = 0;
  for (let i = 0; i < SR * 0.12; i++) {
    const tt = i / SR;
    lp += (rnd() - lp) * 0.18;
    add(s0 + i, (lp * 0.9 + Math.sin(2 * Math.PI * 140 * tt) * 0.5) * Math.exp(-tt * 45) * gain, 0.4);
  }
}
for (let k = 1; k <= NM; k++) step(T0 + (k - 1) * MD + 0.78 * MD, 0.5);

// ---- elevator button: click + dull beep ----
function press(t) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.16; i++) {
    const tt = i / SR;
    const click = tt < 0.006 ? rnd() * (1 - tt / 0.006) * 0.5 : 0;
    const beep = tt > 0.01 ? Math.sin(2 * Math.PI * 784 * tt) * Math.exp(-(tt - 0.01) * 22) * 0.12 : 0;
    add(s0 + i, click + beep, -0.45);
  }
}
for (const t of [0.6, 3.1, 3.46, 3.82]) press(t);

// ---- elevator floor display ticks (moving away) ----
for (let n = 1; n < 12; n++) {
  const t = 0.9 + n * 1.05;
  if (t > DUR - 0.2) break;
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.05; i++) {
    const tt = i / SR;
    add(s0 + i, Math.sin(2 * Math.PI * 2100 * tt) * Math.exp(-tt * 90) * 0.05, -0.6);
  }
}

// ---- sit down: soft body thud ----
thump(8.25, 0.28, 70);
step(8.27, 0.35);

// ---- riser into the top, then a warm hit ----
{
  const a = 7.6, b = 8.45;
  let lp = 0;
  for (let i = Math.floor(a * SR); i < Math.floor(b * SR); i++) {
    const p = (i / SR - a) / (b - a);
    lp += (rnd() - lp) * (0.02 + 0.25 * p * p);
    add(i, lp * p * p * 0.35, Math.sin(p * 6) * 0.3);
  }
}
thump(TEND(), 0.35, 48);
function TEND() {
  return T0 + NM * MD;
}

// ---- bells at the top (A minor, rising) ----
function bell(t, m, gain) {
  const f = hz(m), s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 2.6; i++) {
    const tt = i / SR;
    const v = (Math.sin(2 * Math.PI * f * tt) + 0.3 * Math.sin(2 * Math.PI * f * 2.01 * tt)) * Math.exp(-tt * 1.6) * gain;
    add(s0 + i, v, ((m % 5) - 2) * 0.15);
  }
}
[[8.45, 69], [8.9, 72], [9.35, 76], [10.3, 74], [10.75, 72], [11.2, 69]].forEach(([t, m]) => bell(t, m, 0.07));

// ---- typewriter ticks for the punchline ----
function ticks(t0, n) {
  for (let c = 0; c < n; c++) {
    const s0 = Math.floor((t0 + c / 30) * SR);
    for (let i = 0; i < SR * 0.012; i++) add(s0 + i, rnd() * Math.exp(-i / SR * 400) * 0.06, 0.1);
  }
}
ticks(8.95, 24);
ticks(10.3, 32);

// ---- simple stereo reverb (feedback combs) ----
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
reverb(L, [43, 61, 79, 97], 0.6, 0.35);
reverb(R, [47, 67, 83, 101], 0.6, 0.35);

// ---- fades, normalize, write 16-bit WAV ----
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = Math.min(1, t / 0.08) * Math.min(1, (DUR - t) / 0.6);
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
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), 46 + i * 4);
}
const out = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..", "assets", "audio", "mix.wav");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buf);
console.log("wrote", out, "peak", peak.toFixed(3));
