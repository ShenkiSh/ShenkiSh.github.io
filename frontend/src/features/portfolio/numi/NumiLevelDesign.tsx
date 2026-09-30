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
      <h2 id="level-heading">From instability to support.</h2>
      <p>In the Childhood memory, the player resizes, moves and rotates objects to find a route forward. I used the same hand motif as both a collapsing bridge and a safe crossing, connecting the story to the player’s actions.</p>
    </div>
    <div className={styles.twoMedia}>
      <figure><NumiVideo film={films.collapse} /><figcaption><strong>Losing stability</strong><span>The first hand bridge gives way, making the path feel uncertain.</span></figcaption></figure>
      <figure><NumiVideo film={films.crossing} /><figcaption><strong>Finding support</strong><span>The final hands become a safe route to the bicycle, changing the meaning of the same shape.</span></figcaption></figure>
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
