# Supplied portfolio media

## About pointing animation

`about/shani-pointing.webm` is a silent 512 × 846 VP9-alpha web conversion of
`Desktop/Shani - Transparent Background/Shani - Transparent.mov`, the transparent
export approved by Shani on September 28. It preserves all 145 frames at 24 fps
(6.04 seconds), without cropping. `about/shani-pointing-poster.png` is the matching
transparent frame at two seconds. Only About uses these files; the original Home
waving animation and both source videos remain unchanged.

## TENKI case-study artwork

`tenki/` contains direct exports from Portfolio Figma file
`NNjB6Gey6DtLbO1ZzQV51g`, revised case-study frame `1247:12166` and final source page
`545:468` (`TENKI - App`). Source artwork and prototype interactions were not edited.
Earlier `ikko-*` filenames below remain for historical homepage media compatibility;
the application's public name is TENKI.

- `hero.jpg`: frame `1303:12457`, complete composition, 2208×808.
- `seasonal-app-mockup.jpg`: the full 1920×1080 artwork from slide `429:888`.
  Export excludes only presentation text `535:12960` and navigation `663:541`;
  the photo, phone screen and all graphic details retain their original placement.
- `brand-applications.jpg`: the full 1920×1080 collage from slide `557:1306`.
  Export excludes only presentation arrows `630:2009` and navigation `663:545`.
  These exports were made from temporary artwork-only frames, downloaded through
  Figma MCP, then encoded as quality-90 JPEGs with dimensions unchanged. The
  temporary frames were removed and both source slides remain unchanged.
- `screen-1.png` through `screen-5.png`: complete 412:917 phone viewports from
  product-flow group `1303:12605`, exported at 2×. Source app screens are
  `1333:30894`, `1345:44023`, `1333:32633`, `1333:38247`, and `1333:33062`.
- `nihon-buyo.png` / `botanical-garden.png`: reference nodes `1303:21030` /
  `1303:21032`, with artist attribution retained on the page.
- `sun.svg`, `sakura.svg`, `location-icon.svg`, `picnic-icon.png`: original nodes
  `1333:30955`, `1303:12572`, `1303:12591`, and `1303:20800`.
- `numeral-25.svg`, `numeral-29.svg`, `numeral-24.svg`, `navigation-icons.svg`, and
  `forecast-row.svg`: original nodes `1360:57037`, `1360:57051`, `1360:57066`,
  `1360:57082`, and `1360:57124`. SVG text is outlined to preserve the source design.
- `map-art.png`: complete 1771×1183 artwork, node `1345:42170`; the browser clips
  and pans it within a phone viewport. `map-header.png` and `map-back.svg` are
  nodes `1333:39791` and `1333:39802`.
- `app-demo.mp4`: H.264, 560×1186, 24 fps, silent conversion of the supplied
  animated Figma image (`d07ef5506c9368f15a00074c8a33153c5007814d`), preserving its
  complete phone and sequence. `app-demo-poster.png` is its first frame.
- `next-project.jpg`: complete Le Frogette presentation from `1303:20789`,
  1493×840, with no artwork cropped.

JPEG conversions reduce transfer size; all illustrations, screens, custom numerals
and icons are the user's supplied artwork. No imagery was generated or substituted.

All footage and stills are derived from Shani's supplied videos. Source files were
not modified or moved. No artwork was generated. The original My Bunny and We Live
Happily Here files are in the Desktop folder `סרטונים של פרוקטים`; the Ikko and
Le Frogette recordings are directly on the Desktop.

## Complete project videos

These preserve the source duration and audio, with native playback controls and
no autoplay on the case-study pages. H.264/AAC MP4 copies use fast-start metadata,
30 fps and yuv420p. Only unused recording space around Ikko's phone is cropped.

| Output in `videos/` | Source file | Duration | Frame |
| --- | --- | --- | --- |
| `my-bunny-full.mp4` | `full video.mp4` picture + `דברים לאתר לתיק עבודות /my bunny.mp4` original soundtrack | 1:07.57 | 720×1280; entire portrait frame |
| `we-live-happily-here-full.mp4` | `כאן גרים בכיף סרטון עדכני .mp4` | 0:19.97 | 1600×900; entire presentation |
| `ikko-full.mp4` | `Screen Recording 2024-12-25 at 16.00.58.mov` | 0:37.94 | 452×960; crop x=532, y=54, preserving the phone |
| `le-frogette-full.mp4` | `מה שהוגש, יוניטי משחק מחשב 3D&2D.mov` | 3:31.98 | 1600×808; entire game frame |

## Approved three-project Home Hero

