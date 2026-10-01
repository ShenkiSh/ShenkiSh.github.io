export const hopChapters = [
  ["gameplay", "Gameplay"], ["onboarding", "Learning the game"],
  ["art", "Art & iteration"], ["watch", "Play & watch"],
] as const;

export const hopImages = {
  rebuilt: "Robert on the worktable beside a strainer shelter, with three hearts, the chef's hands, an attack warning and a banana peel",
  swamp: "Robert and his frog family relaxing among water lilies in the swamp",
  captured: "The chef catches Robert in a net and carries him away from the swamp",
  cage: "Robert unlocks his cage with his tongue while the chef faces away",
  escape: "Robert leaps out of the cage as the chef reaches toward him",
  tutorial: "Interactive movement practice with keyboard instructions and a safe route across the table",
  warning: "The tutorial shows a warning marker before the chef's gloved hand strikes",
  cover: "Robert remains visible through a transparent strainer in the hiding tutorial",
  steam: "A steam jet bursts across Robert's route through the kitchen",
  destruction: "Broken plates scatter across the worktable after the chef's attack",
  towel: "Robert escapes down the towel hanging from the edge of the table",
  hand: "The chef's gloved hand strikes a stack of plates while Robert dodges beside a pot",
  reaction: "Robert moves away from the chef's hand as it reaches across the kitchen",
  soup: "Spilled soup creates another obstacle on the wooden worktable",
  banana: "Robert slips beside a banana peel between the kitchen pots",
  knife: "A falling knife threatens Robert on the worktable",
  bottle: "A rolling wine bottle approaches Robert along its marked path",
  gaspard: "Gaspard gives Robert a short warning beside a hiding place",
  defeat: "The illustrated failure screen offers another attempt or a return to the menu",
  prompt: "The interactive tutorial explains how to press E to use the hanging towel",
  drawing: "Shani's original illustration of Robert's family in the swamp",
  refined: "The refined swamp illustration preserves the original frogs, lily pads and parasol",
  old: "Robert and Gaspard in the original kitchen, with the green health bar, potion inventory and food obstacles clearly visible",
} as const;
export type HopImageName = keyof typeof hopImages;
export interface HopCard {
  image: HopImageName;
  title: string;
  copy?: string;
}

export const storyCards: readonly HopCard[] = [
  { image: "swamp", title: "Life in the swamp" }, { image: "captured", title: "Taken to the kitchen" },
  { image: "cage", title: "A way out of the cage" }, { image: "escape", title: "The chase begins" },
];

export const chaseMoments = [
  { id: "chef", file: "warning-demo", title: "A warning before the strike", videoTitle: "Hop warning and attack", duration: "0:08",
    copy: "I signal the chef’s next strike so the player has time to react." },
  { id: "destruction", file: "destruction-demo", title: "A threat that changes the route", videoTitle: "Hop changing the route", duration: "0:10",
    copy: "The chef’s attack breaks plates and opens a route, making the threat part of the level design." },
  { id: "safety", file: "shelter-demo", title: "A pause inside the chase", videoTitle: "Hop shelter and recovery", duration: "0:08",
    copy: "Each new strainer saves progress and refills hearts. Transparent cover keeps Robert visible while the player recovers." },
] as const;
