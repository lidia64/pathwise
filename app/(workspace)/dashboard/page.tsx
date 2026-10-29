import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon } from "@/components/app-icons";
import { PageHeader } from "@/components/page-header";
import {
  DataStatus,
  EmptyState,
  SectionPanel,
} from "@/components/workspace-components";
import { DecisionFlow } from "@/components/decision-flow";
import { intendedSources, overviewIndicators } from "@/lib/module-content";
import { getMessages } from "@/lib/i18n/server";

const modules = [
  { href: "/geography", label: "Explore geography", icon: "geography" as const },
  {
    href: "/vulnerability",
    label: "Review vulnerability",
    icon: "vulnerability" as const,
  },
  { href: "/pathways", label: "Explore pathways", icon: "pathways" as const },
  { href: "/impact", label: "View impact framework", icon: "impact" as const },
];

export async function generateMetadata(): Promise<Metadata> {
  const { language, translate } = await getMessages();
  return {
    title: `${translate(language, "dashboard.title", "Rwanda Financial Resilience Overview")} | Pathwise`,
  };
}

export default async function DashboardPage() {
  const { language, translate } = await getMessages();
  const t = (key: string, english: string) =>
    translate(language, `dashboard.${key}`, english);
  return (
    <div className="workspace-content">
      <PageHeader
        eyebrow={t("eyebrow", "National overview")}
        title={t("title", "Rwanda Financial Resilience Overview")}
        description="Start with the evidence that is available, see what is not yet supported, and move from vulnerability questions toward potential pathways and measurable outcomes. No survey estimates are calculated in this release."
      />

      <SectionPanel
        title={t("readinessTitle", "Evidence readiness")}
        description="Source documents are available for context, but no respondent-level data are connected to Pathwise."
        className="evidence-readiness-panel"
      >
        <div className="readiness-grid">
          <article>
            <span className="readiness-label">{t("sourceMaterial", "Source material")}</span>
            <strong>4 documents audited</strong>
            <p>
              FinScope publications and questionnaire, plus the EICV7 VUP
              summary. The full VUP report and tables workbook were not in the
              project listing.
            </p>
          </article>
          <article>
            <span className="readiness-label">{t("surveyEstimates", "Survey estimates")}</span>
            <strong>Not connected</strong>
            <p>
              No microdata, verified variable mappings or Pathwise-calculated
              estimates are available.
            </p>
          </article>
          <article>
            <span className="readiness-label">{t("decisionSupport", "Decision support")}</span>
            <strong>Framework only</strong>
            <p>
              No geographic estimates, active pathway rules or impact series
              are presented.
            </p>
          </article>
        </div>
        <Link className="inline-link readiness-link" href="/methodology#sources">
          Review source scope and limitations
          <AppIcon name="arrow" />
        </Link>
      </SectionPanel>

      <section className="kpi-grid" aria-label="Overview indicator status">
        {overviewIndicators.map((indicator) => (
          <article className="kpi-card" key={indicator}>
            <p>{indicator}</p>
            <span className="kpi-value">—</span>
            <DataStatus />
            <details className="indicator-detail">
              <summary>About this domain</summary>
              <p>
                This is an evidence domain, not a verified Pathwise estimate.
                Review the source and population notes before interpreting it.
              </p>
            </details>
          </article>
        ))}
      </section>

      <SectionPanel
        title={t("followPathway", "Follow the decision pathway")}
        description="Move from source readiness to questions, potential actions and outcomes. Each stage is exploratory and does not imply causation."
        className="dashboard-flow-panel"
      >
        <DecisionFlow />
      </SectionPanel>

      <div className="dashboard-grid">
        <SectionPanel
          title={t("comparison", "Indicator comparison")}
          description="Compare indicators only after source, population and reference period are verified."
        >
          <div className="table-scroll">
            <table className="evidence-table">
              <thead>
                <tr>
                  <th scope="col">{t("indicatorDomain", "Indicator domain")}</th>
                  <th scope="col">{t("source", "Source")}</th>
                  <th scope="col">{t("referencePeriod", "Reference period")}</th>
                  <th scope="col">{t("status", "Status")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4}>
                    <EmptyState>
                      No verified indicator comparisons are available yet.
                    </EmptyState>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionPanel>

        <SectionPanel
          title={t("geographicInsights", "Geographic insights")}
          description="Place-based evidence will be shown when geography and estimates are verified."
          className="geographic-insights"
        >
          <div className="geographic-preview">
            <span className="preview-map-icon">
              <AppIcon name="geography" />
            </span>
            <p>No geographic estimates are connected.</p>
            <Link className="inline-link" href="/geography">
              {t("openGeography", "Review Geographic Evidence")}
              <AppIcon name="arrow" />
            </Link>
          </div>
        </SectionPanel>

        <SectionPanel
          title={t("recentSources", "Evidence and sources")}
          description="The audit distinguishes inspected publications from unavailable datasets and metadata."
          className="source-panel"
        >
          <ul className="source-list">
            {intendedSources.map((source) => (
              <li key={source.name}>
                <span className="source-icon">
                  <AppIcon name="source" />
                </span>
                <span className="source-copy">
                  <strong>{source.name}</strong>
                  <span>{source.intendedRole}</span>
                  <span>{source.reviewNote}</span>
                </span>
                <DataStatus>{source.status}</DataStatus>
              </li>
            ))}
          </ul>
        </SectionPanel>

        <SectionPanel
          title={t("exploreModules", "Explore the modules")}
          description="Move between the evidence questions Pathwise is designed to support."
          className="module-links-panel"
        >
          <nav className="module-link-list" aria-label="Explore Pathwise modules">
            {modules.map((module) => (
              <Link className="module-link" href={module.href} key={module.href}>
                <AppIcon name={module.icon} />
                {module.label}
                <AppIcon name="arrow" className="module-link-arrow" />
              </Link>
            ))}
          </nav>
        </SectionPanel>
      </div>
    </div>
  );
}
