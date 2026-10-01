import { useEffect, useRef } from "react";
import { tenkiAsset, type TenkiArtwork } from "./tenkiAssets";
import styles from "./TenkiArtworkDialog.module.scss";

export function TenkiArtworkDialog({ artwork, onClose }: { artwork: TenkiArtwork; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    dialog?.showModal();
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={styles.dialog} data-portrait={artwork.height > artwork.width} aria-labelledby="tenki-artwork-title" onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.heading}>
      <h2 id="tenki-artwork-title">{artwork.title}</h2>
      <button type="button" onClick={onClose} aria-label="Close artwork">Close</button>
    </div>
    <img src={tenkiAsset(artwork.file)} width={artwork.width} height={artwork.height} alt={artwork.alt} />
  </dialog>;
}
