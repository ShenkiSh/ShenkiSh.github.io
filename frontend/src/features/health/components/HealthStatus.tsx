import { Button } from "@/components/ui/Button";
import styles from "@/features/health/components/HealthStatus.module.scss";
import { useHealth } from "@/features/health/hooks/useHealth";
import { classNames } from "@/shared/utils/classNames";

export function HealthStatus() {
  const health = useHealth();

  if (health.status === "unconfigured") {
    return (
      <section className={styles.card} aria-live="polite">
        <span className={classNames(styles.indicator, styles.inactive)} aria-hidden="true" />
        <div>
          <h2 className={styles.title}>Frontend ready for GitHub Pages</h2>
          <p className={styles.description}>
            Add the VITE_API_BASE_URL repository variable to connect a separately hosted API.
          </p>
        </div>
      </section>
    );
  }

  if (health.status === "loading") {
    return (
      <section className={styles.card} aria-live="polite" aria-busy="true">
        <span className={styles.indicator} aria-hidden="true" />
        <div>
          <h2 className={styles.title}>Checking the API</h2>
          <p className={styles.description}>The web app is waiting for the service response.</p>
        </div>
      </section>
    );
  }

  if (health.status === "error") {
    return (
      <section className={styles.card} role="alert">
        <span className={classNames(styles.indicator, styles.error)} aria-hidden="true" />
        <div className={styles.content}>
          <h2 className={styles.title}>API unavailable</h2>
          <p className={styles.description}>{health.message}</p>
          <Button variant="secondary" onClick={health.refresh}>
            Try again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.card} aria-live="polite">
      <span className={classNames(styles.indicator, styles.success)} aria-hidden="true" />
      <div>
        <h2 className={styles.title}>Full stack connected</h2>
        <p className={styles.description}>
          {health.data.service} version {health.data.version} responded successfully.
        </p>
      </div>
    </section>
  );
}
