import collection from "@/features/collection/Collection.module.css";
import { EVA } from "./planningList";
import styles from "./Assistant.module.css";

type Drawing = (typeof EVA.tiles)[number]["drawing"];

/* A point in the room, in metres, drawn from above at an angle: x runs to
   the right and down the screen, y to the left and down, z straight up;
   30 degrees each way, as the planner's isometric sketches. */
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

function at(x: number, y: number, z: number, [cx, cy, s]: View) {
  return `${(cx + (x - y) * COS * s).toFixed(1)},${(cy + (x + y) * SIN * s - z * s).toFixed(1)}`;
}

/** Where a drawing's origin sits in its frame, and its metres in px. */
type View = readonly [number, number, number];

const poly = (points: string[]) => `M${points.join("L")}Z`;

/**
 * A box as a piece reads from above at an angle: its top and its two front
 * sides, the faces the eye sees, drawn back to front by the caller.
 */
function Box({
  v,
  x,
  y,
  z = 0,
  w,
  d,
  h,
  look,
}: {
  v: View;
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  /** a piece Eva points to, or one that doesn't exist */
  look?: "on" | "ghost";
}) {
  const p = (a: number, b: number, c: number) => at(a, b, c, v);
  return (
    <g className={look === "on" ? styles.faceOn : look === "ghost" ? styles.ghost : styles.face}>
      <path d={poly([p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)])} />
      <path d={poly([p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)])} />
      <path d={poly([p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)])} />
    </g>
  );
}

/** A dot on the drawing, for a place Eva looks at. */
function Dot({ v, x, y, z }: { v: View; x: number; y: number; z: number }) {
  const [cx, cy] = at(x, y, z, v).split(",");
  return <circle className={styles.dot} cx={cx} cy={cy} r={3.5} />;
}

/** The room, then you: a room's two walls and floor, two pieces in it, its width measured, Eva's eye on both. */
function Room() {
  const v: View = [150, 52, 17];
  const p = (x: number, y: number, z: number) => at(x, y, z, v);
  return (
    <>
      <path className={styles.guide} d={poly([p(0, 0, 0), p(6, 0, 0), p(6, 5, 0), p(0, 5, 0)])} />
      <path className={styles.wall} d={poly([p(0, 0, 0), p(6, 0, 0), p(6, 0, 2.2), p(0, 0, 2.2)])} />
      <path className={styles.wall} d={poly([p(0, 0, 0), p(0, 5, 0), p(0, 5, 2.2), p(0, 0, 2.2)])} />
      <Box v={v} x={3.6} y={0.1} w={2} d={0.5} h={1.8} />
      <Box v={v} x={0.1} y={1.3} w={1} d={2.4} h={0.8} look="on" />
      {/* the width along the front, with a tick at each end */}
      <path className={styles.measure} d={`M${p(0, 5.7, 0)}L${p(6, 5.7, 0)}`} />
      <path className={styles.measure} d={`M${p(0, 5.4, 0)}L${p(0, 6, 0)}M${p(6, 5.4, 0)}L${p(6, 6, 0)}`} />
      <path className={styles.guide} d={`M${p(4, 3.4, 0)}L${p(1.1, 2.5, 0.8)}M${p(4, 3.4, 0)}L${p(4.6, 0.6, 1.8)}`} />
      <Dot v={v} x={4} y={3.4} z={0} />
      <Dot v={v} x={1.1} y={2.5} z={0.8} />
      <Dot v={v} x={4.6} y={0.6} z={1.8} />
    </>
  );
}

/** Three pieces at most: three pieces rising left to right, their tops joined, on a floor marked out faintly. */
function Three() {
  const v: View = [70, 120, 17];
  const p = (x: number, y: number, z: number) => at(x, y, z, v);
  const pieces = [
    { x: 0, h: 1.1 },
    { x: 2.3, h: 2 },
    { x: 4.6, h: 2.9 },
  ];
  return (
    <>
      <path className={styles.guide} d={poly([p(-1, 0.6, 0), p(5.2, -5.6, 0), p(6.8, -4, 0), p(0.6, 2.2, 0)])} />
      {pieces.map((b) => (
        <Box key={b.x} v={v} x={b.x} y={-b.x} w={1.2} d={1.2} h={b.h} look="on" />
      ))}
      <path className={styles.guide} d={`M${pieces.map((b) => p(b.x + 0.6, -b.x + 0.6, b.h)).join("L")}`} />
      {pieces.map((b) => (
        <Dot key={b.x} v={v} x={b.x + 0.6} y={-b.x + 0.6} z={b.h} />
      ))}
    </>
  );
}

/** Only what we sell: a shelf of six cubes, one picked, beside a piece in dashes that doesn't exist. */
function Ours() {
  const v: View = [96, 118, 24];
  const cubes = [0, 1, 2].flatMap((x) => [0, 1].map((z) => ({ x, z })));
  return (
    <>
      {cubes.map((c) => (
        <Box
          key={`${c.x}-${c.z}`}
          v={v}
          x={c.x}
          y={0}
          z={c.z}
          w={1}
          d={1}
          h={1}
          {...(c.x === 1 && c.z === 1 && { look: "on" as const })}
        />
      ))}
      <Box v={v} x={4} y={-1.2} w={1.2} d={1.2} h={1.4} look="ghost" />
    </>
  );
}

const DRAWINGS: Record<Drawing, () => React.ReactNode> = { room: Room, three: Three, ours: Ours };

/**
 * Eva's band: the title on the left and what Eva does on the right in one
 * row, three cards, each a line drawing over its name and line.
 */
export function Assistant() {
  return (
    <section className={`${collection.section} ${styles.assistant}`} aria-labelledby={EVA.id}>
      <div className={collection.splitHead}>
        <h2 id={EVA.id} className={collection.heading}>
          <span className={collection.headingLabel}>{EVA.label}</span>
          {EVA.title.map((t) => (
            <span key={t} className={collection.splitLine}>
              {t}
            </span>
          ))}
        </h2>
        <p className={collection.splitRest}>{EVA.line}</p>
      </div>
      <ul className={styles.cards}>
        {EVA.tiles.map((t) => {
          const Drawn = DRAWINGS[t.drawing];
          return (
            <li key={t.name} className={styles.card}>
              <svg className={styles.drawing} viewBox="0 0 320 180" aria-hidden="true" focusable="false">
                <Drawn />
              </svg>
              <div className={styles.words}>
                <h3 className={styles.name}>{t.name}</h3>
                <p className={styles.cardLine}>{t.line}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
