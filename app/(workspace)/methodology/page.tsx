import type { Metadata } from "next";
import { AppIcon } from "@/components/app-icons";
import { PageHeader } from "@/components/page-header";
import {
  DataStatus,
  EmptyState,
  SectionPanel,
} from "@/components/workspace-components";
import { JourneyNextStep } from "@/components/journey-next-step";
import { intendedSources } from "@/lib/module-content";
import { getMessages } from "@/lib/i18n/server";

const methodologyTopics = [
  {
    key: "units",
    title: "Units of analysis",
    body: "The unit for each source and indicator must be confirmed from dataset documentation before aggregation or comparison.",
  },
  {
    key: "definitions",
    title: "Indicator definitions",
    body: "Names, response categories, denominator, population and reference period must be checked against source documentation.",
  },
  {
    key: "weights",
    title: "Survey weights and aggregation",
    body: "Weighting, strata, clusters, estimation methods and any geographic aggregation require dataset-specific review.",
  },
  {
    key: "comparability",
    title: "Comparability",
    body: "Indicators are compared only when populations, geography, definitions and reference periods support a defensible comparison.",
  },
  {
    key: "rules",
    title: "Pathway rules",
    body: "Pathways will use transparent rules and activate only when all required variables and their source definitions are verified.",
  },
  {
    key: "limitations",
    title: "Limitations",
    body: "Survey design, coverage, missingness, uncertainty and differences between sources will be documented alongside results.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { language, translate } = await getMessages();
  return {
    title: `${translate(language, "methodology.title", "Methodology and Data Sources")} | Pathwise`,
  };
}

export default async function MethodologyPage() {
  const { language, translate } = await getMessages();
  const t = (key: string, english: string) =>
    translate(language, `methodology.${key}`, english);
  return (
    <div className="workspace-content">
      <PageHeader
        eyebrow="Evidence standards"
        title={t("title", "Methodology and Data Sources")}
        description="Pathwise is designed to make sources, definitions and analytical limitations visible so that evidence is not overstated or combined inappropriately."
      />

      <SectionPanel
        title={t("sources", "Sources")}
        description="These are intended source roles, pending dataset and documentation inspection."
        id="sources"
      >
        <div className="method-source-grid">
          {intendedSources.map((source, index) => {
            const sourceKey = (["finscope", "eicv", "vup"] as const)[index];
            return (
            <article className="method-source-card" key={source.name}>
              <span className="method-source-icon">
                <AppIcon name="source" />
              </span>
              <h3>{t(sourceKey, source.name)}</h3>
              <p>{t(`${sourceKey}Role`, source.intendedRole)}</p>
              <p className="source-review-note">
                {t(`${sourceKey}Review`, source.reviewNote)}
              </p>
              <DataStatus>
                {t(`${sourceKey}Status`, source.status)}
              </DataStatus>
            </article>
            );
          })}
        </div>
      </SectionPanel>

      <div className="methodology-grid">
        {methodologyTopics.map((topic) => (
          <SectionPanel
            key={topic.title}
            title={t(topic.key, topic.title)}
            className="method-topic"
          >
            <p className="method-topic-body">
              {t(`${topic.key}Detail`, topic.body)}
            </p>
            <DataStatus>
              {translate(language, "common.pending", "Pending dataset inspection")}
            </DataStatus>
          </SectionPanel>
        ))}
      </div>

      <SectionPanel
        title={t("crossSurvey", "Cross-survey use")}
        description={t(
          "crossSurveyDescription",
          "FinScope, EICV7 and VUP material are treated as distinct evidence sources."
        )}
        className="cross-survey-panel"
      >
        <EmptyState
          title={t(
            "noLinking",
            "Respondents are not linked across surveys"
          )}
        >
          {t(
            "noLinkingDetail",
            "Pathwise will not merge respondent records from separate surveys as though they were the same people. Comparisons will be considered only when the geography, population, reference period and statistical definitions are sufficiently aligned."
          )}
        </EmptyState>
      </SectionPanel>
      <JourneyNextStep
        href="/dashboard"
        stage="Return to the evidence overview"
        description="See the current evidence-readiness status and continue to a module."
      />
    </div>
  );
}
