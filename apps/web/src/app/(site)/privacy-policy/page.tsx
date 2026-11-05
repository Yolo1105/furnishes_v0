import type { Metadata } from "next";
import { Legal } from "@/features/legal/Legal";
import { PRIVACY } from "@/features/legal/legalList";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: PRIVACY.title, description: PRIVACY.lead };

/** The privacy policy, in the legal pages' shared shape. */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="privacy-policy">
          <Legal page={PRIVACY} />
        </TypeTrial>
      </main>
    </>
  );
}
