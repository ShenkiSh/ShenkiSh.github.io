import { CaseChapterNavigation } from "../CaseChapterNavigation";

const chapters = [["overview", "The Idea"], ["design", "Level Design"], ["unity", "UX/UI · Unity"], ["players", "Players & Credits"]] as const;

export function NumiChapterNavigation() {
  return <CaseChapterNavigation label="NUMI sections" chapters={chapters} />;
}
