        // ---------- "love is a seesaw": winner split-screen format (reel 36). BOTH SIT: they sit on both ends and go up and down, laughing (red heart). ONE SITS: he sits, she stands next to it on her phone; he pushes, nothing moves; she walks away; he is stuck on the ground ----------
        // remake of "she pulls away long before she leaves" (Mécanique Mentale, viral/2026-10-30b-check.md)
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- panel geometry ----------
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const PIVX = 620, PIVY = FL - 72, L = 280, LS = 238, AMAX = Math.asin(66 / L);
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1000]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.3 }, beams);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          const figs = svgEl("g", {}, inner);
          // seesaw: plank on a pivot
          const plank = svgEl("g", {}, inner);
          svgEl("rect", { x: -L, y: -9, width: 2 * L, height: 18, rx: 6, fill: "#c0503a", stroke: "#000", "stroke-width": 5 }, plank);
          for (const s of [-1, 1]) { svgEl("rect", { x: s * LS - 30, y: -16, width: 60, height: 10, rx: 4, fill: "#e0b050", stroke: "#000", "stroke-width": 4 }, plank); svgEl("path", { d: `M${s * (LS - 46)} -6 L${s * (LS - 46)} -54 L${s * (LS - 46) - s * 18} -54`, fill: "none", stroke: "#888", "stroke-width": 7, "stroke-linecap": "round" }, plank); }
          svgEl("path", { d: `M${PIVX - 40} ${FL + 2} L${PIVX} ${PIVY} L${PIVX + 40} ${FL + 2} Z`, fill: "#5a5f6a", stroke: "#000", "stroke-width": 5 }, inner);
          svgEl("circle", { cx: PIVX, cy: PIVY, r: 9, fill: "#888", stroke: "#000", "stroke-width": 4 }, inner);
          const front = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { beams, figs, plank, front, fx };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const seatAt = (a, side) => [PIVX + side * LS * Math.cos(a), PIVY + side * LS * Math.sin(a)];   // side -1 = left, +1 = right; a > 0: right end down

        // ---------- poses ----------
        function feetOn(x0, hx, ST, lift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 120, 14), sw = Math.sin((Math.PI * 2 * (x - x0)) / 120); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 }); };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        // sitting on a seat, facing the middle; feet on the ground when low, dangling when high; hands on the handle
        function onSeat(a, side, push, joy) {
          const [sx, sy] = seatAt(a, side), f = -side;
          const s = base({ hx: sx, hy: sy - 24, torso: 6 - 10 * joy, head: -6 * joy, ax: sx + f * 70, ay: Math.min(FL, sy + 92) - 26 * push, bx: sx + f * 56, by: Math.min(FL, sy + 98) - 20 * push });
          reachTo(s, 1 - joy, [sx + f * 52, sy - 66]); reachTo(s, 1 - joy, [sx + f * 46, sy - 60], "b");
          if (joy > 0) { s.ash = lerp(s.ash, 160, joy); s.bsh = lerp(s.bsh, 150, joy); s.ael = 20; s.bel = 20; }
          return s;
        }

        // ---------- beats ----------
        const T_SIT = 1.5, T_SWING = 2.1, T_HOLD = 7.4;
        const T_PAT = 2.4, T_PUSH = 3.5, T_PUSH1 = 4.7, T_LEAVE = 5.0, T_STUCK = 5.8;
        const T_T1 = 9.4, T_T2 = 10.0, T_CARD = 11.6;
        const PER = 1.7;
        const topA = (t) => (t < T_SWING ? lerp(AMAX, 0, win(t, T_SIT, T_SWING)) : 0.9 * AMAX * Math.sin((2 * Math.PI * (t - T_SWING)) / PER) * (1 - 0.6 * win(t, T_HOLD + 1.5, T_HOLD + 3)));
        const botA = (t) => AMAX - (t > T_PUSH && t < T_PUSH1 ? 0.35 * AMAX * Math.max(0, Math.sin((2 * Math.PI * (t - T_PUSH)) / 0.6)) : 0);

        function topHer(t) {          // left seat
          if (t < T_SIT) { const [sx] = seatAt(topA(t), -1); return walking(40, lerp(40, sx - 10, ease(t / T_SIT))); }
          const a = topA(t), da = topA(t + 0.05) - a;
          const low = clamp(-Math.sin(a) / Math.sin(AMAX), 0, 1);                  // her end low when a < 0
          const joy = clamp(Math.sin(a) / Math.sin(AMAX), 0, 1) * (t > T_SWING ? 1 : 0);
          return mixPose(standOn(seatAt(a, -1)[0] - 10, 1, FL), onSeat(a, -1, low * (da > 0 ? 1 : 0), joy * 0.6), win(t, T_SIT - 0.3, T_SIT + 0.1));
        }
        function topHim(t) {          // right seat
          if (t < T_SIT) { const [sx] = seatAt(topA(t), 1); return walking(1200, lerp(1200, sx + 10, ease(t / T_SIT))); }
          const a = topA(t), da = topA(t + 0.05) - a;
          const low = clamp(Math.sin(a) / Math.sin(AMAX), 0, 1);
          const joy = clamp(-Math.sin(a) / Math.sin(AMAX), 0, 1) * (t > T_SWING ? 1 : 0);
          return mixPose(standOn(seatAt(a, 1)[0] + 10, -1, FL), onSeat(a, 1, low * (da < 0 ? 1 : 0), joy * 0.6), win(t, T_SIT - 0.3, T_SIT + 0.1));
        }
        const topHerF = (t) => 1, topHimF = (t) => -1;
        function botHim(t) {
          if (t < T_SIT) { const [sx] = seatAt(AMAX, 1); return walking(1200, lerp(1200, sx + 10, ease(t / T_SIT))); }
          const a = botA(t);
          const s = onSeat(a, 1, t > T_PUSH && t < T_PUSH1 ? Math.max(0, Math.sin((2 * Math.PI * (t - T_PUSH)) / 0.6)) : 0, 0);
          // pats the empty seat next to... asks her to sit
          const pat = hold(t, T_PAT, T_PUSH - 0.1, 0.2);
          const [sx, sy] = seatAt(a, 1);
          reachTo(s, pat, [sx - 120, sy - 140]);
          // stuck: head down, then looks after her
          const stuck = win(t, T_LEAVE + 0.4, T_STUCK);
          s.torso += 26 * stuck; s.head += 28 * stuck;
          return mixPose(standOn(sx + 10, -1, FL), s, win(t, T_SIT - 0.3, T_SIT + 0.1));
        }
        const HERX = PIVX - 300;
        function botHer(t) {
          if (t < T_SIT) return walking(40, lerp(40, HERX, ease(t / T_SIT)));
          if (t < T_LEAVE) { const st = standOn(HERX, 1, FL); st.head = 28 + 2 * Math.sin(t * 1.3); st.torso = 6; reachTo(st, 1, [HERX + 40, stand - 76]); reachTo(st, 1, [HERX + 32, stand - 70], "b"); st.atx += 3 * Math.sin(t * 7) * (frac(t * 0.6) < 0.3 ? 1 : 0); return st; }
          const p = walking(HERX, lerp(HERX, -200, ease((t - T_LEAVE) / 1.6)));
          p.head = 26; reachTo(p, 1, [p.hx - 40, stand - 76]); reachTo(p, 1, [p.hx - 32, stand - 70], "b");
          return p;
        }
        const botHerF = (t) => (t < T_LEAVE ? 1 : -1);

        const tBun = svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.front);
        const tHer = makeFig(top.front, "#ffffff", "#e2e2e2", true, "tHer");
        top.front.insertBefore(tBun, tHer.g);
        const tHim = makeFig(top.front, "#ffffff", "#dedede", true, "tHim");
        const redSpot = svgEl("polygon", { points: `${PIVX - 56},${PY0} ${PIVX + 56},${PY0} ${PIVX + 200},${FL} ${PIVX - 200},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const heartGlow = svgEl("circle", { r: 70, fill: "url(#redGlow)", opacity: 0 }, top.fx);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const bBun = svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs);
        const bHer = makeFig(bot.figs, "#8e8e8e", "#767676", false, "bHer");
        bot.figs.insertBefore(bBun, bHer.g);
        const bHim = makeFig(bot.front, "#9a9a9a", "#7e7e7e", false, "bHim");
        const phoneGlow = svgEl("circle", { r: 78, fill: "url(#phoneGlow)" }, bot.fx);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const laughs = Array.from({ length: 4 }, () => { const tx = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#fff", "text-anchor": "middle", opacity: 0 }, top.fx); tx.textContent = "HA"; return tx; });

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH SIT"; botT.textContent = "ONE SITS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "THEY SIT DOWN"], [T_SWING + 0.2, "UP AND DOWN"], [T_HOLD, "TOGETHER"]];
        const BOTSEQ = [[0.45, "HE SITS DOWN"], [2.0, "SHE SCROLLS"], [T_PUSH + 0.3, "NOTHING MOVES", "#ff3b30"], [T_STUCK, "STUCK", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A SEESAW."], [T_T1, "IT ONLY MOVES"], [T_T2, "WHEN BOTH ARE ON IT."]];
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
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:26px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"COMING TOGETHER IS A BEGINNING,<br/>STAYING TOGETHER IS PROGRESS,<br/>WORKING TOGETHER IS SUCCESS."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">HENRY FORD</div></div>`;
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
          const at = topA(t), ab = botA(t);
          top.plank.setAttribute("transform", `translate(${PIVX} ${PIVY}) rotate(${(at * 180 / Math.PI).toFixed(2)})`);
          bot.plank.setAttribute("transform", `translate(${PIVX} ${PIVY}) rotate(${(ab * 180 / Math.PI).toFixed(2)})`);
          const hp = drawFig(tHer, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(tHim, livePose(topHim, t, 1.3), -1);
          tBun.setAttribute("cx", r1(hp.head[0] - 25)); tBun.setAttribute("cy", r1(hp.head[1] - 16));
          laughs.forEach((l, i) => {
            const q = frac(t * 0.7 + i / 4), src = i % 2 ? mp.head : hp.head, on = t > T_SWING + 0.4 && t < T_CARD;
            l.setAttribute("x", r1(src[0] + (i % 2 ? -1 : 1) * (30 + 30 * q))); l.setAttribute("y", r1(src[1] - 40 - 70 * q));
            l.setAttribute("opacity", on ? (Math.sin(Math.PI * q) * 0.85).toFixed(3) : 0);
          });
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${PIVX} ${r1(PIVY - 260)}) scale(${(backOut(hq) * 1.0 * beat).toFixed(3)})`);
          heartGlow.setAttribute("cx", PIVX); heartGlow.setAttribute("cy", r1(PIVY - 264));
          heartGlow.setAttribute("opacity", (0.9 * hq).toFixed(3));
          redSpot.setAttribute("opacity", (0.5 * win(t, T_HOLD, T_HOLD + 0.5)).toFixed(3));

          const bp = drawFig(bHim, livePose(botHim, t, 2.0), -1);
          const sp = drawFig(bHer, livePose(botHer, t, 0.9), botHerF(t));
          bBun.setAttribute("cx", r1(sp.head[0] - botHerF(t) * 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2];
          phone.setAttribute("transform", `translate(${r1(ph[0] + 6 * botHerF(t))} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1] - 10));
          phoneGlow.setAttribute("opacity", (t > 0.45 ? 0.85 + 0.15 * Math.sin(t * 5) : 0).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");

          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["BOTH", "HAVE", "TO", "SIT."], [T_CARD, T_CARD + 0.13, T_CARD + 0.26, T_CARD + 0.4], t, []);
          E("cm2").innerHTML = slam(["OR", "NOBODY", "MOVES."], [T_CARD + 0.8, T_CARD + 0.95, T_CARD + 1.1], t, [2]);
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
