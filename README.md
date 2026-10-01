# Shani Shlomov — portfolio

Shani’s existing portfolio now uses the supplied **BuildAppStart-2** application skeleton:
a React / TypeScript / Vite frontend and an independently runnable FastAPI backend.
The public portfolio runs as a static site without the backend, including on GitHub Pages.

## Product and current scope

The Home page implements Figma **Slide 16:9 - 118** (`1063:5042`) in the Portfolio file,
on the page **תיק עבודות חדש - אתר**. Its black/lavender palette, Anta title, Satoshi
type, featured NUMI band, four project compositions, More Projects carousel, animated
Shani portrait and footer follow that frame. Desktop proportions adapt to a single
column on mobile. The existing project pages, About, Resume and Contact remain;
case studies stay grayscale where final content/design has not been supplied.
The public navigation is Work, About, Resume and Contact. The current page is
marked by white text and a 2px lavender underline, including in the mobile menu.
Work remains selected inside project case studies. All inner pages use the same
dark header so their active link stays legible. Unknown routes select no item.
The playable NUMI demo opens inside its case study rather than using a separate
Play navigation route.
The September 16 Figma sync includes Anta header/footer branding, the updated purple
and lavender carousel indicators, and the footer’s centered copyright line.

All project pages share one compact black ending: secondary **Back to Work**
on the left, **Next Project** and the destination title on the right, followed by a
quiet signature/copyright row. The layout stacks on phones and keeps safe side
margins. Every project, including HeadEase's compact footer, has the same thin
lavender-gray divider above this navigation, spanning the footer content width.
The TENKI/Ikko alias is preserved. Next-project destinations follow the approved cases;
Hop! It’s the Chef! now leads to ReDream Labs.
The shared ending replaces the older thumbnails and placeholder site footers.

The Home hero opens on NUMI as shown in the Figma frame. Its original three-video
sequence remains cyclical in this order:

1. We Live Happily Here — `we-live-happily-here-hero-2aa5f73eca.mp4` (~20 seconds).
2. Le Frogette — `le-frogette-hero-807756928c.mp4` (~10 seconds).
3. NUMI — `numi-hero-338a6d70b4.mp4` (~10 seconds).

Videos are muted, advance on their natural end, and preserve user pause intent when
switching slides. Pause appears over the central control on desktop hover/focus;
touch devices and paused playback keep it visible. Reduced motion starts paused.
The Home header stays fixed and visible while scrolling in either direction, turns
black below the top, and returns to its translucent overlay at scroll position zero.
View Work scrolls to Featured Project and the project grid.
Its lilac border, off-white text/arrow, translucent dark background and subtle purple
hover/focus stay consistent across all three hero videos.
Hero indicators follow the updated Figma export: solid purple for the current video,
27%-opacity lavender for the other two, no black outline, and the smaller dot size
and tighter spacing from frame `1051:4863`. Touch targets remain larger than the dots.
The Home About heading reads “Hi, I’m Shani.” and its paragraph reads:
“Game UX/UI & Game Designer turning visual ideas into playable experiences
from interface and interaction to Unity.” A **More about me →** button below the
paragraph opens the About page.
Its smaller fluid type, relaxed line height and wider text measure sit beside the
waving character on desktop and stack below it on mobile; the section grows with text.

The project grid is We Live Happily Here, Tenki (the existing Ikko case study),
Hop! It’s the Chef! (formerly Le Frogette) and My Bunny. The carousel contains HeadEase, ReDream Lab and Lollipop,
with captions, arrows, three centered indicators, keyboard/swipe navigation and
image previews. It advances every four seconds while visible, and pauses on hover,
focus or a manual selection. The extra Play/Pause button has been removed to match
the supplied design; reduced motion disables automatic advancement. Active cards
for HeadEase, ReDream Lab and Lollipop open their project page directly,
with the same hover preview and keyboard/touch navigation.
Project media frames grow by 2.5% on desktop hover/keyboard focus without changing
layout. Rounded media clips follow each Figma source frame: 14 px for featured/grid
projects and 46.737 px for carousel images at their source dimensions. Radii scale
with each frame, including the smaller carousel neighbors; posters and videos share
one clip during enlargement.
NUMI, We Live Happily Here, Tenki, Hop! It’s the Chef!, My Bunny, HeadEase, ReDream Lab and Lollipop crossfade into muted
looping previews, loaded only on interaction. Leaving pauses/resets the clip
and restores the poster. Touch, reduced-motion and data-saving modes keep the static
poster and normal links. Hover does not underline project titles. HeadEase’s preview
crops off the device bezel; Tenki’s preview crops the surrounding black recording
canvas and device edge. Both retain the app content on a matching cream/sand background.
Lollipop uses the website’s pink instead of black letterboxing. We Live Happily Here’s
poster layers the original Figma screens over its sky, centered without the separate logo.

Previews are silent H.264 web conversions of the full user-selected recordings in
`עמוד בית/הירו`, except My Bunny’s replacement `עמוד בית/1.mp4` (17.1 seconds).
HeadEase and Tenki now use `*-hover-clean.mp4`; My Bunny uses `my-bunny-hover-1.mp4`.
Original recordings remain untouched.

