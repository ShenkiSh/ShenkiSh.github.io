import { AnimatedCharacter } from "./AnimatedCharacter";
import styles from "./AboutPreview.module.scss";

export function AboutPreview() {
  return <section id="about" className={styles.about} aria-labelledby="home-about-title">
    <div className={styles.band} aria-hidden="true" />
    <div className={styles.character}><AnimatedCharacter /></div>
    <h2 id="home-about-title">Hi, I’m Shani</h2>
    <p>I turn visual ideas into playable experiences from interface and interaction to Unity.</p>
  </section>;
}
