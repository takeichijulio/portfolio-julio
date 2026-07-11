import { useTranslations } from "next-intl";
import { TriangleAlert } from "lucide-react";
import { Badge } from "./ui/badge";

/**
 * Badge obrigatório em todo demo do domínio do futebol (CONFIDENTIALITY.md).
 * Sempre visível, nunca atrás de hover.
 */
export function FictionalBadge() {
  const t = useTranslations("badge");

  return (
    <Badge variant="alert">
      <TriangleAlert aria-hidden size={13} />
      {t("fictional")}
    </Badge>
  );
}
