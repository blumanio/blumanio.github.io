# Milano — source verification

Checked 2026-10-10. Source verified; production import belongs to checkpoint 3.

- [Official dataset DS2970, Analisi dell’acqua 2026](https://dati.comune.milano.it/dataset/0a1e04d3-cbef-433f-9eed-58eb61dafb39).
- Publisher: Metropolitana Milanese; rights holder: Comune di Milano; maintainer: municipal Open Data unit. This is an official MM publication channel, not a consumer database.
- Metadata: monthly updates; coverage January–July 2026; modified 25 September 2026. Preserve those dates separately from access date.
- [Machine-readable JSON](https://dati.comune.milano.it/dataset/0a1e04d3-cbef-433f-9eed-58eb61dafb39/resource/ea101cbf-7ac1-4d2a-918f-372a7d2d9018/download/getdatiqualitaacqua_2026.json).
- [Zone boundaries](https://dati.comune.milano.it/dataset/75314fc8-68da-4510-a65d-7f65b9120391).
- Licence metadata says Creative Commons Attribution; portal default CC BY 4.0. Retain attribution to MM / Comune di Milano, dataset name, period, access date and transformation note with imports.
- The dataset links the [utility quality page](https://www.latuaacqua.it/wps/portal/milanoblu/it/home/acqua-di-milano/tutto-su-acqua-di-milano/qualita). That page was inaccessible in this check. The official dataset and resource were readable.

## Import contract

Use zone + year + month + parameter as a key. Preserve `valoreRilevato` in `value_raw`, including decimal commas and detection bounds. Store parsed value and comparator separately. Preserve units: µg/L must not silently become mg/L; conductivity is reported at 20 °C. Never convert a bound to zero or an exact observation. `dataCaricamento` is upload time, not sampling date. The monthly period does not establish a precise collection day or aggregation statistic.

Choose zone and month before adding a Milano comparison column. No citywide mean is manufactured. Unknown zone → show selector and official zone link. An absent parameter → “Non pubblicato per questo periodo”. No bottled-water classification or clinical judgement applies to this column. Legal-limit strings in the source are not imported as verified legal rules.

Spot-check: Nord-Est, July 2026 reports calcium 94 mg/L, magnesium 19.6 mg/L, conductivity 607 µS/cm at 20 °C, and fluoride <0.15 mg/L. These are provenance checks, not a released catalogue seed.

## Remaining verification

The inspected JSON has 432 records across four zones. It contains January, February, March, April, June and July; May is absent. Preserve that gap rather than inventing observations. Sampling/aggregation method and cross-period completeness need documenting during import. Do not label the July observations as October measurements. Review D.Lgs.18/2023 together with D.Lgs.102/2025 before publishing legal explanations about tap-water monitoring.
