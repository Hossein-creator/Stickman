// ---- "love is a boat": water + room tone, a splash and an oar creak for every stroke (both panels), warm chord on "hold on", tension on "in circles", a low drop on "lost", typing clicks, end card ----
const TR0 = 0.45, TRP = 1.11, TRN = 5, BR0 = 0.5, BRP = 0.99, BRN = 10;
const FLIPS = [3.6, 6.55, 9.15];
const T_HOP_F = 7.15, T_HOP_B = 7.85, T_MEET = 8.55, T_HOLD = 9.2, T_CIRC = 6.45, T_LOST = 10.4, T_CARD = 12.6;
// water: slow lapping noise
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.03; lp2 += (lp - lp2) * 0.2; add(i, lp2 * 0.55 * (0.7 + 0.3 * Math.sin(t * 2.1)) * Math.min(1, t / 0.8) * (1 - smooth(t, DUR - 1.5, DUR)), Math.sin(t * 0.4) * 0.3); } }
// strokes: splash when the blade goes in, a creak on the pull, drip on the way back
const strokeSnd = (t, g, pan) => {
  noise(t + 0.02, 0.18, g, pan, 0.55, (p) => Math.exp(-p * 6));
  thump(t + 0.02, g * 0.6, 90, pan);
  tone(t + 0.15, 330 + 40 * rnd(), 0.22, g * 0.15, pan, 0.03, 8);
  noise(t + 0.55, 0.12, g * 0.3, pan, 0.8, (p) => Math.exp(-p * 8));
};
for (let i = 0; i < TRN; i++) { strokeSnd(TR0 + i * TRP, 0.07, -0.35); strokeSnd(TR0 + i * TRP + 0.01, 0.05, -0.25); }
for (let i = 0; i < BRN; i++) strokeSnd(BR0 + i * BRP, 0.045, 0.35);
// the bottom boat turns: a small wooden groan each time
FLIPS.forEach((t) => { tone(t + 0.1, 150, 0.5, 0.02, 0.35, 0.08, 4); tone(t + 0.1, 157, 0.5, 0.012, 0.35, 0.08, 4); });
// top: bow bumps the island, two hops, they meet
wood(TR0 + TRP * TRN + 0.55, 0.06, -0.3);
[T_HOP_F + 0.5, T_HOP_B + 0.5].forEach((t) => step(t, 0.08, -0.3));
sweep(T_MEET - 0.1, 0.5, 0.03, 0, 0.02, 0.15);
// hold on: warm chord swells and stays
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, 12.6, [57, 61, 64, 69], 0.012);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// in circles: rising tension; lost: low drop that hangs
chord(T_CIRC, T_LOST + 0.2, [52, 59], 0.005);
thump(T_LOST + 0.5, 0.12, 40, 0.3);
noise(T_LOST + 0.4, 0.3, 0.04, 0.4, 0.4, (p) => Math.exp(-p * 4));
{ const s0 = Math.floor((T_LOST + 1.0) * SR), n = Math.floor((T_CARD + 0.5 - T_LOST - 1.0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.05 * e, 0); } }
// typing the last two lines
typing(10.9, 17, 30); typing(11.55, 18, 30);
// end card: message words, quote chime
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.92, 1.04, 1.18].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
