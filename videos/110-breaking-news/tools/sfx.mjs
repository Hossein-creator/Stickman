// ---- "breaking news": evening city bed (low traffic rumble + far horns); phone ring; fast running steps (her + cameraman); a short news jingle when LIVE; his soft steps behind her; turn whoosh + surprise hit; ring box pop + sparkle; mic drop thud + small feedback squeal; "yes" bells; warm chord + heart bells on the hug; typing; FOLLOW: REC button pop, tap + bright chime ----
const T_CALL = 0.5, T_RUN = 1.9, T_ARR = 3.4, T_LIVE = 3.7, T_TALK = 4.1, T_IN = 4.5, T_KNEE = 5.4, T_POINT = 6.0, T_TURN = 6.6, T_NEWS = 7.0, T_SURP = 7.3, T_DROP = 7.8, T_MARRY = 8.4, T_YES = 9.8, T_RISE = 10.3, T_HUG = 10.6, T_L2 = 12.2, T_L3 = 13.2, T_CTA = 15.6, T_LT = 16.1, T_TAP = 17.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.01; add(i, (lp * 0.3 + Math.sin(2 * Math.PI * 55 * t) * 0.003) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
tone(2.6, 440, 0.25, 0.004, 0.8, 0.02, 6); tone(2.85, 392, 0.3, 0.004, 0.8, 0.02, 6);
for (let k = 0; k < 4; k++) { tone(T_CALL - 0.4 + k * 0.12, 1300, 0.08, 0.012, 0.1, 0.002, 30); tone(T_CALL - 0.34 + k * 0.12, 1600, 0.06, 0.01, 0.1, 0.002, 30); }
for (let t = T_RUN + 0.05; t < T_ARR; t += 0.2) step(t, 0.03, 0.0);
for (let t = T_RUN + 0.15; t < T_ARR + 0.2; t += 0.22) step(t, 0.022, -0.3);
[[0, 72], [0.12, 76], [0.24, 79], [0.36, 84]].forEach(([d, m]) => tone(T_LIVE + d, hz(m), 0.18, 0.012, 0, 0.004, 14));
thump(T_LIVE, 0.05, 60, 0);
for (let t = T_IN + 0.1; t < T_KNEE - 0.1; t += 0.4) step(t, 0.012, 0.5);
sweep(T_TURN - 0.2, 0.4, 0.06, 0, 0.05, 0.5); thump(T_TURN, 0.08, 55, 0); noise(T_TURN, 0.15, 0.05, 0, 0.8, (p) => Math.exp(-p * 6));
click(T_NEWS, 0.05, 0.3); for (let k = 0; k < 5; k++) tone(T_NEWS + 0.05 + k * 0.06, 2600 + 300 * k, 0.08, 0.006, 0.3, 0.001, 30);
thump(T_DROP + 0.4, 0.06, 90, 0.1); noise(T_DROP + 0.4, 0.08, 0.04, 0.1, 0.6, (p) => Math.exp(-p * 8)); tone(T_DROP + 0.42, 2900, 0.5, 0.006, 0.1, 0.05, 4);
[[0, 76], [0.1, 81], [0.2, 85]].forEach(([d, m]) => bell(T_YES + d, m, 0.022, 0, 1.2));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_YES, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 79], [0.08, 84], [0.16, 88]].forEach(([d, m]) => bell(T_HUG + d, m, 0.02, 0, 1.2));
typing(T_L2, 27, 26); typing(T_L3, 17, 26);
sweep(T_CTA - 0.1, 1.0, 0.05, 0, 0.04, 0.4);
tone(T_LT, 1320, 0.08, 0.015, 0, 0.002, 30);
click(T_TAP, 0.06, -0.2); thump(T_TAP, 0.04, 140, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
