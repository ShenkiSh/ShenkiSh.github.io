export interface HeroClip {
  project: string;
  title: string;
  revision: string;
}

// Keep the approved order. Hop uses the September 29 rebuilt-game recording.
export const heroClips: readonly HeroClip[] = [
  { project: "we-live-happily-here", title: "We Live Happily Here", revision: "2aa5f73eca" },
  { project: "le-frogette", title: "Hop! It’s the Chef!", revision: "b40610c538" },
  { project: "numi", title: "NUMI", revision: "338a6d70b4" },
];
