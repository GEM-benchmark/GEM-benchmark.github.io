---
title: 'E2E'
type: Structure-to-Text
motivation: One of the largest limited-domain NLG datasets and is frequently used as a data-to-text generation benchmark.
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** http://www.macs.hw.ac.uk/InteractionLab/E2E/
- **Repository:** https://github.com/tuetschek/e2e-cleaning (cleaned version)
- **Paper:** [First data release](https://www.aclweb.org/anthology/W17-5525/),
  [Detailed E2E Challenge writeup](https://doi.org/10.1016/j.csl.2019.06.009),
  [Cleaned E2E version](https://www.aclweb.org/anthology/W19-8652/)
- **Point of Contact:** [Ondrej Dusek](https://tuetschek.github.io/)

### Dataset and Task Summary

The E2E dataset is designed for a limited-domain data-to-text task -- generation of restaurant descriptions/recommendations based on up to 8 different attributes (name, area, price range etc.).

### Why is this dataset part of GEM?

The E2E dataset is one of the largest limited-domain NLG datasets and is frequently used as a data-to-text generation benchmark. The E2E Challenge included 20 systems of very different architectures, with [system outputs available](https://github.com/tuetschek/e2e-eval) for download.

### Languages

English

## Meta Information

### Dataset Curators

Jekaterina Novikova, Ondrej Dusek, Verena Rieser (Heriot-Watt University)

### Licensing Information

CC 4.0 BY-SA ([Creative Commons 4.0 Attribution – Share-Alike](https://creativecommons.org/licenses/by-sa/4.0/))

### Citation Information

Cleaned version:
```
@inproceedings{e2e_cleaned,
	address = {Tokyo, Japan},
	title = {Semantic {Noise} {Matters} for {Neural} {Natural} {Language} {Generation}},
	url = {https://www.aclweb.org/anthology/W19-8652/},
	booktitle = {Proceedings of the 12th {International} {Conference} on {Natural} {Language} {Generation} ({INLG} 2019)},
	author = {Dušek, Ondřej and Howcroft, David M and Rieser, Verena},
	year = {2019},
	pages = {421--426},
}
```

### Leaderboard

## Dataset Structure

### Data Instances

All instances are input-output pairs.

Input (meaning representation -- set of attribute-value pairs):
```
name[Alimentum], area[riverside], familyFriendly[yes], near[Burger King]
```

Output (natural language text):
```
Alimentum is a kids friendly place in the riverside area near Burger King.
```

### Data Fields

The data is in a CSV format, with the following fields:

* `mr` -- the meaning representation (MR, input)
* `ref` -- reference, i.e. the corresponding natural-language description (output)

There are additional fields (`fixed`, `orig_mr`) indicating whether the data was modified in the
cleaning process and what was the original MR before cleaning, but these aren't used for NLG.

The MR has a flat structure -- attribute-value pairs are comma separated, with values
enclosed in brackets (see example above). There are 8 attributes:
* `name` -- restaurant name
* `near` -- a landmark close to the restaurant
* `area` -- location (riverside, city centre)
* `food` -- food type / cuisine (e.g. Japanese, Indian, English etc.)
* `eatType` -- restaurant type (restaurant, coffee shop, pub)
* `priceRange` -- price range (low, medium, high, <£20, £20-30, >£30)
* `rating` -- customer rating (low, medium, high, 1/5, 3/5, 5/5)
* `familyFriendly` -- is the restaurant family-friendly (yes/no)

The same MR is often repeated multiple times with different synonymous references.

### Data Statistics

|             | MRs  | Distinct MRs | References |
|-------------|------|--------------|------------|
| Training    |12,568|        8,362 |    33,525  |
| Development | 1,484|        1,132 |     4,299  |
| Test        | 1,847|        1,358 |     4,693  |
| Total       |15,899|       10,852 |    42,517  |

The data are divided so that MRs in different data sections do not overlap.

“Distinct MRs” are MRs that remain distinct even if restaurant/place names (attributes `name`, `near`)
are delexicalized, i.e., replaced with a placeholder.

## Dataset Creation

### Curation Rationale

The dataset was collected to showcase/test neural NLG models. It is larger and contains more lexical richness
and syntactic variation than previous closed-domain NLG datasets.

### Communicative Goal

Producing a text informing/recommending a restaurant, given all and only the attributes specified on the input.


### Source Data

#### Initial Data Collection and Normalization

The source MRs were generated automatically at random from a set of valid attribute values.

#### Who are the source language producers?

N/A (dataset authors).

### Annotations

#### Annotation process

Human references describing the MRs were collected by crowdsourcing on the CrowdFlower (now Appen) platform,
with either textual or pictorial MRs as a baseline. There were basic checks (length, valid characters, repetition).

The pictorial MRs were used in 20% of cases -- these yield higher lexical variation but introduce noise.

Since the original data was noisy (missing/superfluous attributes in the references), GEM uses the later cleaned
version. It contains the same data, but MRs were reannotated by an automatic script based on regular expression
matching.

#### Who are the annotators?

Native English speakers (self-reported & geographically limited) on the Crowdflower/Appen crowdsourcing platform.

### Personal and Sensitive Information

None present.

## Changes to the Original Dataset for GEM

Using the cleaned version of E2E, otherwise none.

### Special test sets

4 special test sets for E2E were added to the GEM evaluation suite.

#### Data shift

We created subsets of the training and development sets of ~500 randomly selected inputs each.

#### Transformations
We applied input scrambling on a subset of 500 randomly selected test instances; the order of the input properties was randomly reassigned.

#### Subpopulations
For the input size, we created subpopulations based on the number of restaurant properties in the input.

| Input length  | Frequency English |
|---------------|-------------------|
| 2             |                 5 |
| 3             |               120 |
| 4             |               389 |
| 5             |               737 |
| 6             |              1187 |
| 7             |              1406 |
| 8             |               774 |
| 9             |                73 |
| 10            |                 2 |

## Considerations for Using the Data

### Social Impact of the Dataset

N/A

### Impact on Underserved Communities

N/A

### Discussion of Biases

The source data is generated randomly, so it should not contain biases. The human references may be biased by the workers'
demographic, but that was not investigated upon data collection.

### Other Known Limitations

Even the cleaned version does contain some (low) amounts of noise.

## Getting started with in-depth research on the task

[More Information Needed]
