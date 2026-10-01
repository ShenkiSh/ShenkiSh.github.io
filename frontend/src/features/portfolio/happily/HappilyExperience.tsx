import { useState } from "react";
import { appPrototype, unityGames } from "./happilyMedia";
import type { FamilyGame } from "./happilyMedia";
import { PortfolioLink } from "../PortfolioLink";
import { CaseVideo } from "../CaseVideo";
import { HappilyGameDialog } from "./HappilyGameDialog";
import actions from "../CaseActions.module.scss";
import styles from "./HappilyCase.module.scss";

export function HappilyExperience({ onOpenApp }: { onOpenApp: () => void }) {
  const [activeGame, setActiveGame] = useState<FamilyGame | null>(null);
  return <section className={styles.chapter} id="try-it" aria-labelledby="try-title">
    <div className={styles.chapterHeading}>
      <div className={styles.copy}><p className={styles.label}>05 / Explore the prototypes</p><h2 id="try-title">From the app<br />into the game.</h2></div>
      <div className={styles.copy}><p>Explore the family flow, then play Personal Space and Objects. These browser demos use a simulated partner.</p><div className={styles.gameLinks}><PortfolioLink href="#unity-game-01">Unity Game 01</PortfolioLink><PortfolioLink href="#unity-game-02">Unity Game 02</PortfolioLink></div></div>
    </div>
    <div className={styles.experienceBody}>
      <div className={styles.appExperience} id="app-prototype" tabIndex={-1}>
        <div className={styles.copy}>
          <span className={styles.label}>Interactive App</span><h3>Try the App</h3>
          <p>Choose the players, send a game invitation and explore the family’s activity.</p>
        </div>
        <div className={styles.appActions}>
          <button type="button" className={actions.primary} onClick={onOpenApp}>Try the App</button>
          <a className={styles.figmaLink} href={appPrototype} target="_blank" rel="noreferrer">Original Figma prototype</a>
        </div>
      </div>
      <div className={styles.gamePlayers}>
        {unityGames.map((game, i) => <section key={game.id} className={styles.gamePlayer} id={game.id} tabIndex={-1} aria-labelledby={`${game.id}-title`}>
          <span className={styles.label}>Game 0{i + 1} · Unity</span><h3 id={`${game.id}-title`}>{game.title}</h3>
          <p>{game.description}</p>
          <div className={styles.gameViewport}>
            <div className={styles.gameRecording}><CaseVideo film={game.recording} aspectRatio="498 / 1079" posterLabel="Watch gameplay" defaultMuted={false} /></div>
          </div>
          <button type="button" className={`${actions.primary} ${styles.gameLaunch}`} onClick={() => setActiveGame(game)}>Play Game 0{i + 1}</button>
        </section>)}
      </div>
    </div>
    {activeGame && <HappilyGameDialog game={activeGame} onClose={() => setActiveGame(null)} />}
  </section>;
}
