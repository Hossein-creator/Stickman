// ---- "love is a couch": quiet stairwell room tone; couch lift grunt-thud, heavy steps on wooden stairs (both / him alone), couch scrape on each stair, slip + slide back, he drops to the floor; phone taps; top: set-down thud, sofa squeak when they sit, warm chord + heart bells; low drone after he collapses; typing; FOLLOW: pillow whoosh + soft bounce, tap + bells ----
const T_BEND = 0.3, T_LIFT = 0.9, T_GO = 1.3, T_UP = 5.0, T_DOWN = 5.6, T_SIT = 5.9, T_SAT = 6.5, T_LEAN = 6.9, T_HEART = 7.6, T_BGRAB = 0.8, T_SLIP = 4.4, T_BTOP = 8.0, T_DROP = 8.3, T_H2 = 9.6, T_H3 = 10.8, T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() * 0.5 - lp) * 0.01; add(i, (lp * 0.12 + 0.004 * Math.sin(2 * Math.PI * 60 * t)) * Math.min(1, t / 0.5) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const scrape = (t, d, g, pan) => noise(t, d, g, pan, 0.12, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)));
// top: lift, steps together, set down
noise(T_LIFT - 0.2, 0.3, 0.03, -0.2, 0.2, (p) => Math.sin(Math.PI * p));
for (let t = T_GO + 0.15; t < T_UP; t += 0.48) { wood(t, 0.022, -0.3); wood(t + 0.06, 0.018, 0.1); }
thump(T_DOWN, 0.12, 80, 0.2); wood(T_DOWN + 0.02, 0.03, 0.2);
const squeak = (t, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(0.25 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 520 + 300 * tt / 0.25; add(s0 + i, Math.sin(2 * Math.PI * f * tt) * g * Math.sin(Math.PI * tt / 0.25), pan); } };
squeak(T_SAT - 0.2, 0.012, 0.1); squeak(T_SAT, 0.01, 0.3);
// bottom: he pushes alone, slow heavy steps + scrape per stair
for (let t = T_BGRAB + 0.7; t < T_BTOP; t += 0.6) { if (t > T_SLIP && t < T_SLIP + 1.0) continue; wood(t, 0.026, 0.4); scrape(t + 0.1, 0.35, 0.03, 0.3); }
sweep(T_SLIP, 0.35, 0.05, 0.3, 0.1, 0.5); scrape(T_SLIP + 0.05, 0.35, 0.05, 0.3); thump(T_SLIP + 0.3, 0.1, 70, 0.3);
thump(T_DROP + 0.15, 0.15, 65, 0.1); noise(T_DROP + 0.15, 0.2, 0.04, 0.1, 0.4, (p) => Math.exp(-p * 6));
for (let t = 0.4; t < 12; t += 0.55) click(t, 0.006, 0.5);
{ const s0 = Math.floor((T_DROP + 0.2) * SR), n = Math.floor(3.6 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.032 * e, 0); } }
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_SIT - 0.3, T_CTA + 0.5, [53, 57, 60, 65], 0.01);
[[0, 74], [0.08, 79], [0.16, 83]].forEach(([d, m]) => bell(T_HEART + d, m, 0.022, 0, 1.2));
typing(T_H2, 16, 30); typing(T_H3, 16, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
sweep(T_TAG, 0.8, 0.04, 0.3, 0.1, 0.4); thump(T_TAG + 0.9, 0.06, 110, 0.3);
click(T_TAP, 0.06, 0.2);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.024, 0.2, 1.4));
chord(T_TAP, DUR, [60, 64, 67, 72], 0.011);
