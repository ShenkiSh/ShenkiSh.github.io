/* Unity is loaded only when the case-study game dialog mounts this page. */
(() => {
  const canvas = document.getElementById("game");
  const loading = document.getElementById("loading");
  const failure = document.getElementById("failure");
  const progress = document.getElementById("progress");
  let instance;
  let failed = false;
  // Leave fullscreen before handing Escape back to Unity's own menus.
  window.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !window.parent.document.fullscreenElement) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.parent.postMessage({ type: "numi-exit-fullscreen" }, location.origin);
  }, true);
  const fail = error => {
    failed = true;
    loading.hidden = true;
    failure.hidden = false;
    canvas.hidden = true;
    document.body.dataset.state = "error";
    console.error("NUMI could not start:", error);
  };
  document.getElementById("retry").addEventListener("click", () => location.reload());
  canvas.addEventListener("pointerdown", () => canvas.focus());
  window.addEventListener("pagehide", () => { if (instance) void instance.Quit(); });
  async function start() {
    document.body.dataset.state = "loading";
    const response = await fetch("build.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Game build could not be loaded.");
    const build = await response.json();
    for (const key of ["loader", "data", "framework", "code"]) {
      if (typeof build[key] !== "string" || !/^Build\/[a-zA-Z0-9_.-]+$/.test(build[key])) throw new Error("Invalid build manifest.");
    }
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = build.loader;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Game loader is unavailable."));
      document.body.append(script);
    });
    instance = await createUnityInstance(canvas, {
      dataUrl: build.data,
      frameworkUrl: build.framework,
      codeUrl: build.code,
      streamingAssetsUrl: new URL("StreamingAssets/", location.href).href.replace(/\/$/, ""),
      companyName: "Shani Shlomov",
      productName: "NUMI — First Memory",
      productVersion: build.version,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      showBanner: (message, type) => { if (type === "error") fail(message); },
    }, value => { progress.value = value; });
    if (failed) return;
    loading.hidden = true;
    document.body.dataset.state = "ready";
    canvas.focus();
    // Only diagnostic exports contain the probe component or expose its handle.
    if (build.probe === true) window.numiProbeInstance = instance;
  }
  start().catch(fail);
})();
