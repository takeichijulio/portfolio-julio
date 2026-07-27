/**
 * Barra de progresso de scroll: 2px, gradiente ciano, escala conforme a
 * posição de scroll. O valor de scaleX é escrito por <HudEffects /> via
 * id="hud-scroll-progress". Sem JS, fica parada em scaleX(0) — nunca some,
 * nunca quebra layout.
 */
export function ScrollProgress() {
  return (
    <div
      id="hud-scroll-progress"
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-data/30 via-data to-data/30 transition-transform duration-150 ease-linear"
    />
  );
}
