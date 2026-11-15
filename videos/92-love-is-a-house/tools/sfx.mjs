// ---- "love is a house": quiet night tone; brick pick scrape + clack per placed brick (top both sides, bottom one side), roof lift strain, top: roof thunk, light switch click, warm chord + heart bells; bottom: creak, crash + rubble + low drop; typing; FOLLOW: soft smoke whoosh, cloud chime, switch click + bright chime ----
const CYC = 0.8, T0 = 0.4, T_R0 = 5.5, T_R1 = 7.0, T_LIGHT = 7.5, T_HEART = 7.9;
const T_BR0 = 6.9, T_BR1 = 8.2, T_FALL = 8.6, T_HIT = 8.9, T_KNEEL = 9.3, T_LOOK = 9.8, T_H2 = 10.2, T_H3 = 11.4;
const T_CTA = 13.6, T_SMK = 14.3, T_CLOUD = 15.3, T_TAP = 16.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const brick = (k, pan) => { const tp = T0 + k * CYC; noise(tp + 0.15, 0.12, 0.02, pan, 0.3, (p) => Math.sin(Math.PI * p)); wood(tp + 0.72 * CYC, 0.05, pan); click(tp + 0.72 * CYC + 0.02, 0.02, pan); };
for (let k = 0; k < 6; k++) { brick(k, -0.4); brick(k + 0.04, -0.1); }
for (let k = 0; k < 8; k++) brick(k, 0.35);
noise(T_R0 + 0.4, 1.4, 0.02, -0.2, 0.08, (p) => Math.sin(Math.PI * p));
thump(T_R1, 0.07, 80, -0.2); wood(T_R1, 0.05, -0.2);
click(T_LIGHT, 0.05, -0.2); tone(T_LIGHT, 120, 1.2, 0.01, -0.2, 0.05, 2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIGHT - 0.2, T_CTA + 0.6, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
for (let k = 0; k < 5; k++) noise(T_BR0 + 0.3 + k * 0.38, 0.3, 0.014, 0.35, 0.25, (p) => Math.sin(Math.PI * p));
tone(T_FALL - 0.1, 140, 0.5, 0.015, 0.3, 0.08, 4); tone(T_FALL - 0.05, 150, 0.5, 0.01, 0.3, 0.08, 4);
thump(T_HIT, 0.12, 55, 0.2); noise(T_HIT, 0.9, 0.06, 0.1, 0.3, (p) => (1 - p) ** 2);
for (let k = 0; k < 7; k++) wood(T_HIT + 0.12 + k * 0.07 + 0.02 * Math.sin(k * 5), 0.035, -0.1 + 0.05 * k);
{ const s0 = Math.floor((T_HIT + 0.3) * SR), n = Math.floor(3.5 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
typing(T_H2, 26, 30); typing(T_H3, 26, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
sweep(T_SMK, 1.4, 0.04, 0, 0.03, 0.2);
[[0, 72], [0.1, 76], [0.2, 79]].forEach(([d, m]) => bell(T_CLOUD + d, m, 0.014, 0, 1.0));
click(T_TAP, 0.07, 0.1);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
