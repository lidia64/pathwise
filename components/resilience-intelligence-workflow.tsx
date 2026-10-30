"use client";

import { useState, type FormEvent } from "react";

type PathwayId =
  | "financialCapability"
  | "savings"
  | "agriculturalLivelihoods"
  | "youthWomen"
  | "socialProtection";

type PlanFields = {
  challenge: string;
  intervention: string;
  beneficiaries: string;
  stakeholders: string;
  timeline: string;
  indicators: string;
};

type Plan = PlanFields & {
  pathway: PathwayId;
  location: string;
};

export type ResilienceWorkflowLabels = {
  locationTitle: string;
  locationDescription: string;
  province: string;
  district: string;
  sector: string;
  unavailable: string;
  noDistricts: string;
  noSectors: string;
  profileTitle: string;
  profileDescription: string;
  noLocalEstimates: string;
  source: string;
  year: string;
  definition: string;
  limitation: string;
  diagnosticsTitle: string;
  diagnosticsDescription: string;
  pathwaysTitle: string;
  pathwaysDescription: string;
  choosePathway: string;
  whyRelevant: string;
  supportingEvidence: string;
  prerequisites: string;
  beneficiaries: string;
  tradeoffs: string;
  planTitle: string;
  planDescription: string;
  planValidationMessage: string;
  createPlan: string;
  planCreated: string;
  localOnly: string;
  evidenceReferences: string;
  fields: Record<keyof PlanFields, string>;
  pathways: Record<PathwayId, string>;
};

const evidence = [
  {
    name: "Financial inclusion",
    definition:
      "FinScope defines inclusion around adults having or using formal and/or informal financial products or services. This is a source definition, not a calculated local indicator.",
    source: "NISR FinScope 2024 presentation, PDF p. 9; questionnaire, PDF pp. 12–23",
    year: "2024",
    limitation:
      "No FinScope respondent records, released weights, verified field mapping, or geographic estimates are connected.",
  },
  {
    name: "Financial health",
    definition:
      "The questionnaire contains separate items about emergency funds, liquidity, shocks, and coping. They are candidate measures, not a validated composite score.",
    source: "NISR FinScope 2024 questionnaire, PDF pp. 6–8 and 24–28",
    year: "2024",
    limitation:
      "No item-level data or validated local financial-health definition is available.",
  },
  {
    name: "Poverty",
    definition:
      "The inspected EICV7 VUP summary describes poverty for VUP programme households; it does not establish a general household or local poverty estimate.",
    source: "EICV7 VUP thematic summary, PDF p. 1",
    year: "2023/24",
    limitation:
      "The full report, tables workbook, microdata, definitions, and area-specific estimates are not connected.",
  },
  {
    name: "Living conditions",
    definition:
      "The local VUP summary provides programme-specific household welfare context. A verified, general living-conditions indicator series is not connected.",
    source: "EICV7 VUP thematic summary, PDF pp. 1–4",
    year: "2023/24",
    limitation:
      "VUP beneficiary findings cannot be generalized to all households or mapped to these boundaries.",
  },
  {
    name: "Social protection",
    definition:
      "FinScope questionnaire items refer to social-protection income sources and VUP cash transfers; the VUP summary covers programme participants.",
    source: "NISR FinScope 2024 questionnaire, PDF pp. 41–43 and 50; EICV7 VUP summary, PDF pp. 1–4",
    year: "2024; 2023/24",
    limitation:
      "The surveys have different populations; no linked records, local coverage, or validated eligibility estimates are available.",
  },
] as const;

const diagnostics = [
  {
    question:
      "Which barriers, if any, do residents report when accessing formal or informal financial services, and which groups or locations are missing from existing evidence?",
    evidence: "FinScope 2024 presentation, PDF p. 9; questionnaire, PDF pp. 12–23",
  },
  {
    question:
      "How do residents describe emergency savings, liquidity constraints, unexpected expenses, and coping options?",
    evidence: "FinScope 2024 questionnaire, PDF pp. 6–8 and 24–28",
  },
  {
    question:
      "Which poverty and living-condition definitions, populations, and reference periods would be appropriate for this location?",
    evidence: "EICV7 VUP thematic summary, PDF pp. 1–4; full tables are unavailable",
  },
  {
    question:
      "What local information can distinguish social-protection eligibility, enrolment, receipt, and unmet need?",
    evidence: "FinScope 2024 questionnaire, PDF pp. 41–43 and 50; EICV7 VUP summary",
  },
  {
    question:
      "What district/sector identifiers, disaggregated evidence, and data-quality checks are needed before describing local conditions?",
    evidence: "FinScope 2024 final report, PDF pp. 20–21; source verification audit",
  },
] as const;

