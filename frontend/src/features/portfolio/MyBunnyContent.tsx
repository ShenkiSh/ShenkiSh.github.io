import { useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseChapterNavigation } from "./CaseChapterNavigation";
import { CaseVideo, type CaseVideoHandle } from "./CaseVideo";
import { PortfolioLink } from "./PortfolioLink";
import { MyBunnyGameDialog } from "./MyBunnyGameDialog";
import { MyBunnyArtworkDialog } from "./MyBunnyArtworkDialog";
import { MyBunnyPrototype } from "./MyBunnyPrototype";
import { useExclusiveCaseMedia } from "./useExclusiveCaseMedia";
import actions from "./CaseActions.module.scss";
import styles from "./MyBunnyContent.module.scss";

const chapters = [
  ["stages", "Care stages"], ["feedback", "Feedback"],
  ["visual-ui", "Visual design"], ["prototype", "Try it"],
] as const;
const stages = [
  { file: "feeding", title: "Feeding", copy: "Choose what to feed Bunny.", duration: "0:18" },
  { file: "cleaning", title: "Cleaning", copy: "Find the item that helps Bunny stay clean.", duration: "0:12" },
  { file: "playtime", title: "Playtime", copy: "Choose a suitable toy for Bunny.", duration: "0:12" },
] as const;
const expressions = [
  ["character-happy", "Bunny with upright ears and an open smile", 355],
  ["character-sad", "Bunny with lowered ears and a worried expression", 340],
  ["character-smile", "Bunny smiling with a different eye expression", 355],
  ["character-blink", "Bunny with closed eyes", 355],
] as const;
const objects = [
  ["care-food", "Feeding choices", "Illustrated food choices with star shapes", 396, 398],
  ["care-cleaning", "Cleaning choices", "Illustrated cleaning items with bubbles", 287, 257],
  ["care-play", "Playtime choices", "Illustrated toys with flower shapes", 271, 301],
] as const;

