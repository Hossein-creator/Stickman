// ---- "love is a piano duet": the duet itself: her melody (0.3 s) + his chords (0.6 s), piano-like plucks; the bottom has only his half, slowing, every third note wrong (detuned), then a lid thud + low drop; top heart bells; typing; FOLLOW: page turn flip + bright chime ----
const T_PLAY = 0.4, T_END = 7.2, T_HEART = 7.4, T_SLOW = 4.4, T_STOP = 6.2, T_LID = 6.8, T_H2 = 9.0, T_H3 = 10.2, T_CTA = 12.6, T_SHEET = 13.4, T_TURN = 15.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const piano = (t, m, g, pan, det = 0) => { const f = hz(m) * (1 + det); const s0 = Math.floor(t * SR); for (let i = 0; i < SR * 1.2; i++) { const tt = i / SR, e = Math.min(1, tt / 0.004) * Math.exp(-tt * 3.2); add(s0 + i, (Math.sin(2 * Math.PI * f * tt) + 0.4 * Math.sin(4 * Math.PI * f * tt) * Math.exp(-tt * 6) + 0.15 * Math.sin(6 * Math.PI * f * tt) * Math.exp(-tt * 9)) * g * e, pan); } };
const MEL = [76, 78, 80, 81, 80, 78, 76, 73, 74, 76, 78, 76, 73, 71, 69, 71, 73, 74, 76, 78, 80, 81, 83, 85];
const CH = [[57, 61, 64], [54, 57, 61], [50, 54, 57], [52, 56, 59]];
let k = 0; for (let t = T_PLAY; t < T_END; t += 0.3, k++) piano(t, MEL[k % MEL.length], 0.012, -0.25);
k = 0; for (let t = T_PLAY; t < T_END; t += 0.6, k++) CH[Math.floor(k / 2) % 4].forEach((m) => piano(t, m, 0.007, 0.25));
piano(T_END, 81, 0.014, 0); CH[0].forEach((m) => piano(T_END, m, 0.008, 0));
{ let t = T_PLAY, j = 0; while (t < T_STOP) { const wrong = j % 3 === 2; CH[Math.floor(j / 2) % 4].forEach((m, q) => piano(t, m + (wrong && q === 1 ? 1 : 0), 0.006, 0.35, wrong ? 0.03 : 0)); t += 0.6 + 0.5 * Math.max(0, (t - T_SLOW) / (T_STOP - T_SLOW)); j++; } }
thump(T_LID + 0.2, 0.1, 70, 0.3); wood(T_LID + 0.2, 0.05, 0.3);
{ const s0 = Math.floor((T_LID + 0.4) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 21, 30); typing(T_H3, 23, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
[[0, 88], [0.07, 91]].forEach(([d, m]) => bell(T_SHEET + d, m, 0.01, 0, 0.6));
noise(T_TURN - 0.25, 0.3, 0.05, 0, 0.5, (p) => Math.sin(Math.PI * p));
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TURN + d, m, 0.022, 0, 1.4));
CH[0].forEach((m) => piano(T_TURN + 0.1, m + 12, 0.008, 0)); piano(T_TURN + 0.1, 81, 0.012, 0);
