import type { ReactNode } from "react";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { ChatButton } from "@/shell/ChatButton";
import { SiteFooter } from "@/shell/SiteFooter";

/** Every page of the site but logging in, which stands alone, ends on the one footer, with Eva's chat button in the corner. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {/* Sora, as on the pages, on the owner's word */}
      <TypeTrial page="footer">
        <SiteFooter />
      </TypeTrial>
      <ChatButton />
    </>
  );
}
