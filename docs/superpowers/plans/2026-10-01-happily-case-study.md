# Happily case study refinement

Approved spec: the user's five-part case-study proposal and request to implement it on a separate branch. Show Shani's product/system thinking through parent/child journeys, cooperative mechanics and original visual work.

## Global constraints
- Work on `codex/happily-case-study-refinement`, based on NUMI commit `f898c40`; preserve the NUMI branch, original backup, homepage and shared components.
- Use the supplied artwork and clean original Figma mockup. No invented art, metrics, testing outcomes or claims of therapeutic effectiveness.
- Clearly distinguish five game concepts from two playable Unity prototypes. Keep the working app, games, reduced-motion handling, deferred media loading, keyboard access and old section anchors.
- Keep typography/colors consistent; use full-width image sequences and aligned captions instead of repeated text/media columns.
- Push the feature branch for review; no merge or deployment.

## Task 1: Reorganize the complete case study

Files: `happily/HappilyCase.tsx`, its SCSS module, `HappilyExperience.tsx`, `HappilyCharacters.tsx`, `happilyMedia.ts`; add a focused media dialog and its styles. Update Happily browser tests, asset provenance and README. Preserve app/game internals.

Produces: five chapters (Idea, Family flow, Game design, Visual language, Try it); large clean photographic hero; four-step parent/child screen sequence; five visible concept worlds; two playable prototypes with recordings; one visible character/customization/reward section; full app film on request.
Consumes: existing `CaseVideo`, chapter navigation, portfolio anchor links, app/game dialogs and original assets. No new dependencies or shared interfaces.

- [x] Write meaningful regression coverage first: full app film stays unmounted until requested, opens from keyboard, closes with Escape, restores focus, pauses other media. Add photo enlargement coverage. Observe failures against the old page.
- [x] Export existing photo/phone layers without presentation controls; remove temporary Figma export frame after download.
- [x] Implement the five-part structure and concise grounded copy, preserving original visuals and functional app/game entry points.
- [x] Adapt existing layout assertions to the approved structure while retaining image-fit, caption alignment, video playback/retry, keyboard and responsive coverage.
- [x] Inspect actual screenshots at desktop and narrow widths, test tablet and meaningful loading/error states, run focused tests and `python3 scripts/check.py`.
- [x] Update documentation, review scoped diff, commit. Obtain one fresh whole-branch review, address important findings, then push the feature branch.

Review focus: original asset fidelity, coherent visual hierarchy, no duplicated story blocks, honest concept/prototype distinction, media only loaded on intent, dialog focus/scroll behavior, intact prototype interactions, untouched NUMI/homepage.

## Verification record

- Focused Playwright: 21 passed, 1 inapplicable mobile caption-alignment check skipped.
- `python3 scripts/check.py`: passed; 39 backend tests and 170 browser tests passed,
  with 10 expected device/layout-specific skips. Lint, type checks, structure checks,
  script tests and production build passed.
- Desktop/tablet/phone visual inspection completed; independent review confirmed
  no horizontal overflow at 320, 390, 768 and 1024px and correct dialog focus/scroll behavior.
- Fresh read-only review of `f898c40..cb8ca2d`: no actionable findings or declined behaviors.
- Homepage, NUMI, prototype internals and Unity builds have no changes in this branch diff.
