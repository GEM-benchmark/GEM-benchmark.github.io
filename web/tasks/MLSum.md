---
title: 'MLSum'
type: summarization
motivation: Large-scale multilingual dataset for evaluating abstractive summarization
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** None (See **Repository**)
- **Repository:** [MLSum Repository](https://github.com/recitalAI/MLSUM)
- **Paper:** [MLSUM: The Multilingual Summarization Corpus](https://www.aclweb.org/anthology/2020.emnlp-main.647/)
- **Point of Contact:** {thomas,paul-alexis,jacopo}@recital.ai, {sylvain.lamprier,benjamin.piwowarski}@lip6.fr

### Dataset and Task Summary

MLSum is a large-scale multiLingual summarization dataset. It is buillt from online news outlets and contains over 1.5M article-summary pairs in five different languages: French, German, Spanish, Russian, Turkish. 


### Why is this dataset part of GEM?

This dataset is part of the GEM benchmark for the task of summarization, alongside [Wikilingua](https://huggingface.co/datasets/wiki_lingua) and [Xsum](https://huggingface.co/datasets/xsum), and acts as a large-scale, high-quality resource for cross-lingual summarization.

### Languages

MLSum contains article-summary pairs in 5 languages. In GEM the languages that will be benchmarked are Spanish (ISO 639-1: es) and German (ISO 639-1: de).

## Meta Information

### Dataset Curators

This dataset was developed by a team of researchers from reciTAL and the Sorbonne Université: Thomas Scialom, Paul-Alexis Dray, Sylvain Lamprier, Benjamin Piwowarski, Jacopo Staiano.

### Licensing Information

Usage of dataset is restricted to non-commercial research purposes only. Copyright belongs to the original copyright holders.

### Citation Information

Please cite the following paper: 

```
@inproceedings{scialom-etal-2020-mlsum,
    title = "{MLSUM}: The Multilingual Summarization Corpus",
    author = {Scialom, Thomas  and Dray, Paul-Alexis  and Lamprier, Sylvain  and Piwowarski, Benjamin  and Staiano, Jacopo},
    booktitle = {Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP)},
    year = {2020}
}
```


### Leaderboard

This dataset has no corresponding public leaderboard.

## Dataset Structure

### Data Instances

A train data example:

```
{
    "text": "This is a text",
	"summary": "A text",
    "topic": "football",
	"url": "https://www.google.com",
	"title": "A sample",
    "date": "01/01/2001"
}
```

A validation or test data example:

```
{
    "text": "This is a text",
    "topic": "football",
	"url": "https://www.google.com",
	"title": "A sample",
    "date": "01/01/2001"
}
```

### Data Fields

The data fields are:

- `text`: the source article (`string`).
- `summary`: the output summary (`string`).
- `topic`: the topic of the article (`string`).
- `url`: the article's url (`string`).
- `title`: the article's title (`string`).
- `date`: the article's date (`string`).

### Data Statistics

The statistics of the original dataset are:
|	               |  Dataset  | Train   | Validation  |  Test  | Mean article length | Mean summary length |  
| :---        	   | :----:   | :---:   |   :---:      |  :---:  |       :---:          |      :---:           |
| German      	   | 242,982  | 220,887 |11,394     |10,701 |570.6 (words)  | 30.36 (words)  |
| Spanish          | 290,645  | 266,367 |10,358     |13,920 |800.5 (words)  |20.71 (words)  |

The statistics of the cleaned version of the dataset are:
|	               |  Dataset  | Train   | Validation  |  Test  |
| :---        	   | :----:   | :---:   |   :---:      |  :---:  |
| German      	   | 242,835  | 220,887 |11,392     |10,695 |
| Spanish          | 283,228  |259,886  |9,977     |13,365 |

## Dataset Creation

The authors extracted gold-standard document-summary pairs, by considering news articles as the source document and their paired highlights/description as the summary.

### Curation Rationale

The dataset was created in order to enable training and evaluation of summarization models in different languages. It allows to understand whether a given model is as fitted for a specific language as for any other.

### Communicative Goal

The speaker is required to produce high quality summaries of articles.


### Source Data

The article-summary pairs were extracted from the online version of the following newspapers: Le Monde4 (French), Süddeutsche Zeitung (German), El Pais (Spanish), Moskovskij Komsomolets (Russian), and Internet Haber (Turkish).

#### Initial Data Collection and Normalization

The authors gathered archived articles from 2010 to 2019. To avoid articles containing mostly audiovisual content, the authors discarded all article-summary pairs for which the articles were shorter than 50 words or summaries were shorter than 10 words.

#### Who are the source language producers?

No information is provided in the paper.

### Annotations

Any additional annotations are not collected for this dataset.

#### Annotation process

[N/A]

#### Who are the annotators?

[N/A]

### Personal and Sensitive Information

[N/A]

## Changes to the Original Dataset for GEM

The modifications done to the original dataset are the following:
- Selection of 2 languages (Spanish and German) out of the dataset 5 languages.
- Removal of duplicate items.
- Manually removal of article-summary pairs for which the summary is not related to the article.
- Removal of article-summary pairs written in a different language (detected using the [langdetect](https://pypi.org/project/langdetect/) library).


### Special test sets

#### Data shift

For both selected languages (German and Spanish), we compiled time-shifted test data in the form of new articles for the second semester of 2020 with Covid19-related keywords. We collected articles from the same German and Spanish outlets as the original MLSUM datasets (El Pais and Süddeutsche Zeitung). We used the scripts provided for the re-creation of the [MLSUM datasets](https://github.com/recitalAI/MLSUM). The new challenge test set for German contains 5058 instances and the Spanish one 1938.



## Considerations for Using the Data

### Social Impact of the Dataset

[N/A]

### Impact on Underserved Communities

[N/A]

### Discussion of Biases

[N/A]

### Other Known Limitations

[N/A]

## Getting started with in-depth research on the task

Download the dataset using the [Huggingface API](https://huggingface.co/datasets/mlsum).
