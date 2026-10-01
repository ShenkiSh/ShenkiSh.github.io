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
  ["overview", "The idea"], ["scenes", "The journey"],
  ["production", "Making it"], ["watch", "Full experience"],
] as const;
const scenes = [
  { file: "entry-scene-hd.jpg", title: "The dream scan", alt: "Instructions on the ReDream screen as the dream scan begins", copy: "Instructions and a scan introduce the fictional service, inviting the user to trust the reconstruction." },
  { file: "exam-scene-hd.jpg", title: "The exam", alt: "A final exam paper held in front of the user inside the VR classroom", copy: "Inside a classroom, an unreadable exam paper turns a familiar setting into a fear of failure." },
  { file: "back-room-scene-hd.jpg", title: "The back room", alt: "A figure at the far end of an unfamiliar yellow corridor", copy: "Beyond the classroom, unfamiliar corridors and a distant figure unsettle the promise of a controlled dream." },
  { file: "reveal-scene-hd.jpg", id: "narrative", title: "The final reveal", alt: "The system message reads: Donation confirmed. Original consciousness may now exit.", copy: "The final message confirms a donation of consciousness. ReDream may have preserved more than a memory." },
] as const;
const examples = [
  {
    file: "inside-exam", title: "Inside the exam", duration: "0:18",
    heading: "A memory experienced in first person",
    copy: "I assembled the classroom experience in Unity. Looking around, holding the exam and releasing it place the user inside the scene.",
  },
  {
    file: "leaving-classroom", title: "Leaving the classroom", duration: "0:24",
    heading: "From a familiar room to an unfamiliar space",
    copy: "I connected the scenes into one VR journey. The classroom empties before the user crosses into the back room, shifting the story from exam anxiety to uncertainty.",
  },
] as const;

function Still({ file, alt }: { file: string; alt: string }) {
  return <img className={styles.still} src={media(file)} alt={alt} width={2560} height={1440} loading="lazy" decoding="async" />;
}

export function RedreamContent() {
  useExclusiveCaseMedia();
  const fullPlayer = useRef<CaseVideoHandle>(null);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`} aria-label="ReDream Labs introduction">
      <div className={styles.identity}>
        <h1>ReDream Labs™</h1>
        <p className={styles.format}>Narrative VR Experience</p>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.hook}>{wrap("A reconstructed dream becomes an unsettling VR experience.")}</p>
        <p className={styles.role}>{wrap("I assembled the experience in Unity and created video scenes, motion and transitions in After Effects.")}</p>
        <div className={styles.actions}>
          <button className={actions.primary} type="button" aria-label="Watch the full experience" onClick={() => fullPlayer.current?.playFrom(0)}>Watch the full experience <span className={styles.duration}>4:27</span></button>
        </div>
        <p className={styles.note}>Collaborative project · Unity · First-person VR</p>
      </div>
      <figure className={styles.heroFilm}>
        <CaseVideo film={{ src: media("hero-hd.mp4"), poster: media("hero-poster-hd.jpg"), title: "ReDream Labs — Experience preview", duration: "0:30" }} posterLabel="Watch the preview" />
        <figcaption>Experience preview · 0:30</figcaption>
      </figure>
    </header>
    <CaseChapterNavigation label="ReDream Labs sections" chapters={chapters} showDivider={false} />
    <section className={`${styles.container} ${styles.section}`} id="overview" aria-labelledby="overview-heading">
      <div className={styles.introduction}>
        <h2 id="overview-heading">A familiar fear, reconstructed.</h2>
        <p>{wrap("ReDream Labs is a fictional startup that lets people revisit emotionally significant dreams. Its reassuring promise hides a darker purpose.")}</p>
      </div>
      <div className={styles.premise}>
        <Still file="brand.png" alt="ReDream Labs brand identity with the slogan Live Your Dreams. Forever." />
        <div className={styles.research} id="research">
          <h3>Starting with real dreams</h3>
          <p>{wrap("We conducted anonymous interviews about memorable dreams and the emotions that remained after waking. For the prototype, we chose the fear of failing an exam and experiencing humiliation in front of a classroom.")}</p>
        </div>
      </div>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="scenes" aria-labelledby="scenes-heading">
      <div className={styles.introduction}>
        <h2 id="scenes-heading">Inside the reconstructed dream.</h2>
        <p>{wrap("Four scenes move from the lab’s reassuring instructions to a message that changes their meaning.")}</p>
      </div>
      <div className={styles.scenes}>
        {scenes.map(scene => <figure key={scene.file} id={"id" in scene ? scene.id : undefined}>
          <Still file={scene.file} alt={scene.alt} />
          <figcaption><h3>{scene.title}</h3><p>{wrap(scene.copy)}</p></figcaption>
        </figure>)}
      </div>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="production" aria-labelledby="production-heading">
      <div className={styles.introduction}>
        <h2 id="production-heading">Building the experience.</h2>
      </div>
      <div className={styles.production} id="vr-design">
        <figure className={styles.motion}>
          <CaseVideo film={{ src: media("dream-scan-hd.mp4"), poster: media("dream-scan-poster-hd.jpg"), title: "ReDream Labs — Dream scan", duration: "0:23" }} posterLabel="Watch the dream scan" />
          <figcaption>
            <h3>The dream scan in motion</h3>
            <p>{wrap("I created the video scenes and transitions in After Effects. The scan’s progress animation and messages give the fictional process a visible sequence before the dream begins.")}</p>
            <p className={styles.note}>After Effects sequence shown inside the recorded VR experience.</p>
          </figcaption>
        </figure>
        <div className={styles.examples}>
          {examples.map(example => <figure key={example.file}>
            <CaseVideo film={{ src: media(`${example.file}-hd.mp4`), poster: media(`${example.file}-poster-hd.jpg`), title: `ReDream Labs — ${example.title}`, duration: example.duration }} />
            <figcaption><h3>{example.heading}</h3><p>{wrap(example.copy)}</p></figcaption>
          </figure>)}
        </div>
      </div>
    </section>
    <section className={`${styles.container} ${styles.section}`} id="watch" aria-labelledby="watch-heading">
      <div className={styles.introduction}>
        <h2 id="watch-heading">Watch the full VR experience.</h2>
        <p>{wrap("A recording of the complete journey, from the lab’s introduction to the final reveal. The original experience was designed for a VR headset.")}</p>
      </div>
      <figure>
        <CaseVideo ref={fullPlayer} film={{ src: media("full-experience-hd.mp4"), poster: media("full-experience-poster-hd.jpg"), title: "ReDream Labs — Full VR experience", duration: "4:27" }} defaultMuted={false} posterLabel="Watch the full experience" />
        <figcaption>Recorded VR playthrough · 4:27 · Sound on</figcaption>
      </figure>
      <div className={styles.credits} id="credits">
        <h3>Credits</h3>
        <dl className={styles.contributions}>
          <div><dt>My contribution</dt><dd>Unity implementation and VR assembly<br />Video scenes, motion and transitions in After Effects<br />Video editing</dd></div>
          <div><dt>Shared</dt><dd>Core concept and narrative design</dd></div>
          <div><dt>Partner</dt><dd>Lighting inside Unity</dd></div>
        </dl>
        <p className={styles.note}>AI-assisted production: character generation and voice.</p>
      </div>
    </section>
  </article>;
}
