import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bloco colapsável de conteúdo técnico.
 * Baseado em <details>/<summary> nativo: funciona sem JavaScript, fica
 * indexável no HTML inicial e nunca sobrepõe conteúdo (CLS = 0).
 * Fechado por padrão em todas as instâncias.
 */
export function TechDetails({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const t = useTranslations("techDetails");

  return (
    <details
      data-tech-details
      className={cn(
        "group rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 font-mono text-xs uppercase tracking-widest text-turf transition-colors hover:text-data focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{t("show")}</span>
        <span className="hidden group-open:inline">{t("hide")}</span>
        <ChevronDown
          aria-hidden
          size={16}
          className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="border-t border-border px-5 py-5">{children}</div>
    </details>
  );
}
