# Acqua in chiaro

Public Italian water-composition notebook, by Mohamed El Aammari.

**Live:** https://blumanio.github.io/projects/acqua-in-chiaro/

Astro static, React islands, strict TypeScript, Tailwind tokens and zod. Source Sans 3 / Source Code Pro are self-hosted, with their OFL licenses. No analytics, cookies or third-party asset requests. Links to sources open only when followed.

## Run and build

Node ≥22.18; npm.

```sh
cd projects/acqua-in-chiaro
npm ci
npm run dev
```

Open the URL printed by Astro, including `/projects/acqua-in-chiaro/`.

```sh
npm run build
npm run preview
```

Build validates CSV, generates JSON, runs unit tests, checks strict TypeScript, renders 43 pages and checks generated content, metadata and local links. Any validation error makes the command fail. Warnings (missing dates, partial/historical analyses, incomplete ion panels) remain visible. `.build/` is disposable output.

## Browser QA (one command after installation)

```sh
npx playwright install chromium
npm run qa
```

`qa` rebuilds, starts a local preview, tests mobile flows A–C and Milano, checks third-party requests and console errors, runs axe, produces 36 screenshots at 360/768/1280 in light/dark, and runs Lighthouse on four routes. It exits nonzero on failure. Manually inspect screenshots before treating visual QA as passed. Evidence is saved under `qa-results/`. See LAUNCH.md for checks actually executed in the build environment; scripts existing does not mean they passed.

## Deploy without changing the rest of the portfolio

```sh
npm run build
node scripts/stage-release.mjs
```

Commit source and staged static output **only in this project directory**, excluding node_modules, .build and local QA artifacts. The repository's existing GitHub Pages “pages build and deployment” Action publishes branch `master`. Generated assets use `assets-app` (not an underscore-prefixed directory), for compatibility with the existing Jekyll-based Pages pipeline. No CNAME or custom domain.

`docs/workflows/acqua-ci.yml` is a **not-installed CI template**. A true GitHub validation gate needs it under repository-root `.github/workflows/` plus branch rules; that change is outside the owner's authorized folder. Existing Pages deployment does not run this project's validator. Validation was run before this release; do not confuse it with an active CI gate.

Nested `404.html` can be visited directly. GitHub Pages chooses the repository-root 404 for unknown URLs; changing that behavior also requires an outside-folder change.

## Data and contribution

- `data/waters.csv`: editable producer/label records; one source and analysis per row.
- `data/claims.json`: documented label/decree claims only, initially empty.
- `data/milano-2026.raw.json`: official MM / Comune snapshot, CC BY 4.0.
- `src/data/generated/`: reproducible JSON and validation report.
- `CONTRIBUTING-DATA.md`: add a label in under ten minutes.
- `METHODOLOGY.md`, `CHANGELOG.md`, `LAUNCH.md`: methods and actual release status.
- `docs/candidates.csv`: 50 candidates; inclusion is not a market-share or distribution ranking.

No scores, health profiles or verdict component. Missing values are null, not zero. Fe(II) has its own field. Producer marketing claims are not imported as documented label claims.
