import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./TypeRoles.module.css";

/* The type roles from globals.css, in words v0 already uses, for the owner
   to check. Not linked from the site; it goes once the home page shows every
   role. The versions they were picked from are in the zip. */
export const metadata: Metadata = { title: "Type roles", robots: { index: false } };

const ROWS: { name: string; sample: ReactNode }[] = [
  { name: "Banner", sample: <p className="type-banner">Furniture</p> },
  { name: "Page title", sample: <h1 className="type-page-title">Modular furniture, sized to your room</h1> },
  {
    name: "Label, section title, the line under it, and body",
    sample: (
      <div>
        <div className={styles.head}>
          <p className={`type-label ${styles.headLabel}`}>Line one</p>
          <h2 className="type-section-title">What we sell</h2>
          <p className={`type-lead ${styles.headRest}`}>Starting with ready-made pieces</p>
        </div>
        <p className={`type-body ${styles.content}`}>
          Furniture for Singapore homes and offices, in two kinds. Ready-made pieces in set sizes, and modular pieces
          built from parts and cut to your wall. <a href="#main">A link inside a sentence</a>.
        </p>
      </div>
    ),
  },
  {
    name: "Section title in two lines",
    sample: (
      <h2 className="type-section-title">
        Start at the door,
        <span className="type-section-soft">and walk through every room.</span>
      </h2>
    ),
  },
  {
    name: "Card title and card line",
    sample: (
      <div className={styles.stack}>
        <h3 className="type-card-title">Samples</h3>
        <p className="type-card-line">Ask for finish samples by email, and we send them to you.</p>
      </div>
    ),
  },
  { name: "Small", sample: <p className="type-small">Home visits on request</p> },
  { name: "Running words", sample: <p className="type-run">Design·</p> },
];

export default function TypeRolesPage() {
  return (
    <main id="main" className={styles.sheet}>
      {ROWS.map((row) => (
        <section key={row.name} className={styles.row}>
          <p className={`type-small ${styles.name}`}>{row.name}</p>
          {row.sample}
        </section>
      ))}
    </main>
  );
}
