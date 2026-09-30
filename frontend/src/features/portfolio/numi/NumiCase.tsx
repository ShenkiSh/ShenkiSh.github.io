import { useState } from "react";
import { PortfolioLink } from "../PortfolioLink";
import { NumiChapterNavigation } from "./NumiChapterNavigation";
import { NumiMemories } from "./NumiMemories";
import { NumiLevelDesign } from "./NumiLevelDesign";
import { NumiFirstMemory } from "./NumiFirstMemory";
import { NumiVideo } from "./NumiVideo";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { NumiMediaDialog, type NumiOverlay } from "./NumiMediaDialog";
import { films, narrative, numiAsset } from "./numiMedia";
import { keepLastWordsTogether } from "./numiTypography";
import styles from "./NumiCase.module.scss";

const mechanicExamples = [
  [films.resize, "Resize · Scale objects to open a path."],
  [films.move, "Grab & Move · Reposition objects to change the route."],
  [films.rotate, "Rotate · Turn objects to solve spatial puzzles."],
] as const;

export function NumiCase() {
  const [media, setMedia] = useState<NumiOverlay | null>(null);
  useExclusiveCaseMedia();
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <PortfolioLink className={styles.back} href="index.html#work"><img className={styles.actionIcon} src={numiAsset("imgArrowLeft.svg")} alt="" />Back to Work</PortfolioLink>
      <div className={styles.grid}>
        <div className={styles.identity}><h1>NUMI</h1><p>2D Narrative&nbsp;Puzzle-Platformer</p></div>
        <div className={styles.heroStatement}>
          <p>A narrative puzzle-platformer where five memories from Naomi’s life become playable&nbsp;worlds.</p>
          <div className={styles.actions}>
            <PortfolioLink className={styles.primary} href="#first-memory">Play the game <span aria-hidden="true">↓</span></PortfolioLink>
          </div>
        </div>
      </div>
      <NumiVideo film={films.trailer} posterLabel="Play trailer" />
      <dl className={styles.metadata}>
        <div><dt>My contribution</dt><dd>Game Design · Level Design · Narrative Design · Game UX/UI · Visual Development · Unity&nbsp;Implementation</dd></div>
        <div><dt>Engine</dt><dd>Unity</dd></div>
        <div><dt>Platform</dt><dd>PC ·&nbsp;Controller</dd></div>
        <div><dt>Scope</dt><dd>5 Playable&nbsp;Memories</dd></div>
        <div><dt>Collaborators</dt><dd>Freelance Programmer · Music&nbsp;Composer</dd></div>
      </dl>
    </header>
    <NumiChapterNavigation />
    <div className={styles.container}>
      <section className={styles.section} id="overview" aria-labelledby="game-heading">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 id="game-heading">Five memories.<br />One fragmented life.</h2>
            <p>Play as NUMI, a fragment of Naomi’s identity, through five memories from childhood to age 70. Family interactions trigger each playable memory before returning to the&nbsp;present.</p>
            <div className={styles.origin}><h3>Where NUMI Began</h3><p>Inspired by my grandmother and my family’s experience with Alzheimer’s, NUMI became a fictional story about memory and&nbsp;identity.</p></div>
          </div>
          <div className={styles.storyboard}>
            {narrative.map(([file, label, description], index) => <figure key={label}><img src={numiAsset(file)} alt={description ?? label} width="352" height="198" loading="lazy" /><figcaption>0{index + 1} / {keepLastWordsTogether(label)}</figcaption></figure>)}
          </div>
        </div>
      </section>
      <NumiMemories />
      <NumiLevelDesign />
      <NumiFirstMemory onWatch={() => setMedia({ kind: "film", film: films.childhood })} />
      <section className={styles.section} id="mechanics" aria-labelledby="mechanics-heading">
        <div className={styles.grid}>
          <div className={styles.copy}><h2 id="mechanics-heading">Mechanics &amp; Interaction</h2><p>Three ways to manipulate objects and change the route through a&nbsp;level.</p></div>
          <div className={styles.threeMedia}>{mechanicExamples.map(([film, caption]) => <figure key={film.id}><NumiVideo film={film} /><figcaption>{keepLastWordsTogether(caption)}</figcaption></figure>)}</div>
        </div>
      </section>
      <section className={styles.section} id="unity" aria-labelledby="ui-heading">
        <span id="visual-ui" className={styles.anchor} />
        <div className={styles.grid}>
          <div className={styles.copy}><h2 id="ui-heading">Game UI &amp; Feedback</h2><p>Collecting four fragments rebuilds the memory. The HUD makes that progress visible through the image&nbsp;itself.</p></div>
          <div className={styles.threeMedia}>{[
            ["imgActualRecordedHud04Empty.png", "Memory HUD before collecting fragments"],
            ["imgActualRecordedHud14Partial.png", "Memory HUD with one fragment collected"],
            ["imgActualRecordedHud44Complete.png", "The completed memory, with all four fragments collected"],
          ].map(([file, alt]) => <div key={file} className={styles.hud}><img src={numiAsset(file!)} alt={alt} width="400" height="400" loading="lazy" /></div>)}</div>
        </div>
        <div className={`${styles.grid} ${styles.feedback}`}>
          <div className={styles.copy}>
            <h3>Interaction Feedback</h3>
            <p>Highlighted objects and contextual controller prompts show what can be used and which input to&nbsp;press.</p>
            <p className={styles.small}>UX/UI and Unity integration by me. Programming with a freelance&nbsp;programmer.</p>
          </div>
          <div className={`${styles.threeMedia} ${styles.feedbackMedia}`}>
            {[["feedback-hold.jpg", "Hold prompt"], ["feedback-scale.jpg", "Scale prompt"]].map(([file, label]) => <figure key={file}><img src={numiAsset(file!)} alt={label} width="1280" height="720" loading="lazy" /><figcaption>{keepLastWordsTogether(label!)}</figcaption></figure>)}
            <figure><NumiVideo film={{ ...films.after, title: "Contextual interaction", poster: "feedback-result.jpg" }} /><figcaption>Interaction in&nbsp;game</figcaption></figure>
          </div>
        </div>
      </section>
      <section className={styles.section} id="testing" aria-labelledby="testing-heading">
        <div className={styles.grid}>
          <div className={styles.copy}><h2 id="testing-heading">Playtesting &amp; Iteration</h2><p>Players confused Hold and Scale when both prompts appeared together. I revised their appearance and timing: Hold appears first, then changes to Scale after the object is held, guiding the player to the right&nbsp;stick.</p></div>
          <div className={styles.twoMedia}><figure><NumiVideo film={films.before} /><figcaption>Before · Hold and Scale&nbsp;together</figcaption></figure><figure><NumiVideo film={films.after} /><figcaption>After · One prompt at a&nbsp;time</figcaption></figure></div>
        </div>
      </section>
      <section className={styles.section} id="visual" aria-labelledby="visual-heading">
        <div className={styles.grid}>
          <div className={styles.copy}><h2 id="visual-heading">Visual Development</h2><p>NUMI’s silhouette stays distinct from the environment. Familiar objects and changing landscapes carry each memory’s emotional&nbsp;tone.</p></div>
          <div className={styles.visualGrid}>
            <img className={styles.character} src={numiAsset("visual-character.png")} alt="NUMI character design" loading="lazy" width="352" height="388" />
            <div className={styles.environments}><img src={numiAsset("visual-environment-1.png")} alt="Floating islands and organic shapes in NUMI’s landscape" loading="lazy" width="728" height="196" /><img src={numiAsset("visual-environment-2.png")} alt="NUMI among boxes and objects in the game environment" loading="lazy" width="728" height="176" /></div>
            {[ ["visual-trees.png", "Tree silhouettes"], ["visual-bench.png", "Bench asset"], ["visual-hands.png", "Hands as platforms and support"] ].map(([file, alt]) => <img key={file} src={numiAsset(file!)} alt={alt} loading="lazy" width="352" height="218" />)}
          </div>
        </div>
      </section>
      <section className={styles.section} id="players" aria-labelledby="players-heading">
        <div className={styles.grid}>
          <div className={styles.copy}><h2 id="players-heading">From Screen to Players</h2><p>Players of different ages completed all five memories at Animatheque, Tel Aviv&nbsp;Cinematheque.</p>
            <a className={styles.interview} href="https://youtu.be/jpuC4LFZNx4" target="_blank" rel="noreferrer"><img src={numiAsset("imgNumiActualCaptureInterview.png")} alt="" loading="lazy" width="192" height="108" /><span>Channel 10 interview →</span></a>
          </div>
          <button className={styles.photoButton} onClick={() => setMedia({ kind: "image", file: "imgSourceArtworkGroup1100.png", title: "NUMI at Animatheque, Tel Aviv Cinematheque" })} aria-label="Enlarge public playtesting photo"><img src={numiAsset("imgSourceArtworkGroup1100.png")} alt="Visitors playing NUMI with a controller at the public showcase" loading="lazy" width="1104" height="548" /></button>
        </div>
      </section>
    </div>
    {media ? <NumiMediaDialog media={media} onClose={() => setMedia(null)} /> : null}
  </article>;
}
