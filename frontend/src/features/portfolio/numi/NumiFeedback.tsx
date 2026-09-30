import { NumiVideo } from "./NumiVideo";
import { films, numiAsset } from "./numiMedia";
import styles from "./NumiCase.module.scss";

const hudStates = [
  ["imgActualRecordedHud04Empty.png", "0/4", "A memory to rebuild"],
  ["imgActualRecordedHud14Partial.png", "1/4", "A fragment collected"],
  ["imgActualRecordedHud44Complete.png", "4/4", "The memory is complete"],
] as const;

export function NumiFeedback() {
  return <section className={styles.section} id="unity" aria-labelledby="ui-heading">
    <span id="visual-ui" className={styles.anchor} />
    <div className={styles.sectionIntro}>
      <h2 id="ui-heading">Making the next step clear.</h2>
      <p>I designed and integrated the memory HUD and contextual prompts in Unity, working with a freelance programmer. Two examples show how the interface communicates progress and guides the next action.</p>
    </div>
    <div className={styles.hudRow}>
      <div className={styles.copy}><h3>Seeing a memory come together</h3><p>Each collected fragment adds to the image. Four fragments rebuild the memory, making progress part of the story.</p></div>
      <div className={styles.hudSequence}>{hudStates.map(([file, count, caption]) => <figure key={file}>
        <div className={styles.hud}><img src={numiAsset(file)} alt={`Memory HUD: ${caption.toLowerCase()}`} width="400" height="400" loading="lazy" /></div>
        <figcaption><strong>{count}</strong><span>{caption}</span></figcaption>
      </figure>)}</div>
    </div>
    <div className={styles.iteration} id="testing">
      <div className={styles.sectionIntro}>
        <h3>One action at a time</h3>
        <p>During playtesting, players confused Hold and Scale when both appeared together. I revised the prompts so each instruction follows the player’s current action.</p>
      </div>
      <div className={styles.twoMedia}>
        <figure><div className={styles.comparisonLabel}>Before <span>Two instructions at once</span></div><NumiVideo film={films.before} /><figcaption>Hold and Scale appeared together, leaving the order of actions unclear.</figcaption></figure>
        <figure><div className={styles.comparisonLabel}>After <span>Hold, then Scale</span></div><NumiVideo film={films.after} /><figcaption>Hold appears first. Once the object is held, the prompt changes to Scale and points to the right stick.</figcaption></figure>
      </div>
    </div>
  </section>;
}
