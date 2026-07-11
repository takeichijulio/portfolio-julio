import { createRng, lastDays, randFloat, randInt } from "./seed";

export interface MockWellnessDay {
  date: string;
  sleepHours: number;
  sleepQuality: number; // 1–7
  fatigue: number; // 1–7
  stress: number; // 1–7
  muscleSoreness: number; // 1–7
  hooperIndex: number; // soma das 4 escalas (4–28)
  postTrainingRpe: number; // 1–10
}

export function mockWellnessSeries(days = 14, seedOffset = 0): MockWellnessDay[] {
  const rng = createRng(404 + seedOffset);
  return lastDays(days).map((date) => {
    const sleepQuality = randInt(rng, 1, 7);
    const fatigue = randInt(rng, 1, 7);
    const stress = randInt(rng, 1, 7);
    const muscleSoreness = randInt(rng, 1, 7);
    return {
      date,
      sleepHours: randFloat(rng, 6.0, 9.5),
      sleepQuality,
      fatigue,
      stress,
      muscleSoreness,
      hooperIndex: sleepQuality + fatigue + stress + muscleSoreness,
      postTrainingRpe: randInt(rng, 1, 10),
    };
  });
}
