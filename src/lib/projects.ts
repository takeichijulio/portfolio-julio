/** Metadados dos cases — copy localizada vive em messages/{locale}.json
 *  (projects.cases.<slug>). Títulos públicos do plano v3: tipo de sistema,
 *  nunca empregador. */
export interface ProjectMeta {
  slug: string;
  tags: string[];
  /** demos com badge "dados fictícios" obrigatório */
  football: boolean;
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "gps-load-dashboard",
    tags: ["GPS", "Dashboard", "Full-stack"],
    football: true,
  },
  {
    slug: "performance-hub",
    tags: ["Dashboard", "Python"],
    football: true,
  },
  {
    slug: "evaluations-hub",
    tags: ["Full-stack", "Dashboard"],
    football: true,
  },
  {
    slug: "local-ai-agent",
    tags: ["Local AI", "Desktop", "Rust"],
    football: false,
  },
  {
    slug: "personal-ops",
    tags: ["Local AI", "Full-stack"],
    football: false,
  },
  {
    slug: "jarvis-assistente-voz",
    tags: ["Local AI", "Voice", "Second Brain"],
    football: false,
  },
];

/** Slugs fora do domínio do futebol — usados pra montar o hub /lab. */
export const LAB_SLUGS = PROJECTS.filter((p) => !p.football).map(
  (p) => p.slug,
);

/** Slugs com demo interativa registrada (ver components/demos/demo-section).
 *  Vive aqui (módulo neutro) porque Server Components não conseguem ler
 *  valores exportados de um arquivo "use client" — viram client reference,
 *  não o Set real. */
export const DEMO_SLUGS = new Set([
  "gps-load-dashboard",
  "performance-hub",
  "evaluations-hub",
  "local-ai-agent",
  "personal-ops",
]);