| Project | Supplied recording |
| --- | --- |
| We Live Happily Here | `כאן גרים בכיף.mp4` |
| Le Frogette | `  - 10 שניות הצפרגע.mp4` |
| My Bunny | `עמוד בית/1.mp4` |
| Tenki / Ikko | `איקו מלא .mov` |
| Lollipop | `לוליפופ האתר המלא.mp4` |
| HeadEase | `אפליקציה לכאבי ראש.mp4` |

The Contact page (`/#/contact`) follows the supplied “LET’S WORK TOGETHER.” copy:
Back to Work, the two introductory paragraphs, Email / LinkedIn / Resume rows, and
the same compact signature/copyright component as About and the project pages.
It uses the shared black/lavender palette, Satoshi type, 1680px container and
87.5% desktop width.
The heading sits above the same portrait/content grid as About: Shani's transparent
phone-gesture animation occupies the left four-column area, with the introduction
and contact links in the right eight-column area. Portrait width, horizontal
alignment and responsive breakpoints match About, including its 360px desktop cap.
At 700px and below, the portrait sits below the heading and above the introduction,
capped at 230px.
The right column groups the larger, naturally wrapping introduction with the
contact actions at a fixed responsive gap, so the portrait's height cannot stretch
the space between them. Email spans the full contact width; LinkedIn and Resume
share the row below, separated by subtle rules. At 480px and below those links
stack. The portrait's position and proportions remain aligned with About.
The September 29 transparent export is delivered as a silent VP9 alpha video and
matching poster through the shared character component, preserving pause/play,
reduced-motion, offscreen pausing and failure fallback. Contact links remain
text-only; the footer rule and signature share the same left edge.
The footer uses the shared small type and horizontal name/copyright layout,
wrapping safely on narrow screens; contact actions remain in the page content.
The main content keeps 20px side margins at 700px and below, matching About.
Contact retains the existing `#email` and `#linkedin`
deep links. Back to Work returns directly to the Home project section.

Contact destinations live in `contactDetails.ts`. The confirmed email is
`shanishlomov@gmail.com`. Email offers two direct links: Mail app opens the
visitor’s default email handler (such as Apple Mail), while Gmail in browser
opens Google’s web compose page in a new tab with the recipient prefilled.
Gmail may require sign-in. LinkedIn links on Contact and the site footers open
Shani’s supplied profile (`https://www.linkedin.com/in/shani-shlomov-927556363/`)
in a new tab. View Resume opens the existing Resume route; the final CV has
not yet been supplied.

The About page (`/#/about`) uses Shani’s supplied September 28 introduction,
Game & UX/UI Designer title, HIT B.Des (2026), focus and tools. It follows the
site’s black/lavender styling: the animated character sits to the left of a wide
biography and three-column facts on desktop. Paragraphs, facts and the resume link
have generous vertical separation; facts stack on tablets, with the character
above the text on phones. About uses the September 28 pointing animation from
`Desktop/Shani - Transparent Background/Shani - Transparent.mov`, converted to a
silent 512 × 846 VP9 video with alpha (145 frames at 24 fps). Its matching transparent
poster uses the pointing pose at two seconds. The existing portrait size, aspect
ratio and alignment remain; Home retains its waving animation. The shared character
keeps its pause control, reduced-motion poster, failure fallback and offscreen pausing.
View Resume opens the existing Resume page; no downloadable CV is claimed until
the final file is supplied. About ends with the shared compact signature.

Figma-composed artwork and exported icons live in `frontend/public/assets/home/`.
The Home character uses a 247 KB VP9 alpha video converted from Shani’s clean
MOV, with a static poster, offscreen pausing and an explicit pause control. Animations
start paused when reduced motion is enabled. Anta is self-hosted with its OFL license.

### We Live Happily Here case study

`/#/we-live-happily-here` uses the shared Anta/Satoshi typography, content widths,
chapter navigation and buttons. The case is organized into five chapters: The idea,
Family flow, Game design, Visual language and Try it. A clean original photographic
phone mockup leads the hero; clicking it opens an enlarged view. The project type sits
below the title. NUMI follows the same two-column introduction and full-width media
layout, with matching typography, actions and mobile stacking. Four complete screens
connect the parent invitation, child lobby, shared gameplay and parent feedback.
The five conflict concepts occupy the full content width, with Personal Space and
Objects clearly identified as the two playable Unity prototypes. A focused Personal
Space example explains the split-control design and shared result. Characters,
customization and weekly rewards appear together once, with aligned captions.

The 20-second overview stays inline. A clearly labeled **Watch the full app flow**
button leads to the complete 4:24 recording in Try it, including the game and shared
result. Its original landscape frame is visible beside the app description and
**Try the App** button, with sound, seeking, fullscreen and retry. The video uses
`preload="none"` and is requested only on play; opening the app pauses playback.
The app and two equally
prominent Unity players close the case, followed by a short closing reflection with
its heading and first-person summary grouped in one column.
Try it uses the same media, description and action treatment for the app and both
games. The complete landscape app recording leads the group, with the two portrait
game recordings below. All previews sit directly on the page, without colored panels
or duplicate jump buttons; their original aspect ratios are preserved.
The existing `two-users`, `cooperation`, `game-ui` and game anchors remain available.
The emotional reset is presented as design intent, not a validated therapeutic result.

