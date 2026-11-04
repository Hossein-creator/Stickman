        // ---------- "love is a puzzle": winner split-screen format (reel 36). BOTH BRING PIECES: they fill a heart puzzle together, the last piece together, it lights up. ONE BRINGS PIECES: he brings all of his, she sulks with her arms crossed and hides her piece behind her back; the hole in the middle stays ----------
        // remake of "the childish behavior that ruins adult relationships" (The School of Life, viral/2026-11-04-check.md)
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const PS = 66, QX0 = 620 - 1.5 * PS, QY0 = FL - 330;
        const HEARTD = "M99 170 C20 110 10 40 60 30 C80 26 95 40 99 55 C103 40 118 26 138 30 C188 40 178 110 99 170 Z";
        const pcClip = svgEl("clipPath", { id: "pc", clipPathUnits: "userSpaceOnUse" }, SVG.querySelector("defs"));
        svgEl("rect", { x: 0, y: 0, width: PS, height: PS }, pcClip);
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
          const glow = svgEl("circle", { cx: 620, cy: QY0 + 1.5 * PS, r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          // easel + empty board
          svgEl("path", { d: `M${620 - 70} ${FL} L${620 - 20} ${QY0 + 3 * PS} M${620 + 70} ${FL} L${620 + 20} ${QY0 + 3 * PS} M620 ${FL} L620 ${QY0 + 3 * PS}`, stroke: "#6b4f36", "stroke-width": 10 }, inner);
          svgEl("rect", { x: QX0 - 10, y: QY0 - 10, width: 3 * PS + 20, height: 3 * PS + 20, rx: 6, fill: "#2a2420", stroke: "#000", "stroke-width": 5 }, inner);
          svgEl("path", { d: HEARTD, fill: "none", stroke: "#4a3a34", "stroke-width": 3, "stroke-dasharray": "6 6", transform: `translate(${QX0} ${QY0})` }, inner);
          const pieces = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const fly = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { beams, glow, pieces, figs, fly, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        function makePiece(parent, i) {
          const c = i % 3, r = Math.floor(i / 3);
          const g = svgEl("g", { opacity: 0 }, parent);
          const inner = svgEl("g", { "clip-path": "url(#pc)" }, g);
          svgEl("rect", { x: 0, y: 0, width: PS, height: PS, fill: "#f4e8dc" }, inner);
          svgEl("path", { d: HEARTD, fill: "#ff3b30", transform: `translate(${-c * PS} ${-r * PS})` }, inner);
          svgEl("rect", { x: 0, y: 0, width: PS, height: PS, fill: "none", stroke: "#000", "stroke-width": 4 }, g);
          return { g, slot: [QX0 + c * PS, QY0 + r * PS] };
        }
        const tP = Array.from({ length: 9 }, (_, i) => makePiece(top.pieces, i)), bP = Array.from({ length: 9 }, (_, i) => makePiece(bot.pieces, i));

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const SHE = 340, HE = 900, T_LAST = 5.6, T_HOLD = 6.4;
        const ORDER = [0, 2, 3, 5, 6, 8, 1, 7];                      // the outer pieces; the centre (4) comes last
        const TT = ORDER.map((_, k) => 0.5 + k * 0.6);                // top: alternating she / he
        const TB = ORDER.map((_, k) => 0.5 + k * 0.6);                // bottom: all him
        const T_ASK = 5.4, T_HIDE = 5.8, T_NEVER = 6.6;
        const T_T1 = 9.2, T_T2 = 9.9, T_CARD = 11.6;
        const PLACE = 0.45;
        const slotC = (i) => [QX0 + (i % 3) * PS + PS / 2, QY0 + Math.floor(i / 3) * PS + PS / 2];

        function placer(t, times, who, x, f) {
          const st = standOn(x, f, FL);
          for (let k = 0; k < times.length; k++) {
            if (who(k) && t > times[k] - 0.2 && t < times[k] + PLACE + 0.15) {
              const q = clamp((t - times[k] + 0.2) / (PLACE + 0.35), 0, 1), arc = Math.sin(Math.PI * q);
              const sc = slotC(ORDER[k]);
              reachTo(st, arc, [lerp(x + f * 40, sc[0] - f * 20, arc), lerp(stand - 80, sc[1], arc)]);
              st.torso += 16 * arc; st.hx += f * 110 * arc; st.ax += f * 110 * arc; st.bx += f * 90 * arc;
            }
          }
          return st;
        }
        const topHer = (t) => { const st = placer(t, TT, (k) => k % 2 === 0, SHE, 1); const last = hold(t, T_LAST - 0.3, T_HOLD + 0.2, 0.25); reachTo(st, last, [slotC(4)[0] - 30, slotC(4)[1]]); st.torso += 14 * last; st.hx += 120 * last; st.ax += 120 * last; st.bx += 110 * last; return st; };
        const topHim = (t) => { const st = placer(t, TT, (k) => k % 2 === 1, HE, -1); const last = hold(t, T_LAST - 0.3, T_HOLD + 0.2, 0.25); reachTo(st, last, [slotC(4)[0] + 30, slotC(4)[1]]); st.torso += 14 * last; st.hx -= 120 * last; st.ax -= 120 * last; st.bx -= 110 * last; return st; };
        // bottom: he walks over and places every piece; she sulks
        function botHim(t) {
          const st = placer(t, TB, () => true, HE, -1);
          const ask = hold(t, T_ASK, T_NEVER + 0.4, 0.2); st.hx -= 140 * ask; st.ax -= 140 * ask; st.bx -= 140 * ask; reachTo(st, ask, [SHE + 90, stand - 100]); st.head -= 6 * ask;
          const slump = win(t, T_NEVER, T_NEVER + 0.5); st.torso += 20 * slump; st.head += 24 * slump;
          return st;
        }
        function botHer(t) {
          const st = standOn(SHE, -1, FL); st.head = 10; st.torso = -4;
          reachTo(st, 1, [SHE - 30, stand - 114]); reachTo(st, 1, [SHE - 18, stand - 108], "b");   // arms crossed (facing away)
          const hide = win(t, T_HIDE, T_HIDE + 0.3); reachTo(st, hide, [SHE - 60, stand - 60], "b"); st.head = lerp(st.head, 20, hide);
          return st;
        }

        const tBun = svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs);
        const tHer = makeFig(top.figs, "#ffffff", "#e2e2e2", true, "tHer");
        top.figs.insertBefore(tBun, tHer.g.previousSibling);
        const tHim = makeFig(top.figs, "#ffffff", "#dedede", true, "tHim");
        const redSpot = svgEl("polygon", { points: `${620 - 56},${PY0} ${620 + 56},${PY0} ${620 + 200},${FL} ${620 - 200},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const bBun = svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs);
        const bHer = makeFig(bot.figs, "#8e8e8e", "#767676", false, "bHer");
        bot.figs.insertBefore(bBun, bHer.g.previousSibling);
        const bHim = makeFig(bot.figs, "#9a9a9a", "#7e7e7e", false, "bHim");
        const hidden = makePiece(bot.fx, 4);
        const sulk = svgEl("g", { opacity: 0 }, bot.fx);
        for (const [x, y, r] of [[-30, 0, 24], [0, -12, 30], [32, 0, 24], [0, 8, 24]]) svgEl("circle", { cx: x, cy: y, r, fill: "#4a4e58", stroke: "#000", "stroke-width": 4 }, sulk);
        const holeRing = svgEl("rect", { x: QX0 + PS + 4, y: QY0 + PS + 4, width: PS - 8, height: PS - 8, fill: "none", stroke: "#ff3b30", "stroke-width": 5, opacity: 0 }, bot.fx);

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BRING PIECES"; botT.textContent = "ONE BRINGS PIECES";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "PIECE BY PIECE"], [T_LAST - 0.3, "THE LAST ONE TOGETHER"], [T_HOLD, "COMPLETE"]];
        const BOTSEQ = [[0.45, "HE BRINGS HIS"], [2.0, "SHE SULKS"], [T_HIDE, "SHE HIDES HERS", "#ff3b30"], [T_NEVER, "NEVER COMPLETE", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A PUZZLE."], [T_T1, "IT'S NEVER COMPLETE"], [T_T2, "IF ONE HIDES THEIR PIECE."]];
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
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"SPEAK YOUR MIND,<br/>EVEN IF YOUR VOICE SHAKES."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">MAGGIE KUHN</div></div>`;
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

        // a piece: in the placer's hand while placing, then in its slot
        function showPiece(p, t, t0, hand) {
          if (t < t0 - 0.2) { p.g.setAttribute("opacity", 0); return; }
          p.g.setAttribute("opacity", 1);
          const q = clamp((t - t0 + 0.2) / (PLACE + 0.2), 0, 1);
          const pos = q < 1 ? [hand[0] - PS / 2, hand[1] - PS / 2] : p.slot;
          const snap = q >= 1 ? 1 + 0.15 * Math.exp(-(t - t0 - PLACE) * 12) : 1;
          p.g.setAttribute("transform", `translate(${r1(pos[0] + PS / 2)} ${r1(pos[1] + PS / 2)}) scale(${snap.toFixed(3)}) translate(${-PS / 2} ${-PS / 2})`);
        }
        function render(t) {
          const hp = drawFig(tHer, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(tHim, livePose(topHim, t, 1.3), -1);
          tBun.setAttribute("cx", r1(hp.head[0] - 25)); tBun.setAttribute("cy", r1(hp.head[1] - 16));
          ORDER.forEach((i, k) => showPiece(tP[i], t, TT[k], k % 2 === 0 ? hp.hands[0] : mp.hands[0]));
          showPiece(tP[4], t, T_LAST, [(hp.hands[0][0] + mp.hands[0][0]) / 2, (hp.hands[0][1] + mp.hands[0][1]) / 2]);
          const done = win(t, T_HOLD - 0.3, T_HOLD + 0.3);
          top.glow.setAttribute("opacity", (0.9 * done * (0.9 + 0.1 * Math.sin(t * 6))).toFixed(3));
          redSpot.setAttribute("opacity", (0.5 * done).toFixed(3));
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(620 ${r1(QY0 - 60)}) scale(${(backOut(hq) * 1.0 * beat).toFixed(3)})`);

          const bp = drawFig(bHim, livePose(botHim, t, 2.0), -1);
          const sp = drawFig(bHer, livePose(botHer, t, 0.9), -1);
          bBun.setAttribute("cx", r1(sp.head[0] + 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          ORDER.forEach((i, k) => showPiece(bP[i], t, TB[k], bp.hands[0]));
          hidden.g.setAttribute("opacity", 1);
          hidden.g.setAttribute("transform", `translate(${r1(sp.hands[1][0] - PS / 2)} ${r1(sp.hands[1][1] - PS / 2)}) scale(0.7)`);
          const sk = win(t, 1.8, 2.3);
          sulk.setAttribute("opacity", sk.toFixed(3)); sulk.setAttribute("transform", `translate(${r1(sp.head[0] + 4 * Math.sin(t * 2))} ${r1(sp.head[1] - 70)}) scale(0.7)`);
          holeRing.setAttribute("opacity", (win(t, T_NEVER, T_NEVER + 0.3) * (0.6 + 0.4 * Math.sin(t * 8))).toFixed(3));
          bot.dark.setAttribute("opacity", (0.35 * win(t, T_NEVER, T_NEVER + 0.8)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["SAY", "WHAT", "YOU", "FEEL."], [T_CARD, T_CARD + 0.13, T_CARD + 0.26, T_CARD + 0.4], t, []);
          E("cm2").innerHTML = slam(["DON'T", "HIDE", "YOUR", "PIECE."], [T_CARD + 0.8, T_CARD + 0.92, T_CARD + 1.04, T_CARD + 1.16], t, [3]);
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
