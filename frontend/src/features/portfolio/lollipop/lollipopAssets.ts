import { asset } from "@/shared/utils/asset";

export const lollipopAsset = (file: string) => asset(`assets/lollipop/${file}`);
export const brandWebsite = "https://www.figma.com/proto/oB8PHtagAffUtn4ixBkZxe/%D7%9E%D7%99%D7%AA%D7%95%D7%92--%D7%AA%D7%A8%D7%92%D7%99%D7%9C-2?page-id=400%3A105&node-id=401-106&viewport=333%2C175%2C0.22&t=SWVxK5WJvEwhJizx-1&scaling=min-zoom&content-scaling=fixed";

export interface LollipopArtwork {
  file: string;
  title: string;
  alt: string;
  width: number;
  height: number;
}

export const hero: LollipopArtwork = {
  file: "hero.webp", title: "Lollipop campaign", width: 1680, height: 945,
  alt: "Lollipop campaign: pink lettering, illustrated clouds and a model wearing a colorful candy bikini",
};
export const illustrations: LollipopArtwork = {
  file: "world-flowers.webp", title: "Lollipop illustrations", width: 1197, height: 1661,
  alt: "Original Lollipop illustration sheet with colorful flowers, dripping candy and logo details",
};
export const collections: { title: string; product: LollipopArtwork; poster: LollipopArtwork }[] = [
  {
    title: "Gummy snakes",
    product: { file: "product-gummy.webp", title: "Gummy snakes fashion concept", alt: "A bikini made of colorful gummy snakes on a hanger above a pink plinth", width: 1024, height: 1536 },
    poster: { file: "poster-gummy.webp", title: "Gummy snakes campaign poster", alt: "Gummy snakes campaign with pink candy drips, hand-drawn flowers and a blue sky", width: 2480, height: 3508 },
  },
  {
    title: "Sour belts",
    product: { file: "product-sour.webp", title: "Sour belts fashion concept", alt: "Hands holding a bikini made of rainbow sour candy belts", width: 1024, height: 1536 },
    poster: { file: "poster-sour.webp", title: "Sour belts campaign poster", alt: "Sour belts fashion campaign with bright stripes, flowers and playful outlines", width: 2480, height: 3508 },
  },
  {
    title: "Marshmallow twists",
    product: { file: "product-marshmallow.webp", title: "Marshmallow twists fashion concept", alt: "A pastel marshmallow bikini draped over a wooden chair", width: 1024, height: 1536 },
    poster: { file: "poster-marshmallow.webp", title: "Marshmallow twists campaign poster", alt: "Marshmallow fashion campaign with hand-drawn flowers and pastel candy twists", width: 867, height: 1246 },
  },
];
export const applications: LollipopArtwork[] = [
  { file: "extension-bag.webp", title: "Shopping bag", alt: "Lollipop shopping bag covered with colorful hand-drawn flowers", width: 1044, height: 1557 },
  { file: "extension-body.webp", title: "Body product", alt: "Lollipop body product with a blue floral label and black pump", width: 1041, height: 1561 },
  { file: "extension-candle.webp", title: "Candle packaging", alt: "Lollipop candle and lid with bright floral illustrations", width: 1035, height: 1558 },
];
