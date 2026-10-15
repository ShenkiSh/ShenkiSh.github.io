import styles from "./NumiAward.module.scss";

export function NumiAward() {
  return <p className={styles.award}>
    <strong>Indie Game Award 2027 — Finalist</strong>
    <em>Best Social Impact · Best Student Game</em>
    <em>Taipei Game Show</em>
  </p>;
}
