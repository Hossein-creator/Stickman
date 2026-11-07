// ---- "the comeback": night tone + crickets, her "OUT!", a pillow whoosh + soft thump on his head, a big door slam, sad knocking, a sigh, soft snores; morning: birds, the door creaks open, plates clink, his small "sorry.", her "aww...", warm chord + bells at the hug; slams + card ----
const T_OUT = 0.3, T_PUSH = 0.5, T_THROW = 1.0, T_HIT = 1.3, T_SLAM = 1.15, T_KNOCK = 1.6, T_SIT = 2.2, T_ZZZ = 2.7, T_DAY = 3.8;
const T_OPEN = 4.2, T_SORRY = 4.6, T_GASP = 5.3, T_PULL = 6.0, T_HUG = 6.3, T_HOLD = 6.7, T_H1 = 7.4, T_H2 = 8.3, T_CARD = 9.4;
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 1.4; t < T_DAY - 0.2; t += 0.5 + 0.3 * rnd()) for (let k = 0; k < 3; k++) tone(t + k * 0.06, 4300 + 200 * rnd(), 0.04, 0.005, rnd() - 0.5, 0.004, 60);
shout(T_OUT, 400, 0.3, 0.045, -0.2);
noise(T_THROW, 0.3, 0.04, 0.2, 0.4, (p) => Math.sin(Math.PI * p)); thump(T_HIT, 0.04, 110, 0.2); noise(T_HIT, 0.1, 0.03, 0.2, 0.3, (p) => 1 - p);
thump(T_SLAM + 0.15, 0.16, 45, -0.1); noise(T_SLAM + 0.15, 0.08, 0.08, -0.1, 0.8, (p) => 1 - p);
for (let k = 0; k < 3; k++) { thump(T_KNOCK + 0.15 + k * 0.17, 0.05, 140, -0.1); click(T_KNOCK + 0.15 + k * 0.17, 0.02, -0.1); }
noise(T_SIT, 0.7, 0.025, 0.2, 0.2, (p) => Math.sin(Math.PI * p) * (1 - p));
for (let k = 0; k < 2; k++) { const t = T_ZZZ + k * 0.55; noise(t, 0.45, 0.01, 0.2, 0.2, (p) => Math.sin(Math.PI * p)); tone(t, 90, 0.45, 0.01, 0.2, 0.05, 2); }
for (let t = T_DAY + 0.1; t < T_H1; t += 0.8 + 0.4 * rnd()) { tone(t, 2700 + 400 * rnd(), 0.08, 0.007, rnd() - 0.5, 0.01, 30); tone(t + 0.1, 3100 + 300 * rnd(), 0.06, 0.006, rnd() - 0.5, 0.01, 30); }
{ const s0 = Math.floor(T_OPEN * SR), n = Math.floor(0.45 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n; ph += 2 * Math.PI * (300 + 200 * Math.sin(p * 9)) / SR; add(s0 + i, Math.sin(ph) * 0.012 * Math.sin(Math.PI * p), -0.2); } }
tone(T_SORRY - 0.2, 2100, 0.2, 0.01, 0.2, 0.002, 20); tone(T_SORRY - 0.1, 1700, 0.2, 0.008, 0.2, 0.002, 20);
shout(T_SORRY, 230, 0.4, 0.03, 0.2);
shout(T_GASP + 0.1, 420, 0.6, 0.035, -0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_GASP, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
