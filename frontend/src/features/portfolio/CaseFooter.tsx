import { c } from "./styles";
import { PortfolioLink } from "./PortfolioLink";
import { contactDetails } from "./contactDetails";
import { CaseSignature } from "./CaseSignature";
import styles from "./ProjectFooter.module.scss";

export function CaseFooter({ compact = false }: { compact?: boolean }) {
  if (compact) return <footer className={`${styles.footer} ${styles.minimal}`}><div className={styles.container}><CaseSignature /></div></footer>;
  return (<>
<footer className={c("site-footer")}>
<div className={c("container")}>
<div className={c("footer-top")}>
<PortfolioLink className={c("brand")} href="index.html">SHANI SHLOMOV</PortfolioLink>
<nav className={c("footer-links")} aria-label="Contact links">
<PortfolioLink href="contact.html#email">Email</PortfolioLink><PortfolioLink href={contactDetails.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</PortfolioLink>
</nav>
</div>
<div className={c("footer-bottom")}>
<nav className={c("footer-links")} aria-label="Footer navigation"><PortfolioLink href="index.html#work">Work</PortfolioLink><PortfolioLink href="about.html">About</PortfolioLink><PortfolioLink href="contact.html">Contact</PortfolioLink></nav>
<p>Wireframe · Content and media placeholders</p>
</div>
</div>
</footer>
  </>);
}
