// ---- "two coffees": room tone + laptop typing under her, sad slow piano thinning per chapter; coffee machine hum + pour per cup, cup set "tok", slide scrape, pour into plant, "STOP." thud, his heart cracks / shatters; steps + door; silence + low drop when she looks up; typing; FOLLOW: latte pop-in, tap + bright chime + warm chord ----
const C = [0, 4.4, 8.4, 12.0], T_POUR1 = 0.4, T_GO1 = 1.4, T_SET1 = 2.3, IG1 = 2.8, T_C1 = 3.0, T_IN2 = 4.6, T_SET2 = 5.5, T_LIFT2 = 6.0, IG2 = 6.4, T_C2 = 6.8;
const T_IN3 = 8.7, T_SET3 = 9.6, IG3 = 10.1, T_C3 = 10.4, T_POUR4 = 12.4, T_SHAT = 13.1, T_LEAVE = 13.5, T_OUT = 14.6, T_LOOK = 15.2, T_DOOR = 16.2, T_L2 = 17.2, T_L3 = 18.2, T_CTA = 20.4, T_ART = 20.9, T_TAP = 22.3;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [72, 71, 69, 67, 69, 71, 72, 74, 72, 69, 67, 64];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; if (!(t > T_LOOK - 0.2 && t < T_L2)) { bell(t, MEL[i % MEL.length] - 12, 0.014 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.01, 0, 0.8); } t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
for (let t = 0.2; t < T_LOOK - 0.3; t += 0.11) if (![[IG1 - 0.4, IG1 + 0.3], [T_LIFT2 - 0.2, IG2 + 0.6], [IG3 - 0.3, IG3 + 0.9]].some(([a, b]) => t > a && t < b)) click(t, 0.006, 0.35);
const machine = (t0) => { const s0 = Math.floor(t0 * SR), n = Math.floor(0.9 * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * 110 * tt) * 0.01 * Math.sin(Math.PI * i / n), -0.4); } noise(t0 + 0.15, 0.7, 0.025, -0.4, 0.3, (p) => Math.sin(Math.PI * p)); };
machine(T_POUR1); machine(T_POUR4);
const tok = (t, pan) => { wood(t, 0.03, pan); };
[T_SET1, T_SET2, T_SET3].forEach((t) => tok(t, 0.1));
noise(IG1 - 0.15, 0.3, 0.03, 0.2, 0.4, (p) => Math.sin(Math.PI * p));
noise(IG2, 0.5, 0.03, 0.4, 0.2, (p) => Math.sin(Math.PI * p));
thump(IG3, 0.06, 70, 0.2);
for (const [a, b] of [[T_GO1, T_SET1 - 0.3], [T_IN2, T_SET2 - 0.3], [T_IN3, T_SET3 - 0.3], [T_LEAVE, T_OUT]]) for (let t = a + 0.1; t < b; t += 0.45) step(t, 0.025, -0.2);
[C[1] + 0.1, C[2] + 0.2, T_OUT - 0.4].forEach((t) => { click(t - 0.2, 0.03, -0.6); });
thump(T_OUT - 0.1, 0.05, 70, -0.7);
[T_C1, T_C2, T_C3].forEach((c, i) => { tone(c, 3200, 0.05, 0.02, -0.2, 0.001, 60); noise(c, 0.12, 0.05 + 0.02 * i, -0.2, 0.7, (p) => Math.exp(-p * 6)); thump(c + 0.02, 0.05 + 0.02 * i, 60, 0); });
for (let k = 0; k < 6; k++) tone(T_SHAT + k * 0.05, 2500 + 400 * k, 0.12, 0.02, (k % 2 ? 0.3 : -0.3), 0.001, 30);
noise(T_SHAT, 0.4, 0.08, 0, 0.8, (p) => Math.exp(-p * 5)); thump(T_SHAT, 0.12, 40, 0);
{ const s0 = Math.floor((T_LOOK) * SR), n = Math.floor((T_CTA - T_LOOK) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 44 * tt) + 0.3 * Math.sin(2 * Math.PI * 88 * tt)) * 0.025 * e, 0); } }
typing(T_L2, 20, 26); typing(T_L3, 24, 26);
tone(T_ART, 1320, 0.08, 0.015, 0, 0.002, 30);
click(T_TAP, 0.06, 0.2);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP + 0.1, DUR, [60, 64, 67, 72], 0.009);
