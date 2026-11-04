// ---- "blanket war": night crickets, blanket swoosh (burrito roll), his teeth-chattering shiver, a yank, her soft snore; morning: brushing scrub, hip-bump thumps, "hey!", giggles; breakfast: sizzle + smoke hiss, crunchy chewing, gulp, "delicious!"; night again: tug-of-war swooshes, then a warm chord as she lets him in; slams + card ----
const SC = [0, 3.6, 6.0, 8.6];
const T_ROLL = 0.4, T_TUG1 = 1.7, T_YANK = 2.3, T_ZZZ = 2.5, T_BUMP1 = 4.4, T_BUMP2 = 5.1, T_LAUGH = 5.5;
const T_TAKE = 6.7, T_EAT = 6.9, T_YUM = 7.6, T_CLASP = 7.9, T_WAR = 8.8, T_OPEN = 10.0, T_HOLD = 10.5, T_H1 = 11.0, T_H2 = 11.9, T_CARD = 13.0;
const night = (t) => t < SC[1] || t >= SC[3];
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.2; t < T_H1; t += 0.55 + 0.3 * rnd()) if (night(t) && night(t + 0.3)) { for (let k = 0; k < 3; k++) tone(t + k * 0.06, 4200 + 300 * rnd(), 0.04, 0.006, rnd() - 0.5, 0.004, 60); }
const swoosh = (t, d, g, pan) => noise(t, d, g, pan, 0.4, (p) => Math.sin(Math.PI * p));
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
swoosh(T_ROLL, 0.5, 0.05, -0.2);
for (let t = T_ROLL + 0.6; t < SC[1] - 0.2; t += 0.07) if (t < T_TUG1 || t > T_YANK + 0.2) noise(t, 0.02, 0.012, 0.3, 0.9, (p) => 1 - p);
swoosh(T_TUG1, 0.3, 0.03, 0.3); swoosh(T_YANK - 0.05, 0.2, 0.06, -0.2); thump(T_YANK, 0.06, 60, -0.1);
for (let k = 0; k < 3; k++) { const t = T_ZZZ + k * 0.9; noise(t, 0.5, 0.012, -0.3, 0.2, (p) => Math.sin(Math.PI * p)); tone(t, 90, 0.5, 0.012, -0.3, 0.05, 2); }
for (let t = SC[1] + 0.1; t < SC[2] - 0.1; t += 0.09) noise(t, 0.05, 0.012, 0, 0.8, (p) => Math.sin(Math.PI * p));
[T_BUMP1, T_BUMP2].forEach((t, i) => { thump(t, 0.08, 55, i ? -0.2 : 0.2); shout(t + 0.1, i ? 400 : 230, 0.3, 0.04, i ? -0.2 : 0.2); });
for (let k = 0; k < 6; k++) { tone(T_LAUGH + k * 0.11, 420 + 40 * (k % 2), 0.08, 0.015, -0.2, 0.005, 20); tone(T_LAUGH + 0.05 + k * 0.11, 280 + 30 * (k % 2), 0.08, 0.015, 0.2, 0.005, 20); }
noise(SC[2], 1.6, 0.02, -0.4, 0.85, (p) => Math.min(1, p * 8) * (1 - p));
shout(SC[2] + 0.2, 380, 0.4, 0.035, -0.2);
for (let k = 0; k < 6; k++) { const t = T_EAT + 0.12 + k * 0.12; noise(t, 0.05, 0.03, 0.2, 0.7, (p) => 1 - p); thump(t, 0.02, 120, 0.2); }
tone(T_YUM - 0.1, 160, 0.15, 0.03, 0.2, 0.01, 8);
shout(T_YUM, 240, 0.6, 0.045, 0.2);
for (let k = 0; k < 4; k++) bell(T_CLASP + k * 0.08, 84 + k * 3, 0.01, -0.2, 0.4);
for (let k = 0; k < 6; k++) swoosh(T_WAR + k * 0.38, 0.3, 0.04, k % 2 ? 0.3 : -0.3);
shout(T_WAR + 0.1, 400, 0.3, 0.035, -0.2); shout(T_WAR + 0.6, 240, 0.4, 0.04, 0.2);
shout(T_OPEN, 330, 0.5, 0.025, -0.2); swoosh(T_OPEN + 0.1, 0.5, 0.03, 0);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_OPEN, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
