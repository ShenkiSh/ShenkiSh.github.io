import { useEffect, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import styles from "./AnimatedCharacter.module.scss";

type AnimatedCharacterProps = { videoPath?: string; posterPath?: string };

export function AnimatedCharacter({
  videoPath = "assets/home/shani-character.webm",
  posterPath = "assets/home/character-poster.png",
}: AnimatedCharacterProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || failed) return;
    let visible = false, active = true;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (!active || !visible || !playing || document.hidden) { video.pause(); return; }
      if (!video.getAttribute("src")) video.src = asset(videoPath);
      void video.play().then(() => { if (!active || !visible || !playing || document.hidden) video.pause(); }).catch(() => { /* Keep the transparent poster if autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; sync(); });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    const reduce = () => { if (motion.matches) setPlaying(false); };
    motion.addEventListener("change", reduce);
    return () => { active = false; observer.disconnect(); video.pause(); document.removeEventListener("visibilitychange", sync); motion.removeEventListener("change", reduce); };
  }, [playing, failed, videoPath]);
  return <div className={styles.character}>
    <img src={asset(posterPath)} alt="" width="512" height="846" loading="lazy" hidden={ready && !failed} />
    {!failed && <video ref={ref} muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1} onLoadedData={() => setReady(true)} onError={() => setFailed(true)} />}
    {!failed && <button type="button" className={styles.animationToggle} onClick={() => setPlaying(value => !value)} aria-label={playing ? "Pause character animation" : "Play character animation"}>{playing ? "Ⅱ" : "▶"}</button>}
  </div>;
}
