// Send a finished reel to the user's own Telegram bot chat, with caption and posting time.
// Config: %USERPROFILE%\.stickman\telegram.json  {"token":"<bot token from @BotFather>"}
//   chatId is found from the newest message to the bot and saved on first run.
// Usage:
//   node telegram-send.mjs --check                          -> checks token + chat
//   node telegram-send.mjs <file.mp4> <caption.txt> "<when>" -> sends video, caption, post time
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const cfgPath = join(process.env.USERPROFILE || process.env.HOME, '.stickman', 'telegram.json');
if (!existsSync(cfgPath)) {
  console.error(`TELEGRAM NOT CONFIGURED: create ${cfgPath} with {"token":"<bot token>"}`);
  process.exit(2);
}
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const api = (method, args = []) => {
  const out = execFileSync('curl', ['-sS', '--max-time', '600', ...args,
    `https://api.telegram.org/bot${cfg.token}/${method}`], { encoding: 'utf8' });
  return JSON.parse(out);
};

function chatId() {
  if (cfg.chatId) return cfg.chatId;
  const u = api('getUpdates');
  if (!u.ok) { console.error('TELEGRAM CONFIG INVALID: ' + u.description); process.exit(3); }
  const msg = [...u.result].reverse().map((x) => x.message || x.edited_message).find(Boolean);
  if (!msg) { console.error('NO CHAT YET: open your bot in Telegram, press Start, then run again'); process.exit(4); }
  cfg.chatId = msg.chat.id;
  writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  return cfg.chatId;
}

const [file, capFile, when] = process.argv.slice(2);
if (file === '--check') {
  const me = api('getMe');
  if (!me.ok) { console.error('TELEGRAM CONFIG INVALID: ' + me.description); process.exit(3); }
  console.log(`OK bot @${me.result.username}, chat ${chatId()}`);
  process.exit(0);
}
if (!file || !existsSync(file) || !capFile || !existsSync(capFile)) {
  console.error('usage: node telegram-send.mjs <file.mp4> <caption.txt> "<when>"'); process.exit(1);
}
if (statSync(file).size > 50e6) { console.error('file over 50 MB (bot limit)'); process.exit(1); }

const caption = readFileSync(capFile, 'utf8').trim();
const head = when ? `POST: ${when}\n\n` : '';
const text = (head + caption).slice(0, 1024);   // Telegram caption limit
const r = api('sendVideo', ['-F', `chat_id=${chatId()}`, '--form-string', `caption=${text}`,
  '-F', 'supports_streaming=true', '-F', `video=@${file}`]);
if (!r.ok) { console.error('SEND FAILED: ' + r.description); process.exit(5); }
console.log(`SENT ${file} (message ${r.result.message_id})`);
