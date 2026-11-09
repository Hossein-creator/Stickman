// ---- part 2: storm, thunder, dad's angry voice, her small cry, sad steps away; night rain on the window, his steps, paper plane whoosh, piano, heart; thunder + paper rip; day birds, rich man's steps, ring sparkle bells, coins, "perfect!", her "no...", rain returns, umbrella clatters to the ground, heartbeat, card ----
rainBed((t) => (t < 9.4 ? 0.85 : t < 22 ? 0.7 : t < 30.2 ? 0 : 0.6));
for (const t of [0.4, 19.8]) thunder(t, 0.5);
steps(0.2, 0.9, 0.35, 0.06, 0.4);
voice(1.45, 160, 1.0, 0.05, 0.3, 0.25); voice(3.65, 150, 1.0, 0.05, 0.3, 0.3);
voice(0.7, 460, 0.4, 0.025, -0.1, 0.3);
steps(6.4, 9.2, 0.4, 0.04, 0.5);
pad([[6.8, 9.4, [57, 60, 64]], [9.4, 15.6, [53, 57, 60]], [15.6, 19.6, [60, 64, 67]], [27.6, 33.4, [57, 60, 64]]], 0.008);
piano([[7.2, 76], [7.8, 74], [8.4, 72], [9.0, 69, 0.8]]);
steps(11.6, 13.6, 0.4, 0.04, -0.3);
whoosh(15.0, 0.8, 0.05);
noise(15.95, 0.15, 0.02, 0, 0.6);
piano([[16.0, 72], [16.4, 76], [16.8, 79], [17.6, 84], [18.2, 79], [18.6, 84, 0.8]]);
noise(20.65, 0.35, 0.07, 0, 0.7, (p) => (p < 0.5 ? 1 : 0.4) * (1 - p));
heartbeat(20.0, 22.0, 0.08);
for (let t = 22.2; t < 30; t += 0.9 + 0.4 * Math.abs(rnd())) { tone(t, 2700 + 400 * Math.abs(rnd()), 0.08, 0.006, rnd(), 0.01, 30); tone(t + 0.1, 3100, 0.06, 0.005, rnd(), 0.01, 30); }
steps(22.6, 24.6, 0.4, 0.04, 0.5, false);
click(24.85, 0.05); [[25.0, 88], [25.1, 91], [25.2, 96]].forEach(([t, m]) => bell(t, m, 0.02, 0.3, 2));
for (let k = 0; k < 5; k++) tone(25.3 + k * 0.08, 2400 + k * 200, 0.08, 0.012, 0.2, 0.001, 30);
voice(25.95, 200, 0.5, 0.04, 0.3, 0.35);
voice(27.85, 380, 0.8, 0.025, -0.2, -0.2);
umbOpen(31.0, 0.03); thump(31.25, 0.05, 140, -0.3); click(31.3, 0.04, -0.3);
heartbeat(31.4, 33.6, 0.09);
pad([[31.2, 36, [48, 51, 55]]], 0.012);
words(33.6, 4, 0.13);
bell(34.2, 76, 0.03, 0, 1.4); bell(34.28, 83, 0.02, 0, 1.4);
