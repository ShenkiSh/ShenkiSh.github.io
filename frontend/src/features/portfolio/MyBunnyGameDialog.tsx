import { useEffect, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { NumiMediaIcon } from "./numi/NumiMediaIcon";
import styles from "./MyBunnyGameDialog.module.scss";

export function MyBunnyGameDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [muted, setMuted] = useState(false);

  function setGameSound(nextMuted: boolean) {
    setMuted(nextMuted);
    frame.current?.contentWindow?.postMessage({ type: "my-bunny-sound", muted: nextMuted }, location.origin);
    frame.current?.contentDocument?.getElementById("game")?.focus();
  }

  useEffect(() => {
    const fromGame = (event: MessageEvent<unknown>) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (typeof data !== "object" || data === null || !("type" in data)) return;
      if (data.type === "my-bunny-close") onClose();
      if (data.type === "my-bunny-controls") closeButton.current?.focus();
      if (data.type === "my-bunny-ready") frame.current?.contentWindow?.postMessage({ type: "my-bunny-sound", muted }, location.origin);
    };
    window.addEventListener("message", fromGame);
    return () => window.removeEventListener("message", fromGame);
  }, [onClose, muted]);

  useEffect(() => {
    const element = dialog.current;
    const fullscreenSurface = surface.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    element?.showModal();
    document.body.style.overflow = "hidden";
    const changed = () => {
      setFullscreen(document.fullscreenElement === fullscreenSurface);
    };
    document.addEventListener("fullscreenchange", changed);
    return () => {
      document.removeEventListener("fullscreenchange", changed);
      if (document.fullscreenElement === fullscreenSurface) void document.exitFullscreen().catch(() => undefined);
      element?.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  async function toggleFullscreen() {
    setFullscreenError(false);
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await surface.current?.requestFullscreen();
      frame.current?.contentDocument?.getElementById("game")?.focus();
    } catch { setFullscreenError(true); }
  }

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="my-bunny-game-title" onCancel={onClose}>
    <div ref={surface} className={styles.surface}>
      <header className={styles.header}>
        <h2 id="my-bunny-game-title" className={styles.title}>Play My Bunny</h2>
        <div className={styles.controls}>
          <button type="button" onClick={() => setGameSound(!muted)} aria-label={muted ? "Unmute game" : "Mute game"}><NumiMediaIcon name={muted ? "muted" : "sound"} /></button>
          <button type="button" onClick={() => { void toggleFullscreen(); }} aria-label={fullscreen ? "Exit game fullscreen" : "Game fullscreen"}><NumiMediaIcon name={fullscreen ? "collapse" : "expand"} /></button>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close game"><NumiMediaIcon name="close" /></button>
        </div>
      </header>
      <iframe ref={frame} className={styles.frame} src={asset("games/my-bunny/index.html")} title="Play My Bunny in Unity" allow="autoplay; fullscreen" />
      <footer className={styles.footer}>
        <span>{fullscreenError ? "Fullscreen is unavailable. You can keep playing here." : "Drag an item to Bunny · Mouse or touch"}</span>
        <span>Esc to close</span>
      </footer>
    </div>
  </dialog>;
}
