# Rules for Claude

## This repo is Claude's folder
User, 2026-10-27: "diese repo ist deine ordner du speicherst und notierst nichts auf dem rechner"
(this repo is your folder, you save and note nothing on the computer).

- Save every note, plan, log, idea and result **in this repo**, then commit and push.
- User, 2026-10-27: "nein nicht lokal alles was sich hier befinden commitest du in meine repo". Never leave changes only on the machine: every change gets committed and pushed right away.
- Do **not** save notes or memory on the machine: no files outside the repo, no local memory files, no scratch notes that are meant to last.
- Temporary build files (renders, snaps, work dirs) are fine; they are gitignored and thrown away.
- Running notes go in `NOTES.md`. Posting log stays in `DAILY-JOB.md`. Style and niche notes stay in `REFERENCE-ANALYSIS.md`.
- Never commit secrets (tokens, passwords). They stay out of the repo (see `.gitignore`).

## "generiere"
When the user writes "generiere": run `GENERATE.md` (find viral videos with `ig-viral`, check virality first, remake them one to one in our style, **only relationship**: user 2026-10-30 "die relationships videos explodieren gerade bleibe in diese nische").

## When a video is finished
User, 2026-10-27: "wenn du mit dem video fertig bist schickst du mir nur das video mit passende und virale hashtags und caption auf telegram hier sagst du nur das video wurde erstellt."
- Send ONLY the video to Telegram, with the caption and fitting, viral hashtags (6-8 tags: niche + broad reach, e.g. #relationship #love #relationshipgoals #couplegoals + topic tags + #stickman #animation).
- In the chat, only say: "Das Video wurde erstellt." Nothing else.
- User, 2026-10-27: "merke dir ab jetzt dass du nur auf telegram schicken musst". Videos go ONLY to Telegram, never as a file in the chat. Send only the newest video, never old reels again.
- Telegram send: `node tools/telegram-send.mjs ready/NN-slug.mp4 ready/NN-slug-caption.txt "<post time>"`.
- In the cloud session this needs `api.telegram.org` allowed in the environment's network settings and the bot token as env var `TELEGRAM_BOT_TOKEN` (+ `TELEGRAM_CHAT_ID`); write them into `~/.stickman/telegram.json` only for the run, never into the repo.

## Start of every session
Read `CLAUDE.md`, `NOTES.md`, `README.md` and, for reel work, `DAILY-JOB.md` + `REFERENCE-ANALYSIS.md`.
