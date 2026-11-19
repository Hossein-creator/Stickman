// ---- "sticky notes": kitchen tone + fridge hum, sad slow piano thinning per chapter; paper stick "pat" for each note, fridge open/close, crumple + trash thunk, laptop typing + peel; her heart cracks / shatters; suitcase + steps + door; reading silence + low drop; typing; FOLLOW: pen scribble, note pat, tap + bright chime ----
const C = [0, 4.4, 8.4, 12.0], T_ST1 = 0.5, T_IN1 = 1.1, T_FR1 = 1.9, IG1 = 2.5, T_C1 = 2.7, T_IN2 = 4.8, T_LUNCH = 5.6, IG2 = 6.3, T_C2 = 6.5, T_ST3 = 9.2, IG3 = 10.1, T_C3 = 10.3;
const T_RED = 12.4, T_SHAT = 12.9, T_LEAVE = 13.2, T_OUT = 14.6, T_IN4 = 15.0, T_READ = 16.0, T_LOOK = 17.0, T_L2 = 18.0, T_L3 = 19.0, T_CTA = 21.2, T_WRITE = 21.6, T_STICK = 22.7, T_TAP = 23.5;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, (lp * 0.06 + Math.sin(2 * Math.PI * 60 * t) * 0.002) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [72, 71, 69, 67, 69, 71, 72, 74, 72, 69, 67, 64];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; bell(t, MEL[i % MEL.length] - 12, 0.014 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.01, 0, 0.8); t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
const pat = (t, pan) => { noise(t, 0.05, 0.04, pan, 0.5, (p) => 1 - p); thump(t, 0.015, 200, pan); };
[T_ST1, T_ST3, T_RED, T_STICK].forEach((t) => pat(t, -0.3));
for (let t = T_IN1 + 0.1; t < T_FR1; t += 0.45) step(t, 0.025, 0.3); click(T_FR1 + 0.1, 0.03, -0.4); thump(IG1, 0.03, 90, -0.4);
for (let t = IG1 + 0.3; t < C[1] - 0.3; t += 0.45) step(t, 0.025, -0.4);
for (let t = T_IN2 + 0.1; t < T_LUNCH; t += 0.45) step(t, 0.025, 0.3);
noise(IG2 - 0.4, 0.35, 0.05, 0, 0.6, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 60))); thump(IG2 + 0.1, 0.04, 110, -0.1);
for (let t = C[2] + 0.2; t < C[3] - 0.4; t += 0.11) click(t, 0.008, 0.3);
noise(IG3 - 0.15, 0.15, 0.04, 0.3, 0.7, (p) => p);
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, 0.2, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, 0.2, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
for (let t = T_LEAVE + 0.2; t < T_OUT - 0.3; t += 0.45) { step(t, 0.03, -0.4); click(t + 0.1, 0.008, -0.4); }
click(T_OUT - 0.3, 0.05, -0.7); thump(T_OUT - 0.25, 0.05, 70, -0.7);
for (let t = T_IN4 + 0.1; t < T_READ - 0.3; t += 0.45) step(t, 0.025, 0.3);
noise(T_READ - 0.1, 0.2, 0.04, -0.2, 0.6, (p) => p);
{ const s0 = Math.floor((T_READ) * SR), n = Math.floor((T_CTA - T_READ) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
typing(T_L2, 24, 26); typing(T_L3, 19, 26);
noise(T_WRITE, 1.0, 0.025, 0, 0.6, (p) => 0.5 + 0.5 * Math.sin(p * 50));
click(T_TAP, 0.06, -0.2);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
