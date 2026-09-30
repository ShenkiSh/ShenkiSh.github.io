import type { CSSProperties } from "react";
import { asset } from "@/shared/utils/asset";
import { PreviewVideo } from "./PreviewVideo";
import { c } from "./styles";
import styles from "./ProjectPreview.module.scss";

interface ProjectPreviewProps {
  image: string;
  alt: string;
  video?: string;
  className?: string;
  aspectRatio?: string;
  fit?: "cover" | "contain";
  background?: string;
  foreground?: string;
}

export function ProjectPreview({ image, alt, video, className = "", aspectRatio = "16 / 9", fit = "cover", background, foreground }: ProjectPreviewProps) {
  const style = { aspectRatio, "--preview-background": background } as CSSProperties;
  return <span className={`${styles.frame} ${className}`} style={style} data-project-preview data-fit={fit}>
    <img src={asset(image)} alt={foreground ? "" : alt} width="1280" height="720" loading="lazy" decoding="async" />
    {foreground && <img className={styles.foreground} src={asset(foreground)} alt={alt} width="1200" height="900" loading="lazy" decoding="async" />}
    {video && <PreviewVideo className={`${styles.video} ${c("preview-motion")}`} previewSrc={asset(video)} aria-hidden="true" tabIndex={-1} />}
  </span>;
}
