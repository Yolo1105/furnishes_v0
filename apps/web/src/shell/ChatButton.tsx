"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/lib/routes";
import styles from "./ChatButton.module.css";

/** How far the page moves, in px, before the button shows: past the banner's foot links. */
const SHOW_AFTER = 240;

/**
 * Eva's way in on every page: a small red-orange pill, a spark and her
 * name, in the screen's lower right corner once the page has moved, so it
 * never sits on the banner's own links. There is no live chat yet, so it
 * opens the room planner, where Eva answers.
 */
export function ChatButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const check = () => setShown(window.scrollY > SHOW_AFTER);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <Link
      className={styles.chat}
      href={routes.designYourRoom}
      data-shown={shown || undefined}
      aria-label="Ask Eva, our AI interior assistant"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
      </svg>
      Ask Eva
    </Link>
  );
}
