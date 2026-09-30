import { useRef } from "react";
import { asset } from "@/shared/utils/asset";
import { keepLastWordsTogether as wrap } from "@/shared/utils/keepLastWordsTogether";
import { CaseChapterNavigation } from "./CaseChapterNavigation";
import { CaseVideo, type CaseVideoHandle } from "./CaseVideo";
import { useExclusiveCaseMedia } from "./useExclusiveCaseMedia";
import actions from "./CaseActions.module.scss";
import styles from "./RedreamContent.module.scss";

const media = (file: string) => asset(`assets/redream/${file}`);
const chapters = [
  ["overview", "Overview"], ["research", "Research"], ["scenes", "Scenes"],
  ["vr-design", "VR Design"], ["narrative", "Narrative"],
  ["production", "Production"], ["watch", "Watch"],
] as const;
const scenes = [
  { file: "dream-scan", title: "01 Entry · Dream Scan", alt: "ReDream Labs dream-scan instructions in the VR entry room", copy: "The user enters the system, receives instructions and begins the dream reconstruction." },
  { file: "exam", title: "02 The Exam", alt: "An exam paper on a classroom desk, seen through the VR headset", copy: "A familiar fear returns: failing an exam and facing humiliation in front of a classroom." },
  { file: "back-room", title: "03 The Back Room", alt: "An unfamiliar figure in the dimly lit back room", copy: "An empty space and an unfamiliar figure begin to break the illusion of a controlled reconstruction." },
  { file: "system-failure", title: "04 System Failure", alt: "The ReDream system displays a failure message", copy: "The system begins to fail. The user may not be alone inside the reconstructed memory." },
] as const;
const principles = [
  { file: "presence", title: "Presence", copy: "The story is experienced in first person, from inside the scene." },
  { file: "discovery", title: "Spatial Discovery", copy: "Information unfolds through looking, moving and progressing through the environment." },
  { file: "unfamiliar", title: "Controlled → Unfamiliar", copy: "An orderly introduction gives way to spaces that feel unfamiliar and unstable." },
] as const;
const research = ["Anonymous interviews", "Recurring emotional themes", "Fear of failure / humiliation", "VR dream scenario"];

function Still({ file, alt }: { file: string; alt: string }) {
  return <img className={styles.still} src={media(file)} alt={alt} width={1280} height={720} loading="lazy" decoding="async" />;
}

