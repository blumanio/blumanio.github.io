# Acqua in chiaro — approved specification

Revision 2026-10-10. Owner-approved corrections replace health inference throughout this specification. Deployment remains GitHub Pages at https://blumanio.github.io/projects/acqua-in-chiaro/.

## 0. How to read this prompt

You are the lead developer, UX designer and technical writer for this project; I am the owner (an environmental geologist and React developer). This document is the spec. Where it is precise, follow it. Where it says "propose", give me 2 options with a recommendation, then wait. Where you find something wrong or unverifiable, stop and tell me rather than guess.

Work in the phases of section 14. At each **Checkpoint**, stop, summarise what you did, show a preview or test output, and list open questions.

---

## Launch instruction override — owner decision, 2026-10-10

The latest owner request supersedes intermediate checkpoint stops and the initial 50-water launch target: complete and publish autonomously with at least 20 producer-sourced records, preserving missing values. Taccuino di campo is selected with the five approved changes (situations row, chemistry descriptors, visible Milano strip, compact responsive comparison table, self-hosted Source Sans 3 / Source Code Pro with tabular figures). Unsourced clinical/legal content ships as In revisione; geology author text remains a placeholder. Browser QA fallback is a runnable local script with unexecuted checks reported honestly. Changes outside projects/acqua-in-chiaro remain unauthorized without a specific stop/approval. This overrides old checkpoint and dependency-approval language below.

## 1. Product

### 1.1 One-sentence purpose

Help people in Italy choose a bottled mineral water — or realise tap water is fine — based on **what the label says, what the law says, and what the evidence actually supports**, with every number traceable to a source.

### 1.2 Users and their moments

1. **Al supermercato** (primary): on a phone, in the aisle, 30 seconds of attention. Needs: compare the declared composition quickly.
2. **Il genitore**: seeks documented label claims and authoritative guidance; the app does not issue a yes/no decision.
3. **Chi ha un'indicazione dal medico**: told "low sodium" or "more calcium"; wants to apply it.
4. **Il curioso**: wants to understand labels, tap vs bottled, why waters differ (the geology).

### 1.3 What the product is NOT

- Not a ranking. No "best water", no scores, no medals.
- Not medical advice. No treatment claims. No personalised dosing.
- Not a contaminants tester. We have no lab data; we don't comment on PFAS, metals, microplastics beyond linking published tests in the methodology.
- Not a shop. No prices in v1, no affiliate links, no ads, no sponsored content.

### 1.4 Success criteria at launch

- ≥ 50 waters, all with traceable provenance, all passing validation.
- 9 guide-only topics live, each with a guide page whose every claim has a checked source.
- Milano tap water page live.
- Lighthouse mobile ≥ 90 in all four categories on home, list, detail.
- A first-time visitor can go from home to a sourced comparison of composition in ≤ 3 taps.

---

## 2. Non-negotiable principles

1. **Neutral**: filter and explain; never rank by a composite score.
2. **Traceable**: every value carries provenance (source type, URL or label photo, analysis date, entry date).
3. **Calibrated wording** for anything health-related:&#x20;
   - Regulatory: "Secondo la normativa, un'acqua con sodio inferiore a 20 mg/L può riportare la dicitura 'indicata per le diete povere di sodio'."
   - Evidence: "Alcuni studi controllati suggeriscono… (evidenza: moderata)."
   - Never: "cura", "previene", "consigliata per diabetici", "la migliore per…".
   - Every profile page ends with: "Per una condizione diagnosticata, segui le indicazioni del tuo medico."
