import { createRng, randInt } from "./seed";

export interface MockPainRegion {
  region: { pt: string; en: string };
  /** relatos na última semana (contagem, grupo todo) */
  reports: number;
}

const REGIONS = [
  { pt: "Posterior de coxa", en: "Hamstring" },
  { pt: "Quadríceps", en: "Quadriceps" },
  { pt: "Tornozelo", en: "Ankle" },
  { pt: "Joelho", en: "Knee" },
  { pt: "Lombar", en: "Lower back" },
  { pt: "Adutor", en: "Adductor" },
] as const;

/** Dores por região reportadas nos formulários de wellness (grupo, semana). */
export function mockPainRegions(): MockPainRegion[] {
  const rng = createRng(1000);
  return REGIONS.map((region) => ({
    region,
    reports: randInt(rng, 0, 9),
  })).sort((a, b) => b.reports - a.reports);
}
