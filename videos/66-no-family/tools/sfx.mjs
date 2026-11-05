// ---- "no family": steady rain + distant thunder, a sniffle; her small footsteps splashing in; the rain on the umbrella (muffled patter), a soft "half?", paper rustle of the sandwich, tiny chime when he smiles; 15 years later: evening birds, her footsteps, a knee thud, the ring box click + sparkle, "be my family?", "yes!", warm chord + bells as the house lights up; slams + card ----
const S2 = 5.0, T_WALK = 0.9, T_ARR = 2.1, T_UMB = 2.3, T_SHARE = 3.0, T_TAKE = 3.4, T_EAT = 3.7, T_SMILE = 4.2;
const T_IN = 5.3, T_AT = 6.4, T_KNEEL = 6.7, T_YES = 7.6, T_HUG = 8.1, T_HOLD = 8.5, T_H1 = 9.6, T_H2 = 10.5, T_CARD = 11.6;
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
{ let lp = 0, lr = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; lr += ((rnd() - 0.5) - lr) * 0.6; const rainOn = 1 - smooth(t, S2 - 0.1, S2 + 0.05); add(i, (lp * 0.08 + lr * 0.07 * rainOn) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
{ const s0 = Math.floor(0.4 * SR), n = Math.floor(1.6 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.003; add(s0 + i, lp * 0.8 * Math.sin(Math.PI * p), 0); } }
noise(0.6, 0.15, 0.015, 0.2, 0.6, (p) => Math.sin(Math.PI * p));
for (let t = T_WALK; t < T_ARR; t += 0.22) noise(t, 0.06, 0.02, -0.3, 0.6, (p) => 1 - p);
for (let t = T_UMB + 0.3; t < S2 - 0.1; t += 0.05 + 0.05 * rnd()) tone(t, 900 + 400 * rnd(), 0.03, 0.006, 0, 0.002, 60);
shout(T_SHARE, 380, 0.3, 0.025, -0.2);
noise(T_TAKE, 0.25, 0.02, 0, 0.7, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 40)));
[[0, 84], [0.1, 88], [0.2, 91]].forEach(([d, m]) => bell(T_SMILE + d, m, 0.012, 0, 0.6));
for (let t = S2 + 0.3; t < T_H1; t += 0.9 + 0.5 * rnd()) { tone(t, 2600 + 400 * rnd(), 0.08, 0.008, rnd() - 0.5, 0.01, 30); tone(t + 0.1, 3000 + 300 * rnd(), 0.06, 0.006, rnd() - 0.5, 0.01, 30); }
for (let t = T_IN; t < T_AT; t += 0.25) step(t, 0.015, -0.3);
thump(T_KNEEL + 0.3, 0.05, 70, 0.2); click(T_KNEEL + 0.5, 0.05, 0.2);
for (let k = 0; k < 4; k++) bell(T_KNEEL + 0.55 + k * 0.06, 93 + k, 0.008, 0.2, 0.3);
shout(T_KNEEL + 0.3, 230, 0.6, 0.03, 0.2);
shout(T_YES, 420, 0.4, 0.04, -0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_YES, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.9].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
