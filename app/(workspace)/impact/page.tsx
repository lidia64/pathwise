import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import {
  DataStatus,
  EmptyState,
  SectionPanel,
} from "@/components/workspace-components";
import { JourneyNextStep } from "@/components/journey-next-step";
import { getMessages } from "@/lib/i18n/server";

const frameworkFields = [
  {
    key: "baseline",
    label: "Baseline",
    description: "Baseline source, definition and reference period.",
  },
  {
    key: "followUp",
    label: "Follow-up",
    description: "Follow-up source, definition and reference period.",
  },
  {
    key: "indicator",
    label: "Indicator",
    description: "Verified indicator and unit of measurement.",
  },
  {
    key: "source",
    label: "Source",
    description: "Dataset and documentation reference.",
  },
  {
    key: "reportingPeriod",
    label: "Reporting period",
    description: "Comparable reporting dates and frequency.",
  },
  {
    key: "limitations",
    label: "Limitations",
    description: "Coverage, comparability and interpretation notes.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { language, translate } = await getMessages();
  return {
    title: `${translate(language, "impact.title", "Impact Monitoring")} | Pathwise`,
  };
}

export default async function ImpactPage() {
  const { language, translate } = await getMessages();
  const t = (key: string, english: string) =>
    translate(language, `impact.${key}`, english);
  return (
    <div className="workspace-content">
      <PageHeader
        eyebrow="Evidence over time"
        title={t("title", "Impact Monitoring")}
        description="A framework for documenting verified indicators, sources and reporting periods. This page does not present achieved impact or projected improvements."
      />

      <SectionPanel
        title={t("framework", "Monitoring framework")}
        description="All fields remain unpopulated until suitable data and definitions are confirmed."
        id="monitoring-framework"
      >
        <div className="framework-grid">
          {frameworkFields.map((field) => (
            <article className="framework-card" key={field.label}>
              <span>{t(field.key, field.label)}</span>
              <p>{t(`${field.key}Detail`, field.description)}</p>
              <DataStatus>
                {translate(language, "common.pending", "Awaiting verified data")}
              </DataStatus>
            </article>
          ))}
        </div>
      </SectionPanel>

      <SectionPanel
        title={t("reporting", "Indicator reporting")}
        description="No comparisons are shown unless definitions, population and reference periods support them."
        className="reporting-panel"
      >
        <div className="table-scroll">
          <table className="evidence-table">
            <thead>
              <tr>
                <th scope="col">Indicator</th>
                <th scope="col">Baseline</th>
                <th scope="col">Follow-up</th>
                <th scope="col">Source and period</th>
                <th scope="col">Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <EmptyState>
                    {t(
                      "noSeries",
                      "No verified impact-monitoring series are available."
                    )}
                  </EmptyState>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionPanel>
      <JourneyNextStep
        href="/methodology#sources"
        stage="Check evidence standards"
        description="Review source scope, population alignment, weighting requirements and limitations."
      />
    </div>
  );
}
