// ---- "red flags": soft room tone, each act: her angry voice pop, a flag springs from the ground (whoosh + flap + thump), he picks it with a tiny chime; bouquet ribbon swish, "aww", warm chord + bells at the hug, slam thumps, card ----
const ACTS = [0.6, 2.2, 3.8, 5.2], POP = 0.7, PICK = 1.1;
const T_BOUQ = 6.6, T_GIVE = 7.0, T_GASP = 7.4, T_HUG = 7.9, T_HOLD = 8.3, T_H1 = 9.2, T_H2 = 10.1, T_CARD = 11.2;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.1 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
ACTS.forEach((t, k) => {
  shout(t + 0.05, 340 + k * 15, 0.45, 0.045, -0.2);
  sweep(t + POP - 0.1, 0.18, 0.03, 0.1, 0.3, 0.05);
  thump(t + POP, 0.07, 60, 0.1);
  noise(t + POP + 0.02, 0.15, 0.025, 0.1, 0.5, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)));
  noise(t + PICK, 0.06, 0.02, 0.2, 0.6, (p) => 1 - p);
  bell(t + PICK + 0.05, 81 + k * 2, 0.012, 0.2, 0.5);
});
sweep(T_BOUQ, 0.3, 0.03, 0.2, 0.4, 0.05);
noise(T_GIVE, 0.25, 0.02, 0, 0.5, (p) => Math.sin(Math.PI * p));
shout(T_GASP, 420, 0.6, 0.035, -0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HUG, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85, 1.0].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
