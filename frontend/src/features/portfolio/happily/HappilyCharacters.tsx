import { useEffect, useRef, useState } from "react";
import { happilyAsset } from "./happilyMedia";
import styles from "./HappilyCase.module.scss";

export function HappilyCharacters() {
  const ref = useRef<HTMLDivElement>(null);
  const preference = useRef<boolean | null>(null);
  const sync = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    const update = () => setPlaying(visible && !document.hidden && (preference.current ?? (!motion.matches && !connection?.saveData)));
    sync.current = update;
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); update(); }, { threshold: .2 });
    observer.observe(element);
    const onMotionChange = () => { preference.current = null; update(); };
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); motion.removeEventListener("change", onMotionChange); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={ref} className={styles.characters} data-animations={playing ? "playing" : "paused"}>
    <div className={styles.characterPair}>
      <img src={happilyAsset(`raccoon.${playing ? "gif" : "png"}`)} width="464" height="688" loading="lazy" alt="Animated raccoon family avatar" />
      <img src={happilyAsset(`bear.${playing ? "gif" : "png"}`)} width="464" height="688" loading="lazy" alt="Animated bear family avatar" />
      <button type="button" className={styles.motionControl} aria-label={`${playing ? "Pause" : "Play"} character animations`} onClick={() => { preference.current = !playing; sync.current(); }}>{playing ? "Pause animations" : "Play animations"}</button>
    </div>
    <img className={styles.customization} src={happilyAsset("customization.png")} width="360" height="358" loading="lazy" alt="Character customization with color and accessory options" />
  </div>;
}
