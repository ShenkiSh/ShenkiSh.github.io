import { resumePdfPath } from "@/shared/config/resume";
import { asset } from "./asset";

const pages = new Set(["numi", "we-live-happily-here", "ikko", "le-frogette", "my-bunny", "headease", "about", "contact"]);

function redirectResumeBookmark(): boolean {
  if (window.location.pathname.endsWith("/resume.html") || /^#\/resume\/?(?:[?#]|$)/.test(window.location.hash)) {
    window.location.replace(asset(resumePdfPath));
    return true;
  }
  return false;
}

/** Keep bookmarks to the previous static pages working after adopting hash routing. */
export function restoreLegacyUrl(): void {
  window.addEventListener("hashchange", redirectResumeBookmark);
  if (redirectResumeBookmark()) return;
  const url = new URL(window.location.href);
  const filename = url.pathname.split("/").pop() ?? "";
  const slug = filename.replace(/\.html$/, "");
  if (filename.endsWith(".html") && (pages.has(slug) || slug === "index")) {
    url.pathname = url.pathname.slice(0, -filename.length);
    url.hash = `/${slug === "index" ? "" : slug}${url.hash.startsWith("#/") ? "" : url.hash}`;
    window.history.replaceState(null, "", url);
  } else if (url.hash && !url.hash.startsWith("#/")) {
    url.hash = `/${url.hash}`;
    window.history.replaceState(null, "", url);
  }
}
