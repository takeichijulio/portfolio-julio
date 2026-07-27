/**
 * Camadas decorativas fixas do HUD: vinheta radial, streaks verticais,
 * scanlines CRT (densidade alta, opacidade 0.4) e grain. Puramente
 * cosmético — nunca deve capturar clique nem ser exposto a leitor de tela.
 *
 * Server component (sem "use client"): nenhuma destas camadas depende de JS
 * para aparecer corretamente. O parallax do streak layer é um progressive
 * enhancement aplicado por <HudEffects /> via data-parallax-speed (teto 0.15,
 * aqui 0.08).
 *
 * Fica acima do <PitchGrid /> (z-0, identidade futebol) e abaixo do conteúdo
 * (z-10) — ver decisão de convivência no relatório da onda.
 */
export function HudBackgrounds() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div className="hud-vignette absolute inset-0" />
      <div
        className="hud-streaks absolute inset-0"
        data-parallax-speed="0.08"
      />
      <div className="hud-scanlines absolute inset-0" />
      <div className="hud-grain absolute inset-0" />
    </div>
  );
}
