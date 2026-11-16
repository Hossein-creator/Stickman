        // ---------- "love is a blanket. #18": winner split-screen format. Snowy night, a park bench, one blanket. BOTH SHARE: he spreads it over both, she leans on his shoulder, warm glow (heart). ONE SHARES: he spreads it over both, she pulls all of it around herself and scrolls; he shivers, turns blue, snow piles on him; she never looks. FOLLOW: "+ FOLLOW" gets stitched into the blanket letter by letter, she taps it: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 660, SEAT = G - 104, HERX = 545, HIMX = 690;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_UNF = 0.3, T_SPREAD = 1.0, T_LEAN = 2.2, T_HEART = 5.4;
        const T_PULL = 2.0, T_SHIV = 3.0, T_BLUE = 4.0;
        const T_H2 = 8.6, T_H3 = 9.8;
        const T_CTA = 12.4, T_ST = 13.4, T_TAP = 15.4;

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const warm = svgEl("circle", { cx: 620, cy: G - 160, r: 330, fill: "url(#winGlow)", opacity: 0 }, inner);
          const beams = svgEl("g", {}, inner);
          svgEl("polygon", { points: `570,${PY0} 670,${PY0} 820,${G} 420,${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.26 }, beams);
          // street lamp
          svgEl("rect", { x: 940, y: G - 360, width: 12, height: 360, fill: "#2a2a30", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("path", { d: `M946 ${G - 360} Q946 ${G - 400} 900 ${G - 400}`, fill: "none", stroke: "#2a2a30", "stroke-width": 10 }, inner);
          svgEl("circle", { cx: 900, cy: G - 388, r: 16, fill: "#ffe2a8", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "#d8dce4" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#9aa2b2", "stroke-width": 4 }, inner);
          // bench
          svgEl("rect", { x: 470, y: SEAT, width: 300, height: 16, rx: 4, fill: "#6a5240", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("rect", { x: 466, y: SEAT - 4, width: 308, height: 6, fill: "#f2f4f8" }, inner);
          for (const x of [490, 740]) svgEl("rect", { x: x - 6, y: SEAT + 16, width: 12, height: G - SEAT - 16, fill: "#3a2e24", stroke: "#000", "stroke-width": 3 }, inner);
          const figs = svgEl("g", {}, inner);
          const blanket = svgEl("path", { stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, inner);
          const front = svgEl("g", {}, inner);
          const snow = Array.from({ length: 40 }, () => svgEl("circle", { r: 4, fill: "#fff", opacity: 0.8 }, inner));
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, warm, beams, figs, blanket, front, snow, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        top.blanket.setAttribute("fill", "url(#plaidT)"); bot.blanket.setAttribute("fill", "url(#plaidB)");

        // blanket shape: rounded quilt from x0..x1, y0..y1 with a soft wavy hem
        function quilt(x0, x1, y0, y1) {
          const r = Math.min(28, (x1 - x0) / 3);
          let d = `M${r1(x0)} ${r1(y0 + r)} Q${r1(x0)} ${r1(y0)} ${r1(x0 + r)} ${r1(y0)} L${r1(x1 - r)} ${r1(y0)} Q${r1(x1)} ${r1(y0)} ${r1(x1)} ${r1(y0 + r)} L${r1(x1 + 6)} ${r1(y1)}`;
          const n = 6; for (let i = n; i >= 0; i--) { const x = x0 - 6 + ((x1 - x0 + 12) * i) / n; d += ` L${r1(x)} ${r1(y1 + (i % 2 ? 10 : 0))}`; }
          return d + " Z";
        }
        const lerpQ = (a, b, q) => a.map((v, i) => lerp(v, b[i], q));
        const FOLD = (hx, hy) => [hx - 34, hx + 34, hy - 30, hy + 30];
        const BOTH = [HERX - 60, HIMX + 50, SEAT - 118, SEAT + 40];
        const HERS = [HERX - 62, HERX + 48, SEAT - 126, SEAT + 50];

        // ---------- poses (sitting, both face right) ----------
        const sit = (x, o) => base({ hx: x, hy: SEAT - 6, torso: 4, head: 6, ax: x + 66, ay: G, bx: x + 50, by: G, ...o });
        function topHim(t) {
          const st = sit(HIMX - 10 * win(t, T_LEAN, T_LEAN + 0.6));
          const sp = win(t, T_UNF, T_SPREAD + 0.4);
          const holdB = hold(t, T_UNF, T_SPREAD + 0.6, 0.3);
          reachTo(st, holdB, [lerp(HIMX + 40, HIMX + 20, sp), lerp(SEAT - 90, SEAT - 120, sp)]); reachTo(st, holdB, [lerp(HIMX + 30, HERX - 40, sp), lerp(SEAT - 80, SEAT - 120, sp)], "b");
          const arm = win(t, T_LEAN, T_LEAN + 0.6); reachTo(st, arm, [HERX + 20, SEAT - 120], "b");
          st.head = lerp(st.head, -4, arm);
          return st;
        }
        function topHer(t) {
          const lean = win(t, T_LEAN, T_LEAN + 0.6);
          const st = sit(HERX + 26 * lean, { torso: 4 + 14 * lean, head: 6 + 20 * lean });
          st.hx += 2 * Math.sin(t * 40) * (1 - win(t, T_SPREAD, T_SPREAD + 0.6));   // shivers before the blanket
          const tap = hold(t, T_TAP - 0.5, T_TAP + 0.3, 0.25);
          reachTo(st, tap, [HERX + 110, SEAT - 60]); st.head = lerp(st.head, 20, tap);
          return st;
        }
        function botHim(t) {
          const sh = win(t, T_SHIV, T_SHIV + 0.4);
          const st = sit(HIMX + 3 * Math.sin(t * 47) * sh, { torso: 4 + 16 * sh, head: 6 + 20 * win(t, T_BLUE, T_BLUE + 1.0) });
          const sp = win(t, T_UNF, T_SPREAD + 0.4);
          const holdB = hold(t, T_UNF, T_PULL + 0.2, 0.3);
          reachTo(st, holdB, [lerp(HIMX + 40, HIMX + 20, sp), lerp(SEAT - 90, SEAT - 120, sp)]); reachTo(st, holdB, [lerp(HIMX + 30, HERX - 40, sp), lerp(SEAT - 80, SEAT - 120, sp)], "b");
          // hugs himself
          reachTo(st, sh, [HIMX + 30, SEAT - 104]); reachTo(st, sh, [HIMX + 44, SEAT - 96], "b");
          return st;
        }
        function botHer(t) {
          const st = sit(HERX, { torso: 8, head: 26 + 2 * Math.sin(t * 1.3) });
          const pull = hold(t, T_PULL - 0.2, T_PULL + 0.6, 0.2);
          reachTo(st, 1 - pull, [HERX + 46, SEAT - 116]); reachTo(st, 1 - pull, [HERX + 40, SEAT - 110], "b");
          reachTo(st, pull, [HERX + 100 - 120 * win(t, T_PULL, T_PULL + 0.5), SEAT - 100]);
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.front);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.front);
        const capH = svgEl("ellipse", { rx: 26, ry: 8, fill: "#fff", stroke: "#9aa2b2", "stroke-width": 2, opacity: 0 }, bot.fx);
        const capS = svgEl("ellipse", { rx: 22, ry: 6, fill: "#fff", stroke: "#9aa2b2", "stroke-width": 2, opacity: 0 }, bot.fx);
        const puffs = Array.from({ length: 3 }, () => svgEl("circle", { r: 12, fill: "#e8eef8", opacity: 0 }, bot.fx));
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        // stitched text on the top blanket
        const patch = svgEl("rect", { x: 618 - 130, y: SEAT - 74, width: 260, height: 64, rx: 12, fill: "#f6f0e2", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.front);
        const patchB = svgEl("rect", { x: 618 - 122, y: SEAT - 66, width: 244, height: 48, rx: 8, fill: "none", stroke: "#c8323a", "stroke-width": 3, "stroke-dasharray": "7 5", opacity: 0 }, top.front);
        const stitch = svgEl("text", { x: 618, y: SEAT - 30, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 32, fill: "#c8323a", "text-anchor": "middle" }, top.front);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));
        const needle = svgEl("path", { d: "M0 0 L26 -26", stroke: "#e8e8e8", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, top.fx);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH SHARE"; botT.textContent = "ONE SHARES";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "-10°C"], [T_SPREAD, "ONE BLANKET"], [T_LEAN, "ROOM FOR TWO"], [T_HEART - 0.3, "WARM", "#ff6a60"]];
        const BOTSEQ = [[0.05, "-10°C"], [T_SPREAD, "HE SHARES"], [T_PULL + 0.2, "SHE TAKES IT ALL", "#ff3b30"], [T_SHIV + 0.3, "HE SHIVERS"], [T_BLUE + 1.2, "SHE NEVER LOOKS", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [620, SEAT - 90], CS = [540, 1000], ZK = 1.55;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const drawSnow = (P2, t, k) => P2.snow.forEach((c, i) => { const q = frac(t * (0.12 + (i % 5) * 0.02) + i * 0.137); c.setAttribute("cx", r1((i * 173 + 40 * Math.sin(t + i)) % PW)); c.setAttribute("cy", r1(PY0 + q * (G - PY0 + 40))); c.setAttribute("r", 2 + (i % 3)); c.setAttribute("opacity", (0.8 * k).toFixed(2)); });

        function render(t) {
          // ---- top
          drawSnow(top, t, 1);
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const spT = sm(t, T_UNF + 0.2, T_SPREAD + 0.5);
          const qT = t < T_UNF ? null : lerpQ(FOLD(mp.hands[0][0], mp.hands[0][1]), [BOTH[0] + 26 * win(t, T_LEAN, T_LEAN + 0.6), BOTH[1] - 10 * win(t, T_LEAN, T_LEAN + 0.6), BOTH[2], BOTH[3]], spT);
          top.blanket.setAttribute("d", qT ? quilt(...qT) : "");
          top.warm.setAttribute("opacity", (0.8 * sm(t, T_LEAN, T_HEART)).toFixed(3));
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_ST - 0.3, T_ST));
          const hc = [620, SEAT - 330], beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${hc[0]} ${hc[1]}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          redSpot.setAttribute("points", `560,${PY0} 680,${PY0} 840,${G} 400,${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          // stitching "+ FOLLOW"
          const TX = "+ FOLLOW", n = clamp(Math.floor((t - T_ST) / 0.18), 0, TX.length), tapped = t >= T_TAP;
          stitch.textContent = t < T_ST ? "" : tapped ? "FOLLOWING ✓" : TX.slice(0, n);
          const pq2 = sm(t, T_ST - 0.4, T_ST);
          patch.setAttribute("opacity", pq2.toFixed(3)); patchB.setAttribute("opacity", pq2.toFixed(3));
          patch.setAttribute("fill", tapped ? "#ff3b30" : "#f6f0e2"); stitch.setAttribute("fill", tapped ? "#fff" : "#c8323a");
          stitch.setAttribute("font-size", tapped ? 28 : 32);
          const bmp = tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 1;
          [patch, patchB, stitch].forEach((e) => e.setAttribute("transform", `translate(618 ${SEAT - 42}) scale(${bmp.toFixed(3)}) translate(-618 ${-(SEAT - 42)})`));
          const nd = t > T_ST && t < T_ST + TX.length * 0.18 + 0.2;
          needle.setAttribute("opacity", nd ? 1 : 0);
          needle.setAttribute("transform", `translate(${r1(540 + n * 19)} ${r1(SEAT - 60 + 8 * Math.sin(t * 30))})`);
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(618 + Math.cos(a) * 220 * Math.sqrt(q3))} ${r1(SEAT - 50 + Math.sin(a) * 140 * Math.sqrt(q3))}) scale(${(0.8 - 0.4 * q3).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          drawSnow(bot, t + 3, 1);
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const spB = sm(t, T_UNF + 0.2, T_SPREAD + 0.5), pl = sm(t, T_PULL, T_PULL + 0.6);
          const qB = t < T_UNF ? null : lerpQ(lerpQ(FOLD(bp.hands[0][0], bp.hands[0][1]), BOTH, spB), HERS, pl);
          bot.blanket.setAttribute("d", qB ? quilt(...qB) : "");
          const blue = win(t, T_SHIV, T_BLUE + 2.0);
          BF.him.g.style.filter = `sepia(${blue.toFixed(2)}) hue-rotate(${r1(180 * blue)}deg) saturate(${(1 + 1.5 * blue).toFixed(2)})`;
          const ph = [sp.head[0] + 34, sp.head[1] + 64];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          const pile = sm(t, T_SHIV, 11);
          capH.setAttribute("cx", r1(bp.head[0])); capH.setAttribute("cy", r1(bp.head[1] - 28 - 4 * pile)); capH.setAttribute("ry", r1(4 + 8 * pile)); capH.setAttribute("opacity", pile > 0.02 ? 1 : 0);
          capS.setAttribute("cx", r1(bp.head[0] - 10)); capS.setAttribute("cy", r1(bp.head[1] + 44)); capS.setAttribute("ry", r1(3 + 6 * pile)); capS.setAttribute("opacity", pile > 0.02 ? 1 : 0);
          puffs.forEach((pf, i) => { const q = frac(t * 0.6 + i / 3); pf.setAttribute("cx", r1(bp.head[0] + 40 + 50 * q)); pf.setAttribute("cy", r1(bp.head[1] + 4 - 30 * q)); pf.setAttribute("r", r1(8 + 16 * q)); pf.setAttribute("opacity", (0.7 * (1 - q) * win(t, T_SHIV, T_SHIV + 0.5)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.25 * win(t, T_BLUE + 1, T_BLUE + 2.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE GAVE HER THE WHOLE BLANKET.", L3 = "SHE NEVER ASKED IF HE WAS COLD.";
          E("head").innerHTML = `<div>LOVE IS A BLANKET. #18</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #19 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TAP - 0.4) * 28)));
          fade.style.opacity = win(t, DUR - 0.35, DUR - 0.02).toFixed(3);
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
