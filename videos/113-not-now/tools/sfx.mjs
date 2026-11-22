// ---- "not now": room tone, sad slow piano thinning per chapter; his phone taps under everything; camera shutter + flash whine per selfie; polaroid pop-ins; couch creak + his steps out (DAY 30); "NOT NOW." hand slap; her heart cracks / shatters; pin + suitcase + steps + door; silence + low drop when he looks up; typing; FOLLOW: pin, tap + bright chime ----
const C = [0, 4.4, 8.4, 12.0], T_RAISE1 = 0.6, T_SNAP1 = 1.4, IG1 = 2.0, T_C1 = 2.6, T_ASK2 = 4.8, T_UP2 = 5.2, T_SNAP2 = 5.9, IG2 = 6.1, T_C2 = 6.6, T_RAISE3 = 9.0, IG3 = 9.6, T_C3 = 10.0;
const T_PIN4 = 12.4, T_SHAT = 13.1, T_LEAVE = 13.5, T_OUT = 14.8, T_LOOK = 15.2, T_STAND = 15.6, T_AT = 16.6, T_READ = 16.8, T_L2 = 18.4, T_L3 = 19.4, T_CTA = 21.2, T_PIN = 21.7, T_TAP = 23.2;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [72, 71, 69, 67, 69, 71, 72, 74, 72, 69, 67, 64];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; if (!(t > T_LOOK - 0.2 && t < T_READ)) { bell(t, MEL[i % MEL.length] - 12, 0.014 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.01, 0, 0.8); } t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
for (let t = 0.3; t < T_LOOK; t += 0.37) if (!(t > T_UP2 && t < C[2])) click(t, 0.006, 0.35);
const shutter = (t) => { click(t, 0.06, -0.2); noise(t + 0.02, 0.06, 0.05, -0.2, 0.8, (p) => Math.exp(-p * 6)); tone(t + 0.05, 3800, 0.25, 0.004, -0.2, 0.01, 8); };
shutter(T_SNAP1); shutter(T_SNAP2);
[T_SNAP1 + 0.1, T_SNAP2 + 0.1, IG3 + 0.1, T_READ].forEach((t) => tone(t, 1100, 0.06, 0.012, 0, 0.002, 30));
noise(T_UP2, 0.3, 0.02, 0.3, 0.1, (p) => Math.sin(Math.PI * p)); for (let t = T_UP2 + 0.4; t < C[2] - 0.3; t += 0.45) step(t, 0.022, 0.5);
noise(IG3, 0.05, 0.08, 0.1, 0.7, (p) => Math.exp(-p * 8)); thump(IG3, 0.04, 120, 0.1);
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.2, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.2, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
click(T_PIN4 + 0.2, 0.04, -0.4);
for (let t = T_LEAVE + 0.2; t < T_OUT - 0.3; t += 0.45) { step(t, 0.03, -0.5); click(t + 0.1, 0.008, -0.5); }
click(T_OUT - 0.2, 0.05, -0.8); thump(T_OUT - 0.15, 0.05, 70, -0.8);
{ const s0 = Math.floor((T_LOOK) * SR), n = Math.floor((T_CTA - T_LOOK) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
for (let t = T_STAND + 0.1; t < T_AT; t += 0.45) step(t, 0.022, -0.2);
typing(T_L2, 22, 26); typing(T_L3, 23, 26);
click(T_PIN, 0.04, -0.2); click(T_TAP, 0.06, -0.2);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
