import type { ReactNode } from "react";
import styles from "./Collection.module.css";

/** The site's small marks, each drawn in a thin line on a 24 unit square. */
const PATHS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  reply: <path d="M4 5h16v11H9l-5 4z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  spark: <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
    </>
  ),
  office: (
    <>
      <rect x="5" y="3" width="14" height="18" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" />
    </>
  ),
  change: <path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4" />,
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </>
  ),
  arrow: <path d="M7 17L17 7M9 7h8v8" />,
  // the order's steps: a basket, a saw blade, a box, a ship, a house
  basket: <path d="M3 9h18l-2 11H5zM8 9l4-6 4 6M9 13v4M15 13v4" />,
  make: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
    </>
  ),
  box: <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />,
  ship: <path d="M3 15h18l-3 5H6zM6 15V9h12v6M12 9V4M9 4h6" />,
  home: <path d="M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-6h4v6" />,
  headset: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="4" height="6" />
      <rect x="17" y="14" width="4" height="6" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

/** A small bare mark, after the owner's references; decoration, so hidden from readers. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
