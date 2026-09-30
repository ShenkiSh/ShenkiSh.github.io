import { PortfolioLink } from "./PortfolioLink";
import styles from "./CaseSignature.module.scss";

export function CaseSignature() {
  return <div className={styles.signature}>
    <PortfolioLink href="index.html">SHANI SHLOMOV</PortfolioLink>
    <span>© 2026 Shani Shlomov</span>
  </div>;
}
