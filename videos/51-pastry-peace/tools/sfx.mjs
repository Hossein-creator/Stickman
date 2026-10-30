// ---- "pastry peace": street murmur + bakery bell, a dreamy chime when she stares, his "!" ping; evening room, an angry phone call, phone thrown, thunder rumbles under her cloud; door, footsteps, box lid pop + sparkle, cloud melts into a warm chord; flashback whoosh; end card ----
const T_STOP = 0.9, T_STARE = 1.0, T_NOTICE = 1.7, T_GO = 2.2, S_HOME = 2.7, T_CALL = 2.9, T_HANG = 3.7, T_CROSS = 4.2;
const T_DOOR = 5.9, T_KNEEL = 6.9, T_OPEN = 7.5, T_PEEK = 8.0, T_MELT = 8.4, T_HUG = 9.2, T_HOW = 9.6, S_FLASH = 10.1, S_BACK = 10.9, T_H1 = 11.8, T_H2 = 12.7, T_CARD = 14.0;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.05; lp2 += (lp - lp2) * 0.1; const street = t < S_HOME || (t >= S_FLASH && t < S_BACK); add(i, lp2 * (street ? 0.35 : 0.1) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.1; t < T_STOP; t += 0.28) { step(t, 0.025, -0.2); step(t + 0.1, 0.02, -0.1); }
bell(0.3, 91, 0.012, 0.3, 0.6); bell(0.36, 96, 0.01, 0.3, 0.6);
[[0, 81], [0.12, 84], [0.24, 88]].forEach(([d, m]) => bell(T_STARE + d, m, 0.015, 0.1, 1.2));
tone(T_NOTICE, 1500, 0.12, 0.03, -0.1, 0.002, 25);
for (let t = T_GO; t < S_HOME; t += 0.28) step(t, 0.02, 0);
// call: muffled voice from the phone, she snaps, hangs up, throws it
for (let t = T_CALL + 0.1; t < T_HANG - 0.2; t += 0.18) tone(t, 260 + 60 * rnd(), 0.1, 0.008, 0.2, 0.01, 20);
tone(T_HANG - 0.2, 300, 0.2, 0.035, 0, 0.005, 10); tone(T_HANG - 0.1, 240, 0.25, 0.03, 0, 0.005, 10);
click(T_HANG + 0.05, 0.06, 0); sweep(T_HANG + 0.15, 0.3, 0.03, -0.3, 0.02, 0.3); thump(T_HANG + 0.45, 0.06, 80, -0.3);
for (let t = T_CROSS; t < T_MELT; t += 0.75) { thump(t, 0.05, 36, 0); noise(t, 0.6, 0.02, 0, 0.05, (p) => Math.exp(-p * 3)); }
// door + steps + kneel
noise(T_DOOR - 0.2, 0.35, 0.03, 0.4, 0.25, (p) => Math.sin(Math.PI * p)); wood(T_DOOR - 0.15, 0.04, 0.4);
for (let t = T_DOOR; t < T_KNEEL; t += 0.3) step(t, 0.025, 0.3);
noise(T_KNEEL + 0.1, 0.2, 0.02, 0.2, 0.3);
click(T_OPEN, 0.05, 0); [[0, 88], [0.06, 93], [0.12, 100]].forEach(([d, m]) => bell(T_OPEN + 0.05 + d, m, 0.022, 0, 1.0));
// melt: warm chord
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_MELT, T_CARD + 0.6, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_MELT + 0.2 + d, m, 0.02, 0, 1.2));
tone(T_HOW, 560, 0.12, 0.03, 0, 0.005, 25); tone(T_HOW + 0.07, 700, 0.12, 0.025, 0, 0.005, 25);
sweep(S_FLASH - 0.1, 0.3, 0.04, 0, 0.02, 0.4); sweep(S_BACK - 0.1, 0.3, 0.04, 0, 0.02, 0.4);
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.1, 0.2, 0.34, 0.44, 0.54].forEach((d, i) => { thump(T_H2 + d, i === 5 ? 0.12 : 0.05, i === 5 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_CARD + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0.8, 0.95, 1.1].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
