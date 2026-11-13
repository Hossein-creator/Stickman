// ---- "love is a tandem": night road tone; chain clicks + tyre hum scale with speed (top steady, bottom slows), his heavy breathing uphill, creak + stall, freewheel ticking while rolling back, low drop; top: arrival chime + warm chord + heart bells; typing; FOLLOW: two bike bell rings, notification pop, tap + bright chime ----
const T_GO = 0.3, T_HILL = 2.6, T_TOP = 8.6, T_HEART = 8.9, T_STAND = 4.6, T_STALL = 6.0, T_BACK = 6.8, T_DOWN = 8.6, T_H2 = 9.6, T_H3 = 10.5;
const T_CTA = 12.9, T_RING1 = T_CTA + 1.2, T_BAN = T_RING1 + 0.15, T_TAP = T_RING1 + 1.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = T_GO; t < T_TOP; t += 0.16) click(t, 0.012, -0.35);
for (let t = T_GO, k = 0; t < T_STALL; k++) { click(t, 0.012, 0.35); t += 0.16 + 0.25 * Math.max(0, (t - T_HILL) / (T_STALL - T_HILL)); }
for (let k = 0; k < 6; k++) noise(T_STAND + 0.2 + k * 0.42, 0.3, 0.014, 0.35, 0.25, (p) => Math.sin(Math.PI * p));
tone(T_STALL, 160, 0.6, 0.015, 0.35, 0.08, 4); tone(T_STALL + 0.05, 168, 0.6, 0.01, 0.35, 0.08, 4);
for (let t = T_BACK; t < T_DOWN; t += 0.06) tone(t, 3000, 0.01, 0.005, 0.35, 0.001, 200);
thump(T_DOWN, 0.06, 90, 0.35); thump(T_DOWN + 0.6, 0.1, 42, 0);
{ const s0 = Math.floor((T_DOWN + 0.6) * SR), n = Math.floor(3.0 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HEART - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 24, 30); typing(T_H3, 23, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
const ring = (t) => { for (let k = 0; k < 2; k++) { tone(t + k * 0.12, 2900, 0.35, 0.02, 0.1, 0.001, 9); tone(t + k * 0.12, 3480, 0.3, 0.01, 0.1, 0.001, 11); } };
ring(T_RING1); ring(T_TAP);
tone(T_BAN + 0.3, 1320, 0.08, 0.025, 0, 0.002, 30); tone(T_BAN + 0.38, 1760, 0.1, 0.02, 0, 0.002, 30);
click(T_TAP, 0.06, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
