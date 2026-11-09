        // ===== PART 2/4 "The Window": dad drags her away ("STAY AWAY FROM MY DAUGHTER!", "YOU HAVE NOTHING!"); he watches her go in the rain; she's locked in, he comes to her window every night, paper plane "I WILL WAIT", she answers with a heart; dad finds the note and tears it; a week later a rich man brings a ring, dad says yes; cliffhanger: the wedding is tomorrow =====
        const DURP = 36;
        const PART = 2;
        bubble("stay", "STAY AWAY FROM MY DAUGHTER!", "#ff3b30", 26); bubble("nothing", "YOU HAVE NOTHING!", "#ff3b30", 30); bubble("perfect", "PERFECT!", "#111", 30); bubble("no", "NO...", "#111", 30);
        const FLASH = [0.4, 19.8];
        const G = (t) => (t < 6.4 ? [880, stand - 100] : [lerp(930, 1530, (t - 6.4) / 2.8) - 55, stand - 100]);
        const SC = [
          { a: 0, b: 9.4, set: "road", sky: () => ({ storm: 1 }), rain: () => 0.8,
            cam: (t) => [lerp(lerp(840, 860, win(t, 0, 1)), 720, win(t, 6.6, 8.6)), 430, lerp(1.7, 2.0, win(t, 6.6, 8.6))],
            cast: {
              him: (t) => { const st = pose(700, 1, { head: 4 }); const low = win(t, 6.8, 7.8); reachTo(st, 1, [lerp(666, 735, low), stand - lerp(170, 40, low)]); st.head += 26 * low; st.torso += 6 * low; const sh = hold(t, 0.4, 1.4, 0.1); st.hx -= 10 * sh; return st; },
              her: (t) => {
                if (t < 6.4) { const x = lerp(830, 820, win(t, 0.3, 1.0)); const st = pose(x, -1, { head: 6 }); reachTo(st, win(t, 0.6, 1.0), G(t)); reachTo(st, hold(t, 1.2, 6.4, 0.3), [x - 90, stand - 130], "b"); st.hx += 14 * win(t, 0.6, 1.0); return st; }
                const x = lerp(820, 1420, (t - 6.4) / 2.8); const st = walking(820, x, 1); reachTo(st, 1, G(t)); reachTo(st, 1, [x - 130, stand - 150], "b"); st.head = -10; return st;
              },
              dad: (t) => {
                if (t < 6.4) { const x = lerp(1010, 930, win(t, 0.2, 0.9)); const st = t < 0.9 ? walking(1010, x, -1) : pose(x, -1, { head: 6 }); reachTo(st, 1, [x - 30, stand - 140]); reachTo(st, win(t, 0.5, 0.9) * (1 - win(t, 3.0, 3.3)), G(t), "b"); const pt = hold(t, 3.2, 6.3, 0.2); reachTo(st, pt, [x - 150, stand - 150], "b"); st.torso += 12 * pt; return st; }
                const x = lerp(930, 1530, (t - 6.4) / 2.8); const st = walking(930, x, 1); reachTo(st, 1, [x + 30, stand - 140]); reachTo(st, 1, [x - 60, stand - 100], "b"); return st;
              },
            },
            draw: (t, P) => {
              putUmb(U1, P.him.hands[0], "open", lerp(0, 70, win(t, 6.8, 7.8)));
              putUmb(U2, P.dad.hands[0], "open", 0);
              say("stay", hold(t, 1.4, 3.4, 0.12), [P.dad.head[0] - 120, P.dad.head[1] - 130]);
              say("nothing", hold(t, 3.6, 6.2, 0.12), [P.dad.head[0] - 100, P.dad.head[1] - 130]);
              if (t > 7.6) cry(P.him.head, t, 1);
            } },
          { a: 9.4, b: 22, set: "house", inside: ["her", "dad"], sky: () => ({ night: 1, moon: 0.6 }), rain: () => 0.75, room: (t) => 0.85,
            cam: (t) => [lerp(640, 560, win(t, 11.4, 13.0)), lerp(380, 420, win(t, 11.4, 13.0)), lerp(2.1, 1.65, win(t, 11.4, 13.0)) + 0.35 * win(t, 19.6, 20.2) * (1 - win(t, 21.2, 21.9))],
            cast: {
              her: (t) => { const x = 640; const st = pose(x, -1, { head: 16 }); const glass = hold(t, 13.8, 22, 0.3); reachTo(st, 1, [x - 50, FL - lerp(178, 280, glass)]); reachTo(st, 1 - win(t, 15.8, 16.1), [x - 30, FL - 178], "b"); st.head -= 26 * glass; const n = hold(t, 16.0, 20.4, 0.2); reachTo(st, n, [x - 60, FL - 250], "b"); const scared = win(t, 19.8, 20.2); st.hx -= 30 * scared; st.head += 10 * scared; return st; },
              dad: (t) => { if (t < 19.4) return null; const x = lerp(820, 740, win(t, 19.4, 19.9)); const st = pose(x, -1, { head: 10 }); const grab = hold(t, 20.0, 21.0, 0.15); reachTo(st, grab, [600, FL - 250]); const rip = win(t, 20.6, 20.8); reachTo(st, grab, [700, FL - 260], "b"); st.torso += 10 * grab; return st; },
              him: (t) => { if (t < 11.6) return null; const x = lerp(80, 400, win(t, 11.6, 13.6)); const st = t < 13.6 ? walking(80, x, 1) : pose(x, 1, { head: -16 }); reachTo(st, 1, [x - 30, stand - 160]); const th = hold(t, 14.4, 15.2, 0.15); const sw = win(t, 14.8, 15.0); reachTo(st, th, [x + lerp(-40, 90, sw), stand - lerp(60, 190, sw)], "b"); return st; },
            },
            draw: (t, P) => {
              if (P.him) putUmb(U1, P.him.hands[0], "open", 6);
              const ft = 15.0, q = clamp((t - ft) / 0.9, 0, 1);
              if (P.him && q > 0 && q < 1) { const a = P.him.hands[1], b = [600, FL - 270]; plane.setAttribute("opacity", 1); plane.setAttribute("transform", `translate(${r1(lerp(a[0], b[0], q))} ${r1(lerp(a[1], b[1], q) - 140 * Math.sin(Math.PI * q))}) rotate(${r1(-20 + 30 * q)})`); }
              let np = null, ns = 0.5;
              if (t > 15.9 && t < 20.6) np = t < 20.2 ? P.her.hands[1] : P.dad.hands[0];
              if (np) { noteTx.textContent = "I WILL WAIT."; note.setAttribute("opacity", 1); note.setAttribute("transform", `translate(${r1(np[0])} ${r1(np[1] - 20)}) scale(${ns})`); }
              notePieces.forEach((e, i) => { const qq = clamp((t - 20.7) / 1.2, 0, 1); if (qq <= 0 || qq >= 1) return; e.setAttribute("opacity", (1 - qq).toFixed(3)); e.setAttribute("transform", `translate(${r1(650 + (i - 2.5) * 30 * (1 + qq))} ${r1(FL - 260 + 200 * qq * qq)}) rotate(${r1(i * 60 * qq)}) scale(0.6)`); });
              if (t > 18.0 && t < 19.8) { const k = win(t, 18.0, 18.3); bigHeart.setAttribute("opacity", 1); bigHeart.setAttribute("transform", `translate(${r1(P.her.hands[0][0] - 10)} ${r1(P.her.hands[0][1] - 30)}) scale(${(0.9 * backOut(k)).toFixed(3)})`); floatHearts([P.her.head[0] - 60, P.her.head[1] - 40], 18.3, t); }
              if (P.dad) { const b = clamp((t - 19.85) / 0.2, 0, 1); bang.setAttribute("opacity", b * (1 - win(t, 21.4, 21.8))); bang.setAttribute("x", r1(P.her.head[0] - 30)); bang.setAttribute("y", r1(P.her.head[1] - 60)); }
              if (P.him && t > 20.8) brokenH.setAttribute("opacity", 0);
              if (t < 13.8) cry(P.her.head, t, -1);
            } },
          { a: 22, b: 36, set: "house", inside: ["her"], sky: (t) => ({ gray: 1 }), rain: (t) => 0.6 * win(t, 30.2, 30.8), room: () => 0.6,
            cam: (t) => { const k = win(t, 30.0, 31.0); return [lerp(840, 520, k), 420, lerp(1.55, 1.9, k)]; },
            cast: {
              her: (t) => { const x = 640; const st = pose(x, 1, { head: 20 }); reachTo(st, 1, [x + 40, FL - 178]); reachTo(st, hold(t, 27.6, 30.2, 0.2), [x + 30, FL - 300], "b"); return st; },
              dad: (t) => { const st = pose(920, 1, { head: -4 }); const sh = hold(t, 26.2, 27.6, 0.2); reachTo(st, sh, [1000 + 6 * Math.sin(t * 22) * sh, stand - 100]); const arms = hold(t, 25.4, 26.2, 0.15); reachTo(st, arms, [940, stand - 220]); reachTo(st, arms, [890, stand - 220], "b"); return st; },
              rich: (t) => { const x = lerp(1440, 1130, win(t, 22.6, 24.6)); const st = t < 24.6 ? walking(1420, x, -1) : pose(x, -1, { head: -4 }); const show = hold(t, 24.6, 26.0, 0.2); reachTo(st, show, [x - 90, stand - 140]); const sh = hold(t, 26.2, 27.6, 0.2); reachTo(st, sh, [1000 + 6 * Math.sin(t * 22) * sh, stand - 100]); return st; },
              him: (t) => { if (t < 30.0) return null; const st = pose(380, 1, { head: 6 }); const drop = win(t, 31.0, 31.3); reachTo(st, 1 - drop, [410, stand - 100]); st.head += 24 * win(t, 31.2, 31.8); st.torso += 8 * win(t, 31.2, 31.8); return st; },
            },
            draw: (t, P) => {
              if (P.rich && t < 26.1) { ringBox.setAttribute("opacity", 1); const hp = t > 24.6 ? P.rich.hands[0] : P.rich.hands[0]; ringBox.setAttribute("transform", `translate(${r1(hp[0])} ${r1(hp[1] - 10)}) scale(1.3)`); lid.setAttribute("transform", `rotate(${r1(-80 * win(t, 24.8, 25.1))} -26 -10)`); sparks.forEach((e, i) => { const q = frac(t * 1.5 + i / 4); e.setAttribute("opacity", t > 25.0 ? Math.sin(Math.PI * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(hp[0] + Math.cos(i * 1.7) * 40)} ${r1(hp[1] - 40 + Math.sin(i * 2.3) * 25)}) scale(${(0.6 + 0.6 * q).toFixed(2)})`); }); }
              if (t > 25.2 && t < 27.8) { money.setAttribute("opacity", hold(t, 25.2, 27.8, 0.2)); money.setAttribute("x", r1(P.dad.head[0])); money.setAttribute("y", r1(P.dad.head[1] - 70 - 20 * win(t, 25.2, 26.0))); }
              say("perfect", hold(t, 25.9, 27.6, 0.12), [P.dad.head[0] - 30, P.dad.head[1] - 140]);
              say("no", hold(t, 27.8, 29.8, 0.12), [P.her.head[0] - 60, P.her.head[1] - 120]);
              if (t > 27.6 && t < 30.2) cry(P.her.head, t, 1);
              if (P.him) { const d = win(t, 31.0, 31.5); const hp = t < 31.0 ? P.him.hands[0] : [lerp(P.him.hands[0][0], 440, d), lerp(P.him.hands[0][1], FL - 8, d)]; putUmb(U1, hp, "closed", lerp(-15, 95, d)); const k = win(t, 31.6, 31.9); brokenH.setAttribute("opacity", k); brokenH.setAttribute("transform", `translate(${r1(P.him.head[0])} ${r1(P.him.head[1] - 100)}) scale(1.4)`); cry(P.him.head, t, 1); }
            } },
        ];
        const CAPS = [
          [0.1, 2.6, "PREVIOUSLY: HER DAD SAW THEM.", [2]],
          [3.6, 6.4, "BECAUSE HE WAS POOR.", [3]],
          [6.8, 9.3, "HE WATCHED HER GO."],
          [9.5, 12.0, "HER DAD LOCKED HER IN.", [1]],
          [12.2, 14.8, "BUT EVERY NIGHT HE CAME BACK."],
          [15.6, 18.0, "\"I WILL WAIT.\"", "y"],
          [19.9, 21.9, "THEN HER DAD FOUND THE NOTE.", [2]],
          [22.1, 24.4, "ONE WEEK LATER..."],
          [24.6, 27.4, "A RICH MAN CAME WITH A RING."],
          [27.6, 30.0, "HER DAD SAID YES.", [1]],
          [30.2, 33.4, "THE WEDDING IS TOMORROW.", [3]],
        ];
        const CARD = { t: 33.6, html: (t) => `<div style="font-size:52px;line-height:1.3">${slam(["WILL", "SHE", "MARRY", "HIM?"], 33.6, t, [2])}</div>${follow(t, 34.2, "3/4")}` };
        const render = (t) => renderAll(t, PART, SC, CAPS, FLASH, CARD);
