        // ---------- "love is a phone call. #12": winner split-screen format. Two rooms with a wall between them. BOTH CALL: he calls, she picks up; she calls, he picks up; the line glows into a heart. ONE CALLS: he calls and calls (declined, ignored, CALLS 47), one day he puts the phone down; now she calls, his phone rings on the floor, he doesn't pick up. FOLLOW: an incoming call card from @silent.stickman, she swipes the green FOLLOW button. ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const HE = 400, SHE = 830, WALLX = 616;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [HE, SHE + 10]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.28 }, beams);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          // the wall between their rooms
          svgEl("rect", { x: WALLX - 14, y: PY0, width: 28, height: FL - PY0, fill: "#1b1d22", stroke: "#000", "stroke-width": 4 }, inner);
          // little windows in each room
          for (const wx of [150, 1050]) { svgEl("rect", { x: wx - 60, y: 200, width: 120, height: 130, fill: "#0e1626", stroke: "#2c2f38", "stroke-width": 8 }, inner); svgEl("circle", { cx: wx + 26, cy: 236, r: 14, fill: "#cfd8e6", opacity: 0.8 }, inner); }
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const line = svgEl("path", { fill: "none", "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": "2 22", opacity: 0 }, inner);
          const dots = Array.from({ length: 5 }, () => svgEl("circle", { r: 9, opacity: 0 }, inner));
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, line, dots, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const toScreen = (P2, x, y) => [PX + x * PK, P2.y0 + (y - PY0) * PK];
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        // calls: [ring start, answer (or decline/ignore end), hang up], who calls (0 him, 1 her)
        const TOPC = [[0.2, 1.1, 2.8, 0], [3.2, 4.0, 5.6, 1], [6.0, 6.6, 99, 0]];
        const T_HEART = 7.3;
        const BOTC = [[0.2, 1.3, "X"], [2.2, 2.9, "X"], [3.8, 5.0, "-"]];
        const T_SPAM = 5.0, T_SPAM1 = 6.0, T_DOWN = 6.4, T_DROPPH = 6.9, T_HERCALL = 7.7, T_HRING = 8.1, T_MISSED = 9.7;
        const T_H2 = 9.9, T_H3 = 10.7;
        const T_CTA = 12.8, T_CARD = T_CTA + 1.1, T_TAP = T_CARD + 1.7;
        const CF = [615, 420], CS = [540, 1020], ZK = 1.45, CARD = [615, 330];
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = toScreen(top, CF[0], CF[1]); return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const camPt = (t, x, y) => { const c = cam(t); return [c.ox + x * c.z, c.oy + (y - PY0) * c.z]; };

        const ear = (x, f) => [x + f * 30, stand - 152];
        const chest = (x, f) => [x + f * 46, stand - 120];
        // phone states per person: 0 = chest (looking), 1 = at the ear
        function person(x, f, earK, look) {
          const st = standOn(x, f, FL);
          st.head = lerp(-4, 22, look);
          const c = chest(x, f), e = ear(x, f);
          reachTo(st, 1, [lerp(c[0], e[0], earK), lerp(c[1], e[1], earK)]);
          reachTo(st, 1 - earK, [c[0] - f * 10, c[1] + 8], "b");
          return st;
        }
        // top: ringing -> looks at the phone -> picks up (ear) -> talk -> hang up
        function topState(t, who) {
          for (const [r, a, h, c] of TOPC) {
            if (t < r - 0.3 || t > h + 0.4) continue;
            if (c === who) return { ear: hold(t, r - 0.25, h + 0.3, 0.35), look: 0, talk: t > a && t < h };
            return { ear: hold(t, a - 0.1, h + 0.3, 0.3), look: hold(t, r + 0.2, a + 0.1, 0.25) * 0.8, talk: t > a && t < h };
          }
          return { ear: 0, look: 0.6, talk: false };
        }
        function topPose(t, who) {
          const x = who ? SHE : HE, f = who ? -1 : 1, s = topState(t, who);
          const st = person(x, f, s.ear, s.look);
          if (s.talk) { st.head += 4 * Math.sin(t * 7 + who) - 6; st.torso += 2 * Math.sin(t * 3); }
          if (t > T_CTA + 0.3) return ctaPose(st, t, who);
          return st;
        }
        // CTA: phones down, card appears between them, she taps green, both cheer, he waves at you
        function ctaPose(st, t, who) {
          const x = who ? SHE : HE, f = who ? -1 : 1;
          const r = win(t, T_CTA + 0.3, T_CTA + 0.8); st.aw *= 1 - r; st.bw *= 1 - r; st.head = lerp(st.head, -6, r);
          const cheer = hold(t, T_TAP + 0.35, T_TAP + 1.6, 0.2), wv = 14 * Math.sin(t * 14);
          reachTo(st, cheer, [x - 35, stand - 250 + wv]); reachTo(st, cheer, [x + 35, stand - 250 - wv], "b");
          if (who === 1) { const tap = hold(t, T_TAP - 0.6, T_TAP + 0.3, 0.35), pr = t > T_TAP - 0.1 && t < T_TAP + 0.12 ? 8 : 0; reachTo(st, tap, [CARD[0] + 92 - pr, CARD[1] + 50]); st.head = lerp(st.head, -10, tap); }
          else { const pt = hold(t, T_CARD + 0.2, T_TAP - 0.1, 0.3); reachTo(st, pt, [x + 60 + 10 * Math.sin(t * 10), stand - 200]); }
          return st;
        }
        // bottom: he calls again and again, she declines / ignores
        function botHim(t) {
          let earK = 0;
          for (const [r, a] of BOTC) earK = Math.max(earK, hold(t, r - 0.25, a + 0.3, 0.35));
          earK = Math.max(earK, hold(t, T_SPAM, T_SPAM1 + 0.1, 0.25));
          const st = person(HE, 1, earK, 0.2);
          // he gives up: phone hand sinks, head down, phone slips to the floor
          const dn = win(t, T_DOWN, T_DOWN + 0.5);
          st.head = lerp(st.head, 28, dn); st.torso += 10 * dn;
          const c = chest(HE, 1); reachTo(st, 1 - dn, c);
          st.aw *= t > T_DROPPH ? 0 : 1; st.bw *= 1 - dn;
          // when her call comes: he looks at the ringing phone on the floor, and does not move
          const lk = win(t, T_HRING + 0.3, T_HRING + 0.8); st.head = lerp(st.head, 34, lk);
          return st;
        }
        function botHer(t) {
          let earK = hold(t, T_HERCALL - 0.2, T_MISSED + 0.2, 0.35);
          const st = person(SHE, -1, earK, 1 - earK * 0.9);
          // decline swipes
          for (const [r, a, k] of BOTC) if (k === "X") { const sw = hold(t, a - 0.25, a + 0.15, 0.12); st.atx += -14 * sw; st.aty -= 10 * sw; }
          const sad = win(t, T_MISSED, T_MISSED + 0.4); st.head = lerp(st.head, 30, sad);
          return st;
        }

        const mkFigs = (P2, white) => {
          const bun = svgEl("circle", { r: 15, fill: white ? "#fff" : "#8e8e8e", stroke: "#000", "stroke-width": 6 }, P2.figs);
          const her = makeFig(P2.figs, white ? "#ffffff" : "#8e8e8e", white ? "#e2e2e2" : "#767676", white, "her" + (white ? "T" : "B"));
          P2.figs.insertBefore(bun, her.g.previousSibling);
          const him = makeFig(P2.figs, white ? "#ffffff" : "#9a9a9a", white ? "#dedede" : "#7e7e7e", white, "him" + (white ? "T" : "B"));
          return { bun, her, him };
        };
        const TF = mkFigs(top, true), BF = mkFigs(bot, false);
        const mkPhone = (P2) => {
          const glow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0 }, P2.fx);
          const g = svgEl("g", {}, P2.fx);
          const body = svgEl("rect", { x: -11, y: -18, width: 22, height: 36, rx: 5, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, g);
          const waves = [0, 1, 2].map(() => svgEl("path", { fill: "none", stroke: "#bfe0ff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, P2.fx));
          const x = svgEl("path", { d: "M-22 -22 L22 22 M22 -22 L-22 22", stroke: "#ff3b30", "stroke-width": 9, "stroke-linecap": "round", opacity: 0 }, P2.fx);
          return { glow, g, body, waves, x };
        };
        const PH = { tHim: mkPhone(top), tHer: mkPhone(top), bHim: mkPhone(bot), bHer: mkPhone(bot) };
        const redSpot = svgEl("polygon", { points: `${WALLX - 50},${PY0} ${WALLX + 50},${PY0} ${WALLX + 160},${FL} ${WALLX - 160},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        // call counters above each in the bottom panel
        const ctr = (P2, x) => { const t = svgEl("text", { x, y: 196, "text-anchor": "middle", "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#bdbdbd", "letter-spacing": 3 }, P2.fx); return t; };
        const cHim = ctr(bot, HE), cHer = ctr(bot, SHE);
        const missed = svgEl("text", { x: SHE, y: 250, "text-anchor": "middle", "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#ff3b30", "letter-spacing": 3, opacity: 0 }, bot.fx);
        missed.textContent = "NO ANSWER";

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH CALL"; botT.textContent = "ONE CALLS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "HE CALLS"], [1.1, "SHE PICKS UP"], [3.2, "SHE CALLS"], [4.0, "HE PICKS UP"], [6.0, "AGAIN AND AGAIN"], [T_HEART, "STILL TALKING", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE CALLS"], [1.3, "DECLINED", "#ff3b30"], [2.2, "HE CALLS AGAIN"], [2.9, "DECLINED", "#ff3b30"], [3.8, "AND AGAIN"], [T_SPAM, "47 CALLS"], [T_DOWN, "HE STOPS"], [T_HERCALL, "NOW SHE CALLS"], [T_MISSED, "NO ANSWER", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---- FOLLOW: incoming call card ----
        const card = document.createElement("div");
        card.style.cssText = "position:absolute;width:340px;height:0;overflow:hidden;border-radius:34px;background:linear-gradient(#1f2a3a,#121821);border:5px solid #000;box-shadow:0 0 50px rgba(120,190,255,0.35);font-family:HFMono,monospace;font-weight:700;text-align:center;color:#fff;opacity:0";
        card.innerHTML = `<div id="cIn" style="margin-top:20px;font-size:16px;letter-spacing:0.18em;color:#9fc0e0">INCOMING CALL</div>
          <div style="margin:14px auto 0;width:74px;height:74px;border-radius:50%;background:#000;border:4px solid #fff;display:flex;align-items:center;justify-content:center"><svg width="44" height="54" viewBox="-22 -27 44 54" style="position:static;display:block"><circle cx="0" cy="-16" r="8" fill="#fff"/><path d="M0 -8 L0 10 M0 10 L-9 25 M0 10 L9 25 M-11 -2 L11 -2" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg></div>
          <div style="margin-top:12px;font-size:21px;letter-spacing:0.06em">@silent.stickman</div>
          <div style="display:flex;justify-content:space-between;margin:22px 30px 0">
            <div style="width:64px;height:64px;border-radius:50%;background:#ff3b30;border:4px solid #000;display:flex;align-items:center;justify-content:center;font-size:30px">✕</div>
            <div id="cBtn" style="height:64px;border-radius:32px;border:4px solid #000;display:flex;align-items:center;justify-content:center;font-size:21px;padding:0 18px;letter-spacing:0.06em"></div>
          </div>`;
        E("stage").appendChild(card);
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:120px;right:120px;top:1360px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.14em;color:#fff;line-height:1.5";
        E("stage").appendChild(sub);
        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const fist = svgEl("g", { opacity: 0 }, ctaSvg);
        const armO = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 44, "stroke-linecap": "round" }, fist);
        const armW = svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 29, "stroke-linecap": "round" }, fist);
        const ring = svgEl("circle", { r: 40, fill: "none", stroke: "#7dff9a", "stroke-width": 5, opacity: 0 }, ctaSvg);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", opacity: 0 }, ctaSvg));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function drawPhone(p, pos, t, ring1, glow1, xk, rot = 0) {
          const shake = ring1 > 0 ? 4 * Math.sin(t * 60) * ring1 : 0;
          p.g.setAttribute("transform", `translate(${r1(pos[0] + shake)} ${r1(pos[1])}) rotate(${r1(rot)})`);
          p.glow.setAttribute("cx", r1(pos[0])); p.glow.setAttribute("cy", r1(pos[1])); p.glow.setAttribute("opacity", (0.25 + 0.6 * glow1).toFixed(3));
          p.waves.forEach((w, i) => {
            const q = ((t * 1.8 + i / 3) % 1);
            const rr = 26 + 46 * q;
            w.setAttribute("d", `M${r1(pos[0] - rr * 0.7)} ${r1(pos[1] - rr * 0.7)} A${r1(rr)} ${r1(rr)} 0 0 1 ${r1(pos[0] + rr * 0.7)} ${r1(pos[1] - rr * 0.7)}`);
            w.setAttribute("opacity", (ring1 * (1 - q) * 0.9).toFixed(3));
          });
          p.x.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1] - 44)}) scale(${(0.6 + 0.4 * backOut(xk)).toFixed(3)})`);
          p.x.setAttribute("opacity", xk.toFixed(3));
        }
        function drawLine(P2, a, b, k, col, t) {
          const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 230;
          P2.line.setAttribute("d", `M${r1(a[0])} ${r1(a[1])} Q${r1(mx)} ${r1(my)} ${r1(b[0])} ${r1(b[1])}`);
          P2.line.setAttribute("stroke", col); P2.line.setAttribute("opacity", (0.8 * k).toFixed(3));
          P2.dots.forEach((d, i) => {
            const q = ((t * 0.7 + i / 5) % 1), u = 1 - q;
            d.setAttribute("cx", r1(u * u * a[0] + 2 * u * q * mx + q * q * b[0])); d.setAttribute("cy", r1(u * u * a[1] + 2 * u * q * my + q * q * b[1]));
            d.setAttribute("fill", col); d.setAttribute("opacity", (k * Math.sin(Math.PI * q)).toFixed(3));
          });
        }
        const ringOf = (t, r, a) => (t >= r && t < a ? 1 : 0) * (0.5 + 0.5 * Math.abs(Math.sin(t * 10)));

        function render(t) {
          // ---- top: BOTH CALL
          const hp = drawFig(TF.her, livePose((x) => topPose(x, 1), t, 0.4), -1);
          const mp = drawFig(TF.him, livePose((x) => topPose(x, 0), t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] + 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          let rHim = 0, rHer = 0, conn = 0;
          for (const [r, a, h, c] of TOPC) { const rg = ringOf(t, r + 0.25, a); if (c === 0) rHer = Math.max(rHer, rg); else rHim = Math.max(rHim, rg); conn = Math.max(conn, hold(t, a, h, 0.2)); }
          const ctaOff = 1 - win(t, T_CTA + 0.3, T_CTA + 0.8);
          drawPhone(PH.tHim, mp.hands[0], t, rHim, conn, 0);
          drawPhone(PH.tHer, hp.hands[0], t, rHer, conn, 0);
          [PH.tHim, PH.tHer].forEach((p) => { p.g.setAttribute("opacity", ctaOff.toFixed(3)); p.glow.setAttribute("opacity", (+p.glow.getAttribute("opacity") * ctaOff).toFixed(3)); });
          drawLine(top, mp.hands[0], hp.hands[0], conn * ctaOff, t > T_HEART ? "#ff6a60" : "#7dff9a", t);
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_CARD - 0.4, T_CARD));
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${WALLX} 200) scale(${(backOut(hk) * 0.9 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", WALLX); top.glow.setAttribute("cy", 200); top.glow.setAttribute("opacity", (0.8 * hk).toFixed(3));
          redSpot.setAttribute("opacity", (0.45 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom: ONE CALLS
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), -1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] + 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          let rH = 0, xk = 0, calling = 0;
          for (const [r, a, k] of BOTC) { rH = Math.max(rH, ringOf(t, r + 0.25, a)); calling = Math.max(calling, hold(t, r, a, 0.15)); if (k === "X") xk = Math.max(xk, hold(t, a - 0.1, a + 0.6, 0.12)); }
          rH = Math.max(rH, ringOf(t, T_SPAM, T_SPAM1)); calling = Math.max(calling, hold(t, T_SPAM, T_SPAM1, 0.15));
          drawPhone(PH.bHer, sp.hands[0], t, rH, 0.6, xk);
          // his phone: in his hand, then on the floor; rings there when she calls
          const fq = win(t, T_DROPPH, T_DROPPH + 0.3);
          const hpos = t < T_DROPPH ? bp.hands[0] : [lerp(bp.hands[0][0], HE + 70, fq), lerp(bp.hands[0][1], FL - 12, fq)];
          drawPhone(PH.bHim, hpos, t, ringOf(t, T_HRING, T_MISSED), t > T_DROPPH ? 0.3 + 0.5 * ringOf(t, T_HRING, T_MISSED) : 0.5, 0, 80 * fq);
          const herCall = hold(t, T_HERCALL, T_MISSED, 0.2);
          drawLine(bot, bp.hands[0], sp.hands[0], calling * 0.6, "#8a8a8a", t);
          if (herCall > 0) drawLine(bot, sp.hands[0], hpos, herCall * 0.6, "#8a8a8a", t);
          const n = t < 0.2 ? 0 : t < 2.2 ? 1 : t < 3.8 ? 2 : t < T_SPAM ? 3 : Math.min(47, 3 + Math.floor(44 * sm(t, T_SPAM, T_SPAM1)));
          cHim.textContent = `CALLS: ${n}`; cHer.textContent = `CALLS: ${t < T_HERCALL ? 0 : 1}`;
          cHer.setAttribute("fill", t < T_HERCALL ? "#ff6a60" : "#bdbdbd");
          missed.setAttribute("opacity", win(t, T_MISSED, T_MISSED + 0.2).toFixed(3));
          bot.dark.setAttribute("opacity", (0.35 * win(t, T_MISSED, T_MISSED + 1.0)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0]; topS.style.color = typed(TOPSEQ, t)[1] || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "IF ONLY ONE CALLS,", L3 = "ONE DAY NOBODY PICKS UP.";
          E("head").innerHTML = `<div>LOVE IS A PHONE CALL. #12</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;

          // ---- FOLLOW: incoming call card between them ----
          const S0 = camPt(t, CARD[0], CARD[1]);
          const uq = sm(t, T_CARD, T_CARD + 0.4), H = 300 * backOut(uq);
          card.style.opacity = t >= T_CARD ? 1 : 0;
          card.style.left = r1(S0[0] - 170) + "px"; card.style.top = r1(S0[1] - H / 2) + "px"; card.style.height = r1(Math.max(0, H)) + "px";
          card.style.transform = `translateX(${r1(t < T_TAP && t > T_CARD + 0.4 ? 3 * Math.sin(t * 50) * (Math.sin(t * 6) > 0 ? 1 : 0) : 0)}px)`;
          const tapped = t >= T_TAP, btn = E("cBtn");
          btn.style.background = tapped ? "#ffffff" : "#25c45a"; btn.style.color = tapped ? "#000" : "#fff";
          btn.style.transform = `scale(${(tapped ? 1 - 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.2, 0, 1)) : 1 + 0.06 * Math.max(0, Math.sin(t * 6))).toFixed(3)})`;
          btn.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          const secs = Math.max(0, Math.floor((t - T_TAP) * 1));
          E("cIn").textContent = tapped ? `CONNECTED 00:0${Math.min(9, secs)}` : "INCOMING CALL";
          E("cIn").style.color = tapped ? "#7dff9a" : "#9fc0e0";
          const BP = [S0[0] + 82, S0[1] + 108];
          const hw = hp.hands[0], hs = camPt(t, hw[0], hw[1]), es = camPt(t, hw[0] + 40, hw[1] + 22);
          fist.setAttribute("opacity", t > T_CARD + 0.3 && hs[0] < S0[0] + 185 && hs[1] > S0[1] - 160 ? 1 : 0);
          const ad = `M${r1(es[0])} ${r1(es[1])} L${r1(hs[0])} ${r1(hs[1])}`; armO.setAttribute("d", ad); armW.setAttribute("d", ad);
          const rq = clamp((t - T_TAP) / 0.5, 0, 1);
          ring.setAttribute("opacity", tapped && rq < 1 ? (1 - rq).toFixed(3) : 0); ring.setAttribute("r", r1(30 + 300 * rq)); ring.setAttribute("cx", r1(BP[0])); ring.setAttribute("cy", r1(BP[1]));
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(BP[0] + Math.cos(a) * 300 * Math.sqrt(q3))} ${r1(BP[1] + Math.sin(a) * 200 * Math.sqrt(q3) - 60 * q3)}) scale(${(1 - 0.5 * q3).toFixed(2)})`); });
          const sq = t - (T_CARD + 0.5), line1 = "LOVE IS A ... #13", line2 = "TOMORROW.";
          sub.innerHTML = sq > 0 ? `${line1.slice(0, Math.floor(sq * 30))}&nbsp;<br/>${line2.slice(0, Math.max(0, Math.floor((sq - 0.7) * 30)))}&nbsp;` : "";
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
