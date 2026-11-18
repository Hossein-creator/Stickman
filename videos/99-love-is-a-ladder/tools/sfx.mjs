// ---- "love is a ladder": night crickets + room tone, rung creaks per step (top both climbs, bottom her then him), roof steps, ladder scrape + tip creak, crash + rattle + low drop; top warm chord + heart bells; typing; FOLLOW: plug click, bulbs pop on one by one (rising notes), bright chime ----
const T_C1 = 0.5, T_C1E = 2.8, T_S1 = 3.4, T_C2 = 3.9, T_C2E = 6.0, T_S2 = 6.6, T_HUG = 6.9, T_HEART = 7.2, T_AWAY = 3.6, T_BC = 4.1, T_SLIP = 5.6, T_DOWN = 6.3;
const T_H2 = 9.6, T_H3 = 10.8, T_CTA = 13.6, T_PLUG = 16.0;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.07 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
for (let t = 0.3; t < T_CTA; t += 0.9 + 0.3 * Math.abs(Math.sin(t * 3))) for (let k = 0; k < 3; k++) tone(t + k * 0.05, 4400, 0.03, 0.004, 0.6, 0.002, 60);
const creak = (t, pan) => { tone(t, 210 + 40 * Math.sin(t * 7), 0.12, 0.012, pan, 0.01, 18); click(t, 0.012, pan); };
for (let t = T_C1; t < T_C1E; t += 0.33) { creak(t, -0.2); creak(t + 0.02, 0.2); }
for (let t = T_C2; t < T_C2E; t += 0.33) creak(t, -0.2);
for (let t = T_BC; t < T_SLIP; t += 0.33) creak(t, 0.2);
[T_S1, T_S2].forEach((t) => { step(t - 0.2, 0.03, -0.1); step(t + 0.1, 0.03, -0.1); });
for (let t = T_AWAY + 0.2; t < T_AWAY + 1.6; t += 0.45) step(t, 0.02, 0.5);
noise(T_SLIP - 0.1, 0.5, 0.04, 0.2, 0.3, (p) => Math.sin(Math.PI * p)); tone(T_SLIP, 150, 0.6, 0.015, 0.2, 0.05, 3);
sweep(T_SLIP + 0.2, T_DOWN - T_SLIP, 0.05, 0.1, 0.05, 0.4);
thump(T_DOWN, 0.12, 55, 0); noise(T_DOWN, 0.6, 0.06, 0, 0.4, (p) => (1 - p) ** 2);
for (let k = 0; k < 6; k++) wood(T_DOWN + 0.05 + k * 0.06, 0.03, -0.2 + 0.08 * k);
{ const s0 = Math.floor((T_DOWN + 0.3) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HUG - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 27, 30); typing(T_H3, 26, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
click(T_PLUG, 0.07, 0.3); thump(T_PLUG, 0.03, 140, 0.3);
for (let i = 0; i < 9; i++) bell(T_PLUG + i * 0.06, 72 + i * 2, 0.01, -0.4 + i * 0.1, 0.5);
[[0.6, 84], [0.67, 88], [0.74, 91]].forEach(([d, m]) => bell(T_PLUG + d, m, 0.022, 0, 1.4));
chord(T_PLUG + 0.3, DUR, [60, 64, 67, 72], 0.01);
