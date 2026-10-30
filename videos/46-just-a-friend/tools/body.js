        // ---------- "just a friend": her phone keeps buzzing with hearts. "HE'S JUST A FRIEND." "YEAH YEAH..." Roses fly in. A giant teddy. Then a ring box. She looks at him, snaps it shut, blocks the friend, throws it all out and cuddles into him ----------
        // remake of a 3.5x outlier (Havefunzer, "c'est juste un ami... oui ouiii"), see viral/2026-10-30-check.md
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
        const propG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);

        // ---------- beats ----------
        const T_BUZZ = 0.6, T_WHO = 1.3, T_FRIEND = 2.0, T_YEAH1 = 2.9, T_ROSES = 3.8, T_YEAH2 = 4.4, T_TEDDY = 5.3, T_YEAH3 = 5.9;
        const T_RING = 7.0, T_OPEN = 7.4, T_DOTS = 7.7, T_LOOK = 8.3, T_SNAP = 8.75, T_BLOCK = 9.0, T_OUT = 9.35, T_CUDDLE = 9.9, T_HOLD = 10.3;
        const T_H1 = 11.0, T_H2 = 12.0, T_CARD = 13.2;
        const C0 = 300, C1 = 660, SEAT = FL - 66, HX = 400, SX2 = 540;

        // ---------- room ----------
        svgEl("rect", { x: 380, y: FL - 470, width: 200, height: 170, fill: "#1e2638", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("line", { x1: 480, y1: FL - 470, x2: 480, y2: FL - 300, stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("circle", { cx: 230, cy: FL - 230, r: 420, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("rect", { x: 222, y: FL - 230, width: 8, height: 230, fill: "#666", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("path", { d: `M196 ${FL - 228} L256 ${FL - 228} L244 ${FL - 280} L208 ${FL - 280} Z`, fill: "#ffe0a0", stroke: "#000", "stroke-width": 4 }, roomG);
        const warm = svgEl("ellipse", { cx: 470, cy: FL - 140, rx: 330, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);
        svgEl("polygon", { points: `380,${FL - 470} 580,${FL - 470} 700,${FL} 300,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.12 }, beams);
        svgEl("rect", { x: C0, y: FL - 150, width: C1 - C0, height: 90, rx: 22, fill: "#3f5a6e", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: C0 - 30, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#36505f", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: C1 - 20, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#36505f", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: C0 - 10, y: SEAT, width: C1 - C0 + 20, height: 52, rx: 14, fill: "#4a6a80", stroke: "#000", "stroke-width": 5 }, roomG);

        // ---------- people ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#fireGlow)", opacity: 0 }, fxG);
        const phone = svgEl("g", {}, fxG);
        svgEl("rect", { x: -11, y: -18, width: 22, height: 36, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, phone);
        const blocked = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -70, y: -24, width: 140, height: 44, rx: 6, fill: "none", stroke: "#ff3b30", "stroke-width": 6 }, blocked);
        const btx = svgEl("text", { x: 0, y: 11, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#ff3b30", "text-anchor": "middle" }, blocked);
        btx.textContent = "BLOCKED";
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const pings = Array.from({ length: 9 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 34) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: "#111", "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bWho = bubble("WHO?", 140), bFriend = bubble("JUST A FRIEND.", 310), bY1 = bubble("YEAH YEAH...", 270), bY2 = bubble("YEAH YEAH...", 270), bY3 = bubble("YEAH. YEAH.", 290, 40), bDots = bubble("...", 120, 44);
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);

        // ---------- the gifts from the "friend" ----------
        const roses = svgEl("g", { opacity: 0 }, propG);
        svgEl("path", { d: "M-22 0 L22 0 L6 60 L-6 60 Z", fill: "#f2e6d0", stroke: "#000", "stroke-width": 4 }, roses);
        for (const [x, y] of [[-14, -8], [10, -12], [-2, -24], [18, 4], [-20, 8]]) { svgEl("line", { x1: x * 0.4, y1: 30, x2: x, y2: y, stroke: "#3a7a3a", "stroke-width": 4 }, roses); svgEl("circle", { cx: x, cy: y, r: 11, fill: "#e0303a", stroke: "#000", "stroke-width": 3 }, roses); }
        const teddy = svgEl("g", { opacity: 0 }, propG);
        const brown = { fill: "#a87850", stroke: "#000", "stroke-width": 6 };
        svgEl("circle", { cx: -70, cy: -310, r: 34, ...brown }, teddy); svgEl("circle", { cx: 70, cy: -310, r: 34, ...brown }, teddy);
        svgEl("ellipse", { cx: -80, cy: -20, rx: 56, ry: 36, ...brown }, teddy); svgEl("ellipse", { cx: 80, cy: -20, rx: 56, ry: 36, ...brown }, teddy);
        svgEl("ellipse", { cx: 0, cy: -110, rx: 110, ry: 120, ...brown }, teddy);
        svgEl("ellipse", { cx: -100, cy: -140, rx: 34, ry: 60, ...brown, transform: "rotate(25 -100 -140)" }, teddy); svgEl("ellipse", { cx: 100, cy: -140, rx: 34, ry: 60, ...brown, transform: "rotate(-25 100 -140)" }, teddy);
        svgEl("circle", { cx: 0, cy: -260, r: 86, ...brown }, teddy);
        svgEl("ellipse", { cx: 0, cy: -236, rx: 34, ry: 24, fill: "#d8b088", stroke: "#000", "stroke-width": 4 }, teddy);
        svgEl("circle", { cx: 0, cy: -248, r: 8, fill: "#000" }, teddy);
        for (const x of [-30, 30]) svgEl("circle", { cx: x, cy: -282, r: 8, fill: "#000" }, teddy);
        svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, transform: "translate(0 -110) scale(1.3)" }, teddy);
        const ringBox = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -16, y: -18, width: 32, height: 18, rx: 3, fill: "#c0203a", stroke: "#000", "stroke-width": 3 }, ringBox);
        const lid = svgEl("rect", { x: -16, y: -26, width: 32, height: 10, rx: 3, fill: "#d0304a", stroke: "#000", "stroke-width": 3 }, ringBox);
        const ring = svgEl("circle", { cx: 0, cy: -24, r: 9, fill: "none", stroke: "#ffd23a", "stroke-width": 4, opacity: 0 }, ringBox);
        const sparkle = svgEl("path", { d: "M0 -26 L6 -6 L26 0 L6 6 L0 26 L-6 6 L-26 0 L-6 -6 Z", fill: "#fff6b0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);

        // ---------- poses ----------
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const seated = (x, f) => base({ hx: x, hy: SEAT - 10, torso: 4, head: 0, ax: x + f * 66, ay: FL, bx: x + f * 52, by: FL, aw: 1, atx: x + f * 60, aty: SEAT - 30, bw: 1, btx: x + f * 50, bty: SEAT - 26 });
        // him: looks over, crosses his arms, face-palms at the teddy, frozen at the ring, smiles at the end
        function himRaw(s) {
          const st = seated(HX, 1);
          const look = win(s, T_WHO - 0.2, T_WHO);
          st.head = lerp(0, 24, look) + 4 * Math.sin(s * 1.2);
          const cross = hold(s, T_YEAH1 - 0.1, T_RING, 0.25);
          reachTo(st, cross, [HX + 34, SEAT - 120]); reachTo(st, cross, [HX + 22, SEAT - 112], "b");
          st.torso -= 8 * cross; st.head -= 14 * cross;
          const palm = hold(s, T_YEAH3 - 0.05, T_RING - 0.1, 0.2);
          reachTo(st, palm, [HX + 30, SEAT - 210]); st.head += 20 * palm;
          // the ring: jaw drop, leans forward
          const froze = hold(s, T_OPEN, T_CUDDLE, 0.15);
          st.torso += 22 * froze; st.head -= 10 * froze;
          // she cuddles into him: arm around her
          const cud = win(s, T_CUDDLE, T_CUDDLE + 0.4);
          reachTo(st, cud, [SX2 + 6, SEAT - 130]); st.head = lerp(st.head, 10, cud);
          return st;
        }
        function herRaw(s) {
          const st = seated(SX2, 1);
          st.head = 26 + 2 * Math.sin(s * 1.3); st.torso = 8;
          reachTo(st, 1, [SX2 + 46, SEAT - 100]); reachTo(st, 1, [SX2 + 38, SEAT - 94], "b");
          // turns to him to say "just a friend"
          const say = hold(s, T_FRIEND - 0.1, T_YEAH1 + 0.2);
          st.head -= 26 * say; st.torso -= 6 * say;
          // catches the roses, holds them
          const rose = hold(s, T_ROSES + 0.25, T_OUT + 0.1, 0.15);
          reachTo(st, rose, [SX2 + 60, SEAT - 130], "b");
          // ring box in her hand: looks at it, then at him
          const lk = hold(s, T_LOOK, T_SNAP + 0.2, 0.15);
          st.head -= 40 * lk;
          // throws it all out
          const out = Math.sin(Math.PI * clamp((s - T_OUT) / 0.35, 0, 1));
          reachTo(st, out, [SX2 + 150, SEAT - 200], "b"); st.torso += 12 * out;
          // cuddles into him
          const cud = win(s, T_CUDDLE, T_CUDDLE + 0.4);
           st.btx = lerp(st.btx, SX2 - 10, cud); st.bty = lerp(st.bty, SEAT - 40, cud); st.torso = lerp(st.torso, -16, cud); st.head = lerp(st.head, -14, cud);
          reachTo(st, cud, [HX + 70, SEAT - 80], "a");
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
          <div id="cm2" style="font-size:42px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE BEST WAY TO FIND OUT<br/>IF YOU CAN TRUST SOMEBODY<br/>IS TO TRUST THEM."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ERNEST HEMINGWAY</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys ----------
        const CK = [
          [0, 2.2, 480, 450, 0], [1.2, 2.4, 500, 440, 0], [2.0, 2.3, 520, 440, 0], [3.6, 1.9, 520, 450, 0], [5.2, 1.6, 580, 460, 0],
          [6.8, 1.65, 580, 460, 0], [7.3, 2.6, 560, 430, -1.5], [8.0, 2.4, 520, 440, 1], [9.2, 1.8, 540, 460, 0], [10.0, 2.2, 480, 450, 0], [99, 1.9, 480, 460, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        // a thrown gift: flies in from the right on an arc, lands at `to`
        const flyIn = (s, t0, d, to, h) => { const q = clamp((s - t0) / d, 0, 1); return [lerp(1200, to[0], ease(q)), lerp(to[1] - 300, to[1], q) - Math.sin(Math.PI * q) * h, q]; };

        // ---------- per-frame render ----------
        function render(t) {
          const s = t;
          let kick = 0, flash = 0;
          const hit = (tr, k, f, d) => { if (t >= tr) { kick += k * Math.exp(-(t - tr) / d); flash += f * Math.exp(-(t - tr) / (d * 0.35)); } };
          hit(T_ROSES + 0.3, 0.3, 0, 0.12); hit(T_TEDDY + 0.4, 1.0, 0, 0.25); hit(T_OPEN, 0.8, 0.35, 0.25); hit(T_BLOCK, 0.6, 0, 0.2);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 10 * Math.min(kick, 1.2), shy = Math.cos(t * 59) * 8 * Math.min(kick, 1.2);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          E("flash").style.opacity = Math.min(0.6, flash).toFixed(3);

          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const ph = [(hp.hands[0][0] + hp.hands[1][0]) / 2, (hp.hands[0][1] + hp.hands[1][1]) / 2];
          const hasRing = s > T_RING + 0.35 && s < T_OUT;
          phone.setAttribute("transform", `translate(${r1(hp.hands[0][0] + 4)} ${r1(hp.hands[0][1] - 8)}) rotate(${(4 * Math.sin(t * 60) * (frac(t * 0.9) < 0.15 && s < T_RING ? 1 : 0)).toFixed(2)})`);
          phone.setAttribute("opacity", s < T_CUDDLE ? 1 : 1 - win(s, T_CUDDLE, T_CUDDLE + 0.2));
          phoneGlow.setAttribute("cx", r1(hp.hands[0][0])); phoneGlow.setAttribute("cy", r1(hp.hands[0][1] - 10));
          phoneGlow.setAttribute("opacity", (s < T_BLOCK ? 0.6 + 0.3 * Math.sin(t * 6) : 0).toFixed(3));
          // heart pings out of the phone
          pings.forEach((p, i) => {
            const t0 = T_BUZZ + i * 0.75, q = (s - t0) / 0.9;
            const on = q > 0 && q < 1 && t0 < T_RING;
            p.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0);
            p.setAttribute("transform", `translate(${r1(hp.hands[0][0] + 20 + 30 * q * (i % 2 ? 1 : -0.4))} ${r1(hp.hands[0][1] - 30 - 120 * q)}) scale(${(0.4 + 0.3 * q).toFixed(3)})`);
          });
          blocked.setAttribute("opacity", hold(s, T_BLOCK, T_CUDDLE + 0.2, 0.08).toFixed(3));
          blocked.setAttribute("transform", `translate(${r1(hp.hands[0][0] + 10)} ${r1(hp.hands[0][1] - 90)}) rotate(-8) scale(${(1 + 0.6 * Math.exp(-Math.max(0, s - T_BLOCK) * 10)).toFixed(3)})`);
          // gifts
          const lap = [hp.hands[1][0], hp.hands[1][1]];
          if (s < T_ROSES) roses.setAttribute("opacity", 0);
          else if (s < T_ROSES + 0.3) { const [x, y] = flyIn(s, T_ROSES, 0.3, [lap[0], lap[1] - 10], 120); roses.setAttribute("opacity", 1); roses.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(-360 * (s - T_ROSES) / 0.3)})`); }
          else if (s < T_OUT + 0.1) { roses.setAttribute("opacity", 1); roses.setAttribute("transform", `translate(${r1(lap[0])} ${r1(lap[1] - 10)}) rotate(-20)`); }
          else { const q = clamp((s - T_OUT - 0.1) / 0.4, 0, 1); roses.setAttribute("opacity", q < 1 ? 1 : 0); roses.setAttribute("transform", `translate(${r1(lap[0] + 600 * q)} ${r1(lap[1] - 10 - 200 * Math.sin(Math.PI * q))}) rotate(${r1(-20 + 500 * q)})`); }
          if (s < T_TEDDY) teddy.setAttribute("opacity", 0);
          else {
            let x, y, rot = 0;
            if (s < T_TEDDY + 0.4) { const r = flyIn(s, T_TEDDY, 0.4, [790, FL], 160); x = r[0]; y = r[1]; rot = 30 * (1 - r[2]); }
            else if (s < T_OUT) { x = 790; y = FL; rot = 3 * Math.sin(t * 2); }
            else { const q = clamp((s - T_OUT) / 0.5, 0, 1); x = 790 + 700 * q; y = FL - 250 * Math.sin(Math.PI * q); rot = 200 * q; }
            const squash = s > T_TEDDY + 0.4 && s < T_TEDDY + 0.7 ? 1 - 0.12 * Math.sin(Math.PI * (s - T_TEDDY - 0.4) / 0.3) : 1;
            teddy.setAttribute("opacity", s < T_OUT + 0.5 ? 1 : 0);
            teddy.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${(2 - squash).toFixed(3)} ${squash.toFixed(3)}) scale(0.95)`);
          }
          if (s < T_RING) ringBox.setAttribute("opacity", 0);
          else {
            const hand = [hp.hands[1][0] + 6, hp.hands[1][1] - 6];
            let x, y;
            if (s < T_RING + 0.35) { const r = flyIn(s, T_RING, 0.35, hand, 140); x = r[0]; y = r[1]; } else { x = hand[0]; y = hand[1]; }
            const outq = clamp((s - T_OUT) / 0.4, 0, 1);
            if (s > T_OUT) { x += 650 * outq; y -= 220 * Math.sin(Math.PI * outq); }
            ringBox.setAttribute("opacity", outq < 1 ? 1 : 0);
            ringBox.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) scale(1.3)`);
            const open = hold(s, T_OPEN, T_SNAP, 0.12);
            lid.setAttribute("transform", `rotate(${r1(-110 * open)} -16 -16)`);
            ring.setAttribute("opacity", open.toFixed(3));
            sparkle.setAttribute("opacity", (open * (0.6 + 0.4 * Math.sin(t * 20))).toFixed(3));
            sparkle.setAttribute("transform", `translate(${r1(x + 10)} ${r1(y - 50)}) rotate(${r1(t * 90)}) scale(${(0.8 + 0.3 * Math.sin(t * 12)).toFixed(3)})`);
          }
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.15); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          const above = (head, dx) => [head[0] + dx, head[1] - 110];
          bub(bWho, T_WHO, T_FRIEND, above(mp.head, 20));
          bub(bFriend, T_FRIEND, T_YEAH1 + 0.1, above(hp.head, 20));
          bub(bY1, T_YEAH1, T_ROSES, above(mp.head, 40));
          bub(bY2, T_YEAH2, T_TEDDY, above(mp.head, 40));
          bub(bY3, T_YEAH3, T_RING, above(mp.head, 40));
          bub(bDots, T_DOTS, T_LOOK + 0.3, above(mp.head, -20));
          warm.setAttribute("opacity", (0.85 * win(s, T_CUDDLE, T_CUDDLE + 1)).toFixed(3));
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (s > T_HOLD + 0.6 ? 1 : 0);
          heart.setAttribute("opacity", s > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 100)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);

          E("h1").innerHTML = slam(["“HE'S", "JUST", "A", "FRIEND.”"], [T_H1, T_H1 + 0.14, T_H1 + 0.26, T_H1 + 0.4], t, []);
          E("h2").innerHTML = slam(["THE", "FRIEND", "SENT", "A", "RING."], [T_H2, T_H2 + 0.12, T_H2 + 0.24, T_H2 + 0.36, T_H2 + 0.5], t, [4]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["TRUST", "IS", "EASY"], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["WHEN", "NOTHING", "IS", "HIDDEN."], [T_CARD + 0.75, T_CARD + 0.88, T_CARD + 1.0, T_CARD + 1.12], t, [3]);
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
