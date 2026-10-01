import { useState } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { CaseVideo } from "../CaseVideo";
import { PortfolioLink } from "../PortfolioLink";
import { HeadeaseArtworkDialog, type HeadeaseArtwork } from "./HeadeaseArtworkDialog";
import actions from "../CaseActions.module.scss";
import styles from "./HeadeaseContent.module.scss";

const prototype = "https://www.figma.com/proto/NNjB6Gey6DtLbO1ZzQV51g/Portfolio?page-id=1600%3A435&node-id=1601-543&scaling=scale-down&content-scaling=fixed";
const chapters = [["journey", "App flow"], ["decisions", "UX decisions"], ["visual", "Visual language"], ["prototype", "Try it"]] as const;
const screens = {
  notification: "HeadEase notification asking how the user feels",
  heart: "Heart-rate reading with an explanation control and next actions",
  explanation: "An explanation opened over the heart-rate reading",
  duration: "Session duration selector with plus, minus and start controls",
  active: "Active session showing a ten-minute countdown and stop control",
  followup: "Follow-up asking whether the user feels better",
  dizziness: "Additional-symptom check asking the user to rate dizziness",
  contact: "Follow-up offering contact with a doctor when the user is not feeling better",
} as const;
type ScreenName = keyof typeof screens;
const journey: { screen: ScreenName; title: string; copy: string; id?: string }[] = [
  { screen: "notification", title: "Check in", copy: "A notification asks how the user feels." },
  { screen: "heart", title: "Review a reading", copy: "One measurement and the available next actions." },
  { screen: "duration", title: "Choose the duration", copy: "The user sets the time before starting." },
  { screen: "active", title: "Stay in control", copy: "A visible countdown and an option to stop.", id: "control" },
  { screen: "followup", title: "Check back", copy: "The next step starts with how the user feels." },
];
const inUse: HeadeaseArtwork = { file: "in-use.webp", title: "HeadEase in use", alt: "HeadEase on a watch beside the app on a phone, on a dark desk", width: 1920, height: 1080 };
const watches: HeadeaseArtwork = { file: "watches.webp", title: "HeadEase on the wrist", alt: "Two watches showing the HeadEase identity and a single activation button", width: 1920, height: 1080 };
const palette = [["Cream", "cream"], ["Mint", "mint"], ["Sky", "sky"], ["Lavender", "lavender"], ["Rose", "rose"]] as const;

function Artwork({ artwork, eager = false, onOpen }: { artwork: HeadeaseArtwork; eager?: boolean; onOpen: (artwork: HeadeaseArtwork) => void }) {
  return <button type="button" className={styles.artwork} aria-label={`Enlarge ${artwork.title}`} onClick={() => onOpen(artwork)}>
    <img src={asset(`assets/headease/${artwork.file}`)} alt={artwork.alt} width={artwork.width} height={artwork.height}
      loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
  </button>;
}
function Screen({ name, title, onOpen }: { name: ScreenName; title: string; onOpen: (artwork: HeadeaseArtwork) => void }) {
  return <button type="button" className={`${styles.artwork} ${styles.screen}`} aria-label={`Enlarge ${title} screen`}
    onClick={() => onOpen({ file: `${name}.png`, title, alt: screens[name], width: 1080, height: 2400 })}>
    <img data-headease-screen src={asset(`assets/headease/${name}.png`)} alt={screens[name]} width={1080} height={2400} loading="lazy" decoding="async" />
  </button>;
}
function PrototypeLink() {
  return <a className={actions.primary} href={prototype} target="_blank" rel="noopener noreferrer">Try the prototype</a>;
}

