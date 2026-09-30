import { useState } from "react";
import { NumiGameDialog } from "./NumiGameDialog";
import { numiAsset } from "./numiMedia";
import styles from "./NumiCase.module.scss";
import gameStyles from "./NumiGame.module.scss";

export function NumiFirstMemory({ onWatch }: { onWatch: () => void }) {
  const [playing, setPlaying] = useState(false);
  return <section className={styles.section} id="first-memory" aria-labelledby="first-memory-heading">
    <div className={styles.grid}>
      <div className={styles.copy}>
        <h2 id="first-memory-heading">Play the First Memory</h2>
        <p>Step into the Childhood memory and experience the level shown&nbsp;above.</p>
        <p className={styles.small}>Desktop · Keyboard or controller<br />Headphones recommended</p>
        <button className={gameStyles.watch} type="button" onClick={onWatch} aria-label="Watch full Childhood playthrough · 7:33">Watch full playthrough <span aria-hidden="true">→</span></button>
      </div>
      <button className={`${styles.playPoster} ${gameStyles.poster}`} type="button" aria-label="Play in browser" onClick={() => setPlaying(true)}>
        <img src={numiAsset("imgNumiChildhoodPlayableEntryPoster.png")} alt="" width="1104" height="520" loading="lazy" />
        <span className={gameStyles.play}>Play in browser <span aria-hidden="true">→</span></span>
      </button>
    </div>
    {playing && <NumiGameDialog onClose={() => setPlaying(false)} onWatch={() => { setPlaying(false); onWatch(); }} />}
  </section>;
}