4. **Honest about tap water** on the home page and in every comparison.
5. **Verify, don't recall**: every legal threshold and every study reference must be checked against a primary source before it is coded or written. Unverifiable → `verified: false` + tell me.
6. **No third-party datasets copied** (consumer-association test results, industry directories, other people's compiled databases). They may be used only to spot-check our own entries.
7. **Trademark-safe**: brand names used descriptively only; no logos; label photos shown cropped to the analysis table only.

---

## 3. Information architecture

```
/                         Home
/profili                  Guide index
/profili/[slug]           Guide only; evidence and chemistry links
/acque                    Catalogue with filters
/acque/[slug]             Water detail
/confronta?w=a,b,c        Compare up to 3 (or 2 + tap water)
/rubinetto/milano         Milano tap water
/etichetta                How to read a label (interactive)
/perche-sono-diverse      Why waters differ: the geology (explainer)
/metodologia              Sources, process, thresholds, limits, update policy
/aggiornamenti            Changelog of data updates
/chi-sono                 About the author
/segnala                  Report an error
/privacy                  Privacy policy
/note-legali              Legal notes / disclaimer
/404
```

Global navigation (mobile: bottom bar with 4 items; desktop: top bar): **Composizione · Acque · Confronta · Rubinetto** (Composizione opens catalogue filters); Guide is a secondary link. Secondary links (footer): Etichetta, Perché sono diverse, Metodologia, Aggiornamenti, Chi sono, Segnala, Privacy, Note legali.

---

## 4. UX flows (design these first, as low-fi wireframes in Markdown/ASCII, before any visual design)

### Flow A — In the aisle (primary)

1. Home → search and neutral composition shortcuts: “Sodio < 20 mg/L”, “Calcio > 150 mg/L”, “Solfati > 200 mg/L”, “Magnesio > 50 mg/L”, “Nitrati ≤ 10 mg/L”, “Residuo fisso”.
2. Tap a shortcut → `/acque?filtro=sodio-lt-20` (or another chemistry ID), showing the numerical predicate, results count, missing-data count and removable filter.
3. Cards show source, analysis date and the selected parameter with its unit. No condition names, clinical sorting or suitability colours.
4. Tap a card → composition and value-level sources, followed by separately documented label/decree claims. A filter match establishes only a numerical comparison.
5. Chemistry filters live in the URL. Optional localStorage remembers chemistry filters and comparison selections, never a health profile.
6. The nine condition pages remain guide-only. They link to a relevant chemistry filter as an explanation of composition, never as a list of recommended waters.

### Flow B — “I have this bottle in my hand”

1. Global search by brand or source, accent-insensitive and typo-tolerant.
2. Detail shows composition, dates and sources. “Diciture documentate” contains only transcribed label/decree claims with provenance. No profile selector.

### Flow C — Compare

1. “Aggiungi al confronto” on cards/detail; up to three columns with a removable sticky tray and shareable URL.
2. Rows contain sourced values, units, analysis periods and missing-value markers. User may reorder parameters. No scores, verdicts, medical recommendations or automatic condition-based ordering.
3. Milano requires a zone and sampling month; the column header preserves both. Do not apply bottled-mineral-water legal categories to tap water.

### Flow D — Learn

Label explainer → geology explainer → methodology; each ends with a link back to Flow A.

### Edge states (design each)

- No waters meet the selected chemistry filter → explain which filter excluded them, offer one-tap "rimuovi filtro".
- Every condition page → guide only, evidence level, sources, relevant chemistry link and “Parla con il tuo medico”.
- Water with stale data (analysis > 5 years or entry > 18 months) → amber "dati da ricontrollare" chip with the date.
- Water whose values come from the producer site, not yet from a label photo → neutral "fonte: sito del produttore" chip.
- Search no result → suggest closest names + "Segnala un'acqua mancante".
- Slow network → static HTML content first, lazy images. Offline first visit is not guaranteed; show a connection message when cached content is unavailable.

---

## 5. Visual design

### 5.1 Direction

**Calm, scientific, trustworthy, Italian.** Think of a well-made field notebook or a museum label, not a wellness brand. No stock photos of people drinking, no splashes, no gradients-as-water clichés. Data is the hero: numbers large, units small, sources visible.

Propose 2 directions within this brief (mood board described in words + one rendered home mockup each) at Checkpoint 2, then wait.

### 5.2 Starting tokens (refine in the proposal)

- Background "limestone" `#F6F3EE`, surface `#FFFFFF`, ink `#13283A`, muted ink `#5A6B78`, rule lines `#DCD6CC`.
- Primary "aquifer teal" `#0E6E78` (links, primary buttons, focus), primary-dark `#0A4F57`.
- Data status: stale `#B26A00`, neutral `#5A6B78`; always text plus icon. No health status colours.
- **Ion palette** (colour-blind-safe, Okabe–Ito based), used consistently in every chart: Ca `#0072B2`, Mg `#009E73`, Na `#D55E00`, K `#CC79A7`, HCO₃ `#56B4E9`, SO₄ `#E69F00`, Cl `#999999`, NO₃ `#000000` (outline style).
- Dark mode: full token set redefined under `prefers-color-scheme: dark`, plus a manual toggle; check contrast in both.
- Type: a humanist sans for text (e.g. IBM Plex Sans or Source Sans 3) + its mono/tabular companion for numbers (tabular figures everywhere numbers align). Self-host fonts (no Google Fonts requests, for privacy and speed). Base 17px mobile, 1.5 line height; numeric display in chemistry cards 28–32px.
- Spacing scale 4/8/12/16/24/32/48/64. Radius 10px cards, 999px chips. Shadows minimal; prefer 1px borders.
- Iconography: one line-icon set (e.g. Lucide), 1.75px stroke. Profile icons: simple, non-medical (no pills, no hearts with ECG lines).

### 5.3 Components (build as a small documented library; a `/dev/components` page in development only)

- `ChemistryFilterCard` (parameter, numerical predicate, unit) and `GuideCard` (topic, evidence summary)
- `WaterCard` (name, source region, type chip, 1–3 key values with `ValueBar`, compare toggle)
- `ValueBar` (value on a scale with threshold markers and labelled zones; accessible text alternative: "Sodio 12 mg/L — sotto la soglia di 20")
- `CompositionRangeBadge` (numeric residual classes; named regulatory mentions require documentation)
- `DocumentedClaim` (exact transcription, `claim_source: etichetta | decreto`, evidence URL/photo and decree reference where available). A legal criterion alone cannot create this component
- `EvidenceBadge` (moderata / debole / non stabilita / da verificare), tied to a specific outcome and rationale; separate “Fonte normativa” label, never treat law as clinical evidence
- `CompositionContext` replaces `VerdictBox`: selected numeric filter, declared value, unit and provenance. `VerdictBox` is disabled and must not be implemented; no suitability outcomes or borderline health logic
- `ProvenanceBox` (source type, analysis date, entry date, ion-balance check, cropped label image, "segnala un errore")
- `IonChart` (paired horizontal bars cations vs anions in meq/L)
- `CompareTable` (sticky first column, horizontal scroll on mobile with scroll hint)
- `LabelExplainer` (generic invented label with numbered hotspots; tap → bottom sheet explanation)
- `SearchBox` (command-palette style on desktop, full-screen sheet on mobile)
- `CompareTray`, `FilterSheet` (mobile bottom sheet; desktop sidebar), `EmptyState`, `StaleDataChip`, `Disclaimer`, `SourceList`.

### 5.4 Motion

Minimal: 150–200 ms ease-out for sheets and popovers; respect `prefers-reduced-motion`. No decorative animation.

---

## 6. Page specs

For each page: purpose, content blocks top to bottom, interactions, SEO title/description pattern. Write all UI copy in Italian; keep sentences short; use "tu".

### Home `/`

1. H1: "Leggi i dati. Confronta le acque." Subline: "Confronta le acque minerali italiane in base all'etichetta, alla legge e agli studi. Senza classifiche, senza pubblicità."
2. Search box.
3. Six chemistry shortcuts, followed by a link to the nine guides.
4. Strip: "Acqua di Milano: consulta i dati pubblicati per zona e periodo." → link `/rubinetto/milano`.
5. Three explainer tiles: Come leggere l'etichetta · Perché le acque sono diverse · Come lavoriamo.
6. Footer with "Dati aggiornati al [date of last data update]".

### `/profili/[slug]`

Evidence summary → outcome-specific level and limitations → full sources → relevant chemistry-filter link (exploratory only) → “Parla con il tuo medico”. No water list, product recommendation or automated condition filter.

### `/acque`

Filters: numerical chemistry predicates, type (naturale / effervescente naturale / frizzante), numeric residual class, source region. Documented claims are displayed separately, not used as health filters. Sort by any single parameter (asc/desc). Results count. Filters in URL. Default sort: name A–Z.

### `/acque/[slug]`

Header (name, brand, source comune/region, type, numeric residual class, documented claim chips) → `CompositionContext` + documented claims with provenance → composition table (parameter, value, unit, threshold context) → `IonChart` → "Perché ha questa composizione" (`geology_note`, written by me; hide block if empty) → `ProvenanceBox` → "Confronta" / "Confronta con il rubinetto di Milano" → related waters (same region or similar classification, not "better").

### `/confronta`

As in Flow C. Shareable URL. Print-friendly CSS.

### `/rubinetto/milano`

Values from the utility's published analyses (sampling period + link), explanation of how tap water is controlled, optional comparison to the unweighted median of declared values in our catalogue (show sample count/date; not representative of the market), note that values vary by area/time.

### `/etichetta`

Interactive label + a static fallback list of all fields explained.

### `/perche-sono-diverse`

Short illustrated explainer (simple SVG): rain → infiltration → rock contact time → dissolved ions. Three archetypes: crystalline/Alpine (low mineral), carbonate (Ca-HCO₃), volcanic (CO₂-rich, effervescente naturale). This is the author's signature page; leave text placeholders where I will write, but build the visuals.

### `/metodologia`

Data sources and their order of authority; entry process; validation (ion balance explained simply: "la somma delle cariche positive e negative deve tornare"); thresholds table with legal references; evidence levels definition; what we don't cover; update policy; changelog link; conflicts of interest statement ("nessuno: nessuna pubblicità, nessun rapporto con produttori").

### `/segnala`

Simple form (water, field, what's wrong, optional email) → see section 10 for the no-backend implementation. Also a mailto fallback.

### `/privacy`, `/note-legali`

See section 11.

### SEO patterns

- Water: "[Nome] — composizione, sodio e calcio | Acqua in chiaro"
- Profile: "[Tema]: studi, fonti e limiti | Acqua in chiaro"
- Unique meta descriptions generated from data; never duplicate.

---

## 7. Data

### 7.1 Sources (order of authority)

1. **Physical label photo** taken by me (`data/labels/<slug>_<YYYY-MM-DD>.jpg`; published version cropped to the analysis table).
2. **Producer's official website / technical sheet** (used to seed the launch dataset; record URL + access date + the analysis date it states).
3. **Ministry of Health** for official name, source location, recognition status. Research what is currently published (register, decrees in Gazzetta Ufficiale, databank) and document the URL. If there is no usable current list, say so.
4. **Water utility publications** for tap water (Milano: the analyses published by MM S.p.A.).

### 7.2 Launch dataset

- You (the agent) build the **candidate list of \~50 waters** with the widest national distribution (propose the list with your reasoning at Checkpoint 3; I approve).
- You seed values **only from official producer pages**, recording `source_type: produttore`, URL and access date. Where a producer page lacks the full analysis, leave fields empty; do not fill from other sites.
- I then progressively replace/confirm with label photos (`source_type: etichetta`). The UI shows which is which (section 4, edge states).

### 7.3 Schema — `data/waters.csv`

Identity: `slug, name, brand, bottler, source_name, source_comune, source_provincia, source_regione, type` Composition (mg/L unless stated; empty = not declared): `residuo_fisso_180, ph, conducibilita_uS_cm, temp_sorgente_C, co2_libera, calcio, magnesio, sodio, potassio, bicarbonati, solfati, cloruri, nitrati, nitriti, fluoruri, silice, ferro, ferro_bivalente, durezza_F` Claims are normalized in `data/claims.csv`: `water_slug, claim_id, text_it, claim_source (etichetta|decreto), source_url, label_photo, source_accessed_on, decree_reference, decree_url, review_status`. One evidence row per claim/source; retain both rows when both sources document it. `decree_reference` is required for decree-sourced rows; nullable when only the label is available. Producer composition tables are value sources, not proof of a printed health claim. `ferro` retains declared total/unspecified iron as a value; never substitute it for explicitly declared Fe(II) in `ferro_bivalente`. Missing values remain null. Content: `geology_note` (free text, mine) Provenance: `source_type (etichetta|produttore), source_url, source_accessed_on, label_photo, analysis_date, analysis_lab, entered_by, entered_on, ion_balance_override_reason, notes`

`data/tap/milano.csv`: zone_id, zone_name, parameter, value_raw, comparator, value, unit, sampling_year, sampling_month, uploaded_on, source_url, accessed_on. Preserve < qualifiers and conductivity temperature; no invented sample day or citywide average.

### 7.4 Validation (`scripts/validate.ts`; CI fails on errors)

1. Types, required fields, sane ranges (pH 4–10, no negatives, residuo fisso 0–10 000).
2. **Ion balance**: meq/L = Ca/20.04, Mg/12.15, Na/22.99, K/39.10; HCO₃/61.02, SO₄/48.03, Cl/35.45, NO₃/62.00, F/19.00. Error % = (Σcat − Σan)/(Σcat + Σan)·100. ≤ 5% OK, 5–10% warning, > 10% error unless `ion_balance_override_reason` is filled. Skip with a warning if major ions are missing.
3. Residuo fisso vs conductivity plausibility (tune the range on real data; document it).
4. Check claim evidence and required source fields. A documented claim inconsistent with its numerical criterion triggers editorial review only; missing optional claims are not errors. No derived health claim may enter generated data.
5. Staleness warnings (analysis > 5 years, entry > 18 months).
6. Unique slugs; every `label_photo` file exists. Output a readable report; also generate `data/report.md` committed with each data change.

### 7.5 Pipeline

`data/*.csv` → `scripts/build-data.ts` (parse, zod-validate, compute numeric residual classes, chemistry predicates and ion balance; join documented claims) → `src/generated/waters.json` → static pages. Numeric classes are computed. Regulatory/health mentions are only documented transcriptions. Narrow approved exception: “Ferruginosa — criterio compositivo” may be computed from explicitly declared `ferro_bivalente > 1 mg/L`, separately from documented claims; never infer a health effect or decree authorisation.

---

## 8. Rules engine

### 8.1 Thresholds (`src/rules/thresholds.ts`)

Each entry: `{ id, value, unit, comparator, label_it, legal_source, verified }`. Starting values — **verify each** against D.Lgs. 176/2011, Directive 2009/54/EC (Annex III mentions), D.M. 10 febbraio 2015 art.2(4) (limits), and record exact article/annex:

- Residuo fisso: ≤ 50 minimamente mineralizzata; ≤500 oligominerale (overlaps ≤50); (500,1500] editorial numeric class; > 1500 ricca di sali minerali.
- Mentions: calcica Ca > 150; magnesiaca Mg > 50; sodica Na > 200; iposodica Na < 20; solfata SO₄ > 200; bicarbonata HCO₃ > 600; clorurata Cl > 200; fluorata F > 1; ferruginosa declared Fe(II) > 1; acidula free CO₂ > 250.
- Limits: nitrati ≤ 45 (≤ 10 for infants); fluoruri ≤ 5 (≤ 1.5 for infants; label warning > 1.5).
- Universal sulfate laxative threshold: unverified, disabled. Legal numerical criteria are reference metadata, not permission to publish inferred mentions.

### 8.2 Neutral chemistry filters (`src/rules/chemistryFilters.ts`)

Automatic health profiles are disabled. No clinical exclusions or condition-dependent sorting.

| ID | Visible label | Predicate |
| --- | --- | --- |
| sodio-lt-20 | Sodio < 20 mg/L | sodio < 20 |
| calcio-gt-150 | Calcio > 150 mg/L | calcio > 150 |
| solfati-gt-200 | Solfati > 200 mg/L | solfati > 200 |
| magnesio-gt-50 | Magnesio > 50 mg/L | magnesio > 50 |
| nitrati-lte-10 | Nitrati ≤ 10 mg/L | nitrati ≤ 10 |
| residuo-* | Residuo fisso a 180 °C | ≤50; (50,500]; (500,1500]; >1500 mg/L |

Residual intervals are exclusive presentation classes, not inferred label wording. The legal oligominerale criterion itself is ≤500, with no lower bound. The interval (500,1500] is editorial, not an authorised named category verified here. A nitrate filter has no infant implication.

Default sort is name A–Z; optional sort by one chosen parameter only. Missing values are excluded from numerical results, counted separately and displayed as “Non dichiarato”; never zero. Qualified values such as `<0.15` retain the bound and are not treated as exact values. At implementation, test each boundary, missing values and qualified intervals. AND combines separate filters; residual classes are mutually exclusive.

### 8.3 Composition context and documented claims

The suitability VerdictBox and its outcome enum are removed. No clinical decision, 10% borderline tolerance, traffic-light suitability or personalised template is permitted. Display “Sodio: 12 mg/L · filtro: <20 mg/L” only with a declared source, as a numerical comparison.

Infant suitability and all regulatory/health mentions, including low-sodium diets, diuresis and digestion, appear only when documented on a label and/or recognition decree. Store `claim_source` per evidence row and a decree reference where available. Quote the documented wording and identify its source; this is transcription, not app certification. No composition-derived claim may be passed into the documented-claims channel.

Explicit exception approved by the owner: compute “Ferruginosa — criterio compositivo” only from declared ferrous/bivalent iron >1 mg/L. Total or unspecified iron is displayed as a value only. Do not represent this computation as a printed claim or proof of recognition.

Comparison remains a table of sourced values, dates, units and missingness, without verdicts.

---

## 9. Content and evidence

- All nine `/profili/[slug]` routes are guide-only: ≤150-word summary; specific outcome; evidence level with rationale; limitations and population studied; primary sources/full citations; relevant chemistry link; “Parla con il tuo medico”. No product list or clinical sorting.
- Guides: neonati, meno-sodio, stitichezza, piu-calcio, anziani, sport-caldo, diabete, calcoli-renali, ciclo. Their URLs may remain for compatibility; they never activate health profiles.
- Chemistry links are explanatory, not recommendations: sodium for meno-sodio; calcium for piu-calcio; separate sulfate/magnesium links for stitichezza; nitrate for neonati with explicit non-inference wording; magnesium for diabete/ciclo; residual classes for sport-caldo; calcium/magnesium for anziani; calcium for calcoli-renali. No threshold is presented as a clinical target.
- Read each abstract before citing. Record `citation_verified`, `abstract_read`, `verified`, source URL, DOI/PMID, checked date, outcome, population, limitations, funding-review status and owner approval. Inaccessible or ambiguous references remain `verified: false` and cannot support published guidance.
- Evidence levels apply to a particular proposition, not an entire condition: moderate = controlled human evidence with limitations; weak = small/indirect/heterogeneous evidence; not established = no applicable evidence in the reviewed sources (not proof of no effect); to verify = reading incomplete. These are editorial labels, not a formal GRADE assessment. “Fonte normativa” is a separate provenance category.
- Do not extrapolate a studied branded water, dose, supplement or biomarker to all waters meeting a chemistry filter. No universal sulfate laxative threshold. Calcium absorption is not proof of fracture prevention; supplementation evidence is not bottled-water evidence.
- Verification inventory and abstract-derived notes: `docs/references.md`. Milano source details: `docs/milano-source.md`. Outstanding references stay visibly pending.
- Legal source register: D.Lgs. 176/2011 art.12; Directive 2009/54/EC Annex III; D.M.10 February 2015 art.2(4) for mineral-water constituent limits; D.M.11 September 2003 art.1 for the fluoride label warning. D.Lgs.18/2023 on drinking water must be read with D.Lgs.102/2025 amendments; no bottled-water threshold is applied to tap water.
- Each health sentence in future guide Markdown includes an HTML `<!-- source: ID; outcome: ... -->` audit comment. No health copy is publishable until its source is read and owner review is complete.
- **[HUMAN]** Owner approves every guide before launch. This checkpoint approves the revised product rules, not finished clinical or legal content.

---

## 10. Technical architecture

- **Astro** (static output) + **React islands** (search, filters, compare, label explainer, chemistry selectors). **TypeScript strict**. **Tailwind** with the tokens of section 5 as CSS variables.
- Search: client-side (e.g. a small fuzzy library over the generated JSON; < 15 kB).
- Charts: hand-written SVG components.
- State: URL query params for filters/compare; localStorage only for remembered chemistry filters and compare tray (try/catch, works without it).
- Error reports (`/segnala`) without our own backend — propose 2 options, e.g. the static host's built-in form handling vs. a prefilled GitHub issue link + mailto. Whatever we choose must be covered by the privacy policy and collect the minimum.
- Analytics: none, or cookieless privacy-friendly analytics only (propose; check current Italian Garante guidance so that no cookie banner is legally required; if any doubt, ship without analytics).
- Fonts and icons self-hosted; no third-party requests on page load.
- Images: `astro:assets`, AVIF/WebP, lazy, explicit sizes.
- OG images generated at build per water (name + declared values) and per guide (topic + evidence scope, no product recommendation).
- Structured data: `WebSite` with `SearchAction`, `WebPage`/`Article`, `BreadcrumbList`. Not `Product`, not `Review`.
- `sitemap.xml`, `robots.txt`, canonical URLs, Italian `lang`, `hreflang` not needed.
- Performance budget: ≤ 100 kB JS on detail pages, LCP < 2.0 s on 4G mid-range phone, CLS < 0.05.
- Accessibility: WCAG 2.2 AA; keyboard and screen-reader test of search, filters, sheets, compare; all charts have text equivalents; focus visible; touch targets ≥ 44px.
- Security headers via host config: CSP (self only), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

Repo layout:

```
data/            waters.csv, tap/milano.csv, labels/, report.md
content/         profili/*.md, pages/*.md
scripts/         validate.ts, build-data.ts, new-water.ts, crop-label.ts
src/rules/       thresholds.ts, chemistryFilters.ts, classify.ts, ionBalance.ts, claims.ts
src/components/  (section 5.3)
src/pages/       (section 3)
src/styles/      tokens.css
tests/           unit (rules, ion balance), e2e (Playwright: flows A–C), a11y (axe)
.github/workflows/ci.yml
README.md, METHODOLOGY.md, CONTRIBUTING-DATA.md, CHANGELOG.md
```

---

## 11. Legal and compliance (Italy/EU)

Prepare drafts; mark them clearly as drafts for my review. Verify current requirements rather than assuming.

- **Privacy policy (GDPR)**: controller identity and contact, what is collected (ideally nothing except voluntary error reports), legal basis, retention, rights, hosting provider as processor and where data is processed.
- **Cookies**: aim for zero non-technical cookies so no consent banner is needed; document exactly what storage is used (localStorage for preferences) and why it doesn't require consent, citing current Garante guidance — or tell me if it does.
- **Note legali / disclaimer**: informational, non-medical purpose; data from labels/producer sites with dates; no affiliation with producers; trademarks belong to their owners and are used descriptively; error correction process.
- **Whether a non-commercial personal site needs additional identifiers** (e.g. in the footer): research and tell me; don't assume.
- **[HUMAN]** I approve final legal texts.

---

## 12. Quality assurance

- CI on every push/PR: install → `validate` → unit tests → build → Playwright e2e (flows A, B, C on mobile viewport) → axe accessibility checks → Lighthouse CI budgets → broken-link check (internal + source URLs, warn only for external).
- Visual check: screenshots of key pages at 360px, 768px, 1280px, light and dark, attached to each Checkpoint.
- Content QA checklist: every number on a page matches the CSV; every health sentence has a source comment; no forbidden words ("migliore", "cura", "previene", "consigliata per" + condition).

---

## 13. Deployment and operations

- Hosting: existing GitHub Pages repository `blumanio/blumanio.github.io`; base path `/projects/acqua-in-chiaro/`. Keep all public links on `blumanio.github.io`; no custom domain or CNAME. Confirm host limitations before promising security headers or form handling.
- Existing repository and Pages deployment are connected.
- Domain: retain GitHub Pages HTTPS URL as explicitly requested by the owner.
- **[HUMAN]** Google Search Console + Bing Webmaster: give me the verification steps; submit sitemap.
- Uptime: a free external uptime check on the home page (propose one).
- Data update process (`CONTRIBUTING-DATA.md`): photograph label → `new-water.ts` or edit CSV → `validate` → commit → PR preview → merge → auto-deploy; changelog entry generated from the data diff into `/aggiornamenti`.
- Update cadence: review stale-data report quarterly (document the procedure).

---

## 14. Phases and checkpoints

1. **Verification** — legal thresholds, Ministry source, Milano tap data source, reference list checked. → *Checkpoint 1*: tables with sources, anything `verified: false`.
2. **UX & design** — low-fi wireframes for all pages and edge states; 2 visual directions with a rendered home mockup each. → *Checkpoint 2*: I choose a direction.
3. **Data foundation** — schema, validate, build pipeline, candidate list of 50 waters, 5 seeded from producer pages. → *Checkpoint 3*: approve list + report.
4. **Rules engine** — thresholds, chemistry filters, documented-claim provenance, full boundary/missing-value tests. → *Checkpoint 4*: test report.
5. **Component library** — section 5.3 components with dev page, light/dark, a11y. → *Checkpoint 5*.
6. **Pages** — all pages of section 3 with real data for the 5 seeded waters. → *Checkpoint 6*: preview link + screenshots.
7. **Content** — profile guides with verified references, explainers, methodology, legal drafts. → *Checkpoint 7*: I review every health sentence and legal text.
8. **Full dataset** — remaining \~45 waters seeded from producer pages; validation report clean or overrides justified. → *Checkpoint 8*.
9. **Hardening** — SEO, OG images, security headers, performance budgets, e2e/a11y green, Lighthouse ≥ 90. → *Checkpoint 9*.
10. **Launch** — [HUMAN] steps with my checklist; production deploy; Search Console; uptime check. → *Checkpoint 10*: live URL + launch report.

## 15. Launch checklist (produce as `LAUNCH.md`, tick in the PR)

- &#x20;All CI green; Lighthouse ≥ 90 mobile on home, `/acque`, a detail page, a profile page
- &#x20;50 waters, validation clean or justified
- &#x20;Every profile page approved by owner
- &#x20;Legal pages approved; no consent banner needed (or implemented correctly)
- &#x20;404, error and empty states checked
- &#x20;Domain, HTTPS, security headers verified
- &#x20;Sitemap submitted; OG previews checked (WhatsApp/Telegram link preview)
- `/aggiornamenti` shows launch entry; "Dati aggiornati al" date correct
- &#x20;README, METHODOLOGY, CONTRIBUTING-DATA complete

## 16. Out of scope for v1 (do not build; list in README "Roadmap")

Prices; other cities' tap water; Piper/Schoeller diagrams; contaminant data; accounts; reviews; English version; native app.

## 17. Working agreement

- Ask before: changing the stack; adding a dependency > 50 kB; adding scope; writing any health guidance not traceable to section 9; anything legal.
- When unsure about a fact, say so and propose how to verify it.
- Small commits, descriptive messages (this repo is a portfolio piece).
- At every checkpoint: what's done, what's next, open questions, risks.