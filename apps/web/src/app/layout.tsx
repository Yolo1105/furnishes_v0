import type { Metadata } from "next";
import type { ReactNode } from "react";

/* The bare frame while v1 is built up from v0: fonts, tokens, the bar and the
   footer arrive in the next steps of Milestone 0. */
export const metadata: Metadata = { title: "Furnishes" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
