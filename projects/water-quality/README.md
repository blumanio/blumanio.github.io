# Groundwater quality screening

**Question:** Which sample results warrant review against an explicit reference, and which cannot be resolved because of reporting limits?

[Open interactive demo](index.html) · [Python analysis](analyze.py) · [Input data](data.json)

## Dataset and provenance

Nine synthetic results: three fictional wells × nitrate, chloride and benzene on 2025-09-15. `value` is the detected concentration for `qualifier: "="`, or reporting limit for `qualifier: "<"`. Nitrate is mg/L as NO3, chloride mg/L and benzene ug/L. No sampling, laboratory accreditation or real site is represented.

`thresholds.json` contains **illustrative teaching references, not regulatory standards**: nitrate 50 mg/L, chloride 250 mg/L and benzene 1 ug/L. Their purpose is to exercise comparison logic. Do not infer compliance or drinking-water safety from this demonstration.

## Reproduce

Run `python3 projects/water-quality/analyze.py` from the repository root (Python 3.10+, standard library only). It writes `results.json` and `data.js`. Serve with `python3 -m http.server 8000` to view the demo.

## Decision rules

- Detected concentration > reference: above reference.
- Detected concentration <= reference: at or below reference.
- Non-detect `< L` with L <= reference: below reference.
- Non-detect `< L` with L > reference: indeterminate.

Non-detects are not replaced by zero or half the reporting limit. The script rejects duplicate sample/analyte keys, unsupported qualifiers, negative/non-finite results, non-positive references and unit mismatches. It does not automatically convert units or analyte bases.

## Findings

At the default references MW-02 is above all three references. MW-01 benzene `<0.5 ug/L` is below the 1 ug/L reference; MW-03 benzene `<2 ug/L` is indeterminate. The correct follow-up for the latter is to review the analytical method and seek a sufficiently low reporting limit, rather than declaring a confirmed exceedance.

Changing a reference in the browser is a scenario exploration and does not alter the saved Python outputs. Before real use, supply jurisdiction-, date-, matrix- and purpose-specific criteria; review laboratory qualifiers, blanks, duplicates, detection limits and data usability. This simplified model supports only `=` and `<` qualifiers.
