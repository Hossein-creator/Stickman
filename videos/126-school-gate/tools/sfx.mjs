// ---- "school gate": phone scene = message pop + typing dots + reply pop over a soft pad; cut whoosh; afternoon street (birds, far traffic); school bell rings; gate rattles open; chatter of students + steps; friend gasp-like blip; her phone drops; running steps; hug: warm chord swell + heart bells; typing; FOLLOW: card flick + tap + chime ----
const T_MSG1 = 0.5, T_TYP = 1.1, T_MSG2 = 1.8, T_CUT = 3.2, T_POCKET = 4.0, T_ROSES = 4.6, T_BELL = 5.8, T_GATE = 6.3, T_OUT = 7.6, T_STOP = 9.0, T_POINT = 8.9, T_UP = 9.4, T_DROP = 9.8, T_RUN = 10.0, T_HUG = 10.8, T_HEART = 11.3, T_L2 = 12.6, T_L3 = 13.8, T_CTA = 15.2, T_CARD = 15.5, T_TAP = 16.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * smooth(t, T_CUT - 0.2, T_CUT + 0.3) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(0.1, T_CUT + 0.3, [57, 60, 64], 0.008);
const pop = (t, f, g) => { tone(t, f, 0.12, g, 0, 0.001, 30); tone(t + 0.05, f * 1.5, 0.12, g * 0.7, 0, 0.001, 30); };
pop(T_MSG1, 880, 0.03); for (let t = T_TYP; t < T_MSG2 - 0.1; t += 0.17) click(t, 0.008, 0); pop(T_MSG2, 660, 0.03);
sweep(T_CUT - 0.3, 0.5, 0.06, 0, 0.05, 0.5);
for (let t = T_CUT + 0.4; t < DUR - 1; t += 1.3 + 0.4 * Math.sin(t)) { const f = 3200 + 600 * Math.sin(t * 3); tone(t, f, 0.08, 0.006, 0.5, 0.002, 40); tone(t + 0.1, f * 1.1, 0.08, 0.005, 0.5, 0.002, 40); }
for (let k = 0; k < 14; k++) tone(T_BELL + k * 0.07, 1400 + (k % 2) * 90, 0.12, 0.022, -0.3, 0.001, 18);
for (let k = 0; k < 6; k++) noise(T_GATE + k * 0.1, 0.06, 0.03, -0.3, 0.6, (p) => Math.exp(-p * 6)); wood(T_GATE + 0.6, 0.03, -0.3);
noise(T_GATE + 0.3, 4.0, 0.025, -0.2, 0.35, (p) => Math.min(1, p * 4) * (1 - p) * (0.6 + 0.4 * Math.sin(p * 60)));
for (let t = 6.6; t < 11; t += 0.3) step(t, 0.008, -0.3 + 0.1 * Math.sin(t * 5));
for (let t = T_OUT; t < T_DROP; t += 0.5) click(t, 0.005, -0.2);
tone(T_POINT, 700, 0.2, 0.015, -0.2, 0.01, 10); tone(T_POINT + 0.12, 940, 0.2, 0.012, -0.2, 0.01, 10);
sweep(T_UP, 0.3, 0.03, 0, 0.2, 0.5);
click(T_DROP + 0.45, 0.04, -0.1); click(T_DROP + 0.52, 0.02, -0.1);
for (let t = T_RUN + 0.05; t < T_HUG; t += 0.2) step(t, 0.02, 0.1);
thump(T_HUG, 0.08, 80, 0.2); noise(T_HUG, 0.3, 0.03, 0.2, 0.3, (p) => Math.sin(Math.PI * p));
chord(T_HUG - 0.2, T_CTA + 0.6, [60, 64, 67, 71], 0.011);
[[0, 76], [0.08, 81], [0.16, 84], [0.4, 88]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0.2, 1.3));
typing(T_L2, 16, 26); typing(T_L3, 16, 26);
sweep(T_CTA - 0.1, 1.0, 0.05, 0, 0.04, 0.4);
noise(T_CARD, 0.12, 0.03, 0.2, 0.6, (p) => Math.sin(Math.PI * p));
click(T_TAP, 0.06, 0.2); noise(T_TAP + 0.05, 0.15, 0.03, 0.2, 0.6, (p) => Math.sin(Math.PI * p));
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.024, 0.2, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.011);
