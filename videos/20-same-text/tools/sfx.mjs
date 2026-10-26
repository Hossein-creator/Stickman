// ---- "same text": night room tone, buzz, his heartbeat speeds up while he spirals, birds at sunrise ----
bed([[0, [45, 52, 57]], [2.6, [44, 51, 56]], [4.6, [43, 50, 55, 58]], [6.4, [41, 48, 53]], [8.4, [48, 55, 60, 64]], [10.4, [50, 57, 62, 66]]], 10.9, 43);
noise(0, 13.9, 0.01, 0, 0.01);
// both phones buzz at 11:14 PM
const buzz2 = (t, g, pan) => {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.34; i++) {
    const tt = i / SR, on = Math.floor(tt / 0.07) % 2 === 0 ? 1 : 0.15;
    add(s0 + i, Math.sin(2 * Math.PI * 170 * tt) * Math.sign(Math.sin(2 * Math.PI * 85 * tt)) * 0.5 * on * g, pan);
  }
};
buzz2(0.6, 0.08, panX(212)); buzz2(0.62, 0.08, panX(588));
tone(0.62, 1760, 0.25, 0.04, 0, 0.002, 14); tone(0.72, 2350, 0.3, 0.03, 0, 0.002, 12);
// he sits up; she... the chill one replies and the message whooshes away
noise(0.85, 0.3, 0.03, panX(212), 0.05);
sweep(1.6, 0.25, 0.04, panX(588), 0.1, 0.5);
tone(1.72, 1320, 0.15, 0.02, panX(588), 0.002, 25);
// thought pops, one per line
for (let i = 0; i < 7; i++) { tone(2.6 + i * 0.68, hz(64 - i), 0.12, 0.03, panX(212), 0.003, 22); noise(2.6 + i * 0.68, 0.03, 0.03, panX(212), 0.5, (p) => 1 - p); }
// heartbeat: slow -> fast while he spirals, gone when he finally falls asleep
{
  let t = 2.4, per = 0.95;
  while (t < 7.8) {
    const g = 0.05 + 0.05 * smooth(t, 2.4, 6.5);
    thump(t, g, 48, panX(212)); thump(t + 0.16, g * 0.7, 44, panX(212));
    per = Math.max(0.42, per - 0.055); t += per;
  }
}
// chill: slow sleeping breath
for (let t = 2.6; t < 8.6; t += 2.2) noise(t, 1.6, 0.018, panX(588), 0.015);
// sunrise: birds, then the morning buzz
const chirp = (t, f, pan) => { const s0 = Math.floor(t * SR); for (let i = 0; i < SR * 0.09; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (f + 1800 * tt) * tt) * Math.sin(Math.PI * tt / 0.09) * 0.03, pan); } };
for (let i = 0; i < 14; i++) chirp(7.6 + i * 0.37 + 0.1 * rnd(), 2600 + 500 * rnd(), 0.5 * rnd());
buzz2(8.6, 0.07, panX(212)); buzz2(8.62, 0.07, panX(588));
tone(8.62, 1760, 0.25, 0.04, 0, 0.002, 14); tone(8.72, 2350, 0.3, 0.03, 0, 0.002, 12);
// chill wakes and stretches, replies ROME!
sweep(9.3, 0.5, 0.03, panX(588), 0.02, 0.15);
sweep(10.4, 0.25, 0.04, panX(588), 0.1, 0.5);
// overthinker jolts awake
sweep(10.15, 0.3, 0.05, panX(212), 0.05, 0.4);
thump(10.3, 0.06, 70, panX(212));
typing(0.4, 10, 20);
typing(11.1, 24, 22);
