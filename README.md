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

All eight project heroes use one left-aligned column: project name and type,
then the description and available actions, followed by full-width media.
The shared `styles/abstracts/_case-hero.scss` mixins keep the layout and copy
spacing consistent, with a 760px maximum text width. Project typography and
media retain their own identity. This layout applies on desktop, tablet and phone.

NUMI, We Live Happily Here, TENKI, My Bunny, Hop and HeadEase also share the
`styles/abstracts/_case-type.scss` reading hierarchy: lighter section headings,
consistent body text and hero leads, and compact introductions up to 720px wide.
Happily's chapter descriptions sit below their titles. Copy beside media aligns
at the top, with captions kept close to their images. This typography pass
preserves all existing wording and media.

All project pages share one compact black ending: secondary **Back to Work**
on the left, **Next Project** and the destination title on the right, followed by a
quiet signature/copyright row. The layout stacks on phones and keeps safe side
margins. Every project, including HeadEase's compact footer, has the same thin
lavender-gray divider above this navigation, spanning the footer content width.
The TENKI/Ikko alias is preserved. Next-project destinations follow Home's order:
NUMI, We Live Happily Here, TENKI, Hop! It’s the Chef!, My Bunny, HeadEase,
ReDream Labs, Lollipop, then back to NUMI. A keyboard/touch regression test follows
the complete sequence so no project is trapped in a shorter loop.
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
“Game & UX/UI Designer turning visual ideas into playable experiences
from interface and interaction to Unity.” A **More about me →** button below the
paragraph opens the About page.
Its smaller fluid type, relaxed line height and wider text measure sit beside the
waving character on desktop and stack below it on mobile; the section grows with text.

The project grid is We Live Happily Here, Tenki (the existing Ikko case study),
Hop! It’s the Chef! (formerly Le Frogette) and My Bunny. The carousel contains HeadEase, ReDream Labs and Lollipop,
with captions, arrows, three centered indicators, keyboard/swipe navigation and
image previews. It advances every four seconds while visible, and pauses on hover,
focus or a manual selection. The extra Play/Pause button has been removed to match
the supplied design; reduced motion disables automatic advancement. Active cards
for HeadEase, ReDream Labs and Lollipop open their project page directly,
with the same hover preview and keyboard/touch navigation.
The four grid cards and the active carousel card have a short muted description
below their image. NUMI retains its existing featured description. The carousel
remains secondary, as requested; descriptions have reserved space above its
controls on desktop and phones. The role is consistently **Game & UX/UI Designer**
in the hero, About, footer, Resume introduction and document metadata.
Resume now presents Shani’s supplied CV with working case-study links and PDF viewing/download.
These refinements are on `codex/portfolio-navigation-and-copy`; the prior complete
site remains on `codex/lollipop-case-study-refinement` at `e5590e4`.
Project media frames grow by 2.5% on desktop hover/keyboard focus without changing
layout. Rounded media clips follow each Figma source frame: 14 px for featured/grid
projects and 46.737 px for carousel images at their source dimensions. Radii scale
with each frame, including the smaller carousel neighbors; posters and videos share
one clip during enlargement.
NUMI, We Live Happily Here, Tenki, Hop! It’s the Chef!, My Bunny, HeadEase, ReDream Labs and Lollipop crossfade into muted
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
in a new tab. View Resume opens the completed Resume page with PDF viewing and download.

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
View Resume opens the completed Resume page. About ends with the shared compact signature.

The Resume page (`/#/resume`, also reachable through `resume.html`) presents the
October 2 `ResumeSHANI.pdf` as readable HTML using the portfolio’s Satoshi type,
black/lavender palette and shared content grid. Experience and selected projects
sit beside education, skills and languages on desktop, then stack on phones.
Dates and secondary details use the muted type color. No placeholder sections or
wireframe footer remain. The supplied NUMI, Happily and System 811 prototype links
are preserved; email and phone actions use `mailto:` and `tel:` links.
**Download PDF** saves `ResumeSHANI.pdf` directly, while **Open PDF** opens the same
one-page document in a separate tab. The download is the supplied PDF, preserving
its artwork, fonts and embedded project links; it is not a browser printout of
the page. With Shani’s approval, its email annotation now opens
`mailto:shanishlomov@gmail.com` instead of the visitor’s Gmail inbox. The original
Desktop PDF is untouched; rendered appearance and all other links are unchanged.
Regression checks cover desktop/mobile download bytes and filename,
PDF content type, direct/legacy navigation and both case-study destinations.

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
only on request, with loading/retry, fullscreen and a close button to return
to the case study. Escape exits fullscreen without closing the game; its hint appears
only in fullscreen. Outside fullscreen, Escape remains available to Unity.
Touch-only visitors receive a desktop-play note and the full
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
The Home hero frog slot now uses the rebuilt game recording.

