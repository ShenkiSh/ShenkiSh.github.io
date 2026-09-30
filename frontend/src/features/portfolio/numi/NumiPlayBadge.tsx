import { NumiMediaIcon } from "./NumiMediaIcon";
import styles from "../CaseVideo.module.scss";

export function NumiPlayBadge({ duration, label }: { duration: string; label?: string }) {
  return <span className={styles.badge} aria-hidden="true"><NumiMediaIcon name="play" />{label && <span>{label}</span>}<span className={styles.duration}>{duration}</span></span>;
}
