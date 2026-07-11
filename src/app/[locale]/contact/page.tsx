import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ExternalLink, Mail } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const tNav = useTranslations("nav");
  const t = useTranslations("contact");

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight text-chalk">
        {tNav("contact")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{t("lead")}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="mailto:juliotakeichi@outlook.com"
          className={buttonClasses("outline")}
        >
          <Mail aria-hidden size={16} />
          juliotakeichi@outlook.com
        </a>
        <a
          href="https://github.com/takeichijulio"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("outline")}
        >
          <ExternalLink aria-hidden size={16} />
          github.com/takeichijulio
        </a>
      </div>
    </section>
  );
}
