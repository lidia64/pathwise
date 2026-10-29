# Pathwise Release Readiness Audit

## Scope and method

This release-readiness review compares the current application code to the evidence documented in `docs/source-verification.md` and the source files found in `data/`.

The audit does not assume that a cited statistic is correct without checking the available evidence. The current codebase does not have any dataset-backed indicators. All numeric dashboard values remain unavailable and the UI intentionally displays empty-state text instead of numbers.

## 1) Indicator counts by verification category

The dashboard currently presents no numeric indicators. Based on the implementation in `app/(workspace)/dashboard/page.tsx`, each KPI card is rendered with an em dash and the common status text `Awaiting verified data`.

Counts by category for the current dashboard concept set:

- VERIFIED_IN_SOURCE: 0
- PARTIALLY_VERIFIED: 0
- UNSUPPORTED: 0
- REQUIRES_RAW_DATA: 4

The four conceptual indicators in `lib/module-content.ts` are:

1. Financial inclusion
2. Financial vulnerability
3. Poverty context
4. Social protection

All four are currently in the `REQUIRES_RAW_DATA` category because the source notes describe them as requiring a verified dataset, variable mapping, and weighting/methodology before they can be presented as calculated estimates.

## 2) Unsupported or partially verified dashboard claims

There are no numeric claims in the current dashboard code. The dashboard intentionally uses neutral status placeholders and empty results rather than false precision.

Unsupported or partially verified claim categories present in the application are not numeric; they are the following:

- The navigation and dashboard copy refer to evidence domains without evidence tables or source-verified values.
- The `methodology` pages state that sources, units, and definitions require verification before comparison; this is a procedural statement, not a data claim.
- The pathway pages explicitly state that no rules are activated and no pathway recommendations are available.
- The vulnerability page states that domains are pending verification, not calculated scores.

These are safe because they do not imply verified values. They are still release-sensitive because they must remain truthful and not imply that data collection or analysis is complete.

## 3) Indicators requiring raw data that are currently presented as calculated estimates

None.

The actual code does not calculate or publish estimated values. It displays:

- `—` as the KPI value
- empty-state text in the indicator comparison panel
- a “Map data not connected” placeholder and empty province/district selectors
- “No verified impact-monitoring series are available” and similar empty states

This satisfies the minimum data-integrity requirement: no unverified estimates are being shown as calculated results.

## 4) Mismatches in source, year, population, definition, unit, geographic level, or method

Based on the audit evidence and the current code, the following mismatches would be problems if they were introduced, but they are not present in the current dashboard implementation.

### A. Source mismatch risk

- FinScope questionnaire and FinScope report are separate source artifacts from the VUP summary. The application currently does not merge them into a single estimated time series.
- VUP household poverty findings are programme-specific and not equivalent to national estimates or the FinScope adult population.

### B. Population mismatch risk

- FinScope is weighted to adult population (16+), according to the presentation and report notes.
- EICV7 VUP analysis refers to VUP beneficiary households and their poverty/consumption profile.
- These are different populations and must not be treated as interchangeable.

### C. Definition mismatch risk

- Financial inclusion has a published definitional framework, but the code does not calculate it.
- Financial vulnerability, poverty context, and social protection are conceptual domains, not validated composite indicators in the current code.
- The dashboard intentionally avoids assigning a calculation method.

### D. Geographic mismatch risk

- The geographic explorer page explicitly blocks map use until boundaries and estimates are verified.
- The dashboard does not display district-level values or a map.

### E. Unit and weighting mismatch risk

- No weight field, denominator, or unit is presented in the dashboard.
- The methodology pages explicitly require dataset-specific inspection for weighting, strata, clusters, and comparability.

In other words, the current code is conservative and does not present mismatched or unsupported values.

## 5) Five highest-priority corrections, ordered by impact on data credibility

The current code already aligns with the safest release posture. The five highest-priority corrections below are therefore “minimum safe corrections” to preserve this status and prevent accidental data misrepresentation:

1. Preserve the current empty-state strategy for KPI cards and all comparison panels.
   - Impact: highest. Prevents false precision and unsupported numerics.
   - Why this matters: the audit found no raw data or calculation pipeline to support a number.

2. Keep the code from implying that `FinScope`, `EICV7`, and `VUP` are directly comparable without verified metadata.
   - Impact: very high. Prevents cross-survey misuse and misleading comparisons.
   - Why this matters: the source audit specifically warns not to combine populations or respondents across surveys without a defensible method.

3. Maintain the explicit “pending verification” language in `methodology`, `vulnerability`, `pathways`, and `dashboard` pages.
   - Impact: high. Protects data credibility and scenario framing.
   - Why this matters: the current app does not have a verified dataset connection.

4. Keep geographic view blocked until verified boundary and estimate metadata are available.
   - Impact: high. Prevents unsupported district-level inference or map display.
   - Why this matters: the audit explicitly notes that district boundaries and estimates are not in the current files.

5. Ensure that any future data ingestion or indicator registry documentation uses a verified metadata schema before values are surfaced.
   - Impact: high. Protects future releases from mismatches in source, denominator, and formula.
   - Why this matters: without dataset-specific codebook fields, a formula can become a claim without evidence.

## 6) Dashboard routes and features needing testing before deployment

The existing release status is not “ready for publication of actual statistics,” but it is in a conservative state that minimizes the risk of false claims. The following routes and features should still be tested before deployment as part of a release checklist:

### Route-level checklist

