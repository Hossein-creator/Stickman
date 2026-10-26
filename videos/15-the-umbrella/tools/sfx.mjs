// ---- "the umbrella": cold minor pad in the rain, warm chord when they share ----
bed([[0, [50, 57, 60]], [3.6, [48, 55, 58]], [6.7, [53, 57, 60, 64]], [7.6, [53, 60, 64, 69]]], 9.6);
// rain: bright noise that fades in at 1.0 s, softer at the end
{
  let lp = 0, hp = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR, g = smooth(t, 0.9, 2.3) * (1 - 0.5 * smooth(t, 8.6, 10.5));
    lp += (rnd() - lp) * 0.35;
    hp = lp - hp * 0.2;
    add(i, hp * 0.05 * g, Math.sin(t * 0.7) * 0.3);
  }
}
// raindrops tapping the umbrella while it is open (louder pitter under the canopy)
seed = 99;
for (let k = 0; k < 140; k++) {
  const t = 2.1 + ((rnd() + 1) / 2) * 11.5;
  click(t, 0.035 * (t > 9.6 ? 0.6 : 1), rnd() * 0.4);
}
// umbrella opens: a quick cloth fwump
sweep(1.55, 0.35, 0.09, panX(330), 0.05, 0.5);
thump(1.85, 0.12, 90, panX(330));
// far thunder as she hugs herself
for (let k = 0; k < 3; k++) noise(2.6 + k * 0.18, 1.6, 0.06, -0.2, 0.012);
thump(2.6, 0.12, 40, -0.2);
// he tilts the umbrella to her (cloth swish)
sweep(3.55, 0.7, 0.05, panX(430), 0.03, 0.25);
// she steps in, he steps in
step(6.95, 0.06, panX(460)); step(7.25, 0.06, panX(440));
step(7.15, 0.06, panX(330)); step(7.55, 0.06, panX(360));
[69, 73, 76, 81].forEach((m, i) => bell(7.7 + i * 0.13, m, 0.035, 0));
typing(9.8, 23);
typing(11.0, 25);
