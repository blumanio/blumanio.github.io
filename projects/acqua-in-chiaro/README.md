# Acqua in chiaro

**Status: project brief / in development.** Working title. No operational catalogue or verified rules engine is included yet.

[Read the Italian project overview](https://blumanio.github.io/projects/acqua-in-chiaro/)

## Purpose

A free, neutral Italian-language tool to understand bottled mineral-water labels, connect composition with aquifer geology, and compare declared values with fully traceable sources. Author: Mohamed El Aammari, environmental geologist and React developer (as described in the supplied project brief).

## Planned MVP

- A catalogue targeting at least 50 mineral waters, entered manually from documented label photographs.
- Composition tables, provenance, analysis dates and geological notes.
- Declarative classifications and profile guides, gated by primary-source verification and health-content review.
- A generic interactive label explainer and comparisons of up to three waters.
- A Milan tap-water page using dated utility publications.
- Methodology and source documentation.

No rankings, brand scores, sponsorship, affiliate links, accounts or backend. Price tracking, contaminant claims and additional cities are outside the initial scope.

## Planned architecture

Astro, React islands, strict TypeScript and Tailwind. CSV inputs pass through Zod validation into typed JSON at build time. Lightweight SVG charts. Static hosting, with no trackers. The portfolio overview is plain HTML; the planned application has not been implemented here.

## Data pipeline design

Record identity, source location, composition, printed claims and provenance: label image, analysis date/laboratory, entry author/date and official source URL. Missing values remain missing. Checks cover numeric ranges, units, ionic charge balance, plausibility, inconsistent claims and stale records. An ion-balance check is a data-consistency check, not proof of water safety; incomplete ion panels and overrides require explicit documentation.

## Verification gates

1. Verify legal thresholds and available Ministry records against current primary sources; document exact provisions and unverified items. Review before proceeding.
2. Build the schema and validator, then three sourced pilot records; review.
3. Implement classification rules and boundary/ion-balance tests; review.
4. Build catalogue, details and profile UI; review a running preview.
5. Check scientific references and review every health-related sentence.
6. Add verified Milan utility data and comparison.
7. Complete accessibility, SEO and mobile performance checks; expand the documented catalogue before declaring MVP completion.

The supplied brief's numerical thresholds, infant-suitability logic and health profiles are **proposals requiring verification**, not validated guidance. They are intentionally not published as working recommendations in this overview. No real water records, clinical evidence ratings, legal verification or performance scores are claimed.

## Current deliverables

A linked homepage card, Italian project overview and this project brief. The next implementation checkpoint is legal/source verification. No dependencies or health filters have been added to the live portfolio.
