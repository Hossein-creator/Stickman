// ---- "heart problem": hospital hum + monitor beeps that follow the heart rate (racing, then a heart melody after "yes", calm after FOLLOW); yawn; doors bang + siren wail + stretcher wheels; chart slap; steps; surprise hit; ring box pop; "yes" bells; warm chord + heart bells on the hug; typing; FOLLOW: screen blip, tap + bright chime ----
const T_YAWN = 0.3, T_DOOR = 1.0, T_ROLL = 1.2, T_STOP = 2.7, T_CHART = 2.9, T_PMOUT = 3.5, T_WALK = 3.7, T_STETH = 4.6, T_RACE = 5.0;
const T_SIT = 6.8, T_SURP = 7.1, T_BOX = 7.8, T_OPEN = 8.3, T_FIX = 8.5, T_MARRY = 9.6, T_HANDS = 9.9, T_YES = 10.8, T_HUG = 11.6, T_L2 = 13.0, T_L3 = 14.0, T_CTA = 16.4, T_DRAW = 17.0, T_TAP = 18.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, (lp * 0.06 + Math.sin(2 * Math.PI * 120 * t) * 0.003) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const rate = (s) => (s < T_RACE ? 1.2 : s < T_SIT ? 1.2 + 2.0 * smooth(s, T_RACE, T_RACE + 1.2) : s < T_YES ? 3.2 : s < T_TAP ? 2.2 : 1.1);
{ let ph = 0, last = 0; for (let t = 0; t < DUR - 0.3; t += 1 / 120) { ph += rate(t) / 120; if (Math.floor(ph) > last) { last = Math.floor(ph); if (t > T_YES && t < T_TAP) bell(t, [76, 79, 84, 79][last % 4], 0.008, 0.3, 0.4); else tone(t, 988, 0.08, 0.008, 0.3, 0.002, 30); } } }
noise(T_YAWN, 0.6, 0.02, -0.3, 0.1, (p) => Math.sin(Math.PI * p));
thump(T_DOOR, 0.1, 70, -0.6); thump(T_DOOR + 0.06, 0.06, 90, -0.4);
{ const s0 = Math.floor(T_DOOR * SR), n = Math.floor((T_STOP + 1.0 - T_DOOR) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 700 + 250 * Math.sin(2 * Math.PI * 1.2 * tt), e = Math.min(1, tt / 0.2) * Math.min(1, (n / SR - tt) / 0.6); add(s0 + i, Math.sin(2 * Math.PI * f * tt) * 0.012 * e, -0.5); } }
noise(T_ROLL, T_STOP - T_ROLL, 0.025, -0.2, 0.15, (p) => Math.sin(Math.PI * p));
noise(T_CHART, 0.1, 0.04, 0, 0.6, (p) => 1 - p);
for (let t = T_PMOUT + 0.2; t < T_PMOUT + 1.4; t += 0.45) step(t, 0.03, -0.5);
for (let t = T_WALK + 0.1; t < T_STETH; t += 0.45) step(t, 0.03, 0.3);
sweep(T_SIT - 0.3, 0.4, 0.05, 0, 0.05, 0.6); thump(T_SURP, 0.08, 70, 0);
tone(T_OPEN, 1800, 0.1, 0.015, 0, 0.001, 30); [[0.05, 96], [0.12, 100]].forEach(([d, m]) => bell(T_OPEN + d, m, 0.014, 0, 0.8));
tone(T_FIX, 700, 0.08, 0.018, 0, 0.002, 30); tone(T_MARRY, 760, 0.08, 0.018, 0, 0.002, 30);
[[0, 79], [0.1, 84]].forEach(([d, m]) => bell(T_YES + d, m, 0.02, 0, 1.0));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_YES, T_CTA + 0.4, [57, 61, 64, 69], 0.008);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HUG + d, m, 0.02, 0, 1.2));
typing(T_L2, 23, 26); typing(T_L3, 22, 26);
sweep(T_CTA - 0.1, 0.9, 0.05, 0, 0.04, 0.4);
tone(T_DRAW, 1320, 0.1, 0.015, 0.3, 0.002, 20); tone(T_DRAW + 0.12, 1760, 0.1, 0.012, 0.3, 0.002, 20);
click(T_TAP, 0.06, 0.3);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
