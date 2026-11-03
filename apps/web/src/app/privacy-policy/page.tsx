import type { Metadata } from "next";
import { Legal } from "@/features/legal/Legal";
import { PRIVACY } from "@/features/legal/legalList";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: PRIVACY.title, description: PRIVACY.lead };

/** The privacy policy, in the legal pages' shared shape. */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Legal page={PRIVACY} />
      </main>
    </>
  );
}