The refinement lives on `codex/happily-case-study-refinement`, based on the completed
NUMI branch. The NUMI branch and `backup/portfolio-before-numi-2026-09-30` remain intact;
feature pushes do not deploy the public site.

The hero's **Try the App** button leads to the app preview in Try it, alongside the
two Unity games. **Try the App** within that preview opens the coded React prototype
directly inside the case study. Parent and child appear
side by side at equal heights on desktop, with independent navigation. At widths
up to 700px, compact אמא / הילד controls switch between the two views. Sending an
invitation returns the parent to the family screen and delivers a notification
to the child; narrow layouts switch to the child automatically. The child starts
with the original registration invitation (`937:22099` in Design Lab). Opening it
leads to Dani's original home (`676:2432` / `937:22169`), including character
selection, colors, accessories and Save. The four original characters cycle with
the arrows. Five supplied bear colors and six original accessories are selectable;
the cyan/pink dots remain artwork because those character variants are not supplied
in the Figma component. The saved state uses the original white control feedback.
Choices persist through role switches, notifications and the child lobby until
the demo is closed. Back from a game notification returns to the child home;
back from home reopens the latest invitation (or registration before any game).
Closing returns focus and scroll position to the button that opened it. Each
original 412 × 917 app canvas scales uniformly to fit the available browser width
and height. The complete screens stay visible without internal scrolling. Role
labels, close and back controls sit outside the artwork; there is no added title, restart bar,
demo footer or explanatory copy inside the app.

The parent home (`1457:6048`) and conflict screen (`1457:6343`) use the original
Rubik typography, five family members, character crops, availability badges,
cloud positions, button dimensions and text. Two selections enable New Game;
one conflict enables Send. Selected controls and ready action buttons turn white,
as shown in the original app film on portfolio slide 16 (`970:2195`). Selection
persists when returning to the previous screen, and clicking again deselects it.
The original child invitation artwork (`1457:8268`) replaces the invented success
card. Opening a Personal Space or Objects notification leads to its original
child lobby (`676:1532` / `816:13182` in the Design Lab Figma file), with the matching
blurred game background, original cart/leaf and wooden controls. The two names
come from the invitation; the first participant is shown ready in this local demo.
“אני מוכן!” turns the second participant green, then opens the corresponding real
Unity export after a brief readiness confirmation. Closing the game returns to
the same lobby; back returns to the notification. Back/close cancels a pending
launch. The parent can continue browsing while the child is in the lobby; later
parent selections do not change an already-sent invitation. A new invitation
replaces the child's previous one and cancels its pending launch. Other conflicts
still return to the experience section. No Unity gameplay
is simulated inside the app.

Finishing either game's final summary with its original סיום button returns to
the app and delivers the mother's original completion notification (`676:4093`
in Design Lab). Opening it returns to the family home; each invited player's
daily count and the dashboard's game total increase once. The child returns to
their home with customization preserved. The parent view opens automatically on
narrow screens. Closing a game early returns to its lobby and does not change
counts. Duplicate completion messages cannot count the same invitation twice;
the dialog accepts completion only from its own loaded iframe and matching game.
From the updated family home, Status leads to the household overview, individual
player report and weekly card, including its local send feedback and print action.

Sending Dani and Yuval's weekly card from the parent delivers the child's original award
notification (`730:10019` in Design Lab). It opens the child's weekly card
(`730:9893`); the close control returns to the interactive child home. This is the
supplied Dani-and-Yuval team certificate, with the original six-game sample copy.
The parent can select either original team in the weekly-card arrows: Dani and
Yuval, or Tohar and Mom (`1457:9777`). The selected names, illustration and print
preview follow that team; selection and sent state persist across parent navigation.
Each team can be sent once. Only Dani's team delivers an award to the demo's Dani
phone, so sending Tohar and Mom's card does not interrupt his screen or game invite.
The alternate card uses the original component in the original Figma weekly frame.
The notification, card and awarded orange-bear pose (`730:9615`) use the original
Figma artwork. Other character/color/accessory choices remain intact; the awarded
pose appears when the original orange bear is selected. Sending is remembered
across parent navigation and cannot duplicate the same award. The child can reopen
it through Back from home when there is no pending game invitation. Pending game
invitations and character edits survive the award flow. An unread award remains
available after a game notification or completion. The mobile view switches to the
child on delivery; desktop retains both screens. Closing the whole demo clears it.

The status dashboard, player summary, weekly card and player-details form follow
original frames `1457:7547`, `1457:7816`, `1457:7653` and `1457:7895`. Each of the
five player reports uses its own original text and cooperation-meter fill from
component `1457:8438`, both on direct selection and when cycling with the arrows.
Reports use the original sample values except for completed-game counts; period
buttons demonstrate selection rather than querying live data. Registration fields
stay in memory and return to the original
family-registration layout (`1457:7212`); registration, invitations and awards
stay in the local demo, with no phone-number submission or delivery to real devices.
Closing/reopening clears the demo.
The dialog supports keyboard/touch, Escape/close and focus restoration.

