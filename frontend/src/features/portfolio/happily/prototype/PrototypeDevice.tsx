import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { AppView } from "./prototypeModel";
import styles from "./PrototypeDevice.module.scss";
import app from "./PrototypeScreens.module.scss";

export function PrototypeDevice({ view, active, label, screenName, screenRef, onBack, backLabel, status, children }: {
  view: AppView;
  active: boolean;
  label: string;
  screenName: string;
  screenRef: RefObject<HTMLDivElement | null>;
  onBack?: () => void;
  backLabel?: string;
  status?: string;
  children: ReactNode;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = () => {
      const width = element.getBoundingClientRect().width;
      if (width > 0) setScale(width / 412);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section className={styles.device} data-device={view} data-active={active} aria-label={`התצוגה של ${label}`}>
    <header className={styles.header} dir="rtl">
      <h2>{label}</h2>
      <span className={styles.status} aria-live="polite">{status}</span>
      {onBack && <button type="button" onClick={onBack} aria-label={backLabel}>←</button>}
    </header>
    <div ref={viewport} className={styles.viewport}>
      <div className={styles.clip}>
        <div ref={screenRef} className={app.screen} style={{ transform: `scale(${scale})` }} dir="rtl" lang="he" data-screen={screenName}>
          {children}
        </div>
      </div>
    </div>
  </section>;
}
