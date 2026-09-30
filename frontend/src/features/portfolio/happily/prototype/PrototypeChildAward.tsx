import { happilyAsset } from "../happilyMedia";
import type { ScreenProps } from "./PrototypeScreens";
import app from "./PrototypeScreens.module.scss";
import styles from "./PrototypeChildAward.module.scss";

export function PrototypeChildAward({ state, dispatch }: ScreenProps) {
  const notification = state.childScreen === "award-notification";
  return <>
    <img className={app.fullScreenArtwork} src={happilyAsset(`prototype/child/${notification ? "award-notification" : "weekly-award"}.png`)} width="412" height="917" alt="" />
    <h3 className={app.srOnly} tabIndex={-1}>{notification ? "קיבלת את קלף השבוע!" : "קלף השבוע!"}</h3>
    {notification ? <>
      <p className={app.srOnly}>אמא בחרה בך וביובל לקבל את קלף השבוע.</p>
      <button type="button" className={styles.notification} aria-label="פתיחת קלף השבוע" onClick={() => dispatch({ type: "open-award" })} />
    </> : <>
      <section className={app.srOnly} aria-label="תעודת הצטיינות">
        <p>כל הכבוד! אתם מצטייני השבוע. על 6 משחקים ששיחקתם יחד עד הסוף.</p>
        <p>צוות אחים: דני ויובל. השבוע: 6 ריסטים, 6 משחקים, זרימה טובה.</p>
        <p>מה הכי הפעיל השבוע? חפצים, תחרות, מרחב אישי.</p>
      </section>
      <button type="button" className={styles.close} aria-label="סגירת קלף השבוע וחזרה הביתה" onClick={() => dispatch({ type: "child-home" })} />
    </>}
  </>;
}
