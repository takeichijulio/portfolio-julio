import { useTranslations } from "next-intl";
import { TriangleAlert } from "lucide-react";

/**
 * Badge obrigatório em todo demo de projeto do clube (CONFIDENTIALITY.md).
 * Sempre visível, nunca atrás de hover.
 */
export function FictionalBadge() {
  const t = useTranslations("badge");

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
      <TriangleAlert aria-hidden size={13} />
      {t("fictional")}
    </span>
  );
}
