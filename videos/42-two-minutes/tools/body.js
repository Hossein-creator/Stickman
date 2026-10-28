        // ---------- "two minutes": at the mall she holds up two fingers, "2 MINUTES!", and walks into a shop. The timer runs for hours, she brings bag after bag, he disappears under 8 bags and falls asleep. Last time she comes out with one tiny bag: a cap for him. Kiss. He carries everything, smiling ----------
        // remake of an 80.9x outlier (Mp Ghibli Love World, "I'll be ready in 2 minutes"), see viral/2026-10-28-check.md
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
        const bagG = svgEl("g", {}, W);
        const herG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_ARRIVE = 1.25, T_TWO = 1.3, T_IN = 2.15, T_SITB = 2.0;
        const BAGT = [3.3, 4.05, 4.7, 5.25, 5.7, 6.1, 6.5, 6.9];
        const T_SLEEP = 7.45, T_OUT = 8.15, T_AT = 8.75, T_CAP = 9.0, T_KISS = 9.65, T_UP = 10.25, T_GO = 10.7, T_H1 = 11.6, T_H2 = 12.6, T_CARD = 13.7;
        const HX = 330, DX = 720, BENCH0 = 230, BENCH1 = 440, SEAT = FL - 74;
        const TIMES = [[0, "00:00"], [T_IN, "00:02"], [2.75, "00:47"], [3.6, "01:20"], [4.4, "01:52"], [5.0, "02:13"], [5.6, "02:58"], [6.3, "03:41"], [7.0, "04:38"], [T_OUT, "05:12"]];

        // ---------- the mall: shop front with a glowing door and a SALE sign, shop window, bench ----------
        svgEl("rect", { x: 560, y: FL - 430, width: 520, height: 430, fill: "#16161c", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        const doorGlow = svgEl("rect", { x: DX - 60, y: FL - 270, width: 120, height: 270, fill: "#ffe9b8", opacity: 0.85 }, backG);
        svgEl("rect", { x: DX - 60, y: FL - 270, width: 120, height: 270, fill: "none", stroke: "#000", "stroke-width": 8 }, backG);
        svgEl("polygon", { points: `${DX - 60},${FL} ${DX + 60},${FL} ${DX + 140},${FL + 60} ${DX - 140},${FL + 60}`, fill: "#ffe9b8", opacity: 0.12 }, backG);
        svgEl("rect", { x: DX - 110, y: FL - 400, width: 220, height: 80, rx: 12, fill: "#ff3b6b", stroke: "#000", "stroke-width": 6 }, backG);
        const sale = svgEl("text", { x: DX, y: FL - 345, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 50, fill: "#fff", "text-anchor": "middle" }, backG);
        sale.textContent = "SALE";
        svgEl("rect", { x: 820, y: FL - 300, width: 220, height: 200, fill: "#22263a", stroke: "#000", "stroke-width": 6 }, backG);
        [["#ff7aa8", 840, 90], ["#6ad0c4", 900, 130], ["#ffd25a", 965, 70]].forEach(([c, x, h]) => svgEl("rect", { x, y: FL - 100 - h, width: 50, height: h, rx: 6, fill: c, stroke: "#000", "stroke-width": 4 }, backG));
        svgEl("polygon", { points: `620,${FL - 520} 820,${FL - 520} 900,${FL} 540,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.18 }, beams);
        svgEl("polygon", { points: `240,${FL - 520} 420,${FL - 520} 500,${FL} 160,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.14 }, beams);
        const wood = { fill: "#5a4330", stroke: "#000", "stroke-width": 5 };
        svgEl("rect", { x: BENCH0, y: SEAT, width: BENCH1 - BENCH0, height: 14, rx: 4, ...wood }, roomG);
        svgEl("rect", { x: BENCH0, y: SEAT - 90, width: 14, height: 90, ...wood }, roomG);
        svgEl("rect", { x: BENCH0, y: SEAT - 96, width: 120, height: 14, rx: 4, ...wood }, roomG);
        for (const lx of [BENCH0 + 16, BENCH1 - 28]) svgEl("rect", { x: lx, y: SEAT + 12, width: 12, height: FL - SEAT - 12, ...wood }, roomG);
        const web = svgEl("g", { opacity: 0 }, roomG);
        for (let i = 0; i < 5; i++) svgEl("line", { x1: BENCH0 + 14, y1: SEAT - 82, x2: BENCH0 + 14 + 70 * Math.cos((i / 4) * Math.PI / 2), y2: SEAT - 82 + 70 * Math.sin((i / 4) * Math.PI / 2), stroke: "#cfcfcf", "stroke-width": 2 }, web);
        for (const r of [25, 45, 65]) svgEl("path", { d: `M${BENCH0 + 14 + r} ${SEAT - 82} A${r} ${r} 0 0 1 ${BENCH0 + 14} ${SEAT - 82 + r}`, fill: "none", stroke: "#cfcfcf", "stroke-width": 2 }, web);

        // ---------- the two of them ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, herG);
        const herWrap = svgEl("g", {}, herG);
        const her = makeFig(herWrap, "#ffffff", "#e2e2e2", true, "her");
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const cap = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-30 0 Q-28 -30 0 -32 Q28 -30 30 0 Z", fill: "#ff3b6b", stroke: "#000", "stroke-width": 5 }, cap);
        svgEl("path", { d: "M20 -2 L58 2 L56 8 L18 6 Z", fill: "#ff3b6b", stroke: "#000", "stroke-width": 4 }, cap);
        svgEl("path", { d: "M-8 -18 C-14 -24 -8 -30 0 -24 C8 -30 14 -24 8 -18 L0 -12 Z", fill: "#fff" }, cap);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const bubble = (txt, w) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#111", "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bubTwo = bubble("2 MINUTES!", 250), bubGift = bubble("FOR YOU.", 200);
        const zzs = [0, 1, 2].map(() => { const z = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#9aa4c0", "text-anchor": "middle", opacity: 0 }, fxG); z.textContent = "z"; return z; });

        // ---------- shopping bags: 8 big ones + the tiny one ----------
        const COLS = ["#ff7aa8", "#6ad0c4", "#ffd25a", "#a98bff", "#ff9a4a", "#7ac0ff", "#ff5a6a", "#9ae07a"];
        const makeBag = (c, w, h) => {
          const g = svgEl("g", { opacity: 0 }, bagG);
          svgEl("path", { d: `M${-w * 0.25} ${-h} Q${-w * 0.25} ${-h - 26} 0 ${-h - 26} Q${w * 0.25} ${-h - 26} ${w * 0.25} ${-h}`, fill: "none", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("rect", { x: -w / 2, y: -h, width: w, height: h, rx: 5, fill: c, stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: HEART, fill: "#fff", transform: `translate(0 ${-h / 2}) scale(0.35)` }, g);
          return g;
        };
        const bags = COLS.map((c, i) => makeBag(c, 64 + (i % 3) * 10, 72 + ((i * 5) % 3) * 10));
        const tiny = makeBag("#ff3b6b", 34, 34);
        // where each bag ends up around him on the bench (the pile grows until only his head shows)
        const SLOTS = [[HX + 58, SEAT + 6], [HX - 40, SEAT + 6], [HX + 110, SEAT + 6], [HX - 66, SEAT - 76], [HX + 96, SEAT - 80], [HX + 18, SEAT - 44], [HX - 74, SEAT - 156], [HX + 100, SEAT - 162]];

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
        const walking = (x0, x, STR = 110) => { const ft = feetOn(x0, x, STR, 14), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 }); };
        const running = (x0, x) => { const s = walking(x0, x, 150); s.torso = 14; s.ash *= 1.6; s.bsh *= 1.6; s.ael = 70; s.bel = 70; return s; };
        const seated = (x, f) => base({ hx: x, hy: SEAT - 8, torso: 2, head: 0, ax: x + f * 64, ay: FL, bx: x + f * 50, by: FL, aw: 1, atx: x + f * 56, aty: SEAT - 20, bw: 1, btx: x + f * 46, bty: SEAT - 16 });
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // her bag trips: out of the door, run to him, drop the bag, run back in
        const TRIP_OUT = (k) => (k < 3 ? 0.42 : 0.26);
        function herTrip(s) {
          for (let k = 0; k < BAGT.length; k++) {
            const d = TRIP_OUT(k), a = BAGT[k] - d, b = BAGT[k] + d;
            if (s >= a && s < b) {
              const there = HX + 110;
              const x = s < BAGT[k] ? lerp(DX, there, ease((s - a) / d)) : lerp(there, DX, ease((s - BAGT[k]) / d));
              const p = running(DX, x); p.head = -4;
              reachTo(p, s < BAGT[k] ? 1 : 0, [x - 46, stand - 50], "b");
              return { pose: p, f: s < BAGT[k] ? -1 : 1, vis: clamp(Math.min(s - a, b - s) / 0.08, 0, 1), k };
            }
          }
          return null;
        }
        function herRaw(s) {
          if (s < T_ARRIVE) { const p = walking(60, lerp(60, DX - 90, ease(s / T_ARRIVE))); return p; }
          if (s < T_IN) {
            const st = standOn(DX - 90, -1, FL);
            // turns, holds up two fingers, big smile
            const two = hold(s, T_TWO, T_IN - 0.1);
            reachTo(st, two, [DX - 150, stand - 170]); st.head = -10 * two;
            return st;
          }
          const tr = herTrip(s);
          if (tr) return tr.pose;
          if (s < T_OUT) return standOn(DX, 1, FL);
          if (s < T_AT) { const p = walking(DX, lerp(DX, HX + 150, ease((s - T_OUT) / (T_AT - T_OUT)))); reachTo(p, 1, [p.hx - 40, stand - 60], "b"); return p; }
          if (s < T_GO) {
            const st = standOn(HX + 150, -1, FL);
            const capK = hold(s, T_CAP, T_KISS, 0.25);
            reachTo(st, capK, [HX + 40, SEAT - 250]); reachTo(st, capK, [HX + 56, SEAT - 240], "b");
            const kiss = hold(s, T_KISS, T_UP, 0.2);
            st.torso += 34 * kiss; st.head -= 10 * kiss; st.hx -= 40 * kiss;
            // takes half the bags
            const take = win(s, T_UP, T_UP + 0.3);
            reachTo(st, take, [HX + 150, stand - 40], "a"); reachTo(st, take, [HX + 90, stand - 40], "b");
            return st;
          }
          const x = lerp(HX + 150, 1360, ease((s - T_GO) / 3)), p = walking(HX + 150, x);
          reachTo(p, 1, [x + 30, stand - 40]); reachTo(p, 1, [x - 34, stand - 40], "b");
          return p;
        }
        const herF = (s) => { if (s < T_ARRIVE) return 1; if (s < T_IN) return s < T_TWO - 0.05 ? 1 : s < T_IN - 0.25 ? -1 : 1; const tr = herTrip(s); if (tr) return tr.f; if (s < T_OUT + 0.02) return 1; return s < T_GO ? -1 : 1; };
        const herVis = (s) => { if (s < T_IN - 0.15) return 1; if (s < T_IN) return 1 - (s - (T_IN - 0.15)) / 0.15; const tr = herTrip(s); if (tr) return tr.vis; if (s < T_OUT) return 0; return clamp((s - T_OUT) / 0.12, 0, 1); };

        function himRaw(s) {
          if (s < T_ARRIVE) return walking(-40, lerp(-40, HX + 130, ease(s / T_ARRIVE)));
          if (s < T_SITB) { const st = standOn(HX + 130, 1, FL); st.head = -6; return st; }
          if (s < T_SITB + 0.6) return mixPose(walking(HX + 130, lerp(HX + 130, HX, ease((s - T_SITB) / 0.6))), seated(HX, 1), win(s, T_SITB + 0.3, T_SITB + 0.6));
          const st = seated(HX, 1);
          // checks his watch
          const watch = hold(s, 2.75, 3.25);
          reachTo(st, watch, [HX + 60, SEAT - 120]); reachTo(st, watch, [HX + 44, SEAT - 116], "b"); st.head += 18 * watch;
          // holds the first bags, sinks lower, falls asleep
          const n = BAGT.filter((b) => s > b).length;
          st.hy += Math.min(n, 8) * 1.5; st.torso -= Math.min(n, 8) * 1.5;
          const sl = win(s, T_SLEEP, T_SLEEP + 0.4) * (1 - win(s, T_AT - 0.05, T_AT + 0.1));
          st.head += 26 * sl; st.torso += 6 * sl;
          // wakes up, gets the cap, kiss: big smile
          const wake = win(s, T_AT - 0.05, T_AT + 0.1);
          st.head -= 12 * wake * Math.exp(-Math.max(0, s - T_AT) * 4);
          if (s < T_UP) return st;
          // stands up with the bags
          const upP = standOn(HX + 40, 1, FL);
          reachTo(upP, 1, [HX + 90, stand - 30]); reachTo(upP, 1, [HX + 70, stand - 34], "b"); upP.hy += 6;
          if (s < T_GO) return mixPose(st, upP, win(s, T_UP, T_UP + 0.4));
          const x = lerp(HX + 40, 1150, ease((s - T_GO) / 3)), p = walking(HX + 40, x);
          p.hy += 6; p.torso = 8;
          reachTo(p, 1, [x + 30, stand - 30]); reachTo(p, 1, [x - 20, stand - 34], "b");
          return p;
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
        card.style.cssText = "position:absolute;left:100px;right:100px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"PATIENCE IS BITTER,<br/>BUT ITS FRUIT IS SWEET."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">JEAN-JACQUES ROUSSEAU</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys: time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.5, 380, 470, 0], [1.2, 1.7, 560, 450, 0], [1.6, 2.3, 600, 420, 0], [2.1, 1.7, 520, 450, 0], [2.7, 2.2, 380, 440, 0],
          [3.2, 1.6, 520, 460, 0], [5.0, 1.6, 520, 460, 0], [6.9, 1.9, 420, 440, 0], [7.4, 2.4, 360, 400, 2], [8.1, 1.7, 500, 450, 0],
          [9.0, 2.2, 400, 410, 0], [9.9, 2.3, 400, 410, 0], [10.6, 1.6, 560, 460, 0], [13.5, 1.5, 820, 460, 0], [99, 1.5, 820, 460, 0],
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
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          BAGT.forEach((b) => hit(b, 0.35, 0.12)); TIMES.slice(1).forEach(([a]) => hit(a, 0.2, 0.1)); hit(T_KISS, 0.4, 0.25);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);

          const vis = herVis(s);
          herWrap.setAttribute("opacity", vis.toFixed(3)); bun.setAttribute("opacity", vis.toFixed(3));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          bun.setAttribute("cx", r1(hp.head[0] - herF(s) * 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          doorGlow.setAttribute("opacity", (0.75 + 0.1 * Math.sin(t * 3)).toFixed(3));

          // bags: in her hand on the way, then in their slot on the pile; at the end half go with each of them
          bags.forEach((g, k) => {
            const b = BAGT[k];
            if (s < b - TRIP_OUT(k)) { g.setAttribute("opacity", 0); return; }
            g.setAttribute("opacity", 1);
            let x, y, rot = 0;
            if (s < b) { x = hp.hands[1][0]; y = hp.hands[1][1] + 70; rot = 6 * Math.sin(t * 20); }
            else {
              const q = clamp((s - b) / 0.2, 0, 1), sl = SLOTS[k], from = [HX + 64, stand + 20];
              x = lerp(from[0], sl[0], ease(q)); y = lerp(from[1], sl[1], ease(q)) - Math.sin(Math.PI * q) * 40; rot = (k % 2 ? 6 : -5) * q;
              const upK = win(s, T_UP, T_UP + 0.35);
              if (upK > 0) { const mine = k % 2 === 0, hand = mine ? mp.hands[k % 4 === 0 ? 0 : 1] : hp.hands[k % 4 === 1 ? 0 : 1]; const hx = hand[0] + ((k >> 1) % 2 ? 18 : -18), hy = hand[1] + 96; x = lerp(x, hx, upK); y = lerp(y, hy, upK); rot = lerp(rot, 4 * Math.sin(t * 6 + k), upK); }
            }
            g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)})`);
          });
          const tinyOn = s > T_OUT && s < T_CAP + 0.3;
          tiny.setAttribute("opacity", tinyOn ? 1 : 0);
          tiny.setAttribute("transform", `translate(${r1(hp.hands[1][0])} ${r1(hp.hands[1][1] + 34)})`);
          // the cap: out of the tiny bag onto his head
          const cq = clamp((s - T_CAP) / 0.45, 0, 1);
          cap.setAttribute("opacity", s > T_CAP ? 1 : 0);
          const capX = lerp(hp.hands[0][0], mp.head[0], ease(cq)), capY = lerp(hp.hands[0][1], mp.head[1] - 18, ease(cq));
          cap.setAttribute("transform", `translate(${r1(capX)} ${r1(capY)})`);
          // speech
          const k1 = hold(s, T_TWO + 0.15, T_IN), k2 = hold(s, T_CAP + 0.3, T_KISS + 0.2);
          bubTwo.setAttribute("opacity", k1.toFixed(3));
          bubTwo.setAttribute("transform", `translate(${r1(hp.head[0] - 40)} ${r1(hp.head[1] - 110)}) scale(${(0.6 + 0.4 * backOut(k1)).toFixed(3)})`);
          bubGift.setAttribute("opacity", k2.toFixed(3));
          bubGift.setAttribute("transform", `translate(${r1(hp.head[0] + 10)} ${r1(hp.head[1] - 120)}) scale(${(0.6 + 0.4 * backOut(k2)).toFixed(3)})`);
          // asleep: z z z and a spider web on the bench
          const asleep = s > T_SLEEP + 0.2 && s < T_AT ? 1 : 0;
          zzs.forEach((z, i) => { const q = frac(t * 0.6 + i / 3); z.setAttribute("x", r1(mp.head[0] + 30 + 30 * q)); z.setAttribute("y", r1(mp.head[1] - 40 - 100 * q)); z.setAttribute("font-size", r1(26 + 26 * q)); z.setAttribute("opacity", (asleep * Math.sin(Math.PI * q)).toFixed(3)); });
          web.setAttribute("opacity", (win(s, 6.6, 7.4) * (1 - win(s, T_UP, T_UP + 0.3))).toFixed(3));
          // kiss heart
          const hq = clamp((s - T_KISS - 0.1) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (s > T_KISS + 0.6 ? 1 : 0);
          heart.setAttribute("opacity", s > T_KISS + 0.1 ? 1 - win(s, T_GO + 0.8, T_GO + 1.2) : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 100 - 30 * hq)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);

          // the timer
          let cur = TIMES[0][1]; for (const [a, v] of TIMES) if (s >= a) cur = v;
          E("num").textContent = cur;
          const tick = TIMES.slice(1).reduce((m, [a]) => m + (s > a ? 0.35 * Math.exp(-(s - a) * 7) : 0), 0);
          E("num").style.transform = `scale(${(1 + tick).toFixed(3)})`;
          E("ctr").style.opacity = (win(s, T_IN - 0.2, T_IN) * (1 - win(t, T_H1 - 0.4, T_H1 - 0.1))).toFixed(3);

          E("h1").innerHTML = slam(["“I'LL", "BE", "2", "MINUTES.”"], [T_H1, T_H1 + 0.14, T_H1 + 0.28, T_H1 + 0.42], t, [2]);
          E("h2").innerHTML = slam(["WORTH", "EVERY", "BAG."], [T_H2, T_H2 + 0.16, T_H2 + 0.32], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOVE", "IS", "WAITING"], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["AND", "STILL", "SMILING."], [T_CARD + 0.75, T_CARD + 0.9, T_CARD + 1.05], t, [2]);
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
