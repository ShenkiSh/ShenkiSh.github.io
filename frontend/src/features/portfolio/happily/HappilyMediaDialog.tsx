import { useEffect, useRef } from "react";
import { CaseVideo } from "../CaseVideo";
import { appFlowFilm, happilyAsset } from "./happilyMedia";
import styles from "./HappilyMediaDialog.module.scss";

export type HappilyMedia = "photo" | "film";

export function HappilyMediaDialog({ media, onClose }: { media: HappilyMedia; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => {
      if (!dialog?.contains(video)) video.pause();
    });
    dialog?.showModal();
    void dialog?.querySelector<HTMLVideoElement>("video")?.play().catch(() => { /* Play remains available. */ });
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="happily-media-title" onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.inner}>
      <div className={styles.heading}>
        <h2 id="happily-media-title">{media === "film" ? "The full app flow" : "The family app"}</h2>
        <button type="button" onClick={onClose} aria-label="Close media">Close</button>
      </div>
      {media === "film" ? <CaseVideo film={appFlowFilm} defaultMuted={false} />
        : <img src={happilyAsset("family-app-mockup.webp")} width="1920" height="1080" alt="The family app in use: a parent choosing players on a phone" />}
    </div>
  </dialog>;
}
