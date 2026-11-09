        // ---------- "grandma vs grandpa": an old couple's table tennis final. The rally speeds up, grandpa's cap flies off, grandma smashes. Grandpa could easily return it... looks at her, and swings wide on purpose. She jumps "I WON!", he winks at the camera, she runs over and kisses his cheek; heart ----------
        // remake of a 1.8M-view short (Amazing LP, "Grandma vs. Grandpa Anime Fight!" / "Table Tennis Battle"), see viral/2026-11-09-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const HITS = [0.5, 1.1, 1.65, 2.15, 2.6, 3.0, 3.38, 3.74, 4.08];   // alternating, grandpa first
        const T_SMASH = 4.5, T_MISS = 5.55, T_WON = 6.0, T_WINK = 6.9, T_RUN = 7.5, T_KISS = 8.2, T_HEART = 8.4, T_CAP = 3.0;
        const T_H1 = 9.3, T_H2 = 10.1, T_CARD = 11.4;
        const GPA = 430, GMA = 910, TL = 520, TR = 820, TY = FL - 120;
        const PL = [GPA + 70, FL - 210], PR = [GMA - 70, FL - 210];
        svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 2000, fill: "#1f2a24" }, backG);
        svgEl("circle", { cx: 670, cy: FL - 420, r: 520, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        for (let i = 0; i < 5; i++) svgEl("rect", { x: 200 + i * 230, y: FL - 460, width: 140, height: 90, fill: "#2a3a30", stroke: "#000", "stroke-width": 5 }, backG);
        const tableG = svgEl("g", {}, W);
        svgEl("rect", { x: TL, y: TY, width: TR - TL, height: 16, fill: "#2a7a4a", stroke: "#000", "stroke-width": 5 }, tableG);
        svgEl("line", { x1: (TL + TR) / 2, y1: TY, x2: (TL + TR) / 2, y2: TY + 16, stroke: "#fff", "stroke-width": 3 }, tableG);
        for (const x of [TL + 20, TR - 20]) svgEl("rect", { x: x - 6, y: TY + 16, width: 12, height: FL - TY - 16, fill: "#333", stroke: "#000", "stroke-width": 3 }, tableG);
        svgEl("rect", { x: (TL + TR) / 2 - 3, y: TY - 34, width: 6, height: 34, fill: "#ddd", stroke: "#000", "stroke-width": 2 }, tableG);
        svgEl("path", { d: `M${(TL + TR) / 2} ${TY - 30} V${TY}`, stroke: "#eee", "stroke-width": 10, opacity: 0.4 }, tableG);
        // cane leaning on the table
        svgEl("path", { d: `M${TL - 30} ${FL} L${TL - 8} ${TY + 10} q6 -20 22 -8`, fill: "none", stroke: "#6b4a30", "stroke-width": 8, "stroke-linecap": "round" }, tableG);
        W.appendChild(figG); W.appendChild(fxG);
        const gmaG = svgEl("g", {}, figG);
        const bun = svgEl("circle", { r: 16, fill: "#cfcfcf", stroke: "#000", "stroke-width": 6 }, gmaG);
        const gma = makeFig(gmaG, "#ffffff", "#e2e2e2", true, "gma");
        gmaG.insertBefore(bun, gma.g.previousSibling);
        const gpa = makeFig(figG, "#ffffff", "#dedede", true, "gpa");
        const glasses = [0, 1].map(() => svgEl("g", {}, fxG));
        glasses.forEach((g) => { svgEl("circle", { cx: -8, cy: 0, r: 8, fill: "none", stroke: "#000", "stroke-width": 3 }, g); svgEl("circle", { cx: 10, cy: 0, r: 8, fill: "none", stroke: "#000", "stroke-width": 3 }, g); svgEl("line", { x1: 0, y1: 0, x2: 2, y2: 0, stroke: "#000", "stroke-width": 3 }, g); });
        const stache = svgEl("path", { d: "M-16 0 Q-8 -8 0 -2 Q8 -8 16 0 Q8 5 0 2 Q-8 5 -16 0 Z", fill: "#e8e8e8", stroke: "#000", "stroke-width": 2 }, fxG);
        const cap = svgEl("path", { d: "M-30 0 Q-28 -26 0 -28 Q26 -26 30 -4 L46 0 Z", fill: "#7a6a5a", stroke: "#000", "stroke-width": 4 }, fxG);
        const paddle = (col) => { const g = svgEl("g", {}, fxG); svgEl("rect", { x: -4, y: 0, width: 8, height: 26, fill: "#8a5a3a", stroke: "#000", "stroke-width": 3 }, g); svgEl("circle", { cx: 0, cy: -14, r: 22, fill: col, stroke: "#000", "stroke-width": 4 }, g); return g; };
        const padL = paddle("#d62a2a"), padR = paddle("#1a1a1a");
        const ball = svgEl("circle", { r: 9, fill: "#ffffff", stroke: "#000", "stroke-width": 3 }, fxG);
        const trail = Array.from({ length: 5 }, () => svgEl("circle", { r: 7, fill: "#ffffff", opacity: 0 }, fxG));
        const sweat = Array.from({ length: 2 }, () => svgEl("ellipse", { rx: 5, ry: 8, fill: "#8fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const streak = svgEl("path", { fill: "none", stroke: "#ffd23a", "stroke-width": 8, "stroke-linecap": "round", opacity: 0 }, fxG);
        const wink = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 36, fill: "#ffd23a", stroke: "#000", "stroke-width": 2, opacity: 0, "text-anchor": "middle" }, fxG); wink.textContent = "✦";
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 3 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bWon = bubble("I WON!", 160, 34, "#ff3b30"), bOops = bubble("OOPS!", 140);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => { const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1; if (q < 0.5) return [hx + d * STR * (0.25 - q), FL]; const ss = (q - 0.5) / 0.5; return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift]; });
        }
        const walking = (x0, x, f) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 6, head: 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 20 * sw, ael: 20, bsh: -4 - 20 * sw, bel: 20 }); };
        const ALL = [...HITS, T_SMASH];
        const swingK = (s, side) => { let k = 0; ALL.forEach((h, i) => { if ((i % 2 === 0) === (side === 0)) k = Math.max(k, Math.exp(-(((s - h) / 0.12) ** 2))); }); return k; };
        function gpaRaw(s) {
          const st = standOn(GPA, 1, FL); st.torso = 16; st.head = -6; st.hy += 8; st.ax += 10; st.bx -= 10;
          const k = swingK(s, 0); reachTo(st, 1, [lerp(GPA + 40, PL[0], k), lerp(FL - 160, PL[1], k)]); reachTo(st, 1, [GPA - 30, stand - 60], "b");
          const miss = Math.exp(-(((s - T_MISS) / 0.15) ** 2)); reachTo(st, miss, [GPA + 40, FL - 330]); st.torso -= 10 * miss;
          const look = hold(s, T_SMASH + 0.3, T_MISS - 0.1, 0.15); st.head += 10 * look;
          const shrug = hold(s, T_WON, T_RUN, 0.2); reachTo(st, shrug, [GPA + 40, stand - 150], "b"); st.head -= 6 * shrug;
          const kiss = win(s, T_KISS - 0.2, T_KISS + 0.2); st.head += 12 * kiss;
          return st;
        }
        function gmaRaw(s) {
          if (s < T_RUN) {
            const st = standOn(GMA, -1, FL); st.torso = 16; st.head = -6; st.hy += 8;
            const k = swingK(s, 1); reachTo(st, 1, [lerp(GMA - 40, PR[0], k), lerp(FL - 160, PR[1], k)]); reachTo(st, 1, [GMA + 30, stand - 60], "b");
            const sm = Math.exp(-(((s - T_SMASH) / 0.12) ** 2)); reachTo(st, sm, [PR[0] - 10, FL - 300]); st.torso += 20 * sm;
            const jump = Math.max(0, Math.sin(Math.PI * clamp((s - T_WON) / 0.45, 0, 1))) + Math.max(0, Math.sin(Math.PI * clamp((s - T_WON - 0.55) / 0.45, 0, 1)));
            st.hy -= 50 * jump; st.ay -= 50 * jump; st.by -= 50 * jump;
            const yay = hold(s, T_WON, T_RUN, 0.2); reachTo(st, yay, [GMA - 10, stand - 260]); reachTo(st, yay, [GMA + 30, stand - 250], "b");
            return st;
          }
          const x = lerp(GMA, GPA + 128, win(s, T_RUN, T_KISS - 0.1));
          const st = s < T_KISS - 0.1 ? (() => { const ft = [[x - 20, FL], [x + 20, FL]]; return base({ hx: x, hy: stand + 4, torso: 16, head: -4, ax: ft[0][0] + 14 * Math.sin(s * 22), ay: FL - 8 * Math.max(0, Math.sin(s * 22)), bx: ft[1][0] - 14 * Math.sin(s * 22), by: FL - 8 * Math.max(0, -Math.sin(s * 22)) }); })() : standOn(x, -1, FL);
          st.torso = 18; const kiss = win(s, T_KISS - 0.1, T_KISS + 0.2); st.head = -4 + 20 * kiss;
          reachTo(st, kiss, [GPA + 40, stand - 120]); reachTo(st, kiss, [GPA + 30, stand - 90], "b");
          return st;
        }
        // ball: from hitter's paddle to receiver's paddle, bouncing on the receiver's half
        function ballAt(s) {
          if (s < HITS[0]) return [PL[0], PL[1] - 30 * Math.abs(Math.sin(s * 8))];
          for (let i = 0; i < ALL.length; i++) {
            const a = ALL[i], b = i + 1 < ALL.length ? ALL[i + 1] : T_MISS + 0.35;
            if (s >= a && s < b) {
              const fromL = i % 2 === 0, A = fromL ? PL : PR;
              const C = i + 1 < ALL.length ? (fromL ? PR : PL) : [GPA - 260, FL - 260];
              const B = [fromL ? lerp(TL, TR, 0.75) : lerp(TL, TR, 0.25), TY - 8];
              const q = (s - a) / (b - a), qb = i + 1 < ALL.length ? 0.55 : 0.4;
              if (q < qb) { const u = q / qb; return [lerp(A[0], B[0], u), lerp(A[1], B[1], u) - (i === ALL.length - 1 ? 20 : 60) * Math.sin(Math.PI * u)]; }
              const u = (q - qb) / (1 - qb); return [lerp(B[0], C[0], u), lerp(B[1], C[1], u) - 70 * Math.sin(Math.PI * u)];
            }
          }
          return null;
        }
        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const label = document.createElement("div");
        label.style.cssText = "position:absolute;left:0;right:0;top:400px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:34px;letter-spacing:0.3em;color:#9a9a9a;opacity:0";
        E("stage").appendChild(label);
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:90px;right:90px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:46px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"IN LOVE, THE ONE<br/>WHO LOSES WINS."</div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function render(t) {
          const s = t;
          let kick = 0; if (s > T_SMASH) kick = Math.exp(-(s - T_SMASH) / 0.15);
          const wz = hold(s, T_WINK - 0.2, T_RUN + 0.1, 0.25);
          const cs = 1.75 * (1 + 0.04 * win(s, 0, T_SMASH)) * (1 + 0.35 * wz) * (1 + 0.2 * win(s, T_RUN, T_KISS)) * (1 + 0.05 * kick);
          const ek = win(s, T_RUN, T_KISS); const cx = lerp(lerp(670, GPA + 20, wz), 490, ek), cy = lerp(430, 420, wz);
          cam.setAttribute("transform", `translate(${r1(540 + Math.sin(t * 67) * 8 * kick)} 1180) scale(${cs.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const gp = drawFig(gpa, livePose(gpaRaw, s, 0.3), 1);
          const gm = drawFig(gma, livePose(gmaRaw, s, 1.4), -1);
          bun.setAttribute("cx", r1(gm.head[0] + 25)); bun.setAttribute("cy", r1(gm.head[1] - 16));
          glasses[0].setAttribute("transform", `translate(${r1(gp.head[0] + 8)} ${r1(gp.head[1] - 2)})`);
          glasses[1].setAttribute("transform", `translate(${r1(gm.head[0] - 8)} ${r1(gm.head[1] - 2)}) scale(-1 1)`);
          stache.setAttribute("transform", `translate(${r1(gp.head[0] + 12)} ${r1(gp.head[1] + 14)})`);
          // cap flies off at T_CAP and lands on the floor
          const cq = clamp((s - T_CAP) / 0.9, 0, 1);
          const cp = cq <= 0 ? [gp.head[0] + 2, gp.head[1] - 22] : [lerp(gp.head[0], GPA - 140, cq), lerp(gp.head[1] - 22, FL - 6, cq) - 140 * Math.sin(Math.PI * cq)];
          cap.setAttribute("transform", `translate(${r1(cp[0])} ${r1(cp[1])}) rotate(${r1(-400 * cq)})`);
          padL.setAttribute("transform", `translate(${r1(gp.hands[0][0])} ${r1(gp.hands[0][1])}) rotate(-20)`);
          padR.setAttribute("opacity", s < T_RUN ? 1 : 0); padR.setAttribute("transform", `translate(${r1(gm.hands[0][0])} ${r1(gm.hands[0][1])}) rotate(20)`);
          const bp = ballAt(s);
          ball.setAttribute("opacity", bp ? 1 : 0); if (bp) { ball.setAttribute("cx", r1(bp[0])); ball.setAttribute("cy", r1(bp[1])); }
          trail.forEach((c, i) => { const p = ballAt(s - (i + 1) * 0.03); c.setAttribute("opacity", p && bp ? (0.35 * (1 - i / 5)).toFixed(3) : 0); if (p) { c.setAttribute("cx", r1(p[0])); c.setAttribute("cy", r1(p[1])); } });
          const sp = hold(s, T_SMASH - 0.05, T_SMASH + 0.5, 0.05); streak.setAttribute("opacity", sp.toFixed(3)); streak.setAttribute("d", `M${PR[0] + 10} ${FL - 320} L${lerp(TL, TR, 0.25)} ${TY - 10}`);
          sweat.forEach((e, i) => { const q = frac(t * 1.4 + i / 2), on = s > 2.0 && s < T_MISS; const h = i ? gm.head : gp.head; e.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); e.setAttribute("cx", r1(h[0] + (i ? -26 : 26))); e.setAttribute("cy", r1(h[1] - 10 + 40 * q)); });
          wink.setAttribute("opacity", hold(s, T_WINK, T_RUN, 0.15).toFixed(3)); wink.setAttribute("x", r1(gp.head[0] + 34)); wink.setAttribute("y", r1(gp.head[1] - 20));
          const bub = (g, a, b2, p) => { const k = hold(s, a, b2, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bOops, T_MISS + 0.05, T_WON + 0.3, [gp.head[0] + 20, gp.head[1] - 110]);
          bub(bWon, T_WON + 0.1, T_RUN, [gm.head[0] - 20, gm.head[1] - 120]);
          smallH.forEach((h, k) => { const q = clamp((s - T_KISS - k * 0.15) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(gm.head[0] - 20 + k * 20)} ${r1(gm.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HEART) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((gp.head[0] + gm.head[0]) / 2)} ${r1(Math.min(gp.head[1], gm.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          label.textContent = "THE FINAL POINT.";
          label.style.opacity = Math.min(win(s, 0.1, 0.3), 1 - win(s, 2.2, 2.5)).toFixed(3);
          E("h1").innerHTML = slam(["50", "YEARS", "MARRIED."], [T_H1, T_H1 + 0.13, T_H1 + 0.26], t, []);
          E("h2").innerHTML = slam(["HE", "STILL", "LETS", "HER", "WIN."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.39, T_H2 + 0.52], t, [4]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOSING", "TO", "HER"], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["IS", "WINNING."], [T_CARD + 0.7, T_CARD + 0.85], t, [1]);
          E("cq").style.opacity = win(t, T_CARD + 1.2, T_CARD + 1.7).toFixed(3);
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
