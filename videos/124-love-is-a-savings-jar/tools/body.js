        // ---------- "love is a savings jar. #32": winner split-screen format. Kitchen counter at night, a glass jar labelled "OUR HOME". BOTH SAVE: they take turns dropping coins in, it fills up, a house key rises out, they hold it together, heart. ONE SAVES: he drops coins in, she takes them out (phone in the other hand), shopping bags pile up, the jar runs empty, it cracks, she walks off with the bags. FOLLOW: a big gold coin "+ FOLLOW" spins up out of the jar, she taps it → red "FOLLOWING ✓". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 700, CTY = G - 100, JX = 616, JB = CTY, JH = 200, JW = 190, JTOP = JB - JH, XH = JX - 172, XS = JX + 172;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const TOPEV = [[0.8, "h"], [1.6, "s"], [2.4, "h"], [3.2, "s"], [4.0, "h"], [4.8, "s"], [5.6, "h"], [6.3, "s"]];
        const BOTEV = [[0.8, "h", 1], [1.5, "s", -1], [2.4, "h", 1], [3.1, "s", -1], [4.0, "h", 1], [4.7, "s", -1], [5.6, "h", 1], [6.3, "s", -1], [7.0, "s", -1]];
        const T_KEY = 6.9, T_HOLD = 7.5, T_HEART = 8.0;
        const T_LOOK = 7.6, T_CRACK = 8.1, T_WALK = 8.7, T_GONE = 10.6;
        const T_H2 = 9.6, T_H3 = 10.8;
        const T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
        const LV = 22, LV0B = 1;
        const lvlTop = (t) => TOPEV.reduce((a, [te]) => a + sm(t, te + 0.3, te + 0.5), 0);
        const lvlBot = (t) => LV0B + BOTEV.reduce((a, [te, , d]) => a + d * sm(t, d > 0 ? te + 0.3 : te, d > 0 ? te + 0.5 : te + 0.2), 0);
        const lvY = (l) => JB - 12 - l * LV;

        function makePanel(y0, id, warm) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#wallG)" }, inner);
          // tiles, window, hanging lamp, shelf with a plant
          for (let i = 0; i < 9; i++) for (let j = 0; j < 3; j++) svgEl("rect", { x: 180 + i * 100, y: CTY - 90 + j * 30 - 60, width: 96, height: 26, fill: "none", stroke: "#20232c", "stroke-width": 3 }, inner);
          svgEl("rect", { x: 960, y: 170, width: 190, height: 200, fill: "#0b1020", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("circle", { cx: 1100, cy: 220, r: 22, fill: "#e8e4d8", opacity: 0.8 }, inner);
          svgEl("path", { d: "M1055 170 L1055 370 M960 270 L1150 270", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("rect", { x: 70, y: 330, width: 220, height: 14, fill: "#3a2c1c", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("rect", { x: 100, y: 290, width: 40, height: 40, fill: "#6a4a30", stroke: "#000", "stroke-width": 4 }, inner);
          for (const a of [-40, 0, 40]) svgEl("path", { d: `M120 290 q${a / 2} -30 ${a} -45`, stroke: "#3a7a46", "stroke-width": 8, fill: "none", "stroke-linecap": "round" }, inner);
          svgEl("rect", { x: 200, y: 292, width: 60, height: 38, fill: "#c8b48a", stroke: "#000", "stroke-width": 4 }, inner);
          const lamp = svgEl("circle", { cx: JX, cy: 300, r: 300, fill: "url(#lampG)", opacity: warm ? 0.85 : 0.25 }, inner);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "#16130f" }, inner);
          const beams = svgEl("g", {}, inner);
          const glow = svgEl("circle", { r: 260, fill: "url(#redGlow)", opacity: 0 }, inner);
          const figs = svgEl("g", {}, inner);
          // counter in front of their legs
          svgEl("rect", { x: 150, y: CTY, width: 930, height: G - CTY + 10, fill: "url(#woodG)", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("rect", { x: 136, y: CTY - 14, width: 958, height: 20, rx: 4, fill: "#8a7a62", stroke: "#000", "stroke-width": 6 }, inner);
          for (const x of [380, 616, 852]) svgEl("rect", { x: x - 90, y: CTY + 22, width: 180, height: 60, rx: 6, fill: "none", stroke: "#000", "stroke-width": 4, opacity: 0.6 }, inner);
          const bags = svgEl("g", {}, inner);
          const jar = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, figs, bags, jar, fx, dark, lamp };
        }
        const top = makePanel(412, "T", true);
        const bot = makePanel(1010, "B", false);
        const JARD = `M${JX - 62} ${JTOP} L${JX - 62} ${JTOP + 22} Q${JX - JW / 2} ${JTOP + 34} ${JX - JW / 2} ${JTOP + 70} L${JX - JW / 2} ${JB - 14} Q${JX - JW / 2} ${JB - 6} ${JX - JW / 2 + 12} ${JB - 6} L${JX + JW / 2 - 12} ${JB - 6} Q${JX + JW / 2} ${JB - 6} ${JX + JW / 2} ${JB - 14} L${JX + JW / 2} ${JTOP + 70} Q${JX + JW / 2} ${JTOP + 34} ${JX + 62} ${JTOP + 22} L${JX + 62} ${JTOP} Z`;
        function mkJar(P2, gold, id) {
          const clip = svgEl("clipPath", { id: "jc" + id }, SVG.querySelector("defs"));
          svgEl("path", { d: JARD }, clip);
          svgEl("path", { d: JARD, fill: "#9fc8d8", opacity: 0.16 }, P2.jar);
          const inside = svgEl("g", { "clip-path": `url(#jc${id})` }, P2.jar);
          const fill = svgEl("rect", { x: JX - JW / 2, width: JW, y: JB, height: 0, fill: gold }, inside);
          const cTop = Array.from({ length: 6 }, (_, i) => svgEl("ellipse", { cx: JX - 80 + i * 32, rx: 18, ry: 6, fill: gold, stroke: "#000", "stroke-width": 3 }, inside));
          const coinsIn = svgEl("g", {}, inside);
          svgEl("path", { d: JARD, fill: "none", stroke: "#000", "stroke-width": 7, "stroke-linejoin": "round" }, P2.jar);
          svgEl("path", { d: `M${JX - 70} ${JTOP + 60} L${JX - 70} ${JB - 30}`, stroke: "#fff", "stroke-width": 6, opacity: 0.25, "stroke-linecap": "round" }, P2.jar);
          svgEl("rect", { x: JX - 66, y: JTOP - 6, width: 132, height: 14, rx: 5, fill: "#8a8a92", stroke: "#000", "stroke-width": 4 }, P2.jar);
          // label
          svgEl("rect", { x: JX - 66, y: JTOP + 66, width: 132, height: 62, rx: 6, fill: "#efe6d0", stroke: "#000", "stroke-width": 4 }, P2.jar);
          svgEl("path", { d: `M${JX - 44} ${JTOP + 96} L${JX - 30} ${JTOP + 82} L${JX - 16} ${JTOP + 96} L${JX - 16} ${JTOP + 116} L${JX - 44} ${JTOP + 116} Z`, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, P2.jar);
          svgEl("text", { x: JX + 18, y: JTOP + 94, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 15, fill: "#222", "text-anchor": "middle" }, P2.jar).textContent = "OUR";
          svgEl("text", { x: JX + 18, y: JTOP + 114, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 15, fill: "#222", "text-anchor": "middle" }, P2.jar).textContent = "HOME";
          const crack = svgEl("path", { d: `M${JX + 40} ${JTOP + 40} L${JX + 18} ${JTOP + 70} L${JX + 44} ${JTOP + 104} L${JX + 10} ${JTOP + 140} L${JX + 30} ${JTOP + 168} M${JX + 44} ${JTOP + 104} L${JX + 76} ${JTOP + 120}`, fill: "none", stroke: "#fff", "stroke-width": 4, opacity: 0, "stroke-linejoin": "round" }, P2.jar);
          return { fill, cTop, crack };
        }
        const JT = mkJar(top, "url(#goldG)", "T"), JBt = mkJar(bot, "url(#goldB)", "B");
        const mkCoin = (parent, col) => svgEl("ellipse", { rx: 15, ry: 15, fill: col, stroke: "#000", "stroke-width": 3, opacity: 0 }, parent);
        const coinsT = TOPEV.map(() => mkCoin(top.fx, "#ffd86a")), coinsB = BOTEV.map(() => mkCoin(bot.fx, "#c8b878"));
        const bagEls = [0, 1, 2, 3, 4].map((i) => { const g = svgEl("g", { opacity: 0 }, bot.bags); svgEl("rect", { x: -24, y: -54, width: 48, height: 54, rx: 3, fill: ["#6a5a7a", "#7a5a5a", "#5a6a7a", "#7a7058", "#5a7a62"][i], stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: "M-12 -54 Q0 -76 12 -54", fill: "none", stroke: "#000", "stroke-width": 4 }, g); return g; });
        // key + FOLLOW coin
        const key = svgEl("g", { opacity: 0 }, top.fx);
        svgEl("circle", { cx: -50, cy: 0, r: 24, fill: "url(#goldG)", stroke: "#000", "stroke-width": 5 }, key);
        svgEl("circle", { cx: -50, cy: 0, r: 9, fill: "#1a1c22", stroke: "#000", "stroke-width": 3 }, key);
        svgEl("path", { d: "M-26 -7 L60 -7 L60 7 L50 7 L50 22 L38 22 L38 7 L28 7 L28 18 L18 18 L18 7 L-26 7 Z", fill: "url(#goldG)", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, key);
        const fc = svgEl("g", { opacity: 0 }, top.fx);
        const fcB = svgEl("ellipse", { rx: 92, ry: 92, fill: "url(#goldG)", stroke: "#000", "stroke-width": 6 }, fc);
        const fcR = svgEl("ellipse", { rx: 76, ry: 76, fill: "none", stroke: "#a87414", "stroke-width": 4 }, fc);
        const fcT = svgEl("text", { x: 0, y: 9, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, fill: "#3a2a08", "text-anchor": "middle" }, fc);
        const minis = Array.from({ length: 12 }, () => svgEl("ellipse", { rx: 12, ry: 12, fill: "#ffd86a", stroke: "#000", "stroke-width": 2.5, opacity: 0 }, top.fx));

        // ---------- poses ----------
        const walkPose = (x, f, t, t0) => { const st = standOn(x, f, G); const ph = (t - t0) * 7.5; st.ax = x + 22 * Math.sin(ph); st.bx = x - 22 * Math.sin(ph); st.ay = G - 10 * Math.max(0, Math.cos(ph)); st.by = G - 10 * Math.max(0, -Math.cos(ph)); return st; };
        const idleHands = (st, x, f) => { reachTo(st, 1, [x + 34 * f, CTY - 16], "a"); reachTo(st, 1, [x + 20 * f, CTY - 12], "b"); };
        const dropPose = (st, evs, who, x, f, t, lvl) => {
          for (const [te, w, d = 1] of evs) {
            if (w !== who) continue;
            if (d > 0) { const k = hold(t, te - 0.6, te + 0.3, 0.3); reachTo(st, k, [JX - 22 * f, JTOP - 34 + 6 * win(t, te - 0.15, te)]); st.torso += 22 * k; }
            else { const k = hold(t, te - 0.6, te + 0.45, 0.3), out = win(t, te, te + 0.4); reachTo(st, k, [lerp(JX - 10 * f, x + 70 * f, out), lerp(lvY(lvl(te)) - 10, CTY - 60, out)]); st.torso += 24 * k * (1 - out); }
          }
          return st;
        };
        function topHim(t) {
          const st = standOn(XH, 1, G); idleHands(st, XH, 1);
          dropPose(st, TOPEV, "h", XH, 1, t, lvlTop);
          const kh = win(t, T_HOLD - 0.4, T_HOLD); reachTo(st, kh, [JX - 40, JTOP - 120]); st.torso += 14 * kh; st.head = lerp(st.head, -10, kh);
          return st;
        }
        function topHer(t) {
          const st = standOn(XS, -1, G); idleHands(st, XS, -1);
          dropPose(st, TOPEV, "s", XS, -1, t, lvlTop);
          const kh = win(t, T_HOLD - 0.4, T_HOLD); reachTo(st, kh, [JX + 40, JTOP - 120]); st.torso += 14 * kh; st.head = lerp(st.head, -10, kh);
          const tap = hold(t, T_TAP - 0.55, T_TAP + 0.4, 0.3); reachTo(st, tap, [JX + 60, JTOP - 150 + 12 * win(t, T_TAP - 0.1, T_TAP)], "b");
          return st;
        }
        function botHim(t) {
          const st = standOn(XH, 1, G); idleHands(st, XH, 1);
          dropPose(st, BOTEV, "h", XH, 1, t, lvlBot);
          const lk = win(t, T_LOOK, T_LOOK + 0.5); st.torso = lerp(st.torso, 16, lk); st.head = lerp(st.head, 28, lk);
          reachTo(st, lk, [JX - 70, JTOP + 60]); st.torso += 10 * lk;
          st.head = lerp(st.head, 36, win(t, T_GONE - 0.8, T_GONE));
          return st;
        }
        const botSheX = (t) => lerp(XS, 1450, sm(t, T_WALK, T_GONE));
        function botHer(t) {
          const x = botSheX(t), walk = t > T_WALK;
          const st = walk ? walkPose(x, 1, t, T_WALK) : standOn(x, -1, G);
          const f = walk ? 1 : -1;
          st.head = 24;
          reachTo(st, 1, [x + 40 * f, stY - 118], "b");
          if (!walk) { reachTo(st, 1, [x + 34 * f, CTY - 16], "a"); dropPose(st, BOTEV, "s", x, -1, t, lvlBot); }
          else reachTo(st, 1, [x - 10, stY - 30], "a");
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH SAVE"; botT.textContent = "ONE SAVES";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "EACH PUTS SOMETHING IN"], [4.4, "IT FILLS UP"], [T_KEY, "A HOME OF THEIR OWN", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE PUTS IN"], [1.5, "SHE TAKES OUT", "#ff3b30"], [6.3, "UNTIL NOTHING IS LEFT", "#ff3b30"], [T_CRACK, "AND IT BREAKS", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [JX, 400], CS = [540, 1060], ZK = 1.3;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const FCP = [JX, JTOP - 170];

        function drawLevel(J, l) {
          const y = lvY(l);
          J.fill.setAttribute("y", r1(y)); J.fill.setAttribute("height", r1(Math.max(0, JB - y)));
          J.cTop.forEach((c, i) => { c.setAttribute("cy", r1(y + (i % 2) * 4)); c.setAttribute("opacity", l > 0.15 ? 1 : 0); });
        }
        function drawCoins(els, evs, t, hands, lvl) {
          evs.forEach(([te, w, d = 1], i) => {
            const c = els[i], h = hands[w];
            if (d > 0) {
              if (t < te - 0.35 || t > te + 0.36) { c.setAttribute("opacity", 0); return; }
              const tx = JX - 22 * (w === "h" ? 1 : -1);
              let p;
              if (t < te) p = [h[0], h[1] - 8]; else { const q = (t - te) / 0.36; p = [tx, lerp(JTOP - 30, lvY(lvl(te)) - 6, q * q)]; }
              c.setAttribute("opacity", 1); c.setAttribute("cx", r1(p[0])); c.setAttribute("cy", r1(p[1])); c.setAttribute("rx", r1(15 * Math.abs(Math.cos(t * 9)) + 3));
            } else {
              if (t < te || t > te + 0.42) { c.setAttribute("opacity", 0); return; }
              c.setAttribute("opacity", 1); c.setAttribute("cx", r1(h[0])); c.setAttribute("cy", r1(h[1] - 6)); c.setAttribute("rx", 15);
            }
          });
        }

        function render(t) {
          // ---- top
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] + 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          drawLevel(JT, lvlTop(t));
          drawCoins(coinsT, TOPEV, t, { h: mp.hands[0], s: hp.hands[0] }, lvlTop);
          const kq = sm(t, T_KEY, T_KEY + 0.6);
          key.setAttribute("opacity", (sm(t, T_KEY, T_KEY + 0.2) * (1 - sm(t, T_CTA, T_CTA + 0.4))).toFixed(3));
          key.setAttribute("transform", `translate(${JX + 6} ${r1(lerp(JTOP + 20, JTOP - 120, kq))}) rotate(${r1(lerp(-80, 0, kq))})`);
          top.glow.setAttribute("cx", JX); top.glow.setAttribute("cy", JTOP - 60); top.glow.setAttribute("opacity", (0.55 * win(t, T_KEY, T_KEY + 0.8)).toFixed(3));
          redSpot.setAttribute("points", `${JX - 60},${PY0} ${JX + 60},${PY0} ${JX + 260},${G} ${JX - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(${JX} ${r1(JTOP - 210 - 10 * hq)}) scale(${(backOut(hq) * 1.4).toFixed(3)})`);
          // FOLLOW coin: spins up out of the jar
          const lq = sm(t, T_TAG, T_TAG + 1.0), popped = t > T_TAP;
          const spin = popped ? 1 : Math.abs(Math.cos((t - T_TAG) * Math.PI * (1.6 - 1.2 * lq)));
          const sx = Math.max(0.08, lq < 1 ? spin : 1);
          const pk = popped ? 1 + 0.14 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 1;
          fc.setAttribute("opacity", sm(t, T_TAG, T_TAG + 0.2).toFixed(3));
          fc.setAttribute("transform", `translate(${FCP[0]} ${r1(lerp(JTOP + 40, FCP[1], lq) + 5 * Math.sin(t * 2.2) * lq)}) scale(${(sx * pk * lerp(0.4, 1, lq)).toFixed(3)} ${(pk * lerp(0.4, 1, lq)).toFixed(3)})`);
          fcB.setAttribute("fill", popped ? "#ff3b30" : "url(#goldG)"); fcR.setAttribute("stroke", popped ? "#b02018" : "#a87414");
          fcT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; fcT.setAttribute("font-size", popped ? 19 : 26); fcT.setAttribute("fill", popped ? "#fff" : "#3a2a08");
          minis.forEach((h, i) => { const q = clamp((t - T_TAP) / 1.3, 0, 1), a = (i / 12) * Math.PI * 2; h.setAttribute("opacity", popped && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("cx", r1(FCP[0] + Math.cos(a) * 200 * Math.sqrt(q))); h.setAttribute("cy", r1(FCP[1] + Math.sin(a) * 130 * Math.sqrt(q) + 90 * q * q)); h.setAttribute("rx", r1(12 * Math.abs(Math.cos(t * 8 + i)) + 2)); });
          const cm = cam(t);
          top.g.setAttribute("transform", `translate(${r1(cm.ox)} ${r1(cm.oy)}) scale(${cm.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const bm = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          const bf = t > T_WALK ? 1 : -1;
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), bf);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25 * bf)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          drawLevel(JBt, lvlBot(t));
          drawCoins(coinsB, BOTEV, t, { h: bm.hands[0], s: sp.hands[0] }, lvlBot);
          JBt.crack.setAttribute("opacity", sm(t, T_CRACK, T_CRACK + 0.15).toFixed(3));
          let nb = 0; BOTEV.forEach(([te, w, d]) => { if (d < 0 && t > te + 0.4) nb++; });
          const off = botSheX(t) - XS;
          bagEls.forEach((b, i) => { b.setAttribute("opacity", i < nb ? 1 : 0); b.setAttribute("transform", `translate(${r1(850 + i * 54 + off)} ${r1(CTY - 4 + (t > T_WALK ? 70 : 0) * sm(t, T_WALK, T_WALK + 0.4))})`); });
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          bot.dark.setAttribute("opacity", (0.34 * win(t, T_CRACK, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE KEPT PUTTING IN.", L3 = "SHE KEPT TAKING OUT.";
          E("head").innerHTML = `<div>LOVE IS A SAVINGS JAR. #32</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #33 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TAP - 0.5) * 28)));
          fade.style.opacity = win(t, DUR - 0.35, DUR - 0.02).toFixed(3);
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
