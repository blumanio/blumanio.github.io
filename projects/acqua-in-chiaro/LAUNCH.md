# Launch record — 2026-10-10

## Public release

Target: https://blumanio.github.io/projects/acqua-in-chiaro/

20 mineral-water records, 43 generated HTML pages, source-backed chemistry search/filter/detail/compare, 24 Milano zone–month records, nine guides and explanatory pages. No synthetic measurements. Three Acqua Vera sources are separate records. Several records are sparse or historical: this release is not 20 complete current laboratory analyses and does not establish nationwide distribution of every product.

**Missing fields:** 286/420 mineral-water composition cells (21 fields ×20 records); 168/504 Milano composition cells (21 fields ×24 zone–month groups); **454/924 overall**. All 134 populated mineral-water composition cells come from the cited producer documents. No documented claims are seeded. Dates missing from the source remain null/blank. Metadata missingness is separate from these composition counts.

## In revisione

- Neonati, Meno sodio, Anziani, Sport e caldo: specific clinical reference review incomplete; neutral placeholders with chemistry links.
- Geology page and every `geology_note`: reserved for Mohamed's author text; conceptual illustration clearly labelled.
- Privacy and legal notes: controller/contact/hosting and applicable legal obligations unverified; visibly draft.
- Five other guides contain source-linked abstract summaries with provisional evidence descriptions; final owner review remains pending, and the coverage is not a current exhaustive systematic review.
- Label/decree claims: none yet documented; no inference from chemistry.

## Data caveats

- Ferrarelle 2018 and Eva 2019 analyses are historical; S.Bernardo uses a 2019 producer article with no analytical date. The Ferrarelle EPD is an expired document, used only as an archive of its analysis, not as a current certification.
- Sorgesana sodium omitted because the same page gives conflicting values.
- Plose conductivity omitted because the reference temperature is ambiguous. Table hardness retained with the discrepancy against introductory text flagged.
- Where evaporation temperature is not explicit, residue stays in a separate field excluded from 180 °C filters; TDS also remains separate.
- Milano snapshot contains Jan/Feb/Mar/Apr/Jun/Jul 2026, no May and no later month. No city average and no invented sampling day.
- Candidate CSV contains 50 entries. The remaining 30 have not passed source verification. Their current retail distribution is not established.

## Checks actually run

- CSV/zod validation and JSON generation: passed, zero errors; warnings retained.
- 37 unit/data tests: passed (every registered threshold at/below/above, UI interval edges, missing ≠ zero, censored values, Fe(II)-only, ion balance, bad dates/provenance, claims rules, CSV parsing, Milano source matching).
- Strict TypeScript 5.9: passed. Native TypeScript 7 could not run in this sandbox; replaced with JS compiler.
- Astro production build: passed, 43 HTML pages.
- Generated-content, base-path/local-link and meta/structured-data checks: passed (1110 local links/assets in initial successful build; rerun for release).
- Browser launch attempted: unavailable. Chromium binary is absent; download returned invalid/truncated archives. QA runner records `browser: not run`.

## Written but NOT executed successfully

Playwright mobile flows A–C, zone/month interactions, runtime console/network checks, axe accessibility, visual screenshots at 360/768/1280 ×light/dark, and Lighthouse. No screenshots were produced. No mobile usability, contrast, Lighthouse score or browser-interaction pass is claimed. The visual gate remains unverified under the owner's allowed local-QA fallback.

Run locally after `npm ci` and `npx playwright install chromium`:

```sh
npm run qa
```

Inspect the 36 screenshots and `qa-results/report.json`; the script cannot substitute for human visual review.

## Deployment and infrastructure limitations

The existing repository GitHub Pages Action publishes committed static files on master. All release changes stay inside projects/acqua-in-chiaro/. The project contains an inactive validation workflow template at `docs/workflows/acqua-ci.yml`. **Validation is not yet a GitHub CI gate.** Installing it at root `.github/workflows/` and configuring a required check would change files/settings outside the authorized scope and needs owner approval. Existing deployment does not wait on this proposed gate.

Security: CSP meta restricts scripts to self plus exact inline hashes; styles permit inline declarations for Astro/React charts. Fonts, CSS, images and scripts are local. Referrer policy is set in HTML. GitHub Pages does not offer project-level custom response headers; no claim is made about custom HSTS, X-Content-Type-Options, Permissions-Policy or frame-ancestors. The nested 404 is built, but unknown URLs use the existing repository-root Pages 404.

Known limitations: browser QA unverified; incomplete/stale analyses; inactive CI validation gate; nested 404 routing; email report opens a draft without a recipient because a public project contact has not been confirmed. Search needs JavaScript, while detail pages and a no-JS catalogue remain readable. Comparison selection uses sessionStorage and a shareable URL; no health profiles are stored.

## Owner actions

1. Run local QA and inspect screenshots if this environment remains unable to run Chromium.
2. Review the five evidence summaries; supply/verify references for the four In revisione guides.
3. Write the geological article and individual source notes.
4. Replace producer-only records with your readable label photos, prioritizing sparse/stale records; retain coherent source/date provenance.
5. Confirm a public contact and complete/review privacy and legal drafts.
6. Authorize the separate root CI workflow installation (and required-check settings if desired). No root change was made in this release.

Live deployment verification is appended after the Pages Action completes; HTTP checks do not replace browser QA.