export function RedreamContent() {
  useExclusiveCaseMedia();
  const fullPlayer = useRef<CaseVideoHandle>(null);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`} aria-label="ReDream Labs introduction">
      <div className={styles.identity}>
        <h1>ReDream Labs™</h1>
        <p className={styles.format}>Narrative VR Experience · Unity</p>
        <p className={styles.tagline}>Live Your Dreams. Forever.</p>
        <p className={styles.hook}>{wrap("A narrative VR experience about revisiting a reconstructed dream — and discovering that the system may be preserving more than just the memory.")}</p>
      </div>
      <div className={styles.content}>
        <figure className={styles.film}>
          <CaseVideo film={{ src: media("hero-hd.mp4"), poster: media("hero-poster-hd.jpg"), title: "ReDream Labs — Experience preview", duration: "0:30" }} />
          <figcaption className={styles.label}>EXPERIENCE PREVIEW · 00:30</figcaption>
        </figure>
        <dl className={styles.facts}>
          <div><dt>MY CONTRIBUTION</dt><dd>Unity · VR Assembly<br />Motion Design · Video Editing</dd></div>
          <div><dt>CREATED WITH</dt><dd>Collaborative Project</dd></div>
          <div><dt>ENGINE</dt><dd>Unity</dd></div>
          <div><dt>FORMAT</dt><dd>VR · First Person</dd></div>
        </dl>
      </div>
    </header>
    <CaseChapterNavigation label="ReDream Labs sections" chapters={chapters} />
    <section className={`${styles.container} ${styles.section}`} id="overview" aria-labelledby="overview-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>THE PREMISE</p>
        <h2 id="overview-heading">Relive the Dream</h2>
        <p>{wrap("ReDream Labs is a fictional startup that reconstructs emotionally significant dreams, allowing users to enter them again and confront experiences that still stay with them.")}</p>
      </div>
      <Still file="brand.png" alt="ReDream Labs brand identity with the slogan Live Your Dreams. Forever." />
    </section>
    <section className={`${styles.container} ${styles.section}`} id="research" aria-labelledby="research-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>RESEARCH</p>
        <h2 id="research-heading">From Real Dreams to a Fictional Experience</h2>
        <p className={styles.summary}>{wrap("We conducted anonymous interviews about memorable dreams and the emotions that remained after waking. For the prototype, we chose a familiar fear: failing an exam and experiencing humiliation in front of a classroom.")}</p>
      </div>
      <ol className={styles.researchSteps}>
        {research.map((step, i) => <li key={step}><span className={styles.label}>0{i + 1}</span><span>{wrap(step)}</span></li>)}
      </ol>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="scenes" aria-labelledby="scenes-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>EXPERIENCE STRUCTURE</p>
        <h2 id="scenes-heading">Four Scenes, One Unfolding Dream</h2>
      </div>
      <div className={styles.scenes}>
        {scenes.map(scene => <figure key={scene.file}>
          <Still file={`${scene.file}.jpg`} alt={scene.alt} />
          <figcaption className={styles.cardCopy}><h3>{scene.title}</h3><p>{wrap(scene.copy)}</p></figcaption>
        </figure>)}
      </div>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="vr-design" aria-labelledby="vr-design-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>DESIGNING FOR VR</p>
        <h2 id="vr-design-heading">Narrative Through Space</h2>
      </div>
      <div className={styles.principles}>
        {principles.map(principle => <figure key={principle.file}>
          <CaseVideo film={{ src: media(`${principle.file}-hd.mp4`), poster: media(`${principle.file}-poster-hd.jpg`), title: `ReDream Labs — ${principle.title}`, duration: "0:04" }} />
          <figcaption className={styles.cardCopy}><h3>{principle.title}</h3><p>{wrap(principle.copy)}</p></figcaption>
        </figure>)}
      </div>
    </section>
    <section className={`${styles.section} ${styles.reveal}`} id="narrative" aria-labelledby="narrative-heading">
      <div className={`${styles.container} ${styles.revealContent}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>THE NARRATIVE REVEAL</p>
          <h2 id="narrative-heading">The Truth Behind ReDream</h2>
          <p>{wrap("What initially appears to be a service for reconstructing dreams gradually reveals a darker idea: ReDream is not only preserving the memory — it may also be preserving the dreamer.")}</p>
        </div>
        <p className={styles.slogan}>Live Your Dreams.<strong>Forever.</strong></p>
      </div>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="production" aria-labelledby="production-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>BUILDING THE EXPERIENCE</p>
        <h2 id="production-heading">Built in Unity</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.evidence}>
          <div className={styles.evidenceItem}>
            <Still file="construction.jpg" alt="The classroom environment assembled in Unity" />
            <div className={styles.cardCopy}><h3>Scene Construction</h3><p>{wrap("Four environments carry the progression from a controlled reconstruction to an unfamiliar space.")}</p></div>
          </div>
          <div className={styles.evidenceItem}>
            <Still file="experience-flow.jpg" alt="The ReDream opening screen introducing the VR experience" />
            <div className={styles.cardCopy}><h3>VR Experience Flow</h3><p>{wrap("The opening instructions and dream scan lead into the exam, the back room and the final reveal.")}</p></div>
          </div>
        </div>
        <div className={styles.productionTools}>
          <h3 className={styles.toolsHeading}>Production &amp; Tools</h3>
          <dl className={styles.tools}>
            <div><dt>Unity</dt><dd>VR implementation · Experience assembly</dd></div>
            <div className={styles.afterEffectsTool}><dt>After Effects</dt><dd>Video scenes · Transition sequences · Motion design · Compositing</dd></div>
          </dl>
          <figure className={styles.afterEffects}>
            <Still file="dream-scan.jpg" alt="Dream-scan video scene created by Shani in After Effects and shown inside the VR experience" />
            <figcaption className={styles.cardCopy}>
              <h3>Video Scenes &amp; Transitions</h3>
              <p>{wrap("I created the video scenes and transitions in After Effects, including the dream-scan sequence shown here.")}</p>
              <p className={styles.caption}>Dream-scan scene · Still from the recorded VR experience</p>
            </figcaption>
          </figure>
          <p className={styles.caption}>AI-assisted production — character generation and voice</p>
        </div>
        <dl className={styles.contributions}>
          <div><dt>My Contribution</dt><dd>Unity implementation · VR experience assembly<br />Video scenes, motion design and transitions in After Effects<br />Video editing</dd></div>
          <div><dt>Partner Contribution</dt><dd>Lighting inside Unity</dd></div>
          <div><img className={styles.contributionRule} src={media("contribution-rule.svg")} width={396} height={1} alt="" /><dt>Shared Contribution</dt><dd>Core concept · Narrative Design<br />Developed collaboratively.</dd></div>
        </dl>
      </div>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="watch" aria-labelledby="watch-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>RECORDED PLAYTHROUGH</p>
        <h2 id="watch-heading">Watch the Full VR Experience</h2>
        <p className={styles.summary}>{wrap("The project was designed for VR hardware, so the full experience is presented here as a recorded playthrough.")}</p>
      </div>
      <figure className={styles.film}>
        <CaseVideo ref={fullPlayer} film={{ src: media("full-experience-hd.mp4"), poster: media("full-experience-poster-hd.jpg"), title: "ReDream Labs — Full VR experience", duration: "4:27" }} defaultMuted={false} />
        <figcaption className={styles.playback}>
          <button className={actions.primary} type="button" onClick={() => fullPlayer.current?.playFrom(0)}>Watch Full Experience</button>
          <span className={styles.eyebrow}>RECORDED VR PLAYTHROUGH · 04:27</span>
        </figcaption>
      </figure>
    </section>
    <div className={`${styles.container} ${styles.takeaway}`}><p>{wrap("ReDream Labs explores how a fictional product, spatial storytelling and first-person presence can turn a familiar dream into an unsettling interactive narrative.")}</p></div>
  </article>;
}
