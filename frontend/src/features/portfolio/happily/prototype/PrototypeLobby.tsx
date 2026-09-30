import { useEffect, useState } from "react";
import { happilyAsset, type FamilyGame } from "../happilyMedia";
import type { Invitation } from "./prototypeModel";
import { AppStatusBar } from "./PrototypeArtwork";
import app from "./PrototypeScreens.module.scss";
import styles from "./PrototypeLobby.module.scss";

/** Original Figma invitation frames 676:1532 and 816:13182, on a 412 × 917 canvas. */
export function PrototypeLobby({ invitation, game, onPlay }: {
  invitation: Invitation;
  game: FamilyGame;
  onPlay: (game: FamilyGame) => void;
}) {
  const [ready, setReady] = useState(false);
  const objects = invitation.conflict === "objects";
  const [partner, player] = invitation.players;

  useEffect(() => {
    if (!ready) return;
    // Let the original green ready state register before opening the Unity player.
    const timer = window.setTimeout(() => {
      setReady(false);
      onPlay(game);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [ready, game, onPlay]);

  return <section className={styles.lobby} aria-labelledby="lobby-title" data-conflict={invitation.conflict}>
    <img className={styles.background} src={happilyAsset(`prototype/lobby/${objects ? "objects" : "space"}-background.png`)} width="412" height="917" alt="" />
    <AppStatusBar />
    <h3 id="lobby-title" className={styles.heading} tabIndex={-1}>המשחק עוד רגע מתחיל!</h3>
    <div className={styles.cart} aria-hidden="true">
      <div className={styles.leafGroup}>
        <img className={styles.leaf} src={happilyAsset("prototype/lobby/leaf.svg")} alt="" />
        <img className={styles.shadow} src={happilyAsset("prototype/lobby/leaf-shadow.svg")} alt="" />
      </div>
      <img className={styles.characters} src={happilyAsset("prototype/lobby/cart-source.png")} alt="" />
    </div>
    <div className={styles.players} role="group" aria-label="מוכנות השחקנים">
      {invitation.players.map((member, index) => {
        const isReady = index === 0 || ready;
        return <div key={member.id} className={styles.player} data-ready={isReady} aria-label={`${member.name}: ${isReady ? "מוכן" : "עדיין לא מוכן"}`}>
          <span className={styles.board} data-ready={isReady}><img src={happilyAsset(`prototype/lobby/${isReady ? "ready" : "pending"}-board-source.png`)} alt="" /></span>
          <span className={styles.badge} data-ready={isReady}><img src={happilyAsset(`prototype/lobby/${isReady ? "ready" : "pending"}-badge-source.png`)} alt="" /></span>
          <span className={styles.name}>{member.name}</span>
          {index === 1 && !ready && <small className={styles.waiting}>{partner?.name} מחכה לך...</small>}
        </div>;
      })}
    </div>
    <div className={styles.description}>
      <p>{objects ? "משחק: קופצים ואוספים" : "משחק: שומרים על הגלגלים"}</p>
      <p>{objects ? "שני שחקנים מול האצטרובלים" : "שני שחקנים. מכונית אחת"}</p>
    </div>
    <button type="button" className={styles.ready} aria-pressed={ready} aria-disabled={ready} onClick={() => setReady(true)}>
      <span className={styles.buttonArtwork}><img src={happilyAsset("prototype/lobby/button-source.png")} alt="" /></span>
      <span className={styles.buttonLabel}>אני מוכן!</span>
    </button>
    <p role="status" className={app.srOnly}>{ready ? `${player?.name} מוכן. שני השחקנים מוכנים, המשחק מתחיל.` : ""}</p>
  </section>;
}
