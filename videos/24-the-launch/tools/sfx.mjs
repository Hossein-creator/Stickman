// ---- "the launch": button clicks, ignition rumbles, explosions + FAIL buzz; a long rumble and open chord for PASS ----
bed([[0, [45, 52, 57]], [2.6, [44, 51, 56]], [5.9, [43, 50, 55]], [8.4, [45, 52, 57, 60]], [9.6, [50, 57, 62, 66, 69]]], 10.6, 38);
const rumble = (t, dur, g, pan = 0) => noise(t, dur, g, pan, 0.03, (p) => Math.min(1, p * 6) * Math.min(1, (1 - p) * 4));
const boom = (t, g, pan = 0) => { thump(t, g, 45, pan); noise(t, 0.9, g * 0.8, pan, 0.12, (p) => Math.exp(-p * 5)); noise(t, 0.05, g * 0.6, pan, 0.8, (p) => 1 - p); for (let i = 0; i < 6; i++) click(t + 0.3 + i * 0.09 + 0.04 * rnd(), g * 0.2, pan + 0.3 * rnd()); };
const press = (t) => click(t, 0.06, panX(257));
// attempt 1: rises, wobbles, explodes
press(0.7); rumble(0.8, 0.8, 0.07, panX(430)); boom(1.6, 0.16, panX(430)); buzz(1.75, 0.05);
// attempt 2: explodes on the pad
press(2.9); rumble(3.0, 0.35, 0.06, panX(430)); boom(3.35, 0.16, panX(430)); buzz(3.5, 0.05);
// attempt 3: tips over and crashes to the right
press(4.2); rumble(4.3, 1.0, 0.07, panX(430)); sweep(4.8, 0.5, 0.05, panX(560), 0.05, 0.4); boom(5.3, 0.13, panX(680)); buzz(5.45, 0.05);
// montage: fast small booms, the counter flying up
for (let t = 6.0; t < 8.2; t += 0.26) { press(t - 0.1); boom(t, 0.06, 0.3 * rnd()); }
// attempt 63: press, a long building rumble, lift-off whoosh, PASS
press(8.6);
noise(8.7, 3.4, 0.12, 0, 0.025, (p) => Math.min(1, p * 3) * (1 - smooth(p * 3.4, 2.2, 3.4)));
thump(8.75, 0.12, 40, 0);
sweep(9.4, 1.8, 0.08, 0, 0.02, 0.3);
[62, 69, 74, 78].forEach((m, i) => bell(9.6 + i * 0.12, m, 0.035, 0));
typing(0.3, 19, 24);
typing(10.5, 22, 22);
