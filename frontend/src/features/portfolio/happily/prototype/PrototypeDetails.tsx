import { useRef, useState } from "react";
import { happilyAsset } from "../happilyMedia";
import { PlayerChoice, PlayerPortrait } from "./PrototypeChoices";
import type { ScreenProps } from "./PrototypeScreens";
import type { Player } from "./prototypeModel";
import { playerReports } from "./activityContent";
import { PrototypeWeeklyCard } from "./PrototypeWeeklyCard";
import app from "./PrototypeScreens.module.scss";
import styles from "./PrototypeDetails.module.scss";

function PeriodTabs({ period, onChange }: { period: string; onChange: (period: string) => void }) {
  return <div className={styles.tabs} role="group" aria-label="תקופה">
    {["החודש", "השבוע", "היום"].map(label => <button key={label} type="button" aria-pressed={period === label} onClick={() => onChange(label)}>{label}</button>)}
  </div>;
}

function PlayerActivity({ player, onPrevious, onNext }: { player: Player; onPrevious: () => void; onNext: () => void }) {
  const report = playerReports[player.portrait];
  return <>
    <div className={styles.profile}>
      {player.portrait === "tohar" ? <span className={styles.toharProfile} aria-hidden="true"><img src={happilyAsset("prototype/tohar-profile-source.png")} alt="" /></span> : <PlayerPortrait portrait={player.portrait} />}
      <span className={styles.profileName}>{player.name}<small>{player.games} משחקים היום</small></span>
      <button type="button" className={styles.previous} onClick={onPrevious} aria-label="השחקן הקודם"><svg width="14" height="30" viewBox="0 0 14 30" aria-hidden="true"><path d="m12 2-10 13 10 13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></button>
      <button type="button" className={styles.next} onClick={onNext} aria-label="השחקן הבא"><svg width="14" height="30" viewBox="0 0 14 30" aria-hidden="true"><path d="m2 2 10 13-10 13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></button>
    </div>
    <section className={styles.report} aria-label="סיכום שחקן" data-player={player.id}>
      <div className={styles.cooperationLabel}><h4>מד שיתוף פעולה</h4><p>רמת שיתוף הפעולה במשחקים</p></div>
      <div className={styles.meter} role="meter" aria-label="מד שיתוף פעולה" aria-valuenow={Math.round(report.cooperation)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${report.cooperation}%` }} /></div>
      <div className={styles.quickLabel}><h4>בדיקה מהירה</h4><p>היה יותר חיכוך עם</p></div><div className={styles.reportValue} style={{ top: 160.051 }}>{report.friction}</div>
      <h4 className={styles.reportLabel} style={{ top: 214.851 }}>משחק שעולה הרבה</h4><div className={styles.reportValue} style={{ top: 249.851 }}>{report.frequentGame}</div>
      <h4 className={styles.reportLabel} style={{ top: 304.651 }}>{report.helpfulLabel}</h4><div className={styles.reportValue} style={{ top: 339.651 }}>{report.helpfulGame}</div>
      <h4 className={styles.reportLabel} style={{ top: 394.451 }}>עוד משהו קטן</h4><div className={styles.reportValue} style={{ top: 429.451 }}>{report.connection}</div>
    </section>
  </>;
}

export function ActivityScreen({ state, dispatch }: ScreenProps) {
  const [period, setPeriod] = useState("היום");
  const [playerIndex, setPlayerIndex] = useState<number | null>(null);
  const [weekly, setWeekly] = useState(false);
  const weeklyTrigger = useRef<HTMLButtonElement>(null);
  const closeWeekly = () => {
    setWeekly(false);
    requestAnimationFrame(() => weeklyTrigger.current?.focus({ preventScroll: true }));
  };
  const player = playerIndex === null ? null : state.players[playerIndex];
  return <div className={styles.activity} data-profile={!!player}>
    <button type="button" className={styles.back} aria-label="בחזרה לסיכום הבית" onClick={() => {
      if (weekly) closeWeekly();
      else if (player) setPlayerIndex(null);
      else dispatch({ type: "navigate", screen: "family" });
    }}>←</button>
    <h3 className={styles.title} tabIndex={-1}>סטטוס</h3><p className={styles.subtitle}>{player ? "סיכום שחקן" : "סיכום הבית"}</p>
    <div inert={weekly}>
      <PeriodTabs period={period} onChange={setPeriod} />
      {player && playerIndex !== null ? <PlayerActivity player={player} onPrevious={() => setPlayerIndex((playerIndex + state.players.length - 1) % state.players.length)} onNext={() => setPlayerIndex((playerIndex + 1) % state.players.length)} /> : <>
        <h4 className={styles.quickTitle}>מבט מהיר</h4>
        <div className={styles.metrics}>
          <div>משחקים<small>{6 + state.completedInvitations.length}</small></div><div>חוזר הרבה<small>חפצים</small></div>
          <div>אחוז הצלחה<small>71%</small></div><button ref={weeklyTrigger} type="button" onClick={() => setWeekly(true)}>קלפי השבוע<small>צוות אחים</small></button>
        </div>
        <h4 className={styles.playersTitle}>בחירת שחקן להתבוננות</h4>
        <div className={styles.statusPlayers}>{state.players.map((p, i) => <PlayerChoice key={p.id} player={p} selected={false} onClick={() => setPlayerIndex(i)} />)}</div>
      </>}
    </div>
    {weekly && <PrototypeWeeklyCard state={state} dispatch={dispatch} onClose={closeWeekly} />}
  </div>;
}

export function AddPlayerScreen({ state, dispatch }: ScreenProps) {
  const [name, setName] = useState(state.registration.name);
  const [phone, setPhone] = useState(state.registration.phone);
  const valid = !!name.trim() && /^[\d+() -]{7,20}$/.test(phone.trim());
  return <form className={styles.form} onSubmit={event => { event.preventDefault(); dispatch({ type: "save-player", name, phone }); }}>
    <label className={styles.nameLabel} htmlFor="happily-player-name">מי השחקן?<small>הוספת פרטי שחקן א</small></label>
    <input className={styles.nameInput} id="happily-player-name" aria-label="שם השחקן" placeholder="שחקן א" value={name} onChange={e => setName(e.target.value)} required maxLength={20} autoComplete="off" />
    <label className={styles.phoneLabel} htmlFor="happily-player-phone">הוספת מספר טלפון<small>לצורך זיהוי ושמירת המשחק</small></label>
    <input className={styles.phoneInput} id="happily-player-phone" aria-label="מספר טלפון" type="tel" dir="ltr" value={phone} onChange={e => setPhone(e.target.value)} maxLength={20} autoComplete="off" required />
    <button type="submit" className={`${app.primary} ${styles.save}`} disabled={!valid} data-ready={valid}>שמירת השחקן</button>
  </form>;
}

export function RegistrationScreen({ state, dispatch }: ScreenProps) {
  return <>
    <h4 className={styles.responsibleTitle}>השחקן האחראי</h4>
    <div className={styles.responsible}>אמא<small>⊕ &nbsp; הדמות שלי</small></div>
    <h4 className={styles.registrationTitle}>מי השחקנים?</h4>
    <p className={styles.registrationHint}>הגדרת השחקנים<br />על ידי לחיצה על - ⊕</p>
    <div className={styles.registrationPlayers}>{state.players.filter(p => p.id !== "mom").map(p => <span key={p.id}>{p.name}<img src={happilyAsset("prototype/check-off.svg")} alt="" /></span>)}</div>
    <button className={styles.registeredPlayer} type="button" onClick={() => dispatch({ type: "navigate", screen: "add-player" })}>{state.registration.name}</button>
    <button className={`${app.primary} ${styles.registerSend}`} type="button" onClick={() => dispatch({ type: "navigate", screen: "family" })}>שליחת הזמנה</button>
  </>;
}
