import type { ReactNode } from "react";
import { SiteFooter } from "@/shell/SiteFooter";

/** Every page of the site but logging in, which stands alone, ends on the one footer. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}
