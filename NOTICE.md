# Third-party material

Some material bundled here carries its own terms. **Neither `LICENSE` (AGPL-3.0)
nor `LICENSE-CONTENT` (CC BY-SA 4.0) relicenses any of it.** If you fork this
project, these obligations travel with you.

## Flag artwork, `flags/*.svg`

From [lipis/flag-icons](https://github.com/lipis/flag-icons), MIT licensed.
Retain the MIT notice if you redistribute them.

The mapping of language to flag is an editorial choice, not a statement about
any country:

| Language | Flag | Why |
|---|---|---|
| English | Great Britain | Marks the language, not the care system |
| Zomi | Myanmar | Chosen by the project's clinician |
| Pashto, Dari | Afghanistan | Both are Afghan languages |
| Arabic | Saudi Arabia | Conventional emblem for the language |

The US flag on the care notice is separate: it refers to the healthcare system
the guide describes, not to a language.

## Edinburgh Postnatal Depression Scale (EPDS)

> Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development
> of the 10-item Edinburgh Postnatal Depression Scale.
> *Br J Psychiatry* 1987;150:782-786.
> Antenatal use: Murray D, Cox JL. *J Reprod Infant Psychol* 1990;8:99-107.

© 1987 The Royal College of Psychiatrists. **May be reproduced without seeking
permission provided the authors, title and source are quoted.** The app carries
that citation in `epds.attribution`, and it must stay there.

Translations bundled here are the officially validated versions published by
NSW Health Multicultural Health Communication Service, extracted mechanically
from the published PDFs.

**Do not machine-translate this instrument.** Its cutoffs hold only for wording
that has been formally validated. A machine translation still produces a score,
and that score looks exactly as authoritative as a real one. Option *order*
also carries meaning: the published form alternates direction by item, and
normalising it lets a respondent straight-line one column for a false zero.
`i18n/epds/verify.js` enforces both. See `i18n/epds/SOURCES.md`.

## Patient Health Questionnaire (PHQ-9)

> Kroenke K, Spitzer RL, Williams JBW. The PHQ-9: validity of a brief
> depression severity measure. *J Gen Intern Med* 2001;16:606-613.

Developed by Drs Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and
colleagues, with an educational grant from Pfizer Inc. **No permission required
to reproduce, translate, display or distribute.** Used for French and Russian,
which have no freely downloadable validated EPDS.

## Fonts

Lora and DM Sans are loaded from Google Fonts under the SIL Open Font License.
Not redistributed in this repository.

## Clinical sources

Guide content is drawn from ACOG, AAP, WHO and FDA guidance, and describes care
as delivered in the United States. Individual claims are attributed in the text
where it matters. This is health education, not medical advice.
