// ---- "start today": night crickets, the plan (dreamy chime), alarm ring + slap, couch munching + phone taps, the lost year (page flips, a tick-tock, "tomorrow" pops), 6 PM clock, shoes + door, then footsteps: walk, jog, run with a rising beat and a sunrise chord, end card ----
const T_PLAN = 0.3, T_LIE = 1.45, T_ALARM = 1.85, T_SLAP = 2.15, T_UP = 2.55, T_WALK = 2.85, T_COUCH = 3.45, T_YEAR = 4.0, T_YEAR1 = 6.5;
const T_SIX = 6.6, T_STAND = 7.0, T_SHOES = 7.6, T_OUT = 8.05, T_OUTSIDE = 8.35, T_D16 = 9.1, T_D30 = 9.8, T_END = 10.6, T_H1 = 10.9, T_H2 = 11.9, T_CARD = 13.0;
const TOMS = [4.4, 5.3, 6.1];
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.1; t < T_ALARM; t += 0.33) { tone(t, 4200, 0.04, 0.006, -0.5, 0.002, 60); tone(t + 0.05, 4200, 0.04, 0.005, -0.5, 0.002, 60); }
[[0, 76], [0.1, 79], [0.2, 84]].forEach(([d, m]) => bell(T_PLAN + 0.1 + d, m, 0.02, 0, 1.2));
tone(T_PLAN + 0.5, 600, 0.12, 0.03, 0, 0.005, 25); tone(T_PLAN + 0.57, 800, 0.12, 0.025, 0, 0.005, 25);
// alarm + slap
for (let t = T_ALARM; t < T_SLAP; t += 0.06) tone(t, 2400, 0.04, 0.03, 0.2, 0.001, 30);
thump(T_SLAP, 0.12, 90, 0.2); noise(T_UP, 0.4, 0.03, -0.1, 0.2, (p) => Math.sin(Math.PI * p));
for (let t = T_WALK; t < T_COUCH; t += 0.32) step(t, 0.025, 0);
thump(T_COUCH + 0.1, 0.08, 60, 0);
// munching + phone taps
for (let t = T_COUCH + 0.4; t < T_SIX; t += 1.1) noise(t + 0.3, 0.15, 0.02, 0.1, 0.5, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 40)));
for (let t = T_COUCH + 0.5; t < T_SIX; t += 0.5 + 0.2 * rnd()) click(t, 0.015, 0.1);
// the lost year: tick-tock + page flips + "tomorrow" pops
for (let t = T_YEAR; t < T_YEAR1; t += 0.25) click(t, 0.025, -0.3);
for (let k = 0; k < 12; k++) noise(T_YEAR + k * (T_YEAR1 - T_YEAR) / 12, 0.08, 0.03, -0.1, 0.8, (p) => Math.sin(Math.PI * p));
TOMS.forEach((t) => { tone(t, 520, 0.12, 0.03, 0, 0.005, 25); tone(t + 0.07, 440, 0.12, 0.025, 0, 0.005, 25); });
// 6 PM: a single clock chime; he gets up; shoes; door
bell(T_SIX, 69, 0.03, 0, 1.6); tone(T_SIX, hz(45), 1.0, 0.03, 0, 0.02, 2);
for (let t = T_STAND + 0.1; t < T_SHOES; t += 0.3) step(t, 0.025, 0.2);
noise(T_SHOES + 0.1, 0.3, 0.02, 0.3, 0.5, (p) => Math.sin(Math.PI * p));
noise(T_OUT - 0.2, 0.35, 0.03, 0.4, 0.25, (p) => Math.sin(Math.PI * p)); wood(T_OUT - 0.15, 0.04, 0.4);
// outside: steps get faster, a beat builds
for (let t = T_OUTSIDE; t < T_D16; t += 0.4) step(t, 0.035, 0);
for (let t = T_D16; t < T_D30; t += 0.25) step(t, 0.04, 0);
for (let t = T_D30; t < T_END; t += 0.17) step(t, 0.045, 0);
for (let t = T_OUTSIDE; t < T_END; t += 0.5) { thump(t, 0.08, 55, 0); if (t > T_D16) thump(t + 0.25, 0.05, 60, 0); }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_OUTSIDE, T_D16 + 0.3, [57, 64], 0.006); chord(T_D16, T_D30 + 0.3, [59, 66], 0.007); chord(T_D30, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 79], [0.16, 84]].forEach(([d, m]) => bell(T_D30 + d, m, 0.02, 0, 1.2));
[T_OUTSIDE, T_D16, T_D30].forEach((t) => tone(t, 1400, 0.06, 0.02, 0, 0.001, 50));
[0, 0.18, 0.36].forEach((d, i) => thump(T_H1 + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0, 0.2].forEach((d, i) => { thump(T_H2 + d, i === 1 ? 0.13 : 0.05, i === 1 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.9, 1.05].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
