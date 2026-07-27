import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import { routing } from "@/i18n/routing";
import { PitchGrid } from "@/components/pitch-grid";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HudBackgrounds, ScrollProgress, HudEffects } from "@/components/fx";
import "../globals.css";

// Orbitron substitui Space Grotesk (decisão D5, PRD-01 §3.2/3.3): só display
// (H1, H2, rótulos uppercase), nunca corpo de texto — Inter continua no body.
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative flex min-h-screen flex-col">
        {/*
          O CSS esconde [data-reveal]/.kinetic por padrão pra não haver
          piscada. Sem JS nada revelaria, entao o noscript devolve tudo.
          Markup estático, identico no servidor e no cliente: não mexe na
          hidratação (ver <HudEffects />).
        */}
        <noscript>
          <style>{`[data-reveal],.kinetic{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <NextIntlClientProvider>
          <PitchGrid />
          <HudBackgrounds />
          <ScrollProgress />
          <HudEffects />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
