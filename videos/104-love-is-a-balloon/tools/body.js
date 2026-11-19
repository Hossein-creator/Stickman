        // ---------- "love is a balloon. #22": winner split-screen format. One heart balloon. BOTH BLOW: they take turns, it grows big and lifts them off the ground. ONE BLOWS: he blows, she holds the knot loosely while scrolling, the air leaks out after every breath; he runs out of breath, she lets go, it flies away empty. FOLLOW: a "+ FOLLOW" tag hangs on the string, he taps it, the balloon pops into hearts: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 720, HER = 520, HIM = 710, NZ = [615, G - 300];
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const BL = 0.9, NB = 7, T0 = 0.4, T_LIFT = 6.6, T_HEART = 7.2;
        const T_TIRED = 4.6, T_LET = 6.0, T_GONE = 7.6;
        const T_H2 = 9.0, T_H3 = 10.2;
        const T_CTA = 12.6, T_TAG = 13.4, T_TAP = 15.0;
        const blowK = (t, i) => hold(t, T0 + i * BL, T0 + i * BL + 0.6, 0.15);
        // radius: top grows with every breath; bottom grows a bit, then leaks back
        const rTop = (t) => 26 + 16 * (clamp((t - T0) / BL, 0, NB) - frac(clamp((t - T0) / BL, 0, NB)) + sm(frac(clamp((t - T0) / BL, 0, NB)), 0, 0.6));
        function rBot(t) {
          let r = 26; const n = Math.min(5, Math.floor((t - T0) / BL) + 1);
          for (let i = 0; i < n; i++) { const a = T0 + i * BL; r += 18 * sm(t, a, a + 0.5) - 16 * sm(t, a + 0.55, a + 0.9 + 0.1 * i); }
          return r;
        }

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [HER, HIM]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.22 }, beams);
          for (let i = 0; i < 22; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 200), r: 2 + (i % 3), fill: "#fff", opacity: 0.22 }, inner);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          const glow = svgEl("circle", { r: 260, fill: "url(#redGlow)", opacity: 0 }, inner);
          const str = svgEl("path", { fill: "none", stroke: "#ddd", "stroke-width": 3 }, inner);
          const bal = svgEl("g", {}, inner);
          const balP = svgEl("path", { d: "M0 0 C-60 -40 -110 -110 -60 -150 C-30 -172 0 -150 0 -130 C0 -150 30 -172 60 -150 C110 -110 60 -40 0 0 Z", stroke: "#000", "stroke-width": 4, "vector-effect": "non-scaling-stroke" }, bal);
          const shine = svgEl("ellipse", { cx: -50, cy: -120, rx: 12, ry: 20, fill: "#fff", opacity: 0.45, transform: "rotate(-30 -50 -120)" }, bal);
          const knot = svgEl("path", { d: "M-8 8 L8 8 L0 -2 Z", stroke: "#000", "stroke-width": 3 }, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, str, bal, balP, knot, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        top.balP.setAttribute("fill", "#ff3b30"); top.knot.setAttribute("fill", "#ff3b30");
        bot.balP.setAttribute("fill", "#9a5a5a"); bot.knot.setAttribute("fill", "#9a5a5a");

        // ---------- poses ----------
        const lean = (x, f, k) => { const st = standOn(x, f, G); st.torso = 22 * k; st.head = -6 * k; reachTo(st, k, [NZ[0] - f * 6, NZ[1] + 10]); return st; };
        function topHer(t) {
          let k = 0; for (let i = 0; i < NB; i += 2) k = Math.max(k, blowK(t, i));
          const st = lean(HER, 1, k);
          const holdN = 1 - k; reachTo(st, holdN * (t < T_LIFT - 0.3 ? 1 : 0), [NZ[0] - 20, NZ[1] + 24]);
          const lift = win(t, T_LIFT - 0.3, T_LIFT); reachTo(st, lift, [NZ[0] - 8, NZ[1] + 20]); reachTo(st, lift, [NZ[0] - 40, stY - 200], "b");
          const up = 60 * sm(t, T_LIFT, T_LIFT + 1.2) + 6 * Math.sin(t * 2) * win(t, T_LIFT + 1.2, T_LIFT + 1.6);
          st.hy -= up; st.ay -= up; st.by -= up; st.ax += 10 * win(t, T_LIFT, T_LIFT + 0.5); st.head = lerp(st.head, -14, win(t, T_HEART, T_HEART + 0.4));
          return st;
        }
        function topHim(t) {
          let k = 0; for (let i = 1; i < NB; i += 2) k = Math.max(k, blowK(t, i));
          const st = lean(HIM, -1, k);
          const lift = win(t, T_LIFT - 0.3, T_LIFT); reachTo(st, lift, [NZ[0] + 8, NZ[1] + 22]); reachTo(st, lift, [NZ[0] + 40, stY - 200], "b");
          const up = 60 * sm(t, T_LIFT, T_LIFT + 1.2) + 6 * Math.sin(t * 2 + 1) * win(t, T_LIFT + 1.2, T_LIFT + 1.6);
          st.hy -= up; st.ay -= up; st.by -= up; st.head = lerp(st.head, -14, win(t, T_HEART, T_HEART + 0.4));
          const tap = hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.3); reachTo(st, tap, [NZ[0] + 4, NZ[1] + 120], "b");
          return st;
        }
        function botHim(t) {
          let k = 0; for (let i = 0; i < 6; i++) k = Math.max(k, t < T_LET ? blowK(t, i) : 0);
          const st = lean(HIM, -1, k);
          const tired = win(t, T_TIRED, T_TIRED + 0.5);
          st.hx += 6 * Math.sin(t * 9) * tired * (1 - k);
          const ko = win(t, T_LET + 0.4, T_LET + 1.0); st.torso = lerp(st.torso, 30, ko); st.hy += 20 * ko; reachTo(st, ko, [HIM - 40, stY + 40]); reachTo(st, ko, [HIM - 30, stY + 46], "b");
          st.head = lerp(st.head, -20, win(t, T_LET + 0.1, T_LET + 0.4) * (1 - win(t, T_GONE - 0.5, T_GONE)));
          return st;
        }
        function botHer(t) {
          const st = standOn(HER, 1, G); st.head = 26 + 2 * Math.sin(t * 1.3); st.torso = 6;
          reachTo(st, 1 - win(t, T_LET, T_LET + 0.2), [NZ[0] - 14, NZ[1] + 26]);
          reachTo(st, 1, [HER + 40, stY - 120], "b");
          reachTo(st, win(t, T_LET, T_LET + 0.3), [HER + 46, stY - 116]);
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const mkPuffs = (P2) => Array.from({ length: 4 }, () => svgEl("path", { fill: "none", stroke: "#cfd8e4", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, P2.fx));
        const puffT = mkPuffs(top), puffB = mkPuffs(bot), leak = mkPuffs(bot);
        const sweat = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const tag = svgEl("g", { opacity: 0 }, top.fx);
        const tagR = svgEl("rect", { x: -90, y: 0, width: 180, height: 54, rx: 18, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, tag);
        const tagT = svgEl("text", { x: 0, y: 37, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 28, fill: "#fff", "text-anchor": "middle" }, tag);
        const conf = Array.from({ length: 16 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BLOW"; botT.textContent = "ONE BLOWS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "BREATH BY BREATH"], [3.0, "IT GROWS"], [T_LIFT, "IT LIFTS THEM", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE BLOWS"], [1.5, "SHE HOLDS IT LOOSE", "#ff3b30"], [2.8, "THE AIR LEAKS OUT"], [T_TIRED, "HE'S OUT OF BREATH", "#ff3b30"], [T_LET, "SHE LETS GO", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [615, G - 330], CS = [540, 1000], ZK = 1.25;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        function drawBal(P2, pos, r, rot) { const k = r / 100; P2.bal.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1])}) rotate(${r1(rot)}) scale(${k.toFixed(3)})`); P2.knot.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1])}) rotate(${r1(rot)})`); }
        function drawPuffs(arr, t, src, dir, on) { arr.forEach((p, i) => { const q = frac(t * 3 + i / 4); p.setAttribute("d", `M${r1(src[0] + dir * 30 * q)} ${r1(src[1] - 8 + i * 5)} l${r1(dir * 18)} 0`); p.setAttribute("opacity", (on * (1 - q)).toFixed(3)); }); }

        function render(t) {
          // ---- top
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const up = 60 * sm(t, T_LIFT, T_LIFT + 1.2);
          const popQ = clamp((t - T_TAP) / 0.15, 0, 1), popped = t > T_TAP;
          const rT = rTop(t) * (1 + 0.04 * Math.sin(t * 3) * win(t, T_LIFT, T_LIFT + 1)) * (popped ? 1 + 0.4 * popQ : 1);
          const posT = [NZ[0], NZ[1] - up - 10 * sm(t, T_LIFT, T_LIFT + 1)];
          drawBal(top, posT, rT, 3 * Math.sin(t * 1.5));
          top.bal.setAttribute("opacity", popped ? 0 : 1); top.knot.setAttribute("opacity", popped ? 0 : 1);
          const hand = t > T_LIFT - 0.3 ? hp.hands[0] : [NZ[0], NZ[1] + 20];
          top.str.setAttribute("d", t > T_TAG - 0.6 && !popped ? `M${r1(posT[0])} ${r1(posT[1] + 6)} L${r1(posT[0])} ${r1(posT[1] + 110)}` : "");
          let blowing = 0, src = [0, 0], dir = 1; for (let i = 0; i < NB; i++) { const k = blowK(t, i); if (k > blowing) { blowing = k; const f = i % 2 ? hp : hp; src = i % 2 ? [mp.head[0] - 30, mp.head[1] + 10] : [hp.head[0] + 30, hp.head[1] + 10]; dir = i % 2 ? -1 : 1; } }
          drawPuffs(puffT, t, src, dir, blowing);
          top.glow.setAttribute("cx", r1(posT[0])); top.glow.setAttribute("cy", r1(posT[1] - rT)); top.glow.setAttribute("opacity", (0.6 * win(t, T_HEART, T_HEART + 0.5) * (popped ? 0 : 1)).toFixed(3));
          redSpot.setAttribute("points", `${NZ[0] - 60},${PY0} ${NZ[0] + 60},${PY0} ${NZ[0] + 260},${G} ${NZ[0] - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          // tag on the string, then confetti
          tag.setAttribute("opacity", t > T_TAG ? 1 : 0);
          const tp = [posT[0], posT[1] + 110 + (popped ? 0 : 0)];
          const bump = popped ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : backOut(sm(t, T_TAG, T_TAG + 0.4));
          tag.setAttribute("transform", `translate(${r1(tp[0])} ${r1(tp[1] + (popped ? 30 * sm(t, T_TAP, T_TAP + 0.6) : 0))}) rotate(${r1(popped ? 0 : 5 * Math.sin(t * 3))}) scale(${bump.toFixed(3)})`);
          tagR.setAttribute("fill", popped ? "#ffffff" : "#ff3b30"); tagT.setAttribute("fill", popped ? "#000" : "#fff");
          tagT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; tagT.setAttribute("font-size", popped ? 22 : 28);
          conf.forEach((h, i) => { const q = clamp((t - T_TAP) / 1.4, 0, 1), a = (i / 16) * Math.PI * 2; h.setAttribute("opacity", popped && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(posT[0] + Math.cos(a) * 300 * Math.sqrt(q))} ${r1(posT[1] - 120 + Math.sin(a) * 200 * Math.sqrt(q) + 200 * q * q)}) rotate(${r1(200 * q)}) scale(${(0.9 - 0.3 * q).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const fq = clamp((t - T_LET) / (T_GONE - T_LET), 0, 1);
          const rB = rBot(Math.min(t, T_LET)) * (1 - 0.6 * fq);
          const posB = t < T_LET ? [NZ[0], NZ[1]] : [NZ[0] + 260 * fq + 60 * Math.sin(fq * 18), NZ[1] - 520 * fq * fq - 80 * fq];
          drawBal(bot, posB, rB, t < T_LET ? 0 : 200 * fq + 30 * Math.sin(fq * 20));
          bot.str.setAttribute("d", "");
          let bk = 0; for (let i = 0; i < 6; i++) bk = Math.max(bk, t < T_LET ? blowK(t, i) : 0);
          drawPuffs(puffB, t, [bp.head[0] - 30, bp.head[1] + 10], -1, bk);
          const leaking = t > 1.0 && t < T_LET ? 1 - bk : 0;
          leak.forEach((p, i) => { const q = frac(t * 2.5 + i / 4); p.setAttribute("d", `M${r1(NZ[0] - 10 - 50 * q)} ${r1(NZ[1] + 20 + i * 6 + 20 * q)} l-16 6`); p.setAttribute("opacity", (0.8 * leaking * (1 - q)).toFixed(3)); });
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          sweat.forEach((e, i) => { const q = frac(t * 1.4 + i / 6); e.setAttribute("transform", `translate(${r1(bp.head[0] + (i % 2 ? 1 : -1) * (30 + 30 * q))} ${r1(bp.head[1] - 20 + 60 * q * q)})`); e.setAttribute("opacity", (hold(t, T_TIRED, T_GONE + 1.0, 0.4) * (1 - q)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_LET + 0.5, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE KEPT FILLING IT.", L3 = "SHE KEPT LETTING THE AIR OUT.";
          E("head").innerHTML = `<div>LOVE IS A BALLOON. #22</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #23 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TAP - 0.5) * 28)));
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
