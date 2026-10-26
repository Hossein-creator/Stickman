// ---- "one friend": tyre screech, party beat, champagne pop, record scratch crash, tow chain, match + fire, ticking years, a warm ending ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[3.05, 4.05]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_STOP = 0.55, T_POP = 1.55, T_CRASH = 3.1, T_HOOK = 4.9, T_TOW = 5.1, T_FWALK = 5.6, T_MATCH = 6.3, T_LIT = 6.55, T_AGE0 = 7.2, T_AGE1 = 10.8, T_TOAST = 11.0;
const LEAVE = [[4.35, 70], [3.75, 170], [4.85, 270], [4.05, 620], [5.1, 730], [4.6, 840]];
const rC = realOf(T_CRASH), rA0 = realOf(T_AGE0), rA1 = realOf(T_AGE1);

const pad = (t0, t1, ms, g, fi = 0.4, fo = 0.5) => {
  const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR);
  for (let i = 0; i < n; i++) {
    const tt = i / SR, ta = t0 + tt, e = Math.min(1, tt / fi, (t1 - t0 - tt) / fo);
    let v = 0;
    for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * ta) + 0.2 * Math.sin(4 * Math.PI * hz(m) * ta);
    add(s0 + i, v * g * e, 0);
  }
};

// tyre screech while the car drifts in, then the stop
{
  const n = Math.floor(0.55 * SR);
  for (let i = 0; i < n; i++) { const t = i / SR, p = t / 0.55; add(i, Math.sin(2 * Math.PI * (1700 + 500 * Math.sin(t * 30)) * t) * 0.02 * Math.sin(Math.PI * p), 0.5 - p * 0.3); }
  noise(0, 0.55, 0.05, 0.4, 0.6, (p) => Math.sin(Math.PI * p));
}
thump(T_STOP, 0.2, 50, 0.3);
// money burst: paper flutter
for (let i = 0; i < 26; i++) click(realOf(T_STOP + 0.05) + i * 0.02 + 0.01 * rnd(), 0.025, 0.4 * rnd());

// party: four-on-the-floor, hats, a bright chord stab every bar
for (let b = T_STOP; b < T_CRASH - 0.01; b += 0.42) {
  const t = realOf(b);
  thump(t, 0.2, 55, 0); noise(t, 0.04, 0.03, 0, 0.3, (p) => 1 - p);
  click(realOf(b + 0.21), 0.04, 0.2); noise(realOf(b + 0.21), 0.03, 0.025, 0.2, 0.9, (p) => 1 - p);
}
for (let b = T_STOP; b < T_CRASH - 0.3; b += 1.68) [57, 61, 64, 68].forEach((m) => tone(realOf(b), hz(m), 0.5, 0.012, 0, 0.005, 6));
pad(realOf(T_STOP), rC, [45, 52, 57, 61], 0.006, 0.1, 0.02);
// crowd cheering: bright noise swells
noise(realOf(1.0), realOf(T_CRASH) - realOf(1.0), 0.03, 0, 0.35, (p) => Math.min(1, p * 6) * (0.7 + 0.3 * Math.sin(p * 40)));
// champagne pop and fizz
click(realOf(T_POP), 0.12, -0.1); thump(realOf(T_POP), 0.1, 90, -0.1);
noise(realOf(T_POP) + 0.02, realOf(T_CRASH) - realOf(T_POP), 0.025, -0.1, 0.95, (p) => Math.exp(-p * 2));

