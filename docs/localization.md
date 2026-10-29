# Localization strategy and status

## Architecture

Pathwise retains its existing route paths. The selected language is stored in the `pathwise-language` cookie (one-year lifetime, `SameSite=Lax`, `HttpOnly`) and read on the server for document metadata and translated server-rendered content. A same-origin `POST /api/language` validates the submitted language against the allowlist and redirects to a validated same-site path. The selector displays native language names and preserves the current route; when JavaScript is active it also retains the query string.

English (`en`) is the default when no valid preference exists. This cookie-based approach avoids introducing locale route prefixes or changing existing bookmarks.

| Language | Identifier | HTML language | Formatting locale | Country metadata | Direction |
|---|---|---|---|---|---|
| Kinyarwanda | `kin` | `kin-RW` | `kin-RW` | Rwanda `RW` | LTR |
| English | `en` | `en` | `en` | none | LTR |
| French | `fr` | `fr` | `fr` | none | LTR |
| Kiswahili | `sw` | `sw` | `sw` | none | LTR |
| Simplified Chinese | `zh` | `zh-CN` | `zh-CN` | China `CN` | LTR |
| German | `de` | `de` | `de` | none | LTR |
| Arabic | `ar` | `ar` | `ar` | none | RTL |

Language identifiers are not country codes. In particular, `kin` identifies Kinyarwanda; `RW` identifies Rwanda where country context is needed.

## Translation organization

- Language identifiers and selector options live in `lib/i18n/languages.ts`.
- Shared copy is keyed by stable names in `lib/i18n/translations.ts`.
- Server request preference and the Geographic Evidence message set are assembled in `lib/i18n/server.ts`.
- Add translations by adding the same keys to each locale’s dictionary. Preserve official source names, years, page references, units, populations and statistical meaning.
- Missing keys currently use the English source string as a fallback. Use `hasTranslation(language, key)` when auditing additions; do not treat fallback as a reviewed translation.

## Current translation coverage and review status

The locale selector, shared navigation labels, document `lang`/`dir`, landing-page headline and framework copy, decision-flow headings, major workspace page titles, and the complete Geographic Evidence page have translated entries for the seven configured languages.

**This is not yet a complete translation of every application string.** Several long landing-page paragraphs, dashboard details, vulnerability-domain descriptions and questions, pathway descriptions and statuses, impact-framework fields, methodology explanations, accessibility labels, and some empty-state copy still fall back to English. Those untranslated areas are recorded here rather than silently represented as complete:

- `app/page.tsx`: problem explanation, several explanatory paragraphs, and some conceptual diagram labels.
- `app/(workspace)/dashboard/page.tsx`: evidence-readiness details, indicator names/tooltips, source roles, comparison and empty-state descriptions.
- `app/(workspace)/vulnerability/page.tsx`: descriptive copy, domain details, bottleneck questions and interpretation empty state.
- `app/(workspace)/pathways/page.tsx`: descriptions, required-variable messages, and evidence empty state.
- `app/(workspace)/impact/page.tsx`: framework field descriptions and reporting empty state.
- `app/(workspace)/methodology/page.tsx`: source-role details, six methodology explanations and cross-survey warning.
- `components/app-shell.tsx`, `components/app-navigation.tsx`, `components/language-switcher.tsx`, and shared components: some assistive labels and fallback messages.

Translations were drafted for this implementation and have not been independently reviewed by fluent Kinyarwanda, French, Kiswahili, Chinese, German, or Arabic speakers or by a survey-methodology specialist. They are not certified translations. Have fluent speakers and subject-matter reviewers check terminology for financial inclusion, financial vulnerability, financial health, financial resilience, poverty, shocks, survey weights, denominators, and causal language before public release.

## Arabic and script support

Selecting Arabic sets `lang="ar"` and `dir="rtl"` on the root document. Directional layouts use RTL-aware flow; CSS logical positioning is used for the geography evidence lists and numbered cards, and the next-step arrow is mirrored. Cited source identifiers are isolated in LTR spans on the Geographic Evidence page. Arabic and Chinese font stacks include script-compatible system fallbacks in addition to Poppins for Latin text. The logo and any future charts/maps must not be blindly mirrored.

Browser verification is still required for Arabic reading order, mixed-script citations, all seven complete route translations, keyboard selection and persistence, and wrapping at narrow widths. A locale cookie persists the choice but is not a substitute for a complete translated interface.
