// ---- "next time": quiet room tone, clock ticks, sad slow piano thinning per chapter; door + steps for her each time; bubble pops; his heart cracks / shatters; candle hiss; fast clock ticks while he waits; phone buzz + text pop; blow-out puff, steps out + door; 1 AM door, "babe? I'm home!", low drop; typing; FOLLOW: tiny sparkle as the stone flips, tap pop + bright chime ----
const C = [0, 4.4, 8.6, 12.4, 18.6], ASK = [1.0, 5.0], IG = [2.0, 6.2, 10.2], T_C1 = 2.2, T_C2 = 6.4, T_C3 = 10.4;
const T_RING = 12.8, T_SPIN = 13.8, T_TXT = 15.2, T_SHAT = 15.6, T_BLOW = 16.4, T_GO = 16.9, T_OUT = 18.2, T_IN = 18.9, T_HOME = 19.6, T_SEE = 20.4, T_L2 = 21.0, T_L3 = 22.0, T_CTA = 23.6, T_FLIP = 24.4, T_TAP = 25.4;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = 0.1; t < T_CTA; t += (t > T_SPIN && t < T_TXT ? 0.12 : 1.0)) click(t, 0.012, 0.5);
const MEL = [64, 67, 71, 69, 67, 66, 64, 59, 60, 64, 67, 66];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12, 0.015 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.011, 0, 0.8); t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3], C[4]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
const door = (t) => { click(t, 0.04, -0.6); thump(t + 0.05, 0.04, 70, -0.6); };
[IG[0] + 1.6, C[1] + 3.2, C[2] + 0.5, T_OUT - 0.5, T_IN].forEach(door);
for (let t = 0.7; t < 1.3; t += 0.45) step(t, 0.025, 0.4); for (let t = IG[0] + 0.5; t < IG[0] + 2.0; t += 0.45) step(t, 0.025, -0.2);
for (let t = C[1] + 0.9; t < C[1] + 3.5; t += 0.45) step(t, 0.025, 0.2 - (t - C[1]) * 0.15);
for (let t = C[2] + 0.5; t < C[2] + 1.4; t += 0.45) step(t, 0.025, -0.4); for (let t = IG[2] + 0.4; t < IG[2] + 2.0; t += 0.45) step(t, 0.025, 0.3);
[ASK[0], IG[0], ASK[1], IG[1], IG[2], T_IN + 0.3].forEach((t) => tone(t, 700, 0.08, 0.02, 0, 0.002, 30));
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.1, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.1, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
tone(T_RING + 0.4, 1800, 0.1, 0.015, 0, 0.001, 30);
{ const s0 = Math.floor((T_TXT - 0.3) * SR), n = Math.floor(0.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * 170 * tt) * (Math.sin(2 * Math.PI * 25 * tt) > 0 ? 1 : 0.2) * 0.02, 0); } }
tone(T_TXT, 1046, 0.08, 0.015, 0, 0.002, 30);
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
noise(T_BLOW, 0.35, 0.05, 0, 0.3, (p) => Math.sin(Math.PI * p));
for (let t = T_GO + 0.4; t < T_OUT - 0.3; t += 0.5) step(t, 0.03, -0.4);
{ const s0 = Math.floor((T_SEE) * SR), n = Math.floor((T_CTA - T_SEE) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
typing(T_L2, 26, 26); typing(T_L3, 24, 26);
[[0, 96], [0.07, 100], [0.14, 103]].forEach(([d, m]) => bell(T_FLIP + d, m, 0.012, 0, 0.8));
click(T_TAP, 0.06, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
