// ---- "the last bowl": rain on the roof, far thunder, the jar shaken (only 3 grains), a pot and spoon, her stomach growl, soft piano on the giving, end card ----
const T_TIP = 1.0, T_BACK = 1.8, T_STIR = 2.25, T_SCOOP = 3.35, T_WALK = 3.8, T_SERVE = 4.45, T_SIT = 4.85;
const T_ASK = 5.0, T_ATE = 5.45, T_EAT = 6.2, T_GROWL = 7.3, T_LOOK = 7.65, T_POT = 8.1, GIVES = [9.0, 9.4, 9.8], T_PUSH = 10.6, T_BOTH = 11.0, T_H1 = 11.9, T_H2 = 12.9, T_CARD = 14.0;
// rain: dense soft noise + drips
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.25; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - 0.5 * smooth(t, T_CARD - 0.5, T_CARD)) * (1 - smooth(t, DUR - 1, DUR)), 0); } }
for (let t = 0.1; t < DUR - 1; t += 0.06 + 0.1 * rnd()) noise(t, 0.01, 0.02 + 0.02 * rnd(), rnd() * 1.6 - 0.8, 0.9, (p) => Math.exp(-p * 6));
// thunder far away
[2.9, 7.3].forEach((t) => { thump(t + 0.3, 0.12, 34, -0.3); noise(t + 0.3, 1.6, 0.05, -0.3, 0.05, (p) => Math.exp(-p * 2.5)); });
// the jar: lid, shaking, three grains tick into the pot
wood(0.6, 0.04, 0.4);
for (let t = T_TIP; t < T_BACK - 0.1; t += 0.05) noise(t, 0.03, 0.015, 0.4, 0.7, (p) => 1 - p);
[0, 1, 2].forEach((i) => click(T_TIP + 0.5 + i * 0.22, 0.05, 0.4));
wood(T_BACK + 0.35, 0.05, 0.4);
// cooking: flame whoosh, stirring scrapes
noise(T_STIR - 0.2, 0.3, 0.03, 0.4, 0.4);
for (let t = T_STIR; t < T_SCOOP; t += 0.4) noise(t, 0.25, 0.012, 0.4, 0.6, (p) => Math.sin(Math.PI * p));
// bowl down on the table
wood(T_SERVE + 0.3, 0.06, 0); tone(T_SERVE + 0.3, 900, 0.3, 0.012, 0, 0.002, 12);
// speech pops
[T_ASK + 0.1, T_ATE].forEach((t) => { tone(t, 520, 0.12, 0.03, 0, 0.005, 25); tone(t + 0.07, 660, 0.12, 0.025, 0, 0.005, 25); });
// spoon taps while he eats
for (let t = T_EAT + 0.1; t < T_GROWL; t += 0.75) { tone(t, 2200, 0.08, 0.01, -0.2, 0.001, 60); }
// her stomach: a long low growl
{ const s0 = Math.floor(T_GROWL * SR), n = Math.floor(0.7 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = 70 + 30 * Math.sin(p * 9) + 20 * p; ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(ph * 2.7)) * Math.sin(Math.PI * p) * 0.09 * (0.6 + 0.4 * Math.sin(p * 40)), 0.2); } }
// he looks; the empty pot (low sting)
tone(T_LOOK, hz(45), 1.2, 0.04, 0, 0.02, 2); bell(T_POT, 64, 0.015, 0.4, 1.2);
// giving: three soft spoon taps + a piano line
GIVES.forEach((g, i) => { tone(g + 0.3, 1800, 0.08, 0.012, 0.1, 0.001, 60); bell(g + 0.3, [69, 72, 76][i], 0.02, 0, 1.4); });
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_PUSH, T_CARD + 0.5, [57, 61, 64, 69], 0.011);
[[0, 76], [0.1, 81]].forEach(([d, m]) => bell(T_BOTH + 0.3 + d, m, 0.018, 0, 1.4));
// headline slams
[0, 0.12, 0.24, 0.36, 0.5].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.14, 0.28, 0.44].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
// end card
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.92, 1.04, 1.18].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.6, 69, 0.02, 0, 1.2); bell(T_CARD + 1.66, 76, 0.015, 0, 1.2);
