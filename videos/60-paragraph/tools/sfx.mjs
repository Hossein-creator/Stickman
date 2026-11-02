// ---- "paragraph": night room tone, fast phone typing, a "whoosh" send, a dull "k" ping, silence, the phone thrown on the bed, sniffles, KNOCK KNOCK, footsteps, door creak, a warm chord and bells on the hug ----
const T_TYPE = 0.4, T_SENT = 2.5, T_K = 3.0, T_STARE = 3.3, T_THROW = 4.0, T_CURL = 4.4, T_KNOCK = 5.2, T_UP = 5.9, T_DOOR = 6.9, T_OPEN = 7.1, T_SAY = 7.5, T_HUG = 8.9, T_HOLD = 9.3, T_H1 = 10.0, T_H2 = 10.9, T_CARD = 12.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.008; add(i, lp * 0.1 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.1; t < T_K; t += 0.33) tone(t, 4200, 0.04, 0.005, -0.5, 0.002, 60);
for (let t = T_TYPE; t < T_SENT; t += 0.07 + 0.04 * rnd()) click(t, 0.025, 0.1);
sweep(T_SENT, 0.3, 0.04, 0.1, 0.02, 0.5); bell(T_SENT + 0.25, 84, 0.015, 0.1, 0.4);
tone(T_K, 520, 0.12, 0.03, 0.1, 0.002, 30); thump(T_K + 0.05, 0.06, 50, 0);
tone(T_STARE, hz(45), 1.0, 0.03, 0, 0.02, 2);
sweep(T_THROW + 0.1, 0.3, 0.04, -0.3, 0.02, 0.3); thump(T_THROW + 0.45, 0.06, 70, -0.3);
for (let t = T_CURL + 0.2; t < T_KNOCK; t += 0.35) noise(t, 0.12, 0.02, -0.1, 0.4, (p) => Math.sin(Math.PI * p));
[0, 0.25].forEach((d) => { wood(T_KNOCK + d, 0.1, 0.5); thump(T_KNOCK + d, 0.06, 90, 0.5); });
for (let t = T_UP + 0.2; t < T_DOOR; t += 0.3) step(t, 0.025, 0.3);
tone(T_OPEN, 300, 0.5, 0.012, 0.5, 0.1, 3); tone(T_OPEN + 0.05, 320, 0.4, 0.008, 0.5, 0.1, 3);
tone(T_SAY, 300, 0.12, 0.03, 0.4, 0.005, 25); tone(T_SAY + 0.07, 380, 0.12, 0.025, 0.4, 0.005, 25);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_OPEN + 0.2, T_CARD + 0.6, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.15, 0.3].forEach((d, i) => { thump(T_H2 + d, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85, 1.0].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
