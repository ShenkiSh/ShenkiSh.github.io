import { NumiVideo } from "./NumiVideo";
import { films, numiAsset } from "./numiMedia";
import { eventPhotos } from "./numiEventPhotos";
import caseStyles from "./NumiCase.module.scss";
import styles from "./NumiShowcase.module.scss";

export function NumiShowcase({ onOpenGallery }: { onOpenGallery: (index: number) => void }) {
  return <section className={`${caseStyles.section} ${caseStyles.closing}`} id="players" aria-labelledby="players-heading">
    <div className={styles.interview}>
      <div className={caseStyles.copy}>
        <h2 id="players-heading">NUMI on Channel 10.</h2>
        <p>The personal story behind NUMI, and how memory became a playable world.</p>
        <p className={caseStyles.small}>TV interview · Hebrew</p>
        <a className={caseStyles.textLink} href="https://youtu.be/jpuC4LFZNx4" target="_blank" rel="noreferrer">Watch on YouTube with English subtitles</a>
      </div>
      <NumiVideo film={films.interview} posterLabel="Watch the interview" defaultMuted={false} />
    </div>
    <div className={styles.event}>
      <div className={caseStyles.copy}>
        <h3>From screen to players.</h3>
        <p>Players of different ages completed all five memories at Animatheque, Tel Aviv Cinematheque.</p>
      </div>
      <div className={styles.eventGallery}>
        <button type="button" className={styles.cover} onClick={() => onOpenGallery(0)} aria-label="Enlarge public playtesting photo">
          <img src={numiAsset("imgSourceArtworkGroup1100.png")} alt="Visitors playing NUMI with a controller at the public showcase" loading="lazy" width="1104" height="548" />
          <span>View {eventPhotos.length} photos</span>
        </button>
        <div className={styles.thumbnails} aria-label="Event photo previews">
          {eventPhotos.map((photo, index) => <button type="button" key={photo.file} onClick={() => onOpenGallery(index)} aria-label={`Open event photo ${index + 1} of ${eventPhotos.length}`}>
            <img src={numiAsset(photo.thumb)} alt="" width="320" height="200" loading="lazy" />
          </button>)}
        </div>
      </div>
    </div>
    <dl className={caseStyles.credits}>
      <div><dt>My contribution</dt><dd>Game &amp; Level Design · Narrative Design · Game UX/UI · Visual Development · Unity Implementation</dd></div>
      <div><dt>Collaborators</dt><dd>Freelance Programmer · Music Composer</dd></div>
    </dl>
  </section>;
}
