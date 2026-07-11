import type { MockCategory } from "./athletes";
import { createRng, lastDays, randInt } from "./seed";

export interface MockCategoryGpsDay {
  date: string;
  distanceM: number;
  hsrM: number;
}

const CATEGORY_SEED: Record<MockCategory, number> = {
  U15: 1200,
  U17: 1300,
  U20: 1400,
};

/** Média diária do grupo (distância + alta intensidade) por categoria, 7 dias. */
export function mockCategoryGps(category: MockCategory): MockCategoryGpsDay[] {
  const rng = createRng(CATEGORY_SEED[category]);
  return lastDays(7).map((date) => ({
    date,
    distanceM: randInt(rng, 4000, 7800),
    hsrM: randInt(rng, 350, 850),
  }));
}
