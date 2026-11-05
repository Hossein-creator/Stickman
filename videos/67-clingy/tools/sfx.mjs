// ---- "clingy": room tone, his cheerful "bye!" + quick steps, her "nooo!", heavy dragging steps and a floor squeak, a thud as she drops and hugs his leg, "stay!", scraping drag, a big sigh, "fine. i'll stay.", briefcase whoosh + sofa thump, warm chord + bells at the hug; slams + card ----
const T_BYE = 0.4, T_GRAB = 1.0, T_DRAG1 = 1.4, T_DROP = 3.0, T_DRAG2 = 3.2, T_STOP = 4.6, T_SIGH = 4.9, T_UP = 5.7, T_STAY = 6.0, T_TOSS = 6.8, T_HUG = 7.2, T_HOLD = 7.6;
const T_H1 = 8.6, T_H2 = 9.5, T_CARD = 10.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
shout(T_BYE, 260, 0.3, 0.04, 0.2);
for (let t = T_BYE; t < T_DRAG1; t += 0.22) step(t, 0.018, 0.2);
shout(T_GRAB + 0.1, 400, 0.9, 0.04, -0.2);
for (let t = T_DRAG1; t < T_DROP; t += 0.4) { step(t, 0.03, 0.2); tone(t + 0.1, 1400 + 300 * rnd(), 0.12, 0.008, -0.2, 0.01, 6); }
thump(T_DROP + 0.2, 0.08, 55, -0.1);
shout(T_DROP + 0.25, 420, 0.4, 0.04, -0.2);
for (let t = T_DRAG2; t < T_STOP; t += 0.45) { step(t, 0.03, 0.2); noise(t + 0.05, 0.3, 0.02, -0.2, 0.3, (p) => Math.sin(Math.PI * p)); }
noise(T_SIGH, 0.7, 0.03, 0.2, 0.2, (p) => Math.sin(Math.PI * p) * (1 - p));
shout(T_STAY, 230, 0.8, 0.035, 0.2);
for (let k = 0; k < 4; k++) bell(T_STAY + 0.3 + k * 0.08, 84 + k * 3, 0.01, -0.2, 0.4);
noise(T_TOSS, 0.35, 0.04, -0.3, 0.4, (p) => Math.sin(Math.PI * p)); thump(T_TOSS + 0.7, 0.05, 70, -0.5);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_STAY, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.15, 0.3].forEach((d, i) => thump(T_H1 + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0, 0.15, 0.3].forEach((d, i) => { thump(T_H2 + d, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.82, 0.94, 1.06].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
