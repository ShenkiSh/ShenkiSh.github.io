import { NumiFirstMemory } from "./NumiFirstMemory";
import { NumiVideo } from "./NumiVideo";
import { films } from "./numiMedia";
import styles from "./NumiCase.module.scss";

const mechanics = [
  [films.resize, "Resize objects to open a path."],
  [films.move, "Move objects to change the route."],
  [films.rotate, "Rotate objects to solve spatial puzzles."],
] as const;

export function NumiLevelDesign({ onWatch }: { onWatch: () => void }) {
  return <section className={styles.section} id="design" aria-labelledby="level-heading">
    <div className={styles.sectionIntro}>
      <div className={styles.copy}><p className={styles.eyebrow}>02 / Story into gameplay</p><h2 id="level-heading">From instability<br />to support.</h2></div>
      <div className={styles.copy}><p>In the Childhood memory, I used the same hand motif in two ways: first as a bridge that collapses, then as a safe crossing.</p><p className={styles.small}>The player resizes, moves and rotates objects to find a route forward. The environment carries the story through what the player does.</p></div>
    </div>
    <div className={styles.twoMedia}>
      <figure><NumiVideo film={films.collapse} /><figcaption><strong>01 — Losing stability</strong><span>The first hand bridge gives way, making the path feel uncertain.</span></figcaption></figure>
      <figure><NumiVideo film={films.crossing} /><figcaption><strong>02 — Finding support</strong><span>The final hands become a safe route to the bicycle, changing the meaning of the same shape.</span></figcaption></figure>
    </div>
    <details id="mechanics" className={styles.disclosure} onToggle={event => {
      if (!event.currentTarget.open) event.currentTarget.querySelectorAll("video").forEach(video => video.pause());
    }}>
      <summary>Explore the three interactions<span aria-hidden="true">+</span></summary>
      <div className={styles.threeMedia}>{mechanics.map(([film, caption]) => <figure key={film.id}><NumiVideo film={film} /><figcaption><strong>{film.title}</strong><span>{caption}</span></figcaption></figure>)}</div>
    </details>
    <NumiFirstMemory onWatch={onWatch} />
  </section>;
}
