import { useEffect, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { PortfolioLink } from "./PortfolioLink";
import { resumePdfPath } from "@/shared/config/resume";
import { heroClips } from "./heroClips";
import { c } from "./styles";

function initialPlayback(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !matchMedia("(prefers-reduced-motion: reduce)").matches && !connection?.saveData;
}

export function Hero() {
  const [current, setCurrent] = useState(2);
  const [wantsPlayback, setWantsPlayback] = useState(initialPlayback);
  const [failed, setFailed] = useState<ReadonlySet<number>>(() => new Set());
  const [ready, setReady] = useState<ReadonlySet<number>>(() => new Set());
  const [announcement, setAnnouncement] = useState("");
  const hero = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const visible = useRef(true);
  const selected = useRef(-1);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const clip = heroClips[current];

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const change = (event: MediaQueryListEvent) => { if (event.matches) setWantsPlayback(false); };
    reduced.addEventListener("change", change);
    return () => reduced.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    const element = hero.current;
    const video = videos.current[current];
    if (!element || !video || !clip) return;
    let active = true;
    if (selected.current !== current) {
      if (video.readyState > 0) video.currentTime = 0;
      selected.current = current;
    }
    const allowed = () => active && wantsPlayback && visible.current && !document.hidden && !failed.has(current);
    const sync = () => {
      if (!allowed()) { video.pause(); return; }
      if (!video.getAttribute("src")) {
        video.src = asset(`assets/videos/${clip.project}-hero-${clip.revision}.mp4`);
        video.load();
      }
      if (video.ended) { setCurrent(index => (index + 1) % heroClips.length); return; }
      void video.play().then(() => { if (!allowed()) video.pause(); }).catch((error: unknown) => {
        if (active && error instanceof DOMException && error.name === "NotAllowedError") {
          setWantsPlayback(false);
          setAnnouncement("Press play to start the hero videos.");
        }
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry?.isIntersecting ?? false;
      sync();
    }, { threshold: .1 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [current, clip, wantsPlayback, failed]);

  function select(index: number): number {
    const next = (index + heroClips.length) % heroClips.length;
    setCurrent(next);
    setAnnouncement(`${heroClips[next]?.title ?? "Project"}, video ${next + 1} of ${heroClips.length}.`);
    return next;
  }
  const unavailable = failed.has(current);
  return <section id="home" ref={hero} className={c("reel-hero")} data-project={clip?.project}
    data-playback={unavailable ? "unavailable" : wantsPlayback ? "playing" : "paused"}
    aria-label="Featured projects" aria-roledescription="carousel"
    onTouchStart={event => {
      const first = event.touches[0];
      touch.current = first && event.touches.length === 1 && !(event.target as HTMLElement).closest("a, button")
        ? { x: first.clientX, y: first.clientY } : null;
    }}
    onTouchEnd={event => {
      const end = event.changedTouches[0];
      if (touch.current && end) {
        const dx = end.clientX - touch.current.x, dy = end.clientY - touch.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) select(current + (dx < 0 ? 1 : -1));
      }
      touch.current = null;
    }} onTouchCancel={() => { touch.current = null; }}>
    <div className={c("reel-media")} aria-hidden="true">
      {heroClips.map((item, index) => <div key={item.project} data-project={item.project} className={c(`reel-slide ${current === index ? "is-active" : ""}`)}>
        <img className={c("reel-poster")} src={asset(`assets/images/${item.project}-hero-${item.revision}.jpg`)} alt="" fetchPriority={index === 2 ? "high" : "auto"} />
        <video ref={element => { videos.current[index] = element; }} className={c(`reel-video ${ready.has(index) && !failed.has(index) ? "is-ready" : ""}`)} muted playsInline preload="none" tabIndex={-1}
          onLoadedData={() => setReady(previous => new Set([...previous, index]))}
          onEnded={() => { if (index === current && wantsPlayback && visible.current && !document.hidden) setCurrent((index + 1) % heroClips.length); }}
          onError={() => {
            setFailed(previous => new Set([...previous, index]));
            setAnnouncement(`${item.title} video is unavailable. Choose another project or explore the work below.`);
          }} />
      </div>)}
    </div>
    <div className={c("reel-overlay")} aria-hidden="true" />
    <div className={c("reel-copy container")}><div className={c("reel-identity")}>
      <h1 id="home-title">SHANI<br />SHLOMOV</h1>
      <p className={c("reel-role")}>Game &amp; UX/UI Designer</p>
      <div className={c("reel-actions")}>
        <PortfolioLink href="#work"><span>View Work</span><img src={asset("assets/icons/hero/arrow.svg")} width="29" height="15" alt="" /></PortfolioLink>
        <PortfolioLink className={c("reel-resume")} href={resumePdfPath} target="_blank" rel="noopener noreferrer">Resume</PortfolioLink>
      </div>
    </div></div>
    <button id="reel-toggle" type="button" className={c("reel-playback")} disabled={unavailable}
      aria-label={wantsPlayback ? "Pause hero videos" : "Play hero videos"} onClick={() => setWantsPlayback(value => !value)}>
      {wantsPlayback ? <span className={c("reel-pause-icon")} aria-hidden="true">Ⅱ</span> : <img className={c("reel-play-icon")} src={asset("assets/icons/hero/play-control.svg")} width="98" height="98" alt="" />}
    </button>
    <div className={c("reel-bottom")}><div className={c("reel-dots")} role="group" aria-label="Choose a project video">
      {heroClips.map((item, index) => <button key={item.project} ref={element => { dots.current[index] = element; }} type="button" className={c("reel-dot")}
        aria-label={`Show ${item.title} (${index + 1} of ${heroClips.length})`} aria-current={index === current ? "true" : undefined}
        onClick={() => select(index)} onKeyDown={event => {
          const target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: heroClips.length - 1 }[event.key];
          if (target === undefined) return;
          event.preventDefault(); dots.current[select(target)]?.focus();
        }}><img src={asset(`assets/icons/hero/dot-${index === current ? "active" : "idle"}.svg`)} alt="" width="19" height="19" /></button>)}
    </div></div>
    <p id="reel-status" className={c("sr-only")} role="status">{announcement}</p>
  </section>;
}
