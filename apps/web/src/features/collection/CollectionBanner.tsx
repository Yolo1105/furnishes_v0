import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { BannerSpots, type Spot } from "./BannerSpots";
import styles from "./Collection.module.css";

type Hero = { label: string; title: string; links: readonly { label: string; href: string }[] };

/** a smaller photo that rises past the banner's as it shrinks; `spot` is its corner */
type Float = { photo: StaticImageData; spot: "top-left" | "top-right" | "low-right" };

type Banner = { photo: StaticImageData; spots?: readonly Spot[]; floats?: readonly Float[] } & (
  { room: string; lead: string; rest: string } | { hero: Hero }
);

/**
 * A collection page's banner: the room's photo filling the screen under the
 * bar, sent as the original file rather than recompressed, and the title
 * with the room's name on it at its bottom left, in cream over a shade.
 * A banner with a `hero` has, instead, a small label, the title and its
 * ways in, as the overview's; `bare` draws its room a little lower in its
 * frame. `spots` marks the pieces in the photo, each opening a card with its
 * name and price. A banner with `floats` stays on screen for a while as the
 * page scrolls: its photo shrinks into a card, the words turn from cream
 * to red as the page shows round them, and the smaller photos rise past it.
 */
export function CollectionBanner({ banner, bare }: { banner: Banner; bare?: boolean }) {
  return (
    <section
      className={bare ? `${styles.banner} ${styles.bare}` : styles.banner}
      data-floats={banner.floats ? "" : undefined}
      aria-labelledby="banner-title"
    >
      <div className={styles.bannerStage}>
        <span className={styles.bannerPhoto}>
          <Image src={banner.photo} alt="" fill priority unoptimized sizes="100vw" />
          {banner.spots && (
            <BannerSpots
              spots={banner.spots}
              photo={banner.photo.src}
              ratio={banner.photo.width / banner.photo.height}
            />
          )}
        </span>
        {banner.floats?.map((f) => (
          <span key={f.spot} className={styles.bannerFloat} data-spot={f.spot} aria-hidden="true">
            <Image src={f.photo} alt="" fill sizes="(max-width: 1023px) 0px, 18vw" />
          </span>
        ))}
        {"hero" in banner ? (
          <div className={styles.heroWords}>
            <p className={styles.heroLabel}>{banner.hero.label}</p>
            <h1 id="banner-title" className={styles.heroTitle}>
              {banner.hero.title}
            </h1>
            <p className={styles.heroLinks}>
              {banner.hero.links.map((l) => (
                <Link key={l.href} className={styles.heroLink} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </p>
          </div>
        ) : (
          <div className={styles.bannerWords}>
            <p className={styles.room}>{banner.room}</p>
            <h1 id="banner-title" className={styles.bannerTitle}>
              {banner.lead} {banner.rest}
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
