---
title: 'XSum'
type: Summarization
motivation: [TODO]
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** 
- **Repository:** https://github.com/EdinburghNLP/XSum
- **Paper:** [Original Paper](https://arxiv.org/abs/1808.08745)
- **Point of Contact:** [Shashi Narayan](shashi.narayan@gmail.com)

### Dataset and Task Summary

The dataset is for the task of abstractive summarization in its extreme form, its about summarizing a document in a single sentence. It introduces extreme summarization, a new single-document summarization task which does not favor extractive strategies and calls for an abstractive modeling approach. The idea is to create a short, one-sentence news summary answering the question "What is the article about?".

### Why is this dataset part of GEM?

[More Information Needed]

### Languages

English

## Meta Information

### Dataset Curators

Shashi Narayan and Shay B. Cohen and Mirella Lapata

### Licensing Information

CC 4.0 BY-SA ([Creative Commons 4.0 Attribution – Share-Alike](https://creativecommons.org/licenses/by-sa/4.0/))

### Citation Information

```@InProceedings{xsum-emnlp,
  author =      "Shashi Narayan and Shay B. Cohen and Mirella Lapata",
  title =       "Don't Give Me the Details, Just the Summary! {T}opic-Aware Convolutional Neural Networks for Extreme Summarization",
  booktitle =   "Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing ",
  year =        "2018",
  address =     "Brussels, Belgium",
}
```

### Leaderboard

## Dataset Structure

### Data Instances

[More Information Needed]

### Data Fields

There are three features of each story file in the dataset:

Document: Input news article.

Summary: One sentence summary of the article.

Id: BBC ID of the article.

### Data Statistics

| Section   | Number of Documents          | 
| ------------- |:-------------:| 
| Training     | 204,045 | 
| Validation     | 11,332      | 
| Testing | 11,334    |  
| Total | 226k |

| Section       |  number of words| number of sentences |
| ------------- |:-------------:| :-------------:|
| Documents      | 431.07     | 19.77 |
| Summary    | 23.26      | 1.00 |

## Dataset Creation

### Curation Rationale

[More Information Needed]

### Communicative Goal

[More Information Needed]


### Source Data

#### Initial Data Collection and Normalization

The dataset consists of BBC articles and accompanying single sentence summaries. Specifically, each article is prefaced with an introductory sentence (aka summary) which is professionally written, typically by the author of the article. They collected 226,711 Wayback archived BBC articles ranging over almost a decade (2010 to 2017) and covering a wide variety of domains (e.g., News, Politics, Sports, Weather, Business, Technology, Science, Health, Family, Education, Entertainment and Arts). Each article comes with a unique identifier in its URL, which was then used to randomly split the dataset into training (90%, 204,045), validation (5%, 11,332), and test (5%, 11,334) set. 

#### Who are the source language producers?

N/A (dataset authors)

### Annotations

#### Annotation process

[More Information Needed]

#### Who are the annotators?

[More Information Needed]

### Personal and Sensitive Information

[More Information Needed]

## Changes to the Original Dataset for GEM

[More Information Needed]

## Considerations for Using the Data

### Social Impact of the Dataset

[More Information Needed]

### Impact on Underserved Communities

[More Information Needed]

### Discussion of Biases

[More Information Needed]

### Other Known Limitations

[More Information Needed]

## Getting started with in-depth research on the task

[More Information Needed]
