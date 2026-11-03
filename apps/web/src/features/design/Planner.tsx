"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import account from "@/features/account/Account.module.css";
import { answerAgain, finishOf, suited, told, useProfile } from "@/features/account/profile";
import { WELCOME } from "@/features/account/welcomeList";
import {
  addOnsOf,
  ARRIVALS,
  FINISHES,
  PIECES,
  priceOfChoice,
  type Arrival,
  type Finish,
} from "@/features/catalog/catalog";
import { useCart } from "@/features/cart/cart";
import collection from "@/features/collection/Collection.module.css";
import choose from "@/features/piece/Piece.module.css";
import { MAILTO } from "@/lib/contact";
import { sgd } from "@/lib/money";
import { pieceOf, routes } from "@/lib/routes";
import { ADDABLE, DESIGN, HDB_ROOMS, KINDS, START, WALLS } from "./designList";
import {
  boxOf,
  check,
  fix,
  shapeOf,
  swingOf,
  wallLength,
  type Opening,
  type Placed,
  type Plan,
  type Room,
  type Shape,
  type Turn,
} from "./room";
import { useRoom } from "./store";
import styles from "./Design.module.css";

/** The space round the room in the drawing, for its walls and sizes, in mm. */
const MARGIN = 400;

/** How thick the walls are drawn, in mm. */
const WALL = 100;

/** A step of the arrow keys and of dragging, in mm; with Shift, a finer one. */
const STEP = 50;
const FINE = 10;

/** The room's least and greatest width or depth, in mm. */
const ROOM_MIN = 1500;
const ROOM_MAX = 9000;

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), Math.max(lo, hi));
const snap = (n: number, step: number) => Math.round(n / step) * step;

/** Where an opening starts along its wall, which way the wall runs, and which way is into the room. */
function frame(o: Opening, r: Room) {
  if (o.wall === "top") return { x: o.at, y: 0, ax: 1, ay: 0, nx: 0, ny: 1 };
  if (o.wall === "bottom") return { x: o.at, y: r.d, ax: 1, ay: 0, nx: 0, ny: -1 };
  if (o.wall === "left") return { x: 0, y: o.at, ax: 0, ay: 1, nx: 1, ny: 0 };
  return { x: r.w, y: o.at, ax: 0, ay: 1, nx: -1, ny: 0 };
}

/** An opening's gap in the wall, painted out in the page's cream. */
function Gap({ o, room }: { o: Opening; room: Room }) {
  const { x, y, ax, ay, nx, ny } = frame(o, room);
  return (
    <rect
      className={styles.gap}
      x={ax ? x : x - (nx > 0 ? WALL : 0)}
      y={ay ? y : y - (ny > 0 ? WALL : 0)}
      width={ax ? o.width : WALL}
      height={ay ? o.width : WALL}
    />
  );
}

/** The door: its gap in the wall, its leaf standing open and the arc it sweeps. */
function Door({ room }: { room: Room }) {
  const { x, y, ax, ay, nx, ny } = frame(room.door, room);
  const r = room.door.width;
  const sweep = ax * ny - ay * nx > 0 ? 1 : 0;
  return (
    <g className={styles.door}>
      <Gap o={room.door} room={room} />
      <path d={`M${x} ${y}L${x + nx * r} ${y + ny * r}`} />
      <path
        className={styles.swing}
        d={`M${x + ax * r} ${y + ay * r}A${r} ${r} 0 0 ${sweep} ${x + nx * r} ${y + ny * r}`}
      />
    </g>
  );
}

/** The window: a gap in the wall crossed by the glass's three lines. */
function Window({ room }: { room: Room }) {
  const { x, y, ax, ay, nx, ny } = frame(room.window, room);
  const r = room.window.width;
  const at = (t: number) => `M${x - nx * t} ${y - ny * t}L${x - nx * t + ax * r} ${y - ny * t + ay * r}`;
  return (
    <g className={styles.window}>
      <Gap o={room.window} room={room} />
      <path d={`${at(0)}${at(WALL / 2)}${at(WALL)}`} />
    </g>
  );
}

