// ---- "pet names": café murmur + cups clinking, his loud "BABY!" / "MY QUEEN!!" calls, a record-scratch and gasps from the guests, her "stop!", a tiny whisper, then her "MY KING!!!", a big gasp, his embarrassed squeak, laughter, warm chord ----
const T_BABY = 0.5, T_HIDE = 1.2, T_QUEEN = 2.0, T_STOP = 2.8, T_WHISPER = 3.6, T_PEEK = 4.3, T_ORDER = 5.0, T_AT = 5.8, T_KING = 6.2, T_BLUSH = 6.6, T_COVER = 7.0, T_BACK = 7.9, T_SIT = 8.6, T_HOLD = 9.0, T_H1 = 9.9, T_H2 = 10.8, T_CARD = 11.9;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.05; lp2 += (lp - lp2) * 0.1; const hush = Math.max(smooth(t, T_BABY, T_BABY + 0.1) * (1 - smooth(t, T_HIDE + 0.5, T_HIDE + 1)), smooth(t, T_KING, T_KING + 0.1) * (1 - smooth(t, T_COVER + 0.5, T_COVER + 1))); add(i, lp2 * 0.3 * (1 - 0.8 * hush) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.3; t < T_CARD; t += 1.4 + rnd()) bell(t, 96 + Math.floor(rnd() * 4), 0.008, -0.4, 0.3);
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
shout(T_BABY, 220, 0.45, 0.05, 0.2); shout(T_QUEEN, 230, 0.7, 0.06, 0.2);
[T_BABY + 0.1, T_QUEEN + 0.1, T_KING + 0.1].forEach((t) => { noise(t, 0.12, 0.04, -0.4, 0.6, (p) => Math.sin(Math.PI * p)); sweep(t, 0.2, 0.03, -0.4, 0.3, 0.05); });
shout(T_STOP, 380, 0.3, 0.04, -0.2);
noise(T_WHISPER + 0.1, 0.4, 0.015, 0.2, 0.7, (p) => Math.sin(Math.PI * p));
for (let t = T_ORDER; t < T_AT; t += 0.3) step(t, 0.02, 0.3);
shout(T_KING, 360, 0.8, 0.06, -0.2);
tone(T_BLUSH, 900, 0.15, 0.02, 0.4, 0.005, 20); tone(T_BLUSH + 0.1, 1200, 0.15, 0.02, 0.4, 0.005, 20);
for (let k = 0; k < 6; k++) tone(T_COVER + k * 0.11, 440 + 40 * (k % 2), 0.08, 0.02, -0.2, 0.005, 20);
for (let t = T_BACK; t < T_SIT; t += 0.3) step(t, 0.02, 0);
for (let k = 0; k < 6; k++) { tone(T_SIT + 0.2 + k * 0.11, 420 + 40 * (k % 2), 0.08, 0.015, -0.2, 0.005, 20); tone(T_SIT + 0.25 + k * 0.11, 300 + 30 * (k % 2), 0.08, 0.015, 0.2, 0.005, 20); }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, T_CARD + 0.6, [60, 64, 67, 72], 0.01);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.6, 0.75, 0.95].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
