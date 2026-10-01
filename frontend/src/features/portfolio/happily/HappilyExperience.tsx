import { useState } from "react";
import { appPrototype, unityGames } from "./happilyMedia";
import type { FamilyGame } from "./happilyMedia";
import { CaseVideo } from "../CaseVideo";
import { HappilyGameDialog } from "./HappilyGameDialog";
import actions from "../CaseActions.module.scss";
import styles from "./HappilyCase.module.scss";

export function HappilyExperience({ onOpenApp }: { onOpenApp: () => void }) {
  const [activeGame, setActiveGame] = useState<FamilyGame | null>(null);
  return <section className={styles.chapter} id="try-it" aria-labelledby="try-title">
    <div className={styles.chapterHeading}>
      <div className={styles.copy}><p className={styles.label}>Explore the prototypes</p><h2 id="try-title">From the app<br />into the game.</h2></div>
      <p>Explore the family flow, then play Personal Space and Objects. These browser demos use a simulated partner.</p>
    </div>
    <div className={styles.experienceBody}>
      <div className={styles.appExperience} id="app-prototype" tabIndex={-1}>
        <div className={styles.copy}>
          <h3>Explore the family app</h3>
          <p>Choose the players, send a game invitation and explore the family’s activity.</p>
        </div>
        <div className={styles.appActions}>
          <button type="button" className={actions.primary} onClick={onOpenApp}>Try the App</button>
          <a className={actions.secondary} href={appPrototype} target="_blank" rel="noreferrer">Original Figma prototype</a>
        </div>
      </div>
      <div className={styles.gamePlayers}>
        {unityGames.map(game => <section key={game.id} className={styles.gamePlayer} id={game.id} tabIndex={-1} aria-labelledby={`${game.id}-title`}>
          <div className={styles.gameCopy}>
            <h3 id={`${game.id}-title`}>{game.title}</h3>
            <p>{game.description}</p>
            <button type="button" className={`${actions.primary} ${styles.gameLaunch}`} onClick={() => setActiveGame(game)}>Play {game.title}</button>
          </div>
          <div className={styles.gameRecording}><CaseVideo film={game.recording} aspectRatio="498 / 1079" posterLabel="Watch gameplay" defaultMuted={false} /></div>
        </section>)}
      </div>
    </div>
    {activeGame && <HappilyGameDialog game={activeGame} onClose={() => setActiveGame(null)} />}
  </section>;
}
