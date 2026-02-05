export default function PokeballLogo({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pokeball Logo"
    >
      <title>Pokéball</title>
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />
      <path
        d="M2 50h96M50 2a48 48 0 0 1 0 96"
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />
      <path d="M2 50a48 48 0 0 1 96 0" fill="#ef4444" />
      <circle
        cx="50"
        cy="50"
        r="12"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="6" fill="#000" />
    </svg>
  );
}
