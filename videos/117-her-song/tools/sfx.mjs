// ---- "her song": quiet room tone; HIS GUITAR plays her song (plucked arpeggio C-G-Am-F + top melody) in DAY 1/30/90, cut off when she walks out, sour stop at "TOO LOUD."; her phone taps; his heart cracks / shatters; guitar set down (wood knock), jacket, steps, door; silence; one plucked string when she touches it; typing; FOLLOW: page flip, tap + bright chime ----
const C = [0, 4.4, 8.4, 12.0], P1 = [0.4, 3.8], T_EAR = 1.4, IG1 = 1.8, T_C1 = 2.4, P2 = [4.6, 8.0], IG2 = 5.8, T_C2 = 6.4, P3 = [8.6, 9.7], IG3 = 9.6, T_C3 = 10.0;
const T_PUT = 12.4, T_SHAT = 13.1, T_LEAVE = 13.4, T_OUT = 14.6, T_LOOK = 15.2, T_STAND = 15.8, T_AT = 16.6, T_PLUCK = 17.0, T_L2 = 18.4, T_L3 = 19.4, T_CTA = 21.2, T_PIN = 21.7, T_TAP = 23.2;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.05 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const pluck = (t, m, g, pan = -0.2) => { tone(t, hz(m), 0.9, g, pan, 0.002, 5); tone(t, hz(m) * 2, 0.5, g * 0.3, pan, 0.002, 8); };
const CH = [[48, 55, 60, 64, 67, 64, 60, 55], [43, 50, 55, 59, 62, 59, 55, 50], [45, 52, 57, 60, 64, 60, 57, 52], [41, 48, 53, 57, 60, 57, 53, 48]];
const MEL = [76, 74, 72, 74, 76, 76, 76, 74, 74, 74, 76, 79, 79];
const song = (a, b, sour) => { let i = 0; for (let t = a; t < b - 0.05; t += 0.25, i++) { const bar = Math.floor(i / 8) % 4; pluck(t, CH[bar][i % 8], 0.012); if (i % 2 === 0) pluck(t, MEL[(i / 2) % MEL.length], 0.01, -0.1); } if (sour) { pluck(b, 49, 0.02); pluck(b + 0.02, 54, 0.02); noise(b, 0.15, 0.03, -0.2, 0.7, (p) => Math.exp(-p * 6)); } };
song(P1[0], P1[1]); song(P2[0], P2[1]); song(P3[0], P3[1], true);
for (let t = T_EAR + 0.3; t < C[1] - 0.2; t += 0.7) click(t, 0.006, 0.4);
noise(IG2, 0.3, 0.02, 0.4, 0.1, (p) => Math.sin(Math.PI * p)); for (let t = IG2 + 0.4; t < C[2] - 0.4; t += 0.45) step(t, 0.02, 0.6);
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.2, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.2, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
wood(T_PUT + 0.6, 0.04, -0.3); pluck(T_PUT + 0.6, 40, 0.006);
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
for (let t = T_LEAVE + 0.2; t < T_OUT - 0.3; t += 0.45) step(t, 0.025, -0.5);
click(T_OUT - 0.2, 0.05, -0.8); thump(T_OUT - 0.15, 0.05, 70, -0.8);
for (let t = T_STAND + 0.1; t < T_AT; t += 0.45) step(t, 0.02, 0);
pluck(T_PLUCK, 64, 0.03, -0.3);
{ const s0 = Math.floor((T_PLUCK + 0.6) * SR), n = Math.floor((T_CTA - T_PLUCK - 0.6) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.022 * e, 0); } }
typing(T_L2, 19, 26); typing(T_L3, 18, 26);
noise(T_PIN, 0.2, 0.03, -0.3, 0.6, (p) => Math.sin(Math.PI * p)); click(T_TAP, 0.06, -0.3);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
