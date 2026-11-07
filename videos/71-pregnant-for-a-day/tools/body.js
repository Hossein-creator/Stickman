        // ---------- "pregnant for a day": she is heavily pregnant, tired, hand on her back. He laughs: "PREGNANCY IS EASY." Magic sparkles swap the belly onto him: back pain "OOF!", cravings (pickles + ice cream), a kick "OW!", "I TAKE IT BACK!". Sparkles swap it back, and he kneels and rubs her feet ----------
        // remake of a 13.0x outlier (Swapnimations, "Body Swap with my pregnant wife!"), see viral/2026-11-06-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const T_LAUGH = 0.5, T_SWAP = 1.9, T_OOF = 2.5, T_CRAVE = 3.6, T_KICK = 5.0, T_BACK = 5.9, T_SWAP2 = 7.0, T_RUB = 7.7, T_HOLD = 8.3;
        const T_H1 = 9.0, T_H2 = 9.9, T_CARD = 11.0;
        const SHE = 460, HE = 650;

        svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("polygon", { points: `460,${FL - 520} 660,${FL - 520} 780,${FL} 340,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        svgEl("rect", { x: 160, y: FL - 400, width: 140, height: 220, fill: "#1e2430", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 820, y: FL - 340, width: 120, height: 90, rx: 6, fill: "#3a3a42", stroke: "#000", "stroke-width": 5 }, backG);
        svgEl("path", { d: `M836 ${FL - 280} l20 -30 l20 20 l24 -34 l24 44`, fill: "none", stroke: "#8aa", "stroke-width": 4 }, backG);
        const warm = svgEl("ellipse", { cx: 540, cy: FL - 160, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);

        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const belly = svgEl("ellipse", { rx: 36, ry: 42, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, fxG);
        const kickL = Array.from({ length: 3 }, () => svgEl("line", { stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const jar = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -16, y: -40, width: 32, height: 44, rx: 6, fill: "#a8d08d", stroke: "#000", "stroke-width": 4 }, jar);
        svgEl("rect", { x: -18, y: -48, width: 36, height: 10, rx: 3, fill: "#d04a3a", stroke: "#000", "stroke-width": 3 }, jar);
        for (let i = 0; i < 2; i++) svgEl("ellipse", { cx: -5 + i * 10, cy: -18, rx: 5, ry: 13, fill: "#4f8a3a", stroke: "#000", "stroke-width": 2 }, jar);
        const cone = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-14 -10 L14 -10 L0 26 Z", fill: "#e0b070", stroke: "#000", "stroke-width": 3 }, cone);
        svgEl("circle", { cx: 0, cy: -20, r: 15, fill: "#ff9ac0", stroke: "#000", "stroke-width": 3 }, cone);
        const stars = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z", fill: "#fff6b0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const sweat = svgEl("path", { d: "M0 -14 Q10 2 0 8 Q-10 2 0 -14 Z", fill: "#7cc8ff", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
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
        const bEasy = bubble("PREGNANCY IS EASY.", 360), bOof = bubble("OOF!", 120, 30, "#ff3b30"), bCrave = bubble("PICKLES + ICE CREAM?!", 380);
        const bOw = bubble("OW!", 110, 30, "#ff3b30"), bBack = bubble("I TAKE IT BACK!", 300, 30, "#ff3b30");

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const swapK = (s) => win(s, T_SWAP + 0.1, T_SWAP + 0.4) * (1 - win(s, T_SWAP2 + 0.1, T_SWAP2 + 0.4));   // 1 = belly on him
        function herRaw(s) {
          const st = standOn(SHE, 1, FL); st.head = 2;
          const preg = 1 - swapK(s);
          reachTo(st, preg, [SHE - 34, stand - 30], "b"); st.torso -= 6 * preg;
          reachTo(st, preg * (s < T_RUB ? 1 : 0.6), [SHE + 46, stand - 60]);
          const str = hold(s, T_OOF, T_CRAVE, 0.25); reachTo(st, str, [SHE - 26, stand - 230]); reachTo(st, str, [SHE + 26, stand - 230], "b"); st.hy -= 8 * Math.abs(Math.sin(s * 8)) * str;
          const lol = hold(s, T_KICK, T_SWAP2, 0.2); reachTo(st, lol, [SHE + 40, stand - 148]); st.torso += 6 * lol * Math.abs(Math.sin(s * 16));
          const love = win(s, T_RUB + 0.2, T_RUB + 0.6); st.head -= 8 * love; reachTo(st, love, [SHE + 30, stand - 130], "b");
          return st;
        }
        function himRaw(s) {
          if (s > T_RUB) {
            const x = SHE + 100;
            const kn = base({ hx: x, hy: FL - 96, torso: 20, head: 10, ax: x - 58, ay: FL, bx: x + 64, by: FL - 2 });
            const rub = Math.sin(s * 12) * 8;
            reachTo(kn, 1, [SHE + 30 + rub, FL - 26]); reachTo(kn, 1, [SHE + 44 - rub, FL - 34], "b");
            const st = standOn(HE, -1, FL);
            return mixPose(st, kn, win(s, T_RUB, T_RUB + 0.4));
          }
          const st = standOn(HE, -1, FL); st.head = 4;
          const lg = hold(s, T_LAUGH, T_SWAP, 0.15); reachTo(st, lg, [HE - 10, stand - 62]); reachTo(st, lg, [HE + 6, stand - 58], "b"); st.torso -= (6 + 5 * Math.sin(s * 22)) * lg; st.head -= 14 * lg;
          const oof = hold(s, T_OOF, T_CRAVE, 0.15); st.torso += 18 * oof; st.hy += 12 * oof; reachTo(st, oof, [HE + 34, stand - 30], "b"); reachTo(st, oof, [HE - 46, stand - 60]);
          const cr = hold(s, T_CRAVE, T_KICK, 0.2); reachTo(st, cr, [HE - 46, stand - 92]); if (cr > 0) { const c = 0.5 - 0.5 * Math.cos((s - T_CRAVE) * 2 * Math.PI * 1.4); reachTo(st, cr, [HE - 30, lerp(stand - 96, stand - 150, c)], "b"); }
          const kick = hold(s, T_KICK, T_KICK + 0.5, 0.06); st.hy -= 16 * kick; reachTo(st, kick, [HE - 46, stand - 60]); reachTo(st, kick, [HE - 40, stand - 50], "b");
          const back = hold(s, T_BACK, T_SWAP2 + 0.2, 0.15); reachTo(st, back, [HE - 30, stand - 205]); reachTo(st, back, [HE + 20, stand - 205], "b"); st.torso -= 6 * back;
          return st;
        }

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:90px;right:90px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:52px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:27px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"MAKING THE DECISION TO HAVE<br/>A CHILD IS MOMENTOUS. IT IS TO<br/>DECIDE FOREVER TO HAVE YOUR HEART<br/>GO WALKING AROUND OUTSIDE YOUR BODY."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ELIZABETH STONE</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function render(t) {
          const s = t;
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          hit(T_SWAP + 0.3, 0.6, 0.15); hit(T_SWAP2 + 0.3, 0.6, 0.15); hit(T_KICK, 0.5, 0.12);
          const cs = 1.9 * (s > T_RUB ? 1 + 0.1 * ease(clamp((s - T_RUB) / 1.2, 0, 1)) : 1);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) scale(${sc.toFixed(4)}) translate(-555 -440)`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // belly: on her, swaps to him, swaps back
          const bpos = (fig, dir) => [lerp(fig.head[0], fig.hip[0], 0.62) + dir * 30, lerp(fig.head[1], fig.hip[1], 0.7)];
          const k = swapK(s), bH = bpos(hp, 1), bM = bpos(mp, -1);
          const bk = 1 + 0.12 * Math.exp(-Math.max(0, s - T_KICK) * 6) * (s > T_KICK ? 1 : 0);
          belly.setAttribute("cx", r1(lerp(bH[0], bM[0], k))); belly.setAttribute("cy", r1(lerp(bH[1], bM[1], k)));
          belly.setAttribute("rx", r1(36 * bk)); belly.setAttribute("ry", r1(42 * bk));
          kickL.forEach((l, i) => { const a = -0.6 + i * 0.6, on = hold(s, T_KICK, T_KICK + 0.4, 0.05); l.setAttribute("x1", r1(bM[0] - 44 * Math.cos(a))); l.setAttribute("y1", r1(bM[1] + 44 * Math.sin(a))); l.setAttribute("x2", r1(bM[0] - 64 * Math.cos(a))); l.setAttribute("y2", r1(bM[1] + 64 * Math.sin(a))); l.setAttribute("opacity", on.toFixed(3)); });
          // sparkles swirling around both at each swap
          stars.forEach((st, i) => { const on = Math.max(hold(s, T_SWAP - 0.1, T_SWAP + 0.7, 0.15), hold(s, T_SWAP2 - 0.1, T_SWAP2 + 0.7, 0.15)); const a = t * 5 + i * 0.63; const cx = 555 + 150 * Math.cos(a), cy = FL - 200 + 120 * Math.sin(a * 1.3); st.setAttribute("transform", `translate(${r1(cx)} ${r1(cy)}) rotate(${r1(t * 200 + i * 30)}) scale(${(0.8 + 0.4 * Math.sin(t * 9 + i)).toFixed(3)})`); st.setAttribute("opacity", on.toFixed(3)); });
          E("flash").style.opacity = (0.5 * Math.max(hold(s, T_SWAP + 0.2, T_SWAP + 0.45, 0.08), hold(s, T_SWAP2 + 0.2, T_SWAP2 + 0.45, 0.08))).toFixed(3);
          // cravings
          const crOn = s > T_CRAVE && s < T_KICK ? 1 : 0;
          jar.setAttribute("opacity", crOn); jar.setAttribute("transform", `translate(${r1(mp.hands[0][0])} ${r1(mp.hands[0][1] + 14)})`);
          cone.setAttribute("opacity", crOn); cone.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1] - 6)})`);
          sweat.setAttribute("opacity", s > T_OOF && s < T_SWAP2 ? 1 : 0); sweat.setAttribute("transform", `translate(${r1(mp.head[0] + 40)} ${r1(mp.head[1] - 10 + 14 * frac(s * 1.4))})`);
          // speech
          const bub = (g, a, b, p) => { const kk = hold(s, a, b, 0.1); g.setAttribute("opacity", kk.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(kk)).toFixed(3)})`); };
          bub(bEasy, T_LAUGH, T_SWAP - 0.1, [mp.head[0] - 20, mp.head[1] - 110]);
          bub(bOof, T_OOF, T_CRAVE - 0.2, [mp.head[0] + 20, mp.head[1] - 110]);
          bub(bCrave, T_CRAVE + 0.1, T_KICK - 0.1, [mp.head[0] - 40, mp.head[1] - 110]);
          bub(bOw, T_KICK, T_BACK - 0.1, [mp.head[0] + 20, mp.head[1] - 110]);
          bub(bBack, T_BACK, T_SWAP2 + 0.1, [mp.head[0] - 40, mp.head[1] - 110]);
          smallH.forEach((h, i) => { const q = clamp((s - T_RUB - 0.4 - i * 0.2) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(hp.head[0] + 20 - i * 20)} ${r1(hp.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hp.head[0] + 50)} ${r1(hp.head[1] - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (0.8 * win(s, T_RUB, T_RUB + 0.8)).toFixed(3));

          E("h1").innerHTML = slam(["HE", "SAID", "IT", "WAS", "EASY."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.39, T_H1 + 0.52], t, [4]);
          E("h2").innerHTML = slam(["THEN", "HE", "TRIED", "IT", "FOR", "A", "DAY."], [T_H2, T_H2 + 0.1, T_H2 + 0.2, T_H2 + 0.3, T_H2 + 0.4, T_H2 + 0.5, T_H2 + 0.6], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["MOMS", "ARE"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["SUPERHEROES."], [T_CARD + 0.8], t, [0]);
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
