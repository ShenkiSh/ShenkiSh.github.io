import { useRef, useState } from "react";
import { scrollToSection } from "../scrollToSection";
import { NumiPlayBadge } from "./NumiPlayBadge";
import { NumiVideo } from "./NumiVideo";
import { films, numiAsset, type NumiFilm } from "./numiMedia";
import { keepLastWordsTogether } from "./numiTypography";
import styles from "./NumiCase.module.scss";

const checkpoints: { caption: string; film: NumiFilm }[] = [
  { caption: "Explore the space", film: films.explore },
  { caption: "Adapt to the collapsing bridge", film: films.collapse },
  { caption: "Roll the wheel into place", film: films.wheel },
  { caption: "Combine movement and objects", film: films.combine },
  { caption: "Cross safely to the bicycle", film: films.crossing },
];

export function NumiLevelDesign() {
  const [selected, setSelected] = useState({ index: 4, request: 0 });
  const preview = useRef<HTMLDivElement>(null);
  const active = checkpoints[selected.index]!;
  function select(index: number): void {
    setSelected(previous => ({ index, request: previous.request + 1 }));
    const bounds = preview.current?.getBoundingClientRect();
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const chapters = document.querySelector<HTMLElement>("[data-chapter-nav]");
    if (bounds && (bounds.top < (header?.offsetHeight ?? 0) + (chapters?.offsetHeight ?? 0) || bounds.bottom > innerHeight)) scrollToSection("#level-preview");
  }
  return <section className={styles.section} id="design" aria-labelledby="level-heading">
    <div className={styles.grid}>
      <div className={styles.copy}><h2 id="level-heading">Childhood: Level Design</h2><p>The first hand bridge collapses. The final hands become a safe crossing, turning the same motif into a moment of&nbsp;support.</p></div>
      <div ref={preview} id="level-preview" tabIndex={-1}>
        <NumiVideo key={`${selected.index}-${selected.request}`} film={active.film} autoPlay={selected.request > 0} />
      </div>
    </div>
    <div className={styles.checkpoints} role="group" aria-label="Childhood level sequence">
      {checkpoints.map((checkpoint, index) => <figure key={checkpoint.film.id}>
        <button className={styles.checkpoint} type="button" aria-pressed={selected.index === index}
          aria-label={`Play: ${checkpoint.caption}`} onClick={() => select(index)}>
          <img src={numiAsset(checkpoint.film.poster)} alt="" width="640" height="360" loading="lazy" />
          <NumiPlayBadge duration={checkpoint.film.duration} />
        </button>
        <figcaption>0{index + 1} · {keepLastWordsTogether(checkpoint.caption)}</figcaption>
      </figure>)}
    </div>
  </section>;
}
