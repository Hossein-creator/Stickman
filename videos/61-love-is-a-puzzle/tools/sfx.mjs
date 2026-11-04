// ---- "love is a puzzle": soft room tone, a wooden click for every piece that snaps in (top: alternating sides, bottom: one side), the last piece together with a warm chord and bells; bottom: a sulky "hmph", a sour sting when she hides her piece, a low drone ----
const ORDER_N = 8, PLACE = 0.45, T_LAST = 5.6, T_HOLD = 6.4, T_ASK = 5.4, T_HIDE = 5.8, T_NEVER = 6.6, T_T1 = 9.2, T_T2 = 9.9, T_CARD = 11.6;
const TT = Array.from({ length: ORDER_N }, (_, k) => 0.5 + k * 0.6);
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
TT.forEach((t, k) => { wood(t + PLACE, 0.05, k % 2 ? -0.1 : -0.4); bell(t + PLACE, 79 + (k % 4) * 2, 0.008, -0.3, 0.4); });
TT.forEach((t) => wood(t + PLACE + 0.02, 0.035, 0.4));
wood(T_LAST + PLACE, 0.08, -0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD - 0.2, T_CARD + 0.5, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
noise(2.0, 0.3, 0.02, 0.4, 0.15, (p) => Math.sin(Math.PI * p)); tone(2.05, 200, 0.2, 0.02, 0.4, 0.01, 10);
tone(T_ASK, 400, 0.12, 0.025, 0.3, 0.005, 25);
tone(T_HIDE, hz(64), 0.5, 0.02, 0.4, 0.01, 4); tone(T_HIDE + 0.12, hz(63), 0.6, 0.02, 0.4, 0.01, 3.5);
thump(T_NEVER, 0.1, 42, 0.3);
{ const s0 = Math.floor(T_NEVER * SR), n = Math.floor((T_CARD - T_NEVER + 0.4) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0.3); } }
typing(T_T1, 19, 30); typing(T_T2, 24, 30);
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.92, 1.04, 1.16].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
