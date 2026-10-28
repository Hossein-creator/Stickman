# Notes

Claude's running notes. Newest on top. Everything Claude wants to remember goes here (or in the matching file), not on the computer.

## 2026-10-28
- **WINNER:** user says reel 36 Bridge For Two + its reference were by far the best (millions of views, comments, likes, reposts, shares) and wants more of this content. Formula written down in `REFERENCE-ANALYSIS.md` (WINNER FORMAT, top of file) with a backlog; GENERATE.md and DAILY-JOB.md now put this format first. Reel 40 "Love Is A Boat" made in the same format (boat turns via scaleX flip of the boat group = going in circles in side view; rowing stroke() drive/recovery; seek-safe boat x integration).
- User on reel 39: "du hast vergessen die nachricht und den zitat am ende anzeigen lassen". From now on every reel ends with an end card: the message big in the middle + a fitting real quote (with author), scene dimmed behind.
- Reel 39: user wants smoother + top quality. Render high quality with `-q delivery -f 60` (scratch rr60.sh = rr.sh with those flags). Walk cycles: phase = x / (4*stride) so feet never slide; crowd push chain = fixed-step simulation at init (seek-safe).
- Reel 38 Spear Stairs: remake of the 2nd user upload. Kit now takes an optional `tools/dur.txt` (reel length, default 14) for remakes longer than 14 s.
- Reel 37 Monday Morning: remake of the user upload. 1st version: user said "bett hängt in der luft, kamera winkel scheisse, realistischer". Redone: room drawn on the reference frame itself (SW() maps reference screen spots 1080x1920 to world), bed frame standing on a floor, mattress side, soft gradients, pillow, nightstand with drawer, 3D alarm clock, lumpy blanket in front, static camera at the reference angle + push-in at the end. Use this for "same camera as the reference".

## 2026-10-27
- Highlights made for @silent.stickman (the IG linked in Metricool): START HERE (3 stories), BREAKDOWNS (3 reel breakdowns, new magnifier cover), LOVE, DISCIPLINE, OVERTHINK (intro story each). Files + plan in `profile-kit/final/highlights/`. Sent in chat, not Telegram (user asked "hier").
- Reels 32-35 sent to Telegram too (hashtags upgraded to 8). Telegram works from the cloud now (api.telegram.org allowed). Bot @Stickmen1_bot, chatId 7190934039. Token is NOT in the repo: put it in ~/.stickman/telegram.json only for the run (from env TELEGRAM_BOT_TOKEN or ask the user to set it in the environment settings). Reel 36 sent.
- User uploaded a reel ("LOVE IS A BRIDGE", two panels) and asked for the exact same video with the roles swapped (she scrolls, he builds). Done as reel 36, rebuilt in code (two clipped panels, no camera, own layout code in body.js).
- First "generiere" run done: reels 32-35 (3 relationship + 1 other) in `ready/`, check in `viral/2026-10-27-check.md`.
  - Only YouTube Shorts could be measured (IG/TikTok need a login). Video hosts are blocked here, so beats came from titles + top comments.
  - Render here: jsdelivr is blocked, so render from a copy with a local gsap (npm pack gsap@3.14.2). Project files keep the CDN link.
  - Telegram send not possible from the cloud session (no `%USERPROFILE%/.stickman/telegram.json`). Send from the PC: `node tools/telegram-send.mjs ready/NN-slug.mp4 ready/NN-slug-caption.txt "<time>"`.
  - Kit clash hit again: `SX` is a kit name (blank black frames). Check the list in DAILY-JOB.md before naming.
- User: "generiere" = find the most viral videos (YT Shorts, IG Reels, TikTok, any niche) with ig-viral, check virality first (skill, else external tool/plugin), remake one to one in our style, mostly relationship. Written in `GENERATE.md`. Defaults until the user says otherwise: 3 relationship + 1 other per run, delivery via Telegram.
- User: this repo is my folder. Save and note nothing on the computer. Rule written in `CLAUDE.md`.
