// ---- "next patient": clinic hum + monitor beeps; pen scribbles; "next patient" door click + open; heavy boots + duffel bag thud; stethoscope tap + a heartbeat that speeds up; reveal: whoosh + hit, clipboard clatter, gasp-like swell; hug: warm chord + heart bells + soft cheer-like swell; typing; FOLLOW: lightbox flicker on (buzz), tap + bright chime ----
const T_CALL = 0.6, T_DOOR = 1.3, T_SIT = 3.0, T_ASK = 3.3, T_WALK = 3.3, T_ATB = 4.2, T_SAY = 4.4, T_STETH = 5.2, T_REVEAL = 6.6, T_DROP = 6.8, T_YOU = 7.0, T_UP = 7.6, T_HUG = 8.0, T_LIFT = 8.3, T_L2 = 10.8, T_L3 = 11.8, T_CTA = 14.0, T_BOX = 14.4, T_TAP = 15.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, (lp * 0.05 + Math.sin(2 * Math.PI * 120 * t) * 0.002) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = 0.5; t < T_STETH; t += 1.0) tone(t, 988, 0.08, 0.006, 0.4, 0.002, 30);
noise(0.2, 0.6, 0.015, 0.4, 0.6, (p) => 0.5 + 0.5 * Math.sin(p * 50));
click(T_DOOR - 0.1, 0.05, -0.6); thump(T_DOOR, 0.04, 80, -0.6);
for (let t = T_DOOR + 0.15; t < T_SIT - 0.3; t += 0.45) { step(t, 0.04, -0.3); thump(t, 0.02, 60, -0.3); }
thump(T_SIT - 0.2, 0.06, 70, -0.1); noise(T_SIT - 0.2, 0.2, 0.03, -0.1, 0.2, (p) => Math.exp(-p * 5));
for (let t = T_WALK + 0.1; t < T_ATB; t += 0.4) step(t, 0.02, 0.3);
click(T_STETH, 0.03, 0);
{ let ph = 0, last = 0; for (let t = T_STETH; t < T_REVEAL; t += 1 / 120) { ph += (1.2 + 1.6 * smooth(t, T_STETH, T_REVEAL)) / 120; if (Math.floor(ph) > last) { last = Math.floor(ph); thump(t, 0.05, 55, 0); thump(t + 0.12, 0.03, 50, 0); } } }
sweep(T_REVEAL - 0.2, 0.4, 0.06, 0, 0.05, 0.5); thump(T_REVEAL, 0.09, 50, 0); noise(T_REVEAL, 0.15, 0.05, 0, 0.8, (p) => Math.exp(-p * 6));
wood(T_DROP + 0.4, 0.05, 0.3); click(T_DROP + 0.42, 0.03, 0.3);
noise(T_YOU, 0.5, 0.025, 0, 0.4, (p) => Math.sin(Math.PI * p));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_YOU, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HUG + d, m, 0.02, 0, 1.2));
sweep(T_LIFT, 1.2, 0.025, 0, 0.05, 0.3);
typing(T_L2, 20, 26); typing(T_L3, 33, 26);
{ const s0 = Math.floor(T_BOX * SR), n = Math.floor(0.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, Math.sign(Math.sin(2 * Math.PI * 100 * tt)) * 0.006 * (Math.sin(tt * 60) > 0 ? 1 : 0.3), 0.2); } }
click(T_TAP, 0.06, 0.2);
for (let k = 0; k < 10; k++) tone(T_TAP + 0.1 + k * 0.05, 2400 + 300 * (k % 4), 0.06, 0.006, (k % 5) / 5 - 0.4, 0.001, 40);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
