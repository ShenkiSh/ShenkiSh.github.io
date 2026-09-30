export const childCharacters = [
  { id: "bear", label: "דוב", file: "bear-orange", left: 98.414, top: 0, width: 59.806, height: 106.009 },
  { id: "raccoon", label: "דביבון", file: "raccoon", left: 81.902, top: -4.941, width: 73.929, height: 112.216 },
  { id: "mushroom", label: "פטרייה", file: "mushroom", left: 94.973, top: -.93, width: 69.829, height: 106.939 },
  { id: "frog", label: "צפרדע", file: "frog", left: 101.374, top: 3.609, width: 58.428, height: 105.081 },
] as const;

// Only the five illustrated color states supplied in Figma are selectable.
export const childColors = [
  { id: "orange", label: "כתום", value: "#ff8d14", left: 98.414, top: 0, width: 59.806, height: 106.009 },
  { id: "green", label: "ירוק", value: "#00be06", left: 97.366, top: -1.778, width: 62.383, height: 109.565 },
  { id: "brown", label: "חום", value: "#66340a", left: 98.205, top: -1.133, width: 60.705, height: 108.275 },
  { id: "cream", label: "קרם", value: "#ffebd9", left: 98.834, top: 0, width: 59.446, height: 106.03 },
  { id: "purple", label: "סגול", value: "#d981ff", left: 97.287, top: -3.184, width: 62.541, height: 108.702 },
] as const;

export const childAccessories = [
  { id: "overalls", label: "סרבל", left: 103.26, top: 32.412, width: 51.9, height: 67.029, iconWidth: 17.593, iconHeight: 22.721 },
  { id: "hat", label: "כובע רחב", left: 100.469, top: -8.572, width: 53.821, height: 25.953, iconWidth: 23.782, iconHeight: 11.468 },
  { id: "moustache", label: "שפם", left: 106.27, top: 19.808, width: 42.809, height: 19.718, iconWidth: 22.248, iconHeight: 10.248 },
  { id: "glasses", label: "משקפיים", left: 105.959, top: .495, width: 44.717, height: 29.172, iconWidth: 24.224, iconHeight: 15.803 },
  { id: "skirt", label: "חצאית", left: 84.224, top: 45.267, width: 88.186, height: 58.791, iconWidth: 23.257, iconHeight: 15.505 },
  { id: "scarf", label: "צעיף", left: 104.528, top: 26.412, width: 57.415, height: 40.583, iconWidth: 23.195, iconHeight: 16.395 },
] as const;

export type ChildCharacter = typeof childCharacters[number]["id"];
export type ChildColor = typeof childColors[number]["id"];
export type ChildAccessory = typeof childAccessories[number]["id"];
export type ChildAppearance = { character: ChildCharacter; color: ChildColor; accessory: ChildAccessory | null };
export const initialChildAppearance: ChildAppearance = { character: "bear", color: "orange", accessory: null };

export function sameAppearance(a: ChildAppearance, b: ChildAppearance | null) {
  return !!b && a.character === b.character && a.color === b.color && a.accessory === b.accessory;
}
