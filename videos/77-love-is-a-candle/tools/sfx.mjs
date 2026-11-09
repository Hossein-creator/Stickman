// ---- "love is a candle": quiet night room tone + a soft candle crackle; a wind gust (rising/falling noise) panned to its side for every gust; top: a warm whoosh as the flame grows, heart pop + warm chord + bells; bottom: phone taps, the flame sputters and goes out (puff + hiss), low drone; typing for the headline, slams + card ----
const GU = [[0.6, -1], [2.2, 1], [3.8, -1], [5.2, 1]], GD = 1.2, T_OUT = 4.35, T_HEART = 6.6, T_HOLD = 7.0, T_T1 = 8.8, T_T2 = 9.5, T_CARD = 11.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.2; t < T_CARD; t += 0.12 + 0.25 * Math.abs(rnd())) click(t, 0.008, 0);
GU.forEach(([a, s]) => sweep(a, GD + 0.2, 0.12, s * -0.6, 0.03, 0.35));
GU.forEach(([a], i) => { tone(a + GD, hz(72 + i * 2), 0.25, 0.01, -0.2, 0.005, 10); });
for (let t = 0.4; t < T_OUT; t += 0.4 + 0.3 * Math.abs(rnd())) tone(t, 2400, 0.02, 0.005, -0.3, 0.001, 80);
for (let k = 0; k < 4; k++) noise(T_OUT - 0.4 + k * 0.1, 0.05, 0.03, 0.2, 0.6, (p) => 1 - p);
noise(T_OUT, 0.5, 0.06, 0.2, 0.4, (p) => Math.exp(-p * 4)); noise(T_OUT + 0.1, 1.2, 0.02, 0.2, 0.8, (p) => (1 - p) * 0.6);
{ const s0 = Math.floor((T_OUT + 0.3) * SR), n = Math.floor((T_CARD - T_OUT) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.02 * e, 0.3); } }
sweep(T_HEART - 0.3, 0.6, 0.05, 0, 0.05, 0.4); tone(T_HEART, 600, 0.2, 0.03, 0, 0.005, 12);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD - 0.4, T_CARD + 0.5, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
typing(T_T1, 17, 30); typing(T_T2, 22, 30);
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
thump(T_CARD + 0.8, 0.13, 44, 0); click(T_CARD + 0.8, 0.04, 0);
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