The original Figma Present flow remains a secondary link on app page `1457:5110`,
starting at `1457:6048`. The coded prototype includes the parent interface, child
registration/home/customization and both child lobbies. Customization demonstrates
the child's app; the Unity builds retain their original game characters.
Invitations and partner readiness are local demonstrations, not network multiplayer.
**Play Game 01** and **Play Game 02** open the actual Unity browser exports in a
portrait dialog. Each game downloads only on request and supplies its original
instructions and three stages. Personal Space uses keyboard/touch steering and
supported phone tilt; Objects uses arrows/Space or touch, with a local simulated
partner. Sound, fullscreen, retry, Escape/close and focus restoration follow the
existing My Bunny player. Closing releases the game. The optional Tilt control
requests motion permission on phones; physical-device tilt remains to be tested.
Rebuild instructions are in `frontend/public/games/happily/README.md`.

Artwork in `public/assets/happily/` is exported from the Figma case and original
app: hero screens `1457:6048` / `1457:5970` and the second game `1457:6877`.
It includes complete phone screens and composed game previews. The original
raccoon/bear GIFs come from nodes `1452:5259` and `1452:5260`. They animate only
while visible, offer a compact pause control and honor reduced motion/data saving.
The characters appear once in Visual language. The remaining conflict concepts use
Shani’s September 24 cauldron, bridge and roots artwork. All five drawings share the
same visible height, with aligned captions and complete, undistorted artwork. The
four family-flow screens use equal-height frames: four desktop columns, two on tablets,
and one on narrow phones. The photographic hero is exported from the original photo
and phone layers of Portfolio frame `66:714`, without the presentation controls.

Each game's portrait player shows its complete supplied recording: Personal Space
uses `In Boat 1.mp4` (2:33), and Objects uses `stuff.mp4` (2:11). Inline films preserve
the full frame and soundtrack and load only after Play. The full app film starts on
opening its dialog. Only one film plays at a time, and opening the app or a Unity game
pauses recordings. Separate Play Game actions continue to launch the actual games.

Personal Space gameplay shares one current Unity capture across the conflict
gallery and cooperation section, showing the swamp and
mud hazards. `personalSpaceMedia` also supplies the current three-stage summary.
The five conflict images retain equal visible heights with the wider 9:16 capture.
The two cooperation screens have equal dimensions, a maximum displayed height of 560px and
separate captions. They sit beside the section introduction on desktop, with design details below, and stack
on small phones; the older device mockups remain archived in the assets folder.

The supplied September 24 recordings complete the previously pending app-flow and
gameplay media. Provenance and encoding details are in `frontend/public/assets/README.md`.

### NUMI case study

`/#/numi` groups Shani's introduction and trailer, personal origin and five memory
worlds, visible visual development, Childhood level, HUD/prompt iteration, and
public presentation with credits. Section titles and their explanations sit
together directly above the related media; comparisons group clips and captions.
It retains the black/lavender palette, Anta/Satoshi fonts, rounded media and the
shared project footer. The homepage and other project pages are unchanged.

The introduction uses the Happily hero layout: title and project type on the left,
description, a short first-person contribution paragraph and actions on the right,
then the paused 48-second trailer across the full width below. The short NUMI title
aligns to the top of the introduction; desktop/control details appear beside the demo.
On phones these groups stack in reading order. **Back to Work**
sits beside **Play the Childhood demo**; the demo link still scrolls to the compact
entry without downloading Unity. The five memory previews are inline gameplay videos
with their existing posters, play badges and durations. They form one labeled strip;
on narrow screens it scrolls horizontally, keeping each player's controls usable.
Each starts paused and muted, downloads on demand and supports keyboard playback,
seek, sound and fullscreen. Playing another preview pauses the previous one.

The Childhood section compares the collapsing hand bridge and safe hand crossing
with an explanation beside each clip. The three manipulation examples are available
under **Explore the three interactions**. The HUD shows explicitly labeled 0/4, 1/4
and 4/4 states. Interaction feedback and playtesting form one before/after account:
simultaneous Hold/Scale prompts changed to a contextual sequence. Its poster exposes
the original simultaneous prompts before playback. This documents the design change;
no unverified playtest metrics or improved outcomes are claimed.

Five sticky chapter links lead to the idea, visual design, level design, UX/UI
and Press & Players. The previous section anchors remain available. The visual
section is always visible, with character, environment, object and narrative
studies, rather than a collapsed appendix. Character/environment studies and
comparisons stack on phones. Visual-study captions use a consistent smaller type
scale and shorter descriptions. Object captions share the exact width and left edge
of their artwork; on phones each small asset sits beside its label in a single row.
A prominent **Watch the full Childhood playthrough**
button with its 7:33 duration sits alongside **Play in browser** in the demo area.
Decorative diagonal arrows have been removed from NUMI's images and actions;
the full-width hero preserves trailer playback and the existing navigation targets.
The closing section leads with **NUMI on Channel 10**, a large native player with
the genuine interview poster and an explicit **Watch the interview** control. The
complete 8:28 Hebrew interview loads only on play and starts with sound; YouTube
remains a secondary link. Below it, the event cover and five thumbnails open an
enlarged gallery of genuine Cinematheque photos. Full photos retain their framing;
the thumbnail strip uses crops. The gallery supports previous/next controls,
Left/Right/Home/End keys, touch swipes, photo-load retry, Escape/close and restoration
of the opener's focus and page position. Thumbnail navigation scrolls only its
horizontal strip, keeping the dialog's close control visible in short viewports.
The project footer returns to Work or continues to We Live Happily Here.