const pathways: {
  id: PathwayId;
  why: string;
  evidence: string;
  prerequisites: string;
  beneficiaries: string;
  tradeoffs: string;
}[] = [
  {
    id: "financialCapability",
    why: "A possible option to assess if local consultation identifies demand for accessible, practical financial information. No local need is established.",
    evidence:
      "FinScope describes a financial-inclusion framework and asks about financial products; no selected-area result is available.",
    prerequisites:
      "Local needs assessment, accessible and tested materials, qualified facilitators, and referral options that are actually available.",
    beneficiaries:
      "People who choose to participate after a locally validated needs assessment; no group is presumed to need this.",
    tradeoffs:
      "Information alone may not address service access, affordability, trust, or income constraints; avoid shifting responsibility to individuals.",
  },
  {
    id: "savings",
    why: "A savings-focused option can be explored only if local consultation and verified service mapping show it is appropriate and voluntary.",
    evidence:
      "FinScope questionnaire includes savings and emergency-fund items; there are no linked local responses or estimates.",
    prerequisites:
      "Safe, regulated and accessible options, transparent fees, consumer-protection safeguards, and evidence of voluntary demand.",
    beneficiaries:
      "Residents who identify a suitable savings goal and freely opt in; avoid eligibility based on assumed local poverty.",
    tradeoffs:
      "Product fees, liquidity needs, income volatility, and unsuitable products may harm participants or exclude those least able to save.",
  },
  {
    id: "agriculturalLivelihoods",
    why: "An agricultural livelihoods idea is a hypothesis, not a finding about this location; consider it only after local livelihood and market assessment.",
    evidence:
      "The inspected sources do not provide verified selected-area agricultural needs, production, market, or climate-risk estimates.",
    prerequisites:
      "Local consultation and assessment of land access, climate and market risks, inputs, extension support, and safe financing.",
    beneficiaries:
      "People whose livelihoods and preferences are locally confirmed to fit a proposed activity; do not assume all households farm.",
    tradeoffs:
      "Weather and price risks, land-tenure barriers, debt exposure, unpaid care burdens, and environmental impacts require review.",
  },
  {
    id: "youthWomen",
    why: "Youth and women's economic opportunities may be explored as an inclusive design question; local barriers or unmet demand are not established.",
    evidence:
      "The inspected publications do not provide linked province-, district-, or sector-level opportunity or barrier estimates for these groups.",
    prerequisites:
      "Consultation with diverse youth and women, safeguarding, accessible schedules and locations, childcare/accessibility review, and market-linked options.",
    beneficiaries:
      "Youth and women who help define priorities and choose to participate; disaggregate safely and avoid treating either group as homogeneous.",
    tradeoffs:
      "Risk of reinforcing stereotypes, exclusion, unsafe participation, unpaid work, or displacement without safeguarding and participant feedback.",
  },
  {
    id: "socialProtection",
    why: "A social-protection access or referral option can be assessed if programme owners verify local services, eligibility, and gaps.",
    evidence:
      "The EICV7 VUP summary is programme-specific; it does not verify selected-area coverage or unmet need.",
    prerequisites:
      "Current programme rules, local service directory, consent-based referrals, clear grievance routes, and coordination with responsible agencies.",
    beneficiaries:
      "People confirmed eligible through official processes, with inclusive referral routes; this prototype cannot determine eligibility.",
    tradeoffs:
      "Outdated eligibility information, exclusion errors, privacy risks, stigma, and service capacity constraints must be managed.",
  },
];

const emptyPlan: PlanFields = {
  challenge: "",
  intervention: "",
  beneficiaries: "",
  stakeholders: "",
  timeline: "",
  indicators: "",
};

const planFieldOrder: (keyof PlanFields)[] = [
  "challenge",
  "intervention",
  "beneficiaries",
  "stakeholders",
  "timeline",
  "indicators",
];

function isPathwayId(value: string): value is PathwayId {
  return pathways.some((pathway) => pathway.id === value);
}

