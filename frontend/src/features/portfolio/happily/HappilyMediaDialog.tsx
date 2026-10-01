import { useEffect, useRef } from "react";
import { happilyAsset } from "./happilyMedia";
import styles from "./HappilyMediaDialog.module.scss";

export function HappilyMediaDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => {
      if (!dialog?.contains(video)) video.pause();
    });
    dialog?.showModal();
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="happily-media-title" onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.inner}>
      <div className={styles.heading}>
        <h2 id="happily-media-title">The family app</h2>
        <button type="button" onClick={onClose} aria-label="Close media">Close</button>
      </div>
      <img src={happilyAsset("family-app-mockup.webp")} width="1920" height="1080" alt="The family app in use: a parent choosing players on a phone" />
    </div>
  </dialog>;
}
