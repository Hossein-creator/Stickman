// Send a batch of reels to Telegram, each with its post time.
// Usage: node tools/send-queue.mjs [queue.json]   (run from stickman-mindset/; default = the 2026-10-25 Metricool list)
//   queue.json = [["NN-slug", "Day DD Mon, HH:MM (Berlin)"], ...]
// Sent ones are written to tools/send-queue.done so a rerun skips them.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, appendFileSync } from 'node:fs';

const DEFAULT = [
  ['11-the-wall', 'Sun 25 Oct, 12:00 (Berlin)'],
  ['13-the-seed', 'Sun 25 Oct, 16:00 (Berlin)'],
  ['08-the-battery', 'Sun 25 Oct, 18:00 (Berlin)'],
  ['12-the-thread', 'Mon 26 Oct, 10:00 (Berlin)'],
  ['14-the-path', 'Mon 26 Oct, 12:00 (Berlin)'],
  ['15-the-umbrella', 'Mon 26 Oct, 16:00 (Berlin)'],
  ['10-the-circle', 'Mon 26 Oct, 18:00 (Berlin)'],
  ['16-the-dominoes', 'Tue 27 Oct, 10:00 (Berlin)'],
  ['17-the-leash', 'Tue 27 Oct, 12:00 (Berlin)'],
];
const QUEUE = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], 'utf8')) : DEFAULT;
const doneFile = 'tools/send-queue.done';
const done = existsSync(doneFile) ? readFileSync(doneFile, 'utf8').split('\n') : [];
for (const [slug, when] of QUEUE) {
  if (done.includes(slug)) continue;
  execFileSync('node', ['tools/telegram-send.mjs', `ready/${slug}.mp4`, `ready/${slug}-caption.txt`, when],
    { stdio: 'inherit' });
  appendFileSync(doneFile, slug + '\n');
}
console.log('ALL SENT');
