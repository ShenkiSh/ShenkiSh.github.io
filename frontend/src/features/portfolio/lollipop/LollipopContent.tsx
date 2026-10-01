import { useState } from "react";
import { keepLastWordsTogether as wrap } from "@/shared/utils/keepLastWordsTogether";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { CaseVideo } from "../CaseVideo";
import { useExclusiveCaseMedia } from "../useExclusiveCaseMedia";
import { LollipopArtworkDialog } from "./LollipopArtworkDialog";
import { applications, brandWebsite, collections, hero, illustrations, lollipopAsset as media, type LollipopArtwork } from "./lollipopAssets";
import actions from "../CaseActions.module.scss";
import styles from "./LollipopContent.module.scss";

const chapters = [
  ["concept", "The idea"], ["collection", "Collection & campaign"],
  ["website", "Digital & motion"], ["extensions", "Brand applications"],
] as const;

function Artwork({ artwork, onEnlarge, priority = false, className = "" }: {
  artwork: LollipopArtwork; onEnlarge: (artwork: LollipopArtwork) => void; priority?: boolean; className?: string;
}) {
  return <button type="button" className={`${styles.artwork} ${className}`} onClick={() => onEnlarge(artwork)} aria-label={`Enlarge ${artwork.title}`}>
    <img src={media(artwork.file)} alt={artwork.alt} width={artwork.width} height={artwork.height}
      loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
  </button>;
}

