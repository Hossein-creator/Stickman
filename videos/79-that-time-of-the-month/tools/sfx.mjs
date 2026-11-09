// ---- "that time of the month": quiet evening room tone + clock tick, her "oww...", door + his steps, a worried "!" sting, steps to the counter and back for each item (bottle slosh, blanket swish, cup clink + pour), chocolate wrapper crinkle, sofa creak, soft back rubs, her "thank you", warm chord + bells; slams + card ----
const T_IN = 0.9, T_SEE = 1.5, F1 = 1.9, F2 = 3.4, F3 = 4.9, T_CHOC = 6.4, T_SIT = 7.0, T_RUB = 7.5, T_HEART = 8.3, T_H1 = 9.1, T_H2 = 9.9, T_CARD = 11.4;
const voice = (t, f0, d, g, pan = 0, bend = 0.3) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + bend * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.1; t < T_CARD; t += 1.0) click(t, 0.012, -0.5);
voice(0.25, 380, 0.9, 0.03, -0.2, -0.25);
thump(0.6, 0.05, 90, 0.5); click(0.62, 0.03, 0.5);
for (let t = T_IN; t < T_SEE; t += 0.4) step(t, 0.04, 0.4);
tone(T_SEE, 880, 0.15, 0.02, 0.2, 0.002, 20); tone(T_SEE + 0.08, 1320, 0.15, 0.015, 0.2, 0.002, 20);
for (const F of [F1, F2, F3]) { step(F + 0.1, 0.035, 0.4); step(F + 0.35, 0.035, 0.5); step(F + 0.75, 0.035, 0.5); step(F + 1.0, 0.035, 0.4); }
noise(F1 + 0.5, 0.35, 0.03, 0.4, 0.15, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 30)));
sweep(F2 + 1.25, 0.5, 0.05, 0, 0.05, 0.3);
tone(F3 + 0.55, 2600, 0.25, 0.015, 0.4, 0.001, 18); noise(F3 + 0.6, 0.4, 0.02, 0.4, 0.3, (p) => Math.sin(Math.PI * p));
noise(T_CHOC - 0.2, 0.4, 0.04, 0.1, 0.8, (p) => (Math.sin(p * 60) > 0.3 ? 1 : 0.2) * (1 - p));
thump(T_SIT + 0.3, 0.05, 80, 0.1); noise(T_SIT + 0.3, 0.3, 0.02, 0.1, 0.1, (p) => Math.sin(Math.PI * p));
for (let k = 0; k < 4; k++) noise(T_RUB + 0.3 + k * 0.6, 0.35, 0.015, 0, 0.2, (p) => Math.sin(Math.PI * p));
voice(T_RUB + 0.25, 420, 0.25, 0.03, -0.1, 0.2); voice(T_RUB + 0.55, 470, 0.3, 0.03, -0.1, 0.25);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(F1, T_RUB, [57, 60, 64], 0.006); chord(T_RUB - 0.3, T_CARD + 0.6, [60, 64, 67, 72], 0.010);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26].forEach((d, i) => thump(T_H1 + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0, 0.12, 0.24, 0.5, 0.62, 0.74].forEach((d, i) => { thump(T_H2 + d, i === 5 ? 0.12 : 0.05, i === 5 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.2, 69, 0.02, 0, 1.2); bell(T_CARD + 1.26, 76, 0.015, 0, 1.2);
