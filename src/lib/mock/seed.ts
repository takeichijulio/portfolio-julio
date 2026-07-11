/**
 * PRNG determinístico (mulberry32) — todo demo usa a MESMA seed pra ser
 * estável entre builds. Nenhum dado aqui corresponde a atleta real
 * (CONFIDENTIALITY.md + content-kit/mock-data-spec.md).
 */
export function createRng(seed = 20260711) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = ReturnType<typeof createRng>;

export function randInt(rng: Rng, min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randFloat(rng: Rng, min: number, max: number, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round((rng() * (max - min) + min) * factor) / factor;
}

export function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)];
}

/** Datas relativas: últimos `days` dias a partir de hoje (nunca datas reais de sessão). */
export function lastDays(days: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
