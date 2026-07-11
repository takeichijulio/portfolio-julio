"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Gauge, Route, TrendingUp } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockAthletes } from "@/lib/mock/athletes";
import { mockGpsSession } from "@/lib/mock/gps";
import { mockWeeklyLoad, type LoadBand } from "@/lib/mock/weekly-load";
import { mockWeeklyTargets, type TargetMetric } from "@/lib/mock/metas";
import { mockMaximos, type MaxScope } from "@/lib/mock/maximos";
import { mockWellnessSeries } from "@/lib/mock/wellness";
import { cn } from "@/lib/utils";
import { AXIS_PROPS, GRID_PROPS, TOOLTIP_STYLE, shortDate } from "./chart-theme";
import { DemoRadio } from "./demo-radio";

type Tab = "session" | "load" | "targets" | "maximos" | "wellness";
type WellnessSeries = "hooper" | "sleep" | "fatigue" | "soreness";

const BAND_STYLE: Record<LoadBand, string> = {
  low: "bg-turf/10 text-turf border-turf/30",
  medium: "bg-alert/10 text-alert border-alert/30",
  high: "bg-error/10 text-error border-error/30",
};

const SERIES_COLOR: Record<WellnessSeries, string> = {
  hooper: "var(--color-data)",
  sleep: "var(--color-turf)",
  fatigue: "var(--color-alert)",
  soreness: "var(--color-error)",
};

