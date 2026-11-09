        // ---------- "can't reach": she jumps for the cookie jar on the top shelf and can't reach it, "ARGH!". He walks in, "NEED HELP?", she crosses her arms "NO." and jumps again... then he lifts her up by the waist; she grabs the jar, gets set down, gives him the first cookie; heart ----------
        // remake of a 5.15M-view short (Nomi Femi, "Wife's hand can't reach"), see viral/2026-11-09-check.md
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

        const J = [0.9, 1.6, 2.3, 5.5], T_ARGH = 2.75, T_IN = 2.3, T_HELP = 3.7, T_NO = 4.7, T_GRAB = 6.1, T_LIFT = 6.4, T_JAR = 7.2, T_DOWN = 7.7, T_GIVE = 8.6, T_EAT = 9.1, T_HEART = 9.4;
        const T_H1 = 10.0, T_H2 = 10.8, T_CARD = 11.8;
        const SHE = 620, JARX = 700, SHELF = FL - 470;

        // kitchen
        svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 2000, fill: "#2a2522" }, backG);
        svgEl("circle", { cx: 640, cy: FL - 420, r: 520, fill: "url(#fireGlow)", opacity: 0.28 }, backG);
        for (let i = 0; i < 14; i++) svgEl("rect", { x: 200 + (i % 7) * 70, y: FL - 300 + Math.floor(i / 7) * 46, width: 66, height: 42, fill: "#3a3330", stroke: "#2a2522", "stroke-width": 4 }, backG);
        svgEl("rect", { x: 800, y: FL - 190, width: 300, height: 190, fill: "#6b4a30", stroke: "#000", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 790, y: FL - 200, width: 320, height: 18, fill: "#d9d0c0", stroke: "#000", "stroke-width": 5 }, backG);
        svgEl("rect", { x: 520, y: SHELF, width: 360, height: 18, fill: "#8a5a3a", stroke: "#000", "stroke-width": 5 }, backG);
        for (const x of [540, 860]) svgEl("path", { d: `M${x} ${SHELF + 18} l0 30 l-20 -30 z`, fill: "#6b4a30", stroke: "#000", "stroke-width": 4 }, backG);
        for (const [x, c] of [[570, "#5aa0c8"], [610, "#e8e8e8"], [820, "#c86a5a"]]) { svgEl("rect", { x: x - 16, y: SHELF - 40, width: 32, height: 40, rx: 5, fill: c, stroke: "#000", "stroke-width": 4 }, backG); }
        const jar = svgEl("g", {}, fxG);
        svgEl("rect", { x: -34, y: -86, width: 68, height: 86, rx: 14, fill: "#cfe6f0", "fill-opacity": 0.55, stroke: "#000", "stroke-width": 5 }, jar);
        svgEl("rect", { x: -26, y: -98, width: 52, height: 14, rx: 4, fill: "#d4af37", stroke: "#000", "stroke-width": 4 }, jar);
        for (const [x, y] of [[-14, -20], [10, -26], [-4, -46], [14, -56], [-16, -66]]) svgEl("circle", { cx: x, cy: y, r: 11, fill: "#b07a3a", stroke: "#000", "stroke-width": 3 }, jar);
        const cookie = svgEl("g", { opacity: 0 }, fxG);
        svgEl("circle", { r: 13, fill: "#b07a3a", stroke: "#000", "stroke-width": 3 }, cookie);
        for (const [x, y] of [[-4, -4], [5, 2], [-2, 6]]) svgEl("circle", { cx: x, cy: y, r: 2.5, fill: "#3a2416" }, cookie);
        const bite = svgEl("circle", { r: 7, fill: "#2a2522", opacity: 0 }, fxG);

        const herG = svgEl("g", {}, figG);
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, herG);
        const her = makeFig(herG, "#ffffff", "#e2e2e2", true, "her");
        herG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 3 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const steamA = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bArgh = bubble("ARGH!", 140, 32, "#ff3b30"), bHelp = bubble("NEED HELP?", 220), bNo = bubble("NO.", 110, 32), bCrunch = bubble("CRUNCH!", 180);

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => { const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1; if (q < 0.5) return [hx + d * STR * (0.25 - q), FL]; const ss = (q - 0.5) / 0.5; return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift]; });
        }
        const walking = (x0, x, f) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 6, head: 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 20 * sw, ael: 20, bsh: -4 - 20 * sw, bel: 20 }); };
        const jumpY = (s) => { let y = 0; for (const j of J) { const q = (s - j) / 0.5; if (q > 0 && q < 1) y = Math.max(y, 70 * Math.sin(Math.PI * q)); } return y; };
        const liftY = (s) => 150 * win(s, T_LIFT, T_LIFT + 0.6) * (1 - win(s, T_DOWN, T_DOWN + 0.6));
        function herRaw(s) {
          const st = standOn(SHE, 1, FL); st.head = -30;
          const up = 1 - hold(s, T_NO - 0.2, J[3] - 0.1, 0.2) - hold(s, T_DOWN + 0.3, 14, 0.3);
          reachTo(st, up, [JARX - 20, SHELF + 40]); reachTo(st, up * 0.6, [JARX - 40, SHELF + 70], "b");
          const toe = up * (s < T_GRAB ? 1 : 0); st.hy -= 14 * toe; st.ay -= 14 * toe; st.by -= 10 * toe;
          const cross = hold(s, T_NO - 0.2, J[3] - 0.1, 0.2); reachTo(st, cross, [SHE + 26, stand - 104]); reachTo(st, cross, [SHE + 14, stand - 98], "b"); st.head += 30 * cross;
          const y = jumpY(s) + liftY(s); st.hy -= y; st.ay -= y; st.by -= y; if (y > 1) { st.ay += 6; st.bx -= 10; }
          if (s > T_DOWN + 0.3) { const x = lerp(SHE, SHE + 100, win(s, T_DOWN + 0.3, T_DOWN + 0.8)); const f = lerp(1, -1, win(s, T_DOWN + 0.4, T_DOWN + 0.7)); const t2 = standOn(x, f, FL); t2.head = lerp(-30, -4, win(s, T_DOWN + 0.3, T_DOWN + 0.7)); reachTo(t2, 1, [x + 28, stand - 40], "b"); reachTo(t2, hold(s, T_GIVE, 14, 0.25), [x - 95, stand - 140]); return t2; }
          return st;
        }
        function himRaw(s) {
          if (s < T_IN) return walking(200, 200, 1);
          const HX = s < T_GRAB - 0.5 ? lerp(240, 470, win(s, T_IN, T_IN + 1.2)) : lerp(470, SHE - 55, win(s, T_GRAB - 0.5, T_GRAB));
          const moving = (s > T_IN && s < T_IN + 1.2) || (s > T_GRAB - 0.5 && s < T_GRAB);
          const st = moving ? walking(240, HX, 1) : standOn(HX, 1, FL); st.head = 4;
          const grin = hold(s, T_HELP, T_GRAB - 0.5, 0.2); st.head -= 10 * grin; reachTo(st, grin, [HX + 10, stand - 60]); reachTo(st, grin, [HX - 10, stand - 50], "b");
          const lk = win(s, T_GRAB, T_GRAB + 0.3) * (1 - win(s, T_DOWN + 0.6, T_DOWN + 0.9)), y = liftY(s);
          reachTo(st, lk, [SHE - 14, stand - 20 - y]); reachTo(st, lk, [SHE - 4, stand - 10 - y], "b"); st.torso += 6 * lk; st.hy += 10 * lk;
          const eat = hold(s, T_GIVE + 0.2, 14, 0.25); reachTo(st, eat, [SHE + 20, stand - 140]); st.head -= 10 * eat;
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
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"WE RISE BY<br/>LIFTING OTHERS."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ROBERT INGERSOLL</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function render(t) {
          const s = t;
          const cs = 1.85 * (1 + 0.07 * win(s, T_LIFT, T_JAR + 0.4) * (1 - win(s, T_DOWN, T_DOWN + 0.6))) * (1 + 0.06 * win(s, T_GIVE, T_HEART + 1.0));
          cam.setAttribute("transform", `translate(540 1180) scale(${cs.toFixed(4)}) translate(${r1(-lerp(600, 560, win(s, T_IN, T_IN + 1.2)))} ${r1(-lerp(420, 440, win(s, T_DOWN, T_DOWN + 0.6)))})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), lerp(1, -1, win(s, T_DOWN + 0.4, T_DOWN + 0.7)));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hf = lerp(1, -1, win(s, T_DOWN + 0.4, T_DOWN + 0.7));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * hf)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          him.g.setAttribute("opacity", s < T_IN ? 0 : 1);
          // jar: on the shelf until she grabs it, then in her hands
          const jp = s < T_JAR ? [JARX, SHELF] : s > T_DOWN + 0.3 ? [hp.hands[1][0], hp.hands[1][1] + 40] : [(hp.hands[0][0] + hp.hands[1][0]) / 2 + 10, Math.max(hp.hands[0][1], hp.hands[1][1]) + 40];
          jar.setAttribute("transform", `translate(${r1(jp[0])} ${r1(jp[1])}) rotate(${s > T_JAR ? r1(6 * Math.sin(s * 5)) : 0})`);
          const ck = s > T_GIVE ? (s < T_EAT ? hp.hands[0] : mp.hands[0]) : null;
          cookie.setAttribute("opacity", ck && s < T_EAT + 0.6 ? 1 : 0); if (ck) cookie.setAttribute("transform", `translate(${r1(ck[0])} ${r1(ck[1] - 6)})`);
          bite.setAttribute("opacity", ck && s > T_EAT && s < T_EAT + 0.6 ? 1 : 0); if (ck) { bite.setAttribute("cx", r1(ck[0] + 9)); bite.setAttribute("cy", r1(ck[1] - 12)); }
          steamA.forEach((p, i) => { const q = frac(t * 2 + i / 3); p.setAttribute("d", `M${r1(hp.head[0] - 20 + i * 20)} ${r1(hp.head[1] - 40 - 30 * q)} l0 -16`); p.setAttribute("opacity", (hold(s, T_ARGH - 0.2, T_IN + 0.9, 0.2) * Math.sin(Math.PI * q)).toFixed(3)); });
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bArgh, T_ARGH, T_IN + 0.9, [hp.head[0] - 90, hp.head[1] - 100]);
          bub(bHelp, T_HELP, T_NO, [mp.head[0] - 20, mp.head[1] - 110]);
          bub(bNo, T_NO, J[3], [hp.head[0] + 40, hp.head[1] - 110]);
          bub(bCrunch, T_EAT, T_HEART + 0.4, [mp.head[0] - 30, mp.head[1] - 110]);
          smallH.forEach((h, k) => { const q = clamp((s - T_JAR - 0.1 - k * 0.15) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(hp.head[0] - 20 + k * 20)} ${r1(hp.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HEART) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          label.textContent = "";
          E("h1").innerHTML = slam(["SHE", "COULDN'T", "REACH", "IT."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, [1]);
          E("h2").innerHTML = slam(["SO", "HE", "BECAME", "HER", "LADDER."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.39, T_H2 + 0.52], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LIFT", "EACH"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["OTHER", "UP."], [T_CARD + 0.7, T_CARD + 0.85], t, [1]);
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
