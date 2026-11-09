# "generiere": viral remake job

User, 2026-10-27. When the user writes **"generiere"**, run this job.

## Goal
Find the most viral short videos right now, check that they really are viral, and remake them
**one to one** as Silent Stickman reels: same idea, hook, beats, pacing, twist and punchline,
but in our look and rules (ACTION STYLE, black stage, rig v2, code only).

## Rules
- **Winner format first (user, 2026-10-28):** the "LOVE IS A ___" split screen (reel 36 Bridge For Two and its reference got millions of views, comments, likes, reposts and shares). Every run makes at least one new reel in this format from the backlog in `REFERENCE-ANALYSIS.md` ("WINNER FORMAT"), and viral candidates with the same shape (A/B split, love as an object both build, one partner on the phone) rank first.
- **Numbered series for followers (user, 2026-11-09):** "in letzter Zeit bekommen meine Social-Media-Accounts keine Follower und keine Aufrufe mehr ... längere Videos generieren und nummerieren wie eine Serie, damit Leute mir folgen" + "es soll eine spannende Geschichte sein, damit Leute es bis zum Ende schauen".
  - One run = **one series** about the same stickman couple (same look, same names/colours in every part), **4 parts** ("PART 1/4" ... "PART 4/4" always on top).
  - Each part **30-60 s** (not longer: watch time to the end matters more than length).
  - The story idea comes from a relationship video with **≥ 1M views** (rule above), stretched into a gripping arc: Part 1 hook + conflict, Parts 2-3 escalation and a twist, Part 4 payoff/emotional ending.
  - **Hook in the first 2 s** of every part (action, not a slow intro). Something new happens every 3-5 s.
  - Every part except the last **ends on a cliffhanger**, then an end card "PART 2 → FOLLOW" (no fade-out before the open question).
  - Parts 2-4 start with a **2-3 s recap** ("PREVIOUSLY ...") so new viewers get it.
  - Caption: "Part N/4", the cliffhanger question, "Follow for Part N+1"; parts post in consecutive slots in order.
- **Only the most viral videos get remade.** Check virality before building anything (step 2).
- **Only videos with huge reach (user, 2026-11-07):** "Deine Video bekommen nicht mehr viel Aufmerksamkeit. Ab jetzt suche die Videos die sehr viel Aufmerksamkeit bekommen auf Social Media." Runs 7-9 picked small channels with a high outlier score but low reach (37k-320k views), and our reels stopped getting attention. From now on the main filter is **absolute attention**: **at least 1,000,000 views** (better several million) and lots of likes, comments and shares. The outlier score is only a tie-breaker, never a reason to pick a small video.
- **Only relationship.** User, 2026-10-30: "weisst du die relationships videos explodieren gerade bleibe in diese nische". Every run: 4 relationship reels (couples, love, effort, trust, care, jealousy, breakups, old couples, relationship humour). No other topics. (Since 2026-11-09 the 4 reels are the 4 parts of one series.)
- Sources may come from **any niche**. A video from outside the niche gets turned into our niche
  (fitness or motivation video → relationship story, same structure).
- Platforms: YouTube Shorts, Instagram Reels, TikTok.
- "One to one" = copy the idea and the structure. Never copy their footage, music, voice or exact text.
- Code only: SVG + GSAP in HyperFrames, sound made in code, no AI images, no voice. 1080×1920, 12–14 s (series parts: 30–60 s).
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
   - **Pass (since 2026-11-07)** = **≥ 1,000,000 views**, posted in the last 12 months (newer is better),
     a real couple/relationship story or a structure we can turn into one, and engagement that isn't
     fake-looking (likes + comments at least ~2 % of views when visible). AI vegetable dramas, game/fandom
     dubs and studio trailers don't count, however big.
   - Rank by **views first** (then shares/comments, then outlier score). Only the top passing ones get
     remade. If fewer pass than needed, search more (wider time window, more queries, the biggest couple
     animation channels' most-viewed Shorts); never fill up with small videos.
   - Where to look for million-view videos: YouTube search sorted by view count with the filters
     "this month" / "this year" (not only "this week"), the "popular" tab of big couple-animation and
     stickman channels (`/shorts?view=0&sort=p`), and TikTok / Instagram trend pages via web search.
   - Save the table to `viral/YYYY-MM-DD-check.md` (template: `viral/README.md`).
3. **Map each winner to our niche.** One line per beat: original beat → our stickman beat.
   Keep the hook formula (name it, as `ig-viral` does) and the twist.
4. **Build, check, render, caption, send, log** exactly as in `DAILY-JOB.md` steps 3–8.
   In "Our reels" note the source link and its outlier score.
5. **Commit and push** everything (reels, check file, notes).
