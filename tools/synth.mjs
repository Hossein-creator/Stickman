// Tiny offline synth: every sound is generated from code and mixed into a stereo WAV.
import { writeFileSync } from "node:fs";

export const SR = 44100;
const TAU = Math.PI * 2;

export function createMix(dur) {
  const n = Math.ceil(dur * SR);
  return { L: new Float32Array(n), R: new Float32Array(n), n, dur };
}

function noise(seed) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) / 4294967296) * 2 - 1; };
}
const panGains = (p) => [Math.cos((p + 1) * Math.PI / 4), Math.sin((p + 1) * Math.PI / 4)];

function put(m, i, v, pan) {
  if (i < 0 || i >= m.n) return;
  const [gl, gr] = panGains(pan);
  m.L[i] += v * gl; m.R[i] += v * gr;
}
// attack / release envelope; dur is the full length
function env(tt, dur, a, r) {
  if (tt < 0 || tt > dur) return 0;
  if (tt < a) return tt / a;
  if (tt > dur - r) return Math.max(0, (dur - tt) / r);
  return 1;
}

// sine / triangle / saw voice with optional pitch glide
export function tone(m, o) {
  const { t, dur, freq, gain = 0.2, attack = 0.01, release = 0.1, pan = 0, type = "sine", freqEnd = freq, decay = 0 } = o;
  const i0 = Math.floor(t * SR), len = Math.floor(dur * SR);
  let ph = 0;
  for (let k = 0; k < len; k++) {
    const tt = k / SR, f = freq * Math.pow(freqEnd / freq, tt / dur);
    ph += f / SR;
    const x = ph % 1;
    const w = type === "sine" ? Math.sin(TAU * x) : type === "tri" ? 1 - 4 * Math.abs(x - 0.5) : 2 * x - 1;
    const d = decay ? Math.exp(-tt * decay) : 1;
    put(m, i0 + k, w * gain * env(tt, dur, attack, release) * d, pan);
  }
}

// soft piano-ish note: decaying harmonics with a gentle attack
export function piano(m, o) {
  const { t, freq, gain = 0.16, dur = 3, pan = 0 } = o;
  const i0 = Math.floor(t * SR), len = Math.floor(dur * SR);
  const parts = [[1, 1, 1.6], [2, 0.42, 2.6], [3, 0.2, 3.8], [4, 0.11, 5], [5, 0.05, 6.5]];
  for (let k = 0; k < len; k++) {
    const tt = k / SR;
    let v = 0;
    for (const [h, a, d] of parts) v += Math.sin(TAU * freq * h * tt * (1 + 0.0007 * h)) * a * Math.exp(-tt * d);
    const att = Math.min(1, tt / 0.006), rel = Math.min(1, (dur - tt) / 0.3);
    put(m, i0 + k, v * gain * att * rel, pan);
  }
}

// detuned saw pad through a one-pole lowpass
export function pad(m, o) {
  const { t, dur, freqs, gain = 0.06, attack = 1, release = 1.2, cutoff = 900, pan = 0 } = o;
  const i0 = Math.floor(t * SR), len = Math.floor(dur * SR);
  const voices = [];
  freqs.forEach((f, i) => [-1, 0, 1].forEach((d) => voices.push({ f: f * (1 + d * 0.004), ph: (i * 0.37 + d * 0.21) % 1 })));
  const a = 1 - Math.exp(-TAU * cutoff / SR);
  let yl = 0, yr = 0;
  for (let k = 0; k < len; k++) {
    let l = 0, r = 0;
    voices.forEach((v, vi) => { v.ph = (v.ph + v.f / SR) % 1; const s = 2 * v.ph - 1; if (vi % 2) l += s; else r += s; });
    yl += a * (l - yl); yr += a * (r - yr);
    const e = env(k / SR, dur, attack, release) * gain / Math.sqrt(voices.length);
    const [gl, gr] = panGains(pan);
    const i = i0 + k;
    if (i >= 0 && i < m.n) { m.L[i] += yl * e * gl * 1.4; m.R[i] += yr * e * gr * 1.4; }
  }
}

// kick / impact: falling sine plus a click
export function kick(m, o) {
  const { t, gain = 0.6, f0 = 120, f1 = 42, dur = 0.5, click = 0.25, pan = 0 } = o;
  const i0 = Math.floor(t * SR), len = Math.floor(dur * SR), rnd = noise(Math.floor(t * 1000) + 3);
  let ph = 0;
  for (let k = 0; k < len; k++) {
    const tt = k / SR, f = f1 + (f0 - f1) * Math.exp(-tt * 22);
    ph += f / SR;
    const v = Math.sin(TAU * ph) * Math.exp(-tt * (5 / dur)) + rnd() * click * Math.exp(-tt * 260);
    put(m, i0 + k, v * gain, pan);
  }
}

// filtered noise burst (state-variable filter), cutoff can sweep from -> to
export function noiseHit(m, o) {
  const { t, dur, gain = 0.2, from = 2000, to = from, q = 0.7, mode = "band", attack = 0.005, release = dur * 0.8, pan = 0, seed = 1, curve = null } = o;
  const i0 = Math.floor(t * SR), len = Math.floor(dur * SR), rnd = noise(seed + Math.floor(t * 997));
  let low = 0, band = 0;
  for (let k = 0; k < len; k++) {
    const tt = k / SR, fc = from * Math.pow(to / from, tt / dur);
    const f = 2 * Math.sin(Math.PI * Math.min(fc, SR / 6) / SR);
    const x = rnd();
    low += f * band; const high = x - low - q * band; band += f * high;
    const y = mode === "low" ? low : mode === "high" ? high : band;
    const e = curve ? curve(tt / dur) : env(tt, dur, attack, release);
    put(m, i0 + k, y * gain * e, pan);
  }
}

