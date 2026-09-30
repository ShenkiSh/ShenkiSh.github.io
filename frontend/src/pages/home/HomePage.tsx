import { Hero } from "@/features/portfolio/Hero";
import { SelectedWork } from "@/features/portfolio/SelectedWork";
import { MoreWork } from "@/features/portfolio/MoreWork";
import { AboutPreview } from "@/features/portfolio/AboutPreview";

export function HomePage() {
  return <><Hero /><SelectedWork /><MoreWork /><AboutPreview /></>;
}
