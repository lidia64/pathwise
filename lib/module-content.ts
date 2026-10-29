import type { AppIconName } from "@/lib/app-types";

export const overviewIndicators = [
  "Financial inclusion",
  "Financial vulnerability",
  "Poverty context",
  "Social protection",
] as const;

export const vulnerabilityDomains = [
  {
    title: "Financial health",
    detail: "Indicator definitions and source mapping pending verification.",
  },
  {
    title: "Poverty context",
    detail: "Population, reference period and welfare measures pending review.",
  },
  {
    title: "Savings",
    detail: "Savings concepts and survey variables pending verification.",
  },
  {
    title: "Income stability",
    detail: "Income definitions and reference periods pending verification.",
  },
  {
    title: "Shock exposure",
    detail: "Shock measures and recall periods pending verification.",
  },
] as const;

export const pathwayCategories: {
  title: string;
  icon: AppIconName;
  description: string;
}[] = [
  {
    title: "Financial resilience",
    icon: "overview",
    description:
      "A category for exploring evidence related to financial security and capacity to manage needs.",
  },
  {
    title: "Shock resilience",
    icon: "vulnerability",
    description:
      "A category for exploring evidence related to exposure to shocks and ways households respond.",
  },
  {
    title: "Productive finance",
    icon: "impact",
    description:
      "A category for exploring evidence related to finance and productive activity.",
  },
  {
    title: "Skills and livelihoods",
    icon: "pathways",
    description:
      "A category for exploring evidence related to skills, work and livelihood opportunities.",
  },
  {
    title: "Social protection",
    icon: "geography",
    description:
      "A category for exploring evidence related to social-protection programmes and context.",
  },
];

export const intendedSources = [
  {
    name: "NISR FinScope 2024",
    intendedRole:
      "Financial inclusion and financial-service use; specific indicators and survey documentation require verification.",
    reviewNote:
      "The report and questionnaire were inspected. No microdata, codebook or released weight field was found in the project files.",
    status: "Documents inspected · no microdata",
  },
  {
    name: "EICV7 2023/24",
    intendedRole:
      "Household welfare and poverty context; measures, units and survey documentation require verification.",
    reviewNote:
      "EICV7 household microdata and a variable dictionary were not present in the inspected project files.",
    status: "Microdata not present",
  },
  {
    name: "Relevant EICV7 VUP material",
    intendedRole:
      "Social-protection programme context; dataset scope and available variables require verification.",
    reviewNote:
      "A short thematic summary was inspected; the linked full report and tables workbook were not present.",
    status: "Summary only · full tables absent",
  },
] as const;
