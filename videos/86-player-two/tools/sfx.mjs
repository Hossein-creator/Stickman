// ---- "player two": quiet room tone + muffled game bleeps from the TV, sad slow piano that thins out per chapter; whoosh + low hit per cut; her heart cracks / shatters; bubble pops; plate on the floor; gift down; her steps to the door + door click; VICTORY fanfare; gamepad drop; FOLLOW: dive whoosh, 8-bit block bump + coin arpeggio, player-2 jingle ----
const C = [0, 4.9, 8.7, 13.2], T_IGN = 2.9, T_PLATE = 3.2, T_C1 = 3.5, T_LATER = 6.7, T_C2 = 7.5, T_TIX = 9.4, T_PLAY = 11.2, T_C3 = 12.0;
const T_GIFT = 14.0, T_NOT = 15.3, T_SHAT = 16.4, T_DOWNG = 16.9, T_GO = 17.6, T_OUT = 20.0, T_WIN = 19.4, T_TURNB = 20.1, T_DROPC = 21.0, T_L2 = 20.4, T_L3 = 21.6;
const T_PH = 24.0, T_WALK = 25.0, T_TAP = 26.4, T_P2 = 27.2;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const sq = (t, f, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, (Math.sin(2 * Math.PI * f * tt) > 0 ? 1 : -1) * g * Math.min(1, (d - tt) / 0.02), pan); } };
for (let t = 0.1; t < T_WIN; t += 0.18) { const muff = t > C[3] ? 0.5 : 1; sq(t, [523, 659, 784, 659, 587][Math.floor(t / 0.18) % 5], 0.06, 0.004 * muff, 0.5); }
const MEL = [69, 72, 76, 74, 72, 71, 69, 64, 65, 69, 72, 71, 69, 67, 64, 62];
for (let t = 0.2, i = 0; t < T_PH; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12, 0.015 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.011, 0, 0.8); t += 0.75 + 0.15 * ch + (t > T_GO ? 0.4 : 0); }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.1, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.1, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
[C[1] + 0.9, T_LATER, T_TIX + 0.2, T_PLAY, T_GIFT + 0.2, T_TURNB + 0.15].forEach((t) => tone(t, 700, 0.08, 0.02, 0, 0.002, 30));
tone(T_PLATE + 0.35, 1900, 0.12, 0.02, -0.1, 0.001, 30); thump(T_PLATE + 0.35, 0.03, 120, -0.1);
thump(T_DOWNG + 0.5, 0.04, 90, -0.1);
for (let t = T_GO + 0.2; t < T_OUT - 0.4; t += 0.5) step(t, 0.035, -0.4);
click(T_OUT - 0.4, 0.05, -0.6); thump(T_OUT - 0.35, 0.05, 70, -0.6);
[523, 659, 784, 1046].forEach((f, i) => sq(T_WIN + i * 0.1, f, 0.12, 0.012, 0.4)); sq(T_WIN + 0.4, 1046, 0.4, 0.012, 0.4);
thump(T_DROPC + 0.38, 0.08, 120, 0); click(T_DROPC + 0.38, 0.05, 0);
{ const s0 = Math.floor((T_DROPC) * SR), n = Math.floor((T_PH - T_DROPC) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
typing(T_L2, 26, 26); typing(T_L3, 28, 26);
sweep(T_PH - 0.1, 1.0, 0.09, 0, 0.04, 0.5);
typing(T_PH + 0.9, 37, 30);
for (let t = T_WALK; t < T_TAP - 0.45; t += 0.22) sq(t, 196, 0.03, 0.006, 0);
[392, 523, 659].forEach((f, i) => sq(T_TAP - 0.4 + i * 0.05, f, 0.05, 0.008, 0));
sq(T_TAP, 220, 0.06, 0.02, 0); thump(T_TAP, 0.05, 90, 0);
[988, 1319, 1568, 1976].forEach((f, i) => sq(T_TAP + 0.08 + i * 0.07, f, 0.08, 0.01, 0));
[659, 784, 988, 1319, 1046, 1319].forEach((f, i) => sq(T_P2 + i * 0.12, f, 0.11, 0.009, 0));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.2, DUR, [60, 64, 67, 72], 0.009);
