// Score for 01 The Umbrella: rain, a sad piano, one hit when the umbrella is taken, thunder.
import { createMix, piano, pad, kick, noiseHit, whoosh, rain, thunder, riser, tick, tone, reverb, writeWav, note } from "../../tools/synth.mjs";

const DUR = 13;
const m = createMix(DUR);
const k = (t, list) => { if (t <= list[0][0]) return list[0][1]; for (let i = 0; i < list.length - 1; i++) { const [a, va] = list[i], [b, vb] = list[i + 1]; if (t <= b) return va + (vb - va) * (t - a) / (b - a); } return list[list.length - 1][1]; };

rain(m, { gain: 0.11, level: (t) => k(t, [[0, 0.5], [1.6, 0.6], [3.0, 1.0], [6.4, 1.0], [6.6, 1.25], [13, 1.25]]) });

// love theme: Am F C G arpeggios
const chords = [["A2", "A3", "C4", "E4", "A4"], ["F2", "F3", "A3", "C4", "F4"], ["C3", "G3", "C4", "E4", "G4"], ["G2", "G3", "B3", "D4", "G4"]];
chords.forEach((c, ci) => {
  const t0 = 0.1 + ci * 1.58;
  piano(m, { t: t0, freq: note(c[0]), gain: 0.14, dur: 2.2, pan: -0.1 });
  for (let i = 1; i < 5; i++) piano(m, { t: t0 + (i - 1) * 0.395, freq: note(c[i]), gain: 0.12, dur: 1.8, pan: (i - 2.5) * 0.15 });
});
pad(m, { t: 0, dur: 6.5, freqs: [note("A2"), note("E3")], gain: 0.05, attack: 1.5, release: 0.3, cutoff: 600 });

// heart pop
tone(m, { t: 0.9, dur: 0.6, freq: note("E6"), gain: 0.05, attack: 0.004, release: 0.5, decay: 6 });
tone(m, { t: 0.98, dur: 0.6, freq: note("A6"), gain: 0.04, attack: 0.004, release: 0.5, decay: 6 });

// days counter ticking, fast then slow
for (let i = 0; i < 26; i++) tick(m, { t: 0.3 + 6 * Math.pow(i / 26, 2), gain: 0.018, freq: 3000 });

// warm door light switching on
noiseHit(m, { t: 3.9, dur: 0.05, gain: 0.12, from: 3000, mode: "band" });
for (let i = 0; i < 6; i++) tone(m, { t: 3.92 + i * 0.07, dur: 0.04, freq: 120, gain: 0.03, type: "saw", attack: 0.002, release: 0.02 });

// tension before the grab, then the hit
riser(m, { t: 5.2, dur: 1.25, gain: 0.07 });
whoosh(m, { t: 6.2, dur: 0.35, gain: 0.25, from: 600, to: 3500 });
kick(m, { t: 6.45, gain: 0.85, f0: 95, f1: 28, dur: 1.4, click: 0.15 });
noiseHit(m, { t: 6.45, dur: 0.12, gain: 0.15, from: 5000, mode: "high" });
pad(m, { t: 6.45, dur: 1.3, freqs: [note("D2"), note("Ab2")], gain: 0.07, attack: 0.01, release: 1.1, cutoff: 400 });

thunder(m, { t: 7.22, gain: 0.55 });

// footsteps in puddles as they walk away
for (let t = 6.85; t < 8.4; t += 0.43) noiseHit(m, { t, dur: 0.09, gain: 0.07, from: 900, to: 400, mode: "band", pan: 0.3 });
for (let t = 9.15; t < 11.6; t += 0.43) noiseHit(m, { t, dur: 0.09, gain: 0.07 * (1 - (t - 9.1) / 3), from: 900, to: 400, mode: "band", pan: 0.7 });

// alone: sparse piano and a cold pad
pad(m, { t: 7.8, dur: 5.2, freqs: [note("A1"), note("E2"), note("C3")], gain: 0.06, attack: 2.5, release: 0.4, cutoff: 500 });
[["E4", 7.9], ["C4", 8.7], ["A3", 9.5], ["B3", 10.3]].forEach(([n, t]) => piano(m, { t, freq: note(n), gain: 0.11, dur: 2.4 }));
piano(m, { t: 11.05, freq: note("E5"), gain: 0.08, dur: 1.9 });
piano(m, { t: 11.05, freq: note("A4"), gain: 0.08, dur: 1.9 });

reverb(m, 0.22);
writeWav(new URL("./assets/audio.wav", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"), m, -1.5);
console.log("wrote audio.wav");
