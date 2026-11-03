/** A short arrow pointing right, drawn in the text's own colour and weight. */
export function Arrow({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}
