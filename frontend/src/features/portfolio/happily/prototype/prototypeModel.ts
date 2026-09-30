import { childCharacters, initialChildAppearance, type ChildAccessory, type ChildAppearance, type ChildColor } from "./childCustomization";
import { weeklyTeam, weeklyTeams, type WeeklyTeamId } from "./activityContent";

export type AppScreen = "family" | "conflict" | "activity" | "add-player" | "registration" | "completion";
export type AppView = "parent" | "child";
export type Portrait = "mom" | "dad" | "yuval" | "dani" | "tohar";
export type Player = { id: string; name: string; portrait: Portrait; games: number; playing?: boolean };
export type ConflictId = "space" | "objects" | "hurt" | "fairness" | "competition";
export type Invitation = { id: number; players: readonly Player[]; conflict: ConflictId };

export const conflictChoices: readonly { id: ConflictId; title: string; quote: string }[] = [
  { id: "hurt", title: "פגיעה", quote: "הוא פגע בי..." },
  { id: "objects", title: "חפצים", quote: "הוא לקח לי..." },
  { id: "space", title: "מרחב אישי", quote: "זה המקום שלי..." },
  { id: "fairness", title: "הוגנות", quote: "זה לא הוגן..." },
  { id: "competition", title: "תחרות", quote: "אני קודם..." },
];

export type PrototypeState = {
  screen: AppScreen;
  childScreen: "registration-invite" | "home" | "notification" | "lobby" | "award-notification" | "award";
  weeklyAward: "not-sent" | "unread" | "read";
  selectedWeeklyTeam: WeeklyTeamId;
  sentWeeklyTeams: readonly WeeklyTeamId[];
  childAppearance: ChildAppearance;
  savedChildAppearance: ChildAppearance | null;
  childEditorTab: "color" | "accessories";
  view: AppView;
  players: readonly Player[];
  selected: readonly string[];
  conflict: ConflictId | null;
  invitations: readonly Invitation[];
  completedInvitations: readonly number[];
  registration: { name: string; phone: string };
  message: string;
};

export const initialPrototype: PrototypeState = {
  screen: "family",
  childScreen: "registration-invite",
  weeklyAward: "not-sent",
  selectedWeeklyTeam: "dani-yuval",
  sentWeeklyTeams: [],
  childAppearance: initialChildAppearance,
  savedChildAppearance: null,
  childEditorTab: "color",
  view: "parent",
  players: [
    { id: "mom", name: "אמא", portrait: "mom", games: 0 },
    { id: "yuval", name: "יובל", portrait: "yuval", games: 3 },
    { id: "dad", name: "אבא", portrait: "dad", games: 1, playing: true },
    { id: "tohar", name: "טוהר", portrait: "tohar", games: 2, playing: true },
    { id: "dani", name: "דני", portrait: "dani", games: 0 },
  ],
  selected: [], conflict: null, invitations: [], completedInvitations: [], message: "", registration: { name: "", phone: "" },
};

type PrototypeAction =
  | { type: "toggle-player"; id: string }
  | { type: "choose-conflict"; id: ConflictId }
  | { type: "navigate"; screen: AppScreen }
  | { type: "view"; view: AppView }
  | { type: "open-invitation" }
  | { type: "child-back" }
  | { type: "child-home" }
  | { type: "child-character"; step: -1 | 1 }
  | { type: "child-color"; color: ChildColor }
  | { type: "child-accessory"; accessory: ChildAccessory }
  | { type: "child-editor-tab"; tab: "color" | "accessories" }
  | { type: "child-save" }
  | { type: "send-award" }
  | { type: "cycle-award-team"; step: -1 | 1 }
  | { type: "open-award" }
  | { type: "game-complete"; invitationId: number }
  | { type: "save-player"; name: string; phone: string }
  | { type: "send" };

