import { memories } from "./numiMedia";
import { NumiVideo } from "./NumiVideo";
import styles from "./NumiCase.module.scss";

const themes = ["Finding stability and safety", "Boundaries and personal space", "Support and protection", "Care through everyday objects", "Fragments of identity"];

export function NumiMemories() {
  return <ol id="memories" className={styles.memories} aria-label="Five playable memories">
    {memories.map((memory, index) => <li key={memory.name}>
      <NumiVideo film={{ ...memory.film, title: `${memory.name} — gameplay preview`, poster: `memory-${index + 1}.jpg` }} />
      <h3><span className={styles.memoryNumber}>0{index + 1}</span>{memory.name}</h3>
      <p>{themes[index]}</p>
    </li>)}
  </ol>;
}
