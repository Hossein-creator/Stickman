// ---- "small box": warm room tone, soft curious pizzicato while she walks in, box handover, box shake rattle, lid pop, tiny shoes "tink", question boop, realization swell + "!" hit, "yes" bell, jump thump, heartbeat (her belly), warm chord + bells on the lift; typing; FOLLOW: music-box melody as the mobile lowers, tap pop + bright chime ----
const T_WIN = 0.4, T_STOP = 1.6, T_GIVE = 1.8, T_SHAKE = 2.6, T_ASK = 3.4, T_LID = 4.4, T_SHOES = 4.8, T_LOOK = 6.3, T_BELLY = 6.6;
const T_REAL = 7.4, T_YOU = 8.0, T_YES = 8.6, T_JUMP = 9.2, T_KNEEL = 9.9, T_BEAT = 10.6, T_UP = 11.8, T_LIFT = 12.3, T_L2 = 14.0, T_L3 = 15.0, T_CTA = 17.0, T_MOB = 17.3, T_TAP = 19.4;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
[72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 84].forEach((m, i) => tone(0.2 + i * 0.5, hz(m), 0.3, 0.012, 0, 0.002, 12));
for (let t = T_WIN + 0.2; t < T_STOP; t += 0.45) step(t, 0.025, -0.4);
noise(T_GIVE + 0.2, 0.2, 0.03, 0, 0.3, (p) => Math.sin(Math.PI * p));
for (let k = 0; k < 10; k++) { click(T_SHAKE + 0.2 + k * 0.1, 0.02, 0.2); tone(T_SHAKE + 0.2 + k * 0.1, 1800 + 300 * (k % 3), 0.03, 0.006, 0.2, 0.001, 80); }
tone(T_ASK, 700, 0.08, 0.02, 0, 0.002, 30);
tone(T_LID, 900, 0.06, 0.02, 0.1, 0.001, 40); thump(T_LID, 0.03, 160, 0.1);
[[0, 96], [0.08, 100]].forEach(([d, m]) => bell(T_SHOES + d, m, 0.016, 0, 0.8));
tone(T_SHOES + 0.4, 500, 0.12, 0.015, 0, 0.003, 12); tone(T_SHOES + 0.52, 650, 0.12, 0.015, 0, 0.003, 12);
sweep(T_REAL - 0.6, 0.7, 0.05, 0, 0.05, 0.6); thump(T_REAL, 0.08, 70, 0);
tone(T_YOU, 600, 0.1, 0.018, 0, 0.002, 20);
[[0, 79], [0.1, 84]].forEach(([d, m]) => bell(T_YES + d, m, 0.02, -0.2, 1.0));
thump(T_JUMP + 0.1, 0.06, 90, 0); thump(T_KNEEL + 0.4, 0.05, 80, 0);
for (let t = T_BEAT; t < T_UP; t += 0.7) { thump(t, 0.06, 55, -0.2); thump(t + 0.18, 0.04, 55, -0.2); }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_YES, T_CTA + 0.4, [57, 61, 64, 69], 0.008);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_LIFT + d, m, 0.02, 0, 1.2));
typing(T_L2, 17, 26); typing(T_L3, 23, 26);
[84, 88, 91, 88, 86, 89, 93, 89].forEach((m, i) => bell(T_MOB + 0.2 + i * 0.25, m, 0.012, 0, 0.9));
click(T_TAP, 0.06, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