The current Hero uses Shani's final edits from
`Desktop/דברים לאתר לתיק עבודות /עמוד בית/הירו/`, in the pagination order of
Figma frames `1048:4788`, `1048:4810`, and `1045:4675`.

| Output in `videos/` | Supplied source | Duration | Frame |
| --- | --- | --- | --- |
| `we-live-happily-here-hero-2aa5f73eca.mp4` | `כאן גרים בכיף.mp4` | 19.97 s | 1920×1080 |
| `le-frogette-hero-807756928c.mp4` | `  - 10 שניות הצפרגע.mp4` | 10.02 s | 1918×968 |
| `numi-hero-338a6d70b4.mp4` | `10 שניות - נומי.mp4` | 10.03 s | 2560×1440 |

These are byte-for-byte copies of the supplied originals (about 49.9 MB combined),
with no re-encoding, trimming, color changes or frame-rate changes. The filename
suffix is the first ten characters of the source file's SHA-256. Matching
`images/*-hero-<hash>.jpg` posters use each original's first frame. The source
videos remain untouched. A video loads on its first playback; only the active one
plays, always muted. Earlier compressed `*-hero.mp4` files are no longer used.
The carousel advances on the actual video end, and user pause also stops rotation.

`fonts/Satoshi-Variable.ttf` is copied from Shani's installed font. The SVGs
in `icons/hero/` are exported directly from the supplied Figma controls.
`play-control.svg` is the complete circle and play glyph from `1051:4889`.
The same central button toggles play/pause; the bottom row contains only the
three project dots. Desktop layout scales the full 1536×820 composition together,
independent of browser-window height.

## Project excerpts and card previews

Excerpts are H.264, 24 fps and silent. Matching JPG posters use their first frames.
Multi-part excerpts join the listed segments in order. The homepage loads only the
active Hero video; card videos load on deliberate hover or keyboard focus.

| Output in `videos/` | Source | Selected segments (seconds) | Frame |
| --- | --- | --- | --- |
| `numi-reel.mp4` | `טריילר נסיון 1 .mp4` | 34–44 | 1280×720 |
| `we-live-happily-here-wide-reel.mp4` | We Live Happily Here full source above | 3–7, 10.4–14.4, 14.4–17.4 | 1280×720; wide source composition |
| `ikko-device-reel.mp4` | Ikko full source above | 4.4–8.4, 19.5–23.5, 25–29 | 340×720; same phone crop as the full copy |
| `le-frogette-reel.mp4` | Le Frogette full source above | 110–115, 145–150 | 1280×646; 2D then 3D |
| `my-bunny-highlights.mp4` | My Bunny full source above | 14.2–18.2, 35.5–39.5, 50–54 | 406×720; feeding, cleaning, playtime |
| `we-live-happily-here-device.mp4` | We Live Happily Here full source above | 12–17 | 342×720; selected-work card only |

The portrait We Live Happily Here card crop is 480×1008 at x=720, y=48. Homepage
card excerpts omit the source's phone lock-screen interval. The complete case-study
video remains the full presentation. Earlier `my-bunny-device`, `my-bunny-reel`
and `we-live-happily-here-reel` derivatives remain unused; they are not loaded by
the current site. The original NUMI excerpt also appears in its case-study hero.

## Extracted stills

All paths below are in `images/`. These are gameplay/UI frames or labeled details
of those frames, not separate original asset files.

| Output | Source timestamp | Treatment |
| --- | --- | --- |
| `my-bunny-character.jpg` | My Bunny 14.2s | 900×960 detail at x=90, y=960; 480px wide |
| `my-bunny-feedback.jpg` | My Bunny 30.5s | 1080×396 feedback header at x=0, y=840; 720px wide |
| `my-bunny-feeding.jpg` | My Bunny 14.2s | Entire frame, 406×720 |
| `my-bunny-cleaning.jpg` | My Bunny 38s | Entire frame, 406×720 |
| `my-bunny-playtime.jpg` | My Bunny 52s | Entire frame, 406×720 |
| `ikko-weather.jpg` | Ikko 7.9s | Same phone crop as its full video, 720px high |
| `ikko-map.jpg` | Ikko 25s | Same phone crop as its full video, 720px high |
| `ikko-full-poster.jpg` | Ikko 4.4s | Same phone crop, original crop resolution |
| `we-live-happily-here-full-poster.jpg` | We Live Happily Here 12.5s | Entire frame, 1280×720 |
| `le-frogette-full-poster.jpg` | Le Frogette 145s | Entire frame, 1280×646 |

## Homepage visual-direction media

