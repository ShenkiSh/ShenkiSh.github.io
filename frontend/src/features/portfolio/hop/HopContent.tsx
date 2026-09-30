import { lazy, Suspense, useRef, useState, type ReactNode } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseVideo, type CaseVideoHandle } from "../CaseVideo";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { chefSequence, coreLoop, feedback, hazards, hopChapters, hopImages, levelStages, storyCards, type HopCard, type HopImageName } from "./hopContentData";
import styles from "./HopContent.module.scss";

const HopGameDialog = lazy(() => import("./HopGameDialog").then(module => ({ default: module.HopGameDialog })));

function Still({ name, eager = false }: { name: HopImageName; eager?: boolean }) {
  return <img className={styles.still} data-hop-image={name} src={asset(`assets/hop/${name}.webp`)}
    alt={hopImages[name]} width={name === "refined" ? 1672 : 1920} height={name === "refined" ? 941 : 1080} loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : "auto"} decoding="async" />;
}

function Card({ image, title, copy }: HopCard) {
  return <figure className={styles.card}><Still name={image} /><figcaption>
    <span className={styles.cardTitle}>{title}</span>{copy ? <p>{copy}</p> : null}
  </figcaption></figure>;
}

function Section({ number, id, title, intro, children }: { number: number; id: string; title: string; intro?: string; children: ReactNode }) {
  return <section id={id} className={`${styles.container} ${styles.section}`} aria-labelledby={`${id}-heading`}>
    <header className={styles.introduction}>
      <p className={styles.eyebrow} aria-hidden="true">{String(number).padStart(2, "0")} / {title}</p>
      <h2 id={`${id}-heading`}>{title}</h2>{intro ? <p className={styles.summary}>{intro}</p> : null}
    </header>
    {children}
  </section>;
}