// the crash: record scratch, boom, silence; the chain and the bottle hit the floor in slow motion
{
  const t0 = rC - 0.12, n = Math.floor(0.3 * SR), s0 = Math.floor(t0 * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) { const p = i / n; ph += (900 - 800 * p) / SR; add(s0 + i, (2 * (ph % 1) - 1) * 0.05 * (1 - p), 0); }
}
thump(rC, 0.36, 34, 0); noise(rC, 1.2, 0.08, 0, 0.1, (p) => Math.exp(-p * 3));
tone(rC, hz(33), 2.0, 0.05, 0, 0.05, 1.0);
[90, 95, 97].forEach((m, i) => bell(realOf(T_CRASH + 0.75) + i * 0.05, m, 0.015, 0, 0.4));
click(realOf(T_CRASH + 0.85), 0.06, 0); tone(realOf(T_CRASH + 0.85), 1200, 0.3, 0.02, 0, 0.001, 20);
pad(rC + 0.6, rA0, [40, 47, 52], 0.007, 0.8, 0.4);
// the crowd walks away, footsteps on both sides
for (const [s, x] of LEAVE) for (let k = 0; k < 4; k++) step(realOf(s + 0.15 + k * 0.25), 0.04 * (1 - k / 5), panX(x + (x < 400 ? -40 : 80) * k));
// tow truck: chain drops, clank, engine pulls the car away
for (let k = 0; k < 6; k++) click(realOf(T_HOOK) + k * 0.05, 0.04, 0.5);
thump(realOf(T_TOW), 0.14, 60, 0.5); [70, 75].forEach((m) => bell(realOf(T_TOW), m, 0.015, 0.5, 0.5));
{
  const t0 = realOf(T_TOW), n = Math.floor(1.2 * SR), s0 = Math.floor(t0 * SR);
  let lp = 0;
  for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.05; add(s0 + i, (lp * 0.08 + Math.sin(2 * Math.PI * 48 * i / SR) * 0.02) * Math.sin(Math.PI * p), 0.4 + 0.3 * p); }
}

// the friend walks over, strikes a match, the fire catches
for (let k = 0; k < 3; k++) step(realOf(T_FWALK + 0.08 + k * 0.17), 0.05, panX(lerp(-60, 280, k / 2)));
noise(realOf(T_MATCH - 0.08), 0.12, 0.08, panX(340), 0.7, (p) => Math.sin(Math.PI * p));
sweep(realOf(T_LIT), 0.5, 0.08, panX(355), 0.05, 0.3); thump(realOf(T_LIT), 0.12, 45, panX(355));
for (let i = 0; i < 70; i++) click(realOf(T_LIT) + 0.2 + i * 0.1 + 0.06 * rnd(), 0.012 + 0.008 * Math.abs(rnd()), panX(355) + 0.2 * rnd());

// the years: a clock ticking faster and faster, warm chords climbing, a whoosh for each sun
pad(rA0, 14, [45, 52, 57, 61], 0.008, 0.6, 1.5);
[[0, [57, 64]], [0.33, [59, 64]], [0.66, [61, 64, 68]]].forEach(([p, ms]) => ms.forEach((m) => bell(lerp(rA0, rA1, p), m, 0.02, 0, 2.0)));
{
  let s = T_AGE0;
  while (s < T_AGE1) { const p = (s - T_AGE0) / (T_AGE1 - T_AGE0); click(realOf(s), 0.03, 0); s += 0.22 * (1 - 0.85 * p); }
}
for (let c = 0; c < 8; c++) { const s = T_AGE0 + (T_AGE1 - T_AGE0) * Math.pow((c + 0.5) / 8, 1 / 1.5); sweep(realOf(s) - 0.15, 0.3, 0.025, -0.4 + c * 0.1, 0.02, 0.15); }
// two old friends laugh
const oldLaugh = (s, f0, pan) => { for (let k = 0; k < 4; k++) { const t = realOf(s) + k * 0.13; noise(t, 0.04, 0.02, pan, 0.4, (p) => 1 - p); tone(t + 0.02, f0 * (1 - 0.04 * k), 0.09, 0.02, pan, 0.01, 18); } };
oldLaugh(8.32, 150, -0.2); oldLaugh(8.36, 120, 0.2); oldLaugh(9.72, 150, -0.2); oldLaugh(9.76, 120, 0.2);
// the age lands on 80, the toast
bell(rA1, 69, 0.03, 0, 2.0); bell(rA1 + 0.05, 76, 0.02, 0, 2.0);
[[0, 88], [0.04, 93]].forEach(([d, m]) => bell(realOf(T_TOAST + 0.25) + d, m, 0.03, 0, 1.0));
[50, 57, 62, 66].forEach((m, i) => bell(realOf(T_TOAST + 0.3) + i * 0.08, m, 0.018, 0, 2.4));

// last lines
[11.6, 11.75, 11.88, 12.0].forEach((t, i) => thump(t, i === 3 ? 0.1 : 0.05, i === 3 ? 52 : 70, 0));
[12.45, 12.58, 12.72, 12.9, 13.05].forEach((t, i) => { thump(t, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(t, 0.04, 0); });
