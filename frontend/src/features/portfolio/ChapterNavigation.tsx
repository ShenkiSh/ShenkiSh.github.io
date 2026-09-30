import { useEffect, useRef, useState } from "react";
import { PortfolioLink } from "./PortfolioLink";
import { c } from "./styles";

const chapters = [
  ["overview", "Overview"], ["design", "Design"], ["mechanics", "Mechanics"],
  ["visual-ui", "Visual/UI"], ["unity", "Unity"], ["testing", "Testing"],
] as const;

export function ChapterNavigation() {
  const [active, setActive] = useState<string>("overview");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const navigation = ref.current;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const shell = document.querySelector<HTMLElement>("[data-portfolio-shell]");
    if (!navigation || !header || !shell) return;
    let frame = 0;
    const update = () => {
      const headerHeight = header.getBoundingClientRect().height;
      const offset = headerHeight + navigation.getBoundingClientRect().height + 24;
      shell.style.setProperty("--site-header-height", `${headerHeight}px`);
      shell.style.setProperty("--chapter-offset", `${offset}px`);
      let selected: string = "overview";
      for (const [id] of chapters) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset + 2) selected = id;
      }
      setActive(selected);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(header); observer.observe(navigation);
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); };
  }, []);
  return <nav ref={ref} data-chapter-nav className={c("case-nav")} aria-label="NUMI sections">
    {chapters.map(([id, label]) => <PortfolioLink key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</PortfolioLink>)}
  </nav>;
}