- `/` landing page
  - CTA links navigate to the expected routes (`/dashboard`, `/methodology`)
  - page content remains consistent with the approved branding and messaging

- `/dashboard`
  - KPI cards remain non-numeric and display only `Awaiting verified data` state
  - table empty states remain accurate and not mislabeled as real data
  - geographic insights remain a placeholder rather than a map or district estimate
  - source list remains informational only

- `/geography`
  - geographic evidence feasibility state remains clear and source-grounded
  - no map, boundary, province/district estimate, or ranking is implied
  - source page references and the future-data requirements remain visible

- `/vulnerability`
  - domain cards remain “pending verification” only
  - no analytical interpretations are shown as fact

- `/pathways`
  - pathway cards remain category-only and “Rule not activated”
  - no rule triggers or recommended intervention statements are shown

- `/impact`
  - monitoring framework and empty table remain intentionally blank
  - no baseline/follow-up comparison is presented as a result

- `/methodology`
  - source roles and limitations remain explicitly labelled as pending verification
  - “Cross-survey use” warning about not linking respondents remains present

### Shared layout and navigation tests

- app-level navigation remains active for all routes
- active-state highlight is correct for the current path
- keyboard focus styling remains visible for links and controls
- responsive mobile behavior remains usable
- skip-link behavior remains accessible
- no route renders raw data or unverified values in UI text

### Data-integrity tests

- No code reads a CSV, XLSX, database, or API that contains raw respondent data
- No route exposes personal or household identifiers from any questionnaire or source file
- No survey weights or formulaic results are displayed without a validated dataset and method
- No indicator is presented as a “calculated estimate” unless its source and derivation are documented and verified

## Comparison against actual application code

This readiness assessment matches the current application code:

- The dashboard in `app/(workspace)/dashboard/page.tsx` renders only empty states and pending statuses.
- `lib/module-content.ts` defines four domain concepts, not numbers, and explicitly marks source roles as pending verification.
- `app/(workspace)/geography/page.tsx` disables geography and indicates no district boundary or estimate is connected.
- `app/(workspace)/vulnerability/page.tsx` states that indicators are pending verification and no interpretation is shown.
- `app/(workspace)/pathways/page.tsx` explicitly states that no rule is activated and required variables are pending verification.
- `app/(workspace)/impact/page.tsx` clearly says no impact-monitoring series are available.
- `app/(workspace)/methodology/page.tsx` includes the required cross-survey non-linking warning and pending verification language.

This is consistent with the source audit: the application does not currently contain and does not present credible survey-based calculations. The release risk is therefore primarily in future work: any attempt to calculate or publish figures before obtaining the actual datasets, codebooks, weights, and approved methodology would be a data-credibility error.

## Recommended smallest safe corrections

No large redesign or feature work is needed for the current release.

The smallest safe corrections are simply to keep the current release posture intact and ensure the following are preserved:

- empty-state text remains clear and non-misleading
- no unverified numeric values are added to KPI cards or tables
- source and methodology pages remain explicit about pending verification
- route-level checks continue to reject any dataset-backed calculation without a documented schema

This is the minimum safe correction set for release-readiness because the source audit found no evidence that the app is yet ready to publish actual survey estimates.

## Validation completed

Validation run on 2026-10-28:

- `npm run lint`: passed.
- `npm run build`: passed; Next.js generated all seven application routes.
- Production HTTP smoke checks: `/`, `/dashboard`, `/geography`, `/vulnerability`, `/pathways`, `/impact`, and `/methodology` each returned HTTP 200 and expected page content.
- Shared navigation: all six workspace labels and each route's server-rendered active `aria-current="page"` state were present.
- Data-integrity smoke checks: the dashboard returned the awaiting-data and empty-comparison states; methodology included the warning against linking respondents across surveys.
- Static source check: no raw-file reads, dataset fetches, CSV/XLSX/SPSS/Stata references, or environment-variable access were found in `app/`, `components/`, or `lib/`.
- Responsive and accessibility source check: workspace CSS includes a mobile navigation/grid breakpoint at 680px, and global styles define visible `:focus-visible` link outlines. These were inspected in source, not exercised in a browser.

### Remaining manual validation

No browser automation client was available for this run. Visual layout at mobile/tablet widths, actual keyboard traversal and skip-link interaction, and screen-reader behavior have therefore not been confirmed in a browser. Complete those checks in a browser before deployment; the HTTP smoke checks do not substitute for them.

## Follow-up evidence and localization work (2026-10-28)

- Added [geographic-feasibility.md](./geographic-feasibility.md), documenting why the current evidence does not justify a map and the prerequisites for reconsidering one.
- Replaced the prior disabled-filter/map placeholder geography route with a Geographic Evidence page. Its supported level is “no geographic comparison”; source citations point to the source audit's questionnaire, FinScope report, and VUP summary pages.
- Added cookie-persisted language selection for `kin`, `en`, `fr`, `sw`, `zh`, `de`, and `ar`; `kin` is the Kinyarwanda language code and `RW` is kept separate as country context. Root document language and direction change on subsequent server renders.
- Added translated navigation and landing-page text, route headings, and Geographic Evidence content, with RTL direction styling for Arabic.
- **Localization is incomplete and is a release blocker for claiming seven-language support.** Longer sections and multiple labels on dashboard, vulnerability, pathways, impact, methodology and landing pages still fall back to English. See [localization.md](./localization.md) for the explicit string-scope list and translation-review requirements.
- No browser claim is made here until interaction, persistence, RTL, and visual checks have been executed for this implementation.
