# Pathwise Dashboard Source Verification

**Audit scope:** Existing `/dashboard` implementation and all four PDF files currently found in `data/`.

**Result:** No numerical statistic is displayed on the dashboard. The four KPI cards show an em dash and “Awaiting verified data”; the comparison table and geographic preview explicitly show that no verified values or estimates are connected. The local implementation does not read a dataset, calculate indicators, or fetch a data service. Therefore, no dashboard statistic can be verified as a displayed source figure or as a Pathwise calculation.

## Dashboard indicator audit

The statuses below apply to the indicator concepts represented by the cards, not to an absent numerical estimate. “—” is an unavailable-state marker, not a statistic.

| Dashboard indicator | Displayed value | Source document | Page number | Definition and population | Verification status | Limitation or correction needed |
|---|---|---|---|---|---|---|
| Financial inclusion | —; Awaiting verified data | *FinScope-2024-Presantation.pdf*; *Finscope consumer 2024 Final QNR 29 June 2025_Shared_NISR.pdf* | Presentation PDF p. 9; questionnaire PDF pp. 1, 12–16 | The presentation defines included adults as people who have or use formal and/or informal financial products/services. Its stated population is adults aged 16 years and older. The questionnaire provides candidate questions about provider access, account ownership/use and financial services; these item labels are not verified dataset field names. | `REQUIRES_RAW_DATA` | No respondent data, field dictionary, derivation code, or weight variable is present. The published definition does not by itself establish the exact item-level calculation. No value is displayed. |
| Financial vulnerability | —; Awaiting verified data | *Finscope consumer 2024 Final QNR 29 June 2025_Shared_NISR.pdf* | Questionnaire PDF pp. 6–8, 24–28 | The questionnaire includes financial-health questions, emergency-fund and short-term liquidity questions, reported unexpected-expense shocks, coping responses, and climate-related experiences. These are separate constructs/items; no verified composite “financial vulnerability” definition is supplied by the files inspected. | `REQUIRES_RAW_DATA` | No data or validated composite definition is present. Do not treat a questionnaire item, shock exposure, or financial-health response as a validated vulnerability score without further methodological support. |
| Poverty context | —; Awaiting verified data | *Finscope consumer 2024 Final QNR 29 June 2025_Shared_NISR.pdf*; *EICV7  Thematic Report VUP 202324.pdf* | Questionnaire PDF p. 48; VUP summary PDF p. 1 | FinScope questionnaire C5 is explicitly headed “Poverty Indicators” and asks about recent hardship experiences; these questions are not shown to be the official EICV7 monetary poverty measure. The VUP summary reports poverty among VUP households, a programme-specific population, not all Rwanda households. | `REQUIRES_RAW_DATA` | No EICV7 respondent/household data, poverty variable definitions, consumption construction, or microdata weights are present. VUP estimates must not be presented as national estimates or substituted for FinScope measures. |
| Social protection | —; Awaiting verified data | *Finscope consumer 2024 Final QNR 29 June 2025_Shared_NISR.pdf*; *EICV7  Thematic Report VUP 202324.pdf* | Questionnaire PDF pp. 41–43, 50; VUP summary PDF pp. 1–4 | FinScope questionnaire items refer to social-protection income sources and a household’s reported VUP direct cash transfer. The VUP summary describes programme participation and characteristics of VUP beneficiary households. These sources use different populations and purposes. | `REQUIRES_RAW_DATA` | No respondent records, VUP tables workbook, dataset field names, eligibility/receipt definitions, or weighting/variance information are present. Do not merge VUP and FinScope respondents or generalize VUP beneficiary estimates to the national population. |

### Other dashboard content

- “Indicator comparison” has column headings only and an empty state; no indicator values are present.
- “Geographic insights” says no geographic estimates are connected. No map values or district estimates are rendered.
- The source list names intended source roles and marks them “Pending review.” It contains no numeric findings.
- Module links and status labels are navigational/interface content, not findings.

## Files inspected

| File | Format and length | What the file contains | Audit notes |
|---|---|---|---|
| `data/Finscope consumer 2024 Final QNR 29 June 2025_Shared_NISR.pdf` | PDF, 54 pages | FinScope 2024 questionnaire with section/question labels, answer options, skip instructions, and blank fields | It is an instrument, not an interview-response dataset or codebook. Questionnaire item codes are not confirmed as released dataset variable names. |
| `data/Finscope-Final-Report__10_07_2024-1.pdf` | PDF, 77 pages | FinScope 2024 final report, including published findings and survey-design discussion | It reports aggregate results, not respondent records or machine-readable indicator calculation inputs. |
| `data/FinScope-2024-Presantation.pdf` | PDF, 39 pages | FinScope 2024 presentation, including a measurement framework and published charts/findings | It is a presentation, not a dataset. Chart values are source-reported estimates, not Pathwise calculations. |
| `data/EICV7  Thematic Report VUP 202324.pdf` | PDF, 4 pages | A short VUP thematic-report summary page exported as PDF | The summary references a separate full report PDF and `Final_EICV7_VUP_Thematic_Report_Tables.xlsx`; neither referenced file is in the inspected `data/` listing. |

The listing contains no CSV, Excel workbook, Stata/SPSS/SAS file, database, respondent-level data, or separate codebook/data dictionary. No raw-data record count or missing-value rate can therefore be inspected. This does not establish that no such files exist elsewhere; it describes only the current project listing.