export function HopContent() {
  const [gameOpen, setGameOpen] = useState(false);
  const recording = useRef<CaseVideoHandle>(null);
  useExclusiveCaseMedia();
  function watchRecording() { setGameOpen(false); recording.current?.playFrom(0); }
  return <article className={styles.page} data-hop-case>
    <header className={`${styles.container} ${styles.hero}`}>
      <h1>Hop! It’s the Chef!</h1>
      <p className={styles.subtitle}>2D Action-Escape Game · Unity</p>
      <p className={styles.hook}>A frantic, comedic escape through a French kitchen, where a tiny frog dodges the chef, hides under cookware and races toward freedom.</p>
      <dl className={styles.credits}>
        <div><dt>MY CONTRIBUTION</dt><dd>Game Design · Level Design · Visual Development · Unity Implementation</dd></div>
        <div><dt>ENGINE</dt><dd>Unity</dd></div>
        <div><dt>PLATFORM</dt><dd>PC · Keyboard</dd></div>
        <div><dt>ART</dt><dd>Original illustrations by me, refined with AI-assisted tools</dd></div>
      </dl>
      <div className={styles.actions}>
        <button className={styles.playGame} type="button" onClick={() => setGameOpen(true)}>Play the game</button>
        <button className={styles.watchLink} type="button" onClick={() => recording.current?.playFrom(0)}>Watch the full playthrough</button>
        <span className={styles.mediaNote}>Desktop · Keyboard</span>
      </div>
      <figure className={styles.heroMedia}>
        <CaseVideo film={{ src: asset("assets/hop/gameplay-preview.mp4"), poster: asset("assets/hop/gameplay-poster.webp"), title: "Hop gameplay preview", duration: "0:20" }} defaultMuted={false} />
        <figcaption className={styles.mediaNote}>Gameplay preview · From the current game</figcaption>
      </figure>
    </header>
    <CaseChapterNavigation label="Hop! It’s the Chef! sections" chapters={hopChapters} showDivider={false} />
    <Section number={2} id="story" title="From Swamp to Kitchen"
      intro="Robert lives peacefully in the swamp until he is captured and brought to an unfamiliar kitchen. After unlocking his cage with his tongue, he escapes onto the chef’s worktable — and the chase begins.">
      <div className={styles.fourColumns}>{storyCards.map(card => <Card key={card.image} {...card} />)}</div>
    </Section>
    <Section number={3} id="gameplay" title="Run. Read. Hide. Escape."
      intro="The level alternates between movement, anticipation and short bursts of danger, keeping the player under pressure without losing the comedic tone.">
      <ol className={styles.coreLoop}>{coreLoop.map((step, index) => <li key={step}>
        <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{step}</span>
      </li>)}</ol>
    </Section>
    <Section number={4} id="level-design" title="Escalating the Kitchen">
      <ol className={styles.levelSequence}>{levelStages.map((stage, index) => <li key={stage.image}>
        <Still name={stage.image} /><h3>{String(index + 1).padStart(2, "0")} / {stage.title}</h3><p>{stage.copy}</p>
      </li>)}</ol>
      <p className={styles.mediaNote}>One continuous kitchen / Complexity increases as new hazards and actions enter the chase.</p>
    </Section>
    <Section number={5} id="chef" title="The Chef Is the Level’s Main Threat"
      intro="The chef’s attempts to catch Robert can also destroy parts of the kitchen, opening new routes and turning the threat itself into part of the level design.">
      <div className={styles.fourColumns}>{chefSequence.map(card => <Card key={card.image} {...card} />)}</div>
    </Section>
    <Section number={6} id="hazards" title="Hazards & Reactions">
      <div className={styles.threeColumns}>{hazards.map(card => <Card key={card.image} {...card} />)}</div>
      <p className={styles.mediaNote}>Gameplay captures from the current build.</p>
    </Section>
    <Section number={7} id="safety" title="Safety Inside the Chaos"
      intro="New hiding spots also act as checkpoints, giving the player a moment of safety before the next section of the chase.">
      <div className={styles.mediaAndCopy}><Still name="cover" /><div className={styles.detail}>
        <h3>A small safe space.</h3>
        <ul><li>Hide beneath a strainer.</li><li>Stay visible through transparent cover.</li><li>Reach a new checkpoint.</li><li>Refill hearts before moving on.</li></ul>
      </div></div>
    </Section>
    <Section number={8} id="onboarding" title="Learning Without Stopping the Game"
      intro="The player can learn through the story or practice separately without losing health.">
      <div className={styles.twoColumns}>
        <div className={styles.learning}><Still name="gaspard" /><h3>Gaspard</h3><p className={styles.eyebrow}>Story-driven onboarding</p>
          <p>Warns about hazards, teaches hiding and reacts to progress. Later, his capture becomes part of the chase.</p></div>
        <div className={styles.learning}><Still name="tutorial" /><h3>How to Play</h3><p className={styles.eyebrow}>Safe interactive practice</p>
          <p>Practice moving, jumping, dodging, hiding, reading obstacles and using the towel — without losing health.</p></div>
      </div>
    </Section>
    <Section number={9} id="feedback" title="Clear Feedback Under Pressure">
      <div className={styles.threeColumns}>{feedback.map(card => <Card key={card.image} {...card} />)}</div>
    </Section>
    <Section number={10} id="art" title="From Original Illustration to Game-Ready Art"
      intro="The game’s characters and visual language are based on my original illustrations. For the rebuilt version, I used AI-assisted tools to refine image quality while preserving the original designs, then adapted the assets manually for animation and gameplay.">
      <div className={styles.threeColumns}>
        <Card image="drawing" title="Original Drawing" /><Card image="refined" title="Refined Asset" />
        <Card image="swamp" title="In-Game Result" copy="Frame from the opening sequence." />
      </div>
    </Section>
    <Section number={11} id="iteration" title="Rebuilding an Earlier Version"
      intro="The current version builds on an earlier game I created manually, using the original concept and artwork as a foundation for a more polished and complete gameplay experience.">
      <div className={styles.twoColumns}>
        <Card image="old" title="Earlier Version" copy="The original illustrated kitchen and gameplay foundation." />
        <Card image="hero" title="Rebuilt Version" copy="Clearer art, readable hazards, responsive feedback and a connected progression." />
      </div>
      <p className={styles.comparisonNote}>Visuals · Animation · Hazards · Readability · Feedback · Systems</p>
    </Section>
    <Section number={12} id="unity" title="Built in Unity">
      <div className={styles.mediaAndCopy}>
        <figure className={styles.card}><Still name="unity" /><figcaption className={styles.mediaNote}>Actual Unity project / story, subtitle and audio tracks in Timeline</figcaption></figure>
        <div className={styles.detail}>
          <p className={styles.eyebrow}>One connected experience</p>
          <ul className={styles.systems}><li>Hazards &amp; chef attacks</li><li>Checkpoints &amp; health</li><li>Interactive tutorial</li><li>Animation &amp; story sequencing</li></ul>
          <p>AI-assisted development supported scripting, debugging and system implementation, while the game design, visual direction, iteration and Unity decisions remained under my direction.</p>
        </div>
      </div>
    </Section>
    <Section number={13} id="watch" title="Watch Gameplay">
      <figure className={styles.recording}>
        <CaseVideo ref={recording} film={{ src: asset("assets/hop/full-game.mp4"), poster: asset("assets/hop/gameplay-poster.webp"), title: "Hop full playthrough", duration: "12:19" }} defaultMuted={false} />
        <figcaption><span>Full playthrough · 12:19</span><p className={styles.mediaNote}>The complete recording, including the interactive tutorial, opening story and kitchen escape.</p></figcaption>
      </figure>
    </Section>
    {gameOpen && <Suspense fallback={<p className={styles.loading} role="status">Opening the game…</p>}>
      <HopGameDialog onClose={() => setGameOpen(false)} onWatch={watchRecording} />
    </Suspense>}
  </article>;
}
