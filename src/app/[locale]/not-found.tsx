import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";

/** 404 custom — bola "fora do campo" (SVG leve, animação CSS com guard). */
export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-32 text-center">
      <svg
        aria-hidden
        width="120"
        height="72"
        viewBox="0 0 120 72"
        fill="none"
        className="text-muted"
      >
        {/* linha de fundo do campo */}
        <line
          x1="4"
          y1="64"
          x2="72"
          y2="64"
          stroke="var(--color-line)"
          strokeWidth="3"
        />
        {/* bola saindo do campo */}
        <g className="ball-out">
          <circle
            cx="92"
            cy="52"
            r="11"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M92 45l5 4-2 6h-6l-2-6z"
            fill="currentColor"
            opacity="0.7"
          />
        </g>
      </svg>
      <p className="font-mono text-sm uppercase tracking-widest text-turf">
        404
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight text-chalk">
        {t("title")}
      </h1>
      <p className="max-w-md text-muted">{t("message")}</p>
      <Link href="/" className={buttonClasses("primary")}>
        {t("cta")}
      </Link>
    </section>
  );
}
