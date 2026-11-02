// ---- "love is a rope": dripping cave ambience, the lift (strain + whoosh), she lands on top, rope uncoils and creaks while she pulls him up, warm chord + birds when they're out; bottom: the rope falls into the pit, her steps fade, two hopeless jumps, low drone ----
const T_UP = 0.6, T_CROUCH = 1.7, T_LIFT = 2.3, T_OUT = 3.1, T_KNEEL = 3.5, T_GRAB = 4.2, T_CLIMB = 4.6, T_ON = 5.4, T_HUG = 6.0, T_HOLD = 6.6;
const T_PHONE = 3.5, T_LEAVE = 4.2, T_JUMP1 = 4.9, T_JUMP2 = 5.5, T_SIT = 6.4, T_T1 = 9.0, T_T2 = 9.7, T_CARD = 11.4;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.008; add(i, lp * 0.14 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.3; t < T_CARD; t += 0.9 + 0.5 * rnd()) bell(t, 96 + Math.floor(rnd() * 5), 0.006, rnd() - 0.5, 0.3);
tone(T_LIFT, 140, 0.4, 0.03, 0, 0.03, 5); sweep(T_LIFT, T_OUT - T_LIFT, 0.04, 0, 0.02, 0.35); step(T_OUT, 0.06, -0.2);
noise(T_KNEEL, 0.3, 0.02, -0.2, 0.4, (p) => Math.sin(Math.PI * p));
for (let t = T_CLIMB; t < T_ON; t += 0.2) { tone(t, 380 + 30 * rnd(), 0.18, 0.01, -0.2, 0.03, 8); }
tone(T_CLIMB, 160, 0.5, 0.025, -0.2, 0.03, 4); step(T_ON, 0.06, -0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_ON, T_CARD + 0.5, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
for (let t = T_ON + 0.3; t < T_CARD; t += 0.7) { tone(t, 2600, 0.06, 0.008, -0.4, 0.005, 30); tone(t + 0.08, 3100, 0.05, 0.006, -0.4, 0.005, 30); }
noise(T_LEAVE + 0.1, 0.4, 0.03, 0.3, 0.3, (p) => Math.sin(Math.PI * p)); thump(T_LEAVE + 0.55, 0.06, 70, 0.3);
for (let t = T_LEAVE; t < T_LEAVE + 1.8; t += 0.3) step(t, 0.022 * (1 - (t - T_LEAVE) / 2), 0.2);
[T_JUMP1, T_JUMP2].forEach((t) => step(t + 0.4, 0.05, 0.3));
tone(T_SIT, hz(64), 0.6, 0.02, 0.3, 0.01, 3.5); tone(T_SIT + 0.14, hz(63), 0.8, 0.02, 0.3, 0.01, 3);
{ const s0 = Math.floor(T_SIT * SR), n = Math.floor((T_CARD - T_SIT + 0.4) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0.3); } }
typing(T_T1, 22, 30); typing(T_T2 + 0.3, 14, 30);
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.92, 1.04, 1.16].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
