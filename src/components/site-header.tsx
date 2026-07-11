import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleToggle } from "./locale-toggle";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
        >
          jt<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Main" className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
}
