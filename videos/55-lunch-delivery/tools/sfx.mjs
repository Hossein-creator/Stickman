// ---- "lunch delivery": office hum + keyboard clatter, clock ticks on the time jumps, paper rustle as the piles grow, stomach growl, her footsteps, a tap, papers whoosh off the desk, lid pop, "aah" pop, warm chord, coworker's sigh ----
const T_T1 = 1.2, T_T2 = 2.2, T_GROWL = 2.7, T_IN = 3.8, T_AT = 4.8, T_TAP = 4.9, T_LOOK = 5.1, T_PUSH = 5.5, T_SET = 6.0, T_FEED = 6.6, T_SMILE = 7.5, T_PEEK = 8.0, T_KISS = 9.0, T_BYE = 9.6, T_H1 = 10.6, T_H2 = 11.5, T_CARD = 12.8;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.02; lp2 += (lp - lp2) * 0.1; add(i, lp2 * 0.25 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.1; t < T_LOOK; t += 0.06 + 0.05 * rnd()) noise(t, 0.012, 0.025, 0.1, 0.9, (p) => Math.exp(-p * 6));
[T_T1, T_T2, T_IN].forEach((t) => { click(t, 0.06, 0); tone(t, 1400, 0.06, 0.02, 0, 0.001, 50); });
for (let k = 0; k < 8; k++) noise(0.3 + k * 0.42, 0.1, 0.012, 0.2, 0.8, (p) => Math.sin(Math.PI * p));
{ const s0 = Math.floor(T_GROWL * SR), n = Math.floor(0.7 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = 70 + 30 * Math.sin(p * 9) + 20 * p; ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(ph * 2.7)) * Math.sin(Math.PI * p) * 0.09 * (0.6 + 0.4 * Math.sin(p * 40)), -0.1); } }
for (let t = T_IN; t < T_AT; t += 0.3) step(t, 0.025, -0.3);
wood(T_TAP + 0.05, 0.03, -0.1); tone(T_LOOK, 700, 0.12, 0.025, 0, 0.005, 25);
sweep(T_PUSH + 0.1, 0.4, 0.05, 0.3, 0.02, 0.5); noise(T_PUSH + 0.2, 0.4, 0.03, 0.3, 0.8, (p) => Math.sin(Math.PI * p));
wood(T_SET + 0.2, 0.05, 0); click(T_SET + 0.4, 0.05, 0);
tone(T_FEED, 560, 0.12, 0.03, 0, 0.005, 25); tone(T_FEED + 0.07, 700, 0.12, 0.025, 0, 0.005, 25);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_SMILE, T_CARD + 0.6, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_SMILE + d, m, 0.02, 0, 1.2));
noise(T_PEEK + 0.5, 0.6, 0.025, 0.5, 0.15, (p) => Math.sin(Math.PI * p));
bell(T_KISS + 0.2, 88, 0.015, 0, 0.8);
for (let t = T_BYE + 0.2; t < T_BYE + 1.4; t += 0.3) step(t, 0.02, -0.3);
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.87, 1.0, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