Shared video controls retain seek, play/pause, sound and fullscreen, keyboard/touch
access, loading/retry and reduced-motion behavior. Films start paused and muted
except the interview, whose sound starts on the visitor's play action;
only one plays at a time, and offscreen/background players pause. The full film
opens a dialog with Escape/close, focus restoration and preserved page position.

**Play in browser** opens the existing Unity browser export on desktop. It downloads
only on request, with loading/retry, fullscreen, mouse close and Shift+X to return
to the case study. Touch-only visitors receive a desktop-play note and the full
Childhood film instead. The export and its controls are unchanged: original menu,
opening story with hold-to-skip, Childhood scene, bicycle memory and completion
screen. Later stages remain in the full Unity project. See
`frontend/public/games/numi/README.md` for the export arrangement and
`frontend/public/assets/README.md` for media provenance.

#### Backup and isolated redesign

`backup/portfolio-before-numi-2026-09-30` preserves commit `6265b56`, including the
previously uncommitted homepage refinements and original NUMI page. It is pushed to
GitHub. The original `Portfolio website` working folder remains on that branch;
its preview remains at `http://127.0.0.1:5173/#/numi`.

The completed NUMI redesign is preserved on `codex/numi-case-study-refinement`. The
sibling `Portfolio website-numi-refinement` worktree now uses
`codex/happily-case-study-refinement`, including the refined Happily page and the
matching NUMI hero. Start its preview from `frontend/`
with `npm run dev -- --port 5174 --strictPort`, then open
`http://127.0.0.1:5174/#/numi`. Reopen the original folder/preview to return to the
saved design without discarding the new work. The backup remains available as a
Git starting point for a later restoration. Neither branch triggers deployment;
the public GitHub Pages site remains on the previously published version.

### TENKI case study

`/#/tenki` presents the seasonal weather app in five chapters: The idea, App flow,
Visual design, Graphic language and Try it. `/#/ikko` and the existing concept,
seasons and final-interface anchors remain compatible. Ikko Tanaka is credited as
the artist whose work informed the concept; the app is named **TENKI**.

The introduction matches NUMI and Happily: title and project type on the left,
short description, contribution and actions on the right, then Shani’s pink phone
mockup at its complete 16:9 proportions. **Explore the app** leads to the demo and
prototype area. The original mockup and picnic collage come from Portfolio Figma
file `NNjB6Gey6DtLbO1ZzQV51g`, slides `429:888` and `557:1306`. Export-only copies
omitted presentation text and navigation; originals remain intact and the temporary
copies were removed. Both artworks open enlarged with keyboard access, Escape,
visible close controls and focus restoration. Asset provenance is in
`frontend/public/assets/README.md`.

The artist references and 24-season concept form one introduction. Five complete
screens appear once, with captions explaining the home-screen picnic suggestion
and the shared weather/map context. Each opens at phone reading width in a
scrollable portrait dialog with a sticky close control and focus restoration.
The introduction leads with the user benefit: checking weather and finding a
seasonal reason to go outside. Three focused visual-design examples explain the
reused sun symbol, location labels and familiar navigation meanings.
Custom numerals and an original/selected forecast-row comparison lead into the
picnic mockups, showing the same identity across
screens and physical-product concepts. There are no numbered chapters or section
rules. The shared 1680px container, Anta/Satoshi type, black/lavender palette and
rounded imagery match the other refined cases. The flow scrolls within its own
row on narrow screens; the rest of the content stacks.

TENKI's text uses a restrained hierarchy: 28–40px section headings, 17–20px
subheadings, 16–18px body copy and 14–16px captions. Section explanations sit
directly below their headings, without repeated uppercase chapter labels. Shorter
captions align with their imagery; the five-screen row shares title/body tracks
so descriptions stay aligned when a title wraps. Hero and explanatory copy have
bounded line lengths, while all artwork and interactive controls remain available.

The forecast comparison uses actual material from the `איקו מקורי` and `TENKI - App`
pages in Portfolio: the original row and the updated selected-day highlight.
It explains the visible change without claiming user testing or measured results.

Try it presents one complete app journey, including the map, with the silent app
demonstration beside a short introduction and one **Try the app** button. The
button opens the original full Figma prototype in a new tab. The demo plays only
when visible, pauses in background tabs, respects reduced motion/data saving and
retains explicit play/pause. The separate draggable map preview and its second
prototype entry point are removed; the map artwork remains in Visual design and
the five-screen flow. The shared project footer links to Hop! It’s the Chef!.

The work lives on `codex/tenki-case-study-refinement`, based on commit `f4ffc16` of
`codex/happily-case-study-refinement`, preserving the completed NUMI/Happily version.
Feature pushes do not deploy the public site.

### Hop! It’s the Chef! case study

