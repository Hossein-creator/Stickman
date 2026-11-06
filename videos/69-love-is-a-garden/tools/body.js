        // ---------- "love is a garden": winner split-screen format (reel 36). BOTH WATER: they take turns with their watering cans, the flower grows step by step and blooms into a red heart. ONE WATERS: he waters, she scrolls her phone; the flower only half grows, droops and drops its petals ----------
        // own winner format (reel 36), backlog idea, see viral/2026-11-06-check.md
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const SHE = 450, HE = 810, POT = 630;
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
          const glow = svgEl("circle", { cx: POT, cy: FL - 260, r: 260, fill: "url(#redGlow)", opacity: 0 }, inner);
          const plant = svgEl("g", {}, inner);
          svgEl("path", { d: `M${POT - 50} ${FL - 80} L${POT + 50} ${FL - 80} L${POT + 38} ${FL} L${POT - 38} ${FL} Z`, fill: "#b5653a", stroke: "#000", "stroke-width": 5 }, inner);
          svgEl("rect", { x: POT - 58, y: FL - 94, width: 116, height: 18, rx: 4, fill: "#c4744a", stroke: "#000", "stroke-width": 5 }, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          // flower parts
          const stem = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 12, "stroke-linecap": "round" }, plant);
          const stemIn = svgEl("path", { fill: "none", stroke: "#3fa04a", "stroke-width": 6, "stroke-linecap": "round" }, plant);
          const leaves = [0, 1].map(() => svgEl("path", { d: "M0 0 Q20 -18 44 -6 Q22 10 0 0 Z", fill: "#3fa04a", stroke: "#000", "stroke-width": 4 }, plant));
          const bloom = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, plant);
          const bud = svgEl("circle", { r: 12, fill: "#3fa04a", stroke: "#000", "stroke-width": 4 }, plant);
          return { beams, glow, figs, fx, dark, stem, stemIn, leaves, bloom, bud };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const WT = [[0.5, 0], [2.0, 1], [3.5, 0], [5.0, 1]];        // [start, 0 = she / 1 = he]; each pour lasts WD
        const WD = 1.0, T_BLOOM = 6.1, T_HOLD = 6.5, T_WILT = 6.1, T_FALL = 6.6;
        const T_T1 = 8.6, T_T2 = 9.3, T_CARD = 11.0;
        const pourK = (t, who, bothWater) => { let k = 0; for (const [a, w] of WT) if (w === who || (bothWater === false && false)) k = Math.max(k, hold(t, a, a + WD, 0.25)); return k; };
        // growth level: each pour adds a step (top: all four, bottom: only his two, and a smaller step)
        const growTop = (t) => WT.reduce((g, [a]) => g + 0.25 * win(t, a + 0.4, a + WD + 0.2), 0);
        const growBot = (t) => WT.filter(([, w]) => w === 1).reduce((g, [a]) => g + 0.22 * win(t, a + 0.4, a + WD + 0.2), 0);

        function waterer(x, f, who, t) {
          const st = standOn(x, f, FL); st.head = 6;
          const k = pourK(t, who);
          reachTo(st, k, [POT - f * 70, FL - 230]); st.torso += 12 * k; st.head += 10 * k;
          reachTo(st, 1 - k, [x + f * 34, stand - 40]);
          return st;
        }
        const topHer = (t) => { const st = waterer(SHE, 1, 0, t); const h = win(t, T_HOLD, T_HOLD + 0.4); st.hx += 70 * h; st.ax += 60 * h; st.bx += 60 * h; reachTo(st, h, [SHE + 140, stand - 140], "b"); return st; };
        const topHim = (t) => { const st = waterer(HE, -1, 1, t); const h = win(t, T_HOLD, T_HOLD + 0.4); st.hx -= 70 * h; st.ax -= 60 * h; st.bx -= 60 * h; reachTo(st, h, [HE - 140, stand - 140], "b"); return st; };
        function botHer(t) {
          const st = standOn(SHE, 1, FL); st.head = 24; st.torso = 4;
          reachTo(st, 1, [SHE + 42, stand - 116]); reachTo(st, 1, [SHE + 34, stand - 110], "b");
          return st;
        }
        function botHim(t) {
          const st = waterer(HE, -1, 1, t);
          const look = hold(t, WT[2][0], WT[2][0] + 1.0, 0.2); st.head -= 10 * look;      // looks over at her
          const slump = win(t, T_WILT + 0.3, T_WILT + 0.8); st.head += 26 * slump; st.torso += 10 * slump;
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
        const mkCan = (parent, col) => {
          const g = svgEl("g", {}, parent);
          svgEl("path", { d: "M14 -10 L60 -34", stroke: "#000", "stroke-width": 10, "stroke-linecap": "round" }, g);
          svgEl("path", { d: "M14 -10 L60 -34", stroke: col, "stroke-width": 5, "stroke-linecap": "round" }, g);
          svgEl("rect", { x: -26, y: -24, width: 46, height: 40, rx: 6, fill: col, stroke: "#000", "stroke-width": 4 }, g);
          svgEl("path", { d: "M-20 -24 Q-2 -48 16 -24", fill: "none", stroke: "#000", "stroke-width": 5 }, g);
          return g;
        };
        const cans = { tS: mkCan(top.fx, "#5aa0c8"), tH: mkCan(top.fx, "#7ac06a"), bH: mkCan(bot.fx, "#9a9a9a") };
        const drops = [top, bot].map((P2) => Array.from({ length: 6 }, () => svgEl("circle", { r: 5, fill: "#7cc8ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, P2.fx)));
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.6 }, bot.fx);
        const petals = Array.from({ length: 5 }, () => svgEl("ellipse", { rx: 10, ry: 6, fill: "#7a7040", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { points: `${POT - 56},${PY0} ${POT + 56},${PY0} ${POT + 200},${FL} ${POT - 200},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH WATER"; botT.textContent = "ONE WATERS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "SHE WATERS"], [2.0, "HE WATERS"], [3.5, "TURN BY TURN"], [T_BLOOM, "IT BLOOMS"]];
        const BOTSEQ = [[0.45, "SHE SCROLLS"], [2.0, "HE WATERS"], [3.5, "SHE SCROLLS"], [5.0, "HE WATERS ALONE"], [T_WILT, "IT WILTS", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A GARDEN."], [T_T1, "IT DIES"], [T_T2, "IF ONLY ONE WATERS IT."]];
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
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE LOVE WE GIVE AWAY<br/>IS THE ONLY LOVE WE KEEP."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ELBERT HUBBARD</div></div>`;
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

        // flower: height g (0..1), droop d (0..1), bloom b (0..1)
        function drawFlower(P2, g, droop, b, wither) {
          const h = 30 + 230 * g, bx = POT, by = FL - 92;
          const tipx = bx - droop * 110, tipy = by - h + droop * h * 0.55;
          const cx = bx - droop * 10, cy = by - h * 0.6;
          const d = `M${bx} ${by} Q${r1(cx)} ${r1(cy)} ${r1(tipx)} ${r1(tipy)}`;
          P2.stem.setAttribute("d", d); P2.stemIn.setAttribute("d", d);
          P2.stemIn.setAttribute("stroke", wither > 0 ? `rgb(${Math.round(lerp(63, 120, wither))},${Math.round(lerp(160, 110, wither))},${Math.round(lerp(74, 60, wither))})` : "#3fa04a");
          P2.leaves.forEach((l, i) => { const q = 0.35 + i * 0.25, lx = lerp(bx, tipx, q * 0.6), ly = lerp(by, tipy, q); const sc = Math.min(1, g * 2.5); l.setAttribute("transform", `translate(${r1(lx)} ${r1(ly)}) scale(${i ? -sc : sc} ${sc}) rotate(${r1(20 - 50 * droop)})`); l.setAttribute("fill", wither > 0 ? "#7a7040" : "#3fa04a"); });
          P2.bud.setAttribute("cx", r1(tipx)); P2.bud.setAttribute("cy", r1(tipy)); P2.bud.setAttribute("opacity", g > 0.05 && b < 0.5 ? 1 : 0); P2.bud.setAttribute("fill", wither > 0 ? "#7a7040" : "#3fa04a");
          P2.bloom.setAttribute("opacity", b > 0 ? 1 : 0);
          P2.bloom.setAttribute("transform", `translate(${r1(tipx)} ${r1(tipy - 6)}) rotate(${r1(-droop * 120)}) scale(${(1.3 * backOut(b)).toFixed(3)})`);
          P2.bloom.setAttribute("fill", wither > 0 ? `rgb(${Math.round(lerp(255, 120, wither))},${Math.round(lerp(59, 60, wither))},${Math.round(lerp(48, 40, wither))})` : "#ff3b30");
          return [tipx, tipy];
        }
        function canAt(can, hand, f, k) {
          can.setAttribute("transform", `translate(${r1(hand[0])} ${r1(hand[1] + 10)}) scale(${f} 1) rotate(${r1(28 * k)})`);
          return [hand[0] + f * 62, hand[1] - 10 + 28 * k];
        }
        function pour(arr, tip, k, t) {
          arr.forEach((d, i) => { const q = frac(t * 2.2 + i / arr.length); d.setAttribute("cx", r1(lerp(tip[0], POT, q) + 4 * Math.sin(i * 3))); d.setAttribute("cy", r1(lerp(tip[1], FL - 96, q))); d.setAttribute("opacity", k > 0.6 ? 1 : 0); });
        }
        function render(t) {
          // ---- top: BOTH WATER
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const kS = pourK(t, 0), kH = pourK(t, 1);
          const tipS = canAt(cans.tS, hp.hands[0], 1, kS), tipH = canAt(cans.tH, mp.hands[0], -1, kH);
          pour(drops[0], kS > kH ? tipS : tipH, Math.max(kS, kH), t);
          const bl = win(t, T_BLOOM, T_BLOOM + 0.4);
          drawFlower(top, growTop(t), 0, bl, 0);
          const done = win(t, T_HOLD - 0.3, T_HOLD + 0.3);
          top.glow.setAttribute("opacity", (0.9 * done * (0.9 + 0.1 * Math.sin(t * 6))).toFixed(3));
          redSpot.setAttribute("opacity", (0.5 * done).toFixed(3));
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${POT} ${r1(Math.min(hp.head[1], mp.head[1]) - 70)}) scale(${(backOut(hq) * 0.9 * beat).toFixed(3)})`);
          // ---- bottom: ONE WATERS
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const kB = pourK(t, 1);
          const tipB = canAt(cans.bH, bp.hands[0], -1, kB);
          pour(drops[1], tipB, kB, t);
          const pp = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 10];
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])})`); phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1]));
          const wl = win(t, T_WILT, T_WILT + 0.8);
          const tip = drawFlower(bot, growBot(t), wl, 0, wl);
          petals.forEach((p, i) => { const q = clamp((t - T_FALL - i * 0.2) / 0.9, 0, 1); p.setAttribute("cx", r1(tip[0] + 10 * Math.sin(q * 6 + i) + i * 6)); p.setAttribute("cy", r1(lerp(tip[1], FL - 4, q))); p.setAttribute("opacity", q > 0 ? 1 : 0); });
          bot.dark.setAttribute("opacity", (0.35 * win(t, T_WILT + 0.3, T_WILT + 1.0)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["WATER", "IT"], [T_CARD, T_CARD + 0.2], t, []);
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
