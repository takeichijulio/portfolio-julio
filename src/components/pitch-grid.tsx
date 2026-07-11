/**
 * Fundo decorativo do hero: metade de um campo de futebol visto de cima
 * (linhas em `line`, opacidade baixa). Puramente decorativo — aria-hidden,
 * sem animação (não precisa de guard de reduced-motion).
 */
export function PitchGrid() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke="var(--color-line)" strokeWidth="2">
        {/* linha lateral superior/inferior sugerida pelo recorte */}
        <rect x="60" y="-40" width="1080" height="680" rx="4" />
        {/* linha do meio */}
        <line x1="600" y1="-40" x2="600" y2="640" />
        {/* círculo central */}
        <circle cx="600" cy="300" r="110" />
        {/* grande área esquerda */}
        <rect x="60" y="150" width="180" height="300" />
        <rect x="60" y="230" width="70" height="140" />
        {/* grande área direita */}
        <rect x="960" y="150" width="180" height="300" />
        <rect x="1070" y="230" width="70" height="140" />
        {/* marca do pênalti */}
        <circle cx="200" cy="300" r="3" fill="var(--color-line)" />
        <circle cx="1000" cy="300" r="3" fill="var(--color-line)" />
      </g>
    </svg>
  );
}