`/#/le-frogette` now presents the approved rebuilt frog game from Figma frame
`1641:5288` in Portfolio (`NNjB6Gey6DtLbO1ZzQV51g`). The original route and
`le-frogette.html` redirect remain valid. Its Home project card uses the new title
and current kitchen capture; TENKI/Ikko's next-project link carries the same title.
The original Home hero reel remains unchanged.

The case follows the approved 1680px grid, Satoshi typography, black/lavender
palette and full-width section introductions: story, core loop, escalating level,
chef threat, hazards, cover/checkpoints, onboarding, feedback, original/refined art,
earlier/current comparison, Unity implementation and gameplay recording area.
Desktop galleries become fewer columns and then stack on phones; source images
are contained without cropping. Six sticky chapter links support keyboard use,
active-section tracking and deep links. The shared divided footer leads to ReDream Labs.

The 24 source captures and illustrations used in Figma are self-hosted as lossless
WebP in `assets/hop/`, with the complete source pixels verified after conversion.
Text remains native selectable HTML. Gallery images load lazily.
The September 29 recording, `סרטון מלא של המשחק החדש.mp4`, now supplies the full
12:19 playthrough and a 20-second gameplay preview (source 2:58–3:18). Both keep
1920×1080, audio, on-demand loading, sound/seek/fullscreen controls and failure retry.
Starting one pauses the other. The Home card uses a silent 1280×720 conversion of
the same excerpt, with the existing hover/focus/reset and reduced-motion behavior.
The Home hero reel remains unchanged. Remaining gallery captures are labeled as stills.
Illustration and AI-assisted development credits follow the approved case copy.

**Play the game** loads the Unity WebGL export in `public/games/hop/` only after
an explicit click. The original menu, interactive How to Play, opening story and
rebuilt kitchen level are included. The landscape canvas keeps its complete 16:9
frame. Sound, fullscreen, close, download progress and retry stay in the surrounding
website flow. Tab returns from the game to website controls; Shift+X closes it.
Escape stays available to the game's own menus. Closing releases the iframe and
restores focus/scroll. The original Quit action also returns to the case study.
On touch-only devices, the dialog offers the full playthrough and explains that
playing requires a computer with a keyboard. Controls: WASD/arrows, Space to jump,
E at the towel and Enter for dialogue. Rebuild instructions are in
`frontend/public/games/hop/README.md`; build/bridge sources are in `frontend/config/unity/`.
The export is built with Unity 6000.3.8f1 and WebGL Build Support in an isolated
`HopWebExport` workspace, leaving the source Frog-Game project untouched. The current
export (`6346174d13e6`) includes the revised capture text in the opening narrative,
Gaspard's rounded dialogue background, tutorial boundary/return and ending sequence.
Versioned browser filenames keep cached copies from hiding new releases.

### ReDream Labs case study

`/#/redream` implements Figma frame `1541:5256` in Portfolio
(`NNjB6Gey6DtLbO1ZzQV51g`), including the September 27 chapter bar and confirmed
After Effects example. Select ReDream Lab in the Home More Projects carousel and
click its card to enter the project directly. It follows the premise, research, four-scene journey,
spatial storytelling, narrative reveal, production and recorded-playthrough sections.
The layout retains Figma's Manrope typography, black/lavender colors, original media,
and the shared site header, sticky chapter navigation and project footer.

ReDream follows NUMI’s 1680px container, 4/8 column split, column gaps and section
spacing. Titles and introductions align on the left; the preview, scene gallery,
production examples and full recording align on the right. The four scenes use
two rows so each landscape image stays readable. The colored narrative section
keeps the same inner grid. Columns stack below 1024px, with 20px side margins at
760px and below. The original Manrope typography, films and production credits remain.

Production & Tools shows the dream-scan still with explicit credit for Shani's video
scenes and transitions in After Effects. Personal, partner and shared contributions
remain distinct. All five videos use 2560 × 1440 at 30 fps. The full 4:27 VR recording
retains its original audio stream and loads only on request (approximately 227 MB).
The 30-second hero and three four-second spatial examples
retain the Figma edits, rebuilt from the original recording at 2560 × 1440 and
30 fps. They replace the low-resolution GIF previews. All five player posters now
use matching 2560 × 1440 frames extracted from the original recording.
All players start paused, use the shared accessible controls and retry state, play
one at a time, and pause offscreen or in background tabs. **Watch Full Experience**
starts the full recording from the beginning with sound. The After Effects example
remains the still image approved in Figma.

Sections stack on mobile; the chapter bar scrolls horizontally and supports keyboard,
direct section links and browser back. The project footer leads to NUMI.
Media provenance is recorded in `frontend/public/assets/README.md`.

### Lollipop case study

`/#/lollipop` implements Figma frame `1574:5285` in Portfolio, using the shared
Satoshi/Anta typography, header, eight chapter links and project footer. The Home
carousel opens this route directly. The story covers the concept, brand world,
identity, edible fashion collection, campaign posters, extensions and brand website.
The website link opens Shani's supplied Figma prototype in a separate tab; the
project footer leads to ReDream Lab.

Lollipop uses NUMI’s 1680px container, 4/8 column split, column gaps and section
spacing. The hero, concept, brand galleries, website and social reel share the same
text/media alignment. Columns stack below 1024px, with 20px side margins at 760px
and below. The portrait reel is capped at 400px and keeps its complete frame;
the original campaign artwork, detail crops and brand typography are retained.

