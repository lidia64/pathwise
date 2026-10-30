import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import type { LanguageId } from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/translations";

export function SiteFooter({ language }: { language: LanguageId }) {
  const t = (key: string, english: string) => translate(language, key, english);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-identity">
            <Link
              className="brand footer-brand"
              href="/"
              aria-label={t("common.home", "Pathwise home")}
            >
              <BrandMark />
              <span className="brand-name">pathwise</span>
            </Link>
            <p className="footer-tagline">
              {t("common.tagline", "From Vulnerability to Resilience.")}
            </p>
          </div>
          <nav
            className="footer-navigation"
            aria-label={t("nav.footer", "Footer navigation")}
          >
            <Link href="/dashboard">{t("landing.explore", "Explore")}</Link>
            <Link href="/geography">{t("nav.geography", "Geographic")}</Link>
            <Link href="/methodology">
              {t("nav.methodology", "Methodology")}
            </Link>
            <Link href="/#about">{t("landing.about", "About")}</Link>
            <Link href="/methodology#sources">
              {t("footer.sources", "Sources & Limitations")}
            </Link>
          </nav>
        </div>
        <div className="footer-meta">
          <p className="footer-note">
            {t("footer.hackathon", "NISR 2026 Hackathon")}
          </p>
          <span className="footer-copyright">© 2026 Pathwise</span>
        </div>
      </div>
    </footer>
  );
}