/** Where a piece's front runs, in its own box, and which way is out of it. */
const FACE: Record<
  Turn,
  (w: number, h: number) => { x: number; y: number; ax: number; ay: number; nx: number; ny: number }
> = {
  0: (_w, h) => ({ x: 0, y: h, ax: 1, ay: 0, nx: 0, ny: 1 }),
  90: () => ({ x: 0, y: 0, ax: 0, ay: 1, nx: -1, ny: 0 }),
  180: () => ({ x: 0, y: 0, ax: 1, ay: 0, nx: 0, ny: -1 }),
  270: (w) => ({ x: w, y: 0, ax: 0, ay: 1, nx: 1, ny: 0 }),
};

/**
 * A piece's doors standing open: each leaf and the arc it sweeps, hinged
 * at alternate ends so pairs open from the middle as a wardrobe's do.
 */
function Swings({ s, w, h, turn }: { s: Shape; w: number; h: number; turn: Turn }) {
  const leaf = swingOf(s);
  if (!leaf) return null;
  const f = FACE[turn](w, h);
  return (
    <g className={styles.leaves}>
      {Array.from({ length: s.leaves ?? 0 }, (_, i) => {
        const at = i % 2 === 0 ? i * leaf : (i + 1) * leaf;
        const dir = i % 2 === 0 ? 1 : -1;
        const hx = f.x + f.ax * at;
        const hy = f.y + f.ay * at;
        const ux = f.ax * dir;
        const uy = f.ay * dir;
        const sweep = ux * f.ny - uy * f.nx > 0 ? 1 : 0;
        const ox = hx + f.nx * leaf;
        const oy = hy + f.ny * leaf;
        return (
          <path
            key={i}
            d={`M${hx} ${hy}L${ox} ${oy}M${hx + ux * leaf} ${hy + uy * leaf}A${leaf} ${leaf} 0 0 ${sweep} ${ox} ${oy}`}
          />
        );
      })}
    </g>
  );
}

/**
 * The room planner: the room drawn from above at real size on the left,
 * and on the right the room's walls, what to add, the piece picked, and
 * Eva's notes, which are the checks in `room.ts` said plainly. Everything
 * is kept in the browser as it changes.
 */
