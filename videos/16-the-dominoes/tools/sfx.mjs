// ---- "the dominoes": a low pad that climbs with every domino, big hit at the end ----
// hit times mirror T0 / LAND in index.html
const HITS = [2.62, 2.88, 3.20, 3.60, 4.11, 4.73, 5.51, 6.48], LAND = 8.04;
bed([[0, [45, 52, 57]], [3.2, [47, 54, 59]], [4.11, [48, 55, 60, 64]], [5.51, [50, 57, 62, 66]], [LAND, [45, 52, 57, 61, 64, 69]]], 10.2);
// crouch, then the finger flick
noise(1.7, 0.4, 0.03, panX(115), 0.08);
click(2.58, 0.12, panX(190));
// each hit: a domino clack that gets deeper and heavier
HITS.forEach((t, k) => {
  const f = 2600 / (1 + k * 0.55), g = 0.06 + k * 0.025;
  for (const [m, d, a] of [[1, 60, 1], [2.3, 80, 0.4]]) tone(t, f * m, 0.2, g * a, 0, 0.001, d - k * 5);
  noise(t, 0.015, g * 1.2, 0, 0.7, (p) => 1 - p);
  if (k > 2) thump(t, 0.05 * (k - 2), 90 - k * 6, 0);
});
// the last giant tips over (rising whoosh) and lands
sweep(HITS[7], LAND - HITS[7], 0.08, 0.2, 0.01, 0.15);
thump(LAND, 0.5, 46, 0.2);
noise(LAND, 0.09, 0.22, 0.2, 0.6, (p) => Math.exp(-p * 5));
noise(LAND + 0.03, 1.2, 0.06, 0.2, 0.05);
tone(LAND, 140, 0.4, 0.12, 0.2, 0.001, 12);
[69, 73, 76, 81].forEach((m, i) => bell(LAND + 0.4 + i * 0.12, m, 0.035, 0));
typing(9.8, 16);
typing(10.6, 28);
