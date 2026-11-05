import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import { Questions } from "@/features/collection/Questions";
import { Offices } from "@/features/offices/Offices";
import { OFFICE_QUESTIONS } from "@/features/offices/officesList";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "For offices",
  description:
    "Desks, chairs, storage and separator walls for a startup's first office in Singapore, with one quote for the lot.",
};

/** Offices: the pieces for a team, why they suit one, how an order goes, and the questions offices ask. */
export default function OfficesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="offices">
          <Offices />
          <Questions questions={OFFICE_QUESTIONS} rest="Asked by offices" />
        </TypeTrial>
      </main>
    </>
  );
}
