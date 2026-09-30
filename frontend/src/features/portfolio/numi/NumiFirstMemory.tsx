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
    <button className={styles.primary} type="button" onClick={() => setPlaying(true)}>Play in browser <span aria-hidden="true">↗</span></button>
    {playing && <NumiGameDialog onClose={() => setPlaying(false)} onWatch={() => { setPlaying(false); onWatch(); }} />}
  </div>;
}
