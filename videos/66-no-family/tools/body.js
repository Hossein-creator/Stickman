        // ---------- "no family": AGE 9: an orphan boy stands alone in the rain in front of the orphanage gate, head down. A girl walks up, holds her umbrella over him and shares her sandwich. 15 YEARS LATER: he waits in front of a little house with a lit window, she walks up, he kneels with a ring, "YES!", hug, the house lights up ----------
        // remake of a 58.3x outlier (LOKESH DEGANA, "Orphan Animated Sad Love Story"), see viral/2026-11-05-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 9600); }
        }
        const W = E("world");
        const backG = E("back");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);

        // ---------- beats ----------
        const S2 = 5.0;
        const T_WALK = 0.9, T_ARR = 2.1, T_UMB = 2.3, T_SHARE = 3.0, T_TAKE = 3.4, T_EAT = 3.7, T_SMILE = 4.2;
        const T_IN = 5.3, T_AT = 6.4, T_KNEEL = 6.7, T_YES = 7.6, T_HUG = 8.1, T_HOLD = 8.5;
        const T_H1 = 9.6, T_H2 = 10.5, T_CARD = 11.6;
        const A = [0, 2400];
        const scene = (s) => (s < S2 ? 0 : 1);
        const AGE = [0.62, 1.0];
        const BOYX = A[0] + 680, GIRLX = A[0] + 560, MANX = A[1] + 700, WOMX = A[1] + 560;

        // ---------- sets ----------
        // 1: rainy street in front of the orphanage gate
        svgEl("rect", { x: A[0] + 250, y: FL - 520, width: 760, height: 520, fill: "#2a3040", opacity: 0.45 }, backG);
        svgEl("rect", { x: A[0] + 700, y: FL - 380, width: 300, height: 380, fill: "#3a3a42", stroke: "#000", "stroke-width": 5 }, backG);
        for (let i = 0; i < 3; i++) svgEl("rect", { x: A[0] + 730 + i * 90, y: FL - 340, width: 60, height: 70, fill: "#1c2230", stroke: "#000", "stroke-width": 4 }, backG);
        for (let i = 0; i < 9; i++) svgEl("line", { x1: A[0] + 520 + i * 24, y1: FL, x2: A[0] + 520 + i * 24, y2: FL - 230, stroke: "#5a5a62", "stroke-width": 6 }, roomG);
        svgEl("line", { x1: A[0] + 510, y1: FL - 200, x2: A[0] + 720, y2: FL - 200, stroke: "#5a5a62", "stroke-width": 6 }, roomG);
        const signG = svgEl("g", {}, roomG);
        svgEl("rect", { x: A[0] + 520, y: FL - 300, width: 200, height: 52, rx: 4, fill: "#d8d0c0", stroke: "#000", "stroke-width": 4 }, signG);
        const stx = svgEl("text", { x: A[0] + 620, y: FL - 266, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#333", "text-anchor": "middle" }, signG);
        stx.textContent = "ORPHANAGE";
        const rain = Array.from({ length: 34 }, (_, i) => ({ x: A[0] + 240 + ((i * 47) % 760), o: (i * 0.31) % 1, el: svgEl("line", { stroke: "#7d93b5", "stroke-width": 3, opacity: 0.6 }, fxG) }));
        // 2: sunset + a little house
        svgEl("rect", { x: A[1] + 250, y: FL - 520, width: 760, height: 520, fill: "#ff9a5a", opacity: 0.14 }, backG);
        const sunG = svgEl("circle", { cx: A[1] + 620, cy: FL - 140, r: 320, fill: "url(#fireGlow)", opacity: 0.45 }, backG);
        svgEl("rect", { x: A[1] + 780, y: FL - 230, width: 220, height: 230, fill: "#4a3b33", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("path", { d: `M${A[1] + 760} ${FL - 230} L${A[1] + 890} ${FL - 340} L${A[1] + 1020} ${FL - 230} Z`, fill: "#6b2f2a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: A[1] + 800, y: FL - 140, width: 60, height: 140, fill: "#2a1f1a", stroke: "#000", "stroke-width": 4 }, roomG);
        const win1 = svgEl("rect", { x: A[1] + 900, y: FL - 180, width: 70, height: 60, fill: "#ffd77a", stroke: "#000", "stroke-width": 4, opacity: 0.4 }, roomG);
        const winGlow = svgEl("circle", { cx: A[1] + 935, cy: FL - 150, r: 120, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- people (wrapped so they can grow up) ----------
        const himW = svgEl("g", {}, figG), herW = svgEl("g", {}, figG);
        const him = makeFig(himW, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, herW);
        const her = makeFig(herW, "#ffffff", "#e2e2e2", true, "her");
        herW.insertBefore(bun, her.g.previousSibling);
        const umb = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-110 0 Q0 -80 110 0 Q80 -10 55 0 Q27 -10 0 0 Q-27 -10 -55 0 Q-80 -10 -110 0 Z", fill: "#ffcc33", stroke: "#000", "stroke-width": 5 }, umb);
        svgEl("line", { x1: 0, y1: -40, x2: 0, y2: 120, stroke: "#000", "stroke-width": 5 }, umb);
        const sand = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-18 10 L18 10 L0 -16 Z", fill: "#f2d6a0", stroke: "#000", "stroke-width": 3 }, sand);
        svgEl("path", { d: "M-14 6 L14 6", stroke: "#5cb85c", "stroke-width": 4 }, sand);
        const sand2 = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-18 10 L18 10 L0 -16 Z", fill: "#f2d6a0", stroke: "#000", "stroke-width": 3 }, sand2);
        svgEl("path", { d: "M-14 6 L14 6", stroke: "#5cb85c", "stroke-width": 4 }, sand2);
        const ring = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -14, y: -14, width: 28, height: 16, rx: 3, fill: "#c0203a", stroke: "#000", "stroke-width": 3 }, ring);
        svgEl("circle", { cx: 0, cy: -20, r: 8, fill: "none", stroke: "#ffd23a", "stroke-width": 4 }, ring);
        const sparkle = svgEl("path", { d: "M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z", fill: "#fff6b0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);
        const tears = Array.from({ length: 2 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const bubble = (txt, w) => { const g = svgEl("g", { opacity: 0 }, fxG); svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g); svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g); svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g); const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#111", "text-anchor": "middle" }, g); tx.textContent = txt; return g; };
        const bHalf = bubble("HALF?", 140), bYes = bubble("YES!", 130), bHome = bubble("BE MY FAMILY?", 270);

        // ---------- poses (full-size coords; the wrapper scales around the feet) ----------
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
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
        const walking = (x0, x) => { const ft = feetOn(x0, x, 120, 14), sw = Math.sin((Math.PI * 2 * (x - x0)) / 120); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 }); };
        function herRaw(s) {
          if (scene(s) === 0) {
            if (s < T_ARR) { const x = lerp(A[0] + 300, GIRLX, ease(clamp((s - T_WALK) / (T_ARR - T_WALK), 0, 1))); const p = s < T_WALK ? standOn(A[0] + 300, 1, FL) : walking(A[0] + 300, x); reachTo(p, 1, [x + 30, stand - 160]); return p; }
            const p = standOn(GIRLX, 1, FL); p.head = 4;
            reachTo(p, 1, [GIRLX + 50, stand - 160]);                         // umbrella high
            const sh = hold(s, T_SHARE, T_TAKE + 0.25, 0.2); reachTo(p, sh, [GIRLX + 80, stand - 92], "b");
            const eat = hold(s, T_EAT, S2, 0.2); if (eat > 0) { const c = 0.5 - 0.5 * Math.cos((s - T_EAT) * 2 * Math.PI * 1.1); reachTo(p, eat, [GIRLX + 40, lerp(stand - 96, stand - 140, c)], "b"); }
            return p;
          }
          if (s < T_AT) { const x = lerp(A[1] + 300, WOMX, ease(clamp((s - T_IN) / (T_AT - T_IN), 0, 1))); return s < T_IN ? standOn(A[1] + 300, 1, FL) : walking(A[1] + 300, x); }
          const p = standOn(WOMX, 1, FL);
          const gasp = hold(s, T_KNEEL + 0.3, T_HUG, 0.15); reachTo(p, gasp, [WOMX + 70, stand - 110]); reachTo(p, gasp, [WOMX + 60, stand - 104], "b"); p.torso -= 6 * gasp;
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(WOMX, WOMX + 70, k), 1, FL); hug.torso = 8 * k; reachTo(hug, k, [WOMX + 125, stand - 150]); reachTo(hug, k, [WOMX + 112, stand - 120], "b"); return hug; }
          return p;
        }
        function himRaw(s) {
          if (scene(s) === 0) {
            const p = standOn(BOYX, -1, FL); p.head = 26; p.torso = 10;
            const up = win(s, T_UMB, T_UMB + 0.6); p.head = lerp(26, 6, up); p.torso = lerp(10, 4, up);
            const tk = hold(s, T_TAKE, S2, 0.2); reachTo(p, tk, [BOYX - 70, stand - 92], "b");
            const eat = hold(s, T_EAT, S2, 0.2); if (eat > 0) { const c = 0.5 - 0.5 * Math.cos((s - T_EAT) * 2 * Math.PI * 1.1 + 1); reachTo(p, eat, [BOYX - 40, lerp(stand - 96, stand - 140, c)], "b"); }
            return p;
          }
          const x = MANX;
          const kn = base({ hx: x, hy: FL - 96, torso: 8, head: -10, ax: x - 58, ay: FL, bx: x + 64, by: FL - 2 });
          reachTo(kn, 1, [x - 80, FL - 170]);
          const p = standOn(x, -1, FL);
          const k = hold(s, T_KNEEL, T_HUG, 0.3);
          const out = mixPose(p, kn, k);
          if (s > T_HUG) { const kk = win(s, T_HUG, T_HUG + 0.4); reachTo(out, kk, [x - 60, stand - 130]); reachTo(out, kk, [x - 50, stand - 100], "b"); out.head = 6; }
          return out;
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
          <div id="cm2" style="font-size:52px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:28px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE BOND THAT LINKS YOUR<br/>TRUE FAMILY IS NOT ONE OF<br/>BLOOD, BUT OF RESPECT AND<br/>JOY IN EACH OTHER'S LIFE."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">RICHARD BACH</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [
          [0, 2.2, A[0] + 640, 480, 0], [4.99, 2.45, A[0] + 640, 470, 0],
          [5.0, 1.9, A[1] + 640, 450, 0], [8.4, 2.1, A[1] + 650, 450, 0], [99, 2.0, A[1] + 650, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i];
          if (b[0] - a[0] < 0.02) return b.slice();
          const k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const LABEL = ["AGE 9", "15 YEARS LATER"];
        const herF = () => 1, himF = () => -1;

        function render(t) {
          const s = t, sc = scene(s);
          const [, cs, cx, cy, cr] = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) rotate(${cr.toFixed(2)}) scale(${cs.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const k = AGE[sc];
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const sw = (g, ax, ay) => g.setAttribute("transform", `translate(${r1(ax)} ${r1(ay)}) scale(${k}) translate(${r1(-ax)} ${r1(-ay)})`);
          sw(himW, mp.hip[0], FL); sw(herW, hp.hip[0], FL);
          const toW = (p, g) => { const m = g.transform.baseVal.consolidate(); if (!m) return p; const mm = m.matrix; return [mm.a * p[0] + mm.c * p[1] + mm.e, mm.b * p[0] + mm.d * p[1] + mm.f]; };
          const mh = toW(mp.head, himW), hh = toW(hp.head, herW), mhA = toW(mp.hands[0], himW), mhB = toW(mp.hands[1], himW), hhA = toW(hp.hands[0], herW), hhB = toW(hp.hands[1], herW);
          // rain (stops under the umbrella), umbrella, tears
          const ux = s < T_UMB ? hhA[0] : lerp(hhA[0], (mh[0] + hh[0]) / 2, win(s, T_UMB, T_UMB + 0.5));
          const uy = hhA[1] - 20;
          rain.forEach((d) => { const p = frac(t * 1.6 + d.o), y = FL - 500 + p * 520; const under = s > T_UMB + 0.3 && Math.abs(d.x - ux) < 100 && y > uy - 40; d.el.setAttribute("x1", d.x); d.el.setAttribute("y1", r1(y)); d.el.setAttribute("x2", d.x - 6); d.el.setAttribute("y2", r1(y + 26)); d.el.setAttribute("opacity", sc === 0 && !under ? 0.6 : 0); });
          umb.setAttribute("opacity", sc === 0 ? 1 : 0);
          umb.setAttribute("transform", `translate(${r1(ux)} ${r1(uy)}) scale(${k * 1.15})`);
          tears.forEach((d, i) => { const q = frac(t * 1.4 + i / 2), on = sc === 0 && s < T_UMB + 0.3; d.setAttribute("transform", `translate(${r1(mh[0] - 14 - 8 * i)} ${r1(mh[1] + 8 + 26 * q)}) scale(${k})`); d.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // sandwich halves: hers stays with her, the other half goes to him
          const sOn = sc === 0 && s > T_SHARE - 0.1;
          sand.setAttribute("opacity", sOn ? 1 : 0);
          const gq = win(s, T_TAKE, T_TAKE + 0.3);
          const sp = s < T_TAKE ? hhB : [lerp(hhB[0], mhB[0], gq), lerp(hhB[1], mhB[1], gq)];
          sand.setAttribute("transform", `translate(${r1(sp[0])} ${r1(sp[1] - 6)}) scale(${k})`);
          sand2.setAttribute("opacity", sOn && s > T_TAKE + 0.3 ? 1 : 0); sand2.setAttribute("transform", `translate(${r1(hhB[0])} ${r1(hhB[1] - 6)}) scale(${k})`);
          // ring, house light
          const rOn = sc === 1 && s > T_KNEEL + 0.2 && s < T_HUG;
          ring.setAttribute("opacity", rOn ? 1 : 0); ring.setAttribute("transform", `translate(${r1(mhA[0])} ${r1(mhA[1])})`);
          sparkle.setAttribute("opacity", rOn ? (0.6 + 0.4 * Math.sin(t * 20)).toFixed(3) : 0); sparkle.setAttribute("transform", `translate(${r1(mhA[0] + 14)} ${r1(mhA[1] - 40)}) rotate(${r1(t * 90)})`);
          const lit = win(s, T_HOLD, T_HOLD + 0.6);
          win1.setAttribute("opacity", (0.4 + 0.6 * lit).toFixed(3)); winGlow.setAttribute("opacity", (0.8 * lit).toFixed(3)); sunG.setAttribute("opacity", (0.45 + 0.25 * lit).toFixed(3));
          // speech + heart
          const bub = (g, a0, b0, p) => { const kk = hold(s, a0, b0, 0.12); g.setAttribute("opacity", kk.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(kk)).toFixed(3)})`); };
          bub(bHalf, T_SHARE, T_TAKE + 0.4, [hh[0] - 30, hh[1] - 150]);
          bub(bHome, T_KNEEL + 0.2, T_YES, [mh[0] + 20, mh[1] - 100]);
          bub(bYes, T_YES, T_HOLD + 0.4, [hh[0] - 40, hh[1] - 100]);
          const hb = sc === 0 ? T_SMILE : T_HOLD;
          const hq = clamp((s - hb) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 && s < T_CARD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mh[0] + hh[0]) / 2)} ${r1(Math.min(mh[1], hh[1]) - (sc === 0 ? 150 : 100))}) scale(${(backOut(hq) * (sc === 0 ? 0.6 : 1.1) * beat).toFixed(3)})`);
          E("num").textContent = LABEL[sc];
          const st0 = [0, S2][sc];
          E("ctr").style.opacity = (s > T_H1 - 0.4 ? 0 : 1 - win(s, st0 + 1.6, st0 + 2.0)).toFixed(3);

          E("h1").innerHTML = slam(["HE", "HAD", "NO", "FAMILY."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, []);
          E("h2").innerHTML = slam(["SO", "SHE", "BECAME", "ONE."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, [2, 3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["FAMILY", "ISN'T"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["ALWAYS", "BLOOD."], [T_CARD + 0.7, T_CARD + 0.9], t, [1]);
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
