# Low-fidelity page layouts

Checkpoint 2, revised 2026-10-10. Blocks below run top to bottom, with desktop/mobile differences stated explicitly. Paths are logical app routes under `/projects/acqua-in-chiaro/` on GitHub Pages; they are not yet implemented. Shared shell: skip link → brand/search/navigation → main → sources/updated date/footer. Mobile navigation: Composizione, Acque, Confronta, Rubinetto. Guide links remain secondary.

| Route | Ordered content blocks | Interaction / state | SEO title |
| --- | --- | --- | --- |
| `/` | H1 “Leggi i dati. Confronta le acque.”; search; six chemistry shortcuts; Milano strip; label/geology/method links; guide index link | Shortcut opens explicit numeric filter; search opens results; mobile two-column shortcuts | Acqua in chiaro — composizioni e fonti |
| `/profili` | H1 “Guide per capire”; short scope statement; nine topic cards with evidence status; method link | Cards open guides only; no saved health selection | Guide: studi, fonti e limiti — Acqua in chiaro |
| `/profili/[slug]` | Topic; ≤150-word evidence summary; outcome-specific level; population/limitations; sources; chemistry link; “Parla con il tuo medico” | Source popovers and expandable study detail; never product results; unreviewed content remains unpublished | [Tema]: studi, fonti e limiti — Acqua in chiaro |
| `/acque` | H1 “Esplora le acque”; search; filter summary; results and missing-data count; cards; comparison tray | Desktop filter rail; mobile bottom sheet. Name A–Z default, optional one-parameter sort. URL stores filters | Acque minerali: composizione e analisi — Acqua in chiaro |
| `/acque/[slug]` | Name/source/type; numeric residual class; composition table and source/date; documented claims; ion chart; optional owner geology note; provenance; compare controls; related waters | Highlight selected chemical parameter only; null = “Non dichiarato”; source details disclose claim_source/decree; no clinical context selector | [Nome]: composizione, sodio e calcio — Acqua in chiaro |
| `/confronta?w=a,b,c` | H1 “Confronta i valori”; selected columns; parameter table; per-value source/date; missingness; share/print | Up to three columns. Add/remove; select Milano zone/month; mobile horizontal table with sticky parameter column and visible scroll hint | Confronto delle composizioni — Acqua in chiaro |
| `/rubinetto/milano` | H1 “Acqua di Milano”; zone/month selector; sampling/source notice; composition table; context on publication; comparison control; official source and limitations | No default citywide average; missing zone asks selection. Optional catalogue median only with n, period and explicit sampling limitation | Acqua di Milano: valori per zona e periodo — Acqua in chiaro |
| `/etichetta` | H1 “Leggere l’etichetta”; invented label marked illustration; numbered field controls; static explanation list; sources; chemistry link | Keyboard/touch opens explanation sheet; static list always available; illustrative label carries no real brand | Come leggere l’etichetta dell’acqua — Acqua in chiaro |
| `/perche-sono-diverse` | H1 “La composizione nasce sottoterra”; rain/infiltration/contact/ions diagram; three geological settings; author text placeholders; chemistry links | Accessible diagram description; author placeholders not released as finished copy | Geologia e composizione delle acque — Acqua in chiaro |
| `/metodologia` | H1 “Fonti e metodo”; source hierarchy; entry/validation process; threshold reference table; evidence levels; limitations; review schedule; disclosures | Expand source/threshold details; no automatic claims; links to updates/report | Fonti, controlli e limiti — Acqua in chiaro |
| `/aggiornamenti` | H1 “Aggiornamenti dei dati”; latest data date; dated entries by water/field/source; method link | Reverse chronological; no fabricated release date when catalogue is absent | Aggiornamenti dei dati — Acqua in chiaro |
| `/chi-sono` | H1 “Chi cura il progetto”; owner-approved bio; geology/React role; methods; portfolio/contact | Links to existing GitHub portfolio; no invented qualifications or relationships | Chi cura Acqua in chiaro |
| `/segnala` | H1 “Segnala un dato”; water/field/context inputs; optional contact; privacy information; send mechanism; fallback | Delivery mechanism decision deferred to architecture checkpoint; GitHub Pages has no native form backend. Never display “inviato” before delivery | Segnala un dato — Acqua in chiaro |
| `/privacy` | H1 “Privacy”; draft/review marker; controller/contact; hosting, storage and voluntary-report handling; rights; updated date | Owner-reviewed legal copy required; no analytics enabled by default | Privacy — Acqua in chiaro |
| `/note-legali` | H1 “Note legali”; purpose and limits; provenance; trademarks; corrections; contact/date | Drafts excluded from launch until owner approval | Note legali — Acqua in chiaro |
| `/404` | H1 “Questa pagina non c’è”; search; catalogue/home links | Static GitHub Pages fallback must preserve base path; no invented results | Pagina non trovata — Acqua in chiaro |

