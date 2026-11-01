        // ---------- "love is a dance": winner split-screen format (reel 36). BOTH DANCE: sway hand in hand, she spins, he dips her (red heart). ONE DANCES: she dances and reaches for him, he stands there on his phone, checks his watch, steps back; she ends alone ----------
        // remake of "when he stays only out of habit" (Mécanique Mentale, viral/2026-11-01-check.md)
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          svgEl("polygon", { points: `${620 - 60},${PY0} ${620 + 60},${PY0} ${620 + 230},${FL} ${620 - 230},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.35 }, beams);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          svgEl("ellipse", { cx: 620, cy: FL + 30, rx: 260, ry: 34, fill: "#ffffff", opacity: 0.06 }, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { beams, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        // a swaying dance step: weight shifts side to side, one foot taps
        function sway(x, f, t, ph, amp = 18) {
          const w = Math.sin((t * Math.PI * 2) / 1.2 + ph);
          const s = standOn(x + amp * w, f, FL);
          s.ax = x + f * 18 + 6 * w; s.bx = x - f * 16 + 6 * w; s.ay = FL - Math.max(0, 14 * Math.sin((t * Math.PI * 2) / 1.2 + ph + 1.4)); s.torso = 3 + 4 * w; s.head = -3 * w;
          s.hy += 4 * Math.abs(w);
          return s;
        }

        // ---------- beats ----------
        const T_SPIN = 2.9, T_SPIN1 = 3.9, T_DIP = 6.0, T_HOLD = 7.2;
        const T_NOTP = 2.2, T_REACH = 4.2, T_WATCH = 4.6, T_HARDER = 5.0, T_BACK = 6.2, T_ALONE = 7.0;
        const T_T1 = 9.4, T_T2 = 10.0, T_CARD = 11.6;
        const HX = 560, SX2 = 680, MID = 620;

        // top: hand in hand
        function topHim(t) {
          const s = sway(HX, 1, t, 0, 14);
          reachTo(s, 1, [MID - 6, stand - 110]); reachTo(s, 1, [MID - 2, stand - 96], "b");
          const spin = hold(t, T_SPIN, T_SPIN1, 0.15);
          reachTo(s, spin, [MID, stand - 230]);
          const dip = hold(t, T_DIP, 99, 0.35);
          s.torso = lerp(s.torso, 26, dip); s.head = lerp(s.head, 14, dip); s.hy += 20 * dip; s.ax += 30 * dip;
          reachTo(s, dip, [MID + 50, stand - 70]); reachTo(s, dip, [MID + 40, stand - 120], "b");
          return s;
        }
        function topHer(t) {
          const spin = hold(t, T_SPIN, T_SPIN1, 0.15);
          const s = sway(SX2 + 10 * spin, -1, t, Math.PI, 14);
          reachTo(s, 1, [MID + 6, stand - 110]); reachTo(s, 1, [MID + 2, stand - 96], "b");
          reachTo(s, spin, [MID + 4, stand - 230]); s.head -= 10 * spin; s.ay -= 20 * spin;
          const dip = hold(t, T_DIP, 99, 0.35);
          s.torso = lerp(s.torso, -46, dip); s.head = lerp(s.head, -20, dip); s.hy += 24 * dip; s.hx += 14 * dip; s.bx += 50 * dip; s.by = lerp(s.by, FL - 50, dip);
          reachTo(s, dip, [MID - 30, stand - 190]); reachTo(s, dip, [MID + 120, stand - 220], "b");
          return s;
        }
        const topHerF = (t) => (t > T_SPIN + 0.15 && t < T_SPIN1 - 0.15 ? (Math.floor((t - T_SPIN) / 0.14) % 2 ? 1 : -1) : -1);
        // bottom: she dances alone, he stands there
        function botHer(t) {
          const harder = win(t, T_HARDER, T_HARDER + 0.3) * (1 - win(t, T_BACK + 0.2, T_ALONE));
          const s = sway(SX2, -1, t, Math.PI, 14 + 10 * harder);
          const reach = hold(t, 0.4, T_ALONE, 0.3);
          reachTo(s, reach * (1 - harder), [MID - 4, stand - 110 + 6 * Math.sin(t * 3)]);
          const spin = hold(t, T_SPIN, T_SPIN1, 0.15); reachTo(s, spin, [SX2 - 10, stand - 240]);
          const grab = hold(t, T_REACH, T_WATCH + 0.3, 0.15); reachTo(s, grab, [HX + 40, stand - 70], "b"); s.torso += 14 * grab;
          if (harder > 0) { s.ash = lerp(s.ash, 150 + 20 * Math.sin(t * 6), harder); s.bsh = lerp(s.bsh, 140 + 20 * Math.cos(t * 6), harder); s.aw *= 1 - harder; s.bw *= 1 - harder; }
          // alone: stops, arms down, head down
          const alone = win(t, T_ALONE - 0.3, T_ALONE + 0.4);
          const st = standOn(SX2, -1, FL); st.head = 30; st.torso = 10;
          return mixPose(s, st, alone);
        }
        const botHerF = (t) => (t > T_SPIN + 0.15 && t < T_SPIN1 - 0.15 ? (Math.floor((t - T_SPIN) / 0.14) % 2 ? 1 : -1) : -1);
        function botHim(t) {
          const x = t < T_BACK ? HX : lerp(HX, HX - 140, ease((t - T_BACK) / 0.7));
          const s = standOn(x, -1, FL);
          s.head = 28 + 2 * Math.sin(t * 1.3); s.torso = 6;
          reachTo(s, 1, [x - 40, stand - 78]); reachTo(s, 1, [x - 32, stand - 72], "b");
          s.atx += 3 * Math.sin(t * 7) * (frac(t * 0.6) < 0.3 ? 1 : 0);
          // checks his watch when she reaches for him
          const watch = hold(t, T_WATCH, T_HARDER + 0.4, 0.15);
          s.bty -= 30 * watch; s.btx += 10 * watch; s.head += 8 * watch;
          return s;
        }

        const tHim = makeFig(top.figs, "#ffffff", "#dedede", true, "tHim");
        const tBun = svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs);
        const tHer = makeFig(top.figs, "#ffffff", "#e2e2e2", true, "tHer");
        top.figs.insertBefore(tBun, tHer.g.previousSibling);
        const redSpot = svgEl("polygon", { points: `${MID - 56},${PY0} ${MID + 56},${PY0} ${MID + 200},${FL} ${MID - 200},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const heartGlow = svgEl("circle", { r: 70, fill: "url(#redGlow)", opacity: 0 }, top.fx);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const notes = Array.from({ length: 5 }, (_, i) => { const tx = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#ffd060", "text-anchor": "middle", opacity: 0 }, top.fx); tx.textContent = i % 2 ? "♫" : "♪"; return tx; });
        const bHim = makeFig(bot.figs, "#8e8e8e", "#767676", false, "bHim");
        const bBun = svgEl("circle", { r: 15, fill: "#9a9a9a", stroke: "#000", "stroke-width": 6 }, bot.figs);
        const bHer = makeFig(bot.figs, "#9a9a9a", "#7e7e7e", false, "bHer");
        bot.figs.insertBefore(bBun, bHer.g);
        const phoneGlow = svgEl("circle", { r: 78, fill: "url(#phoneGlow)" }, bot.fx);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH DANCE"; botT.textContent = "ONE DANCES";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "IN STEP"], [T_DIP, "HE CATCHES HER"], [T_HOLD, "TOGETHER"]];
        const BOTSEQ = [[0.45, "HE'S THERE"], [T_NOTP, "NOT PRESENT", "#ff3b30"], [T_HARDER, "SHE TRIES HARDER"], [T_ALONE, "ALONE", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A DANCE."], [T_T1, "STANDING THERE"], [T_T2, "ISN'T DANCING."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- end card ----------
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:100px;right:100px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:58px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:40px;line-height:1.35;margin-top:26px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"LIFE ISN'T ABOUT WAITING<br/>FOR THE STORM TO PASS, IT'S ABOUT<br/>LEARNING TO DANCE IN THE RAIN."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">VIVIAN GREENE</div></div>`;
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

        // ---------- per-frame render ----------
        function render(t) {
          const mp = drawFig(tHim, livePose(topHim, t, 1.3), 1);
          const hf = topHerF(t);
          const hp = drawFig(tHer, livePose(topHer, t, 0.4), hf);
          tBun.setAttribute("cx", r1(hp.head[0] - hf * 25)); tBun.setAttribute("cy", r1(hp.head[1] - 16));
          notes.forEach((n, i) => { const q = frac(t * 0.5 + i / 5); n.setAttribute("x", r1(MID - 220 + i * 110 + 20 * Math.sin(q * 6))); n.setAttribute("y", r1(FL - 330 - 120 * q)); n.setAttribute("opacity", (Math.sin(Math.PI * q) * 0.7 * (t < T_CARD ? 1 : 0)).toFixed(3)); });
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          const hc = [(hp.head[0] + mp.head[0]) / 2, Math.min(hp.head[1], mp.head[1]) - 100];
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hq) * 1.0 * beat).toFixed(3)})`);
          heartGlow.setAttribute("cx", r1(hc[0])); heartGlow.setAttribute("cy", r1(hc[1] - 4));
          heartGlow.setAttribute("opacity", (0.9 * hq).toFixed(3));
          redSpot.setAttribute("opacity", (0.5 * win(t, T_HOLD, T_HOLD + 0.5)).toFixed(3));

          const bp = drawFig(bHim, livePose(botHim, t, 2.0), -1);
          const bf = botHerF(t);
          const sp = drawFig(bHer, livePose(botHer, t, 0.9), bf);
          bBun.setAttribute("cx", r1(sp.head[0] - bf * 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [bp.hands[0][0], bp.hands[0][1]];
          phone.setAttribute("transform", `translate(${r1(ph[0] - 6)} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0] - 6)); phoneGlow.setAttribute("cy", r1(ph[1] - 10));
          phoneGlow.setAttribute("opacity", (t > 0.3 ? 0.85 + 0.15 * Math.sin(t * 5) : 0).toFixed(3));
          bot.dark.setAttribute("opacity", (0.35 * win(t, T_BACK, T_ALONE + 0.6)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");

          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["DANCE", "WITH", "HER."], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["DON'T", "JUST", "STAND", "THERE."], [T_CARD + 0.75, T_CARD + 0.88, T_CARD + 1.0, T_CARD + 1.12], t, [2]);
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
