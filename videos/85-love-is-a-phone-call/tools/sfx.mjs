// ---- "love is a phone call": quiet room tone; ring tones (two-tone trill) on each call, pick-up blip + warm hum while they talk, heart chime + chord; bottom: decline buzz, ignored rings, fast ring montage, phone thud on the floor, her ringback that nobody answers, low drop; typing; FOLLOW: call card whoosh, ringtone, tap + bright chime ----
const TOPC = [[0.2, 1.1, 2.8, 0], [3.2, 4.0, 5.6, 1], [6.0, 6.6, 99, 0]], T_HEART = 7.3;
const BOTC = [[0.2, 1.3, "X"], [2.2, 2.9, "X"], [3.8, 5.0, "-"]];
const T_SPAM = 5.0, T_SPAM1 = 6.0, T_DOWN = 6.4, T_DROPPH = 6.9, T_HERCALL = 7.7, T_HRING = 8.1, T_MISSED = 9.7, T_H2 = 9.9, T_H3 = 10.7;
const T_CTA = 12.8, T_CARD = T_CTA + 1.1, T_TAP = T_CARD + 1.7;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const trill = (t0, t1, pan, g) => { for (let t = t0; t < t1; t += 0.5) for (let k = 0; k < 6; k++) { tone(t + k * 0.04, k % 2 ? 1320 : 1760, 0.035, g, pan, 0.002, 60); } };
const ringback = (t0, t1, pan, g) => { for (let t = t0; t < t1; t += 1.2) { tone(t, 440, 0.6, g, pan, 0.01, 2); tone(t, 480, 0.6, g, pan, 0.01, 2); } };
TOPC.forEach(([r, a, h, c]) => { trill(r + 0.25, a, c === 0 ? 0.35 : -0.35, 0.008); tone(a, 1046, 0.08, 0.02, 0, 0.002, 30); tone(a + 0.08, 1568, 0.1, 0.015, 0, 0.002, 30); if (h < 50) tone(h, 784, 0.08, 0.012, 0, 0.002, 40); });
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(1.1, 2.9, [60, 64, 67], 0.005); chord(4.0, 5.7, [62, 65, 69], 0.005); chord(6.6, T_CTA, [57, 61, 64, 69], 0.008);
sweep(T_HEART - 0.3, 0.6, 0.04, 0, 0.05, 0.4); [[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HEART + 0.15 + d, m, 0.02, 0, 1.2));
BOTC.forEach(([r, a, k]) => { trill(r + 0.25, a, 0.4, 0.007); if (k === "X") { tone(a, 220, 0.18, 0.04, 0.4, 0.002, 12); noise(a, 0.1, 0.02, 0.4, 0.3, (p) => 1 - p); } });
trill(T_SPAM, T_SPAM1, 0.4, 0.006); for (let t = T_SPAM; t < T_SPAM1; t += 0.12) click(t, 0.015, -0.3);
tone(T_DOWN, 300, 0.5, 0.01, 0, 0.05, 4);
thump(T_DROPPH + 0.3, 0.06, 140, -0.3); click(T_DROPPH + 0.32, 0.04, -0.3);
ringback(T_HERCALL, T_MISSED, 0.35, 0.006); trill(T_HRING, T_MISSED, -0.35, 0.006);
thump(T_MISSED, 0.1, 42, 0);
{ const s0 = Math.floor(T_MISSED * SR), n = Math.floor(2.8 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.3) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.035 * e, 0); } }
typing(T_H2, 18, 30); typing(T_H3, 24, 30);
sweep(T_CTA - 0.1, 1.1, 0.06, 0, 0.04, 0.4);
tone(T_CARD, 880, 0.12, 0.03, 0, 0.002, 18); trill(T_CARD + 0.4, T_TAP, 0, 0.007);
typing(T_CARD + 0.5, 17, 30); typing(T_CARD + 1.2, 9, 30);
click(T_TAP, 0.08, 0); thump(T_TAP, 0.05, 90, 0);
chord(T_TAP, DUR, [60, 64, 67, 72], 0.01);
[[0, 84], [0.07, 88], [0.14, 91]].forEach(([d, m]) => bell(T_TAP + 0.05 + d, m, 0.022, 0, 1.4));
