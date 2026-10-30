import type { ReactNode } from "react";
import { AppNavigation } from "@/components/app-navigation";
import { SiteFooter } from "@/components/site-footer";
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
      <SiteFooter language={language} />
    </div>
  );
}
