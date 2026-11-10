        // ---------- "one-sided love" (NEW FORMAT, user 2026-11-10): he loves her, she has no interest and ignores him. Chapters DAY 1 / 30 / 90 / 365, a heart above him cracks with every ignore and he loses his color. DAY 365 the heart shatters, he puts the cake down and leaves. She looks up: "BABE?" Quote over the moving scene, then FOLLOW: the camera dives into her dropped phone, he walks onto the profile screen and taps "+ FOLLOW", his heart heals.
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
        const C = [0, 6.5, 12.5, 18.5];                      // chapter starts: DAY 1 / 30 / 90 / 365
        const T_FLOW = 1.0, T_PUSH = 2.9, T_C1 = 3.5;
        const T_STEP = 7.0, T_ARMS = 7.6, T_TURN = 8.3, T_C2 = 9.3;
        const T_LOVE = 13.4, T_MHM = 15.0, T_C3 = 16.2;
        const T_CAKE = 19.3, T_NOT = 20.6, T_BLOW = 21.5, T_SHAT = 22.0, T_DOWNC = 22.6, T_GO = 23.6, T_OUT = 26.0;
        const T_LOOK = 25.6, T_BABE = 26.0, T_DROP = 27.0, T_L2 = 26.3, T_L3 = 27.0;
        const T_Q = 28.2, T_PH = 31.8, T_WALK = 33.0, T_TAP = 34.6;
        const SHE = 470, HE = 640;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- room ----------
        const glowC = svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.22 }, backG);
        svgEl("polygon", { points: `460,${FL - 520} 660,${FL - 520} 780,${FL} 340,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        // window with moon (left), floor lamp (right)
        svgEl("rect", { x: 230, y: FL - 430, width: 150, height: 190, fill: "#0e1a30", stroke: "#3a3a42", "stroke-width": 8 }, roomG);
        svgEl("line", { x1: 305, y1: FL - 430, x2: 305, y2: FL - 240, stroke: "#3a3a42", "stroke-width": 6 }, roomG);
        svgEl("line", { x1: 230, y1: FL - 335, x2: 380, y2: FL - 335, stroke: "#3a3a42", "stroke-width": 6 }, roomG);
        svgEl("circle", { cx: 345, cy: FL - 395, r: 18, fill: "#e8e6d8", opacity: 0.8 }, roomG);
        svgEl("line", { x1: 860, y1: FL, x2: 860, y2: FL - 360, stroke: "#4a4a52", "stroke-width": 8 }, roomG);
        svgEl("path", { d: `M820 ${FL - 360} L900 ${FL - 360} L885 ${FL - 410} L835 ${FL - 410} Z`, fill: "#d9b77a", stroke: "#000", "stroke-width": 4 }, roomG);
        const lampGlow = svgEl("circle", { cx: 860, cy: FL - 360, r: 150, fill: "url(#fireGlow)", opacity: 0.4 }, roomG);

        // ---------- props ----------
        const flower = svgEl("g", { opacity: 0 }, propG);
        svgEl("path", { d: "M0 0 L0 -70", stroke: "#2f7a3a", "stroke-width": 6 }, flower);
        svgEl("path", { d: "M0 -30 q-18 -6 -22 -20 q16 0 22 12", fill: "#3a9a48", stroke: "#000", "stroke-width": 3 }, flower);
        const bloom = svgEl("g", { transform: "translate(0 -78)" }, flower);
        for (let i = 0; i < 6; i++) svgEl("ellipse", { cx: 0, cy: -11, rx: 9, ry: 13, fill: "#ff4a5a", stroke: "#000", "stroke-width": 3, transform: `rotate(${i * 60})` }, bloom);
        svgEl("circle", { r: 7, fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, bloom);
        const cake = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -46, y: -42, width: 92, height: 42, rx: 6, fill: "#f2d7b6", stroke: "#000", "stroke-width": 4 }, cake);
        svgEl("path", { d: "M-46 -30 q11 10 23 0 q11 10 23 0 q11 10 23 0 q11 10 23 0 L46 -42 L-46 -42 Z", fill: "#ff8fa8", stroke: "#000", "stroke-width": 3 }, cake);
        const ct = svgEl("text", { x: 0, y: -8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 15, fill: "#7a2a3a", "text-anchor": "middle" }, cake); ct.textContent = "1 YEAR";
        svgEl("rect", { x: -4, y: -70, width: 8, height: 28, fill: "#bfe0ff", stroke: "#000", "stroke-width": 2 }, cake);
        const cFlame = svgEl("path", { d: "M0 -72 q-9 -10 0 -24 q9 14 0 24 Z", fill: "#ffb020", stroke: "#000", "stroke-width": 2 }, cake);
        const cGlow = svgEl("circle", { cx: 0, cy: -84, r: 70, fill: "url(#fireGlow)", opacity: 0.6 }, cake);
        const smoke = Array.from({ length: 4 }, () => svgEl("circle", { r: 6, fill: "#8a8a8a", opacity: 0 }, fxG));

        // ---------- figures ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, fxG);
        const phoneGlow = svgEl("circle", { r: 70, fill: "#6aa8ff", filter: "url(#soft)", opacity: 0.3 }, backG);

        // heart meter above him: cracks one by one, shatters on DAY 365
        const HEART = "M0 30 C-66 -14 -50 -66 0 -36 C50 -66 66 -14 0 30 Z";
        const hm = svgEl("g", { opacity: 0 }, fxG);
        const hmGlow = svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.5 }, hm);
        const hmH = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, hm);
        const cracks = [
          "M-2 -34 L6 -20 L-4 -8",
          "M-4 -8 L8 4 L-2 16",
          "M-2 16 L4 28 M-30 -30 L-18 -18 L-26 -6 M28 -28 L18 -14 L26 -2",
        ].map((d) => svgEl("path", { d, fill: "none", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, hm));
        const shards = Array.from({ length: 6 }, (_, i) => svgEl("path", { d: ["M0 0 L-20 -16 L-6 -24 Z", "M0 0 L18 -18 L6 -26 Z", "M0 0 L-22 8 L-12 18 Z", "M0 0 L20 8 L10 20 Z", "M0 0 L-8 18 L6 22 Z", "M0 0 L-4 -20 L12 -14 Z"][i], fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));

        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bLove = bubble("I LOVE YOU.", 230), bMhm = bubble("MHM.", 120, 30, "#888"), bYear = bubble("HAPPY 1 YEAR!", 270), bNot = bubble("NOT NOW.", 180, 30, "#888"), bBabe = bubble("BABE?", 140);

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 10, head: 26, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };

        // ---- her: always on the phone ----
        const herX = (s) => (chap(s) === 1 ? SHE - 70 * win(s, T_TURN, T_TURN + 0.6) : SHE);
        const herDir = (s) => (chap(s) === 1 && s > T_TURN + 0.15 ? -1 : 1);
        function herRaw(s) {
          const f = herDir(s), x = herX(s);
          const st = standOn(x, f, FL); st.head = 22; st.torso = 4;
          const ph = 1 - win(s, T_DROP - 0.1, T_DROP + 0.1);
          reachTo(st, ph, [x + f * 44, stand - 118]); reachTo(st, ph, [x + f * 36, stand - 112], "b");
          if (chap(s) === 0) { const pu = hold(s, T_PUSH, T_PUSH + 0.6, 0.15); reachTo(st, pu, [x + 112, stand - 110], "b"); }
          if (chap(s) === 3) { const sh = hold(s, T_NOT, T_NOT + 1.0, 0.2); st.head += 6 * Math.sin(s * 18) * sh; }
          const look = win(s, T_LOOK, T_LOOK + 0.4); st.head = lerp(st.head, -8, look); st.torso = lerp(st.torso, -2, look);
          return st;
        }
        // ---- him ----
        const himDir = (s) => (s > T_GO ? 1 : -1);
        function himRaw(s) {
          const c = chap(s);
          if (s > T_GO) { const x = lerp(HE, 1180, sm(s, T_GO, T_OUT)); const p = walking(HE, x); return p; }
          if (c === 0) {
            const st = standOn(HE, -1, FL); st.head = 4;
            const fl = hold(s, T_FLOW, T_PUSH + 0.3, 0.35); reachTo(st, fl, [SHE + 100, stand - 125]); st.torso += 8 * fl;
            const dn = win(s, T_C1 + 0.3, T_C1 + 0.9); st.head += 22 * dn;
            return st;
          }
          if (c === 1) {
            const x = HE - 60 * win(s, T_STEP, T_STEP + 0.5);
            const st = standOn(x, -1, FL); st.head = 0;
            const op = hold(s, T_ARMS, T_C2 + 0.8, 0.4);
            reachTo(st, op, [x - 100, stand - 150]); reachTo(st, op, [x + 30, stand - 165], "b");
            const dn = win(s, T_C2, T_C2 + 0.7); st.head += 24 * dn; st.torso += 6 * dn;
            return st;
          }
          if (c === 2) {
            const st = standOn(HE - 20, -1, FL); st.head = -8;
            const lv = hold(s, T_LOVE, T_MHM + 0.6, 0.2); st.torso += 6 * lv; reachTo(st, lv, [HE - 100, stand - 140]);
            const dn = win(s, T_C3, T_C3 + 0.7); st.head = lerp(st.head, 26, dn); st.torso += 6 * dn;
            return st;
          }
          const st = standOn(HE, -1, FL); st.head = 2;
          const offer = win(s, T_CAKE, T_CAKE + 0.5);
          const putDown = win(s, T_DOWNC, T_DOWNC + 0.5), letGo = win(s, T_GO - 0.3, T_GO);
          const cx = lerp(HE - 55, HE - 72, offer), cy = lerp(lerp(stand - 80, stand - 92, offer), FL - 50, putDown);
          reachTo(st, 1 - letGo, [cx - 14, cy]); reachTo(st, 1 - letGo, [cx + 14, cy + 4], "b");
          st.torso += 30 * putDown; st.hy += 22 * putDown;
          const dn = win(s, T_SHAT, T_SHAT + 0.5); st.head = lerp(st.head, 28, dn);
          return st;
        }

        // ---------- text layers ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w, #quote span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:120px;top:440px;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.22em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:345px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const quote = document.createElement("div"); quote.id = "quote";
        quote.style.cssText = "position:absolute;left:110px;right:110px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:50px;line-height:1.35;color:#fff;letter-spacing:0.05em;text-shadow:0 0 18px rgba(255,255,255,0.35)";
        E("stage").appendChild(quote);
        const qName = document.createElement("div");
        qName.style.cssText = "position:absolute;left:110px;right:110px;top:930px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:26px;color:#9a9a9a;letter-spacing:0.24em;opacity:0";
        qName.textContent = "ELIE WIESEL";
        E("stage").appendChild(qName);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);

        // ---------- FOLLOW: the phone screen ----------
        const ui = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ui);
        const PH = svgEl("g", { opacity: 0 }, ui);
        svgEl("rect", { x: -330, y: -560, width: 660, height: 1120, rx: 70, fill: "#0b0b0d", stroke: "#3a3a42", "stroke-width": 10 }, PH);
        svgEl("rect", { x: -300, y: -530, width: 600, height: 1060, rx: 50, fill: "#f4f6fa" }, PH);
        svgEl("rect", { x: -60, y: -520, width: 120, height: 26, rx: 13, fill: "#0b0b0d" }, PH);
        const uiText = (x, y, size, col, txt, w = 700) => { const e = svgEl("text", { x, y, "font-family": "HFMono, monospace", "font-weight": w, "font-size": size, fill: col, "text-anchor": "middle" }, PH); e.textContent = txt; return e; };
        uiText(0, -440, 30, "#111", "@silent.stickman");
        svgEl("line", { x1: -300, y1: -410, x2: 300, y2: -410, stroke: "#dde2ea", "stroke-width": 3 }, PH);
        svgEl("circle", { cx: 0, cy: -290, r: 92, fill: "#111", stroke: "#ff3b30", "stroke-width": 8 }, PH);
        svgEl("circle", { cx: 0, cy: -318, r: 22, fill: "#fff" }, PH);
        svgEl("path", { d: "M0 -296 L0 -240 M0 -280 L-26 -258 M0 -280 L26 -258 M0 -240 L-18 -214 M0 -240 L18 -214", stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round" }, PH);
        uiText(0, -160, 34, "#111", "SILENT STICKMAN");
        uiText(0, -112, 24, "#555", "stories for everyone", 400);
        uiText(0, -80, 24, "#555", "who ever loved alone.", 400);
        const btn = svgEl("g", { transform: "translate(-80 130)" }, PH);
        const btnR = svgEl("rect", { x: -170, y: -44, width: 340, height: 88, rx: 22, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, btn);
        const btnT = svgEl("text", { x: 0, y: 14, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#fff", "text-anchor": "middle" }, btn);
        svgEl("line", { x1: -300, y1: 380, x2: 300, y2: 380, stroke: "#c9ced8", "stroke-width": 4 }, PH);
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", opacity: 0 }, PH));
        const ring = svgEl("circle", { r: 40, fill: "none", stroke: "#ff3b30", "stroke-width": 5, opacity: 0 }, PH);
        // mini him on the screen (fig coords: feet at FL), group puts FL on the screen's floor line y 380
        const MK = 0.8, MTX = -400, MTY = 380 - FL * MK;
        const mini = svgEl("g", { transform: `translate(${MTX} ${MTY}) scale(${MK})` }, PH);
        const mHim = makeFig(mini, "#ffffff", "#dedede", false, "mhim");
        const mHeart = svgEl("g", {}, mini);
        svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5, transform: "scale(0.7)" }, mHeart);
        const mCrack = svgEl("path", { d: "M-2 -24 L5 -12 L-3 -4 L6 6 L-2 18", fill: "none", stroke: "#000", "stroke-width": 5, transform: "scale(0.7)" }, mHeart);
        const subT = document.createElement("div");
        subT.style.cssText = "position:absolute;left:120px;right:120px;top:262px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:34px;line-height:1.45;letter-spacing:0.08em;color:#fff";
        E("stage").appendChild(subT);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const BTN = [-80, 130];                    // button center in phone coords
        const toFig = (x, y) => [(x - MTX) / MK, (y - MTY) / MK];
        function miniRaw(s) {
          const x = lerp(840, 720, sm(s, T_WALK, T_WALK + 1.0));
          if (s < T_WALK + 1.0) { const p = walking(840, x); p.head = 4; return p; }
          const st = standOn(x, -1, FL); st.head = -4;
          const b = toFig(BTN[0] + 170, BTN[1]);
          const tap = hold(s, T_TAP - 0.5, T_TAP + 0.35, 0.3), press = s > T_TAP - 0.08 && s < T_TAP + 0.12 ? 10 : 0;
          reachTo(st, tap, [b[0] - 6 - press, b[1] + 6]);
          const cheer = win(s, T_TAP + 0.7, T_TAP + 1.0);
          reachTo(st, cheer, [x - 30, stand - 230 + 10 * Math.sin(s * 14)]); reachTo(st, cheer, [x + 30, stand - 230 - 10 * Math.sin(s * 14)], "b");
          st.head = lerp(st.head, -14, cheer);
          return st;
        }

        // ---------- camera: one shot per chapter, hard cuts ----------
        const SHOTS = [[0, 1.7, 560, 430, 1.85], [C[1], 2.05, 540, 420, 2.15], [C[2], 2.1, 560, 410, 2.25], [C[3], 1.7, 580, 430, 1.8], [T_GO + 0.4, 1.7, 640, 430, 1.75], [T_LOOK - 0.2, 2.2, SHE + 30, 410, 2.35]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const toScreen = (c, x, y) => [540 + (x - c[1]) * c[0], 1180 + (y - c[2]) * c[0]];

        const CAPS = [[0.5, "HE BRINGS HER FLOWERS."], [T_PUSH + 0.2, "SHE DOESN'T EVEN LOOK.", 3], [C[1] + 0.3, "HE WANTS A HUG."], [T_TURN, "SHE TURNS AWAY.", 2], [C[2] + 0.3, "HE SAYS \"I LOVE YOU.\""], [T_MHM, "SHE SAYS \"MHM.\"", 2], [C[3] + 0.3, "HE REMEMBERS THEIR DAY."], [T_NOT + 0.4, "SHE FORGOT.", 1], [T_GO, "SO HE STOPPED TRYING.", 3]];
        const TAGS = ["DAY 1", "DAY 30", "DAY 90", "DAY 365"];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        const QL = [["THE", "OPPOSITE", "OF", "LOVE"], ["IS", "NOT", "HATE."], ["IT'S", "INDIFFERENCE."]];
        const LIGHT = [1, 0.82, 0.66, 0.52, 0.38];

        E("head").style.top = "236px";
        E("head").style.fontSize = "32px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himDir(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herDir(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // he loses color with every crack
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_C3 ? 1 : 0) + (s > T_SHAT ? 1 : 0);
          const light = lerp(LIGHT[Math.max(0, lvl - 1)], LIGHT[lvl], lvl ? win(s, [T_C1, T_C2, T_C3, T_SHAT][lvl - 1], [T_C1, T_C2, T_C3, T_SHAT][lvl - 1] + 0.6) : 1);
          him.g.style.filter = `brightness(${light.toFixed(3)})`;
          // phone
          let pp = [(hp.hands[0][0] + hp.hands[1][0]) / 2, (hp.hands[0][1] + hp.hands[1][1]) / 2 - 10], pr = 0;
          if (s > T_DROP) { const q = clamp((s - T_DROP) / 0.4, 0, 1); pp = [SHE + 40, lerp(stand - 120, FL - 6, q * q)]; pr = 90 * q; }
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])}) rotate(${r1(pr)})`);
          phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1])); phoneGlow.setAttribute("opacity", s < T_DROP ? 0.35 : 0.2);
          // flower: offered, pushed away, lies on the floor from then on (wilting)
          let fp, fr = 0;
          if (s < T_PUSH + 0.25) { fp = [mp.hands[0][0], mp.hands[0][1] + 30]; fr = -10; }
          else { const q = clamp((s - T_PUSH - 0.25) / 0.45, 0, 1); fp = [lerp(SHE + 100, SHE + 120, q), lerp(stand - 95, FL - 4, q * q)]; fr = lerp(-10, -88, q); }
          flower.setAttribute("opacity", s > T_FLOW - 0.1 ? 1 : 0);
          flower.setAttribute("transform", `translate(${r1(fp[0])} ${r1(fp[1])}) rotate(${r1(fr)})`);
          flower.style.filter = `grayscale(${(0.25 * chap(s)).toFixed(2)}) brightness(${(1 - 0.12 * chap(s)).toFixed(2)})`;
          // cake (DAY 365)
          cake.setAttribute("opacity", chap(s) === 3 ? 1 : 0);
          if (chap(s) === 3) {
            const cp = s < T_GO - 0.1 ? [(mp.hands[0][0] + mp.hands[1][0]) / 2, (mp.hands[0][1] + mp.hands[1][1]) / 2 + 2] : [HE - 72, FL - 2];
            cake.setAttribute("transform", `translate(${r1(cp[0])} ${r1(cp[1])})`);
            const lit = 1 - win(s, T_BLOW, T_BLOW + 0.15);
            cFlame.setAttribute("opacity", lit.toFixed(3)); cGlow.setAttribute("opacity", (0.6 * lit).toFixed(3));
            cFlame.setAttribute("transform", `scale(${(1 + 0.08 * Math.sin(s * 23)).toFixed(3)} 1)`);
            smoke.forEach((e, i) => { const q = frac((s - T_BLOW) * 0.6 + i / 4); e.setAttribute("cx", r1(cp[0] + 8 * Math.sin(q * 6 + i) + 20 * q)); e.setAttribute("cy", r1(cp[1] - 96 - 120 * q)); e.setAttribute("r", r1(5 + 12 * q)); e.setAttribute("opacity", s > T_BLOW ? (0.5 * (1 - q) * win(s, T_BLOW, T_BLOW + 0.3) * (1 - win(s, T_OUT, T_OUT + 1))).toFixed(3) : 0); });
          } else smoke.forEach((e) => e.setAttribute("opacity", 0));
          // heart meter
          const hx = mp.head[0], hy = mp.head[1] - 112;
          const shat = s > T_SHAT;
          hm.setAttribute("opacity", s > 0.3 && !shat ? 1 : 0);
          const pulse = 1 + 0.06 * Math.max(0, Math.sin(s * 7)) * (lvl === 0 ? 1 : 0.4);
          const jolt = [T_C1, T_C2, T_C3].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(hx + jolt)} ${r1(hy)}) scale(${(0.9 * pulse).toFixed(3)})`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2, T_C3][i] ? 1 : 0));
          hmH.setAttribute("fill", ["#ff3b30", "#e8332a", "#c42c26", "#9e2622"][Math.min(3, lvl)]);
          hmGlow.setAttribute("opacity", (0.5 * LIGHT[lvl]).toFixed(3));
          shards.forEach((e, i) => { const q = clamp((s - T_SHAT) / 1.2, 0, 1), a = (i / 6) * Math.PI * 2 + 0.4; const sx = HE + 70 * Math.cos(a) * q, sy = (stand - 270) + (-60 * Math.sin(a) - 30) * q + 520 * q * q; e.setAttribute("opacity", shat && q < 1 ? (1 - q * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(sx)} ${r1(Math.min(sy, FL - 4))}) rotate(${r1(300 * q * (i % 2 ? 1 : -1))})`); });
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bLove, T_LOVE, T_MHM + 0.3, [mp.head[0] + 20, mp.head[1] - 205]);
          bub(bMhm, T_MHM, T_C3 + 0.6, [hp.head[0] - 30, hp.head[1] - 110]);
          bub(bYear, T_CAKE + 0.2, T_NOT, [mp.head[0] + 60, mp.head[1] - 240]);
          bub(bNot, T_NOT, T_NOT + 1.3, [hp.head[0] - 30, hp.head[1] - 110]);
          bub(bBabe, T_BABE, T_DROP + 0.5, [hp.head[0] - 20, hp.head[1] - 110]);
          // mood: colder every chapter, very cold when he is gone
          cold.setAttribute("opacity", (0.12 * chap(s) + 0.25 * win(s, T_GO, T_OUT)).toFixed(3));
          glowC.setAttribute("opacity", (0.22 - 0.04 * chap(s) - 0.08 * win(s, T_GO, T_OUT)).toFixed(3));

          // chapter tag + captions + cut flashes
          const ch = chap(s);
          tag.textContent = s < T_LOOK ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_LOOK - 0.2 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          cap.style.opacity = (1 - win(s, T_LOOK - 0.5, T_LOOK - 0.2)).toFixed(3);
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "SHE LOST HIM", L3 = "LONG BEFORE HE LEFT.";
          E("head").innerHTML = `<div>ONE-SIDED LOVE.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;

          // quote over the still-moving scene (she stands alone, the cold creeps in)
          const qOut = win(s, T_PH - 0.4, T_PH);
          dim.style.opacity = (0.64 * win(s, T_Q - 0.5, T_Q) + 0.2 * win(s, T_PH, T_PH + 0.6)).toFixed(3);
          let wi = 0;
          quote.innerHTML = QL.map((line) => line.map((w) => { const q = clamp((s - T_Q - 0.1 * wi++) / 0.2, 0, 1); return `<span class="w" style="opacity:${q.toFixed(2)};transform:translateY(${r1(14 * (1 - q))}px);${w === "INDIFFERENCE." ? "color:#ff6a60;" : ""}">${w}</span>`; }).join("")).join("<br/>");
          quote.style.opacity = (1 - qOut).toFixed(3);
          qName.style.opacity = (win(s, T_Q + 1.2, T_Q + 1.5) * (1 - qOut)).toFixed(3);
          E("head").style.opacity = (1 - 0.6 * win(s, T_Q - 0.5, T_Q) + 0.6 * win(s, T_PH, T_PH + 0.4) - win(s, T_PH, T_PH + 0.3)).toFixed(3);

          // FOLLOW: dive into her dropped phone
          const zq = sm(s, T_PH, T_PH + 0.9);
          const p0 = toScreen(c, pp[0], pp[1]);
          const k = lerp(0.03 * c[0] / 2, 1, zq), px = lerp(p0[0], 540, zq), py = lerp(p0[1], 980, zq);
          PH.setAttribute("opacity", s > T_PH ? 1 : 0);
          PH.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) scale(${k.toFixed(4)}) rotate(${r1(lerp(90, 0, zq))})`);
          const tapped = s > T_TAP;
          btnR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30");
          btnT.setAttribute("fill", tapped ? "#111" : "#fff");
          btnT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          const press = tapped ? 1 - 0.1 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.2, 0, 1)) : 1 + 0.04 * Math.max(0, Math.sin(s * 6)) * (s > T_PH + 1 ? 1 : 0);
          btn.setAttribute("transform", `translate(${BTN[0]} ${BTN[1]}) scale(${press.toFixed(3)})`);
          const rq = clamp((s - T_TAP) / 0.5, 0, 1);
          ring.setAttribute("cx", BTN[0]); ring.setAttribute("cy", BTN[1]); ring.setAttribute("r", r1(40 + 260 * rq)); ring.setAttribute("opacity", tapped && rq < 1 ? (1 - rq).toFixed(3) : 0);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(BTN[0] + Math.cos(a) * 260 * Math.sqrt(q))} ${r1(BTN[1] + Math.sin(a) * 200 * Math.sqrt(q) - 50 * q)}) scale(${(1.2 - 0.5 * q).toFixed(2)})`); });
          // mini him: walks in grey with a cracked heart, taps, heart heals, color comes back
          const mpose = drawFig(mHim, livePose(miniRaw, s, 0.7), -1);
          mini.setAttribute("opacity", s > T_WALK - 0.05 ? 1 : 0);
          const heal = win(s, T_TAP + 0.2, T_TAP + 0.6);
          mHim.g.style.filter = `brightness(${lerp(0.55, 1, heal).toFixed(3)})`;
          mHeart.setAttribute("transform", `translate(${r1(mpose.head[0])} ${r1(mpose.head[1] - 100)}) scale(${(1 + 0.4 * Math.sin(Math.PI * clamp((s - T_TAP - 0.2) / 0.4, 0, 1))).toFixed(3)})`);
          mCrack.setAttribute("opacity", (1 - heal).toFixed(3));
          const sq = s - (T_PH + 1.0), a1 = "FOR EVERYONE", a2 = "WHO EVER LOVED ALONE.";
          subT.innerHTML = sq > 0 ? `${a1.slice(0, Math.floor(sq * 30))}&nbsp;<br/><span style="color:#ff6a60">${a2.slice(0, Math.max(0, Math.floor((sq - 0.45) * 30)))}</span>&nbsp;` : "";
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