export function MyBunnyContent() {
  useExclusiveCaseMedia();
  const player = useRef<CaseVideoHandle>(null);
  const [playing, setPlaying] = useState(false);
  const [artworkOpen, setArtworkOpen] = useState(false);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`} aria-label="My Bunny introduction">
      <div className={styles.identity}>
        <h1>My Bunny</h1>
        <p className={styles.subtitle}>Educational Care Game</p>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.hook}>Learning rabbit care through play.</p>
        <p className={styles.muted}>I designed and built a short game where children explore feeding, cleaning and play through Bunny’s reactions.</p>
        <p className={styles.role}>Game design · UX/UI · Illustration · Unity</p>
        <div className={styles.heroActions}>
          <PortfolioLink className={actions.primary} href="#prototype">Explore the game</PortfolioLink>
          <button className={actions.secondary} type="button" onClick={() => player.current?.playFrom(0)}>Watch Gameplay</button>
        </div>
      </div>
      <button type="button" className={styles.heroArtwork} aria-label="Enlarge the My Bunny mockup" onClick={() => setArtworkOpen(true)}>
        <img src={asset("assets/my-bunny/desk-mockup.png")} width={1920} height={1080} fetchPriority="high" alt="My Bunny on a phone beside a rabbit doll and pencils on a wooden desk" />
      </button>
    </header>
    <CaseChapterNavigation label="My Bunny sections" chapters={chapters} showDivider={false} />
    <div className={styles.container}>
      <section className={styles.section} id="stages" aria-labelledby="stages-heading">
        <div className={styles.sectionIntro} id="idea">
          <h2 id="stages-heading">Three small ways to care.</h2>
          <p>Designed as a repeatable game within an adoption app, each stage introduces one everyday care task.</p>
        </div>
        <div className={styles.stages} role="group" aria-label="The three care stages" tabIndex={0}>
          {stages.map(({ file, title, copy, duration }) => <figure key={file}>
            <CaseVideo film={{ src: asset(`assets/videos/my-bunny-${file}-demo.mp4`), poster: asset(`assets/my-bunny/${file}.jpg`), title: `My Bunny — ${title}`, duration }} aspectRatio="9 / 16" posterLabel={`Watch ${title}`} defaultMuted={false} />
            <figcaption><h3>{title}</h3><p>{copy}</p></figcaption>
          </figure>)}
        </div>
      </section>
      <section className={styles.section} id="feedback" aria-labelledby="feedback-heading">
        <div className={styles.sectionIntro} id="interaction">
          <h2 id="feedback-heading">A choice becomes a learning moment.</h2>
          <p>I paired Bunny’s reaction with an explanation, so an unsuitable choice gives the child a reason to try again.</p>
        </div>
        <div className={styles.feedback}>
          <div className={styles.feedbackScreen}>
            <CaseVideo film={{ src: asset("assets/videos/my-bunny-feedback-demo.mp4"), poster: asset("assets/my-bunny/feedback-video.jpg"), title: "My Bunny — Feedback", duration: "0:06" }} aspectRatio="9 / 16" posterLabel="Watch Feedback" defaultMuted={false} />
          </div>
          <div className={styles.feedbackCopy}>
            <div><h3>Make a choice</h3><p>A short prompt and a small set of illustrated items keep attention on the current task.</p></div>
            <div><h3>See Bunny’s reaction</h3><p>Dragging an item to Bunny triggers a response. The expression connects the choice to the character.</p></div>
            <div><h3>Understand and try again</h3><p>The feedback explains why the item is unsuitable, then returns the child to the same task.</p></div>
          </div>
        </div>
      </section>
      <section className={styles.section} id="visual-ui" aria-labelledby="visual-ui-heading">
        <div className={styles.sectionIntro}>
          <h2 id="visual-ui-heading">A character and a world to care for.</h2>
          <p>I illustrated Bunny, the care items and the controls as one visual family, with distinct colors and motifs for each stage.</p>
        </div>
        <div className={styles.visualSystem}>
          <figure>
            <div className={`${styles.artPanel} ${styles.expressions}`}>
              {expressions.map(([file, alt, height]) => <img key={file} src={asset(`assets/my-bunny/${file}.png`)} alt={alt} width={174} height={height} loading="lazy" decoding="async" />)}
            </div>
            <figcaption><h3>Expressions that give Bunny a voice</h3><p>Changes in the ears, eyes and mouth make the character’s reactions visible.</p></figcaption>
          </figure>
          <figure>
            <div className={`${styles.artPanel} ${styles.buttonStates}`}>
              <figure><img src={asset("assets/my-bunny/button-default.png")} alt="The light purple default button artwork" width={634} height={210} loading="lazy" decoding="async" /><figcaption>Default</figcaption></figure>
              <figure><img src={asset("assets/my-bunny/button-pressed.png")} alt="The darker pressed button artwork" width={634} height={210} loading="lazy" decoding="async" /><figcaption>Pressed</figcaption></figure>
            </div>
            <figcaption><h3>Controls with a visible response</h3><p>Light and dark button states show when a control is pressed.</p></figcaption>
          </figure>
        </div>
        <div className={styles.careArtwork}>
          {objects.map(([file, title, alt, width, height]) => <figure key={file}>
            <div className={styles.objectArt}><img src={asset(`assets/my-bunny/${file}.png`)} alt={alt} width={width} height={height} loading="lazy" decoding="async" /></div>
            <figcaption>{title}</figcaption>
          </figure>)}
        </div>
      </section>
      <section className={styles.section} id="prototype" aria-labelledby="prototype-heading">
        <MyBunnyPrototype ref={player} onPlay={() => setPlaying(true)} />
      </section>
    </div>
    {playing && <MyBunnyGameDialog onClose={() => setPlaying(false)} />}
    {artworkOpen && <MyBunnyArtworkDialog onClose={() => setArtworkOpen(false)} />}
  </article>;
}
