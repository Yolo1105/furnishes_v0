"use client";

import Link from "next/link";
import { useState } from "react";
import collection from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import {
  LAYOUT_CALLS,
  LAYOUTS_HEAD,
  OFFICE_LAYOUTS,
  type OfficePlan,
  SIZE_FILTERS,
  type SizeGroup,
} from "./layoutsList";
import styles from "./Layouts.module.css";

// a desk is 1.4m wide and 0.7m deep; a chair, a circle 0.22m across its
// middle, sits 0.25m out from the desk's edge; a door is 0.9m wide
const DESK_W = 1.4;
const DESK_D = 0.7;
const CHAIR_R = 0.22;
const CHAIR_GAP = 0.25;
const DOOR = 0.9;

/**
 * A layout's plan, drawn to scale in metres: the walls with the door's gap
 * and swing, then storage, the desk blocks with their chairs, the meeting
 * table and the dividers. Decoration beside the words, so hidden from
 * readers; the card says in words what it shows.
 */
function Plan({ plan }: { plan: OfficePlan }) {
  const { w, d, door } = plan;
  const pad = 0.3;
  return (
    <svg
      className={styles.plan}
      viewBox={`${-pad} ${-pad} ${w + pad * 2} ${d + pad * 2}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect className={styles.floor} width={w} height={d} />
      {plan.storage?.map((s) => (
        <rect key={`${s.x}-${s.y}`} className={styles.storage} x={s.x} y={s.y} width={s.w} height={s.d} />
      ))}
      {plan.desks.flatMap((b) =>
        Array.from({ length: b.rows * b.cols }, (_, i) => {
          const r = Math.floor(i / b.cols);
          const c = i % b.cols;
          const x = b.x + c * DESK_W;
          const top = b.y + CHAIR_GAP + CHAIR_R + r * DESK_D;
          // the first row's chairs face it from above; a second row's, or a lone row's, from below
          const chairY = r === 0 && b.rows === 2 ? b.y + CHAIR_R : top + DESK_D + CHAIR_GAP;
          return (
            <g key={`${b.x}-${b.y}-${i}`}>
              <rect className={styles.desk} x={x + 0.03} y={top} width={DESK_W - 0.06} height={DESK_D} />
              <circle className={styles.chair} cx={x + DESK_W / 2} cy={chairY} r={CHAIR_R} />
            </g>
          );
        }),
      )}
      {plan.meeting && (
        <g>
          <rect
            className={styles.desk}
            x={plan.meeting.x}
            y={plan.meeting.y}
            width={plan.meeting.w}
            height={plan.meeting.d}
          />
          {Array.from({ length: plan.meeting.seats }, (_, i) => {
            const m = plan.meeting!;
            const side = Math.ceil(m.seats / 2);
            const along = i % side;
            const wide = m.w >= m.d;
            const step = (wide ? m.w : m.d) / side;
            const offset = step * (along + 0.5);
            const out = CHAIR_R + 0.08;
            const far = i >= side;
            return wide ? (
              <circle
                key={i}
                className={styles.chair}
                cx={m.x + offset}
                cy={far ? m.y + m.d + out : m.y - out}
                r={CHAIR_R}
              />
            ) : (
              <circle
                key={i}
                className={styles.chair}
                cx={far ? m.x + m.w + out : m.x - out}
                cy={m.y + offset}
                r={CHAIR_R}
              />
            );
          })}
        </g>
      )}
      {plan.dividers?.map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}-${x2}-${y2}`} className={styles.divider} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
      <path className={styles.wall} d={`M${door},${d}H0V0H${w}V${d}H${door + DOOR}`} />
      <path className={styles.swing} d={`M${door},${d}V${d - DOOR}A${DOOR},${DOOR} 0 0 1 ${door + DOOR},${d}`} />
    </svg>
  );
}

/**
 * Office layouts by team size, after the owner's reference: a row of size
 * filters, then a card for each layout with its name, area, where it suits
 * and what goes in, its plan, and two ways on.
 */
export function Layouts() {
  const [size, setSize] = useState<SizeGroup | "all">("all");
  const shown = size === "all" ? OFFICE_LAYOUTS : OFFICE_LAYOUTS.filter((l) => l.group === size);

  return (
    <Section id={LAYOUTS_HEAD.id} label={LAYOUTS_HEAD.label} title={LAYOUTS_HEAD.title} rest={LAYOUTS_HEAD.rest}>
      <div className={styles.filters} role="group" aria-label="Team size">
        {SIZE_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={styles.filter}
            aria-pressed={size === f.id}
            onClick={() => setSize(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className={styles.cards}>
        {shown.map((l) => {
          const quote = LAYOUT_CALLS.quote(l.name);
          return (
            <li key={l.id} className={styles.card}>
              <div className={styles.head}>
                <h3 className={styles.name}>{l.name}</h3>
                <p className={styles.area}>{l.area} m²</p>
                <p className={styles.meta}>
                  <span className={styles.place}>{l.place}</span>
                  {[`${l.people} people`, ...l.details].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </p>
              </div>
              <Plan plan={l.plan} />
              <div className={styles.calls}>
                <a className={styles.quote} href={quote.href}>
                  {quote.label}
                </a>
                <Link className={collection.outline} href={LAYOUT_CALLS.design.href}>
                  {LAYOUT_CALLS.design.label}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
