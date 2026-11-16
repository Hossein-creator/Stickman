// ---- "she waited up": quiet room tone, wall clock ticking (louder late at night), sad slow piano thinning per chapter; door + keys + steps each night; bubble pops; her heart cracks / shatters; cut whooshes; DAY 365 silence, paper rustle, "babe?" pop; typing; FOLLOW: clock chime, tap pop + bright chime ----
const C = [0, 4.4, 8.4, 12.2], IN = [0.9, 4.9, 8.9, 12.6], ASK = [1.6, 5.6], IG = [2.4, 6.4, 10.3], T_C1 = 2.6, T_C2 = 6.6, T_SHAT = 10.5;
const T_NOTE = 13.4, T_READ = 13.8, T_BABE = 15.0, T_L2 = 16.2, T_L3 = 17.2, T_CTA = 19.4, T_CLK = 19.8, T_REACH = 21.2, T_TAP = 21.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = 0.1; t < T_CTA; t += 1.0) click(t, 0.012 + 0.004 * (t > C[2] ? 1 : 0), 0.5);
const MEL = [64, 67, 71, 69, 67, 66, 64, 59, 60, 64, 67, 66];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12, 0.015 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.011, 0, 0.8); t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
IN.forEach((t, k) => { click(t - 0.35, 0.04, -0.6); for (let j = 0; j < 4; j++) tone(t - 0.5 + j * 0.05, 3000 + 300 * j, 0.03, 0.006, -0.6, 0.001, 80); const n = k === 3 ? 2 : k === 2 ? 2 : 6; for (let j = 0; j < n; j++) step(t + 0.3 + j * 0.5, 0.03, -0.4 + 0.15 * j); });
for (let j = 0; j < 5; j++) step(IG[2] + 0.3 + j * 0.45, 0.025, 0.2 + 0.1 * j);
[ASK[0], IG[0], ASK[1], IG[1], T_BABE].forEach((t) => tone(t, 700, 0.08, 0.02, 0, 0.002, 30));
[T_C1, T_C2].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, 0.2, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, 0.2, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
noise(T_NOTE, 0.35, 0.04, -0.1, 0.5, (p) => Math.sin(Math.PI * p));
{ const s0 = Math.floor((T_READ) * SR), n = Math.floor((T_CTA - T_READ) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
typing(T_L2, 23, 26); typing(T_L3, 23, 26);
for (let j = 0; j < 2; j++) step(T_CLK + 0.2 + j * 0.45, 0.03, 0.3);
[[0, 67], [0.4, 64], [0.8, 60]].forEach(([d, m]) => bell(T_CLK + 0.5 + d, m, 0.018, 0.4, 1.5));
click(T_TAP, 0.06, 0.3);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0.3, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
