// ---- "love is a fire": night wind, a crackling fire in each panel (louder as it grows, the bottom one dies), a wooden thunk for every stick, warm chord on "warm", two small rejections, low drop on "he stops asking", typing, end card ----
const TRIP = 1.75, TS0 = 0.4, TM0 = 0.75, TN = 3, B1 = 0.5, B2 = 4.25, B_P1 = 3.3, B_P2 = 7.05;
const T_MEET = 7.3, T_HOLD = 8.0, T_GIVE = 8.8, T_COLD = 10.4, T_CARD = 12.7;
const toss = [];
for (let k = 0; k < TN; k++) { toss.push([TS0 + k * TRIP + 1.45, -0.3]); toss.push([TM0 + k * TRIP + 1.45, -0.3]); }
const btoss = [B1 + 1.45, B2 + 1.45];
// wind
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.006; add(i, lp * 0.14 * (0.7 + 0.3 * Math.sin(t * 0.6)) * Math.min(1, t / 0.8) * (1 - smooth(t, DUR - 1.2, DUR)), Math.sin(t * 0.3) * 0.4); } }
// crackle: random pops whose density follows the fire strength
const strength = (arr, t, b) => { let I = b; for (const x of arr) I += 0.24 * smooth(t, x + 0.25, x + 0.75); return I; };
for (let t = 0.05; t < T_CARD + 0.5; t += 0.02) {
  const it = strength(toss.map((x) => x[0]), t, 0.45), ib = strength(btoss, t, 0.5) * (1 - 0.97 * smooth(t, T_GIVE, T_COLD + 0.3));
  if (rnd() < 0.18 * it) noise(t + rnd() * 0.02, 0.008 + rnd() * 0.01, 0.05 * Math.min(1.3, it), -0.35, 0.95, (p) => Math.exp(-p * 6));
  if (rnd() < 0.18 * ib) noise(t + rnd() * 0.02, 0.008 + rnd() * 0.01, 0.045 * ib, 0.35, 0.95, (p) => Math.exp(-p * 6));
}
// fire roar (low noise bed), top grows, bottom fades
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.04; const it = strength(toss.map((x) => x[0]), t, 0.45) * (1 - smooth(t, T_CARD, DUR)); const ib = strength(btoss, t, 0.5) * (1 - smooth(t, T_GIVE, T_COLD + 0.3)); add(i, lp * 0.05 * it, -0.35); add(i, lp * 0.05 * ib, 0.35); } }
// sticks: thunk + flare
toss.forEach(([t]) => { wood(t + 0.33, 0.06, -0.3); noise(t + 0.35, 0.3, 0.04, -0.3, 0.5, (p) => Math.exp(-p * 4)); });
btoss.forEach((t) => { wood(t + 0.33, 0.05, 0.3); noise(t + 0.35, 0.3, 0.035, 0.3, 0.5, (p) => Math.exp(-p * 4)); });
// footsteps on the trips
for (let k = 0; k < TN; k++) for (const [t0, pan] of [[TS0, -0.4], [TM0, -0.2]]) [0.12, 0.34, 0.97, 1.19].forEach((d) => step(t0 + k * TRIP + d, 0.025, pan));
// they meet; warm chord
sweep(T_MEET - 0.1, 0.5, 0.03, 0, 0.02, 0.15);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, 12.6, [57, 61, 64, 69], 0.012);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// pulled away: a small sour two-note sting each time
[B_P1, B_P2].forEach((t, i) => { tone(t, hz(64 - i), 0.5, 0.02, 0.35, 0.01, 4); tone(t + 0.12, hz(63 - i), 0.6, 0.02, 0.35, 0.01, 3.5); noise(t, 0.2, 0.02, 0.35, 0.3); });
// he stops asking: the stick drops, low drop; fire hisses out
wood(T_GIVE + 0.1, 0.05, 0.4);
thump(T_GIVE + 0.3, 0.12, 40, 0.3);
noise(T_COLD - 0.6, 1.2, 0.04, 0.35, 0.6, (p) => Math.sin(Math.PI * p) * (1 - p));
{ const s0 = Math.floor((T_GIVE + 0.8) * SR), n = Math.floor((T_CARD + 0.4 - T_GIVE - 0.8) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.05 * e, 0); } }
typing(10.9, 25, 30); typing(11.75, 19, 30);
// end card
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.7, 0.82, 0.94, 1.06, 1.2].forEach((d, i) => { thump(T_CARD + d, i === 4 ? 0.13 : 0.05, i === 4 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.6, 69, 0.02, 0, 1.2); bell(T_CARD + 1.66, 76, 0.015, 0, 1.2);
