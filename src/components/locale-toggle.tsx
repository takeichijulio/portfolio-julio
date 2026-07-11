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
      className="rounded-md border border-border px-2.5 py-1 font-mono text-xs uppercase text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {other}
    </Link>
  );
}
