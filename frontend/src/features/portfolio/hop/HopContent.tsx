import { lazy, Suspense, useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseVideo, type CaseVideoHandle } from "../CaseVideo";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { PortfolioLink } from "../PortfolioLink";
import { chaseMoments, hopChapters, hopImages, storyCards, type HopCard, type HopImageName } from "./hopContentData";
import actions from "../CaseActions.module.scss";
import styles from "./HopContent.module.scss";

const HopGameDialog = lazy(() => import("./HopGameDialog").then(module => ({ default: module.HopGameDialog })));

function Still({ name }: { name: HopImageName }) {
  return <img className={styles.still} data-hop-image={name} src={asset(`assets/hop/${name}.webp`)}
    alt={hopImages[name]} width={name === "refined" ? 1672 : 1920} height={name === "refined" ? 941 : 1080}
    loading="lazy" decoding="async" />;
}

function Card({ image, title, copy }: HopCard) {
  return <figure><Still name={image} /><figcaption>
    <h3>{title}</h3>{copy ? <p>{copy}</p> : null}
  </figcaption></figure>;
}

export function HopContent() {
  const [gameOpen, setGameOpen] = useState(false);
  const recording = useRef<CaseVideoHandle>(null);
  useExclusiveCaseMedia();
  function watchRecording() { setGameOpen(false); recording.current?.playFrom(0); }
  return <article className={styles.page} data-hop-case>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.identity}>
        <h1>Hop! <br />It’s the Chef!</h1>
        <p className={styles.subtitle}>2D Action-Escape Game</p>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.hook}>A tiny frog. A furious chef. A kitchen to escape.</p>
        <p className={styles.muted}>I designed a playful chase where the player reads danger, dodges kitchen hazards and finds a moment of safety before moving on.</p>
        <p className={styles.role}>Game &amp; Level Design · Visual Development · Unity</p>
        <div className={styles.actions}>
          <PortfolioLink className={actions.primary} href="#watch">Explore the game</PortfolioLink>
          <button className={actions.secondary} type="button" onClick={watchRecording}>Watch the full playthrough</button>
        </div>
      </div>
      <figure className={styles.heroMedia}>
        <CaseVideo film={{ src: asset("assets/hop/gameplay-preview.mp4"), poster: asset("assets/hop/gameplay-poster.webp"), title: "Hop gameplay preview", duration: "0:20" }} defaultMuted={false} />
        <figcaption>Gameplay from the rebuilt kitchen escape.</figcaption>
      </figure>
      <div id="story" className={styles.story}>
        <div className={styles.introduction}>
          <h2>From the swamp to the chef’s table.</h2>
          <p>Robert is taken from his quiet swamp to a French kitchen. He unlocks his cage with his tongue, and the escape begins.</p>
        </div>
        <div className={styles.storyFrames}>{storyCards.map(card => <Card key={card.image} {...card} />)}</div>
      </div>
    </header>
    <CaseChapterNavigation label="Hop! It’s the Chef! sections" chapters={hopChapters} showDivider={false} />
    <div className={styles.container}>
      <section id="gameplay" className={styles.section} aria-labelledby="gameplay-heading">
        <div id="level-design" className={styles.introduction}>
          <h2 id="gameplay-heading">Designing the chase.</h2>
          <p id="hazards">I introduce new hazards through three connected moments: a warning, a changing route and a place to recover.</p>
        </div>
        <div className={styles.moments}>
          {chaseMoments.map(moment => <figure key={moment.id} id={moment.id} className={styles.moment}>
            <CaseVideo film={{ src: asset(`assets/hop/${moment.file}.mp4`), poster: asset(`assets/hop/${moment.file}.jpg`), title: moment.videoTitle, duration: moment.duration }} defaultMuted={false} />
            <figcaption><h3>{moment.title}</h3><p>{moment.copy}</p></figcaption>
          </figure>)}
        </div>
      </section>
      <section id="onboarding" className={styles.section} aria-labelledby="onboarding-heading">
        <div className={styles.introduction}>
          <h2 id="onboarding-heading">Learning before the pressure builds.</h2>
          <p>I give players two ways to learn: guidance inside the story and a separate space to practice safely.</p>
        </div>
        <div id="feedback" className={styles.twoColumns}>
          <Card image="gaspard" title="Guidance inside the story" copy="Gaspard introduces actions as the player reaches them. Short dialogue connects the next step to the escape." />
          <Card image="tutorial" title="Room to try again" copy="The interactive tutorial lets players practice movement, dodging, hiding and the towel action without losing health." />
        </div>
      </section>
      <section id="art" className={styles.section} aria-labelledby="art-heading">
        <div className={styles.introduction}>
          <h2 id="art-heading">An original world, developed further.</h2>
          <p>The characters and visual language began with my illustrations. I refined the artwork with AI-assisted tools, then prepared the assets manually for animation and gameplay.</p>
        </div>
        <div className={styles.twoColumns}>
          <Card image="drawing" title="My original illustration" copy="Robert’s family, lily pads and parasol establish the swamp’s playful character." />
          <Card image="refined" title="Refined for the game" copy="The same characters and composition, with updated detail and finish." />
        </div>
        <div id="iteration" className={styles.development}>
          <div className={styles.introduction}>
            <h3>Returning to an earlier game.</h3>
            <p>I kept the frog’s kitchen escape and rebuilt the experience around visible warnings, places to recover and guidance through the level.</p>
          </div>
          <div className={styles.twoColumns}>
            <Card image="old" title="Earlier version" copy="The original kitchen, food obstacles and health bar." />
            <Card image="hero" title="Rebuilt version" copy="Three hearts show health; Gaspard gives the next action; the strainer marks a place to hide and recover." />
          </div>
        </div>
        <div id="unity" className={styles.production}>
          <div className={styles.productionCopy}>
            <h3>Built in Unity</h3>
            <p>I brought the chase, checkpoints, tutorial and story sequences into one playable experience.</p>
            <p className={styles.credit}>AI-assisted development supported scripting, debugging and system implementation. Game design, visual direction, iteration and Unity decisions remained under my direction.</p>
          </div>
          <figure><Still name="unity" /><figcaption>Story, subtitle and audio tracks in the Unity project.</figcaption></figure>
        </div>
      </section>
      <section id="watch" className={styles.section} aria-labelledby="watch-heading">
        <div className={styles.playArea}>
          <div className={styles.playCopy}>
            <h2 id="watch-heading">Find your way out of the kitchen.</h2>
            <p>Play the escape, or watch the complete journey from the tutorial to the ending.</p>
            <button className={actions.primary} type="button" onClick={() => setGameOpen(true)}>Play the game</button>
            <p className={styles.credit}>Unity · PC · Keyboard<br />WASD or arrows to move · Space to jump · E at the towel</p>
          </div>
          <figure>
            <CaseVideo ref={recording} film={{ src: asset("assets/hop/full-game.mp4"), poster: asset("assets/hop/gameplay-poster.webp"), title: "Hop full playthrough", duration: "12:19" }} defaultMuted={false} />
            <figcaption>Full playthrough · 12:19</figcaption>
          </figure>
        </div>
      </section>
    </div>
    {gameOpen && <Suspense fallback={<p className={styles.loading} role="status">Opening the game…</p>}>
      <HopGameDialog onClose={() => setGameOpen(false)} onWatch={watchRecording} />
    </Suspense>}
  </article>;
}
