        // ---------- "start today": every night he plans the perfect tomorrow (run, apple, book). Every morning: snooze, couch, phone, cake. The calendar flips for a year, still DAY 0. One evening he just puts on his shoes and walks. DAY 1, DAY 16, DAY 30: running ----------
        // remake of a 10.8x outlier (Ember & Shadow, "I'll start tomorrow"), see viral/2026-10-30-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const outBack = svgEl("g", { opacity: 0 }, backG);
        const roomBack = svgEl("g", {}, backG);
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const frontG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_PLAN = 0.3, T_LIE = 1.45, T_ALARM = 1.85, T_SLAP = 2.15, T_UP = 2.55, T_WALK = 2.85, T_COUCH = 3.45, T_YEAR = 4.0, T_YEAR1 = 6.5;
        const T_SIX = 6.6, T_STAND = 7.0, T_DOORW = 7.05, T_SHOES = 7.6, T_OUT = 8.05, T_OUTSIDE = 8.35, T_D16 = 9.1, T_D30 = 9.8, T_END = 10.6;
        const T_H1 = 10.9, T_H2 = 11.9, T_CARD = 13.0;
        const BED0 = 150, BED1 = 410, MT = FL - 70, HIPB = 300, NS_X = 470, COUCH = 680, SEAT = FL - 66, DOOR = 960;
        const TOMS = [4.4, 5.3, 6.1];        // the "TOMORROW." bubbles during the lost year

        // ---------- room: window (night/day), bed, nightstand with alarm clock, couch, wall calendar, door with running shoes ----------
        const win1 = svgEl("rect", { x: 230, y: FL - 470, width: 170, height: 150, fill: "#101a30", stroke: "#2c2c2c", "stroke-width": 8 }, roomBack);
        const moon = svgEl("circle", { cx: 360, cy: FL - 430, r: 16, fill: "#e6e8f0" }, roomBack);
        svgEl("line", { x1: 315, y1: FL - 470, x2: 315, y2: FL - 320, stroke: "#2c2c2c", "stroke-width": 6 }, roomBack);
        const calG = svgEl("g", {}, roomBack);
        svgEl("rect", { x: COUCH - 60, y: FL - 400, width: 120, height: 130, rx: 6, fill: "#f2f2f2", stroke: "#000", "stroke-width": 5 }, calG);
        svgEl("rect", { x: COUCH - 60, y: FL - 400, width: 120, height: 34, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, calG);
        const calMonth = svgEl("text", { x: COUCH, y: FL - 374, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#fff", "text-anchor": "middle" }, calG);
        const calNum = svgEl("text", { x: COUCH, y: FL - 300, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 56, fill: "#111", "text-anchor": "middle" }, calG);
        const flipPage = svgEl("rect", { x: COUCH - 60, y: FL - 366, width: 120, height: 96, fill: "#ddd", stroke: "#000", "stroke-width": 3, opacity: 0 }, calG);
        const lightPool = svgEl("polygon", { points: `230,${FL - 470} 400,${FL - 470} 520,${FL} 130,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.12 }, beams);
        svgEl("rect", { x: DOOR - 60, y: FL - 280, width: 120, height: 280, fill: "#ffcf8a", stroke: "#2c2c2c", "stroke-width": 8 }, roomBack);
        const doorLeaf = svgEl("rect", { x: DOOR - 56, y: FL - 276, width: 112, height: 276, fill: "#4a3a2c", stroke: "#000", "stroke-width": 4 }, roomBack);
        // bed
        svgEl("rect", { x: BED0 - 14, y: FL - 190, width: 24, height: 190, rx: 6, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT + 22, width: BED1 - BED0, height: 30, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT, width: BED1 - BED0, height: 26, rx: 10, fill: "#4a4a52", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("ellipse", { cx: 190, cy: MT - 8, rx: 40, ry: 14, fill: "#d9d9e3", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: NS_X - 34, y: FL - 100, width: 68, height: 100, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        const clockG = svgEl("g", {}, roomG);
        svgEl("circle", { cx: 0, cy: -22, r: 22, fill: "#e8e8e8", stroke: "#000", "stroke-width": 4 }, clockG);
        svgEl("line", { x1: 0, y1: -22, x2: 0, y2: -36, stroke: "#000", "stroke-width": 3 }, clockG);
        svgEl("line", { x1: 0, y1: -22, x2: 9, y2: -22, stroke: "#000", "stroke-width": 3 }, clockG);
        for (const x of [-14, 14]) svgEl("circle", { cx: x, cy: -44, r: 7, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, clockG);
        const rings = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        // couch
        svgEl("rect", { x: COUCH - 140, y: FL - 150, width: 280, height: 90, rx: 22, fill: "#5a4f40", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH - 170, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#4e4538", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH + 120, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#4e4538", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH - 150, y: SEAT, width: 300, height: 52, rx: 14, fill: "#6a5f4c", stroke: "#000", "stroke-width": 5 }, roomG);
        const plates = Array.from({ length: 8 }, (_, i) => svgEl("ellipse", { cx: COUCH + 210, cy: FL - 6 - i * 9, rx: 30, ry: 6, fill: "#eee", stroke: "#000", "stroke-width": 3, opacity: 0 }, roomG));
        const shoes = svgEl("g", {}, roomG);
        for (const dx of [-18, 22]) svgEl("path", { d: `M${DOOR - 120 + dx} ${FL} l0 -18 q10 -6 18 0 l22 10 l0 8 Z`, fill: "#ff5a3a", stroke: "#000", "stroke-width": 3 }, shoes);
        const blanket = svgEl("path", { fill: "#3f5a8a", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, frontG);
        // outside: dawn glow, path, lamp posts
        svgEl("rect", { x: -1400, y: FL - 900, width: 3400, height: 900, fill: "url(#fireGlow)", opacity: 0.0 }, outBack);
        const dawn = svgEl("ellipse", { cx: 900, cy: FL, rx: 900, ry: 380, fill: "url(#fireGlow)", opacity: 0 }, outBack);
        for (const x of [100, 500, 900, 1300]) { svgEl("rect", { x: x - 4, y: FL - 300, width: 8, height: 300, fill: "#555", stroke: "#000", "stroke-width": 3 }, outBack); svgEl("circle", { cx: x, cy: FL - 306, r: 14, fill: "#ffe0a0", stroke: "#000", "stroke-width": 3 }, outBack); }
        const speed = Array.from({ length: 4 }, () => svgEl("line", { stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));

        // ---------- him ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const belly = svgEl("ellipse", { fill: "#ffffff", stroke: "#000", "stroke-width": 5, opacity: 0 }, figG);
        figG.insertBefore(belly, him.g);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const cake = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-16 0 L16 0 L16 -18 L-16 -6 Z", fill: "#f0d090", stroke: "#000", "stroke-width": 3 }, cake);
        svgEl("path", { d: "M-16 -6 L16 -18 L16 -24 L-16 -12 Z", fill: "#ff7aa8", stroke: "#000", "stroke-width": 3 }, cake);
        // the plan: a thought cloud with a shoe, an apple, a book
        const cloud = svgEl("g", { opacity: 0 }, fxG);
        for (const [x, y, r] of [[-70, 0, 46], [-20, -20, 56], [44, -10, 50], [90, 8, 38], [10, 22, 44], [-60, 30, 34]]) svgEl("circle", { cx: x, cy: y, r, fill: "#fff", stroke: "#000", "stroke-width": 5 }, cloud);
        for (const [x, y, r] of [[-70, 0, 42], [-20, -20, 52], [44, -10, 46], [90, 8, 34], [10, 22, 40], [-60, 30, 30]]) svgEl("circle", { cx: x, cy: y, r, fill: "#fff" }, cloud);
        svgEl("circle", { cx: -40, cy: 90, r: 12, fill: "#fff", stroke: "#000", "stroke-width": 4 }, cloud);
        svgEl("circle", { cx: -56, cy: 120, r: 7, fill: "#fff", stroke: "#000", "stroke-width": 4 }, cloud);
        svgEl("path", { d: "M-96 14 l0 -22 q12 -8 22 0 l28 12 l0 10 Z", fill: "#ff5a3a", stroke: "#000", "stroke-width": 3 }, cloud);
        svgEl("circle", { cx: 0, cy: -2, r: 20, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, cloud);
        svgEl("path", { d: "M0 -22 q6 -10 14 -10", fill: "none", stroke: "#3a7a3a", "stroke-width": 4 }, cloud);
        svgEl("rect", { x: 46, y: -22, width: 40, height: 30, rx: 3, fill: "#4a7ad0", stroke: "#000", "stroke-width": 3 }, cloud);
        const bubble = (txt, w) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#111", "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bTom = bubble("TOMORROW!", 230), bToms = TOMS.map(() => bubble("TOMORROW.", 230));
        const zzs = [0, 1, 2].map(() => { const z = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#9aa4c0", "text-anchor": "middle", opacity: 0 }, fxG); z.textContent = "z"; return z; });

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
        const walking = (x0, x, STR = 110, lift = 12, k = 1) => { const ft = feetOn(x0, x, STR, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR); return base({ hx: x, hy: stand + 3 + 3 * k * Math.abs(sw), torso: 3 + 10 * (k - 1), head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 26 * k * sw, ael: 20 + 50 * (k - 1), bsh: -4 - 26 * k * sw, bel: 20 + 50 * (k - 1) }); };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const lying = () => base({ hx: HIPB, hy: MT - 22, torso: -90, head: 0, ax: HIPB + 105, ay: MT - 18, bx: HIPB + 100, by: MT - 12, ash: 0, ael: 0, aw: 1, atx: HIPB - 30, aty: MT - 14, bw: 1, btx: HIPB - 40, bty: MT - 20 });
        const bedSit = () => base({ hx: HIPB, hy: MT - 12, torso: 2, head: 0, ax: HIPB + 100, ay: MT - 14, bx: HIPB + 92, by: MT - 10, aw: 1, atx: HIPB + 40, aty: MT - 30, bw: 1, btx: HIPB + 30, bty: MT - 26 });
        const couchSit = () => base({ hx: COUCH - 40, hy: SEAT - 8, torso: -8, head: 0, ax: COUCH + 30, ay: FL, bx: COUCH + 16, by: FL, aw: 1, atx: COUCH + 10, aty: SEAT - 100, bw: 1, btx: COUCH, bty: SEAT - 92 });
        // in bed he lies with his head left: f = -1 for the lying pose would flip it, so lying uses torso -90 with f = 1
        function himRaw(s) {
          if (s < T_LIE) { const st = bedSit(); const k = hold(s, T_PLAN, T_LIE, 0.2); st.head = -16 * k; reachTo(st, k, [HIPB + 60, MT - 190]); return st; }
          if (s < T_UP) {
            const st = mixPose(bedSit(), lying(), win(s, T_LIE, T_LIE + 0.3));
            const slap = Math.sin(Math.PI * clamp((s - T_SLAP + 0.1) / 0.3, 0, 1));
            reachTo(st, slap, [NS_X, FL - 140]);
            return st;
          }
          if (s < T_WALK) return mixPose(lying(), standOn(NS_X - 30, 1, FL), win(s, T_UP, T_WALK));
          if (s < T_COUCH) { const p = walking(NS_X - 30, lerp(NS_X - 30, COUCH - 40, ease((s - T_WALK) / (T_COUCH - T_WALK)))); p.torso += 8; p.head += 14; return p; }
          if (s < T_STAND) {
            const st = mixPose(standOn(COUCH - 40, 1, FL), couchSit(), win(s, T_COUCH, T_COUCH + 0.3));
            // eats cake / scrolls
            const bite = Math.sin(Math.PI * frac(s * 0.9)) * (s < T_SIX ? 1 : 0);
            reachTo(st, 1, [COUCH - 4, lerp(SEAT - 100, SEAT - 170, bite)], "b");
            st.head = 18 - 10 * bite;
            st.hy += 10 * win(s, T_YEAR, T_YEAR1);   // sinks into the couch
            // looks at the shoes by the door
            const look = win(s, T_SIX, T_SIX + 0.25);
            st.head = lerp(st.head, -4, look);
            return st;
          }
          if (s < T_SHOES) { const st = couchSit(); st.hy += 10; const p = walking(COUCH - 40, lerp(COUCH - 40, DOOR - 140, ease((s - T_DOORW) / (T_SHOES - T_DOORW)))); return mixPose(st, p, win(s, T_STAND, T_STAND + 0.25)); }
          if (s < T_OUT) { const k = Math.sin(Math.PI * clamp((s - T_SHOES) / 0.45, 0, 1)); const st = standOn(DOOR - 140, 1, FL); st.hy += 40 * k; st.torso = 3 + 60 * k; st.head = 14 * k; reachTo(st, k, [DOOR - 110, FL - 20]); return st; }
          if (s < T_OUTSIDE) return walking(DOOR - 140, lerp(DOOR - 140, DOOR + 20, ease((s - T_OUT) / (T_OUTSIDE - T_OUT))));
          // outside: walks (DAY 1), jogs (DAY 16), runs (DAY 30)
          const X = outX(s);
          const k = s < T_D16 ? 1 : s < T_D30 ? 1.4 : 1.9;
          const p = walking(0, X, s < T_D16 ? 110 : s < T_D30 ? 150 : 200, s < T_D16 ? 10 : 20, k);
          if (s > T_END) { const st = standOn(X, 1, FL); st.torso = -4; st.head = -10; reachTo(st, win(s, T_END, T_END + 0.3), [X + 20, stand - 260]); return mixPose(p, st, win(s, T_END, T_END + 0.3)); }
          return p;
        }
        // distance covered outside: slow walk, then jog, then run (continuous)
        const OX0 = 160;
        const outV = (s) => (s < T_OUTSIDE ? 0 : s < T_D16 ? 150 : s < T_D30 ? 330 : s < T_END ? 560 : 0);
        const OUT = []; { let x = OX0; for (let i = 0; i <= 1700; i++) { OUT.push(x); x += outV(i / 100) / 100; } }
        const outX = (s) => { const f = clamp(s * 100, 0, 1700), i = Math.floor(f); return lerp(OUT[i], OUT[Math.min(i + 1, 1700)], f - i); };
        const himF = () => 1;

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
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE SECRET OF GETTING AHEAD<br/>IS GETTING STARTED."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">MARK TWAIN</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (room part); outside the camera follows him ----------
        const CK = [
          [0, 2.1, 300, 420, 0], [1.4, 2.2, 300, 430, 0], [1.9, 2.5, 420, 460, 0], [2.4, 1.9, 400, 460, 0], [3.4, 1.8, 640, 450, 0],
          [4.0, 1.6, 620, 440, 0], [6.5, 1.7, 640, 440, 0], [6.8, 2.3, 860, 470, 0], [7.2, 1.7, 760, 450, 0], [8.0, 1.9, 900, 450, 0], [99, 1.9, 900, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        // ---------- per-frame render ----------
        function render(t) {
          const s = t;
          let kick = 0, flash = 0;
          const hit = (tr, k, f, d) => { if (t >= tr) { kick += k * Math.exp(-(t - tr) / d); flash += f * Math.exp(-(t - tr) / (d * 0.35)); } };
          hit(T_ALARM, 0.6, 0, 0.15); hit(T_SLAP, 0.4, 0, 0.12); hit(T_OUTSIDE, 0.3, 0.6, 0.3); hit(T_D16, 0.4, 0, 0.2); hit(T_D30, 0.6, 0, 0.2);
          let [, cs, cx, cy, cr] = camAt(s);
          const outside = s >= T_OUTSIDE;
          if (outside) { const X = outX(s); cs = s < T_D30 ? 1.9 : lerp(1.9, 1.6, win(s, T_D30, T_END)); cx = X + 60; cy = 450; cr = 0; }
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          E("flash").style.opacity = Math.min(0.7, flash).toFixed(3);
          roomBack.setAttribute("opacity", outside ? 0 : 1); roomG.setAttribute("opacity", outside ? 0 : 1); frontG.setAttribute("opacity", outside ? 0 : 1);
          outBack.setAttribute("opacity", outside ? 1 : 0);
          lightPool.setAttribute("opacity", outside ? 0 : 0.12);
          dawn.setAttribute("opacity", (0.9 * win(s, T_D16, T_END)).toFixed(3));

          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          // belly: grows during the lost year, gone by day 30
          const bk = win(s, T_YEAR, T_YEAR1) * (1 - 0.5 * win(s, T_D16 - 0.3, T_D16)) * (1 - win(s, T_D30 - 0.3, T_D30));
          const inBed = s < T_WALK;
          const bx = (mp.hip[0] * 0.55 + mp.head[0] * 0.45), by = (mp.hip[1] * 0.6 + mp.head[1] * 0.4);
          belly.setAttribute("opacity", bk > 0.02 && !inBed ? 1 : 0);
          belly.setAttribute("cx", r1(bx + 8 + 14 * bk)); belly.setAttribute("cy", r1(by + 14));
          belly.setAttribute("rx", r1(14 + 20 * bk)); belly.setAttribute("ry", r1(18 + 18 * bk));
          // blanket over his legs in bed
          const bt = s < T_UP ? 1 : 1 - win(s, T_UP, T_UP + 0.25);
          blanket.setAttribute("opacity", bt.toFixed(3));
          blanket.setAttribute("d", `M${HIPB - 20} ${MT + 4} L${HIPB - 24} ${MT - 38} Q${HIPB + 80} ${MT - 56} ${BED1 + 6} ${MT - 30} L${BED1 + 10} ${MT + 28} Z`);
          // window: night while he plans, day in the morning, flicker night/day during the lost year
          let night = s < T_ALARM ? 1 : s < T_YEAR ? 0 : s < T_YEAR1 ? (frac(s * 1.6) < 0.5 ? 1 : 0) : s < T_OUTSIDE ? 0.6 : 0;
          win1.setAttribute("fill", night > 0.5 ? "#101a30" : "#7aa8d8"); moon.setAttribute("opacity", night > 0.5 ? 1 : 0);
          // alarm
          const ring = hold(s, T_ALARM, T_SLAP + 0.05, 0.05);
          clockG.setAttribute("transform", `translate(${NS_X + 6 * Math.sin(t * 70) * ring} ${FL - 100}) rotate(${r1(8 * Math.sin(t * 50) * ring)})`);
          rings.forEach((r, i) => { r.setAttribute("d", `M${NS_X - 40 - i * 12} ${FL - 160 - i * 8} q-10 20 0 40 M${NS_X + 40 + i * 12} ${FL - 160 - i * 8} q10 20 0 40`); r.setAttribute("opacity", (ring * (0.5 + 0.5 * Math.sin(t * 30 + i))).toFixed(3)); });
          // the plan cloud, the "TOMORROW" bubbles
          const ck = hold(s, T_PLAN, T_LIE, 0.2);
          cloud.setAttribute("opacity", ck.toFixed(3));
          cloud.setAttribute("transform", `translate(${r1(mp.head[0] + 120)} ${r1(mp.head[1] - 170)}) scale(${(0.5 + 0.5 * backOut(ck)).toFixed(3)})`);
          const tk = hold(s, T_PLAN + 0.5, T_LIE, 0.15);
          bTom.setAttribute("opacity", tk.toFixed(3));
          bTom.setAttribute("transform", `translate(${r1(mp.head[0] - 40)} ${r1(mp.head[1] - 110)}) scale(${(0.6 + 0.4 * backOut(tk)).toFixed(3)})`);
          bToms.forEach((g, i) => { const k = hold(s, TOMS[i], TOMS[i] + 0.6, 0.12); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(mp.head[0] + 30)} ${r1(mp.head[1] - 110)}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); });
          const asleep = s > T_LIE + 0.3 && s < T_UP ? 1 : 0;
          zzs.forEach((z, i) => { const q = frac(t * 0.6 + i / 3); z.setAttribute("x", r1(mp.head[0] + 20 + 26 * q)); z.setAttribute("y", r1(mp.head[1] - 30 - 80 * q)); z.setAttribute("font-size", r1(22 + 22 * q)); z.setAttribute("opacity", (asleep * Math.sin(Math.PI * q)).toFixed(3)); });
          // phone + cake on the couch
          const onCouch = s > T_COUCH + 0.2 && s < T_STAND;
          phone.setAttribute("opacity", onCouch ? 1 : 0);
          phone.setAttribute("transform", `translate(${r1(mp.hands[0][0] + 4)} ${r1(mp.hands[0][1] - 6)})`);
          cake.setAttribute("opacity", onCouch && s < T_SIX ? 1 : 0);
          cake.setAttribute("transform", `translate(${r1(mp.hands[1][0] + 6)} ${r1(mp.hands[1][1])})`);
          plates.forEach((p, i) => p.setAttribute("opacity", s > T_YEAR + i * 0.3 && !outside ? 1 : 0));
          // calendar flips through a year
          const flips = Math.floor(clamp((s - T_YEAR) / ((T_YEAR1 - T_YEAR) / 12), 0, 12));
          calMonth.textContent = MONTHS[Math.min(flips, 11)];
          calNum.textContent = s < T_YEAR ? "1" : String(1 + ((flips * 7) % 28));
          const fq = frac((s - T_YEAR) / ((T_YEAR1 - T_YEAR) / 12));
          flipPage.setAttribute("opacity", s > T_YEAR && s < T_YEAR1 && fq < 0.4 ? (1 - fq / 0.4).toFixed(3) : 0);
          flipPage.setAttribute("transform", `translate(0 ${r1(-120 * fq)})`);
          // shoes by the door (gone once he wears them), door opens
          shoes.setAttribute("opacity", s < T_SHOES + 0.25 ? 1 : 0);
          const dq = hold(s, T_OUT - 0.2, T_OUTSIDE + 0.3, 0.2);
          doorLeaf.setAttribute("transform", `translate(${DOOR - 56} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1) translate(${-(DOOR - 56)} 0)`);
          // speed lines when he runs
          speed.forEach((l, i) => { const on = s > T_D30 && s < T_END ? 1 : 0, y = stand - 160 + i * 50, x = mp.hip[0] - 90 - (i % 2) * 40; l.setAttribute("x1", r1(x)); l.setAttribute("x2", r1(x - 90)); l.setAttribute("y1", r1(y)); l.setAttribute("y2", r1(y)); l.setAttribute("opacity", (on * 0.7).toFixed(3)); });

          // the counter
          const day = s < T_SIX ? "DAY 0" : s < T_OUTSIDE ? "18:00" : s < T_D16 ? "DAY 1" : s < T_D30 ? "DAY 16" : "DAY 30";
          E("num").textContent = day;
          E("num").style.color = s < T_SIX ? "#ff3b30" : "#ffffff";
          const tick = [T_YEAR, T_SIX, T_OUTSIDE, T_D16, T_D30].reduce((m, c) => m + (s > c ? 0.35 * Math.exp(-(s - c) * 7) : 0), 0);
          E("num").style.transform = `scale(${(1 + tick).toFixed(3)})`;
          E("ctr").style.opacity = (win(s, T_WALK, T_COUCH) * (1 - win(t, T_H1 - 0.4, T_H1 - 0.1))).toFixed(3);

          E("h1").innerHTML = slam(["TOMORROW", "NEVER", "COMES."], [T_H1, T_H1 + 0.18, T_H1 + 0.36], t, []);
          E("h2").innerHTML = slam(["START", "TODAY."], [T_H2, T_H2 + 0.2], t, [1]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["ONE", "SMALL", "STEP."], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["TODAY,", "NOT", "TOMORROW."], [T_CARD + 0.75, T_CARD + 0.9, T_CARD + 1.05], t, [0]);
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
