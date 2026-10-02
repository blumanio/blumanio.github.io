# Conceptual geology and groundwater map

**Question:** What hydraulic gradient is consistent with three simultaneous head measurements?

[Open interactive demo](index.html) · [Python analysis](analyze.py) · [Input data](data.json)

## Dataset and provenance

Three fictional wells on a local Cartesian metric grid (x east, y north), with heads referenced to a common fictional vertical datum. All screens are assumed to sample the same aquifer. Two invented surface units provide context: sand and gravel plus clay-rich cover. The coordinate system is deliberately **not a real geographic CRS**; polygon arrays are not represented as GeoJSON.

## Reproduce

Run `python3 projects/groundwater-map/analyze.py` from the repository root, using Python 3.10+ (no dependencies). It writes `results.json` and `data.js`. Serve the repository with `python3 -m http.server 8000`.

## Method

Solve h = ax + by + c exactly from the three well locations and heads using a 2×2 determinant. Reject collinear locations and non-finite inputs. Gradient magnitude = sqrt(a² + b²). Under an isotropic homogeneous aquifer assumption, down-gradient bearing is atan2(−a, −b), clockwise from north, normalized to 0–360°. A flat surface has undefined direction.

## Results

Head plane: h = −0.002x −0.001y +99.3 m. Gradient magnitude is approximately 0.002236 m/m and down-gradient bearing is 63.4° (east-northeast). The interactive SVG shows the three-well triangle, 0.5 m contours and a down-gradient arrow.

This is an exact interpolation of three synthetic observations, with no independent validation. Contours outside the triangle are extrapolations. Surface geology does not define calibrated hydraulic properties. Flow direction could differ under anisotropy, disconnected screens or complex geology. The example does not calculate travel time, groundwater velocity or contaminant transport.

## Consulting relevance

Demonstrates coordinate discipline, a conceptual site model, transparent assumptions and an interpretable map. Extend with surveyed coordinates, an explicit projected CRS, borehole logs, additional wells and uncertainty checks before any real assessment.

Reference: [USGS Basic Ground-Water Hydrology, Heads and Gradients](https://pubs.usgs.gov/wsp/2220/report.pdf).
