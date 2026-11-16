// ---- "love is a bridge part 2": wind over the abyss, wooden knock per plank (top both sides, bottom her fast at the end), slow clock ticks while he waits, his steps away, low drop; top warm chord + heart bells; typing; FOLLOW: cloth unroll whoosh, rope tug + bright chime ----
const CYC = 0.9, T0 = 0.4, T_HUG = 6.3, T_HEART = 6.7, T_STAND = 4.2, T_LEAVE = 4.6, T_GONE = 6.4, T_SB = 6.9, CYB = 0.6, T_KNEEL = 10.6;
const T_H2 = 10.6, T_H3 = 11.8, T_CTA = 14.0, T_BAN = 14.8, T_TUG = 16.6;
{ let lp = 0, w = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; w += (rnd() - w) * 0.03; add(i, (lp * 0.07 + w * 0.025 * (0.6 + 0.4 * Math.sin(t * 0.7))) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let k = 0; k < 6; k++) wood(T0 + k * CYC + 0.6 * CYC, 0.05, -0.35);
for (let k = 0; k < 5; k++) wood(T0 + k * CYC + 0.6 * CYC + 0.03, 0.05, 0.3);
for (let t = 0.6; t < T_STAND; t += 0.6) click(t, 0.02, 0.4);
for (let t = T_LEAVE + 0.2; t < T_GONE + 0.4; t += 0.5) step(t, 0.03, 0.6);
thump(T_STAND + 0.2, 0.05, 50, 0.3);
for (let k = 0; k < 6; k++) wood(T_SB + k * CYB + 0.6 * CYB, 0.05, -0.2);
thump(T_KNEEL + 0.3, 0.06, 45, 0);
{ const s0 = Math.floor((T_KNEEL) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HUG - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 20, 30); typing(T_H3, 24, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
sweep(T_BAN, 0.7, 0.05, 0, 0.1, 0.5); thump(T_BAN + 0.7, 0.03, 120, 0);
noise(T_TUG - 0.1, 0.15, 0.04, 0, 0.4, (p) => Math.sin(Math.PI * p)); click(T_TUG, 0.06, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TUG + d, m, 0.022, 0, 1.4));
chord(T_TUG, DUR, [60, 64, 67, 72], 0.01);
