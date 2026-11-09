        // ---------- "love is a candle": winner split-screen format (reel 36). Wind gusts come from both sides. BOTH SHIELD: she cups the flame when the wind comes from her side, he when it comes from his; the flame grows and turns into a heart. ONE SHIELDS: he shields his side, she scrolls her phone; the wind from her side blows the candle out ----------
        // own winner format (reel 36), backlog idea, see viral/2026-11-09-check.md
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const SHE = 450, HE = 810, POT = 630, TOPY = FL - 130, FLY = FL - 232;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1000]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.28 }, beams);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          const glow = svgEl("circle", { cx: POT, cy: FLY, r: 260, fill: "url(#fireGlow)", opacity: 0 }, inner);
          // little table + candle
          svgEl("rect", { x: POT - 70, y: TOPY, width: 140, height: 14, rx: 4, fill: "#8a5a3a", stroke: "#000", "stroke-width": 5 }, inner);
          svgEl("rect", { x: POT - 8, y: TOPY + 14, width: 16, height: FL - TOPY - 14, fill: "#6b4a30", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("rect", { x: POT - 18, y: TOPY - 80, width: 36, height: 80, rx: 5, fill: "#f2ead8", stroke: "#000", "stroke-width": 5 }, inner);
          svgEl("line", { x1: POT, y1: TOPY - 80, x2: POT, y2: TOPY - 92, stroke: "#222", "stroke-width": 4 }, inner);
          const flameG = svgEl("g", {}, inner);
          const flame = svgEl("path", { fill: "#ffb020", stroke: "#000", "stroke-width": 4 }, flameG);
          const core = svgEl("path", { fill: "#fff3b0" }, flameG);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          const winds = Array.from({ length: 9 }, () => svgEl("path", { fill: "none", stroke: "#cfe3ff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fx));
          const smoke = Array.from({ length: 5 }, () => svgEl("circle", { r: 12, fill: "#8a8a8a", opacity: 0 }, fx));
          return { beams, glow, figs, fx, dark, flameG, flame, core, winds, smoke };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const GU = [[0.6, -1], [2.2, 1], [3.8, -1], [5.2, 1]];   // [start, -1 = wind from the left (her side) / 1 = from the right (his side)]
        const GD = 1.2, T_OUT = 4.35, T_HEART = 6.6, T_HOLD = 7.0;
        const T_T1 = 8.8, T_T2 = 9.5, T_CARD = 11.0;
        const gust = (t, side) => { let k = 0; for (const [a, s] of GU) if (s === side) k = Math.max(k, hold(t, a, a + GD, 0.3)); return k; };
        const shieldK = (t, side) => { let k = 0; for (const [a, s] of GU) if (s === side) k = Math.max(k, hold(t, a - 0.35, a + GD, 0.3)); return k; };
        const sizeTop = (t) => 1 + GU.reduce((g, [a]) => g + 0.2 * win(t, a + 0.6, a + GD + 0.2), 0);
        const sizeBot = (t) => (t < T_OUT ? 1 - 0.45 * win(t, GU[0][0] + 0.3, GU[0][0] + 1.0) : 0);

        function shielder(x, f, side, t) {
          const st = standOn(x, f, FL); st.head = 8;
          const k = shieldK(t, side);
          st.hx += f * 80 * k; st.ax += f * 70 * k; st.bx += f * 70 * k; st.torso += 14 * k; st.head += 12 * k;
          reachTo(st, k, [POT - f * 34, FLY - 26]); reachTo(st, k, [POT - f * 30, FLY + 26], "b");
          return st;
        }
        const topHer = (t) => { const st = shielder(SHE, 1, -1, t); const h = win(t, T_HOLD, T_HOLD + 0.4); st.hx += 70 * h; st.ax += 60 * h; st.bx += 60 * h; reachTo(st, h, [SHE + 150, stand - 140], "b"); return st; };
        const topHim = (t) => { const st = shielder(HE, -1, 1, t); const h = win(t, T_HOLD, T_HOLD + 0.4); st.hx -= 70 * h; st.ax -= 60 * h; st.bx -= 60 * h; reachTo(st, h, [HE - 150, stand - 140], "b"); return st; };
        function botHer(t) { const st = standOn(SHE, 1, FL); st.head = 24; st.torso = 4; reachTo(st, 1, [SHE + 42, stand - 116]); reachTo(st, 1, [SHE + 34, stand - 110], "b"); return st; }
        function botHim(t) {
          const st = shielder(HE, -1, 1, t);
          const look = hold(t, GU[2][0], T_OUT + 0.6, 0.2); st.head -= 12 * look;
          const slump = win(t, T_OUT + 0.4, T_OUT + 1.0); st.head += 26 * slump; st.torso += 10 * slump;
          return st;
        }

        const mkFigs = (P2, white) => {
          const bun = svgEl("circle", { r: 15, fill: white ? "#fff" : "#8e8e8e", stroke: "#000", "stroke-width": 6 }, P2.figs);
          const her = makeFig(P2.figs, white ? "#ffffff" : "#8e8e8e", white ? "#e2e2e2" : "#767676", white, "her" + (white ? "T" : "B"));
          P2.figs.insertBefore(bun, her.g.previousSibling);
          const him = makeFig(P2.figs, white ? "#ffffff" : "#9a9a9a", white ? "#dedede" : "#7e7e7e", white, "him" + (white ? "T" : "B"));
          return { bun, her, him };
        };
        const TF = mkFigs(top, true), BF = mkFigs(bot, false);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.6 }, bot.fx);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { points: `${POT - 56},${PY0} ${POT + 56},${PY0} ${POT + 200},${FL} ${POT - 200},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH SHIELD"; botT.textContent = "ONE SHIELDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "WIND! SHE SHIELDS"], [2.05, "WIND! HE SHIELDS"], [3.65, "SHE SHIELDS AGAIN"], [5.05, "HE SHIELDS AGAIN"], [T_HEART, "IT BURNS BRIGHTER"]];
        const BOTSEQ = [[0.45, "WIND! SHE SCROLLS"], [2.05, "HE SHIELDS"], [3.65, "SHE SCROLLS"], [T_OUT, "IT GOES OUT", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A CANDLE."], [T_T1, "ONE PAIR OF HANDS"], [T_T2, "CAN'T STOP EVERY WIND."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:100px;right:100px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:54px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:42px;line-height:1.35;margin-top:26px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"A CANDLE LOSES NOTHING<br/>BY LIGHTING ANOTHER CANDLE."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">JAMES KELLER</div></div>`;
        const cardCss = document.createElement("style");
        cardCss.textContent = "#card span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(cardCss);
        E("stage").appendChild(card);
        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function drawFlame(P2, size, bend, t, heartK) {
          const fl = 1 + 0.08 * Math.sin(t * 23) + 0.05 * Math.sin(t * 37);
          const h = 46 * size * fl, w = 16 * size, bx = bend * 26 * size;
          P2.flame.setAttribute("d", `M${POT} ${FLY + 12} C${r1(POT - w * 1.4)} ${r1(FLY)} ${r1(POT - w + bx * 0.5)} ${r1(FLY - h * 0.5)} ${r1(POT + bx)} ${r1(FLY - h)} C${r1(POT + w + bx * 0.5)} ${r1(FLY - h * 0.5)} ${r1(POT + w * 1.4)} ${r1(FLY)} ${POT} ${FLY + 12} Z`);
          P2.core.setAttribute("d", `M${POT} ${FLY + 8} C${r1(POT - w * 0.6)} ${r1(FLY)} ${r1(POT - w * 0.3 + bx * 0.3)} ${r1(FLY - h * 0.3)} ${r1(POT + bx * 0.6)} ${r1(FLY - h * 0.55)} C${r1(POT + w * 0.3 + bx * 0.3)} ${r1(FLY - h * 0.3)} ${r1(POT + w * 0.6)} ${r1(FLY)} ${POT} ${FLY + 8} Z`);
          P2.flameG.setAttribute("opacity", size > 0.02 ? (1 - heartK).toFixed(3) : 0);
        }
        function drawWind(P2, t, side, k) {
          P2.winds.forEach((w, i) => {
            const q = frac(t * 1.6 + i / P2.winds.length), y = PY0 + 120 + (i * 61) % (FL - PY0 - 160);
            const x0 = side < 0 ? lerp(-100, PW + 100, q) : lerp(PW + 100, -100, q), d = side < 0 ? 1 : -1;
            w.setAttribute("d", `M${r1(x0)} ${y} q${r1(d * 60)} -18 ${r1(d * 120)} 0 t${r1(d * 110)} 6`);
            w.setAttribute("opacity", (0.6 * k * Math.sin(Math.PI * q)).toFixed(3));
          });
        }
        function render(t) {
          let side = 0, gk = 0; for (const [a, s] of GU) { const k = hold(t, a, a + GD, 0.3); if (k > gk) { gk = k; side = s; } }
          // ---- top: BOTH SHIELD
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hk = win(t, T_HEART, T_HEART + 0.4);
          drawFlame(top, sizeTop(t), -side * gk * 0.25, t, hk);
          drawWind(top, t, side, gk);
          const done = win(t, T_HOLD - 0.4, T_HOLD + 0.3);
          top.glow.setAttribute("opacity", (0.35 + 0.15 * (sizeTop(t) - 1) + 0.5 * done).toFixed(3));
          redSpot.setAttribute("opacity", (0.5 * done).toFixed(3));
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HEART + 0.4 ? 1 : 0);
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${POT} ${r1(FLY - 30)}) scale(${(backOut(hk) * 1.5 * beat).toFixed(3)})`);
          // ---- bottom: ONE SHIELDS
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const pp = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 10];
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])})`); phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1]));
          const unshielded = side < 0 ? gk : 0;
          drawFlame(bot, sizeBot(t), -side * gk * (side < 0 ? 1.0 : 0.25), t, 0);
          drawWind(bot, t, side, t < T_OUT + 0.8 ? gk : 0);
          bot.glow.setAttribute("opacity", (0.35 * sizeBot(t)).toFixed(3));
          bot.smoke.forEach((c, i) => { const q = frac((t - T_OUT) * 0.5 + i / 5); c.setAttribute("cx", r1(POT + 10 * Math.sin(q * 6 + i) + 30 * q)); c.setAttribute("cy", r1(TOPY - 92 - 160 * q)); c.setAttribute("r", r1(8 + 16 * q)); c.setAttribute("opacity", t > T_OUT ? (0.5 * (1 - q) * win(t, T_OUT, T_OUT + 0.3)).toFixed(3) : 0); });
          bot.dark.setAttribute("opacity", (0.4 * win(t, T_OUT, T_OUT + 0.8)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["SHIELD", "IT"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["TOGETHER."], [T_CARD + 0.8], t, [0]);
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
