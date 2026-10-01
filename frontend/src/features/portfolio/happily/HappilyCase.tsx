import { useState } from "react";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { CaseVideo } from "../CaseVideo";
import { PortfolioLink } from "../PortfolioLink";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { HappilyCharacters } from "./HappilyCharacters";
import { HappilyExperience } from "./HappilyExperience";
import { HappilyMediaDialog, type HappilyMedia } from "./HappilyMediaDialog";
import { HappilyAppDialog } from "./prototype/HappilyAppDialog";
import { chapters, conflicts, familyFlow, happilyAsset, personalSpaceMedia, projectOverviewFilm } from "./happilyMedia";
import actions from "../CaseActions.module.scss";
import styles from "./HappilyCase.module.scss";

export function HappilyCase() {
  const [appOpen, setAppOpen] = useState(false);
  const [media, setMedia] = useState<HappilyMedia | null>(null);
  useExclusiveCaseMedia();
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.identity}>
        <h1>We Live <br />Happily Here</h1>
        <p className={styles.label}>Cooperative Family Game System</p>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.lead}>Turning everyday sibling conflicts into a moment of playing together.</p>
        <p className={styles.muted}>I designed the concept, parent and child journeys, visual language and cooperative games, connecting the app experience to two Unity prototypes.</p>
        <div className={styles.heroActions}>
          <button type="button" className={actions.primary} onClick={() => setAppOpen(true)}>Try the App</button>
          <PortfolioLink className={actions.secondary} href="#try-it">Explore the games</PortfolioLink>
        </div>
      </div>
      <button type="button" className={styles.heroImage} aria-label="Enlarge the family app mockup" onClick={() => setMedia("photo")}>
        <img src={happilyAsset("family-app-mockup.webp")} width="1920" height="1080" alt="The family app in use: a parent choosing players on a phone" fetchPriority="high" />
      </button>
    </header>
    <CaseChapterNavigation label="We Live Happily Here sections" chapters={chapters} showDivider={false} />
    <div className={styles.container}>
      <section className={styles.section} id="overview" aria-labelledby="overview-title">
        <div className={styles.copy}>
          <p className={styles.label}>01 The idea</p>
          <h2 id="overview-title">A small pause.<br />A shared goal.</h2>
          <p>Growing up with six siblings, I knew how quickly a small argument could become overwhelming.</p>
          <p>My starting question: could a short cooperative game help siblings step away from an argument and coordinate again?</p>
          <p className={styles.muted}>The design aims to create a brief reset, rather than solve the conflict itself.</p>
        </div>
        <div id="project-overview" className={styles.film}>
          <CaseVideo film={projectOverviewFilm} posterLabel="The idea in 20 seconds" defaultMuted={false} />
        </div>
      </section>
      <section className={styles.chapter} id="how-it-works" aria-labelledby="how-title">
        <div className={styles.chapterHeading}>
          <div className={styles.copy}><p className={styles.label}>02 The family flow</p><h2 id="how-title">Two roles.<br />One connected experience.</h2></div>
          <p>The parent starts the invitation. The children take over through play. A shared result closes the loop and brings the parent back in.</p>
        </div>
        <div className={styles.flow}>
          {familyFlow.map(({ title, role, file, caption, size }, index) => <figure key={title}>
            <div className={styles.flowMedia}><img src={happilyAsset(file)} width={size[0]} height={size[1]} loading="lazy" alt={`${title}: ${caption}`} /></div>
            <figcaption><span className={styles.label}>0{index + 1} {role}</span><h3>{title}</h3><p>{caption}</p></figcaption>
          </figure>)}
        </div>
        <div className={styles.flowWatch} id="two-users" role="region" aria-labelledby="flow-watch-title">
          <div className={styles.flowWatchCopy}>
            <h3 id="flow-watch-title">Follow the family journey</h3>
            <p>See how the invitation, game and feedback connect.</p>
          </div>
          <button type="button" className={styles.flowWatchButton} aria-label="Watch the full app flow" onClick={() => setMedia("film")}>Watch the full app flow<span className={styles.duration}>4:24</span></button>
        </div>
      </section>
      <section className={styles.chapter} id="conflicts" aria-labelledby="conflicts-title">
        <div className={styles.chapterHeading}>
          <div className={styles.copy}><p className={styles.label}>03 Game design</p><h2 id="conflicts-title">A familiar conflict.<br />A different way to play.</h2></div>
          <p>Five everyday conflicts became five game concepts. Personal Space and Objects were developed into playable Unity prototypes.</p>
        </div>
        <div className={styles.conflicts}>{conflicts.map(([title, file, caption], index) => <figure key={title}>
          <div className={styles.conflictMedia}><img src={happilyAsset(file)} alt={`${title} game concept`} loading="lazy" /></div>
          <figcaption><h3>{title}</h3><p>{caption}</p><span className={styles.status}>{index < 2 ? "Playable prototype" : "Game concept"}</span></figcaption>
        </figure>)}</div>
        <div className={styles.cooperation} id="cooperation">
          <div className={styles.copy}>
            <p className={styles.label}>Inside Personal Space</p>
            <h3>One vehicle. Two points of view.</h3>
            <p>“That’s my space” becomes a shared route. In the cooperative design, one child controls up and down, and the other left and right. Progress depends on coordinating their directions.</p>
            <p>The same pair plays three short stages. Times, mistakes and a cooperation indicator come together in one shared summary.</p>
            <PortfolioLink className={styles.textLink} href="#unity-game-01">Explore the Personal Space prototype</PortfolioLink>
          </div>
          <div className={styles.deepPhones}>
            <figure><img src={happilyAsset(personalSpaceMedia.gameplay)} alt="Current Personal Space game: shared vehicle, swamp water and slippery mud" width="1080" height="1920" loading="lazy" /><figcaption>Navigate the swamp together</figcaption></figure>
            <figure><img src={happilyAsset(personalSpaceMedia.summary)} alt="Current Unity results for three stages, mistakes and cooperation" width="1080" height="1920" loading="lazy" /><figcaption>Three stages, one shared summary</figcaption></figure>
          </div>
        </div>
      </section>
      <section className={styles.chapter} id="game-ui" aria-labelledby="visual-title">
        <div className={styles.chapterHeading}>
          <div className={styles.copy}><p className={styles.label}>04 Visual language</p><h2 id="visual-title">A world that feels<br />like theirs.</h2></div>
          <p>Soft blue app screens lead into warm woodland games. Familiar avatars, playful objects and shared rewards connect each part of the experience.</p>
        </div>
        <div className={styles.visualBoard}>
          <div className={styles.characterStory}>
            <HappilyCharacters />
            <div className={styles.caption}><h3>A character to make your own</h3><p>Color and accessories give each child a distinct identity before they enter the same game.</p></div>
          </div>
          <figure className={styles.rewardStory}>
            <div className={styles.rewardMedia}><img src={happilyAsset("weekly-achievement.png")} width="200" height="340" alt="Weekly shared achievement and parent feedback" loading="lazy" /></div>
            <figcaption className={styles.caption}><h3>A shared reason to return</h3><p>The weekly achievement carries cooperation back into the family’s activity and parent feedback.</p></figcaption>
          </figure>
        </div>
      </section>
      <HappilyExperience onOpenApp={() => setAppOpen(true)} />
      <div className={styles.reflection}><p className={styles.label}>Connecting the system</p><p>This project brought together the decisions between screens: who starts, what each player needs next, and how a game’s result returns to the family experience.</p></div>
    </div>
    {media && <HappilyMediaDialog media={media} onClose={() => setMedia(null)} />}
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
