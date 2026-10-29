# Pathwise

**From Vulnerability to Resilience.**

Pathwise is an evidence-led decision-support prototype for exploring financial inclusion, vulnerability, household welfare, social protection, and potential resilience pathways in Rwanda.

Its decision journey is:

**Data → Vulnerability → Bottleneck → Pathway → Action → Outcome**

Pathwise distinguishes source-reported evidence, calculations derived from documented data, analytical interpretation, and proposed actions. The current application does not calculate survey estimates, activate pathway rules, or claim causal effects.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Application routes

- `/` — product introduction and decision framework
- `/dashboard` — evidence readiness overview; indicators remain unavailable until verified data is connected
- `/geography` — geographic evidence feasibility and future map requirements
- `/vulnerability` — candidate evidence domains and questions to investigate
- `/pathways` — potential pathway categories; rules and interventions are not active
- `/impact` — monitoring framework; no achieved or projected impacts are presented
- `/methodology` — intended sources, comparability and limitations

## Data integrity and geographic evidence

The local `data/` directory is ignored by Git. It currently contains four PDF publications/questionnaire files: FinScope 2024 questionnaire, FinScope 2024 final report, FinScope 2024 presentation, and an EICV7 VUP thematic summary. The repository listing contains no respondent microdata, codebook, geographic aggregate dataset, or boundary geometry. The summary references a full VUP report and tables workbook not present in the inspected listing.

**A province- or district-level map is not supported by the evidence currently available to Pathwise.** Blank geographic fields in a questionnaire and district sample allocation in a report do not constitute verified geographic estimates. The `/geography` page documents the supported evidence level, current limitations, and requirements for a future map. No geographic statistics are fabricated or calculated.

See [the source verification audit](./docs/source-verification.md), [the geographic feasibility assessment](./docs/geographic-feasibility.md), and [release readiness](./docs/release-readiness.md) for evidence and limitations.

## Languages and localization

The language selector supports these identifiers and native names:

| Identifier | Language | HTML language | Direction |
|---|---|---|---|
| `kin` | Kinyarwanda | `kin-RW` | LTR |
| `en` | English (default) | `en` | LTR |
| `fr` | Français | `fr` | LTR |
| `sw` | Kiswahili | `sw` | LTR |
| `zh` | 中文 (Simplified Chinese) | `zh-CN` | LTR |
| `de` | Deutsch | `de` | LTR |
| `ar` | العربية | `ar` | RTL |

`kin` is the language identifier for Kinyarwanda; Rwanda's country code is separately represented as `RW`. The selected language is stored in the `pathwise-language` cookie. Existing route paths are retained, and the selector posts to `/api/language` before redirecting back to the current page.

Language configuration is in `lib/i18n/languages.ts`; translation entries are in `lib/i18n/translations.ts`. Add matching message keys for every supported language and review all user-facing strings, including accessible names and metadata. English fallback currently exists for untranslated entries.

**Translation coverage is incomplete.** Some landing-page and workspace details remain English when another language is selected. Existing translations are draft translations, not certified or independently reviewed by fluent speakers. Do not claim complete seven-language support until route-by-route string coverage, terminology, persistence, and Arabic RTL behavior have been reviewed and tested. See [localization status and review notes](./docs/localization.md).

## Design and engineering

- Next.js App Router, React, TypeScript, and Tailwind CSS.
- Blue-first Pathwise identity with responsive layouts and shared workspace navigation.
- No database, authentication system, or survey data service is currently connected.
- Raw source files under `data/` must not be committed or exposed through the public frontend.

## Deployment readiness

Lint, TypeScript, and production build checks are available as listed above. Browser interaction, accessibility, responsive behavior across all translated strings, language persistence, and Arabic RTL still require deployment-oriented manual or automated validation. No test runner is currently configured in the project.
