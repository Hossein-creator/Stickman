// ---- "just a friend": room tone, phone buzz + notification pings, speech pops, whooshes for each flying gift (roses, a big teddy thud, a ring box with a sparkle sting), a block "stamp", throws out, warm chord, end card ----
const T_BUZZ = 0.6, T_WHO = 1.3, T_FRIEND = 2.0, T_YEAH1 = 2.9, T_ROSES = 3.8, T_YEAH2 = 4.4, T_TEDDY = 5.3, T_YEAH3 = 5.9;
const T_RING = 7.0, T_OPEN = 7.4, T_DOTS = 7.7, T_LOOK = 8.3, T_SNAP = 8.75, T_BLOCK = 9.0, T_OUT = 9.35, T_CUDDLE = 9.9, T_HOLD = 10.3, T_H1 = 11.0, T_H2 = 12.0, T_CARD = 13.2;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
// phone: buzz + ping for each heart
for (let i = 0; i < 9; i++) { const t = T_BUZZ + i * 0.75; if (t > T_RING) break; tone(t, 160, 0.18, 0.02, 0.2, 0.005, 8); bell(t + 0.05, 88, 0.012, 0.2, 0.4); }
// speech pops
[[T_WHO, 520], [T_FRIEND, 660], [T_YEAH1, 440], [T_YEAH2, 420], [T_YEAH3, 380], [T_DOTS, 300]].forEach(([t, f]) => { tone(t, f, 0.12, 0.03, 0, 0.005, 25); tone(t + 0.07, f * 1.25, 0.12, 0.025, 0, 0.005, 25); });
// gifts flying in
sweep(T_ROSES, 0.3, 0.05, 0.4, 0.02, 0.4); noise(T_ROSES + 0.3, 0.12, 0.04, 0.2, 0.7, (p) => 1 - p);
sweep(T_TEDDY, 0.4, 0.06, 0.4, 0.02, 0.35); thump(T_TEDDY + 0.4, 0.22, 50, 0.3); tone(T_TEDDY + 0.42, 180, 0.3, 0.03, 0.3, 0.005, 10);
sweep(T_RING, 0.35, 0.05, 0.4, 0.02, 0.5); click(T_RING + 0.35, 0.05, 0.2);
// ring opens: sparkle sting + record-scratch silence feel
[[0, 88], [0.06, 93], [0.12, 100]].forEach(([d, m]) => bell(T_OPEN + d, m, 0.03, 0, 1.0));
thump(T_OPEN, 0.12, 40, 0);
// snap shut, BLOCKED stamp, throws everything out
wood(T_SNAP, 0.06, 0.1); thump(T_BLOCK, 0.14, 60, 0); noise(T_BLOCK, 0.05, 0.06, 0, 0.6, (p) => 1 - p);
sweep(T_OUT, 0.5, 0.06, 0.5, 0.02, 0.4); thump(T_OUT + 0.55, 0.05, 70, 0.8);
// cuddle: warm chord
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_CUDDLE, T_CARD + 0.6, [60, 64, 67, 72], 0.01);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.14, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.12, 0.24, 0.36, 0.5].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.88, 1.0, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
