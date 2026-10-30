# Geographic evidence feasibility

## Decision

**A statistical district- or province-level map is not feasible from the survey evidence currently present in this repository.** The Geographic Evidence page now includes a real, clickable reference map of Rwanda's province-level administrative boundaries. It does not display survey values or imply geographic comparisons.

The only supported geographic description for Pathwise at this stage is that the inspected publications concern national surveys and discuss survey design. There is no geographic comparison level with observed Pathwise indicator values. No province- or district-level estimate is connected to the application.

## Evidence inspected

The source inventory in [`source-verification.md`](./source-verification.md) records four local PDFs:

- FinScope 2024 consumer questionnaire (54 pages): PDF p. 1 includes blank location fields. These are form fields, not observed respondent geography.
- FinScope 2024 final report (77 pages): PDF pp. 20–21 describe the target population, sample design and district sample allocation. The audit found no data or design inputs to reproduce or validate district estimates.
- FinScope 2024 presentation (39 pages): published charts are source-reported aggregates, not connected geographic aggregates available to Pathwise. District-looking chart content does not, by itself, establish that Pathwise can reproduce or republish district estimates.
- EICV7 VUP thematic summary (4 pages): a programme-specific summary. The full report and referenced tables workbook are not in the local project listing.

No aggregate geographic data file, survey microdata, codebook, released weight variable, geographic identifier dictionary, or variance-estimation materials were found in the repository file listing. The blank questionnaire and publication descriptions are not a substitute for these artifacts.

## Reference map scope and provenance

The local asset [`../public/geography/rwanda-admin1.geojson`](../public/geography/rwanda-admin1.geojson) contains five 2020-vintage ADM1 reference boundaries: Kigali City and Rwanda's four provinces. The boundary release is from geoBoundaries Open Data, sourced from the Rwanda Geo Portal, and is licensed under CC BY 4.0. The geography page links to the source portal and geoBoundaries release.

The map supports search, area selection, keyboard selection, visual highlighting, and zoom/reset. Its fill colors identify reference versus selected areas only; they do not encode indicator values. No district boundaries are shown. Each selected-area panel identifies the reference boundary year separately from the candidate survey source and year, and states that verified area-level indicators, definitions, and comparisons are unavailable. FinScope, EICV7 and VUP populations remain distinct and are not linked to the boundaries.

## Supported and unsupported use

Pathwise can currently:

- Explain the difference between blank geographic questionnaire fields, sample allocation, published aggregate figures, and estimates independently calculated from microdata.
- Report source-readiness limitations and requirements for a future geographic analysis.
- Keep FinScope adults, EICV7 households, and VUP beneficiary populations distinct.

Pathwise cannot currently:

- Show a choropleth, district ranking, province comparison, or geographic trend.
- Claim that sample allocation proves adequate district precision.
- Calculate or publish geographic estimates, because no respondent records, verified geographic identifiers, weights, denominators, variance method, or precision checks are available.
- Treat microdata availability alone as proof that small-area estimates are statistically reliable.

## Requirements before a map can be reconsidered

Obtain and approve the following before a visualization is designed:

1. Authorized, quality-checked data and an official geographic identifier dictionary.
2. Licensed, authoritative boundary geometry matched to the identifiers and reference year.
3. Verified indicator definition, target population, denominator, source year, missing-value handling, and geographic coverage.
4. Released survey weights and design information (including strata and primary sampling units), an appropriate variance method, and documented precision/small-sample review at the intended geographic level.
5. Disclosure, privacy, licensing, data-use, and publication approval.
6. Independent verification that displayed values match the cited source or documented Pathwise calculation.

Do not link FinScope, EICV7 and VUP respondent records without an approved and defensible linkage method. Do not compare aggregates unless geography, population, reference periods, definitions and units are aligned.

## Implementation

`/geography` is an interactive reference-boundary explorer with explicit source attribution, area selection, candidate evidence-domain filters, no-data states, map prerequisites, and limitations. The Resilience Navigator accepts a validated location as context only; it does not produce area-specific indicators or recommendations.

The page provides citations to the questionnaire PDF p. 1, FinScope final report PDF pp. 20–21, and EICV7 VUP summary PDF p. 1, consistent with the source audit. No map interaction exists to test.
