// ---- "love is a tin can phone": quiet night tone; a tinny "voice" blip pattern per spoken word card (top both, bottom his), a string twang when it goes tight/slack, soft paper flop for each word that falls, his can put down + steps away, her "hello?" blip into nothing, low drop; top warm chord + heart bells; typing; FOLLOW: zip whir along the string, catch pop + bright chime ----
const TOPW = [[0.6, 0], [2.5, 1], [4.4, 0], [6.1, 1]], BOTW = [[0.6, 0], [2.5, 0], [4.4, 0], [6.1, 0], [9.5, 1]];
const TRAV = 1.2, T_HEART = 7.8, T_DROP = 1.1, T_PUT = 7.4, T_LEAVE = 7.9, T_PICK = 9.1, T_H2 = 10.8, T_H3 = 12.0, T_CTA = 14.4, T_ZIP = 15.4, T_CATCH = 16.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const voice = (t, pan, hi) => { for (let k = 0; k < 6; k++) tone(t + k * 0.09, (hi ? 620 : 420) + 90 * Math.sin(k * 2.1), 0.07, 0.008, pan, 0.005, 25); };
TOPW.forEach(([t, w]) => { voice(t - 0.2, w ? 0.4 : -0.4, w); voice(t + TRAV - 0.1, w ? -0.4 : 0.4, w); });
BOTW.forEach(([t, w]) => { voice(t - 0.2, w ? 0.4 : -0.4, w); noise(t + TRAV * 0.8 + 0.3, 0.12, 0.03, 0, 0.3, (p) => (1 - p) ** 2); thump(t + TRAV * 0.8 + 0.32, 0.02, 120, 0); });
tone(0.2, 180, 0.4, 0.008, 0, 0.003, 6);
for (let k = 0; k < 4; k++) tone(T_DROP + 0.3 + k * 0.08, 140 - 15 * k, 0.3, 0.008, 0, 0.003, 8);
click(T_PUT + 0.3, 0.04, -0.4); thump(T_PUT + 0.3, 0.03, 160, -0.4);
for (let t = T_LEAVE + 0.2; t < T_LEAVE + 1.8; t += 0.5) step(t, 0.03, -0.6);
{ const s0 = Math.floor((T_PICK + 1.2) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HEART - 0.6, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 23, 30); typing(T_H3, 28, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
{ const s0 = Math.floor(T_ZIP * SR), n = Math.floor((T_CATCH - T_ZIP) * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (300 + 500 * tt) * tt) * 0.01 * Math.sin(Math.PI * tt / (n / SR)), 0); } }
click(T_CATCH, 0.06, -0.2);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_CATCH + d, m, 0.022, 0, 1.4));
chord(T_CATCH, DUR, [60, 64, 67, 72], 0.01);
