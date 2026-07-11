"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MockCategory } from "@/lib/mock/athletes";
import { mockCategoryGps } from "@/lib/mock/category-gps";
import { mockStrengthTests } from "@/lib/mock/strength";
import { mockWellnessSeries } from "@/lib/mock/wellness";
import { mockPainRegions } from "@/lib/mock/pain-regions";
import { mockAreaScores } from "@/lib/mock/multidisciplinary";
import { mockWeeklyLoad } from "@/lib/mock/weekly-load";
import { cn } from "@/lib/utils";
import { AXIS_PROPS, GRID_PROPS, TOOLTIP_STYLE, shortDate } from "./chart-theme";
import { DemoRadio } from "./demo-radio";

type Section = "gps" | "strength" | "wellness" | "multi";

export default function PerformanceHubDemo() {
  const t = useTranslations("demos.hub");
  const locale = useLocale() as "pt" | "en";
  const [section, setSection] = useState<Section>("gps");
  const [category, setCategory] = useState<MockCategory>("U15");

  const gps = useMemo(
    () =>
      mockCategoryGps(category).map((d) => ({
        date: shortDate(d.date),
        dist: d.distanceM,
        hsr: d.hsrM,
      })),
    [category],
  );
  const strength = useMemo(() => mockStrengthTests(8), []);
  const wellness = useMemo(
    () =>
      mockWellnessSeries(14, 30).map((d) => ({
        date: shortDate(d.date),
        sleep: d.sleepQuality,
        fatigue: d.fatigue,
        stress: d.stress,
        soreness: d.muscleSoreness,
        hooper: d.hooperIndex,
        pse: d.postTrainingRpe,
      })),
    [],
  );
  const pain = useMemo(
    () =>
      mockPainRegions().map((p) => ({
        region: p.region[locale],
        reports: p.reports,
      })),
    [locale],
  );
  const radar = useMemo(
    () =>
      mockAreaScores().map((a) => ({
        area: a.area[locale],
        score: a.score,
      })),
    [locale],
  );

  const kpis = useMemo(() => {
    const sessions = mockWeeklyLoad(0).filter((d) => !d.rest).length;
    const avgHooper =
      Math.round(
        (wellness.reduce((sum, d) => sum + d.hooper, 0) / wellness.length) * 10,
      ) / 10;
    const flagged = strength.filter((s) => s.flagged).length;
    return [
      { value: String(sessions), label: t("kpiSessions") },
      { value: String(avgHooper), label: t("kpiHooper") },
      { value: String(flagged), label: t("kpiFlagged"), alert: flagged > 0 },
    ];
  }, [wellness, strength, t]);

  const wellnessSeries = [
    { key: "sleep", color: "var(--color-turf)", label: t("sleep") },
    { key: "fatigue", color: "var(--color-alert)", label: t("fatigue") },
    { key: "stress", color: "var(--color-data)", label: t("stress") },
    { key: "soreness", color: "var(--color-error)", label: t("soreness") },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      <dl className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-border bg-elevated px-3 py-2.5"
          >
            <dd
              className={cn(
                "font-mono text-lg font-semibold",
                "alert" in kpi && kpi.alert ? "text-error" : "text-turf",
              )}
            >
              {kpi.value}
            </dd>
            <dt className="text-[10px] leading-snug text-muted">{kpi.label}</dt>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <DemoRadio<Section>
          label={t("section")}
          value={section}
          onChange={setSection}
          options={[
            { value: "gps", label: t("gpsSection") },
            { value: "strength", label: t("strength") },
            { value: "wellness", label: t("wellness") },
            { value: "multi", label: t("multi") },
          ]}
        />
        {section === "gps" && (
          <label className="flex items-center gap-2 text-xs text-muted">
            {t("category")}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MockCategory)}
              className="rounded-md border border-border bg-elevated px-2 py-1.5 text-xs text-chalk"
            >
              {(["U15", "U17", "U20"] as const).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {section === "gps" && (
        <figure>
          <figcaption className="mb-2 text-xs text-muted">
            {t("gpsChartTitle")}
          </figcaption>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <BarChart data={gps} margin={{ top: 4, right: 0, left: -14 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="date" {...AXIS_PROPS} />
                <YAxis yAxisId="dist" {...AXIS_PROPS} />
                <YAxis
                  yAxisId="hsr"
                  orientation="right"
                  width={34}
                  {...AXIS_PROPS}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar
                  yAxisId="dist"
                  name={t("distance")}
                  dataKey="dist"
                  fill="var(--color-data)"
                  fillOpacity={0.45}
                  radius={[3, 3, 0, 0]}
                  isAnimationActive={false}
                />
                <Bar
                  yAxisId="hsr"
                  name={t("hsr")}
                  dataKey="hsr"
                  fill="var(--color-turf)"
                  fillOpacity={0.7}
                  radius={[3, 3, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      )}

      {section === "strength" && (
        <div className="flex flex-col gap-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colAthlete")}
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colLeft")}
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colRight")}
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    {t("colAsym")}
                  </th>
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
                        {test.asymmetryPct}%
                        {test.flagged ? ` (${t("flagged")})` : ""}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure>
            <figcaption className="mb-2 text-xs text-muted">
              {t("scatterTitle")}
            </figcaption>
            <div className="h-52 w-full">
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 4, right: 8, left: -10 }}>
                  <CartesianGrid {...GRID_PROPS} vertical />
                  <XAxis
                    type="number"
                    dataKey="leftN"
                    domain={[240, 460]}
                    name="L"
                    {...AXIS_PROPS}
                  />
                  <YAxis
                    type="number"
                    dataKey="rightN"
                    domain={[240, 460]}
                    name="R"
                    {...AXIS_PROPS}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ stroke: "var(--color-border)" }}
                  />
                  <Scatter
                    data={strength.filter((s) => !s.flagged)}
                    fill="var(--color-data)"
                    isAnimationActive={false}
                  />
                  <Scatter
                    data={strength.filter((s) => s.flagged)}
                    fill="var(--color-error)"
                    isAnimationActive={false}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </figure>
        </div>
      )}

      {section === "wellness" && (
        <div className="flex flex-col gap-5">
          <figure>
            <figcaption className="mb-2 text-xs text-muted">
              {t("wellnessHooperTitle")}
            </figcaption>
            <div className="h-52 w-full">
              <ResponsiveContainer>
                <LineChart
                  data={wellness}
                  margin={{ top: 4, right: 8, left: -18 }}
                >
                  <CartesianGrid {...GRID_PROPS} />
                  <XAxis dataKey="date" {...AXIS_PROPS} />
                  <YAxis domain={[1, 7]} {...AXIS_PROPS} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  {wellnessSeries.map((s) => (
                    <Line
                      key={s.key}
                      name={s.label}
                      type="monotone"
                      dataKey={s.key}
                      stroke={s.color}
                      strokeWidth={1.8}
                      dot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 flex flex-wrap gap-3 text-[10px] text-muted">
              {wellnessSeries.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-1">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.label}
                </span>
              ))}
            </p>
          </figure>
          <div className="grid gap-5 md:grid-cols-2">
            <figure>
              <figcaption className="mb-2 text-xs text-muted">
                {t("wellnessPseTitle")}
              </figcaption>
              <div className="h-40 w-full">
                <ResponsiveContainer>
                  <BarChart
                    data={wellness}
                    margin={{ top: 4, right: 8, left: -22 }}
                  >
                    <CartesianGrid {...GRID_PROPS} />
                    <XAxis dataKey="date" {...AXIS_PROPS} />
                    <YAxis domain={[0, 10]} {...AXIS_PROPS} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Bar
                      dataKey="pse"
                      fill="var(--color-turf)"
                      fillOpacity={0.55}
                      radius={[3, 3, 0, 0]}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </figure>
            <figure>
              <figcaption className="mb-2 text-xs text-muted">
                {t("painTitle")}
              </figcaption>
              <div className="h-40 w-full">
                <ResponsiveContainer>
                  <BarChart
                    data={pain}
                    layout="vertical"
                    margin={{ top: 4, right: 8, left: 30 }}
                  >
                    <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
                    <XAxis type="number" allowDecimals={false} {...AXIS_PROPS} />
                    <YAxis
                      type="category"
                      dataKey="region"
                      width={80}
                      {...AXIS_PROPS}
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Bar
                      dataKey="reports"
                      fill="var(--color-alert)"
                      fillOpacity={0.65}
                      radius={[0, 3, 3, 0]}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </figure>
          </div>
        </div>
      )}

      {section === "multi" && (
        <figure>
          <figcaption className="mb-2 text-xs text-muted">
            {t("radarTitle")}
          </figcaption>
          <div className="h-60 w-full">
            <ResponsiveContainer>
              <RadarChart data={radar} outerRadius="75%">
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis
                  dataKey="area"
                  tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                />
                <Radar
                  dataKey="score"
                  stroke="var(--color-data)"
                  fill="var(--color-data)"
                  fillOpacity={0.25}
                  isAnimationActive={false}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      )}

      <p className="text-xs italic text-muted/80">{t("radioNote")}</p>
    </div>
  );
}
