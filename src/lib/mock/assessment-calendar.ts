import { MOCK_AREAS } from "./evaluations";
import { createRng, pick, randInt } from "./seed";

export type CalendarCategory = "U15" | "U17" | "U20";

export interface MockAssessmentDay {
  date: string; // ISO
  assessments: {
    areaSlug: (typeof MOCK_AREAS)[number]["slug"];
    category: CalendarCategory;
  }[];
}

/** Próximos 14 dias com avaliações agendadas por área/categoria.
 *  U20 fica deliberadamente sem agenda — exercita o empty state do demo. */
export function mockAssessmentCalendar(): MockAssessmentDay[] {
  const rng = createRng(1500);
  const out: MockAssessmentDay[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const date = d.toISOString().slice(0, 10);
    const count = randInt(rng, 0, 3);
    const assessments: MockAssessmentDay["assessments"] = [];
    for (let k = 0; k < count; k++) {
      assessments.push({
        areaSlug: pick(rng, MOCK_AREAS).slug,
        category: pick(rng, ["U15", "U17"] as const),
      });
    }
    out.push({ date, assessments });
  }
  return out;
}
