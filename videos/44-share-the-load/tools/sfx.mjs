// ---- "share the load": room tone, cardboard box thumps and footsteps (top light and quick, bottom heavy and slow), her tired breathing, phone taps, warm chord on "close", a sour sting on "too tired", typing, end card ----
const TW = 1.25, BWK = 1.55;
const tripLen = (W, h) => 0.45 + 0.15 * h + W + 0.5 + 0.15 * h + W;
const TS = [0.4, 0.4 + tripLen(TW, 0)], TM = [0.8, 0.8 + tripLen(TW, 0)], BS = [0.5, 0.5 + tripLen(BWK, 1)];
const T_SIT = 7.55, T_HOLD = 8.2, T_REACH = 8.35, T_AWAY = 8.85, T_SLUMP = 9.3, T_CARD = 12.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.12 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const box = (t, g, pan) => { thump(t, g, 95, pan); noise(t, 0.06, g * 0.5, pan, 0.4, (p) => Math.exp(-p * 6)); };
// top trips: pick, steps, place
for (const t0 of [...TS, ...TM]) {
  box(t0 + 0.25, 0.04, -0.3);
  for (let t = t0 + 0.45; t < t0 + 0.45 + TW; t += 0.3) step(t, 0.022, -0.3);
  box(t0 + 0.45 + TW + 0.3, 0.06, -0.3);
}
// bottom trips: heavier, slower, two boxes
for (const t0 of BS) {
  box(t0 + 0.32, 0.06, 0.3); box(t0 + 0.4, 0.04, 0.3);
  for (let t = t0 + 0.6; t < t0 + 0.6 + BWK; t += 0.42) step(t, 0.03, 0.3);
  box(t0 + 0.6 + BWK + 0.35, 0.08, 0.3); box(t0 + 0.6 + BWK + 0.45, 0.06, 0.3);
}
// her tired breathing in the bottom panel
for (let t = 4.6; t < T_SLUMP + 1.6; t += 0.9) { noise(t, 0.35, 0.02, 0.3, 0.15, (p) => Math.sin(Math.PI * p)); noise(t + 0.42, 0.4, 0.015, 0.3, 0.1, (p) => Math.sin(Math.PI * p)); }
// his phone taps
for (let t = 0.7; t < T_REACH - 0.5; t += 0.55 + 0.2 * rnd()) click(t, 0.02, 0.1);
// they sit, warm chord
noise(T_SIT + 0.3, 0.3, 0.03, -0.2, 0.2, (p) => Math.exp(-p * 5));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, 12.6, [57, 61, 64, 69], 0.012);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// too tired: sour sting, she slides down
tone(T_AWAY, hz(64), 0.5, 0.022, 0.3, 0.01, 4); tone(T_AWAY + 0.12, hz(63), 0.6, 0.022, 0.3, 0.01, 3.5);
thump(T_SLUMP + 0.6, 0.1, 42, 0.3);
{ const s0 = Math.floor((T_SLUMP + 0.6) * SR), n = Math.floor((T_CARD + 0.4 - T_SLUMP - 0.6) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.045 * e, 0); } }
typing(10.6, 15, 30); typing(11.3, 16, 30);
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.7, 0.84, 0.98, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.6, 69, 0.02, 0, 1.2); bell(T_CARD + 1.66, 76, 0.015, 0, 1.2);
