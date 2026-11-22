        // ---------- "love is a three-legged race. #25": winner split-screen format. Her inner leg and his are tied with a red ribbon. BOTH STEP: arms around each other, same rhythm, they run through the finish tape, arms up, heart. ONE STEPS: he steps forward, she scrolls and pulls the other way, they stumble and fall; she unties the ribbon and walks away, he sits on the track with the ribbon still on his ankle, the finish far away. FOLLOW: the FINISH banner flips to "+ FOLLOW", they high-five under it → "FOLLOWING ✓". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 720, FX1 = 840, HW = 46;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_FIN = 6.3, T_HEART = 7.0, T_TIRED = 4.4, T_LET = 5.6, T_UNTIE = 6.6, T_GO = 7.3, T_GONE = 9.0;
        const T_H2 = 9.4, T_H3 = 10.6;
        const T_CTA = 12.6, T_TAG = 13.3, T_TAP = 14.9;
        const STR = 120;
        const cxT = (t) => lerp(250, 1060, sm(t, 0.4, T_FIN + 0.9));
        const cxB = (t) => lerp(250, 420, sm(t, 0.4, T_LET)) - 14 * Math.sin(t * 5) * win(t, 2.6, 3.2) * (1 - win(t, T_LET - 0.4, T_LET));
        const herB = (t) => lerp(cxB(T_GO) - HW, -180, sm(t, T_GO, T_GONE));
        let TB = 0; for (let u = 0; u < 12; u += 0.01) if (lerp(250, 1060, sm(u, 0.4, T_FIN + 0.9)) > FX1 + 10) { TB = u; break; }
        function gaitFoot(q, bx, lift = 16) { q = frac(q); if (q < 0.5) return [bx + STR * (0.25 - q), G]; const ss = (q - 0.5) / 0.5; return [bx + STR * (-0.25 + 0.5 * ease(ss)), G - Math.sin(Math.PI * ss) * lift]; }

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [400, 900]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "#7a3a2a" }, inner);
          svgEl("rect", { x: 0, y: G + 30, width: PW, height: PY1 - G, fill: "url(#ground)", opacity: 0.7 }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G} M0 ${G + 22} L${PW} ${G + 22}`, stroke: "#e8e0d0", "stroke-width": 4, opacity: 0.8 }, inner);
          // finish: two posts, banner, tape
          const fin = svgEl("g", {}, inner);
          for (const px of [FX1 - 60, FX1 + 60]) svgEl("rect", { x: px - 6, y: G - 330, width: 12, height: 330, fill: "#d8d8d8", stroke: "#000", "stroke-width": 4 }, fin);
          const ban = svgEl("g", { transform: `translate(${FX1} ${G - 350})` }, fin);
          const banR = svgEl("rect", { x: -100, y: -30, width: 200, height: 56, rx: 8, fill: "#f2f2f2", stroke: "#000", "stroke-width": 5 }, ban);
          const banT = svgEl("text", { x: 0, y: 9, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 28, fill: "#111", "text-anchor": "middle" }, ban);
          banT.textContent = "FINISH";
          const tapeL = svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-width": 7, "stroke-linecap": "round" }, fin);
          const tapeR = svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-width": 7, "stroke-linecap": "round" }, fin);
          const glow = svgEl("circle", { r: 300, fill: "url(#redGlow)", opacity: 0 }, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, ban, banR, banT, tapeL, tapeR, glow, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        // ---------- poses ----------
        // top: tied pair, inner (shared) foot + outer feet half a cycle apart
        function pairFeet(cx, x0) { const p = (cx - x0) / STR; return { inner: gaitFoot(p, cx), herO: gaitFoot(p + 0.5, cx - HW - 20), himO: gaitFoot(p + 0.5, cx + HW + 20) }; }
        const fin = (t) => win(t, T_FIN - 0.1, T_FIN + 0.4);
        function topHer(t) {
          const cx = cxT(t), ft = pairFeet(cx, 250), x = cx - HW;
          const st = base({ hx: x, hy: stY + 2 + 3 * Math.abs(Math.sin(Math.PI * (cx - 250) / STR)), torso: 8, head: -2, ax: ft.inner[0], ay: ft.inner[1], bx: ft.herO[0], by: ft.herO[1] });
          reachTo(st, 1, [cx + 26, stY - 70]);
          const sw = Math.sin(Math.PI * 2 * (cx - 250) / STR) * (1 - fin(t));
          reachTo(st, 1 - fin(t), [x - 30 + 30 * sw, stY - 40], "b");
          reachTo(st, fin(t) * (1 - hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.25)), [x - 70, stY - 230], "b");
          reachTo(st, hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.25), [cx, stY - 250], "b");
          st.head = lerp(st.head, -14, fin(t));
          return st;
        }
        function topHim(t) {
          const cx = cxT(t), ft = pairFeet(cx, 250), x = cx + HW;
          const st = base({ hx: x, hy: stY + 2 + 3 * Math.abs(Math.sin(Math.PI * (cx - 250) / STR)), torso: 8, head: -2, ax: ft.himO[0], ay: ft.himO[1], bx: ft.inner[0], by: ft.inner[1] });
          reachTo(st, 1, [cx - 26, stY - 70], "b");
          const sw = Math.sin(Math.PI * 2 * (cx - 250) / STR) * (1 - fin(t));
          reachTo(st, 1 - fin(t), [x + 30 - 30 * sw, stY - 40]);
          reachTo(st, fin(t) * (1 - hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.25)), [x + 70, stY - 230]);
          reachTo(st, hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.25), [cx, stY - 250]);
          st.head = lerp(st.head, -14, fin(t));
          return st;
        }
        // bottom: he steps, she drags, fall, she unties and leaves
        const fallK = (t) => win(t, T_LET, T_LET + 0.35);
        function botHim(t) {
          const cx = Math.min(cxB(t), cxB(T_LET)), ft = pairFeet(cx, 250), x = cx + HW;
          const up = base({ hx: x, hy: stY + 2, torso: 12, head: -4, ax: ft.himO[0], ay: ft.himO[1], bx: ft.inner[0], by: ft.inner[1] });
          reachTo(up, 1, [x + 40 + 14 * Math.sin(t * 6), stY - 50]);
          reachTo(up, 1, [x - 30, stY - 60], "b");
          const down = base({ hx: x + 30, hy: G - 58, torso: 22, head: 6, ax: x + 110, ay: G, bx: cx - 4, by: G, ash: 30, ael: 40, bsh: 20, bel: 30 });
          reachTo(down, 1, [x + 96, G - 60]); reachTo(down, 1, [x + 70, G - 30], "b");
          const st = mixPose(up, down, fallK(t));
          st.head = lerp(st.head, 26, win(t, T_GO + 0.4, T_GO + 1.0));
          if (t > T_TIRED && t < T_LET) st.torso += 6 * Math.sin(t * 12);
          return st;
        }
        function botHer(t) {
          const cx = Math.min(cxB(t), cxB(T_LET)), ft = pairFeet(cx, 250), x = cx - HW;
          let st;
          if (t < T_GO) {
            const pull = win(t, T_TIRED, T_TIRED + 0.4);
            const up = base({ hx: x - 10 * pull, hy: stY + 2, torso: 4 - 14 * pull, head: 26, ax: ft.inner[0], ay: ft.inner[1], bx: ft.herO[0] - 30 * pull, by: ft.herO[1] });
            const down = base({ hx: x - 20, hy: G - 52, torso: -14, head: 20, ax: cx - 4, ay: G, bx: x - 30, by: G });
            st = mixPose(up, down, fallK(t));
            const untie = hold(t, T_UNTIE - 0.2, T_GO, 0.2);
            reachTo(st, 1 - untie, [x + 40, stY - 120], "b"); reachTo(st, 1 - untie, [x + 46, stY - 116]);
            reachTo(st, untie, [cx - 4, G - 30]); st.torso = lerp(st.torso, 30, untie);
          } else {
            const xw = herB(t), q = (cxB(T_GO) - HW - xw) / STR;
            const f1 = gaitFoot(q, xw), f2 = gaitFoot(q + 0.5, xw);
            const stand = win(t, T_GO, T_GO + 0.4);
            st = base({ hx: xw, hy: lerp(G - 52, stY + 2, stand), torso: 6, head: 24, ax: lerp(cxB(T_LET) - 4, f1[0], stand), ay: f1[1], bx: f2[0], by: f2[1] });
            reachTo(st, 1, [xw - 40, stY - 120], "b"); reachTo(st, 1, [xw - 46, stY - 116]);
          }
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const mkRib = (P2, col) => ({ band: svgEl("rect", { x: -16, y: -9, width: 32, height: 18, rx: 6, fill: col, stroke: "#000", "stroke-width": 4 }, P2.fx), tail: svgEl("path", { fill: "none", stroke: col, "stroke-width": 7, "stroke-linecap": "round" }, P2.fx), tailO: svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 11, "stroke-linecap": "round" }, P2.fx) });
        const ribT = mkRib(top, "#ff3b30"), ribB = mkRib(bot, "#a84a44");
        ribT.tail.parentNode.insertBefore(ribT.tailO, ribT.tail); ribB.tail.parentNode.insertBefore(ribB.tailO, ribB.tail);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const dust = Array.from({ length: 8 }, () => svgEl("circle", { r: 10, fill: "#b8a890", opacity: 0 }, bot.fx));
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);
        const conf = Array.from({ length: 16 }, (_, i) => svgEl("rect", { x: -6, y: -3, width: 12, height: 6, fill: ["#ff3b30", "#ffcf3a", "#ffffff", "#ff8a8a"][i % 4], stroke: "#000", "stroke-width": 1.5, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH STEP"; botT.textContent = "ONE STEPS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "SAME RHYTHM"], [3.0, "STEP BY STEP"], [T_FIN, "THEY CROSS THE LINE", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE STEPS"], [1.5, "SHE SCROLLS", "#ff3b30"], [2.8, "THEY STUMBLE"], [T_TIRED, "SHE PULLS AWAY", "#ff3b30"], [T_LET, "THEY FALL", "#ff3b30"], [T_UNTIE, "SHE UNTIES IT", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [800, G - 300], CS = [540, 1000], ZK = 1.2;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        function drawTape(P2, broken, q, t) {
          const y = G - 170, a = [FX1 - 60, y], b = [FX1 + 60, y];
          if (!broken) { P2.tapeL.setAttribute("d", `M${a[0]} ${a[1]} Q${FX1} ${y + 6 + 2 * Math.sin(t * 3)} ${b[0]} ${b[1]}`); P2.tapeR.setAttribute("d", ""); return; }
          P2.tapeL.setAttribute("d", `M${a[0]} ${a[1]} Q${r1(a[0] - 10 * q)} ${r1(y + 60 * q)} ${r1(a[0] - 20 * q + 8 * Math.sin(t * 9))} ${r1(y + 120 * q)}`);
          P2.tapeR.setAttribute("d", `M${b[0]} ${b[1]} Q${r1(b[0] + 10 * q)} ${r1(y + 60 * q)} ${r1(b[0] + 20 * q + 8 * Math.sin(t * 9 + 1))} ${r1(y + 120 * q)}`);
        }
        function drawRib(R, foot, t, loose) {
          R.band.setAttribute("transform", `translate(${r1(foot[0])} ${r1(foot[1] - 30)})`);
          const d = loose ? `M${r1(foot[0] - 10)} ${r1(foot[1] - 26)} Q${r1(foot[0] - 40)} ${G - 4} ${r1(foot[0] - 90)} ${G - 2}` : `M${r1(foot[0] + 12)} ${r1(foot[1] - 30)} q${r1(16 + 4 * Math.sin(t * 8))} 6 ${r1(20 + 6 * Math.sin(t * 7))} 18`;
          R.tail.setAttribute("d", d); R.tailO.setAttribute("d", d);
        }

        function render(t) {
          // ---- top
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const ftT = pairFeet(cxT(t), 250).inner;
          drawRib(ribT, ftT, t, false);
          const broken = cxT(t) > FX1 + 10, bq = sm(t, TB, TB + 0.7);
          drawTape(top, broken, bq, t);
          drawTape(bot, false, 0, t);
          top.glow.setAttribute("cx", cxT(t)); top.glow.setAttribute("cy", G - 260); top.glow.setAttribute("opacity", (0.5 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          redSpot.setAttribute("points", `${FX1 - 60},${PY0} ${FX1 + 60},${PY0} ${FX1 + 260},${G} ${FX1 - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(${r1(cxT(t))} ${r1(G - 470 - 10 * hq)}) scale(${(backOut(hq) * 1.5).toFixed(3)})`);
          // FOLLOW: banner flips
          const popped = t > T_TAP;
          const fl = clamp((t - T_TAG) / 0.4, 0, 1), flip = Math.abs(Math.cos(Math.PI * fl));
          const fl2 = clamp((t - T_TAP + 0.05) / 0.4, 0, 1), flip2 = Math.abs(Math.cos(Math.PI * fl2));
          top.ban.setAttribute("transform", `translate(${FX1} ${G - 350}) scale(${(t > T_TAP - 0.05 ? flip2 : flip).toFixed(3)} 1)`);
          const stage = t < T_TAG + 0.2 ? 0 : t < T_TAP + 0.15 ? 1 : 2;
          top.banT.textContent = ["FINISH", "+ FOLLOW", "FOLLOWING ✓"][stage];
          top.banR.setAttribute("fill", ["#f2f2f2", "#ff3b30", "#ffffff"][stage]);
          top.banT.setAttribute("fill", ["#111", "#fff", "#111"][stage]);
          top.banT.setAttribute("font-size", stage === 2 ? 22 : 28);
          conf.forEach((h, i) => { const q = clamp((t - T_TAP - 0.05 * (i % 5)) / 1.6, 0, 1), x = FX1 - 260 + ((i * 137) % 520); h.setAttribute("opacity", popped && q > 0 && q < 1 ? 1 : 0); h.setAttribute("transform", `translate(${r1(x + 20 * Math.sin(q * 8 + i))} ${r1(G - 420 + q * 400)}) rotate(${r1(300 * q + 40 * i)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const hf = t > T_GO ? -1 : 1;
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), hf);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25 * hf)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const cxb = Math.min(cxB(t), cxB(T_LET));
          const ftB = t < T_LET ? pairFeet(cxb, 250).inner : [cxb - 4, G];
          drawRib(ribB, ftB, t, t > T_GO - 0.2);
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`); phone.setAttribute("opacity", t > T_UNTIE - 0.1 && t < T_GO ? 0 : 1);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (t > T_UNTIE - 0.1 && t < T_GO ? 0 : 0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          dust.forEach((d, i) => { const q = clamp((t - T_LET - 0.3) / 0.9, 0, 1), a = Math.PI + (i / 7) * Math.PI; d.setAttribute("cx", r1(cxb + Math.cos(a) * 110 * q)); d.setAttribute("cy", r1(G - 10 + Math.sin(a) * 40 * q)); d.setAttribute("r", r1(8 + 14 * q)); d.setAttribute("opacity", t > T_LET + 0.3 && q < 1 ? (0.6 * (1 - q)).toFixed(3) : 0); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_GO + 0.5, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE KEPT STEPPING FORWARD.", L3 = "SHE KEPT PULLING AWAY.";
          E("head").innerHTML = `<div>LOVE IS A THREE-LEGGED RACE. #25</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #26 TOMORROW";
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
