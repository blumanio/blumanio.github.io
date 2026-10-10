# Checkpoint 1 — legal thresholds and source audit
Checked: 2026-10-10. Review requested before checkpoint 2, as specified in the project brief.

## Delivered
- `src/rules/thresholds.ts`: 18 source-verified numerical criteria and 2 disabled proposals.
- Explicit operators and analyte fields; no clinical recommendation function.
- Separate non-numerical policy for authorised infant and health-related mentions.
- This table and the registry/source investigation below.

Here, `verified: true` means the stated numerical criterion was read in the linked primary text. It is not an exhaustive legal opinion, a water-compliance assessment, a clinical evidence rating, or approval to publish a health recommendation. `REVIEW.publication_approved` remains false.

## Threshold register
| Rule | Criterion (mg/L) | Source | Verified |
|---|---|---|---|
| Minimamente mineralizzata | ≤ 50 | dlgs176: Art. 12(2)(b); directive54: Annex III | true |
| Oligominerale | ≤ 500 | dlgs176: Art. 12(2)(a); directive54: Annex III | true |
| Ricca di sali minerali | > 1500 | dlgs176: Art. 12(2)(c); directive54: Annex III | true |
| Contenente bicarbonato | > 600 | dlgs176: Art. 12(2)(d); directive54: Annex III | true |
| Solfata | > 200 | dlgs176: Art. 12(2)(e); directive54: Annex III | true |
| Clorurata | > 200 | dlgs176: Art. 12(2)(f); directive54: Annex III | true |
| Calcica | > 150 | dlgs176: Art. 12(2)(g); directive54: Annex III | true |
| Magnesiaca | > 50 | dlgs176: Art. 12(2)(h); directive54: Annex III | true |
| Fluorata | > 1 | dlgs176: Art. 12(2)(i); directive54: Annex III | true |
| Ferruginosa | > 1 | dlgs176: Art. 12(2)(l); directive54: Annex III | true |
| Acidula | > 250 | dlgs176: Art. 12(2)(m); directive54: Annex III | true |
| Sodica | > 200 | dlgs176: Art. 12(2)(n); directive54: Annex III | true |
| Indicata per le diete povere di sodio | < 20 | dlgs176: Art. 12(2)(o); directive54: Annex III | true |
| Limite nitrati | ≤ 45 | dm2015: Art. 2(4), table entry 14 | true |
| Limite nitrati per acque destinate all’infanzia | ≤ 10 | dm2015: Art. 2(4), table entry 14 | true |
| Limite fluoruri | ≤ 5 | dm2015: Art. 2(4), table entry 9 | true |
| Limite fluoruri per acque destinate all’infanzia | ≤ 1.5 | dm2015: Art. 2(4), table entry 9 | true |
| Avvertenza per fluoruri | > 1.5 | dm2003warning: Art. 1(1)–(2) | true |
| Mediominerale — categoria descrittiva proposta | > 500 and ≤ 1500 | No supporting legal criterion located | **false — disabled** |
| Soglia lassativa proposta — non verificata | > 500 | No supporting legal criterion located | **false — disabled** |

