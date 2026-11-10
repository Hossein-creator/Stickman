// ---- "one-sided love": quiet room tone + sad slow piano (bells) that thins out each chapter; whoosh + low hit on every chapter cut; his heart cracks (glass tick + low crack), shatter on DAY 365; bubble pops; candle blown out; footsteps away; phone drop; quote bells; FOLLOW: dive whoosh, UI pop, typing, tap click + healing chime + happy arpeggio ----
const C = [0, 2.5, 5.0, 7.5], T_FLOW = 0.0, T_PUSH = 1.1, T_C1 = 1.5, T_ARMS = 2.8, T_TURN = 3.5, T_C2 = 4.0, T_LOVE = 5.2, T_MHM = 6.0, T_C3 = 6.5;
const T_CAKE = 7.55, T_NOT = 8.5, T_BLOW = 8.9, T_SHAT = 9.2, T_DOWNC = 9.5, T_GO = 9.9, T_OUT = 11.3, T_LOOK = 11.0, T_BABE = 11.2, T_DROP = 11.7, T_L2 = 10.0, T_L3 = 10.7, T_Q = 99, T_PH = 12.0, T_WALK = 12.4, T_TAP = 13.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
// sad piano: A minor line, one note per ~0.75 s, gets sparser
const MEL = [69, 72, 76, 74, 72, 71, 69, 64, 65, 69, 72, 71, 69, 67, 64, 62];
for (let t = 0.2, i = 0; t < T_PH; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12, 0.016 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.012, 0, 0.8); t += 0.75 + 0.15 * ch + (t > T_GO ? 0.4 : 0); }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, 0.1, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, 0.1, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
[T_LOVE, T_MHM, T_CAKE + 0.2, T_NOT, T_BABE].forEach((t) => tone(t, 700, 0.08, 0.02, 0, 0.002, 30));
noise(T_BLOW, 0.3, 0.05, 0.1, 0.3, (p) => Math.sin(Math.PI * p));
noise(T_PUSH + 0.6, 0.06, 0.04, 0.2, 0.3, (p) => 1 - p);
thump(T_DOWNC + 0.4, 0.04, 90, 0.1);
for (let t = T_GO + 0.2; t < T_OUT; t += 0.5) step(t, 0.035, 0.4);
thump(T_DROP + 0.38, 0.08, 120, -0.1); click(T_DROP + 0.38, 0.05, -0.1);
typing(T_L2, 26, 30); typing(T_L3, 29, 30);
{ const s0 = Math.floor((T_GO) * SR), n = Math.floor((T_PH - T_GO) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 1.0) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.02 * e, 0); } }
bell(T_Q, 57, 0.02, 0, 0.9); bell(T_Q + 0.5, 60, 0.018, 0, 0.9); bell(T_Q + 1.0, 64, 0.018, 0, 0.9); bell(T_Q + 1.6, 69, 0.016, 0, 0.7);
sweep(T_PH - 0.1, 1.0, 0.09, 0, 0.04, 0.5); tone(T_PH + 0.9, 880, 0.12, 0.03, 0, 0.002, 20);
typing(T_PH + 1.0, 33, 30);
for (let t = T_WALK; t < T_WALK + 1.0; t += 0.25) step(t, 0.025, 0.3);
click(T_TAP, 0.09, 0); thump(T_TAP, 0.05, 90, 0);
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(T_TAP + 0.2 + d, m, 0.022, 0, 1.3));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.2, DUR, [60, 64, 67, 72], 0.01);
