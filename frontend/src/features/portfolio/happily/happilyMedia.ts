import { asset } from "@/shared/utils/asset";
import type { CaseFilm } from "../CaseVideo";
export const happilyAsset = (name: string): string => asset(`assets/happily/${name}`);
export const personalSpaceMedia = {
  gameplay: "unity-space-gameplay.png",
  summary: "unity-space-summary.png",
} as const;
export const projectOverviewFilm: CaseFilm = {
  src: asset("assets/videos/we-live-happily-here-full.mp4"),
  poster: asset("assets/images/we-live-happily-here-full-poster.jpg"),
  title: "How We Live Happily Here works", duration: "0:20",
};
export const appFlowFilm: CaseFilm = {
  src: happilyAsset("app-full-flow.mp4"), poster: happilyAsset("app-full-flow.jpg"),
  title: "We Live Happily Here — Full App Flow", duration: "4:24",
};
export interface FamilyGame {
  id: string; title: string; description: string; href: string; controls: string;
  recording: CaseFilm;
}
export const unityGames: readonly FamilyGame[] = [
  {
    id: "unity-game-01", title: "Personal Space", description: "Guide the shared vehicle through the swamp.",
    href: asset("games/happily/index.html?game=personal-space"), controls: "← → to steer · Touch arrows or phone tilt",
    recording: { src: happilyAsset("personal-space-recording.mp4"), poster: happilyAsset("personal-space-recording.jpg"), title: "Personal Space — Gameplay Recording", duration: "2:33" },
  },
  {
    id: "unity-game-02", title: "Objects", description: "Jump, collect your pinecones and finish with your simulated partner.",
    href: asset("games/happily/index.html?game=objects"), controls: "← → to move · Space to jump · Touch controls",
    recording: { src: happilyAsset("objects-recording.mp4"), poster: happilyAsset("objects-recording.jpg"), title: "Objects — Gameplay Recording", duration: "2:11" },
  },
];
export const appPrototype = "https://www.figma.com/proto/NNjB6Gey6DtLbO1ZzQV51g/Portfolio?page-id=1457-5110&node-id=1457-6048&starting-point-node-id=1457-6048&scaling=scale-down&content-scaling=fixed";
export const chapters = [
  ["overview", "Overview"], ["how-it-works", "How it works"], ["conflicts", "Conflicts"],
  ["cooperation", "Cooperation"], ["try-it", "Try it"], ["game-ui", "Game UI"],
] as const;
export const conflicts = [
  ["Personal Space", personalSpaceMedia.gameplay, "“Get out of my room.” / “That’s my side.”"],
  ["Objects", "conflict-objects.png", "“You took my toy, clothes or food.”"],
  ["Fairness", "fairness-cauldron.png", "“I do more.” / “You get more.”"],
  ["Hurt", "hurt-bridge.png", "Insults, teasing and embarrassment."],
  ["Competition", "competition-roots.png", "“I’m better.” / “I go first.”"],
] as const;
export const systemSteps = [
  "Identify a conflict", "Select the children", "Choose the conflict type", "Send a game invitation",
  "Join the same game", "Play three short stages", "See the shared summary", "Update the parent",
] as const;
