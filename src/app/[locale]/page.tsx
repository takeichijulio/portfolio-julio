import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PROJECTS, DEMO_SLUGS } from "@/lib/projects";
import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FictionalBadge } from "@/components/fictional-badge";
import { HeroHeadline } from "@/components/hero-headline";
import { KpiCounters } from "@/components/kpi-counters";

const FEATURED_SLUGS = [
  "gps-load-dashboard",
  "performance-hub",
  "local-ai-agent",
];

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("hero");
  const tProjects = useTranslations("projects");
  const tCaseDemo = useTranslations("caseStudy")("demoTitle");

  const featured = PROJECTS.filter((p) => FEATURED_SLUGS.includes(p.slug));

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
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
          <Link
            href="/lab"
            className="group mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
          >
            {t("labTeaser")}
            <span className="inline-flex items-center gap-1 text-data">
              {t("labLink")}
              <ArrowRight
                aria-hidden
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-chalk">
            {t("featuredTitle")}
          </h2>
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-data hover:underline"
          >
            {t("viewAll")}
            <ArrowRight aria-hidden size={14} />
          </Link>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
            >
              <Card className="card-tilt flex h-full flex-col gap-3 group-hover:border-data/50">
                {(project.football || DEMO_SLUGS.has(project.slug)) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.football && <FictionalBadge />}
                    {DEMO_SLUGS.has(project.slug) && (
                      <Badge variant="turf">{tCaseDemo}</Badge>
                    )}
                  </div>
                )}
                <CardTitle className="text-base">
                  {tProjects(`cases.${project.slug}.title`)}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-xs">
                  {tProjects(`cases.${project.slug}.description`)}
                </CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
