export function scrollToSection(hash: string): void {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const chapters = document.querySelector<HTMLElement>("[data-chapter-nav]");
  const offset = (header?.offsetHeight ?? 0) + (chapters?.offsetHeight ?? 0) + 24;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
  target.focus({ preventScroll: true });
}

