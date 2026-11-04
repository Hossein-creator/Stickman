        // ---------- "mixed signals": "I'M FINE." (storm cloud over her head), "DO WHATEVER YOU WANT." (rain), "NOTHING'S WRONG." (lightning). He opens a DECODER book, flips pages, confused... tosses it, walks off and comes back with her favourite food. The cloud clears, she melts into a hug ----------
        // remake of a 57.4x outlier (Abibigro, "You dey confuse me"), see viral/2026-11-04-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);


        const T_FINE = 0.5, T_OK = 1.8, T_BOLT1 = 2.4, T_WHAT = 2.9, T_WRONG = 4.1, T_BOLT2 = 4.4;
        const T_BOOK = 4.9, T_TOSS = 6.2, T_GO = 6.4, T_OUT = 6.9, T_BACK = 7.0, T_ARR = 7.6, T_GIVE = 7.7, T_CLEAR = 7.9, T_HUG = 8.3, T_HOLD = 8.7;
        const T_H1 = 9.4, T_H2 = 10.3, T_CARD = 11.4;
        const SHE = 440, HE = 660, BACKX = 600;

        svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("polygon", { points: `460,${FL - 520} 660,${FL - 520} 780,${FL} 340,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        svgEl("rect", { x: 140, y: FL - 400, width: 160, height: 260, fill: "#1e2430", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 300, y: FL - 120, width: 60, height: 120, fill: "#2a2a2a", stroke: "#000", "stroke-width": 5 }, roomG);
        const gloom = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0d1222", opacity: 0 }, backG);
        const warm = svgEl("ellipse", { cx: 540, cy: FL - 160, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);

        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");

        // storm cloud over her head: rain + lightning
        const rain = Array.from({ length: 7 }, () => svgEl("line", { stroke: "#7cc8ff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const cloud = svgEl("g", { opacity: 0 }, fxG);
        const cloudFill = [];
        [[-38, 6, 26], [0, -8, 34], [36, 4, 28], [-10, 14, 24], [18, 16, 24]].forEach(([x, y, r]) => svgEl("circle", { cx: x, cy: y, r: r + 3, fill: "#000" }, cloud));
        [[-38, 6, 26], [0, -8, 34], [36, 4, 28], [-10, 14, 24], [18, 16, 24]].forEach(([x, y, r]) => cloudFill.push(svgEl("circle", { cx: x, cy: y, r, fill: "#8a8f99" }, cloud)));
        const bolt = svgEl("path", { d: "M6 24 L-12 62 L4 62 L-10 100 L22 52 L6 52 L18 24 Z", fill: "#ffd43b", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const sun = svgEl("g", { opacity: 0 }, fxG);
        for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; svgEl("line", { x1: Math.cos(a) * 34, y1: Math.sin(a) * 34, x2: Math.cos(a) * 50, y2: Math.sin(a) * 50, stroke: "#ffd43b", "stroke-width": 6, "stroke-linecap": "round" }, sun); }
        svgEl("circle", { r: 26, fill: "#ffd43b", stroke: "#000", "stroke-width": 4 }, sun);
        // decoder book
        const book = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -44, y: -30, width: 88, height: 60, rx: 4, fill: "#b8312f", stroke: "#000", "stroke-width": 4 }, book);
        svgEl("rect", { x: -38, y: -24, width: 76, height: 48, fill: "#f4efe2", stroke: "#000", "stroke-width": 2 }, book);
        svgEl("line", { x1: 0, y1: -24, x2: 0, y2: 24, stroke: "#000", "stroke-width": 3 }, book);
        for (let i = 0; i < 3; i++) { svgEl("line", { x1: -32, y1: -12 + i * 10, x2: -6, y2: -12 + i * 10, stroke: "#999", "stroke-width": 2 }, book); svgEl("line", { x1: 6, y1: -12 + i * 10, x2: 32, y2: -12 + i * 10, stroke: "#999", "stroke-width": 2 }, book); }
        const flip = svgEl("path", { fill: "#fffaf0", stroke: "#000", "stroke-width": 2 }, book);
        const bookT = svgEl("text", { x: 0, y: -40, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 16, fill: "#ff6a5f", "text-anchor": "middle" }, book);
        bookT.textContent = "HER DECODER";
        const qs = Array.from({ length: 3 }, () => { const tx = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#fff", "text-anchor": "middle", opacity: 0 }, fxG); tx.textContent = "?"; return tx; });
        const bang = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 54, fill: "#ff3b30", "text-anchor": "middle", opacity: 0 }, fxG);
        bang.textContent = "!";
        // takeout food + drink
        const food = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-26 -40 L26 -40 L20 0 L-20 0 Z", fill: "#fff", stroke: "#000", "stroke-width": 4 }, food);
        svgEl("path", { d: "M-26 -40 L-14 -54 L14 -54 L26 -40", fill: "none", stroke: "#000", "stroke-width": 4 }, food);
        svgEl("path", { d: "M0 -14 C-12 -22 -10 -32 0 -26 C10 -32 12 -22 0 -14 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 2 }, food);
        svgEl("rect", { x: 30, y: -46, width: 22, height: 46, rx: 4, fill: "#f2c38b", stroke: "#000", "stroke-width": 4 }, food);
        svgEl("line", { x1: 44, y1: -46, x2: 50, y2: -66, stroke: "#000", "stroke-width": 4 }, food);
        const steam = Array.from({ length: 2 }, () => svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 3 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bFine = bubble("I'M FINE.", 200, 30, "#ff3b30"), bOk = bubble("OK, COOL!", 200, 30);
        const bWhat = bubble("DO WHATEVER YOU WANT.", 400, 28, "#ff3b30"), bWrong = bubble("NOTHING'S WRONG.", 320, 28, "#ff3b30");
        const bAww = bubble("AWW...", 150, 30);

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
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const herDir = (s) => (s < T_GIVE - 0.1 ? -1 : 1);
        const himDir = (s) => ((s > T_OK && s < T_BOLT1 + 0.2) || (s > T_GO && s < T_OUT) ? 1 : -1);
        function herRaw(s) {
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(SHE, 525, k), 1, FL); hug.torso = 8 * k; reachTo(hug, k, [570, stand - 150]); reachTo(hug, 1, [lerp(SHE + 70, 533, k), lerp(stand - 90, stand - 50, k)], "b"); return hug; }
          const st = standOn(SHE, herDir(s), FL); st.head = 2;
          const cross = 1 - win(s, T_GIVE - 0.1, T_GIVE + 0.1);
          // arms crossed, looking away; she stamps a little on each line
          reachTo(st, cross, [SHE - 26, stand - 104]); reachTo(st, cross, [SHE - 14, stand - 98], "b");
          [T_FINE, T_WHAT, T_WRONG].forEach((a) => { const q = hold(s, a, a + 0.5, 0.1); st.head += 12 * q; st.hy += 6 * q; });
          const take = win(s, T_GIVE, T_GIVE + 0.25); reachTo(st, take, [SHE + 80, stand - 95]); reachTo(st, take, [SHE + 70, stand - 90], "b");
          const gasp = hold(s, T_CLEAR, T_HUG + 0.1, 0.12); st.head -= 8 * gasp;
          return st;
        }
        function himRaw(s) {
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(BACKX, 557, k), -1, FL); hug.torso = 4 * k; reachTo(hug, k, [515, stand - 130]); reachTo(hug, k, [529, stand - 100], "b"); return hug; }
          if (s > T_GO && s < T_OUT) { return walking(HE, lerp(HE, 920, ease((s - T_GO) / (T_OUT - T_GO)))); }
          if (s >= T_OUT && s < T_ARR) { const p = walking(920, lerp(920, BACKX, ease(clamp((s - T_BACK) / (T_ARR - T_BACK), 0, 1)))); reachTo(p, 1, [p.hx - 40, stand - 85], "b"); return p; }
          const x = s >= T_ARR ? BACKX : HE;
          const st = standOn(x, himDir(s), FL); st.head = 4;
          const ok = hold(s, T_OK, T_BOLT1 + 0.1, 0.12); reachTo(st, ok, [x + 40, stand - 170]);
          const jolt = hold(s, T_BOLT1, T_BOLT1 + 0.5, 0.05); st.hy -= 14 * jolt; reachTo(st, jolt, [x - 30, stand - 190]); reachTo(st, jolt, [x + 10, stand - 190], "b");
          const rd = hold(s, T_BOOK, T_TOSS + 0.05, 0.15); reachTo(st, rd, [x - 60, stand - 100]); reachTo(st, rd, [x - 30, stand - 96], "b"); st.head += 18 * rd; st.torso += 6 * rd;
          const tos = hold(s, T_TOSS, T_GO, 0.08); reachTo(st, tos, [x + 10, stand - 200]);
          if (s >= T_ARR) { const g = win(s, T_GIVE, T_GIVE + 0.25); reachTo(st, 1 - g, [x - 40, stand - 85], "b"); reachTo(st, g, [SHE + 90, stand - 95], "b"); }
          return st;
        }

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
          <div id="cm2" style="font-size:46px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE MOST IMPORTANT THING<br/>IN COMMUNICATION IS HEARING<br/>WHAT ISN'T SAID."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">PETER DRUCKER</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);


        function render(t) {
          const s = t;
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          hit(T_BOLT1, 0.8, 0.15); hit(T_BOLT2, 0.8, 0.15); hit(T_FINE, 0.3, 0.12);
          const cs = 1.9 * (1 + 0.01 * s) * (s > T_HUG ? 1 + 0.12 * ease(clamp((s - T_HUG) / 1.2, 0, 1)) : 1), cx = 540, cy = 440;
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himDir(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herDir(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // storm cloud, rain, lightning; clears into a little sun
          const storm = win(s, T_FINE, T_FINE + 0.35) * (1 - win(s, T_CLEAR, T_CLEAR + 0.4));
          const dark = 0.6 * win(s, T_WHAT, T_WHAT + 0.4);
          const cxp = hp.head[0], cyp = hp.head[1] - 112;
          cloud.setAttribute("opacity", storm.toFixed(3)); cloud.setAttribute("transform", `translate(${r1(cxp + 3 * Math.sin(t * 2))} ${r1(cyp)}) scale(${(0.7 + 0.3 * backOut(Math.min(1, storm * 1.2))).toFixed(3)})`);
          const g = Math.round(lerp(138, 80, dark)); cloudFill.forEach((c) => c.setAttribute("fill", `rgb(${g},${g + 4},${g + 12})`));
          rain.forEach((l, i) => { const q = frac(t * 2.2 + i / 7), on = s > T_WHAT && storm > 0.5; const x = cxp - 42 + i * 14; l.setAttribute("x1", r1(x)); l.setAttribute("x2", r1(x - 4)); l.setAttribute("y1", r1(cyp + 28 + 70 * q)); l.setAttribute("y2", r1(cyp + 44 + 70 * q)); l.setAttribute("opacity", on ? (storm * (1 - q)).toFixed(3) : 0); });
          const fl = Math.max(hold(s, T_BOLT1, T_BOLT1 + 0.3, 0.03), hold(s, T_BOLT2, T_BOLT2 + 0.3, 0.03));
          bolt.setAttribute("opacity", (fl * storm).toFixed(3)); bolt.setAttribute("transform", `translate(${r1(cxp)} ${r1(cyp)})`);
          E("flash").style.opacity = (0.35 * Math.max(hold(s, T_BOLT1, T_BOLT1 + 0.12, 0.03), hold(s, T_BOLT2, T_BOLT2 + 0.12, 0.03))).toFixed(3);
          gloom.setAttribute("opacity", (0.5 * storm).toFixed(3));
          const sq = hold(s, T_CLEAR + 0.2, T_HUG + 0.4, 0.25);
          sun.setAttribute("opacity", sq.toFixed(3)); sun.setAttribute("transform", `translate(${r1(cxp)} ${r1(cyp - 10)}) rotate(${r1(t * 40)}) scale(${(0.6 + 0.4 * backOut(sq)).toFixed(3)})`);
          // the decoder book: flipping pages, then tossed away
          const bk = s > T_BOOK && s < T_TOSS + 0.6 ? 1 : 0;
          let bx = (mp.hands[0][0] + mp.hands[1][0]) / 2, by = (mp.hands[0][1] + mp.hands[1][1]) / 2 - 10, br = 0;
          if (s > T_TOSS) { const q = clamp((s - T_TOSS) / 0.6, 0, 1); bx += 400 * q; by += -260 * q + 300 * q * q; br = 540 * q; }
          book.setAttribute("opacity", bk * win(s, T_BOOK, T_BOOK + 0.15)); book.setAttribute("transform", `translate(${r1(bx)} ${r1(by)}) rotate(${r1(br)})`);
          const fq = frac((s - T_BOOK) * 2.6), fw = 38 * Math.cos(Math.PI * fq);
          flip.setAttribute("d", `M0 -24 L${r1(fw)} -22 L${r1(fw)} 22 L0 24 Z`); flip.setAttribute("opacity", s < T_TOSS ? 1 : 0);
          qs.forEach((q, i) => { const k = hold(s, T_BOOK + 0.3 + i * 0.2, T_TOSS, 0.1); q.setAttribute("x", r1(mp.head[0] - 40 + i * 40)); q.setAttribute("y", r1(mp.head[1] - 60 - 8 * Math.sin(t * 6 + i * 2))); q.setAttribute("opacity", k.toFixed(3)); });
          const bg = hold(s, T_BOLT1, T_BOLT1 + 0.7, 0.05); bang.setAttribute("x", r1(mp.head[0])); bang.setAttribute("y", r1(mp.head[1] - 60)); bang.setAttribute("opacity", bg.toFixed(3));
          // food: he brings it back, gives it, she holds it through the hug
          const fh = s < T_GIVE + 0.15 ? mp.hands[1] : hp.hands[1];
          const fo = s > T_OUT ? 1 : 0;
          food.setAttribute("opacity", fo); food.setAttribute("transform", `translate(${r1(fh[0])} ${r1(fh[1] + 20)})`);
          steam.forEach((p, i) => { const q = frac(t * 1.6 + i / 2); p.setAttribute("d", `M${r1(fh[0] - 8 + i * 16)} ${r1(fh[1] - 40 - 30 * q)} q8 -10 0 -20`); p.setAttribute("opacity", fo ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // speech
          const bub = (gg, a, b, p) => { const k = hold(s, a, b, 0.1); gg.setAttribute("opacity", k.toFixed(3)); gg.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bFine, T_FINE, T_FINE + 1.1, [hp.head[0] - 30, hp.head[1] - 230]);
          bub(bOk, T_OK, T_BOLT1, [mp.head[0] + 20, mp.head[1] - 110]);
          bub(bWhat, T_WHAT, T_WHAT + 1.1, [hp.head[0] + 40, hp.head[1] - 230]);
          bub(bWrong, T_WRONG, T_WRONG + 1.0, [hp.head[0] + 20, hp.head[1] - 230]);
          bub(bAww, T_CLEAR + 0.1, T_HUG + 0.4, [hp.head[0] - 20, hp.head[1] - 110]);
          smallH.forEach((h, k) => { const q = clamp((s - T_CLEAR - 0.1 - k * 0.15) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(hp.head[0] + 30 - k * 20)} ${r1(hp.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (0.8 * win(s, T_CLEAR, T_CLEAR + 0.8)).toFixed(3));

          E("h1").innerHTML = slam(["SHE", "SAID", "SHE", "WAS", "FINE."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.39, T_H1 + 0.52], t, [4]);
          E("h2").innerHTML = slam(["HE", "KNEW", "WHAT", "TO", "DO."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.39, T_H2 + 0.52], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["HEAR", "WHAT"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["SHE", "DOESN'T", "SAY."], [T_CARD + 0.7, T_CARD + 0.85, T_CARD + 1.0], t, [1, 2]);
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
