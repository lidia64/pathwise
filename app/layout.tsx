import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getLanguageOption } from "@/lib/i18n/languages";
import { getRequestLanguage } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translations";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  return {
    title: `Pathwise | ${translate(language, "common.tagline", "From Vulnerability to Resilience")}`,
    description: translate(
      language,
      "landing.heroDescription",
      "Explore financial inclusion, vulnerability and social protection evidence to support decision-making in Rwanda."
    ),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const language = getLanguageOption(await getRequestLanguage());

  return (
    <html
      lang={language.htmlLang}
      dir={language.direction}
      className={`${poppins.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
