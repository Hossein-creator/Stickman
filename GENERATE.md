# "generiere": viral remake job

User, 2026-10-27. When the user writes **"generiere"**, run this job.

## Goal
Find the most viral short videos right now, check that they really are viral, and remake them
**one to one** as Silent Stickman reels: same idea, hook, beats, pacing, twist and punchline,
but in our look and rules (ACTION STYLE, black stage, rig v2, code only).

## Rules
- **Only the most viral videos get remade.** Check virality before building anything (step 2).
- **Mostly relationship.** Default per run: 4 reels = 3 relationship + 1 other topic.
- Sources may come from **any niche**. A video from outside the niche gets turned into our niche
  (fitness video → relationship or discipline story, same structure).
- Platforms: YouTube Shorts, Instagram Reels, TikTok.
- "One to one" = copy the idea and the structure. Never copy their footage, music, voice or exact text.
- Code only: SVG + GSAP in HyperFrames, sound made in code, no AI images, no voice. 1080×1920, 12–14 s.
- All research results are saved in this repo (`viral/`), never on the computer.

## Steps
1. **Find candidates** with the skill `anthropic-skills:ig-viral`.
   - Search the niche first (stickman, silent stories, relationship), then the big winners outside it.
   - Collect at least 10 candidates across the 3 platforms.
2. **Virality check (must pass before generating).**
   - Tool order: the `ig-viral` skill first. If it can't get the numbers, use another skill
     (`SearchSkills` / `SuggestSkills`), then an external tool or plugin
     (`SearchPlugins`, web search / fetch of the public post and profile pages).
   - For each candidate write down: link, platform, account, views, likes, comments, shares/saves
     if shown, post date, account's normal views (median of its recent posts).
   - **Outlier score** = views ÷ account's median views.
   - **Pass** = outlier score ≥ 3, posted in the last 90 days, and the engagement isn't fake-looking
     (likes + comments at least ~2 % of views).
   - Rank by outlier score. Only the top passing ones get remade. If fewer pass than needed, search more;
     never fill up with failed ones.
   - Save the table to `viral/YYYY-MM-DD-check.md` (template: `viral/README.md`).
3. **Map each winner to our niche.** One line per beat: original beat → our stickman beat.
   Keep the hook formula (name it, as `ig-viral` does) and the twist.
4. **Build, check, render, caption, send, log** exactly as in `DAILY-JOB.md` steps 3–8.
   In "Our reels" note the source link and its outlier score.
5. **Commit and push** everything (reels, check file, notes).
