"use client";

import Link from "next/link";
import { answerAgain, suited, told, useProfile } from "@/features/account/profile";
import { WELCOME } from "@/features/account/welcomeList";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import { routes } from "@/lib/routes";
import styles from "./Collection.module.css";

/** Four pieces, as many as a row of the grid holds. */
const MOST = 4;

/**
 * The pieces the welcome's answers suit best, with what was heard under the
 * title and the way to answer again. Nothing shows until there are answers,
 * so a visitor who never logged in sees the page as it was.
 */
export function ForYou() {
  const profile = useProfile();
  if (!profile) return null;
  return (
    <section className={styles.section} aria-labelledby="for-you-title">
      <div className={styles.head}>
        <h2 id="for-you-title" className={styles.heading}>
          <span className={styles.headingLabel}>For you</span>
          {WELCOME.told.title} <span className={styles.headingRest}>{told(profile)}</span>
        </h2>
        <Link className={styles.all} href={answerAgain(routes.collection)}>
          {WELCOME.again}
        </Link>
      </div>
      <ul className={catalog.grid}>
        {suited(profile)
          .slice(0, MOST)
          .map((p) => (
            <PieceCard key={p.slug} piece={p} />
          ))}
      </ul>
    </section>
  );
}
