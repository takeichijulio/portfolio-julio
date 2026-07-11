import { mockAthletes, type MockAthlete } from "./athletes";
import { createRng, lastDays, randFloat, randInt, type Rng } from "./seed";

export interface MockGpsRow {
  athlete: MockAthlete;
  date: string;
  totalDistanceM: number;
  highIntensityM: number;
  sprints: number;
  topSpeedKmh: number;
  playerLoad: number;
}

function gpsRow(rng: Rng, athlete: MockAthlete, date: string): MockGpsRow {
  return {
    athlete,
    date,
    totalDistanceM: randInt(rng, 3500, 8500),
    highIntensityM: randInt(rng, 300, 900),
    sprints: randInt(rng, 5, 30),
    topSpeedKmh: randFloat(rng, 27.0, 33.5),
    playerLoad: randInt(rng, 200, 650),
  };
}

/** Uma sessão (dia) de GPS pra tabela de atletas do demo. */
export function mockGpsSession(athleteCount = 12): MockGpsRow[] {
  const rng = createRng(202);
  const [today] = lastDays(1);
  return mockAthletes(athleteCount).map((a) => gpsRow(rng, a, today));
}

/** Série de N dias de um atleta pra gráfico de linha/barra. */
export function mockGpsSeries(days = 14): MockGpsRow[] {
  const rng = createRng(303);
  const [athlete] = mockAthletes(1);
  return lastDays(days).map((date) => gpsRow(rng, athlete, date));
}
