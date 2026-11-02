        // ---------- "paragraph": she types a long heartfelt message, line after line. He replies: "k". She throws the phone on the bed and curls up. Knock knock. He's at the door with flowers: "I WANTED TO SAY IT IN PERSON." ----------
        // remake of a 4.6x outlier (Puddleart Studio, "Texting"), see viral/2026-11-02-check.md
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
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const T_TYPE = 0.4, T_SENT = 2.5, T_K = 3.0, T_STARE = 3.3, T_THROW = 4.0, T_CURL = 4.4, T_KNOCK = 5.2, T_UP = 5.9, T_DOOR = 6.9, T_OPEN = 7.1, T_SAY = 7.5, T_HUG = 8.9, T_HOLD = 9.3;
        const T_H1 = 10.0, T_H2 = 10.9, T_CARD = 12.0;
        const BED0 = 260, BED1 = 560, MT = FL - 70, SX0 = 470, DOOR = 940;

        // ---------- bedroom ----------
        svgEl("rect", { x: 330, y: FL - 470, width: 180, height: 150, fill: "#0e1830", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("circle", { cx: 470, cy: FL - 430, r: 16, fill: "#e6e8f0" }, backG);
        const lampGlow = svgEl("circle", { cx: 600, cy: FL - 200, r: 420, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("rect", { x: DOOR - 60, y: FL - 280, width: 120, height: 280, fill: "#ffcf8a", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const doorLeaf = svgEl("rect", { x: DOOR - 56, y: FL - 276, width: 112, height: 276, fill: "#4a3a2c", stroke: "#000", "stroke-width": 4 }, backG);
        svgEl("circle", { cx: DOOR - 36, cy: FL - 140, r: 6, fill: "#d4af37", stroke: "#000", "stroke-width": 2 }, backG);
        svgEl("rect", { x: BED0 - 14, y: FL - 190, width: 24, height: 190, rx: 6, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT + 22, width: BED1 - BED0, height: 30, fill: "#3a2e24", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: BED0, y: MT, width: BED1 - BED0, height: 26, rx: 10, fill: "#6a4a6a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("ellipse", { cx: BED0 + 50, cy: MT - 8, rx: 40, ry: 14, fill: "#d9d9e3", stroke: "#000", "stroke-width": 5 }, roomG);
        const warm = svgEl("ellipse", { cx: DOOR - 80, cy: FL - 160, rx: 300, ry: 230, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- people + props ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, fxG);
        const phoneGlow = svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0 }, fxG);
        // the chat screen (a big phone next to her)
        const chat = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -120, y: -200, width: 240, height: 400, rx: 26, fill: "#111", stroke: "#000", "stroke-width": 6 }, chat);
        svgEl("rect", { x: -106, y: -180, width: 212, height: 360, rx: 14, fill: "#eef2f8" }, chat);
        const chatHead = svgEl("text", { x: 0, y: -154, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#333", "text-anchor": "middle" }, chat); chatHead.textContent = "HIM ❤";
        const myBub = svgEl("rect", { x: -60, y: -130, width: 156, height: 20, rx: 10, fill: "#4a8aff" }, chat);
        const lines = Array.from({ length: 12 }, (_, i) => svgEl("rect", { x: -50, y: -122 + i * 16, width: i % 4 === 3 ? 80 : 136, height: 7, rx: 3, fill: "#fff", opacity: 0 }, chat));
        const sent = svgEl("text", { x: 92, y: 90, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 14, fill: "#4a8aff", "text-anchor": "end", opacity: 0 }, chat); sent.textContent = "SENT ✓✓";
        const kBub = svgEl("g", { opacity: 0 }, chat);
        svgEl("rect", { x: -96, y: 104, width: 44, height: 36, rx: 16, fill: "#d8dde6" }, kBub);
        const kTx = svgEl("text", { x: -74, y: 130, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#111", "text-anchor": "middle" }, kBub); kTx.textContent = "k";
        const flowers = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-22 0 L22 0 L6 60 L-6 60 Z", fill: "#f2e6d0", stroke: "#000", "stroke-width": 4 }, flowers);
        for (const [x, y] of [[-14, -8], [10, -12], [-2, -24], [18, 4], [-20, 8]]) { svgEl("line", { x1: x * 0.4, y1: 30, x2: x, y2: y, stroke: "#3a7a3a", "stroke-width": 4 }, flowers); svgEl("circle", { cx: x, cy: y, r: 11, fill: "#ff7aa8", stroke: "#000", "stroke-width": 3 }, flowers); }
        const knock = svgEl("text", { x: DOOR - 120, y: FL - 320, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#ffd060", "text-anchor": "middle", opacity: 0 }, fxG); knock.textContent = "KNOCK KNOCK";
        const tears = Array.from({ length: 2 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const say = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -170, y: -60, width: 340, height: 100, rx: 34, fill: "#fff", stroke: "#000", "stroke-width": 5 }, say);
        svgEl("path", { d: "M10 38 L-4 70 L34 38 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, say);
        svgEl("rect", { x: 6, y: 30, width: 30, height: 12, fill: "#fff" }, say);
        for (const [y, txt] of [[-14, "I WANTED TO SAY IT"], [20, "IN PERSON."]]) { const t = svgEl("text", { x: 0, y, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, fill: "#111", "text-anchor": "middle" }, say); t.textContent = txt; }

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
        const walking = (x0, x) => { const ft = feetOn(x0, x, 110, 12), sw = Math.sin((Math.PI * 2 * (x - x0)) / 110); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 26 * sw, ael: 20, bsh: -4 - 26 * sw, bel: 20 }); };
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const sitBed = (x) => base({ hx: x, hy: MT - 12, torso: 12, head: 28, ax: x + 64, ay: FL, bx: x + 50, by: FL, aw: 1, atx: x + 44, aty: MT - 100, bw: 1, btx: x + 36, bty: MT - 94 });
        const HUGL = DOOR - 120, HUGR = DOOR - 88;
        function herRaw(s) {
          if (s < T_UP) {
            const st = sitBed(SX0);
            st.atx += 3 * Math.sin(s * 20) * (s > T_TYPE && s < T_SENT ? 1 : 0);
            const stare = hold(s, T_STARE, T_THROW, 0.1); st.head -= 10 * stare;
            const thr = Math.sin(Math.PI * clamp((s - T_THROW) / 0.35, 0, 1)); reachTo(st, thr, [SX0 - 140, MT - 130]); st.torso -= 20 * thr;
            const curl = win(s, T_CURL, T_CURL + 0.4) * (1 - win(s, T_KNOCK + 0.2, T_KNOCK + 0.5));
            st.torso = lerp(st.torso, 40, curl); st.head = lerp(st.head, 34, curl); st.ax = lerp(st.ax, SX0 + 50, curl); st.ay = lerp(st.ay, MT - 20, curl); st.bx = lerp(st.bx, SX0 + 40, curl); st.by = lerp(st.by, MT - 16, curl);
            reachTo(st, curl, [SX0 + 60, MT - 60]); reachTo(st, curl, [SX0 + 54, MT - 56], "b");
            const look = win(s, T_KNOCK + 0.2, T_KNOCK + 0.5); st.head = lerp(st.head, -4, look);
            return st;
          }
          if (s < T_DOOR) return mixPose(sitBed(SX0), walking(SX0, lerp(SX0, DOOR - 160, ease((s - T_UP) / (T_DOOR - T_UP)))), win(s, T_UP, T_UP + 0.3));
          const st = standOn(DOOR - 160, 1, FL);
          const op = Math.sin(Math.PI * clamp((s - T_OPEN + 0.15) / 0.35, 0, 1)); reachTo(st, op, [DOOR - 100, FL - 140]);
          const gasp = hold(s, T_OPEN + 0.3, T_HUG, 0.15); reachTo(st, gasp, [DOOR - 90, stand - 110]); reachTo(st, gasp, [DOOR - 100, stand - 104], "b");
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(DOOR - 160, HUGL, k), 1, FL); hug.torso = 8 * k; reachTo(hug, k, [HUGR + 10, stand - 150]); reachTo(hug, k, [HUGR - 6, stand - 120], "b"); return hug; }
          return st;
        }
        function himRaw(s) {
          const st = standOn(DOOR + 10, -1, FL);
          reachTo(st, 1, [DOOR - 30, stand - 100], "b");
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const hug = standOn(lerp(DOOR + 10, HUGR, k), -1, FL); hug.torso = 4 * k; reachTo(hug, k, [HUGL - 10, stand - 130]); reachTo(hug, k, [HUGL + 4, stand - 100], "b"); return hug; }
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
        card.innerHTML = `<div id="cm1" style="font-size:58px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:40px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE GREATEST GIFT YOU CAN<br/>GIVE SOMEONE IS YOUR TIME."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">RICK WARREN</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [
          [0, 1.8, 610, 430, 0], [2.4, 1.9, 610, 425, 0], [3.3, 2.1, 600, 420, 0], [4.0, 1.9, 520, 440, 0], [5.0, 1.6, 680, 450, 0],
          [6.9, 1.8, 800, 440, 0], [7.5, 2.1, 820, 430, 0], [8.9, 2.3, 810, 430, 0], [99, 2.1, 810, 440, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        function render(t) {
          const s = t;
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          hit(T_K, 0.8, 0.25); hit(T_THROW + 0.2, 0.4, 0.15); hit(T_KNOCK, 0.4, 0.1); hit(T_KNOCK + 0.25, 0.4, 0.1); hit(T_OPEN, 0.4, 0.2);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);

          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          him.g.setAttribute("opacity", s > T_OPEN ? 1 : 0);
          // phone: in her hands, thrown onto the bed
          const thrown = s > T_THROW + 0.15;
          const pq = clamp((s - T_THROW - 0.15) / 0.3, 0, 1);
          const pp = !thrown ? [hp.hands[0][0] + 4, hp.hands[0][1] - 6] : [lerp(hp.hands[0][0], BED0 + 120, pq), lerp(hp.hands[0][1], MT - 4, pq) - 50 * Math.sin(Math.PI * pq)];
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])}) rotate(${r1(thrown ? -80 * pq : 0)})`);
          phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1])); phoneGlow.setAttribute("opacity", (s < T_THROW ? 0.6 : 0.3 * (1 - win(s, T_CURL, T_KNOCK))).toFixed(3));
          // chat screen
          const ck = hold(s, T_TYPE, T_THROW, 0.2);
          chat.setAttribute("opacity", ck.toFixed(3));
          chat.setAttribute("transform", `translate(${r1(hp.head[0] + 200)} ${r1(hp.head[1] + 60)}) scale(${(0.8 + 0.2 * backOut(ck)).toFixed(3)})`);
          const nl = Math.floor(clamp((s - T_TYPE - 0.2) / (T_SENT - T_TYPE - 0.3), 0, 1) * 12);
          lines.forEach((l, i) => l.setAttribute("opacity", i < nl ? 1 : 0));
          myBub.setAttribute("height", r1(20 + nl * 16));
          sent.setAttribute("opacity", s > T_SENT ? 1 : 0);
          kBub.setAttribute("opacity", s > T_K ? 1 : 0);
          kBub.setAttribute("transform", `translate(${r1(-74 * (1 - backOut(clamp((s - T_K) / 0.3, 0, 1))) + 74 * 0)} 0)`);
          tears.forEach((d, i) => { const q = frac(t * 1.4 + i / 2), on = s > T_STARE + 0.4 && s < T_KNOCK; d.setAttribute("transform", `translate(${r1(hp.head[0] + 14 + 6 * i)} ${r1(hp.head[1] + 10 + 30 * q)})`); d.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // knock + door
          const kn = hold(s, T_KNOCK, T_KNOCK + 0.8, 0.05);
          knock.setAttribute("opacity", kn.toFixed(3)); knock.setAttribute("transform", `translate(${r1(3 * Math.sin(t * 50) * kn)} 0)`);
          const dq = s > T_OPEN ? win(s, T_OPEN, T_OPEN + 0.3) : 0;
          doorLeaf.setAttribute("transform", `translate(${DOOR + 56} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1) translate(${-(DOOR + 56)} 0) translate(${r1(2 * Math.sin(t * 60) * kn)} 0)`);
          // flowers + speech
          flowers.setAttribute("opacity", s > T_OPEN ? 1 : 0);
          const fp = s < T_HUG ? mp.hands[1] : [(mp.hands[1][0] + hp.hands[0][0]) / 2, mp.hands[1][1]];
          flowers.setAttribute("transform", `translate(${r1(fp[0] - 6)} ${r1(fp[1] - 20)})`);
          const sk = hold(s, T_SAY, T_HUG + 0.2, 0.12);
          say.setAttribute("opacity", sk.toFixed(3)); say.setAttribute("transform", `translate(${r1(mp.head[0] - 60)} ${r1(mp.head[1] - 130)}) scale(${(0.6 + 0.4 * backOut(sk)).toFixed(3)})`);
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 100)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (0.85 * win(s, T_OPEN, T_OPEN + 0.8)).toFixed(3));

          E("h1").innerHTML = slam(["SHE", "SENT", "A", "PARAGRAPH."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, []);
          E("h2").innerHTML = slam(["HE", "SHOWED", "UP."], [T_H2, T_H2 + 0.15, T_H2 + 0.3], t, [2]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["SOME", "THINGS"], [T_CARD, T_CARD + 0.2], t, []);
          E("cm2").innerHTML = slam(["SHOULDN'T", "BE", "TEXTED."], [T_CARD + 0.7, T_CARD + 0.85, T_CARD + 1.0], t, [2]);
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
