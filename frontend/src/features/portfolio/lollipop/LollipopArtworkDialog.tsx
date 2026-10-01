import { useEffect, useRef } from "react";
import { lollipopAsset, type LollipopArtwork } from "./lollipopAssets";
import styles from "./LollipopArtworkDialog.module.scss";

export function LollipopArtworkDialog({ artwork, onClose }: { artwork: LollipopArtwork; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={styles.dialog} data-portrait={artwork.height > artwork.width}
    aria-labelledby="lollipop-artwork-title" onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.heading}>
      <h2 id="lollipop-artwork-title">{artwork.title}</h2>
      <button type="button" onClick={onClose} aria-label="Close artwork">Close</button>
    </div>
    <img src={lollipopAsset(artwork.file)} width={artwork.width} height={artwork.height} alt={artwork.alt} />
  </dialog>;
}
