# Silent Stickman – Stil (v2)

Gilt für jedes neue Video. Start: Kopie von `videos/01-the-umbrella` oder `videos/02-attempt-47`.

## Format
- 1080x1920, 30 fps, 13 s, harter Schnitt am Ende.
- Hook in Sekunde 0: Szene, Zähler und Bewegung sind sofort da. Text-Zeile 1 kommt bei 0,15–0,25 s.
- Text-Zeile 2 kommt bei etwa 6,5–9 s als Pointe. Danach wird Zeile 1 dunkler.
- Text nur zwischen x 120–960 und y 220–1500 (Instagram-Vollbild).

## Look
- Dunkle Nacht: Blau-Schwarz als Verlauf, Vignette, Filmkorn, Staub im Licht.
- Held: weiß mit blauem Glühen. Andere: grau. Fremde Person: dunkle Silhouette mit warmem Randlicht.
- Pro Video EINE Akzentfarbe für die Botschaft (Rot = Schmerz, Gold = Erfolg). Höchstens zwei.
- Echte Umgebung statt leerer Bühne: Regen, Laterne, Spiegelung, Klippe, Licht von oben.

## Text
- Inter Tight 800, Großbuchstaben, 62–70 px, zwei kurze Zeilen pro Satz.
- Wort für Wort: steigt hoch und wird scharf. Das Schlüsselwort leuchtet in der Akzentfarbe.
- Zähler oben: JetBrains Mono (Label klein und gesperrt, Zahl groß), springt kurz auf, wenn er sich ändert.
- Stempel neben dem Zähler: FAIL (rot), MADE IT (gold).

## Bewegung
- Alles hängt an der Zeit t, ein Rig für alle Figuren (`shared/engine.js`).
- Weiche Kurven (Sinus oder Kubisch), Atmen, der Kopf folgt etwas später.
- Großer Moment: Zeitlupe, Kamera-Push-in, Schockwelle, Funken, Kamera-Wackeln, Lichtblitz.
- Die Botschaft muss ohne Ton und ohne Text verständlich sein.

## Ton
- Nur aus Code (`tools/synth.mjs`), keine Stimme.
- Ein Effekt pro Aktion. Vor der Pointe kurz Stille oder ein Herzschlag. Bei der Pointe ein Schlag und ein Akkord.

## Ablauf
1. `sh tools/sync.sh videos/<name>` kopiert Engine und Schriften.
2. `node videos/<name>/sound.mjs` erzeugt `assets/audio.wav`.
3. `npx hyperframes@0.8.206 snapshot videos/<name> --at ...` zum Prüfen.
4. `npx hyperframes@0.8.206 render -f 30 -q delivery -o ../../ready/<name>.mp4` im Video-Ordner.
