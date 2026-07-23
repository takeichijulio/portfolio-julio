import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PROJECTS, LAB_SLUGS, DEMO_SLUGS } from "@/lib/projects";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab" });
  return {
    title: `${t("title")} — Júlio Takeichi`,
    description: t("lead"),
  };
}

export default function LabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("lab");
  const tProjects = useTranslations("projects");
  const tCase = useTranslations("caseStudy");

  const labProjects = PROJECTS.filter((p) => LAB_SLUGS.includes(p.slug));

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-data"
      >
        <ArrowLeft aria-hidden size={14} />
        {t("backHome")}
      </Link>

      <p className="mt-6 font-mono text-sm uppercase tracking-widest text-turf">
        {t("tagline")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-chalk">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{t("lead")}</p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {labProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-data"
          >
            <Card className="card-tilt flex h-full flex-col gap-3 group-hover:border-data/50">
              {DEMO_SLUGS.has(project.slug) && (
                <Badge variant="turf">{tCase("demoTitle")}</Badge>
              )}
              <CardTitle>{tProjects(`cases.${project.slug}.title`)}</CardTitle>
              <CardDescription>
                {tProjects(`cases.${project.slug}.description`)}
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
    </section>
  );
}
