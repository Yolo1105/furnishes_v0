/**
 * Set and cleared with the session, but readable by the page's scripts, so
 * the bar can offer Log out without every page reading cookies on the
 * server. It says only that someone is logged in, nothing to trust. Kept
 * apart from session.ts, which only the server can load.
 */
export const LOGGED_IN = "furnishes-logged-in";

/** Whether the flag is set, read in the browser. */
export const readLoggedIn = () => document.cookie.split("; ").some((c) => c.startsWith(`${LOGGED_IN}=`));
