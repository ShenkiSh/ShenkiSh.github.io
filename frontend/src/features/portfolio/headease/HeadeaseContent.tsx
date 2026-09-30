import type { ReactNode } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import actions from "../CaseActions.module.scss";
import styles from "./HeadeaseContent.module.scss";

const prototype = "https://www.figma.com/proto/NNjB6Gey6DtLbO1ZzQV51g/Portfolio?page-id=1600%3A435&node-id=1601-543&scaling=scale-down&content-scaling=fixed";
const chapters = [["need", "Overview"], ["system", "System"], ["journey", "Journey"], ["dashboard", "Dashboard"], ["control", "Control"], ["safety", "Safety"], ["final", "Interface"], ["prototype", "Prototype"]] as const;
const screens = {
  notification: "HeadEase notification asking how the user feels",
  sync: "HeadEase synchronizing the latest body measurements",
  heart: "Heart-rate measurement with a status explanation and relief controls",
  explanation: "A short explanation of the heart-rate reading",
  pressure: "Blood-pressure measurement with the same status and action layout",
  temperature: "Body-temperature measurement and next actions",
  duration: "Relief duration selector with plus, minus and start controls",
  active: "Active relief session showing a ten-minute countdown and stop control",
  dizziness: "Additional-symptom check asking the user to rate dizziness",
  nausea: "Additional-symptom check asking the user to rate nausea",
  followup: "Follow-up asking whether the user feels better",
  contact: "Follow-up offering contact with a doctor when the user is not feeling better",
  history: "HeadEase history of symptoms recorded over previous days",
  dashboard: "Daily measurements dashboard with four pastel-colored tiles",
  summary: "Session summary with options to contact a doctor or activate the wearable",
} as const;
type ScreenName = keyof typeof screens;
const journey: { screen: ScreenName; title: string; copy: string }[] = [
  { screen: "notification", title: "Notice", copy: "A notification invites the user to check in." },
  { screen: "sync", title: "Open", copy: "HeadEase synchronizes the latest measurements." },
  { screen: "heart", title: "Review", copy: "The user reviews the body measurements." },
  { screen: "explanation", title: "Understand", copy: "A short explanation gives the reading context." },
  { screen: "duration", title: "Choose", copy: "Set the duration before starting relief." },
  { screen: "active", title: "Start", copy: "Follow the session and stop when needed." },
  { screen: "dizziness", title: "Check", copy: "Report additional symptoms." },
  { screen: "followup", title: "Follow up", copy: "Reflect on how the user feels after the session." },
];
const process = [
  ["MONITOR", "Body signals are monitored."], ["DETECT", "The system identifies an unusual change."],
  ["NOTIFY", "The app communicates what was detected."], ["RESPOND", "The user chooses a response and activates relief."],
  ["TRACK", "The experience is recorded for later review."], ["ESCALATE", "Additional symptoms can lead to guidance or contact with a doctor."],
] as const;
const palette = [["Cream", "#F9F6F1", "cream"], ["Mint", "#A9D0BF", "mint"], ["Sky", "#AED1EB", "sky"], ["Lavender", "#D2D3F0", "lavender"], ["Rose", "#E9B7B7", "rose"]] as const;

function Screen({ name, eager = false }: { name: ScreenName; eager?: boolean }) {
  return <img className={styles.screen} data-headease-screen src={asset(`assets/headease/${name}.png`)} alt={screens[name]} width={1080} height={2400} loading={eager ? "eager" : "lazy"} decoding="async" />;
}
function ScreenCard({ name, title, children }: { name: ScreenName; title: string; children?: ReactNode }) {
  return <figure className={styles.screenCard}><Screen name={name} /><figcaption><span>{title}</span>{children ? <p>{children}</p> : null}</figcaption></figure>;
}
function Wearable({ eager = false }: { eager?: boolean }) {
  return <img className={styles.wearable} src={asset("assets/home/headease.png")} alt="HeadEase wearable on the user's wrist connected to the mobile app on their desk" width={759} height={427} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />;
}
function PrototypeLink() {
  return <a className={`${actions.secondary} ${styles.prototypeLink}`} href={prototype} target="_blank" rel="noopener noreferrer">Open prototype</a>;
}
function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return <section id={id} className={`${styles.container} ${styles.section}`} aria-labelledby={`${id}-heading`}>
    <div className={styles.sectionHeading}><h2 id={`${id}-heading`}>{title}</h2>{intro ? <p>{intro}</p> : null}</div>
    <div className={styles.sectionBody}>{children}</div>
  </section>;
}

