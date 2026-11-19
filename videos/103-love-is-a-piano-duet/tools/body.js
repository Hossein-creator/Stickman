        // ---------- "love is a piano duet. #21": winner split-screen format. One piano, a song for four hands. BOTH PLAY: her melody + his chords, notes float up and turn into a heart. ONE PLAYS: he plays his half, she scrolls next to him, half a song with wrong notes; he slows down, stops and closes the lid. FOLLOW: the notes on the music sheet rearrange into "+ FOLLOW", she turns the page: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const SK = 1.32, G = 700, KY = G - 170, HER = 470, HIM = 770, MID = 620;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_PLAY = 0.4, T_END = 7.2, T_HEART = 7.4, T_SLOW = 4.4, T_STOP = 6.2, T_LID = 6.8;
        const T_H2 = 9.0, T_H3 = 10.2;
        const T_CTA = 12.6, T_SHEET = 13.4, T_TURN = 15.0;
        // note schedule: her melody (0.3 s), his chords (0.6 s); bottom: his only, slowing, some wrong
        const MELT = [], CHT = [], BOT = [];
        for (let t = T_PLAY; t < T_END; t += 0.3) MELT.push(t);
        for (let t = T_PLAY; t < T_END; t += 0.6) CHT.push(t);
        { let t = T_PLAY, k = 0; while (t < T_STOP) { BOT.push([t, k % 3 === 2]); t += 0.6 + 0.5 * Math.max(0, (t - T_SLOW) / (T_STOP - T_SLOW)); k++; } }
        const keyX = (who, i) => (who === "her" ? 420 + ((i * 37) % 170) : 650 + ((i * 53) % 170));

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          let inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const outer = inner;
          inner = svgEl("g", { transform: `translate(${MID} ${G}) scale(${SK}) translate(${-MID} ${-G})` }, outer);
          const beams = svgEl("g", {}, inner);
          svgEl("polygon", { points: `560,${-200} 680,${-200} 900,${G} 340,${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.26 }, beams);
          svgEl("rect", { x: -300, y: G, width: PW + 600, height: 300, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          // piano back + music stand
          svgEl("rect", { x: 340, y: KY - 150, width: 560, height: 150, rx: 8, fill: "#1a1416", stroke: "#000", "stroke-width": 6 }, inner);
          const sheet = svgEl("g", {}, inner);
          svgEl("rect", { x: MID - 90, y: KY - 140, width: 180, height: 120, rx: 4, fill: "#f6f0e2", stroke: "#000", "stroke-width": 4 }, sheet);
          for (let i = 0; i < 4; i++) svgEl("line", { x1: MID - 78, y1: KY - 116 + i * 22, x2: MID + 78, y2: KY - 116 + i * 22, stroke: "#bbb", "stroke-width": 2 }, sheet);
          const sheetNotes = Array.from({ length: 10 }, (_, i) => svgEl("text", { x: MID - 70 + i * 15, y: KY - 100 + ((i * 17) % 60), "font-size": 22, "font-family": "serif", fill: "#222" }, sheet));
          sheetNotes.forEach((n) => (n.textContent = "♪"));
          const sheetT = svgEl("text", { x: MID, y: KY - 66, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#ff3b30", "text-anchor": "middle", opacity: 0 }, sheet);
          const page = svgEl("rect", { x: MID - 90, y: KY - 140, width: 180, height: 120, rx: 4, fill: "#fffbe8", stroke: "#000", "stroke-width": 4, opacity: 0 }, sheet);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const figs = svgEl("g", {}, inner);
          // bench, piano body and keys in front (hide the legs)
          svgEl("rect", { x: 330, y: KY + 20, width: 580, height: G - KY - 20, fill: "#221a1c", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("rect", { x: 340, y: KY, width: 560, height: 30, fill: "#f4f4f0", stroke: "#000", "stroke-width": 4 }, inner);
          const keys = [];
          for (let i = 0; i < 28; i++) { const x = 340 + i * 20; svgEl("line", { x1: x, y1: KY, x2: x, y2: KY + 30, stroke: "#999", "stroke-width": 2 }, inner); if ([1, 2, 4, 5, 6].includes(i % 7)) svgEl("rect", { x: x - 6, y: KY, width: 12, height: 17, fill: "#111" }, inner); keys.push(svgEl("rect", { x: x + 2, y: KY + 18, width: 16, height: 11, fill: "#ffd25a", opacity: 0 }, inner)); }
          const lid = svgEl("rect", { x: 336, y: KY - 6, width: 568, height: 14, rx: 4, fill: "#2a2022", stroke: "#000", "stroke-width": 4, opacity: 0 }, inner);
          const notes = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, outer);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, sheet, sheetNotes, sheetT, page, glow, figs, keys, lid, notes, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const mkNotes = (P2, n, col) => Array.from({ length: n }, () => { const t = svgEl("text", { "font-size": 44, "font-family": "serif", "font-weight": 700, fill: col, stroke: "#000", "stroke-width": 1, opacity: 0 }, P2.notes); t.textContent = "♪"; return t; });
        const NT = mkNotes(top, 30, "#ffffff"), NB = mkNotes(bot, 14, "#c8c8c8");

        // ---------- poses (seated behind the keyboard) ----------
        const seat = (x, f) => base({ hx: x, hy: G - 120, torso: 12, head: 22, ax: x + f * 60, ay: G, bx: x + f * 44, by: G });
        const lastHit = (arr, t) => { let r = -1, idx = -1; for (let i = 0; i < arr.length; i++) { const a = Array.isArray(arr[i]) ? arr[i][0] : arr[i]; if (a <= t) { r = a; idx = i; } } return [r, idx]; };
        function player(t, x, f, who, arr, on) {
          const st = seat(x, f);
          if (!on) return st;
          const [th, i] = lastHit(arr, t), tau = t - th;
          const lift = i < 0 ? 1 : clamp(tau / 0.25, 0, 1);
          const kx = i < 0 ? x + f * 60 : keyX(who, i);
          reachTo(st, 1, [kx, KY + 4 - 22 * Math.sin(Math.PI * lift)]);
          reachTo(st, 1, [kx + f * 40 + (i % 2 ? 20 : -10), KY + 4 - 22 * Math.sin(Math.PI * clamp(lift + 0.5, 0, 1))], "b");
          st.torso += 4 * Math.sin(t * 3 + (who === "her" ? 0 : 1));
          return st;
        }
        const topHer = (t) => { const p = t < T_END + 0.2; const st = player(t, HER, 1, "her", MELT, p); st.head = lerp(st.head, -12, win(t, T_HEART, T_HEART + 0.4)); const tn = hold(t, T_TURN - 0.5, T_TURN + 0.3, 0.3); reachTo(st, tn, [MID - 40 + 60 * win(t, T_TURN - 0.2, T_TURN), KY - 90]); return st; };
        const topHim = (t) => { const st = player(t, HIM, -1, "him", CHT, t < T_END + 0.2); st.head = lerp(st.head, -12, win(t, T_HEART, T_HEART + 0.4)); const ch = hold(t, T_TURN + 0.3, DUR, 0.3); reachTo(st, ch, [HIM - 20, G - 380 + 10 * Math.sin(t * 12)], "b"); return st; };
        const botHer = (t) => { const st = seat(HER, 1); st.head = 30 + 2 * Math.sin(t * 1.3); st.torso = 6; reachTo(st, 1, [HER + 50, G - 236]); reachTo(st, 1, [HER + 44, G - 230], "b"); return st; };
        function botHim(t) {
          const st = player(t, HIM, -1, "him", BOT.map((b) => b[0]), t < T_STOP + 0.2);
          const lid = hold(t, T_LID - 0.3, T_LID + 0.5, 0.25); reachTo(st, lid, [HIM - 70, KY - 30 + 30 * win(t, T_LID - 0.1, T_LID + 0.2)]);
          const sad = win(t, T_LID + 0.4, T_LID + 1.0); st.head = lerp(st.head, 34, sad); st.torso = lerp(st.torso, 22, sad);
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH PLAY"; botT.textContent = "ONE PLAYS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "FOUR HANDS"], [2.6, "ONE SONG"], [T_HEART - 0.3, "IN TUNE", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE PLAYS"], [1.4, "SHE SCROLLS"], [2.8, "HALF A SONG", "#ff3b30"], [T_SLOW + 0.4, "WRONG NOTES", "#ff3b30"], [T_STOP, "HE STOPS"], [T_LID + 0.3, "THE LID CLOSES", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [MID, G + (KY - 110 - G) * SK], CS = [540, 1000], ZK = 1.35;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        function drawNotes(arr, hits, t, who, toHeart) {
          // reuse note glyphs round-robin for the most recent hits
          const recent = hits.filter((h) => h.t <= t && t - h.t < 1.6).slice(-arr.length);
          arr.forEach((n, i) => {
            const h = recent[i];
            if (!h) { n.setAttribute("opacity", 0); return; }
            const q = (t - h.t) / 1.6;
            let x = h.x + 20 * Math.sin(q * 6 + i), y = KY - 20 - 220 * q;
            if (toHeart) { const hp = [MID, KY - 225]; x = lerp(x, hp[0], toHeart * q); y = lerp(y, hp[1], toHeart * q); }
            if (h.wrong) { y = KY - 20 - 80 * q + 160 * q * q; x += 30 * q; }
            n.setAttribute("x", r1(x)); n.setAttribute("y", r1(y)); n.setAttribute("opacity", (1 - q).toFixed(3));
            n.setAttribute("fill", h.wrong ? "#ff5a4a" : h.col); n.setAttribute("transform", h.wrong ? `rotate(${r1(60 * q)} ${r1(x)} ${r1(y)})` : "");
          });
        }
        const HT = [...MELT.map((t, i) => ({ t, x: keyX("her", i), col: "#ffffff" })), ...CHT.map((t, i) => ({ t, x: keyX("him", i), col: "#ffd27a" }))].sort((a, b) => a.t - b.t);
        const HB = BOT.map((b, i) => ({ t: b[0], x: keyX("him", i), col: "#c8c8c8", wrong: b[1] }));
        const keyLight = (P2, hits, t) => P2.keys.forEach((k, i) => { const kx = 340 + i * 20 + 10; const on = hits.some((h) => h.t <= t && t - h.t < 0.18 && Math.abs(h.x - kx) < 10); k.setAttribute("opacity", on ? 0.9 : 0); });

        function render(t) {
          // ---- top
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          drawNotes(NT, HT, t, "both", sm(t, 5.4, T_HEART));
          keyLight(top, HT, t);
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_SHEET - 0.4, T_SHEET));
          const hc = [MID, KY - 225], beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${hc[0]} ${hc[1]}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", hc[0]); top.glow.setAttribute("cy", hc[1]); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `${MID - 60},${-200} ${MID + 60},${-200} ${MID + 260},${G} ${MID - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          // sheet: notes scatter and "+ FOLLOW" appears; she turns the page
          const sq = sm(t, T_SHEET, T_SHEET + 0.6), turned = t >= T_TURN;
          top.sheetNotes.forEach((n, i) => { n.setAttribute("opacity", (1 - sq).toFixed(3)); n.setAttribute("transform", `translate(${r1(sq * (i - 4.5) * 8)} ${r1(-sq * 20)})`); });
          top.sheetT.setAttribute("opacity", sq.toFixed(3));
          top.sheetT.textContent = turned ? "FOLLOWING ✓" : "+ FOLLOW"; top.sheetT.setAttribute("font-size", turned ? 22 : 30); top.sheetT.setAttribute("fill", turned ? "#222" : "#ff3b30");
          const pq = clamp((t - (T_TURN - 0.25)) / 0.35, 0, 1);
          top.page.setAttribute("opacity", pq > 0 && pq < 1 ? 1 : 0);
          top.page.setAttribute("transform", `translate(${MID - 90} 0) scale(${(1 - pq).toFixed(3)} 1) translate(${-(MID - 90)} 0)`);
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TURN) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", turned && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(MID + Math.cos(a) * 180 * Math.sqrt(q3))} ${r1(KY - 80 + Math.sin(a) * 110 * Math.sqrt(q3))}) scale(${(0.8 - 0.4 * q3).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          drawNotes(NB, HB, t, "him", 0);
          keyLight(bot, HB, t);
          bot.lid.setAttribute("opacity", t > T_LID ? 1 : 0);
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          bot.sheetNotes.forEach((n, i) => n.setAttribute("opacity", i % 2 ? 0.2 : 1));
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_LID, T_LID + 1.0)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "ONE PERSON CAN'T PLAY", L3 = "A SONG WRITTEN FOR TWO.";
          E("head").innerHTML = `<div>LOVE IS A PIANO DUET. #21</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #22 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TURN - 0.4) * 28)));
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
