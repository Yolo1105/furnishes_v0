import type { Metadata } from "next";
import { Legal } from "@/features/legal/Legal";
import { TERMS } from "@/features/legal/legalList";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: TERMS.title, description: TERMS.lead };

/** The terms and conditions, in the legal pages' shared shape. */
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="terms">
          <Legal page={TERMS} />
        </TypeTrial>
      </main>
    </>
  );
}
