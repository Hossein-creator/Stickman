        // ---------- "friend to wife": a time-lapse of one friendship. AGE 6: swings, he shares his candy. AGE 12: she cries in the rain, he holds his umbrella over her. AGE 17: "PROM?" sign, she jumps into his arms. AGE 25: he kneels with a ring, a flower arch, a veil ----------
        // remake of a 12.3x outlier (DemiGob, "from my childhood friend to my wife"), see viral/2026-11-02-check.md
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

        // ---------- beats (each age is its own set; the camera cuts) ----------
        const S2 = 3.0, S3 = 6.0, S4 = 8.6, T_END = 11.4;
        const T_GIVE = 1.2, T_SMILE1 = 2.0, T_UMB = 4.2, T_SIT2 = 4.8, T_SIGN = 6.4, T_JUMP = 7.3, T_KNEEL = 9.0, T_YES = 9.9, T_ARCH = 10.4;
        const T_H1 = 11.8, T_H2 = 12.7, T_CARD = 13.8;
        const A = [0, 2200, 4400, 6600];
        const scene = (s) => (s < S2 ? 0 : s < S3 ? 1 : s < S4 ? 2 : 3);
        const AGE = [0.6, 0.78, 0.92, 1.0];

        // ---------- sets ----------
        // 1: playground swing
        svgEl("rect", { x: A[0] + 300, y: FL - 470, width: 600, height: 470, fill: "#7aa8d8", opacity: 0.18 }, backG);
        svgEl("circle", { cx: A[0] + 780, cy: FL - 400, r: 40, fill: "#ffd060", opacity: 0.8 }, backG);
        for (const x of [A[0] + 470, A[0] + 650]) svgEl("path", { d: `M${x - 40} ${FL} L${x} ${FL - 300} L${x + 40} ${FL}`, fill: "none", stroke: "#8a5a3a", "stroke-width": 10 }, roomG);
        svgEl("line", { x1: A[0] + 460, y1: FL - 300, x2: A[0] + 660, y2: FL - 300, stroke: "#8a5a3a", "stroke-width": 12 }, roomG);
        const swingG = svgEl("g", {}, roomG);
        svgEl("line", { x1: -30, y1: 0, x2: -30, y2: 210, stroke: "#666", "stroke-width": 4 }, swingG);
        svgEl("line", { x1: 30, y1: 0, x2: 30, y2: 210, stroke: "#666", "stroke-width": 4 }, swingG);
        svgEl("rect", { x: -40, y: 206, width: 80, height: 12, rx: 3, fill: "#c0503a", stroke: "#000", "stroke-width": 4 }, swingG);
        // 2: rain + bench
        svgEl("rect", { x: A[1] + 300, y: FL - 470, width: 600, height: 470, fill: "#2a3040", opacity: 0.4 }, backG);
        svgEl("rect", { x: A[1] + 440, y: FL - 70, width: 180, height: 12, rx: 3, fill: "#5a4330", stroke: "#000", "stroke-width": 4 }, roomG);
        for (const lx of [A[1] + 456, A[1] + 596]) svgEl("rect", { x: lx, y: FL - 58, width: 10, height: 58, fill: "#5a4330", stroke: "#000", "stroke-width": 3 }, roomG);
        const rain = Array.from({ length: 30 }, (_, i) => ({ x: A[1] + 280 + ((i * 47) % 640), o: (i * 0.31) % 1, el: svgEl("line", { stroke: "#7d93b5", "stroke-width": 3, opacity: 0.6 }, fxG) }));
        const umb = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-110 0 Q0 -80 110 0 Q80 -10 55 0 Q27 -10 0 0 Q-27 -10 -55 0 Q-80 -10 -110 0 Z", fill: "#e0303a", stroke: "#000", "stroke-width": 5 }, umb);
        svgEl("line", { x1: 0, y1: -40, x2: 0, y2: 120, stroke: "#000", "stroke-width": 5 }, umb);
        // 3: school lockers
        for (let i = 0; i < 6; i++) svgEl("rect", { x: A[2] + 300 + i * 100, y: FL - 300, width: 96, height: 300, fill: i % 2 ? "#4a6a9a" : "#4f70a0", stroke: "#000", "stroke-width": 4 }, backG);
        const sign = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -70, y: -46, width: 140, height: 80, rx: 6, fill: "#fff", stroke: "#000", "stroke-width": 5 }, sign);
        const st = svgEl("text", { x: 0, y: 4, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#ff3b30", "text-anchor": "middle" }, sign); st.textContent = "PROM?";
        // 4: park at sunset + flower arch
        svgEl("rect", { x: A[3] + 250, y: FL - 470, width: 700, height: 470, fill: "#ff9a5a", opacity: 0.16 }, backG);
        svgEl("circle", { cx: A[3] + 600, cy: FL - 120, r: 300, fill: "url(#fireGlow)", opacity: 0.5 }, backG);
        const arch = svgEl("g", { opacity: 0 }, roomG);
        svgEl("path", { d: `M${A[3] + 470} ${FL} L${A[3] + 470} ${FL - 300} Q${A[3] + 600} ${FL - 440} ${A[3] + 730} ${FL - 300} L${A[3] + 730} ${FL}`, fill: "none", stroke: "#e8e0d0", "stroke-width": 14 }, arch);
        for (let i = 0; i < 14; i++) { const a = Math.PI * (i / 13); svgEl("circle", { cx: A[3] + 600 - 130 * Math.cos(a), cy: FL - 300 - 110 * Math.sin(a), r: 12, fill: i % 2 ? "#ff7aa8" : "#fff", stroke: "#000", "stroke-width": 3 }, arch); }
        const petals = Array.from({ length: 14 }, (_, i) => ({ x: A[3] + 420 + i * 30, o: (i * 0.37) % 1, el: svgEl("ellipse", { rx: 6, ry: 4, fill: "#ff9ac0", opacity: 0 }, fxG) }));

        // ---------- people (wrapped so they can grow up) ----------
        const himW = svgEl("g", {}, figG), herW = svgEl("g", {}, figG);
        const him = makeFig(himW, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, herW);
        const her = makeFig(herW, "#ffffff", "#e2e2e2", true, "her");
        herW.insertBefore(bun, her.g.previousSibling);
        const veil = svgEl("path", { fill: "#ffffff", opacity: 0, stroke: "#ccc", "stroke-width": 2 }, fxG);
        const candy = svgEl("g", { opacity: 0 }, fxG);
        svgEl("circle", { cx: 0, cy: 0, r: 10, fill: "#ff7aa8", stroke: "#000", "stroke-width": 3 }, candy);
        svgEl("line", { x1: 0, y1: 8, x2: 0, y2: 30, stroke: "#fff", "stroke-width": 4 }, candy);
        const ring = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -14, y: -14, width: 28, height: 16, rx: 3, fill: "#c0203a", stroke: "#000", "stroke-width": 3 }, ring);
        svgEl("circle", { cx: 0, cy: -20, r: 8, fill: "none", stroke: "#ffd23a", "stroke-width": 4 }, ring);
        const sparkle = svgEl("path", { d: "M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z", fill: "#fff6b0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);
        const tears = Array.from({ length: 2 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const bubble = (txt, w) => { const g = svgEl("g", { opacity: 0 }, fxG); svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g); svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g); svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g); const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#111", "text-anchor": "middle" }, g); tx.textContent = txt; return g; };
        const bYes = bubble("YES!", 130), bYes2 = bubble("YES!!!", 160);

        // ---------- poses (world coords at full size; the wrapper scales around the feet) ----------
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const swingA = (s) => 0.35 * Math.sin(s * 2.4);
        const swingTop = [A[0] + 560, FL - 300];
        function herRaw(s) {
          const sc = scene(s), o = A[sc];
          if (sc === 0) {   // on the swing (in full-size coords around the swing seat, she is scaled later)
            const a = swingA(s), sx = swingTop[0] + 210 * Math.sin(a), sy = swingTop[1] + 210 * Math.cos(a);
            const p = base({ hx: sx, hy: sy - 12, torso: 4, head: 0, ax: sx + 70, ay: sy + 40, bx: sx + 60, by: sy + 46, aw: 1, atx: sx - 24, aty: sy - 120, bw: 1, btx: sx + 24, bty: sy - 120 });
            const take = hold(s, T_GIVE, S2, 0.2); reachTo(p, take, [sx + 70, sy - 90], "b");
            return p;
          }
          if (sc === 1) { const p = base({ hx: o + 500, hy: FL - 80, torso: 30, head: 30, ax: o + 570, ay: FL, bx: o + 556, by: FL, aw: 1, atx: o + 540, aty: FL - 180, bw: 1, btx: o + 530, bty: FL - 176 }); const up = win(s, T_SIT2, T_SIT2 + 0.4); p.torso = lerp(p.torso, 4, up); p.head = lerp(p.head, -10, up); p.atx = lerp(p.atx, o + 560, up); p.aty = lerp(p.aty, FL - 120, up); return p; }
          if (sc === 2) {
            const x = o + 560, p = standOn(x, 1, FL);
            const surprise = hold(s, T_SIGN + 0.2, T_JUMP, 0.15); reachTo(p, surprise, [x + 70, stand - 110]); reachTo(p, surprise, [x + 60, stand - 104], "b");
            if (s > T_JUMP) { const j = clamp((s - T_JUMP) / 0.4, 0, 1); const hug = standOn(lerp(x, x + 70, j), 1, FL - 60 * Math.sin(Math.PI * j)); reachTo(hug, 1, [x + 130, stand - 150]); reachTo(hug, 1, [x + 120, stand - 120], "b"); hug.ay -= 40 * Math.sin(Math.PI * j); return hug; }
            return p;
          }
          const x = o + 560, p = standOn(x, 1, FL);
          const gasp = hold(s, T_KNEEL + 0.3, T_YES + 0.4, 0.15); reachTo(p, gasp, [x + 70, stand - 110]); reachTo(p, gasp, [x + 60, stand - 104], "b"); p.torso -= 6 * gasp;
          if (s > T_ARCH) { const k = win(s, T_ARCH, T_ARCH + 0.3); reachTo(p, k, [x + 60, stand - 100], "b"); p.head = -6; }
          return p;
        }
        function himRaw(s) {
          const sc = scene(s), o = A[sc];
          if (sc === 0) { const x = o + 720, p = standOn(x, -1, FL); const give = hold(s, T_GIVE, S2, 0.25); reachTo(p, give, [x - 100, stand - 100]); p.torso += 10 * give; return p; }
          if (sc === 1) {
            const x = s < T_UMB ? lerp(o + 900, o + 600, (s - S2) / (T_UMB - S2)) : o + 600;
            const p = standOn(x, -1, FL);
            if (s < T_UMB) { const sw = Math.sin((x - o) / 120 * Math.PI * 2); p.ax += 18 * sw; p.bx -= 18 * sw; }
            reachTo(p, 1, [x - 60, stand - 150]);
            return p;
          }
          if (sc === 2) {
            const x = o + 770, p = standOn(x, -1, FL);
            const sg = hold(s, T_SIGN, T_JUMP + 0.1, 0.2); reachTo(p, sg, [x - 60, stand - 130]); reachTo(p, sg, [x - 40, stand - 126], "b");
            if (s > T_JUMP) { const k = win(s, T_JUMP + 0.2, T_JUMP + 0.5); reachTo(p, k, [x - 70, stand - 130]); reachTo(p, k, [x - 60, stand - 100], "b"); p.torso += 6 * k; }
            return p;
          }
          const x = o + 680;
          const kn = base({ hx: x, hy: FL - 96, torso: 8, head: -10, ax: x - 58, ay: FL, bx: x + 64, by: FL - 2 });
          reachTo(kn, 1, [x - 80, FL - 170]);
          const p = standOn(x, -1, FL);
          const k = hold(s, T_KNEEL, T_ARCH, 0.3);
          const out = mixPose(p, kn, k);
          if (s > T_ARCH) { reachTo(out, 1, [x - 60, stand - 100]); out.head = 6; }
          return out;
        }
        const herF = (s) => 1, himF = (s) => -1;

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
          <div id="cq" style="opacity:0;margin-top:110px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"A FRIEND IS SOMEONE WHO<br/>KNOWS ALL ABOUT YOU<br/>AND STILL LOVES YOU."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ELBERT HUBBARD</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [
          [0, 2.0, A[0] + 620, 470, 0], [2.99, 2.2, A[0] + 640, 460, 0],
          [3.0, 2.2, A[1] + 580, 470, 0], [5.99, 2.4, A[1] + 560, 460, 0],
          [6.0, 2.0, A[2] + 640, 450, 0], [8.59, 2.2, A[2] + 650, 440, 0],
          [8.6, 1.8, A[3] + 620, 450, 0], [10.3, 2.2, A[3] + 620, 440, 0], [99, 1.8, A[3] + 610, 440, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i];
          if (b[0] - a[0] < 0.02) return b.slice();
          const k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const LABEL = ["AGE 6", "AGE 12", "AGE 17", "AGE 25"];

        function render(t) {
          const s = t, sc = scene(s), o = A[sc];
          const [, cs, cx, cy, cr] = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) rotate(${cr.toFixed(2)}) scale(${cs.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const k = AGE[sc];
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // grow-up scale around each figure's feet (on the swing: around the swing top so she stays on the seat)
          const sw = (g, ax, ay) => g.setAttribute("transform", `translate(${r1(ax)} ${r1(ay)}) scale(${k}) translate(${r1(-ax)} ${r1(-ay)})`);
          sw(himW, mp.hip[0], FL);
          if (sc === 0) { const aa = swingA(s); sw(herW, swingTop[0] + 210 * Math.sin(aa), swingTop[1] + 210 * Math.cos(aa)); } else sw(herW, hp.hip[0], FL);
          const toW = (p, g) => { const m = g.getCTM && g.transform.baseVal.consolidate(); if (!m) return p; const mm = m.matrix; return [mm.a * p[0] + mm.c * p[1] + mm.e, mm.b * p[0] + mm.d * p[1] + mm.f]; };
          const mh = toW(mp.head, himW), hh = toW(hp.head, herW), mhand = toW(mp.hands[0], himW), hhand = toW(hp.hands[1], herW);
          // swing
          const a = swingA(s);
          swingG.setAttribute("transform", `translate(${swingTop[0]} ${swingTop[1]}) rotate(${r1(-a * 180 / Math.PI)})`);
          // candy: his hand to hers
          candy.setAttribute("opacity", sc === 0 && s > T_GIVE - 0.2 ? 1 : 0);
          const cq = win(s, T_GIVE + 0.2, T_GIVE + 0.6);
          candy.setAttribute("transform", `translate(${r1(lerp(mhand[0], hhand[0], cq))} ${r1(lerp(mhand[1], hhand[1], cq) - 10)}) scale(${k})`);
          // rain + umbrella + her tears
          rain.forEach((d) => { const p = frac(t * 1.6 + d.o), y = FL - 470 + p * 500; d.el.setAttribute("x1", d.x); d.el.setAttribute("y1", r1(y)); d.el.setAttribute("x2", d.x - 6); d.el.setAttribute("y2", r1(y + 26)); d.el.setAttribute("opacity", sc === 1 ? 0.6 : 0); });
          umb.setAttribute("opacity", sc === 1 ? 1 : 0);
          const ux = s < T_UMB ? mhand[0] : lerp(mhand[0], (mh[0] + hh[0]) / 2, win(s, T_UMB, T_UMB + 0.4));
          umb.setAttribute("transform", `translate(${r1(ux)} ${r1(mhand[1] - 110 * k)}) scale(${k})`);
          tears.forEach((d, i) => { const q = frac(t * 1.4 + i / 2), on = sc === 1 && s < T_SIT2; d.setAttribute("transform", `translate(${r1(hh[0] + 12 + 6 * i)} ${r1(hh[1] + 10 + 30 * q)})`); d.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // prom sign
          sign.setAttribute("opacity", sc === 2 && s > T_SIGN && s < T_JUMP + 0.2 ? 1 : 0);
          sign.setAttribute("transform", `translate(${r1(mhand[0] - 10)} ${r1(mhand[1] - 30)}) scale(${k})`);
          // ring, arch, veil, petals
          const rOn = sc === 3 && s > T_KNEEL + 0.2 && s < T_ARCH;
          ring.setAttribute("opacity", rOn ? 1 : 0); ring.setAttribute("transform", `translate(${r1(mhand[0])} ${r1(mhand[1])})`);
          sparkle.setAttribute("opacity", rOn ? (0.6 + 0.4 * Math.sin(t * 20)).toFixed(3) : 0); sparkle.setAttribute("transform", `translate(${r1(mhand[0] + 14)} ${r1(mhand[1] - 40)}) rotate(${r1(t * 90)})`);
          arch.setAttribute("opacity", sc === 3 ? win(s, T_ARCH, T_ARCH + 0.4).toFixed(3) : 0);
          const vk = sc === 3 ? win(s, T_ARCH, T_ARCH + 0.4) : 0;
          veil.setAttribute("opacity", (0.85 * vk).toFixed(3));
          veil.setAttribute("d", `M${r1(hh[0] - 20)} ${r1(hh[1] - 30)} Q${r1(hh[0] - 70)} ${r1(hh[1] + 40)} ${r1(hh[0] - 50)} ${r1(hh[1] + 120)} L${r1(hh[0] - 20)} ${r1(hh[1] + 110)} Q${r1(hh[0] - 30)} ${r1(hh[1] + 20)} ${r1(hh[0] + 10)} ${r1(hh[1] - 28)} Z`);
          petals.forEach((p) => { const q = frac(t * 0.4 + p.o); p.el.setAttribute("cx", r1(p.x + 30 * Math.sin(q * 6 + p.o * 9))); p.el.setAttribute("cy", r1(FL - 460 + q * 470)); p.el.setAttribute("opacity", (vk * 0.9).toFixed(3)); });
          // speech + heart
          const bub = (g, a0, b0, p) => { const kk = hold(s, a0, b0, 0.12); g.setAttribute("opacity", kk.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(kk)).toFixed(3)})`); };
          bub(bYes2, T_SIGN + 0.4, T_JUMP + 0.3, [hh[0] - 40, hh[1] - 100]);
          bub(bYes, T_YES, T_ARCH + 0.3, [hh[0] - 40, hh[1] - 100]);
          const beats = [T_SMILE1, T_SIT2 + 0.3, T_JUMP + 0.4, T_ARCH + 0.2];
          const hq = clamp((s - beats[sc]) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 && s < T_CARD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mh[0] + hh[0]) / 2)} ${r1(Math.min(mh[1], hh[1]) - 90 * k)}) scale(${(backOut(hq) * (0.6 + 0.5 * (sc === 3 ? 1 : 0)) * beat).toFixed(3)})`);
          // age label
          E("num").textContent = LABEL[sc];
          const st0 = [0, S2, S3, S4][sc];
          E("ctr").style.opacity = (s > T_H1 - 0.4 ? 0 : 1 - win(s, st0 + 1.6, st0 + 2.0)).toFixed(3);

          E("h1").innerHTML = slam(["SHE", "WAS", "HIS", "BEST", "FRIEND."], [T_H1, T_H1 + 0.12, T_H1 + 0.24, T_H1 + 0.36, T_H1 + 0.48], t, []);
          E("h2").innerHTML = slam(["NOW", "SHE'S", "HIS", "WIFE."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["MARRY", "YOUR"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["BEST", "FRIEND."], [T_CARD + 0.7, T_CARD + 0.9], t, [1]);
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