export function whoosh(m, o) {
  noiseHit(m, { mode: "band", q: 0.5, curve: (k) => Math.sin(Math.PI * Math.pow(k, 0.7)), ...o });
}

// continuous rain bed; level(t) gives the loudness over time
export function rain(m, o) {
  const { t0 = 0, t1 = m.dur, gain = 0.2, level = () => 1, seed = 9 } = o;
  for (const [ch, sd, pan] of [[0, seed, -0.7], [1, seed + 50, 0.7]]) {
    const rnd = noise(sd);
    let low = 0, band = 0, lp = 0;
    const f = 2 * Math.sin(Math.PI * 3200 / SR);
    for (let i = Math.floor(t0 * SR); i < Math.floor(t1 * SR) && i < m.n; i++) {
      const x = rnd();
      low += f * band; const high = x - low - 0.9 * band; band += f * high;
      lp += 0.05 * (x - lp);
      let v = band * 0.55 + lp * 0.9;
      if (rnd() > 0.9993) v += rnd() * 2.5; // individual drops
      const g = gain * level(i / SR);
      if (ch === 0) m.L[i] += v * g; else m.R[i] += v * g;
    }
  }
}

export function thunder(m, o) {
  const { t, gain = 0.5 } = o;
  noiseHit(m, { t, dur: 0.35, gain: gain * 0.9, from: 6000, to: 1500, mode: "band", q: 0.4, attack: 0.002, release: 0.3, seed: 31 });
  noiseHit(m, { t: t + 0.05, dur: 3.6, gain: gain * 2.2, from: 220, to: 70, mode: "low", q: 0.3, seed: 32, curve: (k) => Math.pow(1 - k, 2) * (0.7 + 0.3 * Math.sin(k * 40)) * Math.min(1, k * 30) });
}

export function heartbeat(m, o) {
  const { t, gain = 0.5 } = o;
  kick(m, { t, gain, f0: 75, f1: 38, dur: 0.32, click: 0.03 });
  kick(m, { t: t + 0.19, gain: gain * 0.75, f0: 70, f1: 36, dur: 0.3, click: 0.02 });
}

export function riser(m, o) {
  const { t, dur, gain = 0.15 } = o;
  noiseHit(m, { t, dur, gain, from: 300, to: 7000, mode: "band", q: 0.35, curve: (k) => Math.pow(k, 2.2), seed: 41 });
  tone(m, { t, dur, freq: 110, freqEnd: 880, gain: gain * 0.35, type: "saw", attack: dur * 0.9, release: 0.02 });
}

export function tick(m, o) {
  const { t, gain = 0.08, freq = 2400, pan = 0 } = o;
  tone(m, { t, dur: 0.03, freq, gain, attack: 0.001, release: 0.025, pan });
}

export function applause(m, o) {
  const { t, dur, gain = 0.25, seed = 5, rate = 70 } = o;
  const rnd = noise(seed);
  const count = Math.floor(dur * rate);
  for (let i = 0; i < count; i++) {
    const at = t + ((rnd() + 1) / 2) * dur;
    const k = (at - t) / dur;
    const shape = Math.min(1, k * 5) * Math.pow(1 - k, 0.8);
    noiseHit(m, { t: at, dur: 0.03, gain: gain * shape * (0.5 + 0.5 * Math.abs(rnd())), from: 1100 + 900 * Math.abs(rnd()), mode: "band", q: 0.8, attack: 0.001, release: 0.026, pan: rnd() * 0.8, seed: i + 7 });
  }
}

// light Schroeder reverb over the whole mix
export function reverb(m, wet = 0.18) {
  const combs = [1557, 1617, 1491, 1422], aps = [225, 556];
  for (const [ch, off] of [[m.L, 0], [m.R, 23]]) {
    const dry = ch.slice(), out = new Float32Array(m.n);
    for (const c of combs) {
      const d = c + off, buf = new Float32Array(d); let idx = 0, lp = 0;
      for (let i = 0; i < m.n; i++) { const y = buf[idx]; lp = y * 0.7 + lp * 0.3; buf[idx] = dry[i] + lp * 0.8; idx = (idx + 1) % d; out[i] += y * 0.25; }
    }
    for (const a of aps) {
      const d = a + off, buf = new Float32Array(d); let idx = 0;
      for (let i = 0; i < m.n; i++) { const b = buf[idx], x = out[i]; const y = -x + b; buf[idx] = x + b * 0.5; idx = (idx + 1) % d; out[i] = y; }
    }
    for (let i = 0; i < m.n; i++) ch[i] = dry[i] + out[i] * wet;
  }
}

export function writeWav(path, m, peakDb = -1) {
  let peak = 0;
  for (let i = 0; i < m.n; i++) peak = Math.max(peak, Math.abs(Math.tanh(m.L[i])), Math.abs(Math.tanh(m.R[i])));
  const target = Math.pow(10, peakDb / 20), g = peak > 0 ? target / peak : 1;
  const buf = Buffer.alloc(44 + m.n * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + m.n * 4, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(m.n * 4, 40);
  for (let i = 0; i < m.n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Math.tanh(m.L[i]) * g)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Math.tanh(m.R[i]) * g)) * 32767), 46 + i * 4);
  }
  writeFileSync(path, buf);
}

export const note = (name) => {
  const map = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
  const m = name.match(/^([A-G])(#|b)?(\d)$/);
  let n = map[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (Number(m[3]) - 4) * 12;
  return 440 * Math.pow(2, n / 12);
};
