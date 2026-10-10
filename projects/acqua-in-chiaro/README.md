# Acqua in chiaro

**Checkpoint 2: corrected specification, source review and two design proposals.** The operational catalogue is not built yet.

[Project overview](https://blumanio.github.io/projects/acqua-in-chiaro/) · [Rendered design options](https://blumanio.github.io/projects/acqua-in-chiaro/docs/design-options.html) · [Checkpoint and open items](docs/checkpoint-2.md)

A neutral Italian-language composition comparison project by Mohamed El Aammari, environmental geologist and React developer, as described in the supplied brief. Planned stack: Astro + React islands + strict TypeScript + Tailwind. Existing hosting stays on GitHub Pages; no custom domain.

## Approved scope

- Compare sourced composition values, dates and units for up to three waters, with a Milano zone/month option.
- Six neutral entry points: sodium <20, calcium >150, sulfate >200, magnesium >50, nitrate ≤10 mg/L, and numeric fixed-residue classes.
- Regulatory/health mentions only as documented label/decree transcriptions, with `claim_source` and decree reference where available. Never infer infant suitability or low-sodium-diet wording from chemistry.
- Separate total/unspecified iron from `ferro_bivalente`. Only declared Fe(II)>1 mg/L can produce the explicitly computed ferruginosa composition descriptor; it is not a printed claim.
- Nine evidence guides, all guide-only. No clinical recommendation engine, automatic health filters or suitability verdicts.
- Catalogue target: at least 50 waters seeded from official producer records, then progressively confirmed/replaced with owner label photographs. Missing values stay missing.

## Review materials

- [Revised specification](SPEC.md), particularly §4, §5.3, §8.2–8.3 and §9.
- [Threshold register](src/rules/thresholds.ts) and [checkpoint 1](docs/checkpoint-1.md). Checkpoint 2 policy supersedes earlier claim-display assumptions.
- [Milano source and import contract](docs/milano-source.md).
- [References, abstract checks and outstanding items](docs/references.md).
- [All-page wireframes, edge states and design rationale](docs/wireframes.md).

Choose Taccuino di campo (recommended for mobile discovery) or Atlante dei dati (denser comparison-first layout). The preview has local filter selection and a clearly labelled synthetic table, not real catalogue results. The next checkpoint covers schema validation, a candidate list of 50 waters and five source-backed seed records.

No health copy, legal pages, production dataset, performance scores or complete app are claimed at this stage. Remaining research and preview-verification limitations are listed in the checkpoint report. No project dependencies were added.

## Roadmap outside v1

Prices, additional cities, Piper/Schoeller diagrams, contaminant datasets, accounts, reviews, English version and native app.
