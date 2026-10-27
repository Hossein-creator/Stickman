// ---- "bridge for two": wind bed, a wooden knock for every plank (both panels), a warm swelling chord on "hold on", a low drop on "alone", typing clicks for the last lines ----
const TL0 = 0.35, TR0 = 0.6, TP = 1.0, TB0 = 0.55, TBP = 1.243, TBN = 7;
const T_MEET = 7.0, T_HOLD = 7.95, T_FAR = 9.3, T_ALONE = 10.4, T_DROP = 11.0;
// wind / room tone
{ let lp = 0, lp2 = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.02; lp2 += (lp - lp2) * 0.3; add(i, lp2 * 0.5 * (0.8 + 0.2 * Math.sin(t * 0.7)) * Math.min(1, t / 0.8), Math.sin(t * 0.3) * 0.3); } }
// plank knocks: two hits per plank (lay it, tap it)
const knock = (t, g, pan) => { wood(t, g, pan); wood(t + 0.12, g * 0.6, pan); };
for (let i = 0; i < 6; i++) { knock(TL0 + i * TP + 0.3 * TP, 0.07, -0.4); knock(TR0 + i * TP + 0.3 * TP, 0.07, 0.4); }
for (let i = 0; i < TBN; i++) knock(TB0 + i * TBP + 0.3 * TBP, 0.045, 0.3);
// steps on the planks
for (let i = 0; i < 6; i++) { for (const [t0, pan] of [[TL0, -0.4], [TR0, 0.4]]) { step(t0 + i * TP + 0.72, 0.03, pan); step(t0 + i * TP + 0.86, 0.03, pan); } }
// they meet: soft whoosh; hold on: warm chord swells and stays
sweep(T_MEET - 0.1, 0.5, 0.03, 0, 0.02, 0.15);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, 11.6, [57, 61, 64, 69], 0.012);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// too far: a small rising tension tone; alone: low drop that hangs to the end
chord(T_FAR, T_ALONE + 0.2, [52, 59], 0.006);
thump(T_ALONE + 0.6, 0.12, 40, 0.3);
{ const s0 = Math.floor((T_ALONE + 1.2) * SR), n = Math.floor((DUR - T_ALONE - 1.2) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.5); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.05 * e, 0); } }
// typing the last two lines
typing(10.8, 22, 30); typing(11.55, 17, 30);
