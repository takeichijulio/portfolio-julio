"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MOCK_TASKS } from "@/lib/mock/agenda";
import { cn } from "@/lib/utils";

const DUE_KEY = { late: "late", today: "today", tomorrow: "tomorrow" } as const;

export default function PersonalOpsDemo() {
  const t = useTranslations("demos.ops");
  const locale = useLocale() as "pt" | "en";
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(MOCK_TASKS.map((task) => [task.id, task.done])),
  );

  const active = MOCK_TASKS.filter((task) => !done[task.id]);
  const completed = MOCK_TASKS.filter((task) => done[task.id]);

  const transcript = [
    { from: "user", text: t("msgUser1") },
    { from: "bot", text: t("msgBot1") },
    { from: "user", text: t("msgUser2") },
    { from: "bot", text: t("msgBot2") },
    { from: "user", text: t("msgUser3") },
    { from: "bot", text: t("msgBot3") },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {t("tasks")}
        </h4>
        {active.length === 0 ? (
          <p className="text-sm text-muted">{t("empty")}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {active.map((task) => (
              <li key={task.id}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-elevated px-3 py-2 text-sm text-chalk">
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() =>
                      setDone((prev) => ({ ...prev, [task.id]: true }))
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
        )}
        {completed.length > 0 && (
          <>
            <h4 className="mb-2 mt-4 font-mono text-xs uppercase tracking-widest text-muted">
              {t("done")}
            </h4>
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
