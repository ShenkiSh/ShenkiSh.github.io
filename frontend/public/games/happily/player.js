/* Only mounted after the visitor chooses a game. Each dialog owns one Unity instance. */
(() => {
  const canvas = document.getElementById("game");
  const loading = document.getElementById("loading");
  const failure = document.getElementById("failure");
  const progress = document.getElementById("progress");
  const slug = new URLSearchParams(location.search).get("game");
  const titles = { "personal-space": "Personal Space", objects: "Objects" };
  let instance;
  let failed = false;
  let muted = false;
  const notify = type => window.parent.postMessage({ type }, location.origin);
  window.addEventListener("message", event => {
    if (event.origin !== location.origin || event.source !== window.parent) return;
    const data = event.data;
    if (typeof data !== "object" || data === null || data.type !== "family-sound" || typeof data.muted !== "boolean") return;
    muted = data.muted;
    if (instance) instance.SendMessage("FamilyWebBridge", "SetMuted", muted ? "1" : "0");
  });
  window.addEventListener("keydown", event => {
    const close = event.key === "Escape" || (event.code === "KeyX" && event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey);
    const controls = event.key === "Tab" && document.activeElement === canvas;
    if (!close && !controls) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    notify(close ? "family-close" : "family-controls");
  }, true);
  const fail = error => {
    failed = true;
    loading.hidden = true;
    failure.hidden = false;
    canvas.hidden = true;
    document.body.dataset.state = "error";
    console.error("Family game could not start:", error);
  };
  document.getElementById("retry").addEventListener("click", () => location.reload());
  canvas.addEventListener("pointerdown", () => canvas.focus());
  window.addEventListener("pagehide", () => { if (instance) void instance.Quit(); });
  async function start() {
    if (!Object.hasOwn(titles, slug)) throw new Error("Unknown game.");
    document.getElementById("title").textContent = titles[slug];
    document.title = `Play ${titles[slug]}`;
    document.body.dataset.state = "loading";
    const base = new URL(`${slug}/`, location.href);
    const response = await fetch(new URL("build.json", base), { cache: "no-cache" });
    if (!response.ok) throw new Error("Game build could not be loaded.");
    const build = await response.json();
    if (typeof build !== "object" || build === null || typeof build.version !== "string") throw new Error("Invalid build manifest.");
    for (const key of ["loader", "data", "framework", "code"]) {
      if (typeof build[key] !== "string" || !/^Build\/[a-zA-Z0-9_.-]+$/.test(build[key])) throw new Error("Invalid build manifest.");
    }
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(build.loader, base).href;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Game loader is unavailable."));
      document.body.append(script);
    });
    instance = await createUnityInstance(canvas, {
      dataUrl: new URL(build.data, base).href,
      frameworkUrl: new URL(build.framework, base).href,
      codeUrl: new URL(build.code, base).href,
      streamingAssetsUrl: new URL("StreamingAssets/", base).href,
      companyName: "Shani Shlomov",
      productName: titles[slug],
      productVersion: build.version,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      showBanner: (message, type) => { if (type === "error") fail(message); },
    }, value => { progress.value = value; });
    if (failed) return;
    instance.SendMessage("FamilyWebBridge", "SetMuted", muted ? "1" : "0");
    loading.hidden = true;
    document.body.dataset.state = "ready";
    notify("family-ready");
    canvas.focus();
  }
  start().catch(fail);
})();
