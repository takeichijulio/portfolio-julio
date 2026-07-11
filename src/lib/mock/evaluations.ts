import { createRng, pick, randInt } from "./seed";

export const MOCK_AREAS = [
  { slug: "fisiologia", pt: "Fisiologia", en: "Physiology" },
  { slug: "medicina", pt: "Medicina", en: "Medicine" },
  { slug: "fisioterapia", pt: "Fisioterapia", en: "Physiotherapy" },
  { slug: "nutricao", pt: "Nutrição", en: "Nutrition" },
  { slug: "psicologia", pt: "Psicologia", en: "Psychology" },
  { slug: "pedagogia", pt: "Pedagogia", en: "Pedagogy" },
] as const;

export type MockAttendance =
  | "present"
  | "absent"
  | "justified"
  | "rescheduled";

export interface MockComplianceRow {
  area: (typeof MOCK_AREAS)[number];
  weeklyCompliancePct: number; // 40–100
  lastStatus: MockAttendance;
}

export function mockCompliance(): MockComplianceRow[] {
  const rng = createRng(606);
  return MOCK_AREAS.map((area) => ({
    area,
    weeklyCompliancePct: randInt(rng, 40, 100),
    lastStatus: pick(rng, [
      "present",
      "absent",
      "justified",
      "rescheduled",
    ] as const),
  }));
}
