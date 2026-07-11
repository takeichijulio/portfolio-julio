import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-data text-pitch hover:opacity-90 focus-visible:outline-data font-medium",
  outline:
    "border border-border text-chalk hover:border-data hover:text-data focus-visible:outline-data",
  ghost: "text-muted hover:text-chalk focus-visible:outline-data",
};

export function buttonClasses(variant: Variant = "primary") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
    VARIANTS[variant],
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(buttonClasses(variant), className)} {...props} />
  );
}
