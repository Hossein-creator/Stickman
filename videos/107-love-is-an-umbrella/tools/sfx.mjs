// ---- "love is an umbrella": steady rain bed (both panels), soft patter ticks on the canopies, the top rain fades out at T_LIFT; his shiver = low cold rumble + far thunder; her footsteps leaving; low drop; top: warm chord + heart bells; typing; FOLLOW: tag pop-in, POP + sparkle + bright chime ----
const T_LIFT = 6.6, T_HEART = 7.2, T_TIRED = 4.6, T_LET = 6.0, T_GONE = 8.2, T_H2 = 9.0, T_H3 = 10.2, T_CTA = 12.6, T_TAG = 13.4, T_TAP = 15.0;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; const r = rnd() - 0.5; lp += (r - lp) * 0.35; lp2 += (r - lp2) * 0.05; const g = Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 0.8, DUR)) * (1 - 0.5 * smooth(t, T_LIFT - 0.4, T_LIFT + 0.8)) * (1 - 0.8 * smooth(t, T_CTA, T_CTA + 1.0)); add(i, (lp * 0.05 + lp2 * 0.08) * g, 0); } }
for (let k = 0; k < 90; k++) { const t = 0.2 + k * 0.137 + 0.05 * Math.sin(k * 7.1); if (t < T_CTA) tone(t, 1800 + 500 * Math.sin(k * 3.3), 0.03, t < T_LIFT ? 0.005 : 0.003, Math.sin(k * 1.7) * 0.4, 0.001, 70); }
noise(T_TIRED - 0.2, 2.6, 0.03, 0.2, 0.05, (p) => Math.sin(Math.PI * p) ** 0.5);
thump(T_TIRED + 0.3, 0.05, 40, 0.3);
for (let k = 0; k < 6; k++) wood(T_LET + 0.25 + k * 0.42, 0.02 * (1 - k / 7), -0.3 - k * 0.1);
{ const s0 = Math.floor((T_LET + 0.6) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIFT - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 16, 30); typing(T_H3, 33, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
tone(T_TAG, 1320, 0.08, 0.015, 0, 0.002, 30);
sweep(T_TAP - 0.25, 0.6, 0.05, 0, 0.1, 0.6);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
