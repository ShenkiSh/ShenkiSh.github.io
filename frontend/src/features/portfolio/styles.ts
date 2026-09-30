import foundation from "./Foundation.module.scss";
import home from "./Home.module.scss";
import hero from "./Hero.module.scss";

const layers = [foundation, home, hero];

/** Keep case-study foundations separate from the current Figma Home direction. */
export function c(names: string): string {
  return names.split(/\s+/).flatMap(name => layers.map(layer => layer[name]).filter(Boolean)).join(" ");
}
