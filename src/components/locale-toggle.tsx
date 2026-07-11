"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "pt" ? "en" : "pt";

  return (
    <Link
      href={pathname}
      locale={other}
      aria-label={other === "en" ? "Switch to English" : "Mudar para português"}
      className="relative inline-flex overflow-hidden rounded-md border border-border font-mono text-xs uppercase"
    >
      <span
        className={`px-2 py-1 transition-colors ${locale === "pt" ? "bg-elevated text-chalk" : "text-muted"}`}
      >
        pt
      </span>
      <span
        className={`px-2 py-1 transition-colors ${locale === "en" ? "bg-elevated text-chalk" : "text-muted"}`}
      >
        en
      </span>
    </Link>
  );
}