export function ResilienceIntelligenceWorkflow({
  province,
  labels,
}: {
  province: string;
  labels: ResilienceWorkflowLabels;
}) {
  const [pathwayId, setPathwayId] = useState<PathwayId | "">("");
  const [fields, setFields] = useState<PlanFields>(emptyPlan);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [planError, setPlanError] = useState(false);
  const selectedPathway = pathways.find((pathway) => pathway.id === pathwayId);

  function createPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !selectedPathway ||
      Object.values(fields).some((value) => value.trim().length === 0)
    ) {
      setPlanError(true);
      return;
    }

    setPlan({ ...fields, pathway: selectedPathway.id, location: province });
    setPlanError(false);
  }

  return (
    <div className="resilience-intelligence">
      <section className="intelligence-location" aria-labelledby="intelligence-location-title">
        <h3 id="intelligence-location-title">{labels.locationTitle}</h3>
        <p>{labels.locationDescription}</p>
        <p className="intelligence-selected-location">
          <strong>{labels.province}:</strong> {province}
        </p>
        <div className="intelligence-location-levels">
          <label>
            <span>{labels.district}</span>
            <select disabled aria-describedby="district-unavailable">
              <option>{labels.noDistricts}</option>
            </select>
          </label>
          <label>
            <span>{labels.sector}</span>
            <select disabled aria-describedby="sector-unavailable">
              <option>{labels.noSectors}</option>
            </select>
          </label>
        </div>
        <p id="district-unavailable" className="intelligence-level-note">
          {labels.unavailable}
        </p>
        <p id="sector-unavailable" className="intelligence-level-note">
          {labels.unavailable}
        </p>
      </section>

      <section aria-labelledby="intelligence-profile-title">
        <div className="intelligence-section-heading">
          <h3 id="intelligence-profile-title">{labels.profileTitle}</h3>
          <p>{labels.profileDescription}</p>
        </div>
        <p className="intelligence-data-status" role="status">
          {labels.noLocalEstimates}
        </p>
        <div className="intelligence-evidence-grid">
          {evidence.map((item) => (
            <article className="intelligence-evidence-card" key={item.name}>
              <h4>{item.name}</h4>
              <p>{item.definition}</p>
              <dl>
                <div>
                  <dt>{labels.source}</dt>
                  <dd>{item.source}</dd>
                </div>
                <div>
                  <dt>{labels.year}</dt>
                  <dd>{item.year}</dd>
                </div>
                <div>
                  <dt>{labels.limitation}</dt>
                  <dd>{item.limitation}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="intelligence-diagnostics-title">
        <div className="intelligence-section-heading">
          <h3 id="intelligence-diagnostics-title">{labels.diagnosticsTitle}</h3>
          <p>{labels.diagnosticsDescription}</p>
        </div>
        <ol className="intelligence-question-list">
          {diagnostics.map((item) => (
            <li key={item.question}>
              <p>{item.question}</p>
              <span>{item.evidence}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="intelligence-pathways-title">
        <div className="intelligence-section-heading">
          <h3 id="intelligence-pathways-title">{labels.pathwaysTitle}</h3>
          <p>{labels.pathwaysDescription}</p>
        </div>
        <label className="intelligence-pathway-select">
          <span>{labels.choosePathway}</span>
          <select
            value={pathwayId}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setPathwayId(isPathwayId(value) ? value : "");
              setPlan(null);
              setPlanError(false);
            }}
          >
            <option value="">Select a potential pathway</option>
            {pathways.map((pathway) => (
              <option key={pathway.id} value={pathway.id}>
                {labels.pathways[pathway.id]}
              </option>
            ))}
          </select>
        </label>

        {selectedPathway && (
          <article className="intelligence-pathway-detail">
            <p className="intelligence-hypothesis-label">
              Hypothetical option · not a location-specific recommendation
            </p>
            <h4>{labels.pathways[selectedPathway.id]}</h4>
            <dl>
              <div>
                <dt>{labels.whyRelevant}</dt>
                <dd>{selectedPathway.why}</dd>
              </div>
              <div>
                <dt>{labels.supportingEvidence}</dt>
                <dd>{selectedPathway.evidence}</dd>
              </div>
              <div>
                <dt>{labels.prerequisites}</dt>
                <dd>{selectedPathway.prerequisites}</dd>
              </div>
              <div>
                <dt>{labels.beneficiaries}</dt>
                <dd>{selectedPathway.beneficiaries}</dd>
              </div>
              <div>
                <dt>{labels.tradeoffs}</dt>
                <dd>{selectedPathway.tradeoffs}</dd>
              </div>
            </dl>
          </article>
        )}
      </section>

      <section aria-labelledby="intelligence-plan-title">
        <div className="intelligence-section-heading">
          <h3 id="intelligence-plan-title">{labels.planTitle}</h3>
          <p>{labels.planDescription}</p>
        </div>
        {selectedPathway ? (
          <form className="intelligence-plan-form" onSubmit={createPlan}>
            {planFieldOrder.map((field) => (
              <label key={field}>
                <span>{labels.fields[field]}</span>
                <textarea
                  required
                  rows={field === "intervention" ? 3 : 2}
                  value={fields[field]}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setFields((current) => ({
                      ...current,
                      [field]: value,
                    }));
                    setPlan(null);
                    setPlanError(false);
                  }}
                />
              </label>
            ))}
            {planError && (
              <p className="intelligence-plan-error" role="alert">
                {labels.planValidationMessage}
              </p>
            )}
            <p className="intelligence-level-note">
              Enter locally validated information. No local conditions or impact
              are inferred by this tool.
            </p>
            <button type="submit">{labels.createPlan}</button>
          </form>
        ) : (
          <p className="intelligence-empty-state">
            Choose a potential pathway above to draft a plan.
          </p>
        )}

        {plan && selectedPathway && (
          <article className="intelligence-plan-preview" aria-live="polite">
            <h4>{labels.planCreated}</h4>
            <p>
              <strong>{labels.province}:</strong> {plan.location}
              {" · "}
              <strong>Pathway:</strong> {labels.pathways[plan.pathway]}
            </p>
            <dl>
              {planFieldOrder.map((field) => (
                <div key={field}>
                  <dt>{labels.fields[field]}</dt>
                  <dd>{plan[field]}</dd>
                </div>
              ))}
            </dl>
            <h5>{labels.evidenceReferences}</h5>
            <ul>
              <li>FinScope 2024 source and questionnaire references shown above</li>
              <li>EICV7 VUP thematic summary references shown above</li>
              <li>Pathway assumptions require local validation before use</li>
            </ul>
            <p className="intelligence-level-note">{labels.localOnly}</p>
          </article>
        )}
      </section>
    </div>
  );
}
