import { narrative, numiAsset } from "./numiMedia";
import styles from "./NumiCase.module.scss";

export function NumiExtras() {
  return <details className={styles.disclosure} id="visual">
    <summary>Explore the story &amp; visual development<span aria-hidden="true">+</span></summary>
    <div className={styles.extraContent}>
      <div className={styles.copy}><h3>From the present into a memory</h3><p className={styles.small}>A family interaction triggers a playable memory before returning to the present.</p></div>
      <div className={styles.storyboard}>{narrative.map(([file, label, description], index) => <figure key={file}>
        <img src={numiAsset(file)} alt={description ?? label} width="352" height="198" loading="lazy" /><figcaption>0{index + 1} / {label}</figcaption>
      </figure>)}</div>
      <div className={styles.copy}><h3>A visual language for memory</h3><p className={styles.small}>NUMI’s silhouette stays distinct from the environment. Familiar objects and changing landscapes carry each memory’s emotional tone.</p></div>
      <div className={styles.visualGrid}>
        <figure><img src={numiAsset("visual-character.png")} alt="NUMI character design" loading="lazy" width="352" height="388" /><figcaption>A distinct character silhouette</figcaption></figure>
        <figure className={styles.environments}><img src={numiAsset("visual-environment-1.png")} alt="Floating islands and organic shapes in NUMI’s landscape" loading="lazy" width="728" height="196" /><img src={numiAsset("visual-environment-2.png")} alt="NUMI among boxes and everyday objects" loading="lazy" width="728" height="176" /><figcaption>Changing landscapes and familiar objects</figcaption></figure>
        {[["visual-trees.png", "Tree silhouettes"], ["visual-bench.png", "Everyday objects"], ["visual-hands.png", "Hands as platforms and support"]].map(([file, label]) => <figure key={file}><img src={numiAsset(file!)} alt={label} width="352" height="218" loading="lazy" /><figcaption>{label}</figcaption></figure>)}
      </div>
    </div>
  </details>;
}