`happily-selection.jpg` and `happily-results.jpg` are phone crops from the supplied
We Live Happily Here recording at 3.5s and 15.8s (490×1000 at x=716,y=46, resized
to 392×800). `happily-selection-detail.jpg` crops the actual selection UI at 3.5s
(424×450 at x=748,y=500). `happily-results-detail.jpg` crops the actual results
panel at 15.8s (424×600 at x=748,y=230). `numi-character-context.jpg` is a crop of
the supplied NUMI trailer at 34s (900×700 at x=750,y=180).

Home-only configuration uses these stills alongside the existing supplied media.
The older typographic HeadEase panel has been replaced with the original wearable
mockup and app artwork documented below. Generated design concepts are references outside the site; none of
the generated game imagery is shipped as Shani’s work.

`fonts/Manrope-Variable.ttf` is the unmodified variable font from
https://github.com/google/fonts/tree/main/ofl/manrope, with its license in
`fonts/Manrope-OFL.txt`. It is loaded locally only on the Homepage.

## Homepage identity refinement

`fonts/Syne-Variable.ttf` is the unmodified display font from
https://github.com/google/fonts/tree/main/ofl/syne; its OFL license is included
as `fonts/Syne-OFL.txt`. Manrope remains the body/UI font. Both are self-hosted.

`ikko-interaction-icons.jpg` is an actual strip from Shani’s Ikko recording at
7.9s. First crop the recorded phone to 452×960 at x=532,y=54, then take the
416×82 icon area at x=18,y=824 and resize to 832×164. The icons are not
redrawn or generated. The homepage also reuses existing actual 2D gameplay
for the Le Frogette edge detail, the NUMI excerpt for the motion tile and the
existing My Bunny character crop beside the About heading.

`fonts/InstrumentSerif-Regular.ttf` is the unmodified regular face from
https://github.com/google/fonts/tree/main/ofl/instrumentserif. Its OFL license is
in `fonts/InstrumentSerif-OFL.txt`. It is used only for major Homepage headings;
Syne remains on project titles and Manrope on navigation, captions and body copy.

## Current NUMI case study — September 19, 2026

The current NUMI page uses `numi/` and supersedes the older NUMI excerpt reference
above. Its design comes from Portfolio Figma file `NNjB6Gey6DtLbO1ZzQV51g`, frame
`1160:9463`. Satoshi and Anta are the existing self-hosted homepage fonts.

`numi/story-trigger-father-touch.png` is the complete 1920×1080 frame at 33 seconds
from the original Unity project's `Assets/Cut scenes/scenes 5/Cut scenes.mp4`.
It shows the father touching the young girl's shoulder beside her bicycle, as
identified by Shani. The narrative's Memory Trigger card uses this moment; the
older vortex image `story-trigger.png` is retained only as an unused archive.

All nine videos below come from Shani's Desktop folder `לנומי לאתר ` (the folder
name ends with a space). They are 1280×720 H.264/AAC, CRF 22, yuv420p MP4 copies with
fast-start metadata and their complete audio/duration. Source files are unchanged.
These copies total about 47 MB; the full Childhood original alone was about 431 MB.

| Output in `numi/` | Supplied recording | Duration |
| --- | --- | --- |
| `trailer.mp4` | `טיזר.mp4` | 48.47 s |
| `resize.mp4` | `הגדלה והקטנה מתוך שלב 4.mp4` | 16.37 s |
| `move.mp4` | `הזזה מתוך שלב 5.mp4` | 16.37 s |
| `rotate.mp4` | `סיבוב מתוך שלב 3.mp4` | 15.77 s |
| `bridge-collapse.mp4` | `גשר קורס.mp4` | 11.13 s |
| `safe-crossing.mp4` | `הידיים שתופסות - מעבר בטוח.mp4` | 11.40 s |
| `icons-before.mp4` | `האייקונים הקודמים .mp4` | 12.53 s |
| `icons-after.mp4` | `האייקונים החדשים.mp4` | 11.37 s |
| `childhood-full.mp4` | `קטע מלא של שלב 1 כולל הסיפור.mp4` | 452.63 s |

The three additional level-design clips below are continuous excerpts from the
original `קטע מלא של שלב 1 כולל הסיפור.mp4`, using the same 1280×720 H.264/AAC,
CRF 22, yuv420p, fast-start encoding at 30 fps. Audio is preserved; footage is not
sped up or rearranged. Source ranges are start-inclusive and end-exclusive.

| Output in `numi/` | Source range | Duration | Evidence |
| --- | --- | --- | --- |
| `level-explore.mp4` | 01:44–01:55 | 11 s | Walk through the opening space and jump to the next platform. |
| `level-wheel.mp4` | 03:26–03:37 | 11 s | Get onto the wheel, roll it and collect a memory fragment. |
| `level-combine.mp4` | 06:28–06:40 | 12 s | Lower the platform using its handle, then jump onto it. |

