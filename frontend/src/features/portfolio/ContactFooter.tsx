import { CaseSignature } from "./CaseSignature";
import styles from "./ContactFooter.module.scss";

export function ContactFooter() {
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <CaseSignature />
    </div>
  </footer>;
}
