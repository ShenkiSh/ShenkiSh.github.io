export const hopChapters = [
  ["story", "Story"], ["gameplay", "Gameplay"], ["level-design", "Level design"],
  ["onboarding", "Onboarding"], ["art", "Art & iteration"], ["watch", "Watch gameplay"],
] as const;

export const hopImages = {
  hero: "Robert on the kitchen worktable beside his open cage, Gaspard, cookware and a three-heart health display",
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
  old: "The earlier kitchen game with its original health bar, food obstacles and chef attack",
  unity: "The actual Unity project showing story, subtitle and audio tracks in Timeline",
} as const;
export type HopImageName = keyof typeof hopImages;
export interface HopCard {
  image: HopImageName;
  title: string;
  copy?: string;
}

export const storyCards: readonly HopCard[] = [
  { image: "swamp", title: "01 / Swamp" }, { image: "captured", title: "02 / Captured" },
  { image: "cage", title: "03 / Cage" }, { image: "escape", title: "04 / Escape" },
];
export const coreLoop = ["Move Forward", "Read the Warning", "Dodge the Hazard", "Find Cover", "Reach a Checkpoint", "Keep Moving"] as const;
export const levelStages: readonly HopCard[] = [
  { image: "tutorial", title: "Learn the space", copy: "Basic movement" },
  { image: "warning", title: "First chef attack", copy: "Read the warning / dodge" },
  { image: "cover", title: "Hide", copy: "Use strainers as cover" },
  { image: "steam", title: "New hazards", copy: "Steam, soup, bananas, bottles" },
  { image: "destruction", title: "Destruction", copy: "Broken plates open routes" },
  { image: "towel", title: "Escape", copy: "Reach the towel / E / slide" },
];
export const chefSequence: readonly HopCard[] = [
  { image: "warning", title: "01 / Warning marker" },
  { image: "hand", title: "02 / Chef hand attack" },
  { image: "reaction", title: "03 / Player reaction" },
  { image: "destruction", title: "04 / Environmental consequence" },
];
export const hazards: readonly HopCard[] = [
  { image: "hand", title: "Chef Hand" }, { image: "soup", title: "Soup Splash" },
  { image: "banana", title: "Banana Peel" }, { image: "knife", title: "Falling Knife" },
  { image: "bottle", title: "Rolling Bottle" }, { image: "steam", title: "Steam Jet" },
];
export const feedback: readonly HopCard[] = [
  { image: "hero", title: "Three hearts", copy: "A visible health state." },
  { image: "warning", title: "Read the warning", copy: "Time to react before impact." },
  { image: "cover", title: "Checkpoint & recovery", copy: "Safety, saved progress and refilled hearts." },
  { image: "defeat", title: "Failure screen", copy: "A clear way back into the chase." },
  { image: "prompt", title: "Press E", copy: "A contextual action at the towel." },
  { image: "gaspard", title: "Tutorial dialogue", copy: "Short guidance inside the story." },
];
