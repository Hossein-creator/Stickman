// ---- "love is a snowman": soft winter wind bed, snow crunch while rolling (top hers, bottom his, slower), soft thuds when balls are stacked, a little pluck for the nose and a whoosh for the scarf; bottom: drip-drip melting, carrot drops into the slush, low drop; top: smile = warm chord + heart bells; typing; FOLLOW: button pop-in, press click + sparkle + bright chime ----
const T_LIFT = 6.6, T_HEART = 7.2, T_TIRED = 4.6, T_LET = 6.0, T_GONE = 8.4, T_H2 = 9.0, T_H3 = 10.2, T_CTA = 12.6, T_TAG = 13.4, T_TAP = 15.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.008; add(i, lp * 0.25 * (0.7 + 0.3 * Math.sin(t * 0.9)) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let k = 0; k < 10; k++) noise(0.45 + k * 0.15, 0.1, 0.02, -0.3, 0.35, (p) => Math.sin(Math.PI * p));
for (let k = 0; k < 11; k++) noise(0.45 + k * 0.21, 0.12, 0.016, 0.35, 0.3, (p) => Math.sin(Math.PI * p));
thump(3.2, 0.05, 80, -0.1); thump(4.6, 0.045, 90, -0.1); thump(4.2, 0.035, 80, 0.3);
tone(5.6, 660, 0.12, 0.012, 0, 0.002, 25); sweep(5.6, 0.5, 0.025, -0.1, 0.1, 0.4);
for (let k = 0; k < 9; k++) tone(T_LET + 0.3 + k * 0.27, 1400 - 60 * k, 0.05, 0.008, 0.3, 0.001, 60);
noise(T_LET + 1.55, 0.15, 0.04, 0.3, 0.2, (p) => Math.exp(-p * 6)); thump(T_LET + 1.55, 0.03, 70, 0.3);
{ const s0 = Math.floor((T_LET + 0.6) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIFT - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 18, 30); typing(T_H3, 20, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
tone(T_TAG, 1320, 0.08, 0.015, 0, 0.002, 30);
click(T_TAP, 0.05, 0); thump(T_TAP, 0.05, 140, 0);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2600 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
