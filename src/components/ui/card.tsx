import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // hud-card + hud-brackets aplicados aqui, na base, pra que a linguagem
      // HUD alcance todo card do site sem editar pagina por pagina.
      // Cantos retos: `rounded-xl` contrariava a estetica (PRD-01 §3.2).
      className={cn(
        "hud-card hud-brackets relative border border-border bg-surface p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-semibold tracking-tight text-chalk",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted", className)} {...props} />
  );
}