export function Planner() {
  const [plan, setPlan] = useRoom();
  const [picked, setPicked] = useState<string | null>(null);
  const profile = useProfile();
  const lean = profile && finishOf(profile);
  // the piece to add starts on the one the welcome's answers suit best, until another is chosen
  const best = profile && suited(profile)[0];
  const [chosenAdd, setAdding] = useState<string | null>(null);
  const adding =
    chosenAdd ?? ADDABLE.find((x) => best && "slug" in x && x.slug === best.slug)?.key ?? ADDABLE[0]?.key ?? "";
  const [added, setAdded] = useState(0);
  const cart = useCart();
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const { room } = plan;
  const issues = check(plan);
  const flagged = new Set(issues.flatMap((i) => i.ids));
  const chosen = plan.pieces.find((p) => p.id === picked);
  const chosenShape = chosen && shapeOf(chosen);

  const setRoom = (r: Partial<Room>) => setPlan({ ...plan, room: { ...room, ...r } });
  const setPiece = (id: string, change: (p: Placed) => Placed) =>
    setPlan({ ...plan, pieces: plan.pieces.map((p) => (p.id === id ? change(p) : p)) });

  /** Keeps a piece's corner where the whole of it stays inside the walls. */
  const within = (p: Placed): Placed => {
    const s = shapeOf(p);
    if (!s) return p;
    const b = boxOf(p, s);
    return { ...p, x: clamp(p.x, 0, room.w - b.w), y: clamp(p.y, 0, room.d - b.h) };
  };

  /** A quarter turn about the piece's middle, so it turns where it stands. */
  const turn = (p: Placed): Placed => {
    const s = shapeOf(p);
    if (!s) return p;
    const b = boxOf(p, s);
    return within({
      ...p,
      turn: ((p.turn + 90) % 360) as Placed["turn"],
      x: p.x + (b.w - b.h) / 2,
      y: p.y + (b.h - b.w) / 2,
    });
  };

  const remove = (id: string) => {
    setPlan({ ...plan, pieces: plan.pieces.filter((p) => p.id !== id) });
    setPicked(null);
  };

  const add = () => {
    const a = ADDABLE.find((x) => x.key === adding);
    if (!a) return;
    const id = `${a.key}-${Date.now()}`;
    const fresh = a.group === "own" ? { id, own: a.own } : { id, slug: a.slug, size: a.size };
    // into the middle of the room, then Eva's search moves it somewhere it fits
    const next: Plan = {
      ...plan,
      pieces: [...plan.pieces, within({ ...fresh, x: room.w / 2, y: room.d / 2, turn: 0 })],
    };
    setPlan(fix(next, id));
    setPicked(id);
  };

  /** Where the pointer is, in the room's mm. */
  const point = (e: PointerEvent) => {
    const m = svg.current?.getScreenCTM();
    if (!m) return null;
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
  };

  const grab = (e: PointerEvent<SVGGElement>, p: Placed) => {
    const at = point(e);
    if (!at) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: p.id, dx: at.x - p.x, dy: at.y - p.y };
    setPicked(p.id);
  };

  const move = (e: PointerEvent<SVGGElement>) => {
    const d = drag.current;
    const at = d && point(e);
    if (!d || !at) return;
    setPiece(d.id, (p) => within({ ...p, x: snap(at.x - d.dx, STEP), y: snap(at.y - d.dy, STEP) }));
  };

  const keys = (e: KeyboardEvent<SVGGElement>, p: Placed) => {
    const step = e.shiftKey ? FINE : STEP;
    const by: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const d = by[e.key];
    if (d) setPiece(p.id, (q) => within({ ...q, x: q.x + d[0], y: q.y + d[1] }));
    else if (e.key === "r" || e.key === "R") setPiece(p.id, turn);
    else if (e.key === "Delete" || e.key === "Backspace") remove(p.id);
    else return;
    e.preventDefault();
  };

  // our pieces as cart lines: the finish and arrival chosen here, or the
  // finish leaned to in the welcome, else the piece's first finish, and, for a modular one, in parts, shown to change
  const ours = plan.pieces.flatMap((p) => {
    const piece = PIECES.find((x) => x.slug === p.slug);
    const size = piece?.sizes[p.size ?? 0];
    if (!piece || !size) return [];
    const finish = p.finish ?? (lean && piece.finishes.includes(lean) ? lean : piece.finishes[0]) ?? "birch";
    const arrival = p.arrival !== undefined ? p.arrival : piece.line === "modular" ? "parts" : null;
    const addOns = p.addOns ?? [];
    return [
      {
        id: p.id,
        piece,
        size: p.size ?? 0,
        finish,
        arrival,
        addOns,
        price: priceOfChoice(piece, size, arrival, null, addOns),
      },
    ];
  });
  const total = ours.reduce((n, o) => n + o.price, 0);

  const toCart = () => {
    ours.forEach((o) =>
      cart.add({ piece: o.piece.slug, size: o.size, finish: o.finish, arrival: o.arrival, addOns: o.addOns }),
    );
    setAdded(ours.length);
  };

  const send = () => {
    const placed = plan.pieces.map((p) => {
      const s = shapeOf(p);
      const o = ours.find((x) => x.id === p.id);
      const choice = o ? ` (${o.finish}${o.arrival ? `, ${ARRIVALS[o.arrival].name.toLowerCase()}` : ""})` : "";
      return `${s?.name ?? "?"}${choice}: ${p.x} mm from the left wall, ${p.y} mm from the top wall, turned ${p.turn}°`;
    });
    const body = [
      `${room.kind}, ${room.w} × ${room.d} mm`,
      `Door: ${room.door.wall} wall, ${room.door.at} mm from the corner, ${room.door.width} mm wide`,
      `Window: ${room.window.wall} wall, ${room.window.at} mm from the corner, ${room.window.width} mm wide, sill ${room.window.sill} mm`,
      "",
      ...placed,
    ].join("\n");
    // an email address, not a page, so the mail app opens and the page stays
    window.open(
      `${MAILTO}?subject=${encodeURIComponent(DESIGN.list.subject)}&body=${encodeURIComponent(body)}`,
      "_self",
    );
  };

  const num = (n: number, set: (v: number) => void, lo: number, hi: number) => ({
    type: "number" as const,
    inputMode: "numeric" as const,
    step: STEP,
    min: lo,
    max: hi,
    value: n,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      if (Number.isFinite(v)) set(clamp(Math.round(v), lo, hi));
    },
  });

  const opening = (key: "door" | "window") => {
    const o = room[key];
    const set = (c: Partial<Opening>) => {
      const next = { ...o, ...c };
      setRoom({ [key]: { ...next, at: clamp(next.at, 0, wallLength(next.wall, room) - next.width) } });
    };
    return (
      <fieldset className={styles.opening}>
        <legend className={account.fieldLabel}>{DESIGN.room[key]}</legend>
        <label className={account.field}>
          <span className={styles.small}>{DESIGN.room.wall}</span>
          <select value={o.wall} onChange={(e) => set({ wall: e.target.value as Opening["wall"] })}>
            {WALLS.map((w) => (
              <option key={w.wall} value={w.wall}>
                {w.name}
              </option>
            ))}
          </select>
        </label>
        <label className={account.field}>
          <span className={styles.small}>{DESIGN.room.at}</span>
          <input {...num(o.at, (at) => set({ at }), 0, wallLength(o.wall, room) - o.width)} />
        </label>
        <label className={account.field}>
          <span className={styles.small}>{DESIGN.room.width}</span>
          <input {...num(o.width, (width) => set({ width }), 400, 2400)} />
        </label>
        {key === "window" && (
          <label className={account.field}>
            <span className={styles.small}>{DESIGN.room.sill}</span>
            <input {...num(room.window.sill, (sill) => setRoom({ window: { ...room.window, sill } }), 0, 2000)} />
          </label>
        )}
      </fieldset>
    );
  };

  return (
    <section className={styles.planner} aria-label={DESIGN.label}>
      <div className={styles.stage}>
        <svg
          ref={svg}
          className={styles.plan}
          viewBox={`${-MARGIN} ${-MARGIN} ${room.w + MARGIN * 2} ${room.d + MARGIN * 2}`}
          role="group"
          aria-label={DESIGN.plan}
          onPointerDown={(e) => e.target === e.currentTarget && setPicked(null)}
        >
          <rect
            className={styles.walls}
            x={-WALL / 2}
            y={-WALL / 2}
            width={room.w + WALL}
            height={room.d + WALL}
            strokeWidth={WALL}
          />
          <Window room={room} />
          <Door room={room} />
          <text className={styles.size} x={room.w / 2} y={-WALL - 110}>
            {room.w} mm
          </text>
          <text
            className={styles.size}
            x={-WALL - 110}
            y={room.d / 2}
            transform={`rotate(-90 ${-WALL - 110} ${room.d / 2})`}
          >
            {room.d} mm
          </text>
          {plan.pieces.map((p) => {
            const s = shapeOf(p);
            if (!s) return null;
            const b = boxOf(p, s);
            const front = { 0: [0, b.h, b.w, b.h], 90: [0, 0, 0, b.h], 180: [0, 0, b.w, 0], 270: [b.w, 0, b.w, b.h] }[
              p.turn
            ];
            return (
              <g
                key={p.id}
                className={styles.piece}
                transform={`translate(${b.x} ${b.y})`}
                data-picked={p.id === picked || undefined}
                data-flagged={flagged.has(p.id) || undefined}
                role="button"
                tabIndex={0}
                aria-pressed={p.id === picked}
                aria-label={`${s.name}, ${p.x} mm from the left wall, ${p.y} mm from the top`}
                onPointerDown={(e) => grab(e, p)}
                onPointerMove={move}
                onPointerUp={() => (drag.current = null)}
                onKeyDown={(e) => keys(e, p)}
                onFocus={() => setPicked(p.id)}
              >
                <rect width={b.w} height={b.h} />
                <line className={styles.front} x1={front[0]} y1={front[1]} x2={front[2]} y2={front[3]} />
                <Swings s={s} w={b.w} h={b.h} turn={p.turn} />
                {/* the name along the piece's long side, so a piece standing upright reads up it */}
                <text x={b.w / 2} y={b.h / 2} transform={b.h > b.w ? `rotate(-90 ${b.w / 2} ${b.h / 2})` : undefined}>
                  {s.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.side}>
        {/* what the welcome heard, so Eva's start is plain, and the way to change it */}
        <div className={styles.block}>
          <h2 className={styles.title}>{WELCOME.told.title}</h2>
          <p className={styles.line}>{profile ? told(profile) : WELCOME.told.none}</p>
          <Link className={`${account.link} ${styles.small}`} href={answerAgain(routes.designYourRoom)}>
            {WELCOME.again}
          </Link>
        </div>
        <div className={styles.block}>
          <h2 className={styles.title}>{DESIGN.eva.title}</h2>
          <p className={styles.small}>{DESIGN.eva.rest}</p>
          {issues.length === 0 ? (
            <p className={styles.line}>{DESIGN.eva.clear}</p>
          ) : (
            <ul className={styles.notes}>
              {issues.map((i) => (
                <li key={i.line} className={styles.note} data-level={i.level}>
                  <span className={styles.small}>{i.level === "stop" ? DESIGN.eva.stop : DESIGN.eva.note}</span>
                  {i.ids[0] ? (
                    <button className={styles.noteGo} type="button" onClick={() => setPicked(i.ids[0] ?? null)}>
                      {i.line}
                    </button>
                  ) : (
                    <span className={styles.line}>{i.line}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p className={styles.small}>{DESIGN.eva.limits}</p>
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>{DESIGN.chosen.title}</h2>
          {chosen && chosenShape ? (
            <>
              <p className={styles.line}>
                {chosenShape.name}, {chosenShape.w} × {chosenShape.d} mm
              </p>
              <div className={styles.actions}>
                <button className={collection.outline} type="button" onClick={() => setPiece(chosen.id, turn)}>
                  {DESIGN.chosen.turn}
                </button>
                <button className={collection.outline} type="button" onClick={() => setPlan(fix(plan, chosen.id))}>
                  {DESIGN.chosen.fix}
                </button>
                <button className={collection.outline} type="button" onClick={() => remove(chosen.id)}>
                  {DESIGN.chosen.remove}
                </button>
              </div>
            </>
          ) : (
            <p className={styles.line}>{DESIGN.chosen.none}</p>
          )}
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>{DESIGN.add.title}</h2>
          <div className={styles.addRow}>
            <label className={account.field}>
              <span className="visually-hidden">{DESIGN.add.title}</span>
              <select value={adding} onChange={(e) => setAdding(e.target.value)}>
                <optgroup label={DESIGN.add.ours}>
                  {ADDABLE.filter((a) => a.group === "ours").map((a) => (
                    <option key={a.key} value={a.key}>
                      {a.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label={DESIGN.add.own}>
                  {ADDABLE.filter((a) => a.group === "own").map((a) => (
                    <option key={a.key} value={a.key}>
                      {a.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </label>
            <button className={collection.outline} type="button" onClick={add}>
              {DESIGN.add.go}
            </button>
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>{DESIGN.room.title}</h2>
          <div className={styles.fields}>
            <label className={account.field}>
              <span className={styles.small}>{DESIGN.room.from}</span>
              <select
                value={HDB_ROOMS.find((h) => JSON.stringify(h.room) === JSON.stringify(room))?.key ?? ""}
                onChange={(e) => {
                  const h = HDB_ROOMS.find((x) => x.key === e.target.value);
                  if (h) setRoom(h.room);
                }}
              >
                <option value="">{DESIGN.room.own}</option>
                {HDB_ROOMS.map((h) => (
                  <option key={h.key} value={h.key}>
                    {h.name}
                  </option>
                ))}
              </select>
            </label>
            <p className={styles.small}>{DESIGN.room.fromNote}</p>
            <label className={account.field}>
              <span className={styles.small}>{DESIGN.room.kind}</span>
              <select value={room.kind} onChange={(e) => setRoom({ kind: e.target.value as Room["kind"] })}>
                {KINDS.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </label>
            <div className={styles.pair}>
              <label className={account.field}>
                <span className={styles.small}>{DESIGN.room.w}</span>
                <input {...num(room.w, (w) => setRoom({ w }), ROOM_MIN, ROOM_MAX)} />
              </label>
              <label className={account.field}>
                <span className={styles.small}>{DESIGN.room.d}</span>
                <input {...num(room.d, (d) => setRoom({ d }), ROOM_MIN, ROOM_MAX)} />
              </label>
            </div>
            {opening("door")}
            {opening("window")}
            <p className={styles.small}>{DESIGN.room.sillNote}</p>
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>{DESIGN.list.title}</h2>
          {ours.length === 0 ? (
            <p className={styles.line}>{DESIGN.list.empty}</p>
          ) : (
            <>
              <ul className={styles.list}>
                {ours.map((o) => (
                  <li key={o.id} className={styles.choice}>
                    <div className={styles.item}>
                      <Link className={account.link} href={pieceOf(o.piece.slug)}>
                        {o.piece.name}
                      </Link>
                      <span>{sgd(o.price)}</span>
                    </div>
                    <div className={styles.pair}>
                      <label className={account.field}>
                        <span className={styles.small}>{DESIGN.list.finish}</span>
                        <select
                          value={o.finish}
                          onChange={(e) => setPiece(o.id, (p) => ({ ...p, finish: e.target.value as Finish["slug"] }))}
                        >
                          {FINISHES.filter((f) => o.piece.finishes.includes(f.slug)).map((f) => (
                            <option key={f.slug} value={f.slug}>
                              {f.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      {o.arrival && (
                        <label className={account.field}>
                          <span className={styles.small}>{DESIGN.list.arrives}</span>
                          <select
                            value={o.arrival}
                            onChange={(e) => setPiece(o.id, (p) => ({ ...p, arrival: e.target.value as Arrival }))}
                          >
                            {(Object.keys(ARRIVALS) as Arrival[]).map((a) => (
                              <option key={a} value={a}>
                                {ARRIVALS[a].name}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    {addOnsOf(o.piece.slug).length > 0 && (
                      <div className={styles.actions}>
                        {addOnsOf(o.piece.slug).map((a) => (
                          <label key={a.id} className={choose.option}>
                            <input
                              type="checkbox"
                              checked={o.addOns.includes(a.id)}
                              onChange={(e) =>
                                setPiece(o.id, (p) => ({
                                  ...p,
                                  addOns: e.target.checked ? [...o.addOns, a.id] : o.addOns.filter((x) => x !== a.id),
                                }))
                              }
                            />
                            <span>{a.name}</span>
                            <span className={choose.arrivalMeta}>+{sgd(a.price)}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                <li className={`${styles.item} ${styles.total}`}>
                  <span>{DESIGN.list.together}</span>
                  <span>{sgd(total)}</span>
                </li>
              </ul>
              <p className={styles.small}>{DESIGN.list.extras}</p>
            </>
          )}
          {added > 0 && (
            <p className={styles.line} role="status">
              {DESIGN.list.added(added)}{" "}
              <Link className={account.link} href={routes.cart}>
                {DESIGN.list.see}
              </Link>
            </p>
          )}
          <div className={styles.actions}>
            {ours.length > 0 && (
              <button className={collection.outline} type="button" onClick={toCart}>
                {DESIGN.list.toCart}
              </button>
            )}
            <button className={collection.outline} type="button" onClick={send}>
              {DESIGN.list.send}
            </button>
            <button
              className={collection.outline}
              type="button"
              onClick={() => {
                setPlan(START);
                setPicked(null);
              }}
            >
              {DESIGN.list.reset}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
