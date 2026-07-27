import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PROJECTS, DEMO_SLUGS } from "@/lib/projects";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FictionalBadge } from "@/components/fictional-badge";

export default function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("projects");
  const tCase = useTranslations("caseStudy");

  const football = PROJECTS.filter((p) => p.football);
  const personal = PROJECTS.filter((p) => !p.football);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1
        data-reveal
        className="kinetic font-display text-4xl font-bold tracking-tight text-chalk"
      >
        {t("title")}
      </h1>
      <p data-reveal className="mt-4 max-w-2xl text-muted">{t("lead")}</p>

      {[
        { label: t("footballGroup"), items: football },
        { label: t("personalGroup"), items: personal },
      ].map((group) => (
        <div key={group.label} className="mt-12">
          <h2
            data-reveal
            className="kinetic font-mono text-sm uppercase tracking-widest text-turf"
          >
            {group.label}
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {group.items.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
              >
                <Card
                  data-reveal
                  data-magnetic
                  data-spotlight
                  className="card-tilt flex h-full flex-col gap-3 group-hover:border-data/50"
                >
                  {(project.football || DEMO_SLUGS.has(project.slug)) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {project.football && <FictionalBadge />}
                      {DEMO_SLUGS.has(project.slug) && (
                        <Badge variant="turf">{tCase("demoTitle")}</Badge>
                      )}
                    </div>
                  )}
                  <CardTitle>{t(`cases.${project.slug}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`cases.${project.slug}.description`)}
                  </CardDescription>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="data">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-data">
                    {tCase("viewCase")}
                    <ArrowRight
                      aria-hidden
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
