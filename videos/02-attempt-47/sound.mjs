// Score for 02 Attempt 47: tense pulse and fails, silence and heartbeat, slow-motion jump, big landing and applause.
import { createMix, piano, pad, kick, noiseHit, whoosh, heartbeat, riser, tick, tone, applause, reverb, writeWav, note } from "../../tools/synth.mjs";

const DUR = 13, BEAT = 60 / 128;
const m = createMix(DUR);
const MONT = [2.0, 2.62, 3.24, 3.86, 4.48];

// tense pulse until the reset
pad(m, { t: 0, dur: 5.15, freqs: [note("E1"), note("B1"), note("G2")], gain: 0.07, attack: 0.4, release: 0.1, cutoff: 520 });
for (let t = 0; t < 5.05; t += BEAT) kick(m, { t, gain: 0.32, f0: 100, f1: 45, dur: 0.3, click: 0.08 });
for (let t = BEAT / 2; t < 5.05; t += BEAT) noiseHit(m, { t, dur: 0.05, gain: 0.05, from: 8000, mode: "high", pan: 0.3 });

// attempt 1: run, jump, fall
[0.12, 0.38, 0.58, 0.74].forEach((t) => noiseHit(m, { t, dur: 0.06, gain: 0.12, from: 500, mode: "band", pan: -0.3 }));
whoosh(m, { t: 0.82, dur: 0.4, gain: 0.22, from: 500, to: 2500 });
tone(m, { t: 1.15, dur: 0.7, freq: 520, freqEnd: 110, gain: 0.07, type: "tri", attack: 0.01, release: 0.2 });
kick(m, { t: 1.42, gain: 0.4, f0: 160, f1: 60, dur: 0.25, click: 0.3 });

// laugh bubbles: little pops, fewer each time
const fails = [1.15, ...MONT.map((t) => t + 0.42)];
fails.forEach((f, fi) => {
  const count = Math.max(0, 4 - Math.floor(fi * 0.8));
  for (let b = 0; b < count; b++) tone(m, { t: f + b * 0.09, dur: 0.08, freq: 700 + 160 * b, freqEnd: 1300 + 160 * b, gain: 0.05, attack: 0.002, release: 0.05, pan: 0.5 });
});

// montage: counter rolls, whoosh, wall thud
MONT.forEach((t, i) => {
  for (let k = 0; k < 4; k++) tick(m, { t: t + k * 0.045, gain: 0.05, freq: 2600 });
  whoosh(m, { t: t - 0.05, dur: 0.3, gain: 0.18, from: 700, to: 2600 });
  kick(m, { t: t + 0.34, gain: 0.35, f0: 170, f1: 70, dur: 0.2, click: 0.35, pan: 0.2 });
  noiseHit(m, { t: t + 0.36, dur: 0.05, gain: 0.12, from: 3000, mode: "band" });
});

// reset to 47: cut, boom, silence, heartbeat, breath
whoosh(m, { t: 4.85, dur: 0.32, gain: 0.2, from: 4000, to: 300 });
kick(m, { t: 5.25, gain: 0.7, f0: 70, f1: 30, dur: 1.4, click: 0.05 });
tone(m, { t: 5.25, dur: 1.6, freq: note("E2"), gain: 0.06, type: "saw", attack: 0.01, release: 1.2 });
heartbeat(m, { t: 5.55, gain: 0.5 });
heartbeat(m, { t: 6.12, gain: 0.55 });
noiseHit(m, { t: 5.6, dur: 0.9, gain: 0.05, from: 900, to: 500, mode: "band", curve: (k) => Math.sin(Math.PI * k) });

// sprint: footsteps speeding up, drum roll, riser
[6.45, 6.67, 6.84, 6.96, 7.05].forEach((t) => kick(m, { t, gain: 0.18, f0: 140, f1: 70, dur: 0.12, click: 0.25 }));
for (let i = 0; i < 18; i++) { const t = 6.4 + 0.7 * Math.pow(i / 18, 0.7); noiseHit(m, { t, dur: 0.05, gain: 0.04 + 0.05 * i / 18, from: 2500, mode: "band" }); }
riser(m, { t: 6.3, dur: 0.85, gain: 0.12 });

// slow-motion flight
whoosh(m, { t: 7.08, dur: 1.4, gain: 0.25, from: 300, to: 900 });
tone(m, { t: 7.1, dur: 1.5, freq: 82, freqEnd: 55, gain: 0.12, type: "sine", attack: 0.05, release: 0.3 });
pad(m, { t: 7.1, dur: 1.55, freqs: [note("B3"), note("E4"), note("G#4")], gain: 0.04, attack: 1.2, release: 0.1, cutoff: 2600 });
heartbeat(m, { t: 7.75, gain: 0.35 });

// landing
kick(m, { t: 8.62, gain: 1.0, f0: 120, f1: 30, dur: 1.8, click: 0.4 });
noiseHit(m, { t: 8.62, dur: 2.4, gain: 0.16, from: 9000, to: 5000, mode: "high", attack: 0.002, release: 2.3 });
pad(m, { t: 8.62, dur: 4.38, freqs: [note("E3"), note("G#3"), note("B3"), note("E4")], gain: 0.09, attack: 0.02, release: 1.0, cutoff: 2200 });
["E3", "B3", "E4", "G#4"].forEach((n) => piano(m, { t: 8.64, freq: note(n), gain: 0.1, dur: 3.5 }));
applause(m, { t: 8.75, dur: 4.25, gain: 0.32, rate: 260 });
tone(m, { t: 8.85, dur: 0.5, freq: note("B5"), gain: 0.05, attack: 0.003, release: 0.45, decay: 5 });

// uplifting pulse to the end
for (let t = 9.3; t < 12.9; t += BEAT) kick(m, { t, gain: 0.3, f0: 105, f1: 45, dur: 0.3, click: 0.08 });
[["B4", 9.3], ["E5", 10.2], ["G#5", 11.1], ["B5", 12.0]].forEach(([n, t]) => piano(m, { t, freq: note(n), gain: 0.07, dur: 1.2 }));

reverb(m, 0.2);
writeWav(new URL("./assets/audio.wav", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"), m, -1.5);
console.log("wrote audio.wav");
