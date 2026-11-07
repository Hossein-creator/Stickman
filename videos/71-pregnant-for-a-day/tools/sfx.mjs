// ---- "pregnant for a day": room tone, her tired sigh, his laughing "ha ha ha" + "pregnancy is easy", a magic shimmer (rising bells + whoosh) for the swap, his "oof!", jar lid pop + crunching + slurp, a belly-kick thump + "ow!", his whiny "I take it back!", the swap back shimmer, a soft rub swish, warm chord + bells; slams + card ----
const T_LAUGH = 0.5, T_SWAP = 1.9, T_OOF = 2.5, T_CRAVE = 3.6, T_KICK = 5.0, T_BACK = 5.9, T_SWAP2 = 7.0, T_RUB = 7.7, T_HOLD = 8.3, T_H1 = 9.0, T_H2 = 9.9, T_CARD = 11.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
noise(0.1, 0.6, 0.02, -0.3, 0.2, (p) => Math.sin(Math.PI * p) * (1 - p));
for (let k = 0; k < 5; k++) tone(T_LAUGH + k * 0.14, 300 + 30 * (k % 2), 0.1, 0.02, 0.2, 0.005, 20);
shout(T_LAUGH + 0.75, 240, 0.6, 0.03, 0.2);
const shimmer = (t0) => { for (let k = 0; k < 8; k++) bell(t0 + k * 0.06, 84 + k * 2, 0.012, k % 2 ? 0.3 : -0.3, 0.5); noise(t0, 0.6, 0.03, 0, 0.6, (p) => Math.sin(Math.PI * p)); thump(t0 + 0.3, 0.06, 60, 0); };
shimmer(T_SWAP); shimmer(T_SWAP2);
shout(T_OOF, 200, 0.35, 0.045, 0.2);
tone(T_CRAVE, 1200, 0.06, 0.02, 0.3, 0.002, 40); noise(T_CRAVE, 0.05, 0.03, 0.3, 0.9, (p) => 1 - p);
shout(T_CRAVE + 0.1, 260, 0.9, 0.03, 0.2);
for (let k = 0; k < 4; k++) noise(T_CRAVE + 0.4 + k * 0.36, 0.05, 0.03, 0.2, 0.7, (p) => 1 - p);
thump(T_KICK, 0.1, 55, 0.2); shout(T_KICK + 0.05, 420, 0.25, 0.045, 0.2);
shout(T_BACK, 330, 0.9, 0.04, 0.2);
for (let k = 0; k < 6; k++) { tone(T_KICK + 0.3 + k * 0.11, 440 + 40 * (k % 2), 0.08, 0.012, -0.3, 0.005, 20); }
for (let k = 0; k < 6; k++) noise(T_RUB + 0.3 + k * 0.26, 0.2, 0.01, 0, 0.4, (p) => Math.sin(Math.PI * p));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_RUB, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].forEach((d, i) => { thump(T_H2 + d, i === 6 ? 0.12 : 0.05, i === 6 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
thump(T_CARD + 0.8, 0.13, 44, 0); click(T_CARD + 0.8, 0.04, 0);
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
