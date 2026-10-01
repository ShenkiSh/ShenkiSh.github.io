import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { NumiVideo } from "./NumiVideo";
import { NumiMediaIcon } from "./NumiMediaIcon";
import { numiAsset, type NumiFilm } from "./numiMedia";
import { eventPhotos } from "./numiEventPhotos";
import styles from "./NumiCase.module.scss";
import galleryStyles from "./NumiShowcase.module.scss";

export type NumiOverlay = { kind: "film"; film: NumiFilm } | { kind: "gallery"; index: number };

export function NumiMediaDialog({ media, onClose }: { media: NumiOverlay; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [photoIndex, setPhotoIndex] = useState(media.kind === "gallery" ? media.index : 0);
  const [failed, setFailed] = useState(false);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
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
  useEffect(() => {
    const thumbnail = thumbnails.current[photoIndex];
    const strip = thumbnail?.parentElement;
    if (!thumbnail || !strip) return;
    const item = thumbnail.getBoundingClientRect();
    const viewport = strip.getBoundingClientRect();
    // Keep the active thumbnail in view without scrolling the dialog's close control away.
    const left = item.left < viewport.left ? item.left - viewport.left : item.right > viewport.right ? item.right - viewport.right : 0;
    strip.scrollBy({ left, behavior: "instant" });
  }, [photoIndex]);
  function selectPhoto(index: number): void {
    setPhotoIndex((index + eventPhotos.length) % eventPhotos.length);
    setFailed(false);
  }
  function navigate(event: KeyboardEvent<HTMLDialogElement>): void {
    if (media.kind !== "gallery" || event.altKey || event.ctrlKey || event.metaKey) return;
    const next = { ArrowLeft: photoIndex - 1, ArrowRight: photoIndex + 1, Home: 0, End: eventPhotos.length - 1 }[event.key];
    if (next !== undefined) { event.preventDefault(); selectPhoto(next); }
  }
  function startSwipe(event: PointerEvent<HTMLDivElement>): void {
    if (event.pointerType !== "touch") return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function endSwipe(event: PointerEvent<HTMLDivElement>): void {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) > 48 && Math.abs(distance) > Math.abs(event.clientY - start.y) * 1.2) selectPhoto(photoIndex + (distance < 0 ? 1 : -1));
  }
  const photo = eventPhotos[photoIndex]!;
  const title = media.kind === "film" ? media.film.title : "NUMI at Animatheque";
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="numi-player-title"
    onCancel={onClose} onKeyDown={navigate} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.dialogInner}>
      <div className={styles.dialogHeader}>
        <h2 id="numi-player-title">{title}</h2>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close media"><NumiMediaIcon name="close" /></button>
      </div>
      {media.kind === "film" ? <NumiVideo film={media.film} autoPlay /> : <>
        <figure className={galleryStyles.galleryFigure}>
          <div className={galleryStyles.galleryCanvas} onPointerDown={startSwipe} onPointerUp={endSwipe} onPointerCancel={() => { swipeStart.current = null; }}>
            {failed ? <div className={galleryStyles.galleryError} role="alert"><p>This photo could not load.</p><button type="button" onClick={() => setFailed(false)}>Try again</button></div>
              : <img src={numiAsset(photo.file)} alt={photo.caption} draggable={false} onError={() => setFailed(true)} />}
          </div>
          <figcaption className={galleryStyles.galleryCaption} aria-live="polite">{photo.caption}<span>{photoIndex + 1} / {eventPhotos.length}</span></figcaption>
        </figure>
        <div className={galleryStyles.galleryNavigation}>
          <button type="button" className={galleryStyles.galleryStep} aria-label="Previous photo" onClick={() => selectPhoto(photoIndex - 1)}>‹</button>
          <div className={galleryStyles.thumbnails} aria-label="Choose an event photo">
            {eventPhotos.map((item, index) => <button type="button" key={item.file} ref={element => { thumbnails.current[index] = element; }} aria-label={`Show event photo ${index + 1} of ${eventPhotos.length}`} aria-current={index === photoIndex ? "true" : undefined} onClick={() => selectPhoto(index)}>
              <img src={numiAsset(item.thumb)} alt="" width="320" height="200" />
            </button>)}
          </div>
          <button type="button" className={galleryStyles.galleryStep} aria-label="Next photo" onClick={() => selectPhoto(photoIndex + 1)}>›</button>
        </div>
      </>}
    </div>
  </dialog>;
}
