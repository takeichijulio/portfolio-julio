import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Clock } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
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

  const football = PROJECTS.filter((p) => p.football);
  const personal = PROJECTS.filter((p) => !p.football);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight text-chalk">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{t("lead")}</p>

      {[
        { label: t("footballGroup"), items: football },
        { label: t("personalGroup"), items: personal },
      ].map((group) => (
        <div key={group.label} className="mt-12">
          <h2 className="font-mono text-sm uppercase tracking-widest text-turf">
            {group.label}
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {group.items.map((project) => (
              <Card key={project.slug} className="card-tilt flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {project.football && <FictionalBadge />}
                </div>
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
                <p className="flex items-center gap-1.5 text-xs text-muted/80">
                  <Clock aria-hidden size={13} />
                  {t("comingSoon")}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
