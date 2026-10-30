import "server-only";

import { cookies } from "next/headers";
import {
  readLanguageCookie,
  type LanguageId,
} from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/translations";

export async function getRequestLanguage(): Promise<LanguageId> {
  const cookieStore = await cookies();
  return readLanguageCookie(cookieStore.get("pathwise-language")?.value);
}

export async function getMessages() {
  const language = await getRequestLanguage();
  const t = (key: string, english: string) => translate(language, key, english);

  return {
    language,
    translate,
    common: {
      skip: t("common.skip", "Skip to content"),
      continue: t("common.continue", "Continue"),
      nextJourney: t("common.nextJourney", "Continue the decision journey"),
      tagline: t("common.tagline", "From Vulnerability to Resilience."),
      footer: t("common.footer", "Evidence-led decision support"),
      hackathon: t("common.hackathon", "NISR Big Data Hackathon"),
      home: t("common.home", "Pathwise home"),
      apply: t("common.apply", "Apply"),
    },
    geography: {
      eyebrow: t("geo.eyebrow", "Place-based evidence"),
      title: t("geo.title", "Geographic Evidence"),
      description: t("geo.description", "Understand which geographic information is documented, what it can support, and what is needed before a valid map or place comparison can be published."),
      mapTitle: t("geo.mapTitle", "Rwanda administrative reference map"),
      mapDescription: t("geo.mapDescription", "Explore Rwanda's 2020 province-level administrative boundaries. These boundaries provide geographic context only; no verified geographic indicator estimates are available."),
      mapLabels: {
        loading: t("geo.mapLoading", "Loading verified province boundaries…"),
        loadError: t("geo.mapLoadError", "The map boundaries could not be loaded."),
        retry: t("geo.mapRetry", "Retry"),
        search: t("geo.mapSearch", "Find a province"),
        searchPlaceholder: t("geo.mapSearchPlaceholder", "Search Kigali, Northern Province…"),
        areaFilter: t("geo.mapAreaFilter", "Geographic area"),
        allAreas: t("geo.mapAllAreas", "All provinces"),
        domainFilter: t("geo.mapDomainFilter", "Indicator domain"),
        domainFilterNote: t("geo.mapDomainFilterNote", "The domain filter changes the source context shown for the selected area; verified geographic indicator values are not available."),
        allDomains: t("geo.mapAllDomains", "All evidence domains"),
        domains: {
          financialInclusion: t("geo.domainInclusion", "Financial inclusion"),
          financialHealth: t("geo.domainFinancialHealth", "Financial health"),
          poverty: t("geo.domainPoverty", "Poverty"),
          socialProtection: t("geo.domainSocialProtection", "Social protection"),
        },
        level: t("geo.mapLevel", "Boundary level"),
        levelValue: t("geo.mapLevelValue", "Province / Kigali City"),
        mapDescription: t("geo.mapSvgDescription", "Rwanda map showing reference administrative boundaries. Select a province or Kigali City for source and limitation details."),
        zoomIn: t("geo.mapZoomIn", "Zoom in"),
        zoomOut: t("geo.mapZoomOut", "Zoom out"),
        reset: t("geo.mapReset", "Reset map"),
        legend: t("geo.mapLegend", "Map legend"),
        selectedArea: t("geo.mapSelectedArea", "Selected area"),
        otherAreas: t("geo.mapOtherAreas", "Reference boundary"),
        areaDetails: t("geo.mapAreaDetails", "Area evidence details"),
        selectArea: t("geo.mapSelectArea", "Select an area on the map or from the geographic area list. Geographic indicator values are not available."),
        noMatches: t("geo.mapNoMatches", "No province matches that search."),
        boundarySource: t("geo.mapBoundarySource", "Boundary source"),
        boundaryYear: t("geo.mapBoundaryYear", "Boundary vintage"),
        source: t("geo.mapSource", "Evidence source"),
        year: t("geo.mapYear", "Source year"),
        evidenceDomain: t("geo.mapEvidenceDomain", "Evidence domain"),
        indicator: t("geo.mapIndicator", "Indicator"),
        definition: t("geo.mapDefinition", "Definition"),
        limitation: t("geo.mapLimitation", "Limitation"),
        limitationDetail: t("geo.mapLimitationDetail", "Survey populations and respondents are not linked to these boundaries. Geographic identifiers, weights, precision checks and publication permissions are not connected."),
        unavailable: t("geo.mapUnavailable", "No verified area-level estimate"),
        noIndicators: t("geo.mapNoIndicators", "No geographic estimate or verified indicator definition is connected for this area."),
        noComparison: t("geo.mapNoComparison", "Comparisons unavailable: no genuinely comparable geographic estimates are connected."),
        navigatorLink: t("geo.mapNavigator", "Continue to Resilience Navigator"),
        boundaryOnly: t("geo.mapBoundaryOnly", "Reference boundary only; not an indicator value"),
      },
      decisionTitle: t("geo.decisionTitle", "Map feasibility"),
      decision: t("geo.decision", "A district or province map is not supported by the files currently available to Pathwise."),
      decisionDetail: t("geo.decisionDetail", "No verified geographic aggregate dataset or administrative boundary file is connected. A map here could imply comparisons the evidence does not establish."),
      availableTitle: t("geo.availableTitle", "What is available"),
      availableDescription: t("geo.availableDescription", "The available materials describe geography but do not provide observed geographic indicator values for Pathwise."),
      finscopeTitle: t("geo.finscopeTitle", "FinScope 2024 publications and questionnaire"),
      finscopeDetail: t("geo.finscopeDetail", "The questionnaire contains blank location fields. The report describes district sample allocation and survey methods, but sample allocation is not itself a district estimate."),
      vupTitle: t("geo.vupTitle", "EICV7 VUP summary"),
      vupDetail: t("geo.vupDetail", "A short summary describes programme-specific findings. The linked full report and tables workbook are not in the inspected project listing."),
      supportedTitle: t("geo.supportedTitle", "Geographic level supported now"),
      supportedLevel: t("geo.supportedLevel", "No geographic comparison"),
      supportedDetail: t("geo.supportedDetail", "The published documents provide context about national surveys and their designs. Pathwise has no connected province- or district-level estimates and cannot publish a place ranking or choropleth."),
      possibleTitle: t("geo.possibleTitle", "What can be done responsibly"),
      possibleDescription: t("geo.possibleDescription", "The current geographic analysis is a source-readiness review, not a statistical comparison."),
      possibleItem1: t("geo.possibleItem1", "Explain which geographic fields are described in the instruments and which are only blank form fields."),
      possibleItem2: t("geo.possibleItem2", "Document the distinction between survey sample allocation and publishable geographic estimates."),
      possibleItem3: t("geo.possibleItem3", "Keep national, FinScope adult, EICV7 household and VUP beneficiary populations separate."),
      requirementsTitle: t("geo.requirementsTitle", "Evidence required for a future map"),
      requirementsDescription: t("geo.requirementsDescription", "Each requirement must be met and documented before geographic values are visualized."),
      requirement1: t("geo.requirement1", "Authorized, quality-checked data with documented geographic identifiers and reference boundaries."),
      requirement2: t("geo.requirement2", "Verified indicator definition, population, denominator, source year and supported geographic coverage."),
      requirement3: t("geo.requirement3", "Survey weights, strata, primary sampling units, variance-estimation method and geographic precision checks."),
      requirement4: t("geo.requirement4", "Disclosure, small-sample, privacy, licensing and data-use review for map publication."),
      limitationsTitle: t("geo.limitationsTitle", "Why district comparisons are not shown"),
      limitationsDetail: t("geo.limitationsDetail", "Questionnaire location fields do not contain responses. The report's district-level sample allocation does not establish adequate effective sample sizes, precision, or permission to publish district estimates. A national survey design or the presence of microdata alone would not prove small-area reliability."),
      sourceLabel: t("geo.sourceLabel", "Evidence reviewed"),
      sourceNote: t("geo.sourceNote", "Source scope and page references are documented in the source verification audit. No figures have been calculated or transcribed for this page."),
      noMapStatus: t("geo.noMapStatus", "No verified geographic estimates or boundaries connected"),
      next: t("geo.next", "Review vulnerability domains"),
      nextCopy: t("geo.nextCopy", "Continue to candidate measures while keeping source limitations visible."),
    },
  };
}
