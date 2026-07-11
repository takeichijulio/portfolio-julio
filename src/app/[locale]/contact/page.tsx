import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ExternalLink, Mail } from "lucide-react";

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const tNav = useTranslations("nav");
  const tStub = useTranslations("stub");

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        {tNav("contact")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{tStub("contact")}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="mailto:juliotakeichi@outlook.com"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
        >
          <Mail aria-hidden size={16} />
          juliotakeichi@outlook.com
        </a>
        <a
          href="https://github.com/takeichijulio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
        >
          <ExternalLink aria-hidden size={16} />
          github.com/takeichijulio
        </a>
      </div>
    </section>
  );
}