Descriptions are unique: detail uses source location and available parameters without health promises; guide uses topic, evidence scope and limits; catalogue uses filter-independent composition/search scope. Filter URLs canonicalise to catalogue unless a deliberate indexed page is authored.

## Flows

A: Home chemistry shortcut → numeric catalogue results → sourced water detail (two taps). B: Search → result → composition/provenance. C: Card compare toggle → tray → side-by-side values. D: Etichetta → geology → methodology → chemistry catalogue. Guide links never preselect a health profile.

## Edge-state layouts and copy

| State | Visible blocks / behaviour |
| --- | --- |
| Zero numeric results | “Nessun dato nel filtro selezionato”; active predicate; “Rimuovi filtro”; undeclared count. No clinical explanation |
| Missing parameter | “Non dichiarato” plus source date. Excluded from numeric filter; shown in detail and comparison; never zero |
| Qualified value | Preserve “<0,15 mg/L”; show source. Do not sort/filter as exact 0.15; interval-aware evaluation or explicit unclassified state |
| Guide with incomplete evidence | Draft badge and verification status in review preview; production guide withheld until reviewed. No fallback recommended-water list |
| Stale record | “Dati da ricontrollare · analisi [date]”; source link; no implication of unsafe water |
| Producer-only record | “Fonte: produttore”; analysis/access dates separately; no claim of label verification |
| Search without result | “Nessun risultato”; nearest names if available; “Segnala un’acqua mancante” |
| Empty comparison | “Aggiungi fino a tre acque”; catalogue link; no blank scorecards |
| One comparison column | Show selected data and “Aggiungi un’altra acqua”; no minimum-rank or winner |
| Fourth comparison selection | “Il confronto contiene già tre acque”; removal controls; existing selection retained |
| Unknown/duplicate URL slug | Deduplicate known slugs; report unavailable item; preserve valid selections |
| Milano zone/month missing | Ask for zone/period; no automatic replacement with citywide or another zone |
| Milano source unavailable | Existing sourced snapshot labelled with its date; no fresh-data claim; official link remains |
| Claimed text without evidence | Validation error; do not publish claim. Chemistry value can remain with its own source |
| Missing Fe(II), total iron present | Show iron value with declaration type. No computed ferruginosa descriptor |
| Both label and decree available | One claim display; both evidence rows and decree reference accessible |
| localStorage unavailable | URL/state continues in memory; no broken filter or comparison |
| Slow/offline | Static text first; images lazy. Offline content only if cached; otherwise connection message and retry |
| Mobile comparison | Parameter column retained, columns scroll in local table region; readable numeric cells and scroll hint |
| Keyboard/motion | Native buttons, visible focus, Escape closes sheets, focus returns to opener; reduced-motion preference honoured |

## Two visual directions

**Taccuino di campo — recommended.** Warm limestone paper, restrained teal, spacious typography, six large numerical entry points. Museum-label source notes. Two-column cards on phones make the supermarket flow direct. In production: self-hosted Source Sans 3 plus Source Code Pro; preview uses system fonts. Gentle editorial hierarchy supports the geology portfolio.

**Atlante dei dati.** Cooler neutral surfaces, a compact desktop filter rail, a prominent table and mono-aligned numbers. Mobile rail wraps into selectable filter chips. Better for returning users who compare several parameters, with greater initial density.

Both designs use the same approved neutral policy, no brand logos or medical status colours, sources near values and light/dark palettes. [Rendered proposals](design-options.html) include local filter selection previews; the comparison example is explicitly synthetic. Search is read-only in this design checkpoint. These are not operational catalogue pages.

Owner chooses the direction at this checkpoint (§5.1 and §14 of the supplied specification). Next: schema validation, candidate list and five sourced seed waters, not a premature full launch.
