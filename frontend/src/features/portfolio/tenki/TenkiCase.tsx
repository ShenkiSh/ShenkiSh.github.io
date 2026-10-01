import { useState } from "react";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { PortfolioLink } from "../PortfolioLink";
import { tenkiAsset, tenkiArtwork, tenkiMapPrototype, tenkiPrototype, tenkiScreens, type TenkiArtwork } from "./tenkiAssets";
import { TenkiDemo } from "./TenkiDemo";
import { TenkiMap } from "./TenkiMap";
import { TenkiArtworkDialog } from "./TenkiArtworkDialog";
import styles from "./TenkiCase.module.scss";
import actions from "../CaseActions.module.scss";

const chapters = [
  ["artist", "The idea"], ["product-flow", "App flow"], ["translation", "Visual design"],
  ["graphic-language", "Graphic language"], ["prototype", "Try it"],
] as const;
const flowCaptions = [
  "Read today’s forecast in the context of Sakura season.",
  "Compare the week and pick a day to go out.",
  "Connect the forecast to places worth visiting.",
  "Explore the map and choose a destination.",
  "Follow the route and prepare for a picnic.",
];

function Artwork({ file, alt, className = "", width, height }: { file: string; alt: string; className?: string; width: number; height: number }) {
  return <img className={className} src={tenkiAsset(file)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
}

export function TenkiCase() {
  const [artwork, setArtwork] = useState<TenkiArtwork | null>(null);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`} aria-label="TENKI introduction">
      <div className={styles.identity}><h1>TENKI</h1><p className={styles.label}>Seasonal Weather App</p></div>
      <div className={styles.heroCopy}>
        <p className={styles.introduction}>Weather shaped by Japanese seasonal culture.</p>
        <p className={styles.muted}>I designed the concept, user flow and custom UI system, translating Ikko Tanaka’s graphic language into a seasonal weather app.</p>
        <div className={styles.heroActions}>
          <PortfolioLink className={actions.primary} href="#prototype">Explore the app</PortfolioLink>
          <PortfolioLink className={actions.secondary} href="#artist">Discover the concept</PortfolioLink>
        </div>
      </div>
      <button type="button" className={`${styles.artworkButton} ${styles.heroArtwork}`} aria-label="Enlarge the seasonal app mockup" onClick={() => setArtwork(tenkiArtwork.hero)}>
        <img src={tenkiAsset(tenkiArtwork.hero.file)} width="1920" height="1080" alt={tenkiArtwork.hero.alt} fetchPriority="high" />
      </button>
    </header>
    <CaseChapterNavigation label="TENKI sections" chapters={chapters} showDivider={false} />
    <div className={styles.container}>
      <section className={styles.chapter} id="artist" aria-labelledby="artist-heading">
        <div className={styles.ideaGrid}>
          <div className={styles.copy}>
            <p className={styles.label}>The idea</p>
            <h2 id="artist-heading">An artist’s language.<br />A seasonal idea.</h2>
            <p>The brief was to translate an artist’s work into a digital product. I chose Ikko Tanaka for his bold geometry, color and connection to Japanese culture.</p>
          </div>
          <div>
            <div className={styles.references}>
              <figure><Artwork file="nihon-buyo.png" alt="Ikko Tanaka’s Nihon Buyo poster" width={756} height={528} /><figcaption>Nihon Buyo, 1981</figcaption></figure>
              <figure><Artwork file="botanical-garden.png" alt="Ikko Tanaka’s Botanical Garden poster" width={756} height={528} /><figcaption>Botanical Garden, 1990</figcaption></figure>
            </div>
            <p className={styles.credit}>© Ikko Tanaka. References: National Museum of Art, Osaka.</p>
          </div>
        </div>
        <div className={styles.concept} id="concept">
          <div className={styles.copy} id="seasons">
            <h3>When weather becomes a plan.</h3>
            <p>Japan’s 24 seasonal periods became the starting point. I connected the daily forecast to seasonal experiences, from Sakura viewing to planning a picnic.</p>
          </div>
          <div className={styles.conceptIcons}>
            <figure><Artwork file="sun.svg" alt="" width={243} height={244} /><figcaption>The forecast</figcaption></figure>
            <figure><Artwork file="sakura.svg" alt="" width={64} height={64} /><figcaption>The seasonal moment</figcaption></figure>
            <figure><Artwork file="picnic-icon.png" alt="" width={64} height={64} /><figcaption>A reason to go outside</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.chapter} id="product-flow" aria-labelledby="flow-heading">
        <div className={styles.chapterHeading} id="final-interface">
          <div className={styles.copy}><p className={styles.label}>App flow</p><h2 id="flow-heading">From forecast to outing.</h2></div>
          <p>The five screens connect a daily check to a small plan: choose a day, find a seasonal location and decide how to get there.</p>
        </div>
        <ol className={styles.flow} aria-label="The five screens of the TENKI app" tabIndex={0}>
          {tenkiScreens.map(([file, label, alt], i) => <li key={file}><figure>
            <Artwork className={styles.screen} file={file} alt={alt} width={825} height={1836} />
            <figcaption><h3>{label}</h3><p>{flowCaptions[i]}</p></figcaption>
          </figure></li>)}
        </ol>
      </section>

      <section className={styles.chapter} id="translation" aria-labelledby="translation-heading">
        <div className={styles.chapterHeading}>
          <div className={styles.copy}><p className={styles.label}>Visual design</p><h2 id="translation-heading">From poster to interface.</h2></div>
          <p>I translated Tanaka’s visual principles into elements the user can read, recognize and navigate.</p>
        </div>
        <div className={styles.principles}>
          <figure><div className={styles.principleArt}><Artwork file="sun.svg" alt="TENKI’s geometric sun symbol" width={243} height={244} /></div><figcaption><h3>A circle becomes the weather</h3><p>Bold geometry gives the sun a clear, recognizable shape.</p></figcaption></figure>
          <figure><div className={styles.principleArt}><Artwork file="map-art.png" alt="TENKI’s complete illustrated map, organized into contrasting color fields" width={1771} height={1183} /></div><figcaption><h3>Color organizes the map</h3><p>Contrasting fields separate areas across the illustrated landscape.</p></figcaption></figure>
          <figure><div className={styles.principleArt}><Artwork file="navigation-icons.svg" alt="Custom location, home and calendar icons" width={480} height={115} /></div><figcaption><h3>Shapes guide navigation</h3><p>Location, home and calendar share a geometric vocabulary.</p></figcaption></figure>
        </div>
      </section>

      <section className={styles.chapter} id="graphic-language" aria-labelledby="graphic-language-heading">
        <div className={styles.chapterHeading}>
          <div className={styles.copy}><p className={styles.label}>Graphic language</p><h2 id="graphic-language-heading">One language.<br />On and off screen.</h2></div>
          <p>Custom numerals, icons and color blocks connect the interface to a wider visual identity.</p>
        </div>
        <div className={styles.graphicLanguage}>
          <figure>
            <div className={styles.numerals}>
              <Artwork file="numeral-25.svg" alt="Custom geometric 25-degree numeral" width={296} height={191} />
              <Artwork file="numeral-29.svg" alt="Custom 29-degree numeral" width={216} height={143} />
              <Artwork file="numeral-24.svg" alt="Custom geometric temperature numeral" width={216} height={140} />
            </div>
            <figcaption><h3>Weather with its own character</h3><p>Temperature becomes part of the identity through custom geometric numerals.</p></figcaption>
          </figure>
          <figure>
            <div className={styles.forecast}><Artwork file="forecast-row.svg" alt="A complete forecast row combining custom numerals, a sun icon and the selected date" width={528} height={225} /></div>
            <figcaption><h3>A shared visual vocabulary</h3><p>The numerals, weather symbols and selected date come together in the forecast.</p></figcaption>
          </figure>
        </div>
        <figure className={styles.brandWorld}>
          <button type="button" className={styles.artworkButton} aria-label="Enlarge TENKI brand applications" onClick={() => setArtwork(tenkiArtwork.brand)}>
            <Artwork file={tenkiArtwork.brand.file} alt={tenkiArtwork.brand.alt} width={1920} height={1080} />
          </button>
          <figcaption>Picnic mockups exploring TENKI’s visual language beyond the app.</figcaption>
        </figure>
      </section>

      <section className={styles.chapter} id="prototype" aria-labelledby="prototype-heading">
        <div className={styles.chapterHeading}>
          <div className={styles.copy}><p className={styles.label}>Try it</p><h2 id="prototype-heading">See the idea in motion.</h2></div>
          <p>Watch the app flow and explore the map here. Open the Figma prototype to try the full journey.</p>
        </div>
        <div className={styles.tryGrid}>
          <div className={styles.tryItem}>
            <div className={styles.tryCopy}><h3>Follow the app flow</h3><p>See how weather, seasonal places and outing plans connect.</p><a className={actions.primary} href={tenkiPrototype} target="_blank" rel="noreferrer">Try the app</a></div>
            <div className={styles.tryMedia}><TenkiDemo /></div>
          </div>
          <div className={styles.tryItem}>
            <div className={styles.tryCopy}><h3>Explore the map</h3><p>Drag the illustrated map to discover its places and details.</p><a className={actions.secondary} href={tenkiMapPrototype} target="_blank" rel="noreferrer">Open the map prototype</a></div>
            <div className={`${styles.tryMedia} ${styles.mapPreview}`}><TenkiMap /></div>
          </div>
        </div>
      </section>
    </div>
    {artwork && <TenkiArtworkDialog artwork={artwork} onClose={() => setArtwork(null)} />}
  </article>;
}
