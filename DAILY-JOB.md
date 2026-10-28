# Daily job: 4 new stickman reels, sent to Telegram for the user to post

Runs every day. Makes **4 new reels** for @silent.stickman: **2 relationship + 2 other topics**
(discipline, overthinking, doer vs overthinker, hidden effort, comfort zone, habits, self-reliance...).
Sends them to the user's Telegram bot **the day before**, each with its caption and the time to post it tomorrow. The user posts them by hand. **No Metricool** (user, 2026-10-25: "dont push my videos to metricool, send them to me in telegramm with caption and waht time should i post them").

When the user writes **"generiere"**, follow `GENERATE.md` instead (viral remakes, virality check first).

## Hard rules
- **Winner format (user, 2026-10-28):** reel 36 Bridge For Two ("LOVE IS A BRIDGE" split screen) was by far the best: millions of views, many comments, likes, reposts and shares. At least 1 of every 4 reels uses this format (see `REFERENCE-ANALYSIS.md` → WINNER FORMAT, backlog there).
- Never touch the money account @moneypsych.explained, its skills, scheduled tasks, Metricool posts or memory files.
  - Never create, edit or delete Metricool posts.
- Never log in or type passwords.
- Code only (SVG + GSAP in HyperFrames, sound synthesized in code). No AI images or AI video. No voice.

## Steps
1. **Read first:**
   - `REFERENCE-ANALYSIS.md`, all of it: style, rig v2 smooth motion, the safe area, sound rules, and the "Our reels" list so no topic repeats.
   - `PROFILE.md`.
2. **Pick 4 new ideas:** 2 relationship, 2 other. **Use the ACTION STYLE** (REFERENCE-ANALYSIS.md, approved 2026-10-25): story told by action, almost no words, action camera. Start each reel from `videos/28-the-gap`.
   - Each idea is one contrast, shown as a visible metaphor object that grows or dies.
   - The punchline is 1–2 short lines that end with a period.
   - Don't reuse a scene or headline from "Our reels".
   - Use the set 3 techniques in REFERENCE-ANALYSIS.md ("New things learned from set 3"): typewriter punchline, line 1 dims, a live HUD counter, label states, a twist ending, fade to black in the last 0.5 s.
3. **Build each reel** in `videos/NN-slug/`. NN is the next free number.
   - Start from `videos/28-the-gap/tools` (action style: camera keys, slow motion, impact kit, slam text). Older templates below only for scene ideas:
   - Copy the closest template:
     - single black stage with reflection → `videos/06-the-box` (or 09, 10)
     - split screen → `videos/03-morning-routine` or `07-the-listener`
     - seated couple → `04-the-plant`, `07-the-listener` or `08-the-battery`
   - Keep the template's head, the rig v2 section and the timeline pattern: one paused GSAP timeline `window.__timelines["main"]` driven by a proxy clock, seek-safe.
   - Write a new scene body.
   - Write `tools/sound.mjs`: a dark pad bed plus one sound per visible action. It goes quieter before the punchline. Run it to make `assets/audio/mix.wav`.
   - **Faster for single-stage reels: the kit** (`tools/kit/`).
     - Write only `videos/NN-slug/tools/body.js` (scene + render + timeline), optional `tools/ctr.html` (counter) and `tools/defs.svg` (extra gradients), and `tools/sfx.mjs` (bed + events; helpers tone, noise, sweep, thump, wood, step, click, bell, bed, typing are available).
     - Then run `node tools/kit/build.mjs videos/NN-slug`. It creates the project files, `index.html` and `mix.wav`.
     - Examples: `videos/15-the-umbrella`, `16-the-dominoes`, `17-the-leash`.
     - To move the camera, set the transform on `E("svg").children[1]` (see 16-the-dominoes).
   - **Before you create a folder, check that no other run is using the same number or slug.**
   - Length 12–14 s, 1080×1920.
4. **Check:**
   - Run `npx -y hyperframes@0.8.181 snapshot` at 4–5 moments.
   - Look at each image: arms bend naturally, nothing overlaps the head, labels aren't mirrored in the reflection.
   - All text stays inside x 120–960 and y 220–1500.
   - Fix anything wrong before you render.
