import { createRng, randFloat, randInt } from "./seed";

export type MaxScope = "season" | "last90";

export interface MockMaximos {
  topSpeedKmh: number;
  maxSessionDistanceM: number;
  maxSessionUa: number;
}

/** Máximos (personal bests) do atleta por escopo — last90 nunca supera season. */
export function mockMaximos(
  athleteIndex: number,
): Record<MaxScope, MockMaximos> {
  const rng = createRng(900 + athleteIndex);
  const season: MockMaximos = {
    topSpeedKmh: randFloat(rng, 30.5, 34.5),
    maxSessionDistanceM: randInt(rng, 8600, 10800),
    maxSessionUa: randInt(rng, 560, 780),
  };
  const last90: MockMaximos = {
    topSpeedKmh: Math.min(season.topSpeedKmh, randFloat(rng, 29.0, 34.0)),
    maxSessionDistanceM: Math.min(
      season.maxSessionDistanceM,
      randInt(rng, 7800, 10400),
    ),
    maxSessionUa: Math.min(season.maxSessionUa, randInt(rng, 500, 760)),
  };
  return { season, last90 };
}