## Relevant source evidence and caveats

### FinScope 2024

- The presentation describes FinScope’s inclusion framework on PDF p. 9: adults aged 16+ and financial inclusion based on having/using formal and/or informal financial products or services. The same page distinguishes formal, informal, banked, and other-formal categories.
- The questionnaire includes household localization fields (province/Kigali City, district, sector, cell, village, residence area, and GPS fields) on PDF p. 1. These are blank instrument fields, not observed geography values.
- The final report describes an eligible population of private-household members aged 16+, one interviewed person per selected household, and a stratified three-stage cluster design on PDF p. 20. It states a target of 14,000 and district-level sample-allocation intent; PDF p. 21 describes 13,994 achieved interviews and weighting to population size.
- The presentation reports 13,994 interviewed households plus 900 refugee households (PDF p. 5). The final report states that refugee modules/survey are treated separately and a separate report is to be developed (PDF p. 20). Those populations and denominators must not be silently combined.
- The documents describe weighting and sample design at a high level, but the inspected files do not provide respondent records, a released weight field, complete variance-estimation inputs, or executable indicator derivations. District fields or sample allocation alone do not validate district estimates for publication.
- The questionnaire covers financial-health items (PDF pp. 6–8), saving/investment (pp. 17–19), borrowing (pp. 21–23), insurance/risk and shocks (pp. 24–28), income sources (pp. 41–43), and household hardship questions (p. 48). These questions support candidate measure definitions only; they do not prove that the corresponding data are present or how published indicators were derived.
- Published charts in the presentation—including the inclusion trend on PDF p. 10 and geographic breakdowns later in the deck—are publication-reported values. None are currently copied into the Pathwise dashboard, and none have been recalculated by Pathwise.

### EICV7 VUP summary

- PDF p. 1 identifies the source as Integrated Household Living Conditions Survey 7 (EICV 7), describes a weighted sample of 3,771 households, and reports VUP-specific poverty and consumption findings.
- PDF pp. 1–3 contain summary statements about VUP beneficiary participation and characteristics. They do not provide sufficient survey design, indicator-definition, denominator, uncertainty, missingness, or released-weight details to independently reproduce those estimates from the local files.
- The summary links to a full report and an Excel tables workbook, but those are not among the four files found in `data/`. The summary’s programme population is not interchangeable with all Rwanda households or FinScope adults.

## Source-reported versus Pathwise-calculated

| Evidence type | Present in local sources? | Present on dashboard? |
|---|---:|---:|
| Publication-reported aggregate figures and charts | Yes, in the FinScope publications and VUP summary | No |
| Respondent-level records suitable for recomputing estimates | No files identified | No |
| Pathwise-calculated indicators | No calculation code or connected dataset identified | No |

No values, denominators, units, rounding rules, or geographic estimates have been inferred from publication figures for use in the dashboard.

## Geographic feasibility decision

The current repository does not support a Pathwise district- or province-level map. The questionnaire contains blank location fields, while the report's district sample allocation describes design rather than a verified district estimate. No geographic aggregate dataset, boundary geometry, respondent microdata, released weight field, geographic identifier dictionary, or variance/precision materials are connected to the application. Publication charts remain source-reported aggregates and have not been independently recalculated for Pathwise.

The only supported geographic statement is that the inspected materials describe national surveys and their designs; Pathwise has no connected level at which it can make a geographic comparison. See [the geographic feasibility assessment](./geographic-feasibility.md) for the inspected artifacts, source page references, requirements for reconsidering a map, and limitations.

## Privacy and repository checks

- The four listed files are publications/questionnaire documents; no respondent-level data file was found.
- The dashboard implementation and its referenced `lib/module-content.ts` constants contain no record-level data or dataset reads. The dashboard renders only status text and empty states.
- No personal/respondent-level records were found in the inspected frontend sources or current `data/` listing. The blank questionnaire contains prompts for names, questionnaire/household numbers and GPS coordinates; these are fields in the instrument, not populated respondent records.
- `data/` was untracked and not previously ignored. The repository `.gitignore` now excludes `/data/` so local source documents or any later raw files placed there are not accidentally committed. The PDFs remain local and were not altered.

## Prioritized corrections and next step

1. **Do not add figures to the KPI cards yet.** The current “Awaiting verified data” state is correct. Request the authorized, de-identified analysis datasets and matching codebooks/metadata before calculating anything.
2. **Obtain official calculation and survey-design documentation.** At minimum this must identify field names and labels, missing/special codes, respondent and household identifiers, weight fields, PSU/strata, population universe, and variance-estimation guidance.
3. **Obtain the referenced EICV7 VUP full report and tables workbook.** Verify poverty/consumption definitions, weighting, estimation population, uncertainty, and programme subgroup precision before considering VUP indicators.
4. **Keep source populations distinct.** In particular, do not treat VUP beneficiary estimates as national poverty estimates or combine the FinScope refugee sample with the main national adult estimates without source-supported rules.
5. **Only then prepare an indicator calculation specification.** Map each candidate questionnaire item to an actual released variable, document denominator and special-value handling, and verify weighted estimates and geographic precision independently before connecting any value to the dashboard.

This audit makes no new feature or indicator implementation. It does not claim that any weighted survey estimate was calculated by Pathwise.
