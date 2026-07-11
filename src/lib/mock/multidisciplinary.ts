import { createRng, randFloat } from "./seed";

export interface MockAreaScore {
  area: { pt: string; en: string };
  /** nota média do grupo (0–10) */
  score: number;
}

const AREAS = [
  { pt: "Psicologia", en: "Psychology" },
  { pt: "Nutrição", en: "Nutrition" },
  { pt: "Serviço Social", en: "Social Work" },
  { pt: "Pedagogia", en: "Pedagogy" },
] as const;

/** Notas por área multidisciplinar (radar do Performance Hub). */
export function mockAreaScores(): MockAreaScore[] {
  const rng = createRng(1100);
  return AREAS.map((area) => ({
    area,
    score: randFloat(rng, 5.5, 9.5),
  }));
}