Social Campaign contains one playable portrait campaign reel,
replacing the three-frame Figma storyboard per Shani's September 28 instruction.
The full 19.53-second original recording retains its 1080 × 1920 resolution,
30 fps and original audio, with no re-encoding. The shared `CaseVideo` player keeps
the portrait frame complete and offers play/pause, sound, seek, fullscreen and retry.
It loads only after Play, starts with sound and pauses offscreen or in a background tab.

Original Figma artwork is self-hosted in `assets/lollipop/`, with lazy loading below
the hero. Page text remains real Satoshi text; only the two brand type specimens
are exported artwork. Desktop columns stack on phones; deep links, keyboard chapter
navigation and the reel's playback controls and retry are covered by Playwright.

### HeadEase case study

`/#/headease` implements Figma case-study frame `1608:5285` in Portfolio,
replacing the former placeholder page. It presents the wearable and app concept,
research insights, detection-to-relief sequence, eight-step user journey,
measurements, session controls, additional symptoms, two-interface responsibilities,
final screens, visual language and prototype/testing copy supplied in the brief.

The page reuses the shared header, sticky chapter navigation and project footer.
Its eight chapter links support keyboard navigation, deep links and browser back.
The Home carousel enters the project directly; the footer continues to My Bunny.
Both prototype buttons and the final preview screens open the original HeadEase
Figma flow in a separate tab, starting at `1601:543`. The app itself remains the
original external prototype. No new medical results or test metrics are added.

Body copy uses the existing self-hosted Satoshi font. Original app screens retain
their Blender typography as sharp 1080 × 2400 exports, lazy-loaded below the hero.
The existing wearable mockup is reused exactly. Desktop grids adapt to smaller
screens without stretching or cropping the phone artwork. Asset provenance is in
`frontend/public/assets/README.md`.

The layout follows NUMI's 1680px container, exact 4/8 column proportions, column
gaps and section spacing. The hero and section headings share the same text column,
with artwork and content aligned on the right. Sections stack below 1024px, with
20px side margins at 760px and below.
Phone artwork is capped at 216px; narrow layouts use two phone columns. Headings,
body copy and supporting labels use the portfolio's separate color tokens.
Prototype buttons use compact 44px controls matching the Home page. Decorative
slashes, arrows and body-section rules are omitted. HeadEase's compact project
footer retains the shared top divider; the original app artwork is unchanged.

### My Bunny case study

`/#/my-bunny` implements the approved Figma frame `1399:5086` in the Portfolio
file. It presents a rabbit adoption app with a reusable educational care game,
following the idea → three care stages → interaction loop → explanatory feedback →
app/game relationship → UI in context → Unity recording sequence. The existing
`my-bunny.html` link remains compatible.

The case study shares the site header, chapter navigation, action styles and compact
signature with the completed case studies. It uses Satoshi/Anta and NUMI’s 1680px
container, 4/8 column split, column gaps and section spacing. Headings and copy sit
on the left; care clips, feedback, app screens and the Unity recording align on
the right. Sections stack below 1024px, with 20px side margins at 760px and below.
Original Figma media and phone recordings remain complete on desktop and mobile.
HeadEase closes the page as a compact link to the headache-support app with a
connected smartwatch.

The three care stages use 18-, 12- and 12-second clips from the original recording.
A six-second feedback clip shows the drag, Bunny's sad expression, the explanatory
popup and return to the task. Each portrait player starts on request with the original
soundtrack, supports pause/seeking/mute/fullscreen/retry, and pauses offscreen.
Only one film plays at a time; the same playback coordination is shared with NUMI.
The original sad-character illustration also remains beside the feedback explanation.
The app/game connection uses the actual **Start playing** and **Back to the app**
screens with captions. My Bunny's chapter navigation has no horizontal divider;
its active-section indication and keyboard focus remain available.

The hero pairs **Play My Bunny** with **Watch Gameplay**. Play opens the actual Unity
game in a portrait dialog, downloaded only on request, with mouse/touch input,
loading/retry, sound, fullscreen and close controls. Escape returns to the case study;
Tab from the canvas reaches the close control. Closing restores focus and position.
The source game includes the seven original After Effects soundtrack clips, triggered
by player actions, and thin black outlines on white instructions and headings.
The game export comes from a separate `MyBunnyWebExport` workspace, leaving the
original platform settings and the independently open NUMI editor unchanged. Rebuild instructions
are in `frontend/public/games/my-bunny/README.md`.

**Watch Gameplay** brings the 1:08 recording into view and starts from 0:00 with
sound enabled. The Unity section contains the shared `CaseVideo` player
without repeated launch/watch buttons. It starts paused, loads on request, and
supports seeking, mute, fullscreen, offscreen/background pausing and retry.
Project-specific visual redesign remains deferred.

## Structure