export default function GpsDemo() {
  const t = useTranslations("demos.gps");
  const locale = useLocale() as "pt" | "en";
  const athletes = useMemo(() => mockAthletes(12), []);
  const [athleteIndex, setAthleteIndex] = useState(0);
  const [tab, setTab] = useState<Tab>("load");
  const [scope, setScope] = useState<MaxScope>("season");
  const [series, setSeries] = useState<WellnessSeries[]>(["hooper"]);

  const session = useMemo(() => mockGpsSession(12), []);
  const weekly = useMemo(() => mockWeeklyLoad(athleteIndex), [athleteIndex]);
  const targets = useMemo(() => mockWeeklyTargets(athleteIndex), [athleteIndex]);
  const maximos = useMemo(() => mockMaximos(athleteIndex), [athleteIndex]);
  const wellness = useMemo(
    () =>
      mockWellnessSeries(14, athleteIndex).map((d) => ({
        date: shortDate(d.date),
        hooper: d.hooperIndex,
        sleep: d.sleepQuality,
        fatigue: d.fatigue,
        soreness: d.muscleSoreness,
        pse: d.postTrainingRpe,
      })),
    [athleteIndex],
  );
  const composed = useMemo(
    () =>
      weekly.map((d) => ({
        date: shortDate(d.date),
        dist: d.distanceM,
        pse: d.pse,
      })),
    [weekly],
  );

  const metricLabel: Record<TargetMetric, string> = {
    distance: t("metricDistance"),
    hsr: t("metricHsr"),
    sprints: t("metricSprints"),
  };

  const maxCards = [
    {
      icon: Gauge,
      label: t("maxSpeed"),
      value: `${maximos[scope].topSpeedKmh.toFixed(1)} km/h`,
    },
    {
      icon: Route,
      label: t("maxDistance"),
      value: `${maximos[scope].maxSessionDistanceM} m`,
    },
    {
      icon: TrendingUp,
      label: t("maxLoad"),
      value: `${maximos[scope].maxSessionUa} UA`,
    },
  ];

  function toggleSeries(key: WellnessSeries) {
    setSeries((prev) =>
      prev.includes(key)
        ? prev.length > 1
          ? prev.filter((s) => s !== key)
          : prev
        : [...prev, key],
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DemoRadio<Tab>
          label="view"
          value={tab}
          onChange={setTab}
          options={[
            { value: "session", label: t("tabSession") },
            { value: "load", label: t("tabLoad") },
            { value: "targets", label: t("tabTargets") },
            { value: "maximos", label: t("tabMaximos") },
            { value: "wellness", label: t("tabWellness") },
          ]}
        />
        {tab !== "session" && (
          <label className="flex items-center gap-2 text-xs text-muted">
            {t("athlete")}
            <select
              value={athleteIndex}
              onChange={(e) => setAthleteIndex(Number(e.target.value))}
              className="rounded-md border border-border bg-elevated px-2 py-1.5 text-xs text-chalk"
            >
              {athletes.map((athlete, i) => (
                <option key={athlete.id} value={i}>
                  {athlete.name[locale]}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {tab === "session" &&
        (session.length === 0 ? (
          <p className="text-sm text-muted">{t("empty")}</p>
        ) : (
          <div>
            <p className="mb-2 text-xs text-muted/80">{t("selectHint")}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th scope="col" className="py-2 pr-3 font-medium">
                      {t("colAthlete")}
                    </th>
                    <th scope="col" className="py-2 pr-3 font-medium">
                      {t("colDistance")}
                    </th>
                    <th scope="col" className="py-2 pr-3 font-medium">
                      {t("colHighIntensity")}
                    </th>
                    <th scope="col" className="py-2 pr-3 font-medium">
                      {t("colSprints")}
                    </th>
                    <th scope="col" className="py-2 font-medium">
                      {t("colTopSpeed")}
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {session.map((row, i) => (
                    <tr
                      key={row.athlete.id}
                      onClick={() => setAthleteIndex(i)}
                      className={cn(
                        "cursor-pointer border-b border-border/50 text-chalk transition-colors hover:bg-elevated/60",
                        i === athleteIndex && "bg-data/10",
                      )}
                    >
                      <td className="py-1.5 pr-3 font-sans text-muted">
                        {row.athlete.name[locale]}
                      </td>
                      <td className="py-1.5 pr-3">{row.totalDistanceM}</td>
                      <td className="py-1.5 pr-3">{row.highIntensityM}</td>
                      <td className="py-1.5 pr-3">{row.sprints}</td>
                      <td className="py-1.5">{row.topSpeedKmh.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {tab === "load" && (
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-xs text-muted">{t("weeklyTitle")}</p>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {weekly.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-center",
                    day.rest
                      ? "border-border bg-elevated/40 text-muted/60"
                      : BAND_STYLE[day.band],
                  )}
                >
                  <p className="font-mono text-[10px] opacity-80">
                    {shortDate(day.date)}
                  </p>
                  {day.rest ? (
                    <p className="mt-1 text-[10px]">{t("rest")}</p>
                  ) : (
                    <>
                      <p className="mt-1 font-mono text-sm font-semibold">
                        {day.pse}
                      </p>
                      <p className="text-[10px] opacity-80">
                        {day.ua} {t("ua")}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] text-muted/70">
              {t("pse")} ·{" "}
              <span className="text-turf">{t("bandLow")}</span> ·{" "}
              <span className="text-alert">{t("bandMedium")}</span> ·{" "}
              <span className="text-error">{t("bandHigh")}</span>
            </p>
          </div>
          <figure>
            <figcaption className="mb-2 text-xs text-muted">
              {t("composedTitle")}
            </figcaption>
            <div className="h-52 w-full">
              <ResponsiveContainer>
                <ComposedChart
                  data={composed}
                  margin={{ top: 4, right: 0, left: -18 }}
                >
                  <CartesianGrid {...GRID_PROPS} />
                  <XAxis dataKey="date" {...AXIS_PROPS} />
                  <YAxis yAxisId="dist" {...AXIS_PROPS} />
                  <YAxis
                    yAxisId="pse"
                    orientation="right"
                    domain={[0, 10]}
                    width={28}
                    {...AXIS_PROPS}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar
                    yAxisId="dist"
                    dataKey="dist"
                    fill="var(--color-data)"
                    fillOpacity={0.35}
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  />
                  <Line
                    yAxisId="pse"
                    type="monotone"
                    dataKey="pse"
                    stroke="var(--color-alert)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </figure>
        </div>
      )}

      {tab === "targets" && (
        <div>
          <p className="mb-2 text-xs text-muted">{t("targetsTitle")}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colMetric")}
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colRealized")}
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colTarget")}
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    {t("colPct")}
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {targets.map((row) => {
                  const off = row.pct < 80 || row.pct > 120;
                  return (
                    <tr
                      key={row.metric}
                      className="border-b border-border/50 text-chalk"
                    >
                      <td className="py-2 pr-3 font-sans text-muted">
                        {metricLabel[row.metric]}
                      </td>
                      <td className="py-2 pr-3">{row.realized}</td>
                      <td className="py-2 pr-3 text-muted">{row.target}</td>
                      <td className="py-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5",
                            off
                              ? row.pct < 80
                                ? "bg-error/15 text-error"
                                : "bg-alert/15 text-alert"
                              : "bg-turf/15 text-turf",
                          )}
                        >
                          {row.pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-muted/70">{t("targetsLegend")}</p>
        </div>
      )}

      {tab === "maximos" && (
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted">{t("maximosTitle")}</p>
            <DemoRadio<MaxScope>
              label="scope"
              value={scope}
              onChange={setScope}
              options={[
                { value: "season", label: t("scopeSeason") },
                { value: "last90", label: t("scope90") },
              ]}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {maxCards.map((card) => (
              <div
                key={card.label}
                className="rounded-lg border border-border bg-elevated px-4 py-4"
              >
                <card.icon aria-hidden size={16} className="text-data" />
                <p className="mt-2 font-mono text-xl font-semibold text-chalk">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "wellness" && (
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted">{t("wellnessTitle")}</p>
              <div className="flex flex-wrap gap-1.5">
                {(
                  ["hooper", "sleep", "fatigue", "soreness"] as WellnessSeries[]
                ).map((key) => (
                  <button
                    key={key}
                    aria-pressed={series.includes(key)}
                    onClick={() => toggleSeries(key)}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors",
                      series.includes(key)
                        ? "border-data/60 bg-data/10 text-chalk"
                        : "border-border text-muted hover:text-chalk",
                    )}
                  >
                    <span
                      aria-hidden
                      className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: SERIES_COLOR[key] }}
                    />
                    {t(
                      `series${key.charAt(0).toUpperCase() + key.slice(1)}` as
                        | "seriesHooper"
                        | "seriesSleep"
                        | "seriesFatigue"
                        | "seriesSoreness",
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="h-52 w-full"
              role="img"
              aria-label={t("wellnessTitle")}
            >
              <ResponsiveContainer>
                <LineChart
                  data={wellness}
                  margin={{ top: 4, right: 8, left: -18 }}
                >
                  <CartesianGrid {...GRID_PROPS} />
                  <XAxis dataKey="date" {...AXIS_PROPS} />
                  <YAxis {...AXIS_PROPS} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  {series.map((key) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={SERIES_COLOR[key]}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <figure>
            <figcaption className="mb-2 text-xs text-muted">
              {t("pseBarsTitle")}
            </figcaption>
            <div className="h-36 w-full">
              <ResponsiveContainer>
                <ComposedChart
                  data={wellness}
                  margin={{ top: 4, right: 8, left: -18 }}
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
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}
