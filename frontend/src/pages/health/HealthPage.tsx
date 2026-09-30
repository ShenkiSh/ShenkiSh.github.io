import { HealthStatus } from "@/features/health/components/HealthStatus";
import styles from "./HealthPage.module.scss";

export function HealthPage() {
  return <div className={styles.page}><h1>Service health</h1><HealthStatus /></div>;
}
