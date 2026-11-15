// ---- "love is a lifeboat": rain + sea bed (top calms down), leak gurgle, bucket scoop + splash per bail (top both, bottom slows and stops), his breathing, low drone as the water rises, dawn chord + heart bells, typing; FOLLOW: two flare whooshes + crackle bursts, bright chime ----
const T_GO = 0.3, T_REST = 8.5, T_HEART = 9.3, T_TIRED = 4.5, T_STOP = 8.0, T_LOOK = 9.2, T_H2 = 10.0, T_H3 = 11.2;
const T_CTA = 13.6, T_F1 = T_CTA + 1.3, T_B1 = T_F1 + 0.6, T_F2 = T_B1 + 1.2, T_B2 = T_F2 + 0.55;
const lerpS = (a, b, p) => a + (b - a) * p;
const rateTop = (t) => (t < T_GO || t > T_REST ? 0 : 1.0);
const rateBot = (t) => (t < T_GO || t > T_STOP ? 0 : t < T_TIRED ? 1.0 : lerpS(1.0, 0.55, (t - T_TIRED) / (T_STOP - T_TIRED)));
function splashes(rate, off) { const out = []; let ph = off; const st = 1 / 240; for (let t = 0; t < DUR; t += st) { const n = ph + rate(t) * st; if (Math.floor(n - 0.7) > Math.floor(ph - 0.7)) out.push(t); if (Math.floor(n - 0.3) > Math.floor(ph - 0.3)) out.push(-t); ph = n; } return out; }
// rain + sea
{ let a = 0, b = 0; for (let i = 0; i < N; i++) { const t = i / SR; a += (rnd() - a) * 0.5; b += (rnd() - b) * 0.004; const fadeIn = Math.min(1, t / 0.5), out = 1 - smooth(t, DUR - 0.8, DUR); const rain = 0.03 * (1 - 0.6 * smooth(t, 6, 9) * (t < T_CTA ? 0.5 : 1)); const swell = 0.5 + 0.5 * Math.sin(t * 1.6); add(i, (a * rain + b * 0.5 * (0.6 + 0.4 * swell)) * fadeIn * out, 0); } }
// leak gurgle
for (let t = 0.4; t < 12.5; t += 0.23 + 0.1 * Math.abs(Math.sin(t * 7))) tone(t, 380 + 260 * Math.abs(Math.sin(t * 13)), 0.05, 0.006, 0.2, 0.004, 50);
const scoop = (t, pan, g) => noise(t, 0.18, g * 0.6, pan, 0.05, (p) => Math.sin(Math.PI * p));
const splash = (t, pan, g) => { noise(t, 0.35, g, pan, 0.35, (p) => (1 - p) ** 2); noise(t + 0.25, 0.25, g * 0.5, pan * 1.2, 0.25, (p) => Math.sin(Math.PI * p)); };
for (const s of splashes(rateTop, 0.5)) s > 0 ? splash(s, -0.45, 0.05) : scoop(-s, -0.3, 0.04);
for (const s of splashes(rateTop, 0)) s > 0 ? splash(s, -0.2, 0.05) : scoop(-s, -0.1, 0.04);
for (const s of splashes(rateBot, 0)) s > 0 ? splash(s, 0.4, 0.05) : scoop(-s, 0.3, 0.04);
for (let k = 0; k < 8; k++) noise(T_TIRED + 0.2 + k * 0.5, 0.32, 0.014, 0.35, 0.25, (p) => Math.sin(Math.PI * p));
{ const s0 = Math.floor(T_STOP * SR), n = Math.floor(5.0 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 46 * tt) + 0.3 * Math.sin(2 * Math.PI * 92 * tt)) * 0.03 * e, 0.3); } }
thump(T_STOP + 0.3, 0.06, 50, 0.3);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HEART - 0.6, T_CTA + 0.6, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
bell(T_LOOK + 0.1, 52, 0.02, 0.3, 1.5);
typing(T_H2, 27, 30); typing(T_H3, 23, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
const flare = (tf, tb) => { thump(tf, 0.06, 140, 0); sweep(tf, tb - tf + 0.1, 0.07, 0, 0.1, 0.7); thump(tb, 0.08, 70, 0); for (let k = 0; k < 14; k++) click(tb + 0.05 + k * 0.05 + 0.03 * Math.sin(k * 3), 0.02 + 0.01 * (k % 3), (k % 5) / 5 - 0.4); };
flare(T_F1, T_B1); flare(T_F2, T_B2);
[[0.05, 79], [0.12, 84], [0.19, 88]].forEach(([d, m]) => bell(T_B1 + d, m, 0.016, 0, 1.0));
click(T_B2, 0.06, 0);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_B2 + d, m, 0.022, 0, 1.4));
chord(T_B2, DUR, [60, 64, 67, 72], 0.01);