```text
frontend/
  src/app/                 composition and hash routes
  src/pages/               thin route pages
  src/features/portfolio/  Home, projects, hero, previews, navigation, local SCSS
  src/features/health/     optional operational API check
  src/components/          feature-neutral UI
  src/shared/              environment, HTTP transport and asset URLs
  src/styles/              global element defaults and design tokens
  public/assets/           original videos, posters, fonts and icons
  config/                  Vite, TypeScript, ESLint and Playwright
  tests/                   desktop/mobile browser regressions
backend/
  src/app/modules/health/  router → service → schema
  src/app/core/            config validation, errors, logging and request context
  tests/                   API, middleware and configuration regressions
scripts/                   setup, dev launcher, checks, smoke and export
```

`_template` folders are reference-only. Apps communicate through HTTP; neither imports
source from the other. No database, authentication or speculative application features
have been added. The optional operational page is `/#/health`.

The existing markup has been migrated into typed React components, not embedded as an
iframe or injected HTML. Home styles are scoped to the Home shell and its components;
the historical Home1/Home2 style layers are no longer loaded. The case-study foundation
is preserved independently.
Project routes are loaded on demand. Old `.html` project links redirect to hash routes.

## Run locally

Requirements: Node 22.22.2+ and Python 3.13 (backend supports Python 3.12+).

```sh
npm run setup
npm run dev
```

The combined development launcher starts the frontend on **http://127.0.0.1:5173**
and the backend on **http://127.0.0.1:8000**. Ctrl+C stops both.
For the independent frontend:

```sh
cd frontend
npm ci
npm run dev
```

On this Mac, double-click **הפעלת תיק העבודות.command** on the Desktop. It links to
`Start Portfolio.command` in this project, runs `npm run dev -- --open` from `frontend/`,
and opens **http://127.0.0.1:5173**. Changes appear automatically during development.
Keep that Terminal window open; press Control+C there to stop the server. Opening the
shortcut again reuses this project's running server. It reports a conflict if another
project owns port 5173. The launcher also finds the Node runtime installed locally for
this portfolio, so it works without configuring Terminal's PATH.

For the familiar production preview on **http://127.0.0.1:4173**:

```sh
cd frontend
npm run build
npm run preview
```

On this Mac, `Preview Portfolio.command` at the project root builds and opens that
preview using the locally installed Node runtime. Keep its terminal open while reviewing.
The original `python3 preview.py` command and root HTML files are retired.

If a managed Python installation cannot create its environment with ensurepip, use
`uv venv --seed --python 3.13 backend/.venv`, then rerun `npm run setup`.

## Verification

```sh
python3 scripts/check.py
npm run smoke
```

The full gate checks architecture, dependency consistency, Python lint/format/types,
backend tests, root script tests, frontend lint/types/build and Playwright on desktop
and mobile. Smoke checks real combined startup, API proxying and clean shutdown.
Tests own port 4175; smoke owns port 5173. Browser artifacts are written outside the repo.

## GitHub Pages

The public portfolio is published at **https://shenkish.github.io/** from
**https://github.com/ShenkiSh/ShenkiSh.github.io**. The workflow
`.github/workflows/deploy-pages.yml` is **manual only** and builds `frontend/dist`
with `VITE_STATIC_DEPLOYMENT=true`. GitHub Pages hosts the static frontend; the
optional FastAPI service is not needed. Hash routes and legacy redirects remain valid.

The two complete Hop and ReDream recordings are hosted separately at
**https://shenkish.github.io/portfolio-media/**. Their original bytes, sound,
resolution and duration are preserved. The media source lives in
**https://github.com/ShenkiSh/portfolio-media**; its build verifies and reassembles
48 MiB parts using SHA-256. Splitting the published assets between these two sites
keeps each below GitHub Pages' 1 GB limit. All playable Unity games and other media
remain part of the main site.

`VITE_MEDIA_BASE_URL` switches only those two recordings to the media host. Leave
it blank for local originals. The original MP4s remain in this workspace but are
excluded from this repository. After cloning, either set that variable to the
media URL or download the originals for the complete local regression suite:

```sh
curl --fail --location https://shenkish.github.io/portfolio-media/assets/hop/full-game.mp4 --output frontend/public/assets/hop/full-game.mp4
curl --fail --location https://shenkish.github.io/portfolio-media/assets/redream/full-experience-hd.mp4 --output frontend/public/assets/redream/full-experience-hd.mp4
```

The Quality workflow restores these recordings before running tests. To publish an
update, push `main`, wait for the Quality workflow to pass, then run **Deploy
portfolio to Pages** from Actions. Publish the media repository first if replacing
one of the two hosted recordings. No credentials or real `.env` files are committed.

## Template provenance and preserved material

Source: `Downloads/BuildAppStart-2.zip`. Bundled dependency folders and virtual environments
were excluded and rebuilt from the supplied lockfiles. No dependency versions were changed.
Template maintenance commands that install global Codex settings or generate other templates
are not part of this portfolio application.

The ZIP omitted root dotfiles referenced by its checks. Minimal `.editorconfig`,
`.gitattributes`, `.gitignore`, runtime version files, security guidance, workflow files
and a local vertical-slice guide were supplied here; they are new project configuration,
not claimed copies of those missing files. The original architecture checks are retained.

A full copy of the static portfolio was saved before migration alongside this folder:
`../Portfolio website - before BuildAppStart 20260914-231421`.
Video/font provenance remains in `frontend/public/assets/README.md` and the font license
files. The prior visual-direction notes are retained under `docs/` as historical context.
