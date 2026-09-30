import { useEffect, useRef } from "react";
import { happilyAsset } from "../happilyMedia";
import { weeklyTeam } from "./activityContent";
import type { ScreenProps } from "./PrototypeScreens";
import app from "./PrototypeScreens.module.scss";
import styles from "./PrototypeWeeklyCard.module.scss";

function printWeeklyCard(artwork: string, label: string) {
  const preview = window.open("", "_blank", "popup,width=520,height=980");
  if (!preview) return;
  preview.opener = null;
  preview.document.title = `קלף השבוע — ${label}`;
  preview.document.body.style.margin = "0";
  const image = preview.document.createElement("img");
  image.alt = `קלף השבוע: צוות אחים — ${label}`;
  image.style.cssText = "display:block;height:95vh;width:auto;max-width:100%;margin:auto";
  image.onload = () => { preview.focus(); preview.print(); };
  image.src = new URL(happilyAsset(`prototype/${artwork}`), window.location.href).href;
  preview.document.body.append(image);
}

export function PrototypeWeeklyCard({ state, dispatch, onClose }: ScreenProps & { onClose: () => void }) {
  const previous = useRef<HTMLButtonElement>(null);
  const team = weeklyTeam(state.selectedWeeklyTeam);
  const sent = state.sentWeeklyTeams.includes(team.id);
  useEffect(() => { previous.current?.focus({ preventScroll: true }); }, []);
  return <section className={styles.weekly} aria-label="קלף השבוע" data-team={team.id}>
    <img src={happilyAsset(`prototype/${team.artwork}`)} width="412" height="917" alt={`קלף השבוע: צוות אחים — ${team.label}. 6 משחקים משותפים יחד עד הסוף.`} />
    <div className={styles.selector} role="group" aria-label="בחירת צוות אחים">
      <span className={app.srOnly} aria-live="polite">צוות אחים: {team.label}</span>
      <button ref={previous} className={styles.previous} type="button" aria-label="הצוות הקודם" onClick={() => dispatch({ type: "cycle-award-team", step: -1 })} />
      <button className={styles.next} type="button" aria-label="הצוות הבא" onClick={() => dispatch({ type: "cycle-award-team", step: 1 })} />
    </div>
    <button className={styles.dismissAward} type="button" aria-label="סגירת קלף השבוע" onClick={onClose} />
    <button className={styles.sendAward} type="button" aria-label="שלח לשחקנים" aria-pressed={sent} disabled={sent} onClick={() => dispatch({ type: "send-award" })} />
    <span className={app.srOnly} role="status">{sent ? `קלף השבוע נשלח לצוות ${team.label}` : ""}</span>
    <button className={styles.printAward} type="button" onClick={() => printWeeklyCard(team.artwork, team.label)} aria-label="הדפס PDF" />
  </section>;
}
