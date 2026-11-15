// ---- "seen.": quiet room tone, sad slow piano that thins per chapter; whoosh + low hit per cut; message send swoosh + pop, her phone buzz, soft "seen" tick, "k" pop, ringing + decline beep; his heart cracks / shatters; phone on the table, steps to the door + door; DAY 366 morning birds, her send, his phone buzzing in the empty room; typing; FOLLOW: steps in, paper flip, heart whoosh, pop + bright chime ----
const C = [0, 4.3, 8.4, 12.2, 17.8];
const T_S1 = 0.9, T_A1 = 1.8, T_IG1 = 2.4, T_C1 = 2.6, T_S2 = 4.9, T_A2 = 5.6, T_IG2 = 6.6, T_C2 = 6.8, T_RING = 8.8, T_IG3 = 10.2, T_C3 = 10.4;
const T_S4 = 12.8, T_A4 = 13.6, T_IG4 = 14.4, T_SHAT = 14.8, T_PUT = 15.5, T_GO = 16.0, T_OUT = 17.6;
const T_WAKE = 18.2, T_HS = 19.0, T_HA = 19.7, T_L2 = 20.4, T_L3 = 21.4, T_CTA = 23.6, T_IN = 23.9, T_FLIP = 25.3, T_HEARTF = 26.0, T_TAP = 26.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [64, 67, 71, 69, 67, 66, 64, 59, 60, 64, 67, 66, 64, 62, 59, 57];
for (let t = 0.2, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12, 0.015 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.011, 0, 0.8); t += 0.75 + 0.15 * ch + (t > T_GO ? 0.4 : 0); }
[C[1], C[2], C[3], C[4]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
const send = (t, pan) => { sweep(t, 0.35, 0.04, pan, 0.1, 0.6); tone(t + 0.02, 1046, 0.08, 0.015, pan, 0.002, 30); };
const pbuzz = (t, pan, d = 0.3) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * 170 * tt) * (Math.sin(2 * Math.PI * 25 * tt) > 0 ? 1 : 0.2) * 0.02, pan); } };
[T_S1, T_S2, T_S4].forEach((t) => send(t, -0.3)); [T_A1, T_A2, T_A4].forEach((t) => pbuzz(t, 0.4));
[T_IG1, T_A2 + 0.3, T_IG4].forEach((t) => { tone(t, 1600, 0.05, 0.012, -0.2, 0.001, 60); tone(t + 0.07, 2000, 0.05, 0.01, -0.2, 0.001, 60); });
send(T_IG2, 0.3); tone(T_IG2 + 0.6, 700, 0.08, 0.02, -0.2, 0.002, 30);
for (let t = T_RING; t < T_IG3; t += 0.8) { tone(t, 880, 0.35, 0.012, 0.4, 0.01, 4); tone(t + 0.4, 740, 0.35, 0.012, 0.4, 0.01, 4); pbuzz(t, 0.4, 0.5); }
tone(T_IG3, 480, 0.12, 0.02, -0.2, 0.002, 10); tone(T_IG3 + 0.15, 380, 0.2, 0.02, -0.2, 0.002, 8);
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.1, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.1, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
click(T_PUT, 0.05, -0.4); thump(T_PUT, 0.03, 120, -0.4);
for (let t = T_GO + 0.2; t < T_OUT - 0.3; t += 0.5) step(t, 0.035, -0.5);
click(T_OUT - 0.3, 0.05, -0.7); thump(T_OUT - 0.25, 0.05, 70, -0.7);
for (let k = 0; k < 6; k++) { tone(C[4] + 0.3 + k * 0.45, 3200 + 300 * (k % 3), 0.06, 0.006, 0.5, 0.005, 30); tone(C[4] + 0.38 + k * 0.45, 3700, 0.05, 0.005, 0.5, 0.005, 30); }
send(T_HS, 0.3); pbuzz(T_HA, -0.5, 0.4); pbuzz(T_HA + 0.7, -0.5, 0.4);
{ const s0 = Math.floor((T_HA) * SR), n = Math.floor((T_CTA - T_HA) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
typing(T_L2, 23, 26); typing(T_L3, 13, 26);
for (let t = T_IN + 0.1; t < T_IN + 1.2; t += 0.5) step(t, 0.035, -0.3);
noise(T_FLIP, 0.25, 0.05, 0, 0.5, (p) => Math.sin(Math.PI * p));
sweep(T_HEARTF, T_TAP - T_HEARTF + 0.1, 0.05, 0.3, 0.06, 0.5);
click(T_TAP, 0.06, 0); thump(T_TAP, 0.05, 90, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
