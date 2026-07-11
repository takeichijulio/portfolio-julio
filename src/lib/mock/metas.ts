import { createRng, randFloat } from "./seed";

export type TargetMetric = "distance" | "hsr" | "sprints";

export interface MockTargetRow {
  metric: TargetMetric;
  realized: number;
  target: number;
  /** realized / target × 100, arredondado */
  pct: number;
}

const TARGETS: Record<TargetMetric, number> = {
  distance: 30000, // m na semana
  hsr: 3500, // m alta intensidade na semana
  sprints: 120, // contagem na semana
};

/** Linhas WoW realizado × meta da semana corrente do atleta selecionado. */
export function mockWeeklyTargets(athleteIndex: number): MockTargetRow[] {
  const rng = createRng(800 + athleteIndex);
  return (Object.keys(TARGETS) as TargetMetric[]).map((metric) => {
    const target = TARGETS[metric];
    const realized = Math.round(target * randFloat(rng, 0.62, 1.32, 2));
    return {
      metric,
      realized,
      target,
      pct: Math.round((realized / target) * 100),
    };
  });
}
