---
title: 'TURKCorpus'
type: 'Simplification'
motivation: 'TURKCorpus is a high-quality simplification dataset where each source sentence is associated with 8 human-written simplifications.'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** None
- **Repository:** [TURKCorpus](https://github.com/cocoxu/simplification)
- **Paper:** [Optimizing Statistical Machine Translation for Text Simplification](https://www.aclweb.org/anthology/Q16-1029/)
- **Point of Contact:** [Wei Xu](mailto:wei.xu@cc.gatech.edu)

### Dataset and Task Summary

TURKCorpus is a multi-reference dataset for the evaluation of sentence simplification in English. The dataset consists of 2,359 sentences from the [Parallel Wikipedia Simplification (PWKP) corpus](https://www.aclweb.org/anthology/C10-1152/). Each sentence is associated with 8 crowdsourced simplifications that focus on only lexical paraphrasing (no sentence splitting or deletion).


### Why is this dataset part of GEM?

TURKCorpus is a high quality simplification dataset where each source (not simple) sentence is associated with 8 human-written simplifications that focus on lexical paraphrasing. It is one of the two evaluation datasets for the text simplification task in GEM. It acts as the validation and test set for paraphrasing-based simplification that does not involve sentence splitting and deletion.

### Languages

TURKCorpus contains English text only (BCP-47: `en`).

## Meta Information

### Dataset Curators

TURKCorpus was developed by researchers at the University of Pennsylvania. The work was  supported by the NSF under grant IIS-1430651 and the NSF GRFP under grant 1232825.

### Licensing Information

[GNU General Public License v3.0](https://github.com/cocoxu/simplification/blob/master/LICENSE)

### Citation Information
```
 @article{Xu-EtAl:2016:TACL,
 author = {Wei Xu and Courtney Napoles and Ellie Pavlick and Quanze Chen and Chris Callison-Burch},
 title = {Optimizing Statistical Machine Translation for Text Simplification},
 journal = {Transactions of the Association for Computational Linguistics},
 volume = {4},
 year = {2016},
 url = {https://cocoxu.github.io/publications/tacl2016-smt-simplification.pdf},
 pages = {401--415}
 }
 ```

### Leaderboard

There is no official leaderboard.

## Dataset Structure

### Data Instances

- `simplification` configuration: an instance consists of an original sentence and 8 possible reference simplifications that focus on lexical paraphrasing.

### Data Fields

- `original`: an original sentence from the source datasets
- `simplifications`:  a set of reference simplifications produced by crowd workers.


### Data Statistics

TURKCorpus does not contain a training set; many models use [WikiLarge](https://github.com/XingxingZhang/dress) (Zhang and Lapata, 2017) or [Wiki-Auto](https://github.com/chaojiang06/wiki-auto) (Jiang et. al 2020) for training.

Each input sentence has 8 associated reference simplified sentences. 2,359 input sentences are randomly split into 2,000 validation and 359 test sentences.

|                            | Dev    | Test | Total |
| -----                      | ------ | ---- | ----- |
| Input Sentences            | 2000   | 359  | 2359  |
| Reference Simplifications  | 16000  | 2872 | 18872 |


There are 21.29 tokens per reference on average.

## Dataset Creation

### Curation Rationale

The TurkCorpus dataset was constructed to evaluate the task of text simplification.  It contains multiple human-written references that focus on only lexical simplification.


### Communicative Goal

The goal is to communicate the main ideas of source sentence in a way that is easier to understand by non-native speakers of English.


### Source Data

#### Initial Data Collection and Normalization

 The input sentences in the dataset are extracted from the [Parallel Wikipedia Simplification (PWKP) corpus](https://www.aclweb.org/anthology/C10-1152/).

#### Who are the source language producers?

The references are crowdsourced from Amazon Mechanical Turk. The annotators were asked to provide simplifications without losing any information or splitting the input sentence. No other demographic or compensation information is provided in the TURKCorpus paper.

### Annotations

#### Annotation process

The instructions given to the annotators are available in the paper.


#### Who are the annotators?

Reference sentences were written by workers on Amazon Mechanical Turk (AMT) with HIT approval rate over 95%. No other demographic or compensation information is provided in the paper.

### Personal and Sensitive Information

Since the dataset is created from English Wikipedia (August 22, 2009 version), all the information contained in the dataset is already in the public domain.

## Changes to the Original Dataset for GEM

The publicly available dataset is processed with the [Penn Treebank tokenizer](https://www.nltk.org/_modules/nltk/tokenize/treebank.html). We reverse this process to make the format consistent with WikiAuto and ASSET. 


## Considerations for Using the Data

### Social Impact of Dataset

The dataset helps move forward the research towards text simplification by creating a higher quality validation and test dataset. Progress in text simplification in turn has the potential to increase the accessibility of written documents to wider audiences.

### Impact on Underserved Communities

The dataset is in English, a language with an abundance of existing resources.


### Discussion of Biases

The dataset may contain some social biases, as the input sentences are based on Wikipedia. Studies have shown that the English Wikipedia contains both gender biases [(Schmahl et al., 2020)](https://research.tudelft.nl/en/publications/is-wikipedia-succeeding-in-reducing-gender-bias-assessing-changes) and racial biases [(Adams et al., 2019)](https://journals.sagepub.com/doi/pdf/10.1177/2378023118823946).

### Other Known Limitations

Since the dataset contains only 2,359 sentences that are derived from Wikipedia, it is limited to a small subset of topics present on Wikipedia.

## Getting started with in-depth research on the task

The dataset can be downloaded from the original repository [(here)](https://github.com/cocoxu/simplification) by the authors or can also be used via [HuggingFace](https://huggingface.co/docs/datasets) and [TFDS](https://www.tensorflow.org/datasets/overview).

There are recent supervised ([Martin et al., 2019](https://arxiv.org/abs/1910.02677), [Kriz et al., 2019](https://www.aclweb.org/anthology/N19-1317/), [Dong et al., 2019](https://www.aclweb.org/anthology/P19-1331/), [Zhang and Lapata, 2017](https://www.aclweb.org/anthology/D17-1062/)) and unsupervised ([Martin et al., 2020](https://arxiv.org/abs/2005.00352v1), [Kumar et al., 2020](https://www.aclweb.org/anthology/2020.acl-main.707/), [Surya et al., 2019](https://www.aclweb.org/anthology/P19-1198/)) text simplification models that can be used as baselines.

The common metric used for automatic evaluation is SARI [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029/).