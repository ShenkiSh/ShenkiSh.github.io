import { useState } from "react";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { CaseVideo } from "../CaseVideo";
import { PortfolioLink } from "../PortfolioLink";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { HappilyCharacters } from "./HappilyCharacters";
import { HappilyExperience } from "./HappilyExperience";
import { HappilyAppDialog } from "./prototype/HappilyAppDialog";
import { appFlowFilm, chapters, conflicts, happilyAsset, personalSpaceMedia, projectOverviewFilm, systemSteps } from "./happilyMedia";
import actions from "../CaseActions.module.scss";
import styles from "./HappilyCase.module.scss";

function Phone({ file, alt, caption, eager = false, size = [596, 1235] }: { file: string; alt: string; caption?: string; eager?: boolean; size?: readonly [number, number] }) {
  return <figure className={styles.phone}>
    <img src={happilyAsset(file)} alt={alt} width={size[0]} height={size[1]} loading={eager ? "eager" : "lazy"} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
export function HappilyCase() {
  const [appOpen, setAppOpen] = useState(false);
  useExclusiveCaseMedia();
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.identity}>
        <h1>We Live <br />Happily Here</h1>
        <p className={styles.subtitle}>Cooperative Family Game System</p>
        <p>A playful family system that turns everyday sibling conflicts into short cooperative games designed to create a brief emotional reset.</p>
        <p className={styles.label}>Game Design · UX/UI · Unity Prototype</p>
        <div className={styles.heroActions}>
          <button type="button" className={actions.primary} onClick={() => setAppOpen(true)}>Try the App</button>
          <PortfolioLink className={actions.secondary} href="#unity-game-01">Unity Game 01</PortfolioLink>
          <PortfolioLink className={actions.secondary} href="#unity-game-02">Unity Game 02</PortfolioLink>
        </div>
      </div>
      <div className={styles.heroPhones}>
        <Phone file="hero-app.png" alt="Parent app: choose children and start a shared game" caption="Parent / Start a shared reset" size={[412, 917]} eager />
        <Phone file="hero-lobby.png" alt="Children’s lobby: two players getting ready for the same game" caption="Children / Join the same game" size={[412, 917]} eager />
      </div>
    </header>
    <CaseChapterNavigation label="We Live Happily Here sections" chapters={chapters} showDivider={false} />
    <div className={styles.container}>
      <section className={styles.section} id="overview" aria-labelledby="overview-title">
        <div className={styles.copy}>
          <h2 id="overview-title">A Short Reset, Not a Lecture</h2>
          <p>Growing up with six siblings, I knew how quickly a small argument could turn into noise, stress and emotional overload.</p>
          <p>Could a short cooperative game create enough distance for siblings to calm down and coordinate again?</p>
          <p className={styles.muted}>The goal is a brief moment of regulation and reconnection. The game is not intended to teach a lesson or resolve the conflict.</p>
        </div>
        <HappilyCharacters variant="intro" />
      </section>
      <section className={styles.section} id="project-overview" aria-labelledby="project-film-title">
        <div className={styles.copy}><h2 id="project-film-title">How the Project Works</h2></div>
        <CaseVideo film={projectOverviewFilm} defaultMuted={false} />
      </section>
      <section className={styles.section} id="how-it-works" aria-labelledby="how-title">
        <div className={styles.copy}>
          <h2 id="how-title">How It Works</h2>
          <p className={styles.label}>Two phones · Cooperative · Up to 3 minutes · Parent initiated</p>
        </div>
        <ol className={styles.steps}>{systemSteps.map((step, i) => <li key={step}><span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span><span>{step}</span></li>)}</ol>
      </section>
      <section className={styles.section} id="conflicts" aria-labelledby="conflicts-title">
        <div className={styles.copy}>
          <h2 id="conflicts-title">Five Types of Conflict</h2>
          <p>The conflict determines the game. Each experience gives the two players a shared goal and a different reason to cooperate.</p>
        </div>
        <div className={styles.conflicts}>{conflicts.map(([title, file, caption]) => <figure key={title}>
          <h3>{title}</h3><div className={styles.conflictMedia}><img src={happilyAsset(file)} alt={`${title} game concept`} loading="lazy" /></div><figcaption>{caption}</figcaption>
        </figure>)}</div>
      </section>
      <section className={styles.section} id="cooperation" aria-labelledby="cooperation-title">
        <div className={styles.copy}>
          <h2 id="cooperation-title">From Personal Space Conflict to Cooperative Play</h2>
          <p>“That’s my space” becomes a shared route: two players guide one vehicle, and neither can control it alone.</p>
        </div>
        <div className={styles.deepDive}>
          <div className={styles.deepPhones}>
            <Phone file={personalSpaceMedia.gameplay} alt="Current Personal Space game: shared vehicle, swamp water and slippery mud" caption="Navigate the swamp together" size={[1080, 1920]} />
            <Phone file={personalSpaceMedia.summary} alt="Current Unity results for three stages, mistakes and cooperation" caption="Three stages, one shared summary" size={[1080, 1920]} />
          </div>
          <div className={styles.designDetails}>
            <div className={styles.copy}>
              <h3>Design goal</h3><p>Turn competing directions into a task that only works when both children coordinate.</p>
            </div>
            <div className={styles.copy}>
              <h3>One vehicle. Split controls.</h3>
              <div className={styles.controls}><p><span className={styles.label}>Player 1</span><strong>↑ ↓</strong>Up / down</p><p><span className={styles.label}>Player 2</span><strong>← →</strong>Left / right</p></div>
              <p>Listen to each other, watch for splashes and steer around the swamp and slippery mud.</p>
            </div>
            <div className={styles.copy}>
              <h3>Three stages, one shared result</h3><p>The same pair plays three short stages. The closing screen brings together stage times, mistakes and a cooperation indicator.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section} id="two-users" aria-labelledby="app-flow-title">
        <div className={styles.copy}><h2 id="app-flow-title">The Full App Flow</h2></div>
        <CaseVideo film={appFlowFilm} posterLabel="Watch the full app flow" defaultMuted={false} />
      </section>
      <HappilyExperience onOpenApp={() => setAppOpen(true)} />
      <section className={styles.section} id="game-ui" aria-labelledby="game-ui-title">
        <div className={styles.copy}><h2 id="game-ui-title">Game UI System</h2><p>UI for every stage of the family experience.</p></div>
        <div className={styles.uiExamples}>{([
          ["Setup UI", "setup-screen.png", "Choose players + conflict", 412, 917, styles.uiScreen], ["Gameplay UI", "gameplay-ui.png", "Instructions + shared HUD", 396, 720, undefined],
          ["Results UI", "results-ui.png", "Shared summary", 380, 567, undefined], ["Parent UI", "parent-ui.png", "Activity + feedback", 350, 705, undefined],
        ] as const).map(([title, file, caption, width, height, imageClass]) => <figure key={title}><h3>{title}</h3><div className={styles.uiMedia}><img className={imageClass} src={happilyAsset(file)} alt={`${title}: ${caption}`} width={width} height={height} loading="lazy" /></div><figcaption>{caption}</figcaption></figure>)}</div>
      </section>
      <section className={styles.section} aria-labelledby="rewards-title">
        <div className={styles.copy}><h3 id="rewards-title">Encouraging Cooperation Over Time</h3><p>Weekly shared achievement + parent feedback.</p></div>
        <div className={styles.rewards}><img src={happilyAsset("weekly-achievement.png")} width="200" height="340" alt="Weekly achievement card with parent feedback" loading="lazy" /></div>
      </section>
      <section className={styles.section} aria-labelledby="visual-title">
        <div className={styles.copy}><h3 id="visual-title">Visual Language &amp; Characters</h3><p>Soft blue app screens, warm woodland games and animated family avatars make the system feel welcoming. Character customization gives each player a distinct identity.</p></div>
        <HappilyCharacters />
      </section>
      <p className={styles.closing}>A shared game. A moment to reconnect.</p>
    </div>
    {appOpen && <HappilyAppDialog onClose={gameId => {
      setAppOpen(false);
      if (gameId) requestAnimationFrame(() => {
        const target = document.getElementById(gameId);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
        target?.focus({ preventScroll: true });
      });
    }} />}
  </article>;
}
