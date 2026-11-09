// ---- "grandma vs grandpa": gym room tone, a tense drum pulse that speeds up with the rally, paddle "tok" + table "tik" for every hit and bounce, a cap whoosh, a big smash crack + whoosh, grandpa's "oops!", grandma's "I won!" + two little jump landings, a ding for the wink, her running steps, a kiss smooch, warm chord + bells; slams + card ----
const HITS = [0.5, 1.1, 1.65, 2.15, 2.6, 3.0, 3.38, 3.74, 4.08], T_SMASH = 4.5, T_MISS = 5.55, T_WON = 6.0, T_WINK = 6.9, T_RUN = 7.5, T_KISS = 8.2, T_HEART = 8.4, T_CAP = 3.0, T_H1 = 9.3, T_H2 = 10.1, T_CARD = 11.4;
const voice = (t, f0, d, g, pan = 0, bend = 0.3) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + bend * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const ALL = [...HITS, T_SMASH];
ALL.forEach((h, i) => { const pan = i % 2 ? 0.4 : -0.4; tone(h, 1200, 0.06, 0.05, pan, 0.001, 60); noise(h, 0.02, 0.05, pan, 0.8, (p) => 1 - p); if (i < ALL.length - 1) { const b = ALL[i + 1], bt = h + (b - h) * 0.55; tone(bt, 1800, 0.04, 0.03, -pan * 0.5, 0.001, 80); } });
for (let i = 0; i < HITS.length - 1; i++) thump(HITS[i] + (HITS[i + 1] - HITS[i]) / 2, 0.06, 55, 0);
thump(T_SMASH, 0.15, 45, 0.3); noise(T_SMASH, 0.1, 0.1, 0.3, 0.9, (p) => 1 - p); sweep(T_SMASH, 0.6, 0.08, -0.2, 0.1, 0.6);
sweep(T_CAP, 0.6, 0.04, -0.4, 0.05, 0.4); thump(T_CAP + 0.9, 0.03, 120, -0.5);
voice(T_MISS + 0.05, 230, 0.4, 0.04, -0.4, -0.25);
voice(T_WON + 0.1, 560, 0.6, 0.045, 0.4, 0.3); step(T_WON + 0.45, 0.05, 0.4); step(T_WON + 1.0, 0.05, 0.4);
bell(T_WINK, 88, 0.03, -0.3, 2); bell(T_WINK + 0.06, 93, 0.02, -0.3, 2);
for (let t = T_RUN; t < T_KISS - 0.1; t += 0.14) step(t, 0.03, 0.1);
noise(T_KISS, 0.12, 0.05, -0.1, 0.5, (p) => Math.sin(Math.PI * p)); tone(T_KISS + 0.05, 900, 0.1, 0.02, -0.1, 0.002, 30);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_WON, T_CARD + 0.6, [60, 64, 67, 72], 0.010);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26].forEach((d, i) => thump(T_H1 + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.7, 0.85].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.2, 69, 0.02, 0, 1.2); bell(T_CARD + 1.26, 76, 0.015, 0, 1.2);
