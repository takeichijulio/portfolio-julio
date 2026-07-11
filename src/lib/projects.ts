/** Metadados dos 5 cases — copy localizada vive em messages/{locale}.json
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
];
