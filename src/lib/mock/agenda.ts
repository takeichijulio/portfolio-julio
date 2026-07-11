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
  kind: "write_file" | "run_command";
  summary: { pt: string; en: string };
  detail: string;
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
    detail: "+ 18 linhas, − 0 linhas",
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
    status: "pending",
  },
];
