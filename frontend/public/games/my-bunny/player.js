/* The case study mounts this page only after Play My Bunny is selected. */
(() => {
  const canvas = document.getElementById("game");
  const loading = document.getElementById("loading");
  const failure = document.getElementById("failure");
  const progress = document.getElementById("progress");
  let instance;
  let failed = false;
  let muted = false;
  window.addEventListener("message", event => {
    if (event.origin !== location.origin || event.source !== window.parent) return;
    const data = event.data;
    if (typeof data !== "object" || data === null || data.type !== "my-bunny-sound" || typeof data.muted !== "boolean") return;
    muted = data.muted;
    if (instance) instance.SendMessage("MyBunnyAudio", "SetMuted", muted ? "1" : "0");
  });
  window.addEventListener("keydown", event => {
    const close = event.key === "Escape" || (event.code === "KeyX" && event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey);
    const controls = event.key === "Tab" && document.activeElement === canvas;
    if (!close && !controls) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.parent.postMessage({ type: close ? "my-bunny-close" : "my-bunny-controls" }, location.origin);
  }, true);
  const fail = error => {
    failed = true;
    loading.hidden = true;
    failure.hidden = false;
    canvas.hidden = true;
    document.body.dataset.state = "error";
    console.error("My Bunny could not start:", error);
  };
  document.getElementById("retry").addEventListener("click", () => location.reload());
  canvas.addEventListener("pointerdown", () => canvas.focus());
  window.addEventListener("pagehide", () => { if (instance) void instance.Quit(); });
  async function start() {
    document.body.dataset.state = "loading";
    const response = await fetch("build.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Game build could not be loaded.");
    const build = await response.json();
    if (typeof build !== "object" || build === null || typeof build.version !== "string") throw new Error("Invalid build manifest.");
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
      streamingAssetsUrl: new URL("StreamingAssets/", location.href).href,
      companyName: "Shani Shlomov",
      productName: "My Bunny",
      productVersion: build.version,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      showBanner: (message, type) => { if (type === "error") fail(message); },
    }, value => { progress.value = value; });
    if (failed) return;
    instance.SendMessage("MyBunnyAudio", "SetMuted", muted ? "1" : "0");
    loading.hidden = true;
    document.body.dataset.state = "ready";
    window.parent.postMessage({ type: "my-bunny-ready" }, location.origin);
    canvas.focus();
  }
  start().catch(fail);
})();
