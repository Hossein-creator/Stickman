        // ---------- "you won": an argument with a scoreboard, HER 5 : 0 HIM. He finally scores one point with proof on his phone. He celebrates with a trophy... she goes silent, gets into bed, light off, a pillow flies at him. He sleeps on the couch, hugging his trophy ----------
        // remake of an 8.9x outlier (Mr Stickify, "POV: you finally win an argument with your girlfriend"), see viral/2026-11-01-check.md
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
        const frontG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const ROUNDS = [0.5, 1.3, 2.1, 2.9, 3.7];
        const T_PROOF = 4.6, T_SCORE = 5.0, T_SILENT = 5.2, T_CELEB = 5.5, T_TURN = 6.6, T_BED = 7.4, T_OFF = 7.9, T_PILLOW = 8.2, T_COUCH = 8.6;
        const T_H1 = 10.6, T_H2 = 11.5, T_CARD = 12.8;
        const HX = 480, SX2 = 650, BED0 = 800, BED1 = 1080, MT = FL - 70, COUCH = 200, SEAT = FL - 66;

        // ---------- room ----------
        const winR = svgEl("rect", { x: 520, y: FL - 470, width: 180, height: 150, fill: "#2a3a5a", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const moon = svgEl("circle", { cx: 650, cy: FL - 430, r: 16, fill: "#e6e8f0", opacity: 0 }, backG);
        const lampGlow = svgEl("circle", { cx: 640, cy: FL - 300, r: 520, fill: "url(#fireGlow)", opacity: 0.45 }, backG);
        svgEl("line", { x1: 640, y1: FL - 760, x2: 640, y2: FL - 560, stroke: "#444", "stroke-width": 4 }, backG);
        const bulb = svgEl("circle", { cx: 640, cy: FL - 548, r: 14, fill: "#ffd890", stroke: "#000", "stroke-width": 4 }, backG);
        svgEl("polygon", { points: `580,${FL - 548} 700,${FL - 548} 820,${FL} 460,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.12 }, beams);
        // bed (right)
        svgEl("rect", { x: BED1 - 10, y: FL - 200, width: 24, height: 200, rx: 6, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT + 22, width: BED1 - BED0, height: 30, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT, width: BED1 - BED0, height: 26, rx: 10, fill: "#4a4a52", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("ellipse", { cx: BED1 - 50, cy: MT - 8, rx: 40, ry: 14, fill: "#d9d9e3", stroke: "#000", "stroke-width": 5 }, roomG);
        const blanket = svgEl("path", { fill: "#7a3f5a", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, frontG);
        // couch (left)
        svgEl("rect", { x: COUCH - 140, y: FL - 150, width: 280, height: 90, rx: 22, fill: "#4a5a4a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH - 170, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#3e4e3e", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH + 120, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#3e4e3e", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUCH - 150, y: SEAT, width: 300, height: 52, rx: 14, fill: "#5a6a5a", stroke: "#000", "stroke-width": 5 }, roomG);
        const night = svgEl("rect", { x: -1400, y: -800, width: 3400, height: 2400, fill: "#020408", opacity: 0 }, fxG);

        // ---------- people + props ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const phone = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -14, y: -24, width: 28, height: 48, rx: 5, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, phone);
        svgEl("path", { d: "M-8 0 L-2 8 L10 -8", fill: "none", stroke: "#2a9a4a", "stroke-width": 5, "stroke-linecap": "round" }, phone);
        const trophy = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-26 -60 L26 -60 Q24 -24 0 -18 Q-24 -24 -26 -60 Z", fill: "#ffd23a", stroke: "#000", "stroke-width": 4 }, trophy);
        svgEl("path", { d: "M-26 -54 Q-44 -50 -30 -34 M26 -54 Q44 -50 30 -34", fill: "none", stroke: "#000", "stroke-width": 4 }, trophy);
        svgEl("rect", { x: -6, y: -20, width: 12, height: 12, fill: "#ffd23a", stroke: "#000", "stroke-width": 3 }, trophy);
        svgEl("rect", { x: -18, y: -10, width: 36, height: 10, rx: 2, fill: "#8a5a2a", stroke: "#000", "stroke-width": 3 }, trophy);
        const glint = svgEl("path", { d: "M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z", fill: "#fff6b0", opacity: 0 }, fxG);
        const pillow = svgEl("ellipse", { rx: 40, ry: 15, fill: "#d9d9e3", stroke: "#000", "stroke-width": 5, opacity: 0 }, fxG);
        const confetti = Array.from({ length: 16 }, (_, i) => ({ a: (i / 16) * Math.PI * 2, v: 160 + (i % 5) * 40, c: ["#ff3b30", "#ffd23a", "#4ab0ff", "#7ad06a"][i % 4], el: null }));
        confetti.forEach((c) => (c.el = svgEl("rect", { width: 10, height: 6, fill: c.c, opacity: 0 }, fxG)));
        const bubble = (txt, w, size = 34, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const SHE_SAYS = ["BLAH BLAH!", "#@!?%!", "ALSO LAST YEAR!", "AND YOUR MOM!", "SO THERE!"];
        const bHer = ROUNDS.map((_, i) => bubble(SHE_SAYS[i], 210 + 30 * (i % 3), 30, "#ff3b30"));
        const bBut = ROUNDS.map(() => bubble("BUT-", 110, 28));
        const bProof = bubble("ACTUALLY...", 230, 32);
        const bDots = bubble("...", 110, 44);
        const zzs = [0, 1, 2].map(() => { const z = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#9aa4c0", "text-anchor": "middle", opacity: 0 }, fxG); z.textContent = "z"; return z; });

        // ---------- poses ----------
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 110, 12), sw = Math.sin((Math.PI * 2 * (x - x0)) / 110); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 26 * sw, ael: 20, bsh: -4 - 26 * sw, bel: 20 }); };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function herRaw(s) {
          if (s < T_TURN) {
            const st = standOn(SX2, -1, FL);
            let point = 0; ROUNDS.forEach((r) => (point = Math.max(point, hold(s, r, r + 0.6, 0.1))));
            reachTo(st, point, [SX2 - 120, stand - 150 + 10 * Math.sin(s * 14)]); st.torso += 10 * point;
            reachTo(st, 1 - point, [SX2 + 20, stand - 40], "b");   // hand on her hip
            const silent = win(s, T_SILENT, T_SILENT + 0.2); st.head = lerp(st.head, 10, silent); st.torso = lerp(st.torso, 0, silent);
            reachTo(st, silent, [SX2 + 26, stand - 120]); reachTo(st, silent, [SX2 + 14, stand - 112], "b");   // arms crossed
            return st;
          }
          if (s < T_BED) return walking(SX2, lerp(SX2, BED0 + 60, ease((s - T_TURN) / (T_BED - T_TURN))));
          // in bed, lying with her back to the room; throws the pillow
          const lie = base({ hx: BED0 + 110, hy: MT - 22, torso: 90, head: 0, ax: BED0 - 20, ay: MT - 18, bx: BED0 - 14, by: MT - 12, ash: 0, ael: 0, aw: 1, atx: BED0 + 150, aty: MT - 14, bw: 1, btx: BED0 + 140, bty: MT - 20 });
          const toBed = win(s, T_BED, T_BED + 0.35);
          const thr = Math.sin(Math.PI * clamp((s - T_PILLOW + 0.15) / 0.35, 0, 1));
          reachTo(lie, thr, [BED0 + 60, MT - 160]);
          return mixPose(standOn(BED0 + 60, 1, FL), lie, toBed);
        }
        const herF = (s) => (s < T_TURN + 0.05 ? -1 : 1);
        function himRaw(s) {
          if (s < T_COUCH) {
            const st = standOn(HX, 1, FL);
            let but = 0; ROUNDS.forEach((r) => (but = Math.max(but, hold(s, r + 0.4, r + 0.75, 0.08))));
            reachTo(st, but, [HX + 80, stand - 140]); st.torso -= 6 * hold(s, 0.4, T_PROOF, 0.2); st.head += 8 * hold(s, 0.4, T_PROOF, 0.2);
            const proof = hold(s, T_PROOF, T_CELEB, 0.15); reachTo(st, proof, [HX + 90, stand - 170]); st.head -= 6 * proof;
            const celeb = hold(s, T_CELEB, T_TURN + 0.6, 0.15);
            if (celeb > 0) { reachTo(st, celeb, [HX - 30, stand - 270 + 10 * Math.sin(s * 12)]); reachTo(st, celeb, [HX + 30, stand - 270 + 10 * Math.sin(s * 12 + 1)], "b"); st.hy -= 30 * Math.abs(Math.sin(s * 8)) * celeb; st.head -= 14 * celeb; }
            const shocked = win(s, T_PILLOW + 0.25, T_PILLOW + 0.4); st.torso -= 14 * shocked; st.head -= 10 * shocked;
            return st;
          }
          // on the couch in the dark, hugging his trophy
          const x = lerp(HX, COUCH, ease((s - T_COUCH) / 0.6));
          if (s < T_COUCH + 0.6) { const p = walking(HX, x); p.torso += 10; p.head += 14; reachTo(p, 1, [x + 30, stand - 120]); return p; }
          const sit = base({ hx: COUCH, hy: SEAT - 8, torso: 14, head: 26, ax: COUCH + 66, ay: FL, bx: COUCH + 52, by: FL, aw: 1, atx: COUCH + 46, aty: SEAT - 120, bw: 1, btx: COUCH + 36, bty: SEAT - 110 });
          return mixPose(standOn(COUCH, 1, FL), sit, win(s, T_COUCH + 0.6, T_COUCH + 1.0));
        }
        const himF = (s) => (s >= T_COUCH && s < T_COUCH + 0.6 ? -1 : 1);

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
        card.innerHTML = `<div id="cm1" style="font-size:58px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:42px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"WOULD YOU RATHER<br/>BE RIGHT OR HAPPY?"<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">GERALD JAMPOLSKY</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const CK = [
          [0, 1.9, 570, 440, 0], [3.7, 2.1, 570, 430, 0], [4.6, 2.5, 520, 420, 0], [5.4, 1.9, 540, 440, 0], [6.5, 1.8, 560, 450, 0],
          [7.6, 1.6, 700, 460, 0], [8.4, 1.5, 560, 460, 0], [9.4, 2.2, 260, 450, 0], [99, 2.3, 250, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = t;
          let kick = 0, flash = 0;
          const hit = (tr, k, f, d) => { if (t >= tr) { kick += k * Math.exp(-(t - tr) / d); flash += f * Math.exp(-(t - tr) / (d * 0.35)); } };
          ROUNDS.forEach((r) => hit(r, 0.35, 0, 0.12)); hit(T_SCORE, 1.0, 0.4, 0.25); hit(T_OFF, 0.3, 0, 0.2); hit(T_PILLOW + 0.3, 0.8, 0, 0.2);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 10 * Math.min(kick, 1.2), shy = Math.cos(t * 59) * 8 * Math.min(kick, 1.2);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          E("flash").style.opacity = Math.min(0.6, flash).toFixed(3);

          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const hf = herF(s);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), hf);
          bun.setAttribute("cx", r1(hp.head[0] + (s < T_BED ? -hf * 25 : 0))); bun.setAttribute("cy", r1(hp.head[1] - (s < T_BED ? 16 : 26)));
          // lights out
          const off = win(s, T_OFF, T_OFF + 0.1);
          night.setAttribute("opacity", (0.55 * off).toFixed(3));
          lampGlow.setAttribute("opacity", (0.45 * (1 - off)).toFixed(3)); bulb.setAttribute("fill", off > 0.5 ? "#444" : "#ffd890");
          winR.setAttribute("fill", off > 0.5 ? "#0e1830" : "#2a3a5a"); moon.setAttribute("opacity", off.toFixed(3));
          // blanket over her
          const bk = win(s, T_BED + 0.2, T_BED + 0.5);
          blanket.setAttribute("opacity", bk.toFixed(3));
          blanket.setAttribute("d", `M${BED0 - 6} ${MT + 30} L${BED0 - 10} ${MT - 30} Q${BED0 + 120} ${MT - 70} ${BED1 - 90} ${MT - 40} L${BED1 - 80} ${MT + 30} Z`);
          // props
          phone.setAttribute("opacity", hold(s, T_PROOF, T_CELEB, 0.1).toFixed(3));
          phone.setAttribute("transform", `translate(${r1(mp.hands[0][0] + 6)} ${r1(mp.hands[0][1] - 20)})`);
          const tOn = s > T_CELEB;
          trophy.setAttribute("opacity", tOn ? 1 : 0);
          const tp = s < T_COUCH ? [(mp.hands[0][0] + mp.hands[1][0]) / 2, Math.min(mp.hands[0][1], mp.hands[1][1]) - 4] : [(mp.hands[0][0] + mp.hands[1][0]) / 2 + 10, (mp.hands[0][1] + mp.hands[1][1]) / 2 + 40];
          trophy.setAttribute("transform", `translate(${r1(tp[0])} ${r1(tp[1])})`);
          glint.setAttribute("opacity", tOn && frac(t * 0.8) < 0.2 ? 1 : 0); glint.setAttribute("transform", `translate(${r1(tp[0] + 14)} ${r1(tp[1] - 50)}) rotate(${r1(t * 120)})`);
          confetti.forEach((c) => { const q = s - T_CELEB, on = q > 0 && q < 1.4; c.el.setAttribute("opacity", on ? (1 - q / 1.4).toFixed(3) : 0); c.el.setAttribute("transform", `translate(${r1(mp.head[0] + Math.cos(c.a) * c.v * Math.min(q, 0.5))} ${r1(mp.head[1] - 60 + Math.sin(c.a) * c.v * Math.min(q, 0.5) + 200 * q * q)}) rotate(${r1(q * 400 + c.a * 60)})`); });
          // the pillow: from her bed to his face
          const pq = clamp((s - T_PILLOW) / 0.35, 0, 1);
          pillow.setAttribute("opacity", s > T_PILLOW && s < T_COUCH + 1.2 ? 1 : 0);
          const ph = s < T_COUCH ? [lerp(BED0 + 60, mp.head[0] + 20, pq), lerp(MT - 160, mp.head[1], pq) - 80 * Math.sin(Math.PI * pq)] : [mp.hands[1][0] - 10, mp.hands[1][1] - 20];
          pillow.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])}) rotate(${r1(-300 * pq)})`);
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.08); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          ROUNDS.forEach((r, i) => { bub(bHer[i], r, r + 0.75, [hp.head[0] - 40, hp.head[1] - 110 - (i % 2) * 20]); bub(bBut[i], r + 0.45, r + 0.7, [mp.head[0] - 70, mp.head[1] - 60]); });
          bub(bProof, T_PROOF, T_SCORE + 0.3, [mp.head[0] + 40, mp.head[1] - 110]);
          bub(bDots, T_SILENT + 0.2, T_TURN, [hp.head[0] - 10, hp.head[1] - 100]);
          const asleep = s > T_COUCH + 1.2 ? 1 : 0;
          zzs.forEach((z, i) => { const q = frac(t * 0.55 + i / 3); z.setAttribute("x", r1(hp.head[0] + 10 + 26 * q)); z.setAttribute("y", r1(hp.head[1] - 30 - 80 * q)); z.setAttribute("font-size", r1(22 + 22 * q)); z.setAttribute("opacity", (asleep * Math.sin(Math.PI * q) * 0.8).toFixed(3)); });
          // scoreboard
          const her5 = ROUNDS.filter((r) => s > r + 0.1).length;
          E("num").textContent = `${her5} : ${s > T_SCORE ? 1 : 0}`;
          const tick = [...ROUNDS, T_SCORE].reduce((m, c) => m + (s > c ? 0.35 * Math.exp(-(s - c) * 7) : 0), 0);
          E("num").style.transform = `scale(${(1 + tick).toFixed(3)})`;
          E("num").style.color = s > T_SCORE ? "#ffd23a" : "#fff";
          E("ctr").style.opacity = (win(s, 0.3, 0.5) * (1 - win(s, T_TURN, T_TURN + 0.3))).toFixed(3);

          E("h1").innerHTML = slam(["YOU", "WON", "THE", "ARGUMENT."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, []);
          E("h2").innerHTML = slam(["YOU", "LOST", "THE", "BED."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["BEING", "RIGHT"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["ISN'T", "ALWAYS", "WINNING."], [T_CARD + 0.75, T_CARD + 0.9, T_CARD + 1.05], t, [2]);
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
