import { useEffect, useRef, useState } from "react";
import { PortfolioLink } from "./PortfolioLink";
import styles from "./CaseChapterNavigation.module.scss";

interface CaseChapterNavigationProps {
  label: string;
  chapters: readonly (readonly [id: string, label: string])[];
  showDivider?: boolean;
}

export function CaseChapterNavigation({ label, chapters, showDivider = true }: CaseChapterNavigationProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(chapters[0]?.[0] ?? "");

  useEffect(() => {
    const nav = ref.current;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const article = nav?.closest("article");
    if (!nav || !header) return;
    let frame = 0;
    const update = () => {
      const offset = header.offsetHeight + nav.offsetHeight + 26;
      let current = chapters[0]?.[0] ?? "";
      for (const [id] of chapters) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(() => {
      article?.style.setProperty("--case-chapter-height", `${nav.offsetHeight}px`);
      schedule();
    });
    observer.observe(header);
    observer.observe(nav);
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      article?.style.removeProperty("--case-chapter-height");
    };
  }, [chapters]);

  useEffect(() => {
    const link = ref.current?.querySelector<HTMLElement>('[aria-current="location"]');
    const row = link?.parentElement;
    if (!link || !row) return;
    const linkBounds = link.getBoundingClientRect();
    const rowBounds = row.getBoundingClientRect();
    if (linkBounds.left < rowBounds.left || linkBounds.right > rowBounds.right) {
      row.scrollBy({ left: linkBounds.left - rowBounds.left - (row.clientWidth - linkBounds.width) / 2, behavior: "instant" });
    }
  }, [active]);

  return <nav ref={ref} data-chapter-nav className={`${styles.nav} ${showDivider ? "" : styles.withoutDivider}`} aria-label={label}>
    <div className={styles.links}>{chapters.map(([id, title]) => <PortfolioLink key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{title}</PortfolioLink>)}</div>
  </nav>;
}
