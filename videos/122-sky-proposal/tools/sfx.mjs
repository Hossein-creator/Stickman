// ---- "sky proposal": small-plane engine drone (louder outside, muffled inside) + wind; card paper rustle; field reveal: soft swell + heartbeat; ring box click + sparkle twinkles; "YES!" bells; hug chord; heart-trail whoosh; skywriting hiss; flying back through: puff + chime ----
const S1 = 2.6, T_CARD = 3.1, T_TAKE = 3.7, T_READ = 4.1, T_BIG = 4.4, T_LOOK = 5.6, S2 = 6.2, S3 = 8.6, T_RING = 8.9, T_WILL = 9.2, T_YES = 9.9, T_HUG = 10.4, S4 = 11.4, T_HEND = 13.8, T_L2 = 12.0, T_L3 = 13.0, T_CTA = 14.6, T_SKY0 = 14.7, T_SKY1 = 16.0, T_TAP = 16.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; const inside = t >= S1 && t < S4 && !(t >= S2 && t < S3); const field = t >= S2 && t < S3; const g = field ? 0.25 : inside ? 0.5 : 1; const ph = 2 * Math.PI * 92 * t; const v = (Math.sin(ph) + 0.5 * Math.sin(2 * ph) + 0.3 * Math.sin(3 * ph)) * (0.7 + 0.3 * Math.sin(2 * Math.PI * 23 * t)); lp += (rnd() - lp) * 0.05; add(i, (v * 0.022 * g + lp * 0.05 * (0.4 + 0.6 * g)) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
[S1, S2, S3, S4].forEach((c) => sweep(c - 0.2, 0.4, 0.05, 0, 0.05, 0.5));
noise(T_CARD + 0.1, 0.3, 0.03, 0.2, 0.5, (p) => Math.sin(Math.PI * p)); noise(T_TAKE, 0.25, 0.03, -0.2, 0.5, (p) => Math.sin(Math.PI * p));
tone(T_BIG, 1100, 0.06, 0.012, 0, 0.002, 30);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.0); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(S2, S3 + 0.2, [57, 64, 69, 73], 0.014);
for (let t = S2 + 0.6; t < S3; t += 0.8) { thump(t, 0.06, 55, 0); thump(t + 0.22, 0.04, 55, 0); }
click(T_RING, 0.05, 0.2); tone(T_RING + 0.05, 2600, 0.1, 0.01, 0.2, 0.001, 30);
for (let k = 0; k < 6; k++) tone(T_RING + 0.25 + k * 0.17, 3600 + 400 * (k % 3), 0.08, 0.006, (k % 2 ? 0.3 : -0.3), 0.001, 40);
[[0, 79], [0.08, 84], [0.16, 88]].forEach(([d, m]) => bell(T_YES + d, m, 0.022, 0, 1.2));
chord(T_HUG, T_CTA + 0.5, [60, 64, 67, 72], 0.013);
sweep(S4 + 0.1, 2.3, 0.04, 0, 0.05, 0.25);
typing(T_L2, 33, 30); typing(T_L3, 31, 30);
noise(T_SKY0, T_SKY1 - T_SKY0, 0.03, 0, 0.6, (p) => Math.sin(Math.PI * p));
sweep(T_TAP - 0.3, 0.6, 0.06, 0, 0.1, 0.5); noise(T_TAP, 0.3, 0.06, 0, 0.3, (p) => Math.exp(-p * 6));
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [62, 66, 69, 74], 0.013);
