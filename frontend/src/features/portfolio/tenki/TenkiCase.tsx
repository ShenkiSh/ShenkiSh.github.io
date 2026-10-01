import { useState } from "react";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { PortfolioLink } from "../PortfolioLink";
import { tenkiAsset, tenkiArtwork, tenkiPrototype, tenkiScreens, type TenkiArtwork } from "./tenkiAssets";
import { TenkiDemo } from "./TenkiDemo";
import { TenkiArtworkDialog } from "./TenkiArtworkDialog";
import styles from "./TenkiCase.module.scss";
import actions from "../CaseActions.module.scss";

const chapters = [
  ["artist", "The idea"], ["product-flow", "App flow"], ["translation", "Visual design"],
  ["graphic-language", "Graphic language"], ["prototype", "Try it"],
] as const;
const flowCaptions = [
  "A picnic suggestion on the home screen turns the forecast into a next step.",
  "Compare the week and choose a day.",
  "Weather stays beside the map, giving each location its seasonal context.",
  "Explore nearby parks and choose a destination.",
  "See the route and walking time before setting out.",
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
        <p className={styles.introduction}>Check the weather. Find a seasonal reason to go outside.</p>
        <p className={styles.muted}>I designed the concept, user flow and custom UI for a weather app inspired by Ikko Tanaka and Japan’s seasonal calendar.</p>
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
            <h2 id="artist-heading">An artist’s language. A seasonal idea.</h2>
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
          <h2 id="flow-heading">From forecast to outing.</h2>
          <p>Follow the journey from forecast to picnic. Select a screen to view it larger.</p>
        </div>
        <ol className={styles.flow} aria-label="The five screens of the TENKI app" tabIndex={0}>
          {tenkiScreens.map(([file, label, alt], i) => <li key={file}><figure>
            <button type="button" className={styles.screenButton} aria-label={`Enlarge: ${label}`} onClick={() => setArtwork({ file, title: label, alt, width: 825, height: 1836 })}>
              <Artwork className={styles.screen} file={file} alt={alt} width={825} height={1836} />
            </button>
            <figcaption><h3>{label}</h3><p>{flowCaptions[i]}</p></figcaption>
          </figure></li>)}
        </ol>
      </section>

      <section className={styles.chapter} id="translation" aria-labelledby="translation-heading">
        <div className={styles.chapterHeading}>
          <h2 id="translation-heading">From poster to interface.</h2>
          <p>Repeated symbols connect the forecast, navigation and map.</p>
        </div>
        <div className={styles.principles}>
          <figure><div className={styles.principleArt}><Artwork file="sun.svg" alt="TENKI’s geometric sun symbol" width={243} height={244} /></div><figcaption><h3>A shared weather symbol</h3><p>One geometric sun connects the daily and weekly forecasts.</p></figcaption></figure>
          <figure><div className={styles.principleArt}><Artwork file="map-art.png" alt="TENKI’s complete illustrated map, organized into contrasting color fields" width={1771} height={1183} /></div><figcaption><h3>Places on the map</h3><p>Park names and pins mark the places you can explore and choose.</p></figcaption></figure>
          <figure><div className={styles.principleArt}><Artwork file="navigation-icons.svg" alt="Custom location, home and calendar icons" width={480} height={115} /></div><figcaption><h3>Familiar navigation</h3><p>Location, home and calendar keep familiar meanings in a shared geometric style.</p></figcaption></figure>
        </div>
      </section>

      <section className={styles.chapter} id="graphic-language" aria-labelledby="graphic-language-heading">
        <div className={styles.chapterHeading}>
          <h2 id="graphic-language-heading">One language. On and off screen.</h2>
          <p>Custom numerals, icons and color blocks connect the interface to a wider visual identity.</p>
        </div>
        <div className={styles.graphicLanguage}>
          <figure>
            <div className={styles.numerals}>
              <Artwork file="numeral-25.svg" alt="Custom geometric 25-degree numeral" width={296} height={191} />
              <Artwork file="numeral-29.svg" alt="Custom 29-degree numeral" width={216} height={143} />
              <Artwork file="numeral-24.svg" alt="Custom geometric temperature numeral" width={216} height={140} />
            </div>
            <figcaption><h3>Custom weather numerals</h3><p>Geometric numerals make temperature part of the visual identity.</p></figcaption>
          </figure>
          <figure>
            <div className={styles.selectionComparison}>
              <figure><div className={`${styles.rowArtwork} ${styles.originalRow}`}><Artwork file="weekly-row-original.png" alt="The original Sunday forecast row on its beige background" width={347} height={120} /></div><figcaption>Original row</figcaption></figure>
              <figure><div className={styles.rowArtwork}><Artwork file="weekly-row-selected.png" alt="The updated Sunday forecast row with a blue background marking the selected day" width={364} height={155} /></div><figcaption>Selected day</figcaption></figure>
            </div>
            <figcaption><h3>The selected day, made clear</h3><p>A color block now marks the chosen day, connecting the weekly list to the forecast above.</p></figcaption>
          </figure>
        </div>
        <figure className={styles.brandWorld}>
          <button type="button" className={styles.artworkButton} aria-label="Enlarge TENKI brand applications" onClick={() => setArtwork(tenkiArtwork.brand)}>
            <Artwork file={tenkiArtwork.brand.file} alt={tenkiArtwork.brand.alt} width={1920} height={1080} />
          </button>
          <figcaption>Picnic mockups exploring TENKI’s visual language beyond the app.</figcaption>
        </figure>
      </section>

      <section className={`${styles.chapter} ${styles.tryApp}`} id="prototype" aria-labelledby="prototype-heading">
        <div className={styles.tryCopy}>
          <h2 id="prototype-heading">See the idea in motion.</h2>
          <p>Follow the complete journey, from checking the forecast to exploring the map and planning an outing.</p>
          <a className={actions.primary} href={tenkiPrototype} target="_blank" rel="noreferrer">Try the app</a>
        </div>
        <div className={styles.tryMedia}><TenkiDemo /></div>
      </section>
    </div>
    {artwork && <TenkiArtworkDialog artwork={artwork} onClose={() => setArtwork(null)} />}
  </article>;
}