All five level-design steps use the same inline player; thumbnails retain their
existing poster frames and consistently show a play icon and duration.

The case-study hero now uses `trailer.mp4` with `trailer.jpg`, starting paused.
The retained, unused `hero.mp4` is a 1920×1080 CRF 22 web copy of the NUMI hero source
`videos/numi-hero-338a6d70b4.mp4`; the homepage copy is unchanged. `hero.jpg` is its
first frame. The other JPG posters are genuine frames from their respective films;
the bridge collapse uses 5.8 s, final crossing 10.7 s, old prompts 1.5 s and new
prompts 2.7 s. `feedback-hold.jpg` and `feedback-scale.jpg` crop the actual new-prompt
recording at 1.0 and 2.7 s to focus on the object/prompt (720×405 at x=520, y=260
in the 1280×720 copy, resized to 960×540). `feedback-result.jpg` uses 4.5 s.

`memory-1.jpg` through `memory-5.jpg` are 1600-pixel-wide copies of Shani's chosen
`5 תמונות מתוך 5 השלבים/שלב 1.png` through `שלב 5.png` in the same source folder.
The five-memory strip now uses those images as video posters. Childhood reuses
`level-explore.mp4`, Twenties `rotate.mp4`, Motherhood `resize.mp4`, and Seventies
`move.mp4`, each from the corresponding stage. `memory-teenage.mp4` is a continuous
nine-second excerpt (00:06.500–00:15.500) of `טיזר.mp4`, showing the Teenage Years
fence and movable platforms. It uses the same 1280×720 H.264/AAC, CRF 22,
yuv420p, 30 fps and fast-start encoding, retaining the source audio and speed.
`level-orient.jpg`, `level-wheel.jpg` and `level-combine.jpg` reuse the actual gameplay
captures prepared for the existing Figma level-design strip.

Narrative PNGs are exports of Shani's current Figma source artwork: family
`1277:12410`, interaction `1263:12402`, trigger `1277:12418`, return `1277:12430`.
The gameplay story tile reuses the chosen first-memory image. `visual-*.png` are
the existing Figma visual-development compositions, including environment frames
`1160:9880` and `1160:9881`. The `img*.png` files preserve the actual HUD frames,
interview thumbnail, playthrough poster, public-event photo and next-project image
exported from the same design. SVG arrows also come from that design. No artwork,
process screenshot, player photograph or game state was generated.
# My Bunny case study — September 22, 2026

`my-bunny/` contains exact downloaded Figma asset bytes from Portfolio
`NNjB6Gey6DtLbO1ZzQV51g`, revised case study `1399:5086` on
`תיק עבודות חדש - אתר`. The source artwork remains in frames 19–23.
The image URLs exported with `.png` suffixes contain JPEG bytes; local extensions
match their actual format. No new rabbit artwork or app screens were generated.

- `app-entry.jpg`: actual app entry, node `1401:5099`.
- `feeding.jpg`, `cleaning.jpg`, `playtime.jpg`: full care screens,
  nodes `1401:9632`, `1401:9636`, `1401:9640`.
- `wrong-choice.jpg`: recorded cleaning explanation, node `1402:5106`.
- `completion.jpg`: completion and Back to the app, node `1403:5106`.
- `correct-choice.jpg`: playtime feedback in context, node `1422:5277`.
- `arrow-right-dark.svg`, `arrow-right-light.svg`: shared Figma action glyphs.
- `bunny-sad.png`: original, unmodified Unity sprite from
  `Assets/Bunny_Game/My_Bunny_Game/Images/3/sad.png` (296×385), referenced by
  `RabbitMoodManager.rabbitSad` in the MyBunny scene. It demonstrates the character's
  emotional feedback alongside the explanatory popup.
- `feedback-video.jpg`: frame at 37.0 s of the full recording, showing Bunny's sad
  expression with the collapsed feedback sheet; poster for the feedback clip.

The stage and feedback players use full-frame H.264/AAC excerpts from
`videos/my-bunny-full.mp4`, preserving 720×1280, 30 fps and the original soundtrack.
Only the first 80 ms and last 150 ms of each audio track fade to avoid abrupt cuts.
The original full recording is unchanged.

| Clip in `videos/` | Source interval | Duration |
| --- | --- | --- |
| `my-bunny-feeding-demo.mp4` | 12.8–30.8 s | 18 s |
| `my-bunny-cleaning-demo.mp4` | 34.3–46.3 s | 12 s |
| `my-bunny-playtime-demo.mp4` | 49.3–61.3 s | 12 s |
| `my-bunny-feedback-demo.mp4` | 35.2–41.2 s | 6 s |

