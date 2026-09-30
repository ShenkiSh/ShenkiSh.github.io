import { useState } from "react";
import { NumiGameDialog } from "./NumiGameDialog";
import styles from "./NumiCase.module.scss";

export function NumiFirstMemory({ onWatch }: { onWatch: () => void }) {
  const [playing, setPlaying] = useState(false);
  return <div className={styles.playStrip} id="first-memory" role="region" aria-labelledby="first-memory-heading">
    <div className={styles.copy}>
      <h3 id="first-memory-heading">Step into the Childhood memory</h3>
      <p className={styles.small}>Playable demo · Desktop · Keyboard or controller</p>
    </div>
    <div className={styles.playActions}>
      <button className={styles.primary} type="button" onClick={() => setPlaying(true)}>Play in browser</button>
      <button className={styles.watchButton} type="button" onClick={onWatch} aria-label="Watch full Childhood playthrough · 7:33">Watch the full Childhood playthrough <span>7:33</span></button>
    </div>
    {playing && <NumiGameDialog onClose={() => setPlaying(false)} onWatch={() => { setPlaying(false); onWatch(); }} />}
  </div>;
}
