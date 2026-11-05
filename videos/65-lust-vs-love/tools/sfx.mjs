// ---- "lust vs love": soft room tone, a paper rustle as the roses are offered + a sweet chime, a big "ACHOO!", sniffles; LOVE: footsteps to the table, vase clink, bowl clink, steps back, little spoon clinks, blanket swoosh, warm chord + bells; LUST: "ew.", the roses drop with a dull thud, footsteps fading out, a lonely low drone; typing for the headline, slams + card ----
const T_OFFER = 0.5, T_ACHOO = 2.2, T_SICK = 2.5, T_GO = 2.8, T_TAB = 3.4, T_PICK = 3.7, T_RET = 4.0, T_AT = 4.8, T_FEED = 4.9, T_BLANK = 6.0, T_HUGT = 6.5, T_HOLD = 6.9;
const T_EW = 2.5, T_DROP = 3.4, T_LEAVE = 3.8, T_GONE = 5.3, T_WAIT = 4.2, T_ALONE = 5.6, T_T1 = 8.6, T_T2 = 9.5, T_CARD = 11.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
noise(T_OFFER, 0.3, 0.025, 0.2, 0.7, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 60)));
[[0, 81], [0.1, 85], [0.2, 88]].forEach(([d, m]) => bell(T_OFFER + 0.4 + d, m, 0.012, 0, 0.6));
tone(T_ACHOO - 0.25, 300, 0.25, 0.02, -0.2, 0.15, 2); noise(T_ACHOO, 0.3, 0.09, -0.2, 0.5, (p) => (1 - p) * (1 - p)); shout(T_ACHOO, 420, 0.2, 0.04, -0.2);
for (let t = T_SICK + 0.6; t < 8.2; t += 1.1) noise(t, 0.15, 0.015, -0.2, 0.6, (p) => Math.sin(Math.PI * p));
for (let t = T_GO; t < T_TAB; t += 0.25) step(t, 0.015, 0.4);
tone(T_TAB + 0.15, 1800, 0.3, 0.015, 0.5, 0.002, 8); tone(T_PICK + 0.1, 1300, 0.3, 0.015, 0.5, 0.002, 8);
for (let t = T_RET; t < T_AT; t += 0.25) step(t, 0.015, 0.2);
for (let k = 0; k < 3; k++) tone(T_FEED + 0.35 + k * 0.71, 2200, 0.12, 0.01, 0, 0.002, 20);
noise(T_BLANK, 0.5, 0.04, 0, 0.4, (p) => Math.sin(Math.PI * p));
shout(T_BLANK + 0.1, 240, 0.4, 0.03, 0.2);
shout(T_EW + 0.1, 220, 0.3, 0.04, 0.3);
noise(T_DROP + 0.4, 0.15, 0.03, 0.3, 0.5, (p) => 1 - p); thump(T_DROP + 0.45, 0.04, 90, 0.3);
for (let t = T_LEAVE; t < T_GONE; t += 0.25) step(t, 0.018 * (1 - (t - T_LEAVE) / (T_GONE - T_LEAVE + 0.3)), 0.6);
shout(T_WAIT + 0.1, 330, 0.4, 0.025, -0.2);
{ const s0 = Math.floor(T_ALONE * SR), n = Math.floor((T_T1 - T_ALONE) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 55 * tt) + 0.3 * Math.sin(2 * Math.PI * 110 * tt)) * 0.02 * e, -0.2); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD - 0.3, T_CARD + 0.5, [57, 61, 64, 69], 0.011);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
typing(T_T1, 24, 30); typing(T_T2, 27, 30);
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.8, 1.0].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
