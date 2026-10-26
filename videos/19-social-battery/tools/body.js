        // ---------- scene: a party drains him, a quiet lamp charges him; she drains alone, then finds him ----------
        E("svg").children[1].setAttribute("transform", "translate(540 1400) scale(1.25) translate(-400 -600)");
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const partyG = svgEl("g", {}, backG);
        const roomG = svgEl("g", { opacity: 0 }, backG);
        const figG = svgEl("g", {}, W);
        const IX = 150, EX0 = 640, EX1 = 360;
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const frac = (v) => v - Math.floor(v);

        // party: string lights + white beams
        const bulbs = [];
        const wire = svgEl("path", { d: "M-40 70 Q200 150 400 80 Q600 150 840 70", fill: "none", stroke: "#555", "stroke-width": 2 }, partyG);
        for (let i = 0; i <= 26; i++) {
          const x = -40 + i * 33, seg = x < 400 ? (x + 40) / 440 : (x - 400) / 440;
          const y = (x < 400 ? lerp(70, 80, seg) : lerp(80, 70, seg)) + Math.sin(Math.PI * seg) * 36;
          bulbs.push([svgEl("circle", { cx: x, cy: y + 6, r: 5.5, fill: "#fff6d8" }, partyG), svgEl("circle", { cx: x, cy: y + 6, r: 14, fill: "#fff6d8", opacity: 0.15, filter: "url(#blur)" }, partyG)]);
        }
        const pBeams = [0, 1, 2].map((i) => svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0.25 }, beams));
        const coldBeam = svgEl("polygon", { points: "580,-120 700,-120 810,600 470,600", fill: "url(#coldBeam)", filter: "url(#soft)", opacity: 0 }, beams);
        const coldPool = svgEl("ellipse", { cx: 640, cy: FL, rx: 190, ry: 30, fill: "url(#coldPool)", opacity: 0 }, backG);

        // room: warm floor lamp + armchair (fade in at the cut)
        const warmHalo = svgEl("circle", { cx: 70, cy: 300, r: 300, fill: "url(#warmPool)" }, roomG);
        svgEl("ellipse", { cx: 150, cy: FL, rx: 230, ry: 34, fill: "url(#warmPool)" }, roomG);
        svgEl("line", { x1: 60, y1: 270, x2: 60, y2: FL, stroke: "#000", "stroke-width": 10 }, roomG);
        svgEl("line", { x1: 60, y1: 270, x2: 60, y2: FL, stroke: "#9a9a9a", "stroke-width": 5 }, roomG);
        svgEl("ellipse", { cx: 60, cy: FL - 3, rx: 30, ry: 6, fill: "#777", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("polygon", { points: "28,270 92,270 78,210 42,210", fill: "#ffe6ae", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, roomG);
        const chair = svgEl("g", {}, roomG);
        svgEl("rect", { x: 78, y: FL - 210, width: 34, height: 190, rx: 14, fill: "#5e4c3f", stroke: "#000", "stroke-width": 6 }, chair);
        svgEl("rect", { x: 90, y: FL - 82, width: 120, height: 46, rx: 12, fill: "#6e5a4a", stroke: "#000", "stroke-width": 6 }, chair);
        svgEl("rect", { x: 186, y: FL - 120, width: 30, height: 84, rx: 12, fill: "#5e4c3f", stroke: "#000", "stroke-width": 6 }, chair);
        svgEl("rect", { x: 96, y: FL - 36, width: 12, height: 36, fill: "#3e3228", stroke: "#000", "stroke-width": 4 }, chair);
        svgEl("rect", { x: 192, y: FL - 36, width: 12, height: 36, fill: "#3e3228", stroke: "#000", "stroke-width": 4 }, chair);

        // ---------- people ----------
        const box = (p) => svgEl("g", {}, p);
        const dancers = [300, 400, 500].map((x, i) => ({ x, f: i % 2 ? -1 : 1, g: box(figG) }));
        dancers.forEach((d, i) => (d.parts = makeFig(d.g, "#8a8a8a", "#6e6e6e", false, "d" + i)));
        const introG = box(figG), extroG = box(figG);
        const intro = makeFig(introG, "#ffffff", "#dedede", true, "intro");
        const extro = makeFig(extroG, "#ffffff", "#dedede", true, "extro");

        const T_CUT = 5.0;
        function dancePose(x, f, t, ph, amp) {
          const b = Math.sin(t * 2 * Math.PI * 2 + ph);
          const s = standOn(x, f, FL);
          s.hy += amp * (4 + 6 * Math.abs(b));
          s.torso = 4 + amp * 6 * b;
          s.head = amp * 8 * Math.sin(t * 2 * Math.PI + ph);
          s.ash = lerp(8, 150 + 20 * b, amp); s.ael = lerp(12, -30, amp);
          s.bsh = lerp(-4, 150 - 20 * b, amp); s.bel = lerp(10, -30, amp);
          return s;
        }
        const chairSit = (x, f) => base({ hx: x, hy: FL - 82, torso: -6, head: 4, ax: x + f * 92, ay: FL, bx: x + f * 76, by: FL, ash: 26, ael: 40, aw: 1, atx: x + f * 70, aty: FL - 92, bsh: 16, bel: 40, bw: 1, btx: x + f * 60, bty: FL - 90 });
        function introRaw(t) {
          const drain = win(t, 1.0, 4.8);
          if (t < T_CUT + 0.3) {
            // stiff at the party, arms folded tighter and shoulders sinking as he drains
            const s = standOn(IX, 1, FL);
            s.torso = 3 + 10 * drain; s.head = 6 + 16 * drain; s.hy += 4 * drain;
            s.aw = 1; s.atx = IX + 26; s.aty = stand - 70 + 8 * drain;
            s.bw = 1; s.btx = IX + 18; s.bty = stand - 62 + 8 * drain;
            return s;
          }
          const sit = win(t, T_CUT + 0.3, T_CUT + 0.9);
          const s = mixPose(standOn(IX, 1, FL), chairSit(IX, 1), sit);
          const rel = win(t, 6.2, 7.6);
          s.head = lerp(16, 0, rel); s.torso = lerp(6, -8, rel);
          // reaches over to her shoulder at the end
          const reach = win(t, 10.1, 10.6);
          s.atx = lerp(s.atx, 318, reach); s.aty = lerp(s.aty, FL - 136, reach);
          return s;
        }
        const floorSit = (x, f) => base({ hx: x, hy: FL - 24, torso: 8, head: 4, ax: x + f * 66, ay: FL, bx: x + f * 52, by: FL, ash: 30, ael: 30, aw: 1, atx: x + f * 60, aty: FL - 96, bsh: 20, bel: 30, bw: 1, btx: x + f * 66, bty: FL - 82 });
        const T_WALK = 8.3, T_ARR = 9.6;
        function walkPose(x0, dir, hx, STRIDE) {
          const u = (hx - x0) * dir, p = u / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            let uf, lift = 0;
            if (q < 0.5) uf = u + STRIDE * (0.25 - q);
            else { const s = (q - 0.5) / 0.5; uf = u + STRIDE * (-0.25 + 0.5 * ease(s)); lift = Math.sin(Math.PI * s) * 16; }
            return [x0 + dir * uf, FL - lift];
          });
          const sw = Math.sin(Math.PI * 2 * p);
          const legH = Math.sqrt(LEG * LEG - (STRIDE * 0.25) ** 2);
          return base({ hx, hy: lerp(stand, FL - legH, 0.6) + 3 * Math.abs(sw), torso: 7, head: 8, ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1], ash: 8 + 18 * sw, ael: 14, bsh: -4 - 18 * sw, bel: 12 });
        }
        function extroRaw(t) {
          const stopD = win(t, T_CUT - 0.1, T_CUT + 0.5);
          if (t < T_WALK) {
            const d = dancePose(EX0, -1, t, 0.4, 1 - stopD);
            const slump = win(t, 5.6, 8.0);
            d.torso += 16 * slump; d.head += 24 * slump; d.hy += 6 * slump;
            d.ash = lerp(d.ash, 2, slump); d.bsh = lerp(d.bsh, 0, slump);
            return d;
          }
          if (t < T_ARR) {
            const hx = lerp(EX0, EX1, ease((t - T_WALK) / (T_ARR - T_WALK)));
            return walkPose(EX0, -1, hx, 140);
          }
          return mixPose(standOn(EX1, -1, FL), floorSit(EX1, -1), win(t, T_ARR, T_ARR + 0.6));
        }

        // ---------- batteries ----------
        const pw = (t, k) => { for (let i = 1; i < k.length; i++) if (t < k[i][0]) return lerp(k[i - 1][1], k[i][1], (t - k[i - 1][0]) / (k[i][0] - k[i - 1][0])); return k[k.length - 1][1]; };
        const BA = [[0, 92], [1.0, 88], [4.8, 6], [5.9, 6], [8.0, 100], [99, 100]];
        const BB = [[0, 36], [4.6, 100], [5.2, 100], [8.0, 4], [10.2, 4], [11.8, 100], [99, 100]];
        const chgA = (t) => (t > 5.9 && t < 8.2) || t > 10.2;
        const chgB = (t) => t < 4.6 || (t > 10.2 && t < 12.2);
        function bat(k, v, chg, t) {
          const low = v < 20, col = low ? "#d62a2a" : "#ffffff";
          E("fill" + k).style.width = clamp(v, 3, 100) + "%";
          E("fill" + k).style.background = col;
          E("bat" + k).style.borderColor = col;
          E("nub" + k).style.background = col;
          E("pct" + k).textContent = Math.round(v) + "%";
          E("pct" + k).style.color = col;
          E("bolt" + k).style.opacity = chg ? (0.75 + 0.25 * Math.sin(t * 8)).toFixed(3) : 0;
          E("bat" + k).style.boxShadow = chg ? "0 0 18px rgba(255,255,255,0.45)" : "none";
        }

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- per-frame render ----------
        function render(t) {
          const party = 1 - win(t, T_CUT, T_CUT + 0.5);
          partyG.setAttribute("opacity", party.toFixed(3));
          bulbs.forEach(([b, h], i) => {
            const tw = 0.6 + 0.4 * Math.sin(t * 5 + i * 1.9);
            b.setAttribute("opacity", tw.toFixed(3));
            h.setAttribute("opacity", (0.18 * tw).toFixed(3));
          });
          pBeams.forEach((pb, i) => {
            const cx = 400 + Math.sin(t * 1.3 + i * 2.1) * 260;
            pb.setAttribute("points", `${r1(cx - 40)},-150 ${r1(cx + 40)},-150 ${r1(cx + 150)},600 ${r1(cx - 150)},600`);
            pb.setAttribute("opacity", (0.22 * party).toFixed(3));
          });
          dancers.forEach((d, i) => {
            drawFig(d.parts, livePose((tt) => dancePose(d.x, d.f, tt, i * 1.3, 1), t, i), d.f);
            d.g.setAttribute("opacity", party.toFixed(3));
          });
          const room = win(t, T_CUT, T_CUT + 0.6);
          roomG.setAttribute("opacity", room.toFixed(3));
          warmHalo.setAttribute("opacity", (0.7 + 0.05 * Math.sin(t * 3)).toFixed(3));
          const cold = room * (1 - win(t, T_WALK, T_WALK + 0.8));
          coldBeam.setAttribute("opacity", (0.5 * cold).toFixed(3));
          coldPool.setAttribute("opacity", cold.toFixed(3));

          drawFig(intro, livePose(introRaw, t, 0.2), 1);
          drawFig(extro, livePose(extroRaw, t, 1.4), -1);

          bat("A", pw(t, BA), chgA(t), t);
          bat("B", pw(t, BB), chgB(t), t);

          typed("h1", "SOME PEOPLE DRAIN YOU.", t, 10.6, 24);
          typed("h2", "THE RIGHT ONE CHARGES YOU.", t, 11.6, 24);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 11.4, 11.8)).toFixed(3)})`;
          fade.style.opacity = win(t, 13.35, 13.95).toFixed(3);
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
