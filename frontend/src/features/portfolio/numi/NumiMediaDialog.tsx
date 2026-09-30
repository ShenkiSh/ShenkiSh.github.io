import { useEffect, useRef } from "react";
import { NumiVideo } from "./NumiVideo";
import { NumiMediaIcon } from "./NumiMediaIcon";
import { numiAsset, type NumiFilm } from "./numiMedia";
import styles from "./NumiCase.module.scss";

export type NumiOverlay = { kind: "film"; film: NumiFilm } | { kind: "image"; file: string; title: string };

export function NumiMediaDialog({ media, onClose }: { media: NumiOverlay; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => {
      if (!dialog?.contains(video)) video.pause();
    });
    dialog?.showModal();
    // Start after entering the top layer; a hidden dialog can suppress autoplay.
    void dialog?.querySelector<HTMLVideoElement>("video")?.play().catch(() => {
      // The play button remains available if the browser blocks playback.
    });
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);
  const title = media.kind === "film" ? media.film.title : media.title;
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="numi-player-title"
    onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.dialogInner}>
      <div className={styles.dialogHeader}>
        <h2 id="numi-player-title">{title}</h2>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close media"><NumiMediaIcon name="close" /></button>
      </div>
      {media.kind === "film" ? <NumiVideo film={media.film} autoPlay /> : <img className={styles.dialogImage} src={numiAsset(media.file)} alt={title} />}
    </div>
  </dialog>;
}
