"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon, type AppIconName } from "@/components/app-icons";
import { BrandMark } from "@/components/brand-mark";
import type { LanguageId } from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/translations";
import { LanguageSwitcher } from "@/components/language-switcher";

const navigationItems: {
  href: string;
  id: string;
  label: string;
  icon: AppIconName;
}[] = [
  { href: "/dashboard", id: "overview", label: "Overview", icon: "overview" },
  { href: "/geography", id: "geography", label: "Geography", icon: "geography" },
  { href: "/vulnerability", id: "vulnerability", label: "Vulnerability", icon: "vulnerability" },
  { href: "/pathways", id: "pathways", label: "Pathways", icon: "pathways" },
  { href: "/impact", id: "impact", label: "Impact", icon: "impact" },
  { href: "/methodology", id: "methodology", label: "Methodology", icon: "methodology" },
];

export function AppNavigation({ language }: { language: LanguageId }) {
  const pathname = usePathname();
  const items = navigationItems.map((item) => ({
    ...item,
    label: translate(language, `nav.${item.id}`, item.label),
  }));
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link className="brand app-brand" href="/" aria-label={translate(language, "common.home", "Pathwise home")}>
          <BrandMark />
          <span className="brand-name">pathwise</span>
        </Link>
        <nav className="app-nav" aria-label="Application navigation">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                className={`app-nav-link${isActive ? " is-active" : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                <AppIcon name={item.icon} className="app-nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <LanguageSwitcher language={language} />
      </div>
    </header>
  );
}
