import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Image from "next/image";
import {
  CircleCheck,
  Database,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TechDetails } from "@/components/tech-details";

const STACK = [
  "Python (pandas, FastAPI, Streamlit)",
  "SQLite / PostgreSQL (Supabase)",
  "Pipelines locais + sync upsert",
  "TypeScript / React / Next.js (AI-assisted)",
  "Recharts / ECharts",
  "Ollama (IA local)",
  "Rust / Tauri (AI-assisted)",
];

const AI_PRACTICES = [
  { icon: Workflow, key: "aiSkills" },
  { icon: Database, key: "aiKnowledge" },
  { icon: ListChecks, key: "aiPlanning" },
  { icon: ShieldCheck, key: "aiSafety" },
] as const;

const FORMATION_KEYS = ["formation1", "formation2", "formation3"] as const;

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-start">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-chalk">
            {t("title")}
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
          </div>
        </div>
        <Image
          src="/julio.jpeg"
          alt={t("photoAlt")}
          width={280}
          height={280}
          priority
          className="mx-auto aspect-square w-56 shrink-0 rounded-2xl border border-border object-cover md:mx-0 md:w-64"
        />
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-chalk">
            {t("stackTitle")}
          </h2>
          <TechDetails className="mt-4">
            <ul className="flex flex-wrap gap-2">
              {STACK.map((item) => (
                <li key={item}>
                  <Badge>{item}</Badge>
                </li>
              ))}
            </ul>
          </TechDetails>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-chalk">
            {t("domainTitle")}
          </h2>
          {/*
            Esta lista e a enumeracao tecnica do dominio (Hooper, PSE,
            assimetria bilateral, upsert): jargao que o PRD-02 §3.1 manda tirar
            da primeira leitura. Nada foi reescrito nem removido -- so passou
            pra tras do clique, junto com a stack logo acima.
          */}
          <TechDetails className="mt-4">
          <ul className="space-y-3 text-sm text-muted">
            {(["domain1", "domain2", "domain3", "domain4", "domain5"] as const).map(
              (key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <CircleCheck
                    aria-hidden
                    size={16}
                    className="mt-0.5 shrink-0 text-turf"
                  />
                  {t(key)}
                </li>
              ),
            )}
          </ul>
          </TechDetails>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-chalk">
          {t("formationTitle")}
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          {FORMATION_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-2.5">
              <GraduationCap
                aria-hidden
                size={16}
                className="mt-0.5 shrink-0 text-data"
              />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-chalk">
          {t("aiTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {t("aiIntro")}
        </p>
        <TechDetails className="mt-5">
          <p className="rounded-lg border border-border bg-pitch/60 px-4 py-3 text-sm leading-relaxed text-muted">
            {t("disclaimer")}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {AI_PRACTICES.map(({ icon: Icon, key }) => (
              <Card key={key} className="flex flex-col gap-2">
                <Icon aria-hidden size={18} className="text-data" />
                <CardTitle className="text-base">{t(`${key}Title`)}</CardTitle>
                <CardDescription>{t(`${key}Desc`)}</CardDescription>
              </Card>
            ))}
          </div>
        </TechDetails>
      </div>
    </section>
  );
}
