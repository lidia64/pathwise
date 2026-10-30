import type { Metadata } from "next";
import { AppIcon } from "@/components/app-icons";
import { JourneyNextStep } from "@/components/journey-next-step";
import { PageHeader } from "@/components/page-header";
import { RwandaGeographicExplorer } from "@/components/rwanda-geographic-explorer";
import {
  EmptyState,
  SectionPanel,
} from "@/components/workspace-components";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { geography } = await getMessages();
  return { title: `${geography.title} | Pathwise` };
}

const supportedProvinces = new Set([
  "Kigali City",
  "Southern Province",
  "Northern Province",
  "Eastern Province",
  "Western Province",
]);

export default async function GeographyPage({
  searchParams,
}: {
  searchParams: Promise<{
    province?: string | string[];
    location?: string | string[];
  }>;
}) {
  const { geography, common } = await getMessages();
  const params = await searchParams;
  const provinceValue = params.province ?? params.location;
  const requestedProvince = Array.isArray(provinceValue)
    ? provinceValue[0]
    : provinceValue;
  const initialProvince =
    requestedProvince === "City of Kigali"
      ? "Kigali City"
      : requestedProvince && supportedProvinces.has(requestedProvince)
        ? requestedProvince
        : undefined;
  const requirements = [
    geography.requirement1,
    geography.requirement2,
    geography.requirement3,
    geography.requirement4,
  ];

  return (
    <div className="workspace-content">
      <PageHeader
        eyebrow={geography.eyebrow}
        title={geography.title}
        description={geography.description}
      />

      <SectionPanel
        title={geography.mapTitle}
        description={geography.mapDescription}
        className="geographic-map-panel"
      >
        <RwandaGeographicExplorer
          labels={geography.mapLabels}
          intelligenceLabels={geography.intelligence}
          initialProvince={initialProvince}
        />
      </SectionPanel>

      <div className="geography-evidence-grid">
        <SectionPanel
          title={geography.availableTitle}
          description={geography.availableDescription}
        >
          <div className="geography-evidence-list">
            <article>
              <span className="source-icon" aria-hidden="true">
                <AppIcon name="source" />
              </span>
              <div>
                <h3>{geography.finscopeTitle}</h3>
                <p>{geography.finscopeDetail}</p>
              </div>
            </article>
            <article>
              <span className="source-icon" aria-hidden="true">
                <AppIcon name="source" />
              </span>
              <div>
                <h3>{geography.vupTitle}</h3>
                <p>{geography.vupDetail}</p>
              </div>
            </article>
          </div>
        </SectionPanel>
        <SectionPanel title={geography.supportedTitle}>
          <div className="supported-geography">
            <p>{geography.supportedDetail}</p>
          </div>
        </SectionPanel>
      </div>

      <SectionPanel
        title={geography.possibleTitle}
        description={geography.possibleDescription}
        className="geography-possible-panel"
      >
        <ul className="geography-checklist">
          <li>{geography.possibleItem1}</li>
          <li>{geography.possibleItem2}</li>
          <li>{geography.possibleItem3}</li>
        </ul>
      </SectionPanel>

      <SectionPanel
        title={geography.requirementsTitle}
        description={geography.requirementsDescription}
        className="geography-requirements-panel"
      >
        <ol className="geography-requirements">
          {requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ol>
      </SectionPanel>

      <SectionPanel title={geography.limitationsTitle}>
        <EmptyState title={geography.supportedLevel}>
          {geography.limitationsDetail}
        </EmptyState>
        <p className="geography-source-note">
          <strong>{geography.sourceLabel}: </strong>
          {geography.sourceNote}{" "}
          <span dir="ltr">
            FinScope 2024 questionnaire, PDF p. 1; FinScope final report, PDF
            pp. 20–21; EICV7 VUP summary, PDF p. 1.
          </span>
        </p>
      </SectionPanel>

      <JourneyNextStep
        href="/vulnerability"
        stage={geography.next}
        description={geography.nextCopy}
        messages={common}
      />
    </div>
  );
}
