import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import styles from "./Collection.module.css";

/**
 * A page's opening, for the pages without a banner: the label and the title
 * large across the page, two rooms wide under it, then a line on the left
 * and on the right the paragraphs, or whatever the page puts there. A page
 * with no photos leaves the row out.
 */
export function Opening({
  label,
  title,
  photos,
  rest,
  lines = [],
  children,
}: {
  label: string;
  title: string;
  photos: readonly { src: StaticImageData; alt: string }[];
  rest: string;
  lines?: readonly string[];
  children?: ReactNode;
}) {
  return (
    <section className={styles.opening} aria-labelledby="opening-title">
      <h1 id="opening-title" className={styles.openingTitle}>
        <span className={styles.headingLabel}>{label}</span>
        {title}
      </h1>
      {photos.length > 0 && (
        <div className={styles.openingPhotos}>
          {photos.map((p) => (
            <div key={p.alt} className={styles.openingPhoto}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1023px) 50vw, 48vw" priority />
            </div>
          ))}
        </div>
      )}
      <p className={styles.openingRest}>{rest}</p>
      <div className={styles.openingSide}>
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        {children}
      </div>
    </section>
  );
}
