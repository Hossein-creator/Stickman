        // ---------- "her worst day": she lies curled up on the couch in pain. He comes home, sees it, drops his bag. Hot-water bottle, blanket, a tower of chocolate, tea. Then he just sits with her, her head in his lap, until she falls asleep ----------
        // remake of a 15.7x outlier (Shreya Bloom, "he takes care of her on her period"), see viral/2026-10-30-check.md
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
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_DOOR = 0.9, T_SEE = 1.7, T_DROP = 1.9, T_KNEEL = 2.3, T_TOUCH = 2.6;
        const TRIPS = [3.2, 4.3, 5.4, 6.5], TRIPD = 0.42;           // out and back for: bottle, blanket, chocolate, tea
        const T_SITW = 7.55, T_SIT = 8.1, T_LAP = 8.5, T_HOLD = 9.0, T_SLEEP = 9.8, T_H1 = 10.6, T_H2 = 11.6, T_CARD = 12.8;
        const C0 = 300, C1 = 660, SEAT = FL - 66, DOOR = 940, TABLE = 790, KNX = 600, SITX = 318;

        // ---------- room: window with dusk, lamp, couch, coffee table, door ----------
        svgEl("rect", { x: 380, y: FL - 470, width: 200, height: 170, fill: "#2a2440", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("circle", { cx: 520, cy: FL - 420, r: 18, fill: "#e6e8f0", opacity: 0.8 }, backG);
        svgEl("line", { x1: 480, y1: FL - 470, x2: 480, y2: FL - 300, stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        const lampGlow = svgEl("circle", { cx: 230, cy: FL - 230, r: 420, fill: "url(#fireGlow)", opacity: 0.35 }, backG);
        svgEl("rect", { x: 222, y: FL - 230, width: 8, height: 230, fill: "#666", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("path", { d: `M196 ${FL - 228} L256 ${FL - 228} L244 ${FL - 280} L208 ${FL - 280} Z`, fill: "#ffe0a0", stroke: "#000", "stroke-width": 4 }, roomG);
        const warm = svgEl("ellipse", { cx: 470, cy: FL - 140, rx: 330, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);
        svgEl("polygon", { points: `380,${FL - 470} 580,${FL - 470} 700,${FL} 300,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.12 }, beams);
        // door
        svgEl("rect", { x: DOOR - 60, y: FL - 280, width: 120, height: 280, fill: "#141418", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const doorLeaf = svgEl("rect", { x: DOOR - 56, y: FL - 276, width: 112, height: 276, fill: "#4a3a2c", stroke: "#000", "stroke-width": 4 }, backG);
        // couch
        svgEl("rect", { x: C0, y: FL - 150, width: C1 - C0, height: 90, rx: 22, fill: "#5a4f7a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: C0 - 30, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#4e456c", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: C1 - 20, y: FL - 120, width: 50, height: 110, rx: 16, fill: "#4e456c", stroke: "#000", "stroke-width": 5 }, roomG);
        const cushion = svgEl("rect", { x: C0 - 10, y: SEAT, width: C1 - C0 + 20, height: 52, rx: 14, fill: "#6a5f8c", stroke: "#000", "stroke-width": 5 }, propG);
        // coffee table
        svgEl("rect", { x: TABLE - 70, y: FL - 70, width: 140, height: 12, rx: 3, fill: "#5a4330", stroke: "#000", "stroke-width": 4 }, roomG);
        for (const lx of [TABLE - 60, TABLE + 50]) svgEl("rect", { x: lx, y: FL - 58, width: 10, height: 58, fill: "#5a4330", stroke: "#000", "stroke-width": 3 }, roomG);

        // ---------- the two of them ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        figG.insertBefore(him.g.previousSibling, bun); figG.insertBefore(him.g, bun);
        figG.parentNode.insertBefore(cushion, figG);           // she lies on the cushion
        const bag = svgEl("g", {}, propG);
        svgEl("rect", { x: -30, y: -50, width: 60, height: 50, rx: 6, fill: "#3a3a44", stroke: "#000", "stroke-width": 4 }, bag);
        svgEl("path", { d: "M-14 -50 Q0 -70 14 -50", fill: "none", stroke: "#000", "stroke-width": 4 }, bag);
        const bottle = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -26, y: -20, width: 52, height: 40, rx: 14, fill: "#e0503a", stroke: "#000", "stroke-width": 4 }, bottle);
        svgEl("rect", { x: 22, y: -8, width: 14, height: 16, rx: 3, fill: "#c03a28", stroke: "#000", "stroke-width": 3 }, bottle);
        const blanket = svgEl("path", { fill: "#3f6a9a", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, propG);
        const chocs = Array.from({ length: 7 }, (_, i) => { const g = svgEl("g", { opacity: 0 }, propG); svgEl("rect", { x: -36, y: -16, width: 72, height: 16, rx: 3, fill: "#5a3420", stroke: "#000", "stroke-width": 3 }, g); svgEl("rect", { x: -36, y: -16, width: 26, height: 16, fill: "#d8c070", stroke: "#000", "stroke-width": 3 }, g); return g; });
        const cup = svgEl("g", { opacity: 0 }, propG);
        svgEl("path", { d: "M-18 -30 L-14 0 L14 0 L18 -30 Z", fill: "#e8e8e8", stroke: "#000", "stroke-width": 4 }, cup);
        svgEl("path", { d: "M18 -24 Q32 -18 16 -8", fill: "none", stroke: "#000", "stroke-width": 4 }, cup);
        const steams = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#e8e8e8", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const pain = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
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
        const walking = (x0, x, STR = 120) => { const ft = feetOn(x0, x, STR, 14), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 }); };
        const running = (x0, x) => { const s = walking(x0, x, 160); s.torso = 12; s.ash *= 1.5; s.bsh *= 1.5; s.ael = 70; s.bel = 70; return s; };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const kneel = (x, f) => base({ hx: x, hy: FL - 96, torso: 14, head: 8, ax: x + f * 58, ay: FL, bx: x - f * 64, by: FL - 2 });
        // she lies on her side, head on the left (f = -1), knees pulled up, hands on her belly
        const herHX = (s) => lerp(480, 548, win(s, T_LAP - 0.3, T_LAP + 0.3));
        function herRaw(s) {
          const lap = win(s, T_LAP - 0.3, T_LAP + 0.3), hx = herHX(s), hy = SEAT - 18 - 14 * lap;
          const curl = 1 - 0.6 * win(s, TRIPS[1] + 0.5, T_HOLD);
          const lie = base({ hx, hy, torso: 90, head: lerp(-6, -18, win(s, T_LAP - 0.3, T_LAP + 0.3)), ax: hx + lerp(150, 26, curl), ay: hy + 16 + 14 * lap, bx: hx + lerp(146, 18, curl), by: hy + 20 + 14 * lap,
            aw: 1, atx: hx - 30, aty: hy + 6, bw: 1, btx: hx - 44, bty: hy + 2 });
          lie.hy += 2 * Math.sin(s * 9) * (1 - win(s, TRIPS[0] + 0.4, TRIPS[0] + 1.2)) * (s < T_HOLD ? 1 : 0);   // shivering in pain
          // reaches up to hold his hand when he sits with her
          const hand = hold(s, T_HOLD - 0.2, T_SLEEP + 0.4, 0.3);
          reachTo(lie, hand, [hx - 150, hy - 60], "b");
          return lie;
        }
        function himRaw(s) {
          if (s < T_DOOR) return standOn(DOOR + 160, -1, FL);
          if (s < T_SEE) { const x = lerp(DOOR + 40, DOOR - 140, ease((s - T_DOOR) / (T_SEE - T_DOOR))); const p = walking(DOOR + 40, x); reachTo(p, 1, [x - 10, stand - 30], "b"); return p; }
          if (s < T_KNEEL) {
            const st = standOn(DOOR - 140, -1, FL);
            st.head = -10 + 14 * win(s, T_SEE, T_SEE + 0.2);
            reachTo(st, 1 - win(s, T_DROP, T_DROP + 0.1), [DOOR - 150, stand - 30], "b");
            return st;
          }
          if (s < TRIPS[0]) {
            const x = lerp(DOOR - 140, KNX, ease((s - T_KNEEL) / 0.45));
            const p = s < T_KNEEL + 0.45 ? running(DOOR - 140, x) : kneel(KNX, -1);
            if (s > T_KNEEL + 0.45) reachTo(p, win(s, T_TOUCH, T_TOUCH + 0.2), [herHX(s) - 110, SEAT - 52]);
            return p;
          }
          // the trips: run out to the right, run back with the next thing, put it down
          for (let k = 0; k < TRIPS.length; k++) {
            const a = TRIPS[k], m = a + TRIPD, b = m + TRIPD, d = b + 0.3;
            if (s >= a && s < d) {
              if (s < m) return running(KNX, lerp(KNX, DOOR + 120, ease((s - a) / TRIPD)));
              if (s < b) { const p = running(DOOR + 120, lerp(DOOR + 120, KNX, ease((s - m) / TRIPD))); reachTo(p, 1, [p.hx - 50, stand - 80]); return p; }
              const st = standOn(KNX, -1, FL);
              const tgt = k === 0 ? [herHX(s) - 30, SEAT - 30] : k === 1 ? [herHX(s) - 60, SEAT - 90] : [TABLE, FL - 100];
              const k2 = Math.sin(Math.PI * clamp((s - b) / 0.3, 0, 1));
              st.torso += 40 * k2; reachTo(st, k2, tgt); reachTo(st, k2 * (k === 1 ? 1 : 0), [tgt[0] + 60, tgt[1]], "b");
              return st;
            }
          }
          if (s < T_SITW) return standOn(KNX, -1, FL);
          if (s < T_SIT) { const p = walking(KNX, lerp(KNX, SITX, ease((s - T_SITW) / (T_SIT - T_SITW)))); return p; }
          // sits at the end of the couch, her head on his lap, strokes her hair
          const sit = base({ hx: SITX, hy: SEAT - 10, torso: 8, head: 16, ax: SITX + 66, ay: FL, bx: SITX + 52, by: FL, aw: 1, atx: herHX(s) - 140 + 10 * Math.sin(s * 3), aty: SEAT - 50, bw: 1, btx: herHX(s) - 120, bty: SEAT - 30 });
          return mixPose(standOn(SITX, 1, FL), sit, win(s, T_SIT, T_SIT + 0.4));
        }
        const himF = (s) => {
          if (s >= T_SIT) return 1;
          for (const a of TRIPS) if (s >= a && s < a + TRIPD) return 1;
          return -1;
        };

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
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THEY MAY FORGET WHAT YOU SAID,<br/>BUT THEY WILL NEVER FORGET<br/>HOW YOU MADE THEM FEEL."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">CARL W. BUEHNER</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys: time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 2.5, 430, 470, 0], [0.8, 2.3, 470, 470, 0], [1.4, 1.8, 760, 440, 0], [1.9, 2.4, 860, 400, 0], [2.3, 1.7, 600, 460, 0],
          [2.9, 2.3, 460, 480, 0], [3.3, 1.55, 620, 470, 0], [7.4, 1.6, 600, 470, 0], [8.4, 2.1, 440, 470, 0], [9.6, 2.3, 430, 470, 0],
          [11.0, 1.9, 480, 480, 0], [99, 1.8, 480, 480, 0],
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
          hit(T_DROP + 0.15, 0.6, 0.15); TRIPS.forEach((a) => hit(a + 2 * TRIPD + 0.15, 0.25, 0.12)); hit(T_HOLD, 0.3, 0.3);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);

          const hp = drawFig(her, livePose(herRaw, s, 1.4), -1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          bun.setAttribute("cx", r1(hp.head[0] - 26)); bun.setAttribute("cy", r1(hp.head[1] - 4));
          // door opens as he comes in
          const dq = hold(s, T_DOOR - 0.3, T_SEE + 0.2, 0.25);
          doorLeaf.setAttribute("transform", `translate(${r1(DOOR - 56)} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1) translate(${-(DOOR - 56)} 0)`);
          // his bag: in his hand, then dropped on the floor
          const bq = clamp((s - T_DROP) / 0.25, 0, 1);
          const bh = mp.hands[1];
          const bx = s < T_DROP ? bh[0] : lerp(DOOR - 150, DOOR - 160, bq), by = s < T_DROP ? bh[1] + 50 : lerp(stand - 30 + 50, FL, bq * bq);
          bag.setAttribute("transform", `translate(${r1(bx)} ${r1(by)}) rotate(${r1(s < T_DROP ? 0 : -18 * bq)})`);
          // carried things: bottle, blanket, chocolate, tea
          const carry = (k) => s > TRIPS[k] + TRIPD && s < TRIPS[k] + 2 * TRIPD + 0.15;
          const placed = (k) => s >= TRIPS[k] + 2 * TRIPD + 0.15;
          const hand = mp.hands[0];
          const hx = herHX(s);
          bottle.setAttribute("opacity", carry(0) || placed(0) ? 1 : 0);
          bottle.setAttribute("transform", carry(0) ? `translate(${r1(hand[0] - 10)} ${r1(hand[1])})` : `translate(${r1(hx - 30)} ${r1(SEAT - 34)}) rotate(-10)`);
          const bl = placed(1) ? 1 : carry(1) ? 0.999 : 0;
          blanket.setAttribute("opacity", bl > 0 ? 1 : 0);
          if (carry(1)) blanket.setAttribute("d", `M${r1(hand[0] - 70)} ${r1(hand[1] - 10)} Q${r1(hand[0])} ${r1(hand[1] - 30)} ${r1(hand[0] + 60)} ${r1(hand[1] - 10)} L${r1(hand[0] + 50)} ${r1(hand[1] + 60)} Q${r1(hand[0])} ${r1(hand[1] + 40)} ${r1(hand[0] - 60)} ${r1(hand[1] + 60)} Z`);
          else { const q = clamp((s - TRIPS[1] - 2 * TRIPD - 0.15) / 0.3, 0, 1), y0 = SEAT - 56 + 30 * (1 - q); blanket.setAttribute("d", `M${r1(hx - 70)} ${r1(SEAT + 20)} L${r1(hx - 74)} ${r1(y0 + 6)} Q${r1(hx + 20)} ${r1(y0 - 22)} ${r1(hx + 120)} ${r1(y0 - 4)} Q${r1(hx + 170)} ${r1(y0 + 8)} ${r1(hx + 176)} ${r1(SEAT + 20)} Z`); }
          chocs.forEach((c, i) => {
            const t0 = TRIPS[2] + 2 * TRIPD + 0.15 + i * 0.06;
            c.setAttribute("opacity", carry(2) || s > t0 ? 1 : 0);
            c.setAttribute("transform", carry(2) ? `translate(${r1(hand[0])} ${r1(hand[1] - i * 15)})` : `translate(${TABLE - 20 + (i % 2) * 6} ${r1(FL - 70 - i * 15 - 30 * (1 - clamp((s - t0) / 0.12, 0, 1)))}) rotate(${(i % 3) - 1})`);
          });
          cup.setAttribute("opacity", carry(3) || placed(3) ? 1 : 0);
          cup.setAttribute("transform", carry(3) ? `translate(${r1(hand[0])} ${r1(hand[1])})` : `translate(${TABLE + 40} ${FL - 70})`);
          steams.forEach((st, j) => {
            const p = frac(t * 0.5 + j / 3), on = placed(3) ? 1 : 0;
            st.setAttribute("d", `M${TABLE + 32 + 8 * j} ${r1(FL - 104 - p * 40)} q${r1(8 * Math.sin(p * 6 + j))} -16 0 -32`);
            st.setAttribute("opacity", (on * 0.5 * Math.sin(Math.PI * p)).toFixed(3));
          });
          // pain lines at her belly until the hot-water bottle
          const pk = 1 - win(s, TRIPS[0] + 2 * TRIPD + 0.2, TRIPS[1] + 0.8);
          pain.forEach((p, i) => {
            const fl = 0.6 + 0.4 * Math.sin(t * 13 + i * 2);
            const x0 = hx - 40 + (i - 1) * 26, y0 = SEAT - 70 - 10 * Math.abs(i - 1);
            p.setAttribute("d", `M${x0} ${y0} l8 -12 l8 10 l8 -12`);
            p.setAttribute("opacity", (pk * fl).toFixed(3));
          });
          warm.setAttribute("opacity", (0.85 * win(s, T_HOLD - 0.5, T_HOLD + 1)).toFixed(3));
          lampGlow.setAttribute("opacity", (0.35 + 0.25 * win(s, T_HOLD - 0.5, T_HOLD + 1)).toFixed(3));
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (s > T_HOLD + 0.6 ? 1 : 0);
          heart.setAttribute("opacity", s > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2 + 20)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          const asleep = s > T_SLEEP ? 1 : 0;
          zzs.forEach((z, i) => { const q = frac(t * 0.55 + i / 3); z.setAttribute("x", r1(hp.head[0] + 10 + 26 * q)); z.setAttribute("y", r1(hp.head[1] - 30 - 80 * q)); z.setAttribute("font-size", r1(22 + 22 * q)); z.setAttribute("opacity", (asleep * Math.sin(Math.PI * q) * 0.9).toFixed(3)); });

          E("h1").innerHTML = slam(["HE", "DIDN'T", "TRY", "TO", "FIX", "IT."], [T_H1, T_H1 + 0.1, T_H1 + 0.2, T_H1 + 0.3, T_H1 + 0.4, T_H1 + 0.52], t, []);
          E("h2").innerHTML = slam(["HE", "JUST", "TOOK", "CARE", "OF", "HER."], [T_H2, T_H2 + 0.1, T_H2 + 0.2, T_H2 + 0.32, T_H2 + 0.42, T_H2 + 0.54], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["CARE", "IS", "LOUDER"], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["THAN", "“I", "LOVE", "YOU.”"], [T_CARD + 0.75, T_CARD + 0.88, T_CARD + 1.0, T_CARD + 1.12], t, []);
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
