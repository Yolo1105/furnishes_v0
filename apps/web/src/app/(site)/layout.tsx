import type { ReactNode } from "react";
import { SiteHeader } from "@/shell/SiteHeader";

/* The frame every page of the site shares: the bar over every page. The
   footer and Eva's chat button arrive here in the next steps of Milestone
   0; logging in will stand outside it, on its own. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
