import { asset } from "@/shared/utils/asset";

export const tenkiAsset = (file: string): string => asset(`assets/tenki/${file}`);

export interface TenkiArtwork { file: string; title: string; alt: string; width: number; height: number }
export const tenkiArtwork = {
  hero: { file: "seasonal-app-mockup.jpg", title: "TENKI seasonal app", alt: "TENKI’s weather app on a phone surrounded by cherry blossoms and pink picnic objects", width: 1920, height: 1080 },
  brand: { file: "brand-applications.jpg", title: "TENKI beyond the screen", alt: "TENKI’s geometric identity applied to chopsticks, a picnic box and the seasonal weather app", width: 1920, height: 1080 },
} satisfies Record<string, TenkiArtwork>;

export const tenkiPrototype = "https://www.figma.com/proto/NNjB6Gey6DtLbO1ZzQV51g/Portfolio?page-id=545%3A468&node-id=1333-30894&scaling=scale-down&starting-point-node-id=1333%3A30894";
export const tenkiMapPrototype = "https://www.figma.com/proto/NNjB6Gey6DtLbO1ZzQV51g/Portfolio?page-id=545%3A468&node-id=1333-38247&scaling=scale-down&starting-point-node-id=1333%3A38247";

export const tenkiScreens = [
  ["screen-1.png", "Check weather", "TENKI home screen with custom temperature numerals and a Sakura illustration"],
  ["screen-2.png", "Choose a day", "TENKI weekly forecast with the selected day highlighted"],
  ["screen-3.png", "Discover seasonal locations", "The weather forecast connected to a map of seasonal activities"],
  ["screen-4.png", "Select a location", "TENKI illustrated map with park location pins"],
  ["screen-5.png", "Plan the outing", "A walking route and picnic suggestions in TENKI"],
] as const;
