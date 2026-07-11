"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

/** Loading state do demo (ui-ux-pro-max): skeleton, não spinner. */
function DemoSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-24" />
      </div>
      <Skeleton className="h-56 w-full" />
    </div>
  );
}

const loading = () => <DemoSkeleton />;

/** Demos pesadas (Recharts) carregam client-side sob demanda. */
const DEMOS: Record<string, React.ComponentType> = {
  "gps-load-dashboard": dynamic(() => import("./gps-demo"), {
    ssr: false,
    loading,
  }),
  "performance-hub": dynamic(() => import("./performance-hub-demo"), {
    ssr: false,
    loading,
  }),
  "evaluations-hub": dynamic(() => import("./evaluations-demo"), {
    ssr: false,
    loading,
  }),
  "local-ai-agent": dynamic(() => import("./agent-demo"), {
    ssr: false,
    loading,
  }),
  "personal-ops": dynamic(() => import("./personal-ops-demo"), {
    ssr: false,
    loading,
  }),
};

export function DemoSection({ slug }: { slug: string }) {
  const Demo = DEMOS[slug];
  if (!Demo) return null;
  return <Demo />;
}
