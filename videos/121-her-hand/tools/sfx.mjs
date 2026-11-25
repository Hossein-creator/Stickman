// ---- "her hand": night street tone (far traffic hum), sad slow piano thinning per chapter; footsteps of both while walking; his phone taps; cut whooshes; heart cracks / shatter; her steps away; silence + low drop when he reaches back; "BABE?" ; typing; FOLLOW: signal beep, button press + crossing chirps + chime ----
const C = [0, 4.4, 8.4, 12.0], R1 = 0.8, IG1 = 1.4, T_C1 = 2.6, R2 = 5.0, IG2 = 5.8, T_C2 = 6.8, R3 = 9.0, IG3 = 9.6, T_C3 = 10.2;
const T_STOP = 12.8, T_SHAT = 13.2, T_LEAVE = 13.6, T_OUT = 15.0, T_HSTOP = 15.0, T_REACH = 15.4, T_TURN = 16.3, T_READ = 16.9, T_L2 = 18.4, T_L3 = 19.6, T_CTA = 21.2, T_WALK2 = 21.4, T_AT = 22.2, T_SIG = 22.4, T_TAP = 23.2;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; const r = rnd(); lp += (r - lp) * 0.01; lp2 += (r - lp2) * 0.002; add(i, (lp * 0.05 + lp2 * 0.12) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [69, 67, 65, 64, 65, 67, 69, 72, 69, 65, 64, 60];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; if (!(t > T_REACH - 0.2 && t < T_READ + 0.4)) { bell(t, MEL[i % MEL.length] - 12, 0.014 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.01, 0, 0.8); } t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
for (let t = 0.25; t < C[3] - 0.2; t += 0.32) { if ([C[1], C[2]].some((c) => Math.abs(t - c) < 0.2)) continue; step(t, 0.016, 0.2); step(t + 0.16, 0.014, -0.2); }
for (let t = C[3] + 0.2; t < T_HSTOP; t += 0.34) step(t, 0.016, 0.2);
for (let t = C[3] + 0.3; t < T_STOP; t += 0.4) step(t, 0.014, -0.2);
for (let t = IG1; t < T_HSTOP; t += 0.37) if (!(t > R3 + 0.4 && t < IG3 + 0.3) && !(t > C[3] - 0.2 && t < C[3] + 0.2)) click(t, 0.006, 0.35);
noise(IG3, 0.06, 0.06, 0.1, 0.7, (p) => Math.exp(-p * 8));
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.2, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.2, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
for (let t = T_LEAVE + 0.2; t < T_OUT; t += 0.45) step(t, 0.03 * (1 - (t - T_LEAVE) / 2), -0.6);
{ const s0 = Math.floor((T_REACH) * SR), n = Math.floor((T_CTA - T_REACH) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
tone(T_READ, 1100, 0.06, 0.012, 0, 0.002, 30);
typing(T_L2, 32, 26); typing(T_L3, 18, 26);
for (let t = T_WALK2 + 0.1; t < T_AT; t += 0.38) step(t, 0.02, 0.2);
tone(T_SIG, 880, 0.08, 0.012, 0.3, 0.002, 20);
click(T_TAP, 0.06, 0.3); tone(T_TAP + 0.02, 1400, 0.1, 0.02, 0.3, 0.002, 15);
for (let k = 0; k < 5; k++) tone(T_TAP + 0.3 + k * 0.22, 2800, 0.05, 0.01, 0.3, 0.001, 50);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
