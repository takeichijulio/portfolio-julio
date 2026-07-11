import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("hero");

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
      <p className="font-mono text-sm uppercase tracking-widest text-accent">
        {t("role")}
      </p>
      <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted">
        {t("subtitle")}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-bg transition-opacity hover:opacity-90"
        >
          {t("ctaProjects")}
          <ArrowRight aria-hidden size={16} />
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-border px-5 py-2.5 font-medium text-text transition-colors hover:border-accent hover:text-accent"
        >
          {t("ctaContact")}
        </Link>
      </div>
    </section>
  );
}