5. **Render:**
   - Run `npx -y hyperframes@0.8.181 render -o renders/NN-slug.mp4 -q looks -f 30`.
   - Copy the MP4 to `ready/NN-slug.mp4`.
   - Write the caption to `caption.txt` and `ready/NN-slug-caption.txt`.
     - Caption shape: 2–3 story lines, one plain truth line, one ask (comment / send this), 3 hashtags.
     - No em dashes, no AI slop words.
6. **Pick the post time** for each reel: TOMORROW (Berlin) at 10:00, 12:00, 16:00, 18:00.
   - Check the posting log below so no two reels share a slot. If a slot is taken, use 14:00 or 20:00.
   - Alternate topics: relationship, other, relationship, other.
7. **Send to Telegram:**
   - Run `node C:/Users/ahmad/OneDrive/Documents/stickman-mindset/tools/telegram-send.mjs ready/NN-slug.mp4 ready/NN-slug-caption.txt "Tue 27 Oct, 10:00 (Berlin)"`.
   - The message shows "POST: <time>" and then the caption.
   - Run the tool only. Never edit it. If it says NOT CONFIGURED or NO CHAT YET, stop and report that line.
8. **Write it down:**
   - Add each reel to "Our reels" in `REFERENCE-ANALYSIS.md`.
   - Add one line per reel to the posting log below: post time, number, title, topic, "sent to Telegram".

Kit note: body.js shares one scope with the kit head, so never declare these names again: FL, BX0, BX1, BTOP, TOPF, SX, NS, LEG, THIGH, SHIN, UARM, FARM, TORSO, NECK, HEADR, KER, ARMS, DUR, P, E (a clash = blank black snapshots).

## Posting log
Lines up to 17 were scheduled in Metricool. 2026-10-25 ~10:42: all still-pending ones (08, 10-17) turned into Metricool drafts; same slots go to Telegram via `node tools/send-queue.mjs` (needs the bot config). 09 Backpack was already published. From now on: sent to Telegram.
- 2026-10-24 18:00: 07 The Listener (relationship)
- 2026-10-25 10:00: 09 The Backpack (overthinking)
- 2026-10-25 18:00: 08 The Battery (relationship)
- 2026-10-26 18:00: 10 The Circle (comfort zone)
- 2026-10-25 12:00: 11 The Wall (relationship)
- 2026-10-25 16:00: 13 The Seed (hidden effort)
- 2026-10-26 10:00: 12 The Thread (relationship)
- 2026-10-26 12:00: 14 The Path (discipline)
- 2026-10-26 16:00: 15 The Umbrella (relationship)
- 2026-10-27 10:00: 16 The Dominoes (habits)
- 2026-10-27 12:00: 17 The Leash (distraction)
- 2026-10-27 16:00: 18 The Fire (relationship/friendship), sent to Telegram
- 2026-10-27 18:00: 21 Who Holds On (discipline), sent to Telegram
- 2026-10-28 10:00: 19 Social Battery (relationship), sent to Telegram
- 2026-10-28 12:00: 22 The Well (consistency), sent to Telegram
- 2026-10-28 16:00: 20 Same Text (relationship/overthinking), sent to Telegram
- 2026-10-28 18:00: 23 Carved Steps (self-reliance), sent to Telegram
- 2026-10-29 10:00: 24 The Launch (hidden failures), sent to Telegram
- 2026-10-29 12:00: 25 The Stairs (perfectionism), sent to Telegram
- 2026-10-29 16:00: 32 Wait For It (relationship), sent to Telegram
- 2026-10-29 18:00: 35 Not A Monster (people can change), sent to Telegram
- 2026-10-30 10:00: 33 Let Her Go (relationship), sent to Telegram
- 2026-10-30 12:00: 34 3 AM Question (relationship), sent to Telegram
- 2026-10-30 16:00: 37 Monday Morning (relatable humor), sent to Telegram
- 2026-10-30 18:00: 38 Spear Stairs (hate as fuel / success), sent to Telegram
- 2026-10-31 10:00: 39 Don't Follow Blindly (think for yourself), sent to Telegram
