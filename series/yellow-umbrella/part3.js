        // ===== PART 3/4 "The Wedding": wedding day, the ring box opens; he runs through the storm, the wind breaks his umbrella, he falls in a puddle and gets up; he bursts into the wedding with the broken umbrella, the rich man laughs, dad throws him out; the ring comes closer to her finger... she sees his umbrella by the door. Cliffhanger: did she say yes? =====
        const DURP = 36;
        const PART = 3;
        bubble("again", "YOU AGAIN?!", "#ff3b30", 32); bubble("lol", "HAHA! LOOK AT HIM!", "#111", 28); bubble("only", "THIS IS ALL I HAVE.", "#111", 28); bubble("out", "GET OUT!", "#ff3b30", 32);
        const FLASH = [8.4, 15.2];
        const X = (t) => -100 + 300 * (t - 6), XF = X(10.4) + 60;
        const RING = (t) => [lerp(800, 774, win(t, 25.4, 30.4)), stand - lerp(70, 44, win(t, 25.4, 30.4))];
        const SC = [
          { a: 0, b: 6, set: "hall", sky: () => ({ warm: 1 }), rain: () => 0, veil: () => 1,
            cam: (t) => [lerp(720, 760, win(t, 0, 6)), 430, lerp(2.2, 1.9, win(t, 0, 3))],
            cast: {
              her: (t) => { const st = pose(700, 1, { head: 22 }); reachTo(st, 1, [722, stand - 80]); reachTo(st, 1, [710, stand - 84], "b"); return st; },
              rich: (t) => { const st = pose(840, -1, { head: -6 }); reachTo(st, 1, [790, stand - 120]); return st; },
              dad: (t) => { const st = pose(520, 1, { head: -10 }); const c = 0.5 + 0.5 * Math.sin(t * 14); reachTo(st, hold(t, 1.0, 4.0), [550 + 8 * c, stand - 130]); reachTo(st, hold(t, 1.0, 4.0), [550 - 8 * c, stand - 128], "b"); return st; },
            },
            draw: (t, P) => {
              ringBox.setAttribute("opacity", 1); const hp = P.rich.hands[0]; ringBox.setAttribute("transform", `translate(${r1(hp[0])} ${r1(hp[1] - 10)}) scale(1.2)`); lid.setAttribute("transform", `rotate(${r1(-80 * win(t, 0.5, 0.8))} -26 -10)`);
              sparks.forEach((e, i) => { const q = frac(t * 1.5 + i / 4); e.setAttribute("opacity", t > 0.7 ? Math.sin(Math.PI * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(hp[0] + Math.cos(i * 1.7) * 40)} ${r1(hp[1] - 40 + Math.sin(i * 2.3) * 25)}) scale(${(0.6 + 0.6 * q).toFixed(2)})`); });
              if (t > 2.6) cry(P.her.head, t, 1);
            } },
          { a: 6, b: 15, set: "road", sky: () => ({ storm: 1 }), rain: () => 1,
            kick: (t) => (t > 10.5 ? 1.2 * Math.exp(-(t - 10.5) / 0.2) : 0),
            cam: (t) => { const x = t < 10.4 ? X(t) : t < 12.6 ? XF : XF + 200 * (t - 12.6); return [x + 80, 430, t > 10.3 && t < 12.6 ? 1.95 : 1.7]; },
            cast: {
              him: (t) => {
                const run = (tt) => { const x = X(tt); const st = walking(-100, x, 1, 1); reachTo(st, 1, [x + 20, stand - 200]); return st; };
                if (t < 10.4) return run(t);
                if (t < 11.6) { const ly = lying(XF, 1); reachTo(ly, 1, [XF + 150, FL - 30]); return mixPose(run(10.4), ly, win(t, 10.4, 10.6)); }
                if (t < 12.6) { const ly = lying(XF, 1); reachTo(ly, 1, [XF + 150, FL - 30]); const kn = kneel(XF, 1); reachTo(kn, 1, [XF + 60, FL - 40]); const st = pose(XF, 1, { head: 14 }); reachTo(st, 1, [XF + 30, stand - 60]); return t < 12.0 ? mixPose(ly, kn, win(t, 11.6, 12.0)) : mixPose(kn, st, win(t, 12.0, 12.5)); }
                const x = XF + 200 * (t - 12.6); const st = walking(XF, x, 1, 1); st.head += 10; reachTo(st, 1, [x + 20, stand - 120]); return st;
              },
            },
            draw: (t, P) => {
              const mode = t < 9.2 ? "open" : "broken";
              const tilt = t < 9.2 ? -10 + 25 * win(t, 8.6, 9.2) : t < 10.4 ? 20 : t < 12.6 ? 80 : 30;
              putUmb(U1, P.him.hands[0], mode, tilt);
              doSplash([XF + 20, FL - 10], 10.5, t);
            } },
          { a: 15, b: 36, set: "hall", sky: () => ({ warm: 1 }), rain: () => 0, veil: () => 1,
            kick: (t) => (t > 15.2 ? 0.8 * Math.exp(-(t - 15.2) / 0.2) : 0),
            cam: (t) => { const z1 = win(t, 25.0, 27.0), z2 = win(t, 30.8, 31.8); return [lerp(lerp(560, 780, z1), 300, z2), lerp(lerp(430, 470, z1), 500, z2), lerp(lerp(1.5, 2.5, z1), 2.4, z2)]; },
            cast: {
              him: (t) => {
                if (t > 24.6) return null;
                if (t < 16.0) { const x = lerp(240, 380, win(t, 15.2, 16.0)); const st = walking(240, x, 1); st.torso += 16; reachTo(st, 1, [x + 20, stand - 100]); return st; }
                if (t < 22.8) { const st = pose(380, 1, { head: 8 }); const up = hold(t, 18.6, 22.4, 0.3); reachTo(st, 1, [lerp(400, 430, up), stand - lerp(100, 170, up)]); st.hy += 3 * Math.sin(t * 9) * (1 - win(t, 16, 17.5)); return st; }
                const x = t < 23.6 ? lerp(380, 260, win(t, 22.8, 23.6)) : lerp(260, 60, (t - 23.6) / 1.0);
                const st = t < 23.6 ? pose(x, 1, { head: 20, torso: -14 }) : walking(260, x, -1); st.head += 16; if (t < 23.4) reachTo(st, 1, [x + 30, stand - 100]); return st;
              },
              her: (t) => { const f = t < 15.6 ? 1 : t < 25.0 ? lerp(1, -1, win(t, 15.6, 15.9)) : t < 30.4 ? lerp(-1, 1, win(t, 25.0, 25.3)) : lerp(1, -1, win(t, 30.4, 30.8)); const st = pose(700, f, { head: 10 }); const mouth = hold(t, 20.0, 24.8, 0.3); reachTo(st, mouth, [700 - 20, stand - 150], "b"); if (t > 25.2) reachTo(st, win(t, 25.2, 25.6), [lerp(780, 774, win(t, 25.4, 30.4)), stand - 38]); st.head -= 20 * hold(t, 30.6, 36, 0.3); return st; },
              rich: (t) => { const st = pose(840, -1, { head: -6 }); const pt = hold(t, 18.2, 20.2, 0.2); reachTo(st, pt, [700, stand - 160], "b"); st.torso -= 14 * pt; if (t > 25.0) { reachTo(st, win(t, 25.0, 25.4), [782, stand - 36], "b"); reachTo(st, win(t, 25.0, 25.4), RING(t)); } else reachTo(st, 1, [800, stand - 120]); return st; },
              dad: (t) => { const x = t < 22.4 ? 540 : t < 23.4 ? lerp(540, 430, win(t, 22.4, 23.2)) : lerp(430, 540, win(t, 24.2, 25.2)); const f = t < 15.4 ? 1 : t < 24.2 ? lerp(1, -1, win(t, 15.4, 15.7)) : lerp(-1, 1, win(t, 24.2, 24.5)); const st = pose(x, f, { head: 4 }); const push = hold(t, 22.6, 23.6, 0.2); reachTo(st, push, [x - 100, stand - 120]); reachTo(st, push, [x - 96, stand - 90], "b"); st.torso += 12 * push; const pt = hold(t, 16.4, 18.2, 0.2); reachTo(st, pt, [x - 150, stand - 160], "b"); return st; },
            },
            draw: (t, P) => {
              if (P.him && t < 23.4) putUmb(U1, P.him.hands[0], "broken", t < 18.6 ? 30 : lerp(30, 0, win(t, 18.6, 19.0)));
              else if (t >= 23.4) { const d = win(t, 23.4, 23.8); putUmb(U1, [lerp(300, 380, d), lerp(stand - 100, FL - 10, d)], "broken", lerp(30, -88, d)); if (t > 31.4) sparks.forEach((e, i) => { const q = frac(t * 1.2 + i / 4); e.setAttribute("opacity", Math.sin(Math.PI * q).toFixed(3)); e.setAttribute("transform", `translate(${r1(170 + (i % 2) * 150 - 20 * Math.cos(i))} ${r1(FL - 70 + Math.sin(i * 2.1) * 40)}) scale(${(0.6 + 0.5 * q).toFixed(2)})`); }); }
              if (P.him) { const b = clamp((t - 15.3) / 0.2, 0, 1) * (1 - win(t, 17.0, 17.4)); bang.setAttribute("opacity", b); bang.setAttribute("x", r1(P.her.head[0])); bang.setAttribute("y", r1(P.her.head[1] - 60)); }
              say("again", hold(t, 16.4, 18.2, 0.12), [P.dad.head[0] - 40, P.dad.head[1] - 120]);
              say("lol", hold(t, 18.3, 20.1, 0.12), [P.rich.head[0] - 130, P.rich.head[1] - 120]);
              if (P.him) say("only", hold(t, 20.3, 22.4, 0.12), [P.him.head[0] + 60, P.him.head[1] - 120]);
              say("out", hold(t, 22.6, 24.0, 0.12), [P.dad.head[0] - 20, P.dad.head[1] - 120]);
              if (t > 24.9) { ringBox.setAttribute("opacity", 1); const hp = P.rich.hands[0]; ringBox.setAttribute("transform", `translate(${r1(hp[0])} ${r1(hp[1] - 6)}) scale(0.7)`); lid.setAttribute("transform", "rotate(-80 -26 -10)"); }
              if (t > 20.4 && t < 24.8) cry(P.her.head, t, -1);
            } },
        ];
        const CAPS = [
          [0.1, 2.7, "PREVIOUSLY: A RICH MAN CAME.", [2]],
          [2.8, 5.9, "WEDDING DAY."],
          [6.1, 8.9, "HE RAN TO STOP IT."],
          [9.1, 11.7, "THE STORM BROKE HIS UMBRELLA.", "y"],
          [11.9, 14.9, "BUT HE GOT UP."],
          [15.3, 17.9, "HE BURST IN."],
          [20.2, 22.7, "ALL HE HAD WAS A BROKEN UMBRELLA."],
          [22.8, 25.0, "HER DAD THREW HIM OUT.", [1]],
          [25.4, 30.4, "THE RING WAS ALMOST ON HER FINGER..."],
          [30.7, 33.5, "THEN SHE SAW HIS UMBRELLA.", "y"],
        ];
        const CARD = { t: 33.6, html: (t) => `<div style="font-size:52px;line-height:1.3">${slam(["DID", "SHE", "SAY", "YES?"], 33.6, t, [3])}</div>${follow(t, 34.2, "4/4")}` };
        const render = (t) => renderAll(t, PART, SC, CAPS, FLASH, CARD);
