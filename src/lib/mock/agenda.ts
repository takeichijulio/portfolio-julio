/**
 * Mocks dos demos pessoais (agenda + fila de aprovação do agente).
 * Conteúdo genérico — nada de dados reais de agenda.
 */

export interface MockTask {
  id: string;
  title: { pt: string; en: string };
  due: "today" | "tomorrow" | "late";
  done: boolean;
}

export const MOCK_TASKS: MockTask[] = [
  {
    id: "t1",
    title: { pt: "Revisar planilha de treino", en: "Review training sheet" },
    due: "late",
    done: false,
  },
  {
    id: "t2",
    title: { pt: "Preparar treino de quinta", en: "Plan Thursday practice" },
    due: "today",
    done: false,
  },
  {
    id: "t3",
    title: { pt: "Responder e-mail da liga", en: "Reply to league e-mail" },
    due: "today",
    done: true,
  },
  {
    id: "t4",
    title: { pt: "Agendar consulta", en: "Book appointment" },
    due: "tomorrow",
    done: false,
  },
];

export interface MockProposal {
  id: string;
  kind: "write_file" | "run_command" | "read_file";
  summary: { pt: string; en: string };
  detail: string;
  /** preview de diff/conteúdo fake ("+" adição, "-" remoção, " " contexto) */
  diff: string[];
  status: "pending" | "approved" | "rejected";
}

export const MOCK_PROPOSALS: MockProposal[] = [
  {
    id: "p1",
    kind: "write_file",
    summary: {
      pt: "Escrever notas/resumo-semana.md",
      en: "Write notes/week-summary.md",
    },
    detail: "+ 4 / − 1",
    diff: [
      "  # Resumo da semana",
      "- (vazio)",
      "+ - Revisar planilha de treino",
      "+ - Enviar relatório da liga",
      "+ - Backup das fotos",
      "+ Total: 3 itens",
    ],
    status: "pending",
  },
  {
    id: "p2",
    kind: "run_command",
    summary: {
      pt: "Rodar: python organizar_fotos.py",
      en: "Run: python organize_photos.py",
    },
    detail: "cwd: ~/workspace",
    diff: ["$ python organizar_fotos.py", "  --dry-run --por-mes"],
    status: "pending",
  },
  {
    id: "p3",
    kind: "read_file",
    summary: {
      pt: "Ler treinos/plano-semana.md",
      en: "Read training/week-plan.md",
    },
    detail: "read-only",
    diff: ["  # Plano da semana", "  seg: técnica", "  qua: físico"],
    status: "pending",
  },
];

/** Dias do mês corrente com evento (dots no mini-calendário do demo). */
export const MOCK_EVENT_DAYS = [3, 8, 14, 21, 26];

/** Pool do botão "simular nova proposta" (cicla nesta ordem). */
export const MOCK_PROPOSAL_POOL: Omit<MockProposal, "id">[] = [
  {
    kind: "write_file",
    summary: {
      pt: "Escrever metas/mes-atual.md",
      en: "Write goals/current-month.md",
    },
    detail: "+ 6 / − 0",
    diff: ["+ ## Metas do mês", "+ - Ler 2 livros", "+ - Fechar backlog"],
    status: "pending",
  },
  {
    kind: "run_command",
    summary: {
      pt: "Rodar: git status",
      en: "Run: git status",
    },
    detail: "cwd: ~/workspace",
    diff: ["$ git status", "  read-only, sem escrita"],
    status: "pending",
  },
];
