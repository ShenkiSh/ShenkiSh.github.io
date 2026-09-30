/** Resolve public assets under both a domain root and a GitHub Pages project path. */
export function asset(path: string): string {
  const relativePath = path.replace(/^\/+/, "");
  const mediaBase = import.meta.env.VITE_MEDIA_BASE_URL?.trim().replace(/\/+$/, "");
  const isHostedRecording = relativePath === "assets/hop/full-game.mp4"
    || relativePath === "assets/redream/full-experience-hd.mp4";
  const base = mediaBase && isHostedRecording ? `${mediaBase}/` : import.meta.env.BASE_URL;
  return `${base}${relativePath}`;
}
