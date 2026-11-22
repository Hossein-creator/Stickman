        // ---------- "love is a wall. #26": winner split-screen format. A high brick wall. BOTH CLIMB: he boosts her up, she sits on top, reaches down and pulls him up; both sit on the wall, the sun rises behind it, heart. ONE CLIMBS: he boosts her up, she sits on top scrolling and never looks down; he jumps and reaches, can't make it; she hops down the far side and walks away. FOLLOW: one brick slides out "+ FOLLOW", he pushes it back in → "FOLLOWING ✓". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 720, WX0 = 560, WX1 = 690, WT = G - 430;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_LIFT = 6.4, T_HEART = 7.0, T_TIRED = 4.4, T_LET = 6.0, T_GONE = 8.6;
        const T_H2 = 9.2, T_H3 = 10.4;
        const T_CTA = 12.6, T_TAG = 13.3, T_TAP = 14.9;
        const kf = (t, keys) => { if (t <= keys[0][0]) return { ...keys[0][1] }; for (let i = 0; i < keys.length - 1; i++) if (t < keys[i + 1][0]) return mixPose(keys[i][1], keys[i + 1][1], sm(t, keys[i][0], keys[i + 1][0])); return { ...keys[keys.length - 1][1] }; };
        const PZ = (o) => base(o);
        // shared poses
        const HANDS0 = [540, G - 92], HANDS1 = [548, G - 218];
        const herStand = (x) => PZ({ hx: x, hy: stY, torso: 3, ax: x + 15, ay: G, bx: x - 15, by: G });
        const herOnHands = PZ({ hx: 506, hy: HANDS1[1] - 150, torso: 10, head: -6, ax: HANDS1[0] - 6, ay: HANDS1[1] - 8, bx: 500, by: HANDS1[1] + 30 });
        const herOnHands0 = PZ({ hx: 490, hy: HANDS0[1] - 140, torso: 12, head: -4, ax: HANDS0[0] - 6, ay: HANDS0[1] - 8, bx: 480, by: G });
        const herOver = PZ({ hx: 586, hy: WT - 30, torso: 40, head: 0, ax: WX0 - 4, ay: WT + 70, bx: WX0 + 10, by: WT + 100 });
        const herSitL = PZ({ hx: 604, hy: WT - 8, torso: 4, head: 14, ax: 574, ay: WT + 124, bx: 560, by: WT + 112 });
        const herSitR = PZ({ hx: 620, hy: WT - 8, torso: 6, head: 26, ax: 650, ay: WT + 124, bx: 664, by: WT + 112 });
        const himStand = (x) => PZ({ hx: x, hy: stY, torso: 3, ax: x + 15, ay: G, bx: x - 15, by: G });
        const himCrouch = PZ({ hx: 486, hy: G - 112, torso: 24, head: 10, ax: 530, ay: G, bx: 452, by: G });
        const himLift = PZ({ hx: 500, hy: stY, torso: 6, head: -16, ax: 515, ay: G, bx: 485, by: G });
        const himHang = PZ({ hx: 540, hy: WT + 150, torso: 8, head: -20, ax: WX0 - 2, ay: WT + 230, bx: WX0 - 10, by: WT + 270 });
        const himOver = PZ({ hx: 610, hy: WT - 30, torso: 40, head: 0, ax: WX0 - 4, ay: WT + 60, bx: WX0 + 14, by: WT + 90 });
        const himSit = PZ({ hx: 664, hy: WT - 8, torso: 4, head: 14, ax: 634, ay: WT + 124, bx: 620, by: WT + 112 });
        const TOPHER = [[0.2, herStand(360)], [1.1, herStand(468)], [1.4, herOnHands0], [2.0, herOnHands], [2.6, herOver], [3.1, herSitL], [4.4, herSitL], [5.4, { ...herSitL, hx: 588, ax: 558, bx: 544 }]];
        const TOPHIM = [[0.2, himStand(500)], [0.7, himCrouch], [1.4, himCrouch], [2.0, himLift], [2.8, himStand(500)], [3.4, himStand(510)], [3.9, { ...himStand(520), hy: stY - 34, ay: G - 34, by: G - 30 }], [4.3, himHang], [4.9, himOver], [5.4, himSit]];
        const BOTHER = [[0.2, herStand(360)], [1.1, herStand(468)], [1.4, herOnHands0], [2.0, herOnHands], [2.6, herOver], [3.1, herSitR], [T_LET, herSitR], [T_LET + 0.5, PZ({ hx: 760, hy: stY - 20, torso: 10, ax: 775, ay: G - 30, bx: 745, by: G - 20 })], [T_LET + 0.7, herStand(770)]];
        const BOTHIM = [[0.2, himStand(500)], [0.7, himCrouch], [1.4, himCrouch], [2.0, himLift], [2.8, himStand(500)], [3.1, himStand(505)]];

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const sun = svgEl("circle", { cx: 930, cy: G - 260, r: 420, fill: "url(#winGlow)", opacity: 0 }, inner);
          const sunD = svgEl("circle", { cx: 930, cy: WT + 60, r: 70, fill: "#ffcf6a", stroke: "#000", "stroke-width": 5, opacity: 0 }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [430, 640]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          const sc = svgEl("g", { transform: `translate(616 ${G}) scale(0.78) translate(-616 ${-G})` }, inner);
          const wall = svgEl("g", {}, sc);
          const glow = svgEl("circle", { r: 300, fill: "url(#redGlow)", opacity: 0 }, sc);
          const figs = svgEl("g", {}, sc);
          const fx = svgEl("g", {}, sc);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, sun, sunD, wall, glow, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        function buildWall(P2, fill) {
          svgEl("rect", { x: WX0, y: WT, width: WX1 - WX0, height: G - WT, fill, stroke: "#000", "stroke-width": 6 }, P2.wall);
          for (let r = 0; r < 15; r++) { const y = WT + r * 30; svgEl("path", { d: `M${WX0} ${y} L${WX1} ${y}`, stroke: "#000", "stroke-width": 3, opacity: 0.5 }, P2.wall); for (let c = 0; c < 3; c++) { const x = WX0 + ((r % 2 ? 22 : 44) + c * 44); if (x < WX1 - 4) svgEl("path", { d: `M${x} ${y} L${x} ${y + 30}`, stroke: "#000", "stroke-width": 3, opacity: 0.5 }, P2.wall); } }
          svgEl("rect", { x: WX0 - 8, y: WT - 12, width: WX1 - WX0 + 16, height: 14, fill: "#8a8a8a", stroke: "#000", "stroke-width": 4 }, P2.wall);
        }
        buildWall(top, "#b05a3e"); buildWall(bot, "#6a5650");

        // ---------- poses ----------
        function topHer(t) {
          const st = kf(t, TOPHER);
          if (t > 1.2 && t < 2.6) { reachTo(st, 1, [WX0 + 10, WT - 4]); reachTo(st, sm(t, 1.6, 2.0), [WX0 + 30, WT - 6], "b"); }
          const help = hold(t, 3.2, 5.0, 0.3), mp = himHand(t);
          reachTo(st, help, mp ? mp : [WX0 - 20, WT + 70]); reachTo(st, help, mp ? [mp[0] + 6, mp[1] - 6] : [WX0 - 14, WT + 64], "b");
          st.head = lerp(st.head, -18, win(t, T_LIFT, T_LIFT + 0.5)); st.head += 10 * win(t, T_HEART, T_HEART + 0.4);
          reachTo(st, win(t, 5.5, 6.0), [628, WT - 40], "b");
          return st;
        }
        let HIMHAND = null; const himHand = () => HIMHAND;
        function topHim(t) {
          const st = kf(t, TOPHIM);
          if (t > 0.6 && t < 2.3) { const hq = sm(t, 1.4, 2.0); const h = [lerp(HANDS0[0], HANDS1[0], hq), lerp(HANDS0[1], HANDS1[1], hq)]; reachTo(st, 1, h); reachTo(st, 1, [h[0] - 6, h[1] + 6], "b"); }
          const reach = hold(t, 3.3, 4.95, 0.25); reachTo(st, reach, [WX0 + 8, WT - 2 + 40 * (1 - sm(t, 3.9, 4.6))]); reachTo(st, reach * sm(t, 4.2, 4.6), [WX0 + 20, WT - 4], "b");
          st.head = lerp(st.head, -18, win(t, T_LIFT, T_LIFT + 0.5)); st.head += 10 * win(t, T_HEART, T_HEART + 0.4);
          reachTo(st, win(t, 5.5, 6.0), [620, WT - 40], "b");
                    return st;
        }
        const hopK = (t) => (t > 3.1 && t < T_LET + 0.3 ? Math.max(0, Math.sin((t - 3.1) * 4.2)) : 0);
        function botHim(t) {
          const st = kf(t, BOTHIM);
          if (t > 0.6 && t < 2.3) { const hq = sm(t, 1.4, 2.0); const h = [lerp(HANDS0[0], HANDS1[0], hq), lerp(HANDS0[1], HANDS1[1], hq)]; reachTo(st, 1, h); reachTo(st, 1, [h[0] - 6, h[1] + 6], "b"); }
          const hp2 = hopK(t) * 34, jump = hold(t, 3.1, T_LET + 0.6, 0.2);
          st.hy -= hp2; st.ay -= hp2; st.by -= hp2;
          reachTo(st, jump, [WX0 - 6, WT + 80 - hp2 * 0.6 - 30 * win(t, T_TIRED, T_TIRED + 0.4)]); st.head = lerp(st.head, -24, jump);
          const ko = win(t, T_LET + 0.6, T_LET + 1.2); reachTo(st, ko, [WX0 - 4, G - 190]); st.head = lerp(st.head, 26, win(t, T_GONE - 0.8, T_GONE)); st.torso = lerp(st.torso, 14, ko);
          return st;
        }
        const herBX = (t) => lerp(770, 1400, sm(t, T_LET + 0.8, T_GONE));
        function botHer(t) {
          let st;
          if (t < T_LET + 0.8) st = kf(t, BOTHER);
          else { const x = herBX(t), q = (x - 770) / 100; const ph = Math.PI * 2 * q; st = PZ({ hx: x, hy: stY + 2 * Math.abs(Math.sin(ph)), torso: 6, head: 26, ax: x + 22 * Math.sin(ph), ay: G - 8 * Math.max(0, Math.cos(ph)), bx: x - 22 * Math.sin(ph), by: G - 8 * Math.max(0, -Math.cos(ph)) }); }
          if (t > 1.2 && t < 2.6) { reachTo(st, 1, [WX0 + 10, WT - 4]); reachTo(st, sm(t, 1.6, 2.0), [WX0 + 30, WT - 6], "b"); }
          const ph2 = t > 2.9 ? 1 : 0; reachTo(st, ph2, [st.hx + 40, st.hy - 110], "b"); reachTo(st, ph2, [st.hx + 46, st.hy - 106]);
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const sweat = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);
        const brick = svgEl("g", { opacity: 0 }, top.fx);
        const brickR = svgEl("rect", { x: -56, y: -15, width: 112, height: 30, rx: 3, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, brick);
        const brickT = svgEl("text", { x: 0, y: 7, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 17, fill: "#fff", "text-anchor": "middle" }, brick);
        const dustB = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH CLIMB"; botT.textContent = "ONE CLIMBS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "HE LIFTS HER UP"], [3.2, "SHE PULLS HIM UP"], [T_LIFT, "THE SUN RISES", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE LIFTS HER UP"], [3.2, "HE REACHES UP"], [T_TIRED, "SHE NEVER LOOKS DOWN", "#ff3b30"], [T_LET, "SHE JUMPS DOWN", "#ff3b30"], [T_LET + 1.2, "AND WALKS AWAY", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [640, G - 320], CS = [540, 1000], ZK = 1.2;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };

        function render(t) {
          // ---- top (him first so her helping hand can follow his)
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), t < 4.7 ? 1 : -1);
          HIMHAND = t > 3.6 && t < 5.0 ? mp.hands[0] : null;
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), t < 2.4 ? 1 : -1);
          const hf = t < 2.4 ? 1 : -1;
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25 * hf)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const sq = sm(t, T_LIFT - 0.3, T_LIFT + 1.0);
          top.sun.setAttribute("opacity", (0.8 * sq).toFixed(3)); top.sunD.setAttribute("opacity", sq.toFixed(3)); top.sunD.setAttribute("cy", r1(G - 220 - 120 * sq));
          top.glow.setAttribute("cx", 630); top.glow.setAttribute("cy", WT - 60); top.glow.setAttribute("opacity", (0.5 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          redSpot.setAttribute("points", `${590},${PY0} ${690},${PY0} ${890},${G} ${390},${G}`);
          redSpot.setAttribute("opacity", (0.35 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(630 ${r1(WT - 250 - 10 * hq)}) scale(${(backOut(hq) * 1.5).toFixed(3)})`);
          // FOLLOW brick
          const popped = t > T_TAP, out = sm(t, T_TAG, T_TAG + 0.5) * (1 - sm(t, T_TAP - 0.1, T_TAP + 0.05));
          brick.setAttribute("opacity", t > T_TAG ? 1 : 0);
          brick.setAttribute("transform", `translate(${r1(WX0 + 66 - 90 * out)} ${WT + 260}) scale(${(1.5 * (popped ? 1 + 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 1)).toFixed(3)})`);
          brickR.setAttribute("fill", popped ? "#ffffff" : "#ff3b30"); brickT.setAttribute("fill", popped ? "#000" : "#fff");
          brickT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; brickT.setAttribute("font-size", popped ? 13 : 17);
          dustB.forEach((h, i) => { const q = clamp((t - T_TAP) / 1.1, 0, 1), a = (i / 10) * Math.PI * 2; h.setAttribute("opacity", popped && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(WX0 + 66 + Math.cos(a) * 200 * Math.sqrt(q))} ${r1(WT + 260 + Math.sin(a) * 140 * Math.sqrt(q))}) scale(${(0.7 - 0.3 * q).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const bf = t < 2.4 ? 1 : 1;
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), bf);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25 * bf)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = sp.hands[1], phOn = t > 2.9 ? 1 : 0;
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`); phone.setAttribute("opacity", phOn);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (phOn * (0.75 + 0.15 * Math.sin(t * 5))).toFixed(3));
          sweat.forEach((e, i) => { const q = frac(t * 1.4 + i / 6); e.setAttribute("transform", `translate(${r1(bp.head[0] + (i % 2 ? 1 : -1) * (30 + 30 * q))} ${r1(bp.head[1] - 20 + 60 * q * q)})`); e.setAttribute("opacity", (hold(t, T_TIRED, T_GONE, 0.4) * (1 - q)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_LET + 0.8, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE LIFTED HER UP.", L3 = "SHE NEVER REACHED BACK.";
          E("head").innerHTML = `<div>LOVE IS A WALL. #26</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #27 TOMORROW";
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
