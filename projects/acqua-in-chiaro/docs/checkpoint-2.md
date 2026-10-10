# Checkpoint 2 — approved corrections and design choice

2026-10-10. Owner-approved policy applied. This report supplements checkpoint 1 and supersedes its older claim-display assumptions. The app remains in design/data-foundation phase.

## Changes at this checkpoint

| Section | Change |
| --- | --- |
| §4 Flow A | Chemistry shortcuts → numerical catalogue filter → sourced detail. No condition-derived results or remembered health profile |
| §4 Flows B–C | Removed profile selector; comparison retains values, units, sources and dates, up to three columns |
| §5.3 VerdictBox | Disabled; replaced by CompositionContext and separate DocumentedClaim components |
| §7 schema | Added `ferro_bivalente`; total/unspecified iron remains a value. Normalized per-claim evidence with `claim_source`, source URL/photo and `decree_reference` where available |
| §7 pipeline | Computes numerical intervals and chemistry predicates; joins documented claims instead of generating them |
| §8.2 | Removed all automatic health filters and condition-specific sorting. Added sodium <20, calcium >150, sulfate >200, magnesium >50, nitrate ≤10 and exclusive fixed-residue intervals |
| §8.3 | Removed suitability outcomes and borderline logic. Label/decree documentation required for health/regulatory mentions. Only declared Fe(II)>1 can produce the narrowly approved computed ferruginosa descriptor |
| §9 | All condition pages are guide-only: outcome-specific evidence summary/level, primary sources, explanatory chemistry link and “Parla con il tuo medico” |
| Related sections | Aligned home, navigation, detail, SEO, data validation, architecture and phases. Retained GitHub Pages address and removed custom-domain proposals |
| Rules configuration | Renamed composition mentions to reference criteria; added explicit disabled policy flags. Verified numerical criteria cannot automatically publish claims |

## Source-review checkpoint

- **Milano:** official MM-published municipal dataset and actual JSON verified. Four zones, explicit month/year, bounds and source units retained. May is absent from the inspected January–July coverage. No invented citywide average. See [source contract](milano-source.md).
- **References:** eleven named research references have identified citations and read abstracts (including reviews); findings and limitations recorded. The Parma pilot remains `verified: false`, with no abstract read. WHO formula guidance identity/scope read, detailed extraction pending. See [reference inventory](references.md).
- **Tap-water law:** D.Lgs.18/2023 and its D.Lgs.102/2025 amendment identified; consolidated provision-level explanation is still pending. No claim that the original 2023 text alone establishes current obligations.
- **Ministry/recognition:** checkpoint 1’s European Commission recognised-water list is an identity aid only, not chemistry or claim authorisation. No usable Ministry chemistry database is asserted. Recognition decrees remain record-specific evidence.
- **Evidence gaps:** older-adult and sport/heat guide sources not yet established; full-text funding/bias review and owner approval pending throughout. No clinical copy released.

## UX and design

[Low-fi layouts](wireframes.md) cover every route, flows A–D, missing values, qualified values, stale data, source types, empty/error/offline cases, comparison limits and Milano selection.

[Two rendered home directions](design-options.html):

1. **Taccuino di campo — recommended:** warm, spacious, six large chemistry shortcuts; easier initial phone flow and room for the geology story.
2. **Atlante dei dati:** compact filter rail and comparison-first table; suited to repeated multi-parameter exploration.

The example table is synthetic and marked as such. Search is read-only; filter buttons preview the selected chemical predicate locally. No real catalogue functionality is claimed.

## Verification performed and limits

- TypeScript configuration imports successfully under Node's type stripping. Assertion check confirms declared Fe(II) field, disabled automatic health filters, disabled inferred regulatory mentions and disabled verdicts. This is not a full TypeScript build or rules-engine test suite.
- Specification checked for obsolete clinical outcome language and URL policy conflicts. All generated claims/profiles have been removed from the planned pipeline.
- Preview HTML and inline JavaScript syntax/structure checked. No app dependencies added.
- Browser screenshot verification at 360/768/1280 in light/dark **not completed**: the environment has no Chromium executable, and its browser download returned an invalid archive. Responsive rules are authored; visual/accessibility QA remains pending and must not be described as passed.
- Production data import, app build, Lighthouse and full e2e checks belong to later phases and have not run.

## Decision and next checkpoint

Choose **Taccuino di campo** or **Atlante dei dati**. The supplied specification (§5.1, §14) explicitly requires this design choice before further implementation; the corrected rules are already approved and do not need approval again.

After the choice: checkpoint 3 schema/validator/build pipeline, proposed candidate list of 50 waters, five sourced seed records and a validation report. Outstanding reference checks stay visible and block only their affected clinical/legal content, not neutral data work.
