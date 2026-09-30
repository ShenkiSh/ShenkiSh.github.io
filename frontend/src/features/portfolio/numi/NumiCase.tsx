import { useState } from "react";
import { PortfolioLink } from "../PortfolioLink";
import { NumiChapterNavigation } from "./NumiChapterNavigation";
import { NumiMemories } from "./NumiMemories";
import { NumiLevelDesign } from "./NumiLevelDesign";
import { NumiFeedback } from "./NumiFeedback";
import { NumiVisualDevelopment } from "./NumiVisualDevelopment";
import { NumiVideo } from "./NumiVideo";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { NumiMediaDialog, type NumiOverlay } from "./NumiMediaDialog";
import { films, numiAsset } from "./numiMedia";
import styles from "./NumiCase.module.scss";

export function NumiCase() {
  const [media, setMedia] = useState<NumiOverlay | null>(null);
  useExclusiveCaseMedia();
  function watchPlaythrough() { setMedia({ kind: "film", film: films.childhood }); }
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <PortfolioLink className={styles.back} href="index.html#work"><img className={styles.actionIcon} src={numiAsset("imgArrowLeft.svg")} alt="" />Back to Work</PortfolioLink>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className={styles.identity}><h1>NUMI</h1><p>2D Narrative Puzzle-Platformer</p></div>
          <p className={styles.heroDescription}>Five memories from Naomi’s life become playable worlds.</p>
          <p className={styles.heroRole}><span>My role</span>Game &amp; Level Design · Narrative · UX/UI<br />Visual Development · Unity Implementation</p>
          <PortfolioLink className={styles.primary} href="#first-memory">Play the Childhood demo <span aria-hidden="true">↓</span></PortfolioLink>
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
      <section className={`${styles.section} ${styles.closing}`} id="players" aria-labelledby="players-heading">
        <div className={styles.playersGrid}>
          <div className={styles.copy}><h2 id="players-heading">From screen to players.</h2><p>Players of different ages completed all five memories at Animatheque, Tel Aviv Cinematheque.</p>
            <a className={styles.textLink} href="https://youtu.be/jpuC4LFZNx4" target="_blank" rel="noreferrer">Channel 10 interview</a>
          </div>
          <figure><button className={styles.photoButton} onClick={() => setMedia({ kind: "image", file: "imgSourceArtworkGroup1100.png", title: "NUMI at Animatheque, Tel Aviv Cinematheque" })} aria-label="Enlarge public playtesting photo"><img src={numiAsset("imgSourceArtworkGroup1100.png")} alt="Visitors playing NUMI with a controller at the public showcase" loading="lazy" width="1104" height="548" /></button><figcaption>NUMI at Animatheque, Tel Aviv Cinematheque.</figcaption></figure>
        </div>
        <dl className={styles.credits}>
          <div><dt>My contribution</dt><dd>Game &amp; Level Design · Narrative Design · Game UX/UI · Visual Development · Unity Implementation</dd></div>
          <div><dt>Collaborators</dt><dd>Freelance Programmer · Music Composer</dd></div>
        </dl>
      </section>
    </div>
    {media ? <NumiMediaDialog media={media} onClose={() => setMedia(null)} /> : null}
  </article>;
}
