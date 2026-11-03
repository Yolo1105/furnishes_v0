import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./Collection.module.css";

type Call = { label: string; href: string };

export type ClosingBand = {
  label: string;
  title: string;
  line: string;
  photo: StaticImageData;
  calls: readonly [Call, Call];
};

/** A page's link or a mail link: Next's Link only for the site's own pages. */
function Go({ call, className }: { call: Call; className: string | undefined }) {
  return call.href.startsWith("/") ? (
    <Link className={className} href={call.href}>
      {call.label}
    </Link>
  ) : (
    <a className={className} href={call.href}>
      {call.label}
    </a>
  );
}

/**
 * The page's last word before the footer, as the owner's earlier studio
 * page had it: a room across the whole width under a warm shade, its label
 * at the top, and the title, a line and two calls held at the foot.
 */
export function Closing({ band }: { band: ClosingBand }) {
  return (
    <section className={styles.closing} aria-labelledby="closing-title">
      <div className={styles.closingPhoto}>
        <Image src={band.photo} alt="" fill sizes="100vw" placeholder="blur" />
      </div>
      <div className={styles.closingWords}>
        <p className={styles.closingLabel}>{band.label}</p>
        <h2 id="closing-title" className={styles.closingTitle}>
          {band.title}
        </h2>
        <p className={styles.closingLine}>{band.line}</p>
        <div className={styles.closingCalls}>
          <Go call={band.calls[0]} className={styles.closingFirst} />
          <Go call={band.calls[1]} className={styles.photoGo} />
        </div>
      </div>
    </section>
  );
}
