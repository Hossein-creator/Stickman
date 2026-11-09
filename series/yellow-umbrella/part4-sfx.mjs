// ---- part 4: thunder + her firm "no." + ring box bouncing; gasps, she runs out, dad shouts; storm, bus arrives (engine + brake hiss), doors, it drives off; her running steps, "wait!", she falls to her knees, sobbing; the rain stops on her: soft piano rises; hug: warm chord + bells, birds, rainbow shimmer; dad's steps, "i'm sorry", "take care of her", happy chord; 5 years later: gentle rain, kid laugh + splash, music box ending; card ----
thunder(0.3, 0.4);
voice(0.55, 300, 0.35, 0.05, -0.1, -0.2);
for (const [t, g] of [[0.55, 0.06], [0.75, 0.04], [0.9, 0.03], [0.98, 0.02]]) { click(t, g); tone(t, 1400, 0.05, g * 0.4, 0, 0.001, 60); }
voice(0.7, 600, 0.25, 0.025, 0.3, 0.3); voice(0.75, 220, 0.25, 0.03, -0.3, 0.3);
for (let t = 2.4; t < 4.8; t += 0.22) step(t, 0.04, -0.3);
voice(4.25, 170, 1.0, 0.045, -0.4, 0.3);
rainBed((t) => (t < 6.4 ? 0 : t < 20.4 ? 1 : t < 21.2 ? 1 - (t - 20.4) / 0.8 : t < 31 ? 0 : 0.5), 0.12);
{ const s0 = Math.floor(6.4 * SR), n = Math.floor(5.6 * SR); let ph = 0; for (let i = 0; i < n; i++) { const t = 6.4 + i / SR, f = t < 8 ? 60 - 12 * (t - 6.4) / 1.6 : t < 9.6 ? 40 : 40 + 30 * Math.min(1, (t - 9.6) / 1.5); ph += (2 * Math.PI * f) / SR; const g = (t < 8 ? Math.min(1, (t - 6.4) / 0.6) : 1) * (t > 10.5 ? Math.max(0, 1 - (t - 10.5) / 1.4) : 1); add(s0 + i, (Math.sin(ph) + 0.5 * Math.sin(2 * ph)) * 0.03 * g, 0.3); } }
noise(7.9, 0.6, 0.05, 0.3, 0.7, (p) => Math.exp(-p * 3)); noise(8.3, 0.3, 0.03, 0.2, 0.6); noise(9.3, 0.3, 0.03, 0.2, 0.6);
steps(8.2, 9.0, 0.4, 0.04, 0.2);
for (let t = 10.0; t < 11.6; t += 0.22) wetStep(t, 0.06, -0.2);
voice(11.25, 520, 0.6, 0.05, 0, 0.3);
thunder(12.4, 0.5);
thump(12.5, 0.08, 70, 0);
for (let k = 0; k < 6; k++) voice(12.8 + k * 0.45, 440 - k * 6, 0.25, 0.02, 0, -0.3);
pad([[12.6, 16.2, [57, 60, 64]], [16.2, 20.0, [60, 64, 67]], [20.0, 24.0, [65, 69, 72, 77]], [27.4, 31, [60, 64, 67, 72]], [31, 40, [65, 69, 72]]], 0.009);
steps(14.6, 15.8, 0.4, 0.04, 0.4);
piano([[16.2, 72], [16.6, 74], [17.0, 76], [17.6, 79], [18.4, 77], [18.8, 76], [19.2, 79]]);
[[20.1, 76], [20.18, 81], [20.26, 88]].forEach(([t, m]) => bell(t, m, 0.025, 0, 1.2));
for (let k = 0; k < 8; k++) bell(21.0 + k * 0.12, 84 + (k % 4) * 3, 0.01, (k % 2) - 0.5, 1.6);
for (let t = 21.5; t < 31; t += 0.9 + 0.4 * Math.abs(rnd())) { tone(t, 2700 + 400 * Math.abs(rnd()), 0.08, 0.006, rnd(), 0.01, 30); tone(t + 0.1, 3100, 0.06, 0.005, rnd(), 0.01, 30); }
steps(24.1, 25.8, 0.42, 0.04, -0.3, false);
voice(26.05, 170, 0.6, 0.035, -0.2, -0.15);
voice(27.45, 165, 1.1, 0.035, -0.2, 0.15);
piano([[28.6, 72], [28.9, 76], [29.2, 79], [29.5, 84]]);
laugh(33.5, 700, 0); noise(33.9, 0.4, 0.07, 0, 0.5, (p) => Math.exp(-p * 5));
piano([[31.2, 84, 0.7], [31.6, 79, 0.7], [32.0, 76, 0.7], [32.4, 72, 0.7], [34.4, 76], [34.8, 79], [35.2, 84], [36.0, 83, 0.8]]);
words(36.4, 6, 0.13); words(37.3, 8, 0.1);
bell(38.5, 72, 0.03, 0, 1.0); bell(38.58, 76, 0.025, 0, 1.0); bell(38.66, 79, 0.02, 0, 1.0);
