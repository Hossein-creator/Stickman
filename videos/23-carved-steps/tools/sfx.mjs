// ---- "carved steps": stone chisel strikes, one rising note for every step he climbs, light opens at the top ----
bed([[0, [43, 50, 55]], [3.0, [45, 52, 57]], [5.0, [47, 54, 59]], [7.0, [48, 55, 60]], [9.0, [50, 57, 62, 66, 69]], [10.0, [50, 57, 62, 66]]], 10.2, 38);
const chisel = (t, g, pan) => { tone(t, 2300 + 300 * rnd(), 0.18, g, pan, 0.001, 35); tone(t, 3900, 0.1, g * 0.4, pan, 0.001, 60); noise(t, 0.04, g * 0.9, pan, 0.7, (p) => 1 - p); };
const pebbles = (t, pan) => { for (let i = 0; i < 4; i++) click(t + 0.12 + i * 0.07 + 0.03 * rnd(), 0.025, pan); };
const SCALE = [55, 57, 59, 60, 62, 64, 66, 67];
for (let k = 0; k < 8; k++) {
  const t0 = 1.0 + k;
  const pan = panX(500);
  chisel(t0 + 0.165, 0.07, pan); chisel(t0 + 0.44, 0.07, pan);
  pebbles(t0 + 0.2, pan);
  step(t0 + 0.72, 0.06, pan); step(t0 + 0.92, 0.05, pan);
  tone(t0 + 0.75, hz(SCALE[k]), 0.9, 0.022, 0, 0.02, 3); // a rising note per step
}
// pull onto the top: whoosh + bright chord
sweep(9.0, 0.6, 0.05, panX(560), 0.03, 0.3);
step(9.6, 0.07, panX(600));
[62, 66, 69, 74, 78].forEach((m, i) => bell(9.7 + i * 0.12, m, 0.03, panX(620)));
// the second man stands and follows
noise(10.05, 0.25, 0.03, panX(395), 0.05);
step(10.7, 0.05, panX(440)); step(10.95, 0.05, panX(490));
step(11.95, 0.05, panX(500)); step(12.75, 0.05, panX(500));
tone(11.95, hz(55), 0.9, 0.02, 0, 0.02, 3); tone(12.75, hz(57), 0.9, 0.02, 0, 0.02, 3);
typing(0.4, 24, 24);
typing(10.0, 27, 22);
