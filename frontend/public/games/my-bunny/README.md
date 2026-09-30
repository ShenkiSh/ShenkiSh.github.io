# My Bunny — playable Unity export

The case-study hero loads this game only after **Play My Bunny** is selected.
The original portrait UI accepts mouse or touch dragging. The surrounding dialog
provides sound, fullscreen and close controls. Sound can be muted during loading
and stays muted after retry. Escape (or Shift+X) closes the game; Tab
from its canvas returns to the dialog controls. Closing releases the iframe and
restores the launching button's focus and the case-study scroll position.

`index.html`, `player.css` and `player.js` belong to the portfolio. Preserve them when
replacing the Unity-generated `Build/` and `build.json`. Keep these generated files
with the public site assets; Vite copies them to the static deployment.
Gzip with Unity decompression fallback works without special server headers.
Serve over HTTP(S), not `file://`.

## Source and rebuild

Source on this Mac: `/Users/shanishlomov/UnityProjects/GitHub-ShenkiSh/MyBunny`.
Unity **6000.3.8f1** with **WebGL Build Support**. The single original scene contains
the entry, Feeding, Cleaning, Playtime, feedback and completion screens:
`Assets/Bunny_Game/My_Bunny_Game/Scenes/MyBunny.unity`.

1. Copy `Assets`, `Packages` and `ProjectSettings` into a separate, fresh
   `/Users/shanishlomov/UnityProjects/MyBunnyWebExport` directory. Do not overwrite
   an export currently being built. Keep the original project untouched.
2. Copy this frontend's `config/unity/MyBunnyWebBuild.cs.txt` to the export's
   `Assets/Editor/MyBunnyWebBuild.cs`. The build script refuses other project names.
3. Build the export in a separate background process:

   ```sh
   nice -n 10 '/Applications/Unity/Hub/Editor/6000.3.8f1/Unity.app/Contents/MacOS/Unity' \
     -batchmode -nographics -job-worker-count 2 -background-job-worker-count 2 \
     -buildTarget WebGL -projectPath '/Users/shanishlomov/UnityProjects/MyBunnyWebExport' \
     -executeMethod MyBunnyWebBuild.Build -quit -logFile /tmp/my-bunny-web-build.log
   ```

   A different project, such as NUMI, can remain open. The export workspace must not
   be open in another editor. Shared CPU and memory can affect compilation speed.
   Confirm `BuildReports/release.json` says `Succeeded` with zero errors.
4. Copy `Builds/MyBunny/Build/` to this directory's `Build/`. In `build.json`, set
   `loader`, `data`, `framework` and `code` to the relative filenames within `Build/`;
   `version` should identify the new build. Do not replace the portfolio's HTML.
5. Test the real browser build: start, incorrect feedback and retry, each correct
   drag, all three stage transitions, completion and return to the app entry.

The source includes `BunnyAudioController`, event cues, and the original soundtrack
clips under `Assets/Audio/MyBunny/`. The After Effects `Movie_002` composition in
`הארנב כולל סאונד.aep` supplies cue choices, relative gains and fade timings. In the
interactive game, clicks, answers, stage changes and completion trigger those cues;
they are not a fixed recording played over the game. A 0.25 master gain leaves
headroom for the reference's +12 dB incorrect-choice cue. White UI text has a
2-canvas-unit black outline; the existing logo outline is retained.

`MyBunnyPresentationSetup.Apply()` reapplies these scene bindings idempotently
before each export. The web build changes player settings only in its isolated
workspace. Original artwork, animations and care interactions are retained.
No diagnostic APIs are exported.
