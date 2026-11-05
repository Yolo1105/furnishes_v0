import type { Metadata } from "next";
import { readFilters } from "@/features/catalog/filters";
import { Shop } from "@/features/catalog/Shop";
import styles from "@/features/catalog/Catalog.module.css";
import { routes } from "@/lib/routes";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";
import { Trail } from "@/shell/Trail";

export const metadata: Metadata = {
  title: "Every piece",
  description: "Ready-made furniture, modular pieces and separator walls, with their prices.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Every piece, opened on the filters the address asks for. */
export default async function ProductsPage({ searchParams }: Props) {
  const initial = readFilters(await searchParams);

  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="products">
          <Trail steps={[{ href: routes.collection, label: "Collection" }]} here="Every piece" />
          <Shop initial={initial} />
        </TypeTrial>
      </main>
    </>
  );
}
