// ---- "the gap": angry muffled fight, the crack, stone grinding while they walk away, silence, heartbeat, leap, catch, slam ----
const SLOW0 = 6.45, SLOW1 = 7.95, SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => 1 - (1 - SLOWK) * wn(t, SLOW0, SLOW0 + 0.1) * (1 - wn(t, SLOW1 - 0.3, SLOW1));
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const tCrack = realOf(1.55), tJump = realOf(6.5), tCatch = realOf(6.85), tSlam = realOf(8.95);

bed([[0, [45, 52, 56]], [tCrack, [41, 48, 53]], [4.6, [43, 50, 55, 58]], [5.6, [45, 52, 57]], [tCatch, [47, 54, 59, 62]], [tSlam, [50, 57, 62, 66, 69]], [11.4, [50, 57, 62, 66]]], 99, 40);
// the fight: muffled angry "voices" (square-ish blips, no words), one per burst
const yell = (t, m, pan) => { const s0 = Math.floor(t * SR); let lp = 0; for (let i = 0; i < SR * 0.26; i++) { const tt = i / SR, f = hz(m) * (1 + 0.15 * Math.sin(tt * 40)); const v = Math.sign(Math.sin(2 * Math.PI * f * tt)) * Math.sin(Math.PI * tt / 0.26); lp += (v - lp) * 0.08; add(s0 + i, lp * 0.05, pan); } };
[[0.12, 64, -0.3], [0.42, 52, 0.3], [0.7, 66, -0.3], [0.95, 50, 0.3], [1.2, 67, -0.3], [1.4, 49, 0.3]].forEach(([t, m, p]) => { yell(t, m, p); yell(t + 0.12, m + 2, p); thump(t, 0.05, 70, p); });
// the crack: snap + rumble, then stone grinding while the gap grows
noise(tCrack, 0.06, 0.16, 0, 0.9, (p) => 1 - p); thump(tCrack, 0.2, 38, 0); noise(tCrack, 1.2, 0.1, 0, 0.06, (p) => Math.exp(-p * 3));
{ const s0 = Math.floor((tCrack + 0.2) * SR), n = Math.floor(2.9 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.03; add(s0 + i, lp * 0.07 * Math.sin(Math.PI * p) * (0.7 + 0.3 * Math.sin(i / SR * 37)), 0); } }
for (let i = 0; i < 10; i++) click(tCrack + 0.1 + i * 0.14, 0.03, 0.3 * rnd()); // pebbles
// walking away: slow steps on both sides
for (const t of [1.9, 2.5, 3.1]) { step(t, 0.05, -0.4); step(t + 0.1, 0.05, 0.4); }
for (const t of [3.8, 4.4]) step(t, 0.05, 0.5);
// she turns: near silence, one heartbeat; he turns: heartbeat again
thump(4.75, 0.08, 46, -0.3); thump(4.95, 0.06, 42, -0.3);
thump(5.35, 0.09, 46, 0.3); thump(5.55, 0.07, 42, 0.3);
// the sprint
for (let i = 0; i < 6; i++) step(5.65 + i * 0.15, 0.08, 0.3 - i * 0.05);
sweep(5.6, 0.9, 0.06, 0, 0.05, 0.4);
// leap (slow motion): low whoosh, he slams into the edge, she grabs him
sweep(tJump, 0.9, 0.08, 0, 0.02, 0.2);
tone(tJump, hz(36), 2.0, 0.06, 0, 0.2, 1.0);
thump(tCatch, 0.16, 54, -0.1); noise(tCatch, 0.15, 0.06, -0.1, 0.4, (p) => 1 - p);
for (let i = 0; i < 6; i++) click(tCatch + 0.05 + i * 0.1, 0.03, -0.1);
thump(tCatch + 0.5, 0.1, 46, 0); thump(tCatch + 0.75, 0.08, 42, 0);
// the pull: straining stone scrape
{ const s0 = Math.floor((tCatch + 0.4) * SR), n = Math.floor(1.6 * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.08; add(s0 + i, lp * 0.03 * Math.sin(Math.PI * p), -0.1); } }
// the ground slams shut, gold seam rings
thump(tSlam, 0.3, 36, 0); thump(tSlam + 0.04, 0.16, 30, 0);
noise(tSlam, 1.6, 0.13, 0, 0.1, (p) => Math.exp(-p * 3));
[64, 69, 73, 76, 81].forEach((m, i) => bell(tSlam + 0.2 + i * 0.13, m, 0.035, 0, 1.0));
// last line
[11.5, 11.68, 11.9].forEach((t, i) => thump(t, i === 2 ? 0.13 : 0.06, i === 2 ? 50 : 70, 0));
[12.4, 12.55, 12.7, 12.9].forEach((t) => { thump(t, 0.06, 70, 0); click(t, 0.05, 0); });
