        // ---------- "didn't look up": she offers him her heart. He stays on his phone and swats it away. It shatters. She picks up the pieces and leaves. He shrugs ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const pw = (s, K) => { for (let i = 1; i < K.length; i++) if (s < K[i][0]) return lerp(K[i - 1][1], K[i][1], ease((s - K[i - 1][0]) / (K[i][0] - K[i - 1][0]))); return K[K.length - 1][1]; };

        // ---------- time warp: slow motion while the heart falls ----------
        const SLOWS = [[4.95, 6.3], [10.9, 14.3]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T_FLICK = 2.9, T_SWAT = 4.9, T_SHATTER = 5.5, T_PING = 7.5, T_STAND = 8.35, T_WALK = 8.7, T_GONE = 9.75, T_LOOK = 9.55;
        const T_NOTICE = 9.8, T_RISE = 9.95, T_DROP = 10.02, T_PHONE = 10.3, T_RUN = 10.1, T_KNEEL = 10.45, T_TAKE = 10.56, T_REACH = 10.68;
        const XK = 470;
        const BEATS = [];
        for (let b = 0.3; b < T_SHATTER - 0.2; b += b < 3.9 ? 0.85 : 0.5) BEATS.push(b);
        const PICK = [6.0, 6.2, 6.4, 6.6, 6.8, 7.0];   // she picks up piece j (piece 6 stays on the floor)

        // ---------- room: a stool, a warm lamp that goes cold ----------
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const MX = 635, SEAT = FL - 112;
        const lamp = svgEl("polygon", { points: `340,-900 500,-900 700,${FL} 140,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.32 }, beams);
        const warm = svgEl("ellipse", { cx: 420, cy: FL, rx: 300, ry: 46, fill: "url(#warmPool)", opacity: 0.9 }, backG);
        const herBeam = svgEl("polygon", { points: `300,-900 380,-900 470,${FL} 230,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        svgEl("rect", { x: MX - 46, y: SEAT, width: 96, height: 14, rx: 4, fill: "#5a5a5a", stroke: "#000", "stroke-width": 5 }, propG);
        for (const lx of [MX - 34, MX + 34]) svgEl("rect", { x: lx - 5, y: SEAT + 12, width: 10, height: FL - SEAT - 12, fill: "#4a4a4a", stroke: "#000", "stroke-width": 4 }, propG);

        // ---------- the two of them ----------
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const him = makeFig(figG, "#e8e8e8", "#c8c8c8", false, "him");
        const phoneGlow = svgEl("ellipse", { rx: 120, ry: 100, fill: "url(#phoneGlow)" }, fxG);
        const phone = svgEl("rect", { x: -15, y: -24, width: 30, height: 48, rx: 6, fill: "#d8ecff", stroke: "#000", "stroke-width": 5 }, fxG);
        function feetOn(x0, hx, ST, lift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }

        // ---------- the heart: whole, flying, broken ----------
        const heartGlow = svgEl("ellipse", { rx: 90, ry: 80, fill: "url(#redGlow)", opacity: 0.6 }, fxG);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, fxG);
        const PIECES = [
          "M0 18 C-40 -8 -30 -40 0 -22 L6 -10 L-5 0 L4 10 Z", "M0 -22 C30 -40 40 -8 0 18 L4 10 L-5 0 L6 -10 Z",
          "M0 -6 L7 4 L-5 6 Z", "M0 -5 L6 5 L-6 3 Z", "M-4 -6 L6 -2 L0 6 Z", "M0 -6 L5 5 L-6 2 Z", "M-3 -5 L6 1 L-2 6 Z",
        ];
        // where each piece lands on the floor, and where it sits in her hands
        const FLOOR = [[386, FL - 12, -28], [458, FL - 10, 34], [420, FL - 4, 0], [372, FL - 4, 40], [478, FL - 4, -30], [440, FL - 3, 70], [404, FL - 4, 20]];
        const HELD = [[-9, 0], [9, 2], [-2, -26], [14, -20], [-16, 18], [6, 22], [0, 0]];
        const pieceEls = PIECES.map((d) => svgEl("path", { d, fill: "#e0322a", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round", opacity: 0 }, fxG));
        const shardGlow = svgEl("ellipse", { cx: FLOOR[6][0], cy: FL - 4, rx: 50, ry: 22, fill: "url(#redGlow)", opacity: 0 }, backG);
        const sparks = Array.from({ length: 16 }, (_, i) => ({ a: (i / 16) * Math.PI * 2 + 0.3 * Math.sin(i * 7), v: 260 + ((i * 53) % 160), el: svgEl("circle", { r: 3 + (i % 3), fill: "#ff6a5a", opacity: 0 }, fxG) }));
        const P0 = [486, stand - 116];   // where the heart is when he swats it
        const P1 = [420, FL - 14];       // where it lands
        function flightAt(s) {
          const k = clamp((s - T_SWAT) / (T_SHATTER - T_SWAT), 0, 1);
          return [lerp(P0[0], P1[0], k) - 40 * Math.sin(Math.PI * k), lerp(P0[1], P1[1], k * k) - 90 * Math.sin(Math.PI * k) * (1 - k)];
        }

        // ---------- rain over her only ----------
        const cloud = Array.from({ length: 4 }, (_, i) => svgEl("ellipse", { rx: 90 + i * 12, ry: 40, fill: "url(#cloud)", opacity: 0 }, fxG));
        const rain = Array.from({ length: 30 }, (_, i) => ({ dx: ((i * 37) % 220) - 110, off: (i * 0.137) % 1, el: svgEl("line", { stroke: "#9aa4b8", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, fxG) }));
        const tears = [0, 1, 2].map(() => svgEl("ellipse", { rx: 4, ry: 7, fill: "#bfe0ff", opacity: 0 }, fxG));

        // ---------- poses ----------
        const herX = (s) => pw(s, [[0, 240], [1.2, 240], [2.4, 385], [2.95, 385], [3.3, 360], [3.95, 360], [4.5, 392], [4.95, 392], [5.3, 320], [T_WALK, 320], [T_GONE, -100]]);
        const herF = (s) => (s < T_WALK ? 1 : -1);
        const holdAt = (st, x, f, y = stand - 92) => { st.aw = 1; st.atx = x + f * 34; st.aty = y; st.bw = 1; st.btx = x + f * 22; st.bty = y - 4; return st; };
        const kneel = (x, s) => base({ hx: x, hy: FL - 58, torso: 50 + 3 * Math.sin(s * 40), head: 14, ax: x + 36, ay: FL, bx: x - 70, by: FL, aw: 1, bw: 1, atx: x + 70, aty: FL - 150, btx: x + 60, bty: FL - 146 });
        const kneelUp = (x, s, cry) => base({ hx: x, hy: FL - 64, torso: 8 + 4 * cry * Math.sin(s * 34), head: 30, ax: x + 36, ay: FL, bx: x - 70, by: FL, aw: 1, bw: 1, atx: x + 30, aty: FL - 178, btx: x + 18, bty: FL - 182 });
        function herRaw(s) {
          const x = herX(s), f = herF(s);
          let st;
          if (s < 1.2) { st = holdAt(standOn(x, 1, FL), x, 1); st.head = 22; st.torso = 4; return st; }
          if (s < 2.4) {
            st = base({ hx: x, hy: stand + 2, torso: 6, head: 8 });
            const ft = feetOn(240, x, 120, 14); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1];
            return holdAt(st, x, 1);
          }
          if (s < 2.95) {
            // she offers it
            const k = win(s, 2.4, 2.75);
            st = holdAt(standOn(x, 1, FL), x, 1);
            st.atx = lerp(x + 34, x + 96, k); st.aty = lerp(stand - 92, stand - 82, k); st.btx = lerp(x + 22, x + 84, k); st.bty = lerp(stand - 96, stand - 86, k);
            st.torso = 4 + 8 * k; st.head = lerp(16, -6, k);
            return st;
          }
          if (s < 3.95) {
            // he flicks her away: she pulls the heart back and drops her head
            st = holdAt(standOn(x, 1, FL), x, 1);
            const back = win(s, 2.95, 3.12);
            st.atx = lerp(x + 96, x + 34, back); st.aty = lerp(stand - 82, stand - 92, back); st.btx = lerp(x + 84, x + 22, back); st.bty = lerp(stand - 86, stand - 96, back);
            st.torso = 4 - 6 * win(s, 2.95, 3.1) + 10 * win(s, 3.3, 3.7); st.head = lerp(-6, 32, win(s, 3.25, 3.65));
            if (s > 2.98 && s < 3.3) { const ft = feetOn(385, x, 90, 10); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1]; }
            return st;
          }
          if (s < T_SWAT + 0.02) {
            // she tries again, closer, to his face
            const k = win(s, 4.15, 4.6);
            st = holdAt(standOn(x, 1, FL), x, 1);
            if (s > 3.95 && s < 4.5) { const ft = feetOn(360, x, 100, 12); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1]; }
            st.atx = lerp(x + 34, x + 100, k); st.aty = lerp(stand - 92, stand - 104, k); st.btx = lerp(x + 22, x + 88, k); st.bty = lerp(stand - 96, stand - 108, k);
            st.torso = 4 + 7 * k; st.head = lerp(30, -12, win(s, 3.95, 4.4));
            return st;
          }
          if (s < 5.55) {
            // knocked out of her hands: shock, she stumbles back, reaches for it as it falls
            st = standOn(x, 1, FL);
            if (s < 5.3) { const ft = feetOn(392, x, 90, 10); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1]; }
            const shock = win(s, T_SWAT, 5.05), reach = win(s, 5.2, 5.5);
            st.aw = 1; st.atx = lerp(lerp(x + 100, x + 34, shock), x + 96, reach); st.aty = lerp(lerp(stand - 104, stand - 150, shock), stand + 20, reach);
            st.bw = 1; st.btx = lerp(lerp(x + 88, x + 18, shock), x + 80, reach); st.bty = lerp(lerp(stand - 108, stand - 160, shock), stand + 30, reach);
            st.torso = lerp(-8 * shock, 34, reach); st.head = lerp(-14, 30, reach);
            return st;
          }
          if (s < 5.95) {
            const prev = herRaw(5.549);
            return mixPose(prev, kneel(320, s), win(s, 5.55, 5.9));
          }
          if (s < 7.25) {
            // on her knees, crying, picking up the pieces one by one
            st = kneel(320, s);
            for (let j = 0; j < 6; j++) {
              const r = Math.sin(Math.PI * clamp((s - PICK[j] + 0.16) / 0.26, 0, 1));
              if (r <= 0) continue;
              if (j % 2 === 0) { st.atx = lerp(st.atx, FLOOR[j][0], r); st.aty = lerp(st.aty, FLOOR[j][1] - 4, r); }
              else { st.btx = lerp(st.btx, FLOOR[j][0], r); st.bty = lerp(st.bty, FLOOR[j][1] - 4, r); }
            }
            return st;
          }
          if (s < T_STAND) {
            // holds the broken pieces, looks up at him... he is laughing at his phone
            st = mixPose(kneel(320, s), kneelUp(320, s, 1), win(s, 7.25, 7.45));
            st.head = lerp(30, -16, win(s, 7.3, 7.5)) + 46 * win(s, 8.0, 8.25);
            return st;
          }
          const up = holdAt(standOn(320, 1, FL), 320, 1, stand - 100); up.head = 30; up.torso = 8;
          if (s < T_WALK) return mixPose(kneelUp(320, s, 0.5), up, win(s, T_STAND, T_WALK - 0.05));
          // she turns and walks away into the dark
          st = base({ hx: x, hy: stand + 3, torso: 8, head: 26 });
          const ft = feetOn(320, x, 100, 10); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1];
          return holdAt(st, x, -1, stand - 100);
        }

        const sitBase = () => base({ hx: MX, hy: SEAT - 12, torso: 14, head: 34, ax: MX - 62, ay: FL, bx: MX - 40, by: FL, aw: 1, atx: MX - 64, aty: FL - 200, bw: 1, btx: MX - 50, bty: FL - 196 });
        function himRaw(s) {
          const st = sitBase();
          st.head += 2 * Math.sin(s * 1.3);
          // flick: the back of his hand pushes her away, eyes stay on the phone
          const fl = Math.sin(Math.PI * clamp((s - T_FLICK + 0.1) / 0.28, 0, 1));
          st.atx = lerp(st.atx, MX - 130, fl); st.aty = lerp(st.aty, FL - 250, fl);
          // swat: a hard swipe, still not looking
          const sw = clamp((s - T_SWAT + 0.12) / 0.3, 0, 1), swing = Math.sin(Math.PI * sw);
          st.atx = lerp(st.atx, MX - 150 + 60 * sw, swing); st.aty = lerp(st.aty, FL - 290 + 40 * sw, swing); st.torso += 6 * swing;
          // laughs at something on his phone
          const lg = win(s, T_PING + 0.1, T_PING + 0.2) * (1 - win(s, 8.2, 8.35));
          st.torso += lg * (4 + 5 * Math.abs(Math.sin(s * 20))); st.head += lg * (-14 + 6 * Math.sin(s * 20)); st.hy -= lg * 3 * Math.abs(Math.sin(s * 20));
          // finally looks up: she is gone. Then he sees the piece she left on the floor
          st.head = lerp(st.head, -4, win(s, T_LOOK, T_LOOK + 0.15)); st.torso = lerp(st.torso, 6, win(s, T_LOOK, T_LOOK + 0.15));
          st.head = lerp(st.head, 40, win(s, T_NOTICE, T_NOTICE + 0.12));
          if (s < T_RISE) return st;
          const X0 = MX - 20;
          const up = standOn(X0, -1, FL);
          up.head = 34; up.torso = 10; up.aw = 1; up.atx = X0 - 70; up.aty = stand - 50; up.bw = 1; up.btx = X0 + 40; up.bty = stand - 30;
          if (s < T_RUN) return mixPose(st, up, win(s, T_RISE, T_RUN));
          const run = (ss) => {
            const x = lerp(X0, XK, ease((ss - T_RUN) / (T_KNEEL - T_RUN))), ft = feetOn(X0, x, 130, 28), sw = Math.sin((Math.PI * 2 * (X0 - x)) / 130);
            return base({ hx: x, hy: stand + 8 + 4 * Math.abs(sw), torso: 18, head: 22, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 - 55 * sw, ael: 85, bsh: -4 + 55 * sw, bel: 85 });
          };
          if (s < T_KNEEL) return run(s);
          // on his knees where she was: picks up the last piece, reaches into the dark after her
          const sx = FLOOR[6][0];
          const kn = base({ hx: XK, hy: FL - 58, torso: 48, head: 16, ax: XK - 36, ay: FL, bx: XK + 70, by: FL, aw: 1, atx: sx - 4, aty: FL - 8, bw: 1, btx: sx + 8, bty: FL - 8 });
          if (s < T_KNEEL + 0.1) return mixPose(run(T_KNEEL), kn, win(s, T_KNEEL, T_KNEEL + 0.1));
          const hold = base({ hx: XK, hy: FL - 64, torso: 10, head: 26, ax: XK - 36, ay: FL, bx: XK + 70, by: FL, aw: 1, atx: XK - 34, aty: FL - 180, bw: 1, btx: XK - 22, bty: FL - 184 });
          if (s < T_REACH) return mixPose(kn, hold, win(s, T_TAKE, T_TAKE + 0.12));
          const r = win(s, T_REACH, T_REACH + 0.22);
          hold.atx = lerp(hold.atx, XK - 170, r); hold.aty = lerp(hold.aty, FL - 250, r); hold.head = lerp(26, -22, r); hold.torso = lerp(10, 18, r);
          return hold;
          return st;
        }

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const redFlash = document.createElement("div");
        redFlash.style.cssText = "position:absolute;inset:0;background:#ff2a1f;opacity:0;pointer-events:none";
        E("stage").insertBefore(redFlash, E("head"));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 2.6, 290, 380, 0], [1.1, 2.4, 292, 384, 0], [1.7, 1.25, 420, 430, 0],
          [2.6, 1.5, 470, 420, 0], [2.95, 1.7, 480, 400, 1], [3.7, 1.85, 390, 400, 0],
          [4.5, 1.6, 470, 400, 0], [4.9, 1.95, 500, 380, -2], [5.2, 1.6, 440, 470, 0], [5.5, 2.1, 450, 560, 2],
          [6.0, 1.6, 380, 500, 0], [7.25, 1.9, 360, 490, 0], [7.5, 1.9, 540, 420, 2], [8.2, 1.8, 560, 420, 0],
          [8.5, 1.4, 440, 440, 0], [9.3, 1.3, 400, 440, 0], [9.6, 1.6, 600, 420, 0], [9.85, 1.6, 520, 470, 0], [10.2, 1.45, 560, 500, -2],
          [10.45, 1.5, 470, 470, 0], [10.7, 1.9, 430, 470, 0], [11.05, 1.35, 340, 430, 0], [99, 1.35, 330, 430, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0, red = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          BEATS.forEach((b) => hit(realOf(b), 0.07, 0, 0, 0.08));
          hit(realOf(T_FLICK), 0.45, 0.4, 0, 0.18);
          hit(realOf(T_SWAT), 1.0, 0.9, 0, 0.3);
          hit(realOf(T_SHATTER), 1.7, 1, 0.2, 0.4);
          hit(realOf(T_PING), 0.12, 0, 0, 0.1);
          hit(realOf(T_PHONE), 0.35, 0.5, 0, 0.25);
          hit(realOf(T_KNEEL + 0.08), 0.3, 0.2, 0, 0.2);
          if (t >= realOf(T_SHATTER)) red = 0.4 * Math.exp(-(t - realOf(T_SHATTER)) / 0.12);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);
          redFlash.style.opacity = red.toFixed(3);

          // light: warm while she still hopes, cold after the heart breaks
          const cold = win(s, T_SHATTER, T_SHATTER + 0.6);
          lamp.setAttribute("opacity", (0.32 * (1 - 0.35 * win(s, 3.0, 3.6)) * (1 - 0.8 * cold)).toFixed(3));
          warm.setAttribute("opacity", (0.9 * (1 - 0.35 * win(s, 3.0, 3.6)) * (1 - cold)).toFixed(3));
          herBeam.setAttribute("opacity", (0.2 * win(s, 5.9, 6.6) * (1 - win(s, T_WALK, T_WALK + 0.6))).toFixed(3));

          // figures
          const hx = herX(s), gone = win(s, 9.2, T_GONE);
          const hp = drawFig(her, livePose(herRaw, s, 0.4), herF(s));
          bun.setAttribute("cx", r1(hp.head[0] - herF(s) * 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          her.g.setAttribute("opacity", (1 - gone).toFixed(3)); bun.setAttribute("opacity", (1 - gone).toFixed(3));
          const mp = drawFig(him, livePose(himRaw, s, 1.3), -1);
          const ph = [(mp.hands[0][0] + mp.hands[1][0]) / 2, (mp.hands[0][1] + mp.hands[1][1]) / 2 - 8];
          const swatting = s > T_SWAT - 0.14 && s < T_SWAT + 0.2;
          const phx = swatting ? mp.hands[1][0] : ph[0], phy = swatting ? mp.hands[1][1] - 8 : ph[1];
          // the phone slips out of his hand when he stands, hits the floor, goes dark
          const pk = clamp((s - T_DROP) / (T_PHONE - T_DROP), 0, 1);
          const pX = s < T_DROP ? phx : lerp(MX - 60, MX - 90, pk), pY = s < T_DROP ? phy : lerp(FL - 215, FL - 8, pk * pk), pR = s < T_DROP ? -18 : lerp(-18, -90, pk);
          phone.setAttribute("transform", `translate(${r1(pX)} ${r1(pY)}) rotate(${r1(pR)})`);
          phone.setAttribute("fill", s > T_PHONE ? "#2a2a2a" : "#d8ecff");
          const ping = s > T_PING ? Math.exp(-(s - T_PING) / 0.3) : 0;
          phoneGlow.setAttribute("cx", r1(pX - 20)); phoneGlow.setAttribute("cy", r1(pY - 30));
          phoneGlow.setAttribute("opacity", ((0.5 + 0.3 * ping + 0.2 * cold) * (1 - win(s, T_PHONE, T_PHONE + 0.08))).toFixed(3));

          // the heart
          let pulse = 1;
          BEATS.forEach((b) => { if (s > b) pulse += 0.14 * Math.exp(-(s - b) / 0.07) + (s > b + 0.18 ? 0.07 * Math.exp(-(s - b - 0.18) / 0.07) : 0); });
          const held = [(hp.hands[0][0] + hp.hands[1][0]) / 2, (hp.hands[0][1] + hp.hands[1][1]) / 2 - 10];
          if (s < T_SHATTER) {
            const pos = s < T_SWAT ? held : flightAt(s), rot = s < T_SWAT ? 0 : -540 * (s - T_SWAT);
            heart.setAttribute("opacity", 1);
            heart.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1])}) rotate(${r1(rot)}) scale(${(1.35 * pulse).toFixed(3)})`);
            heartGlow.setAttribute("cx", r1(pos[0])); heartGlow.setAttribute("cy", r1(pos[1]));
            heartGlow.setAttribute("opacity", ((0.55 + 0.35 * (pulse - 1) / 0.14) * (1 - 0.3 * win(s, 3.0, 3.6))).toFixed(3));
            pieceEls.forEach((p) => p.setAttribute("opacity", 0));
          } else {
            heart.setAttribute("opacity", 0);
            heartGlow.setAttribute("opacity", (0.7 * Math.exp(-(s - T_SHATTER) / 0.25)).toFixed(3));
            heartGlow.setAttribute("cx", P1[0]); heartGlow.setAttribute("cy", P1[1]);
            const chest = held;
            pieceEls.forEach((p, j) => {
              const [fx, fy, fr] = FLOOR[j];
              const k = ease((s - T_SHATTER) / 0.35);
              let x = lerp(P1[0], fx, k), y = lerp(P1[1], fy, k) - 40 * Math.sin(Math.PI * k) * (j > 1 ? 1 : 0.4), r = fr * k;
              if (j < 6) {
                const g = win(s, PICK[j] - 0.04, PICK[j] + 0.12);
                const hand = j % 2 === 0 ? hp.hands[0] : hp.hands[1];
                if (s > PICK[j] - 0.04 && s < PICK[j] + 0.12) { x = lerp(x, hand[0], g); y = lerp(y, hand[1], g); }
                if (s >= PICK[j] + 0.12) { x = chest[0] + HELD[j][0] * herF(s); y = chest[1] + HELD[j][1] * 0.8; r = fr * 0.3; }
              }
              if (j === 6 && s > T_TAKE) { const g = win(s, T_TAKE, T_TAKE + 0.1); x = lerp(x, mp.hands[1][0], g); y = lerp(y, mp.hands[1][1] - 6, g); r = fr * (1 - g); }
              if (j === 6) { shardGlow.setAttribute("cx", r1(x)); shardGlow.setAttribute("cy", r1(y)); }
              p.setAttribute("opacity", j < 6 ? (1 - gone).toFixed(3) : 1);
              p.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(r)}) scale(1.35)`);
            });
          }
          shardGlow.setAttribute("opacity", (win(s, 9.0, 9.8) * (0.55 + 0.25 * Math.sin(t * 3)) * (1 + 0.6 * win(s, T_TAKE, T_TAKE + 0.2))).toFixed(3));
          sparks.forEach((p) => {
            const dt = s - T_SHATTER, on = dt > 0 && dt < 0.45;
            p.el.setAttribute("cx", r1(P1[0] + Math.cos(p.a) * p.v * dt));
            p.el.setAttribute("cy", r1(Math.min(FL - 3, P1[1] - Math.abs(Math.sin(p.a)) * p.v * dt + 900 * dt * dt)));
            p.el.setAttribute("opacity", on ? (1 - dt / 0.45).toFixed(2) : 0);
          });

          // rain cloud that follows her; at the end it is over him
          const rn = win(s, 5.8, 6.5) * (1 - win(s, 9.2, T_GONE)) + win(s, T_KNEEL, T_KNEEL + 0.3), rx = s > 10.2 ? XK : hx;
          cloud.forEach((c, i) => {
            c.setAttribute("cx", r1(rx - 60 + i * 42)); c.setAttribute("cy", r1(FL - 470 - (i % 2) * 26));
            c.setAttribute("opacity", rn.toFixed(3));
          });
          rain.forEach((d) => {
            const q = frac(t * 1.7 + d.off), y = FL - 450 + q * 450, x = rx + d.dx;
            d.el.setAttribute("x1", r1(x)); d.el.setAttribute("y1", r1(y)); d.el.setAttribute("x2", r1(x - 4)); d.el.setAttribute("y2", r1(y + 34));
            d.el.setAttribute("opacity", (rn * 0.7 * Math.min(1, (1 - q) * 4)).toFixed(3));
          });
          // tears
          const late = s > 10.2, cry = win(s, 5.9, 6.2) * (1 - win(s, 9.2, 9.6)) + win(s, T_TAKE, T_TAKE + 0.2), th = late ? mp.head : hp.head;
          tears.forEach((e, i) => {
            const q = frac(t * (late ? 0.7 : 1.4) + i / 3), f = late ? -1 : herF(s);
            e.setAttribute("cx", r1(th[0] + f * (12 + i * 4)));
            e.setAttribute("cy", r1(th[1] + 14 + q * 80 + q * q * 60));
            e.setAttribute("opacity", (cry * (1 - q)).toFixed(3));
          });

          E("h1").innerHTML = slam(["SHE", "GAVE", "HIM", "HER", "HEART."], [11.7, 11.82, 11.94, 12.06, 12.2], t, []);
          E("h2").innerHTML = slam(["HE", "LOOKED", "UP", "TOO", "LATE."], [12.5, 12.62, 12.74, 12.95, 13.12], t, [3, 4]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 12.7, 13.0)).toFixed(3);
          fade.style.opacity = win(t, 13.62, 13.98).toFixed(3);
        }

        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const clock = { t: 0 };
        tl.to(clock, { t: DUR, duration: DUR, ease: "none", onUpdate: () => render(clock.t) }, 0);
        window.__timelines["main"] = tl;
        render(0);
        tl.seek(0);
      })();
    </script>
  </body>
</html>
