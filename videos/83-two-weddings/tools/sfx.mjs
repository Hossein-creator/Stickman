// ---- "two weddings": act 1 party music (bright plucks on a beat) + crowd hum, price-tag "cha-ching" pops, firework whistles + booms; bottom: soft bells for the rings and kiss. Cut: whoosh + low hit. Act 2: rain-like room tone, mail drops (paper slap), clock-like tick (interest), argument stings, photo crash; coins clink into the jar, hammer/build knocks, warm chord when the light goes on. Headline typing, quote bells, CTA: hammer knocks, sign writing, tag swing, tap click + happy chime ----
const T_CUT = 9.0, TAGS = [1.0, 2.0, 3.0, 4.0, 5.2], FW = [3.8, 4.4, 5.0, 5.7, 6.4, 7.2], T_RINGS = 1.6, T_SCAKE = 2.8, T_KISS = 4.4;
const MAIL = [9.8, 10.6, 11.3, 11.9, 12.4, 12.9, 13.3], T_ARG1 = 14.4, T_ARG2 = 15.9, T_BACK = 17.4, T_PHOTO = 18.0;
const COINS = [9.8, 10.5, 11.2, 11.9, 12.6, 13.3], T_WALK = 13.8, T_BUILD = 14.0, T_ROOF = 15.6, T_LIGHT = 16.8, T_HUG = 17.3;
const T_H2 = 19.4, T_H3 = 20.4, T_Q = 21.8, T_CTA = 25.6, T_NAIL = 26.8, T_WRITE = 27.9, T_TAG = 28.6, T_TAP = 30.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.4) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
// party plucks (act 1)
const PL = [72, 76, 79, 76, 74, 77, 81, 77];
for (let k = 0; k * 0.25 < T_CUT - 0.4; k++) { const t = 0.2 + k * 0.25; tone(t, hz(PL[k % 8]), 0.18, 0.018, (k % 2 ? 0.2 : -0.2), 0.002, 14); if (k % 2 === 0) thump(t, 0.035, 70, 0); }
noise(0.2, T_CUT - 0.4, 0.012, 0, 0.08, (p) => Math.min(1, p * 8) * Math.min(1, (1 - p) * 8));
TAGS.forEach((t) => { tone(t, 1760, 0.12, 0.03, 0.3, 0.001, 18); tone(t + 0.06, 2637, 0.15, 0.025, 0.3, 0.001, 16); noise(t, 0.05, 0.03, 0.3, 0.9, (p) => 1 - p); });
FW.forEach((t) => { for (let i = 0; i < 20; i++) tone(t - 0.6 + i * 0.025, 900 + i * 60, 0.03, 0.006, -0.2, 0.002, 30); thump(t, 0.08, 45, 0.1); noise(t, 0.6, 0.04, 0.1, 0.5, (p) => Math.exp(-p * 5)); });
bell(T_RINGS + 0.3, 84, 0.015, 0, 1.4); bell(T_RINGS + 0.4, 88, 0.012, 0, 1.4); bell(T_KISS + 0.3, 79, 0.016, 0, 1.4); bell(T_KISS + 0.4, 84, 0.014, 0, 1.4);
tone(T_SCAKE, 1320, 0.1, 0.015, -0.3, 0.001, 20);
sweep(T_CUT - 0.3, 0.5, 0.08, 0, 0.05, 0.5); thump(T_CUT, 0.09, 44, 0);
// act 2
MAIL.forEach((t, i) => { noise(t + 0.45, 0.06, 0.05 + 0.005 * i, 0.3, 0.6, (p) => 1 - p); thump(t + 0.45, 0.02, 120, 0.3); });
for (let t = MAIL[0]; t < T_BACK; t += 0.5) tone(t, 1200, 0.03, 0.008, 0.4, 0.001, 60);
[T_ARG1, T_ARG2].forEach((t) => { tone(t, 220, 0.4, 0.03, 0, 0.005, 6); tone(t, 233, 0.4, 0.02, 0, 0.005, 6); });
thump(T_PHOTO + 0.35, 0.08, 90, 0); for (let k = 0; k < 5; k++) tone(T_PHOTO + 0.36 + k * 0.03, 3000 + 300 * k, 0.08, 0.015, 0, 0.001, 40);
COINS.forEach((t, i) => { tone(t + 0.45, 2200 + 120 * i, 0.12, 0.02, -0.3, 0.001, 30); tone(t + 0.47, 3300 + 120 * i, 0.1, 0.012, -0.3, 0.001, 30); });
for (let t = T_BUILD; t < T_ROOF + 0.5; t += 0.32) { thump(t, 0.035, 110, -0.3); noise(t, 0.03, 0.02, -0.3, 0.6, (p) => 1 - p); }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 1.0); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_LIGHT, T_Q + 1.0, [57, 60, 64, 69], 0.008);
{ const s0 = Math.floor(T_BACK * SR), n = Math.floor((T_Q - T_BACK) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 1) * Math.min(1, (n / SR - tt) / 1); add(s0 + i, Math.sin(2 * Math.PI * 46 * tt) * 0.018 * e, 0); } }
typing(T_H2, 27, 30); typing(T_H3, 22, 30);
bell(T_Q, 57, 0.02, 0, 0.9); bell(T_Q + 0.6, 60, 0.018, 0, 0.9); bell(T_Q + 1.2, 64, 0.018, 0, 0.9);
sweep(T_CTA - 0.1, 1.0, 0.07, 0, 0.04, 0.4);
for (let k = 0; k < 6; k++) { const t = T_NAIL + k / 3 + 1 / 6; if (t < T_WRITE - 0.2) { thump(t, 0.05, 160, 0.3); click(t, 0.05, 0.3); } }
typing(T_WRITE, 16, 24);
tone(T_TAG, 660, 0.15, 0.02, 0, 0.002, 18);
click(T_TAP, 0.09, 0); thump(T_TAP, 0.05, 90, 0);
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(T_TAP + 0.15 + d, m, 0.022, 0, 1.3));
chord(T_TAP + 0.15, DUR, [60, 64, 67, 72], 0.01);
typing(T_TAG + 0.3, 38, 30);
