import { useRef, useState } from "react";
import { asset } from "@/shared/utils/asset";
import { keepLastWordsTogether as wrap } from "@/shared/utils/keepLastWordsTogether";
import { CaseChapterNavigation } from "./CaseChapterNavigation";
import { CaseVideo, type CaseVideoHandle } from "./CaseVideo";
import { MyBunnyGameDialog } from "./MyBunnyGameDialog";
import { MyBunnyPrototype } from "./MyBunnyPrototype";
import { useExclusiveCaseMedia } from "./useExclusiveCaseMedia";
import actions from "./CaseActions.module.scss";
import styles from "./MyBunnyContent.module.scss";

const chapters = [
  ["idea", "Idea"], ["stages", "Care Stages"], ["interaction", "Interaction"],
  ["feedback", "Feedback"], ["app-game", "App + Game"], ["prototype", "Unity"],
] as const;

const stages = [
  { file: "feeding", title: "Feeding", copy: "Choose the right food for Bunny.", duration: "0:18" },
  { file: "cleaning", title: "Cleaning", copy: "Choose the correct item to keep Bunny clean.", duration: "0:12" },
  { file: "playtime", title: "Playtime", copy: "Choose the right toy and learn how to play safely.", duration: "0:12" },
] as const;

function Screen({ file, alt, eager = false }: { file: string; alt: string; eager?: boolean }) {
  return <img className={styles.screen} src={asset(`assets/my-bunny/${file}.jpg`)} alt={alt}
    width={720} height={1280} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Flow({ steps }: { steps: readonly string[] }) {
  return <ol className={styles.flow}>
    {steps.map((step, index) => <li key={step}>
      {index > 0 && <span className={styles.flowArrow} aria-hidden="true">→</span>}
      <span>{wrap(step)}</span>
    </li>)}
  </ol>;
}

export function MyBunnyContent() {
  useExclusiveCaseMedia();
  const player = useRef<CaseVideoHandle>(null);
  const [playing, setPlaying] = useState(false);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`} aria-label="My Bunny introduction">
      <div className={styles.identity}>
        <h1>My Bunny</h1>
        <p className={styles.subtitle}>Rabbit Adoption App &amp; Educational&nbsp;Mini-Game</p>
        <p className={styles.hook}>{wrap("A rabbit adoption app with a short interactive game that teaches children how to feed, clean and play with their rabbit — before or after adoption.")}</p>
        <div className={styles.heroActions}>
          <button className={actions.primary} type="button" onClick={() => setPlaying(true)}>
            Play My Bunny <img src={asset("assets/my-bunny/arrow-right-dark.svg")} alt="" width={24} height={24} />
          </button>
          <button className={actions.secondary} type="button" onClick={() => player.current?.playFrom(0)}>
            Watch Gameplay <img src={asset("assets/my-bunny/arrow-right-light.svg")} alt="" width={24} height={24} />
          </button>
        </div>
        <p className={styles.label}>UX/UI · Game Design · Interaction Design<br />Unity · Visual Design</p>
      </div>
      <div className={styles.heroMedia}>
        <figure className={styles.appPreview}>
          <Screen file="app-entry" alt="My Bunny app entry with a Start playing button" eager />
          <figcaption className={styles.label}>The adoption app</figcaption>
        </figure>
        <figure className={styles.gamePreview}>
          <Screen file="feeding" alt="The rabbit-care game inside the app" eager />
          <figcaption className={styles.label}>The game inside</figcaption>
        </figure>
      </div>
    </header>
    <CaseChapterNavigation label="My Bunny sections" chapters={chapters} showDivider={false} />
    <div className={styles.container}>
      <section className={styles.section} id="idea" aria-labelledby="idea-heading">
        <div className={styles.copy}>
          <h2 id="idea-heading">Why My Bunny?</h2>
          <p>{wrap("Rabbit care can feel unfamiliar. I designed an adoption app where children learn everyday care through play — before and after bringing a rabbit home.")}</p>
        </div>
        <div className={`${styles.panel} ${styles.learningPath}`}>
          <Flow steps={["Adoption App", "Learn About Rabbit Care", "Play Anytime"]} />
          <p className={styles.label}>Before &amp; after adoption</p>
        </div>
      </section>
      <section className={styles.section} id="stages" aria-labelledby="stages-heading">
        <div className={styles.sectionIntro}>
          <h2 id="stages-heading">Learn by Caring for Bunny</h2>
          <p>{wrap("The mini-game is divided into three simple stages, each focused on one part of everyday rabbit care.")}</p>
        </div>
        <div className={styles.stages}>
          {stages.map(({ file, title, copy, duration }, index) => <figure key={file}>
            <CaseVideo film={{ src: asset(`assets/videos/my-bunny-${file}-demo.mp4`), poster: asset(`assets/my-bunny/${file}.jpg`), title: `My Bunny — ${title}`, duration }} aspectRatio="9 / 16" posterLabel={`Watch ${title}`} defaultMuted={false} />
            <figcaption><h3>0{index + 1} — {title}</h3><p>{wrap(copy)}</p></figcaption>
          </figure>)}
        </div>
      </section>
      <section className={styles.section} id="interaction" aria-labelledby="interaction-heading">
        <div className={styles.copy}>
          <h2 id="interaction-heading">One Simple Interaction,<br />Three Learning Moments</h2>
          <p className={styles.muted}>{wrap("Children make a choice, see its effect and learn why it helps — or does not help — Bunny.")}</p>
        </div>
        <div className={styles.panel}>
          <Flow steps={["Choose / Drag an item", "Bunny reacts", "Get feedback", "Learn why"]} />
        </div>
      </section>
      <section className={styles.section} id="feedback" aria-labelledby="feedback-heading">
        <div className={styles.copy}>
          <h2 id="feedback-heading">Learning Through Feedback</h2>
          <p>{wrap("Children see how their choice affects Bunny. The character’s expression and the explanatory popup work together to turn mistakes into learning moments.")}</p>
          <p className={styles.muted}>{wrap("The popup explains why the item is unsuitable and invites the child to try again.")}</p>
        </div>
        <div className={styles.feedbackMedia}>
          <div className={styles.feedbackScreen}>
            <CaseVideo film={{ src: asset("assets/videos/my-bunny-feedback-demo.mp4"), poster: asset("assets/my-bunny/feedback-video.jpg"), title: "My Bunny — Feedback", duration: "0:06" }} aspectRatio="9 / 16" posterLabel="Watch Feedback" defaultMuted={false} />
          </div>
          <figure className={styles.reaction}>
            <img src={asset("assets/my-bunny/bunny-sad.png")} width={296} height={385} loading="lazy" decoding="async" alt="Bunny reacts to an unsuitable choice with lowered ears and a sad expression" />
            <figcaption>
              <h3>Bunny reacts</h3>
              <p>{wrap("An unsuitable choice makes Bunny look sad. A suitable one makes Bunny look happy.")}</p>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.section} id="app-game" aria-labelledby="app-game-heading">
        <div className={styles.sectionIntro}>
          <h2 id="app-game-heading">A Game Inside the Adoption Experience</h2>
          <p>{wrap("Children open the care game with Start playing and return with Back to the app. The game stays available to revisit before or after adoption.")}</p>
        </div>
        <div className={styles.appSystem}>
          <figure>
            <Screen file="app-entry" alt="Enter the care game from the My Bunny app" />
            <figcaption><h3>Start playing</h3><p>{wrap("Open the care game from the app.")}</p></figcaption>
          </figure>
          <figure>
            <Screen file="completion" alt="Great job! The completion screen offers Back to the app" />
            <figcaption><h3>Back to the app</h3><p>{wrap("Return to the app and play again whenever you want.")}</p></figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.section} id="visual-ui" aria-labelledby="visual-ui-heading">
        <div className={styles.sectionIntro}>
          <h2 id="visual-ui-heading">Visual &amp; UI System</h2>
          <p>{wrap("A friendly character, clear prompts and consistent feedback keep each care task easy to follow.")}</p>
        </div>
        <div className={`${styles.panel} ${styles.visualSystem}`}>
          <div className={styles.interfaceStates}>
            <figure><Screen file="feeding" alt="A short feeding prompt and illustrated food choices in context" /><figcaption className={styles.label}>01 / Make a choice</figcaption></figure>
            <figure><Screen file="correct-choice" alt="That’s right! Positive playtime feedback explains the suitable toy" /><figcaption className={styles.label}>02 / Understand why</figcaption></figure>
          </div>
          <div className={styles.copy}>
            <div className={styles.principle}><h3>One task at a time</h3><p>{wrap("A short prompt and a small set of illustrated items focus attention on the current care task.")}</p></div>
            <div className={styles.principle}><h3>A familiar rhythm</h3><p>{wrap("The same character, action area and feedback pattern connect feeding, cleaning and playtime.")}</p></div>
          </div>
        </div>
      </section>
      <section className={styles.section} id="prototype" aria-labelledby="prototype-heading">
        <div className={styles.sectionIntro}>
          <h2 id="prototype-heading">Built in Unity</h2>
          <p>{wrap("Built in Unity, the playable mini-game brings together three care stages, drag-and-match interactions and explanatory feedback.")}</p>
        </div>
        <MyBunnyPrototype ref={player} />
      </section>
    </div>
    {playing && <MyBunnyGameDialog onClose={() => setPlaying(false)} />}
  </article>;
}
