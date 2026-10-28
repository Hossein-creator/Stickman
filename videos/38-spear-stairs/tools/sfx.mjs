// ---- "spear stairs": war drums + a jeering crowd, spear whooshes and THUNKs into rock, jumps and landings, slow-motion boom on top. Then the crowd goes quiet: only wind, one dropped spear, a heartbeat ----
const SLOWS = [[9.95, 10.95]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const JP = [[1.3, 1.85, 0], [2.75, 3.2, 0], [4.05, 4.5, 0], [5.35, 5.85, 1], [7.3, 7.75, 0], [8.7, 9.15, 0], [10.0, 10.55, 1]];
const HITS = [2.35, 3.65, 4.95, 6.62, 6.76, 6.9, 8.3];
const T_QUIET = 11.75, T_DROP = 12.35;
const rTop = realOf(JP[6][1]), rQuiet = realOf(T_QUIET);

// wind the whole time (louder when everything else stops)
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.006; add(i, lp * (0.12 + 0.1 * smooth(t, rQuiet, rQuiet + 1) - 0.12 * smooth(t, DUR - 0.8, DUR)) * (0.7 + 0.3 * Math.sin(t * 0.7)), Math.sin(t * 0.3) * 0.4); } }
// tense low pad until the top, then gone
bed([[0, [38, 45, 50]], [realOf(4.95), [37, 44, 49]], [realOf(8.3), [36, 43, 48]], [rTop, [31]]], realOf(T_QUIET) - 0.6, 41);
// war drums: two hits per beat, stop dead when he lands on top
for (let s = 0.1; s < JP[6][0]; s += 0.5) { const t = realOf(s); thump(t, 0.13, 52, -0.5); thump(t + 0.12, 0.07, 60, -0.5); }
// the crowd: jeers and "ha ha" bursts (left side), stop at the quiet
function laugh(t, f0, n, gain, pan) {
  for (let k = 0; k < n; k++) {
    const s0 = Math.floor((t + k * 0.13) * SR), len = Math.floor(0.09 * SR);
    let lp = 0;
    for (let i = 0; i < len; i++) { const p = i / len, f = f0 * (1 - 0.15 * p); lp += (rnd() - lp) * 0.3; add(s0 + i, (Math.sin(2 * Math.PI * f * i / SR) * 0.6 + Math.sin(2 * Math.PI * f * 2.1 * i / SR) * 0.3 + lp * 0.4) * Math.sin(Math.PI * p) * gain, pan); }
  }
}
const jeers = [0.15, 0.55, 0.9, 1.5, 2.0, 2.6, 3.3, 3.9, 4.6, 5.2, 6.0, 6.3, 6.6, 7.4, 8.0, 8.9, 9.5];
jeers.forEach((s, i) => laugh(realOf(s), 170 + (i * 37) % 90, 3 + (i % 3), 0.035, -0.5 + (i % 3) * 0.15));
noise(0, rQuiet, 0.03, -0.4, 0.05, (p) => Math.min(1, p * 20) * (p > 0.97 ? (1 - p) / 0.03 : 1));
// spears: throw grunt, whoosh, THUNK into rock, a twang
HITS.forEach((h) => {
  const r = realOf(h - 0.4), t = realOf(h);
  tone(r - 0.05, 140, 0.15, 0.03, -0.5, 0.01, 10);
  sweep(r, t - r, 0.09, 0.2, 0.03, 0.45);
  thump(t, 0.22, 85, 0.4); wood(t, 0.12, 0.4); noise(t, 0.05, 0.12, 0.4, 0.7, (p) => 1 - p);
  tone(t + 0.01, 230, 0.6, 0.03, 0.4, 0.002, 6);
});
// jumps + landings
JP.forEach(([a, b, flip], i) => {
  sweep(realOf(a), realOf(b) - realOf(a), flip ? 0.08 : 0.05, 0.2, 0.02, flip ? 0.5 : 0.3);
  if (i < 6) { step(realOf(b), 0.12, 0.3); tone(realOf(b), 200, 0.3, 0.025, 0.3, 0.002, 9); }
});
// on top: slow-motion boom, then the crowd goes silent
thump(rTop, 0.35, 42, 0); tone(rTop, hz(31), 2.0, 0.05, 0, 0.03, 1.2); noise(rTop, 0.5, 0.1, 0, 0.12, (p) => Math.exp(-p * 5));
bell(rTop + 0.3, 69, 0.02, 0.3, 0.9);
// silence... one spear drops and clatters, a heartbeat
const rd = realOf(T_DROP + 0.42);
[0, 0.07, 0.16].forEach((d, i) => { wood(rd + d, 0.09 / (i + 1), -0.4); noise(rd + d, 0.03, 0.05 / (i + 1), -0.4, 0.8, (p) => 1 - p); });
[realOf(12.0), realOf(12.0) + 0.9].forEach((t) => { thump(t, 0.12, 46, 0); thump(t + 0.17, 0.08, 42, 0); });
// last lines
[13.75, 13.9, 14.05].forEach((t, i) => thump(t, i === 2 ? 0.09 : 0.05, i === 2 ? 52 : 70, 0));
[14.65, 14.8, 15.0].forEach((t, i) => { thump(t, i === 2 ? 0.12 : 0.05, i === 2 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(15.0, 74, 0.02, 0, 1.2); bell(15.05, 81, 0.015, 0, 1.2);
