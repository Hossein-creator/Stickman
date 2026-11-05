// ---- "taken for granted": street night tone + phone tap-taps; jacket rustle, his teeth chattering; rain starts, the umbrella pops open, rain patter on it; paper bag rustle of the fries + crunching; his soft "I love you.", her flat "mhm."; a sad low note, his slow footsteps fading in the rain; the rain hits her full, "babe?", the phone clatters on the ground; low drone; slams + card ----
const T_JACK = 0.6, T_RAIN = 2.0, T_UMB = 2.2, T_FRIES = 3.8, T_LOVE = 5.2, T_MHM = 5.9, T_DOWN = 6.2, T_GO = 6.7, T_OUT = 8.0, T_WET = 7.3, T_LOOK = 7.7, T_TURN = 8.2, T_DROP = 8.7;
const T_H1 = 9.3, T_H2 = 10.2, T_CARD = 11.2;
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
{ let lp = 0, lr = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; lr += ((rnd() - 0.5) - lr) * 0.6; const rainOn = smooth(t, T_RAIN, T_RAIN + 0.5) * (1 + 0.6 * smooth(t, T_WET, T_WET + 0.3)); add(i, (lp * 0.08 + lr * 0.05 * rainOn) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
for (let t = 0.3; t < T_LOOK; t += 0.35 + 0.3 * rnd()) tone(t, 2400, 0.02, 0.006, -0.2, 0.001, 80);
noise(T_JACK, 0.5, 0.03, 0.1, 0.4, (p) => Math.sin(Math.PI * p));
for (let t = T_JACK + 0.8; t < T_UMB; t += 0.06) noise(t, 0.02, 0.01, 0.3, 0.9, (p) => 1 - p);
noise(T_UMB, 0.15, 0.06, 0.1, 0.5, (p) => (1 - p)); thump(T_UMB + 0.05, 0.04, 90, 0.1);
for (let t = T_UMB + 0.3; t < T_GO; t += 0.05 + 0.05 * rnd()) tone(t, 800 + 400 * rnd(), 0.03, 0.006, 0, 0.002, 60);
noise(T_FRIES, 0.3, 0.025, 0.1, 0.7, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 50)));
for (let k = 0; k < 5; k++) noise(T_FRIES + 0.6 + k * 0.42, 0.05, 0.02, -0.2, 0.7, (p) => 1 - p);
shout(T_LOVE, 220, 0.7, 0.03, 0.2); shout(T_MHM, 300, 0.3, 0.02, -0.2);
tone(T_DOWN + 0.2, hz(52), 1.2, 0.025, 0, 0.05, 2); tone(T_DOWN + 0.35, hz(55), 1.0, 0.018, 0, 0.05, 2);
for (let t = T_GO; t < T_OUT; t += 0.33) step(t, 0.02 * (1 - (t - T_GO) / (T_OUT - T_GO + 0.3)), 0.5);
shout(T_LOOK + 0.1, 380, 0.4, 0.03, -0.2);
noise(T_DROP + 0.4, 0.06, 0.06, -0.1, 0.9, (p) => 1 - p); tone(T_DROP + 0.4, 1600, 0.15, 0.02, -0.1, 0.002, 30); thump(T_DROP + 0.42, 0.04, 100, -0.1);
{ const s0 = Math.floor(T_LOOK * SR), n = Math.floor((T_CARD + 0.6 - T_LOOK) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt) + 0.2 * Math.sin(2 * Math.PI * 73.4 * tt)) * 0.025 * e, 0); } }
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
thump(T_CARD, 0.1, 50, 0);
[0.7, 0.85, 1.0].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
