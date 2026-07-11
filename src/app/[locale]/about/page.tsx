import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function AboutPage({
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
        {tNav("about")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{tStub("about")}</p>
    </section>
  );
}
