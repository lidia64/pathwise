import Link from "next/link";
import type { ReactNode } from "react";
import { AppNavigation } from "@/components/app-navigation";
import { BrandMark } from "@/components/brand-mark";
import type { LanguageId } from "@/lib/i18n/languages";
import { getMessages } from "@/lib/i18n/server";

export async function AppShell({
  children,
  language,
}: {
  children: ReactNode;
  language: LanguageId;
}) {
  const { translate } = await getMessages();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {translate(language, "common.skip", "Skip to content")}
      </a>
      <AppNavigation language={language} />
      <main className="app-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="app-footer">
        <div className="app-footer-inner">
          <Link
            className="brand app-footer-brand"
            href="/"
            aria-label={translate(language, "common.home", "Pathwise home")}
          >
            <BrandMark />
            <span className="brand-name">pathwise</span>
          </Link>
          <p>{translate(language, "common.tagline", "From Vulnerability to Resilience.")}</p>
          <span>
            {translate(language, "common.footer", "Evidence-led decision support")}
            <span className="footer-divider" aria-hidden="true">·</span>
            {translate(language, "common.hackathon", "NISR Big Data Hackathon")}
          </span>
        </div>
      </footer>
    </div>
  );
}
