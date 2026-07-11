import { cn } from "@/lib/utils";

type Variant = "default" | "turf" | "data" | "alert";

const VARIANTS: Record<Variant, string> = {
  default: "border-border bg-elevated text-muted",
  turf: "border-turf/40 bg-turf/10 text-turf",
  data: "border-data/40 bg-data/10 text-data",
  alert: "border-alert/40 bg-alert/10 text-alert",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
