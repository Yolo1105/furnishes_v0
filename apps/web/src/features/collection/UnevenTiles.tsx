import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { Section } from "./Sections";
import styles from "./Collection.module.css";

export type Tile = { name: string; line: string; photo: StaticImageData; wide: boolean; href: string };

/** Ways in as tiles, a wide one and a narrow one a row: the words on the left, the room on the right. */
export function UnevenTiles({
  id,
  label,
  title,
  rest,
  tiles,
}: {
  id: string;
  label: string;
  title: string;
  rest: string;
  tiles: readonly Tile[];
}) {
  return (
    <Section id={id} label={label} title={title} rest={rest}>
      <ul className={styles.kinds}>
        {tiles.map((t) => (
          <li key={t.name} className={t.wide ? styles.wide : styles.narrow}>
            <Link className={styles.kindTile} href={t.href}>
              <span className={styles.kindWords}>
                <span className={styles.kindName}>{t.name}</span>
                <span className={styles.kindLine}>{t.line}</span>
                <span className={styles.kindGo}>Explore</span>
              </span>
              <span className={styles.kindPhoto}>
                <Image src={t.photo} alt="" fill sizes="(max-width: 639px) 100vw, 30vw" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
