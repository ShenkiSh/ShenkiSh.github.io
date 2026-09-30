import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { tenkiAsset, tenkiMapPrototype } from "./tenkiAssets";
import styles from "./TenkiInteraction.module.scss";

export function TenkiMap() {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const [failed, setFailed] = useState(false);

  function start(event: PointerEvent<HTMLDivElement>): void {
    if (!event.isPrimary || event.button !== 0) return;
    const element = event.currentTarget;
    element.focus({ preventScroll: true });
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: element.scrollLeft, top: element.scrollTop };
    element.setPointerCapture(event.pointerId);
    element.dataset.dragging = "true";
  }
  function move(event: PointerEvent<HTMLDivElement>): void {
    const initial = drag.current;
    if (!initial || initial.id !== event.pointerId) return;
    event.currentTarget.scrollLeft = initial.left + initial.x - event.clientX;
    event.currentTarget.scrollTop = initial.top + initial.y - event.clientY;
  }
  function stop(event: PointerEvent<HTMLDivElement>): void {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null;
    event.currentTarget.dataset.dragging = "false";
  }
  function navigate(event: KeyboardEvent<HTMLDivElement>): void {
    const steps: Record<string, [number, number]> = { ArrowRight: [72, 0], ArrowLeft: [-72, 0], ArrowDown: [0, 72], ArrowUp: [0, -72] };
    if (event.key === "Home") { event.preventDefault(); event.currentTarget.scrollTo(0, 0); }
    const step = steps[event.key];
    if (step) { event.preventDefault(); event.currentTarget.scrollBy({ left: step[0], top: step[1], behavior: "instant" }); }
  }

  return <figure className={styles.mapFigure}>
    <div className={styles.mapPhone}>
      <div ref={viewport} className={styles.mapViewport} role="region" tabIndex={0} aria-label="Interactive TENKI map" aria-describedby="tenki-map-help"
        onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} onKeyDown={navigate}>
        <img className={styles.mapArt} src={tenkiAsset("map-art.png")} alt="TENKI’s illustrated map of parks, with your current location marked" width="1771" height="1183" loading="lazy" decoding="async" draggable={false} onError={() => setFailed(true)} />
      </div>
      <button className={styles.mapReset} type="button" aria-label="Reset map position" onClick={() => viewport.current?.scrollTo({ left: 0, top: 0, behavior: "instant" })}><img src={tenkiAsset("map-back.svg")} width="23" height="34" alt="" /></button>
      <a className={styles.mapChoose} href={tenkiMapPrototype} target="_blank" rel="noreferrer" aria-label="Choose a location in the TENKI prototype"><img src={tenkiAsset("map-header.png")} alt="" width="430" height="126" /></a>
      {failed && <div className={styles.error} role="status">The map could not load. <a href={tenkiMapPrototype} target="_blank" rel="noreferrer">Open the interactive map →</a></div>}
    </div>
    <figcaption>Drag to explore the&nbsp;map</figcaption>
    <p className={styles.srOnly} id="tenki-map-help">Drag in any direction, or focus the map and use the arrow keys. Press Home or Reset map position to return to the start. Choose a location opens the full TENKI prototype in a new tab.</p>
  </figure>;
}
