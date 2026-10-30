// ---- "her worst day": quiet room, clock ticking, her shaky breath, the door, his bag thud, running steps for each thing he brings, a soft piano when he sits with her, end card ----
const T_DOOR = 0.9, T_SEE = 1.7, T_DROP = 1.9, T_KNEEL = 2.3, TRIPS = [3.2, 4.3, 5.4, 6.5], TRIPD = 0.42;
const T_SIT = 8.1, T_HOLD = 9.0, T_SLEEP = 9.8, T_H1 = 10.6, T_H2 = 11.6, T_CARD = 12.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.2; t < T_HOLD; t += 0.5) click(t, 0.015, -0.4);
// her shaky breathing in pain
for (let t = 0.1; t < TRIPS[1]; t += 0.8) { noise(t, 0.3, 0.02, 0, 0.2, (p) => Math.sin(Math.PI * p) * (0.7 + 0.3 * Math.sin(p * 40))); noise(t + 0.38, 0.35, 0.016, 0, 0.12, (p) => Math.sin(Math.PI * p)); }
// door + steps + bag drop
noise(T_DOOR - 0.3, 0.35, 0.03, 0.4, 0.25, (p) => Math.sin(Math.PI * p)); wood(T_DOOR - 0.25, 0.04, 0.4);
for (let t = T_DOOR; t < T_SEE; t += 0.3) step(t, 0.03, 0.3);
thump(T_DROP + 0.25, 0.1, 70, 0.3); noise(T_DROP + 0.25, 0.08, 0.04, 0.3, 0.4, (p) => 1 - p);
tone(T_SEE, hz(57), 0.8, 0.02, 0, 0.02, 2);
for (let t = T_KNEEL; t < T_KNEEL + 0.45; t += 0.12) step(t, 0.03, 0.1);
// trips: running out and back, then a soft "put down"
TRIPS.forEach((a, k) => {
  for (let t = a; t < a + 2 * TRIPD; t += 0.11) step(t, 0.025, 0.3);
  const p = a + 2 * TRIPD + 0.15;
  if (k === 0) { noise(p, 0.15, 0.03, 0, 0.3, (q) => Math.sin(Math.PI * q)); }
  if (k === 1) sweep(p - 0.1, 0.4, 0.03, 0, 0.02, 0.2);
  if (k === 2) for (let i = 0; i < 7; i++) wood(p + i * 0.06, 0.025, 0.2);
  if (k === 3) { tone(p, 1800, 0.2, 0.012, 0.2, 0.001, 30); }
  bell(p, [72, 74, 76, 79][k], 0.012, 0, 1.0);
});
// he sits with her: warm chord + piano
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_SIT, T_CARD + 0.6, [57, 61, 64, 69], 0.011);
[[0, 76], [0.1, 81], [0.2, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.4));
[0, 0.1, 0.2, 0.3, 0.4, 0.52].forEach((d, i) => thump(T_H1 + d, i === 5 ? 0.1 : 0.05, i === 5 ? 50 : 70, 0));
[0, 0.1, 0.2, 0.32, 0.42, 0.54].forEach((d, i) => { thump(T_H2 + d, i === 5 ? 0.12 : 0.05, i === 5 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.88, 1.0, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
