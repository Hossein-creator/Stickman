// ---- six pours: water trickle + a soft root creak underneath ----
[1.0, 2.3, 3.6, 4.9, 6.2, 7.5].forEach((tp, i) => {
  sweep(tp - 0.1, 0.4, 0.03, -0.1, 0.02, 0.15); // arm lifts
  noise(tp + 0.3, 0.8, 0.05, 0.05, 0.35, (p) => Math.sin(Math.PI * Math.min(1, p * 1.4)) * (1 - p * 0.5)); // water pouring
  for (let d = 0; d < 7; d++) tone(tp + 0.4 + d * 0.1, 900 + (d % 3) * 160, 0.05, 0.012, 0.15, 0.002, 70); // drops hit soil
  tone(tp + 1.05, 70 + i * 4, 0.4, 0.03, 0.15, 0.05, 6); // roots creak under the soil
});
// ---- nothing grows: a dry, lonely beat ----
tone(3.9, 150, 0.4, 0.02, 0, 0.2, 5);
// ---- the shoot breaks through ----
thump(8.4, 0.2, 55, 0.1);
sweep(8.4, 1.0, 0.08, 0.1, 0.02, 0.3);
noise(8.45, 0.25, 0.08, 0.1, 0.3, (p) => Math.exp(-p * 5));
[60, 67, 72, 76, 79].forEach((m, i) => bell(8.6 + i * 0.12, m, 0.045, 0.05));
for (let c = 0; c < 23; c++) noise(9.9 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 25; c++) noise(11.0 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
