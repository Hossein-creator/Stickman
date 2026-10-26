// ---- footsteps for every stride of the five laps ----
[[0.8, 1.9, 150, 400], [2.1, 3.2, 400, 150], [3.5, 4.6, 150, 400], [4.8, 5.9, 400, 150], [6.2, 7.3, 150, 400]].forEach(([a, b, x0, x1], li) => {
  const n = 6;
  for (let s = 0; s < n; s++) {
    const t = a + 0.12 + (s / n) * (b - a - 0.12);
    const x = x0 + (x1 - x0) * (s / n);
    step(t, 0.075 + 0.012 * li, panX(x));
  }
  sweep(a - 0.3, 0.3, 0.03, panX(x0), 0.02, 0.15); // turn around
});
// ---- the one who waits: a heavy sigh, a tired bar blip ----
sweep(5.2, 0.9, 0.035, 0.35, 0.02, 0.1);
[1.5, 3.2, 4.7].forEach((t) => { tone(t, 190, 0.18, 0.02, 0.35, 0.01, 10); tone(t + 0.1, 150, 0.2, 0.02, 0.35, 0.01, 10); });
// ---- the path glows ----
[60, 67, 72, 76].forEach((m, i) => bell(7.5 + i * 0.14, m, 0.04, -0.1));
for (let c = 0; c < 27; c++) noise(9.8 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 26; c++) noise(11.2 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
