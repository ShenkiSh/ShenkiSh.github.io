import { asset } from "@/shared/utils/asset";

export const numiAsset = (file: string): string => asset(`assets/numi/${file}`);

export interface NumiFilm {
  id: string;
  title: string;
  duration: string;
  poster: string;
}

export const films = {
  trailer: { id: "trailer", title: "NUMI — Gameplay Trailer", duration: "0:48", poster: "trailer.jpg" },
  childhood: { id: "childhood-full", title: "Childhood — Story & Full Playthrough", duration: "7:33", poster: "imgNumiChildhoodPlayableEntryPoster.png" },
  explore: { id: "level-explore", title: "Explore the space", duration: "0:11", poster: "level-orient.jpg" },
  collapse: { id: "bridge-collapse", title: "The collapsing hand bridge", duration: "0:11", poster: "bridge-collapse.jpg" },
  wheel: { id: "level-wheel", title: "Roll the wheel into place", duration: "0:11", poster: "level-wheel.jpg" },
  combine: { id: "level-combine", title: "Combine movement and objects", duration: "0:12", poster: "level-combine.jpg" },
  crossing: { id: "safe-crossing", title: "A safe crossing", duration: "0:11", poster: "safe-crossing.jpg" },
  resize: { id: "resize", title: "Resize", duration: "0:16", poster: "resize.jpg" },
  move: { id: "move", title: "Grab & Move", duration: "0:16", poster: "move.jpg" },
  rotate: { id: "rotate", title: "Rotate", duration: "0:16", poster: "rotate.jpg" },
  before: { id: "icons-before", title: "Before — simultaneous controller prompts", duration: "0:13", poster: "icons-before.jpg" },
  after: { id: "icons-after", title: "After — one prompt at a time", duration: "0:11", poster: "icons-after.jpg" },
} satisfies Record<string, NumiFilm>;

export const memories = [
  { name: "Childhood", description: "Age 5. Movement and object manipulation introduce a search for stability and safety in an increasingly unstable environment." },
  { name: "Teenage Years", description: "Restricted routes and contextual interactions make boundaries and personal space tangible." },
  { name: "Twenties", description: "Platforms and water shift the experience toward support and protection." },
  { name: "Motherhood", description: "Domestic objects become traversal paths and puzzles, expressing care and love through the environment." },
  { name: "Seventies", description: "Age 70. Exploration and memory collection express a fragmented sense of identity." },
];

export const narrative = [
  ["story-family.png", "Family Evening"],
  ["story-interaction.png", "Small Interaction"],
  ["story-trigger-father-touch.png", "Memory Trigger", "A father’s hand on his young daughter’s shoulder beside her bicycle — the memory trigger"],
  ["memory-1.jpg", "Playable Memory"],
  ["story-return.png", "Return to the Present"],
] as const;
