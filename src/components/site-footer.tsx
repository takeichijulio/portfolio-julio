import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{t("note")}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/takeichijulio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {t("github")}
          </a>
          <a
            href="mailto:juliotakeichi@outlook.com"
            className="transition-colors hover:text-accent"
          >
            {t("email")}
          </a>
        </div>
      </div>
    </footer>
  );
}
