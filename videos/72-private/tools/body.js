        // ---------- "private": she snatches his phone, "SHOW ME.", scrolls through everything with a magnifying glass while he whistles. "OK. CLEAN." He asks: "CAN I SEE YOURS?" - she hugs her phone, a padlock pops up: "THAT'S PRIVATE!" He stares... then she turns the phone around: it's full of pictures of him and hearts. "IT'S ALL PICS OF YOU." He melts, hug ----------
        // remake of a 6.5x outlier (FIASCO 4, "Desmond's Girlfriend Demanded His Bank Balance, Then Refused to Show Hers"), see viral/2026-11-06-check.md
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
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const T_GRAB = 0.6, T_SCAN = 1.0, T_CLEAN = 3.1, T_RET = 3.3, T_ASK = 3.9, T_PULL = 4.5, T_PRIV = 4.7, T_STARE = 6.0, T_SHOW = 7.0, T_PICS = 7.3, T_HUG = 8.5, T_HOLD = 8.9;
        const T_H1 = 9.6, T_H2 = 10.5, T_CARD = 11.6;
        const SHE = 470, HE = 650;

        svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("polygon", { points: `460,${FL - 520} 660,${FL - 520} 780,${FL} 340,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        svgEl("rect", { x: 160, y: FL - 400, width: 140, height: 220, fill: "#1e2430", stroke: "#2c2c2c", "stroke-width": 6 }, backG);
        svgEl("rect", { x: 790, y: FL - 170, width: 230, height: 90, rx: 20, fill: "#4a5a7a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: 790, y: FL - 100, width: 230, height: 70, rx: 12, fill: "#5a6a8a", stroke: "#000", "stroke-width": 5 }, roomG);
        const warm = svgEl("ellipse", { cx: 560, cy: FL - 160, rx: 300, ry: 220, fill: "url(#fireGlow)", opacity: 0 }, backG);

        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const mkPhone = (col) => { const g = svgEl("g", {}, fxG); svgEl("rect", { x: -11, y: -18, width: 22, height: 36, rx: 4, fill: col, stroke: "#000", "stroke-width": 4 }, g); svgEl("rect", { x: -7, y: -13, width: 14, height: 24, rx: 2, fill: "#bfe0ff" }, g); return g; };
        const hisPhone = mkPhone("#333"), herPhone = mkPhone("#ff8ab0");
        const glass = svgEl("g", { opacity: 0 }, fxG);
        svgEl("line", { x1: 10, y1: 10, x2: 28, y2: 28, stroke: "#000", "stroke-width": 9, "stroke-linecap": "round" }, glass);
        svgEl("line", { x1: 10, y1: 10, x2: 28, y2: 28, stroke: "#8a5a3a", "stroke-width": 5, "stroke-linecap": "round" }, glass);
        svgEl("circle", { r: 16, fill: "#bfe0ff", "fill-opacity": 0.5, stroke: "#000", "stroke-width": 5 }, glass);
        const lock = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-12 -8 L-12 -20 Q0 -36 12 -20 L12 -8", fill: "none", stroke: "#000", "stroke-width": 6 }, lock);
        svgEl("rect", { x: -18, y: -10, width: 36, height: 30, rx: 5, fill: "#ffcc33", stroke: "#000", "stroke-width": 4 }, lock);
        // the big phone screen she reveals: hearts + little pictures of him
        const big = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -64, y: -110, width: 128, height: 220, rx: 16, fill: "#ff8ab0", stroke: "#000", "stroke-width": 6 }, big);
        svgEl("rect", { x: -52, y: -96, width: 104, height: 192, rx: 8, fill: "#fff3f7", stroke: "#000", "stroke-width": 3 }, big);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
          const cx = -26 + c * 52, cy = -62 + r * 62;
          svgEl("rect", { x: cx - 22, y: cy - 26, width: 44, height: 52, rx: 4, fill: "#d8e6ff", stroke: "#000", "stroke-width": 2 }, big);
          svgEl("circle", { cx, cy: cy - 8, r: 9, fill: "#fff", stroke: "#000", "stroke-width": 3 }, big);
          svgEl("line", { x1: cx, y1: cy + 1, x2: cx, y2: cy + 20, stroke: "#000", "stroke-width": 4 }, big);
          svgEl("path", { d: `M${cx + 12} ${cy - 18} c-4 -4 -9 -1 -6 3 l6 6 l6 -6 c3 -4 -2 -7 -6 -3 Z`, fill: "#ff3b30", stroke: "#000", "stroke-width": 1.5 }, big);
        }
        const notes = Array.from({ length: 2 }, () => { const tx = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#fff", opacity: 0 }, fxG); tx.textContent = "♪"; return tx; });
        const qs = Array.from({ length: 2 }, () => { const tx = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#ff3b30", "text-anchor": "middle", opacity: 0 }, fxG); tx.textContent = "!"; return tx; });
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 4 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bShow = bubble("SHOW ME.", 190, 30, "#ff3b30"), bClean = bubble("OK. CLEAN.", 210), bAsk = bubble("CAN I SEE YOURS?", 320);
        const bPriv = bubble("THAT'S PRIVATE!", 300, 30, "#ff3b30"), bDots = bubble("...", 100), bPics = bubble("IT'S ALL PICS OF YOU.", 390);

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const herDir = (s) => (s > T_PRIV - 0.1 && s < T_SHOW ? -1 : 1);
        function herRaw(s) {
          const f = herDir(s), st = standOn(SHE, f, FL); st.head = 2;
          const grab = hold(s, T_GRAB - 0.1, T_SCAN, 0.15); reachTo(st, grab, [HE - 40, stand - 110]); st.torso += 10 * grab;
          const scan = hold(s, T_SCAN, T_CLEAN, 0.2); reachTo(st, scan, [SHE + 40, stand - 140]); reachTo(st, scan, [SHE + 62 + 10 * Math.sin(s * 5), stand - 150 + 6 * Math.sin(s * 7)], "b"); st.head += 14 * scan; st.torso += 6 * scan;
          const ret = hold(s, T_RET - 0.1, T_ASK, 0.15); reachTo(st, ret, [HE - 50, stand - 100]);
          const pull = hold(s, T_PULL - 0.2, T_PRIV, 0.1); reachTo(st, pull, [SHE + 10, stand - 40]);
          const hug = hold(s, T_PRIV - 0.05, T_SHOW, 0.15); reachTo(st, hug, [SHE - f * 4, stand - 112]); reachTo(st, hug, [SHE + 6, stand - 106], "b"); st.torso += 10 * hug; st.head += 8 * hug;
          const show = hold(s, T_SHOW, T_HUG, 0.2); reachTo(st, show, [SHE + 100, stand - 130]); st.torso -= 4 * show;
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const h2 = standOn(lerp(SHE, 530, k), 1, FL); h2.torso = 8 * k; reachTo(h2, k, [585, stand - 150]); reachTo(h2, k, [570, stand - 120], "b"); return h2; }
          return st;
        }
        function himRaw(s) {
          const st = standOn(HE, -1, FL); st.head = 4;
          const look = 1 - win(s, T_GRAB - 0.1, T_GRAB + 0.1); reachTo(st, look, [HE - 30, stand - 112]); st.head += 16 * look;
          const whistle = hold(s, T_GRAB + 0.3, T_CLEAN, 0.2); reachTo(st, whistle, [HE + 26, stand - 40]); reachTo(st, whistle, [HE + 18, stand - 36], "b"); st.head -= 10 * whistle; st.hy -= 4 * Math.abs(Math.sin(s * 6)) * whistle;
          const back = win(s, T_RET, T_RET + 0.2) * (1 - win(s, T_HUG - 0.2, T_HUG)); reachTo(st, back, [HE - 20, stand - 50]);
          const ask = hold(s, T_ASK, T_PRIV + 0.3, 0.2); reachTo(st, ask, [HE - 90, stand - 100], "b"); st.torso += 6 * ask;
          const stare = hold(s, T_STARE, T_SHOW + 0.1, 0.2); reachTo(st, stare, [HE + 28, stand - 52], "b"); st.torso -= 4 * stare;
          const melt = hold(s, T_PICS + 0.3, T_HUG, 0.2); reachTo(st, melt, [HE - 24, stand - 120], "b"); st.head += 10 * melt; st.hy += 6 * melt;
          if (s > T_HUG) { const k = win(s, T_HUG, T_HUG + 0.4); const h2 = standOn(lerp(HE, 562, k), -1, FL); h2.torso = 4 * k; reachTo(h2, k, [520, stand - 130]); reachTo(h2, k, [534, stand - 100], "b"); return h2; }
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
        card.innerHTML = `<div id="cm1" style="font-size:56px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:46px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE BEST WAY TO FIND OUT<br/>IF YOU CAN TRUST SOMEBODY<br/>IS TO TRUST THEM."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ERNEST HEMINGWAY</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function render(t) {
          const s = t;
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          hit(T_GRAB, 0.4, 0.12); hit(T_PRIV, 0.6, 0.15);
          const cs = 1.9 * (s > T_HUG ? 1 + 0.1 * ease(clamp((s - T_HUG) / 1.2, 0, 1)) : 1);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) scale(${sc.toFixed(4)}) translate(-560 -440)`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herDir(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // his phone: his hand, her hand while she checks it, back to him
          const hph = s > T_GRAB + 0.1 && s < T_RET + 0.1 ? hp.hands[0] : mp.hands[0];
          hisPhone.setAttribute("transform", `translate(${r1(hph[0])} ${r1(hph[1] - 6)})`);
          hisPhone.setAttribute("opacity", s < T_HUG ? 1 : 0);
          glass.setAttribute("opacity", hold(s, T_SCAN, T_CLEAN, 0.15).toFixed(3)); glass.setAttribute("transform", `translate(${r1(hp.hands[1][0])} ${r1(hp.hands[1][1] - 10)})`);
          // her phone: pulled out, hugged, then turned around big
          herPhone.setAttribute("opacity", s > T_PULL - 0.1 && s < T_HUG ? 1 : 0);
          herPhone.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1] - 4)})`);
          const lk = hold(s, T_PRIV, T_STARE + 0.6, 0.12);
          lock.setAttribute("opacity", lk.toFixed(3)); lock.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1] - 60)}) scale(${(0.6 + 0.4 * backOut(lk)).toFixed(3)})`);
          const bg = hold(s, T_SHOW + 0.15, T_HUG, 0.2);
          big.setAttribute("opacity", bg.toFixed(3)); big.setAttribute("transform", `translate(${r1(hp.hands[0][0] + 10)} ${r1(hp.hands[0][1] - 120)}) scale(${(0.4 + 0.6 * backOut(bg)).toFixed(3)})`);
          notes.forEach((n, i) => { const q = frac(s * 0.8 + i / 2), on = s > T_GRAB + 0.4 && s < T_CLEAN; n.setAttribute("x", r1(mp.head[0] + 30 + 30 * q)); n.setAttribute("y", r1(mp.head[1] - 30 - 70 * q)); n.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          qs.forEach((q2, i) => { const on = hold(s, T_PRIV + 0.2, T_STARE, 0.1); q2.setAttribute("x", r1(mp.head[0] - 16 + i * 32)); q2.setAttribute("y", r1(mp.head[1] - 56)); q2.setAttribute("opacity", on.toFixed(3)); });
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bShow, T_GRAB, T_SCAN + 0.6, [hp.head[0] - 40, hp.head[1] - 110]);
          bub(bClean, T_CLEAN, T_ASK, [hp.head[0] - 40, hp.head[1] - 110]);
          bub(bAsk, T_ASK, T_PRIV, [mp.head[0] + 10, mp.head[1] - 110]);
          bub(bPriv, T_PRIV, T_STARE, [hp.head[0] - 50, hp.head[1] - 110]);
          bub(bDots, T_STARE, T_SHOW, [mp.head[0] + 20, mp.head[1] - 110]);
          bub(bPics, T_PICS, T_HUG, [hp.head[0] - 10, hp.head[1] - 300]);
          smallH.forEach((h, k) => { const q = clamp((s - T_PICS - 0.4 - k * 0.15) / 0.8, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(mp.head[0] - 20 + k * 16)} ${r1(mp.head[1] - 40 - 60 * q)}) scale(0.45)`); });
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1((mp.head[0] + hp.head[0]) / 2)} ${r1(Math.min(mp.head[1], hp.head[1]) - 110)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (0.8 * win(s, T_SHOW, T_SHOW + 0.8)).toFixed(3));

          E("h1").innerHTML = slam(["SHE", "CHECKED", "HIS", "PHONE."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, []);
          E("h2").innerHTML = slam(["HERS", "WAS", "FULL", "OF", "HIM."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.39, T_H2 + 0.52], t, [4]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["NOTHING", "TO", "HIDE."], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["EVERYTHING", "TO", "SHARE."], [T_CARD + 0.8, T_CARD + 0.95, T_CARD + 1.1], t, [2]);
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