`videos/my-bunny-full.mp4` supplies the actual Unity recording (67.57 s). Its
optimized picture is preserved; the silent audio track was replaced losslessly
with the supplied `דברים לאתר לתיק עבודות /my bunny.mp4` soundtrack. Both sources
have identical duration and matching gameplay timing. The playable game uses the
individual original sound clips from `הארנב כולל סאונד.aep`, attached to game events.
The hero's Watch Gameplay action starts at 0:00 with sound; the player can seek through the full
recording. Play My Bunny opens the separate, actual Unity browser export documented
in `../games/my-bunny/README.md`. The shared back arrow is reused from
`numi/imgArrowLeft.svg`.

## Complete family-app and gameplay recordings — September 24

The following are full-length web copies of Shani's explicitly selected Desktop
recordings. They preserve source dimensions, 30 fps, all frames and the soundtrack;
H.264 CRF 22, yuv420p, AAC 128 kbps and fast-start metadata reduce download size.
The source files are unchanged. The players use `preload="none"`.

| Output in `happily/` | Desktop source | Duration | Dimensions |
| --- | --- | --- | --- |
| `app-full-flow.mp4` | `הסרטון המלא של האפליקציה  copy 2.mp4` | 263.60 s | 1920×1080 |
| `personal-space-recording.mp4` | `In Boat 1.mp4` | 153.03 s | 996×2158 |
| `objects-recording.mp4` | `stuff.mp4` | 130.87 s | 996×2158 |

Matching `.jpg` posters are complete source frames: 1 second for the app flow and
8 seconds for both games. The app film replaces the parent/child screen comparison
after Cooperation; the two game films are in their matching playable-game cards.
The original `videos/we-live-happily-here-full.mp4` remains the separate 20-second
explainer under How the Project Works near the start, with its original poster.

## Updated family-game concepts

The September 24 replacements are complete, unmodified Figma exports from
Portfolio (`NNjB6Gey6DtLbO1ZzQV51g`), page `תיק עבודות חדש - אתר`:

- `happily/fairness-cauldron.png`: `1521:4855`, “משחק 3 חדש”.
- `happily/hurt-bridge.png`: `1521:4941`, the revised bridge game.
- `happily/competition-roots.png`: `1521:4857`, “משחק 5 חדש”.

The visual-language section reuses `happily/raccoon.gif` and `happily/bear.gif`
from original Figma nodes `1452:5259` and `1452:5260`, with their static PNGs
for reduced motion and paused playback. Original artwork files remain intact.

## Coded family-app prototype

`happily/prototype/` contains original artwork from the Portfolio Figma file
`NNjB6Gey6DtLbO1ZzQV51g`, app page `1457:5110`:

- Logo: `1457:6116`; parent portrait: `1457:9420`.
- Family portraits: original PNG fills from `1457:8318` (Yuval), `1457:8347`
  (Dani), `1457:9401` (Tohar), `1457:9380` (Dad), and `1457:9420` (Mom).
  CSS preserves the original crop coordinates and transparency.
- Clouds, status-bar artwork, availability circles, add and unchecked icons:
  original design-context assets from `1457:6048`.
- Checked icon: complete SVG from design context `1457:8332`.
- Rubik Light/Regular/Medium/Bold: Shani's installed font files; the accompanying
  `fonts/Rubik-OFL.txt` is from the Google Fonts Rubik distribution.
- `clock.svg`: outlined Alef time label from `1457:6112`.
- `tohar-profile-source.png`: the larger report portrait from `1457:8445`.
- `invitation.png`: original child notification screen `1457:8268`.
- `weekly.png`: original weekly card composition `1457:7653`.

The parent setup, conflict choices, forms and reports render as native React text
and controls at the original 412 × 917 coordinates. Notification and weekly-card
compositions retain the original exported artwork, with accessible controls above
it. The viewport scales the whole canvas; it does not rearrange the source design.
The embedded source film on portfolio slide 16 (`970:2195`, video hash
`88ce12e04a9db1f6dc0b4485dcfc801fd21c1d88`) was inspected for layout and the white
selected/ready button states. This source film is not bundled into the prototype.

## ReDream Labs — September 27, 2026

`redream/` follows Portfolio Figma frame `1541:5256` in file
`NNjB6Gey6DtLbO1ZzQV51g`, including the confirmed After Effects example `1550:5285`.
Section still images and the rule SVG are original design-context assets, downloaded without
visual changes. JPEG payloads were given `.jpg` extensions.

- `brand.png`: identity image `1542:5309`.
- `dream-scan.jpg`: `I1542:5335;1542:5260`, also used in `1542:5404` and
  `1550:5286`; Shani confirmed the dream-scan video scene was created in After Effects.
