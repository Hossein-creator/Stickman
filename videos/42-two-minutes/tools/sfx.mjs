// ---- "two minutes": mall ambience + soft muzak, footsteps, "2 minutes!" pop, timer ticks, a paper-bag rustle + thud for each bag (faster and faster), snoring, the cap, kiss chime, end card ----
const T_ARRIVE = 1.25, T_TWO = 1.3, T_IN = 2.15, BAGT = [3.3, 4.05, 4.7, 5.25, 5.7, 6.1, 6.5, 6.9];
const T_SLEEP = 7.45, T_OUT = 8.15, T_AT = 8.75, T_CAP = 9.0, T_KISS = 9.65, T_UP = 10.25, T_GO = 10.7, T_H1 = 11.6, T_H2 = 12.6, T_CARD = 13.7;
const TICKS = [T_IN, 2.75, 3.6, 4.4, 5.0, 5.6, 6.3, 7.0, T_OUT];
// crowd murmur
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.05; lp2 += (lp - lp2) * 0.1; add(i, lp2 * 0.35 * Math.min(1, t / 0.6) * (1 - 0.6 * smooth(t, T_CARD - 0.4, T_CARD)) * (1 - smooth(t, DUR - 1, DUR)), 0); } }
// cheerful muzak (simple I-V-vi-IV bells)
const prog = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]];
for (let b = 0; b < 26; b++) { const t = 0.2 + b * 0.5; if (t > T_CARD - 0.3) break; const ch = prog[Math.floor(b / 2) % 4]; bell(t, ch[b % 3] + 12, 0.008, -0.3, 0.6); if (b % 2 === 0) tone(t, hz(ch[0] - 12), 0.4, 0.012, 0.2, 0.01, 6); }
// walking in
for (let t = 0.1; t < T_ARRIVE; t += 0.26) { step(t, 0.03, -0.2); step(t + 0.13, 0.025, 0.1); }
// "2 minutes!" pop
tone(T_TWO + 0.15, 620, 0.12, 0.035, 0, 0.005, 25); tone(T_TWO + 0.22, 830, 0.15, 0.03, 0, 0.005, 25);
// timer jumps
TICKS.forEach((t) => { click(t, 0.06, 0); tone(t, 1400, 0.06, 0.02, 0, 0.001, 50); });
// bags: running steps, rustle, thud on the pile
BAGT.forEach((b, k) => {
  for (let t = b - 0.35; t < b + 0.35; t += 0.1) step(t, 0.02, 0.3);
  noise(b - 0.05, 0.25, 0.05, -0.1, 0.75, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 50)));
  thump(b + 0.15, 0.08 + 0.01 * k, 80 - 3 * k, -0.1);
  if (k >= 3) tone(b + 0.15, 180 - 8 * k, 0.15, 0.02, -0.1, 0.002, 12);
});
// he sighs at the watch
noise(2.85, 0.5, 0.025, -0.1, 0.15, (p) => Math.sin(Math.PI * p));
// snoring
for (let t = T_SLEEP + 0.3; t < T_AT - 0.1; t += 0.6) { const s0 = Math.floor(t * SR), n = Math.floor(0.35 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.08; add(s0 + i, (lp * 0.5 + 0.3 * Math.sin(2 * Math.PI * 90 * i / SR)) * Math.sin(Math.PI * p) * 0.06, -0.1); } }
// she comes out: wake-up startle
tone(T_AT, 300, 0.2, 0.03, 0, 0.005, 10); tone(T_AT + 0.05, 450, 0.2, 0.025, 0, 0.005, 10);
// the cap: tiny rustle + pop; "for you"
noise(T_CAP, 0.15, 0.03, 0.1, 0.8, (p) => Math.sin(Math.PI * p)); tone(T_CAP + 0.45, 900, 0.12, 0.03, 0, 0.002, 20);
// kiss + warm chord
bell(T_KISS + 0.1, 76, 0.025, 0, 1.2); bell(T_KISS + 0.18, 81, 0.02, 0, 1.2); bell(T_KISS + 0.26, 88, 0.015, 0, 1.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_KISS, T_CARD + 0.5, [60, 64, 67, 72], 0.009);
// walking off, bags swinging
for (let t = T_GO; t < T_GO + 2.6; t += 0.3) { step(t, 0.03, 0.2); noise(t + 0.05, 0.08, 0.015, 0.2, 0.7); }
[0, 0.14, 0.28, 0.42].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.16, 0.32].forEach((d, i) => { thump(T_H2 + d, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.9, 1.05].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
