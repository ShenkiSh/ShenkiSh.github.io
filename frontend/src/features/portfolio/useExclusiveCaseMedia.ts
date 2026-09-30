import { useEffect } from "react";

/** A new player takes over; there is never a stack of soundtracks. */
export function useExclusiveCaseMedia(): void {
  useEffect(() => {
    const exclusive = (event: Event) => {
      const active = event.target;
      if (!(active instanceof HTMLVideoElement) || active.paused) return;
      document.querySelectorAll<HTMLVideoElement>("video").forEach(video => {
        if (video !== active) video.pause();
      });
    };
    const pauseWhenHidden = () => {
      if (document.hidden) document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauseForPreference = () => {
      if (reduce.matches) document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    };
    document.addEventListener("play", exclusive, true);
    document.addEventListener("volumechange", exclusive, true);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    reduce.addEventListener("change", pauseForPreference);
    return () => {
      document.removeEventListener("play", exclusive, true);
      document.removeEventListener("volumechange", exclusive, true);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      reduce.removeEventListener("change", pauseForPreference);
    };
  }, []);
}
