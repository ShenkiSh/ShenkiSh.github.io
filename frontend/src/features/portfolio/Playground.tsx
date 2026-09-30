import { c } from "./styles";
import { asset } from "@/shared/utils/asset";
import { PreviewVideo } from "./PreviewVideo";
import { PreviewTile } from "./PreviewTile";

export function Playground() {
  return (<>
<section className={c("home-section playground-section")} id="playground" aria-labelledby="playground-title">
<div className={c("container")}>
<div className={c("section-heading")}><h2 id="playground-title">Game UI &amp;<br />Visual Playground</h2><p>Bits and pieces from my worlds</p></div>
<div className={c("playground-grid")}>
<PreviewTile className={c("playground-tile")} data-piece="world" title="World in motion" project="NUMI" projectPage="numi.html" media={{"src": "assets/videos/numi-reel.mp4", "poster": "assets/images/numi-reel.jpg", "type": "video", "alt": "NUMI’s layered forest and puzzle environment"}}>

<div className={c("tile-visual")}><img src={asset("assets/images/numi-reel.jpg")} alt="NUMI’s layered forest and puzzle environment" loading="lazy" decoding="async" /><PreviewVideo muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1} previewSrc={asset("assets/videos/numi-reel.mp4")} /></div>
<div className={c("tile-caption")}><h3>World in motion</h3><p>Game motion · NUMI</p></div>

</PreviewTile>
<PreviewTile className={c("playground-tile")} data-piece="weather" title="Interaction icons" project="TENKI" projectPage="ikko.html" media={{"src": "assets/images/ikko-interaction-icons.jpg", "poster": "assets/images/ikko-interaction-icons.jpg", "type": "image", "alt": "TENKI’s geometric mail, home and calendar icons"}}>

<div className={c("tile-visual")}><img src={asset("assets/images/ikko-interaction-icons.jpg")} alt="TENKI’s geometric mail, home and calendar icons" loading="lazy" decoding="async" /></div>
<div className={c("tile-caption")}><h3>Interaction icons</h3><p>Icons · TENKI</p></div>

</PreviewTile>
<PreviewTile className={c("playground-tile")} data-piece="character" title="Character in context" project="NUMI" projectPage="numi.html" media={{"src": "assets/images/numi-character-context.jpg", "poster": "assets/images/numi-character-context.jpg", "type": "image", "alt": "NUMI character beside an illuminated puzzle interaction"}}>

<div className={c("tile-visual")}><img src={asset("assets/images/numi-character-context.jpg")} alt="NUMI character beside an illuminated puzzle interaction" loading="lazy" decoding="async" /></div>
<div className={c("tile-caption")}><h3>Character in context</h3><p>Character · NUMI</p></div>

</PreviewTile>
<PreviewTile className={c("playground-tile")} data-piece="results" title="Results UI" project="We Live Happily Here" projectPage="we-live-happily-here.html" media={{"src": "assets/images/happily-results-detail.jpg", "poster": "assets/images/happily-results-detail.jpg", "type": "image", "alt": "Shared journey results and feedback screen"}}>

<div className={c("tile-visual")}><img src={asset("assets/images/happily-results-detail.jpg")} alt="Shared journey results and feedback screen" loading="lazy" decoding="async" /></div>
<div className={c("tile-caption")}><h3>Results UI</h3><p>UI screen · We Live Happily Here</p></div>

</PreviewTile>
<PreviewTile className={c("playground-tile")} data-piece="selection" title="Player Selection UI" project="We Live Happily Here" projectPage="we-live-happily-here.html" media={{"src": "assets/images/happily-selection-detail.jpg", "poster": "assets/images/happily-selection-detail.jpg", "type": "image", "alt": "Character avatars and player selection controls"}}>

<div className={c("tile-visual")}><img src={asset("assets/images/happily-selection-detail.jpg")} alt="Character avatars and player selection controls" loading="lazy" decoding="async" /></div>
<div className={c("tile-caption")}><h3>Player Selection UI</h3><p>UI screen · We Live Happily Here</p></div>

</PreviewTile>
<PreviewTile className={c("playground-tile")} data-piece="map" title="Map UI" project="TENKI" projectPage="ikko.html" media={{"src": "assets/images/ikko-map.jpg", "poster": "assets/images/ikko-map.jpg", "type": "image", "alt": "TENKI location and map interface"}}>

<div className={c("tile-visual")}><img src={asset("assets/images/ikko-map.jpg")} alt="TENKI location and map interface" loading="lazy" decoding="async" /></div>
<div className={c("tile-caption")}><h3>Map UI</h3><p>UI screen · TENKI</p></div>

</PreviewTile>
</div>
</div>
</section>
  </>);
}
