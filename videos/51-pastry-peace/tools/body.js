        // ---------- "pastry peace": earlier she stops at a bakery window and stares at one pink pastry; he notices. That evening she's mad at him, hangs up, storm cloud over her head. He comes home with a tiny box: that pastry. The cloud turns into a heart. "HOW DID YOU KNOW?" ----------
        // remake of a 40.1x outlier (Ai story world, "biwi ki narazgi aur pastry wala pyaar"), see viral/2026-10-30b-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 6000); }
        }
        const W = E("world");
        const backG = E("back");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const propG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_STOP = 0.9, T_STARE = 1.0, T_NOTICE = 1.7, T_GO = 2.2, S_HOME = 2.7, T_CALL = 2.9, T_HANG = 3.7, T_CROSS = 4.2;
        const T_DOOR = 5.9, T_KNEEL = 6.9, T_AWAY = 6.5, T_OPEN = 7.5, T_PEEK = 8.0, T_MELT = 8.4, T_HUG = 9.2, T_HOW = 9.6, S_FLASH = 10.1, S_BACK = 10.9;
        const T_H1 = 11.8, T_H2 = 12.7, T_CARD = 14.0;
        const HOME = 3000, WINX = 560, COUCH = HOME + 480, DOOR = HOME + 980, SEAT = FL - 66;

        // ---------- street: bakery window with one pink pastry ----------
        svgEl("rect", { x: 300, y: FL - 470, width: 560, height: 470, fill: "#1c1a22", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 420, y: FL - 430, width: 300, height: 64, rx: 10, fill: "#ff7aa8", stroke: "#000", "stroke-width": 5 }, backG);
        const sign = svgEl("text", { x: 570, y: FL - 384, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#fff", "text-anchor": "middle" }, backG); sign.textContent = "BAKERY";
        svgEl("rect", { x: WINX - 150, y: FL - 340, width: 300, height: 200, fill: "#ffe9c8", stroke: "#000", "stroke-width": 6 }, backG);
        svgEl("circle", { cx: WINX, cy: FL - 240, r: 140, fill: "url(#fireGlow)", opacity: 0.6 }, backG);
        const pastryShape = (g, s) => { svgEl("path", { d: `M${-40 * s} 0 L${40 * s} 0 L${40 * s} ${-26 * s} L${-40 * s} ${-44 * s} Z`, fill: "#f6d6a0", stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: `M${-40 * s} ${-28 * s} L${40 * s} ${-12 * s} L${40 * s} ${-26 * s} L${-40 * s} ${-44 * s} Z`, fill: "#ff7aa8", stroke: "#000", "stroke-width": 4 }, g); svgEl("circle", { cx: 0, cy: -46 * s, r: 9 * s, fill: "#e0303a", stroke: "#000", "stroke-width": 3 }, g); };
        const winPastry = svgEl("g", { transform: `translate(${WINX} ${FL - 170})` }, backG); pastryShape(winPastry, 1.2);
        for (const x of [WINX - 110, WINX + 110]) { const g = svgEl("g", { transform: `translate(${x} ${FL - 170})`, opacity: 0.55 }, backG); svgEl("circle", { cx: 0, cy: -24, r: 24, fill: "#c88a50", stroke: "#000", "stroke-width": 4 }, g); }
        // ---------- home ----------
        svgEl("rect", { x: HOME + 300, y: FL - 470, width: 190, height: 160, fill: "#1a2440", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("circle", { cx: HOME + 420, cy: FL - 260, r: 380, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("rect", { x: DOOR - 60, y: FL - 280, width: 120, height: 280, fill: "#ffcf8a", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const doorLeaf = svgEl("rect", { x: DOOR - 56, y: FL - 276, width: 112, height: 276, fill: "#4a3a2c", stroke: "#000", "stroke-width": 4 }, backG);
        svgEl("rect", { x: COUCH - 160, y: FL - 150, width: 320, height: 90, rx: 22, fill: "#6a4f6a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH - 190, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#5e455e", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH + 140, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#5e455e", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH - 170, y: SEAT, width: 340, height: 52, rx: 14, fill: "#7a5f7a", stroke: "#000", "stroke-width": 5 }, roomG);
        const warm = svgEl("ellipse", { cx: COUCH + 60, cy: FL - 160, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- people + props ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const box = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -30, y: -40, width: 60, height: 40, rx: 4, fill: "#ffd0dc", stroke: "#000", "stroke-width": 4 }, box);
        svgEl("path", { d: "M0 -40 L0 0 M-30 -20 L30 -20", stroke: "#ff3b6b", "stroke-width": 4 }, box);
        const boxLid = svgEl("rect", { x: -32, y: -48, width: 64, height: 10, rx: 3, fill: "#ffb0c4", stroke: "#000", "stroke-width": 4 }, box);
        const pastry = svgEl("g", { opacity: 0 }, fxG); pastryShape(pastry, 0.8);
        const sparkle = svgEl("path", { d: "M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z", fill: "#fff6b0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const stareHearts = Array.from({ length: 4 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bang = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 56, fill: "#ffd060", "text-anchor": "middle", opacity: 0 }, fxG); bang.textContent = "!";
        // storm cloud over her head -> heart
        const cloud = svgEl("g", { opacity: 0 }, fxG);
        for (const [x, y, r] of [[-40, 0, 34], [0, -16, 42], [44, 0, 34], [0, 10, 34]]) svgEl("circle", { cx: x, cy: y, r, fill: "#4a4e58", stroke: "#000", "stroke-width": 4 }, cloud);
        const bolt = svgEl("path", { d: "M-6 30 L10 30 L0 52 L14 52 L-10 84 L-2 60 L-14 60 Z", fill: "#ffd060", stroke: "#000", "stroke-width": 3 }, cloud);
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const bubble = (txt, w, size = 32) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: "#111", "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bAngry = bubble("HMPH!", 150), bHow = bubble("HOW DID YOU KNOW?", 360);
        const sepia = document.createElement("div");
        sepia.style.cssText = "position:absolute;inset:0;background:rgba(150,110,50,0.32);mix-blend-mode:multiply;opacity:0";
        E("stage").appendChild(sepia);

        // ---------- poses ----------
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 110, 12), sw = Math.sin((Math.PI * 2 * (x - x0)) / 110); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 26 * sw, ael: 20, bsh: -4 - 26 * sw, bel: 20 }); };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const scene = (s) => (s < S_HOME ? 0 : s < S_FLASH ? 1 : s < S_BACK ? 0 : 1);
        const SITX = COUCH - 40;
        function herRaw(s) {
          if (scene(s) === 0) {
            const flash = s >= S_FLASH;
            if (!flash && s < T_STOP) return walking(150, lerp(150, WINX, ease(s / T_STOP)));
            if (!flash && s >= T_GO) return walking(WINX, lerp(WINX, WINX + 300, ease((s - T_GO) / 0.6)));
            const st = standOn(WINX, 1, FL); st.head = -22; st.torso = -4; reachTo(st, 1, [WINX + 30, stand - 120]); reachTo(st, 1, [WINX + 22, stand - 112], "b");
            return st;
          }
          const st = base({ hx: SITX, hy: SEAT - 8, torso: 0, head: 0, ax: SITX + 64, ay: FL, bx: SITX + 50, by: FL, aw: 1, atx: SITX + 50, aty: SEAT - 90, bw: 1, btx: SITX + 40, bty: SEAT - 84 });
          // on the phone, angry, hangs up
          const ph = hold(s, T_CALL, T_HANG + 0.2, 0.15);
          reachTo(st, ph, [SITX + 20, SEAT - 200]); st.head -= 6 * ph;
          const throwK = Math.sin(Math.PI * clamp((s - T_HANG) / 0.3, 0, 1)); reachTo(st, throwK, [SITX - 120, SEAT - 120]);
          // arms crossed, turns her head away from him
          const cross = hold(s, T_CROSS, T_OPEN + 0.5, 0.25);
          reachTo(st, cross, [SITX + 30, SEAT - 130]); reachTo(st, cross, [SITX + 18, SEAT - 124], "b"); st.torso -= 6 * cross;
          const away = hold(s, T_AWAY, T_PEEK, 0.2); st.head -= 30 * away; st.torso -= 8 * away;
          const peek = win(s, T_PEEK, T_PEEK + 0.3); st.head += 12 * peek * (1 - win(s, T_MELT, T_MELT + 0.3));
          // melts: takes the pastry, hugs him
          const hug = win(s, T_HUG, T_HUG + 0.4); st.torso = lerp(st.torso, 30, hug); st.head = lerp(st.head, -10, hug);
          reachTo(st, hug, [SITX + 160, SEAT - 170]);
          return st;
        }
        const herF = () => 1;
        const KNX = COUCH + 190;
        function himRaw(s) {
          if (scene(s) === 0) {
            if (s >= S_FLASH) { const st = standOn(WINX - 140, 1, FL); st.head = -10; return st; }
            if (s < T_STOP + 0.15) return walking(0, lerp(0, WINX - 140, ease(s / (T_STOP + 0.15))));
            if (s >= T_GO + 0.1) return walking(WINX - 140, lerp(WINX - 140, WINX + 160, ease((s - T_GO - 0.1) / 0.6)));
            const st = standOn(WINX - 140, 1, FL); const n = win(s, T_NOTICE, T_NOTICE + 0.2); st.head = lerp(6, -22, n); return st;
          }
          if (s < T_DOOR) return standOn(DOOR + 200, -1, FL);
          if (s < T_KNEEL) { const p = walking(DOOR, lerp(DOOR, KNX + 20, ease((s - T_DOOR) / (T_KNEEL - T_DOOR)))); reachTo(p, 1, [p.hx - 40, stand - 70]); return p; }
          // kneels, holds the box out, opens it
          const kn = base({ hx: KNX, hy: FL - 96, torso: 10, head: 6, ax: KNX - 58, ay: FL, bx: KNX + 64, by: FL - 2 });
          reachTo(kn, 1, [KNX - 90, FL - 150]); reachTo(kn, 1, [KNX - 80, FL - 146], "b");
          const open = win(s, T_OPEN, T_OPEN + 0.25); kn.btx = lerp(kn.btx, KNX - 40, open); kn.bty = lerp(kn.bty, FL - 190, open);
          const hug = win(s, T_HUG, T_HUG + 0.4); kn.head = lerp(kn.head, -10, hug);
          return mixPose(standOn(KNX + 20, -1, FL), kn, win(s, T_KNEEL, T_KNEEL + 0.3));
        }
        const himF = (s) => (scene(s) === 0 ? 1 : -1);

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:90px;right:90px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:56px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:46px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE BEST THING TO HOLD ONTO<br/>IN LIFE IS EACH OTHER."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">AUDREY HEPBURN</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera (cuts = two keys at the same time) ----------
        const CK = [
          [0, 1.8, 420, 450, 0], [1.0, 2.0, 520, 440, 0], [1.7, 2.4, 480, 430, 0], [2.69, 2.0, 560, 450, 0],
          [2.7, 2.2, SITX + 20, 440, 0], [3.7, 2.5, SITX + 20, 430, 0], [5.8, 1.6, HOME + 640, 460, 0], [6.9, 1.9, COUCH + 50, 450, 0],
          [7.5, 2.6, COUCH + 60, 430, 0], [10.09, 2.3, COUCH + 50, 440, 0],
          [10.1, 2.4, WINX - 40, 430, 0], [10.89, 2.6, WINX - 20, 430, 0],
          [10.9, 2.1, COUCH + 50, 450, 0], [99, 2.0, COUCH + 50, 455, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i];
          if (b[0] - a[0] < 0.02) return b.slice();
          const k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const LABEL = (s) => (s < S_HOME ? "EARLIER THAT DAY" : s < S_FLASH ? (s < 4.0 ? "THAT EVENING" : "") : s < S_BACK ? "EARLIER THAT DAY" : "");

        // ---------- per-frame render ----------
        function render(t) {
          const s = t, sc = scene(s);
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          hit(T_HANG, 0.6, 0.15); hit(T_OPEN, 0.5, 0.2); hit(T_MELT, 0.4, 0.25);
          const [, cs, cx, cy, cr] = camAt(s);
          const scl = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${scl.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          sepia.style.opacity = s >= S_FLASH && s < S_BACK ? 1 : 0;

          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // staring at the pastry: little hearts drift to the window; his "!" when he notices
          stareHearts.forEach((h, i) => { const q = frac(t * 0.8 + i / 4), on = sc === 0 && ((s > T_STARE && s < T_GO) || s >= S_FLASH); h.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(hp.head[0] + 20 + 40 * q)} ${r1(hp.head[1] - 40 - 60 * q)}) scale(0.4)`); });
          const bk = sc === 0 ? Math.max(hold(s, T_NOTICE, T_GO + 0.1, 0.1), s >= S_FLASH ? 1 : 0) : 0;
          bang.setAttribute("opacity", bk.toFixed(3)); bang.setAttribute("x", r1(mp.head[0] + 10)); bang.setAttribute("y", r1(mp.head[1] - 50));
          // phone: at her ear, then thrown onto the couch
          const onPhone = sc === 1 && s > T_CALL && s < T_HANG + 0.15;
          const thrown = sc === 1 && s >= T_HANG + 0.15;
          phone.setAttribute("opacity", onPhone || thrown ? 1 : 0);
          if (onPhone) phone.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])})`);
          else { const q = clamp((s - T_HANG - 0.15) / 0.3, 0, 1); phone.setAttribute("transform", `translate(${r1(lerp(SITX - 100, SITX - 130, q))} ${r1(lerp(SEAT - 130, SEAT - 4, q) - 40 * Math.sin(Math.PI * q))}) rotate(${r1(-80 * q)})`); }
          const ka = sc === 1 ? hold(s, T_HANG - 0.2, T_HANG + 0.6, 0.1) : 0;
          bAngry.setAttribute("opacity", ka.toFixed(3)); bAngry.setAttribute("transform", `translate(${r1(hp.head[0] + 30)} ${r1(hp.head[1] - 110)}) scale(${(0.6 + 0.4 * backOut(ka)).toFixed(3)})`);
          // the cloud over her head, it melts into the heart
          const ck = sc === 1 ? win(s, T_CROSS - 0.2, T_CROSS + 0.3) * (1 - win(s, T_MELT, T_MELT + 0.4)) : 0;
          cloud.setAttribute("opacity", ck.toFixed(3));
          cloud.setAttribute("transform", `translate(${r1(hp.head[0] + 6 * Math.sin(t * 2))} ${r1(hp.head[1] - 100)}) scale(${(0.75 - 0.4 * win(s, T_MELT, T_MELT + 0.4)).toFixed(3)})`);
          bolt.setAttribute("opacity", frac(t * 1.3) < 0.15 ? 1 : 0);
          const hq = sc === 1 ? clamp((s - T_MELT - 0.2) / 0.4, 0, 1) : 0, beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          const hx = s < T_HUG ? hp.head[0] : (hp.head[0] + mp.head[0]) / 2, hy = s < T_HUG ? hp.head[1] - 100 : Math.min(hp.head[1], mp.head[1]) - 110;
          heart.setAttribute("transform", `translate(${r1(hx)} ${r1(hy)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (sc === 1 ? 0.8 * win(s, T_MELT, T_MELT + 1) : 0).toFixed(3));
          // the box + pastry
          const boxOn = sc === 1 && s > T_DOOR && s < T_HUG + 0.2;
          box.setAttribute("opacity", boxOn ? 1 : 0);
          const bh = mp.hands[0];
          box.setAttribute("transform", `translate(${r1(bh[0] - 6)} ${r1(bh[1] + 30)})`);
          const open = sc === 1 ? win(s, T_OPEN, T_OPEN + 0.25) : 0;
          boxLid.setAttribute("transform", `translate(${r1(20 * open)} ${r1(-60 * open)}) rotate(${r1(30 * open)})`);
          boxLid.setAttribute("opacity", open > 0.95 ? 0 : 1);
          const pOn = sc === 1 && s > T_OPEN;
          pastry.setAttribute("opacity", pOn ? 1 : 0);
          const px = s < T_HUG ? bh[0] - 6 : hp.hands[1][0], py = s < T_HUG ? bh[1] + 30 - 40 - 30 * open : hp.hands[1][1];
          pastry.setAttribute("transform", `translate(${r1(px)} ${r1(py)})`);
          sparkle.setAttribute("opacity", pOn && s < T_HUG ? (0.6 + 0.4 * Math.sin(t * 20)).toFixed(3) : 0);
          sparkle.setAttribute("transform", `translate(${r1(px + 30)} ${r1(py - 50)}) rotate(${r1(t * 90)})`);
          const kh = sc === 1 ? hold(s, T_HOW, S_FLASH + 0.01, 0.12) : 0;
          bHow.setAttribute("opacity", kh.toFixed(3)); bHow.setAttribute("transform", `translate(${r1(hp.head[0] + 40)} ${r1(hp.head[1] - 120)}) scale(${(0.6 + 0.4 * backOut(kh)).toFixed(3)})`);
          // door
          const dq = sc === 1 ? hold(s, T_DOOR - 0.2, T_DOOR + 0.7, 0.2) : 0;
          doorLeaf.setAttribute("transform", `translate(${DOOR - 56} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1) translate(${-(DOOR - 56)} 0)`);
          // labels
          E("num").textContent = LABEL(s);
          E("ctr").style.opacity = (LABEL(s) ? 1 : 0) * (s > T_H1 - 0.4 ? 0 : 1);

          E("h1").innerHTML = slam(["SHE", "WAS", "MAD", "AT", "HIM."], [T_H1, T_H1 + 0.12, T_H1 + 0.24, T_H1 + 0.36, T_H1 + 0.48], t, []);
          E("h2").innerHTML = slam(["HE", "STILL", "REMEMBERED", "WHAT", "SHE", "LOVES."], [T_H2, T_H2 + 0.1, T_H2 + 0.2, T_H2 + 0.34, T_H2 + 0.44, T_H2 + 0.54], t, [5]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["DON'T", "WIN", "THE", "FIGHT."], [T_CARD, T_CARD + 0.13, T_CARD + 0.26, T_CARD + 0.4], t, []);
          E("cm2").innerHTML = slam(["WIN", "HER", "HEART."], [T_CARD + 0.8, T_CARD + 0.95, T_CARD + 1.1], t, [2]);
          E("cq").style.opacity = win(t, T_CARD + 1.5, T_CARD + 2.0).toFixed(3);
          fade.style.opacity = win(t, DUR - 0.3, DUR - 0.02).toFixed(3);
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
