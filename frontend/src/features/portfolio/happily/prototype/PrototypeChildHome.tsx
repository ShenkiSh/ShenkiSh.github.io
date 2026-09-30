import { happilyAsset } from "../happilyMedia";
import { AppArtwork } from "./PrototypeArtwork";
import { ChildIllustration } from "./ChildIllustration";
import { childAccessories, childCharacters, childColors, sameAppearance } from "./childCustomization";
import type { ScreenProps } from "./PrototypeScreens";
import app from "./PrototypeScreens.module.scss";
import styles from "./PrototypeChildHome.module.scss";

export function PrototypeChildHome({ state, dispatch }: ScreenProps) {
  const { childAppearance: appearance, savedChildAppearance, childEditorTab } = state;
  const character = childCharacters.find(c => c.id === appearance.character)!;
  const color = childColors.find(c => c.id === appearance.color)!;
  const accessory = appearance.character === "bear" ? childAccessories.find(a => a.id === appearance.accessory) : undefined;
  const awardedPose = state.weeklyAward === "read" && appearance.character === "bear" && appearance.color === "orange";
  const avatar = awardedPose ? { left: 100.24, top: -.76, width: 55.506, height: 103.846 } : appearance.character === "bear" ? color : character;
  const saved = sameAppearance(appearance, savedChildAppearance);
  const src = (name: string) => happilyAsset(`prototype/child/${name}`);

  return <>
    <AppArtwork showBrand={false} />
    <header className={styles.brand}>
      <img src={happilyAsset("prototype/logo.png")} width="93" height="77" alt="כאן גרים בכיף" />
      <p>משחק לנשימה</p>
      <h3 tabIndex={-1}>שלום דני!</h3>
    </header>
    <div className={styles.prompt}><h4>איזו דמות תרצה להיות?</h4><p>בחר ועצב את הדמות שלך</p></div>
    <div className={styles.player} data-saved={!!savedChildAppearance}>
      <img src={happilyAsset(`prototype/check-${savedChildAppearance ? "on" : "off"}.svg`)} alt="" />
      <span>דני</span><small>{state.players.find(player => player.id === "dani")?.games ?? 0} משחקים היום</small>
    </div>
    <div className={styles.editor}>
      <img className={styles.cloud} src={src("character-cloud.svg")} alt="" />
      <img className={styles.shadow} src={src("character-shadow.svg")} alt="" />
      <ChildIllustration className={styles.character} style={{ left: avatar.left, top: avatar.top, width: avatar.width, height: avatar.height }}
        asset={awardedPose ? "bear-awarded" : appearance.character === "bear" ? `bear-${appearance.color}` : character.file} alt={awardedPose ? "דוב עם תעודת הצטיינות" : character.label} character={appearance.character} color={appearance.color} />
      {accessory && <ChildIllustration className={styles.accessory} style={{ left: accessory.left, top: accessory.top, width: accessory.width, height: accessory.height }} asset={`accessory-${accessory.id}`} alt={accessory.label} accessory={accessory.id} />}
      <button type="button" className={styles.previous} aria-label="הדמות הקודמת" onClick={() => dispatch({ type: "child-character", step: -1 })}><img src={src("arrow.svg")} alt="" /></button>
      <button type="button" className={styles.next} aria-label="הדמות הבאה" onClick={() => dispatch({ type: "child-character", step: 1 })}><img src={src("arrow.svg")} alt="" /></button>
      <button type="button" className={styles.save} aria-label="שמירת הדמות" aria-pressed={saved} onClick={() => dispatch({ type: "child-save" })}>שמירה</button>
      <p className={app.srOnly} role="status">{saved ? "הדמות נשמרה" : ""}</p>
      <div className={styles.tabs} role="group" aria-label="עיצוב הדמות">
        <button type="button" aria-pressed={childEditorTab === "accessories"} onClick={() => dispatch({ type: "child-editor-tab", tab: "accessories" })}>אביזרים</button>
        <button type="button" aria-pressed={childEditorTab === "color"} onClick={() => dispatch({ type: "child-editor-tab", tab: "color" })}>צבע</button>
      </div>
      {childEditorTab === "color" ? <div className={styles.colors} role="group" aria-label="בחירת צבע">
        <span style={{ backgroundColor: "#1abeff" }} aria-hidden="true" /><span style={{ backgroundColor: "#ff86db" }} aria-hidden="true" />
        {childColors.map(c => <button type="button" key={c.id} style={{ backgroundColor: c.value }} aria-label={c.label} aria-pressed={appearance.character === "bear" && appearance.color === c.id} onClick={() => dispatch({ type: "child-color", color: c.id })} />)}
      </div> : <div className={styles.accessories} role="group" aria-label="בחירת אביזר">
        {childAccessories.map(a => <button type="button" key={a.id} aria-label={a.label} aria-pressed={appearance.character === "bear" && appearance.accessory === a.id} onClick={() => dispatch({ type: "child-accessory", accessory: a.id })}>
          <ChildIllustration className={styles.accessoryIcon} asset={`accessory-${a.id}`} style={{ width: a.iconWidth, height: a.iconHeight }} alt="" />
        </button>)}
      </div>}
    </div>
  </>;
}
