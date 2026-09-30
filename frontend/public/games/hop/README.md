# Hop! It’s the Chef! — playable Unity export

The case-study **Play the game** button mounts this page on desktop. The source game
uses WASD/arrows, Space to jump, E at the towel and Enter for dialogue. The authored
How to Play is available from the original menu. Touch-only visitors can watch the
complete recording instead. The original game art, story, hazards and endings are retained.

The 16:9 canvas fits the available space. The parent dialog owns sound, fullscreen
and close controls. Tab returns from the canvas to the website controls. Shift+X
and the game's Quit action close the dialog; Escape remains an in-game action.
Loading has progress and a retry path. Sound preference survives retry. Closing
unloads the iframe and restores the launching button's focus and scroll position.

`index.html`, `player.css` and `player.js` are portfolio-owned. When updating the
Unity export, replace only `Build/`, optional `StreamingAssets/`, and `build.json`.
Manifest paths are validated before loading. Messages require the same origin and
expected parent/iframe sender. Gzip with Unity's decompression fallback works on a
static server without special compression headers. Serve over HTTP(S), not file URLs.

## Rebuild

1. Copy `Assets`, `Packages` and `ProjectSettings` from the current `Frog-Game`
   project into a **fresh isolated** `~/UnityProjects/HopWebExport` folder. The build
   script refuses other project folder names. Never upgrade or export over the source.
2. Use Unity **6000.3.8f1** with WebGL Build Support. This upgrades packages only in
   the export copy; the original project uses 6000.0.40f1.
3. Copy `frontend/config/unity/HopWebBuild.cs.txt` to `Assets/Editor/HopWebBuild.cs`,
   `HopWebBridge.cs.txt` to `Assets/HopWebBridge.cs`, and `HopWebBridge.jslib.txt` to
   `Assets/Plugins/WebGL/HopWebBridge.jslib` in that copy.
4. Retain `activeInputHandler: 2` (Both) in the copied PlayerSettings: movement
   uses legacy input while the original menu uses InputSystemUIInputModule. In the copied `Assets/General Codes - URP/=UI=/QuitGame.cs`, replace
   `Application.Quit();` with a `UNITY_WEBGL && !UNITY_EDITOR` conditional calling
   `HopWebBridge.CloseToPortfolio()`, retaining `Application.Quit()` in the other branch.
5. Keep editor APIs out of the browser assembly: guard the `using UnityEditor;`
   directives with `#if UNITY_EDITOR` in the copied `TwoD_PlayerScript.cs`,
   `TwoD_PlayerScript_Animations.cs` and the three `EDEN_ErosionTools/Scripts/GPU/`
   scripts (`EDEN_Wind`, `EDEN_Hydraulics`, `EDEN_ErosionTools`). Guard the latter's
   `Undo.RegisterFullObjectHierarchyUndo` and `EditorUtility.SetDirty` calls the same way. Gameplay code is unchanged.
6. In the copied `KitchenPracticeGuide.cs`, set its practice-table render texture
   to `antiAliasing = 1` for `UNITY_WEBGL && !UNITY_EDITOR` before it is created.
   The 2D WebGL render pass uses one sample; retaining the desktop texture's two
   samples causes render-pass errors. Keep its full 1720 × 620 resolution.
7. Assign the existing `Assets/TextMesh Pro/Fonts/LiberationSans.ttf` to the three
   `KitchenStoryUI.hearts` Text components in the copied `TopDown2Frog` scene.
   It embeds the U+2665 heart glyph; the built-in font relied on a desktop fallback
   that is absent in WebGL. Retain their sizes, positions, colors and health logic.
8. Run the export in a separate process:

   ```sh
   nice -n 10 '/Applications/Unity/Hub/Editor/6000.3.8f1/Unity.app/Contents/MacOS/Unity' \
     -batchmode -nographics -job-worker-count 2 -background-job-worker-count 2 \
     -buildTarget WebGL -projectPath "$HOME/UnityProjects/HopWebExport" \
     -executeMethod HopWebBuild.Build -quit -logFile /tmp/hop-web-build.log
   ```

   The build contains `MeinMEnu`, `TimeLineMenu` and `TopDown2Frog` from
   `Assets/[=Main Scenes=]/`. The archived 3D terrain is not in the revised game flow.
   Verify `BuildReports/release.json` reports `Succeeded`.
9. Copy `Builds/Hop/Build/` into this directory. Add the new build hash to all four
   filenames, and set the manifest `loader`, `data`, `framework`, `code` and `version`
   accordingly. Publish the files before the manifest. Unique filenames prevent
   an earlier browser or Unity cache from serving an outdated build.
10. Exercise the actual browser build: menu, tutorial, movement/jump, intro, kitchen,
   checkpoint/retry, endings, sound, fullscreen, close and reopening. Site shell
   tests use a mocked loader and do not replace actual Unity gameplay validation.

For later exports, the existing isolated workspace and its Unity cache can be reused.
Compare the saved source against the export copy, copy every newly changed game file,
and reapply the browser adaptations above wherever a copied file replaces one. Keep
Unity 6.3 package/material conversions confined to the export. Check that the source
has not changed again while the build was running.

Keyboard capture is disabled globally so focus can return to HTML controls, following
[Unity's WebGLInput documentation](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/WebGLInput-captureAllKeyboardInput.html).
No diagnostic or cheat interface is included in the release.

## Release verification

Build `6346174d13e6` was exported on September 30, 2026 from the saved source
scene at 11:05, with zero build errors and zero build warnings. The four browser
files total approximately 94 MiB. This update includes the revised capture text
in the opening narrative and Gaspard's rounded dialogue background. It retains the
previous tutorial boundary/return and ending updates. Browser adaptations remain
confined to the isolated export; the original project's Assets, Packages and
ProjectSettings were verified unchanged during the export.

Actual Chromium WebGL checks at 1440 × 1000 cover the menu, interactive tutorial
and movement, revised opening narrative, entry into the kitchen, three visible
hearts, movement/jump, Gaspard's dialogue and Enter progression, mute controls,
fullscreen, keyboard return to website controls, closing and reopening. No runtime
errors were reported; software-rendered Chromium logged only ReadPixels performance
warnings. A full winning run and ending branches were not replayed for this update.
The supplied recording remains unchanged.

`python3 scripts/check.py` passed, including 156 browser tests and 8 expected
skips. Its Hop game tests validate the browser shell using a mocked loader;
they are separate from the actual Unity checks. Final production builds include
the same four Unity files and manifest as the development site.