### Sources used
- **dlgs176**: [D.Lgs. 176/2011, Article 12](https://www.gazzettaufficiale.it/eli/gu/2011/11/05/258/sg/pdf), printed pp. 3–4 / PDF pages 7–8. Cross-check: [Normattiva current-act entry](https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=011G0218&atto.dataPubblicazioneGazzetta=2011-11-05&tipoDettaglio=vigente); the indexed record reports its last act update as 30 November 2011. Numerical text was read in the Gazzetta publication.
- **directive54**: [Directive 2009/54/EC, Annex III and Article 9](https://eur-lex.europa.eu/eli/dir/2009/54/oj/eng). The EUR-Lex record is marked in force.
- **dm2015**: [D.M. 10 February 2015, Article 2(4)](https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=15A01419&art.dataPubblicazioneGazzetta=2015-03-02&art.flagTipoArticolo=0&art.idArticolo=2&art.idGruppo=0&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1). Use this primary text for the Italian nitrate and fluoride maxima rather than treating the 2003 amending decree as the only current source. Article 8 repeals D.M. 542/1992. A [Ministry recognition decree of 24 April 2026](https://www.gazzettaufficiale.it/atto/vediMenuHTML?atto.codiceRedazionale=26A02176&atto.dataPubblicazioneGazzetta=2026-05-07&tipoSerie=serie_generale&tipoVigenza=originario) still cites the 2015 criteria; this is supporting context, not proof of exhaustive amendment review.
- **dm2003warning**: [D.M. 11 September 2003, Article 1](https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=03A10785&art.dataPubblicazioneGazzetta=2003-10-02&art.flagTipoArticolo=0&art.idArticolo=1&art.idGruppo=0&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1). This is the fluoride **labelling** rule, separate from the 29 December 2003 decree mentioned in the initial brief.

## Changes required before implementing the rules engine
1. **Infants:** remove the proposed “label claim OR chemistry combination” logic. Article 12(4)(c)–(d) ties the mention to the recognition decree. Nitrate and fluoride maxima are necessary restrictions for the stated category, not sufficient infant suitability tests. No automatic inference from low sodium / low residue. Capture the actual label claim and decree URL; use “declared on the label” with verification status, not personalised medical suitability.
2. **Residue boundaries:** the legal oligomineral criterion is ≤500, which overlaps ≤50. Exclusive display buckets may use ≤50, (50,500], (500,1500], >1500, but the middle interval must be called an editorial interval rather than a verified named legal category. Exactly 500 remains oligomineral; exactly 1500 is not rich in mineral salts.
3. **Ferrous iron:** add `ferro_bivalente` or an explicit speciation field. Unspecified `ferro` is not enough for the iron mention.
4. **Optional mentions:** sodium <20 with no low-sodium text is not an erroneous label. A declared low-sodium claim with incompatible transcribed data merits an internal recheck. Never accuse a producer based on an app calculation.
5. **Health profiles:** clinical effects cannot be inferred from permitted composition mentions. Keep all disease-related filtering disabled until the checkpoint-5 evidence review. Kidney-stone and menstrual-cycle pages remain guide-only as requested. Do not label “sport”, “diabetes” or “IBS-D” thresholds as verified regulatory indications.
6. **Sulfate ~500:** not a verified legal trigger for a laxative claim. The proposed value stays disabled. Article 12(4)(b) requires a recognition-decree mention for a laxative label indication.
7. **No safety verdict:** passing nitrate/fluoride limits or an ion-balance check does not demonstrate microbiological or overall chemical compliance.
8. **Conductivity:** the 2015 source lists conductivity at 20°C. The data pipeline needs a reference-temperature field; do not mix differently referenced conductivity values when checking plausibility.
9. **Staleness:** distinguish the five-year label-analysis update obligation in Article 12(6) from the editorial 18-month data-entry review policy.

## Recognition data investigation
A usable **official European Commission list** is available: [List of natural mineral waters recognised by Member States, Northern Ireland and EEA countries](https://food.ec.europa.eu/document/download/ec4fbcc0-7185-4dce-820a-27f7e2653dad_en?filename=labelling-nutrition_mineral-waters_list_eu-recognised.pdf). The retrieved PDF is marked **last update 06.10.2026**. The Italy section starts at PDF page 65 and lists trade description, source name and place of exploitation.

Use this for identity cross-checks, record its retrieval date and separately inspect the relevant Ministry recognition/variation/suspension decrees in Gazzetta Ufficiale. A list entry is not label composition, an infant authorisation, current shelf availability or a medical endorsement.

The [Ministry mineral-water topic page](https://www.salute.gov.it/portale/temi/p2_6.jsp?area=acquePotabili&id=4417&menu=acqueMinerali) was blocked by its browser-validation service during this audit. A public, downloadable, maintained Ministry chemistry database was **not verified**. This is an access finding, not a claim that no such resource exists. The [2026 authorisation activity index](https://www.salute.gov.it/new/it/tema/piano-di-controllo-nazionale-pluriennale/e-attivita-autorizzativevalidazioni/) and individual Gazzetta decrees are additional discovery routes.

Do not import chemistry from the recognition list or consumer/industry directories. Build the retail candidate list from labels/shelves, then use official records to reconcile names and sources. Producer-only pilot entries will be marked `agent-sample`, with missing label evidence explicit.

## Review request
Approve the corrected scope above before checkpoint 2 (schema, validator and three traceable pilot records). The original brief explicitly requests a stop at this checkpoint. The catalogue, clinical references, Astro interface and Milan comparison are not built yet.
