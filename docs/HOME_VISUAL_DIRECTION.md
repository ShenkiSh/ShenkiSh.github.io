> Historical visual-direction notes, preserved from the static version. Paths below refer to that version. The active implementation is documented in the root README.

# Home visual direction — focused art-direction refinement

The current Homepage is a review prototype. Preserve the current architecture,
project order, rotating Hero composition, and left-aligned project name beneath
the introduction. Do not propagate these styles to case studies before review.

## Visual system

- Instrument Serif 400 for major headings, Syne 700 project titles, Manrope body/UI. Self-hosted fonts and OFL licenses
  in assets/fonts. Navigation is 16px; project metadata 15px on desktop and 14px
  on narrow screens. The name/role/three-discipline hierarchy remains intact.
- Neutral near-black foundation #18181b with board/About #1a1a1d. Local ambient
  washes have 4–7% alpha and fade back to neutral. Text #f2f0e9; muted #b6b0bd.
  Header/footer rules remain; full-width section dividers are removed.
- Active-project atmosphere: muted violet for NUMI, blue for We Live Happily Here,
  muted warmth for Ikko, earthy green for Le Frogette. Existing data-project
  attributes drive CSS; the site does not require another animation/state loop.
- Selected Work remains 64/36 then 36/64. NUMI has the largest media/title;
  We Live Happily Here is offset and smaller; the second row is compact.
  Controlled screen and 2D/UI detail overflow connects the media to its surroundings.
- Playground contains six real pieces with varied proportions, including the NUMI
  motion excerpt, character crop, selection UI, actual Ikko interaction icons,
  results UI and map screen. The wide world and selection UI are the main focal
  pieces, with an isolated icon strip and staggered smaller details. DOM/tab order
  follows visual reading order. No filters or masonry.
- About adds Visual Communication at HIT and an illustration/storytelling approach,
  grounded in the supplied Desktop ResumeShaniShlomov.pdf. It does not claim graduation
  (the CV lists 2022–Present). The small original My Bunny detail remains.
- HeadEase remains pending: no final UI/product media was located in the supplied
  project files. Shani has been asked for the asset folder or Figma link. Do not
  invent finished screens. Footer structure and existing destinations are retained.
- Homepage anchor offsets use the measured sticky-header height plus 24px; CSS
  fallbacks cover no-JS use. This includes section, heading, and gallery focus targets.
- Existing muted hover/focus video, reset on leave, touch poster fallback,
  reduced-motion handling, carousel controls and preview dialog are retained.
  Motion is limited to small, short transitions.

## Current concept references

Base directory:
/Users/shanishlomov/.codex/generated_images/01a080b6-b12c-7bf0-be5c-82e3d4d83f3c/

- Hero: exec-b2e14f14-d963-4886-8d41-c683842fc333.png
- Selected Work: exec-b95bee0f-7a70-427c-af3f-c0c7558f253b.png
- Design board: exec-afc86f2b-a0f2-4d70-83c9-73d93fcca184.png
- Closing sections: exec-d5a4a084-1dda-4c6f-b554-3506b82eb461.png

These are composition references, not project assets. Correct generated image/source
mismatches, omit invented HeadEase/About claims and extra slogans, and preserve
actual artwork. The site uses only Shani's supplied media; the icon strip is a
frame crop documented in assets/README.md. The rejected light-background concept
is not part of this direction.

The previous direction is backed up at /tmp/shani-home-refinement/before/.
This focused pass follows the supplied art-direction feedback rather than a new
page concept. Browser captures are in Desktop/Portfolio Homepage Review/Art direction refinement.
Case-study HTML, shared CSS, and shared JavaScript remain unchanged.
