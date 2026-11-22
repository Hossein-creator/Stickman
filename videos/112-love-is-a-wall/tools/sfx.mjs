// ---- "love is a wall": quiet night bed; boost grunt (soft noise) + hand slap, brick scrapes while climbing, her landing on top; top: pull-up effort, sunrise swell + warm chord + heart bells; bottom: his jumps (thud each landing), scrapes, panting, her hop down + steps leaving, low drop; typing; FOLLOW: brick slides out (stone scrape), push back in (thunk) + chime ----
const T_LIFT = 6.4, T_HEART = 7.0, T_TIRED = 4.4, T_LET = 6.0, T_GONE = 8.6, T_H2 = 9.2, T_H3 = 10.4, T_CTA = 12.6, T_TAG = 13.3, T_TAP = 14.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (const t of [1.1, 1.4]) step(t, 0.03, -0.1);
noise(1.4, 0.3, 0.03, 0, 0.15, (p) => Math.sin(Math.PI * p)); click(1.4, 0.03, 0);
noise(2.0, 0.6, 0.025, 0.1, 0.5, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 40)));
thump(3.05, 0.04, 90, 0.1);
noise(4.2, 0.8, 0.025, -0.1, 0.5, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 40))); thump(5.3, 0.04, 90, -0.1);
for (let k = 0; k < 5; k++) { const t = 3.1 + (k + 1) * Math.PI / 4.2; if (t < T_LET + 0.3) thump(t, 0.05, 70, 0.3); }
for (let k = 0; k < 6; k++) noise(T_TIRED + 0.2 + k * 0.45, 0.3, 0.016, 0.35, 0.25, (p) => Math.sin(Math.PI * p));
thump(T_LET + 0.55, 0.05, 80, 0.5);
for (let t = T_LET + 0.9; t < T_GONE; t += 0.42) step(t, 0.02, 0.6);
{ const s0 = Math.floor((T_LET + 0.6) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
sweep(T_LIFT - 0.3, 1.6, 0.03, -0.2, 0.05, 0.3);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIFT - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 17, 30); typing(T_H3, 23, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
noise(T_TAG, 0.5, 0.03, 0, 0.3, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 30)));
thump(T_TAP, 0.07, 100, 0); click(T_TAP, 0.04, 0);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
