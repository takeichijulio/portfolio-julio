"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockStrengthTests } from "@/lib/mock/strength";
import { mockWellnessSeries } from "@/lib/mock/wellness";
import { AXIS_PROPS, GRID_PROPS, TOOLTIP_STYLE, shortDate } from "./chart-theme";
import { DemoRadio } from "./demo-radio";

type Section = "strength" | "wellness";

export default function PerformanceHubDemo() {
  const t = useTranslations("demos.hub");
  const locale = useLocale() as "pt" | "en";
  const [section, setSection] = useState<Section>("strength");

  const strength = useMemo(() => mockStrengthTests(8), []);
  const wellness = useMemo(
    () =>
      mockWellnessSeries(14, 7).map((day) => ({
        date: shortDate(day.date),
        hooper: day.hooperIndex,
      })),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <DemoRadio<Section>
        label={t("section")}
        value={section}
        onChange={setSection}
        options={[
          { value: "strength", label: t("strength") },
          { value: "wellness", label: t("wellness") },
        ]}
      />

      {section === "strength" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2 pr-3 font-medium">{t("colAthlete")}</th>
                <th className="py-2 pr-3 font-medium">{t("colLeft")}</th>
                <th className="py-2 pr-3 font-medium">{t("colRight")}</th>
                <th className="py-2 font-medium">{t("colAsym")}</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {strength.map((test) => (
                <tr
                  key={test.athlete.id}
                  className="border-b border-border/50 text-chalk"
                >
                  <td className="py-1.5 pr-3 font-sans text-muted">
                    {test.athlete.name[locale]}
                  </td>
                  <td className="py-1.5 pr-3">{test.leftN}</td>
                  <td className="py-1.5 pr-3">{test.rightN}</td>
                  <td className="py-1.5">
                    <span
                      className={
                        test.flagged
                          ? "rounded-full bg-error/15 px-2 py-0.5 text-error"
                          : "text-muted"
                      }
                    >
                      {test.asymmetryPct > 0 ? "+" : ""}
                      {test.asymmetryPct}%{test.flagged ? ` (${t("flagged")})` : ""}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section === "wellness" && (
        <div className="h-56 w-full">
          <ResponsiveContainer>
            <LineChart data={wellness} margin={{ top: 4, right: 8, left: -18 }}>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="date" {...AXIS_PROPS} />
              <YAxis domain={[4, 28]} {...AXIS_PROPS} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line
                type="monotone"
                dataKey="hooper"
                stroke="var(--color-turf)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-xs italic text-muted/80">{t("radioNote")}</p>
    </div>
  );
}
