import type { Ref } from "react";
import { asset } from "@/shared/utils/asset";
import { CaseVideo, type CaseVideoHandle } from "./CaseVideo";
import styles from "./MyBunnyPrototype.module.scss";

const film = {
  src: asset("assets/videos/my-bunny-full.mp4"),
  poster: asset("assets/my-bunny/app-entry.jpg"),
  title: "My Bunny — Unity gameplay",
  duration: "1:08",
};

export function MyBunnyPrototype({ ref }: { ref?: Ref<CaseVideoHandle> }) {
  return <div className={styles.prototype}>
    <div className={styles.player}>
      <CaseVideo ref={ref} film={film} aspectRatio="9 / 16" defaultMuted={false} />
    </div>
    <div className={styles.details}>
      <ul className={styles.features}>
        <li>Three care stages</li>
        <li>Drag-and-match interactions</li>
        <li>Explanatory player feedback</li>
      </ul>
      <p className={styles.caption}>Original Unity gameplay · 1:08<br />Feed · Clean · Play</p>
    </div>
  </div>;
}
