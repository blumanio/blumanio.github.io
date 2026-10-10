/**
 * Checkpoint 1 — primary-source threshold register.
 * verified means the numerical criterion was read in the cited primary text.
 * It does NOT mean a water is compliant, safe, medically suitable or authorised
 * to display a claim. Publication/health-content review remains a separate gate.
 * enabled means usable reference metadata, never permission to publish a claim.
 * No clinical profile or recommendation engine is implemented at this checkpoint.
 */
export interface LegalSource {
  readonly title: string;
  readonly url: string;
  readonly locator: string;
  readonly checked_on: string;
}
export const LEGAL_SOURCES = {
  "dlgs176": {
    "title": "D.Lgs. 8 ottobre 2011, n. 176",
    "url": "https://www.gazzettaufficiale.it/eli/gu/2011/11/05/258/sg/pdf",
    "locator": "Art. 12; printed pp. 3–4 (PDF pages 7–8)",
    "checked_on": "2026-10-10"
  },
  "directive54": {
    "title": "Directive 2009/54/EC",
    "url": "https://eur-lex.europa.eu/eli/dir/2009/54/oj/eng",
    "locator": "Annex III; Article 9(2)–(3)",
    "checked_on": "2026-10-10"
  },
  "dm2015": {
    "title": "D.M. 10 febbraio 2015",
    "url": "https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=15A01419&art.dataPubblicazioneGazzetta=2015-03-02&art.flagTipoArticolo=0&art.idArticolo=2&art.idGruppo=0&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1",
    "locator": "Art. 2(4), table, entries 9 and 14",
    "checked_on": "2026-10-10"
  },
  "dm2003warning": {
    "title": "D.M. 11 settembre 2003",
    "url": "https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=03A10785&art.dataPubblicazioneGazzetta=2003-10-02&art.flagTipoArticolo=0&art.idArticolo=1&art.idGruppo=0&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1",
    "locator": "Art. 1(1)–(2)",
    "checked_on": "2026-10-10"
  }
} as const satisfies Record<string, LegalSource>;

export type SourceId = keyof typeof LEGAL_SOURCES;
export type Field = "residuo_fisso_180" | "bicarbonati" | "solfati" | "cloruri"
  | "calcio" | "magnesio" | "fluoruri" | "ferro_bivalente" | "co2_libera" | "sodio" | "nitrati";
type Criterion =
  | { readonly operator: "lt" | "lte" | "gt"; readonly value: number }
  | { readonly operator: "gt_lte"; readonly value: readonly [number, number] };
type Verification =
  | { readonly verified: true; readonly enabled: true; readonly legal_source: readonly [{ readonly source: SourceId; readonly provision: string }, ...{ readonly source: SourceId; readonly provision: string }[]] }
  | { readonly verified: false; readonly enabled: false; readonly legal_source: readonly [] };
