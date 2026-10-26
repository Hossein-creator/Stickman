// ---- small talk: soft mumbles, then one throw + one thud per unsaid word ----
for (let i = 0; i < 9; i++) tone(0.5 + i * 0.2, 260 + (i % 3) * 40, 0.1, 0.012, i % 2 ? 0.4 : -0.4, 0.01, 18);
const TB = [2.6, 3.9, 5.2, 6.5, 7.8, 9.0], SPK = [0, 1, 0, 1, 0, 1];
TB.forEach((tb, i) => {
  const side = SPK[i] ? 0.45 : -0.45;
  tone(tb - 1.0, 520, 0.08, 0.02, side, 0.004, 30); // pick the word up
  sweep(tb - 0.5, 0.5, 0.06, 0, 0.02, 0.25); // thrown across
  thump(tb, 0.16 + i * 0.012, 70 - i * 3, 0); // lands on the wall
  noise(tb, 0.09, 0.07, 0, 0.35, (p) => Math.exp(-p * 6)); // dust
  tone(tb + 0.01, 210 - i * 10, 0.3, 0.05, 0, 0.001, 18); // stone knock
});
bell(9.05, 40, 0.05, 0, 0.9);
// ---- punchline typing ----
for (let c = 0; c < 29; c++) noise(9.8 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
for (let c = 0; c < 26; c++) noise(11.2 + c / 26, 0.012, 0.05, 0, 0.9, (p) => Math.exp(-p * 5));
