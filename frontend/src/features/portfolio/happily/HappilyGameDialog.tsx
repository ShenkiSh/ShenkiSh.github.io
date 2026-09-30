import { useEffect, useRef, useState } from "react";
import type { FamilyGame } from "./happilyMedia";
import { NumiMediaIcon } from "../numi/NumiMediaIcon";
import styles from "../MyBunnyGameDialog.module.scss";

export function HappilyGameDialog({ game, onClose, onComplete }: { game: FamilyGame; onClose: () => void; onComplete?: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const ready = useRef(false);
  const completed = useRef(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [muted, setMuted] = useState(false);
  const [tilt, setTilt] = useState<"off" | "on" | "unavailable">("off");
  const canTilt = game.id === "unity-game-01" && navigator.maxTouchPoints > 0;

  async function enableTilt() {
    const gameWindow = frame.current?.contentWindow as (Window & {
      DeviceMotionEvent?: { requestPermission?: () => Promise<string> };
    }) | null;
    try {
      const motion = gameWindow?.DeviceMotionEvent;
      if (!motion || !window.isSecureContext) { setTilt("unavailable"); return; }
      const permission = motion.requestPermission ? await motion.requestPermission() : "granted";
      setTilt(permission === "granted" ? "on" : "unavailable");
      frame.current?.contentDocument?.getElementById("game")?.focus();
    } catch { setTilt("unavailable"); }
  }

  function setGameSound(nextMuted: boolean) {
    setMuted(nextMuted);
    frame.current?.contentWindow?.postMessage({ type: "family-sound", muted: nextMuted }, location.origin);
    frame.current?.contentDocument?.getElementById("game")?.focus();
  }

  useEffect(() => {
    const fromGame = (event: MessageEvent<unknown>) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (typeof data !== "object" || data === null || !("type" in data)) return;
      if (data.type === "family-close") onClose();
      if (data.type === "family-controls") closeButton.current?.focus();
      if (data.type === "family-ready") {
        ready.current = true;
        frame.current?.contentWindow?.postMessage({ type: "family-sound", muted }, location.origin);
      }
      if (data.type === "family-complete" && ready.current && !completed.current && "game" in data
        && data.game === new URL(game.href, location.href).searchParams.get("game")) {
        completed.current = true;
        (onComplete ?? onClose)();
      }
    };
    window.addEventListener("message", fromGame);
    return () => window.removeEventListener("message", fromGame);
  }, [onClose, onComplete, muted, game.href]);

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

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="family-game-title" onCancel={onClose}>
    <div ref={surface} className={styles.surface}>
      <header className={styles.header}>
        <h2 id="family-game-title" className={styles.title}>Play {game.title}</h2>
        <div className={styles.controls}>
          {canTilt && <button type="button" onClick={() => { void enableTilt(); }} aria-label="Enable phone tilt" aria-pressed={tilt === "on"}>Tilt</button>}
          <button type="button" onClick={() => setGameSound(!muted)} aria-label={muted ? "Unmute game" : "Mute game"}><NumiMediaIcon name={muted ? "muted" : "sound"} /></button>
          <button type="button" onClick={() => { void toggleFullscreen(); }} aria-label={fullscreen ? "Exit game fullscreen" : "Game fullscreen"}><NumiMediaIcon name={fullscreen ? "collapse" : "expand"} /></button>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close game"><NumiMediaIcon name="close" /></button>
        </div>
      </header>
      <iframe ref={frame} className={styles.frame} src={game.href} title={`Play ${game.title} in Unity`} allow="autoplay; fullscreen; accelerometer; gyroscope" />
      <footer className={styles.footer}>
        <span>{fullscreenError ? "Fullscreen is unavailable. You can keep playing here." : tilt === "unavailable" ? "Tilt is unavailable. Use the touch arrows." : game.controls}</span>
        <span>Esc to close</span>
      </footer>
    </div>
  </dialog>;
}
