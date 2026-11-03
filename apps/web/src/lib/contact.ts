/** How to reach us, as the banner's foot and the footer give it. */
export const EMAIL = "hello@furnish-es.com";
export const MAILTO = `mailto:${EMAIL}`;

/** An email to us with its subject filled in, so it reaches the right inbox. */
export const mailAbout = (subject: string) => `${MAILTO}?subject=${encodeURIComponent(subject)}`;
export const PLACE = ["Singapore", "By appointment"] as const;
export const HOURS = ["Monday to Friday", "10am to 6pm"] as const;
