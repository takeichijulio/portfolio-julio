import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { HeroHeadline } from "@/components/hero-headline";
import { KpiCounters } from "@/components/kpi-counters";
import { PitchGrid } from "@/components/pitch-grid";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <PitchGrid />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
        <p className="font-mono text-sm uppercase tracking-widest text-turf">
          {t("tagline")}
        </p>
        <HeroHeadline text={t("headline")} />
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {t("subtitle")}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <Link href="/projects" className={buttonClasses("primary")}>
            {t("ctaProjects")}
            <ArrowRight aria-hidden size={16} />
          </Link>
          <Link href="/contact" className={buttonClasses("outline")}>
            {t("ctaContact")}
          </Link>
        </div>
        <KpiCounters />
      </div>
    </section>
  );
}