- `exam.jpg`, `back-room.jpg`, `system-failure.jpg`: the original fills in
  `I1542:5339;1542:5260`, `I1542:5343;1542:5260`, `I1542:5347;1542:5260`.
- `construction.jpg`, `experience-flow.jpg`: `1542:5381`, `1542:5386`.
- `contribution-rule.svg`: original vector `1542:5396`.
- `hero-hd.mp4`: the 30-second montage on `1542:5287`, rebuilt from the original
  `ReDraemLabSHANIandDARIA.mp4` recording. Six five-second excerpts start at 5, 37,
  70, 124, 150 and 190 seconds, matching the Figma sequence.
- `presence-hd.mp4`, `discovery-hd.mp4`, `unfamiliar-hd.mp4`: four-second excerpts
  starting at 146, 132 and 190 seconds in the same original recording, matching
  `I1542:5355;1542:5260`, `I1542:5359;1542:5260`, `I1542:5363;1542:5260`.
  All four clips use native 2560 × 1440, 30 fps, H.264 CRF 18, yuv420p, no audio
  and faststart. They replace the 600 × 338 / 480 × 270 GIF-derived clips, avoiding
  enlarged pixels, GIF dithering and 6–8 fps motion in fullscreen.
- `full-experience-hd.mp4`: complete user-supplied
  `דברים לאתר לתיק עבודות /ReDraemLabSHANIandDARIA.mp4`, 267.03 seconds.
  Web delivery uses native 2560 × 1440, 30 fps, H.264 CRF 18 (fast preset),
  yuv420p and faststart. The original AAC stream is copied without re-encoding.
  Source: 2560 × 1440, 60 fps, 492 MB. Web version: approximately 227 MB,
  downloaded on playback only. It replaces the more compressed 1080p / CRF 23 copy.
- `hero-poster-hd.jpg`, `presence-poster-hd.jpg`, `discovery-poster-hd.jpg`,
  `unfamiliar-poster-hd.jpg`, `full-experience-poster-hd.jpg`: native 2560 × 1440
  frames from the original recording at 126, 146, 132, 190 and 70.016667 seconds,
  respectively, saved with FFmpeg JPEG quality 2. These match the selected Figma
  scenes while avoiding upscaled/compressed preview images before playback.

The original recordings and Figma file are unchanged. Animated examples start paused
and use the shared accessible player. The production example is accurately labelled
as a still from the VR recording; it is not presented as a separate playable clip.
Manrope reuses the existing local font and OFL license in `fonts/`.

## Lollipop case study — September 28, 2026

`lollipop/` contains artwork from Portfolio Figma frame `1574:5285`, file
`NNjB6Gey6DtLbO1ZzQV51g`. PNG originals were downloaded and encoded as WebP at
quality 92 without reducing their dimensions. Text in the case study uses the
existing Satoshi font, with the following artwork exceptions:

- `hero.webp`: complete campaign composition `1577:5285`, 1680 × 945.
- `logo.webp`: original logo crop `1580:5389`, 650 × 380.
- `chewy-specimen.webp`, `fredoka-specimen.webp`: brand type specimens
  `1580:5394` and `1580:5398`, 374 × 50 and 540 × 55.
- `world-flowers.webp`: original transparent illustration sheet from `1580:5367`.
  World details reuse this sheet and the original posters with Figma's crop positions.
- `product-*.webp`: original 1024 × 1536 fashion imagery from
  `1581:5296`, `1581:5301`, `1581:5306`.
- `poster-*.webp`: original campaign posters from `1581:5317–5319`;
  marshmallow is 867 × 1246, sour and gummy are 2480 × 3508.
- `extension-*.webp`: original shopping bag, body product and candle mockups from
  `1581:5325`, `1581:5330`, `1581:5335`.
- `website-hero.jpg`, `website-collection.jpg`, `website-campaign.jpg`: original
  1442 × 914 frames at 2, 20 and 24 seconds from Shani's supplied
  `עמוד בית/הירו/לוליפופ האתר המלא.mp4`, matching the selected Figma screenshots.
- `social-poster.jpg`: original 1080 × 1920 frame at 7 seconds of the Instagram
  reel, retained locally from the Figma preparation.
- `social-reel.mp4`: complete 19.533-second original from the Shani drive,
  `HIT/third year/סימסטר ב/מותג/תרגיל 2, ממתק/לאינסטגרם - לוליפופ/רילס לאינסטגרם.mp4`.
  Original H.264 Main video (1080 × 1920, 30 fps, yuv420p) and AAC stereo audio
  (48 kHz) are copied without re-encoding, with MP4 faststart for web playback.
  Approximately 24 MB, loaded only on Play. The full portrait frame and soundtrack
  replace the pending preview; the original file on the external drive is unchanged.


## HeadEase case-study artwork — September 28, 2026

