import { AnimatedCharacter } from "./AnimatedCharacter";
import { PortfolioLink } from "./PortfolioLink";
import actions from "./CaseActions.module.scss";
import styles from "./AboutContent.module.scss";

export function AboutContent() {
  return <article className={styles.page} aria-labelledby="about-title">
    <header className={styles.heading}>
      <h1 id="about-title">Hi, I’m Shani</h1>
      <p>Game &amp; UX/UI Designer</p>
    </header>
    <div className={styles.layout}>
      <div className={styles.portrait}>
        <AnimatedCharacter videoPath="assets/about/shani-pointing.webm" posterPath="assets/about/shani-pointing-poster.png" />
      </div>
      <div className={styles.copy}>
        <div className={styles.bio}>
          <p>I’m a Visual Communication graduate from HIT, focused on games and interactive experiences.</p>
          <p>I design the flow, interface and visual language of an experience, then bring it into Figma or Unity to see how it actually feels to use and play.</p>
        </div>
        <dl className={styles.details}>
          <div><dt>Education</dt><dd>B.Des Visual Communication — HIT, 2026</dd></div>
          <div><dt>Focus</dt><dd>Game Design · Game UX/UI · Visual Design</dd></div>
          <div><dt>Tools</dt><dd>Unity · Figma · Adobe Creative Suite</dd></div>
        </dl>
        <PortfolioLink className={actions.primary} href="resume.html">View Resume <span aria-hidden="true">→</span></PortfolioLink>
      </div>
    </div>
  </article>;
}
