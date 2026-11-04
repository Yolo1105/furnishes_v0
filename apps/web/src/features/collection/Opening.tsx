import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import styles from "./Collection.module.css";

/**
 * A page's opening, for the pages without a banner: the label and the title
 * large across the page, two rooms wide under it, then a line on the left
 * and on the right the paragraphs, or whatever the page puts there. A page
 * with no photos leaves the row out. Set further down a page, as About's
 * on the home page, it is a section: an h2 under the page's own h1, its
 * own ids, and photos that load as they come into view.
 */
export function Opening({
  label,
  title,
  sub,
  photos,
  rest,
  lines = [],
  children,
  id = "opening",
  section = false,
}: {
  label: string;
  title: string;
  /** a line under the title, as every home section's subtitle */
  sub?: string;
  photos: readonly { src: StaticImageData; alt: string }[];
  rest: string;
  lines?: readonly string[];
  children?: ReactNode;
  id?: string;
  section?: boolean;
}) {
  const Title = section ? "h2" : "h1";
  return (
    <section id={section ? id : undefined} className={styles.opening} aria-labelledby={`${id}-title`}>
      <Title
        id={`${id}-title`}
        className={section ? `${styles.openingTitle} ${styles.openingTitleSection}` : styles.openingTitle}
      >
        <span className={styles.headingLabel}>{label}</span>
        {title}
        {sub && <span className={styles.headingRest}> {sub}</span>}
      </Title>
      {photos.length > 0 && (
        <div className={styles.openingPhotos}>
          {photos.map((p) => (
            <div key={p.alt} className={styles.openingPhoto}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1023px) 50vw, 48vw" priority={!section} />
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
