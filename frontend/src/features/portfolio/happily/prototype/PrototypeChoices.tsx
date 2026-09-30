import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { happilyAsset } from "../happilyMedia";
import type { Player, Portrait } from "./prototypeModel";
import styles from "./PrototypeScreens.module.scss";

export function PlayerPortrait({ portrait, className = "" }: { portrait: Portrait; className?: string }) {
  return <span className={`${styles.portrait} ${className}`} data-portrait={portrait} aria-hidden="true">
    <img src={happilyAsset(`prototype/${portrait}-source.png`)} alt="" />
  </span>;
}

export function ChoiceButton({ selected, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }) {
  return <button {...props} type="button" className={styles.choice} aria-pressed={selected}>
    <img className={styles.check} src={happilyAsset(`prototype/check-${selected ? "on" : "off"}.svg`)} alt="" />
    {children}
  </button>;
}

export function PlayerChoice({ player, selected, onClick, style }: { player: Player; selected: boolean; onClick: () => void; style?: CSSProperties }) {
  return <div className={styles.player} data-player={player.portrait} style={style}>
    <PlayerPortrait portrait={player.portrait} className={styles.avatar} />
    <ChoiceButton selected={selected} onClick={onClick} aria-label={player.name}>
      <span>{player.name}</span>
    </ChoiceButton>
    <span className={styles.count}>{player.games} משחקים היום</span>
    <span className={styles.availability} data-playing={player.playing}>
      <img src={happilyAsset(`prototype/${player.playing ? "playing" : "available"}.svg`)} alt="" />
      {player.playing ? "משחק" : "פנוי"}
    </span>
  </div>;
}

export function PlayerPair({ players }: { players: readonly Player[] }) {
  return <div className={styles.pair}>{players.map(player => <div key={player.id} data-player={player.portrait}>
    <PlayerPortrait portrait={player.portrait} /><span className={styles.pairLabel}>
      <img src={happilyAsset("prototype/check-on.svg")} alt="" />{player.name}
    </span>
  </div>)}</div>;
}
