// Petit motif floral discret — l'élément signature du design OFAL.
// Un brin délicat, tracé au trait, utilisé avec parcimonie (hero, séparateurs, footer).
export default function FloralAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 20c20-14 40-14 58 0s38 14 58 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="30" cy="13" r="2.5" fill="currentColor" />
      <circle cx="60" cy="20" r="3" fill="currentColor" />
      <circle cx="90" cy="13" r="2.5" fill="currentColor" />
      <path d="M30 13c-3-4-8-4-10-1" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M90 13c3-4 8-4 10-1" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );
}
