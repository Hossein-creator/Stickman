// ---- "who's shouting?": cosy room tone + birds, her "HONEY!" calls (rising pitch each time), his running steps, task sounds (bucket slosh, chopping, jar pop), a fast montage, a tiny "dear?", a huge "WHY ARE YOU SHOUTING?!" hit, deadpan silence + cricket, then a laugh and warm chord ----
const CALLS = [0.6, 2.0, 3.4, 4.8], FAST = [6.1, 6.5, 6.9], RUN = 0.35, ACT = 0.65;
const T_SIT = 7.4, T_DEAR = 8.0, T_WHY = 8.6, T_STARE = 9.2, T_LAUGH = 10.4, T_HUG = 10.7, T_H1 = 11.5, T_H2 = 12.4, T_CARD = 13.4;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.2; t < T_SIT; t += 1.3 + 0.4 * rnd()) { tone(t, 2400 + 400 * rnd(), 0.08, 0.008, -0.5, 0.005, 30); tone(t + 0.1, 2800, 0.06, 0.006, -0.5, 0.005, 30); }
const call = (t, k, g) => { const f0 = 330 + 40 * k; const s0 = Math.floor(t * SR), n = Math.floor(0.4 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.25 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.sin(Math.PI * Math.min(1, p * 3)) * (1 - p) * g, 0.3); } };
CALLS.forEach((c, k) => call(c, k, 0.04 + 0.01 * k));
FAST.forEach((c) => call(c, 4, 0.05));
const steps = (t0, d, pan) => { for (let t = t0; t < t0 + d; t += 0.09) step(t, 0.03, pan); };
CALLS.forEach((c) => { steps(c + 0.25, RUN, 0); steps(c + 0.25 + RUN + ACT, RUN, 0); });
FAST.forEach((c) => steps(c, 0.38, 0));
// tasks
noise(CALLS[0] + 0.25 + RUN + 0.2, 0.4, 0.04, 0.2, 0.3, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 30)));
for (let i = 0; i < 6; i++) wood(CALLS[1] + 0.25 + RUN + i * 0.1, 0.04, 0.2);
for (let i = 0; i < 4; i++) noise(CALLS[2] + 0.25 + RUN + i * 0.12, 0.05, 0.02, 0.2, 0.5); click(CALLS[2] + 0.25 + RUN + 0.55, 0.08, 0.2); tone(CALLS[2] + 0.25 + RUN + 0.55, 900, 0.1, 0.03, 0.2, 0.001, 30);
tone(CALLS[3] + 0.25 + RUN + 0.3, 300, 0.3, 0.02, 0.2, 0.01, 6);
// montage whooshes
FAST.forEach((c) => sweep(c, 0.38, 0.04, 0, 0.02, 0.3));
// sits, panting
thump(T_SIT + 0.1, 0.08, 60, -0.2);
for (let t = T_SIT + 0.2; t < T_DEAR; t += 0.3) noise(t, 0.15, 0.015, -0.2, 0.15, (p) => Math.sin(Math.PI * p));
tone(T_DEAR, 600, 0.1, 0.012, -0.2, 0.005, 25);
// WHY ARE YOU SHOUTING?!
call(T_WHY, 6, 0.08); thump(T_WHY, 0.2, 50, 0); noise(T_WHY, 0.3, 0.06, 0, 0.4, (p) => Math.exp(-p * 5));
// deadpan: silence + one cricket
for (let t = T_STARE + 0.2; t < T_LAUGH; t += 0.4) tone(t, 4200, 0.05, 0.008, 0.4, 0.002, 60);
// laugh + warm chord
for (let k = 0; k < 5; k++) tone(T_LAUGH + k * 0.12, 420 + 40 * (k % 2), 0.08, 0.02, 0.2, 0.005, 20);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HUG, T_CARD + 0.6, [60, 64, 67, 72], 0.01);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HUG + 0.2 + d, m, 0.02, 0, 1.2));
CALLS.forEach((c) => click(c, 0.05, 0)); FAST.forEach((c) => click(c, 0.05, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.15, 0.3].forEach((d, i) => { thump(T_H2 + d, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.87, 1.0, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
