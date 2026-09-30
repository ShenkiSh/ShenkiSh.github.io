import { asset } from "@/shared/utils/asset";
import { CaseChapterNavigation } from "../CaseChapterNavigation";
import { CaseVideo } from "../CaseVideo";
import styles from "./LollipopContent.module.scss";

const media = (file: string) => asset(`assets/lollipop/${file}`);
const brandWebsite = "https://www.figma.com/proto/oB8PHtagAffUtn4ixBkZxe/%D7%9E%D7%99%D7%AA%D7%95%D7%92--%D7%AA%D7%A8%D7%92%D7%99%D7%9C-2?page-id=400%3A105&node-id=401-106&viewport=333%2C175%2C0.22&t=SWVxK5WJvEwhJizx-1&scaling=min-zoom&content-scaling=fixed";
const chapters = [
  ["concept", "Concept"], ["world", "World"], ["identity", "Identity"],
  ["collection", "Collection"], ["posters", "Posters"], ["extensions", "Extensions"],
  ["website", "Website"], ["social", "Social"],
] as const;
const products = [
  { file: "product-gummy.webp", title: "Gummy snakes", alt: "A bikini made of colorful gummy snakes on a hanger above a pink plinth" },
  { file: "product-sour.webp", title: "Sour belts", alt: "Hands holding a bikini made of rainbow sour candy belts" },
  { file: "product-marshmallow.webp", title: "Marshmallow twists", alt: "A pastel marshmallow bikini draped over a wooden chair" },
] as const;
const extensions = [
  { file: "extension-bag.webp", title: "Shopping bag", alt: "Lollipop shopping bag covered with colorful hand-drawn flowers" },
  { file: "extension-body.webp", title: "Body product", alt: "Lollipop body product with a blue floral label and black pump" },
  { file: "extension-candle.webp", title: "Candle packaging", alt: "Lollipop candle packaging with the brand's bright floral illustrations" },
] as const;

