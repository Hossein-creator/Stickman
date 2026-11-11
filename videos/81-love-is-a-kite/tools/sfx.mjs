// ---- "love is a kite": night wind bed; a gust whoosh (from the right) per gust; kite flutter; top: rising chime as it climbs, heart pop + warm chord + bells; bottom: phone taps, string slip (zip) + low drop, drone; typing; quote: soft bells per line; FOLLOW: whoosh as the heart flies, pop when it becomes the button, tap click + bright "followed" chime ----
const GU = [0.9, 2.6, 4.2], GD = 1.1, T_LET = 1.7, T_SLIP = 4.75, T_HEART = 6.2, T_T1 = 7.7, T_T2 = 8.4, T_Q = 9.6, T_CTA = 13.4, T_PILL = T_CTA + 1.2, T_TAP = T_PILL + 2.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = 0.3; t < T_PILL; t += 0.09 + 0.05 * Math.abs(rnd())) noise(t, 0.03, 0.006, 0.35, 0.5, (p) => 1 - p);
GU.forEach((a) => sweep(a, GD + 0.3, 0.12, 0.5, 0.03, 0.35));
GU.forEach((a, i) => bell(a + GD, 76 + i * 3, 0.012, 0.3, 1.5));
for (let t = T_LET + 0.4; t < T_SLIP; t += 0.4 + 0.3 * Math.abs(rnd())) tone(t, 2400, 0.02, 0.005, -0.3, 0.001, 80);
noise(T_SLIP - 0.1, 0.35, 0.05, 0.2, 0.7, (p) => Math.sin(Math.PI * p));
sweep(T_SLIP, 1.4, 0.06, 0.6, 0.05, 0.3);
thump(T_SLIP + 0.3, 0.1, 42, 0);
{ const s0 = Math.floor((T_SLIP + 0.3) * SR), n = Math.floor((T_Q - T_SLIP) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.02 * e, 0.3); } }
sweep(T_HEART - 0.3, 0.6, 0.05, 0, 0.05, 0.4); tone(T_HEART, 600, 0.2, 0.03, 0, 0.005, 12);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HEART - 0.3, T_TAP - 0.2, [57, 61, 64, 69], 0.010);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + 0.2 + d, m, 0.02, 0, 1.2));
typing(T_T1, 13, 30); typing(T_T2, 17, 30);
bell(T_Q, 69, 0.018, 0, 1.0); bell(T_Q + 0.7, 72, 0.015, 0, 1.0); bell(T_Q + 1.2, 76, 0.015, 0, 1.0);
sweep(T_CTA - 0.1, 1.1, 0.08, 0, 0.04, 0.4); sweep(T_CTA + 0.3, 0.9, 0.05, 0.2, 0.05, 0.5);
tone(T_PILL, 880, 0.15, 0.04, 0, 0.002, 18); tone(T_PILL + 0.03, 1320, 0.12, 0.02, 0, 0.002, 22);
typing(T_PILL + 0.5, 32, 34);
for (let k = 0; k < 6; k++) tone(T_TAP + 0.4 + k * 0.18, hz(79 + (k % 2) * 5), 0.12, 0.012, k % 2 ? 0.3 : -0.3, 0.002, 20);
click(T_TAP, 0.08, 0); thump(T_TAP, 0.05, 90, 0);
chord(T_TAP, DUR, [60, 64, 67, 72], 0.011);
[[0, 84], [0.07, 88], [0.14, 91]].forEach(([d, m]) => bell(T_TAP + 0.05 + d, m, 0.022, 0, 1.4));
