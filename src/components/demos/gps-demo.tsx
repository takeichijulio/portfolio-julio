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
import { mockAthletes } from "@/lib/mock/athletes";
import { mockGpsSeriesFor, mockGpsSession } from "@/lib/mock/gps";
import { mockWellnessSeries } from "@/lib/mock/wellness";
import { AXIS_PROPS, GRID_PROPS, TOOLTIP_STYLE, shortDate } from "./chart-theme";
import { DemoRadio } from "./demo-radio";

type Tab = "session" | "load" | "wellness";

export default function GpsDemo() {
  const t = useTranslations("demos.gps");
  const locale = useLocale() as "pt" | "en";
  const athletes = useMemo(() => mockAthletes(12), []);
  const [athleteIndex, setAthleteIndex] = useState(0);
  const [tab, setTab] = useState<Tab>("load");

  const session = useMemo(() => mockGpsSession(12), []);
  const series = useMemo(
    () =>
      mockGpsSeriesFor(athleteIndex, 14).map((row) => ({
        date: shortDate(row.date),
        dist: row.totalDistanceM,
      })),
    [athleteIndex],
  );
  const wellness = useMemo(
    () =>
      mockWellnessSeries(14, athleteIndex).map((day) => ({
        date: shortDate(day.date),
        hooper: day.hooperIndex,
      })),
    [athleteIndex],
  );

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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="py-2 pr-3 font-medium">{t("colAthlete")}</th>
                  <th className="py-2 pr-3 font-medium">{t("colDistance")}</th>
                  <th className="py-2 pr-3 font-medium">
                    {t("colHighIntensity")}
                  </th>
                  <th className="py-2 pr-3 font-medium">{t("colSprints")}</th>
                  <th className="py-2 font-medium">{t("colTopSpeed")}</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {session.map((row) => (
                  <tr
                    key={row.athlete.id}
                    className="border-b border-border/50 text-chalk"
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
        ))}

      {tab === "load" && (
        <figure>
          <figcaption className="mb-2 text-xs text-muted">
            {t("chartDistance")}
          </figcaption>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <LineChart data={series} margin={{ top: 4, right: 8, left: -18 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="date" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="dist"
                  stroke="var(--color-data)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </figure>
      )}

      {tab === "wellness" && (
        <figure>
          <figcaption className="mb-2 text-xs text-muted">
            {t("chartHooper")}
          </figcaption>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <LineChart
                data={wellness}
                margin={{ top: 4, right: 8, left: -18 }}
              >
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
        </figure>
      )}
    </div>
  );
}
