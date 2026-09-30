import { useEffect, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { PortfolioLink } from "./PortfolioLink";
import { ProjectPreview } from "./ProjectPreview";
import styles from "./MoreWork.module.scss";

const projects = [
  { title: "HeadEase", tags: "UX/UI · Product Design", image: "headease", page: "headease.html", video: "assets/videos/headease-hover-clean.mp4", fit: "contain", background: "#f4f3ec" },
  { title: "ReDream Lab", tags: "Unity · VR Interaction", image: "redream", page: "redream", video: "assets/videos/redream-hover.mp4", fit: "cover", background: "#251f2f" },
  { title: "Lollipop", tags: "Art Direction · Branding", image: "lollipop", page: "lollipop", video: "assets/videos/lollipop-hover-20260916.mp4", fit: "contain", background: "#e25a85" },
] as const;
const wrap = (index: number) => (index + projects.length) % projects.length;

export function MoreWork() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [announcement, setAnnouncement] = useState("");
  const region = useRef<HTMLElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: .2 });
    if (region.current) observer.observe(region.current);
    const visibility = () => setHidden(document.hidden);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (motion.matches) setPlaying(false); };
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", reduce);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); motion.removeEventListener("change", reduce); };
  }, []);
  useEffect(() => {
    if (!playing || !visible || hovered || focused || hidden) return;
    const timer = window.setInterval(() => setCurrent(index => wrap(index + 1)), 4000);
    return () => clearInterval(timer);
  }, [playing, visible, hovered, focused, hidden]);
  function select(index: number): number {
    const next = wrap(index);
    setCurrent(next);
    setPlaying(false);
    setAnnouncement(`${projects[next]?.title}, ${next + 1} of ${projects.length}.`);
    return next;
  }

  return <section id="more-work" ref={region} className={styles.section} aria-labelledby="more-work-title">
    <h2 id="more-work-title">MORE PROJECTS</h2>
    <div className={styles.carousel} aria-roledescription="carousel" aria-label="More projects"
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className={styles.stage}
        onTouchStart={event => { const point = event.touches[0]; touch.current = point ? { x: point.clientX, y: point.clientY } : null; }}
        onTouchEnd={event => {
          const point = event.changedTouches[0];
          if (touch.current && point) {
            const dx = point.clientX - touch.current.x, dy = point.clientY - touch.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) select(current + (dx < 0 ? 1 : -1));
          }
          touch.current = null;
        }} onTouchCancel={() => { touch.current = null; }}>
        {projects.map((project, index) => {
          const distance = wrap(index - current);
          const position = distance === 0 ? "current" : distance === 1 ? "next" : distance === projects.length - 1 ? "previous" : "hidden";
          const src = `assets/home/${project.image}.png`;
          return <article key={project.image} className={styles.slide} data-position={position} inert={position === "hidden"} aria-hidden={position === "hidden"}
            aria-label={`${index + 1} of ${projects.length}: ${project.title}`} aria-roledescription="slide">
            <div className={styles.caption} aria-hidden={position !== "current"}><h3>{project.title}</h3><p>{project.tags}</p></div>
            {position === "current"
              ? <PortfolioLink href={project.page} className={styles.imageButton} aria-label={`View ${project.title} project`}>
                  <ProjectPreview image={src} video={project.video} fit={project.fit} background={project.background} alt={project.title} />
                </PortfolioLink>
              : <button className={styles.imageButton} type="button" onClick={() => select(index)} tabIndex={-1} aria-label={`Show ${project.title}`}>
                <ProjectPreview image={src} alt="" />
              </button>}
          </article>;
        })}
      </div>
      <div className={styles.controls} role="group" aria-label="More project controls">
        <button type="button" onClick={() => select(current - 1)} aria-label="Previous project"><img src={asset("assets/home/carousel-left.svg")} width="28" height="28" alt="" /></button>
        {projects.map((project, index) => <button key={project.image} ref={element => { dots.current[index] = element; }} type="button" className={styles.dot}
          aria-label={`Go to ${project.title}`} aria-current={current === index ? "true" : undefined} onClick={() => select(index)}
          onKeyDown={event => {
            const target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: projects.length - 1 }[event.key];
            if (target === undefined) return;
            event.preventDefault(); dots.current[select(target)]?.focus();
          }}><img src={asset(`assets/home/carousel-dot-${index === current ? "active" : "idle"}.svg`)} width="36" height="36" alt="" /></button>)}
        <button type="button" onClick={() => select(current + 1)} aria-label="Next project"><img src={asset("assets/home/carousel-right.svg")} width="28" height="28" alt="" /></button>
      </div>
      <p className={styles.status} role="status">{announcement}</p>
    </div>
  </section>;
}
