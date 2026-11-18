        // ---------- "love is a tin can phone. #20": winner split-screen format. Two cans on a string. BOTH LISTEN: he talks, she listens, she answers; the string stays tight, words and hearts travel (heart). ONE LISTENS: she drops her can and scrolls, the string goes slack, his words slide down and fall on the floor and pile up; he puts his can down and leaves; then she picks hers up: "HELLO?" - it falls too. FOLLOW: a "+ FOLLOW" tag zips along the tight string from her can to his, he catches it: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 700, HX = 300, SHX = 930;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        // top: [start, from(0 him / 1 her), text]
        const TOPW = [[0.6, 0, "HOW WAS YOUR DAY?"], [2.5, 1, "LONG. TELL ME YOURS."], [4.4, 0, "I MISSED YOU."], [6.1, 1, "ME TOO ♥"]];
        const BOTW = [[0.6, 0, "HOW WAS YOUR DAY?"], [2.5, 0, "I MISS YOU."], [4.4, 0, "ARE YOU THERE?"], [6.1, 0, "HELLO?"], [9.5, 1, "HELLO?"]];
        const TRAV = 1.2, T_HEART = 7.8, T_DROP = 1.1, T_PUT = 7.4, T_LEAVE = 7.9, T_PICK = 9.1;
        const T_H2 = 10.8, T_H3 = 12.0;
        const T_CTA = 14.4, T_ZIP = 15.4, T_CATCH = 16.7;

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [HX, SHX]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.24 }, beams);
          for (let i = 0; i < 22; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 200), r: 2 + (i % 3), fill: "#fff", opacity: 0.22 }, inner);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const str = svgEl("path", { fill: "none", stroke: "#d9cfa8", "stroke-width": 4 }, inner);
          const figs = svgEl("g", {}, inner);
          const words = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, str, figs, words, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const mkCan = (P2, white) => { const g = svgEl("g", {}, P2.figs); svgEl("rect", { x: -14, y: -18, width: 28, height: 36, rx: 4, fill: white ? "#c8ccd4" : "#8a8e96", stroke: "#000", "stroke-width": 4 }, g); svgEl("ellipse", { cx: 0, cy: -18, rx: 14, ry: 4, fill: white ? "#e8eaf0" : "#a8aab0", stroke: "#000", "stroke-width": 3 }, g); return g; };
        const mkWord = (P2, txt, white, hers) => { const g = svgEl("g", { opacity: 0 }, P2.words); const w = 18 + txt.length * 15; svgEl("rect", { x: -w / 2, y: -20, width: w, height: 40, rx: 14, fill: hers ? (white ? "#ffe0e6" : "#c8b0b4") : white ? "#ffffff" : "#b8b8b8", stroke: "#000", "stroke-width": 4 }, g); const tx = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#222", "text-anchor": "middle" }, g); tx.textContent = txt; return { g, w }; };
        const TWD = TOPW.map((w) => mkWord(top, w[2], true, w[1] === 1)), BWD = BOTW.map((w) => mkWord(bot, w[2], false, w[1] === 1));

        // ---------- poses ----------
        // talking: can at the mouth; listening: can at the ear
        function canPose(x, f, talk, k = 1) {
          const st = standOn(x, f, G); st.head = 4;
          const hd = [x + f * 6, stY - 160];
          reachTo(st, k, [lerp(hd[0] + f * 22, hd[0] + f * 44, talk), lerp(hd[1] - 4, hd[1] + 16, talk)]);
          reachTo(st, k * 0.6, [x + f * 30, stY - 90], "b");
          return st;
        }
        const talkK = (list, who, t) => list.reduce((a, w) => Math.max(a, w[1] === who ? hold(t, w[0] - 0.3, w[0] + 0.7, 0.2) : 0), 0);
        const topHim = (t) => { const st = canPose(HX, 1, talkK(TOPW, 0, t)); st.head = lerp(st.head, -8, win(t, T_HEART, T_HEART + 0.4)); const c = hold(t, T_CATCH - 0.5, DUR, 0.3); reachTo(st, c, [HX + 120, stY - 150 - 10 * Math.sin(Math.max(0, t - T_CATCH) * 10) * (t > T_CATCH + 0.3 ? 1 : 0)], "b"); return st; };
        const topHer = (t) => { const st = canPose(SHX, -1, talkK(TOPW, 1, t)); st.head = lerp(st.head, -8, win(t, T_HEART, T_HEART + 0.4)); return st; };
        function botHim(t) {
          if (t < T_PUT) { const st = canPose(HX, 1, talkK(BOTW, 0, t)); st.head = lerp(st.head, 14, win(t, 4.0, 5.0)); return st; }
          const st = canPose(HX, 1, 0);
          const dn = win(t, T_PUT - 0.1, T_PUT + 0.4) * (1 - win(t, T_LEAVE - 0.1, T_LEAVE + 0.2));
          st.torso = 40 * dn; st.hy += 30 * dn; reachTo(st, 1, [lerp(st.atx, HX + 60, win(t, T_PUT - 0.1, T_PUT + 0.4)), lerp(st.aty, G - 20, win(t, T_PUT - 0.1, T_PUT + 0.4))]);
          if (t > T_LEAVE) {
            const x = lerp(HX, -160, sm(t, T_LEAVE, T_LEAVE + 1.8)), STR = 100, ph = (HX - x) / STR;
            const ft = [0, 0.5].map((o) => { const q = frac(ph + o + 1e-6); if (q < 0.5) return [x - STR * (0.25 - q), G]; const ss = (q - 0.5) / 0.5; return [x - STR * (-0.25 + 0.5 * ease(ss)), G - Math.sin(Math.PI * ss) * 10]; });
            const sw = Math.sin(Math.PI * 2 * ph);
            return base({ hx: x, hy: stY + 3 + 3 * Math.abs(sw), torso: 10, head: 26, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 });
          }
          return st;
        }
        function botHer(t) {
          const up = hold(t, T_PICK, DUR, 0.3), drop = win(t, T_DROP, T_DROP + 0.4);
          const st = standOn(SHX, -1, G); st.head = lerp(4, 28 + 2 * Math.sin(t * 1.3), drop);
          reachTo(st, 1, [lerp(SHX - 28, SHX - 30, drop), lerp(stY - 164, stY - 60, drop)]);
          reachTo(st, drop * (1 - up), [SHX - 44, stY - 120], "b");
          if (up > 0) { const st2 = canPose(SHX, -1, talkK(BOTW, 1, t)); st2.head = lerp(st2.head, 10, win(t, T_PICK + 1.4, T_PICK + 2.0)); Object.assign(st, mixPose(st, st2, up)); }
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const cans = { th: mkCan(top, true), ts: mkCan(top, true), bh: mkCan(bot, false), bs: mkCan(bot, false) };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.figs);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.figs);
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const tinyH = Array.from({ length: 4 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));
        const tag = svgEl("g", { opacity: 0 }, top.fx);
        const tagR = svgEl("rect", { x: -100, y: 0, width: 200, height: 60, rx: 20, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, tag);
        svgEl("circle", { cx: 0, cy: -2, r: 8, fill: "none", stroke: "#000", "stroke-width": 4 }, tag);
        const tagT = svgEl("text", { x: 0, y: 40, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#fff", "text-anchor": "middle" }, tag);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH LISTEN"; botT.textContent = "ONE LISTENS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "HE TALKS. SHE LISTENS"], [2.5, "SHE TALKS. HE LISTENS"], [5.0, "THE STRING STAYS TIGHT"], [T_HEART - 0.2, "CONNECTED", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE TALKS"], [T_DROP + 0.2, "SHE SCROLLS"], [2.2, "THE STRING GOES SLACK", "#ff3b30"], [3.8, "HIS WORDS FALL", "#ff3b30"], [T_PUT, "HE STOPS TALKING"], [T_PICK + 0.3, "NOW SHE TALKS. NOBODY'S THERE"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [615, stY - 150], CS = [540, 960], ZK = 1.25;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const bez = (A, B, sag, u) => { const C = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + 2 * sag]; const v = 1 - u; return [v * v * A[0] + 2 * v * u * C[0] + u * u * B[0], v * v * A[1] + 2 * v * u * C[1] + u * u * B[1]]; };
        const strD = (A, B, sag) => { const C = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + 2 * sag]; return `M${r1(A[0])} ${r1(A[1])} Q${r1(C[0])} ${r1(C[1])} ${r1(B[0])} ${r1(B[1])}`; };
        const canAt = (fig, f) => [fig.hands[0][0] + f * 6, fig.hands[0][1]];

        function render(t) {
          // ---- top
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), -1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] + 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const A = canAt(mp, 1), B = canAt(hp, -1), sagT = 14;
          cans.th.setAttribute("transform", `translate(${r1(A[0])} ${r1(A[1])}) rotate(90)`); cans.ts.setAttribute("transform", `translate(${r1(B[0])} ${r1(B[1])}) rotate(-90)`);
          top.str.setAttribute("d", strD(A, B, sagT));
          TOPW.forEach((w, i) => { const q = clamp((t - w[0]) / TRAV, 0, 1), on = t > w[0] && t < w[0] + TRAV + 0.5; const u = w[1] ? 1 - ease(q) : ease(q); const p = bez(A, B, sagT, u); TWD[i].g.setAttribute("opacity", on ? (1 - win(t, w[0] + TRAV, w[0] + TRAV + 0.5)).toFixed(3) : 0); TWD[i].g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1] - 44)}) scale(${1.4 * (on && q < 1 ? 1 : 1 - 0.4 * win(t, w[0] + TRAV, w[0] + TRAV + 0.5)).toFixed(3)})`); });
          tinyH.forEach((h, i) => { const t0 = 7.2 + i * 0.12, q = clamp((t - t0) / 1.0, 0, 1); const p = bez(A, B, sagT, i % 2 ? 1 - ease(q) : ease(q)); h.setAttribute("opacity", t > t0 && q < 1 ? 1 : 0); h.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1] - 20)})`); });
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_ZIP - 0.4, T_ZIP));
          const hc = [615, stY - 300], beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${hc[0]} ${hc[1]}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", hc[0]); top.glow.setAttribute("cy", hc[1]); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `555,${PY0} 675,${PY0} 860,${G} 370,${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          // CTA tag zips along the string from her can to his
          const zq = clamp((t - T_ZIP) / (T_CATCH - T_ZIP), 0, 1), caught = t >= T_CATCH;
          const tp = caught ? [mp.hands[1][0], mp.hands[1][1] + 6] : bez(A, B, sagT, 1 - ease(zq));
          tag.setAttribute("opacity", t > T_ZIP ? 1 : 0);
          const bump = caught ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - T_CATCH) / 0.25, 0, 1)) : 1;
          tag.setAttribute("transform", `translate(${r1(tp[0])} ${r1(tp[1] + 4)}) rotate(${r1(caught ? 0 : 6 * Math.sin(t * 9))}) scale(${bump.toFixed(3)})`);
          tagR.setAttribute("fill", caught ? "#ffffff" : "#ff3b30"); tagT.setAttribute("fill", caught ? "#000" : "#fff");
          tagT.textContent = caught ? "FOLLOWING ✓" : "+ FOLLOW"; tagT.setAttribute("font-size", caught ? 24 : 30);
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_CATCH) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", caught && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(tp[0] + Math.cos(a) * 220 * Math.sqrt(q3))} ${r1(tp[1] + 30 + Math.sin(a) * 140 * Math.sqrt(q3))}) scale(${(0.8 - 0.4 * q3).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zk = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zk).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zk).toFixed(3)));

          // ---- bottom
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), -1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), t > T_LEAVE ? -1 : 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] + 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const hisCan = t < T_PUT + 0.3 ? canAt(bp, 1) : [HX + 60, G - 18];
          const herCan = t < T_DROP + 0.2 || t > T_PICK + 0.3 ? canAt(sp, -1) : [lerp(sp.hands[0][0], SHX - 50, win(t, T_DROP, T_DROP + 0.4)), lerp(sp.hands[0][1], stY - 40, win(t, T_DROP, T_DROP + 0.4))];
          cans.bh.setAttribute("transform", `translate(${r1(hisCan[0])} ${r1(hisCan[1])}) rotate(${t < T_PUT + 0.3 ? 90 : 0})`);
          cans.bs.setAttribute("transform", `translate(${r1(herCan[0])} ${r1(herCan[1])}) rotate(${t < T_DROP + 0.2 || t > T_PICK + 0.3 ? -90 : 0})`);
          const mid = (hisCan[1] + herCan[1]) / 2, maxSag = (G - 8 - mid) / 1.0;
          const sagB = lerp(14, maxSag, sm(t, T_DROP, 2.4));
          bot.str.setAttribute("d", strD(hisCan, herCan, sagB));
          BOTW.forEach((w, i) => {
            const q = clamp((t - w[0]) / (TRAV * 0.8), 0, 1), u = w[1] ? 1 - 0.5 * ease(q) : 0.5 * ease(q);
            const p = bez(hisCan, herCan, sagB, u);
            const pile = [600 + (i % 2 ? 50 : -40) + i * 8, G - 22 - Math.floor(i / 1) * 4];
            const land = clamp((t - w[0] - TRAV * 0.8) / 0.35, 0, 1);
            const pos = [lerp(p[0], pile[0], land), lerp(p[1] - 30, pile[1], land * land)];
            BWD[i].g.setAttribute("opacity", t > w[0] ? 1 : 0);
            BWD[i].g.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1])}) rotate(${r1(land * (i % 2 ? 12 : -10))}) scale(1.25)`);
            BWD[i].g.style.filter = land >= 1 ? "brightness(0.6)" : "none";
          });
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          const pOn = t > T_DROP + 0.3 && t < T_PICK;
          phone.setAttribute("opacity", pOn ? 1 : 0); phoneGlow.setAttribute("opacity", pOn ? (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3) : 0);
          phone.setAttribute("transform", `translate(${r1(sp.hands[1][0])} ${r1(sp.hands[1][1] - 6)})`); phoneGlow.setAttribute("cx", r1(sp.hands[1][0])); phoneGlow.setAttribute("cy", r1(sp.hands[1][1]));
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_PICK + 1.0, T_PICK + 2.0)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "IF ONE STOPS LISTENING,", L3 = "THE WORDS FALL ON THE FLOOR.";
          E("head").innerHTML = `<div>LOVE IS A TIN CAN PHONE. #20</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #21 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_CATCH - 0.4) * 28)));
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
