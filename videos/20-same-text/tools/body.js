        // ---------- scene: two beds, the same text at 11:14 PM; one sleeps, one spirals until sunrise ----------
        E("svg").children[1].setAttribute("transform", "translate(540 1330) scale(1.25) translate(-400 -600)");
        const W = E("world");
        const backG = E("back");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const MT = FL - 70;              // mattress top
        const LY = MT - 12;              // hip height lying / sitting in bed

        // window (night -> sunrise) and its light
        svgEl("rect", { x: -300, y: -900, width: 1400, height: 1500, fill: "#07080d" }, backG);
        const dawnLight = svgEl("ellipse", { cx: 400, cy: 360, rx: 520, ry: 330, fill: "url(#dawnPool)", opacity: 0 }, backG);
        svgEl("rect", { x: 334, y: 106, width: 132, height: 212, fill: "#000" }, backG);
        svgEl("rect", { x: 342, y: 114, width: 116, height: 196, fill: "url(#sky)" }, backG);
        const moon = svgEl("circle", { cx: 425, cy: 150, r: 13, fill: "#f3f0dc" }, backG);
        const sun = svgEl("circle", { cx: 400, cy: 300, r: 30, fill: "#ffd08a", filter: "url(#blur)", opacity: 0 }, backG);
        let cx = 342;
        while (cx < 458) { const w = 10 + ((cx * 7) % 13), h = 22 + ((cx * 13) % 40); svgEl("rect", { x: cx, y: 310 - h, width: Math.min(w, 458 - cx), height: h, fill: "#05060c" }, backG); cx += w; }
        svgEl("line", { x1: 400, y1: 114, x2: 400, y2: 310, stroke: "#000", "stroke-width": 7 }, backG);
        svgEl("line", { x1: 342, y1: 212, x2: 458, y2: 212, stroke: "#000", "stroke-width": 7 }, backG);
        // nightstand with a little red clock
        svgEl("rect", { x: 374, y: FL - 104, width: 52, height: 104, rx: 6, fill: "#2b2c35", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: 380, y: FL - 128, width: 40, height: 24, rx: 4, fill: "#111", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("rect", { x: 385, y: FL - 122, width: 30, height: 12, fill: "#ff3b30", opacity: 0.85 }, roomG);
        // two beds
        const beds = [[0, 368, 1], [432, 800, -1]];
        const blankets = [];
        for (const [x0, x1, f] of beds) {
          svgEl("rect", { x: x0, y: MT, width: x1 - x0, height: 34, rx: 8, fill: "#3b3f55", stroke: "#000", "stroke-width": 5 }, roomG);
          svgEl("rect", { x: x0, y: MT + 30, width: x1 - x0, height: 26, fill: "#2a2b33", stroke: "#000", "stroke-width": 5 }, roomG);
          const hx = f > 0 ? x0 : x1;
          svgEl("rect", { x: hx - 12, y: MT - 110, width: 24, height: 180, rx: 8, fill: "#2a2b33", stroke: "#000", "stroke-width": 5 }, roomG);
          svgEl("rect", { x: hx - 14, y: MT + 50, width: 18, height: 20, fill: "#1d1e24" }, roomG);
          svgEl("rect", { x: f > 0 ? x1 - 10 : x0 - 8, y: MT + 50, width: 18, height: 20, fill: "#1d1e24" }, roomG);
          svgEl("ellipse", { cx: f > 0 ? x0 + 50 : x1 - 50, cy: MT - 6, rx: 44, ry: 14, fill: "#d9dbe6", stroke: "#000", "stroke-width": 4 }, roomG);
        }

        // ---------- people ----------
        const LH = 212, RH = 588;
        const ot = makeFig(figG, "#ffffff", "#dedede", true, "ot");
        const ch = makeFig(figG, "#ffffff", "#dedede", true, "ch");
        // blankets drawn over the legs
        for (const [x0, x1, f] of beds) blankets.push(svgEl("path", { fill: "#4b5070", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, figG));
        const lie = (x, f, arms) => base({ hx: x, hy: LY, torso: -88, head: 0, ax: x + f * 150, ay: LY + 4, bx: x + f * 146, by: LY + 6, ...arms });
        const sit = (x, f, arms) => base({ hx: x + f * 18, hy: LY, torso: 8, head: 8, ax: x + f * 128, ay: MT - 2, bx: x + f * 120, by: MT, ...arms });
        const armsDown = (x, f) => ({ ash: -60, ael: 10, aw: 1, atx: x + f * 40, aty: LY + 2, bsh: -60, bel: 10, bw: 1, btx: x + f * 30, bty: LY + 4 });
        const armsPhoneLie = (x, f) => ({ ash: 0, ael: 0, aw: 1, atx: x - f * 112, aty: LY - 70, bsh: 0, bel: 0, bw: 1, btx: x - f * 100, bty: LY - 64 });
        const armsPhoneSit = (x, f) => ({ ash: 0, ael: 0, aw: 1, atx: x + f * 74, aty: LY - 66, bsh: 0, bel: 0, bw: 1, btx: x + f * 64, bty: LY - 60 });
        const armsHead = (x, f) => ({ ash: 0, ael: 0, aw: 1, atx: x + f * 44, aty: LY - 168, bsh: 0, bel: 0, bw: 1, btx: x + f * 10, bty: LY - 166 });
        const armsUp = { ash: 172, ael: -8, aw: 0, bsh: 168, bel: -8, bw: 0 };

        // overthinker: reads, sits up, spirals, holds his head, collapses at dawn, jolts awake
        function otRaw(t) {
          const x = LH, f = 1;
          if (t < 0.8) return lie(x, f, armsPhoneLie(x, f));
          if (t < 7.8) {
            const up = win(t, 0.8, 1.3);
            let s = mixPose(lie(x, f, armsPhoneLie(x, f)), sit(x, f, armsPhoneSit(x, f)), up);
            const hd = win(t, 4.0, 4.4) * (1 - win(t, 6.0, 6.4));
            s = mixPose(s, sit(x, f, armsHead(x, f)), hd);
            const hunch = win(t, 2.4, 6.0);
            s.torso += 14 * hunch; s.head += 14 * hunch;
            return s;
          }
          if (t < 10.2) return mixPose(sit(x, f, armsPhoneSit(x, f)), lie(x, f, armsDown(x, f)), win(t, 7.8, 8.4));
          return mixPose(lie(x, f, armsDown(x, f)), sit(x, f, armsPhoneSit(x, f)), win(t, 10.2, 10.45));
        }
        // chill: reads, replies, puts the phone down, sleeps; wakes rested at 7:00 and stretches
        function chRaw(t) {
          const x = RH, f = -1;
          if (t < 2.0) return lie(x, f, armsPhoneLie(x, f));
          if (t < 8.8) return mixPose(lie(x, f, armsPhoneLie(x, f)), lie(x, f, armsDown(x, f)), win(t, 2.0, 2.5));
          const up = win(t, 8.8, 9.3);
          let s = mixPose(lie(x, f, armsDown(x, f)), sit(x, f, armsDown(x, f)), up);
          const st = win(t, 9.3, 9.6) * (1 - win(t, 9.9, 10.2));
          s = mixPose(s, sit(x, f, armsUp), st);
          s = mixPose(s, sit(x, f, armsPhoneSit(x, f)), win(t, 10.0, 10.3));
          s.torso -= 6 * st;
          return s;
        }
        // phones
        const phones = [0, 1].map(() => {
          const glow = svgEl("circle", { r: 60, fill: "url(#screenGlow)", opacity: 0 }, fxG);
          const g = svgEl("g", {}, fxG);
          svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#111", stroke: "#000", "stroke-width": 2 }, g);
          const scr = svgEl("rect", { x: -6.5, y: -12, width: 13, height: 24, rx: 2, fill: "#2a3a55" }, g);
          return { glow, g, scr };
        });
        const otLit = (t) => (t < 7.9 ? 1 : t > 10.3 ? 1 : 0);
        const chLit = (t) => (t < 2.1 ? 1 : t > 10.0 ? 1 : 0);

        // ---------- HUD ----------
        const clockAt = (t) => {
          let m;
          if (t < 8.4) m = 23 * 60 + 14 + (t / 8.4) * (7 * 60 + 46);
          else m = 7 * 60 + (t - 8.4) * 3.2;
          m = Math.floor(m) % (24 * 60);
          const h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "PM" : "AM", h12 = ((h + 11) % 12) + 1;
          return h12 + ":" + String(mm).padStart(2, "0") + " " + ap;
        };
        const THOUGHTS = ["WHAT DID I DO?", "IS IT THE DISHES?", "DID I FORGET A DATE?", "ARE WE BREAKING UP?", "WHO GETS THE DOG?", "WHERE DO I LIVE NOW?", "CAN I MOVE BACK HOME?"];
        const T_TH = 2.6, DT_TH = 0.68;
        const pop = (t, a, d = 0.25) => (t < a ? 0 : backOut(clamp((t - a) / d, 0, 1)));
        const show = (id, t, a, b) => { const o = win(t, a, a + 0.2) * (1 - win(t, b, b + 0.3)); E(id).style.opacity = o.toFixed(3); return o; };
        // screen position of a world point
        const scrX = (x) => 540 + (x - 400) * 1.25, scrY = (y) => 1330 + (y - 600) * 1.25;
        E("cardA").style.left = "126px"; E("cardA").style.top = "600px";
        E("cardB").style.left = "584px"; E("cardB").style.top = "600px";
        const hex = (a, b, p) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); const c = (s) => Math.round(lerp((A >> s) & 255, (B >> s) & 255, p)); return `rgb(${c(16)},${c(8)},${c(0)})`; };
        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- per-frame render ----------
        function render(t) {
          const dawn = win(t, 6.2, 8.6);
          E("skyT").setAttribute("stop-color", hex("#0b1230", "#6b5c9e", dawn));
          E("skyB").setAttribute("stop-color", hex("#1a2348", "#ffb46e", dawn));
          moon.setAttribute("opacity", (1 - win(t, 6.0, 7.6)).toFixed(3));
          sun.setAttribute("opacity", win(t, 7.4, 8.8).toFixed(3));
          sun.setAttribute("cy", r1(lerp(320, 270, win(t, 7.4, 12))));
          dawnLight.setAttribute("opacity", (0.9 * dawn).toFixed(3));

          const jo = drawFig(ot, livePose(otRaw, t, 0.3), 1);
          const jc = drawFig(ch, livePose(chRaw, t, 1.6), -1);
          // blankets over the legs (from hip to the foot of the bed)
          [[jo, 0, 368, 1], [jc, 432, 800, -1]].forEach(([j, x0, x1, f], i) => {
            const hx = j.hip[0], end = f > 0 ? x1 - 6 : x0 + 6;
            const lump = t > 0 ? 18 : 18;
            blankets[i].setAttribute("d", `M${r1(hx)} ${MT + 2} L${r1(hx)} ${r1(LY - 14)} Q${r1((hx + end) / 2)} ${r1(LY - 14 - lump)} ${r1(end)} ${r1(LY - 6)} L${r1(end)} ${MT + 2} Z`);
          });
          [[phones[0], jo, otLit(t)], [phones[1], jc, chLit(t)]].forEach(([p, j, lit], i) => {
            const hnd = j.hands[0];
            p.g.setAttribute("transform", `translate(${r1(hnd[0])} ${r1(hnd[1] - 6)})`);
            p.scr.setAttribute("fill", lit ? "#9cc4ff" : "#2a3a55");
            p.glow.setAttribute("cx", r1(hnd[0])); p.glow.setAttribute("cy", r1(hnd[1] - 6));
            p.glow.setAttribute("opacity", (lit * (0.85 + 0.15 * Math.sin(t * 7 + i))).toFixed(3));
            const buzz = (t > 0.6 && t < 0.95) || (t > 8.6 && t < 8.95) ? Math.sin(t * 90) * 5 : 0;
            if (buzz) p.g.setAttribute("transform", `translate(${r1(hnd[0])} ${r1(hnd[1] - 6)}) rotate(${r1(buzz)})`);
          });

          // HUD: clock, cards, reply, thoughts, Zz
          E("clk").textContent = clockAt(t);
          const night = t < 8.6;
          E("msgA").textContent = night ? "WE NEED TO TALK TOMORROW." : "ABOUT OUR TRIP :) PARIS OR ROME?";
          E("msgB").textContent = E("msgA").textContent;
          const oA = night ? show("cardA", t, 0.6, 2.3) : show("cardA", t, 8.6, 99);
          const oB = night ? show("cardB", t, 0.6, 2.2) : show("cardB", t, 8.6, 99);
          E("cardA").style.transform = `scale(${(night ? pop(t, 0.6) : pop(t, 8.6)).toFixed(3)})`;
          E("cardB").style.transform = `scale(${(night ? pop(t, 0.6) : pop(t, 8.6)).toFixed(3)})`;
          const r = night ? show("repB", t, 1.6, 2.2) : show("repB", t, 10.4, 99);
          E("repB").textContent = night ? "OK :) NIGHT" : "ROME!";
          E("repB").style.top = night ? "730px" : "750px";
          // overthinker's thought cloud grows line by line
          const nTh = clamp(Math.floor((t - T_TH) / DT_TH) + 1, 0, THOUGHTS.length);
          E("think").innerHTML = THOUGHTS.slice(0, nTh).map((s, i) => `<div class="${i === nTh - 1 ? "new" : ""}">${s}</div>`).join("");
          E("think").style.opacity = (win(t, T_TH - 0.1, T_TH + 0.1) * (1 - win(t, 7.7, 8.1))).toFixed(3);
          if (t > 10.5) { E("think").innerHTML = '<div class="new">...ROME??</div>'; E("think").style.opacity = win(t, 10.5, 10.7).toFixed(3); E("think").style.top = "760px"; E("think").style.width = "250px"; }
          else { E("think").style.top = "560px"; E("think").style.width = "440px"; }
          // Zz: chill all night, the overthinker only after sunrise
          const zB = win(t, 2.5, 2.9) * (1 - win(t, 8.6, 8.9));
          const zA = win(t, 8.4, 8.8) * (1 - win(t, 10.15, 10.3));
          const hc = jc.head, ho = jo.head;
          [["zzB", hc, zB, 0], ["zzB2", hc, zB, 0.5], ["zzA", ho, zA, 0.2]].forEach(([id, h, o, ph]) => {
            const k = frac2(t * 0.6 + ph);
            E(id).style.left = r1(scrX(h[0]) - 10 + 20 * k) + "px";
            E(id).style.top = r1(scrY(h[1]) - 70 - 50 * k) + "px";
            E(id).style.opacity = (o * Math.sin(Math.PI * k)).toFixed(3);
          });

          typed("h1", "SAME TEXT.", t, 0.4, 20);
          typed("h2", "ONE SLEPT. ONE SPIRALED.", t, 11.1, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 10.9, 11.2)).toFixed(3)})`;
          fade.style.opacity = win(t, 13.35, 13.95).toFixed(3);
        }
        const frac2 = (v) => v - Math.floor(v);

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
