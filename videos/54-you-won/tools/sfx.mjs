// ---- "you won": room tone, her rapid-fire angry voice bursts + a score "ding" per round, his "but-" squeaks, a big point bell + crowd cheer on his one point, celebration, then silence, footsteps, light switch, pillow whoosh + thud, crickets on the couch, a sad little trombone ----
const ROUNDS = [0.5, 1.3, 2.1, 2.9, 3.7];
const T_PROOF = 4.6, T_SCORE = 5.0, T_SILENT = 5.2, T_CELEB = 5.5, T_TURN = 6.6, T_BED = 7.4, T_OFF = 7.9, T_PILLOW = 8.2, T_COUCH = 8.6, T_H1 = 10.6, T_H2 = 11.5, T_CARD = 12.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const rant = (t, d, g) => { for (let x = t; x < t + d; x += 0.07) tone(x, 300 + 160 * rnd(), 0.06, g, 0.3, 0.005, 25); };
ROUNDS.forEach((r) => { rant(r, 0.55, 0.018); bell(r + 0.12, 84, 0.012, 0.3, 0.4); tone(r + 0.45, 220, 0.08, 0.02, -0.3, 0.005, 25); });
tone(T_PROOF, 440, 0.1, 0.03, -0.3, 0.005, 25); tone(T_PROOF + 0.1, 560, 0.12, 0.03, -0.3, 0.005, 25);
[[0, 72], [0.1, 76], [0.2, 79], [0.3, 84]].forEach(([d, m]) => bell(T_SCORE + d, m, 0.03, 0, 1.4));
thump(T_SCORE, 0.15, 50, 0);
noise(T_CELEB, 1.0, 0.04, -0.2, 0.5, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 60)));
for (let k = 0; k < 8; k++) click(T_CELEB + k * 0.1, 0.04, (k % 2 ? 0.3 : -0.3));
for (let t = T_TURN; t < T_BED; t += 0.28) step(t, 0.025, 0.4);
noise(T_BED + 0.2, 0.4, 0.03, 0.4, 0.2, (p) => Math.sin(Math.PI * p));
click(T_OFF, 0.08, 0.3); tone(T_OFF, 1200, 0.05, 0.02, 0.3, 0.001, 60);
sweep(T_PILLOW, 0.35, 0.05, 0, 0.02, 0.4); thump(T_PILLOW + 0.35, 0.12, 80, -0.2); noise(T_PILLOW + 0.35, 0.1, 0.04, -0.2, 0.3, (p) => 1 - p);
for (let t = T_COUCH; t < T_COUCH + 0.6; t += 0.28) step(t, 0.02, -0.3);
for (let t = T_COUCH + 0.6; t < T_CARD; t += 0.4) tone(t, 4200, 0.05, 0.007, 0.4, 0.002, 60);
// sad trombone
[[0, 55], [0.35, 54], [0.7, 53], [1.05, 52]].forEach(([d, m], i) => { const t0 = T_COUCH + 1.0 + d, s0 = Math.floor(t0 * SR), n = Math.floor((i === 3 ? 0.9 : 0.32) * SR); let ph = 0; for (let j = 0; j < n; j++) { const p = j / n, f = hz(m) * (1 + (i === 3 ? 0.015 * Math.sin(j / SR * 30) : 0)); ph += (2 * Math.PI * f) / SR; add(s0 + j, (Math.sin(ph) + 0.5 * Math.sin(2 * ph) + 0.3 * Math.sin(3 * ph)) * Math.min(1, p * 8) * (1 - p) * 0.03, -0.2); } });
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.75, 0.9, 1.05].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
