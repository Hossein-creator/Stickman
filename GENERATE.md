# "generiere": viral remake job

User, 2026-10-27. When the user writes **"generiere"**, run this job.

## Goal
Find the most viral short videos right now, check that they really are viral, and remake them
**one to one** as Silent Stickman reels: same idea, hook, beats, pacing, twist and punchline,
but in our look and rules (ACTION STYLE, black stage, rig v2, code only).

## Rules
- **Winner format first (user, 2026-10-28):** the "LOVE IS A ___" split screen (reel 36 Bridge For Two and its reference got millions of views, comments, likes, reposts and shares). Every run makes at least one new reel in this format from the backlog in `REFERENCE-ANALYSIS.md` ("WINNER FORMAT"), and viral candidates with the same shape (A/B split, love as an object both build, one partner on the phone) rank first.
- **Only the most viral videos get remade.** Check virality before building anything (step 2).
- **Only relationship.** User, 2026-10-30: "weisst du die relationships videos explodieren gerade bleibe in diese nische". Every run: 4 relationship reels (couples, love, effort, trust, care, jealousy, breakups, old couples, relationship humour). No other topics.
- Sources may come from **any niche**. A video from outside the niche gets turned into our niche
  (fitness or motivation video → relationship story, same structure).
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
