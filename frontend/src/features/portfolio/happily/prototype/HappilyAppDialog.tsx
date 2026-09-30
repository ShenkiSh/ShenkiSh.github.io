import { useEffect, useReducer, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NumiMediaIcon } from "../../numi/NumiMediaIcon";
import { childBackLabel, hasPendingInvitation, initialPrototype, prototypeReducer } from "./prototypeModel";
import { ActivityScreen, AddPlayerScreen, ChildPhoneScreen, ConflictScreen, FamilyScreen, ParentCompletionScreen, RegistrationScreen } from "./PrototypeScreens";
import { AppArtwork } from "./PrototypeArtwork";
import { PrototypeDevice } from "./PrototypeDevice";
import { PrototypeChildHome } from "./PrototypeChildHome";
import { PrototypeChildAward } from "./PrototypeChildAward";
import { PrototypeLobby } from "./PrototypeLobby";
import { HappilyGameDialog } from "../HappilyGameDialog";
import { unityGames, type FamilyGame } from "../happilyMedia";
import styles from "./HappilyAppDialog.module.scss";

export function HappilyAppDialog({ onClose }: { onClose: (gameId?: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const parentScreen = useRef<HTMLDivElement>(null);
  const childScreen = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(prototypeReducer, initialPrototype);
  const [activeGame, setActiveGame] = useState<{ game: FamilyGame; invitationId: number } | null>(null);
  const invitation = state.invitations[0];
  const invitedGame = unityGames.find(game => game.id === (invitation?.conflict === "space" ? "unity-game-01" : invitation?.conflict === "objects" ? "unity-game-02" : ""));

  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.querySelectorAll<HTMLVideoElement>("video").forEach(video => video.pause());
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const screen = state.view === "parent" ? parentScreen : childScreen;
    screen.current?.querySelector<HTMLHeadingElement>("h3")?.focus({ preventScroll: true });
  }, [state.screen, state.childScreen, state.view, invitation?.id]);

  return createPortal(<><dialog ref={dialog} className={styles.dialog} aria-label="App Prototype" onCancel={() => onClose()}>
    <div className={styles.surface}>
      <div className={styles.workspace}>
        <div className={styles.toolbar}>
          <div className={styles.viewSwitch} role="group" aria-label="בחירת תצוגה" dir="rtl">
            <button type="button" aria-label="הצגת המסך של אמא" aria-pressed={state.view === "parent"} onClick={() => dispatch({ type: "view", view: "parent" })}>אמא{state.screen === "completion" && <span className={styles.unread} aria-hidden="true" />}</button>
            <button type="button" aria-label="הצגת המסך של הילד" aria-pressed={state.view === "child"} onClick={() => dispatch({ type: "view", view: "child" })}>הילד{(state.childScreen === "notification" || state.weeklyAward === "unread") && <span className={styles.unread} aria-hidden="true" />}</button>
          </div>
          <button className={styles.close} type="button" onClick={() => onClose()} aria-label="Close app prototype"><NumiMediaIcon name="close" /></button>
        </div>
        <div className={styles.devices}>
          <PrototypeDevice view="parent" active={state.view === "parent"} label="אמא" screenName={state.screen} screenRef={parentScreen}
            onBack={state.screen !== "family" ? () => dispatch({ type: "navigate", screen: "family" }) : undefined} backLabel="בחזרה למשפחה" status={state.screen === "completion" ? "המשחק הסתיים" : hasPendingInvitation(state) ? "ההזמנה נשלחה" : undefined}>
            {state.screen !== "completion" && <AppArtwork showBrand={state.screen !== "activity"} />}
            {state.screen === "completion" && <ParentCompletionScreen dispatch={dispatch} />}
            {state.screen === "family" && <FamilyScreen state={state} dispatch={dispatch} />}
            {state.screen === "conflict" && <ConflictScreen state={state} dispatch={dispatch} />}
            {state.screen === "activity" && <ActivityScreen state={state} dispatch={dispatch} />}
            {state.screen === "add-player" && <AddPlayerScreen state={state} dispatch={dispatch} />}
            {state.screen === "registration" && <RegistrationScreen state={state} dispatch={dispatch} />}
          </PrototypeDevice>
          <PrototypeDevice view="child" active={state.view === "child"} label="הילד" screenName={state.childScreen} screenRef={childScreen}
            onBack={state.childScreen !== "registration-invite" ? () => dispatch({ type: "child-back" }) : undefined} backLabel={childBackLabel(state)} status={state.childScreen === "award-notification" ? "קלף השבוע" : state.childScreen === "notification" ? "הזמנה חדשה" : undefined}>
            {state.childScreen === "award-notification" || state.childScreen === "award" ? <PrototypeChildAward state={state} dispatch={dispatch} />
              : state.childScreen === "home" ? <PrototypeChildHome state={state} dispatch={dispatch} /> : state.childScreen === "lobby" && invitation && invitedGame
              ? <PrototypeLobby key={invitation.id} invitation={invitation} game={invitedGame} onPlay={game => setActiveGame({ game, invitationId: invitation.id })} />
              : <ChildPhoneScreen state={state} onOpen={() => state.childScreen === "registration-invite" ? dispatch({ type: "child-home" }) : invitedGame ? dispatch({ type: "open-invitation" }) : onClose("try-it")} />}
          </PrototypeDevice>
        </div>
      </div>
    </div>
  </dialog>
    {activeGame && <HappilyGameDialog game={activeGame.game} onClose={() => setActiveGame(null)} onComplete={() => {
      dispatch({ type: "game-complete", invitationId: activeGame.invitationId });
      setActiveGame(null);
    }} />}
  </>, document.body);
}
