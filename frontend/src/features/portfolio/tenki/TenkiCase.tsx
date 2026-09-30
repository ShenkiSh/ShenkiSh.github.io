import type { ReactNode } from "react";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { keepLastWordsTogether as wrap } from "@/shared/utils/keepLastWordsTogether";
import { tenkiAsset, tenkiPrototype, tenkiScreens } from "./tenkiAssets";
import { TenkiDemo } from "./TenkiDemo";
import { TenkiMap } from "./TenkiMap";
import styles from "./TenkiCase.module.scss";
import actions from "../CaseActions.module.scss";

const chapters = [
  ["artist", "Research"], ["concept", "Concept"], ["product-flow", "User Flow"],
  ["translation", "Visual Design"], ["final-interface", "Final UI"],
  ["graphic-language", "Graphic Language"], ["prototype", "Map"],
] as const;

function Section({ id, title, copy, children }: { id: string; title: string; copy?: string; children: ReactNode }) {
  return <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
    <div className={styles.copy}><h2 id={`${id}-heading`}>{wrap(title)}</h2>{copy && <p>{wrap(copy)}</p>}</div>
    <div className={styles.content}>{children}</div>
  </section>;
}

function Artwork({ file, alt, className = "", width, height }: { file: string; alt: string; className?: string; width: number; height: number }) {
  return <img className={className} src={tenkiAsset(file)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
}

export function TenkiCase() {
  return <article className={styles.page}>
    <div className={styles.container}>
      <header className={styles.hero} aria-label="TENKI introduction">
        <div className={styles.heroGrid}>
          <div className={styles.identity}>
            <h1>TENKI</h1>
            <p className={styles.introduction}>Weather shaped by Japanese seasonal&nbsp;culture.</p>
            <a className={actions.primary} href={tenkiPrototype} target="_blank" rel="noreferrer">Try the app <span aria-hidden="true">→</span></a>
            <p className={styles.small}>Concept · Visual Design ·&nbsp;UI</p>
          </div>
          <div className={styles.heroMedia}><TenkiDemo /></div>
        </div>
      </header>
    </div>
    <CaseChapterNavigation label="TENKI sections" chapters={chapters} />
    <div className={styles.container}>
      <section className={styles.section} id="artist" aria-labelledby="artist-heading">
        <div className={styles.copy}>
          <h2 id="artist-heading">From Artist to&nbsp;Concept</h2>
          <p>The brief was to choose an artist, study their work, and translate that research into a digital&nbsp;product.</p>
          <p>I chose Ikko Tanaka because I was drawn to the way his work balanced a modern graphic language with Japanese cultural&nbsp;references.</p>
        </div>
        <div className={styles.research}>
          <div className={styles.references}>
            <figure><Artwork file="nihon-buyo.png" alt="Ikko Tanaka’s Nihon Buyo poster" width={756} height={528} /><figcaption>Nihon Buyo ·&nbsp;1981</figcaption></figure>
            <figure><Artwork file="botanical-garden.png" alt="Ikko Tanaka’s Botanical Garden poster" width={756} height={528} /><figcaption>Botanical Garden ·&nbsp;1990</figcaption></figure>
          </div>
          <p className={styles.equation}><span>Modern graphic&nbsp;language</span><span aria-hidden="true">+</span><span>Japanese&nbsp;culture</span><span aria-hidden="true">→</span><span>A modern weather&nbsp;app</span></p>
          <p className={styles.credit}>© Ikko Tanaka · References: National Museum of Art,&nbsp;Osaka</p>
        </div>
      </section>

      <Section id="seasons" title="Discovering Japan’s Seasonal Calendar">
        <div className={styles.seasons}>
          <p className={styles.label}>24 seasonal periods</p>
          <div className={styles.seasonMarkers} aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} data-spring={i < 6} />)}</div>
          <div className={styles.seasonLabels}>{["Spring · Sakura", "Summer", "Autumn", "Winter"].map(label => <span key={label}>{wrap(label)}</span>)}</div>
          <p>Japan’s 24 seasonal periods became the cultural foundation of the&nbsp;app.</p>
        </div>
      </Section>

      <Section id="concept" title="Weather Meets Seasonal Culture" copy="Instead of showing weather as isolated information, the app connects the forecast to the current seasonal moment and suggests relevant experiences.">
        <div className={styles.concept}>
          <p className={styles.equation}><span>Weather</span><span aria-hidden="true">+</span><span>Current&nbsp;season</span><span aria-hidden="true">+</span><span>Seasonal&nbsp;activity</span><span aria-hidden="true">=</span><span>Weather shaped by seasonal&nbsp;culture</span></p>
          <div className={styles.conceptIcons}>{[
            ["sun.svg", "Today’s weather"], ["sakura.svg", "Sakura season"], ["location-icon.svg", "Viewing location"], ["picnic-icon.png", "Plan a picnic"],
          ].map(([file, label]) => <div key={file}><Artwork file={file!} alt="" width={64} height={64} /><span>{wrap(label!)}</span></div>)}</div>
        </div>
      </Section>

      <section className={styles.section} id="product-flow" aria-labelledby="flow-heading">
        <div className={styles.copy}><h2 id="flow-heading">From Forecast to&nbsp;Outing</h2></div>
        <ol className={styles.flow}>{tenkiScreens.map(([file, label, alt], i) => <li key={file}>
          <figure><Artwork className={styles.screen} file={file} alt={alt} width={825} height={1836} /><figcaption>0{i + 1} · {wrap(label)}</figcaption></figure>
        </li>)}</ol>
      </section>

      <Section id="translation" title="Translating Ikko Tanaka Into a Digital System" copy="One visual language, translated into weather, maps and navigation.">
        <div className={styles.principles}>
          <div><h3>Bold Geometry</h3><div className={`${styles.principleArt} ${styles.comparison}`}><Artwork file="nihon-buyo.png" alt="Tanaka’s geometric poster" width={756} height={528} /><Artwork file="sun.svg" alt="TENKI’s geometric sun symbol" width={243} height={244} /></div><p>{wrap("Circular geometry becomes the main weather symbol.")}</p></div>
          <div><h3>Strong Color&nbsp;Contrast</h3><div className={styles.principleArt}><Artwork file="map-art.png" alt="TENKI’s complete illustrated map, organized into contrasting color fields" width={1771} height={1183} /></div><p>{wrap("Color fields distinguish areas across the illustrated map.")}</p></div>
          <div><h3>Graphic Shapes</h3><div className={styles.principleArt}><Artwork file="navigation-icons.svg" alt="Custom location, home and calendar icons" width={480} height={115} /></div><p>{wrap("Simple geometric forms create recognizable navigation.")}</p></div>
        </div>
      </Section>

      <Section id="final-interface" title="Final Interface">
        <div className={styles.finalScreens}>{tenkiScreens.slice(0, 3).map(([file, , alt], i) => <figure key={file}>
          <Artwork className={styles.screen} file={file} alt={alt} width={825} height={1836} /><figcaption>{["Today / Home", "Weekly Forecast", "Location / Map"][i]}</figcaption>
        </figure>)}</div>
      </Section>

      <Section id="graphic-language" title="A Custom Graphic Language" copy="Custom numerals and icons, designed for TENKI.">
        <div className={styles.graphicLanguage}>
          <div className={styles.numerals}><p className={styles.label}>Custom numerals</p><Artwork className={styles.leadNumeral} file="numeral-25.svg" alt="Custom geometric 25-degree numeral" width={296} height={191} />
            <div className={styles.numeralPair}><Artwork file="numeral-29.svg" alt="Custom 29-degree numeral" width={216} height={143} /><Artwork file="numeral-24.svg" alt="Custom 24-degree numeral" width={216} height={140} /></div>
          </div>
          <div className={styles.iconSystem}><p className={styles.label}>Custom icons</p><Artwork className={styles.navigationIcons} file="navigation-icons.svg" alt="TENKI’s original location, home and calendar icons" width={480} height={115} /><p className={styles.label}>In the interface</p><Artwork file="forecast-row.svg" alt="A complete forecast row combining custom numerals, a sun icon and the selected date" width={528} height={225} /></div>
        </div>
      </Section>

      <section className={styles.section} id="prototype" aria-labelledby="prototype-heading">
        <div className={styles.copy}><h2 id="prototype-heading">Explore the&nbsp;Map</h2><p>Drag to explore seasonal locations. Open the prototype to plan an&nbsp;outing.</p></div>
        <div className={styles.prototype}><TenkiMap /></div>
      </section>

    </div>
  </article>;
}
