// ---- "the gift": room tone, steps in, "guess!" pop, a fancy sparkle reveal, her "hmm", a pointing ding, his "?!", the wallet snatch, cash flutter, a sad moth flutter + cricket, her laugh, a kiss chime, warm chord ----
const T_IN = 0.2, T_AT = 1.0, T_GUESS = 1.1, T_SHOW = 2.0, T_NO = 2.8, T_POINT = 3.2, T_HUH = 3.9, T_GRAB = 4.4, T_CASH = 4.9, T_MOTH = 5.7, T_LAUGH = 6.8, T_NOTE = 7.2, T_KISS = 7.7, T_TAKE = 8.1, T_GO = 8.4, T_H1 = 9.8, T_H2 = 10.7, T_CARD = 11.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = T_IN; t < T_AT; t += 0.28) step(t, 0.025, -0.3);
const pop = (t, f) => { tone(t, f, 0.12, 0.03, 0, 0.005, 25); tone(t + 0.07, f * 1.25, 0.12, 0.025, 0, 0.005, 25); };
pop(T_GUESS, 520); pop(T_SHOW, 620); [[0, 84], [0.06, 88], [0.12, 91], [0.18, 96]].forEach(([d, m]) => bell(T_SHOW + d, m, 0.02, -0.1, 0.9));
tone(T_SHOW + 0.5, 220, 0.4, 0.015, 0.3, 0.05, 4);
pop(T_POINT, 440); bell(T_POINT + 0.1, 79, 0.02, 0.2, 0.5); pop(T_HUH, 700);
noise(T_GRAB + 0.1, 0.15, 0.04, 0, 0.6, (p) => Math.sin(Math.PI * p));
for (let k = 0; k < 10; k++) noise(T_CASH + k * 0.08, 0.06, 0.03, (k % 2 ? 0.3 : -0.3), 0.85, (p) => Math.sin(Math.PI * p));
bell(T_CASH, 91, 0.02, 0, 0.6);
for (let t = T_MOTH; t < T_MOTH + 1.0; t += 0.05) noise(t, 0.03, 0.01, 0.2, 0.7, (p) => Math.sin(Math.PI * p));
for (let t = T_MOTH + 0.2; t < T_LAUGH; t += 0.4) tone(t, 4200, 0.05, 0.007, 0.4, 0.002, 60);
for (let k = 0; k < 6; k++) tone(T_LAUGH + k * 0.11, 440 + 40 * (k % 2), 0.08, 0.02, 0.2, 0.005, 20);
bell(T_KISS + 0.1, 88, 0.02, 0, 0.9);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_KISS, T_CARD + 0.6, [60, 64, 67, 72], 0.01);
pop(T_TAKE, 600);
for (let t = T_GO; t < T_GO + 1.4; t += 0.28) step(t, 0.02, 0.3);
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.9, 1.05].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
