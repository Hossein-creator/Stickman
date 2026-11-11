        // ---------- "ignored all day" (viral remake, structure of RituKrishna Vibes "Ignoring My Wife For 24 Hours Prank" 1.53M views, in our own design): 9 AM she says good morning, he walks away (a gift box behind his back); 1 PM "HUG?" "NOT NOW." (party bag); 6 PM dinner, "NOT HUNGRY."; 8 PM she thinks he forgot, lights go out, he walks in with a birthday cake, HAPPY BIRTHDAY bunting drops, her cracked heart heals. FOLLOW: a second bunting "+FOLLOW" drops, she pulls the cord, the flags flip to hearts. ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const C = [0, 3.9, 8.0, 12.1];
        const T_GM = 0.4, T_HUG0 = 1.0, T_PAST = 1.9, T_C1 = 2.4;
        const T_IN1 = 4.1, T_ASK = 5.0, T_NOTNOW = 6.1, T_C2 = 6.6;
        const T_DIN = 8.4, T_IN2 = 8.6, T_NH = 9.9, T_C3 = 10.4;
        const T_SAD = 12.4, T_OFF = 13.4, T_CAKE = 14.1, T_BAN = 15.0, T_UP = 15.2, T_HEAL = 15.6, T_HUG = 16.2;
        const T_L2 = 16.4, T_L3 = 17.3;
        const T_CTA = 19.3, T_PULL = 20.9;
        const SHE = 430, HE = 650;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- room ----------
        const glowC = svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.22 }, backG);
        svgEl("polygon", { points: `440,${FL - 520} 640,${FL - 520} 760,${FL} 320,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        svgEl("rect", { x: 250, y: FL - 430, width: 150, height: 190, fill: "#0e1a30", stroke: "#3a3a42", "stroke-width": 8 }, roomG);
        svgEl("line", { x1: 325, y1: FL - 430, x2: 325, y2: FL - 240, stroke: "#3a3a42", "stroke-width": 6 }, roomG);
        svgEl("line", { x1: 250, y1: FL - 335, x2: 400, y2: FL - 335, stroke: "#3a3a42", "stroke-width": 6 }, roomG);
        const sun = svgEl("circle", { cx: 365, cy: FL - 395, r: 18, fill: "#ffd25a", opacity: 0.9 }, roomG);
        // dinner table (chapter 3 only)
        const table = svgEl("g", { opacity: 0 }, roomG);
        svgEl("rect", { x: 700, y: FL - 140, width: 220, height: 16, fill: "#8f6a44", stroke: "#000", "stroke-width": 4 }, table);
        for (const x of [714, 892]) svgEl("rect", { x, y: FL - 124, width: 14, height: 124, fill: "#6a4a2c", stroke: "#000", "stroke-width": 4 }, table);
        for (const x of [750, 868]) { svgEl("ellipse", { cx: x, cy: FL - 146, rx: 34, ry: 8, fill: "#f4f4f4", stroke: "#000", "stroke-width": 3 }, table); svgEl("ellipse", { cx: x, cy: FL - 152, rx: 20, ry: 7, fill: "#d97a3a", stroke: "#000", "stroke-width": 3 }, table); }
        const dinSteam = Array.from({ length: 2 }, () => svgEl("path", { fill: "none", stroke: "#cfcfcf", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, roomG));

        // ---------- props ----------
        const box = svgEl("g", {}, propG);
        svgEl("rect", { x: -20, y: -18, width: 40, height: 36, rx: 3, fill: "#5aa8ff", stroke: "#000", "stroke-width": 4 }, box);
        svgEl("path", { d: "M0 -18 L0 18 M-20 0 L20 0", stroke: "#ffd25a", "stroke-width": 5 }, box);
        const bag = svgEl("g", {}, propG);
        svgEl("path", { d: "M-26 0 L26 0 L22 52 L-22 52 Z", fill: "#ff8fa8", stroke: "#000", "stroke-width": 4 }, bag);
        svgEl("path", { d: "M-12 0 Q-12 -20 0 -20 Q12 -20 12 0", fill: "none", stroke: "#000", "stroke-width": 4 }, bag);
        svgEl("text", { x: 0, y: 34, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#7a2a3a", "text-anchor": "middle" }, bag).textContent = "PARTY";
        const cake = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -56, y: -50, width: 112, height: 50, rx: 6, fill: "#f2d7b6", stroke: "#000", "stroke-width": 4 }, cake);
        svgEl("path", { d: "M-56 -36 q11 10 22 0 q11 10 22 0 q11 10 22 0 q11 10 22 0 q11 10 22 0 L56 -50 L-56 -50 Z", fill: "#ff8fa8", stroke: "#000", "stroke-width": 3 }, cake);
        const flames = [-30, -10, 10, 30].map((x) => { svgEl("rect", { x: x - 3, y: -74, width: 6, height: 24, fill: "#bfe0ff", stroke: "#000", "stroke-width": 2 }, cake); return svgEl("path", { d: `M${x} -76 q-7 -8 0 -19 q7 11 0 19 Z`, fill: "#ffb020", stroke: "#000", "stroke-width": 2 }, cake); });

        // ---------- figures ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        // night layer above everything in the room, candle light on top of it
        const lightG = svgEl("g", {}, W);
        const night = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#03040a", opacity: 0 }, lightG);
        const cGlow = svgEl("circle", { r: 260, fill: "url(#fireGlow)", opacity: 0 }, lightG);
        // bunting: HAPPY BIRTHDAY, later + FOLLOW
        const mkBunting = (txt, cols, y0) => {
          const g = svgEl("g", { opacity: 0 }, lightG);
          const n = txt.length, x0 = 560 - (n - 1) * 23;
          svgEl("path", { d: `M${x0 - 40} 0 Q560 ${40} ${x0 + (n - 1) * 46 + 40} 0`, fill: "none", stroke: "#e8e2d4", "stroke-width": 3 }, g);
          const flags = [...txt].map((ch, i) => { const x = x0 + i * 46, y = 6 + 40 * (1 - Math.pow((i - (n - 1) / 2) / ((n - 1) / 2 + 0.6), 2)) * 0.5; const f = svgEl("g", { transform: `translate(${x} ${r1(y)})` }, g); const inner = svgEl("g", {}, f); const tri = svgEl("path", { d: "M-20 0 L20 0 L0 46 Z", fill: cols[i % cols.length], stroke: "#000", "stroke-width": 3 }, inner); const tx = svgEl("text", { x: 0, y: 24, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#fff", "text-anchor": "middle" }, inner); tx.textContent = ch === " " ? "" : ch; if (ch === " ") f.setAttribute("opacity", 0); return { inner, tri, tx, ch }; });
          return { g, flags, y0 };
        };
        const ban1 = mkBunting("HAPPY BIRTHDAY", ["#ff5a6e", "#ffd25a", "#5aa8ff", "#7dff9a"], 30);
        const ban2 = mkBunting("+FOLLOW", ["#ff3b30"], 118);
        const cord = svgEl("path", { fill: "none", stroke: "#e8e2d4", "stroke-width": 3, opacity: 0 }, lightG);
        const knob = svgEl("circle", { r: 9, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, lightG);
        const handle = svgEl("text", { x: 560, y: 214, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 20, fill: "#fff", "text-anchor": "middle", opacity: 0, "letter-spacing": 2 }, lightG);
        const confetti = Array.from({ length: 26 }, (_, i) => svgEl("rect", { width: 8, height: 14, fill: ["#ff5a6e", "#ffd25a", "#5aa8ff", "#7dff9a"][i % 4], opacity: 0 }, lightG));

        // heart meter above HER
        const HEART = "M0 30 C-66 -14 -50 -66 0 -36 C50 -66 66 -14 0 30 Z";
        const hm = svgEl("g", { opacity: 0 }, fxG);
        const hmGlow = svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.5 }, hm);
        const hmH = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, hm);
        const cracks = ["M-2 -34 L6 -20 L-4 -8", "M-4 -8 L8 4 L-2 16", "M-2 16 L4 28 M-30 -30 L-18 -18 L-26 -6 M28 -28 L18 -14 L26 -2"].map((d) => svgEl("path", { d, fill: "none", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, hm));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, lightG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bGM = bubble("GOOD MORNING!", 270), bHug = bubble("HUG?", 120), bNot = bubble("NOT NOW.", 180, 30, "#888"), bDin = bubble("DINNER'S READY!", 300), bNH = bubble("NOT HUNGRY.", 230, 30, "#888"), bSur = bubble("SURPRISE!", 210, 32, "#ff3b30");

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 8, head: 6, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };

        // ---- him: busy all day, hiding things; then the surprise ----
        function himX(s) {
          const c = chap(s);
          if (c === 0) return lerp(HE, 1150, sm(s, T_PAST, T_PAST + 1.8));
          if (c === 1) return s < T_NOTNOW + 0.3 ? lerp(1100, 700, sm(s, T_IN1, T_IN1 + 1.0)) : lerp(700, 1150, sm(s, T_NOTNOW + 0.3, T_NOTNOW + 2.0));
          if (c === 2) return lerp(80, 1150, sm(s, T_IN2, T_NH + 1.9));
          return lerp(1150, 610, sm(s, T_CAKE, T_CAKE + 1.2));
        }
        const himDir = (s) => { const c = chap(s); if (c === 0) return s < T_PAST + 0.1 ? -1 : 1; if (c === 1) return s < T_NOTNOW + 0.35 ? -1 : 1; if (c === 2) return 1; return -1; };
        function himRaw(s) {
          const c = chap(s), x = himX(s), f = himDir(s);
          const moving = Math.abs(himX(s + 0.05) - x) > 0.4;
          let st;
          if (moving) { st = walking(c === 2 ? 80 : 1150, x); }
          else { st = standOn(x, f, FL); st.head = 2; }
          if (c < 3) { reachTo(st, 1, [x - f * 46, stand - 92], "b"); st.head = moving ? 4 : -2; if (c === 2) st.head = 2; }
          if (c === 3) {
            const pc = 1 - win(s, T_HUG + 1.0, T_HUG + 1.4);
            reachTo(st, pc, [x - 50, stand - 112]); reachTo(st, pc, [x - 14, stand - 108], "b");
            const hug = win(s, T_HUG + 1.2, T_HUG + 1.6) * (1 - win(s, T_CTA + 0.3, T_CTA + 0.7));
            reachTo(st, hug, [SHE + 40, stand - 150]); reachTo(st, hug, [SHE + 30, stand - 120], "b");
            st.hx -= 30 * hug;
            const cheer = hold(s, T_PULL + 0.35, T_PULL + 1.5, 0.2), wv = 14 * Math.sin(s * 14);
            reachTo(st, cheer, [x - 35, stand - 250 + wv]); reachTo(st, cheer, [x + 35, stand - 250 - wv], "b");
          }
          return st;
        }
        // ---- her ----
        const herDir = (s) => 1;
        function herRaw(s) {
          const c = chap(s);
          if (c === 0) {
            const x = lerp(SHE, 520, win(s, T_HUG0, T_HUG0 + 0.6));
            const st = standOn(x, 1, FL); st.head = -6;
            const op = hold(s, T_HUG0, T_PAST + 0.5, 0.35); reachTo(st, op, [x + 90, stand - 150]); reachTo(st, op, [x + 70, stand - 170], "b");
            st.head = lerp(st.head, 26, win(s, T_C1, T_C1 + 0.6));
            return st;
          }
          if (c === 1) {
            const st = standOn(SHE + 60, 1, FL); st.head = -6;
            const op = hold(s, T_ASK, T_NOTNOW + 0.3, 0.35); reachTo(st, op, [SHE + 150, stand - 150]); reachTo(st, op, [SHE + 130, stand - 170], "b");
            st.head = lerp(st.head, 26, win(s, T_C2, T_C2 + 0.6));
            return st;
          }
          if (c === 2) {
            const st = standOn(SHE + 140, 1, FL); st.head = -8;
            const pt = hold(s, T_DIN, T_NH, 0.3); reachTo(st, pt, [SHE + 250, stand - 140]);
            const lk = win(s, T_IN2 + 0.6, T_IN2 + 1.0); st.head = lerp(st.head, 0, lk);
            st.head = lerp(st.head, 28, win(s, T_C3, T_C3 + 0.6));
            return st;
          }
          const st = standOn(SHE + 20, 1, FL);
          // sad: hands to her face, then looks up at the light, hugs him
          const sad = 1 - win(s, T_UP, T_UP + 0.4);
          st.head = lerp(-6, 30, sad); st.torso += 10 * sad;
          reachTo(st, sad, [SHE + 50, stand - 160]); reachTo(st, sad, [SHE + 40, stand - 150], "b");
          const hand = hold(s, T_UP + 0.2, T_HUG, 0.3); reachTo(st, hand, [SHE + 50, stand - 170]);
          const hug = win(s, T_HUG, T_HUG + 0.5) * (1 - win(s, T_CTA + 0.3, T_CTA + 0.7));
          st.hx += 60 * hug; reachTo(st, hug, [HE - 50, stand - 150]); reachTo(st, hug, [HE - 60, stand - 120], "b");
          // CTA: she reaches up and pulls the cord
          const pull = hold(s, T_PULL - 0.7, T_PULL + 0.3, 0.3), pd = s > T_PULL - 0.15 && s < T_PULL + 0.15 ? 18 : 0;
          reachTo(st, pull, [SHE + 120, 330 + pd]); st.head = lerp(st.head, -18, pull);
          const cheer = hold(s, T_PULL + 0.35, T_PULL + 1.5, 0.2), wv = 14 * Math.sin(s * 14 + 1);
          reachTo(st, cheer, [SHE - 15, stand - 250 + wv]); reachTo(st, cheer, [SHE + 55, stand - 250 - wv], "b");
          return st;
        }

        // ---------- text layers ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:120px;top:1720px;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.22em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:305px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:120px;right:120px;top:1660px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.14em;color:#fff;line-height:1.5";
        E("stage").appendChild(sub);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.75, 600, 420, 1.85], [C[1], 1.7, 640, 420, 1.8], [C[2], 1.6, 620, 420, 1.7], [C[3], 1.9, 520, 430, 2.0], [T_BAN - 0.1, 1.6, 540, 400, 1.65], [T_CTA, 1.65, 540, 380, 1.7]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.3, "SHE SAYS GOOD MORNING."], [T_PAST, "HE JUST WALKS AWAY.", 2], [C[1] + 0.3, "SHE WANTS A HUG."], [T_NOTNOW, "HE SAYS \"NOT NOW.\"", 2], [C[2] + 0.2, "SHE MADE DINNER."], [T_NH, "HE'S \"NOT HUNGRY.\"", 1], [C[3] + 0.3, "SHE THINKS HE FORGOT."], [T_BAN, "HE DIDN'T.", 1]];
        const TAGS = ["9:00 AM", "1:00 PM", "6:00 PM", "8:00 PM"];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.14em";
        E("head").style.lineHeight = "1.6";

        function drawBunting(B, s, t0, flipAt) {
          const dq = sm(s, t0, t0 + 0.6);
          B.g.setAttribute("opacity", s > t0 ? 1 : 0);
          B.g.setAttribute("transform", `translate(0 ${r1(lerp(-420, B.y0, backOut(dq)))})`);
          B.flags.forEach((f, i) => {
            const sw = 6 * Math.sin(s * 3 + i);
            let sx = 1;
            if (flipAt !== undefined && s > flipAt + i * 0.07) { const q = clamp((s - flipAt - i * 0.07) / 0.25, 0, 1); sx = Math.cos(Math.PI * q); if (q > 0.5) { f.tri.setAttribute("fill", "#ffffff"); f.tx.setAttribute("fill", "#ff3b30"); f.tx.textContent = "♥"; } }
            f.inner.setAttribute("transform", `rotate(${r1(sw)}) scale(${sx.toFixed(3)} 1)`);
          });
        }

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himDir(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const ch = chap(s);
          // props in his back hand
          box.setAttribute("opacity", ch === 0 ? 1 : 0); box.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1])})`);
          bag.setAttribute("opacity", ch === 1 || ch === 2 ? 1 : 0); bag.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1] - 4)})`);
          table.setAttribute("opacity", ch === 2 ? 1 : 0);
          dinSteam.forEach((e, i) => { const q = frac(s * 0.7 + i / 2), x = [750, 868][i]; e.setAttribute("d", `M${x} ${r1(FL - 160 - 40 * q)} q8 -10 0 -20`); e.setAttribute("opacity", ch === 2 ? (0.6 * Math.sin(Math.PI * q)).toFixed(3) : 0); });
          sun.setAttribute("fill", ch === 0 ? "#ffd25a" : ch === 1 ? "#ffe9a8" : ch === 2 ? "#ff9b5a" : "#e8e6d8");
          // cake + candle light
          const cp = [(mp.hands[0][0] + mp.hands[1][0]) / 2, (mp.hands[0][1] + mp.hands[1][1]) / 2 + 4];
          const cakeOn = s > T_CAKE - 0.05;
          const onTable = s > T_HUG + 1.0;
          const cpos = onTable ? [lerp(cp[0], 760, win(s, T_HUG + 1.0, T_HUG + 1.3)), lerp(cp[1], FL - 4, win(s, T_HUG + 1.0, T_HUG + 1.3))] : cp;
          cake.setAttribute("opacity", ch === 3 && cakeOn ? 1 : 0);
          cake.setAttribute("transform", `translate(${r1(cpos[0])} ${r1(cpos[1])})`);
          flames.forEach((f, i) => f.setAttribute("transform", `translate(0 0) scale(${(1 + 0.08 * Math.sin(s * 23 + i)).toFixed(3)} 1)`));
          const dark = ch === 3 ? win(s, T_OFF, T_OFF + 0.15) * (1 - 0.85 * win(s, T_BAN, T_BAN + 0.8)) : 0;
          night.setAttribute("opacity", (0.86 * dark).toFixed(3));
          cGlow.setAttribute("cx", r1(cpos[0])); cGlow.setAttribute("cy", r1(cpos[1] - 80));
          cGlow.setAttribute("opacity", ch === 3 && cakeOn ? (0.55 + 0.08 * Math.sin(s * 17)).toFixed(3) : 0);
          cold.setAttribute("opacity", (ch === 3 ? 0.3 * (1 - win(s, T_BAN, T_BAN + 0.8)) : 0.05 * ch).toFixed(3));
          glowC.setAttribute("opacity", (ch === 3 ? 0.3 * win(s, T_BAN, T_BAN + 0.8) : 0.22).toFixed(3));
          // banners
          drawBunting(ban1, s, T_BAN);
          drawBunting(ban2, s, T_CTA + 0.2, T_PULL);
          const cq = sm(s, T_CTA + 0.6, T_CTA + 1.0);
          const kn = [SHE + 120, 330 + (s > T_PULL - 0.15 && s < T_PULL + 0.15 ? 18 : 0)];
          cord.setAttribute("d", `M${SHE + 130} 150 L${kn[0]} ${r1(lerp(150, kn[1], cq))}`); cord.setAttribute("opacity", s > T_CTA + 0.6 ? 1 : 0);
          knob.setAttribute("cx", kn[0]); knob.setAttribute("cy", r1(lerp(150, kn[1], cq))); knob.setAttribute("opacity", s > T_CTA + 0.6 ? 1 : 0);
          handle.textContent = s > T_PULL + 0.4 ? "FOLLOWING ✓" : "@SILENT.STICKMAN";
          handle.setAttribute("fill", s > T_PULL + 0.4 ? "#ff6a60" : "#ffffff");
          handle.setAttribute("opacity", win(s, T_CTA + 0.7, T_CTA + 1.0).toFixed(3));
          confetti.forEach((e, i) => {
            const burst = (t0) => { const q = clamp((s - t0) / 2.2, 0, 1); return q; };
            const t0 = s > T_PULL ? T_PULL : T_BAN, q = burst(t0);
            const x = 560 + ((i * 97) % 520 - 260) * (0.3 + q), y = -40 + 700 * q * q + 80 * Math.sin(i + s * 3) * q;
            e.setAttribute("opacity", ch === 3 && s > t0 && q < 1 ? (1 - q * q).toFixed(3) : 0);
            e.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(i * 40 + s * 300)})`);
          });
          // heart meter: cracks, then heals at the surprise
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_C3 ? 1 : 0);
          const heal = win(s, T_HEAL, T_HEAL + 0.4);
          hm.setAttribute("opacity", s > 0.2 && s < T_CTA + 0.3 ? 1 : 0);
          const pulse = 1 + 0.08 * Math.max(0, Math.sin(s * 7)) * (lvl === 0 || heal > 0.5 ? 1 : 0.3) + 0.35 * Math.sin(Math.PI * clamp((s - T_HEAL) / 0.5, 0, 1));
          const jolt = [T_C1, T_C2, T_C3].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(hp.head[0] + jolt)} ${r1(hp.head[1] - 112)}) scale(${(0.9 * pulse).toFixed(3)})`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2, T_C3][i] ? (1 - heal).toFixed(3) : 0));
          hmH.setAttribute("fill", heal > 0.5 ? "#ff3b30" : ["#ff3b30", "#e8332a", "#c42c26", "#9e2622"][lvl]);
          hmGlow.setAttribute("opacity", (0.5 * (heal > 0.5 ? 1.4 : 1 - 0.2 * lvl)).toFixed(3));
          her.g.style.filter = `brightness(${lerp(1 - 0.15 * lvl, 1, heal).toFixed(3)})`;
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bGM, T_GM, T_PAST, [hp.head[0] + 30, hp.head[1] - 190]);
          bub(bHug, T_ASK, T_NOTNOW, [hp.head[0] + 20, hp.head[1] - 190]);
          bub(bNot, T_NOTNOW, T_C2 + 0.6, [mp.head[0] + 10, mp.head[1] - 110]);
          bub(bDin, T_DIN, T_NH, [hp.head[0] + 40, hp.head[1] - 190]);
          bub(bNH, T_NH, T_C3 + 0.6, [mp.head[0] - 20, mp.head[1] - 110]);
          bub(bSur, T_BAN + 0.1, T_HUG + 0.4, [mp.head[0] + 10, mp.head[1] - 110]);

          tag.textContent = s < T_CTA ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.1 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "HE WASN'T IGNORING HER.", L3 = "HE WAS BUSY LOVING HER.";
          E("head").innerHTML = `<div>HE IGNORED HER ALL DAY.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          const sq2 = s - (T_PULL + 0.5), a1 = "MORE LOVE STORIES", a2 = "EVERY DAY.";
          sub.innerHTML = sq2 > 0 ? `${a1.slice(0, Math.floor(sq2 * 30))}&nbsp;<br/>${a2.slice(0, Math.max(0, Math.floor((sq2 - 0.6) * 30)))}&nbsp;` : "";
          fade.style.opacity = win(s, DUR - 0.4, DUR - 0.02).toFixed(3);
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
