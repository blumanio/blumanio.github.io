# Mohamed El Aammari · Geology & groundwater portfolio

I'm building practical tools to explore geology, groundwater and environmental data. I'm interested in opportunities in geology, hydrogeology and environmental consulting.

[Visit the portfolio](https://blumanio.github.io/)

## Explore the projects

| Project | Demonstrates | Source |
|---|---|---|
| Groundwater monitoring | Hydraulic heads, seasonal charts, missing-data handling | [Code and methods](projects/groundwater-monitoring/) |
| Water-quality screening | Explicit units, reference comparisons, non-detect logic | [Code and methods](projects/water-quality/) |
| Conceptual groundwater map | Three-well head plane, gradient and geological context | [Code and methods](projects/groundwater-map/) |

All three are portfolio demonstrations using **synthetic data**, not client work. No employer affiliation, degree, certification or prior professional experience is implied.

## Run locally

Python 3.10+; no third-party dependencies for the analyses or website.

```sh
python3 projects/groundwater-monitoring/analyze.py
python3 projects/water-quality/analyze.py
python3 projects/groundwater-map/analyze.py
python3 -m unittest discover -s tests -v
python3 -m http.server 8000
```

Open http://localhost:8000. Each `analyze.py` regenerates its `results.json` and browser `data.js`. The interactive pages render saved results locally without external scripts, API keys or analytics.

## Website maintenance

`index.html`, `assets/` and `projects/` are the current static site. GitHub Pages can serve the repository root on `master`. The site uses https://blumanio.github.io/ with no custom domain. Do not add a `CNAME` file unless a working custom domain is explicitly requested. The prior React/webpack source and compiled bundle are retained as legacy files and are not loaded by the new homepage. The old npm build commands are legacy-only and must not be used to publish this static portfolio.

`PROFILE.md` is a ready-to-use GitHub profile README. GitHub displays it on the account profile only when it is copied to `README.md` in a public repository named `blumanio`.

To personalize the biography further, add verified education, field experience, software skills and a preferred professional contact. None have been fabricated.
