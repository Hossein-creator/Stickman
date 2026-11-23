// ---- "love is a sled": winter wind bed; snow crunch steps up the hill (top double rhythm, bottom single + slow), rope creak; top: sit-down thump, swoosh slide down + laugh-like bells, warm chord + heart bells; bottom: panting, she slides off alone (swoosh), his rope drops, her steps leaving, low drop; typing; FOLLOW: snowball rumble rolling, tap poof + sparkle + chime ----
const T_UP = 4.4, T_SIT = 5.0, T_GO = 5.6, T_DOWN = 7.0, T_HEART = 7.3, T_TIRED = 4.2, T_LET = 6.2, T_DN = 7.6, T_STAND = 7.9, T_GONE = 9.6, T_H2 = 9.6, T_H3 = 10.8, T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.008; add(i, lp * 0.25 * (0.7 + 0.3 * Math.sin(t * 0.9)) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const crunch = (t, g, pan) => noise(t, 0.09, g, pan, 0.35, (p) => Math.sin(Math.PI * p));
for (let t = 0.5; t < T_UP; t += 0.3) crunch(t, 0.02, -0.2);
for (let t = 0.6; t < T_LET - 0.2; t += 0.46) crunch(t, 0.02, 0.3);
for (let t = 0.8; t < T_LET; t += 1.3) tone(t, 180, 0.2, 0.004, 0.3, 0.05, 8);
thump(T_SIT + 0.3, 0.04, 90, -0.2);
sweep(T_GO, T_DOWN - T_GO, 0.05, -0.2, 0.1, 0.6);
[[0, 79], [0.15, 83], [0.3, 86], [0.45, 91]].forEach(([d, m]) => bell(T_GO + 0.3 + d, m, 0.012, -0.2, 0.6));
for (let k = 0; k < 7; k++) noise(T_TIRED + 0.2 + k * 0.42, 0.3, 0.016, 0.35, 0.25, (p) => Math.sin(Math.PI * p));
sweep(T_LET + 0.1, T_DN - T_LET, 0.045, 0.3, 0.1, 0.5);
thump(T_LET + 0.3, 0.03, 120, 0.4);
for (let t = T_STAND + 0.3; t < T_GONE; t += 0.42) crunch(t, 0.018, -0.4);
{ const s0 = Math.floor((T_LET + 0.4) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_GO, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 26, 30); typing(T_H3, 26, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
noise(T_TAG, 1.4, 0.03, 0.3, 0.08, (p) => Math.sin(Math.PI * p));
noise(T_TAP, 0.3, 0.06, 0, 0.5, (p) => Math.exp(-p * 6)); click(T_TAP, 0.04, 0);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2600 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
