        // ---------- "love is a padlock. #28": winner split-screen format. A bridge over a river at night, a railing. BOTH LOCK: they hang one red padlock on the railing, click, hold the key together and throw it into the river; it stays locked, glows, heart. ONE LOCKS: he hangs the lock and throws his key away; she keeps her key in her pocket and scrolls; later she unlocks it, the lock falls into the river, she walks away. FOLLOW: a second padlock "+ FOLLOW" appears on the rail, he clicks it shut → "FOLLOWING ✓". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 650, HER = 510, HIM = 720, LX = 615, LY = G - 128;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_HANG = 1.2, T_KEY = 1.8, T_THROW = 2.8, T_SPL = 3.8, T_LIFT = 6.2, T_HEART = 6.8;
        const T_BHANG = 1.2, T_BTHROW = 2.0, T_BSPL = 3.0, T_KEEP = 3.2, T_TIRED = 4.6, T_LET = 6.0, T_OPEN = 6.4, T_DROP = 6.6, T_DSPL = 7.2, T_WALK = 7.4, T_GONE = 9.2;
        const T_H2 = 9.4, T_H3 = 10.6;
        const T_CTA = 12.6, T_TAG = 13.2, T_TAP = 14.9;
        const SPX = 880;

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          svgEl("circle", { cx: 1060, cy: 220, r: 46, fill: "#e8e4d8", stroke: "#000", "stroke-width": 4, opacity: 0.85 }, inner);
          for (let i = 0; i < 14; i++) svgEl("rect", { x: 40 + i * 90, y: G - 40 - ((i * 53) % 120), width: 60, height: 40 + ((i * 53) % 120), fill: "#151820" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [HER, HIM]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.18 }, beams);
          const sc = svgEl("g", { transform: `translate(615 ${G}) scale(1.3) translate(-615 ${-G})` }, inner);
          // railing
          svgEl("path", { d: `M-200 ${LY} L${PW + 200} ${LY}`, stroke: "#000", "stroke-width": 12 }, sc);
          svgEl("path", { d: `M-200 ${LY} L${PW + 200} ${LY}`, stroke: "#6a6e78", "stroke-width": 6 }, sc);
          for (let x = -190; x < PW + 200; x += 70) svgEl("path", { d: `M${x} ${LY} L${x} ${G}`, stroke: "#4a4e58", "stroke-width": 5 }, sc);
          // deck + water
          svgEl("rect", { x: -200, y: G + 34, width: PW + 400, height: PY1 - G, fill: "#0e2236" }, sc);
          const waves = svgEl("path", { fill: "none", stroke: "#3a6a9a", "stroke-width": 3, opacity: 0.6 }, sc);
          svgEl("rect", { x: -200, y: G, width: PW + 400, height: 26, fill: "#5a5e68", stroke: "#000", "stroke-width": 5 }, sc);
          const glow = svgEl("circle", { r: 220, fill: "url(#redGlow)", opacity: 0 }, sc);
          const figs = svgEl("g", {}, sc);
          const fx = svgEl("g", {}, sc);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, waves, glow, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const mkLock = (P2, col) => {
          const g = svgEl("g", {}, P2.fx);
          const sh = svgEl("path", { d: "M-13 0 L-13 -18 Q-13 -34 0 -34 Q13 -34 13 -18 L13 0", fill: "none", stroke: "#000", "stroke-width": 10 }, g);
          const sh2 = svgEl("path", { d: "M-13 0 L-13 -18 Q-13 -34 0 -34 Q13 -34 13 -18 L13 0", fill: "none", stroke: "#c8c8d0", "stroke-width": 5 }, g);
          svgEl("path", { d: "M0 34 C-40 14 -34 -14 -18 -6 C-10 -14 -2 -10 0 -4 C2 -10 10 -14 18 -6 C34 -14 40 14 0 34 Z", fill: col, stroke: "#000", "stroke-width": 4 }, g);
          svgEl("rect", { x: -3, y: 6, width: 6, height: 10, rx: 2, fill: "#111" }, g);
          return { g, sh, sh2 };
        };
        const mkKey = (P2, col = "#ffcf3a") => { const g = svgEl("g", { opacity: 0 }, P2.fx); svgEl("circle", { cx: -14, r: 8, fill: "none", stroke: "#000", "stroke-width": 7 }, g); svgEl("circle", { cx: -14, r: 8, fill: "none", stroke: col, "stroke-width": 3.5 }, g); svgEl("path", { d: "M-6 0 L18 0 M12 0 L12 7 M17 0 L17 6", stroke: "#000", "stroke-width": 7, "stroke-linecap": "round" }, g); svgEl("path", { d: "M-6 0 L18 0 M12 0 L12 7 M17 0 L17 6", stroke: col, "stroke-width": 3.5, "stroke-linecap": "round" }, g); return g; };
        const lockT = mkLock(top, "#ff3b30"), lockB = mkLock(bot, "#9a5a5a"), lockF = mkLock(top, "#ff3b30");
        const keyT = mkKey(top), keyB1 = mkKey(bot), keyB2 = mkKey(bot);
        const ringsT = Array.from({ length: 3 }, () => svgEl("ellipse", { fill: "none", stroke: "#8ab8e8", "stroke-width": 3, opacity: 0 }, top.fx));
        const ringsB = Array.from({ length: 3 }, () => svgEl("ellipse", { fill: "none", stroke: "#8ab8e8", "stroke-width": 3, opacity: 0 }, bot.fx));
        const ringsB2 = Array.from({ length: 3 }, () => svgEl("ellipse", { fill: "none", stroke: "#8ab8e8", "stroke-width": 3, opacity: 0 }, bot.fx));
        const tagF = svgEl("g", { opacity: 0 }, top.fx);
        const tagR = svgEl("rect", { x: -66, y: 0, width: 132, height: 34, rx: 12, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, tagF);
        const tagT = svgEl("text", { x: 0, y: 24, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#fff", "text-anchor": "middle" }, tagF);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- poses ----------
        function topHer(t) {
          const st = standOn(HER, 1, G);
          reachTo(st, hold(t, 0.5, T_HANG + 0.3, 0.2), [LX - 16, LY + 10]);
          const kk = hold(t, T_KEY, T_THROW + 0.2, 0.25); reachTo(st, kk, [LX - 8, LY - 90 - 30 * win(t, T_THROW - 0.3, T_THROW)]);
          reachTo(st, win(t, T_THROW + 0.4, T_THROW + 0.8), [LX - 30, stY - 50], "a");
          st.head = lerp(st.head, -8, kk) + lerp(0, 10, win(t, T_THROW + 0.2, T_THROW + 0.6) * (1 - win(t, T_LIFT, T_LIFT + 0.4)));
          st.torso = lerp(st.torso, 10, win(t, T_LIFT, T_LIFT + 0.5));
          return st;
        }
        function topHim(t) {
          const st = standOn(HIM, -1, G);
          reachTo(st, hold(t, 0.3, T_HANG + 0.3, 0.2), [LX + 16, LY + 6]);
          const kk = hold(t, T_KEY, T_THROW + 0.2, 0.25); reachTo(st, kk, [LX + 8, LY - 90 - 30 * win(t, T_THROW - 0.3, T_THROW)]);
          reachTo(st, win(t, T_THROW + 0.4, T_THROW + 0.8), [LX + 30, stY - 50], "a");
          st.head = lerp(st.head, -8, kk) + lerp(0, 10, win(t, T_THROW + 0.2, T_THROW + 0.6) * (1 - win(t, T_LIFT, T_LIFT + 0.4)));
          st.torso = lerp(st.torso, 10, win(t, T_LIFT, T_LIFT + 0.5));
          const tap = hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.3); reachTo(st, tap, [LX + 56, LY - 12 + 10 * win(t, T_TAP - 0.1, T_TAP)], "b");
          return st;
        }
        const herBX = (t) => lerp(HER, -200, sm(t, T_WALK, T_GONE));
        function botHim(t) {
          const st = standOn(HIM, -1, G);
          reachTo(st, hold(t, 0.3, T_BHANG + 0.3, 0.2), [LX + 16, LY + 6]);
          const th = hold(t, T_BHANG + 0.3, T_BTHROW + 0.3, 0.2); reachTo(st, th, [LX + 30, LY - 120]);
          st.head = lerp(st.head, -10, hold(t, T_BTHROW, T_KEEP + 0.4, 0.2));
          const wt = win(t, T_TIRED, T_TIRED + 0.4); st.head = lerp(st.head, 6, wt);
          st.head = lerp(st.head, 26, win(t, T_DSPL, T_DSPL + 0.5)); st.torso = lerp(st.torso, 12, win(t, T_DSPL, T_DSPL + 0.5));
          reachTo(st, win(t, T_DSPL + 0.4, T_DSPL + 0.9), [LX + 30, LY + 4]);
          return st;
        }
        function botHer(t) {
          const x = herBX(t), walk = t > T_WALK;
          const st = standOn(x, walk ? -1 : 1, G); st.head = 26; st.torso = 6;
          if (walk) { const ph = (t - T_WALK) * 7.5; st.ax = x + 22 * Math.sin(ph); st.bx = x - 22 * Math.sin(ph); st.ay = G - 10 * Math.max(0, Math.cos(ph)); st.by = G - 10 * Math.max(0, -Math.cos(ph)); }
          const ph2 = walk ? -1 : 1;
          reachTo(st, 1, [x + 40 * ph2, stY - 120], "b");
          const keep = hold(t, T_KEEP - 0.3, T_KEEP + 0.5, 0.2); reachTo(st, keep, [x + 10, stY - 20]);
          const un = hold(t, T_LET - 0.2, T_DROP + 0.2, 0.2); reachTo(st, un, [LX - 10, LY + 14]);
          reachTo(st, 1 - Math.max(keep, un), [x + 46 * ph2, stY - 116]);
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
        topT.textContent = "BOTH LOCK"; botT.textContent = "ONE LOCKS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "ONE LOCK, FOUR HANDS"], [T_KEY + 0.4, "THEY THROW THE KEY AWAY"], [T_LIFT, "IT STAYS LOCKED", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE LOCKS IT"], [T_BTHROW, "HE THROWS HIS KEY"], [T_KEEP, "SHE KEEPS HERS", "#ff3b30"], [T_LET, "SHE UNLOCKS IT", "#ff3b30"], [T_WALK, "AND WALKS AWAY", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [640, G - 150], CS = [540, 1000], ZK = 1.3;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const setLock = (L, x, y, open, rot = 0, sc = 1.4) => { L.g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${sc})`); const o = `translate(0 ${r1(-14 * open)})`; L.sh.setAttribute("transform", o); L.sh2.setAttribute("transform", o); };
        const arc = (a, b, q, h) => [lerp(a[0], b[0], q), lerp(a[1], b[1], q) - h * Math.sin(Math.PI * q)];
        const drawRings = (arr, t0, t, x) => arr.forEach((r, i) => { const q = clamp((t - t0 - i * 0.15) / 1.0, 0, 1); r.setAttribute("cx", x); r.setAttribute("cy", G + 70); r.setAttribute("rx", r1(10 + 70 * q)); r.setAttribute("ry", r1(3 + 12 * q)); r.setAttribute("opacity", t > t0 + i * 0.15 && q < 1 ? (1 - q).toFixed(3) : 0); });
        const wavesD = (t) => { let d = ""; for (let r = 0; r < 3; r++) for (let x = -40; x < PW; x += 80) { const xx = x + ((t * 20 + r * 30) % 80); d += `M${r1(xx)} ${G + 60 + r * 30} q20 -6 40 0`; } return d; };

        function render(t) {
          // ---- top
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          top.waves.setAttribute("d", wavesD(t));
          const inHand = t < T_HANG;
          setLock(lockT, inHand ? mp.hands[0][0] - 4 : LX, inHand ? mp.hands[0][1] + 18 : LY + 20, 1 - sm(t, T_HANG, T_HANG + 0.15));
          lockT.g.setAttribute("opacity", t > 0.3 ? 1 : 0);
          // key: in both hands, thrown in an arc into the river
          const kq = clamp((t - T_THROW) / (T_SPL - T_THROW), 0, 1);
          keyT.setAttribute("opacity", t > T_KEY && t < T_SPL ? 1 : 0);
          const kp = t < T_THROW ? [(hp.hands[0][0] + mp.hands[0][0]) / 2, (hp.hands[0][1] + mp.hands[0][1]) / 2] : arc([LX, LY - 120], [SPX, G + 66], kq, 240);
          keyT.setAttribute("transform", `translate(${r1(kp[0])} ${r1(kp[1])}) rotate(${r1(720 * kq)}) scale(1.4)`);
          drawRings(ringsT, T_SPL, t, SPX);
          top.glow.setAttribute("cx", LX); top.glow.setAttribute("cy", LY + 20); top.glow.setAttribute("opacity", (0.6 * win(t, T_LIFT, T_LIFT + 0.5)).toFixed(3));
          redSpot.setAttribute("points", `${LX - 60},${PY0} ${LX + 60},${PY0} ${LX + 260},${G} ${LX - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(${LX} ${r1(G - 400 - 10 * hq)}) scale(${(backOut(hq) * 1.5).toFixed(3)})`);
          // FOLLOW lock
          const popped = t > T_TAP, ak = sm(t, T_TAG, T_TAG + 0.4);
          lockF.g.setAttribute("opacity", ak.toFixed(3));
          setLock(lockF, LX + 52, LY + 20, 1 - sm(t, T_TAP, T_TAP + 0.12), 6 * Math.sin(t * 3) * (popped ? 0 : 1), 1.4 * (popped ? 1 + 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 0.6 + 0.4 * backOut(ak)));
          tagF.setAttribute("opacity", ak.toFixed(3)); tagF.setAttribute("transform", `translate(${LX + 52} ${LY + 74}) scale(0.9)`);
          tagR.setAttribute("fill", popped ? "#ffffff" : "#ff3b30"); tagT.setAttribute("fill", popped ? "#000" : "#fff"); tagT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; tagT.setAttribute("font-size", popped ? 14 : 18);
          sparks.forEach((h, i) => { const q = clamp((t - T_TAP) / 1.0, 0, 1), a = (i / 10) * Math.PI * 2; h.setAttribute("opacity", popped && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(LX + 52 + Math.cos(a) * 130 * Math.sqrt(q))} ${r1(LY + 20 + Math.sin(a) * 100 * Math.sqrt(q))}) scale(${(0.6 - 0.3 * q).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const bf = t > T_WALK ? -1 : 1;
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), bf);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25 * bf)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          bot.waves.setAttribute("d", wavesD(t + 2));
          const dq = clamp((t - T_DROP) / (T_DSPL - T_DROP), 0, 1);
          const inH = t < T_BHANG;
          setLock(lockB, inH ? bp.hands[0][0] - 4 : LX, inH ? bp.hands[0][1] + 18 : t < T_DROP ? LY + 20 : lerp(LY + 20, G + 66, dq * dq), (1 - sm(t, T_BHANG, T_BHANG + 0.15)) * (t < T_OPEN ? 1 : 0) + sm(t, T_OPEN, T_OPEN + 0.15), t > T_DROP ? 200 * dq : 0);
          lockB.g.setAttribute("opacity", t > 0.3 && t < T_DSPL ? 1 : 0);
          drawRings(ringsB2, T_DSPL, t, LX);
          const bq = clamp((t - T_BTHROW) / (T_BSPL - T_BTHROW), 0, 1);
          keyB1.setAttribute("opacity", t > T_BHANG && t < T_BSPL ? 1 : 0);
          const k1 = t < T_BTHROW ? bp.hands[0] : arc([LX + 30, LY - 120], [SPX, G + 66], bq, 200);
          keyB1.setAttribute("transform", `translate(${r1(k1[0])} ${r1(k1[1])}) rotate(${r1(720 * bq)}) scale(1.4)`);
          drawRings(ringsB, T_BSPL, t, SPX);
          // her key: from the lock to her pocket, back to the lock to open
          const kOn = t > T_BHANG + 0.4 && t < T_KEEP + 0.4 || t > T_LET - 0.1 && t < T_OPEN + 0.2;
          keyB2.setAttribute("opacity", kOn ? 1 : 0);
          keyB2.setAttribute("transform", `translate(${r1(sp.hands[0][0])} ${r1(sp.hands[0][1])}) scale(1.4)`);
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_WALK, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE THREW AWAY HIS KEY.", L3 = "SHE KEPT HERS.";
          E("head").innerHTML = `<div>LOVE IS A PADLOCK. #28</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #29 TOMORROW";
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