export function prototypeReducer(state: PrototypeState, action: PrototypeAction): PrototypeState {
  switch (action.type) {
    case "toggle-player": {
      if (!state.players.some(p => p.id === action.id)) return state;
      if (state.selected.includes(action.id)) return { ...state, selected: state.selected.filter(id => id !== action.id), message: "" };
      if (state.selected.length === 2) return { ...state, message: "אפשר לבחור שני משתמשים. בטלו בחירה אחת כדי לבחור משתמש אחר." };
      return { ...state, selected: [...state.selected, action.id], message: "" };
    }
    case "choose-conflict": return { ...state, conflict: state.conflict === action.id ? null : action.id };
    case "navigate":
      if (action.screen === "conflict" && state.selected.length !== 2) return state;
      return { ...state, screen: action.screen, view: "parent", message: "" };
    case "view": return state.view === action.view ? state : { ...state, view: action.view };
    case "open-invitation":
      if (state.completedInvitations.includes(state.invitations[0]?.id ?? -1)) return state;
      if (!["space", "objects"].includes(state.invitations[0]?.conflict ?? "")) return state;
      return { ...state, childScreen: "lobby", view: "child" };
    case "child-home": return { ...state, childScreen: "home", view: "child" };
    case "child-back": return { ...state, childScreen: childBackScreen(state), view: "child" };
    case "child-character": {
      const index = childCharacters.findIndex(c => c.id === state.childAppearance.character);
      const character = childCharacters[(index + action.step + childCharacters.length) % childCharacters.length]?.id ?? "bear";
      return { ...state, childAppearance: { ...state.childAppearance, character } };
    }
    case "child-color": return { ...state, childAppearance: { ...state.childAppearance, character: "bear", color: action.color } };
    case "child-accessory": return { ...state, childAppearance: { ...state.childAppearance, character: "bear", accessory: state.childAppearance.accessory === action.accessory ? null : action.accessory } };
    case "child-editor-tab": return { ...state, childEditorTab: action.tab };
    case "child-save": return { ...state, savedChildAppearance: { ...state.childAppearance } };
    case "cycle-award-team": {
      if (state.screen !== "activity") return state;
      const index = weeklyTeams.findIndex(team => team.id === state.selectedWeeklyTeam);
      const team = weeklyTeams[(index + action.step + weeklyTeams.length) % weeklyTeams.length];
      return team ? { ...state, selectedWeeklyTeam: team.id } : state;
    }
    case "send-award": {
      const team = weeklyTeam(state.selectedWeeklyTeam);
      if (state.screen !== "activity" || state.sentWeeklyTeams.includes(team.id)) return state;
      const sentWeeklyTeams = [...state.sentWeeklyTeams, team.id];
      // The child phone represents Dani; other teams must not receive his notification.
      if (!team.players.some(id => id === "dani")) return { ...state, sentWeeklyTeams };
      return { ...state, sentWeeklyTeams, weeklyAward: "unread", childScreen: "award-notification", view: "child" };
    }
    case "open-award":
      if (state.weeklyAward === "not-sent") return state;
      return { ...state, weeklyAward: "read", childScreen: "award", view: "child" };
    case "game-complete": {
      const invitation = state.invitations[0];
      if (!invitation || invitation.id !== action.invitationId || !hasPendingInvitation(state)
        || !["space", "objects"].includes(invitation.conflict)) return state;
      return {
        ...state, screen: "completion", childScreen: state.weeklyAward === "unread" ? "award-notification" : "home", view: "parent", message: "",
        selected: [], conflict: null,
        completedInvitations: [...state.completedInvitations, invitation.id],
        players: state.players.map(player => invitation.players.some(p => p.id === player.id)
          ? { ...player, games: player.games + 1, playing: false } : player),
      };
    }
    case "send": {
      if (state.screen !== "conflict" || state.selected.length !== 2 || !state.conflict) return state;
      const invitation: Invitation = { id: state.invitations.length + 1, players: state.selected.flatMap(id => state.players.filter(p => p.id === id)), conflict: state.conflict };
      return { ...state, screen: "family", childScreen: "notification", view: "child", message: "", invitations: [invitation, ...state.invitations] };
    }
    case "save-player": {
      const name = action.name.trim().slice(0, 20);
      if (!name || !/^[\d+() -]{7,20}$/.test(action.phone.trim())) return state;
      return { ...state, screen: "registration", registration: { name, phone: action.phone.trim() } };
    }
  }
}

export function hasPendingInvitation(state: PrototypeState): boolean {
  return !!state.invitations[0] && !state.completedInvitations.includes(state.invitations[0].id);
}

function childBackScreen(state: PrototypeState): PrototypeState["childScreen"] {
  if (state.childScreen === "award" || state.childScreen === "award-notification") return "home";
  if (state.childScreen === "notification") return state.weeklyAward === "unread" ? "award-notification" : "home";
  if (hasPendingInvitation(state)) return "notification";
  return state.weeklyAward !== "not-sent" ? "award-notification" : "registration-invite";
}

export function childBackLabel(state: PrototypeState): string {
  const screen = childBackScreen(state);
  if (screen === "home") return "למסך הבית של הילד";
  if (screen === "award-notification") return "בחזרה להודעת ההצטיינות";
  return screen === "notification" ? "בחזרה להזמנה" : "בחזרה להזמנת ההצטרפות";
}
