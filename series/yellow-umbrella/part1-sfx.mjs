// ---- part 1: storm + rain, thunder cracks, his wet steps, "here." / "you'll get wet!", umbrella hand-over, he runs off splashing, soft piano when she smiles; next day drizzle-free birds, sneeze + her laugh, umbrella pops open, rain, warm pad; walking montage; dad: thunder + heartbeat; card slams ----
rainBed((t) => (t < 13.6 ? 1 : t < 19.6 ? 0.05 : t < 23.6 ? Math.min(1, (t - 19.6) / 0.6) : 0.75));
for (const t of [0.3, 1.7, 31.0]) thunder(t, t > 30 ? 0.6 : 0.45);
steps(2.5, 5.0, 0.42, 0.05, 0.4);
voice(6.0, 230, 0.35, 0.03, 0.3);
voice(7.25, 420, 0.7, 0.03, -0.1, 0.4);
whoosh(8.5, 0.3, 0.04);
steps(9.1, 10.8, 0.26, 0.06, 0.5);
piano([[10.9, 72], [11.3, 76], [11.7, 79], [12.4, 77, 0.8]]);
for (let t = 13.9; t < 19.4; t += 0.9 + 0.4 * Math.abs(rnd())) { tone(t, 2700 + 400 * Math.abs(rnd()), 0.08, 0.006, rnd(), 0.01, 30); tone(t + 0.1, 3100, 0.06, 0.005, rnd(), 0.01, 30); }
steps(16.0, 17.8, 0.42, 0.04, 0.4, false);
sneeze(17.9);
laugh(18.4);
umbOpen(20.1);
pad([[20.3, 23.6, [60, 64, 67]], [23.6, 29.6, [57, 60, 64]], [26.6, 29.8, [65, 69, 72]]], 0.008);
piano([[20.6, 72], [21.0, 76], [21.4, 79], [21.8, 84], [24.0, 76], [24.6, 77], [25.2, 79], [27.0, 81], [27.6, 79], [28.2, 76]]);
steps(23.7, 30.2, 0.36, 0.035, 0);
steps(29.6, 30.8, 0.42, 0.05, 0.4);
heartbeat(31.2, 33.6, 0.1);
voice(31.5, 170, 0.6, 0.05, 0.3, 0.2);
pad([[31.0, 36, [48, 51, 55]]], 0.012);
words(33.6, 5, 0.13);
bell(34.3, 76, 0.03, 0, 1.4); bell(34.38, 83, 0.02, 0, 1.4);
