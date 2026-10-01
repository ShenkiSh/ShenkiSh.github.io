import { useState } from "react";
import { PortfolioLink } from "../PortfolioLink";
import { NumiChapterNavigation } from "./NumiChapterNavigation";
import { NumiMemories } from "./NumiMemories";
import { NumiLevelDesign } from "./NumiLevelDesign";
import { NumiFeedback } from "./NumiFeedback";
import { NumiVisualDevelopment } from "./NumiVisualDevelopment";
import { NumiShowcase } from "./NumiShowcase";
import { NumiVideo } from "./NumiVideo";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { NumiMediaDialog, type NumiOverlay } from "./NumiMediaDialog";
import { films, numiAsset } from "./numiMedia";
import actions from "../CaseActions.module.scss";
import styles from "./NumiCase.module.scss";

export function NumiCase() {
  const [media, setMedia] = useState<NumiOverlay | null>(null);
  useExclusiveCaseMedia();
  function watchPlaythrough() { setMedia({ kind: "film", film: films.childhood }); }
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.heroGrid}>
        <div className={styles.identity}><h1>NUMI</h1><p>2D Narrative Puzzle-Platformer</p></div>
        <div className={styles.heroCopy}>
          <p className={styles.heroDescription}>Five memories from Naomi’s life become playable worlds.</p>
          <p className={styles.heroRole}><span>My role</span>Game &amp; Level Design · Narrative · UX/UI<br />Visual Development · Unity Implementation</p>
          <div className={styles.heroActions}>
            <PortfolioLink className={actions.primary} href="#first-memory">Play the Childhood demo</PortfolioLink>
            <PortfolioLink className={actions.secondary} href="index.html#work"><img src={numiAsset("imgArrowLeft.svg")} alt="" />Back to Work</PortfolioLink>
          </div>
          <p className={styles.small}>Unity · PC · Keyboard or controller</p>
        </div>
        <figure className={styles.heroFilm}><NumiVideo film={films.trailer} posterLabel="Play trailer" /><figcaption>From a fragment of identity to a world you can explore.</figcaption></figure>
      </div>
    </header>
    <NumiChapterNavigation />
    <div className={styles.container}>
      <section className={styles.section} id="overview" aria-labelledby="game-heading">
        <div className={styles.sectionIntro}>
          <h2 id="game-heading">A life told through memories.</h2>
          <p>Inspired by my grandmother and my family’s experience with Alzheimer’s, I created a fictional story about memory and identity. As NUMI, a fragment of Naomi’s identity, the player explores five worlds from childhood to age 70.</p>
        </div>
        <NumiMemories />
      </section>
      <NumiVisualDevelopment />
      <NumiLevelDesign onWatch={watchPlaythrough} />
      <NumiFeedback />
      <NumiShowcase onOpenGallery={index => setMedia({ kind: "gallery", index })} />
    </div>
    {media ? <NumiMediaDialog media={media} onClose={() => setMedia(null)} /> : null}
  </article>;
}
