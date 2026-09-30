import { happilyAsset } from "../happilyMedia";
import styles from "./PrototypeScreens.module.scss";

export function AppStatusBar() {
  return <div aria-hidden="true">
    <span className={styles.wifi}><img src={happilyAsset("prototype/system-icons.png")} alt="" /></span>
    <span className={styles.battery}><img src={happilyAsset("prototype/system-icons.png")} alt="" /></span>
    <span className={styles.signal}><img src={happilyAsset("prototype/system-icons.png")} alt="" /></span>
    <img className={styles.clock} src={happilyAsset("prototype/clock.svg")} alt="" />
  </div>;
}

/** Original 412 × 917 artwork coordinates; the dialog scales the entire canvas. */
export function AppArtwork({ showBrand }: { showBrand: boolean }) {
  return <>
    <div className={styles.artwork} aria-hidden="true">
      {[
        { left: .144, top: 146.957, width: 61.739, height: 27.498 },
        { left: 358.134, top: 395.331, width: 61.739, height: 27.498 },
        { left: 6.088, top: 787.654, width: 61.739, height: 27.498 },
        { left: 362.779, top: 685.444, width: 32.381, height: 14.422 },
        { left: 7.687, top: 513.027, width: 32.381, height: 14.422 },
      ].map(rect => <span key={rect.top} className={styles.cloudBase} style={rect} />)}
      {[
        { x: -109.312, y: 62.344, small: false, flip: true },
        { x: 292.148, y: 310.718, small: false, flip: false },
        { x: -103.367, y: 703.041, small: false, flip: true },
        { x: 328.172, y: 641.066, small: true, flip: false },
        { x: -49.721, y: 468.649, small: true, flip: true },
      ].map(({ x, y, small, flip }) => <img key={y} className={styles.cloud} style={{ left: x, top: y, width: small ? 124.396 : 237.18, height: small ? 62.889 : 119.907, transform: flip ? "scaleX(-1)" : undefined }} src={happilyAsset(`prototype/cloud-${small ? "small" : "large"}.svg`)} alt="" />)}
      <AppStatusBar />
    </div>
    {showBrand && <header className={styles.brand}>
      <img src={happilyAsset("prototype/logo.png")} width="93" height="77" alt="כאן גרים בכיף" />
      <p>משחק לנשימה</p>
      <h3 tabIndex={-1}>מרחב משחק משפחתי</h3>
      <p className={styles.subtitle}>ניהול ומעקב</p>
    </header>}
  </>;
}
