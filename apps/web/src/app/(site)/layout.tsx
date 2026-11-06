import type { ReactNode } from "react";

/* The frame every page of the site shares. The bar, the footer and Eva's
   chat button arrive here in the next steps of Milestone 0; logging in will
   stand outside it, on its own. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return children;
}