The HeadEase page follows Portfolio frame `1608:5285` in Figma file
`NNjB6Gey6DtLbO1ZzQV51g`. Assets were downloaded from that frame's design context.
`home/headease.png` is an exact SHA-256 match for its 759 × 427 wearable mockup
(`5b6069d05294d8924c96d6dfa6b9a1e735ba3fc1`); it is reused in both original slots.

`headease/` contains 20 original PNGs. Fifteen complete app screens are 1080 × 2400,
rendered at 3× from the original 360 × 800 frames on `Original headache app`
(page `1600:435`). They preserve Blender typography and are displayed without
cropping or changing their 9:20 ratio:

| File | Original node |
| --- | --- |
| notification.png | 1601:543 |
| sync.png | 1601:555 |
| heart.png | 1601:651 |
| explanation.png | 1601:686 |
| pressure.png | 1601:736 |
| temperature.png | 1601:835 |
| duration.png | 1601:909 |
| active.png | 1601:900 |
| followup.png | 1601:917 |
| dizziness.png | 1601:605 |
| nausea.png | 1601:622 |
| summary.png | 1601:879 |
| contact.png | 1601:926 |
| dashboard.png | 1601:1085 |
| history.png | 1601:939 |

The five compact visual-language assets retain their Figma image-fill proportions:
`blender-type.png` (`1601:913`, 312 × 52 display slot), `bottom-nav.png`
(`1601:665`, 400 × 85.266), `start-button.png` (`1601:685`, 274 × 60),
`symptom-button.png` (`1601:682`, 274 × 60) and `timer-control.png`
(`1601:910`, 222 × 69). Exported shadow/glyph bounds can differ from their Figma
slots; the site's object-fit matches the original component's FILL behavior.
These are illustrations in the case study, not simulated app controls.

Page text uses the same self-hosted Satoshi variable font used to create the Figma
outlines; it remains selectable, accessible and responsive. Shared navigation and
footer use the existing portfolio components. The prototype links open the original
interactive flow at `1601:543`; no replacement app or medical claims were created.

## Contact character animation — September 29, 2026

`contact/shani-calling.webm` is the complete transparent phone-gesture animation
from `Desktop/Shani - Transparent Animation 2/Shani - Transparent 2.mov`.
The approved ProRes 4444 export is converted to silent VP9 with alpha, 512 × 846,
24 fps, retaining all 145 frames (6.04 seconds). Encoding uses CRF 28 and Lanczos
scaling; no background is added. `contact/shani-calling-poster.png` is its matching
transparent frame at three seconds. Both use the existing `AnimatedCharacter`
component; Home and About retain their own animations and original files.

## Hop! It’s the Chef! — September 29, 2026

Figma case `1641:5288` in Portfolio (`NNjB6Gey6DtLbO1ZzQV51g`) uses these
original captures and illustrations from Shani's local `Frog-Game` Unity project.
The website reuses those exact sources as `hop/*.webp`, encoded losslessly at their
original dimensions. Decoded RGBA pixels were compared byte for byte with every
source. All are 1920 × 1080 except `refined.webp` (1672 × 941). No cropping,
retouching, generated artwork or replacement screenshots were introduced.
Below-the-fold images load lazily, and repeated gallery images share URLs.

| Web file (under `hop/`) | Source relative to `Frog-Game/` |
| --- | --- |
| `hero.webp` | `Library/KitchenLayerPrep/OutlinedKitchen.png` |
| `swamp.webp` | `Library/KitchenStoryRestorePrep/Natural4.png` |
| `captured.webp` | `Library/KitchenStoryRestorePrep/Natural30.png` |
| `cage.webp` | `Library/KitchenStoryRestorePrep/Natural55.png` |
| `escape.webp` | `Library/KitchenStoryRestorePrep/Natural66.png` |
| `warning.webp` | `Library/KitchenHowToPlayPrep/03-Warning.png` |
| `hand.webp` | `Library/KitchenLayerPrep/HandPlateContact.png` |
| `reaction.webp` | `Library/KitchenLayerPrep/LeftHandPlateContact.png` |
| `destruction.webp` | `Library/KitchenLayerPrep/SettledFragments.png` |
| `soup.webp` | `Library/KitchenLayerPrep/SoupLayers.png` |
| `banana.webp` | `Library/KitchenLayerPrep/BananaLayers.png` |
| `knife.webp` | `Library/KitchenEscalationPrep/FallingKnife.png` |
| `bottle.webp` | `Library/KitchenEscalationPrep/WineWarningFinal.png` |
| `steam.webp` | `Library/KitchenEscalationPrep/SteamVaporFinal.png` |
| `cover.webp` | `Library/KitchenHowToPlayPrep/04-Shelter.png` |
| `gaspard.webp` | `Library/KitchenUIPrep/SnailReadable.png` |
| `tutorial.webp` | `Library/KitchenHowToPlayPrep/01-Movement.png` |
| `towel.webp` | `Library/KitchenLayerPrep/OutlinedTowelSlide.png` |
| `prompt.webp` | `Library/KitchenHowToPlayPrep/06-Towel.png` |
| `defeat.webp` | `Library/KitchenUIPrep/DefeatBreadButtons.png` |
| `old.webp` | `Library/FrogDiagnostics/TopDown2Frog.png` |
| `unity.webp` | `Library/KitchenStoryPolishPrep/TimelineEditor.png` |
| `drawing.webp` | `Assets/=Frog_MyGame=/2D Scene/Photos/1.png` |
| `refined.webp` | `Assets/=Frog_MyGame=/2D Scene/Photos/New/1.png` |

