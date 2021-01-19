---
title: 'Czech Restaurant'
type: Structure-to-Text
motivation: One of a few non-English data-to-text datasets in a well-known domain, covering a morphologically rich language.
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** https://github.com/UFAL-DSG/cs_restaurant_dataset
- **Repository:** https://github.com/UFAL-DSG/cs_restaurant_dataset
- **Paper:**  [Dusek & Jurcicek, 2019](https://www.aclweb.org/anthology/W19-8670/)
- **Point of Contact:** [Ondrej Dusek](https://tuetschek.github.io/)

### Dataset and Task Summary

The task is generating responses in the context of a (hypothetical) dialogue system that provides information about restaurants.
The input is a basic intent/dialogue act type and a list of slots (attributes) and their values.
The output is a natural language sentence.

The data originated as a translation and localization of [Wen et al.'s SF restaurant](https://www.aclweb.org/anthology/D15-1199/) NLG dataset.

### Why is this dataset part of GEM?

This is one of a few non-English data-to-text datasets, in a well-known domain, but covering a morphologically rich language that
is harder to generate since named entities need to be inflected. This makes it harder to apply common techniques such as delexicalization
or copy mechanisms.

### Languages

Czech

## Meta Information

### Dataset Curators

Ondrej Dusek, Filip Jurcicek (Charles University, Prague, Czechia)

### Licensing Information

CC 4.0 BY-SA ([Creative Commons 4.0 Attribution – Share-Alike](https://creativecommons.org/licenses/by-sa/4.0/))

### Citation Information

```
@inproceedings{cs_restaurants,
	address = {Tokyo, Japan},
	title = {Neural {Generation} for {Czech}: {Data} and {Baselines}},
	shorttitle = {Neural {Generation} for {Czech}},
	url = {https://www.aclweb.org/anthology/W19-8670/},
	urldate = {2019-10-18},
	booktitle = {Proceedings of the 12th {International} {Conference} on {Natural} {Language} {Generation} ({INLG} 2019)},
	author = {Dušek, Ondřej and Jurčíček, Filip},
	month = oct,
	year = {2019},
	pages = {563--574},
}

```

### Leaderboard

## Dataset Structure

### Data Instances

All instances are input-output pairs.

Input (meaning representation -- intent/dialogue act type + a set of slot/attribute-value pairs):
```
inform_only_match(food=Turkish,name='Švejk Restaurant',near='Charles Bridge',price_range=cheap)
```

Output (natural language text):
```
Našla jsem pouze jednu levnou restauraci poblíž Karlova mostu , kde podávají tureckou kuchyni , Švejk Restaurant .
```
Translation: I only found one cheap restaurant close to Charles Bridge, which serves Turkish cuisine, Švejk Restaurant.

Note that “Karlova Mostu” (Charles Bridge) is an inflected form in the example -- the base form is “Karlův Most”.

### Data Fields

The data is stored in a JSON or CSV format, with identical contents. The data has 4 fields:
* `da`: the input meaning representation/dialogue act (MR)
* `delex_da`: the input MR, delexicalized -- all slot values are replaced with placeholders, such as `X-name`
* `text`: the corresponding target natural language text (reference)
* `delex_text`: the target text, delexicalized (delexicalization is applied regardless of inflection)

In addition, the data contains a JSON file with all possible inflected forms for all slot values in the dataset (`surface_forms.json`).
Each slot -> value entry contains a list of inflected forms for the given value, with the base form (lemma), the inflected form, and
a [morphological tag](https://ufal.mff.cuni.cz/pdt/Morphology_and_Tagging/Doc/hmptagqr.html).

The same MR is often repeated multiple times with different synonymous reference texts.

### Data Statistics

| Property                       | Value |
|--------------------------------|-------|
| Total instances                | 5,192 |
| Unique MRs                     | 2,417 |
| Unique delexicalized instances | 2,752 |
| Unique delexicalized MRs       |   248 |

The data is split in a roughly 3:1:1 proportion into training, development and test sections, making sure no delexicalized MR
appears in two different parts. On the other hand, most DA types/intents are represented in all data parts.


## Dataset Creation

### Curation Rationale

The dataset was created to test neural NLG systems in Czech and their ability to deal with rich morphology.

### Communicative Goal

Producing a text expressing the given intent/dialogue act and all and only the attributes specified in the input MR.

### Source Data

#### Initial Data Collection and Normalization

The input MRs were collected from [Wen et al.'s SF restaurant](https://www.aclweb.org/anthology/D15-1199/) NLG data
and localized by randomly replacing slot values (using a list of Prague restaurant names, neighborhoods etc.).

The generated slot values were then automatically replaced in reference texts in the data.

#### Who are the source language producers?

N/A (dataset authors).

### Annotations

#### Annotation process

The reference texts were created by translating the SF restaurant texts with replaced slot values.

The translated texts were then checked for consistency semi-automatically (searching the texts for slot values,
manually checking for alternative realizations if a value was not found).

#### Who are the annotators?

6 professional translators (+ semi-manual postediting done by the authors).

### Personal and Sensitive Information

None present.

## Changes to the Original Dataset for GEM

No changes.

## Considerations for Using the Data

### Social Impact of the Dataset

N/A

### Impact on Underserved Communities

May improve NLG methods for morphologically rich languages.

### Discussion of Biases

To ensure consistency of translation, the data always uses formal/polite address for the user, and uses the female form for first-person self-references (as if the dialogue agent producing the sentences was female). This prevents data sparsity and ensures consistent results for systems trained on the dataset, but does not represent all potential situations arising in Czech.

### Other Known Limitations

N/A

## Getting started with in-depth research on the task

[More Information Needed]