The refined case uses the same 1680px container, stacked hero introduction, Anta
project title and restrained Satoshi text hierarchy as the other refined projects.
The opening joins a current 20-second gameplay preview to four original story
illustrations. Four chapters follow: gameplay decisions, learning the game,
art/iteration, and playing/watching. Three short recordings show warning/attack,
plate destruction and shelter. They share one equal-width row on desktop, with a
short title and explanation directly below each video. On tablets and phones the
three figures stack, keeping each explanation attached to its footage.
The original drawings, refined artwork and earlier/current comparison remain
visible. A short Unity implementation and AI-assistance credit sits beside the
playable game; the separate production section and Timeline screenshot are removed.
Legacy story, level-design, chef, hazards, safety, feedback and iteration anchors
remain usable. The `unity` anchor now leads to the credit beside the game.
The earlier-game comparison uses a clear frame from 1:23 in the original recording,
preserving the complete image and keeping its caption aligned with the rebuilt version.
The rebuilt comparison uses the full 1920 × 1080 frame at 2:47 in the current
game recording, replacing the preparation capture with a black strip along its
left edge. The caption describes the health, warning and shelter visible in that frame.

The source captures and illustrations are self-hosted as lossless WebP in
`assets/hop/`; original files remain available even where repeated examples
have been removed from the reading sequence. Images retain their complete frames.
Text stays native HTML with bounded line lengths. Galleries and media/copy rows
stack on small screens; section numbers, duplicate labels and rules are removed.

The September 29 recording, `סרטון מלא של המשחק החדש.mp4`, supplies the full
12:19 playthrough, the 20-second project preview (2:58–3:18), and three 8–10 second
examples. All retain 1920×1080 and sound/seek/fullscreen/retry controls. They load
only on request and pause other case media when played. The final area groups the
game button with the full recording. Illustration and AI-assisted development
credits preserve the distinction between Shani's design and tool assistance.

The Home hero's frog slot now uses a silent 10-second excerpt (2:58–3:08) from the
same current recording, with a matching poster and versioned filenames. The frog
media fits the updated 16:9 source without the old capture's zoom adjustment.
The other hero clips, order, typography and layout remain unchanged. The Home
project card retains its current-game hover preview.

Work lives on `codex/hop-case-study-refinement`, based on `59c8d14` from
`codex/my-bunny-case-study-refinement`. The prior branch remains the backup;
feature-branch pushes do not deploy the public site.

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

`/#/redream` refines the original Portfolio Figma frame `1541:5256`
(`NNjB6Gey6DtLbO1ZzQV51g`) into a concise case study. The October 1 revision lives
on `codex/redream-case-study-refinement`; the preceding site remains on
`codex/project-hero-consistency`. Home and other project pages are unchanged.

The shared stacked hero presents the project, Shani's Unity and After Effects work,
and a **Watch the full experience** button before the 30-second preview. Body text
uses the same Satoshi typography, heading hierarchy and spacing as the six refined
case studies. The premise and interview-based starting point share one section;
four larger, paired scene stills explain the journey. The final reveal now shows the
actual “Donation confirmed” message, replacing the mismatched System Failure label
and successful-exit still. The repeated narrative banner and tool lists are removed.

Making it presents three excerpts from the original recording: the 23-second dream
scan, 18 seconds of exam interaction and 24 seconds of the classroom-to-back-room
transition. After Effects work is shown in motion; captions identify Shani's work.
The full 4:27 recording and separate personal, partner and shared credits close the
page. Partner lighting and AI-assisted character/voice production stay explicit.
The black/lavender palette, original VR imagery, shared site header and footer remain.

The four chapter links support keyboard, direct links and browser back. Previous
`#research`, `#narrative` and `#vr-design` links still target the relevant content.
Scene and example grids stack below 761px; the featured video stacks below 1024px.
All five films retain 2560 × 1440 playback and load only when requested. Shared
controls support sound, seeking, retry, exclusive playback and offscreen pausing.
The hero action scrolls to the full player and starts from the beginning with sound.
Its original 4:27 audio and separately hosted source remain unchanged. The footer
leads to Lollipop; Home's More Projects card still enters this page directly.
Media provenance is recorded in `frontend/public/assets/README.md`.

### Lollipop case study

`/#/lollipop` presents the original artwork from Portfolio Figma frame `1574:5285`
as five connected areas: introduction, idea and visual language, collection and
campaign, digital and motion, and brand applications with credits. The October 1
refinement lives on `codex/lollipop-case-study-refinement`; the previous complete
site remains on `codex/redream-case-study-refinement` at `8bd4ff1`.

The shared left-stacked hero puts the premise, personal contribution and prototype
button before the large campaign image. Satoshi typography, section spacing and
the 1680px container match the other refined cases. Four chapter links replace
eight separate topics, without numbering or divider rules. Previous `#world`,
`#identity`, `#posters` and `#social` links still reach the corresponding content.
The Home carousel enters the page directly; the project footer leads back to NUMI.

Each of the three candy families pairs its fashion concept with the matching
campaign poster in the same order. All six images retain their complete frames.
Below 1024px the families stack with each concept/poster pair side by side. The
original hero, illustration sheet, collection and application artwork can open
in a native modal with keyboard dismissal, focus restoration and page-scroll
preservation. The flower preview shows the sheet's top strip; enlargement shows
the complete original. The bag and body product receive more space than the candle.

