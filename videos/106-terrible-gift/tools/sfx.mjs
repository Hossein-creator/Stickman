// ---- "terrible gift": light comedic room tone + pizzicato, box handover rustle + lid pop for each gift, a sad trombone-ish "wah" per bad gift (worse each time), thunder rumble with the cloud, kettle steam hiss, wind-up whoosh, "wait!" stop, peel rustles, ring sparkle + swell, "yes" bells, warm chord + heart bells; typing; FOLLOW: box drop thud, lid pop + heart burst + bright chime ----
const GIV = [0.6, 2.9, 5.1], OPN = [1.2, 3.5, 5.7], SAY = [1.9, 4.2, 6.3], T_WIND = 6.9, T_WAIT = 7.3, T_PEEL = 8.1, T_RING = 9.0, T_KNEEL = 9.6, T_WILL = 10.1, T_YES = 10.8, T_HUG = 11.6, T_L2 = 12.8, T_L3 = 13.8, T_CTA = 15.6, T_BOX4 = 16.0, T_OPEN4 = 17.4;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.06 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
[72, 76, 79, 76, 74, 77, 81, 77].forEach((m, i) => tone(0.2 + i * 0.35, hz(m), 0.25, 0.01, 0, 0.002, 12));
const wah = (t, depth) => { const s0 = Math.floor(t * SR), n = Math.floor(0.9 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 220 * Math.pow(0.5, (tt / 0.9) * depth); add(s0 + i, ((tt * f) % 1 < 0.5 ? 1 : -1) * 0.008 * Math.min(1, tt / 0.03) * (1 - i / n), 0.2); } };
OPN.forEach((t, i) => { noise(GIV[i], 0.2, 0.03, 0, 0.3, (p) => Math.sin(Math.PI * p)); tone(t, 900, 0.06, 0.015, 0.2, 0.001, 40); wah(SAY[i] - 0.2, 0.3 + 0.25 * i); });
{ const s0 = Math.floor((OPN[1] + 0.3) * SR), n = Math.floor((T_RING - OPN[1] - 0.3) * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * 40 * tt) * 0.012 * Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 0.3), 0.3); } }
noise(OPN[2] + 0.3, T_RING - OPN[2] - 0.3, 0.012, 0.3, 0.8, (p) => Math.sin(Math.PI * p));
sweep(T_WIND, 0.4, 0.05, 0.3, 0.05, 0.6); tone(T_WAIT, 600, 0.12, 0.02, -0.2, 0.002, 10);
for (let k = 0; k < 4; k++) noise(T_PEEL + 0.25 * k, 0.15, 0.03, 0.2, 0.5, (p) => Math.sin(Math.PI * p));
[[0, 96], [0.07, 100], [0.14, 103]].forEach(([d, m]) => bell(T_RING + d, m, 0.016, 0.2, 0.9));
sweep(T_RING, 0.8, 0.03, 0, 0.05, 0.3);
thump(T_KNEEL + 0.3, 0.04, 90, -0.2); tone(T_WILL, 700, 0.08, 0.018, -0.2, 0.002, 30);
[[0, 79], [0.1, 84]].forEach(([d, m]) => bell(T_YES + d, m, 0.02, 0.2, 1.0));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_RING, T_CTA + 0.4, [57, 61, 64, 69], 0.008);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HUG + d, m, 0.02, 0, 1.2));
typing(T_L2, 21, 26); typing(T_L3, 9, 26);
sweep(T_BOX4 - 0.1, 0.5, 0.05, 0, 0.05, 0.5); thump(T_BOX4 + 0.45, 0.07, 90, 0);
tone(T_OPEN4, 900, 0.06, 0.02, 0, 0.001, 40); noise(T_OPEN4, 0.1, 0.06, 0, 0.8, (p) => Math.exp(-p * 6));
for (let k = 0; k < 8; k++) tone(T_OPEN4 + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_OPEN4 + d, m, 0.022, 0, 1.4));
chord(T_OPEN4, DUR, [60, 64, 67, 72], 0.01);
