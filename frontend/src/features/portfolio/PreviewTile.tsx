import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes } from "react";
import { asset } from "@/shared/utils/asset";
import { PortfolioLink } from "./PortfolioLink";
import { c } from "./styles";
import styles from "./PreviewTile.module.scss";

interface PreviewMedia { src: string; poster: string; type: string; alt: string }
interface PreviewTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  project: string;
  projectPage?: string;
  media: PreviewMedia;
}

export function PreviewTile({ title, project, projectPage, media, children, className, ...props }: PreviewTileProps) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (open) { dialog.current?.showModal(); document.dispatchEvent(new Event("portfolio:preview")); }
    else dialog.current?.close();
  }, [open]);
  return <>
    <button {...props} ref={trigger} type="button" className={`${className ?? ""} ${styles.tile}`} data-preview-target
      aria-haspopup="dialog" aria-label={`Preview ${title} · ${project}`} onClick={() => setOpen(true)}>{children}</button>
    <dialog ref={dialog} className={c("media-dialog")} aria-labelledby={titleId}
      onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}
       onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close();
      }}>
      <div className={c("dialog-heading")}><h2 id={titleId}>{title}</h2><button type="button" className={c("dialog-close")} onClick={() => dialog.current?.close()}>Close</button></div>
      <div className={styles.media}>{open && (media.type === "video"
        ? <video controls playsInline preload="metadata" src={asset(media.src)} poster={asset(media.poster)} aria-label={media.alt} />
        : <img src={asset(media.src)} alt={media.alt} />)}</div>
      <p className={c("caption")}>{project}</p>{projectPage && <PortfolioLink className={c("text-link")} href={projectPage}>View project →</PortfolioLink>}
    </dialog>
  </>;
}
