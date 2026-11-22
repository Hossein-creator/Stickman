// ---- "surprise dance": party chatter bed, lights-off thump + crowd "ooh", spotlight clunk; from T_MUS an upbeat 120 bpm dance track (kick, clap, hats, dhol-like low toms, pentatonic bell melody); surprise hit; crying sniffs; the guests cheer when they dance together; typing; FOLLOW: tile lights up, her step on the beat + bright chime ----
const T_DARK = 1.6, T_SPOT = 2.2, T_MUS = 2.4, T_IN = 2.5, T_AT = 3.4, T_SURP = 3.8, T_CRY = 6.4, T_PULL = 9.0, T_UP = 9.5, T_TOG = 9.9, T_END = 12.0, T_L2 = 12.6, T_L3 = 13.6, T_CTA = 15.6, T_TILE = 16.0, T_TAP = 17.4;
const BEAT = 0.5;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.05; const chat = t < T_DARK ? 1 : 0.25; add(i, lp * 0.06 * chat * Math.min(1, t / 0.4) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
thump(T_DARK, 0.1, 50, 0); noise(T_DARK + 0.1, 0.8, 0.03, 0, 0.2, (p) => Math.sin(Math.PI * p));
click(T_SPOT, 0.06, 0.3); thump(T_SPOT, 0.05, 90, 0.3);
const MUS_END = T_CTA + 0.6;
const MEL = [72, 74, 76, 79, 76, 74, 72, 69, 72, 76, 79, 81, 79, 76, 74, 72];
for (let b = 0; T_MUS + b * BEAT < MUS_END; b++) {
  const t = T_MUS + b * BEAT, g = t > T_PULL && t < T_TOG ? 0.5 : 1;
  thump(t, 0.07 * g, 55, 0);
  if (b % 2 === 1) noise(t, 0.08, 0.05 * g, 0, 0.7, (p) => Math.exp(-p * 7));
  noise(t + BEAT / 2, 0.03, 0.02 * g, 0.2, 0.95, (p) => Math.exp(-p * 9)); noise(t, 0.03, 0.015 * g, -0.2, 0.95, (p) => Math.exp(-p * 9));
  tone(t + BEAT * 0.75, 140, 0.15, 0.03 * g, -0.3, 0.002, 18); tone(t + BEAT * 0.25, 220, 0.1, 0.02 * g, 0.3, 0.002, 25);
  bell(t, MEL[b % 16], 0.012 * g, 0.1, 0.5); if (b % 2 === 0) bell(t + BEAT / 2, MEL[(b + 3) % 16] - 12, 0.008 * g, -0.1, 0.4);
}
sweep(T_SURP - 0.15, 0.4, 0.05, -0.2, 0.05, 0.5); thump(T_SURP, 0.06, 70, -0.2);
for (let k = 0; k < 3; k++) noise(T_CRY + 0.4 + k * 0.6, 0.18, 0.02, -0.3, 0.4, (p) => Math.sin(Math.PI * p));
noise(T_TOG, 3.0, 0.06, 0, 0.5, (p) => Math.min(1, p * 4) * (1 - p) * (0.6 + 0.4 * Math.sin(p * 60)));
for (let k = 0; k < 18; k++) click(T_TOG + 0.1 + k * 0.13 + 0.04 * Math.sin(k * 3), 0.02, (k % 5) / 5 - 0.4);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
typing(T_L2, 19, 26); typing(T_L3, 17, 26);
tone(T_TILE, 1320, 0.08, 0.015, 0, 0.002, 30);
thump(T_TAP, 0.06, 120, 0); click(T_TAP, 0.05, 0);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
