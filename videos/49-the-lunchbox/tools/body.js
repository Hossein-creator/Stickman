        // ---------- "the lunchbox": on the bus she sits behind him every day. He tells his friend he misses his mom's dumplings. That night she cooks them, the next morning she slips the box into his bag. At lunch he finds it with a heart note. Next day he sits down next to her and shares ----------
        // remake of a 1064x outlier (90s Memory Dreams, "a love story that began with goat brain fry"), see viral/2026-10-30b-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 8000); }
        }
        const W = E("world");
        const backG = E("back");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const frontG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats (each scene is its own set; the camera cuts) ----------
        const T_SAY = 0.5, T_HEARD = 1.1, S_KIT = 3.0, T_COOK = 3.3, T_PACK = 4.3, T_NOTE = 4.8, S_BUS2 = 5.5, T_SLIP = 6.1, T_SLIP1 = 6.9;
        const S_DESK = 7.5, T_TAKE = 7.8, T_OPEN = 8.3, T_READ = 8.8, T_SMILE = 9.4, S_BUS3 = 10.1, T_SITNEXT = 10.6, T_SHARE = 11.0, T_HOLD = 11.4;
        const T_H1 = 12.2, T_H2 = 13.1, T_CARD = 14.2;
        const KIT = 2200, DESK = 4400;
        const SHE = 400, HE = 620, FR = 840, SEATY = FL - 88;

        // ---------- bus: wall, windows with passing lights, seats ----------
        svgEl("rect", { x: 130, y: FL - 430, width: 960, height: 430, fill: "#16181f", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        const winClip = svgEl("clipPath", { id: "busWin" }, E("svg").querySelector("defs"));
        for (let i = 0; i < 4; i++) svgEl("rect", { x: 170 + i * 230, y: FL - 380, width: 190, height: 130, rx: 14 }, winClip);
        for (let i = 0; i < 4; i++) svgEl("rect", { x: 170 + i * 230, y: FL - 380, width: 190, height: 130, rx: 14, fill: "#1e2a40", stroke: "#000", "stroke-width": 5 }, backG);
        const streakG = svgEl("g", { "clip-path": "url(#busWin)" }, backG);
        const streaks = Array.from({ length: 10 }, (_, i) => ({ y: FL - 370 + (i * 37) % 120, o: (i * 0.29) % 1, el: svgEl("rect", { height: 5, width: 90, rx: 3, fill: i % 3 ? "#ffcf8a" : "#9fc0ff", opacity: 0.6 }, streakG) }));
        svgEl("line", { x1: 130, y1: FL - 400, x2: 1090, y2: FL - 400, stroke: "#777", "stroke-width": 6 }, backG);
        const seat = (x) => { svgEl("path", { d: `M${x - 52} ${FL - 230} L${x - 36} ${FL - 230} L${x - 24} ${FL - 84} L${x - 48} ${FL - 84} Z`, fill: "#3f5a8a", stroke: "#000", "stroke-width": 5 }, roomG); svgEl("rect", { x: x - 50, y: FL - 88, width: 100, height: 22, rx: 8, fill: "#4a6aa0", stroke: "#000", "stroke-width": 5 }, frontG); svgEl("rect", { x: x - 6, y: FL - 66, width: 12, height: 66, fill: "#555", stroke: "#000", "stroke-width": 3 }, roomG); };
        [SHE, HE, FR].forEach(seat);
        // ---------- kitchen at night ----------
        svgEl("rect", { x: KIT + 300, y: FL - 470, width: 170, height: 150, fill: "#0e1830", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("circle", { cx: KIT + 430, cy: FL - 430, r: 16, fill: "#e6e8f0" }, backG);
        svgEl("circle", { cx: KIT + 560, cy: FL - 300, r: 380, fill: "url(#fireGlow)", opacity: 0.4 }, backG);
        svgEl("rect", { x: KIT + 560, y: FL - 150, width: 240, height: 150, fill: "#3b3b40", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("path", { d: `M${KIT + 600} ${FL - 156} L${KIT + 606} ${FL - 210} L${KIT + 680} ${FL - 210} L${KIT + 686} ${FL - 156} Z`, fill: "#7c7f88", stroke: "#000", "stroke-width": 5 }, roomG);
        const kitBox = svgEl("g", {}, roomG);
        // ---------- office desk at lunch ----------
        svgEl("rect", { x: DESK + 300, y: FL - 470, width: 300, height: 170, fill: "#7aa8d8", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("rect", { x: DESK + 540, y: FL - 112, width: 260, height: 14, rx: 3, fill: "#5a4330", stroke: "#000", "stroke-width": 4 }, roomG);
        for (const lx of [DESK + 556, DESK + 770]) svgEl("rect", { x: lx, y: FL - 98, width: 12, height: 98, fill: "#5a4330", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("rect", { x: DESK + 680, y: FL - 196, width: 90, height: 70, rx: 4, fill: "#222", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: DESK + 470, y: FL - 82, width: 70, height: 12, rx: 3, fill: "#333", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: DESK + 500, y: FL - 70, width: 10, height: 70, fill: "#333" }, roomG);

        // ---------- people ----------
        const friend = makeFig(figG, "#bdbdbd", "#a5a5a5", false, "friend");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bag = svgEl("g", {}, roomG);
        svgEl("rect", { x: -34, y: -60, width: 68, height: 60, rx: 10, fill: "#4a5a3a", stroke: "#000", "stroke-width": 4 }, bag);
        svgEl("path", { d: "M-16 -60 Q0 -84 16 -60", fill: "none", stroke: "#000", "stroke-width": 4 }, bag);
        // the box with dumplings + the heart note
        const box = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -40, y: -34, width: 80, height: 34, rx: 6, fill: "#e8c14a", stroke: "#000", "stroke-width": 4 }, box);
        const dumps = svgEl("g", { opacity: 0 }, box);
        for (const x of [-22, 0, 22]) svgEl("path", { d: `M${x - 12} -30 Q${x} -50 ${x + 12} -30 Z`, fill: "#f6f0e0", stroke: "#000", "stroke-width": 3 }, dumps);
        const lid = svgEl("rect", { x: -42, y: -42, width: 84, height: 12, rx: 5, fill: "#d8a830", stroke: "#000", "stroke-width": 4 }, box);
        const note = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -26, y: -22, width: 52, height: 40, rx: 3, fill: "#ffd0dc", stroke: "#000", "stroke-width": 3 }, note);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, transform: "translate(0 2) scale(0.42)" }, note);
        const say = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -100, y: -70, width: 200, height: 110, rx: 36, fill: "#fff", stroke: "#000", "stroke-width": 5 }, say);
        svgEl("path", { d: "M-8 38 L-24 72 L14 38 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, say);
        svgEl("rect", { x: -12, y: 30, width: 22, height: 12, fill: "#fff" }, say);
        for (const x of [-34, 0, 34]) svgEl("path", { d: `M${x - 14} -20 Q${x} -46 ${x + 14} -20 Z`, fill: "#f6f0e0", stroke: "#000", "stroke-width": 3 }, say);
        const sayTx = svgEl("text", { x: 0, y: 18, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#111", "text-anchor": "middle" }, say);
        sayTx.textContent = "LIKE MOM'S...";
        const sayTx2 = svgEl("text", { x: 50, y: 32, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#555", "text-anchor": "middle" }, say);
        sayTx2.textContent = "";
        const smallHeart = svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const steams = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#e8e8e8", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const warm = svgEl("ellipse", { cx: 0, cy: FL - 160, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- poses ----------
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const seated = (x, f, y = SEATY) => base({ hx: x, hy: y, torso: 4, head: 0, ax: x + f * 64, ay: FL, bx: x + f * 50, by: FL, aw: 1, atx: x + f * 56, aty: y - 20, bw: 1, btx: x + f * 46, bty: y - 16 });
        const scene = (s) => (s < S_KIT ? 0 : s < S_BUS2 ? 1 : s < S_DESK ? 2 : s < S_BUS3 ? 3 : 4);
        function herRaw(s) {
          const sc = scene(s);
          if (sc === 1) {   // cooking at night
            const st = standOn(KIT + 520, 1, FL); st.torso = 14; st.head = 14;
            const stir = hold(s, T_COOK, T_PACK);
            reachTo(st, stir, [KIT + 640 + 16 * Math.cos(s * 8), FL - 220 + 6 * Math.sin(s * 8)]);
            const pack = hold(s, T_PACK, S_BUS2);
            reachTo(st, pack, [KIT + 590, FL - 170]); reachTo(st, pack, [KIT + 600, FL - 166], "b");
            return st;
          }
          const st = seated(SHE, 1);
          st.head = 6;
          if (sc === 0) { const lean = hold(s, T_HEARD, S_KIT, 0.3); st.torso += 14 * lean; st.head -= 6 * lean; }
          if (sc === 2) { const sl = hold(s, T_SLIP, T_SLIP1, 0.25); st.torso += 46 * sl; st.head += 10 * sl; reachTo(st, sl, [HE - 10, FL - 50]); }
          if (sc === 4) { st.head = 10; const sh = win(s, T_SHARE + 0.2, T_SHARE + 0.6); st.head = lerp(st.head, -10, sh); }
          return st;
        }
        function himRaw(s) {
          const sc = scene(s);
          if (sc === 3) {   // at his desk
            const st = seated(DESK + 500, 1, FL - 92);
            const take = hold(s, T_TAKE, T_OPEN + 0.1, 0.2);
            reachTo(st, take, [DESK + 470, FL - 40]);
            const open = win(s, T_OPEN, T_OPEN + 0.25);
            reachTo(st, open, [DESK + 600, FL - 150]); reachTo(st, open, [DESK + 590, FL - 146], "b");
            const read = hold(s, T_READ, T_SMILE + 0.4, 0.2);
            reachTo(st, read, [DESK + 580, FL - 230]); st.head = lerp(st.head, -4, read);
            const sm = win(s, T_SMILE, T_SMILE + 0.3); st.head -= 14 * sm; st.torso -= 6 * sm;
            return st;
          }
          if (sc === 4) {   // sits down next to her and shares
            if (s < T_SITNEXT) { const st = standOn(lerp(HE + 40, SHE + 112, ease((s - S_BUS3) / (T_SITNEXT - S_BUS3))), -1, FL); return st; }
            const st = seated(SHE + 112, 1);
            const sh = win(s, T_SHARE, T_SHARE + 0.3);
            reachTo(st, sh, [SHE + 200, SEATY - 70]); st.head = lerp(4, -14, sh) + 4 * Math.sin(s * 2);
            return st;
          }
          const st = seated(HE, 1);
          if (sc === 0) { const talk = hold(s, T_SAY, S_KIT - 0.2); st.head = lerp(2, 10, talk); reachTo(st, talk * Math.abs(Math.sin(s * 5)), [HE + 70, SEATY - 120]); }
          if (sc === 2) { st.head = 30; st.torso = 10; }   // dozing against the window
          return st;
        }
        const himF = (s) => (scene(s) === 4 && s < T_SITNEXT ? -1 : 1);
        function friendRaw(s) { const st = seated(FR, -1); st.head = 6 + 4 * Math.sin(s * 1.3); return st; }

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
        card.innerHTML = `<div id="cm1" style="font-size:58px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE MOST IMPORTANT THING<br/>IN COMMUNICATION IS HEARING<br/>WHAT ISN'T SAID."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">PETER DRUCKER</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys: time, scale, world x, world y at screen 1180, roll (cuts = two keys at the same time) ----------
        const CK = [
          [0, 1.9, 620, 440, 0], [0.5, 2.3, 640, 420, 0], [1.1, 2.4, 540, 430, 0], [2.99, 2.3, 540, 430, 0],
          [3.0, 2.2, KIT + 600, 440, 0], [4.2, 2.6, KIT + 620, 430, 0], [5.49, 2.8, KIT + 610, 440, 0],
          [5.5, 2.0, 560, 450, 0], [6.1, 2.6, 520, 470, 0], [7.49, 2.4, 540, 460, 0],
          [7.5, 2.2, DESK + 560, 450, 0], [8.3, 2.6, DESK + 600, 440, 0], [8.8, 3.2, DESK + 590, 420, 0], [10.09, 2.6, DESK + 570, 430, 0],
          [10.1, 1.9, 520, 450, 0], [11.4, 2.3, 470, 440, 0], [99, 2.1, 470, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i];
          if (b[0] - a[0] < 0.02) return b.slice();
          const k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const LABEL = (s) => (s < S_KIT ? "" : s < S_BUS2 ? "THAT NIGHT" : s < S_DESK ? "NEXT MORNING" : s < S_BUS3 ? "LUNCH" : "THE NEXT DAY");

        // ---------- per-frame render ----------
        function render(t) {
          const s = t, sc = scene(s);
          const [, cs, cx, cy, cr] = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) rotate(${cr.toFixed(2)}) scale(${cs.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          streaks.forEach((st) => { const x = 1100 - frac(t * 0.9 + st.o) * 1100; st.el.setAttribute("x", r1(x)); st.el.setAttribute("y", st.y); });
          const fp = drawFig(friend, livePose(friendRaw, s, 2.2), -1);
          friend.g.setAttribute("opacity", sc === 0 ? 1 : 0); friend.g.previousSibling && friend.g.previousSibling.setAttribute && 0;
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          her.g.setAttribute("opacity", sc === 3 ? 0 : 1); bun.setAttribute("opacity", sc === 3 ? 0 : 1);
          him.g.setAttribute("opacity", sc === 1 ? 0 : 1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // his bag on the bus floor next to him
          bag.setAttribute("transform", sc === 3 ? `translate(${DESK + 450} ${FL})` : `translate(${HE + 70} ${FL})`);
          bag.setAttribute("opacity", sc === 0 || sc === 2 || sc === 3 ? 1 : 0);
          // speech: dumplings
          const k = hold(s, T_SAY + 0.1, S_KIT - 0.3, 0.15);
          say.setAttribute("opacity", k.toFixed(3));
          say.setAttribute("transform", `translate(${r1(mp.head[0] - 10)} ${r1(mp.head[1] - 120)}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`);
          const hk = hold(s, T_HEARD + 0.2, S_KIT, 0.2);
          smallHeart.setAttribute("opacity", hk.toFixed(3));
          smallHeart.setAttribute("transform", `translate(${r1(hp.head[0])} ${r1(hp.head[1] - 70 - 10 * Math.sin(t * 4))}) scale(0.5)`);
          // the box: packed at night, slipped into the bag, opened at lunch, shared
          let bx = 0, by = 0, bo = 0, open = 0;
          if (sc === 1 && s > T_PACK) { bx = KIT + 595; by = FL - 156; bo = 1; open = s < T_NOTE + 0.3 ? 1 : 0; }
          if (sc === 2) { const q = win(s, T_SLIP + 0.2, T_SLIP1 - 0.1); bx = lerp(hp.hands[0][0], HE + 70, q); by = lerp(hp.hands[0][1] + 10, FL - 30, q); bo = s < T_SLIP1 ? 1 : 0; }
          if (sc === 3) { const take = win(s, T_TAKE + 0.1, T_OPEN); bx = lerp(DESK + 450, DESK + 620, take); by = lerp(FL - 50, FL - 112, take); bo = s > T_TAKE + 0.05 ? 1 : 0; open = win(s, T_OPEN, T_OPEN + 0.25); }
          if (sc === 4) { bx = s > T_SHARE ? lerp(SHE + 190, SHE + 150, win(s, T_SHARE, T_SHARE + 0.3)) : SHE + 190; by = SEATY - 50; bo = s > T_SITNEXT ? 1 : 0; open = 1; }
          box.setAttribute("opacity", bo); box.setAttribute("transform", `translate(${r1(bx)} ${r1(by)})`);
          lid.setAttribute("transform", `translate(${r1(-40 * open)} ${r1(-30 * open)})`); lid.setAttribute("opacity", (1 - open).toFixed(3));
          dumps.setAttribute("opacity", open.toFixed(3));
          // the note: put in at night, read at lunch
          let no = 0, nx = 0, ny = 0, ns = 1;
          if (sc === 1 && s > T_NOTE) { no = s < T_NOTE + 0.5 ? 1 : 0; nx = hp.hands[1][0]; ny = hp.hands[1][1] - 10; }
          if (sc === 3 && s > T_READ) { no = 1; nx = mp.hands[0][0] + 10; ny = mp.hands[0][1] - 20; ns = 1.4; }
          note.setAttribute("opacity", no); note.setAttribute("transform", `translate(${r1(nx)} ${r1(ny)}) scale(${ns})`);
          steams.forEach((st, j) => { const p = frac(t * 0.5 + j / 3), on = sc === 1 && s > T_COOK && s < T_PACK + 0.3 ? 1 : 0; st.setAttribute("d", `M${KIT + 625 + 18 * j} ${r1(FL - 216 - p * 50)} q${r1(8 * Math.sin(p * 6 + j))} -18 0 -36`); st.setAttribute("opacity", (on * 0.5 * Math.sin(Math.PI * p)).toFixed(3)); });
          // hearts
          const sm = sc === 3 ? clamp((s - T_SMILE) / 0.4, 0, 1) : 0;
          const end = sc === 4 ? clamp((s - T_HOLD) / 0.4, 0, 1) : 0;
          const hq = Math.max(sm, end), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          const hc = sc === 3 ? [mp.head[0] + 20, mp.head[1] - 100] : [(mp.head[0] + hp.head[0]) / 2, Math.min(mp.head[1], hp.head[1]) - 100];
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hq) * (sc === 4 ? 1.1 : 0.8) * beat).toFixed(3)})`);
          warm.setAttribute("cx", sc === 3 ? DESK + 560 : 470); warm.setAttribute("opacity", (0.8 * Math.max(win(s, T_SMILE, T_SMILE + 0.6) * (sc === 3 ? 1 : 0), win(s, T_HOLD - 0.2, T_HOLD + 0.8) * (sc === 4 ? 1 : 0))).toFixed(3));
          // scene label
          E("num").textContent = LABEL(s);
          const st0 = [S_KIT, S_BUS2, S_DESK, S_BUS3].filter((a) => s >= a).pop() || 0;
          E("ctr").style.opacity = (sc === 0 || s > T_H1 - 0.4 ? 0 : 1 - win(s, st0 + 0.9, st0 + 1.2)).toFixed(3);

          E("h1").innerHTML = slam(["SHE", "NEVER", "SAID", "A", "WORD."], [T_H1, T_H1 + 0.12, T_H1 + 0.24, T_H1 + 0.36, T_H1 + 0.48], t, []);
          E("h2").innerHTML = slam(["SHE", "JUST", "LISTENED."], [T_H2, T_H2 + 0.15, T_H2 + 0.3], t, [2]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOVE", "IS", "LISTENING"], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["TO", "THE", "SMALL", "THINGS."], [T_CARD + 0.75, T_CARD + 0.87, T_CARD + 1.0, T_CARD + 1.12], t, [2]);
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
