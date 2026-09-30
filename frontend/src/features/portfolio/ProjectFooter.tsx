import { CaseSignature } from "./CaseSignature";
import { PortfolioLink } from "./PortfolioLink";
import styles from "./ProjectFooter.module.scss";

export interface ProjectDestination {
  title: string;
  href: string;
}

export function ProjectFooter({ next, minimal = false }: { next: ProjectDestination; minimal?: boolean }) {
  return <footer className={`${styles.footer} ${minimal ? styles.minimal : ""}`} aria-label="Project footer">
    <div className={styles.container}>
      <nav className={styles.navigation} aria-label="Project navigation">
        <PortfolioLink className={styles.back} href="index.html#work">
          {minimal ? null : <span aria-hidden="true">←</span>} Back to Work
        </PortfolioLink>
        <PortfolioLink className={styles.next} href={next.href} aria-label={`Next project: ${next.title}`}>
          <span className={styles.label}>Next Project</span>
          <span className={styles.title}>{next.title}{minimal ? null : <span className={styles.arrow} aria-hidden="true">→</span>}</span>
        </PortfolioLink>
      </nav>
      <CaseSignature />
    </div>
  </footer>;
}
