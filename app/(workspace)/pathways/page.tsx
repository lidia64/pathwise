import type { Metadata } from "next";
import { AppIcon } from "@/components/app-icons";
import { PageHeader } from "@/components/page-header";
import {
  DataStatus,
  EmptyState,
  SectionPanel,
} from "@/components/workspace-components";
import { JourneyNextStep } from "@/components/journey-next-step";
import { pathwayCategories } from "@/lib/module-content";
import { getMessages } from "@/lib/i18n/server";

const pathwayKeys = [
  "financialResilience",
  "shockResilience",
  "productiveFinance",
  "skillsLivelihoods",
  "socialProtection",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { language, translate } = await getMessages();
  return {
    title: `${translate(language, "pathways.title", "Pathway Explorer")} | Pathwise`,
  };
}

export default async function PathwaysPage() {
  const { language, translate } = await getMessages();
  const t = (key: string, english: string) =>
    translate(language, `pathways.${key}`, english);
  return (
    <div className="workspace-content">
      <PageHeader
        eyebrow="Transparent, evidence-led exploration"
        title={t("title", "Pathway Explorer")}
        description="Explore potential pathway categories as questions for investigation. No pathway is recommended for a real population until its rule and required variables are verified."
      />

      <SectionPanel
        title={t("categories", "Pathway categories")}
        description="Categories are a framework for future rule-based exploration, not active recommendations."
        id="pathway-categories"
      >
        <div className="pathway-grid">
          {pathwayCategories.map((pathway, index) => (
            <article className="pathway-card" key={pathway.title}>
              <span className="pathway-icon">
                <AppIcon name={pathway.icon} />
              </span>
              <h3>{t(pathwayKeys[index], pathway.title)}</h3>
              <p>
                {t(
                  `${pathwayKeys[index]}Detail`,
                  pathway.description
                )}
              </p>
              <div className="pathway-rule-status">
                <DataStatus>
                  {t("ruleNotActivated", "Rule not activated")}
                </DataStatus>
                <span>
                  {t(
                    "variablesPending",
                    "Required variables pending verification"
                  )}
                </span>
              </div>
            </article>
          ))}
        </div>
      </SectionPanel>

      <SectionPanel
        title={t("actions", "Potential actions")}
        description="Pathwise does not currently recommend interventions. Decisions require verified evidence, programme context and human review."
        className="potential-actions-panel"
        id="potential-actions"
      >
        <div className="action-readiness">
          <p>
            Before an option is considered, a decision-maker should be able to
            review its target population, supporting evidence, delivery
            context, intended outcome and limitations.
          </p>
          <DataStatus>
            {t("noActions", "No intervention options verified")}
          </DataStatus>
        </div>
      </SectionPanel>

      <SectionPanel
        title="Evidence behind a pathway"
        description="An active rule would show its trigger, source and limitations."
        className="pathway-evidence-panel"
      >
        <EmptyState title={t("noSignals", "No pathway signals available")}>
          {t(
            "noSignalsDetail",
            "Required survey variables, definitions and rule logic have not yet been verified. This prototype does not make predictions or causal claims."
          )}
        </EmptyState>
      </SectionPanel>
      <JourneyNextStep
        href="/impact#monitoring-framework"
        stage="Define outcomes to monitor"
        description="Set a baseline, follow-up period, indicator source and limitations before interpreting change."
      />
    </div>
  );
}
