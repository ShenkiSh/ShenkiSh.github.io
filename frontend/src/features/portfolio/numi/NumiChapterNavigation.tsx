import { CaseChapterNavigation } from "../CaseChapterNavigation";

const chapters = [["overview", "Game"], ["memories", "Memories"], ["design", "Level Design"], ["unity", "UX/UI · Unity"], ["testing", "Playtesting"], ["visual", "Visual"]] as const;

export function NumiChapterNavigation() {
  return <CaseChapterNavigation label="NUMI sections" chapters={chapters} />;
}
