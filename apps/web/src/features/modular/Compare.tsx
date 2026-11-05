"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./Modular.module.css";

type Shot = { photo: StaticImageData; alt: string };

/**
 * Two pictures you drag across: the second laid over the first and cut
 * back to the handle, a chip on the handle saying so. The handle is a real
 * range input, so keys and screen readers move it too. `fit` sizes it to
 * its column at 4:3 rather than most of a screen.
 */
export function Compare({
  before,
  after,
  label,
  fit = false,
}: {
  before: Shot;
  after: Shot;
  label: string;
  fit?: boolean;
}) {
  const [at, setAt] = useState(50);
  return (
    <div
      className={fit ? `${styles.compare} ${styles.compareFit}` : styles.compare}
      style={{ "--at": `${at}%` } as CSSProperties}
    >
      <Image src={before.photo} alt={before.alt} fill sizes={fit ? "(max-width: 1023px) 100vw, 60vw" : "100vw"} />
      <span className={styles.after}>
        <Image src={after.photo} alt={after.alt} fill sizes={fit ? "(max-width: 1023px) 100vw, 60vw" : "100vw"} />
      </span>
      <span className={styles.handle} aria-hidden="true">
        <span className={styles.chip}>Drag to explore</span>
      </span>
      <input
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={at}
        aria-label={label}
        onChange={(e) => setAt(Number(e.target.value))}
      />
    </div>
  );
}
