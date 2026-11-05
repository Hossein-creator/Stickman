        // ---------- "taken for granted": she scrolls her phone and never looks up. He puts his jacket on her, holds the umbrella over her in the rain (and gets soaked), gives her his last fries, says "I LOVE YOU." - "MHM." He lowers his head and walks away with the umbrella. The rain hits her, she finally looks up: "BABE?" - he's gone. The phone drops ----------
        // remake of a 5.2x outlier (Everyday Backfire, "She took Marcus's sacrifices for granted"), see viral/2026-11-05-check.md
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

        const T_JACK = 0.6, T_RAIN = 2.0, T_UMB = 2.2, T_FRIES = 3.8, T_LOVE = 5.2, T_MHM = 5.9, T_DOWN = 6.2, T_GO = 6.7, T_OUT = 8.0;
        const T_WET = 7.3, T_LOOK = 7.7, T_TURN = 8.2, T_DROP = 8.7;
        const T_H1 = 9.3, T_H2 = 10.2, T_CARD = 11.2;
        const SHE = 470, HE = 630;

        const glowC = svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.25 }, backG);
        svgEl("polygon", { points: `460,${FL - 520} 660,${FL - 520} 780,${FL} 340,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        // street lamp
        svgEl("line", { x1: 300, y1: FL, x2: 300, y2: FL - 420, stroke: "#000", "stroke-width": 14 }, backG);
        svgEl("line", { x1: 300, y1: FL, x2: 300, y2: FL - 420, stroke: "#4a4a52", "stroke-width": 8 }, backG);
        svgEl("path", { d: `M300 ${FL - 420} Q330 ${FL - 440} 350 ${FL - 410}`, fill: "none", stroke: "#4a4a52", "stroke-width": 8 }, backG);
        svgEl("circle", { cx: 350, cy: FL - 400, r: 14, fill: "#ffe2a0", stroke: "#000", "stroke-width": 4 }, backG);
        svgEl("circle", { cx: 350, cy: FL - 400, r: 120, fill: "url(#fireGlow)", opacity: 0.35 }, backG);

        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const jacket = svgEl("path", { fill: "#2f4a7a", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, fxG);
        const jline = svgEl("line", { stroke: "#1d2f52", "stroke-width": 4 }, fxG);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, fxG);
        const phoneGlow = svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        const fries = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-14 0 L14 0 L18 -26 L-18 -26 Z", fill: "#e0303a", stroke: "#000", "stroke-width": 3 }, fries);
        for (let i = -2; i <= 2; i++) svgEl("rect", { x: i * 6 - 2, y: -44 + Math.abs(i) * 4, width: 5, height: 22, fill: "#ffd25a", stroke: "#000", "stroke-width": 1.5 }, fries);
        const umb = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-110 0 Q0 -80 110 0 Q80 -10 55 0 Q27 -10 0 0 Q-27 -10 -55 0 Q-80 -10 -110 0 Z", fill: "#e0303a", stroke: "#000", "stroke-width": 5 }, umb);
        svgEl("line", { x1: 0, y1: -40, x2: 0, y2: 110, stroke: "#000", "stroke-width": 5 }, umb);
        const rain = Array.from({ length: 36 }, (_, i) => ({ x: 250 + ((i * 47) % 700), o: (i * 0.31) % 1, el: svgEl("line", { stroke: "#7d93b5", "stroke-width": 3, opacity: 0 }, fxG) }));
        const shiv = Array.from({ length: 2 }, () => svgEl("path", { fill: "none", stroke: "#bfe0ff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const broken = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 L-6 -6 L4 4 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, broken);
        svgEl("path", { d: "M2 18 C42 -8 32 -40 2 -22 L-4 -6 L6 4 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, transform: "translate(8 2) rotate(8)" }, broken);
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bLove = bubble("I LOVE YOU.", 230), bMhm = bubble("MHM.", 120, 30, "#888"), bBabe = bubble("BABE?", 140);

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 10, head: 20, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 20 * sw, ael: 20, bsh: -4 - 20 * sw, bel: 20 }); };
        function herRaw(s) {
          const st = standOn(SHE, 1, FL); st.head = 22; st.torso = 4;
          const ph = 1 - win(s, T_DROP - 0.1, T_DROP + 0.1);
          reachTo(st, ph, [SHE + 44, stand - 118]); reachTo(st, ph, [SHE + 36, stand - 112], "b");
          const fr = hold(s, T_FRIES + 0.3, T_LOVE, 0.2); if (fr > 0) { const c = 0.5 - 0.5 * Math.cos((s - T_FRIES - 0.3) * 2 * Math.PI * 1.2); reachTo(st, fr, [lerp(SHE + 60, SHE + 30, c), lerp(stand - 90, stand - 140, c)], "b"); }
          const wet = win(s, T_WET, T_WET + 0.3); st.hx += 2 * Math.sin(t0 * 50) * wet;
          const look = win(s, T_LOOK, T_LOOK + 0.3); st.head = lerp(st.head, -6, look); st.torso = lerp(st.torso, -2, look);
          return st;
        }
        let t0 = 0;
        function himRaw(s) {
          if (s > T_GO) { const x = lerp(HE, 1150, clamp((s - T_GO) / (T_OUT - T_GO), 0, 1)); const p = walking(HE, x); reachTo(p, 1, [x + 6, stand - 205]); return p; }
          const st = standOn(HE, -1, FL); st.head = 4;
          const jk = hold(s, T_JACK, T_JACK + 0.8, 0.25); reachTo(st, jk, [SHE + 40, stand - 150]); reachTo(st, jk, [SHE + 60, stand - 145], "b"); st.torso += 10 * jk;
          const cold2 = win(s, T_JACK + 0.6, T_JACK + 1.0); st.hx += 2.5 * Math.sin(t0 * 55) * cold2 * (s < T_UMB ? 1 : 0.4);
          const um = win(s, T_UMB, T_UMB + 0.35); reachTo(st, um, [SHE + 90, stand - 215]);
          const fr = hold(s, T_FRIES, T_FRIES + 0.6, 0.2); reachTo(st, fr, [SHE + 80, stand - 95], "b");
          const lv = hold(s, T_LOVE, T_MHM + 0.2, 0.15); st.head -= 10 * lv;
          const dn = win(s, T_DOWN, T_DOWN + 0.4); st.head += 28 * dn; st.torso += 8 * dn;
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
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"DON'T IT ALWAYS SEEM TO GO<br/>THAT YOU DON'T KNOW WHAT<br/>YOU'VE GOT TILL IT'S GONE."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">JONI MITCHELL</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const herDir = (s) => (s > T_TURN && s < T_TURN + 0.5 ? -1 : 1);
        const himDir = (s) => (s > T_GO ? 1 : -1);
        function render(t) {
          const s = t; t0 = t;
          const cs = 1.9 * (s > T_GO ? 1 + 0.12 * ease(clamp((s - T_GO) / 2.5, 0, 1)) : 1), cx = lerp(550, SHE + 20, ease(clamp((s - T_GO) / 2.0, 0, 1))), cy = 440;
          cam.setAttribute("transform", `translate(540 1180) scale(${cs.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himDir(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herDir(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // jacket: on him, then over her shoulders
          const onHer = s > T_JACK + 0.45;
          const jh = onHer ? hp.head : mp.head, jw = onHer ? 1 : 0.9;
          jacket.setAttribute("d", `M${r1(jh[0] - 40 * jw)} ${r1(jh[1] + 40)} Q${r1(jh[0])} ${r1(jh[1] + 26)} ${r1(jh[0] + 40 * jw)} ${r1(jh[1] + 40)} L${r1(jh[0] + 50 * jw)} ${r1(jh[1] + 140)} L${r1(jh[0] - 50 * jw)} ${r1(jh[1] + 140)} Z`);
          jline.setAttribute("x1", r1(jh[0])); jline.setAttribute("x2", r1(jh[0])); jline.setAttribute("y1", r1(jh[1] + 40)); jline.setAttribute("y2", r1(jh[1] + 140));
          // phone (falls at the end)
          let pp = [(hp.hands[0][0] + hp.hands[1][0]) / 2, (hp.hands[0][1] + hp.hands[1][1]) / 2 - 10], pr = 0;
          if (s > T_DROP) { const q = clamp((s - T_DROP) / 0.4, 0, 1); pp = [SHE + 40, lerp(stand - 120, FL - 6, q * q)]; pr = 90 * q; }
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])}) rotate(${r1(pr)})`);
          phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1])); phoneGlow.setAttribute("opacity", s < T_DROP ? 0.35 : 0.1);
          // fries: his hand to hers, gone after she eats them
          fries.setAttribute("opacity", s > T_FRIES - 0.2 && s < T_LOVE ? 1 : 0);
          const fh = s < T_FRIES + 0.35 ? mp.hands[1] : hp.hands[1];
          fries.setAttribute("transform", `translate(${r1(fh[0])} ${r1(fh[1] + 10)})`);
          // umbrella over her, then it leaves with him
          umb.setAttribute("opacity", s > T_UMB ? 1 : 0);
          const uh = mp.hands[0];
          umb.setAttribute("transform", `translate(${r1(uh[0] - (s < T_GO ? 70 : 0))} ${r1(uh[1] - 10)})`);
          const ucx = uh[0] - (s < T_GO ? 70 : 0), ucy = uh[1] - 10;
          rain.forEach((d) => { const p = frac(t * 1.7 + d.o), y = FL - 520 + p * 540; const under = s > T_UMB + 0.2 && Math.abs(d.x - ucx) < 105 && y > ucy - 30; d.el.setAttribute("x1", d.x); d.el.setAttribute("y1", r1(y)); d.el.setAttribute("x2", d.x - 6); d.el.setAttribute("y2", r1(y + 26)); d.el.setAttribute("opacity", s > T_RAIN && !under ? (0.6 * win(s, T_RAIN, T_RAIN + 0.4)).toFixed(3) : 0); });
          cold.setAttribute("opacity", (0.4 * win(s, T_RAIN, T_RAIN + 0.6)).toFixed(3));
          glowC.setAttribute("opacity", (0.25 - 0.15 * win(s, T_RAIN, T_RAIN + 0.6)).toFixed(3));
          // shivering: him first (no jacket), her at the end
          shiv.forEach((p, i) => { const who = s < T_GO ? mp : hp, on = s < T_GO ? win(s, T_JACK + 0.6, T_JACK + 1.0) * (s < T_UMB ? 1 : 0.5) : win(s, T_WET, T_WET + 0.3); const sd = i ? 1 : -1; p.setAttribute("d", `M${r1(who.head[0] + sd * 52)} ${r1(who.head[1] - 10)} l${sd * 8} 8 l${-sd * 8} 8 l${sd * 8} 8 l${-sd * 8} 8`); p.setAttribute("opacity", (on * (0.6 + 0.4 * Math.sin(t * 20 + i))).toFixed(3)); });
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bLove, T_LOVE, T_MHM + 0.1, [mp.head[0] + 30, mp.head[1] - 140]);
          bub(bMhm, T_MHM, T_DOWN + 0.4, [hp.head[0] - 40, hp.head[1] - 110]);
          bub(bBabe, T_LOOK + 0.1, T_DROP + 0.4, [hp.head[0] - 30, hp.head[1] - 110]);
          const bq = clamp((s - T_DOWN - 0.2) / 0.4, 0, 1);
          broken.setAttribute("opacity", s > T_DOWN + 0.2 && s < T_GO + 0.6 ? (1 - win(s, T_GO + 0.2, T_GO + 0.6)).toFixed(3) : 0);
          broken.setAttribute("transform", `translate(${r1(mp.head[0])} ${r1(mp.head[1] - 120)}) scale(${(0.8 * backOut(bq)).toFixed(3)})`);

          E("h1").innerHTML = slam(["SHE", "TOOK", "HIM", "FOR", "GRANTED."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.39, T_H1 + 0.52], t, []);
          E("h2").innerHTML = slam(["UNTIL", "HE", "WAS", "GONE."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["APPRECIATE"], [T_CARD], t, []);
          E("cm2").innerHTML = slam(["WHO", "SHOWS", "UP."], [T_CARD + 0.7, T_CARD + 0.85, T_CARD + 1.0], t, [1, 2]);
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
