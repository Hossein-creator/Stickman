// ---- "the wall": low room tone + sad sparse piano; shouts = harsh low growl + pop; every brick = stone click + knock; knocks on the wall; whoosh + hit on every cut; push strain + big collapse (rumble, many brick thumps, dust hiss); silence after; FOLLOW: bricks clink into the sign, tap click, warm chord ----
const T_S1 = 0.6, T_H1 = 2.1, T_S2 = 3.0, T_S3 = 4.4, C1 = 6.0, T_K1 = 6.7, T_K2 = 7.05, T_LEAN = 7.6, C2 = 9.0, C3 = 11.0, T_LEAVE = 12.2, T_GONE = 13.4, C4 = 13.4, T_SORRY = 14.1, T_PUSH = 14.7, T_COL = 15.2, C5 = 15.7, T_KNEEL = 16.9, T_L2 = 18.0, T_L3 = 19.1, T_SIGN = 21.6, T_TAP = 22.6;
const GROUPS = [[T_S1, 0, 6], [T_S2, 7, 12], [T_S3, 13, 19]];
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
// sad piano, pauses for the collapse
const MEL = [64, 67, 71, 69, 67, 64, 62, 60, 59, 60, 64, 62];
for (let t = 0.2, i = 0; t < T_SIGN; i++) { if (t < T_COL - 0.2 || t > C5 + 0.6) { bell(t, MEL[i % MEL.length] - 12, 0.015, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.011, 0, 0.8); } t += 0.85 + (t > C5 ? 0.25 : 0); }
// shouts: low growl + bubble pop
[T_S1, T_S2, T_S3].forEach((t) => { tone(t, 700, 0.08, 0.025, 0.25, 0.002, 30); for (let k = 0; k < 5; k++) tone(t + 0.02 + k * 0.06, 150 + 30 * (k % 2), 0.09, 0.03, 0.3, 0.004, 25); noise(t, 0.35, 0.03, 0.3, 0.25, (p) => Math.sin(Math.PI * p)); });
tone(T_H1, 700, 0.08, 0.02, -0.3, 0.002, 30);
// bricks rising: one click + stone knock each
for (const [t0, a, b] of GROUPS) for (let r = a; r <= b; r++) { const t = t0 + 0.35 + (r - a) * 0.13; click(t, 0.05, 0); wood(t + 0.01, 0.04, 0); }
// knocks
[T_K1, T_K2].forEach((t) => { wood(t + 0.07, 0.09, -0.2); thump(t + 0.07, 0.05, 110, -0.2); });
// cut whooshes
[C1, C2, C3, C4, C5].forEach((c) => { sweep(c - 0.22, 0.35, 0.05, 0, 0.05, 0.45); thump(c, 0.05, 50, 0); });
// she walks away
for (let t = T_LEAVE + 0.1; t < T_GONE + 0.5; t += 0.45) step(t, 0.03, -0.4);
tone(T_SORRY, 700, 0.08, 0.02, 0.2, 0.002, 30);
// push strain + collapse
noise(T_PUSH, T_COL - T_PUSH, 0.03, 0.1, 0.1, (p) => p);
thump(T_COL, 0.16, 38, 0); noise(T_COL, 1.4, 0.12, 0, 0.35, (p) => Math.exp(-p * 3));
for (let k = 0; k < 26; k++) { const t = T_COL + 0.25 + k * 0.035 + rnd() * 0.04; wood(t, 0.05 + 0.03 * Math.abs(rnd()), (rnd() * 0.6)); }
noise(T_COL + 0.3, 2.0, 0.03, 0, 0.6, (p) => Math.sin(Math.PI * p) * (1 - p));
// kneel
thump(T_KNEEL + 0.6, 0.05, 90, 0.1);
typing(T_L2 - 0.6, 9, 26); typing(T_L2, 28, 26); typing(T_L3, 28, 26);
// FOLLOW: six bricks clink into the sign
for (let k = 0; k < 6; k++) { click(T_SIGN - 0.15 + k * 0.07, 0.05, 0); wood(T_SIGN - 0.13 + k * 0.07, 0.04, 0); }
tone(T_SIGN + 0.1, 880, 0.12, 0.03, 0, 0.002, 20); typing(T_SIGN + 0.3, 25, 30);
click(T_TAP, 0.09, 0); thump(T_TAP, 0.05, 90, 0);
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(T_TAP + 0.2 + d, m, 0.022, 0, 1.3));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.2, DUR, [60, 64, 67, 72], 0.01);