Digital and motion brings together the complete 31.25-second website recording,
the supplied Figma prototype button and the original 19.53-second portrait reel.
The website retains 1442 × 914 at 12 fps; the reel retains 1080 × 1920 at 30 fps
with its original audio. Shared `CaseVideo` controls load media on Play, preserve
the complete frame, pause offscreen and prevent simultaneous playback. The reel
starts with sound and is capped at 360px. Digital columns stack below 1024px;
phone layouts use 20px side margins.

Original artwork is self-hosted in `assets/lollipop/`, with lazy loading below
the hero. Only the logo and two brand type specimens use exported lettering.
Credits distinguish Shani's concept, art direction, illustration, identity,
campaign, motion and digital design from AI-assisted character and fashion
visualization. Playwright covers original media playback and retry, the full
website recording, prototype links, chapter navigation and artwork enlargement.

### HeadEase case study

`/#/headease` presents the wearable and companion-app concept in five parts:
introduction, five-stage app flow, two UX decisions, visual language and an
interactive-prototype area. It uses the original app artwork from Portfolio
frame `1608:5285` and the user's mockups from page `970:590`.

The dark desk composition opens the case as one 1920 × 1080 image. The two-watch
mockup sits beside a compact panel of the original palette, Blender typography
and controls. The tan desktop mockup remains in Figma; its small devices and
repeated measurement screen add little to the main reading sequence.

Nine screen presentations replace the previous 26. The only repeated screen is
the heart-rate reading, used deliberately beside its expanded explanation. The
second UX example pairs symptom reporting with the no-improvement follow-up.
Captions stay beside their corresponding imagery; the case no longer has long
columns of screens opposite isolated introductory text. All original app assets
remain available, and the Figma prototype retains the full flow.

Mockups and individual app screens open in an accessible native dialog with
Escape, a visible close button and restored keyboard focus. Portrait screens can
be scrolled at a readable size. The final area pairs the existing 1:05 app
recording with a prominent prototype button. The video loads on request, includes
playback/seek/fullscreen controls and retry, and pauses when scrolled out of view.
Both prototype buttons open the original Figma flow at `1601:543` in a new tab.

Four sticky chapter links support keyboard navigation, deep links and browser
back. Previous `need`, `system`, `flow`, `dashboard`, `control`, `safety`,
`interfaces` and `final` anchors remain on their corresponding content. The Home
carousel and footer links are unchanged. The page uses the portfolio's existing
Satoshi typography, buttons, rounded media and container. The main flow adapts
from five columns to three and then two; phone artwork retains its 9:20 ratio.

Copy describes an interaction concept. Unsupported generic research/testing
claims and claims of working detection or treatment have been removed; no new
findings or medical outcomes are invented. Asset provenance is documented in
`frontend/public/assets/README.md`.

The refinement is isolated on `codex/headease-case-study-refinement`, based on
`a66531e`. The preceding site remains on `codex/hop-case-study-refinement`.

### My Bunny case study

`/#/my-bunny` presents an educational rabbit-care game, with the adoption app as
context. The refined page follows Shani’s approved sequence: original desk mockup,
three care clips, one interaction/feedback example, original visual artwork and a
single area for the full recording and playable Unity game. The existing
`my-bunny.html` link and the `idea`, `interaction` and `app-game` anchors still work.
The four chapter links are Care stages, Feedback, Visual design and Try it.

The title/contribution layout, 1680px container, Satoshi/Anta type, restrained
captions and rounded media follow NUMI, Happily and TENKI. The hero uses the complete
16:9 mockup from Portfolio Figma slide 23 (`970:994`) on `תיק עבודות חדש - אתר`.
Only presentation navigation was omitted from an export-only copy; the original
remains unchanged. The mockup opens enlarged with keyboard access, Escape, a
visible close control and focus restoration. Original character expressions,
care-item groups and button states from slide 21 (`970:2338`) appear in the visual
section. Provenance is in `frontend/public/assets/README.md`.

The three care stages use 18-, 12- and 12-second clips from the original recording.
The feedback example pairs its six-second clip with concise explanations of the
choice, character reaction and retry. Repeated flow diagrams, entry screens and
separate interaction/UI explanations are consolidated. Portrait films keep their
full frames; the care row scrolls horizontally on phones. Each player starts on
request with original sound, supports pause/seeking/mute/fullscreen/retry and
pauses offscreen. Only one film plays at a time.

**Explore the game** leads to Try it. **Watch Gameplay** brings the 1:08 recording
into view and starts at 0:00 with sound. **Play My Bunny**, beside that recording,
opens the actual Unity game in a portrait dialog, downloaded only on request,
with mouse/touch input, loading/retry, sound, fullscreen and close controls.
Escape returns to the case study and Tab leaves the canvas for the close control.
Closing restores focus and position. The source game retains its seven original
After Effects soundtrack clips and thin black outlines on white instructions.
The separate export workspace and rebuild instructions remain documented in
`frontend/public/games/my-bunny/README.md`. HeadEase is the next project.

The refinement is on `codex/my-bunny-case-study-refinement`, starting from `994c0a4`
on `codex/tenki-case-study-refinement`. The prior site remains available on that
branch. Feature pushes do not deploy the public site.

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
