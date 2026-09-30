import { useEffect, useImperativeHandle, useRef, useState, type CSSProperties, type Ref } from "react";
import { NumiMediaIcon } from "./numi/NumiMediaIcon";
import { NumiPlayBadge } from "./numi/NumiPlayBadge";
import styles from "./CaseVideo.module.scss";

function timeLabel(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export interface CaseFilm {
  src: string;
  poster: string;
  title: string;
  duration: string;
}

export interface CaseVideoHandle { playFrom: (seconds: number) => void }
interface CaseVideoProps {
  film: CaseFilm;
  autoPlay?: boolean;
  posterLabel?: string;
  aspectRatio?: string;
  startAt?: number;
  defaultMuted?: boolean;
  ref?: Ref<CaseVideoHandle>;
}

export function CaseVideo({ film, autoPlay = false, posterLabel, aspectRatio = "16 / 9", startAt = 0, defaultMuted = true, ref }: CaseVideoProps) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const hideControls = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(defaultMuted);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      const entry = entries.at(-1);
      if (!entry || entry.isIntersecting) return;
      // A Watch button may have scrolled the player back into view since this entry was queued.
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight || bounds.right <= 0 || bounds.left >= window.innerWidth) element.pause();
    });
    const onFullscreen = () => setFullscreen(document.fullscreenElement === frame.current);
    const pauseWhenHidden = () => { if (document.hidden) element.pause(); };
    observer.observe(element);
    document.addEventListener("fullscreenchange", onFullscreen);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    if (autoPlay) void element.play().catch(() => { /* The play control remains available. */ });
    return () => {
      observer.disconnect(); element.pause(); clearTimeout(hideControls.current);
      document.removeEventListener("fullscreenchange", onFullscreen);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [autoPlay]);

  function reveal(): void {
    setVisible(true);
    clearTimeout(hideControls.current);
    hideControls.current = setTimeout(() => setVisible(false), 2400);
  }
  async function play(from?: number): Promise<void> {
    const element = video.current;
    if (!element) return;
    setNotice("");
    if (from !== undefined || !started || element.ended) {
      pendingSeek.current = Math.max(0, from ?? startAt);
      if (element.readyState >= 1) applyPendingSeek(element);
    }
    try { await element.play(); }
    catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") setNotice("Press play to start the video.");
    }
  }
  function applyPendingSeek(element: HTMLVideoElement): void {
    if (pendingSeek.current === null || !Number.isFinite(element.duration)) return;
    element.currentTime = Math.min(pendingSeek.current, Math.max(0, element.duration - .1));
    pendingSeek.current = null;
  }
  useImperativeHandle(ref, () => ({ playFrom: seconds => {
    frame.current?.scrollIntoView({ block: "center", behavior: "instant" });
    void play(seconds);
  } }));
  function toggle(): void {
    if (video.current?.paused) void play();
    else video.current?.pause();
    reveal();
  }
  function retry(): void {
    setFailed(false); setWaiting(true); video.current?.load(); void play();
  }
  async function toggleFullscreen(): Promise<void> {
    try {
      if (document.fullscreenElement === frame.current) await document.exitFullscreen();
      else if (frame.current?.requestFullscreen) await frame.current.requestFullscreen();
      else {
        const native: (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null = video.current;
        if (native?.webkitEnterFullscreen) native.webkitEnterFullscreen();
        else setNotice("Fullscreen is unavailable in this browser.");
      }
      reveal();
    } catch { setNotice("Fullscreen is unavailable in this browser."); }
  }

  return <div ref={frame} className={styles.player} style={{ "--case-video-ratio": aspectRatio } as CSSProperties} role="group" aria-label={`${film.title} video player`}
    data-playing={playing} data-started={started} data-controls={visible || !playing}
    onPointerMove={reveal} onPointerLeave={event => { if (event.pointerType === "mouse") setVisible(false); }}>
    <video ref={video} playsInline muted={defaultMuted} autoPlay={autoPlay} preload="none"
      poster={film.poster} src={film.src} aria-label={film.title}
      onPlay={() => { setStarted(true); setPlaying(true); reveal(); }}
      onPause={() => { setPlaying(false); setWaiting(false); }} onEnded={() => setPlaying(false)}
      onWaiting={() => setWaiting(true)} onPlaying={() => setWaiting(false)}
      onCanPlay={() => setWaiting(false)} onError={() => { setFailed(true); setWaiting(false); }}
      onLoadedMetadata={event => {
        const element = event.currentTarget;
        setDuration(Number.isFinite(element.duration) ? element.duration : 0);
        applyPendingSeek(element);
      }}
      onTimeUpdate={event => setCurrent(event.currentTarget.currentTime)}
      onVolumeChange={event => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)} />
    {!failed && <button className={`${styles.surface} ${posterLabel ? styles.posterAction : ""}`} type="button"
      aria-label={playing ? `Show controls for ${film.title}` : `${started ? "Resume" : "Play"} ${film.title}`}
      onClick={() => { reveal(); if (!playing) void play(); }}>
      {!started && <NumiPlayBadge duration={film.duration} label={posterLabel} />}
    </button>}
    {started && !failed && <div className={styles.controls}>
      <input className={styles.seek} type="range" min="0" max={duration || 1} step="0.1" value={Math.min(current, duration || 1)}
        style={{ "--numi-progress": `${duration ? current / duration * 100 : 0}%` } as CSSProperties}
        aria-label="Seek video" aria-valuetext={`${timeLabel(current)} of ${duration ? timeLabel(duration) : film.duration}`}
        disabled={!duration} onChange={event => { const next = Number(event.target.value); setCurrent(next); if (video.current) video.current.currentTime = next; reveal(); }} />
      <div className={styles.controlRow}>
        <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={toggle}><NumiMediaIcon name={playing ? "pause" : "play"} /></button>
        <span className={styles.time}>{timeLabel(current)} <span>/ {duration ? timeLabel(duration) : film.duration}</span></span>
        <button type="button" aria-label={muted ? "Unmute" : "Mute"} onClick={() => { if (video.current) { video.current.muted = !muted; if (video.current.volume === 0) video.current.volume = 1; } reveal(); }}><NumiMediaIcon name={muted ? "muted" : "sound"} /></button>
        <button type="button" aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={() => void toggleFullscreen()}><NumiMediaIcon name={fullscreen ? "collapse" : "expand"} /></button>
      </div>
    </div>}
    {waiting && <span className={styles.loading} role="status">Loading…</span>}
    {failed ? <div className={styles.error} role="alert"><p>This video could not load.</p><button type="button" onClick={retry}>Try again</button><a href={film.src}>Open video</a></div> : notice && <p className={styles.notice} role="status">{notice}</p>}
  </div>;
}
