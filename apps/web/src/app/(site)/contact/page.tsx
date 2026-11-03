import type { Metadata } from "next";
import { Contact } from "@/features/contact/Contact";
import { CONTACT_CLOSING, CONTACT_QUESTIONS } from "@/features/contact/contactList";
import { Closing } from "@/features/collection/Closing";
import { Questions } from "@/features/collection/Questions";
import styles from "@/features/collection/Collection.module.css";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Furnishes about a piece, a room, a home visit or an office quote. We reply by email.",
};

/** Contact: how to reach us, what to write about, what happens next, the questions asked before writing, and a closing band for seeing it first. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Contact />
        <Questions questions={CONTACT_QUESTIONS} rest="Asked before writing" centred />
        <Closing band={CONTACT_CLOSING} />
      </main>
    </>
  );
}
