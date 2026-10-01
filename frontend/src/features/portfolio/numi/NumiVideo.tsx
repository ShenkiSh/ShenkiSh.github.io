import { CaseVideo } from "../CaseVideo";
import { numiAsset, type NumiFilm } from "./numiMedia";

export function NumiVideo({ film, autoPlay = false, posterLabel, defaultMuted = true }: { film: NumiFilm; autoPlay?: boolean; posterLabel?: string; defaultMuted?: boolean }) {
  return <CaseVideo film={{ ...film, src: numiAsset(`${film.id}.mp4`), poster: numiAsset(film.poster) }} autoPlay={autoPlay} posterLabel={posterLabel} defaultMuted={defaultMuted} />;
}
