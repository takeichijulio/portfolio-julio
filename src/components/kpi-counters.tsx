"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { mockGpsSeries, mockGpsSession } from "@/lib/mock/gps";

interface Kpi {
  value: number;
  labelKey: "kpiDistance" | "kpiSessions" | "kpiAthletes";
}

function buildKpis(): Kpi[] {
  const series = mockGpsSeries(14);
  const session = mockGpsSession(12);
  const totalKm = Math.round(
    series.reduce((sum, row) => sum + row.totalDistanceM, 0) / 1000,
  );
  return [
    { value: totalKm, labelKey: "kpiDistance" },
    { value: series.length, labelKey: "kpiSessions" },
    { value: session.length, labelKey: "kpiAthletes" },
  ];
}

function Counter({ target, animate }: { target: number; animate: boolean }) {
  const [value, setValue] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate) return;
    const duration = 900;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, animate]);

  return <>{value}</>;
}

/** KPIs do hero — números fictícios de lib/mock/, rotulados como demo. */
export function KpiCounters() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [kpis] = useState(buildKpis);

  return (
    <div ref={ref} className="mt-10 w-full max-w-2xl">
      <dl className="grid grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.labelKey}
            className="rounded-xl border border-border bg-surface px-4 py-4"
          >
            <dt className="order-last mt-1 text-xs leading-snug text-muted">
              {t(kpi.labelKey)}
            </dt>
            <dd className="font-mono text-2xl font-semibold text-data sm:text-3xl">
              <Counter target={kpi.value} animate={!reduced && inView} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted/80">{t("kpiCaption")}</p>
    </div>
  );
}
