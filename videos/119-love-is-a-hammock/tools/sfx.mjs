// ---- "love is a hammock": evening garden bed (wind in leaves + crickets); rope rustle + knot pull when tied; walking steps; hammock creak while it swings; top: warm chord + heart bells; bottom: phone taps, rope slips, he falls (thump), leaves fall, her steps leaving, low drone; typing; FOLLOW: leaf flutter, tap + rustle burst + bells ----
const T_TIE = 0.4, T_TIED = 1.6, T_GO = 2.0, T_ARR = 3.2, T_SIT = 3.4, T_SAT = 4.0, T_LEAN = 5.0, T_HEART = 6.8, T_BGO = 2.0, T_BARR = 3.4, T_BSIT = 4.4, T_LET = 6.2, T_FALL = 6.45, T_WALK = 7.6, T_GONE = 9.4, T_H2 = 9.6, T_H3 = 10.8, T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; const r = rnd() - 0.5; lp += (r - lp) * 0.06; lp2 += (r - lp2) * 0.004; add(i, (lp * 0.06 * (0.5 + 0.5 * Math.sin(t * 0.9)) + lp2 * 0.18) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = 0.3; t < DUR - 1; t += 0.9) for (let k = 0; k < 3; k++) tone(t + k * 0.05, 4200, 0.03, 0.0025, 0.6, 0.002, 40);
const rustle = (t, d, g, pan) => noise(t, d, g, pan, 0.25, (p) => Math.sin(Math.PI * p));
rustle(T_TIE, 1.1, 0.02, -0.4); rustle(T_TIE + 0.1, 1.1, 0.02, 0.4);
const pull = (t, pan) => { sweep(t, 0.18, 0.03, 0.2, 0.3, 0.6); wood(t + 0.15, 0.05, pan); };
pull(T_TIED - 0.15, 0);
for (let t = T_GO + 0.2; t < T_ARR; t += 0.42) step(t, 0.018, -0.2);
for (let t = T_BGO + 0.2; t < T_BARR; t += 0.42) step(t, 0.018, 0.4);
const creak = (t, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(0.35 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 180 + 120 * tt / 0.35; add(s0 + i, Math.sign(Math.sin(2 * Math.PI * f * tt)) * 0.3 * Math.sin(2 * Math.PI * 23 * tt) * g * Math.sin(Math.PI * tt / 0.35), pan); } };
creak(T_SIT + 0.4, 0.03, 0); for (let t = T_SAT + 0.6; t < T_CTA; t += 1.85) creak(t, 0.012, 0);
creak(T_BSIT + 0.4, 0.03, 0.3);
for (let t = 0.4; t < T_LET; t += 0.6) click(t, 0.006, -0.4);
sweep(T_LET, 0.3, 0.04, -0.3, 0.1, 0.4); thump(T_FALL + 0.35, 0.16, 70, 0.1); noise(T_FALL + 0.35, 0.2, 0.05, 0.1, 0.4, (p) => Math.exp(-p * 6));
for (let t = T_WALK + 0.2; t < T_GONE; t += 0.42) step(t, 0.02, -0.5);
{ const s0 = Math.floor((T_FALL + 0.3) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LEAN - 0.3, T_CTA + 0.5, [55, 59, 62, 67], 0.009);
[[0, 74], [0.08, 79], [0.16, 83]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 16, 30); typing(T_H3, 16, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
rustle(T_TAG, 1.4, 0.025, -0.3);
click(T_TAP, 0.06, 0); rustle(T_TAP, 0.6, 0.05, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
