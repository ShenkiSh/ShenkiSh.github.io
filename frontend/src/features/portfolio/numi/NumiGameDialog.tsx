import { useEffect, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { NumiMediaIcon } from "./NumiMediaIcon";
import styles from "./NumiGame.module.scss";

interface NumiGameDialogProps {
  onClose: () => void;
  onWatch: () => void;
}

export function NumiGameDialog({ onClose, onWatch }: NumiGameDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [touchOnly] = useState(() => window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);

  useEffect(() => {
    const closeFromGame = (event: MessageEvent<unknown>) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (typeof data === "object" && data !== null && "type" in data && data.type === "numi-close") onClose();
    };
    window.addEventListener("message", closeFromGame);
    return () => window.removeEventListener("message", closeFromGame);
  }, [onClose]);

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
      frame.current?.contentDocument?.getElementById("game")?.focus();
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
    } catch { setFullscreenError(true); }
  }

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="numi-game-title" onCancel={onClose}>
    <div ref={surface} className={styles.surface}>
    <header className={styles.header}>
      <h2 id="numi-game-title">NUMI · First Memory</h2>
      <div className={styles.controls}>
        {!touchOnly && <button type="button" onClick={() => { void toggleFullscreen(); }} aria-label={fullscreen ? "Exit game fullscreen" : "Game fullscreen"}><NumiMediaIcon name={fullscreen ? "collapse" : "expand"} /></button>}
        <button type="button" onClick={onClose} aria-label="Close game"><NumiMediaIcon name="close" /></button>
      </div>
    </header>
    {touchOnly ? <div className={styles.mobileMessage}>
      <p>Play on a computer with a keyboard or&nbsp;controller.</p>
      <button type="button" onClick={onWatch}>Watch the full playthrough <span aria-hidden="true">→</span></button>
    </div> : <iframe ref={frame} className={styles.frame} src={asset("games/numi/index.html")} title="Play NUMI — First Memory" allow="autoplay; fullscreen; gamepad" />}
    <footer className={styles.footer}>
      <span>{fullscreenError ? "Fullscreen is unavailable. You can keep playing here." : "Keyboard or controller · Headphones recommended"}</span>
      <span>{touchOnly ? "Close to return to the case study" : "Esc: pause · Shift + X: close"}</span>
    </footer>
    </div>
  </dialog>;
}