export type Threshold = Criterion & Verification & {
  readonly label_it: string;
  readonly field: Field;
  readonly unit: "mg/L";
  readonly kind: "composition_criterion" | "maximum" | "warning_trigger" | "unverified_proposal";
  readonly notes: string;
};
export const THRESHOLDS = {
  "very_low_minerals": {
    "label_it": "Minimamente mineralizzata",
    "field": "residuo_fisso_180",
    "operator": "lte",
    "value": 50,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(b)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Reference criterion only. UI classes use numeric intervals; legal mention display requires documentation."
  },
  "low_minerals": {
    "label_it": "Oligominerale",
    "field": "residuo_fisso_180",
    "operator": "lte",
    "value": 500,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(a)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Legal criterion has no 50 mg/L lower bound. A UI bucket (50,500] is a presentation convention."
  },
  "rich_minerals": {
    "label_it": "Ricca di sali minerali",
    "field": "residuo_fisso_180",
    "operator": "gt",
    "value": 1500,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(c)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Exactly 1500 does not meet this criterion."
  },
  "bicarbonate": {
    "label_it": "Contenente bicarbonato",
    "field": "bicarbonati",
    "operator": "gt",
    "value": 600,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(d)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Composition criterion only."
  },
  "sulphate": {
    "label_it": "Solfata",
    "field": "solfati",
    "operator": "gt",
    "value": 200,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(e)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Does not establish a laxative effect or treatment benefit."
  },
  "chloride": {
    "label_it": "Clorurata",
    "field": "cloruri",
    "operator": "gt",
    "value": 200,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(f)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Composition criterion only."
  },
  "calcium": {
    "label_it": "Calcica",
    "field": "calcio",
    "operator": "gt",
    "value": 150,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(g)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Does not establish an osteoporosis indication."
  },
  "magnesium": {
    "label_it": "Magnesiaca",
    "field": "magnesio",
    "operator": "gt",
    "value": 50,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(h)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Does not establish benefit for diabetes, constipation or dysmenorrhoea."
  },
  "fluoride": {
    "label_it": "Fluorata",
    "field": "fluoruri",
    "operator": "gt",
    "value": 1,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(i)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Separate from the fluoride maximum and warning trigger."
  },
  "ferrous_iron": {
    "label_it": "Ferruginosa",
    "field": "ferro_bivalente",
    "operator": "gt",
    "value": 1,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(l)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Requires explicitly declared Fe(II). Never substitute total or unspecified iron."
  },
  "carbon_dioxide": {
    "label_it": "Acidula",
    "field": "co2_libera",
    "operator": "gt",
    "value": 250,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(m)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Requires free CO2; do not derive source-gas provenance from concentration."
  },
  "sodium": {
    "label_it": "Sodica",
    "field": "sodio",
    "operator": "gt",
    "value": 200,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(n)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Not an automatic diabetes exclusion."
  },
  "low_sodium": {
    "label_it": "Indicata per le diete povere di sodio",
    "field": "sodio",
    "operator": "lt",
    "value": 20,
    "unit": "mg/L",
    "kind": "composition_criterion",
    "legal_source": [
      {
        "source": "dlgs176",
        "provision": "Art. 12(2)(o)"
      },
      {
        "source": "directive54",
        "provision": "Annex III"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Exactly 20 is excluded. An absent optional label claim is not a legal inconsistency."
  },
  "nitrate_max": {
    "label_it": "Limite nitrati",
    "field": "nitrati",
    "operator": "lte",
    "value": 45,
    "unit": "mg/L",
    "kind": "maximum",
    "legal_source": [
      {
        "source": "dm2015",
        "provision": "Art. 2(4), table entry 14"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Natural mineral water. These few parameters cannot establish overall legal compliance or safety."
  },
  "nitrate_infant_max": {
    "label_it": "Limite nitrati per acque destinate all’infanzia",
    "field": "nitrati",
    "operator": "lte",
    "value": 10,
    "unit": "mg/L",
    "kind": "maximum",
    "legal_source": [
      {
        "source": "dm2015",
        "provision": "Art. 2(4), table entry 14"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Water intended for infants; necessary limit, not proof of suitability. These few parameters cannot establish overall legal compliance or safety."
  },
  "fluoride_max": {
    "label_it": "Limite fluoruri",
    "field": "fluoruri",
    "operator": "lte",
    "value": 5,
    "unit": "mg/L",
    "kind": "maximum",
    "legal_source": [
      {
        "source": "dm2015",
        "provision": "Art. 2(4), table entry 9"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Natural mineral water. These few parameters cannot establish overall legal compliance or safety."
  },
  "fluoride_infant_max": {
    "label_it": "Limite fluoruri per acque destinate all’infanzia",
    "field": "fluoruri",
    "operator": "lte",
    "value": 1.5,
    "unit": "mg/L",
    "kind": "maximum",
    "legal_source": [
      {
        "source": "dm2015",
        "provision": "Art. 2(4), table entry 9"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Water intended for infants; necessary limit, not proof of suitability. These few parameters cannot establish overall legal compliance or safety."
  },
  "fluoride_warning": {
    "label_it": "Avvertenza per fluoruri",
    "field": "fluoruri",
    "operator": "gt",
    "value": 1.5,
    "unit": "mg/L",
    "kind": "warning_trigger",
    "legal_source": [
      {
        "source": "dm2003warning",
        "provision": "Art. 1(1)–(2)"
      }
    ],
    "verified": true,
    "enabled": true,
    "notes": "Above 1.5 mg/L triggers a label warning about regular consumption by infants and children under seven. Absence of this trigger is not infant suitability."
  },
  "medium_minerals": {
    "label_it": "Mediominerale — categoria descrittiva proposta",
    "field": "residuo_fisso_180",
    "operator": "gt_lte",
    "value": [
      500,
      1500
    ],
    "unit": "mg/L",
    "kind": "unverified_proposal",
    "legal_source": [],
    "verified": false,
    "enabled": false,
    "notes": "Not an authorised named category in Article 12(2) / Annex III reviewed. May become an explicitly editorial interval (500,1500], never a verified legal mention."
  },
  "sulphate_laxative": {
    "label_it": "Soglia lassativa proposta — non verificata",
    "field": "solfati",
    "operator": "gt",
    "value": 500,
    "unit": "mg/L",
    "kind": "unverified_proposal",
    "legal_source": [],
    "verified": false,
    "enabled": false,
    "notes": "No universal legal clinical-effect threshold found. Evidence review and source-specific authorisation are needed. Never activate as a clinical rule."
  }
} as const satisfies Record<string, Threshold>;

export const REVIEW = {
  checked_on: "2026-10-10",
  checkpoint: 2,
  publication_approved: false,
  health_profiles_enabled: false,
  infant_suitability_inference_enabled: false,
  clinical_evidence_review_complete: false,
} as const;

/** Non-numerical requirements are deliberately not disguised as thresholds. */
export const CLAIM_POLICY = {
  automatic_health_filters: false,
  suitability_verdicts: false,
  comparison_verdicts: false,
  regulatory_mentions_from_chemistry: false,
  documented_claim_sources: ["etichetta", "decreto"],
  ferrous_descriptor_exception: { field: "ferro_bivalente", minimum_exclusive: 1, total_iron_fallback: false, is_label_claim: false },
  infant_food: {
    verified: true,
    source: "dlgs176",
    provision: "Art. 12(4)(c)–(d)",
    requires: ["documented label OR recognition decree", "claim_source", "decree_reference where available"],
    infer_from_chemistry: false,
  },
  laxative_diuretic_digestive: {
    verified: true,
    source: "dlgs176",
    provision: "Art. 12(4)(a), (b), (e), (f), (g)",
    requires: ["documented label OR recognition decree", "claim_source", "decree_reference where available"],
    infer_from_chemistry: false,
  },
  optional_composition_mentions: {
    source: "dlgs176",
    provision: "Art. 12(2)",
    missing_claim_is_error: false,
    computed_match_is_authorisation: false,
  },
} as const;

