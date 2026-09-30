import { memories, numiAsset } from "./numiMedia";
import styles from "./NumiCase.module.scss";

const themes = ["Finding stability and safety", "Boundaries and personal space", "Support and protection", "Care through everyday objects", "Fragments of identity"];

export function NumiMemories({ onEnlarge }: { onEnlarge: (file: string, title: string) => void }) {
  return <ol id="memories" className={styles.memories} aria-label="Five playable memories">
    {memories.map((memory, index) => <li key={memory.name}>
      <button type="button" className={styles.memoryImage} aria-label={`Enlarge ${memory.name} memory`}
        onClick={() => onEnlarge(`memory-${index + 1}.jpg`, `${memory.name} — ${memory.description}`)}>
        <img src={numiAsset(`memory-${index + 1}.jpg`)} alt={`${memory.name} — NUMI gameplay`} width="1600" height="900" loading="lazy" />
        <span aria-hidden="true">↗</span>
      </button>
      <h3><span className={styles.memoryNumber}>0{index + 1}</span>{memory.name}</h3>
      <p>{themes[index]}</p>
    </li>)}
  </ol>;
}
