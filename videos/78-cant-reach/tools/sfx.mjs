// ---- "can't reach": kitchen room tone, little effort grunts + soft landings for each jump, her frustrated "argh!", his steps, "need help?", her "no.", a whoosh as he lifts her, jar clink, set down, crunch, happy chord + bells; slams + card ----
const J = [0.9, 1.6, 2.3, 5.5], T_ARGH = 2.75, T_IN = 2.3, T_HELP = 3.7, T_NO = 4.7, T_GRAB = 6.1, T_LIFT = 6.4, T_JAR = 7.2, T_DOWN = 7.7, T_GIVE = 8.6, T_EAT = 9.1, T_HEART = 9.4, T_H1 = 10.0, T_H2 = 10.8, T_CARD = 11.8;
const voice = (t, f0, d, g, pan = 0, bend = 0.3) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + bend * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
J.forEach((j) => { voice(j, 520, 0.18, 0.02, -0.1, 0.4); step(j + 0.5, 0.06, -0.1); });
voice(T_ARGH, 460, 0.5, 0.04, -0.1, 0.35);
for (let t = T_IN; t < T_IN + 1.2; t += 0.42) step(t, 0.04, -0.4);
voice(T_HELP, 240, 0.25, 0.03, -0.3, 0.3); voice(T_HELP + 0.3, 280, 0.3, 0.03, -0.3, 0.4);
voice(T_NO, 420, 0.3, 0.04, 0, -0.2);
sweep(T_LIFT, 0.6, 0.06, 0, 0.05, 0.4); voice(T_LIFT + 0.2, 640, 0.3, 0.025, 0, 0.5);
tone(T_JAR, 2600, 0.3, 0.02, 0.1, 0.001, 18); tone(T_JAR + 0.05, 3400, 0.25, 0.012, 0.1, 0.001, 20);
step(T_DOWN + 0.6, 0.05, 0);
noise(T_EAT, 0.25, 0.08, -0.2, 0.7, (p) => (Math.sin(p * 40) > 0 ? 1 : 0.3) * (1 - p));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_JAR - 0.2, T_CARD + 0.6, [60, 64, 67, 72], 0.010);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.2, 69, 0.02, 0, 1.2); bell(T_CARD + 1.26, 76, 0.015, 0, 1.2);
