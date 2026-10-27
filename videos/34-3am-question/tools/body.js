        // ---------- "3 am question": 03:00, she is awake and wants to know if he still loves her. Poke: thumbs-up in his sleep. Lamp on: thumbs-up again. Pillow to the head: he sits up... opens his arms and pulls her into the blanket ----------
        // remake of a 10.6x outlier (Havefunzer, "they can never get enough"), see viral/2026-10-27-check.md
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

        // ---------- time warp: slow motion on the pillow ----------
        const SLOWS = [[6.0, 7.0]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T_POKE = 0.8, T_W1 = 1.05, T_ASK1 = 1.3, T_UP1 = 1.8, T_DOWN1 = 2.45;
        const T_CLK2 = 2.9, T_LAMP = 3.25, T_W2 = 3.4, T_ASK2 = 3.7, T_UP2 = 4.2, T_DOWN2 = 4.8, T_OFF = 5.05;
        const T_CLK3 = 5.35, T_PICK = 5.6, T_THROW = 5.95, T_HIT = 6.2, T_SIT = 6.45, T_TURN = 6.9, T_ARMS = 7.75, T_CRAWL = 8.0, T_HUG = 8.4, T_LIE = 8.9, T_CLK4 = 9.4;
        const BED0 = 160, BED1 = 650, MT = FL - 70;          // bed from x 160 to 650, mattress top
        const HIPM = 374, HIPF = 600, LAMPX = 725;
        const clockAt = (s) => (s < T_CLK2 ? "03:00" : s < T_CLK3 ? "03:14" : s < T_CLK4 ? "03:41" : "03:42");

        // ---------- room: night window, moon beam, bed, nightstand with a lamp ----------
        svgEl("rect", { x: 370, y: FL - 430, width: 160, height: 170, fill: "#0d1626", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("line", { x1: 450, y1: FL - 430, x2: 450, y2: FL - 260, stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("circle", { cx: 495, cy: FL - 385, r: 20, fill: "#e6e8f0" }, backG);
        const moonBeam = svgEl("polygon", { points: `370,${FL - 430} 530,${FL - 430} 620,${FL} 260,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const lampPool = svgEl("circle", { cx: LAMPX, cy: FL - 160, r: 520, fill: "url(#fireGlow)", opacity: 0 }, backG);
        const warm = svgEl("ellipse", { cx: 420, cy: FL, rx: 400, ry: 56, fill: "url(#fireGlow)", opacity: 0 }, backG);
        svgEl("rect", { x: BED0 - 14, y: FL - 200, width: 24, height: 200, rx: 6, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT + 22, width: BED1 - BED0, height: 30, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        for (const lx of [BED0 + 10, BED1 - 20]) svgEl("rect", { x: lx, y: MT + 50, width: 12, height: FL - MT - 50, fill: "#2a211a", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: BED0, y: MT, width: BED1 - BED0, height: 26, rx: 10, fill: "#4a4a52", stroke: "#000", "stroke-width": 5 }, roomG);
        const pillowHim = svgEl("ellipse", { cx: 212, cy: MT - 8, rx: 44, ry: 15, fill: "#d9d9e3", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: LAMPX - 40, y: FL - 110, width: 80, height: 110, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: LAMPX - 4, y: FL - 165, width: 8, height: 55, fill: "#777", stroke: "#000", "stroke-width": 3 }, roomG);
        const shade = svgEl("path", { d: `M${LAMPX - 30} ${FL - 160} L${LAMPX + 30} ${FL - 160} L${LAMPX + 18} ${FL - 205} L${LAMPX - 18} ${FL - 205} Z`, fill: "#6a5a40", stroke: "#000", "stroke-width": 4 }, roomG);

        // ---------- the two of them ----------
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const blanket = svgEl("path", { fill: "#3f5a8a", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, frontG);
        const pillow = svgEl("ellipse", { rx: 40, ry: 15, fill: "#d9d9e3", stroke: "#000", "stroke-width": 5 }, fxG);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        // her question bubble: a heart and a "?" in a speech cloud
        const bub = svgEl("g", { opacity: 0 }, fxG);
        svgEl("ellipse", { cx: 0, cy: 0, rx: 96, ry: 54, fill: "#fff", stroke: "#000", "stroke-width": 5 }, bub);
        svgEl("path", { d: "M18 44 L34 74 L-4 48 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, bub);
        svgEl("rect", { x: 6, y: 38, width: 30, height: 14, fill: "#fff" }, bub);
        svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, transform: "translate(-46 4) scale(0.8)" }, bub);
        const bubQ = svgEl("text", { x: 22, y: 20, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 56, fill: "#111", "text-anchor": "middle" }, bub);
        const pop = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const bigHeart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const zzs = [0, 1, 2].map(() => svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#9aa4c0", "text-anchor": "middle", opacity: 0 }, fxG));
        zzs.forEach((z) => (z.textContent = "z"));
        const ring = svgEl("circle", { r: 10, fill: "none", stroke: "#fff", "stroke-width": 6, opacity: 0 }, fxG);
        const feathers = Array.from({ length: 12 }, (_, i) => ({ a: (i / 12) * Math.PI * 2, v: 120 + (i % 4) * 40, el: svgEl("ellipse", { rx: 9, ry: 4, fill: "#f2f2f2", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG) }));

        // lying on the back, head to the left (f = -1, torso 90 = flat)
        const lying = (hx) => base({ hx, hy: MT - 22, torso: 90, head: 0, ax: hx + 150, ay: MT - 18, bx: hx + 146, by: MT - 12, ash: 0, ael: 0, aw: 1, atx: hx - 30, aty: MT - 14, bw: 1, btx: hx - 40, bty: MT - 20 });
        // sitting up in bed, legs forward under the blanket
        const bedSit = (hx, f, torso, ld = 1) => base({ hx, hy: MT - 12, torso, head: 0, ax: hx + ld * 150, ay: MT - 14, bx: hx + ld * 140, by: MT - 10, ash: 20, ael: 30, bsh: 10, bel: 30, aw: 1, atx: hx + f * 40, aty: MT - 30, bw: 1, btx: hx + f * 30, bty: MT - 26 });

        // ---------- him: asleep. Half wakes twice for a sleepy thumbs-up. The pillow wakes him for real ----------
        function himRaw(s) {
          const sl = lying(HIPM);
          const wake = (a, b, c) => win(s, a, a + 0.2) * (1 - win(s, c, c + 0.3));
          const w = Math.max(wake(T_W1, 0, T_DOWN1), wake(T_W2, 0, T_DOWN2));
          const st = mixPose(sl, { ...sl, torso: 62, head: -10, hy: MT - 26 }, w);
          // thumbs-up over his shoulder without even looking
          const up = Math.max(win(s, T_UP1, T_UP1 + 0.15) * (1 - win(s, T_DOWN1 - 0.1, T_DOWN1 + 0.1)), win(s, T_UP2, T_UP2 + 0.15) * (1 - win(s, T_DOWN2 - 0.1, T_DOWN2 + 0.1)));
          st.bw = 1; st.btx = lerp(st.btx, HIPM + 40, up); st.bty = lerp(st.bty, MT - 210, up);
          // lamp: arm over his eyes
          const eyes = win(s, T_LAMP + 0.05, T_LAMP + 0.2) * (1 - win(s, T_OFF - 0.1, T_OFF + 0.1));
          st.aw = 1; st.atx = lerp(st.atx, HIPM - 120, eyes); st.aty = lerp(st.aty, MT - 120, eyes);
          if (s < T_HIT) return st;
          // the pillow: snaps upright
          const sit = bedSit(HIPM, -1, 4);
          sit.head = -6;
          const m = mixPose(st, sit, win(s, T_HIT, T_SIT));
          m.head -= 14 * Math.exp(-Math.max(0, s - T_HIT) * 6);
          if (s < T_TURN) return m;
          // turns to her, a long look... arms open
          const face = bedSit(HIPM, 1, 4);
          face.head = 4;
          const arms = win(s, T_ARMS, T_ARMS + 0.25);
          face.aw = 1; face.atx = lerp(HIPM + 40, HIPM + 110, arms); face.aty = lerp(MT - 30, MT - 180, arms);
          face.bw = 1; face.btx = lerp(HIPM + 30, HIPM + 70, arms); face.bty = lerp(MT - 26, MT - 200, arms);
          if (s < T_HUG) return face;
          // hug, then he falls back onto the pillow with her
          const hug = bedSit(HIPM, 1, 10);
          hug.aw = 1; hug.atx = HIPM + 96; hug.aty = MT - 120; hug.bw = 1; hug.btx = HIPM + 104; hug.bty = MT - 150; hug.head = 10;
          const lie = base({ hx: HIPM, hy: MT - 22, torso: -88, head: -8, ax: HIPM + 150, ay: MT - 18, bx: HIPM + 146, by: MT - 12, aw: 1, atx: HIPM - 70, aty: MT - 76, bw: 1, btx: HIPM - 40, bty: MT - 84 });
          const k = win(s, T_LIE, T_LIE + 0.5);
          return mixPose(mixPose(face, hug, win(s, T_HUG, T_HUG + 0.2)), lie, k);
        }
        const himF = (s) => (s < T_TURN ? -1 : 1);

        // ---------- her: sits up, wide awake. Poke, lamp, pillow. Then crawls into his arms ----------
        function herRaw(s) {
          const st = bedSit(HIPF, -1, -4, -1);
          st.head = -8 + 6 * Math.sin(s * 1.3);
          // poke: leans in and pokes his leg
          const poke = Math.sin(Math.PI * clamp((s - T_POKE + 0.1) / 0.35, 0, 1));
          st.torso += 26 * poke; st.atx = lerp(st.atx, HIPF - 120, poke); st.aty = lerp(st.aty, MT - 34, poke);
          // asks: hands clasped under her chin
          const ask = Math.max(win(s, T_ASK1, T_ASK1 + 0.15) * (1 - win(s, T_DOWN1, T_DOWN1 + 0.2)), win(s, T_ASK2, T_ASK2 + 0.15) * (1 - win(s, T_DOWN2, T_DOWN2 + 0.2)));
          st.atx = lerp(st.atx, HIPF - 34, ask); st.aty = lerp(st.aty, MT - 150, ask); st.btx = lerp(st.btx, HIPF - 26, ask); st.bty = lerp(st.bty, MT - 144, ask);
          st.head = lerp(st.head, -18, ask);
          // lamp: reaches back to the switch
          const lamp = Math.sin(Math.PI * clamp((s - T_LAMP + 0.15) / 0.3, 0, 1)) + Math.sin(Math.PI * clamp((s - T_OFF + 0.15) / 0.3, 0, 1));
          st.bw = 1; st.btx = lerp(st.btx, LAMPX - 20, lamp); st.bty = lerp(st.bty, FL - 160, lamp);
          // pillow: grabs it from behind, throws it overhand
          if (s > T_PICK - 0.1 && s < T_SIT) {
            const wind = win(s, T_PICK, T_THROW - 0.05), rel = win(s, T_THROW - 0.05, T_THROW + 0.1);
            st.aw = 1; st.atx = lerp(lerp(st.atx, HIPF + 40, wind), HIPF - 110, rel); st.aty = lerp(lerp(st.aty, MT - 230, wind), MT - 120, rel);
            st.torso += -10 * wind + 24 * rel; st.head = -12;
          }
          if (s < T_TURN) return st;
          // caught. guilty little shrug
          const guilty = { ...st };
          guilty.aw = 1; guilty.atx = HIPF - 30; guilty.aty = MT - 150; guilty.bw = 1; guilty.btx = HIPF - 20; guilty.bty = MT - 140; guilty.head = 16; guilty.torso = -4;
          if (s < T_CRAWL) return mixPose(st, guilty, win(s, T_TURN, T_TURN + 0.3));
          // crawls over into the hug
          const hx = lerp(HIPF, 495, win(s, T_CRAWL, T_HUG));
          const hug = bedSit(hx, -1, 16, -1);
          hug.aw = 1; hug.atx = hx - 96; hug.aty = MT - 140; hug.bw = 1; hug.btx = hx - 104; hug.bty = MT - 160; hug.head = -4;
          if (s < T_HUG) return mixPose(guilty, hug, win(s, T_CRAWL, T_CRAWL + 0.2));
          const lie = base({ hx: 470, hy: MT - 52, torso: 70, head: -10, ax: 330, ay: MT - 20, bx: 340, by: MT - 14, aw: 1, atx: 330, aty: MT - 70, bw: 1, btx: 350, bty: MT - 60 });
          return mixPose(hug, lie, win(s, T_LIE, T_LIE + 0.5));
        }

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 2.2, 580, 430, 0], [0.7, 1.7, 470, 450, 0], [1.2, 2.2, 270, 440, -2], [1.7, 1.6, 420, 450, 0],
          [2.5, 1.5, 420, 460, 0], [3.2, 1.6, 560, 450, 0], [3.5, 2.3, 260, 440, 2], [4.3, 1.6, 420, 450, 0],
          [5.3, 1.8, 560, 440, 0], [5.95, 1.7, 420, 450, 0], [6.2, 2.4, 250, 430, -3], [6.9, 1.9, 330, 440, 0],
          [7.4, 2.5, 560, 430, 0], [7.75, 1.9, 400, 450, 0], [8.5, 2.0, 420, 450, 0], [9.6, 1.6, 400, 460, 0], [99, 1.5, 400, 460, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          hit(realOf(T_POKE), 0.3, 0.15, 0, 0.12);
          [T_CLK2, T_CLK3, T_CLK4].forEach((c) => hit(realOf(c), 0.25, 0.25, 0, 0.12));
          hit(realOf(T_LAMP), 0.5, 0.3, 0.3, 0.2);
          hit(realOf(T_HIT), 1.8, 1, 0.15, 0.4);
          hit(realOf(T_HUG), 0.5, 0.2, 0, 0.3);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), -1);
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));

          // blanket: covers his legs and her lap; after the hug it comes up over both of them
          const up = win(s, T_LIE + 0.2, T_LIE + 0.8);
          const x0 = lerp(300, 250, up), top = lerp(MT - 34, MT - 52, up);
          blanket.setAttribute("d", `M${r1(x0)} ${MT + 4} L${r1(x0 - 6)} ${r1(top)} Q${r1(x0 + 120)} ${r1(top - 18)} 470 ${r1(top + 4)} Q560 ${r1(top + 12)} ${BED1 + 8} ${r1(top + 6)} L${BED1 + 12} ${MT + 30} Z`);

          // lamp
          const lampOn = s > T_LAMP && s < T_OFF ? 1 : 0;
          lampPool.setAttribute("opacity", (0.9 * lampOn).toFixed(3));
          shade.setAttribute("fill", lampOn ? "#ffe0a0" : "#6a5a40");
          moonBeam.setAttribute("opacity", (0.16 * (1 - lampOn)).toFixed(3));
          const cozy = win(s, T_LIE, T_LIE + 0.8);
          warm.setAttribute("opacity", (0.7 * cozy).toFixed(3));

          // the pillow: behind her, in her hand, flying, bouncing off his head, landing on the floor
          let px = HIPF + 52, py = MT - 10, pr = 0;
          if (s > T_PICK && s < T_THROW) { px = hp.hands[0][0]; py = hp.hands[0][1] - 10; pr = -30; }
          else if (s >= T_THROW && s < T_HIT) { const q = (s - T_THROW) / (T_HIT - T_THROW), from = [HIPF - 110, MT - 140], to = [mp.head[0] + 20, mp.head[1]]; px = lerp(from[0], to[0], q); py = lerp(from[1], to[1], q) - 70 * Math.sin(Math.PI * q); pr = -400 * q; }
          else if (s >= T_HIT) { const q = s - T_HIT; px = 230 - 260 * Math.min(q, 0.9); py = Math.min(FL - 14, MT - 100 - 300 * q + 900 * q * q); pr = -400 - 300 * Math.min(q, 0.9); }
          pillow.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) rotate(${r1(pr)})`);
          const hd = s - T_HIT;
          ring.setAttribute("cx", r1(mp.head[0])); ring.setAttribute("cy", r1(mp.head[1]));
          ring.setAttribute("r", r1(10 + 220 * clamp(hd / 0.5, 0, 1)));
          ring.setAttribute("opacity", hd > 0 && hd < 0.5 ? (0.8 * (1 - hd / 0.5)).toFixed(3) : 0);
          feathers.forEach((f) => {
            const on = hd > 0 && hd < 1.6;
            f.el.setAttribute("transform", `translate(${r1(mp.head[0] + Math.cos(f.a) * f.v * Math.min(hd, 0.5) + 10 * Math.sin(hd * 6 + f.a))} ${r1(mp.head[1] + Math.sin(f.a) * f.v * Math.min(hd, 0.5) + 60 * hd)}) rotate(${r1(hd * 200 + f.a * 50)})`);
            f.el.setAttribute("opacity", on ? (1 - hd / 1.6).toFixed(3) : 0);
          });

          // her question bubble, three times, the question marks grow
          let bq = 0, nq = 1;
          [[T_ASK1, T_DOWN1, 1], [T_ASK2, T_DOWN2, 2], [T_TURN + 0.2, T_ARMS, 3]].forEach(([a, b, n]) => { const k = win(s, a, a + 0.15) * (1 - win(s, b - 0.1, b + 0.1)); if (k > bq) { bq = k; nq = n; } });
          bubQ.textContent = "?".repeat(nq);
          bub.setAttribute("opacity", bq.toFixed(3));
          bub.setAttribute("transform", `translate(${r1(hp.head[0] - 40)} ${r1(hp.head[1] - 120)}) scale(${(0.6 + 0.4 * backOut(bq)).toFixed(3)})`);
          // his sleepy answer: a heart pops off the thumbs-up
          let pq = -1;
          [T_UP1 + 0.15, T_UP2 + 0.15].forEach((a) => { if (s > a && s < a + 0.7) pq = (s - a) / 0.7; });
          pop.setAttribute("opacity", pq >= 0 ? Math.sin(Math.PI * pq).toFixed(3) : 0);
          pop.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1] - 40 - 50 * Math.max(pq, 0))}) scale(${(0.6 + 0.3 * Math.max(pq, 0)).toFixed(3)})`);
          // the payoff heart over the two of them
          const hq = clamp((s - T_LIE - 0.4) / 0.4, 0, 1);
          bigHeart.setAttribute("opacity", s > T_LIE + 0.4 ? 1 - win(s, 10.6, 11.0) : 0);
          bigHeart.setAttribute("transform", `translate(390 ${r1(MT - 210 - 20 * hq)}) scale(${(backOut(hq) * 1.4).toFixed(3)})`);
          // z z z: him while he sleeps, both at the end
          const asleep = (s < T_W1 || (s > T_DOWN1 + 0.3 && s < T_W2) || (s > T_DOWN2 + 0.3 && s < T_HIT) || s > T_LIE + 0.5) ? 1 : 0;
          zzs.forEach((z, i) => {
            const q = frac(t * 0.55 + i / 3);
            z.setAttribute("x", r1(mp.head[0] + 20 + 30 * q + 6 * Math.sin(q * 9)));
            z.setAttribute("y", r1(mp.head[1] - 40 - 110 * q));
            z.setAttribute("font-size", r1(26 + 26 * q));
            z.setAttribute("opacity", (asleep * Math.sin(Math.PI * q) * 0.9 * (1 - win(s, 10.6, 11.0))).toFixed(3));
          });

          // the clock
          E("num").textContent = clockAt(s);
          const tick = [T_CLK2, T_CLK3, T_CLK4].reduce((m, c) => m + (s > c ? 0.35 * Math.exp(-(s - c) * 7) : 0), 0);
          E("num").style.transform = `scale(${(1 + tick).toFixed(3)})`;
          E("ctr").style.opacity = (1 - win(t, 10.5, 10.8)).toFixed(3);

          E("h1").innerHTML = slam(["WHAT", "IF", "I", "WAS", "ANNOYING?"], [10.9, 11.03, 11.14, 11.26, 11.4], t, []);
          E("h2").innerHTML = slam(["WE'RE", "TESTING", "IT", "NOW."], [12.1, 12.25, 12.4, 12.6], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 12.0, 12.3)).toFixed(3);
          fade.style.opacity = win(t, 13.6, 13.98).toFixed(3);
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
