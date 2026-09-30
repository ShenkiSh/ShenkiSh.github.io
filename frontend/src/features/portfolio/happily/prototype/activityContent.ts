import type { Portrait } from "./prototypeModel";

interface PlayerReport {
  cooperation: number;
  friction: string;
  frequentGame: string;
  helpfulLabel: string;
  helpfulGame: string;
  connection: string;
}

// Original sample reports from Figma component 1457:8438, including its meter fills.
export const playerReports: Readonly<Record<Portrait, PlayerReport>> = {
  mom: { cooperation: 92.579, friction: "דני, משחק חפצים", frequentGame: "הוגנות - 2 פעמים היום", helpfulLabel: "משחק שהכי עוזר", helpfulGame: "משחק חפצים", connection: "הכי זורם עם: טוהר, משחק תחרות" },
  yuval: { cooperation: 52.660, friction: "אבא, משחק פגיעה", frequentGame: "תחרות - 3 פעמים היום", helpfulLabel: "משחק שהכי עוזר", helpfulGame: "משחק מרחב אישי", connection: "הכי זורם עם: דני, משחק חפצים" },
  dad: { cooperation: 35.041, friction: "יובל, משחק פגיעה", frequentGame: "חפצים - 1 פעמים היום", helpfulLabel: "משחק שהכי עוזר", helpfulGame: "משחק תחרות", connection: "הכי זורם עם: אמא, משחק הוגנות" },
  tohar: { cooperation: 82.053, friction: "יובל, משחק מרחב אישי", frequentGame: "מרחב אישי - 2 פעמים היום", helpfulLabel: "הכי עוזר", helpfulGame: "משחק הוגנות", connection: "הכי זורם עם: אמא, משחק תחרות" },
  dani: { cooperation: 74.132, friction: "אמא, משחק חפצים", frequentGame: "הוגנות - 1 פעמים היום", helpfulLabel: "משחק שהכי עוזר", helpfulGame: "משחק חפצים", connection: "הכי זורם עם: יובל, משחק חפצים" },
};

export const weeklyTeams = [
  { id: "dani-yuval", label: "דני ויובל", players: ["dani", "yuval"], artwork: "weekly.png" },
  { id: "tohar-mom", label: "טוהר ואמא", players: ["tohar", "mom"], artwork: "weekly-tohar-mom.png" },
] as const;

export type WeeklyTeamId = typeof weeklyTeams[number]["id"];

export function weeklyTeam(id: WeeklyTeamId) {
  return weeklyTeams.find(team => team.id === id) ?? weeklyTeams[0];
}
