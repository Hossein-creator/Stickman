        // ---------- scene: four men hang from one bar; the one everybody doubted hangs on last ----------
        const S = 1.25;
        E("svg").children[1].setAttribute("transform", `translate(540 1400) scale(${S}) translate(-400 -600)`);
        const W = E("world");
        const beams = E("beams");
        const barG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const BARY = 150, HY = BARY + 232;
        const XS = [130, 300, 470, 640];
        const DROP = [1.2, 2.4, 3.6, 9.0];          // TALENT, MOTIVATION, DOUBTED (first fall), DISCIPLINE
        const ORDER = [0, 1, 3, 2];                 // man index for each DROP time
        const dropT = [DROP[0], DROP[1], DROP[3], DROP[2]];
        const T_JUMP = 5.0, T_CATCH = 5.32;

        // the bar + posts
        for (const x of [40, 760]) {
          svgEl("rect", { x: x - 8, y: BARY - 10, width: 16, height: FL - BARY + 10, fill: "#555", stroke: "#000", "stroke-width": 5 }, barG);
          svgEl("rect", { x: x - 26, y: FL - 10, width: 52, height: 10, fill: "#444", stroke: "#000", "stroke-width": 4 }, barG);
        }
        svgEl("rect", { x: 30, y: BARY - 6, width: 740, height: 12, rx: 6, fill: "#bdbdbd", stroke: "#000", "stroke-width": 5 }, barG);
        const spots = XS.map((x) => svgEl("polygon", { points: `${x - 40},-200 ${x + 40},-200 ${x + 110},600 ${x - 110},600`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.4 }, beams));
        const pools = XS.map((x) => svgEl("ellipse", { cx: x, cy: FL, rx: 110, ry: 20, fill: "url(#pool)", opacity: 0.7 }, E("back")));

        const men = XS.map((x, i) => {
          const box = svgEl("g", {}, figG);
          return { x, box, parts: makeFig(box, "#ffffff", "#dedede", true, "m" + i) };
        });
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const grey = (k, a = 255, b = 120) => { const v = Math.round(lerp(a, b, k)); return `rgb(${v},${v},${v})`; };
        const reds = [0, 1].map(() => svgEl("circle", { r: 9, fill: "#d62a2a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));

        function hang(x, t, ph, shake) {
          const sw = Math.sin(t * 1.7 + ph) * 3 + shake * Math.sin(t * 47 + ph) * 2.2;
          return base({
            hx: x + sw, hy: HY + Math.abs(sw) * 0.3, torso: 4 + sw * 0.4, head: 26 + sw * 0.5,
            ax: x + 8 + sw * 1.6, ay: HY + 150, bx: x - 6 + sw * 1.8, by: HY + 147,
            ash: 170, ael: 0, aw: 1, atx: x + 14, aty: BARY + 2,
            bsh: 170, bel: 0, bw: 1, btx: x - 30, bty: BARY + 2,
          });
        }
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const floorSit = (x, f) => base({ hx: x, hy: FL - 24, torso: 22, head: 26, ax: x + f * 70, ay: FL, bx: x + f * 56, by: FL, ash: 30, ael: 30, aw: 1, atx: x + f * 62, aty: FL - 92, bsh: 20, bel: 30, bw: 1, btx: x + f * 54, bty: FL - 88 });
        // falling: hands slip, body drops with gravity, crouch on landing
        function fall(x, t, t0) {
          const q = t - t0;
          const land = Math.sqrt((2 * (stand - HY)) / 2600);
          const s = hang(x, t0, 0, 1);
          if (q < land) { const y = HY + 0.5 * 2600 * q * q; s.hy = y; s.ay = y + 150; s.by = y + 147; s.aty = BARY + 2 + 0.5 * 2600 * q * q * 0.6; s.bty = s.aty; s.aw = 1 - q / land; s.bw = s.aw; s.ash = lerp(170, 40, q / land); s.bsh = s.ash; return s; }
          const c = Math.sin(Math.PI * clamp((q - land) / 0.35, 0, 1));
          const st = standOn(x, 1, FL);
          st.hy += 40 * c; st.torso = 10 + 20 * c; st.ash = 30; st.bsh = 20;
          return st;
        }
        function quitterRaw(i, tDrop) {
          const x = XS[i], fs = i < 2 ? -1 : 1;
          return (t) => {
            const shake = win(t, tDrop - 1.0, tDrop);
            if (t < tDrop) return hang(x, t, i * 1.3, shake);
            if (t < tDrop + 0.7) return fall(x, t, tDrop);
            return mixPose(standOn(x, 1, FL), floorSit(x - fs * 40, fs), win(t, tDrop + 0.7, tDrop + 1.3));
          };
        }
        // DOUBTED: falls, looks at his red hands, jumps back up and outlasts everyone
        function doubtedRaw(t) {
          const x = XS[3];
          if (t < DROP[2]) return hang(x, t, 4.1, win(t, DROP[2] - 0.8, DROP[2]));
          if (t < DROP[2] + 0.6) return fall(x, t, DROP[2]);
          if (t < T_JUMP - 0.4) {
            const s = standOn(x, 1, FL);
            const look = win(t, 4.1, 4.4);
            s.head = 26 * look; s.torso = 6 + 4 * look;
            s.aw = look; s.atx = x + 40; s.aty = stand - 46; s.bw = look; s.btx = x + 30; s.bty = stand - 40;
            return s;
          }
          if (t < T_JUMP) {
            const c = win(t, T_JUMP - 0.4, T_JUMP);
            const s = standOn(x, 1, FL);
            s.hy += 44 * c; s.torso = 10 + 16 * c; s.head = -10 * c; s.ash = lerp(8, -30, c); s.bsh = lerp(-4, -36, c);
            return s;
          }
          if (t < T_CATCH) {
            const q = clamp((t - T_JUMP) / (T_CATCH - T_JUMP), 0, 1);
            const s = hang(x, t, 4.1, 0);
            const y = lerp(stand + 44, HY, ease(q));
            s.hy = y; s.ay = y + 150 - 30 * (1 - q); s.by = y + 147 - 30 * (1 - q);
            s.aw = q; s.bw = q; s.ash = lerp(-30, 170, q); s.bsh = s.ash;
            return s;
          }
          const s = hang(x, t, 4.1, 0);
          s.hy += 6 * Math.exp(-(t - T_CATCH) * 5) * Math.sin((t - T_CATCH) * 20);
          return s;
        }
        const raws = [quitterRaw(0, DROP[0]), quitterRaw(1, DROP[1]), quitterRaw(2, DROP[3]), doubtedRaw];

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        XS.forEach((x, i) => (E("lb" + i).style.left = r1(540 + (x - 400) * S) + "px"));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const out = (i, t) => {
          if (i === 3) return win(t, DROP[2] + 0.2, DROP[2] + 0.6) * (1 - win(t, T_JUMP + 0.2, T_JUMP + 0.5));
          const td = i === 2 ? DROP[3] : DROP[i];
          return win(t, td + 0.2, td + 0.9);
        };

        // ---------- per-frame render ----------
        function render(t) {
          men.forEach((m, i) => {
            const j = drawFig(m.parts, livePose(raws[i], t, i * 0.9), i < 2 ? -1 : 1);
            const o = out(i, t);
            tint(m.parts, grey(o), grey(o, 222, 100));
            spots[i].setAttribute("opacity", (0.4 * (1 - o) + (i === 3 ? 0.25 * win(t, 9.2, 10.0) : 0)).toFixed(3));
            pools[i].setAttribute("opacity", (0.7 * (1 - o)).toFixed(3));
            E("lb" + i).style.color = grey(o, 255, 95);
            if (i === 3) {
              const rd = win(t, 4.3, 4.6);
              j.hands.forEach((h, k) => { reds[k].setAttribute("cx", r1(h[0])); reds[k].setAttribute("cy", r1(h[1])); reds[k].setAttribute("opacity", rd.toFixed(3)); });
            }
          });
          // "TOLD YOU." from the man who quit first
          const to = win(t, 3.95, 4.15) * (1 - win(t, 4.9, 5.1));
          E("told").style.opacity = to.toFixed(3);
          E("told").style.left = r1(540 + (XS[0] - 400) * S - 20) + "px";
          E("told").style.top = r1(1400 + (FL - 250 - 600) * S) + "px";
          E("told").style.transform = `scale(${backOut(clamp((t - 3.95) / 0.25, 0, 1)).toFixed(3)})`;

          const sec = Math.floor(7 + Math.min(t, 12.5) * 24);
          E("tmr").textContent = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");

          typed("h1", "WHO HOLDS ON LONGEST?", t, 0.3, 24);
          typed("h2", "THE ONE THEY SAID COULDN'T.", t, 10.2, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 10.0, 10.4)).toFixed(3)})`;
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
