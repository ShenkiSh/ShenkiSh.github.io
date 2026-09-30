import { useEffect, useRef, type VideoHTMLAttributes } from "react";
import { c } from "./styles";

interface PreviewVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  previewSrc: string;
}

export function PreviewVideo({ previewSrc, className = "", ...props }: PreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    const target = video?.closest<HTMLElement>("[data-preview-target], a");
    if (!video || !target) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let pointed = target.matches(":hover"), focused = target.contains(document.activeElement), visible = true, failed = false, generation = 0;
    const allowed = () => !failed && visible && !document.hidden && !document.querySelector("dialog[open]") && !motion.matches && !connection?.saveData && hover.matches && (pointed || focused);
    function stop(): void {
      generation++;
      if (!video) return;
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
      video.classList.remove(...c("is-playing").split(" "));
    }
    function update(): void {
      if (!video || !allowed()) { stop(); return; }
      if (!video.getAttribute("src")) { video.src = previewSrc; video.load(); }
      const active = ++generation;
      void video.play().then(() => {
        if (generation === active && allowed()) video.classList.add(...c("is-playing").split(" "));
        else if (!allowed()) video.pause();
      }).catch(() => { /* Poster remains visible when autoplay is unavailable. */ });
    }
    const enter = () => { pointed = true; update(); };
    const leave = () => { pointed = false; update(); };
    const focus = () => { focused = true; update(); };
    const blur = (event: FocusEvent) => { if (!target.contains(event.relatedTarget as Node | null)) { focused = false; update(); } };
    const error = () => { failed = true; stop(); };
    target.addEventListener("pointerenter", enter);
    target.addEventListener("pointerleave", leave);
    target.addEventListener("focusin", focus);
    target.addEventListener("focusout", blur);
    video.addEventListener("error", error);
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; update(); });
    observer.observe(target);
    motion.addEventListener("change", update);
    hover.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    document.addEventListener("portfolio:preview", stop);
    return () => {
      stop(); observer.disconnect();
      target.removeEventListener("pointerenter", enter);
      target.removeEventListener("pointerleave", leave);
      target.removeEventListener("focusin", focus);
      target.removeEventListener("focusout", blur);
      video.removeEventListener("error", error);
      motion.removeEventListener("change", update);
      hover.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      document.removeEventListener("portfolio:preview", stop);
    };
  }, [previewSrc]);
  return <video {...props} ref={ref} className={className} muted playsInline loop preload="none" />;
}
