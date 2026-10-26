# Silent Stickman

Silent stickman reels. Story told by action, few words, action camera. Made with code only (HyperFrames + SVG). No AI images, no voice.

- IG: @silent.stickman
- TikTok: @the.silent.stickman
- YouTube: Silent Stickman

## What is here

| Path | What |
|---|---|
| `ready/` | Finished reels (mp4) + captions |
| `videos/NN-slug/` | Source for each reel (HyperFrames project) |
| `tools/` | Kit build, Telegram send, helpers |
| `gen/` | Reel generator + ideas |
| `profile-kit/` | Profile photo, highlights, covers |
| `PROFILE.md` | Bio, name, highlights |
| `DAILY-JOB.md` | Daily job rules + posting log |
| `REFERENCE-ANALYSIS.md` | Niche notes, style rules, ACTION STYLE |

## Build one reel

```bash
node tools/kit/build.mjs videos/31-one-friend
cd videos/31-one-friend
npx -y hyperframes@0.8.181 render -o renders/out.mp4 -q looks -f 30
```

Telegram bot token lives outside the repo in `%USERPROFILE%\.stickman\telegram.json`.
