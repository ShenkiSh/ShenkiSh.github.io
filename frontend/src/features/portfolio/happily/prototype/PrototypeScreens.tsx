import { type Dispatch } from "react";
import { happilyAsset } from "../happilyMedia";
import { ChoiceButton, PlayerChoice, PlayerPair } from "./PrototypeChoices";
import { conflictChoices, prototypeReducer, type PrototypeState } from "./prototypeModel";
import styles from "./PrototypeScreens.module.scss";
export { ActivityScreen, AddPlayerScreen, RegistrationScreen } from "./PrototypeDetails";

export type ScreenProps = { state: PrototypeState; dispatch: Dispatch<Parameters<typeof prototypeReducer>[1]> };

export function FamilyScreen({ state, dispatch }: ScreenProps) {
  return <>
    <button type="button" className={`${styles.primary} ${styles.newGame}`} disabled={state.selected.length !== 2} data-ready={state.selected.length === 2} onClick={() => dispatch({ type: "navigate", screen: "conflict" })}>משחק חדש</button>
    <h4 className={styles.familyTitle}>בחירת משתמשים</h4>
    <div role="group" aria-label="בחירת משתמשים">
      {state.players.map(player => <PlayerChoice key={player.id} player={player} selected={state.selected.includes(player.id)} onClick={() => dispatch({ type: "toggle-player", id: player.id })} />)}
    </div>
    <p className={styles.srOnly} role="status">{state.message}</p>
    <button className={styles.smallButton} type="button" onClick={() => dispatch({ type: "navigate", screen: "activity" })}>סטטוס</button>
    <button className={`${styles.smallButton} ${styles.addButton}`} type="button" onClick={() => dispatch({ type: "navigate", screen: "add-player" })}>
      שחקן חדש<img src={happilyAsset("prototype/add.svg")} alt="" />
    </button>
  </>;
}

export function ConflictScreen({ state, dispatch }: ScreenProps) {
  const players = state.selected.flatMap(id => state.players.filter(p => p.id === id));
  return <>
    <PlayerPair players={players} />
    <h4 className={styles.conflictTitle}>בחירת סוג מריבה</h4>
    <div className={styles.conflictGrid} role="group" aria-label="בחירת סוג מריבה">
      {conflictChoices.map((conflict, i) => <div key={conflict.id} style={{ left: i === 4 ? 138.865 : i % 2 === 0 ? 59.527 : 215.697, top: 432.27 + Math.floor(i / 2) * 81.158 }}>
        <ChoiceButton selected={state.conflict === conflict.id} onClick={() => dispatch({ type: "choose-conflict", id: conflict.id })} aria-label={conflict.title}>
          <span>{conflict.title}</span>
        </ChoiceButton>
        <small className={styles.quote}>{conflict.quote}</small>
      </div>)}
    </div>
    <button type="button" className={`${styles.primary} ${styles.send}`} disabled={!state.conflict} data-ready={!!state.conflict} onClick={() => dispatch({ type: "send" })}>שלח הזמנה</button>
  </>;
}

export function ChildPhoneScreen({ state, onOpen }: { state: PrototypeState; onOpen: () => void }) {
  const invitation = state.invitations[0];
  const registration = state.childScreen === "registration-invite";
  const title = registration ? "יש לך הזמנה מאמא" : "יש לך הזמנה למשחק!";
  return <>
    <img className={styles.fullScreenArtwork} src={happilyAsset(`prototype/${registration ? "child/registration-invite" : "invitation"}.png`)} width="412" height="917" alt="" />
    <h3 tabIndex={-1} className={styles.srOnly}>{title}</h3>
    {!registration && invitation && <>
      <p className={styles.srOnly}>{invitation.players.map(p => p.name).join(" ו")} · {conflictChoices.find(c => c.id === invitation.conflict)?.title}</p>
    </>}
    <button className={styles.notification} type="button" aria-label={registration ? "הצטרפות לאפליקציה" : title} onClick={onOpen} />
  </>;
}

export function ParentCompletionScreen({ dispatch }: Pick<ScreenProps, "dispatch">) {
  return <>
    <img className={styles.fullScreenArtwork} src={happilyAsset("prototype/parent-completion.png")} width="412" height="917" alt="" />
    <h3 tabIndex={-1} className={styles.srOnly}>המשחק הסתיים</h3>
    <button className={styles.parentNotification} type="button" aria-label="המשחק הסתיים — כניסה לאפליקציה" onClick={() => dispatch({ type: "navigate", screen: "family" })} />
  </>;
}