The original/refined/in-game art comparison uses the swamp illustration in all
three slots. The original Unity assets and archived Le Frogette recordings remain
untouched. The September 29 recording below supplies the revised case and Home preview.

### New frog recording

Source: `תיק עבודות ונומי/תיק עבודות/סרטון מלא של המשחק החדש.mp4` on the Desktop.
The supplied H.264/AAC recording is 1920 × 1080 at 30 fps, duration 739.533 seconds.
The original is retained. Web exports use H.264, YUV420p and fast-start MP4; no
cropping, upscaling or frame interpolation is applied.

| Web file (under `hop/`) | Source interval | Encoding |
| --- | --- | --- |
| `full-game.mp4` | Entire 12:19.533 recording | 1920 × 1080, x264 CRF 18, original AAC audio copied |
| `gameplay-preview.mp4` | 2:58–3:18 | 1920 × 1080, x264 CRF 18, original AAC audio copied |
| `hover-preview.mp4` | Same 20-second excerpt | 1280 × 720, x264 CRF 20, no audio track |
| `gameplay-poster.webp` | Source 3:00 | Full-resolution frame, lossless WebP |

The full recording preserves tutorial, opening story, gameplay and ending. Videos
load on interaction; the case-study players retain sound/seek/fullscreen/retry and
exclusive playback. The Home card keeps the existing silent hover behavior and
static reduced-motion/touch fallback. The original three-film Home hero is unchanged.

## NUMI case-study comparison poster — September 30

`numi/prompts-before.jpg` is the complete 1280 × 720 frame at 4.2 seconds in
`numi/icons-before.mp4`. It shows the original simultaneous Hold/Scale prompts,
so the before/after comparison is understandable before playing either clip.
It is a JPEG frame extraction without cropping or artwork changes; the original
video and existing posters are preserved.

## NUMI interview and exhibition gallery — October 1, 2026

`numi/interview.mp4` is the complete 508.52-second recording from Shani's supplied
`סרטונים של פרוקטים/Shani TV10 - Figma Ready - Trimmed.mp4`. The source is unchanged.
This web copy uses H.264 at 1280 × 720, the original 25 fps, CRF 24, yuv420p,
AAC audio at 128 kbps, and fast-start metadata. It is 47,821,752 bytes, down from
the 152,345,561-byte source; no interview content or audio has been removed.
The existing `imgNumiActualCaptureInterview.png` supplies the genuine studio
poster. Playback starts on request, with sound. The available English subtitle
file belongs to a separate short teaser, so it is not attached to this full film.

Five photos come from Shani's `תמונות מהסנימטק` folder. Full JPEGs fit within
1920 × 1920 without upscaling, preserve the complete source frame and omit embedded
metadata. The corresponding `-thumb.jpg` files are 320 × 200 crops used only in
the thumbnail strips. The original event cover remains on the page.

| Output in `numi/` | Supplied photo |
| --- | --- |
| `event-01.jpg` | `Group 1.png` |
| `event-02.jpg` | `IMG-20260804-WA0013 1.png` |
| `event-03.jpg` | `IMG-20260804-WA0053 1.png` |
| `event-04.jpg` | `IMG-20260804-WA0315 1.png` |
| `event-05.jpg` | `IMG_2964 1.png` |

## Family-app photographic hero — October 1

`happily/family-app-mockup.webp` is the existing prepared phone mockup from Portfolio
`NNjB6Gey6DtLbO1ZzQV51g`, frame `66:714` (slide 18). The export combines the original
photo `66:986` and phone UI `66:987`, preserving their transforms in a 1920×1080 frame.
Presentation navigation and Back to Summary are excluded at export, without retouching
or generating artwork. A temporary export frame was removed after download; the
original Figma slide was left unchanged. PNG export converted to WebP quality 88.
