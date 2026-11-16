// ---- "love is a blanket": cold winter wind, soft lamp hum, blanket rustles (unfold, spread, her pull), his teeth chatter + shiver breaths, low drop; top warm chord + heart bells; typing; FOLLOW: needle stitches (tiny ticks per letter), tap pop + bright chime ----
const T_UNF = 0.3, T_SPREAD = 1.0, T_LEAN = 2.2, T_HEART = 5.4, T_PULL = 2.0, T_SHIV = 3.0, T_BLUE = 4.0, T_H2 = 8.6, T_H3 = 9.8, T_CTA = 12.4, T_ST = 13.4, T_TAP = 15.4;
{ let w = 0; for (let i = 0; i < N; i++) { const t = i / SR; w += (rnd() - w) * 0.02; add(i, w * 0.06 * (0.6 + 0.4 * Math.sin(t * 0.9)) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const rustle = (t, d, g, pan) => noise(t, d, g, pan, 0.45, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)));
rustle(T_UNF, 0.5, 0.04, 0); rustle(T_SPREAD - 0.2, 0.6, 0.05, 0); rustle(T_PULL, 0.6, 0.06, 0.3);
for (let t = T_SHIV; t < 11.5; t += 0.07) click(t, 0.006 + 0.004 * Math.abs(Math.sin(t * 3)), 0.4);
for (let k = 0; k < 8; k++) noise(T_SHIV + 0.4 + k * 0.9, 0.5, 0.016, 0.4, 0.2, (p) => Math.sin(Math.PI * p));
{ const s0 = Math.floor((T_BLUE + 1) * SR), n = Math.floor(4.5 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 47 * tt) + 0.3 * Math.sin(2 * Math.PI * 94 * tt)) * 0.03 * e, 0.2); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LEAN, T_CTA + 0.5, [57, 61, 64, 69], 0.008);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 30, 30); typing(T_H3, 31, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
for (let k = 0; k < 8; k++) { tone(T_ST + k * 0.18, 4200, 0.02, 0.01, 0, 0.001, 200); noise(T_ST + k * 0.18 + 0.06, 0.05, 0.015, 0, 0.6, (p) => 1 - p); }
click(T_TAP, 0.06, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
