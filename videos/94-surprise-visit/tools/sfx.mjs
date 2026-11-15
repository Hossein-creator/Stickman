// ---- "surprise visit": quiet room tone, sad slow piano (6 PM / 8 PM), video call ring + hang-up beep, her sigh, cut whooshes, candle hiss, marker scratch, clock ticks before the knock; two door knocks, chair scrape, steps, door creak + warm swell; gasp; running steps, suitcase thud, warm chord + bells on the hug; typing; FOLLOW: paper whoosh, stamp slam + bright chime ----
const C = [0, 5.2, 9.4], T_SAY = 0.9, T_OK = 3.0, T_END = 4.2, T_CROSS = 7.2;
const T_K1 = 9.9, T_K2 = 10.5, T_UP = 10.9, T_WALK = 11.2, T_DOOR = 12.6, T_OPEN = 12.9, T_GASP = 13.4, T_RUN = 14.0, T_HUG = 14.6, T_LIFT = 15.0;
const T_L2 = 16.6, T_L3 = 17.8, T_CTA = 19.6, T_PASS = 20.0, T_TAP = 21.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [69, 72, 76, 74, 72, 71, 69, 64, 65, 69, 72, 71];
for (let t = 0.2, i = 0; t < T_K1 - 0.3; i++) { bell(t, MEL[i % MEL.length] - 12, 0.014, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.01, 0, 0.8); t += 0.85; }
for (let k = 0; k < 2; k++) { tone(0.05 + k * 0.5, 880, 0.2, 0.012, 0.2, 0.01, 6); tone(0.25 + k * 0.5, 1100, 0.2, 0.012, 0.2, 0.01, 6); }
tone(T_END, 600, 0.12, 0.015, 0.2, 0.002, 10); tone(T_END + 0.14, 450, 0.18, 0.015, 0.2, 0.002, 8);
noise(T_OK + 0.5, 0.6, 0.02, 0.2, 0.08, (p) => Math.sin(Math.PI * p));
[C[1], C[2]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
noise(T_CROSS - 0.2, 0.2, 0.03, 0.4, 0.6, (p) => Math.sin(Math.PI * p)); noise(T_CROSS + 0.05, 0.2, 0.03, 0.4, 0.6, (p) => Math.sin(Math.PI * p));
for (let t = C[2] + 0.1; t < T_K1; t += 0.5) click(t, 0.015, 0.3);
const knock = (t) => { for (let k = 0; k < 2; k++) { wood(t + k * 0.16, 0.08, -0.5); thump(t + k * 0.16, 0.05, 90, -0.5); } };
knock(T_K1); knock(T_K2);
noise(T_UP, 0.3, 0.03, 0.3, 0.2, (p) => Math.sin(Math.PI * p));
for (let t = T_WALK + 0.2; t < T_DOOR; t += 0.45) step(t, 0.03, -0.2);
click(T_OPEN - 0.1, 0.04, -0.5); for (let k = 0; k < 20; k++) tone(T_OPEN + k * 0.025, 300 + 40 * Math.sin(k), 0.03, 0.006, -0.5, 0.002, 60);
noise(T_GASP, 0.25, 0.03, -0.2, 0.3, (p) => Math.sin(Math.PI * p));
for (let t = T_RUN; t < T_HUG; t += 0.2) step(t, 0.04, -0.3);
thump(T_HUG, 0.06, 90, -0.4); thump(T_HUG + 0.1, 0.04, 140, -0.5);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.0); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_OPEN, T_CTA + 0.6, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HUG + d, m, 0.02, 0, 1.2));
typing(T_L2, 24, 26); typing(T_L3, 30, 26);
sweep(T_PASS, 0.6, 0.07, 0, 0.05, 0.6);
thump(T_TAP, 0.12, 70, 0); click(T_TAP, 0.08, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
