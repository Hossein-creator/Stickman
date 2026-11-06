// ---- "love is a garden": soft room tone with birds; a water pour (filtered noise) for every watering, a little "grow" pluck as the flower grows; top: a bright bloom pop + warm chord + bells; bottom: phone taps, a sad falling tone as it wilts, soft petal ticks, low drone; typing for the headline, slams + card ----
const WT = [[0.5, 0], [2.0, 1], [3.5, 0], [5.0, 1]], WD = 1.0, T_BLOOM = 6.1, T_HOLD = 6.5, T_WILT = 6.1, T_FALL = 6.6, T_T1 = 8.6, T_T2 = 9.3, T_CARD = 11.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.3; t < T_T1; t += 1.1 + 0.6 * rnd()) { tone(t, 2800 + 400 * rnd(), 0.07, 0.006, rnd() - 0.5, 0.01, 30); tone(t + 0.09, 3200 + 300 * rnd(), 0.05, 0.005, rnd() - 0.5, 0.01, 30); }
WT.forEach(([a, w]) => { noise(a + 0.3, 0.75, 0.03, w ? 0.3 : -0.3, 0.55, (p) => Math.min(1, p * 6) * Math.min(1, (1 - p) * 4)); [0, 0.05].forEach((d) => tone(a + 0.9 + d, hz(72 + WT.findIndex((x) => x[0] === a) * 2), 0.25, 0.01, 0, 0.005, 10)); });
for (let t = 0.4; t < T_WILT; t += 0.4 + 0.3 * rnd()) tone(t, 2400, 0.02, 0.005, -0.3, 0.001, 80);
noise(T_BLOOM, 0.1, 0.04, 0, 0.7, (p) => 1 - p); tone(T_BLOOM, 600, 0.2, 0.03, 0, 0.005, 12);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD - 0.3, T_CARD + 0.5, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
{ const s0 = Math.floor(T_WILT * SR), n = Math.floor(0.9 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n; ph += 2 * Math.PI * (392 - 196 * p) / SR; add(s0 + i, Math.sin(ph) * 0.02 * Math.sin(Math.PI * p), 0.3); } }
for (let k = 0; k < 5; k++) tone(T_FALL + k * 0.2 + 0.85, 1800 - k * 120, 0.05, 0.006, 0.2, 0.002, 40);
{ const s0 = Math.floor((T_WILT + 0.4) * SR), n = Math.floor((T_CARD - T_WILT) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.02 * e, 0.3); } }
typing(T_T1, 7, 30); typing(T_T2, 22, 30);
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
thump(T_CARD + 0.8, 0.13, 44, 0); click(T_CARD + 0.8, 0.04, 0);
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
