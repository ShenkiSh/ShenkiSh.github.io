import { asset } from "@/shared/utils/asset";
import { PortfolioLink } from "./PortfolioLink";
import { ProjectPreview } from "./ProjectPreview";
import styles from "./SelectedWork.module.scss";

const projects = [
  { slug: "we-live-happily-here", title: "We Live Happily Here", tags: "Game UX/UI · Game Design", description: "A family app and cooperative games that turn sibling conflicts into shared goals.", image: "happily-sky", foreground: "assets/home/happily-screens.png", video: "happily-hover-20260916", fit: "cover", background: "#92cef8", alt: "Two coordinated game and player selection screens centered against a blue sky" },
  { slug: "ikko", title: "Tenki", tags: "UI · Visual Design", description: "A seasonal weather app inspired by Ikko Tanaka’s graphic language.", image: "tenki", video: "tenki-hover-clean", fit: "contain", background: "#eecc99", alt: "Two angled phones presenting Tenki’s graphic weather interface" },
  { slug: "le-frogette", title: "Hop! It’s the Chef!", tags: "Game Design · Unity", description: "A tiny frog escapes a kitchen through movement, timing and moments of safety.", image: "hop", video: "hop", fit: "contain", background: "#000", alt: "Robert escaping across the illustrated kitchen in Hop! It’s the Chef!" },
  { slug: "my-bunny", title: "My Bunny", tags: "Game UI · Interaction Design", description: "Children learn rabbit care through feeding, grooming and Bunny’s reactions.", image: "my-bunny", video: "my-bunny-hover-1", fit: "contain", background: "#562062", alt: "My Bunny mobile game on a purple phone against a yellow background" },
] as const;

export function SelectedWork() {
  return <section id="work" aria-labelledby="work-title" className={styles.work}>
    <div className={styles.feature}>
      <div className={styles.container}>
        <h2 id="work-title" className={styles.heading}>FEATURED PROJECT</h2>
        <article className={styles.featureGrid}>
          <PortfolioLink href="numi.html" className={styles.featureMedia} aria-label="View NUMI project">
            <ProjectPreview image="assets/home/numi.png" video="assets/videos/numi-reel.mp4" aspectRatio="1131 / 619" alt="NUMI’s illustrated forest and memory puzzle gameplay" />
          </PortfolioLink>
          <div className={styles.featureCopy}>
            <h3>NUMI</h3>
            <p className={styles.tags}>Game Design · Level Design · Unity</p>
            <p className={styles.description}>A narrative puzzle-platformer about <br />memory, identity and Alzheimer’s, <br />built in Unity and refined through <br />player testing.</p>
            <p className={styles.credit}>Playable at Animix · Channel 10</p>
            <PortfolioLink href="numi.html" className={styles.projectButton}>View Project<img src={asset("assets/home/arrow.svg")} width="36" height="19" alt="" /></PortfolioLink>
          </div>
        </article>
      </div>
    </div>
    <div className={`${styles.container} ${styles.projectGrid}`}>
      {projects.map(project => <article key={project.slug}>
        <PortfolioLink href={`${project.slug}.html`} className={styles.card}>
          <h3>{project.title}</h3>
          <p className={styles.cardTags}>{project.tags}</p>
          <ProjectPreview className={styles.cardMedia} image={project.image === "hop" ? "assets/hop/gameplay-poster.webp" : `assets/home/${project.image}.png`} foreground={"foreground" in project ? project.foreground : undefined} video={project.video === "hop" ? "assets/hop/hover-preview.mp4" : `assets/videos/${project.video}.mp4`} fit={project.fit} background={project.background} alt={project.alt} />
          <p className={styles.cardDescription}>{project.description}</p>
        </PortfolioLink>
      </article>)}
    </div>
  </section>;
}
