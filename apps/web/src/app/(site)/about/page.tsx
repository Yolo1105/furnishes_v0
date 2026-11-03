import { permanentRedirect } from "next/navigation";
import { routes } from "@/lib/routes";

/** About moved onto the home page; an old link or bookmark lands on its section there. */
export default function AboutPage() {
  permanentRedirect(routes.about);
}
