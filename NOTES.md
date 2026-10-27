# Notes

Claude's running notes. Newest on top. Everything Claude wants to remember goes here (or in the matching file), not on the computer.

## 2026-10-27
- Reels 32-35 sent to Telegram too (hashtags upgraded to 8). Telegram works from the cloud now (api.telegram.org allowed). Bot @Stickmen1_bot, chatId 7190934039. Token is NOT in the repo: put it in ~/.stickman/telegram.json only for the run (from env TELEGRAM_BOT_TOKEN or ask the user to set it in the environment settings). Reel 36 sent.
- User uploaded a reel ("LOVE IS A BRIDGE", two panels) and asked for the exact same video with the roles swapped (she scrolls, he builds). Done as reel 36, rebuilt in code (two clipped panels, no camera, own layout code in body.js).
- First "generiere" run done: reels 32-35 (3 relationship + 1 other) in `ready/`, check in `viral/2026-10-27-check.md`.
  - Only YouTube Shorts could be measured (IG/TikTok need a login). Video hosts are blocked here, so beats came from titles + top comments.
  - Render here: jsdelivr is blocked, so render from a copy with a local gsap (npm pack gsap@3.14.2). Project files keep the CDN link.
  - Telegram send not possible from the cloud session (no `%USERPROFILE%/.stickman/telegram.json`). Send from the PC: `node tools/telegram-send.mjs ready/NN-slug.mp4 ready/NN-slug-caption.txt "<time>"`.
  - Kit clash hit again: `SX` is a kit name (blank black frames). Check the list in DAILY-JOB.md before naming.
- User: "generiere" = find the most viral videos (YT Shorts, IG Reels, TikTok, any niche) with ig-viral, check virality first (skill, else external tool/plugin), remake one to one in our style, mostly relationship. Written in `GENERATE.md`. Defaults until the user says otherwise: 3 relationship + 1 other per run, delivery via Telegram.
- User: this repo is my folder. Save and note nothing on the computer. Rule written in `CLAUDE.md`.
