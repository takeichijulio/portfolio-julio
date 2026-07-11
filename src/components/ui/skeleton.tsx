import { cn } from "@/lib/utils";

/** Skeleton loader padrão (ui-ux-pro-max: skeleton, não spinner). */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-md bg-elevated motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
