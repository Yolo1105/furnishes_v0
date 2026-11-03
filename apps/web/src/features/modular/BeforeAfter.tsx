"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import shared from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { pieceBySlug } from "@/features/catalog/catalog";
import { pieceOf } from "@/lib/routes";
import { BEFORE_AFTER } from "./modularList";
import styles from "./Modular.module.css";

/**
 * One room before and after one piece, as one large pair you drag across:
 * the after render laid over the before and cut back to the handle. The
 * handle is a real range input, so keys and screen readers move it too.
 */
export function BeforeAfter() {
  const [at, setAt] = useState(50);
  const piece = pieceBySlug(BEFORE_AFTER.piece);
  return (
    <Section id="before-title" label={BEFORE_AFTER.label} title={BEFORE_AFTER.title} rest={BEFORE_AFTER.rest}>
      <div className={styles.compare} style={{ "--at": `${at}%` } as CSSProperties}>
        <Image src={BEFORE_AFTER.before.photo} alt={BEFORE_AFTER.before.alt} fill sizes="100vw" />
        <span className={styles.after}>
          <Image src={BEFORE_AFTER.after.photo} alt={BEFORE_AFTER.after.alt} fill sizes="100vw" />
        </span>
        <span className={styles.handle} aria-hidden="true" />
        <input
          className={styles.range}
          type="range"
          min={0}
          max={100}
          value={at}
          aria-label="Before and after"
          onChange={(e) => setAt(Number(e.target.value))}
        />
      </div>
      <p className={styles.compareFoot}>
        <span>Before</span>
        {piece && (
          <Link className={shared.qaMail} href={pieceOf(piece.slug)}>
            {piece.name}
          </Link>
        )}
        <span>After</span>
      </p>
    </Section>
  );
}
