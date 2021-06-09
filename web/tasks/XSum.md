---
title: 'XSum'
type: Summarization
motivation: Large scale monolingual dataset for evaluating extreme summarization.
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:**: NA (See Repository)
- **Repository:** https://github.com/EdinburghNLP/XSum
- **Paper:** [Original Paper](https://www.aclweb.org/anthology/D18-1206)
- **Point of Contact:** [Shashi Narayan](shashi.narayan@gmail.com)

### Dataset and Task Summary

The dataset is for the task of abstractive summarization in its extreme form, its about summarizing a document in a single sentence. It introduces extreme summarization, a new single-document summarization task which does not favor extractive strategies and calls for an abstractive modeling approach. The idea is to create a short, one-sentence news summary answering the question "What is the article about?".

### Why is this dataset part of GEM?

This dataset is part of the GEM benchmark for the task of summarization, alongside MLSum and WikiLingua, and acts as a large-scale, high-quality resource for extreme summarization.

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

This dataset has no corresponding public leaderboard.

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

Professional journalists.

### Annotations

Any additional annotations are not collected for this dataset.

#### Annotation process

#### Who are the annotators?

### Personal and Sensitive Information

## Changes to the Original Dataset for GEM

In addition to the original dataset, a modified version of the dataset will be part of the GEM framework.

XSum gold summaries often have divergence issues between the source and target texts due to the dataset artifact that gold summaries are introductory sentences prefacing each article. 

Models agnostic to such noises are vulnerable to hallucinations (Wiseman et al., 2017; Dhingra et al., 2019, Maynez et al., 2020).  For GEM, we have finetuned a BERT-based classifier on 500 document and gold summary pairs, manually annotated for faithfulness (Maynez et al., 2020) and excluded all document-summary pairs from the original XSum dataset where the classifier was not confident (p(faithfull) > 0.8) whether the summary is faithful to the document or not. As a result, we ended up with 23206 training, 1117 validation and 1166 test instances. 



### Special test sets

#### Data shift

We compiled time-shifted test data in the form of new articles for the second semester of 2020 with Covid19-related keywords. We collected new articles from the Wayback archived BBC articles and used the scripts provided for the re-creation of the [XSum dataset](https://github.com/EdinburghNLP/XSum). The new challenge test set contains 401 instances.





## Considerations for Using the Data

### Social Impact of the Dataset

### Impact on Underserved Communities


### Discussion of Biases


### Other Known Limitations


## Getting started with in-depth research on the task

