import { narrative, numiAsset } from "./numiMedia";
import styles from "./NumiCase.module.scss";

export function NumiVisualDevelopment() {
  return <section className={styles.section} id="visual" aria-labelledby="visual-heading">
    <div className={styles.sectionIntro}>
      <h2 id="visual-heading">A visual language for memory.</h2>
      <p>I developed NUMI’s character, environments and objects as one visual world. A distinct silhouette keeps the character readable, while familiar shapes carry the emotional tone of each memory.</p>
    </div>
    <div className={styles.visualGrid}>
      <figure className={styles.characterStudy}><img src={numiAsset("visual-character.png")} alt="NUMI character design" loading="lazy" width="352" height="388" /><figcaption><strong>A distinct silhouette</strong><span>NUMI stays recognizable against the changing environments.</span></figcaption></figure>
      <figure className={styles.environments}><img src={numiAsset("visual-environment-1.png")} alt="Floating islands and organic shapes in NUMI’s landscape" loading="lazy" width="728" height="196" /><img src={numiAsset("visual-environment-2.png")} alt="NUMI among boxes and everyday objects" loading="lazy" width="728" height="176" /><figcaption><strong>Familiar shapes, changing landscapes</strong><span>Floating islands and everyday objects become the spaces the player moves through.</span></figcaption></figure>
    </div>
    <div className={styles.assetStrip}>
      {[["visual-trees.png", "Tree silhouettes"], ["visual-bench.png", "Everyday objects"], ["visual-hands.png", "Hands as platforms and support"]].map(([file, label]) => <figure key={file}><img src={numiAsset(file!)} alt={label} width="352" height="218" loading="lazy" /><figcaption>{label}</figcaption></figure>)}
    </div>
    <div className={styles.storySequence}>
      <div className={styles.sectionIntro}><h3>How a memory unfolds</h3><p>A small family interaction leads into a playable memory, then back to the present.</p></div>
      <div className={styles.storyboard}>{narrative.map(([file, label, description], index) => <figure key={file}>
        <img src={numiAsset(file)} alt={description ?? label} width="352" height="198" loading="lazy" /><figcaption>0{index + 1} / {label}</figcaption>
      </figure>)}</div>
    </div>
  </section>;
}
