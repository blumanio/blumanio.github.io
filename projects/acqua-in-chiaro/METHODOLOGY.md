# Methodology — 2026-10-10

## Scope and provenance

20 producer-sourced mineral-water records, including three separately named Acqua Vera sources. This is an initial convenience sample, not a representative market survey. Some sources provide only one number. Of 21 composition fields ×20 records, 286 are empty. Source identity, URL, access date, entry date and analysis date (nullable) accompany every record. All populated values in a record come from its one cited analysis/page. The public ProvenanceBox links every table value to that document. No third-party composition datasets are used.

Producer composition is not a photographed label. Initial claims are empty. Future claims require `claim_source` etichetta/decreto, evidence URL and decree reference where available. A numerical criterion never authorizes a claim. Ferrous/bivalent iron is distinct from total iron; only declared Fe(II)>1 can produce the narrow ferruginosa descriptor.

## Parsing and validation

CSV supports quoted commas/newlines and escaped quotes. zod validates identities, HTTPS provenance, exact calendar dates and documented-claim fields. Measurements are nonnegative numbers with optional <, ≤, >, ≥. Blank becomes null; unspecified non-detection is not zero. Broad plausibility ranges reject impossible values; pH 4–10 is a warning range, not a safety rule. Date/access ordering and future dates are checked. Analysis age >18 months produces an update warning; >5 years is historical. Missing dates and sparse records produce warnings. A legacy source can be stale even without an analysis date, as explicitly noted for S.Bernardo.

Charge-balance diagnostic: convert Ca/20.039, Mg/12.1525, Na/22.9898, K/39.0983, HCO3/61.0168, SO4/48.03, Cl/35.453 and NO3/62.0049 from mg/L to meq/L. CBE=100(C−A)/(C+A). It is a major-ion diagnostic, omitting other species; not a full chemical certification. Required missing/censored ions skip the calculation. Absolute CBE >5% warns; >10% fails. Zero denominator returns null. The wide residue/conductivity ratio check is a transcription warning only.

Threshold metadata remains in `src/rules/thresholds.ts` with primary references and disabled unverified proposals. Browser filters use neutral numeric predicates from `chemistry.ts`. Intervals must conclusively match; missing/ambiguous values do not pass. Residue buckets are editorial numeric intervals, not computed regulatory mentions. TDS with unspecified temperature remains separate.

## Milano

MM / Comune di Milano open data, official dataset UUID 0a1e04d3-cbef-433f-9eed-58eb61dafb39, CC BY 4.0. Raw 2026 file retained: 432 rows, 24 zone–month groups, four zones and January/February/March/April/June/July. Only composition parameters are exposed; source limit columns and narrative health text are not imported. Residue is directly reported by the publisher, not estimated. Zone/month is the measurement period; no invented day or citywide average. Missing fields remain null. Source URL and access date accompany each group.

## Evidence and limitations

Guides distinguish studied outcomes and limits, using verified author abstracts listed in docs/references.md. Levels are provisional editorial assessments, not formal GRADE determinations. The literature search is not an exhaustive current systematic review. Four unsourced condition sections stay In revisione. Five others present cautious source-linked summaries; final owner review remains pending. Geology text and individual source geology notes are explicit author placeholders. Comparisons show values only.

No claims of drinking-water safety, clinical suitability or overall regulatory compliance can follow from this limited dataset.
