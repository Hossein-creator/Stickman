# New Instagram account — reference style (10 example reels)

Separate from @moneypsych.explained. Nothing here is shared with the money account.

All 10 reels come from one creator: **@neuronvisuals** (TikTok), watermark "NEURONVISUALS".
Set 1 (ref1-5) = Instagram downloads 2026-10-23. Set 2 (ref6-10) = TikTok downloads (end with a 3-4 s TikTok logo outro that is NOT part of the creator's design).
ref9 is the TikTok copy of ref1.

Saved in `reference/`:
- `videos-set1/ref1-5.mp4`, `videos-set2/ref6-10.mp4` — the original videos
- `ref1..10-sheet.jpg` — 1 frame per second
- `sounds/ref1..10-sound.m4a` — the full sound of each video
- `sounds/ref1..10-spectrum.png` — sound picture (time left→right, pitch bottom→top)

## Niche
Self-improvement / mindset / discipline, told as **silent stickman metaphors**.
Main themes:
1. **Doer vs overthinker** (ref4 diving, ref6 ice skating)
2. **Action taker vs perfectionist** (ref3 brick wall, ref10 ladder)
3. **Discipline / habits** (ref5 same 5 minutes, ref2 5-minute tidy)
4. **Overthinking & anxiety** (ref7 pointing hands, 3 AM awake)
5. **Failure → success / hidden effort** (ref8 46 failed tests)
6. **Breaking free alone / self-reliance** (ref1/ref9 chain + rock + wings)
7. **Morning routine: winner vs loser** (user request 2026-10-23, like ref5): split screen, WINNER on top does the routine (alarm off, up, make bed, water, push-ups, out the door), LOSER on the bottom snoozes, scrolls the phone, sleeps, wakes up late and runs. Shared clock between the panels. Strong, repeatable format: can be redone for evenings, weekends, work, gym, money habits.
8. **Relationships** (user request 2026-10-23): love and effort as stickman metaphors. Contrast = present vs distracted (phones), effort vs neglect, listening vs waiting to talk, small daily acts vs grand gestures. First test: "The Plant" (a couple waters a plant with a red heart flower; the couple on phones lets it wilt). Rule: show love as a visible object (plant, flame, battery, bridge) that grows or dies with their actions. Reel 5 test: "The Bridge" (both build plank by plank and meet in a hug vs one builds alone and the gap stays).

Topic pattern: one bad habit vs one good habit, same situation, same time. Or one person vs the pressure on him.

## All 10 videos
| # | Len | Story | On-screen text |
|---|---|---|---|
| 1 / 9 | 12.5s | Crowd of chained grey men sit by rocks. One grows white wings, flies up, rock still chained to his foot. Then a second one gets wings. | "NOBODY CAME TO CUT HIS CHAIN." → "SO HE TOOK THE ROCK WITH HIM." |
| 2 | 11.9s | Split screen flats, 5:00 timer. Top: tidies in 5 min, guest happy. Bottom: shoves junk in closet, it bursts out when guest comes. | timer "0:25 … 5:00" |
| 3 | 13.9s | Perfectionist checks every brick with a red level; action taker builds a tall wall, climbs over, leaves. | "PERFECTIONIST" / "ACTION TAKER" |
| 4 | 13.4s | Two diving towers over dark water. Doer jumps (flip, splash, swims). Overthinker stands, stretches, never jumps. | "OVERTHINKER" / "DOER" |
| 5 | 11.5s | Split screen morning, 5:00 timer. Top: alarm off, push-ups, eggs, shower, ready. Bottom: snooze x2, late, no shower. End: both walk on city street at dusk. | "5 MINUTES / ALARM OFF, PUSH-UPS, EGGS, SHOWER, READY" vs "NO TIME / SNOOZE, SNOOZE x2, LATE, NO SHOWER" → "SAME 5 MINUTES. DIFFERENT DAY." |
| 6 | 12.5s | Ice rink. Overthinker clings to the wall rail the whole time. Doer falls again and again, gets up, ends skating smoothly. | "OVERTHINKER" / "DOER" |
| 7 | 12.5s | Man in spotlight. Pointing hands fly in one by one, each with a label; he grabs his head. Zoom into his eye → top view: he lies awake in bed, clock 3:07 → 3:08, hands from sides to folded on chest. | "THE PAST", "FAMILY", "EXPECTATIONS", "MONEY", "SELF DOUBT", "WHAT THEY THINK", "THE FUTURE", "OVERTHINKING" |
| 8 | 13s | White car tries a vertical loop. Test counter: crashes, falls, burns out (TEST 01, 02, 03, 04, 13 FAIL, 46 FAIL) until TEST 47 PASS; smoke, stickman climbs out, raises fist. | "EVERYONE SAW THE SUCCESS." → "NOBODY SAW THE 46 TESTS." + "TEST 47 / FAIL / PASS" |
| 10 | 12.5s | Action taker builds a rope ladder rung by rung while climbing up into a bright light hatch. Perfectionist levels one rung with a red level, then sits on the floor. | "PERFECTIONIST" / "ACTION TAKER" → "BUILD IT AS YOU CLIMB." |

## ACTION STYLE (user approved 2026-10-25, use for ALL new reels)

Reel 29 "they laughed" (remake of 23) adds emotion beats that fit this style: a crowd mocks the hero (HA bubbles + synth laughs), a setback in slow motion, a dark quiet beat with a heartbeat and a light beam that finds him, a comeback hit, then the laughter dies one by one.
User: "Story told by action, few words, action camera." Template: `videos/28-the-gap` (best), also 26-paper-walls, 27-the-storm.
User feedback on 27 (storm): "the actions speak more than the words, the couple video was not much nice" -> too many flying labels, the couple overlapped, messy poses.

**Story**
- The picture tells the whole story. Someone with the sound off and no text must understand it.
- No labels on objects, no counters unless the number IS the story. Feelings shown by body: turning away, looking back, sprinting back, kneeling, catching, hugging.
- Symbols instead of words when needed (red burst with "#@!" for a fight).
- One clear arc with a twist: problem -> it gets worse with every action -> a turn -> a big physical moment -> payoff image (e.g. gold seam where the crack was).
- Words only at the very end: 1 short line or 2 tiny lines, slammed in word by word, one key word red.
- No hook text needed; open on action (fight, sprint) in frame 1.

**Staging**
- Two characters never overlap except in a hug or a catch. Keep 100+ world units apart, profile view, big readable poses.
- Her: white with a hair bun (circle behind the head). Him: plain.
- Physical cause and effect: the world reacts to them (ground splits, slams shut, walls shatter).

**Action camera** (all in body.js, see 28)
- Camera keys per story time [t, scale, worldX, worldY, roll]; cuts feel like whip pans: push in on the face that acts, pan to the other.
- Time warp (slow motion ~0.33x) on the one big moment (leap, catch, impact); sound uses the same warp table.
- Impact kit on every hit: camera kick zoom + shake + roll, white flash (#flash), chroma split (SVG filter #chromaF on the world group, not CSS on the whole svg), shock ring, debris/pebbles.
- Speed lines + ghost trails (<use href="#fig">) when sprinting; parallax background and floor ticks when the camera travels.
- Vignette (#vig) and fade to black in the last 0.5 s.

**Sound**
- Silence and heartbeats in the emotional beat, punchy hits on actions: crack/slam = thump 36 Hz + noise burst, steps on every foot, whoosh into jumps, bells/chord on the payoff, a thump per slammed word.

**Copy from 28 when starting a reel:** tools/defs.svg (chromaF, gradients), tools/ctr.html (#fx, #vig, #flash, slam styles), and in body.js the warp (TS/story/realOf), camAt, hit() kicks, slam(), fade. Kit name clash list in DAILY-JOB.md.

## Set 3 (ref11-18), user sent 2026-10-25 via Telegram
Saved: `reference/videos-set3/ref11-18.mp4`, `reference/sheets3/ref11-18-sheet.jpg` (2 frames/s), `sheets3/detail.jpg` (full-size frames), `sounds/ref11-18-sound.m4a` + `-spectrum.png`, `sheets3/spectra-new.jpg`.
All @neuronvisuals TikTok downloads, 464x848. Story ends ~12.5 s, then a 4 s TikTok outro (not theirs, ignore).
ref14 = same as ref1/9 (chain + wings), ref16 = ref8 (car, 46 tests), ref18 = ref10 (ladder). **5 are new: 11, 12, 13, 15, 17.**

| # | Topic | Story | Text | Sound (hits/s, bed) |
|---|---|---|---|---|
| 11 | Friendship over time | Long dinner table under one hanging lamp, 10 friends + red candle in the middle. Counter AGE 18→20→…→30: friends stand up and leave one by one, chairs fade, table goes dark. At 30 only 2 are left; camera pushes in. AGE 30→70: they grow old (canes, bent backs) and still sit together. | "AT 18, YOU HAVE 10 BEST FRIENDS." → (types on) "AT 30, YOU HAVE / THE ONE WHO STAYED." + "AGE 18…70" counter | 0.7/s, soft steady pad -19 dB, rises a bit (-14) when only 2 are left |
| 12 | Introvert vs extrovert (social battery) | Party with string lights: battery HUD above each, introvert drains 94→0% (red), extrovert charges 35→100% ("WOO!" bubble). Cut at 4 s to two rooms split by a wall: introvert in warm lamp-lit armchair charges to 100%, extrovert alone in cold blue room drains to 3% (red), walks over and pulls the introvert out; introvert drains again and slumps. | Labels "INTROVERT" / "EXTROVERT", battery icon + % + lightning when charging, red under 20% | 2.0/s, party pulse first, then pops on each % jump and grab |
| 13 | Overthinker vs chill (same message) | Two beds, night window with moon, red digital clock 11:15 PM. Both get a phone card "BOSS: CAN WE TALK TOMORROW?". Chill replies "OK", sleeps (Zz). Overthinker lies awake, thought bubble stack grows (WHAT DID I DO? / IS IT THE EMAIL? / I HIT REPLY ALL… / AM I GETTING FIRED? / UPDATE MY RESUME / SELL THE CAR / LEARN TO FISH), clock runs to 7:00, window turns to sunrise. Morning card: "JUST WANTED TO SAY GREAT WORK :)". Chill wakes rested and stretches, overthinker falls asleep exhausted, wakes: "GREAT WORK… ON WHAT??" | "SAME MESSAGE." → "DIFFERENT NIGHT." + labels "OVERTHINKER" / "CHILL" | 1.6/s, phone buzz (grid pattern) at 0.3 s and 7.8 s, bed drops to near silence for the last line (-20 → -32 dB) |
| 15 | Motivation / discipline / obsession / ego | 4 men hang from one pull-up bar in spotlights, labels above: MOTIVATION, DISCIPLINE, OBSESSION, EGO. Timer 0:07→5:07. Motivation drops at 0:45 and sits, discipline at 1:22. Ego drops at 2:00, gets laughed at, rubs red hands, jumps back up at 2:50 with red hands and outlasts obsession. Each label turns dim grey when its man drops. | "WHO LETS GO LAST?" → (line 1 turns grey) "NEVER BET AGAINST A HURT EGO." + big timer | 0.5/s, steady low pad -20 dB, few hits (drops, jump) |
| 17 | Starter vs finisher | Cutaway ground (brown earth, dark sky). Starter digs a shallow hole, gives up, moves on: HOLE 1, 2 … 10, a row of small dents. Finisher digs ONE hole deeper and deeper (HOLE 1 the whole time), camera follows down, hits a glowing gold vein that lights the whole underground layer; dotted lines show the starter was always just above it. | Labels "STARTER" / "FINISHER", grey sub-labels "HOLE 9" / "HOLE 1" | 0.9/s, shovel hits, sparkle shimmer on gold (6.8 s) |
| 14 / 16 / 18 | (repeats of ref1, ref8, ref10) | same as above | same | 14 swells to -11 dB at the lift; 18 goes fully silent for "BUILD IT AS YOU CLIMB." |

### New things learned from set 3 (copy these techniques, write our own stories)
1. **Typewriter headline:** line 2 (the punchline) types on letter by letter in ~0.6 s (seen in 11, 13, 14, 16, 18: frames show "AT 30, YOU HA", "SO HE T", "BUILD IT AS YOU CL"). Add a key click per letter.
2. **Line 1 dims when line 2 arrives:** setup line goes grey (~45%), punchline is bright white (15, 11, 14).
3. **Live HUD per character:** battery icon + % (red under 20%, lightning when charging) (12); big timer counting up (15); AGE counter (11); HOLE counter under the label (17). The number tells the story on its own.
4. **Labels change state:** when a person quits, their label fades to dim grey, the winner's label stays white (15). Small grey sub-labels under the main label (17 "HOLE 9").
5. **Time passing in the background:** window goes night → moon → sunrise, red digital clock runs (13); people age (canes, bent backs) (11); chairs and lights fade out as people leave (11).
6. **Phone UI cards:** small iOS-style notification with a red app dot and sender "BOSS", a reply bubble "OK", thought bubbles stacking in a cloud (13). Messages = story without voice.
7. **Twist ending:** the last beat flips the meaning: the scary message was praise (13), the ego wins (15), the one friend who stayed (11), gold right under the quitter (17). Better than a plain moral.
8. **Second accent color:** gold/yellow glow for reward (17 gold vein, warm lamp in 12). Rule stays one accent per video: red for pain/danger/love, gold for reward.
9. **Warm vs cold rooms:** warm lamp light = safe/charging, cold blue room = empty/draining (12).
10. **Mid-video location cut:** party → two rooms at 4 s (12), still the same two characters and HUD.
11. **Camera:** slow push-in on the final pair (11), camera follows the action down/up (17, 18), stays locked otherwise.
12. **Fade to black** in the last ~0.5 s (all 8: ~12.0-12.6 s). Then loop.
13. **Crowd elimination:** many start, one or two remain (11 friends, 15 four on the bar, 14 crowd of chained men). The survivors glow white, quitters turn grey and sit down.
14. **Sound:** steady cinematic pad at -15 to -20 dB, 0.5-2 hits/s; phone buzz pattern for messages; bed drops to near silence for the twist line (13, 18) or swells at the big moment (14).

### Topic ideas from set 3 (our own versions, not 1:1)
- Friendship over time: AGE counter, crowd thins, one stays (e.g. a group photo frame that loses people, or a bench).
- Social battery: introvert vs extrovert, battery HUD, warm vs cold room.
- Same message, different night: any small trigger (a "seen" with no reply, "we need to talk") and two reactions over one night.
- Who lasts longest: four inner drives on one challenge (plank, holding a rope, carrying a weight) with a twist winner.
- Starter vs finisher: one deep effort vs many shallow starts, with a hidden reward right under the quitter.

## Format rules
- **Length 11–14 s** (without outro). Loops. 9:16 vertical.
- **One contrast**, two characters or one character vs a force.
- **Labels, not sentences**: 1–2 word role labels above each guy.
- **Punchline at the end** (refs 1, 5, 8, 10): 1–2 short lines, line 2 appears later, ends with a period. Sometimes no text at all (ref6, ref7): the picture says it.
- **Counters** create story: timer 5:00 (2, 5), clock 3:07 (7), TEST 01→47 (8), elevator floor (ours).
- **No voice** (speech check found 0 words). Music bed + sound effects only.
- Watermark: small, wide-spaced letters, bottom middle, very faint.

## Characters
- Classic stickman: round head, thick limbs, black outline, no face (ref7 top view has one big eye).
- **Hero = bright white + glow**. **Loser / stuck = grey, dim, slumped**.
- One **red accent** per video: chain, level, board tips, alarm clock, red ice line, car tail lights/track edge, red level on ladder.
- Body language tells it all; small icons: "!", "zzz", smoke curl, wings, hands on head.

## Backgrounds
1. **Black void stage** (1, 3, 4, 7, 8, 9, 10): pure black, top spotlight cones, glossy floor reflection, dust/light glow. Props are simple grey/beige 3D-ish objects (rocks, bricks, towers, ladder, loop track with scaffold, light hatch).
2. **Dark arena** (6): grey rink wall, top spotlights, reflective ice with skate marks.
3. **Low-poly rooms at dusk** (2, 5, 7 bed scene): navy/purple walls, sunset or night window, warm lamp, split screen with round timer badge in the middle.

## Colors
Black bg, white heroes, grey #8a8a8a stuck guys, one red #d62a2a accent. Rooms: navy #2c2f4a, purple #4a4466, sunset orange→purple, warm yellow door light.

## Typography
Small **pixel / square mono caps**, wide letter spacing, white, top third. Sub-labels smaller grey. FAIL/PASS in a small red/white box (ref8).

## Motion
- Smooth physics-like moves: flaps, flips, splash, falls on ice, bricks/rungs placed one by one, car loop + crash + smoke.
- Glow trails / motion blur on fast moves.
- Reveal-by-addition: things pop in one by one on a beat (pointing hands in ref7 every ~0.64 s).
- Camera mostly locked; special transitions: zoom into the eye (ref7), camera follows climber up (ref10), whip to counter (ref8).
- Arc: setup 0–3 s → contrast grows 3–9 s → payoff + text 9–13 s. Final frame holds so it loops.

## Sound and sound effects
Studied from the spectrum pictures + a hit counter (hits/sec = sharp sound effects).

**Music bed (all 10):** a deep, dark ambient drone / bass pad under everything (strong energy below ~300 Hz, soft sustained chords above). No drums, no beat drops, no melody up front. Cinematic and calm; it makes the scene feel heavy and serious. Bed stays loud and steady in refs 1, 2, 4, 5 (quiet floor about -16 to -19 dB).

**Sound effects synced to every action (foley):**
| Ref | Effects heard | Hits/sec |
|---|---|---|
| 1 / 9 | wing flaps (soft whooshes), chain rattle, low rumble when he lifts the rock | ~0.1–0.4 |
| 2 | small pops/blips for each item picked up, door, closet burst | ~0.3 |
| 3 | brick taps/clicks on every brick + short metal "ping" of the level | **2.7** |
| 4 | footsteps on board, big splash whooshes at each dive (1.7 s, 5.3 s, 8.2 s), water | ~0.1 + whooshes |
| 5 | alarm clock beeping (high pitched, repeats at 0 s, 2.6 s, 4.5 s), shower, then outdoor city ambience with **bird chirps** at the end | ~0.4 |
| 6 | skate scrapes, falls/thuds on ice, wall bumps | ~1.1 |
| 7 | a hit/whoosh for every pointing hand (every ~0.64 s, rhythmic), then quiet night room tone + clock | ~1.0 |
| 8 | car engine revs (rising/falling tones), crash bangs, metal scrape, smoke hiss, rising tone into PASS | ~0.8 |
| 10 | hammer/knock on every rung (very dense 0–7.6 s), then everything goes quiet (bed fades to near silence by 11 s) for the punchline | **3.1** |

**Sound rules to copy:**
1. Every visible action gets its own small sound (step, tap, click, beep, whoosh). Busy scenes have 1–3 hits per second.
2. Repeated action = repeated, rhythmic sound (bricks, rungs, hands) so it feels like a beat even without drums.
3. Real-world "signal" sounds tell the story: alarm beeps, clock, engine, splash, birds = new morning.
4. Before or at the punchline the sound gets **quieter or opens up** (ref10 goes silent, ref5 opens to birds) so the text hits.
5. No voice, no lyrics, no trending song needed. Music is just a low dark pad.

## Smooth stickman motion (user feedback 2026-10-23: "make the movement more smooth")
- Never cut between poses: every pose is blended over time (Gaussian blend of the pose ~0.1 s wide), so moves start and stop softly.
- Head and arms trail the body by ~0.05 s (follow-through), so it moves like a body, not a puppet.
- Always alive: slow breathing and a tiny sway when standing or sitting; no frozen frames.
- Elbows always bend the natural way (down and back), so arms never flip.
- Feet stay planted; steps lift the foot in an arc; the hip bobs with each step.
- Big actions get a small wind-up first (crouch before placing, lean before a hug).

## Instagram full-screen safe area (user feedback 2026-10-24)
Video stays 1080x1920 (9:16), but on tall phones Instagram crops ~100 px off each side and its UI covers the top ~200 px, the bottom ~420 px and the right icon strip (x>930, y 1080-1500).
- All text inside x 120-960, y 220-1500. Headline starts at y 222, never at the very top.
- Split-screen panels: 920 wide at x 80 (scale 1.15), top panel y 400-923, bottom y 983-1506, badge at y 953. Labels at left 124 inside the panel.
- Check every reel with a crop overlay before sending.

## How we make this (code only, no AI images)
Stickmen, props, rooms = SVG + GSAP (HyperFrames). Glow via blur. Music pad + every SFX synthesized in code (`tools/sound.mjs` per video). Copy every technique (typewriter line, HUD counters, label states, time passing, twist endings, sound), but write our own topics and scenes; never repost a @neuronvisuals scene 1:1 (reposts get flagged and lose reach).

## Our reels
- 01 Elevator vs Stairs ("MOTIVATION" / "DISCIPLINE", "THE ELEVATOR NEVER CAME. / THE STAIRS WERE THERE ALL ALONG.") — `ready/01-elevator-vs-stairs.mp4`
- 02 The Lock ("OVERTHINKER" / "DOER", "THE LOCK WAS NEVER CLOSED. / ONLY ONE OF THEM CHECKED.") — `ready/02-the-lock.mp4`
- 03 Morning Routine (split screen "WINNER" / "LOSER", "SAME ALARM. / DIFFERENT LIFE.") — `ready/03-morning-routine.mp4`
- 04 The Plant — relationship test (split screen "PRESENT" / "DISTRACTED", DAY 1→365, "SAME TABLE. / NOBODY KILLED IT. / THEY JUST STOPPED WATERING IT.") — `ready/04-the-plant.mp4`
- 05 The Bridge — relationship, smoother rig v2 (split "BOTH BUILD" / "ONE BUILDS", "LOVE IS A BRIDGE. / ONE PERSON CAN'T BUILD / A BRIDGE FOR TWO.") — `ready/05-the-bridge.mp4`
- 06 The Box: hidden failures (counter ATTEMPT 01/02/03/17/46 FAIL, 47 PASS; every fall leaves a scuff on the box, scuffs turn red at the end; "EVERYONE SAW THE JUMP. / NOBODY SAW THE 46 FALLS."), first reel built inside the safe area — `ready/06-the-box.mp4`
- 07 The Listener: relationship, seated table split ("LISTENS" / "WAITS TO TALK", speech bubbles, "SAME CONVERSATION. / ONE LISTENED. / ONE WAITED TO TALK.") — `ready/07-the-listener.mp4`
- 08 The Battery: relationship, couch split with a love battery ("CHARGE IT" / "DRAIN IT", 40%→100% vs 60%→3%, "SMALL THINGS CHARGE IT. / SMALL THINGS DRAIN IT.") — `ready/08-the-battery.mp4`
- 09 The Backpack: overthinking, single stage (thought bricks WHAT IF, THE PAST, THEIR OPINION, TOO LATE, NOT ENOUGH stack on his back until he drops them; "YOU WERE NEVER TOO WEAK. / YOU WERE CARRYING TOO MUCH.") — `ready/09-the-backpack.mp4`
- 10 The Circle: comfort zone, single stage (a light circle grows with each step out, counter STEPS OUT; "YOUR COMFORT ZONE GROWS / EVERY TIME YOU LEAVE IT.") — `ready/10-the-circle.mp4`
- 11 The Wall: relationship, single stage (unsaid words FINE. NOTHING. WHATEVER. NOT NOW. NEVER MIND. LATER. are thrown as bricks into a wall between two people; counter UNSAID; "NO ONE MEANT TO BUILD A WALL. / THEY JUST STOPPED TALKING.") — `ready/11-the-wall.mp4`
- 12 The Thread: relationship, single stage (red thread between two people turned away thins over DAY 01-30, he turns first and walks over, thread glows back; "NOBODY WINS THE SILENCE. / SOMEONE JUST TURNS FIRST.") — `ready/12-the-thread.mp4`
- 13 The Seed: hidden effort, cutaway soil (waters 89 days, nothing above ground, roots grow underneath, shoot breaks through on day 90; "IT GREW THE WHOLE TIME. / YOU JUST COULDN'T SEE IT.") — `ready/13-the-seed.mp4`
- 14 The Path: discipline, single stage (he walks the same line 5 laps and wears a glowing path while the other sits with a MOTIVATION bar stuck near 13%; "MOTIVATION NEVER SHOWED UP. / THE PATH WAS BUILT ANYWAY.") — `ready/14-the-path.mp4`

Reels 07-17 were scheduled in Metricool. From 2026-10-25 on, new reels go to the user's Telegram with caption + post time (no Metricool). Daily routine: `DAILY-JOB.md`.
- 15 The Umbrella: relationship, single stage in rain (he tilts the one red umbrella over her and gets soaked, she pulls him in and they share it; "LOVE ISN'T STAYING DRY. / IT'S MAKING ROOM FOR TWO.") — `ready/15-the-umbrella.mp4`
- 16 The Dominoes: habits, single stage with camera pull-back (one flick on a tiny domino, 8 dominoes growing 1.55x up to a giant red one, counter DAY 001-365; "EVERY BIG RESULT / STARTED WITH ONE SMALL PUSH.") — `ready/16-the-dominoes.mp4`
- 17 The Leash: distraction, single stage (walks to a glowing GOAL door, every phone buzz stops him and he walks backward staring at it, counter NOTIFICATIONS; throws the phone away and walks in; "YOU'RE NOT LAZY. / YOU'RE DISTRACTED.") — `ready/17-the-leash.mp4`
- 18 The Fire (from ref11): 8 friends around a campfire, AGE 18-70 counter, 6 walk off into the dark and the fire shrinks; the last friend stands as if to leave, then feeds the fire and sits back down; both grow old ("AT 18, THE FIRE IS CROWDED. / AT 70, ONE FRIEND STILL KEEPS IT WARM.") — `ready/18-the-fire.mp4`
- 19 Social Battery (from ref12): battery HUD INTROVERT / EXTROVERT; party drains him, warm lamp charges him; she drains alone in cold light, walks over and sits by his chair, both charge ("SOME PEOPLE DRAIN YOU. / THE RIGHT ONE CHARGES YOU.") — `ready/19-social-battery.mp4`
- 20 Same Text (from ref13): two beds, red clock 11:14 PM-7:14 AM, "LOVE: WE NEED TO TALK TOMORROW."; chill sleeps, overthinker's thought cloud grows until sunrise; morning text "ABOUT OUR TRIP :) PARIS OR ROME?" ("SAME TEXT. / ONE SLEPT. ONE SPIRALED.") — `ready/20-same-text.mp4`
- 21 Who Holds On (from ref15): 4 men on a bar, labels TALENT / MOTIVATION / DISCIPLINE / DOUBTED dim as they drop, timer 0:07-5:07; DOUBTED falls, hears "TOLD YOU.", jumps back with red hands and lasts longest ("WHO HOLDS ON LONGEST? / THE ONE THEY SAID COULDN'T.") — `ready/21-who-holds-on.mp4`
- 22 The Well (from ref17): cutaway ground, STARTER (HOLE 1-6, shallow) vs FINISHER (HOLE 1, digs deep), water layer lights up under every hole, dotted lines ("THE WATER WAS UNDER EVERY HOLE. / ONLY ONE KEPT DIGGING.") — `ready/22-the-well.mp4`
- 23 Carved Steps (from ref1/14): crowd at the foot of a cliff, he chisels steps and climbs into the light, a second man follows ("NOBODY THREW HIM A ROPE. / SO HE CARVED HIS OWN STEPS.") — `ready/23-carved-steps.mp4`
- 24 The Launch (from ref8/16): rocket, ATTEMPT 01-63 FAIL/PASS, explosions, montage, lift-off ("YOU SAW ONE LAUNCH. / NOT THE 62 EXPLOSIONS.") — `ready/24-the-launch.mp4`
- 25 The Stairs (from ref10/18): perfectionist sands one perfect block with a red level, action taker builds crooked stairs into a lit door ("NO STEP WAS PERFECT. / EVERY STEP WAS TAKEN.") — `ready/25-the-stairs.mp4`
- 26 Paper Walls (TEST, action style): sprints through EXCUSES/FEAR/DOUBT/THEIR OPINION, freezes at COMFORT ZONE, slow-mo smash, it was paper ("THE WALLS WERE PAPER. / YOU JUST HAD TO RUN.") — `ready/26-paper-walls.mp4`
- 27 The Storm (TEST, couple, action style; user: not nice, too many words) — `ready/27-the-storm.mp4`
- 28 The Gap (TEST, couple, APPROVED style): fight, ground splits as they walk away, she looks back, he leaps, falls short, she catches him, ground slams shut with a gold seam ("IT TAKES TWO / TO CLOSE THE GAP.") — `ready/28-the-gap.mp4`
- 32 Wait For It ("generiere" remake of a 342x Short, relationship): she sits grey, he paints her face badly, she paints him back, colour returns ("HE HAD NO IDEA HOW. / HE JUST WANTED YOU TO SMILE.") — `ready/32-wait-for-it.mp4`, source https://youtube.com/shorts/6MNj3FMnLpU
- 33 Let Her Go (remake of a 14.3x Short, relationship): rope from her hand to his wrist, 3 jealousy tests, he unties it and lets it fall, she runs back and takes his hand ("I DON'T HOLD ANYONE. / WHO WANTS TO STAY, STAYS.") — `ready/33-let-her-go.mp4`, source https://youtube.com/shorts/u2VWAKaAvNg
- 34 3 AM Question (remake of a 10.6x Short, relationship): clock 03:00/03:14/03:41, poke, lamp, pillow; he pulls her under the blanket ("WHAT IF I WAS ANNOYING? / WE'RE TESTING IT NOW.") — `ready/34-3am-question.mp4`, source https://youtube.com/shorts/OtLRzAoyXtE
- 35 Not A Monster (remake of a 7.6x Short, people can change): dark spiky stranger, crowd backs off, he returns a kid's ball and catches a falling crate, spikes fall off, the kid takes his hand ("PEOPLE CAN CHANGE. / IF YOU LET THEM.") — `ready/35-not-a-monster.mp4`, source https://youtube.com/shorts/Rl2fkzku-kQ
- 36 Bridge For Two (one-to-one remake of a reference the user uploaded 2026-10-27, roles swapped): two panels, BOTH BUILD (they build plank by plank, meet, hug, red heart) vs ONE BUILDS (she scrolls, he builds alone, TOO FAR, ALONE, breaks down) ("LOVE IS A BRIDGE. / ONE PERSON CAN'T BUILD / A BRIDGE FOR TWO.") — `ready/36-bridge-for-two.mp4`
- 37 Monday Morning (one-to-one remake of a reel the user uploaded 2026-10-28, 3/4 bedroom view from the foot of the bed like the reference, static camera + push-in): alarm 06:00, slap slap, head glued to the pillow stretches like gum and snaps him back twice, third try he tears it free, bits stay on the pillow ("MONDAY, 06:00. / THE PILLOW FIGHTS BACK.") — `ready/37-monday-morning.mp4`
- 38 Spear Stairs (one-to-one remake of a reel the user uploaded 2026-10-28, 16 s, realistic dusk: sky gradient, 3 mountain ranges with parallax, mist, jagged rock): grey crowd with spears on a cliff, he jumps to the tower, every spear that sticks becomes a step (WORK, LEARN, BUILD, GROW, SUCCESS labels light up), slow-mo flip onto the top, kneels by the gold trophy. User: at the end everyone goes quiet -> drums stop, crowd lowers spears and bows heads, one spear drops, wind + heartbeat ("THEY THREW SPEARS. / HE BUILT STAIRS.") — `ready/38-spear-stairs.mp4`
- 39 Don't Follow Blindly (one-to-one remake of a reel the user uploaded 2026-10-28, rendered 60 fps, quality delivery): endless blindfolded crowd in 4 depth rows marches off a cliff (feet planted, phase from position, row reflections), one takes his red blindfold off, sees the edge, turns and holds them back, a simulated push chain slides him to the edge, slow-mo fall, the conga keeps marching off ("DON'T FOLLOW BLINDLY. / OR YOU'LL PAY THE CONSEQUENCES.") — `ready/39-dont-follow-blindly.mp4`
