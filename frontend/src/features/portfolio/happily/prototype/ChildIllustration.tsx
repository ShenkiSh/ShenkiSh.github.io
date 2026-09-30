import type { CSSProperties } from "react";
import { happilyAsset } from "../happilyMedia";
import { childIllustrations, type ChildIllustrationId } from "./childIllustrationData";
import styles from "./ChildIllustration.module.scss";

export function ChildIllustration({ asset, alt, className, style, character, color, accessory }: {
  asset: ChildIllustrationId; alt: string; className?: string; style: CSSProperties;
  character?: string; color?: string; accessory?: string;
}) {
  const { crop: [a, d, x, y], rotation, widthRatio, heightRatio } = childIllustrations[asset];
  return <span className={className} style={style}>
    <span className={styles.crop} style={{ width: `${widthRatio * 100}%`, height: `${heightRatio * 100}%`, transform: `translate(-50%, -50%) rotate(${-rotation}deg)` }}>
      <img className={styles.image} src={happilyAsset(`prototype/child/${asset}-source.png`)} alt={alt}
        data-character={character} data-color={color} data-accessory={accessory}
        style={{ width: `${100 / a}%`, height: `${100 / d}%`, left: `${-100 * x / a}%`, top: `${-100 * y / d}%` }} />
    </span>
  </span>;
}
