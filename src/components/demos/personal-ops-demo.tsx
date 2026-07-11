"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MOCK_EVENT_DAYS, MOCK_TASKS } from "@/lib/mock/agenda";
import { cn } from "@/lib/utils";

const DUE_KEY = { late: "late", today: "today", tomorrow: "tomorrow" } as const;

function monthGrid(): (number | null)[] {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const lead = first.getDay(); // 0 = domingo
  return [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
}

export default function PersonalOpsDemo() {
  const t = useTranslations("demos.ops");
  const locale = useLocale() as "pt" | "en";
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(MOCK_TASKS.map((task) => [task.id, task.done])),
  );

  const grid = useMemo(monthGrid, []);
  const todayNum = new Date().getDate();

  const groups = [
    {
      key: "late",
      label: t("lateGroup"),
      items: MOCK_TASKS.filter((task) => !done[task.id] && task.due === "late"),
    },
    {
      key: "today",
      label: t("today"),
      items: MOCK_TASKS.filter(
        (task) => !done[task.id] && task.due === "today",
      ),
    },
    {
      key: "upcoming",
      label: t("upcoming"),
      items: MOCK_TASKS.filter(
        (task) => !done[task.id] && task.due === "tomorrow",
      ),
    },
  ];
  const completed = MOCK_TASKS.filter((task) => done[task.id]);

  const transcript = [
    { from: "user", text: t("t1u") },
    { from: "bot", text: t("t1b") },
    { from: "user", text: t("t2u") },
    { from: "bot", text: t("t2b") },
    { from: "user", text: t("t3u") },
    { from: "bot", text: t("t3b") },
    { from: "user", text: t("t4u") },
    { from: "bot", text: t("t4b") },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
            {t("tasks")}
          </h4>
          {groups.every((g) => g.items.length === 0) ? (
            <p className="text-sm text-muted">{t("empty")}</p>
          ) : (
            groups.map(
              (group) =>
                group.items.length > 0 && (
                  <div key={group.key} className="mb-3">
                    <p className="mb-1.5 text-[10px] uppercase tracking-widest text-muted/70">
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {group.items.map((task) => (
                        <li key={task.id}>
                          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-elevated px-3 py-2 text-sm text-chalk">
                            <input
                              type="checkbox"
                              checked={false}
                              onChange={() =>
                                setDone((prev) => ({
                                  ...prev,
                                  [task.id]: true,
                                }))
                              }
                              className="accent-[var(--color-turf)]"
                            />
                            {task.title[locale]}
                            <span
                              className={cn(
                                "ml-auto rounded-full px-2 py-0.5 text-xs",
                                task.due === "late"
                                  ? "bg-error/15 text-error"
                                  : task.due === "today"
                                    ? "bg-alert/15 text-alert"
                                    : "bg-elevated text-muted",
                              )}
                            >
                              {t(DUE_KEY[task.due])}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )
          )}
          {completed.length > 0 && (
            <>
              <p className="mb-1.5 mt-2 text-[10px] uppercase tracking-widest text-muted/70">
                {t("done")}
              </p>
              <ul className="flex flex-col gap-1">
                {completed.map((task) => (
                  <li key={task.id}>
                    <label className="flex cursor-pointer items-center gap-2.5 px-3 py-1 text-sm text-muted line-through">
                      <input
                        type="checkbox"
                        checked
                        onChange={() =>
                          setDone((prev) => ({ ...prev, [task.id]: false }))
                        }
                        className="accent-[var(--color-turf)]"
                      />
                      {task.title[locale]}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div>
          <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
            {t("calendar")}
          </h4>
          <div className="grid max-w-64 grid-cols-7 gap-1">
            {grid.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center rounded text-[10px]",
                  day === null
                    ? ""
                    : day === todayNum
                      ? "bg-data/15 font-semibold text-data"
                      : "text-muted",
                )}
              >
                {day}
                {day !== null && MOCK_EVENT_DAYS.includes(day) && (
                  <span
                    aria-hidden
                    className="mt-0.5 h-1 w-1 rounded-full bg-turf"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {t("transcript")}
        </h4>
        <div className="flex flex-col gap-2">
          {transcript.map((msg, i) => (
            <p
              key={i}
              className={cn(
                "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                msg.from === "user"
                  ? "self-end rounded-br-sm bg-data/15 text-chalk"
                  : "self-start rounded-bl-sm bg-elevated text-muted",
              )}
            >
              {msg.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
