        // ---------- "that time of the month": she's curled up on the sofa with cramps (red pain zigzags). He comes home, sees her, and without a word fetches a hot water bottle, a blanket, then tea and chocolate; finally he sits down and rubs her back, she leans on him and smiles; heart ----------
        // remake of a 3.08M-view short (Aesthetic Asmr, "Wife Ke Periods Mein Husband Ne Jo Kiya"), see viral/2026-11-09-check.md
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

        const T_IN = 0.9, T_SEE = 1.5, F1 = 1.9, F2 = 3.4, F3 = 4.9, T_CHOC = 6.4, T_SIT = 7.0, T_RUB = 7.5, T_HEART = 8.3;
        const T_H1 = 9.1, T_H2 = 9.9, T_CARD = 11.4;
        const SHE = 590, SIDE = 790, CTR = 960;
        svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 2000, fill: "#262230" }, backG);
        svgEl("circle", { cx: 420, cy: FL - 380, r: 420, fill: "url(#fireGlow)", opacity: 0.35 }, backG);
        svgEl("rect", { x: 300, y: FL - 400, width: 140, height: 170, fill: "#1a2232", stroke: "#000", "stroke-width": 6 }, backG);
        svgEl("circle", { cx: 395, cy: FL - 350, r: 18, fill: "#f3efd8" }, backG);
        // sofa
        svgEl("rect", { x: 470, y: FL - 230, width: 300, height: 130, rx: 30, fill: "#7a4a6a", stroke: "#000", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 450, y: FL - 120, width: 340, height: 90, rx: 20, fill: "#8e5a7e", stroke: "#000", "stroke-width": 6 }, backG);
        for (const x of [440, 780]) svgEl("rect", { x: x - 22, y: FL - 170, width: 44, height: 140, rx: 18, fill: "#7a4a6a", stroke: "#000", "stroke-width": 6 }, backG);
        for (const x of [470, 770]) svgEl("rect", { x: x - 6, y: FL - 30, width: 12, height: 30, fill: "#3a2416" }, backG);
        // kitchen counter on the right
        svgEl("rect", { x: 900, y: FL - 190, width: 220, height: 190, fill: "#5a4030", stroke: "#000", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 890, y: FL - 200, width: 240, height: 16, fill: "#d9d0c0", stroke: "#000", "stroke-width": 5 }, backG);
        const fxBack = svgEl("g", {}, W); W.insertBefore(fxBack, figG);
        // props
        const mk = (p) => { const g = svgEl("g", { opacity: 0 }, fxG); p(g); return g; };
        const bottle = mk((g) => { svgEl("rect", { x: -26, y: -20, width: 52, height: 40, rx: 16, fill: "#e0503a", stroke: "#000", "stroke-width": 4 }, g); svgEl("rect", { x: -8, y: -30, width: 16, height: 12, fill: "#c03a2a", stroke: "#000", "stroke-width": 3 }, g); });
        const mug = mk((g) => { svgEl("rect", { x: -14, y: -16, width: 28, height: 32, rx: 4, fill: "#f2f2f2", stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: "M14 -8 q12 0 12 8 q0 8 -12 8", fill: "none", stroke: "#000", "stroke-width": 4 }, g); });
        const choc = mk((g) => { svgEl("rect", { x: -18, y: -10, width: 36, height: 20, rx: 3, fill: "#5a3420", stroke: "#000", "stroke-width": 4 }, g); svgEl("rect", { x: -18, y: -10, width: 14, height: 20, fill: "#d62a2a", stroke: "#000", "stroke-width": 3 }, g); });
        const blanketHeld = mk((g) => { svgEl("rect", { x: -40, y: -26, width: 80, height: 52, rx: 10, fill: "#5a8ac8", stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: "M-40 -8 H40 M-40 8 H40", stroke: "#3a6aa8", "stroke-width": 4 }, g); });
        const blanket = svgEl("path", { fill: "#5a8ac8", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, fxG);
        const steam = Array.from({ length: 2 }, () => svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const pain = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, fxG));
        const bag = mk((g) => { svgEl("rect", { x: -24, y: 0, width: 48, height: 40, rx: 6, fill: "#3a3a3a", stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: "M-10 0 V-10 H10 V0", fill: "none", stroke: "#000", "stroke-width": 4 }, g); });
        const herG = svgEl("g", {}, figG);
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, herG);
        const her = makeFig(herG, "#ffffff", "#e2e2e2", true, "her");
        herG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 3 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bang = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 60, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0, "text-anchor": "middle" }, fxG); bang.textContent = "!";
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bOw = bubble("OWW...", 150, 30, "#ff3b30"), bThanks = bubble("THANK YOU.", 210);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => { const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1; if (q < 0.5) return [hx + d * STR * (0.25 - q), FL]; const ss = (q - 0.5) / 0.5; return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift]; });
        }
        const walking = (x0, x, f) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 6, head: 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 20 * sw, ael: 20, bsh: -4 - 20 * sw, bel: 20 }); };
        const curl = (s) => 1 - win(s, T_RUB, T_RUB + 0.8);
        function herRaw(s) {
          const c = curl(s);
          const st = base({ hx: SHE, hy: FL - 128, torso: lerp(8, 34, c), head: lerp(-2, 18, c), ax: SHE + 70, ay: FL, bx: SHE + 56, by: FL - 2 });
          reachTo(st, 1, [SHE + 34, FL - 150]); reachTo(st, 1, [SHE + 24, FL - 140], "b");
          const mugK = win(s, F3 + 0.9, F3 + 1.2); reachTo(st, mugK, [SHE + 60, FL - 210]);
          const chK = win(s, T_CHOC + 0.1, T_CHOC + 0.4); reachTo(st, chK * (1 - win(s, T_RUB, T_RUB + 0.4)), [SHE + 50, FL - 180], "b");
          const lean = win(s, T_RUB, T_RUB + 0.8); st.hx += 8 * lean; st.head -= 14 * lean; st.torso += 10 * lean;
          st.hy += 2 * Math.sin(s * 30) * c * (s < T_SEE + 1 ? 1 : 0.4);
          return st;
        }
        const fetch = (s, F) => { // walk to the counter, grab, walk back, give: returns [x, phase]
          if (s < F) return null;
          const a = F, b = F + 0.45, c = F + 0.65, d = F + 1.1, e = F + 1.45;
          if (s < b) return [lerp(SIDE, CTR, (s - a) / 0.45), "out"];
          if (s < c) return [CTR, "grab"];
          if (s < d) return [lerp(CTR, SIDE, (s - c) / 0.45), "back"];
          if (s < e) return [SIDE, "give"];
          return null;
        };
        function himRaw(s) {
          if (s < T_SEE) { const x = lerp(1200, SIDE + 40, win(s, T_IN, T_SEE)); const st = s < T_SEE - 0.05 ? walking(1200, x, -1) : standOn(x, -1, FL); reachTo(st, 1, [x + 20, stand + 20], "b"); return st; }
          let ph = null; for (const F of [F1, F2, F3]) { const r = fetch(s, F); if (r) ph = r; }
          if (s >= T_SIT) {
            const sitK = win(s, T_SIT, T_SIT + 0.4); const x = lerp(SIDE, 735, sitK);
            const sit = base({ hx: x, hy: FL - 128, torso: -6, head: 10, ax: x - 70, ay: FL, bx: x - 56, by: FL - 2 });
            const rub = win(s, T_RUB, T_RUB + 0.3); reachTo(sit, rub, [SHE - 6 + 10 * Math.sin(s * 5), FL - 260 + 30 * Math.sin(s * 5)]); reachTo(sit, 1, [x - 30, FL - 150], "b");
            return mixPose(standOn(SIDE, -1, FL), sit, sitK);
          }
          if (ph && ph[1] !== "give" && ph[1] !== "grab") { const dir = ph[1] === "out" ? 1 : -1; const st = walking(SIDE, ph[0], dir); if (ph[1] === "back") reachTo(st, 1, [ph[0] - 40, stand - 100]); return st; }
          const x = ph ? ph[0] : SIDE + (s < F1 ? 40 * (1 - win(s, T_SEE + 0.1, F1)) : 0);
          const st = standOn(x, ph && ph[1] === "grab" ? 1 : -1, FL); st.head = 8;
          if (ph && ph[1] === "grab") reachTo(st, 1, [CTR + 40, FL - 210]);
          if (ph && ph[1] === "give") { st.torso += 20; reachTo(st, 1, [lerp(SIDE - 60, SHE + 70, 0.7), FL - 190]); }
          const choc = hold(s, T_CHOC - 0.3, T_CHOC + 0.5, 0.15); if (choc > 0) { st.torso += 18 * choc; reachTo(st, choc, [SHE + 90, FL - 190]); }
          return st;
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
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"HE CAN'T TAKE THE PAIN AWAY.<br/>BUT HE CAN STAY."</div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function render(t) {
          const s = t;
          const cs = 1.9 * (1 + 0.08 * win(s, T_RUB, T_HEART + 1.0));
          cam.setAttribute("transform", `translate(540 1180) scale(${cs.toFixed(4)}) translate(${r1(-lerp(730, 680, win(s, T_SIT, T_SIT + 1)))} -430)`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const sit = s >= T_SIT;
          let hf = -1; for (const F of [F1, F2, F3]) { const r = fetch(s, F); if (r && (r[1] === "out" || r[1] === "grab")) hf = 1; }
          const mp = drawFig(him, livePose(himRaw, s, 0.3), sit ? -1 : hf);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // props: in his hand while he carries them, then with her
          const carry = (F) => s > F + 0.5 && s < F + 1.45;
          const hand = mp.hands[0];
          const place = (g, F, after) => { g.setAttribute("opacity", s > F + 0.5 ? 1 : 0); const p = carry(F) ? hand : after; g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])})`); };
          place(bottle, F1, [SHE + 36, FL - 140]);
          blanketHeld.setAttribute("opacity", carry(F2) ? 1 : 0); blanketHeld.setAttribute("transform", `translate(${r1(hand[0])} ${r1(hand[1])})`);
          const bk = win(s, F2 + 1.3, F2 + 1.6);
          blanket.setAttribute("opacity", bk > 0 ? 1 : 0);
          blanket.setAttribute("d", `M${SHE - 34} ${r1(FL - 170 + 60 * (1 - bk))} Q${SHE + 30} ${FL - 190} ${SHE + 96} ${FL - 160} L${SHE + 104} ${FL - 40} Q${SHE + 40} ${FL - 26} ${SHE - 40} ${FL - 60} Z`);
          place(mug, F3, hp.hands[0]);
          if (!carry(F3) && s > F3 + 1.2) mug.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1] - 10)})`);
          steam.forEach((p, i) => { const q = frac(t * 1.6 + i / 2), m = s > F3 + 0.5 ? (carry(F3) ? hand : hp.hands[0]) : [0, 0]; p.setAttribute("d", `M${r1(m[0] - 6 + i * 10)} ${r1(m[1] - 30 - 30 * q)} q8 -10 0 -20`); p.setAttribute("opacity", s > F3 + 0.5 ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          choc.setAttribute("opacity", s > T_CHOC - 0.3 && s < T_RUB + 0.2 ? 1 : 0);
          const cp = s < T_CHOC + 0.2 ? mp.hands[0] : hp.hands[1]; choc.setAttribute("transform", `translate(${r1(cp[0])} ${r1(cp[1])})`);
          bag.setAttribute("opacity", s < T_SEE + 0.2 ? 1 : 0); bag.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1])})`);
          // pain zigzags around her belly, fading as he takes care of her
          const pk = 1 - win(s, T_CHOC, T_RUB + 0.6);
          pain.forEach((p, i) => { const a = -0.9 + i * 0.9, r = 60 + 8 * Math.sin(t * 20 + i), cx = SHE + 30 + Math.cos(a) * r, cy = FL - 150 + Math.sin(a) * r; p.setAttribute("d", `M${r1(cx)} ${r1(cy)} l8 -10 l6 12 l8 -12`); p.setAttribute("opacity", (pk * (0.6 + 0.4 * Math.sin(t * 12 + i))).toFixed(3)); });
          const b = clamp((s - T_SEE) / 0.2, 0, 1) * (1 - win(s, T_SEE + 0.8, T_SEE + 1.1)); bang.setAttribute("opacity", b); bang.setAttribute("x", r1(mp.head[0])); bang.setAttribute("y", r1(mp.head[1] - 60));
          const bub = (g, a, b2, p) => { const k = hold(s, a, b2, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bOw, 0.2, T_SEE + 0.4, [hp.head[0] - 30, hp.head[1] - 110]);
          bub(bThanks, T_RUB + 0.1, T_HEART + 0.05, [hp.head[0] - 40, hp.head[1] - 110]);
          smallH.forEach((h, k) => { const q = clamp((s - T_CHOC - 0.2 - k * 0.15) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(hp.head[0] + 20 - k * 20)} ${r1(hp.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HEART) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          label.textContent = "";
          E("h1").innerHTML = slam(["SHE", "HAD", "CRAMPS."], [T_H1, T_H1 + 0.13, T_H1 + 0.26], t, [2]);
          E("h2").innerHTML = slam(["HE", "DIDN'T", "ASK.", "HE", "JUST", "CARED."], [T_H2, T_H2 + 0.12, T_H2 + 0.24, T_H2 + 0.5, T_H2 + 0.62, T_H2 + 0.74], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["CARE", "WITHOUT"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["BEING", "ASKED."], [T_CARD + 0.7, T_CARD + 0.85], t, [1]);
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
