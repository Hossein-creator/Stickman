// ---- "love is a seesaw": playground wind, footsteps, the seesaw creak + thunk on every swing (top), laughs, warm chord on "together"; bottom: his pushes thunk but nothing moves, phone taps, her steps leaving, low drone ----
const T_SIT = 1.5, T_SWING = 2.1, T_HOLD = 7.4, T_PAT = 2.4, T_PUSH = 3.5, T_PUSH1 = 4.7, T_LEAVE = 5.0, T_STUCK = 5.8, T_T1 = 9.4, T_T2 = 10.0, T_CARD = 11.6, PER = 1.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.006; add(i, lp * 0.12 * (0.7 + 0.3 * Math.sin(t * 0.6)) * Math.min(1, t / 0.8) * (1 - smooth(t, DUR - 1.2, DUR)), Math.sin(t * 0.3) * 0.4); } }
for (let t = 0.1; t < T_SIT; t += 0.3) { step(t, 0.025, -0.3); step(t + 0.05, 0.022, 0.3); }
// top: creak + ground thunk each half swing
for (let t = T_SWING + PER / 4; t < T_CARD; t += PER / 2) { tone(t - 0.2, 420 + 30 * Math.sin(t), 0.35, 0.012, -0.3, 0.05, 5); thump(t + PER / 4 - 0.02, 0.06, 80, -0.3); }
// laughs (top)
for (let t = T_SWING + 0.5; t < T_CARD - 0.5; t += 0.9) for (let k = 0; k < 3; k++) tone(t + k * 0.12, 330 + 40 * (k % 2), 0.08, 0.015, -0.3, 0.005, 20);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, T_CARD + 0.5, [57, 61, 64, 69], 0.012);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// bottom: pat, pushes (thunk, no swing), phone taps, she leaves, drone
[0, 0.25, 0.5].forEach((d) => wood(T_PAT + 0.3 + d, 0.03, 0.3));
for (let t = T_PUSH; t < T_PUSH1; t += 0.6) { tone(t + 0.1, 150, 0.25, 0.022, 0.3, 0.02, 6); thump(t + 0.3, 0.08, 70, 0.3); }
for (let t = 1.8; t < T_LEAVE; t += 0.5 + 0.2 * rnd()) click(t, 0.015, 0.3);
for (let t = T_LEAVE; t < T_LEAVE + 1.6; t += 0.3) step(t, 0.022 * (1 - (t - T_LEAVE) / 1.8), 0.1);
tone(T_STUCK, hz(64), 0.5, 0.02, 0.3, 0.01, 4); tone(T_STUCK + 0.12, hz(63), 0.6, 0.02, 0.3, 0.01, 3.5);
{ const s0 = Math.floor(T_STUCK * SR), n = Math.floor((T_CARD - T_STUCK + 0.4) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.035 * e, 0.3); } }
typing(T_T1, 13, 30); typing(T_T2, 20, 30);
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.95, 1.1].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
