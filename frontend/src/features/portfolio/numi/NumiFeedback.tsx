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
      <div className={styles.copy}><p className={styles.eyebrow}>03 / Game UX/UI</p><h2 id="ui-heading">Making the next<br />step clear.</h2></div>
      <div className={styles.copy}><p>I designed the memory HUD and contextual prompts to connect the player’s actions with visible feedback.</p><p className={styles.small}>UX/UI and Unity integration by me.<br />Programming with a freelance programmer.</p></div>
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
        <div className={styles.copy}><p className={styles.eyebrow}>A change from playtesting</p><h3>One action at a time</h3></div>
        <p>Players confused Hold and Scale when both prompts appeared together. I changed their appearance and timing so the next instruction follows the player’s action.</p>
      </div>
      <div className={styles.twoMedia}>
        <figure><div className={styles.comparisonLabel}>Before <span>Two instructions at once</span></div><NumiVideo film={films.before} /><figcaption>Hold and Scale appeared together, leaving the order of actions unclear.</figcaption></figure>
        <figure><div className={styles.comparisonLabel}>After <span>Hold → Scale</span></div><NumiVideo film={films.after} /><figcaption>Hold appears first. Once the object is held, the prompt changes to Scale and points to the right stick.</figcaption></figure>
      </div>
      <p className={styles.takeaway}><strong>Design takeaway</strong> Let the instruction follow the player’s current action.</p>
    </div>
  </section>;
}
