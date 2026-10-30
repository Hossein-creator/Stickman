// ---- "the lunchbox": bus rumble, his voice pop, a soft "aww" chime for her, night kitchen (crickets, sizzling, packing), morning bus, zip of the bag, office hum, lid pop, note chime, warm piano at the end ----
const T_SAY = 0.5, T_HEARD = 1.1, S_KIT = 3.0, T_COOK = 3.3, T_PACK = 4.3, T_NOTE = 4.8, S_BUS2 = 5.5, T_SLIP = 6.1, T_SLIP1 = 6.9;
const S_DESK = 7.5, T_TAKE = 7.8, T_OPEN = 8.3, T_READ = 8.8, T_SMILE = 9.4, S_BUS3 = 10.1, T_SITNEXT = 10.6, T_SHARE = 11.0, T_HOLD = 11.4, T_H1 = 12.2, T_H2 = 13.1, T_CARD = 14.2;
const onBus = (t) => t < S_KIT || (t >= S_BUS2 && t < S_DESK) || (t >= S_BUS3 && t < T_CARD);
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.02; lp2 += (lp - lp2) * 0.1; add(i, lp2 * (onBus(t) ? 0.5 : 0.12) * (0.8 + 0.2 * Math.sin(t * 9)) * Math.min(1, t / 0.4) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.3; t < S_KIT; t += 1.1) thump(t, 0.03, 50, 0);
tone(T_SAY + 0.1, 380, 0.12, 0.03, 0.1, 0.005, 25); tone(T_SAY + 0.17, 480, 0.12, 0.025, 0.1, 0.005, 25);
[[0, 81], [0.1, 85]].forEach(([d, m]) => bell(T_HEARD + 0.2 + d, m, 0.015, -0.2, 1.0));
for (let t = S_KIT; t < S_BUS2; t += 0.33) tone(t, 4200, 0.04, 0.006, -0.5, 0.002, 60);
noise(T_COOK, T_PACK - T_COOK, 0.03, 0.2, 0.8, (p) => Math.min(1, p * 10) * (0.7 + 0.3 * Math.sin(p * 90)));
wood(T_PACK + 0.4, 0.04, 0.2); noise(T_NOTE, 0.12, 0.02, 0, 0.8); bell(T_NOTE + 0.1, 88, 0.015, 0, 0.8); wood(T_NOTE + 0.4, 0.05, 0.1);
noise(T_SLIP + 0.3, 0.3, 0.025, 0.2, 0.9, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 80)));
for (let t = S_DESK; t < S_BUS3; t += 0.6) click(t, 0.01, 0.3);
noise(T_TAKE + 0.1, 0.2, 0.02, 0, 0.6); click(T_OPEN + 0.1, 0.05, 0); bell(T_READ + 0.1, 84, 0.02, 0, 1.0);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_SMILE, S_BUS3, [60, 64, 67], 0.008);
[[0, 76], [0.08, 81], [0.16, 84]].forEach(([d, m]) => bell(T_SMILE + d, m, 0.02, 0, 1.2));
chord(T_SITNEXT, T_CARD + 0.6, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.15, 0.3].forEach((d, i) => { thump(T_H2 + d, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.87, 1.0, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
