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
When the user writes "generiere": run `GENERATE.md` (find viral videos with `ig-viral`, check virality first, remake them one to one in our style, mostly relationship).

## Start of every session
Read `CLAUDE.md`, `NOTES.md`, `README.md` and, for reel work, `DAILY-JOB.md` + `REFERENCE-ANALYSIS.md`.
