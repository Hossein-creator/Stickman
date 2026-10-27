        // ---------- "bridge for two": two panels. BOTH BUILD: she and he build a bridge plank by plank from both cliffs, meet in the middle, hold on. ONE BUILDS: she scrolls on her phone, he builds alone, gets too far, reaches out, nobody there, he breaks down ----------
        // one-to-one remake of a reference the user sent (roles swapped: she scrolls, he builds)
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- panel geometry: world 0..1233 x 98..815, floor (cliff top) at 600 ----------
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const EDGE0 = 197, EDGE1 = 1036, WP = 70;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          svgEl("rect", { x: EDGE0 - 10, y: FL, width: EDGE1 - EDGE0 + 20, height: PY1 - FL, fill: "url(#abyss)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1080]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.32 }, beams);
          svgEl("path", { d: `M0 ${FL} L${EDGE0} ${FL} L${EDGE0 - 8} ${FL + 50} L${EDGE0 + 6} ${FL + 120} L${EDGE0 - 12} ${PY1} L0 ${PY1} Z`, fill: "url(#cliff)", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("path", { d: `M${PW} ${FL} L${EDGE1} ${FL} L${EDGE1 + 8} ${FL + 60} L${EDGE1 - 4} ${FL + 130} L${EDGE1 + 10} ${PY1} L${PW} ${PY1} Z`, fill: "url(#cliff)", stroke: "#000", "stroke-width": 4 }, inner);
          const back = svgEl("g", {}, inner);
          const deck = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { back, deck, figs, fx, beams };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        // ---------- bridge pieces: planks + rope with posts, per builder ----------
        function makeSide(panel, edge, dir, n) {
          const planks = Array.from({ length: n }, (_, i) => svgEl("rect", { x: dir > 0 ? edge + i * WP + 2 : edge - (i + 1) * WP + 2, y: FL, width: WP - 4, height: 13, fill: "#7a5a3a", stroke: "#000", "stroke-width": 3, opacity: 0 }, panel.deck));
          const post0 = svgEl("rect", { x: edge - 4, y: FL - 74, width: 8, height: 76, fill: "#8a6a4a", stroke: "#000", "stroke-width": 3 }, panel.deck);
          const post1 = svgEl("rect", { y: FL - 74, width: 8, height: 76, fill: "#8a6a4a", stroke: "#000", "stroke-width": 3, opacity: 0 }, panel.deck);
          const rope = svgEl("path", { fill: "none", stroke: "#a08060", "stroke-width": 4 }, panel.deck);
          return { planks, post0, post1, rope, edge, dir };
        }
        function drawSide(side, placed, pq) {
          side.planks.forEach((p, i) => {
            const k = i < placed - 1 ? 1 : i === placed - 1 ? pq : 0;
            p.setAttribute("opacity", k > 0 ? 1 : 0);
            p.setAttribute("transform", `translate(0 ${r1(-24 * (1 - k))})`);
          });
          const end = side.edge + side.dir * placed * WP;
          side.post1.setAttribute("x", r1(end - 4 - side.dir * 4)); side.post1.setAttribute("opacity", placed > 0 ? 1 : 0);
          const ya = FL - 70;
          side.rope.setAttribute("d", placed > 0 ? `M${side.edge} ${ya} Q${r1((side.edge + end) / 2)} ${ya + 10 + 4 * placed} ${r1(end - side.dir * 4)} ${ya}` : "M0 0");
        }

        // ---------- a builder: stand at the deck end, kneel, lay a plank, stand, step onto it ----------
        const kneelAt = (x, f, reach) => base({ hx: x, hy: FL - 58, torso: 38, head: 24, ax: x + f * 36, ay: FL, bx: x - f * 62, by: FL, aw: 1, atx: x + f * (78 + 14 * reach), aty: FL - 8, bw: 1, btx: x + f * (60 + 14 * reach), bty: FL - 4 });
        function feetOn(x0, hx, ST, lift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, ST, lift, torso, head) => {
          const ft = feetOn(x0, x, ST, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / ST);
          return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 });
        };
        function builder(t, edge, f, t0, P, n) {
          const S = (i) => edge + f * (i * WP - 26);
          if (t < t0) return { pose: standOn(S(0), f, FL), placed: 0, pq: 0, x: S(0) };
          const i = Math.floor((t - t0) / P), p = frac((t - t0) / P);
          if (i >= n) return { pose: standOn(S(n), f, FL), placed: n, pq: 1, x: S(n) };
          const sx = S(i), st = standOn(sx, f, FL), kn = kneelAt(sx, f, Math.sin(Math.PI * clamp((p - 0.15) / 0.3, 0, 1)));
          const placed = i + (p > 0.3 ? 1 : 0), pq = p > 0.3 ? win(p, 0.3, 0.42) : 1;
          let pose;
          if (p < 0.15) pose = mixPose(st, kn, ease(p / 0.15));
          else if (p < 0.45) pose = kn;
          else if (p < 0.6) pose = mixPose(kn, st, ease((p - 0.45) / 0.15));
          else pose = walking(sx, lerp(sx, S(i + 1), ease((p - 0.6) / 0.4)), 120, 12, 4, 6);
          return { pose, placed, pq, x: pose.hx };
        }

        // ---------- people ----------
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        // top: she builds from the left, he from the right
        const tSideL = makeSide(top, EDGE0, 1, 6), tSideR = makeSide(top, EDGE1, -1, 6);
        const redSpot = svgEl("polygon", { points: `560,${PY0} 672,${PY0} 760,${FL} 472,${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const tBun = svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs);
        const tHer = makeFig(top.figs, "#ffffff", "#e2e2e2", true, "tHer");
        top.figs.insertBefore(tBun, tHer.g);
        const tHim = makeFig(top.figs, "#ffffff", "#dedede", true, "tHim");
        const heartGlow = svgEl("circle", { r: 70, fill: "url(#redGlow)", opacity: 0 }, top.fx);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        // bottom: she stands on the left cliff on her phone, he builds alone from the right
        const bSideR = makeSide(bot, EDGE1, -1, 7);
        const bBun = svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs);
        const bHer = makeFig(bot.figs, "#8e8e8e", "#767676", false, "bHer");
        bot.figs.insertBefore(bBun, bHer.g);
        const bHim = makeFig(bot.figs, "#9a9a9a", "#7e7e7e", false, "bHim");
        const phoneGlow = svgEl("circle", { r: 78, fill: "url(#phoneGlow)" }, bot.fx);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);

        // ---------- beats ----------
        const TL0 = 0.35, TR0 = 0.6, TP = 1.0;            // top builders
        const T_STEP = 6.35, T_MEET = 7.0, T_HOLD = 7.95;
        const TB0 = 0.55, TBP = 1.243, TBN = 7;            // bottom builder
        const T_FAR = 9.3, T_ALONE = 10.4, T_DROP = 11.0;
        const MIDL = 590, MIDR = 642, HUGL = 600, HUGR = 632;
        const PHX = 150;

        function topHerRaw(t) {
          const b = builder(t, EDGE0, 1, TL0, TP, 6);
          if (t < T_STEP) return b.pose;
          const x0 = b.x;
          if (t < T_MEET) { const st = t < T_STEP + 0.6 ? walking(x0, lerp(x0, MIDL, ease((t - T_STEP) / 0.6)), 120, 12, 4, 6) : standOn(MIDL, 1, FL); st.head = -6; return st; }
          const hug = standOn(HUGL, 1, FL); hug.torso = 8; hug.head = -4;
          hug.aw = 1; hug.atx = HUGR + 10; hug.aty = stand - 150; hug.bw = 1; hug.btx = HUGR - 6; hug.bty = stand - 120;
          hug.hy += 2 * Math.sin(t * 2);
          return mixPose(standOn(MIDL, 1, FL), hug, win(t, T_MEET, T_MEET + 0.5));
        }
        function topHimRaw(t) {
          const b = builder(t, EDGE1, -1, TR0, TP, 6);
          if (t < T_STEP) return b.pose;
          const x0 = b.x;
          if (t < T_MEET) { const st = t < T_STEP + 0.6 ? walking(x0, lerp(x0, MIDR, ease((t - T_STEP) / 0.6)), 120, 12, 4, 6) : standOn(MIDR, -1, FL); st.head = 4; return st; }
          const hug = standOn(HUGR, -1, FL); hug.torso = 4; hug.head = 6;
          hug.aw = 1; hug.atx = HUGL - 10; hug.aty = stand - 130; hug.bw = 1; hug.btx = HUGL + 4; hug.bty = stand - 100;
          return mixPose(standOn(MIDR, -1, FL), hug, win(t, T_MEET, T_MEET + 0.5));
        }
        function botHerRaw(t) {
          const st = standOn(PHX, 1, FL);
          st.head = 30 + 2 * Math.sin(t * 1.3); st.torso = 6;
          st.aw = 1; st.atx = PHX + 40; st.aty = stand - 72; st.bw = 1; st.btx = PHX + 32; st.bty = stand - 66;
          st.atx += 3 * Math.sin(t * 7) * (frac(t * 0.6) < 0.3 ? 1 : 0);   // thumb scrolling
          return st;
        }
        function botHimRaw(t) {
          const b = builder(t, EDGE1, -1, TB0, TBP, TBN);
          const endX = EDGE1 - TBN * WP + 26;
          if (t < T_FAR) return b.pose;
          // too far: steps to the end and reaches out over the gap
          const reach = standOn(endX + 6, -1, FL);
          const r1k = win(t, T_FAR, T_FAR + 0.35), r2k = win(t, T_ALONE, T_ALONE + 0.25);
          reach.aw = 1; reach.atx = endX - 120 - 20 * r2k; reach.aty = stand - 150 + 8 * Math.sin(t * 3); reach.torso = 6 + 10 * r2k; reach.head = -6;
          const st = mixPose(standOn(endX, -1, FL), reach, r1k);
          if (t < T_DROP) return st;
          // nobody there. he breaks down, hands on his knees
          const slump = base({ hx: endX + 6, hy: stand + 22, torso: 72, head: 34, ax: endX - 14, ay: FL, bx: endX + 26, by: FL, aw: 1, atx: endX - 40, aty: FL - 82, bw: 1, btx: endX - 34, bty: FL - 76 });
          slump.torso += 2 * Math.sin(t * 2.2); slump.hy += 1.5 * Math.sin(t * 2.2);
          return mixPose(st, slump, win(t, T_DROP, T_DROP + 0.6));
        }

        // ---------- labels (typed) ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BUILD"; botT.textContent = "ONE BUILDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "PLANK BY PLANK"], [T_MEET, "THEY MEET"], [T_HOLD, "HOLD ON"]];
        const BOTSEQ = [[0.45, "HE BUILDS"], [2.45, "SHE SCROLLS"], [T_FAR, "TOO FAR", "#ff3b30"], [T_ALONE, "ALONE", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A BRIDGE."], [10.8, "ONE PERSON CAN'T BUILD"], [11.55, "A BRIDGE FOR TWO."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- per-frame render ----------
        function render(t) {
          // top panel
          const bl = builder(t, EDGE0, 1, TL0, TP, 6), br = builder(t, EDGE1, -1, TR0, TP, 6);
          drawSide(tSideL, bl.placed, bl.pq); drawSide(tSideR, br.placed, br.pq);
          const hp = drawFig(tHer, livePose(topHerRaw, t, 0.4), 1);
          const mp = drawFig(tHim, livePose(topHimRaw, t, 1.3), -1);
          tBun.setAttribute("cx", r1(hp.head[0] - 25)); tBun.setAttribute("cy", r1(hp.head[1] - 16));
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          const hc = [(hp.head[0] + mp.head[0]) / 2, Math.min(hp.head[1], mp.head[1]) - 90];
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hq) * 0.9 * beat).toFixed(3)})`);
          heartGlow.setAttribute("cx", r1(hc[0])); heartGlow.setAttribute("cy", r1(hc[1] - 4));
          heartGlow.setAttribute("opacity", (0.9 * hq).toFixed(3));
          redSpot.setAttribute("opacity", (0.55 * win(t, T_HOLD, T_HOLD + 0.5)).toFixed(3));

          // bottom panel
          const bb = builder(t, EDGE1, -1, TB0, TBP, TBN);
          drawSide(bSideR, bb.placed, bb.pq);
          const sp = drawFig(bHer, livePose(botHerRaw, t, 0.9), 1);
          drawFig(bHim, livePose(botHimRaw, t, 2.0), -1);
          bBun.setAttribute("cx", r1(sp.head[0] - 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2];
          phone.setAttribute("transform", `translate(${r1(ph[0] + 6)} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0] + 6)); phoneGlow.setAttribute("cy", r1(ph[1] - 10));
          phoneGlow.setAttribute("opacity", (t < 0.45 ? 0 : 0.85 + 0.15 * Math.sin(t * 5)).toFixed(3));
          phone.setAttribute("opacity", t < 0.45 ? 0 : 1);

          // labels and headline
          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");
          fade.style.opacity = win(t, 13.65, 13.98).toFixed(3);
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
