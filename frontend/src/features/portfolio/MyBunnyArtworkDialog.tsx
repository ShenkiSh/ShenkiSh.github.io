import { useEffect, useRef } from "react";
import { asset } from "@/shared/utils/asset";
import styles from "./MyBunnyArtworkDialog.module.scss";

export function MyBunnyArtworkDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    dialog?.showModal();
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="bunny-artwork-title" onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.heading}>
      <h2 id="bunny-artwork-title">My Bunny</h2>
      <button type="button" onClick={onClose} aria-label="Close artwork">Close</button>
    </div>
    <img src={asset("assets/my-bunny/desk-mockup.png")} width={1920} height={1080} alt="My Bunny on a phone beside a rabbit doll and pencils on a wooden desk" />
  </dialog>;
}
