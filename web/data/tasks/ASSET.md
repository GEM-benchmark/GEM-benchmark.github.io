---
title: 'ASSET'
type: Simplification
motivation: ASSET is a high quality simplification dataset where each source (not simple) sentence is associated with 10 human-written simplifications.
---

## Table of Contents


## Dataset Description

- **Homepage:** None (See **Repository**)
- **Repository:** [ASSET repository](https://github.com/facebookresearch/asset)
- **Paper:** [ASSET: A Dataset for Tuning and Evaluation of Sentence Simplification Models with Multiple Rewriting Transformations](https://aclanthology.org/2020.acl-main.424/)
- **Point of Contact:** [Fernando Alva-Manchego](mailto:f.alva@sheffield.ac.uk), [Louis Martin](mailto:louismartincs@gmail.com)

### Dataset and Task Summary

[ASSET](https://github.com/facebookresearch/asset) [(Alva-Manchego et al., 2020)](https://www.aclweb.org/anthology/2020.acl-main.424.pdf) is multi-reference dataset for the evaluation of sentence simplification in English. The dataset uses the same 2,359 sentences from [TurkCorpus]( https://github.com/cocoxu/simplification/) [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf) and each sentence is associated with 10 crowdsourced simplifications. Unlike previous simplification datasets, which contain a single transformation (e.g., lexical paraphrasing in TurkCorpus or sentence
splitting in [HSplit](https://www.aclweb.org/anthology/D18-1081.pdf)), the simplifications in ASSET encompass a variety of rewriting transformations.

### Why is this dataset part of GEM?

ASSET is a high quality simplification dataset where each source (not simple) sentence is associated with 10 human-written simplifications. It is one of the two datasets for the text simplification task in GEM. It acts as the validation and test set.

### Languages

ASSET contains English text only (BCP-47: `en`).

## Meta Information

### Dataset Curators

ASSET was developed by researchers at the University of Sheffield, Inria,
Facebook AI Research, and Imperial College London. The work was partly supported by Benoît Sagot's chair in the PRAIRIE institute, funded by the French National Research Agency (ANR) as part of the "Investissements d’avenir" program (reference ANR-19-P3IA-0001).

### Licensing Information

[Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)

### Citation Information

```
@inproceedings{alva-manchego-etal-2020-asset,
    title = "{ASSET}: {A} Dataset for Tuning and Evaluation of Sentence Simplification Models with Multiple Rewriting Transformations",
    author = "Alva-Manchego, Fernando  and
      Martin, Louis  and
      Bordes, Antoine  and
      Scarton, Carolina  and
      Sagot, Beno{\^\i}t  and
      Specia, Lucia",
    booktitle = "Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics",
    month = jul,
    year = "2020",
    address = "Online",
    publisher = "Association for Computational Linguistics",
    url = "https://www.aclweb.org/anthology/2020.acl-main.424",
    pages = "4668--4679",
}
```

### Leaderboard

There is no official leaderboard associated with ASSET.

## Dataset Structure

### Data Instances

- `simplification` configuration: an instance consists in an original sentence and 10 possible reference simplifications.
- `ratings` configuration: a data instance consists in an original sentence, a simplification obtained by an automated system, and a judgment of quality along one of three axes by a crowd worker.

### Data Fields

- `original`: an original sentence from the source datasets
- `simplifications`: in the `simplification` config, a set of reference simplifications produced by crowd workers.
- `simplification`: in the `ratings` config, a simplification of the original obtained by an automated system
- `aspect`: in the `ratings` config, the aspect on which the simplification is evaluated, one of `meaning`, `fluency`, `simplicity`
- `rating`: a quality rating between 0 and 100

### Data Statistics

ASSET does not contain a training set; many models use [WikiLarge](https://github.com/XingxingZhang/dress) (Zhang and Lapata, 2017) for training. For GEM, [Wiki-Auto](https://github.com/chaojiang06/wiki-auto) will be used for training the model.

Each input sentence has 10 associated reference simplified sentences. The statistics of ASSET are given below.

|                            | Dev    | Test | Total |
| -----                      | ------ | ---- | ----- |
| Input Sentences            | 2000   | 359  | 2359  |
| Reference Simplifications  | 20000  | 3590 | 23590 |

The test and validation sets are the same as those of [TurkCorpus](https://github.com/cocoxu/simplification/). The split was random.

There are 19.04 tokens per reference on average (lower than 21.29 and 25.49 for TurkCorpus and HSplit, respectively). Most (17,245) of the referece sentences do not involve sentence splitting.

## Dataset Creation

### Curation Rationale

ASSET was created in order to improve the evaluation of sentence simplification. It uses the same input sentences as the [TurkCorpus](https://github.com/cocoxu/simplification/) dataset from [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf). The 2,359 input sentences of TurkCorpus are a sample of "standard" (not simple) sentences from the [Parallel Wikipedia Simplification (PWKP)](https://www.informatik.tu-darmstadt.de/ukp/research_6/data/sentence_simplification/simple_complex_sentence_pairs/index.en.jsp) dataset [(Zhu et al., 2010)](https://www.aclweb.org/anthology/C10-1152.pdf), which come from the August 22, 2009 version of Wikipedia. The sentences of TurkCorpus were chosen to be of similar length [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf). No further information is provided on the sampling strategy.

The TurkCorpus dataset was developed in order to overcome some of the problems with sentence pairs from Standard and Simple Wikipedia: a large fraction of sentences were misaligned, or not actually simpler [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf). However, TurkCorpus mainly focused on *lexical paraphrasing*, and so cannot be used to evaluate simplifications involving *compression* (deletion) or *sentence splitting*. HSplit [(Sulem et al., 2018)](https://www.aclweb.org/anthology/D18-1081.pdf), on the other hand, can only be used to evaluate sentence splitting. The reference sentences in ASSET include a wider variety of sentence rewriting strategies, combining splitting, compression and paraphrasing. Annotators were given examples of each kind of transformation individually, as well as all three transformations used at once, but were allowed to decide which transformations to use for any given sentence.

An example illustrating the differences between TurkCorpus, HSplit and ASSET is given below:

> **Original:** He settled in London, devoting himself chiefly to practical teaching.
>
> **TurkCorpus:** He rooted in London, devoting himself mainly to practical teaching.
>
> **HSplit:** He settled in London. He devoted himself chiefly to practical teaching.
>
> **ASSET:** He lived in London. He was a teacher.

### Communicative Goal

The goal is to communicate the main ideas of source sentence in a way that is easier to understand by non-native speakers of English. This could be done by replacing complex words with simpler synonyms (i.e. paraphrasing), deleting unimportant information (i.e. compression), and/or splitting a long complex sentence into several simpler ones.

### Source Data

#### Initial Data Collection and Normalization

Not applicable since ASSET uses the same 2,359 sentences from [TurkCorpus]( https://github.com/cocoxu/simplification/) [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf)

#### Who are the source language producers?

The dataset uses language from English Wikipedia (August 22, 2009 version): some demographic information is provided [here](https://en.wikipedia.org/wiki/Wikipedia:Who_writes_Wikipedia%3F).

### Annotations

#### Annotation process

The instructions given to the annotators are available [here](https://github.com/facebookresearch/asset/blob/master/crowdsourcing/AMT_AnnotationInstructions.pdf).

#### Who are the annotators?

Reference sentences were written by 42 workers on Amazon Mechanical Turk (AMT). The requirements for being an annotator were:
- Passing a Qualification Test (appropriately simplifying sentences). Out of 100 workers, 42 passed the test.
- Being a resident of the United States, United Kingdom or Canada.
- Having a HIT approval rate over 95%, and over 1000 HITs approved.

No other demographic or compensation information is provided in the ASSET paper.

### Personal and Sensitive Information

Since the dataset is created from English Wikipedia (August 22, 2009 version), all the information contained in the dataset is already in the public domain.

## Changes to the Original Dataset for GEM

No change is made to the original dataset.



### Special test sets

#### Subpopulations

The goal was to assess performance when simplifying source sentences with different syntactic structure and complexity. To this end, we split the original test set according to syntactic complexity of the source sentences. To characterize sentence syntactic complexity, we use the 8-level developmental level (d-level) scale proposed by [Covington et al. (2006)](https://www.researchgate.net/publication/254033869_How_complex_is_that_sentence_A_proposed_revision_of_the_Rosenberg_and_Abbeduto_D-Level_Scale) and the implementation of [Lu, Xiaofei (2010)](https://www.jbe-platform.com/content/journals/10.1075/ijcl.15.4.02lu).
We thus split the original test set into 8 subsets corresponding to the 8 d-levels assigned to source sentences. We obtain the following number of instances per level and average d-level of the dataset:

| Total nb. sentences | L0 | L1 | L2 | L3 | L4 | L5 | L6 | L7 | Mean Level |
|-------------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ---------- |
|                 359 |    166 |      0 |     58 |     32 |      5 |     28 |      7 |     63 |       2.38 |



## Considerations for Using the Data

### Social Impact of the Dataset

The dataset helps move forward the research towards text simplification by creating a higher quality validation and test dataset. Progress in text simplification in turn has the potential to increase the accessibility of written documents to wider audiences.

### Impact on Underserved Communities

The dataset is in English, a language with an abundance of existing resources.

### Discussion of Biases

The dataset may contain some social biases, as the input sentences are based on Wikipedia. Studies have shown that the English Wikipedia contains both gender biases [(Schmahl et al., 2020)](https://research.tudelft.nl/en/publications/is-wikipedia-succeeding-in-reducing-gender-bias-assessing-changes) and racial biases [(Adams et al., 2019)](https://journals.sagepub.com/doi/pdf/10.1177/2378023118823946).

### Other Known Limitations

Since the dataset contains only 2,359 sentences that are derived from Wikipedia, it is limited to a small subset of topics present on Wikipedia.

## Getting started with in-depth research on the task

The dataset can be downloaded from the original repository [(here)](https://github.com/facebookresearch/asset) by the authors or can also be used via [HuggingFace](https://huggingface.co/datasets/asset) and [TFDS](https://www.tensorflow.org/datasets/overview).

There are recent supervised ([Martin et al., 2019](https://arxiv.org/abs/1910.02677), [Kriz et al., 2019](https://www.aclweb.org/anthology/N19-1317/), [Dong et al., 2019](https://www.aclweb.org/anthology/P19-1331/), [Zhang and Lapata, 2017](https://www.aclweb.org/anthology/D17-1062/)) and unsupervised ([Martin et al., 2020](https://arxiv.org/abs/2005.00352v1), [Kumar et al., 2020](https://www.aclweb.org/anthology/2020.acl-main.707/), [Surya et al., 2019](https://www.aclweb.org/anthology/P19-1198/)) text simplification models that can be used as baselines.

The common metric used for automatic evaluation is SARI [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029/).
