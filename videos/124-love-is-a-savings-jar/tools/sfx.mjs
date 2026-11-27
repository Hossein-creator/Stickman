// ---- "love is a savings jar": kitchen night room tone + fridge hum; coin clinks into glass (pitch drops as it fills), coin scrape when she takes one out + bag rustle, phone taps; top: key rises (shimmer), warm chord + heart bells; bottom: last coin out = hollow empty jar tap, glass crack, her steps leaving, low drone; typing; FOLLOW: coin spin ring + tap + bells ----
const TOPEV = [0.8, 1.6, 2.4, 3.2, 4.0, 4.8, 5.6, 6.3];
const BOTEV = [[0.8, 1], [1.5, -1], [2.4, 1], [3.1, -1], [4.0, 1], [4.7, -1], [5.6, 1], [6.3, -1], [7.0, -1]];
const T_KEY = 6.9, T_HOLD = 7.5, T_HEART = 8.0, T_LOOK = 7.6, T_CRACK = 8.1, T_WALK = 8.7, T_GONE = 10.6, T_H2 = 9.6, T_H3 = 10.8, T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() * 0.5 - lp) * 0.01; add(i, (lp * 0.1 + 0.005 * Math.sin(2 * Math.PI * 58 * t) + 0.003 * Math.sin(2 * Math.PI * 116 * t)) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const clink = (t, n, g, pan) => { const f = 2600 - n * 180; tone(t, f, 0.5, g, pan, 0.001, 14); tone(t, f * 1.52, 0.4, g * 0.6, pan, 0.001, 18); tone(t + 0.07, f * 0.9, 0.3, g * 0.4, pan, 0.001, 22); noise(t, 0.02, g * 0.8, pan, 0.9, (p) => 1 - p); };
TOPEV.forEach((te, i) => clink(te + 0.36, i, 0.03, i % 2 ? 0.2 : -0.2));
let lvl = 1; BOTEV.forEach(([te, d]) => { if (d > 0) { clink(te + 0.36, lvl, 0.03, -0.1); lvl++; } else { noise(te, 0.25, 0.03, 0.3, 0.6, (p) => Math.sin(Math.PI * p)); tone(te + 0.05, 2200, 0.2, 0.012, 0.3, 0.001, 30); noise(te + 0.4, 0.3, 0.03, 0.5, 0.15, (p) => Math.sin(Math.PI * p)); lvl--; } });
tone(7.3, 900, 0.4, 0.02, 0, 0.001, 12);
for (let t = 0.4; t < T_WALK; t += 0.55) click(t, 0.006, 0.4);
for (let k = 0; k < 6; k++) tone(T_KEY + k * 0.07, 2000 + k * 260, 0.4, 0.008, 0, 0.002, 10);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_KEY - 0.3, T_CTA + 0.5, [53, 57, 60, 65], 0.01);
[[0, 74], [0.08, 79], [0.16, 83]].forEach(([d, m]) => bell(T_HEART + d, m, 0.022, 0, 1.2));
noise(T_CRACK, 0.12, 0.07, 0, 0.95, (p) => Math.exp(-p * 8)); tone(T_CRACK, 3400, 0.3, 0.02, 0, 0.001, 20); tone(T_CRACK + 0.03, 4700, 0.25, 0.012, 0, 0.001, 24);
for (let t = T_WALK + 0.2; t < T_GONE; t += 0.42) step(t, 0.02, 0.5);
{ const s0 = Math.floor((T_CRACK + 0.1) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.032 * e, 0); } }
typing(T_H2, 16, 30); typing(T_H3, 16, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
for (let k = 0; k < 8; k++) tone(T_TAG + k * 0.12, 1800 + 120 * Math.sin(k), 0.2, 0.008, 0, 0.001, 30);
click(T_TAP, 0.06, 0.1); clink(T_TAP + 0.02, 0, 0.03, 0.1);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.024, 0.1, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.011);
