import type { Metadata } from "next";
import { Team } from "@/features/about/About";
import { Contact } from "@/features/contact/Contact";
import { HelpWays, Where } from "@/features/contact/Reach";
import { CONTACT_QUESTIONS } from "@/features/contact/contactList";
import { Questions } from "@/features/collection/Questions";
import styles from "@/features/collection/Collection.module.css";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Furnishes about a piece, a room, a home visit or an office quote. We reply by email.",
};

/** Contact: how to reach us and the enquiry, the team, what to write about, the questions asked before writing, the ways to help, and where we are. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="contact">
          <Contact />
          {/* who you are writing to, moved here from the home page on the owner's word */}
          <Team />
          <Questions questions={CONTACT_QUESTIONS} rest="Here is what people ask before writing." split />
          <HelpWays />
          <Where />
        </TypeTrial>
      </main>
    </>
  );
}
