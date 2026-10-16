import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{t("note")}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/takeichijulio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-data"
          >
            {t("github")}
          </a>
          <a
            href="https://www.linkedin.com/in/j%C3%BAlio-murashima"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-data"
          >
            {t("linkedin")}
          </a>
          <a
            href="mailto:juliotakeichi@outlook.com"
            className="transition-colors hover:text-data"
          >
            {t("email")}
          </a>
          <a
            href="https://takeichijulio.github.io/portfolio-freela/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-data"
          >
            {t("freela")}
          </a>
        </div>
      </div>
    </footer>
  );
}
