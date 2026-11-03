import Image from "next/image";
import Link from "next/link";
import { ROOMS } from "@/features/quiz/quizList";
import { ROOM_CARDS } from "./collectionList";
import { Section } from "./Sections";
import styles from "./Collection.module.css";

const rooms = ROOMS.filter((r) => ROOM_CARDS.names.includes(r.name));

/** Four rooms in a row, each one link: its photo, then its name and line. */
export function RoomCards() {
  return (
    <Section id="room-cards-title" label="Rooms" title={ROOM_CARDS.title} rest={ROOM_CARDS.rest}>
      <ul className={styles.roomCards}>
        {rooms.map((r) => (
          <li key={r.name}>
            <Link className={styles.roomCard} href={r.href}>
              <span className={styles.roomPhoto}>
                <Image src={r.photo} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" />
              </span>
              <span className={styles.roomName}>{r.name}</span>
              <span className={styles.roomLine}>{r.line}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
