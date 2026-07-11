import { createRng, lastDays, randInt } from "./seed";

export type LoadBand = "low" | "medium" | "high";

export interface MockLoadDay {
  date: string;
  /** PSE da sessão (1–10) */
  pse: number;
  /** UA / player load da sessão */
  ua: number;
  /** distância total (m) — pro gráfico composto */
  distanceM: number;
  band: LoadBand;
  /** dia sem sessão (célula vazia na grade) */
  rest: boolean;
}

function bandFor(ua: number): LoadBand {
  if (ua < 350) return "low";
  if (ua <= 520) return "medium";
  return "high";
}

/** Grade semanal (7 dias) de PSE × UA do atleta selecionado. */
export function mockWeeklyLoad(athleteIndex: number): MockLoadDay[] {
  const rng = createRng(700 + athleteIndex);
  return lastDays(7).map((date, i) => {
    // 1–2 dias de descanso por semana, determinístico por atleta
    const rest = (i + athleteIndex) % 7 === 5;
    if (rest) {
      return { date, pse: 0, ua: 0, distanceM: 0, band: "low", rest: true };
    }
    const pse = randInt(rng, 2, 9);
    const ua = randInt(rng, 220, 640);
    return {
      date,
      pse,
      ua,
      distanceM: randInt(rng, 3500, 8500),
      band: bandFor(ua),
      rest: false,
    };
  });
}
