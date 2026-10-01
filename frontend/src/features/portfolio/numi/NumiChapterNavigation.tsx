import { CaseChapterNavigation } from "../CaseChapterNavigation";

const chapters = [["overview", "The Idea"], ["visual", "Visual Design"], ["design", "Level Design"], ["unity", "UX/UI · Unity"], ["players", "Press & Players"]] as const;

export function NumiChapterNavigation() {
  return <CaseChapterNavigation label="NUMI sections" chapters={chapters} />;
}
