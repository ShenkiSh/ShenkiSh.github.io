import { useRef, useState, type KeyboardEvent } from "react";
import { memories, numiAsset } from "./numiMedia";
import { keepLastWordsTogether } from "./numiTypography";
import styles from "./NumiCase.module.scss";

export function NumiMemories() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const memory = memories[active]!;
  function select(index: number, focus = false): void {
    const next = (index + memories.length) % memories.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus({ preventScroll: true });
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }
  function keydown(event: KeyboardEvent<HTMLDivElement>): void {
    const next = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: memories.length - 1 }[event.key];
    if (next !== undefined) { event.preventDefault(); select(next, true); }
  }
  return <section id="memories" className={styles.section} aria-labelledby="memories-heading">
    <div className={styles.grid} id="memory-panel" role="tabpanel" aria-labelledby={`memory-tab-${active}`} tabIndex={0}>
      <div className={styles.copy}>
        <h2 id="memories-heading">Five Playable Memories</h2>
        <h3>{memory.name}</h3>
        <p>{keepLastWordsTogether(memory.description)}</p>
      </div>
      <img className={styles.wideImage} src={numiAsset(`memory-${active + 1}.jpg`)} alt={`${memory.name} — NUMI gameplay`} loading="lazy" width="1600" height="900" />
    </div>
    <div className={styles.memoryNavigation}>
      <button type="button" className={styles.arrowButton} onClick={() => select(active - 1)} aria-label="Previous memory"><img src={numiAsset("imgPreviousMemory.svg")} alt="" /></button>
      <div className={styles.memoryTabs} role="tablist" aria-label="Five playable memories" onKeyDown={keydown}>
        {memories.map((item, index) => <button key={item.name} type="button" role="tab" id={`memory-tab-${index}`} aria-selected={active === index}
          aria-controls="memory-panel" tabIndex={active === index ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => select(index)}>
          <img src={numiAsset(`memory-${index + 1}.jpg`)} alt="" width="80" height="45" loading="lazy" /><span>{item.name}</span>
        </button>)}
      </div>
      <button type="button" className={styles.arrowButton} onClick={() => select(active + 1)} aria-label="Next memory"><img src={numiAsset("imgNextMemory.svg")} alt="" /></button>
    </div>
  </section>;
}
