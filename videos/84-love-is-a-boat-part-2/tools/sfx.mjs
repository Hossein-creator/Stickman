// ---- "love is a boat. part 2": water + room tone, splash + oar creak per stroke, warm chord on the hug; bottom: he stops (silence), stands, steps onto the rock (wood + steps fading away), low drop on "HE LEAVES", her phone clacks on the floor, her strokes, groans as the boat turns; bottle: glass clink on the shore, cork pop, paper unroll, seal press click + chime ----
const TR0 = 0.45, TRP = 1.11, TRN = 5, BR0 = 0.5, BRP = 0.99, BRN = 7, T_ROW = 11.6, SRN = 3;
const FLIPS = [3.6, 6.55, 12.75, 13.9];
const T_HOP_F = 7.15, T_HOP_B = 7.85, T_MEET = 8.55, T_HOLD = 9.2, T_CIRC = 6.45;
const T_STOP = BR0 + BRP * BRN, T_STAND = 8.1, T_BWALK = 8.55, T_BHOP = 9.05, T_LOOK = 9.95, T_TURN = 10.45, T_DROPP = 10.8, T_SLIDE = 11.0, T_H2 = 9.7, T_H3 = 12.9;
const T_BOT = 11.8, T_SHORE = 14.6, T_CTA = 14.9, T_POP = 15.95, T_UNROLL = 16.45, T_TAP = 17.4;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.03; lp2 += (lp - lp2) * 0.2; add(i, lp2 * 0.55 * (0.7 + 0.3 * Math.sin(t * 2.1)) * Math.min(1, t / 0.8) * (1 - smooth(t, DUR - 1.5, DUR)), Math.sin(t * 0.4) * 0.3); } }
const strokeSnd = (t, g, pan) => {
  noise(t + 0.02, 0.18, g, pan, 0.55, (p) => Math.exp(-p * 6));
  thump(t + 0.02, g * 0.6, 90, pan);
  tone(t + 0.15, 330 + 40 * rnd(), 0.22, g * 0.15, pan, 0.03, 8);
  noise(t + 0.55, 0.12, g * 0.3, pan, 0.8, (p) => Math.exp(-p * 8));
};
for (let i = 0; i < TRN; i++) { strokeSnd(TR0 + i * TRP, 0.07, -0.35); strokeSnd(TR0 + i * TRP + 0.01, 0.05, -0.25); }
for (let i = 0; i < BRN; i++) strokeSnd(BR0 + i * BRP, 0.045, 0.35);
for (let i = 0; i < SRN; i++) strokeSnd(T_ROW + i * BRP, 0.04, 0.35);
FLIPS.forEach((t) => { tone(t + 0.1, 150, 0.5, 0.02, 0.35, 0.08, 4); tone(t + 0.1, 157, 0.5, 0.012, 0.35, 0.08, 4); });
wood(TR0 + TRP * TRN + 0.55, 0.06, -0.3);
[T_HOP_F + 0.5, T_HOP_B + 0.5].forEach((t) => step(t, 0.08, -0.3));
sweep(T_MEET - 0.1, 0.5, 0.03, 0, 0.02, 0.15);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, 12.4, [57, 61, 64, 69], 0.01);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
chord(T_CIRC, T_STOP + 0.3, [52, 59], 0.005);
// he stands, walks, steps onto the rock and leaves
wood(T_STAND + 0.2, 0.04, 0.35);
[T_BWALK + 0.2, T_BWALK + 0.4].forEach((t) => wood(t, 0.03, 0.35));
step(T_BHOP + 0.5, 0.08, 0.2);
for (let k = 0; k < 5; k++) step(T_BHOP + 0.8 + k * 0.3, 0.05 * (1 - k / 6), -0.1 - k * 0.15);
thump(T_H2, 0.11, 42, 0); noise(T_H2, 0.3, 0.03, 0, 0.4, (p) => Math.exp(-p * 4));
{ const s0 = Math.floor((T_H2 + 0.3) * SR), n = Math.floor(2.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.04 * e, 0); } }
// she looks up, turns, phone drops on the floor
tone(T_LOOK, 880, 0.3, 0.012, 0.3, 0.02, 3);
wood(T_DROPP + 0.4, 0.05, 0.3); click(T_DROPP + 0.42, 0.04, 0.3);
chord(12.8, 14.8, [50, 57], 0.005);
typing(T_H2, 26, 30); typing(T_H3, 27, 30);
// bottle: clink on the shore, cork pop, scroll, seal
tone(T_SHORE, 2400, 0.12, 0.02, 0.2, 0.001, 30); tone(T_SHORE + 0.05, 3100, 0.1, 0.012, 0.2, 0.001, 30);
sweep(T_CTA, 0.8, 0.02, 0, 0.02, 0.2);
tone(T_POP, 600, 0.06, 0.06, 0.2, 0.001, 50); noise(T_POP, 0.08, 0.06, 0.2, 0.3, (p) => Math.exp(-p * 10));
noise(T_UNROLL, 0.45, 0.04, 0, 0.7, (p) => Math.sin(Math.PI * p));
typing(T_UNROLL + 0.4, 17, 30); typing(T_UNROLL + 1.1, 9, 30);
click(T_TAP, 0.08, 0); thump(T_TAP, 0.07, 120, 0);
[[0, 76], [0.07, 81], [0.14, 88]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.0));
chord(T_TAP, DUR - 0.1, [57, 61, 64, 69], 0.01);
