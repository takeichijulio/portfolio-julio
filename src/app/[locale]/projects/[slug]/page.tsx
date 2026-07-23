import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PROJECTS, DEMO_SLUGS } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FictionalBadge } from "@/components/fictional-badge";
import { DemoSection } from "@/components/demos/demo-section";

interface CaseContent {
  title: string;
  tagline: string;
  problem: string;
  targetUser: string;
  myRole: string;
  process: string;
  keyDecisions: string[];
  result: string;
  learned: string;
}

async function loadCase(
  locale: string,
  slug: string,
): Promise<CaseContent | null> {
  if (!PROJECTS.some((p) => p.slug === slug)) return null;
  try {
    return (await import(`@/content/${locale}/cases/${slug}.json`)).default;
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = await loadCase(locale, slug);
  if (!content) return {};
  return {
    title: `${content.title} — Júlio Takeichi`,
    description: content.tagline,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const content = await loadCase(locale, slug);
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!content || !project) notFound();

  const t = await getTranslations({ locale, namespace: "caseStudy" });

  const sections: { label: string; body: string }[] = [
    { label: t("problem"), body: content.problem },
    { label: t("targetUser"), body: content.targetUser },
    { label: t("myRole"), body: content.myRole },
    { label: t("process"), body: content.process },
  ];

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-data"
      >
        <ArrowLeft aria-hidden size={14} />
        {t("backToProjects")}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.football && <FictionalBadge />}
          <Badge>
            <Lock aria-hidden size={12} />
            {t("codePrivate")}
          </Badge>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-chalk sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{content.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="data">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {DEMO_SLUGS.has(slug) && (
        <Card className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-chalk">
              {t("demoTitle")}
            </h2>
            {project.football && <FictionalBadge />}
          </div>
          <DemoSection slug={slug} />
        </Card>
      )}

      <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.label}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-turf">
              {section.label}
            </h2>
            <p className="mt-2 leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-turf">
          {t("keyDecisions")}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {content.keyDecisions.map((decision) => (
            <li
              key={decision}
              className="border-l-2 border-data/50 pl-4 text-sm leading-relaxed text-muted"
            >
              {decision}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-turf">
            {t("result")}
          </h2>
          <p className="mt-2 leading-relaxed text-muted">{content.result}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-turf">
            {t("learned")}
          </h2>
          <p className="mt-2 leading-relaxed text-muted">{content.learned}</p>
        </section>
      </div>
    </article>
  );
}
