"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarX2 } from "lucide-react";
import {
  MOCK_AREAS,
  mockCompliance,
  type MockAttendance,
} from "@/lib/mock/evaluations";
import {
  mockAssessmentCalendar,
  type CalendarCategory,
} from "@/lib/mock/assessment-calendar";
import { cn } from "@/lib/utils";
import { shortDate } from "./chart-theme";
import { DemoRadio } from "./demo-radio";

const STATUS_ORDER: MockAttendance[] = [
  "present",
  "absent",
  "justified",
  "rescheduled",
];

const STATUS_STYLE: Record<MockAttendance, string> = {
  present: "bg-turf/15 text-turf",
  absent: "bg-error/15 text-error",
  justified: "bg-alert/15 text-alert",
  rescheduled: "bg-data/15 text-data",
};

const CATEGORY_SEED: Record<CalendarCategory, number> = {
  U15: 0,
  U17: 40,
  U20: 80,
};

export default function EvaluationsDemo() {
  const t = useTranslations("demos.evals");
  const locale = useLocale() as "pt" | "en";
  const [category, setCategory] = useState<CalendarCategory>("U15");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  // estado só do demo — pills alternam status localmente, reset ao sair
  const [overrides, setOverrides] = useState<Record<string, MockAttendance>>({});

  const rows = useMemo(
    () => mockCompliance(CATEGORY_SEED[category]),
    [category],
  );
  const calendar = useMemo(() => mockAssessmentCalendar(), []);
  const filteredCalendar = useMemo(
    () =>
      calendar.map((day) => ({
        ...day,
        assessments: day.assessments.filter((a) => a.category === category),
      })),
    [calendar, category],
  );
  const hasAny = filteredCalendar.some((d) => d.assessments.length > 0);
  const selected = filteredCalendar.find((d) => d.date === selectedDay);

  function cycleStatus(areaSlug: string, current: MockAttendance) {
    const next =
      STATUS_ORDER[(STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length];
    setOverrides((prev) => ({ ...prev, [`${category}-${areaSlug}`]: next }));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DemoRadio<CalendarCategory>
          label={t("category")}
          value={category}
          onChange={(c) => {
            setCategory(c);
            setSelectedDay(null);
          }}
          options={[
            { value: "U15", label: "U15" },
            { value: "U17", label: "U17" },
            { value: "U20", label: "U20" },
          ]}
        />
      </div>
      <p className="text-[10px] text-muted/70">{t("hint")}</p>

      {!hasAny ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-8 text-center">
          <CalendarX2 aria-hidden size={20} className="text-muted" />
          <p className="max-w-xs text-xs text-muted">{t("emptyFilter")}</p>
        </div>
      ) : (
        <>
          <div>
            <p className="mb-2 text-xs text-muted">{t("calendarTitle")}</p>
            <div className="grid grid-cols-7 gap-1.5">
              {filteredCalendar.map((day) => {
                const active = day.date === selectedDay;
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDay(active ? null : day.date)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-colors",
                      active
                        ? "border-data/60 bg-data/10"
                        : "border-border hover:border-muted",
                    )}
                  >
                    <span className="font-mono text-[10px] text-muted">
                      {shortDate(day.date)}
                    </span>
                    <span className="flex min-h-1.5 flex-wrap justify-center gap-0.5">
                      {day.assessments.map((a, i) => (
                        <span
                          key={`${a.areaSlug}-${i}`}
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-turf"
                        />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
            {selected && (
              <div className="mt-2 rounded-lg border border-border bg-elevated px-3 py-2.5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {t("dayDetailTitle")} — {shortDate(selected.date)}
                </p>
                {selected.assessments.length === 0 ? (
                  <p className="mt-1 text-xs text-muted">{t("noAssessments")}</p>
                ) : (
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {selected.assessments.map((a, i) => {
                      const area = MOCK_AREAS.find(
                        (m) => m.slug === a.areaSlug,
                      );
                      return (
                        <li
                          key={`${a.areaSlug}-${i}`}
                          className="rounded-full border border-turf/40 bg-turf/10 px-2.5 py-0.5 text-xs text-turf"
                        >
                          {area?.[locale]} · {a.category}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colArea")}
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {t("colCompliance")}
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    {t("colStatus")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const status =
                    overrides[`${category}-${row.area.slug}`] ?? row.lastStatus;
                  return (
                    <tr
                      key={row.area.slug}
                      className="border-b border-border/50"
                    >
                      <td className="py-2 pr-3 text-chalk">
                        {row.area[locale]}
                      </td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-elevated">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                row.weeklyCompliancePct >= 70
                                  ? "bg-turf"
                                  : "bg-alert",
                              )}
                              style={{ width: `${row.weeklyCompliancePct}%` }}
                            />
                          </div>
                          <span className="font-mono text-muted">
                            {row.weeklyCompliancePct}%
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => cycleStatus(row.area.slug, status)}
                          className={cn(
                            "rounded-full px-2 py-0.5 font-medium transition-opacity hover:opacity-80",
                            STATUS_STYLE[status],
                          )}
                        >
                          {t(`status.${status}`)}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
