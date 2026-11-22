// ---- "love is a three-legged race": light crowd/stadium bed; top: double steps in rhythm (both feet), a start whistle, tape snap + cheer swell + warm chord + heart bells; bottom: uneven single steps, stumble scuffs, her phone taps, the fall (thud + dust), ribbon untie (soft pull), her steps leaving, low drop; typing; FOLLOW: banner flip whoosh, high-five clap + confetti sparkle + chime ----
const T_FIN = 6.3, T_HEART = 7.0, T_TIRED = 4.4, T_LET = 5.6, T_UNTIE = 6.6, T_GO = 7.3, T_GONE = 9.0, T_H2 = 9.4, T_H3 = 10.6, T_CTA = 12.6, T_TAG = 13.3, T_TAP = 14.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - 0.5 - lp) * 0.02; add(i, lp * 0.12 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
tone(0.25, 2800, 0.25, 0.012, 0, 0.005, 4); tone(0.27, 3000, 0.22, 0.006, 0, 0.005, 4);
for (let t = 0.5; t < T_FIN + 0.4; t += 0.32) step(t, 0.03, -0.2);
for (let t = 0.6; t < T_LET; t += 0.42 + 0.1 * Math.sin(t * 3)) step(t, 0.022, 0.3);
noise(2.9, 0.2, 0.02, 0.3, 0.3, (p) => Math.sin(Math.PI * p)); noise(3.6, 0.2, 0.02, 0.3, 0.3, (p) => Math.sin(Math.PI * p));
for (let t = 0.8; t < T_UNTIE; t += 0.7) click(t, 0.008, 0.4);
thump(T_LET + 0.35, 0.12, 50, 0.2); noise(T_LET + 0.35, 0.5, 0.05, 0.2, 0.2, (p) => Math.exp(-p * 4));
noise(T_UNTIE, 0.4, 0.02, 0.2, 0.4, (p) => Math.sin(Math.PI * p));
for (let t = T_GO + 0.2; t < T_GONE; t += 0.42) step(t, 0.02, -0.4);
{ const s0 = Math.floor((T_GO) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
noise(T_FIN, 0.08, 0.06, -0.2, 0.7, (p) => Math.exp(-p * 8));
noise(T_FIN, 2.0, 0.05, -0.1, 0.4, (p) => Math.min(1, p * 5) * (1 - p));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_FIN - 0.2, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 25, 30); typing(T_H3, 22, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
sweep(T_TAG - 0.1, 0.4, 0.04, 0, 0.1, 0.5); tone(T_TAG + 0.2, 1320, 0.08, 0.015, 0, 0.002, 30);
noise(T_TAP, 0.05, 0.12, 0, 0.9, (p) => Math.exp(-p * 10));
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
