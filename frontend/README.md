# Portfolio frontend

Independent React 19 / TypeScript / Vite application from BuildAppStart-2.

```sh
npm ci
npm run dev
npm run check
npm run test:install
npm test
npm run preview
```

Development runs on 127.0.0.1:5173; built preview on 127.0.0.1:4173; tests own 4175.
`npm run build` produces a self-contained `dist/`. Use `VITE_STATIC_DEPLOYMENT=true`
for GitHub Pages (no API required). Hash routing supports repository subpaths.

Pages compose features; features use shared transport/configuration and neutral
components. `src/features/portfolio/` contains the preserved portfolio design and
interactions. Edit the original Hero playlist in `heroClips.ts`; media is in
`public/assets/`. Project content is authored TSX, with local SCSS Modules.
`src/features/health/` remains operational at `/#/health`, away from the Home content.

The app does not depend on backend source or root scripts. `.env.example` documents
optional public API configuration. Never put credentials in VITE variables.

The TENKI case study lives in `src/features/portfolio/tenki/` at `/#/tenki` (also
reachable through the older `/#/ikko` route). Its Figma-exported artwork is in
`public/assets/tenki/`; provenance is recorded in `public/assets/README.md`.
`tenkiAssets.ts` owns the final Figma prototype destinations. The inline map is a
pan preview, and the silent demo supports explicit pause and reduced motion.
`tests/tenki.spec.ts` covers both routes, uncropped screens, touch/pointer/keyboard
map movement, media controls, load failure and prototype navigation.
