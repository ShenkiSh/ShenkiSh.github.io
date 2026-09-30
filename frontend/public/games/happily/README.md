# We Live Happily Here — two Unity web games

`index.html?game=personal-space` runs FunFamily's three-stage cart game.
`index.html?game=objects` runs FunFamilyStageTwo's three-round platform game,
including its local simulated partner. These are independent Unity instances;
only the selected game downloads, and closing its dialog releases the iframe.

The portfolio owns `index.html`, `player.css` and `player.js`. The two game folders
contain generated `Build/` files and `build.json` manifests. Keep those artifacts
with the site. Gzip with Unity's decompression fallback needs no custom HTTP headers.
The shared canvas preserves 9:16. The surrounding dialog supplies mute, fullscreen,
close, Escape/Shift+X and a Tab path back to its controls. Retry preserves mute.
The final-summary סיום button emits `family-complete` with the current game slug.
When launched from the app invitation, this returns to the mother's completion
notification and updates the two participants' local counts. Direct case-study
play returns to the case study. Closing early does not emit completion.

Personal Space accepts left/right arrows, A/D, its touch arrows and supported
phone accelerometers. On phones the dialog's Tilt button requests motion access
where required. Motion input needs a secure context and device permission;
touch arrows remain available. Objects accepts arrows/Space and its touch controls.
Physical phone tilt must be checked on a device; desktop emulation cannot verify it.

## Rebuild

Unity 6000.2.8f1 with Web Build Support. Source projects remain at
`~/UnityProjects/GitHub-ShenkiSh/FunFamily` and `FunFamilyStageTwo`.

1. Copy each project's `Assets`, `Packages`, and `ProjectSettings` into its own
   fresh `~/UnityProjects/FunFamilyWebExport` / `FunFamilyStageTwoWebExport`.
   Never overwrite a workspace while a build is running.
2. Copy `frontend/config/unity/FamilyWebBuild.cs.txt` to
   `Assets/Editor/FamilyWebBuild.cs`, and `FamilyWebBridge.cs.txt` to
   `Assets/FamilyWebBridge.cs`. The build script refuses the original projects.
   The bridge exposes only mute control, with no diagnostic or progression API.
   Also copy `FamilyWebCompletion.cs.txt` to `Assets/FamilyWebCompletion.cs` and
   `FamilyWebCompletion.jslib.txt` to `Assets/Plugins/WebGL/FamilyWebCompletion.jslib`.
   The exporter binds this component to exactly one final-summary button
   (`FinishButton` / `FinishGameButton`); it leaves intermediate Continue and
   Play Again actions alone. The JavaScript notification includes no personal data.
   For Objects, copy FunFamily's `Assets/Game/Resources/Fonts/Rubik-Medium.ttf`
   into `Assets/WebExportFonts/Rubik-Medium.ttf` in its export copy. The build
   bundles Hebrew text instead of relying on the desktop's fallback fonts.
   Personal Space uses a 4096-pixel texture override so the original 9600-pixel
   animated cart sheet imports within headless and browser GPU limits.
3. Run for each export directory (replace the project path for game two):

   ```sh
   nice -n 10 '/Applications/Unity/Hub/Editor/6000.2.8f1/Unity.app/Contents/MacOS/Unity' \
     -batchmode -nographics -job-worker-count 2 -background-job-worker-count 2 \
     -buildTarget WebGL -projectPath "$HOME/UnityProjects/FunFamilyWebExport" \
     -executeMethod FamilyWebBuild.Build -quit -logFile /tmp/family-web-build.log
   ```

4. Check `BuildReports/release.json` for `Succeeded` and zero errors. Copy
   `Builds/Web/Build/` and any `StreamingAssets/` into the corresponding
   `personal-space/` or `objects/` directory here. Update its `build.json` with
   the generated loader/data/framework/wasm paths and a version.
5. Test the actual browser builds: instructions, starting, keyboard/touch controls,
   level transitions, completion/restart, sound and closing back to the case study.

Included scenes:

- `Assets/Game/Scenes/GameOne/GameOne.unity`
- `Assets/FunFamilyPart2/Scenes/Game.unity`

Original drawings, water/fog/mud effects, UI, sounds and partner behavior come
from the current saved source scenes. Source project settings and open editors
are not switched to a different platform by this export workflow.
