import { mockAthletes, type MockAthlete } from "./athletes";
import { createRng, randInt } from "./seed";

export interface MockStrengthTest {
  athlete: MockAthlete;
  leftN: number;
  rightN: number;
  /** assinado: + = direito mais forte; destacar |>10| */
  asymmetryPct: number;
  flagged: boolean;
}

export function mockStrengthTests(count = 12): MockStrengthTest[] {
  const rng = createRng(505);
  return mockAthletes(count).map((athlete) => {
    const leftN = randInt(rng, 250, 450);
    const rightN = randInt(rng, 250, 450);
    const asymmetryPct = Math.round(
      ((rightN - leftN) / Math.max(leftN, rightN)) * 100,
    );
    return {
      athlete,
      leftN,
      rightN,
      asymmetryPct,
      flagged: Math.abs(asymmetryPct) > 10,
    };
  });
}
