/** Config compartilhada dos gráficos Recharts — só tokens do design system. */
export const AXIS_PROPS = {
  stroke: "var(--color-muted)",
  fontSize: 11,
  tickLine: false,
  axisLine: { stroke: "var(--color-border)" },
} as const;

export const GRID_PROPS = {
  stroke: "var(--color-border)",
  strokeDasharray: "3 3",
  vertical: false,
} as const;

export const TOOLTIP_STYLE = {
  backgroundColor: "var(--color-elevated)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  color: "var(--color-chalk)",
  fontSize: "12px",
} as const;

/** "2026-07-11" → "11/07" (rótulo curto de eixo, independente de locale). */
export function shortDate(iso: string) {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}
