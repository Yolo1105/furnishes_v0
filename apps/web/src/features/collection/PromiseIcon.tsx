/** The line drawings beside each promise, drawn in the text's own colour. */
const PATHS = {
  // a van: its load box, the cab with a window, and two wheels
  truck:
    "M2.5 9.5h17v13h-17zM19.5 13.5h5l4 4.5v4.5h-9M21.5 15.5h2.5l2 2.5h-4.5zM9.5 24a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M25.5 24a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0",
  // a box in perspective, as a piece that comes built or in parts
  parts: "M16 3.5 27.5 9.5v13L16 28.5 4.5 22.5v-13zM4.5 9.5 16 15.5l11.5-6M16 15.5v13",
  // an arrow turning back on itself
  return: "M10 7.5 5 12.5l5 5M5 12.5h14a6.5 6.5 0 0 1 0 13h-7",
  // a factory with a saw-tooth roof and a chimney
  factory: "M3.5 28.5v-15l7 4.5v-4.5l7 4.5v-4.5l7 4.5V4.5h4v24zM3.5 28.5h25",
} as const;

export type PromiseIconName = keyof typeof PATHS;

export function PromiseIcon({ name, className }: { name: PromiseIconName; className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
