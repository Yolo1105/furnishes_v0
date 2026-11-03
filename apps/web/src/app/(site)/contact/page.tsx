import type { Metadata } from "next";
import { Contact } from "@/features/contact/Contact";
import { ABOUT_QUESTIONS } from "@/features/about/aboutList";
import { Questions } from "@/features/collection/Questions";
import styles from "@/features/collection/Collection.module.css";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Furnishes, book a home visit, or ask for samples.",
};

/** Contact: how to reach us and when, then the questions asked before writing. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Contact />
        <Questions questions={ABOUT_QUESTIONS} />
      </main>
    </>
  );
}
