import type { Metadata } from "next";
import { Contact } from "@/features/contact/Contact";
import { CONTACT_QUESTIONS } from "@/features/contact/contactList";
import { Questions } from "@/features/collection/Questions";
import styles from "@/features/collection/Collection.module.css";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Furnishes about a piece, a room, a home visit or an office quote. We reply by email.",
};

/** Contact: how to reach us, what to write about, what happens next, then the questions asked before writing. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Contact />
        <Questions questions={CONTACT_QUESTIONS} rest="Asked before writing" />
      </main>
    </>
  );
}