export function HeadeaseContent() {
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.heroCopy}>
        <div className={styles.identity}><h1>HeadEase</h1><p className={styles.subtitle}>Smart Headache Relief System</p></div>
        <div className={styles.heroSummary}>
          <p className={styles.label}>Connected health · Concept project</p>
          <p className={styles.hook}>A wearable and mobile-app concept that connects biometric monitoring, headache detection and on-demand relief in one continuous experience.</p>
          <PrototypeLink />
        </div>
        <dl className={styles.credits}>
          <div><dt>MY CONTRIBUTION</dt><dd>Research · Concept · UX/UI · Visual Design · Prototype</dd></div>
          <div><dt>PRODUCT</dt><dd>Wearable + Mobile App</dd></div><div><dt>TOOL</dt><dd>Figma</dd></div>
        </dl>
      </div>
      <div className={styles.heroMedia}>
        <figure><Wearable eager /><figcaption className={styles.label}>Wearable and mobile app</figcaption></figure>
        <Screen name="heart" eager /><Screen name="duration" eager />
      </div>
    </header>
    <CaseChapterNavigation label="HeadEase sections" chapters={chapters} showDivider={false} />
    <Section id="need" title="Understanding the Need" intro="Recurring headaches can interrupt everyday life with little warning. In my research, users described the need for a more immediate way to understand what is happening and respond without relying only on medication.">
      <div className={styles.threeColumns}>
        <div className={styles.copy}><h3>Recurring pain</h3><p>Headaches interrupt everyday routines.</p></div>
        <div className={styles.copy}><h3>Limited immediate feedback</h3><p>Users need a clearer picture of what is happening.</p></div>
        <div className={styles.copy}><h3>An alternative response</h3><p>An option beyond relying only on medication.</p></div>
      </div>
    </Section>
    <Section id="system" title="One System, Two Connected Products">
      <div className={styles.system}>
        <div className={styles.role}><p className={styles.label}>WEARABLE</p><h3>Sense &amp; respond</h3><ul><li>Monitors body signals</li><li>Detects changes</li><li>Enables manual activation</li><li>Delivers the relief response in the project concept</li></ul></div>
        <div className={styles.role}><p className={styles.label}>MOBILE APP</p><h3>Understand &amp; control</h3><ul><li>Explains detected changes</li><li>Displays measurements</li><li>Controls the relief session</li><li>Tracks symptoms and offers a medical contact option</li></ul></div>
      </div>
    </Section>
    <Section id="flow" title="From Detection to Relief">
      <ol className={styles.process}>{process.map(([title, copy]) => <li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </Section>
    <Section id="journey" title="A Headache in Real Time" intro="The journey connects a detected change to a clear next step, from the first notification to the follow-up check.">
      <div className={styles.journey}>{journey.map(step => <ScreenCard key={step.screen} name={step.screen} title={step.title}>{step.copy}</ScreenCard>)}</div>
    </Section>
    <Section id="dashboard" title="Making Body Data Understandable" intro="The interface translates body measurements into a simple status the user can understand quickly during discomfort.">
      <div className={styles.measurements}>
        <div className={styles.detailCopy}><h3>Data, status and action</h3><p>Heart rate, blood pressure and temperature share a consistent structure: one measurement, a clear status and the next action.</p></div>
        <Screen name="heart" /><Screen name="pressure" /><Screen name="temperature" />
      </div>
    </Section>
    <Section id="control" title="Giving the User Control" intro="The app gives the user direct control over the relief session, including when to start, how long it runs and when to stop.">
      <div className={`${styles.threeColumns} ${styles.controls}`}>
        <ScreenCard name="duration" title="Set the duration">Choose how long the session runs.</ScreenCard>
        <ScreenCard name="active" title="Start, follow and stop">A countdown keeps the current state visible.</ScreenCard>
        <ScreenCard name="followup" title="Check in">The follow-up keeps the response personal.</ScreenCard>
      </div>
    </Section>
    <Section id="safety" title="Beyond the Headache" intro="The experience includes a path for additional symptoms, with a check-in and an option to seek further help.">
      <div className={styles.safety}>
        <div className={styles.safetyCopy}>
          <h3>Additional symptoms?</h3>
          <div className={styles.copy}><h4>No additional symptoms</h4><p>Continue with the current experience.</p></div>
          <div className={styles.copy}><h4>Additional symptoms</h4><p>Report symptoms such as dizziness or nausea.</p></div>
          <div className={styles.copy}><h4>Medical contact option</h4><p>The flow offers a way to contact a doctor.</p></div>
        </div>
        <Screen name="dizziness" /><Screen name="nausea" /><Screen name="contact" />
      </div>
    </Section>
    <Section id="interfaces" title="Designing Across Two Interfaces">
      <div className={styles.interfaces}>
        <div className={styles.role}><p className={styles.label}>ON THE WEARABLE</p><Wearable /><p className={styles.interfaceCaption}>Quick status · Immediate activation · Minimal interaction</p></div>
        <div className={styles.appRole}><Screen name="history" /><div className={styles.role}><p className={styles.label}>IN THE APP</p><ul><li>Details</li><li>Measurements</li><li>Session control</li><li>Symptom check</li><li>History and further actions</li></ul></div></div>
      </div>
    </Section>
    <Section id="final" title="Final Experience">
      <div className={styles.finalScreens}>
        <ScreenCard name="dashboard" title="Daily measurements" /><ScreenCard name="heart" title="Body status" />
        <ScreenCard name="active" title="Relief session" /><ScreenCard name="summary" title="Next steps" />
      </div>
    </Section>
    <Section id="visual" title="Visual Language" intro="A soft palette, clear hierarchy and recognizable controls make the interface feel calm and approachable.">
      <div className={styles.visual}>
        <div className={styles.specimen}><h3 className={styles.label}>PALETTE</h3><ul className={styles.palette}>{palette.map(([name, hex, color]) => <li key={name}><span className={styles[color]} aria-hidden="true" /><span>{name}</span><small>{hex}</small></li>)}</ul></div>
        <div className={styles.specimen}><h3 className={styles.label}>BLENDER TYPOGRAPHY</h3>
          <div className={`${styles.sample} ${styles.typeSample}`}><img src={asset("assets/headease/blender-type.png")} alt="Original Blender Hebrew typography specimen: משך כמה זמן" width={312} height={52} loading="lazy" decoding="async" /></div>
          <p>A clear Hebrew interface with a calm, approachable tone.</p>
        </div>
        <div className={styles.specimen}><h3 className={styles.label}>ICONOGRAPHY</h3>
          <div className={`${styles.sample} ${styles.iconsSample}`}><img src={asset("assets/headease/bottom-nav.png")} alt="Original HeadEase home, history, measurements and settings navigation icons" width={400} height={85} loading="lazy" decoding="async" /></div>
          <p>Simple symbols support quick recognition.</p>
        </div>
      </div>
      <div className={styles.threeColumns}>
        <div className={styles.specimen}><h3 className={styles.label}>PRIMARY ACTION</h3><div className={styles.sample}><img src={asset("assets/headease/start-button.png")} alt="Original activate-wearable button" width={274} height={60} loading="lazy" decoding="async" /></div></div>
        <div className={styles.specimen}><h3 className={styles.label}>SECONDARY ACTION</h3><div className={styles.sample}><img src={asset("assets/headease/symptom-button.png")} alt="Original additional-symptoms button" width={274} height={60} loading="lazy" decoding="async" /></div></div>
        <div className={styles.specimen}><h3 className={styles.label}>DURATION CONTROL</h3><div className={`${styles.sample} ${styles.durationSample}`}><img src={asset("assets/headease/timer-control.png")} alt="Original relief-duration selector" width={222} height={69} loading="lazy" decoding="async" /></div></div>
      </div>
    </Section>
    <Section id="prototype" title="Prototype & Testing">
      <div className={styles.prototype}>
        <div className={styles.detailCopy}><p className={styles.testing}>The interactive prototype was tested with users to evaluate clarity, navigation and understanding of the core concept.</p><p>Explore the original flow: notification, measurements, relief controls and follow-up.</p><PrototypeLink /></div>
        <a href={prototype} target="_blank" rel="noopener noreferrer" aria-label="Open HeadEase prototype from the notification screen"><Screen name="notification" /></a>
        <a href={prototype} target="_blank" rel="noopener noreferrer" aria-label="Open HeadEase prototype from the measurement preview"><Screen name="explanation" /></a>
      </div>
    </Section>
    <div className={`${styles.container} ${styles.grid} ${styles.closing}`}><p>HeadEase explores how a wearable and mobile interface can work together to make headache monitoring and response feel more immediate, understandable and personal.</p></div>
  </article>;
}
