// ---- "love is a balloon": quiet tone; a breath (soft noise) + rubber stretch squeak per blow (top alternating, bottom his only), leak hiss from her side after each, his panting, the balloon flies off farting/whistling, low drop; top: lift-off swell, warm chord + heart bells; typing; FOLLOW: tag pop-in, POP + confetti sparkle + bright chime ----
const BL = 0.9, NB = 7, T0 = 0.4, T_LIFT = 6.6, T_HEART = 7.2, T_TIRED = 4.6, T_LET = 6.0, T_GONE = 7.6, T_H2 = 9.0, T_H3 = 10.2, T_CTA = 12.6, T_TAG = 13.4, T_TAP = 15.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const breath = (t, pan, g) => noise(t, 0.55, g, pan, 0.08, (p) => Math.sin(Math.PI * p) ** 0.7);
const squeak = (t, pan, f0) => { const s0 = Math.floor(t * SR), n = Math.floor(0.25 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = f0 + 400 * tt; add(s0 + i, Math.sin(2 * Math.PI * f * tt) * 0.006 * Math.sin(Math.PI * i / n), pan); } };
for (let i = 0; i < NB; i++) { breath(T0 + i * BL, i % 2 ? -0.1 : -0.3, 0.03); squeak(T0 + i * BL + 0.4, -0.2, 500 + 40 * i); }
for (let i = 0; i < 6; i++) { const t = T0 + i * BL; if (t < T_LET) { breath(t, 0.35, 0.03); squeak(t + 0.35, 0.3, 480); noise(t + 0.55, 0.4, 0.015, 0.2, 0.7, (p) => Math.sin(Math.PI * p)); } }
for (let k = 0; k < 6; k++) noise(T_TIRED + 0.2 + k * 0.45, 0.3, 0.016, 0.35, 0.25, (p) => Math.sin(Math.PI * p));
{ const s0 = Math.floor(T_LET * SR), n = Math.floor((T_GONE - T_LET) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 300 + 200 * Math.sin(tt * 30) + 150 * tt; add(s0 + i, (Math.sin(2 * Math.PI * f * tt) > 0 ? 1 : -1) * 0.006 * (1 - i / n), 0.4); } }
{ const s0 = Math.floor((T_GONE) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
sweep(T_LIFT - 0.1, 1.4, 0.03, -0.2, 0.05, 0.3);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIFT - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 19, 30); typing(T_H3, 29, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
tone(T_TAG, 1320, 0.08, 0.015, 0, 0.002, 30);
noise(T_TAP, 0.12, 0.12, 0, 0.9, (p) => Math.exp(-p * 8)); thump(T_TAP, 0.08, 120, 0);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
