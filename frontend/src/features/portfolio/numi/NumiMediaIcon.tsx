type MediaIconName = "play" | "pause" | "sound" | "muted" | "expand" | "collapse" | "close";

export function NumiMediaIcon({ name }: { name: MediaIconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === "play" && <path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none" />}
    {name === "pause" && <path d="M8 5v14M16 5v14" strokeWidth="3" />}
    {(name === "sound" || name === "muted") && <><path d="M11 4 6 8H3v8h3l5 4Z" />{name === "sound" ? <><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></> : <path d="m16 9 6 6m0-6-6 6" />}</>}
    {name === "expand" && <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" />}
    {name === "collapse" && <path d="M3 9h6V3m6 0v6h6M9 21v-6H3m18 0h-6v6" />}
    {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
  </svg>;
}
