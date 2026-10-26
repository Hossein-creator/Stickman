// Upload a finished video to a temporary public host so Metricool can fetch it.
// litterbox.catbox.moe keeps the file 72 h, then deletes it (enough for scheduling).
// Usage: node upload.mjs <file.mp4>  -> prints the public URL
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';

const file = process.argv[2];
if (!file || !existsSync(file)) { console.error('usage: node upload.mjs <file>'); process.exit(1); }
if (!/\.mp4$/i.test(file)) { console.error('only finished .mp4 videos are uploaded'); process.exit(1); }
if (statSync(file).size > 1e9) { console.error('file over 1 GB'); process.exit(1); }

// litterbox first (deleted after 72 h); catbox.moe as backup (permanent link, same operator)
const hosts = [
  ['litterbox', 'https://litterbox.catbox.moe/resources/internals/api.php', ['-F', `time=${process.env.LB_TIME || '72h'}`]],
  ['catbox', 'https://catbox.moe/user/api.php', []],
];
for (const [name, url, extra] of hosts) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const out = execFileSync('curl', ['-sS', '--max-time', '600', 
        '-F', 'reqtype=fileupload', ...extra, '-F', `fileToUpload=@${file}`, url], { encoding: 'utf8' }).trim();
      if (/^https:\/\/\S+$/.test(out)) { console.log(out); process.exit(0); }
      console.error(`${name} attempt ${attempt}: unexpected reply: ${out.slice(0, 120)}`);
    } catch (e) { console.error(`${name} attempt ${attempt}: ${e.message.split('\n')[0]}`); }
  }
}
// last backup: tmpfiles.org (kept 60 min; Metricool copies the file when scheduling). User OK 2026-10-23.
for (let attempt = 1; attempt <= 2; attempt++) {
  try {
    const out = execFileSync('curl', ['-sS', '--max-time', '600', '-F', `file=@${file}`,
      'https://tmpfiles.org/api/v1/upload'], { encoding: 'utf8' }).trim();
    const url = JSON.parse(out)?.data?.url;
    if (/^https?:\/\/tmpfiles\.org\/\w+\//.test(url || '')) {
      // the plain /dl/ link redirects to an HTML page; the real file link (with a token) sits on that page
      const page = execFileSync('curl', ['-sSL', '--max-time', '60', url.replace(/^http:/, 'https:')], { encoding: 'utf8' });
      const dl = page.match(/href="(https:\/\/tmpfiles\.org\/dl\/[^"]+\.mp4)"/i)?.[1];
      if (dl) { console.log(dl); process.exit(0); }
      console.error(`tmpfiles attempt ${attempt}: no download link on ${url}`);
      continue;
    }
    console.error(`tmpfiles attempt ${attempt}: unexpected reply: ${out.slice(0, 120)}`);
  } catch (e) { console.error(`tmpfiles attempt ${attempt}: ${e.message.split('\n')[0]}`); }
}
process.exit(1);
