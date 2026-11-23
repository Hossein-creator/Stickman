// ---- "love is a padlock": night river bed (soft water + far city hum); lock click when hung; key whoosh + splash; top: warm chord + heart bells when it glows; bottom: his key splash, her key jingle into the pocket, phone taps, unlock click, lock falls + bigger splash, her steps leaving, low drop; typing; FOLLOW: new lock appears (jingle), click shut + chime ----
const T_HANG = 1.2, T_KEY = 1.8, T_THROW = 2.8, T_SPL = 3.8, T_LIFT = 6.2, T_HEART = 6.8, T_BHANG = 1.2, T_BTHROW = 2.0, T_BSPL = 3.0, T_KEEP = 3.2, T_TIRED = 4.6, T_LET = 6.0, T_OPEN = 6.4, T_DROP = 6.6, T_DSPL = 7.2, T_WALK = 7.4, T_GONE = 9.2, T_H2 = 9.4, T_H3 = 10.6, T_CTA = 12.6, T_TAG = 13.2, T_TAP = 14.9;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; const r = rnd() - 0.5; lp += (r - lp) * 0.04; lp2 += (r - lp2) * 0.004; add(i, (lp * 0.05 * (0.6 + 0.4 * Math.sin(t * 1.7)) + lp2 * 0.2) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const clk = (t, pan) => { click(t, 0.06, pan); tone(t + 0.01, 2400, 0.04, 0.01, pan, 0.001, 80); };
clk(T_HANG + 0.05, 0); clk(T_BHANG + 0.05, 0.2);
const jingle = (t, pan) => { for (let k = 0; k < 4; k++) tone(t + k * 0.04, 3200 + 500 * (k % 2), 0.05, 0.006, pan, 0.001, 60); };
jingle(T_KEY, 0); sweep(T_THROW, 0.9, 0.04, 0.3, 0.1, 0.5);
const splash = (t, g, pan) => { noise(t, 0.5, g, pan, 0.5, (p) => Math.exp(-p * 4)); thump(t, g * 0.6, 80, pan); };
splash(T_SPL, 0.06, 0.5); sweep(T_BTHROW, 0.9, 0.035, 0.4, 0.1, 0.5); splash(T_BSPL, 0.05, 0.6);
jingle(T_KEEP, -0.3);
for (let t = T_KEEP + 0.5; t < T_LET - 0.2; t += 0.6) click(t, 0.007, -0.3);
clk(T_OPEN, -0.1); noise(T_DROP, 0.5, 0.02, 0, 0.3, (p) => p); splash(T_DSPL, 0.09, 0);
for (let t = T_WALK + 0.2; t < T_GONE; t += 0.42) step(t, 0.02, -0.5);
{ const s0 = Math.floor((T_DSPL) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIFT - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 22, 30); typing(T_H3, 14, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
jingle(T_TAG, 0.2); clk(T_TAP, 0.2);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
