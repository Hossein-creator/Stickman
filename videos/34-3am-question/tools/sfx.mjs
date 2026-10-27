// ---- "3 am question": night hum, clock flips, a poke, her "hm?" chirps, sleepy grunts, lamp click, a pillow whoosh + THWUMP in slow motion, heartbeat stare, a warm hug chord, snoring ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[6.0, 7.0]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_POKE = 0.8, T_W1 = 1.05, T_ASK1 = 1.3, T_UP1 = 1.8, T_DOWN1 = 2.45;
const T_CLK2 = 2.9, T_LAMP = 3.25, T_W2 = 3.4, T_ASK2 = 3.7, T_UP2 = 4.2, T_DOWN2 = 4.8, T_OFF = 5.05;
const T_CLK3 = 5.35, T_PICK = 5.6, T_THROW = 5.95, T_HIT = 6.2, T_SIT = 6.45, T_TURN = 6.9, T_ARMS = 7.75, T_CRAWL = 8.0, T_HUG = 8.4, T_LIE = 8.9, T_CLK4 = 9.4;
const rHit = realOf(T_HIT), rHug = realOf(T_HUG);

// quiet night bed: a little music-box feel; empties for the stare; warm after the hug
bed([[0, [50, 57, 62]], [realOf(T_CLK2), [48, 55, 60]], [realOf(T_CLK3), [46, 53, 58]], [rHit, [41, 48]], [rHug, [50, 57, 62, 66]], [realOf(10.4), [55, 59, 62, 67]]], 10.6, 50);
const music = [[0.2, 74], [0.6, 79], [1.0, 78], [1.4, 74], [3.0, 72], [3.4, 77], [3.8, 76], [4.2, 72], [5.4, 70], [5.7, 74]];
music.forEach(([s, m]) => bell(realOf(s), m, 0.012, 0.2, 2.2));
// clock flips
[T_CLK2, T_CLK3, T_CLK4].forEach((c) => { click(realOf(c), 0.06, 0); click(realOf(c) + 0.04, 0.04, 0); tone(realOf(c), 1500, 0.06, 0.015, 0, 0.001, 40); });
// snores while he sleeps
const snore = (t) => { const s0 = Math.floor(t * SR), n = Math.floor(0.6 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.04; add(s0 + i, (lp * 0.25 + Math.sin(2 * Math.PI * 70 * i / SR) * 0.3) * Math.sin(Math.PI * p) * 0.06 * (0.6 + 0.4 * Math.sin(i / SR * 60)), -0.3); } };
[0.1, 2.75, 5.15, 9.6, 10.7, 11.8].forEach((s) => snore(realOf(s)));
// poke
click(realOf(T_POKE), 0.05, -0.1); thump(realOf(T_POKE), 0.05, 90, -0.1);
// her "hm?" questions: little rising chirps
const hm = (t, m, n) => { for (let k = 0; k < n; k++) { const s0 = Math.floor((t + k * 0.16) * SR), len = Math.floor(0.13 * SR); for (let i = 0; i < len; i++) { const p = i / len, f = hz(m + 4 * p + k); add(s0 + i, Math.sin(2 * Math.PI * f * i / SR) * Math.sin(Math.PI * p) * 0.03, 0.3); } } };
hm(realOf(T_ASK1), 74, 1); hm(realOf(T_ASK2), 76, 2); hm(realOf(T_TURN + 0.25), 78, 3);
// his sleepy grunts + heart pop
const grunt = (t) => { tone(t, 120, 0.2, 0.04, -0.3, 0.02, 8); tone(t + 0.02, 180, 0.15, 0.015, -0.3, 0.02, 10); };
[T_W1, T_W2].forEach((s) => grunt(realOf(s)));
[T_UP1 + 0.15, T_UP2 + 0.15].forEach((s) => { tone(realOf(s), hz(84), 0.2, 0.025, -0.2, 0.003, 12); tone(realOf(s) + 0.07, hz(88), 0.2, 0.02, -0.2, 0.003, 12); });
// lamp on / off
[T_LAMP, T_OFF].forEach((s) => { click(realOf(s), 0.08, 0.6); tone(realOf(s), 2400, 0.03, 0.02, 0.6, 0.001, 80); });
noise(realOf(T_LAMP), realOf(T_OFF) - realOf(T_LAMP), 0.01, 0.6, 0.9, (p) => 1);
// pillow: wind-up, whoosh, THWUMP (slow motion)
sweep(realOf(T_THROW) - 0.05, rHit - realOf(T_THROW) + 0.05, 0.08, 0, 0.02, 0.3);
thump(rHit, 0.32, 55, -0.3); noise(rHit, 0.4, 0.12, -0.3, 0.12, (p) => Math.exp(-p * 5));
tone(rHit, hz(36), 1.4, 0.04, 0, 0.03, 1.6);
// the stare: heartbeat in silence
[6.95, 7.3].forEach((s) => { thump(realOf(s), 0.12, 48, 0); thump(realOf(s) + 0.16, 0.08, 44, 0); });
// arms open, she crawls in: blanket rustle and a warm chord
noise(realOf(T_CRAWL), 0.45, 0.04, 0.1, 0.25, (p) => Math.sin(Math.PI * p));
[[0, 69], [0.06, 74], [0.12, 78], [0.2, 81]].forEach(([d, m]) => bell(rHug + d, m, 0.025, 0, 1.4));
noise(realOf(T_LIE + 0.2), 0.5, 0.04, 0, 0.2, (p) => Math.sin(Math.PI * p));
// last lines
[10.9, 11.03, 11.14, 11.26, 11.4].forEach((t, i) => thump(t, i === 4 ? 0.09 : 0.05, i === 4 ? 52 : 70, 0));
[12.1, 12.25, 12.4, 12.6].forEach((t, i) => { thump(t, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.6, 76, 0.02, 0, 1.2); bell(12.65, 83, 0.015, 0, 1.2);
