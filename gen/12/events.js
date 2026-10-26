// ---- days tick by (a slow clock tick), the thread creaks and frays ----
for (let d = 1; d <= 29; d++) {
  const t = 0.4 + 6.6 * Math.acos(1 - 2 * ((d - 1) / 29)) / Math.PI;
  if (d > 1 && t < 7.0) click(t, 0.02 + 0.004 * (d / 29), d % 2 ? -0.12 : 0.12);
}
for (let c = 0; c < 6; c++) noise(2.2 + c * 0.95, 0.35, 0.025, (c % 2 ? 0.2 : -0.2), 0.04);
[4.4, 5.6, 6.5].forEach((t) => { tone(t, 1900, 0.06, 0.012, 0, 0.002, 60); noise(t, 0.05, 0.03, 0, 0.7, (p) => 1 - p); });
// ---- he turns first: whoosh, four steps toward her, she turns ----
sweep(6.95, 0.5, 0.06, -0.3, 0.02, 0.25);
for (let s = 0; s < 5; s++) step(7.6 + s * 0.32, 0.08, -0.2 + s * 0.1);
sweep(8.6, 0.45, 0.05, 0.3, 0.02, 0.22);
// ---- the touch: thread glows back ----
tone(9.1, 330, 0.5, 0.03, 0, 0.01, 6);
[64, 68, 71, 76].forEach((m, i) => bell(9.15 + i * 0.12, m, 0.045, 0.05));
for (let c = 0; c < 24; c++) noise(9.9 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 25; c++) noise(11.0 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
