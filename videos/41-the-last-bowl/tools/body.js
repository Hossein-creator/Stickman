        // ---------- "the last bowl": rain, an old couple, almost no rice left. She cooks all of it for him and says she already ate. Her stomach growls. He sees the empty pot and spoons half of his bowl into her cup ----------
        // remake of a 316x outlier (San stories, "love that doesn't fade with age"), see viral/2026-10-28-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const frontG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- story beats ----------
        const T_LIFT = 0.3, T_TIP = 1.0, T_BACK = 1.8, T_STIR = 2.25, T_SCOOP = 3.35, T_WALK = 3.8, T_SERVE = 4.45, T_SIT = 4.85;
        const T_ASK = 5.0, T_ATE = 5.45, T_EAT = 6.2, T_SIP = 6.35, T_GROWL = 7.3, T_LOOK = 7.65, T_POT = 8.1, T_BACKCAM = 8.7;
        const T_GIVE = 8.9, GIVES = [9.0, 9.4, 9.8], T_NO = 10.25, T_PUSH = 10.6, T_BOTH = 11.0, T_H1 = 11.9, T_H2 = 12.9, T_CARD = 14.0;
        const HX = 380, HERX = 712, TL0 = 448, TL1 = 612, TT = FL - 112;      // his stool, her stool, table left/right/top
        const BOWL = [506, TT - 2], CUP = [592, TT - 2];
        const STOVE0 = 830, STOVE1 = 1060, ST = FL - 150, POT = [905, ST], JAR = [992, ST];
        const COOKX = 790, SERVEX = 650;

        // ---------- room: rainy window, warm lamp, table, stools, stove with a pot, the rice jar ----------
        const WX0 = 470, WX1 = 640, WY0 = FL - 470, WY1 = FL - 290;
        svgEl("rect", { x: WX0, y: WY0, width: WX1 - WX0, height: WY1 - WY0, fill: "#0b1320", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const rainClip = svgEl("clipPath", { id: "rainClip" }, E("svg").querySelector("defs"));
        svgEl("rect", { x: WX0, y: WY0, width: WX1 - WX0, height: WY1 - WY0 }, rainClip);
        const rainG = svgEl("g", { "clip-path": "url(#rainClip)" }, backG);
        const drops = Array.from({ length: 26 }, (_, i) => ({ x: WX0 + ((i * 53) % (WX1 - WX0)), o: (i * 0.37) % 1, el: svgEl("line", { stroke: "#7d93b5", "stroke-width": 3, opacity: 0.7 }, rainG) }));
        svgEl("line", { x1: (WX0 + WX1) / 2, y1: WY0, x2: (WX0 + WX1) / 2, y2: WY1, stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("line", { x1: WX0, y1: (WY0 + WY1) / 2, x2: WX1, y2: (WY0 + WY1) / 2, stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        const flashWin = svgEl("rect", { x: WX0, y: WY0, width: WX1 - WX0, height: WY1 - WY0, fill: "#cfe0ff", opacity: 0 }, backG);
        // hanging bulb over the table
        svgEl("line", { x1: 530, y1: FL - 760, x2: 530, y2: FL - 560, stroke: "#444", "stroke-width": 4 }, backG);
        svgEl("circle", { cx: 530, cy: FL - 548, r: 14, fill: "#ffd890", stroke: "#000", "stroke-width": 4 }, backG);
        const lamp = svgEl("circle", { cx: 530, cy: FL - 520, r: 520, fill: "url(#fireGlow)", opacity: 0.45 }, backG);
        const warm = svgEl("ellipse", { cx: 540, cy: FL - 150, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);
        svgEl("polygon", { points: `470,${FL - 548} 590,${FL - 548} 700,${FL} 360,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.12 }, beams);
        // table + stools
        const wood = { fill: "#5a4330", stroke: "#000", "stroke-width": 5 };
        svgEl("rect", { x: TL0, y: TT, width: TL1 - TL0, height: 16, rx: 4, ...wood }, roomG);
        for (const lx of [TL0 + 14, TL1 - 26]) svgEl("rect", { x: lx, y: TT + 14, width: 12, height: FL - TT - 14, ...wood }, roomG);
        for (const sx of [HX, HERX]) { svgEl("rect", { x: sx - 34, y: FL - 82, width: 68, height: 12, rx: 3, ...wood }, roomG); svgEl("rect", { x: sx - 26, y: FL - 72, width: 9, height: 72, ...wood }, roomG); svgEl("rect", { x: sx + 17, y: FL - 72, width: 9, height: 72, ...wood }, roomG); }
        // stove counter, pot, jar
        svgEl("rect", { x: STOVE0, y: ST, width: STOVE1 - STOVE0, height: FL - ST, fill: "#3b3b40", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: STOVE0 + 30, y: ST + 40, width: 90, height: 60, rx: 6, fill: "#1c1c20", stroke: "#000", "stroke-width": 4 }, roomG);
        const flame = svgEl("path", { fill: "#ff8a2a", stroke: "#000", "stroke-width": 3 }, roomG);
        const potG = svgEl("g", { transform: `translate(${POT[0]} ${POT[1]})` }, propG);
        svgEl("path", { d: "M-46 -6 L-40 -62 L40 -62 L46 -6 Q0 6 -46 -6 Z", fill: "#7c7f88", stroke: "#000", "stroke-width": 5 }, potG);
        svgEl("rect", { x: -56, y: -60, width: 112, height: 9, rx: 4, fill: "#8c8f98", stroke: "#000", "stroke-width": 4 }, potG);
        svgEl("ellipse", { cx: 0, cy: -60, rx: 44, ry: 9, fill: "#1a1a1e", stroke: "#000", "stroke-width": 3 }, potG);
        const potRice = svgEl("ellipse", { cx: 0, cy: -61, rx: 26, ry: 5, fill: "#fbfbf5", opacity: 0 }, potG);
        const jarG = svgEl("g", {}, propG);
        svgEl("path", { d: "M-26 0 L-30 -66 Q-30 -80 -16 -84 L16 -84 Q30 -80 30 -66 L26 0 Z", fill: "#c9a46a", stroke: "#000", "stroke-width": 5 }, jarG);
        svgEl("rect", { x: -18, y: -96, width: 36, height: 14, rx: 4, fill: "#8a6a40", stroke: "#000", "stroke-width": 4 }, jarG);
        const grains = Array.from({ length: 4 }, () => svgEl("ellipse", { rx: 5, ry: 3, fill: "#fff", stroke: "#000", "stroke-width": 1.5, opacity: 0 }, fxG));
        // bowls
        const riceMound = (g, w, h) => svgEl("path", { d: `M${-w} -10 Q${-w * 0.8} ${-10 - h} 0 ${-12 - h} Q${w * 0.8} ${-10 - h} ${w} -10 Z`, fill: "#fbfbf5", stroke: "#000", "stroke-width": 4 }, g);
        const bowlG = svgEl("g", { opacity: 0 }, propG);
        const bowlRice = riceMound(bowlG, 34, 26);
        svgEl("path", { d: "M-40 -12 Q-36 18 0 20 Q36 18 40 -12 Z", fill: "#b4553a", stroke: "#000", "stroke-width": 5 }, bowlG);
        const cupG = svgEl("g", {}, propG);
        const cupRice = riceMound(cupG, 22, 18);
        svgEl("path", { d: "M-26 -14 L-22 16 L22 16 L26 -14 Z", fill: "#6d8fb3", stroke: "#000", "stroke-width": 5 }, cupG);
        const spoon = svgEl("path", { fill: "none", stroke: "#cfcfcf", "stroke-width": 6, "stroke-linecap": "round" }, fxG);
        const spoonRice = svgEl("ellipse", { rx: 9, ry: 6, fill: "#fbfbf5", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);
        const steams = Array.from({ length: 6 }, () => svgEl("path", { fill: "none", stroke: "#e8e8e8", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));

        // ---------- the two of them (old: a little hunched; she has a bun, he has glasses) ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const glasses = svgEl("g", {}, figG);
        svgEl("circle", { cx: 0, cy: 0, r: 9, fill: "none", stroke: "#000", "stroke-width": 4 }, glasses);
        svgEl("line", { x1: -9, y1: 0, x2: -26, y2: -3, stroke: "#000", "stroke-width": 4 }, glasses);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const bubble = (txt, w) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#111", "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bubAsk = bubble("AND YOU?", 220), bubAte = bubble("I ATE.", 170);
        const growl = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#ffcf5a", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const tear = svgEl("path", { d: "M0 -10 Q8 2 0 8 Q-8 2 0 -10 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);

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
        const old = (s) => { s.torso += 12; s.head += 6; return s; };
        const walking = (x0, x) => { const ft = feetOn(x0, x, 90, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 90); return old(base({ hx: x, hy: stand + 4 + 2 * Math.abs(sw), torso: 2, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 18 * sw, ael: 24, bsh: -4 - 18 * sw, bel: 24 })); };
        const seated = (x, f) => old(base({ hx: x, hy: FL - 88, torso: 4, head: 0, ax: x + f * 62, ay: FL, bx: x + f * 48, by: FL, aw: 1, atx: x + f * 70, aty: FL - 100, bw: 1, btx: x + f * 60, bty: FL - 96 }));
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const bump = (s, a, b) => Math.sin(Math.PI * clamp((s - a) / (b - a), 0, 1));
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // her: at the stove, then serves, sits, says she ate
        function herRaw(s) {
          if (s < T_WALK) {
            const st = old(standOn(COOKX, 1, FL));
            const lift = hold(s, T_LIFT, T_BACK + 0.4, 0.3);
            const over = win(s, T_LIFT + 0.3, T_TIP) * (1 - win(s, T_BACK, T_BACK + 0.35));
            const jp = [lerp(JAR[0] - 20, POT[0] + 30, over), lerp(JAR[1] - 50, POT[1] - 130, over)];
            reachTo(st, lift, [jp[0] - 16, jp[1]]); reachTo(st, lift, [jp[0] + 6, jp[1] + 10], "b");
            st.torso += 14 * lift; st.head += 10 * over;
            // shakes the jar harder and harder
            if (s > T_TIP && s < T_BACK) { const sh = 10 * Math.sin(s * 40) * win(s, T_TIP, T_BACK - 0.2); st.atx += sh; st.btx += sh; st.aty += sh * 0.5; }
            const stir = hold(s, T_STIR, T_SCOOP + 0.3);
            if (stir > 0) { reachTo(st, stir, [POT[0] - 10 + 18 * Math.cos(s * 8), POT[1] - 80 + 6 * Math.sin(s * 8)]); st.torso += 12 * stir; st.head += 10 * stir; }
            const scoop = hold(s, T_SCOOP, T_WALK + 0.2);
            reachTo(st, scoop, [COOKX + 50, stand - 100], "b");
            return st;
          }
          if (s < T_SERVE - 0.1) { const w = walking(COOKX, lerp(COOKX, SERVEX, ease((s - T_WALK) / (T_SERVE - 0.1 - T_WALK)))); w.bw = 1; w.btx = w.hx - 50; w.bty = stand - 100; return w; }
          if (s < T_SIT) {
            const st = old(standOn(SERVEX, -1, FL));
            const k = bump(s, T_SERVE - 0.1, T_SIT);
            st.torso += 38 * k; st.head += 6 * k;
            reachTo(st, 1, [lerp(SERVEX - 50, BOWL[0] + 20, k), lerp(stand - 100, BOWL[1] - 16, k)], "b");
            return st;
          }
          const st = mixPose(old(standOn(SERVEX, -1, FL)), seated(HERX, -1), win(s, T_SIT, T_SIT + 0.4));
          if (s < T_SIT + 0.4) return st;
          // "I ATE": pats her belly twice, smiles
          const pat = hold(s, T_ATE, T_ATE + 0.9);
          reachTo(st, pat, [HERX - 34, FL - 150 + 10 * Math.sin(s * 14)]);
          st.head -= 8 * pat;
          // sips water from the empty cup, looks into it
          const sip = hold(s, T_SIP, T_SIP + 0.75, 0.25);
          reachTo(st, sip, [HERX - 40, FL - 230]); st.head -= 14 * sip;
          // the growl: hand to the belly, looks away
          const gr = hold(s, T_GROWL, T_GIVE + 0.3);
          reachTo(st, gr, [HERX - 30, FL - 140]); st.head += 26 * gr; st.torso += 6 * gr;
          // she says no, hands up
          const no = hold(s, T_NO - 0.15, T_PUSH + 0.1);
          reachTo(st, no, [HERX - 70, FL - 210]); reachTo(st, no, [HERX - 60, FL - 200], "b");
          st.head += 12 * Math.sin(s * 18) * no;
          // eats with him, a tear
          const eat = win(s, T_BOTH, T_BOTH + 0.3);
          if (eat > 0) { const c = frac((s - T_BOTH) / 0.8); reachTo(st, eat, [lerp(CUP[0] + 6, HERX - 40, Math.sin(Math.PI * c)), lerp(CUP[1] - 20, FL - 222, Math.sin(Math.PI * c))]); st.head -= 6 * eat; }
          return st;
        }
        // him: sits and waits, asks, eats, notices, gives half
        const SP_MOUTH = (s, mp) => [HX + 46, FL - 226];
        function himRaw(s) {
          const st = seated(HX, 1);
          st.head += 3 * Math.sin(s * 1.2);
          const ask = hold(s, T_ASK, T_ATE + 0.5);
          reachTo(st, ask, [HX + 120, FL - 190]); st.head -= 6 * ask;
          // eats: spoon from bowl to mouth
          if (s > T_EAT && s < T_GIVE) {
            const c = (s - T_EAT) / 0.75, k = Math.sin(Math.PI * frac(c));
            const freeze = win(s, T_GROWL + 0.1, T_GROWL + 0.3);
            const kk = lerp(k, 0.55, freeze);
            reachTo(st, win(s, T_EAT, T_EAT + 0.2), [lerp(BOWL[0] - 10, HX + 46, kk), lerp(BOWL[1] - 20, FL - 226, kk)]);
            st.head += lerp(-6 * k, -18, win(s, T_LOOK, T_LOOK + 0.3));
          }
          if (s < T_GIVE) return st;
          // leans over the table and spoons half of his rice into her cup
          const lean = hold(s, T_GIVE, T_PUSH + 0.4, 0.3);
          st.torso += 34 * lean; st.hx += 30 * lean; st.hy -= 30 * lean; st.head -= 10 * lean;
          let ph = 0; GIVES.forEach((g) => (ph = Math.max(ph, bump(s, g - 0.05, g + 0.4))));
          reachTo(st, lean, [lerp(BOWL[0] + 4, CUP[0] - 6, ph), lerp(BOWL[1] - 24, CUP[1] - 26, ph) - 30 * ph]);
          // pushes the cup to her
          const push = bump(s, T_PUSH, T_PUSH + 0.5);
          reachTo(st, push, [CUP[0] + 10, CUP[1] - 20], "b");
          // eats with her
          const eat = win(s, T_BOTH, T_BOTH + 0.3);
          if (eat > 0) { const c = frac((s - T_BOTH + 0.4) / 0.8); reachTo(st, eat, [lerp(BOWL[0] - 10, HX + 46, Math.sin(Math.PI * c)), lerp(BOWL[1] - 20, FL - 226, Math.sin(Math.PI * c))]); }
          return st;
        }

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        // end card
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:100px;right:100px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:56px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"LOVE IS WHEN THE OTHER<br/>PERSON'S HAPPINESS IS MORE<br/>IMPORTANT THAN YOUR OWN."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">H. JACKSON BROWN JR.</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys: time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 2.3, 930, 420, 0], [1.0, 2.6, 940, 400, 0], [1.9, 2.5, 935, 410, 1], [2.4, 1.9, 870, 440, 0], [3.6, 1.8, 760, 450, 0],
          [4.6, 1.8, 560, 460, 0], [5.4, 1.85, 560, 455, 0], [6.9, 1.8, 560, 455, 0], [7.35, 2.5, 680, 430, -1.5], [7.75, 2.6, 410, 420, 1.5],
          [8.1, 2.4, 410, 425, 0], [8.4, 2.8, 940, 420, 0], [8.75, 2.6, 940, 420, 0], [9.1, 1.9, 560, 450, 0], [10.5, 2.0, 560, 450, 0],
          [11.6, 1.75, 560, 460, 0], [99, 1.65, 560, 470, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const steamD = (x, y, p, j) => `M${r1(x)} ${r1(y)} q${r1(10 * Math.sin(p * 6 + j))} -20 0 -40 q${r1(-10 * Math.sin(p * 6 + j))} -20 0 -40`;

        // ---------- per-frame render ----------
        function render(t) {
          const s = t;
          let kick = 0, flash = 0;
          const hit = (tr, k, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          hit(T_GROWL, 0.5, 0, 0.2); hit(T_POT, 0.4, 0, 0.2);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          E("flash").style.opacity = Math.min(0.6, flash).toFixed(3);

          // rain + a far lightning flash
          drops.forEach((d) => { const p = frac(t * 1.6 + d.o), y = WY0 - 30 + p * (WY1 - WY0 + 60); d.el.setAttribute("x1", d.x); d.el.setAttribute("y1", r1(y)); d.el.setAttribute("x2", d.x - 6); d.el.setAttribute("y2", r1(y + 26)); });
          flashWin.setAttribute("opacity", (0.7 * Math.max(Math.exp(-Math.max(0, t - 2.9) * 9) * (t > 2.9 ? 1 : 0), Math.exp(-Math.max(0, t - 7.3) * 9) * (t > 7.3 ? 1 : 0))).toFixed(3));
          lamp.setAttribute("opacity", (0.4 + 0.25 * win(s, T_BOTH, T_BOTH + 1)).toFixed(3));
          warm.setAttribute("opacity", (0.8 * win(s, T_BOTH, T_BOTH + 1)).toFixed(3));
          // stove flame while cooking
          const fk = hold(s, T_STIR - 0.2, T_SCOOP + 0.3);
          flame.setAttribute("d", fk > 0.02 ? `M${STOVE0 + 55} ${ST + 70} Q${STOVE0 + 60} ${r1(ST + 70 - 30 * fk - 4 * Math.sin(t * 20))} ${STOVE0 + 75} ${r1(ST + 70 - 40 * fk)} Q${STOVE0 + 90} ${r1(ST + 70 - 30 * fk)} ${STOVE0 + 95} ${ST + 70} Z` : "M0 0");

          const hp = drawFig(her, livePose(herRaw, s, 1.4), s < T_WALK ? 1 : -1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hf = s < T_WALK ? 1 : -1;
          bun.setAttribute("cx", r1(hp.head[0] - hf * 25)); bun.setAttribute("cy", r1(hp.head[1] - 14));
          glasses.setAttribute("transform", `translate(${r1(mp.head[0] + 18)} ${r1(mp.head[1] - 2)})`);

          // the jar: in her hands while she tips it, then back on the counter, empty
          const lifting = s > T_LIFT + 0.25 && s < T_BACK + 0.35;
          const tip = win(s, T_LIFT + 0.4, T_TIP) * (1 - win(s, T_BACK - 0.1, T_BACK + 0.3));
          const jx = lifting ? (hp.hands[0][0] + hp.hands[1][0]) / 2 + 10 : JAR[0], jy = lifting ? (hp.hands[0][1] + hp.hands[1][1]) / 2 + 40 : JAR[1];
          const lie = win(s, T_BACK + 0.25, T_BACK + 0.45);
          jarG.setAttribute("transform", `translate(${r1(jx - 66 * lie)} ${r1(jy - 30 * lie)}) rotate(${r1(-120 * tip + 90 * lie)})`);
          potRice.setAttribute("opacity", hold(s, T_TIP + 0.5, T_SCOOP + 0.25, 0.1).toFixed(3));
          grains.forEach((g, i) => {
            const t0 = T_TIP + 0.15 + i * 0.22, q = (s - t0) / 0.35;
            g.setAttribute("opacity", q > 0 && q < 1 && i < 3 ? 1 : 0);
            g.setAttribute("cx", r1(POT[0] + 6 * i)); g.setAttribute("cy", r1(POT[1] - 140 + 80 * q * q));
          });
          // her bowl, then it sits in front of him; the rice goes down as he eats and when he gives
          const inHand = s > T_SCOOP + 0.15 && s < T_SERVE + 0.2;
          const bx = inHand ? hp.hands[1][0] : BOWL[0], by = inHand ? hp.hands[1][1] + 14 : BOWL[1];
          bowlG.setAttribute("opacity", s > T_SCOOP + 0.15 ? 1 : 0);
          bowlG.setAttribute("transform", `translate(${r1(bx)} ${r1(by)})`);
          const given = GIVES.filter((g) => s > g + 0.3).length;
          const eaten = clamp((s - T_EAT) / 1.2, 0, 1) * 0.15;
          bowlRice.setAttribute("transform", `scale(1 ${(1 - eaten - 0.17 * given).toFixed(3)})`);
          cupRice.setAttribute("opacity", given > 0 ? 1 : 0);
          cupRice.setAttribute("transform", `scale(1 ${(given / 3).toFixed(3)})`);
          const cupLift = hold(s, T_SIP, T_SIP + 0.75, 0.25);
          const cx2 = lerp(CUP[0], hp.hands[0][0] - 2, cupLift), cy2 = lerp(CUP[1], hp.hands[0][1] + 12, cupLift);
          cupG.setAttribute("transform", `translate(${r1(cx2)} ${r1(cy2)}) rotate(${r1(-40 * cupLift)})`);
          // his spoon
          const spoonOn = s > T_EAT && !(s > T_ASK - 0.1 && s < T_EAT);
          const h = mp.hands[0];
          spoon.setAttribute("d", spoonOn ? `M${r1(h[0] - 8)} ${r1(h[1] + 4)} L${r1(h[0] + 26)} ${r1(h[1] - 8)}` : "M0 0");
          let giving = false; GIVES.forEach((g) => { if (s > g - 0.05 && s < g + 0.3) giving = true; });
          spoonRice.setAttribute("opacity", spoonOn && (giving || (s > T_EAT && s < T_GROWL && frac((s - T_EAT) / 0.75) < 0.5)) ? 1 : 0);
          spoonRice.setAttribute("cx", r1(h[0] + 24)); spoonRice.setAttribute("cy", r1(h[1] - 12));
          // steam: pot while cooking, bowl when served
          steams.forEach((st, j) => {
            const p = frac(t * 0.5 + j / 6), src = j < 3 ? [POT[0] - 20 + 20 * j, POT[1] - 64] : [BOWL[0] - 14 + 14 * (j - 3), BOWL[1] - 40];
            const on = j < 3 ? hold(s, T_STIR, T_SCOOP + 0.6) : (s > T_SERVE ? 1 - 0.5 * win(s, 9, 11) : 0);
            st.setAttribute("d", steamD(src[0], src[1] - p * 50, p, j));
            st.setAttribute("opacity", (on * 0.5 * Math.sin(Math.PI * p)).toFixed(3));
          });
          // speech
          const ka = hold(s, T_ASK + 0.1, T_ATE + 0.1), kb = hold(s, T_ATE, T_ATE + 1.1);
          bubAsk.setAttribute("opacity", ka.toFixed(3));
          bubAsk.setAttribute("transform", `translate(${r1(mp.head[0] + 90)} ${r1(mp.head[1] - 110)}) scale(${(0.6 + 0.4 * backOut(ka)).toFixed(3)})`);
          bubAte.setAttribute("opacity", kb.toFixed(3));
          bubAte.setAttribute("transform", `translate(${r1(hp.head[0] - 60)} ${r1(hp.head[1] - 110)}) scale(${(0.6 + 0.4 * backOut(kb)).toFixed(3)})`);
          // growl lines at her belly
          growl.forEach((g, i) => {
            const q = clamp((s - T_GROWL - i * 0.08) / 0.6, 0, 1), on = q > 0 && q < 1;
            const gx = HERX - 50 - 24 * q, gy = FL - 140 + (i - 1) * 18;
            g.setAttribute("d", `M${r1(gx)} ${r1(gy)} q-8 -8 -16 0 q-8 8 -16 0`);
            g.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0);
          });
          // tear, heart
          const tq = clamp((s - T_PUSH - 0.2) / 1.2, 0, 1);
          tear.setAttribute("opacity", tq > 0 && tq < 1 ? Math.sin(Math.PI * tq).toFixed(3) : 0);
          tear.setAttribute("transform", `translate(${r1(hp.head[0] - 16)} ${r1(hp.head[1] + 6 + 40 * tq)})`);
          const hq = clamp((s - T_BOTH - 0.3) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (s > T_BOTH + 0.8 ? 1 : 0);
          heart.setAttribute("opacity", s > T_BOTH + 0.3 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);

          E("h1").innerHTML = slam(["SHE", "SAID", "SHE", "ALREADY", "ATE."], [T_H1, T_H1 + 0.12, T_H1 + 0.24, T_H1 + 0.36, T_H1 + 0.5], t, []);
          E("h2").innerHTML = slam(["HE", "KNEW", "SHE", "HADN'T."], [T_H2, T_H2 + 0.14, T_H2 + 0.28, T_H2 + 0.44], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["TRUE", "LOVE", "IS", "NOTICING"], [T_CARD, T_CARD + 0.13, T_CARD + 0.26, T_CARD + 0.4], t, []);
          E("cm2").innerHTML = slam(["WHAT", "THEY", "DON'T", "SAY."], [T_CARD + 0.8, T_CARD + 0.92, T_CARD + 1.04, T_CARD + 1.18], t, [2, 3]);
          E("cq").style.opacity = win(t, T_CARD + 1.6, T_CARD + 2.1).toFixed(3);
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
