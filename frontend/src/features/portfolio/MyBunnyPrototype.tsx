import type { Ref } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseVideo, type CaseVideoHandle } from "./CaseVideo";
import actions from "./CaseActions.module.scss";
import styles from "./MyBunnyPrototype.module.scss";

const film = {
  src: asset("assets/videos/my-bunny-full.mp4"),
  poster: asset("assets/my-bunny/app-entry.jpg"),
  title: "My Bunny — Unity gameplay",
  duration: "1:08",
};

export function MyBunnyPrototype({ ref, onPlay }: { ref?: Ref<CaseVideoHandle>; onPlay: () => void }) {
  return <div className={styles.prototype}>
    <div className={styles.copy} id="app-game">
      <h2 id="prototype-heading">Play, care and try again.</h2>
      <p>I built the three care stages in Unity, connecting drag-and-match interactions, character reactions and explanatory feedback.</p>
      <button className={actions.primary} type="button" onClick={onPlay}>Play My Bunny</button>
      <p className={styles.caption}>Mouse or touch · Sound available</p>
    </div>
    <figure className={styles.player}>
      <CaseVideo ref={ref} film={film} aspectRatio="9 / 16" posterLabel="Watch full gameplay" defaultMuted={false} />
      <figcaption>Full gameplay · 1:08</figcaption>
    </figure>
  </div>;
}