export function HeadeaseContent() {
  const [artwork, setArtwork] = useState<HeadeaseArtwork | null>(null);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`} id="need" aria-label="HeadEase introduction">
      <div className={styles.identity}>
        <h1>HeadEase</h1><p className={styles.subtitle}>Wearable &amp; Companion App</p>
        <p className={styles.label}>Connected health · Concept project</p>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.hook}>A clearer next step during a headache.</p>
        <p className={styles.muted}>I designed a wearable and app concept that brings body readings, session controls and symptom check-ins into one experience.</p>
        <p className={styles.role}>Concept · UX/UI · Visual design · Figma prototype</p>
        <div className={styles.actions}><PrototypeLink /><PortfolioLink className={actions.secondary} href="#journey">Explore the flow</PortfolioLink></div>
      </div>
      <div className={styles.heroArtwork}><Artwork artwork={inUse} eager onOpen={setArtwork} /></div>
      <div className={styles.deviceRoles} id="system">
        <div><h3>On the wrist</h3><p>A single activation action keeps the wearable interaction brief.</p></div>
        <div><h3>In the app</h3><p>Readings, duration, symptom check-ins and history give the experience more context.</p></div>
      </div>
    </header>
    <CaseChapterNavigation label="HeadEase sections" chapters={chapters} showDivider={false} />
    <div className={styles.container}>
      <section className={styles.section} id="journey" aria-labelledby="journey-heading">
        <div className={styles.introduction} id="flow">
          <h2 id="journey-heading">One step at a time.</h2>
          <p>The main flow moves from a check-in to a follow-up, with one question or action at each stage.</p>
        </div>
        <div className={styles.journey}>
          {journey.map(step => <figure key={step.screen} id={step.id}>
            <Screen name={step.screen} title={step.title} onOpen={setArtwork} />
            <figcaption><h3>{step.title}</h3><p>{step.copy}</p></figcaption>
          </figure>)}
        </div>
      </section>
      <section className={styles.section} id="decisions" aria-labelledby="decisions-heading">
        <div className={styles.introduction}>
          <h2 id="decisions-heading">Make room for what the user needs.</h2>
          <p>Details appear when requested, and the flow leaves room for symptoms beyond the initial reading.</p>
        </div>
        <div className={styles.decisions}>
          <figure id="dashboard">
            <div className={styles.screenPair}>
              <div><Screen name="heart" title="Reading" onOpen={setArtwork} /><p>Reading</p></div>
              <div><Screen name="explanation" title="Explanation" onOpen={setArtwork} /><p>Explanation</p></div>
            </div>
            <figcaption><h3>Context without crowding the screen</h3><p>The explanation opens over the reading when needed. The main view keeps the measurement and actions in focus.</p></figcaption>
          </figure>
          <figure id="safety">
            <div className={styles.screenPair}>
              <div><Screen name="dizziness" title="Additional symptoms" onOpen={setArtwork} /><p>Additional symptoms</p></div>
              <div><Screen name="contact" title="A different next step" onOpen={setArtwork} /><p>No improvement</p></div>
            </div>
            <figcaption><h3>A path for a different answer</h3><p>Users can report additional symptoms. If they do not feel better, the follow-up offers a contact option instead of ending the flow.</p></figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.section} id="visual" aria-labelledby="visual-heading">
        <div className={styles.introduction}>
          <h2 id="visual-heading">A quieter visual language.</h2>
          <p>Soft colors, simple illustrations and a shared set of controls connect the app to the wearable.</p>
        </div>
        <div className={styles.visual}>
          <figure id="interfaces"><Artwork artwork={watches} onOpen={setArtwork} /><figcaption><h3>One action on the wrist</h3><p>The HeadEase identity and activation button carry across both watch mockups.</p></figcaption></figure>
          <figure>
            <div className={styles.designPanel}>
              <ul className={styles.palette} aria-label="HeadEase color palette">{palette.map(([name, color]) => <li key={name}><span className={styles[color]} /><span>{name}</span></li>)}</ul>
              <div className={styles.typeSample}><img src={asset("assets/headease/blender-type.png")} alt="Original Blender Hebrew typography specimen" width={312} height={52} loading="lazy" decoding="async" /><span>Blender · Hebrew interface</span></div>
              <div className={styles.controls}>
                <img src={asset("assets/headease/start-button.png")} alt="Original activate-wearable button" width={274} height={60} loading="lazy" decoding="async" />
                <img src={asset("assets/headease/symptom-button.png")} alt="Original additional-symptoms button" width={274} height={60} loading="lazy" decoding="async" />
                <img src={asset("assets/headease/timer-control.png")} alt="Original session-duration selector" width={222} height={69} loading="lazy" decoding="async" />
                <img src={asset("assets/headease/bottom-nav.png")} alt="Original home, history, measurements and settings navigation icons" width={400} height={85} loading="lazy" decoding="async" />
              </div>
            </div>
            <figcaption><h3>A consistent interface</h3><p>One typeface, a restrained palette and recognizable controls keep the screens connected.</p></figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.section} id="prototype" aria-labelledby="prototype-heading">
        <div className={styles.prototype} id="final">
          <div className={styles.demo}>
            <CaseVideo film={{ src: asset("assets/videos/headease-hover-clean.mp4"), poster: asset("assets/headease/flow-poster.jpg"), title: "HeadEase app flow", duration: "1:05" }} aspectRatio="340 / 754" posterLabel="Watch the app flow" />
          </div>
          <div className={styles.prototypeCopy}>
            <h2 id="prototype-heading">Explore the experience.</h2>
            <p>Watch the original app recording or try the Figma prototype, from the first notification to the follow-up.</p>
            <PrototypeLink />
            <p className={styles.note}>An interaction concept exploring how a wearable and an app work together.</p>
          </div>
        </div>
      </section>
    </div>
    {artwork && <HeadeaseArtworkDialog artwork={artwork} onClose={() => setArtwork(null)} />}
  </article>;
}
