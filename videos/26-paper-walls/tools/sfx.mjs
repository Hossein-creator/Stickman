// ---- "paper walls" TEST: driving beat while he runs, a hit on every wall, tension drop, riser, slow-mo boom ----
// mirrors the time warp + path in body.js
const SLOW0 = 9.78, SLOW1 = 10.75;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => 1 - 0.76 * wn(t, SLOW0, SLOW0 + 0.1) * (1 - wn(t, SLOW1 - 0.3, SLOW1));
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const V = 800, STRIDE = 230, D_STOP = 0.7625, X_STOP = 3720 + V * D_STOP - 0.5 * (V / D_STOP) * D_STOP * D_STOP;
const X_BACK = X_STOP - STRIDE / 2, A2 = (2 * (4130 - X_BACK)) / (0.95 * 0.95);
function xOf(s) {
  if (s < 0.95) return 0;
  if (s < 1.35) return (V * (s - 0.95) ** 2) / 0.8;
  if (s < 5.8) return 160 + V * (s - 1.35);
  if (s < 5.8 + D_STOP) { const u = s - 5.8; return 3720 + V * u - 0.5 * (V / D_STOP) * u * u; }
  if (s < 8.0) return X_STOP;
  if (s < 8.6) return X_STOP + (X_BACK - X_STOP) * ez((s - 8.0) / 0.6);
  if (s < 9.55) return X_BACK + 0.5 * A2 * (s - 8.6) ** 2;
  return 4130;
}
const IMPACT = [900, 1900, 2800, 3600].map((x) => 1.35 + (x - 200) / V).concat([realOf(9.9)]);
const T_LAND = realOf(10.35);

// ---- music: dark pad + 150 bpm drive while running ----
bed([[0, [45, 52, 57]], [1.0, [45, 52, 57, 60]], [5.8, [41, 48, 53]], [8.0, [43, 50, 55, 58]], [IMPACT[4], [50, 57, 62, 66, 69]], [11.2, [50, 57, 62, 66]]], 99, 41);
const BEAT = 60 / 150;
for (let t = 1.0; t < 5.75; t += BEAT) {
  thump(t, 0.13, 50, 0);
  tone(t + BEAT / 2, hz(33), 0.18, 0.06, 0, 0.005, 10);
  noise(t + BEAT / 2, 0.03, 0.04, 0.2, 0.9, (p) => 1 - p); // hat
}
// hook: three word slams + the start
[0.15, 0.4, 0.65].forEach((t, i) => { thump(t, 0.11, 55 + i * 6, 0); noise(t, 0.08, 0.06, 0, 0.6, (p) => 1 - p); });
sweep(0.75, 0.3, 0.08, 0, 0.05, 0.6);
// footsteps from the path (story -> real)
{
  let last = 0;
  for (let i = 0; i < TS.length; i++) {
    const t = i * TSTEP, s = TS[i];
    if (s > 9.55) break;
    const n = Math.floor(xOf(s) / (STRIDE / 2));
    if (n !== last) { step(t, 0.07, 0); noise(t, 0.04, 0.03, 0, 0.4, (p) => 1 - p); last = n; }
  }
}
// wall smashes 1-4: boom + crash + debris
const smash = (t, g) => { thump(t, g, 46, 0); noise(t, 0.6, g * 0.9, 0, 0.5, (p) => Math.exp(-p * 6)); noise(t, 0.25, g * 0.7, 0, 0.12, (p) => Math.exp(-p * 4)); for (let i = 0; i < 9; i++) click(t + 0.08 + i * 0.05 + 0.03 * rnd(), g * 0.25, 0.5 * rnd()); };
IMPACT.slice(0, 4).forEach((t, i) => { sweep(t - 0.22, 0.24, 0.06, 0, 0.1, 0.6); smash(t, 0.14 + i * 0.02); });
// he stops and looks up: heartbeat, the giant wall
for (let i = 0; i < 5; i++) { thump(6.7 + i * 0.32, 0.08, 46, 0); thump(6.86 + i * 0.32, 0.06, 42, 0); }
tone(6.6, hz(29), 1.6, 0.06, 0, 0.3, 1.2);
// back up + run: riser and double-time drums
for (let t = 8.6; t < 9.7; t += BEAT / 2) thump(t, 0.07 + 0.06 * ((t - 8.6) / 1.1), 52, 0);
{
  const s0 = Math.floor(8.0 * SR), n = Math.floor(1.75 * SR);
  let lp = 0;
  for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * (0.02 + 0.5 * p * p); add(s0 + i, lp * p * p * 0.11, 0); add(s0 + i, Math.sin(2 * Math.PI * (200 + 900 * p * p) * (i / SR)) * p * 0.02, 0); }
}
// the last impact in slow motion: huge boom, long tail, paper fluttering
const tI = IMPACT[4];
thump(tI, 0.3, 36, 0); thump(tI + 0.05, 0.18, 30, 0);
noise(tI, 2.2, 0.16, 0, 0.08, (p) => Math.exp(-p * 2.5));
noise(tI, 0.1, 0.1, 0, 0.9, (p) => 1 - p);
for (let i = 0; i < 26; i++) noise(tI + 0.3 + i * 0.09 + 0.05 * rnd(), 0.12, 0.018, 0.6 * rnd(), 0.35, (p) => Math.sin(Math.PI * p));
thump(T_LAND, 0.1, 60, 0);
[62, 69, 74, 78].forEach((m, i) => bell(tI + 0.4 + i * 0.15, m, 0.04, 0));
// punchline word slams
[11.2, 11.38, 11.56, 11.8, 12.3, 12.42, 12.54, 12.66].forEach((t) => { thump(t, 0.06, 70, 0); click(t, 0.05, 0); });
thump(12.85, 0.14, 48, 0); noise(12.85, 0.3, 0.06, 0, 0.3, (p) => Math.exp(-p * 5));
