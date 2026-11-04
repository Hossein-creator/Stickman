        // ---------- "red flags": every time she does something crazy (reads his phone "WHO IS SHE?", hides his keys, "I'M NOT JEALOUS!", steals his fries) a red flag pops out of the ground. He picks each one like a flower... and gives her a bouquet of red flags ----------
        // remake of a 3.4x outlier (Gue Punya Cerita, "a guy obsessed with all the red flags"), see viral/2026-11-04-check.md
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

        const ACTS = [0.6, 2.2, 3.8, 5.2], POP = 0.7, PICK = 1.1;
        const T_BOUQ = 6.6, T_GIVE = 7.0, T_GASP = 7.4, T_HUG = 7.9, T_HOLD = 8.3;
        const T_H1 = 9.2, T_H2 = 10.1, T_CARD = 11.2;
        const SHE = 450, HE = 660;
        const FLAGX = [370, 395, 420, 345];

        svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("polygon", { points: `460,${FL - 520} 660,${FL - 520} 780,${FL} 340,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        svgEl("rect", { x: 140, y: FL - 400, width: 160, height: 260, fill: "#1e2430", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        const warm = svgEl("ellipse", { cx: 560, cy: FL - 160, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);

        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const makeFlag = () => { const g = svgEl("g", { opacity: 0 }, fxG); svgEl("line", { x1: 0, y1: 0, x2: 0, y2: -110, stroke: "#000", "stroke-width": 7 }, g); svgEl("line", { x1: 0, y1: 0, x2: 0, y2: -110, stroke: "#c8c8c8", "stroke-width": 3 }, g); const cloth = svgEl("path", { fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, g); return { g, cloth }; };
        const flags = ACTS.map(makeFlag);
        const ribbon = svgEl("path", { d: "M-14 -6 Q0 6 14 -6 M-6 0 L-14 18 M6 0 L14 18", fill: "none", stroke: "#ff7aa8", "stroke-width": 5, opacity: 0 }, fxG);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const keys = svgEl("g", { opacity: 0 }, fxG);
        svgEl("circle", { cx: 0, cy: 0, r: 8, fill: "none", stroke: "#d4af37", "stroke-width": 4 }, keys);
        svgEl("path", { d: "M6 4 L22 18 M16 12 L20 8", stroke: "#d4af37", "stroke-width": 4 }, keys);
        const fries = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-14 0 L14 0 L18 -26 L-18 -26 Z", fill: "#e0303a", stroke: "#000", "stroke-width": 3 }, fries);
        for (let i = -2; i <= 2; i++) svgEl("rect", { x: i * 6 - 2, y: -44 + Math.abs(i) * 4, width: 5, height: 22, fill: "#ffd25a", stroke: "#000", "stroke-width": 1.5 }, fries);
        const steam = Array.from({ length: 2 }, () => svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 4 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const SAYS = [["WHO IS SHE?!", 240], ["YOU'RE NOT GOING.", 320], ["I'M NOT JEALOUS!", 300], ["MINE NOW.", 190]];
        const bSay = SAYS.map(([s, w]) => bubble(s, w, 28, "#ff3b30"));
        const bAww = bubble("AWW...", 150, 30);

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function herRaw(s) {
          const st = standOn(SHE, 1, FL); st.head = 2;
          const a0 = hold(s, ACTS[0] - 0.2, ACTS[0] + 1.2, 0.15); reachTo(st, a0, [SHE + 120, stand - 120]); reachTo(st, a0, [SHE + 40, stand - 70], "b"); st.head += 18 * a0;
          const a1 = hold(s, ACTS[1], ACTS[1] + 1.2, 0.15); reachTo(st, a1, [SHE - 20, stand - 30]); st.torso -= 8 * a1;
          const a2 = hold(s, ACTS[2], ACTS[2] + 1.2, 0.1); reachTo(st, a2, [SHE - 40, stand - 20]); reachTo(st, a2, [SHE + 40, stand - 20], "b"); st.hy -= 12 * Math.abs(Math.sin(s * 14)) * a2; st.ay -= 20 * Math.max(0, Math.sin(s * 14)) * a2;
          const a3 = hold(s, ACTS[3] - 0.2, ACTS[3] + 1.2, 0.15); reachTo(st, a3, [SHE + 130, stand - 100]); st.torso += 14 * a3 * (s < ACTS[3] + 0.3 ? 1 : 0); reachTo(st, a3 * (s > ACTS[3] + 0.4 ? 1 : 0), [SHE + 40, stand - 150]);
          const gasp = hold(s, T_GASP, T_HUG, 0.15); reachTo(st, gasp, [SHE + 70, stand - 110]); reachTo(st, gasp, [SHE + 60, stand - 104], "b");
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(SHE, 540, k), 1, FL); hug.torso = 8 * k; reachTo(hug, k, [585, stand - 150]); reachTo(hug, k, [570, stand - 120], "b"); return hug; }
          return st;
        }
        function himRaw(s) {
          const st = standOn(HE, -1, FL); st.head = 4;
          // picks each flag: walks a little to it, bends, smells it, smiles
          for (let k = 0; k < ACTS.length; k++) {
            const t0 = ACTS[k] + PICK, q = hold(s, t0, t0 + 0.6, 0.2);
            if (q > 0) { st.hx -= 90 * q; st.ax -= 90 * q; st.bx -= 90 * q; st.torso += 30 * q; reachTo(st, q, [FLAGX[k] + 40, FL - 120]); }
          }
          // holds the growing bouquet against his chest
          const nb = ACTS.filter((a) => s > a + PICK + 0.5).length;
          if (nb > 0) reachTo(st, 1, [HE - 40, stand - 110], "b");
          const give = win(s, T_GIVE, T_GIVE + 0.3); if (give > 0) { st.hx -= 60 * give; st.ax -= 60 * give; st.bx -= 60 * give; reachTo(st, give, [SHE + 90, stand - 100], "b"); st.torso += 10 * give; }
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(HE - 60, 572, k), -1, FL); hug.torso = 4 * k; reachTo(hug, k, [530, stand - 130]); reachTo(hug, k, [544, stand - 100], "b"); return hug; }
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
          <div id="cm2" style="font-size:46px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"BEING DEEPLY LOVED BY SOMEONE<br/>GIVES YOU STRENGTH, WHILE LOVING<br/>SOMEONE DEEPLY GIVES YOU COURAGE."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">LAO TZU</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [[0, 1.9, 540, 440, 0], [6.4, 1.9, 540, 440, 0], [7.2, 2.3, 520, 430, 0], [99, 2.1, 540, 440, 0]];
        function camAt(s) { let i = 1; while (i < CK.length - 1 && s > CK[i][0]) i++; const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0])); return a.map((x, j) => lerp(x, b[j], k)); }

        function render(t) {
          const s = t;
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          ACTS.forEach((a) => hit(a + POP, 0.6, 0.15));
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // flags: pop out of the ground, then picked into his bouquet, then given to her
          flags.forEach((f, k) => {
            const tp = ACTS[k] + POP, tk = ACTS[k] + PICK + 0.3;
            if (s < tp) { f.g.setAttribute("opacity", 0); return; }
            f.g.setAttribute("opacity", 1);
            const wave = 6 * Math.sin(t * 6 + k);
            f.cloth.setAttribute("d", `M0 -110 Q24 ${-110 + wave} 50 -96 Q26 ${-82 - wave} 0 -76 Z`);
            let x, y, rot = 0, scl = 1;
            if (s < tk) { const q = backOut(clamp((s - tp) / 0.3, 0, 1)); x = FLAGX[k]; y = FL + 110 * (1 - q); }
            else {
              const hand = s < T_GIVE + 0.3 ? mp.hands[1] : hp.hands[1];
              const q = clamp((s - tk) / 0.3, 0, 1);
              x = lerp(FLAGX[k], hand[0], ease(q)); y = lerp(FL, hand[1] + 50, ease(q)); rot = lerp(0, (k - 1.5) * 12, q); scl = lerp(1, 0.8, q);
            }
            f.g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${scl.toFixed(3)})`);
          });
          const bq = s > T_BOUQ ? 1 : 0;
          ribbon.setAttribute("opacity", bq); const rh = s < T_GIVE + 0.3 ? mp.hands[1] : hp.hands[1];
          ribbon.setAttribute("transform", `translate(${r1(rh[0])} ${r1(rh[1] + 20)})`);
          // props of each red flag act
          phone.setAttribute("opacity", hold(s, ACTS[0], ACTS[0] + 1.2, 0.1)); phone.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])})`);
          keys.setAttribute("opacity", hold(s, ACTS[1], ACTS[1] + 0.9, 0.1)); keys.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])})`);
          fries.setAttribute("opacity", hold(s, ACTS[3] - 0.1, ACTS[3] + 1.2, 0.1)); fries.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1] + 10)})`);
          steam.forEach((p, i) => { const q = frac(t * 2 + i / 2), on = s > ACTS[2] && s < ACTS[2] + 1.2; p.setAttribute("d", `M${r1(hp.head[0] + (i ? 24 : -24))} ${r1(hp.head[1] - 30 - 40 * q)} q8 -10 0 -20`); p.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          ACTS.forEach((a, k) => bub(bSay[k], a, a + 1.0, [hp.head[0] + 20, hp.head[1] - 110]));
          bub(bAww, T_GASP, T_HUG + 0.3, [hp.head[0] - 20, hp.head[1] - 110]);
          // little hearts when he smells each flag
          smallH.forEach((h, k) => { const q = clamp((s - ACTS[k] - PICK - 0.4) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(mp.head[0] + 10)} ${r1(mp.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (0.8 * win(s, T_GIVE, T_GIVE + 0.8)).toFixed(3));

          E("h1").innerHTML = slam(["SHE", "HAD", "RED", "FLAGS."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, [2, 3]);
          E("h2").innerHTML = slam(["HE", "MADE", "A", "BOUQUET."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOVE", "THEM"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["FLAGS", "AND", "ALL."], [T_CARD + 0.7, T_CARD + 0.85, T_CARD + 1.0], t, [0]);
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
