"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Alterna todos os <TechDetails> da página de uma vez.
 * Client component só pelo onClick — a página continua 100% funcional
 * sem JS, este botão é puramente progressive enhancement.
 * Estado não persiste entre navegações (sem localStorage/cookie).
 */
export function ExpandAll() {
  const t = useTranslations("techDetails");
  const [allOpen, setAllOpen] = useState(false);

  function toggle() {
    const next = !allOpen;
    document
      .querySelectorAll<HTMLDetailsElement>("[data-tech-details]")
      .forEach((details) => {
        details.open = next;
      });
    setAllOpen(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
    >
      {allOpen ? t("collapseAll") : t("expandAll")}
    </button>
  );
}
