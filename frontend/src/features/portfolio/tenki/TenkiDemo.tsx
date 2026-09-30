import { useEffect, useRef, useState } from "react";
import { tenkiAsset, tenkiPrototype } from "./tenkiAssets";
import styles from "./TenkiInteraction.module.scss";

export function TenkiDemo() {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    const synchronize = () => {
      if (visible && !document.hidden && !motion.matches && !connection?.saveData && !userPaused.current) {
        void element.play().catch(() => { /* Manual playback remains available. */ });
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); synchronize(); }, { threshold: .25 });
    observer.observe(element);
    motion.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    return () => { observer.disconnect(); motion.removeEventListener("change", synchronize); document.removeEventListener("visibilitychange", synchronize); element.pause(); };
  }, []);

  function toggle(): void {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      userPaused.current = false;
      void element.play().catch(() => setFailed(true));
    } else { userPaused.current = true; element.pause(); }
  }

  return <figure className={styles.demo}>
    <video ref={video} className={styles.demoVideo} src={tenkiAsset("app-demo.mp4")} poster={tenkiAsset("app-demo-poster.png")}
      width="560" height="1186" muted loop playsInline preload="none" aria-label="TENKI app demonstration"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    <figcaption className={styles.demoCaption}><span>App in motion</span>{!failed && <button type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} TENKI demo`}>{playing ? "Pause" : "Play"}</button>}</figcaption>
    {failed && <p className={styles.error} role="status">The demo could not play. <a href={tenkiPrototype} target="_blank" rel="noreferrer">Try TENKI in Figma →</a></p>}
  </figure>;
}
