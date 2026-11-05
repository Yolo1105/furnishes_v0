import Image from "next/image";
import shared from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { OFFICE_BAND } from "./officesList";
import styles from "./OfficeBand.module.css";

/**
 * The offices band before the footer, after the owner's reference: across
 * the page's width on its own ground, the photo on the left and on the right the label, the
 * title, a line and the ask for a quote by email.
 */
export function OfficeBand() {
  const b = OFFICE_BAND;
  return (
    <section className={styles.section} aria-labelledby="office-band-title" data-flush-end>
      <div className={styles.band}>
        <div className={styles.photo}>
          <Image src={b.photo.src} alt={b.photo.alt} fill sizes="(max-width: 1023px) 100vw, 45vw" />
        </div>
        <div className={styles.words}>
          <h2 id="office-band-title" className={`${shared.heading} ${styles.title}`}>
            <span className={shared.headingLabel}>{b.label}</span>
            {b.title}
          </h2>
          <p className={styles.line}>{b.line}</p>
          <a className={shared.splitGo} href={b.go.href}>
            {b.go.label}
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
