// ---- "love is a tent": heavy rain bed + wind, thunder rumbles with the flashes, gust whooshes (panned to the side), fabric flaps, pole creaks; bottom: his splashing running steps; storm ends: rain fades to drips, his heavy breathing; top: lantern + warm chord + heart bells; bubble pop + typing; FOLLOW: zipper rising, pop when the door opens, bright chime ----
const GUSTS = [[1.2, -1], [2.9, 1], [4.6, -1], [6.2, 1], [7.6, -1]], GD = 1.0, T_FLASH = [0.15, 4.3], T_CALM = 8.8;
const T_LETGO = 9.0, T_HUG = 9.9, T_HEART = 10.3, T_KNEE = 9.0, T_DOOR = 9.6, T_ASK = 10.0, T_H2 = 10.7, T_H3 = 11.6;
const T_CTA = 13.4, T_TAG = T_CTA + 1.0, T_ZIP = T_TAG + 0.7, T_OPEN = T_ZIP + 1.0;
const RUNS = GUSTS.map(([a, sd], i) => [a - (i === 4 ? 0.45 : 0.75), sd]);
{ let lp = 0, hp = 0; for (let i = 0; i < N; i++) { const t = i / SR, r = rnd(); lp += (r - lp) * 0.25; hp = r - lp; const k = 1 - smooth(t, T_CALM - 0.4, T_CALM + 1.2); add(i, (hp * 0.05 * k + lp * 0.02 * k) * Math.min(1, t / 0.3), 0.1 * Math.sin(t)); } }
T_FLASH.forEach((t) => { thump(t + 0.1, 0.12, 36, 0); noise(t + 0.05, 1.6, 0.05, 0, 0.15, (p) => Math.exp(-p * 3)); });
GUSTS.forEach(([a, sd]) => { sweep(a - 0.1, GD + 0.4, 0.1, sd * 0.6, 0.03, 0.4); for (let k = 0; k < 6; k++) noise(a + 0.1 + k * 0.13, 0.05, 0.03, sd * 0.5, 0.6, (p) => 1 - p); tone(a + 0.3, 140, 0.4, 0.012, sd * 0.6, 0.05, 5); });
RUNS.forEach(([r0, sd]) => { for (let k = 0; k < 4; k++) { const t = r0 + 0.05 + k * 0.15; step(t, 0.04, 0.3); noise(t, 0.06, 0.025, 0.3, 0.7, (p) => 1 - p); } });
for (let t = T_CALM; t < DUR; t += 0.35 + 0.4 * Math.abs(rnd())) tone(t, 1800 + 600 * rnd(), 0.04, 0.006, (rnd() - 0.5), 0.001, 70);
for (let k = 0; k < 4; k++) noise(T_KNEE + 0.4 + k * 0.6, 0.35, 0.012, 0.3, 0.2, (p) => Math.sin(Math.PI * p));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HEART - 0.3, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
noise(T_DOOR, 0.5, 0.03, 0, 0.8, (p) => Math.sin(Math.PI * p));
tone(T_ASK, 700, 0.08, 0.02, 0, 0.002, 30); typing(T_ASK + 0.1, 21, 34);
thump(T_ASK + 0.8, 0.07, 46, 0);
{ const s0 = Math.floor((T_ASK + 0.8) * SR), n = Math.floor(2.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
typing(T_H2, 24, 30); typing(T_H3, 23, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
tone(T_TAG, 880, 0.12, 0.03, 0, 0.002, 18);
{ const s0 = Math.floor(T_ZIP * SR), n = Math.floor((T_OPEN - T_ZIP) * SR); for (let i = 0; i < n; i++) { const tt = i / SR; add(s0 + i, (rnd() - 0.5) * 0.05 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (60 + 90 * tt) * tt)), 0); } }
click(T_OPEN, 0.08, 0); thump(T_OPEN, 0.05, 90, 0);
[[0, 84], [0.07, 88], [0.14, 91]].forEach(([d, m]) => bell(T_OPEN + 0.05 + d, m, 0.022, 0, 1.4));
chord(T_OPEN, DUR, [60, 64, 67, 72], 0.01);
typing(T_TAG + 0.4, 17, 30); typing(T_TAG + 1.1, 9, 30);