export function LollipopContent() {
  useExclusiveCaseMedia();
  const [artwork, setArtwork] = useState<LollipopArtwork | null>(null);
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.identity}>
        <h1>Lollipop</h1>
        <p className={styles.subtitle}>Edible Fashion Brand Concept</p>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.hook}>{wrap("Candy nostalgia becomes a playful fashion brand for adults.")}</p>
        <p className={styles.role}>{wrap("I developed the concept, visual identity and illustrations, then brought the brand into campaign, motion and web design.")}</p>
        <div className={styles.actions}><a className={actions.primary} href={brandWebsite} target="_blank" rel="noopener noreferrer">Explore the brand website</a></div>
        <p className={styles.note}>Brand concept · Figma · Illustrator · After Effects</p>
      </div>
      <Artwork artwork={hero} onEnlarge={setArtwork} priority className={styles.heroArtwork} />
    </header>
    <CaseChapterNavigation label="Lollipop sections" chapters={chapters} showDivider={false} />

    <section id="concept" className={`${styles.container} ${styles.section}`} aria-labelledby="concept-heading">
      <div className={styles.introduction}>
        <h2 id="concept-heading">A candy memory, a new attitude.</h2>
        <p>{wrap("The brief began with one word: candy. I turned familiar sweets into an edible fashion brand for adults, pairing nostalgic colors and textures with confident, playful styling.")}</p>
      </div>
      <div className={styles.brandIdentity} id="identity">
        <figure>
          <div className={styles.logoStage}><img src={media("logo.webp")} alt="Lollipop pink logo with dripping candy lettering" width={650} height={380} loading="lazy" /></div>
          <ul className={styles.palette} aria-label="Lollipop brand color palette">
            <li className={styles.blue} aria-label="Candy blue, #29A6FF" /><li className={styles.pink} aria-label="Pink, #FF2FA3" /><li className={styles.purple} aria-label="Purple, #B247FF" /><li className={styles.green} aria-label="Green, #39C647" /><li className={styles.orange} aria-label="Orange, #FF7023" />
          </ul>
          <figcaption><h3>Soft shapes, vivid color</h3><p>{wrap("Dripping lettering and bright candy colors make the identity feel sweet and expressive.")}</p></figcaption>
        </figure>
        <div className={styles.typeSamples}>
          <h3>A playful voice</h3>
          <figure><img src={media("chewy-specimen.webp")} alt="Taste, Bite, Love in Chewy" width={374} height={50} loading="lazy" /><figcaption>Chewy Regular</figcaption></figure>
          <figure><img src={media("fredoka-specimen.webp")} alt="Sweet. Playful. Bold. in Fredoka" width={540} height={55} loading="lazy" /><figcaption>Fredoka</figcaption></figure>
        </div>
      </div>
      <figure className={styles.illustrations} id="world">
        <Artwork artwork={illustrations} onEnlarge={setArtwork} className={styles.flowerPreview} />
        <figcaption><h3>Drawn into the brand</h3><p>{wrap("My hand-drawn flowers, candy drips and playful outlines connect the campaign images, packaging and website.")}</p></figcaption>
      </figure>
    </section>

    <section id="collection" className={`${styles.container} ${styles.section}`} aria-labelledby="collection-heading">
      <div className={styles.introduction}>
        <h2 id="collection-heading">From candy to campaign.</h2>
        <p>{wrap("Three candy families become fashion concepts, each paired with its campaign poster. Select an image to see the details.")}</p>
      </div>
      <div className={styles.collectionGrid}>
        {collections.map((collection, index) => <div className={styles.collection} key={collection.title}>
          <h3>{collection.title}</h3>
          <div className={styles.pair}>
            <figure><Artwork artwork={collection.product} onEnlarge={setArtwork} /><figcaption>Fashion concept</figcaption></figure>
            <figure id={index === 0 ? "posters" : undefined}><Artwork artwork={collection.poster} onEnlarge={setArtwork} /><figcaption>Campaign poster</figcaption></figure>
          </div>
        </div>)}
      </div>
    </section>

    <section id="website" className={`${styles.container} ${styles.section}`} aria-labelledby="website-heading">
      <div className={styles.introduction}>
        <h2 id="website-heading">On the website and in motion.</h2>
        <p>{wrap("The collection moves into a branded website and a short campaign reel, carrying the same colors, illustrations and playful voice.")}</p>
      </div>
      <div className={styles.digital}>
        <div className={styles.website}>
          <h3>Brand website</h3>
          <CaseVideo film={{ src: media("website-walkthrough.mp4"), poster: media("website-hero.jpg"), title: "Lollipop — Website walkthrough", duration: "0:31" }} aspectRatio="1442 / 914" posterLabel="Watch the website" />
          <p className={styles.caption}>{wrap("The complete website walkthrough, from the brand introduction to the collection and campaign imagery.")}</p>
          <a className={actions.secondary} href={brandWebsite} target="_blank" rel="noopener noreferrer">Open the website prototype</a>
        </div>
        <section className={styles.social} id="social" aria-labelledby="social-heading">
          <h3 id="social-heading">Social Campaign</h3>
          <CaseVideo film={{ src: media("social-reel.mp4"), poster: media("social-poster.jpg"), title: "Lollipop — Social campaign", duration: "0:19" }} aspectRatio="9 / 16" defaultMuted={false} posterLabel="Watch the reel" />
          <p className={styles.caption}>{wrap("An After Effects reel invites viewers to pause the changing looks and discover their wearable candy.")}</p>
        </section>
      </div>
    </section>

    <section id="extensions" className={`${styles.container} ${styles.section}`} aria-labelledby="extensions-heading">
      <div className={styles.introduction}>
        <h2 id="extensions-heading">The identity beyond the campaign.</h2>
        <p>{wrap("The same illustration system carries onto a shopping bag, body product and candle packaging.")}</p>
      </div>
      <div className={styles.applications}>
        {applications.map((application, index) => <figure key={application.file} className={index === 2 ? styles.secondaryApplication : undefined}>
          <div className={styles.applicationFrame}><Artwork artwork={application} onEnlarge={setArtwork} /></div>
          <figcaption>{application.title}</figcaption>
        </figure>)}
      </div>
      <div className={styles.credits}>
        <h3>Created by me</h3>
        <p>{wrap("Brand concept, art direction, visual identity, illustrations, campaign design, motion and digital experience.")}</p>
        <p className={styles.note}>AI-assisted tools were used for character generation and fashion visualization.</p>
      </div>
    </section>
    {artwork && <LollipopArtworkDialog artwork={artwork} onClose={() => setArtwork(null)} />}
  </article>;
}
