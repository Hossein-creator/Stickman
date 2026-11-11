// ---- "ignored all day": warm room tone + soft piano that gets sadder per chapter; whoosh + hit per cut; bubble pops; his steps away; heart cracks; 8 PM: light switch click + silence, candle crackle, footsteps, banner whoosh + party horn + confetti, heart heal chime, warm chord; FOLLOW: banner whoosh, cord pull click, flag flips (ticks), bright chime ----
const C = [0, 3.9, 8.0, 12.1], T_GM = 0.4, T_PAST = 1.9, T_C1 = 2.4, T_IN1 = 4.1, T_ASK = 5.0, T_NOTNOW = 6.1, T_C2 = 6.6, T_DIN = 8.4, T_IN2 = 8.6, T_NH = 9.9, T_C3 = 10.4;
const T_SAD = 12.4, T_OFF = 13.4, T_CAKE = 14.1, T_BAN = 15.0, T_HEAL = 15.6, T_HUG = 16.2, T_L2 = 16.4, T_L3 = 17.3, T_CTA = 19.3, T_PULL = 20.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)) * (t > T_OFF && t < T_BAN ? 0.4 : 1), 0); } }
const MEL = [72, 76, 79, 76, 74, 72, 71, 67, 69, 72, 71, 69, 67, 64];
for (let t = 0.2, i = 0; t < T_OFF; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12 - (ch > 1 ? 3 : 0), 0.015 - 0.002 * ch, 0, 1.0); t += 0.7 + 0.15 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.1, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.1, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05, 60, 0); });
[T_GM, T_ASK, T_NOTNOW, T_DIN, T_NH, T_BAN + 0.1].forEach((t) => tone(t, 700, 0.08, 0.02, 0, 0.002, 30));
for (let t = T_PAST + 0.2; t < T_PAST + 1.8; t += 0.45) step(t, 0.035, 0.4);
for (let t = T_IN1; t < T_IN1 + 1.0; t += 0.45) step(t, 0.035, 0.4);
for (let t = T_NOTNOW + 0.4; t < T_NOTNOW + 2.0; t += 0.45) step(t, 0.035, 0.4);
for (let t = T_IN2; t < T_NH + 1.9; t += 0.45) step(t, 0.03, -0.3 + (t - T_IN2) * 0.2);
click(T_OFF, 0.08, 0.3); thump(T_OFF, 0.04, 90, 0.3);
for (let t = T_CAKE; t < T_HUG; t += 0.07 + 0.05 * Math.abs(rnd())) noise(t, 0.02, 0.005, 0.2, 0.6, (p) => 1 - p);
for (let t = T_CAKE; t < T_CAKE + 1.2; t += 0.45) step(t, 0.03, 0.4);
sweep(T_BAN - 0.1, 0.6, 0.05, 0, 0.05, 0.4);
{ const s0 = Math.floor(T_BAN * SR), n = Math.floor(0.5 * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (520 + 120 * tt) * tt) * 0.03 * Math.min(1, tt / 0.02) * Math.min(1, (0.5 - tt) / 0.1), 0); } }
for (let k = 0; k < 14; k++) noise(T_BAN + 0.05 + k * 0.03, 0.04, 0.02, (k % 2 ? 0.3 : -0.3), 0.8, (p) => 1 - p);
[[0, 76], [0.08, 81], [0.16, 84], [0.24, 88]].forEach(([d, m]) => bell(T_HEAL + d, m, 0.02, 0, 1.3));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.0); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_BAN, T_CTA + 0.5, [60, 64, 67, 72], 0.009);
typing(T_L2, 23, 26); typing(T_L3, 23, 26);
sweep(T_CTA + 0.1, 0.6, 0.05, 0, 0.05, 0.4); typing(T_CTA + 0.7, 16, 30);
click(T_PULL, 0.08, 0); thump(T_PULL, 0.05, 90, 0);
for (let k = 0; k < 7; k++) tone(T_PULL + k * 0.07, 2000 + 120 * k, 0.03, 0.012, 0, 0.001, 60);
[[0.3, 84], [0.37, 88], [0.44, 91]].forEach(([d, m]) => bell(T_PULL + d, m, 0.022, 0, 1.4));
for (let k = 0; k < 14; k++) noise(T_PULL + 0.05 + k * 0.03, 0.04, 0.02, (k % 2 ? 0.3 : -0.3), 0.8, (p) => 1 - p);
chord(T_PULL, DUR, [60, 64, 67, 72], 0.01);
typing(T_PULL + 0.5, 27, 30);
