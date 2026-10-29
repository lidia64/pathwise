import Link from "next/link";
import type { LanguageId } from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/translations";

const stages = [
  {
    key: "data",
    label: "Data",
    detail: "Check source, population and indicator readiness.",
    href: "/methodology#sources",
  },
  {
    key: "vulnerability",
    label: "Vulnerability",
    detail: "Review evidence domains without treating them as scores.",
    href: "/vulnerability#indicator-domains",
  },
  {
    key: "bottleneck",
    label: "Bottleneck",
    detail: "Frame constraints as questions to investigate.",
    href: "/vulnerability#bottlenecks",
  },
  {
    key: "pathway",
    label: "Pathway",
    detail: "Explore transparent categories, not recommendations.",
    href: "/pathways#pathway-categories",
  },
  {
    key: "action",
    label: "Action",
    detail: "Consider options only with evidence and programme context.",
    href: "/pathways#potential-actions",
  },
  {
    key: "outcome",
    label: "Outcome",
    detail: "Define measures, time periods and limitations.",
    href: "/impact#monitoring-framework",
  },
] as const;

export function DecisionFlow({ language = "en" }: { language?: LanguageId }) {
  return (
    <ol
      className="decision-flow"
      aria-label={translate(language, "flow.aria", "Pathwise decision-support flow")}
    >
      {stages.map((stage, index) => (
        <li className="decision-flow-step" key={stage.label}>
          <Link href={stage.href}>
            <span className="decision-flow-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="decision-flow-copy">
              <strong>{translate(language, `flow.${stage.key}`, stage.label)}</strong>
              <span>
                {translate(language, `flow.${stage.key}Detail`, stage.detail)}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
