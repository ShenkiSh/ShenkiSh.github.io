import { useEffect, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { NumiMediaIcon } from "../numi/NumiMediaIcon";
import styles from "./HopGameDialog.module.scss";

export function HopGameDialog({ onClose, onWatch }: { onClose: () => void; onWatch: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [touchOnly] = useState(() => matchMedia("(hover: none) and (pointer: coarse)").matches);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [muted, setMuted] = useState(false);

  function focusGame() { frame.current?.contentDocument?.getElementById("game")?.focus(); }
  function setGameSound(next: boolean) {
    setMuted(next);
    frame.current?.contentWindow?.postMessage({ type: "hop-sound", muted: next }, location.origin);
    focusGame();
  }
  useEffect(() => {
    const fromGame = (event: MessageEvent<unknown>) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (typeof data !== "object" || data === null || !("type" in data)) return;
      if (data.type === "hop-close") onClose();
      if (data.type === "hop-controls") closeButton.current?.focus();
      if (data.type === "hop-ready") frame.current?.contentWindow?.postMessage({ type: "hop-sound", muted }, location.origin);
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
    const changed = () => { setFullscreen(document.fullscreenElement === fullscreenSurface); focusGame(); };
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
    } catch { setFullscreenError(true); }
  }
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="hop-game-title" onCancel={onClose}>
    <div ref={surface} className={styles.surface}>
      <header className={styles.header}>
        <h2 id="hop-game-title">Hop! It’s the Chef!</h2>
        <div className={styles.controls}>
          {!touchOnly && <>
            <button type="button" onClick={() => setGameSound(!muted)} aria-label={muted ? "Unmute game" : "Mute game"}><NumiMediaIcon name={muted ? "muted" : "sound"} /></button>
            <button type="button" onClick={() => { void toggleFullscreen(); }} aria-label={fullscreen ? "Exit game fullscreen" : "Game fullscreen"}><NumiMediaIcon name={fullscreen ? "collapse" : "expand"} /></button>
          </>}
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close game"><NumiMediaIcon name="close" /></button>
        </div>
      </header>
      {touchOnly ? <div className={styles.mobileMessage}>
        <p>Play on a computer with a keyboard.</p>
        <button type="button" onClick={onWatch}>Watch the full playthrough</button>
      </div> : <iframe ref={frame} className={styles.frame} src={asset("games/hop/index.html")} title="Play Hop! It’s the Chef! in Unity" allow="autoplay; fullscreen" />}
      <footer className={styles.footer}>
        <span>{fullscreenError ? "Fullscreen is unavailable. You can keep playing here." : "WASD / arrows: move · Space: jump · E: use towel · Enter: dialogue"}</span>
        <span>{touchOnly ? "Close to return to the case study" : "Esc: in-game menu · Tab: website controls · Shift + X: close"}</span>
      </footer>
    </div>
  </dialog>;
}
