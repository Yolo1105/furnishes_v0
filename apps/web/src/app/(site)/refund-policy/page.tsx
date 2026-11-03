import type { Metadata } from "next";
import { Legal } from "@/features/legal/Legal";
import { REFUND } from "@/features/legal/legalList";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: REFUND.title, description: REFUND.lead };

/** The refund policy, in the legal pages' shared shape. */
export default function RefundPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Legal page={REFUND} />
      </main>
    </>
  );
}