function Artwork({ file, alt, width = 1024, height = 1536, className = "" }: { file: string; alt: string; width?: number; height?: number; className?: string }) {
  return <img className={`${styles.artwork} ${className}`} src={media(file)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
}

export function LollipopContent() {
  return <article className={styles.page}>
    <header className={`${styles.container} ${styles.hero}`}>
      <div className={styles.introduction}>
        <h1>Lollipop</h1>
        <p className={styles.subtitle}>Edible Fashion Brand Concept</p>
        <p className={styles.intro}>An adult brand concept that transforms nostalgic candy memories into playful edible fashion experiences.</p>
      </div>
      <div className={styles.content}>
        <img className={styles.heroArtwork} src={media("hero.webp")} alt="Lollipop campaign: pink lettering, illustrated clouds and a model wearing a colorful candy bikini" width={1680} height={945} fetchPriority="high" />
        <dl className={styles.credits}>
          <div><dt>MY CONTRIBUTION</dt><dd>Brand Concept · Art Direction · Visual Identity · Illustration<br />Campaign Design · Digital Experience</dd></div>
          <div><dt>TOOLS</dt><dd>Figma · Illustrator · After Effects</dd></div>
        </dl>
        <p className={styles.note}>AI-assisted character generation and fashion visualization.</p>
      </div>
    </header>
    <CaseChapterNavigation label="Lollipop sections" chapters={chapters} />

    <section id="concept" className={`${styles.container} ${styles.section}`} aria-labelledby="concept-heading">
      <div className={styles.copy}>
        <h2 id="concept-heading">From Candy to Brand</h2>
        <p>The brief was to transform the word ‘candy’ into a complete brand identity. I chose to reinterpret candy through an adult perspective, creating edible fashion inspired by the nostalgic sweets we grew up with.</p>
        <p className={styles.statement}>Lollipop was created to explore the space between childhood nostalgia and adult sensuality. A brand for adults inspired by the world of children, unafraid to be both sweet and tempting.</p>
      </div>
      <p className={styles.equation} aria-label="Childhood nostalgia plus adult sensuality creates an edible fashion brand">
        <span>CHILDHOOD NOSTALGIA</span><span className={styles.operator} aria-hidden="true">+</span>
        <span>ADULT SENSUALITY</span><span className={styles.operator} aria-hidden="true">↓</span>
        <span className={styles.result}>EDIBLE FASHION BRAND</span>
      </p>
    </section>

    <section id="world" className={`${styles.container} ${styles.section}`} aria-labelledby="world-heading">
      <div className={styles.copy}>
        <h2 id="world-heading">The Lollipop World</h2>
        <p>Lollipop combines familiar childhood memories with an adult playful fantasy, creating a world that feels nostalgic, confident and unexpected.</p>
      </div>
      <div className={styles.content}>
        <p className={styles.values}>SWEET <span>+</span> PLAYFUL <span>+</span> BOLD <span>+</span> SENSUAL</p>
        <div className={styles.threeColumns}>
          <figure><div className={`${styles.worldCrop} ${styles.flowers}`}><Artwork file="world-flowers.webp" alt="Hand-drawn Lollipop flowers in bright pink, green, orange and purple" width={1197} height={1661} /></div><figcaption>Hand-drawn flowers</figcaption></figure>
          <figure><div className={`${styles.worldCrop} ${styles.drips}`}><Artwork file="poster-gummy.webp" alt="Pink dripping candy and white stars against a blue sky" width={2480} height={3508} /></div><figcaption>Dripping candy &amp; stars</figcaption></figure>
          <figure><div className={`${styles.worldCrop} ${styles.attitude}`}><Artwork file="poster-marshmallow.webp" alt="White illustrated outlines around the campaign model and colorful candy styling" width={867} height={1246} /></div><figcaption>Playful outlines &amp; confident styling</figcaption></figure>
        </div>
      </div>
    </section>

    <section id="identity" className={`${styles.container} ${styles.section}`} aria-labelledby="identity-heading">
      <div className={styles.copy}>
        <h2 id="identity-heading">Visual Identity</h2>
        <p>Hand-drawn flowers, candy textures, dripping forms and playful outlines bring the identity to life.</p>
      </div>
      <div className={styles.content}>
        <div className={styles.identity}>
          <div className={styles.copy}><p className={styles.label}>THE LOGO</p><Artwork className={styles.logo} file="logo.webp" alt="Lollipop pink handwritten logo with dripping candy lettering" width={650} height={380} /></div>
          <div className={styles.typography}>
            <p className={styles.label}>TYPOGRAPHY</p>
            <figure><Artwork className={styles.chewy} file="chewy-specimen.webp" alt="Taste, Bite, Love — Chewy type specimen" width={374} height={50} /><figcaption>Chewy Regular</figcaption></figure>
            <figure><Artwork className={styles.fredoka} file="fredoka-specimen.webp" alt="Sweet. Playful. Bold. — Fredoka type specimen" width={540} height={55} /><figcaption>Fredoka</figcaption></figure>
          </div>
        </div>
        <ul className={styles.palette} aria-label="Lollipop brand color palette">
          <li className={styles.blue} aria-label="Candy blue, #29A6FF" /><li className={styles.pink} aria-label="Pink, #FF2FA3" /><li className={styles.purple} aria-label="Purple, #B247FF" /><li className={styles.green} aria-label="Green, #39C647" /><li className={styles.orange} aria-label="Orange, #FF7023" />
        </ul>
      </div>
    </section>

    <section id="collection" className={`${styles.container} ${styles.section}`} aria-labelledby="collection-heading">
      <div className={styles.copy}>
        <h2 id="collection-heading">Edible Fashion Collection</h2>
        <p>Each piece translates a familiar candy memory into a wearable and edible experience.</p>
        <p className={styles.flow}>CANDY MEMORY <span aria-hidden="true">→</span> FASHION PIECE <span aria-hidden="true">→</span> BRAND EXPERIENCE</p>
      </div>
      <div className={`${styles.threeColumns} ${styles.products}`}>
        {products.map(product => <figure key={product.file}><Artwork {...product} /><figcaption>{product.title}</figcaption></figure>)}
      </div>
    </section>

    <section id="posters" className={`${styles.container} ${styles.section}`} aria-labelledby="posters-heading">
      <div className={styles.copy}>
        <h2 id="posters-heading">Campaign Posters</h2>
        <p>A campaign series introducing Lollipop through a playful mix of sweetness, nostalgia and adult confidence.</p>
      </div>
      <div className={styles.threeColumns}>
        <Artwork file="poster-marshmallow.webp" alt="Marshmallow collection campaign poster with candy fashion and hand-drawn flowers" width={867} height={1246} />
        <Artwork file="poster-sour.webp" alt="Sour belts collection campaign poster in the colorful Lollipop world" width={2480} height={3508} />
        <Artwork file="poster-gummy.webp" alt="Gummy snakes collection campaign poster with pink candy drips and a blue sky" width={2480} height={3508} />
      </div>
    </section>

    <section id="extensions" className={`${styles.container} ${styles.section}`} aria-labelledby="extensions-heading">
      <div className={styles.copy}><h2 id="extensions-heading">Brand Extensions</h2></div>
      <div className={`${styles.threeColumns} ${styles.products}`}>
        {extensions.map(extension => <figure key={extension.file}><Artwork {...extension} /><figcaption>{extension.title}</figcaption></figure>)}
      </div>
    </section>

    <section id="website" className={`${styles.container} ${styles.section}`} aria-labelledby="website-heading">
      <div className={styles.copy}>
        <h2 id="website-heading">Brand Website</h2>
        <p>The landing page expands the Lollipop world digitally, presenting the collection, visual language and brand story.</p>
        <a className={styles.websiteLink} href={brandWebsite} target="_blank" rel="noopener noreferrer">Explore the brand website <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.content}>
        <figure className={styles.websiteHero}><Artwork file="website-hero.jpg" alt="The Lollipop landing page introducing edible clothes for adults with pink navigation and campaign artwork" width={1442} height={914} /><figcaption>Landing page · Brand introduction</figcaption></figure>
        <div className={styles.twoColumns}>
          <figure><Artwork file="website-collection.jpg" alt="Lollipop website collection with the three candy fashion pieces" width={1442} height={914} /><figcaption>Discover the collection</figcaption></figure>
          <figure><Artwork file="website-campaign.jpg" alt="Lollipop campaign artwork presented within the shopping website" width={1442} height={914} /><figcaption>Campaign imagery across the shopping experience</figcaption></figure>
        </div>
      </div>
    </section>

    <section id="social" className={`${styles.container} ${styles.section}`} aria-labelledby="social-heading">
      <div className={styles.copy}>
        <h2 id="social-heading">Social Campaign</h2>
        <p>A playful social interaction where the user holds the screen to stop the moving collection and discover their selected look.</p>
        <p className={styles.caption}>After Effects · Motion Design</p>
      </div>
      <figure className={styles.socialReel}>
        <CaseVideo film={{ src: media("social-reel.mp4"), poster: media("social-poster.jpg"), title: "Lollipop — Social campaign", duration: "0:19" }} aspectRatio="9 / 16" defaultMuted={false} />
        <figcaption>Instagram campaign reel · After Effects</figcaption>
      </figure>
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.production}`} aria-labelledby="production-heading">
      <div className={styles.copy}><h2 id="production-heading">Production</h2></div>
      <p>AI-assisted tools were used for character generation and fashion visualization. Brand concept, art direction, visual identity, illustrations, campaign design and digital experience were created by me.</p>
    </section>
  </article>;
}
