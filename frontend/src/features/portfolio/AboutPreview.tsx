import { AnimatedCharacter } from "./AnimatedCharacter";
import { PortfolioLink } from "./PortfolioLink";
import actions from "./CaseActions.module.scss";
import styles from "./AboutPreview.module.scss";

export function AboutPreview() {
  return <section id="about" className={styles.about} aria-labelledby="home-about-title">
    <div className={styles.band} aria-hidden="true" />
    <div className={styles.character}><AnimatedCharacter /></div>
    <h2 id="home-about-title">Hi, I’m Shani.</h2>
    <div className={styles.copy}>
      <p>Game UX/UI &amp; Game Designer turning visual ideas into playable experiences from interface and interaction to Unity.</p>
      <PortfolioLink className={actions.secondary} href="about.html">More about me <span aria-hidden="true">→</span></PortfolioLink>
    </div>
  </section>;
}
