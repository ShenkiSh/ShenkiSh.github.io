import { PortfolioLink } from "./PortfolioLink";
import { contactDetails } from "./contactDetails";
import styles from "./HomeFooter.module.scss";

export function HomeFooter() {
  return <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
    <div className={styles.container}>
      <h2 id="contact-title">Let’s connect</h2>
      <nav className={styles.contactLinks} aria-label="Contact links">
        <PortfolioLink href="contact.html#email">Email</PortfolioLink>
        <PortfolioLink href={contactDetails.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</PortfolioLink>
        <PortfolioLink href="resume.html">Resume</PortfolioLink>
      </nav>
      <div className={styles.bottom}>
        <div><PortfolioLink className={styles.brand} href="index.html">SHANI SHLOMOV</PortfolioLink><p className={styles.role}>Game &amp; UI Designer</p></div>
        <p className={styles.copyright}>© 2026 Shani Shlomov</p>
        <nav aria-label="Footer navigation"><PortfolioLink href="index.html#work">Work</PortfolioLink><PortfolioLink href="about.html">About</PortfolioLink><PortfolioLink href="contact.html">Contact</PortfolioLink></nav>
      </div>
    </div>
  </footer>;
}
