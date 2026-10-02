# Groundwater monitoring dashboard

**Question:** How do measured groundwater heads vary across three wells over one year?

[Open interactive demo](index.html) · [Python analysis](analyze.py) · [Input data](data.json)

## Dataset and provenance

36 synthetic monthly records for 2025, with one intentionally missing July MW-02 reading. All wells represent static readings in comparable screens. The fictional measuring-point elevations (104, 103 and 102 m) share a local datum. Head was generated from a sinusoidal seasonal component plus a small monthly decline, then converted to depth below the measuring point. This is a demonstration dataset, not a field investigation.

Fields: `well` identifier; `date` ISO date; `measuring_point_m` elevation above local datum; `depth_to_water_m` signed depth below that same measuring point, or null for missing.

## Reproduce

From the repository root, run `python3 projects/groundwater-monitoring/analyze.py` (Python 3.10+, no dependencies). This regenerates `results.json` and the browser's `data.js` from `data.json`. Serve the repository with `python3 -m http.server 8000` and visit the project URL.

## Method and results

Head = measuring-point elevation − depth to water. Dates, duplicate well/date keys and non-finite numbers are checked; missing readings are excluded from statistics and remain gaps on the chart. Negative depths are allowed for water above the reference point.

Each well has a 1.25 m measured annual range and a −0.55 m first-to-last change. MW-01 and MW-03 have 12 readings; MW-02 has 11. These patterns were intentionally generated. A single year does not establish a long-term trend; first-to-last change is sensitive to the selected months. Missing observations can hide extremes.

## Consulting relevance

Shows reference-elevation discipline, missing-data transparency and reproducible reporting. Before real use, verify well screens, datum, measuring-point changes, pumping status and field QA records. The example is not an operational monitoring system.

Reference: [USGS Circular 1217: Hydraulic Head and Factors Causing Changes in Ground Water Levels](https://pubs.usgs.gov/circ/circ1217/html/boxa.html).
