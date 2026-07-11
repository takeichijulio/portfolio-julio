import { createRng, pick } from "./seed";

export type MockCategory = "U15" | "U17" | "U20";

export interface MockAthlete {
  id: string;
  /** "Atleta A" (pt) / "Athlete A" (en) — nunca nome plausível de pessoa real */
  name: { pt: string; en: string };
  category: MockCategory;
  position: { pt: string; en: string };
}

const POSITIONS = [
  { pt: "Goleiro", en: "Goalkeeper" },
  { pt: "Zagueiro", en: "Centre-back" },
  { pt: "Lateral", en: "Full-back" },
  { pt: "Volante", en: "Defensive mid" },
  { pt: "Meia", en: "Midfielder" },
  { pt: "Atacante", en: "Forward" },
] as const;

const LETTERS = "ABCDEFGHIJKLMNOPQRST";

export function mockAthletes(count = 12): MockAthlete[] {
  const rng = createRng(101);
  return Array.from({ length: Math.min(count, LETTERS.length) }, (_, i) => {
    const letter = LETTERS[i];
    return {
      id: `athlete-${letter.toLowerCase()}`,
      name: { pt: `Atleta ${letter}`, en: `Athlete ${letter}` },
      category: pick(rng, ["U15", "U17", "U20"] as const),
      position: pick(rng, POSITIONS),
    };
  });
}
