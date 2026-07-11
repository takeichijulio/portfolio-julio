"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { mockCompliance, type MockAttendance } from "@/lib/mock/evaluations";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<MockAttendance, string> = {
  present: "bg-turf/15 text-turf",
  absent: "bg-error/15 text-error",
  justified: "bg-alert/15 text-alert",
  rescheduled: "bg-data/15 text-data",
};

export default function EvaluationsDemo() {
  const t = useTranslations("demos.evals");
  const locale = useLocale() as "pt" | "en";
  const rows = useMemo(() => mockCompliance(), []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-xs">
        <thead>
          <tr className="border-b border-border text-muted">
            <th scope="col" className="py-2 pr-3 font-medium">{t("colArea")}</th>
            <th scope="col" className="py-2 pr-3 font-medium">{t("colCompliance")}</th>
            <th scope="col" className="py-2 font-medium">{t("colStatus")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.area.slug} className="border-b border-border/50">
              <td className="py-2 pr-3 text-chalk">{row.area[locale]}</td>
              <td className="py-2 pr-3">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-28 overflow-hidden rounded-full bg-elevated">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        row.weeklyCompliancePct >= 70 ? "bg-turf" : "bg-alert",
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
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-medium",
                    STATUS_STYLE[row.lastStatus],
                  )}
                >
                  {t(`status.${row.lastStatus}`)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
