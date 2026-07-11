"use client";

import { cn } from "@/lib/utils";

/** Seletor estilo radio (não abas escondidas — lição do Performance Hub). */
export function DemoRadio<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex flex-wrap items-center gap-2"
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
            value === option.value
              ? "border-data/60 bg-data/10 text-data"
              : "border-border text-muted hover:border-muted hover:text-chalk",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
