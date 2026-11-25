// ---- "love is a hot air balloon": dawn field bed (soft wind); sandbag drops (thud); burner roars; wind rises with altitude; top: warm chord + heart bells at sunrise; bottom: shopping bag rustle, burner tries but the basket bumps, he climbs out (creak), burner, balloon rises, low drone; typing; FOLLOW: banner unroll flap, chain pull, big burner roar + chime ----
const T_D1 = 1.2, T_D2 = 1.7, T_D3 = 2.4, T_D4 = 2.9, T_FIRE = 3.3, T_RISE = 3.5, T_HIGH = 6.0, T_LEAN = 5.4, T_HEART = 6.8, T_B1 = 1.2, T_B2 = 2.2, T_SHOP = 3.0, T_TRY = 3.6, T_LOOK = 4.2, T_OUT = 4.8, T_DOWN = 5.8, T_BUP = 6.2, T_GONE = 9.4, T_H2 = 9.6, T_H3 = 11.0, T_CTA = 12.6, T_TAG = 13.1, T_TAP = 14.9;
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; const r = rnd() - 0.5; lp += (r - lp) * 0.03; lp2 += (r - lp2) * 0.004; const w = 0.5 + 0.8 * smooth(t, T_RISE, T_HIGH); add(i, (lp * 0.06 * w + lp2 * 0.2) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const drop = (t, pan, far) => { sweep(t, 0.3, 0.02, pan, 0.1, 0.3); if (!far) thump(t + 0.5, 0.12, 70, pan); };
drop(T_D1, -0.3, 1); drop(T_D2, 0.3, 1); drop(T_D3, -0.3, 1); drop(T_D4, 0.3, 1);
drop(T_B1, 0.3, 0); drop(T_B2, 0.4, 0);
const roar = (t, d, g, pan) => { noise(t, d, g, pan, 0.08, (p) => Math.min(1, p * 12) * Math.min(1, (1 - p) * 4)); noise(t, d, g * 0.3, pan, 0.5, (p) => Math.min(1, p * 12) * Math.min(1, (1 - p) * 4)); };
roar(T_FIRE, 1.8, 0.12, 0); roar(T_TRY, 0.6, 0.1, 0.1); roar(T_BUP, 1.6, 0.1, -0.1);
for (let k = 0; k < 3; k++) noise(T_SHOP + k * 0.15, 0.2, 0.03, -0.4, 0.6, (p) => Math.sin(Math.PI * p));
for (let t = 0.4; t < T_BUP + 2.6; t += 0.6) click(t, 0.006, -0.4);
for (let k = 0; k < 4; k++) wood(T_TRY + 0.05 + k * 0.15, 0.02, 0);
wood(T_OUT + 0.2, 0.04, 0.4); wood(T_OUT + 0.55, 0.03, 0.4); step(T_DOWN, 0.03, 0.4);
{ const s0 = Math.floor((T_BUP + 0.6) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_RISE + 0.5, T_CTA + 0.5, [57, 61, 64, 69], 0.009);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + d, m, 0.02, 0, 1.2));
typing(T_H2, 33, 30); typing(T_H3, 22, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
noise(T_TAG, 0.5, 0.04, 0, 0.4, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)));
click(T_TAP - 0.1, 0.05, -0.1); roar(T_TAP, 1.0, 0.12, 0);
[[0.2, 84], [0.27, 88], [0.34, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, 0, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
