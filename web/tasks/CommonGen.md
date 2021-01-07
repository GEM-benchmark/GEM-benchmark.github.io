---
title: 'CommonGen'
type: data-to-text
motivation: A medium sized corpus with a unique reasoning challenge and interesting evaluation possibilities.
---


## Table of Contents

## Dataset and Task Description

* **Homepage:** [CommonGen Homepage](https://inklab.usc.edu/CommonGen/)
* **Repository:** [CommonGen repository](https://github.com/INK-USC/CommonGen)
* **Paper:** [CommonGen: A Constrained Text Generation Challenge for Generative Commonsense Reasoning](https://arxiv.org/abs/1911.03705)
* **Point of Contact:** [yuchen.lin@usc.edu](yuchen.lin@usc.edu)

### Dataset and Task Summary

CommonGen is a constrained text generation task, associated with a benchmark dataset, to explicitly test machines for the ability of generative commonsense reasoning. Given a set of common concepts; the task is to generate a coherent sentence describing an everyday scenario using these concepts.

The dataset was introduced in the paper [CommonGen: A Constrained Text Generation Challenge for Generative Commonsense Reasoning](https://arxiv.org/abs/1911.03705) published in the Findings of EMNLP 2020. It was built by selecting concept sets and corresponding training sentences from a set of image and video captioning datasets, and having Amazon Mechanical Turk crowd workers write additional sentences to provide references for the development and test set.

### Why is this dataset part of GEM?

CommonGen is a medium sized corpus with a unique reasoning challenge and interesting evaluation possibilities.

### Languages

 CommonGen contains English text only (BCP-47: `en`).

## Meta Information

### Dataset Curators

The dataset was curated by a joint team of researchers from the University of Southern California and Allen Institute for Artificial Intelligence. The research is based upon work supported in part by the Office of the Director of National Intelligence (ODNI), Intelligence Advanced Research Projects Activity (IARPA), the DARPA MCS program, and NSF SMA 18-29268.

### Licensing Information

The dataset can be obtained via filing a form with the maintainers, without explicit licensing information. The repository code is under an [MIT license](https://github.com/INK-USC/CommonGen/blob/master/LICENSE).

### Citation Information

```
@inproceedings{lin-etal-2020-commongen,
    title = "{C}ommon{G}en: A Constrained Text Generation Challenge for Generative Commonsense Reasoning",
    author = "Lin, Bill Yuchen  and
      Zhou, Wangchunshu  and
      Shen, Ming  and
      Zhou, Pei  and
      Bhagavatula, Chandra  and
      Choi, Yejin  and
      Ren, Xiang",
    booktitle = "Findings of the Association for Computational Linguistics: EMNLP 2020",
    month = nov,
    year = "2020",
    address = "Online",
    publisher = "Association for Computational Linguistics",
    url = "https://www.aclweb.org/anthology/2020.findings-emnlp.165",
    pages = "1823--1840",
}
```

### Leaderboard

The dataset supports an active leaderboard, the best resukts are tracked [here](https://inklab.usc.edu/CommonGen/leaderboard.html). The model outputs are evaluated against the crowdsourced references, and ranked by SPICE score. The leaderboard also reports BLEU-4 and CIDEr scores.

## Dataset Structure

### Data Instances

The following are two examples sharing the same concept set:

```
[
  {
    "concepts": ['ski', 'mountain', 'skier'],
    "target": 'Skier skis down the mountain',
  },
  {
    "concepts": ['ski', 'mountain', 'skier'],
    "target": 'Three skiers are skiing on a snowy mountain.',
  },
]
```

It should be noted that each concept-set/target pair constitutes an example, but the concept sets are repeated across various numbers of examples.

### Data Fields

A data instance has the following fields
* `concepts`: a `list` of  `string` values denoting the concept the system should write about. Has 3 to 5 items, constitutes the `input` of the task.
* `target`: a sentence `string` mentioning all of the above mentioned `concepts`. Constitutes the desired `output` of the task.

### Data Statistics

Each example in the dataset consists of a set of 3 to 5 concepts denoted by a single noun, verb, or adjective (the input), and a sentence using these concepts (the output). The dataset provides several such sentences for each such concept.

|                           | Train  | Dev   | Test  |
|---------------------------|--------|-------|-------|
| **Total concept-sets**    | 32,651 | 993   | 1,497 |
| **Total sentences**       | 67,389 | 4,018 | 6,042 |
|**Average sentence length**| 10.54  | 11.55 | 13.34 |

The dev and test set were created by sampling sets of concepts of size 4 or 5 (and as many of size 3 for the dev set) present in the source captioning datasets and having crowd-workers write reference sentences using these concepts.

Conversely, the training set has more concept sets of size 3 than of size 4 and 5, and uses the original captions from the source datasets as references.

The authors also ensured that the training, dev and test set have different combinations of unique concepts to ensure compositionality (details in [Table 1](https://arxiv.org/pdf/1911.03705v3.pdf)).

## Dataset Creation

### Curation Rationale

The dataset creators selected sets of concepts that appeared in image and video captions (as identified by a POS tagger) to ensure that a likely real-world scenario including the set could be imagined and constructed. Section 3.1 of the [paper](https://arxiv.org/pdf/1911.03705v3.pdf) describes a sampling scheme which encourages diversity of sets while selecting common concepts.

### Communicative Goal

The speaker is required to produce a *coherent* sentence which mentions all of the source concepts, and which describes a *likely* situation that could be captured in a picture or video.

### Source Data

The dataset re-uses data from the following pre-existing resources:

- Image captioning datasets:
  - [Flickr30k](https://www.mitpressjournals.org/doi/abs/10.1162/tacl_a_00166)
  - [MSCOCO](https://link.springer.com/chapter/10.1007/978-3-319-10602-1_48)
  - [Conceptual Captions](https://www.aclweb.org/anthology/P18-1238/)
- Video captioning datasets:
  - [LSMDC](https://link.springer.com/article/10.1007/s11263-016-0987-1)
  - [ActivityNet](https://openaccess.thecvf.com/content_iccv_2017/html/Krishna_Dense-Captioning_Events_in_ICCV_2017_paper.html)
  - [VaTeX](https://openaccess.thecvf.com/content_ICCV_2019/html/Wang_VaTeX_A_Large-Scale_High-Quality_Multilingual_Dataset_for_Video-and-Language_Research_ICCV_2019_paper.html)

We refer the reader to the papers describing these sources for further information.

#### Initial Data Collection and Normalization

The training data consists of concept sets and captions for the source datasets listed [above](#source-data). The concept sets are the sets of labels of the images or videos, selected with a heuristic to maximize diversity while ensuring that they represent likely scenarios.

The dev and test set sentences were created by Amazon Mechanical Turk crowd workers. The workers were shown an example generation and a set of 4 or 5 concept names along with their part-of-speech and asked to write:
1. One sentence mentioning all of the concepts
2. A rationale explaining how the sentence connects the concept

A screenshot of the interface is provided in Figure 7 of the [Appendix](https://arxiv.org/pdf/1911.03705v3.pdf).

#### Who are the source language producers?

The original language of this dataset was created by Amazon Mechanical Turk workers.

During the data collection, workers who provided rationales that were too short, failed to have good coverage of the input in their sentences, or workers whose output had a high perplexity under a GPT-2 model were disqualified from the pool and replaced with newcomers.

No demographic information is provided.

### Annotations

The dataset does not contain any additional annotations.

#### Annotation process

[N/A]

#### Who are the annotators?

[N/A]

### Personal and Sensitive Information

The concepts are restricted to verbs, adjectives, and common nouns, and no personal information is given in the captions.

## Changes to the Original Dataset for GEM

If the originally published dataset was modified in any way for GEM, please record the changes here. These could include data cleaning, exclusion of certain languages, changes to the data splits, additional challenge examples, among others.

## Considerations for Using the Data

### Social Impact of the Dataset

The task is presented as a stepping stone towards building models that achieve more human-like text generation. Progress in this research direction opens the way for strong quality of life improvements through applications such as virtual assistants or automatic image captioning, while also raising concern of misuse especially by agents who want to hide that a text is machine generated.

### Impact on Underserved Communities

The dataset is in English, a language with an abundance of existing resources.

### Discussion of Biases

The dataset is created using data from image captioning systems and might inherit some of the social biases represented therein (see e.g. [Tang et al. 2020](https://arxiv.org/abs/2006.08315)).

Another related concern is the exposure bias introduced by the initial selection of pictures and video, which are likely to over-represent situations that are common in the US at the expense of other parts of the world (Flickr, for example, is a US-based company founded in Canada). For more discussion of the potential impacts of exposure bias, see e.g. [The Social Impact of Natural Language Processing](https://www.aclweb.org/anthology/P16-2096.pdf).

The use of GPT-2 to validate development ant test sentences [might be cause for similar concern](https://www.aclweb.org/anthology/D19-1339.pdf), but we do note that the authors only use the model to discount very high perplexity sequences which is less likely to surface those biases.

### Other Known Limitations

The language in the development and test set is crowdsourced, which means that it was written by workers whose main goal was speed. This is likely to impact the quality and variety of the targets. The population of crowdsource workers is also not identically distributed as the the base population of the locations the workers come from, which may lead to different representation of situations or underlying expectations of what these situations are.

## Getting started with in-depth research on the task

- Two variants of [BART](https://arxiv.org/abs/1910.13461), [Knowledge Graph augemnted-BART](https://arxiv.org/abs/2009.12677) and [Enhanced Knowledge Injection Model for Commonsense Generation](https://arxiv.org/abs/2012.00366), hold the top two spots on the leaderboard, followed by a fine-tuned [T5 model](https://arxiv.org/abs/1910.10683).
- The following script shows how to download and load the data, fine-tune, and evaluate a model using the ROUGE, BLEU, and METEOR metrics: [GEM sample script](https://github.com/GEM-benchmark/GEM-baseline-models/blob/main/examples/GEM-common_gen.ipynb).

## Credits

Data sheets were introduced by the following two publications:

* [Data Statements for Natural Language Processing: Toward Mitigating System Bias and Enabling Better Science](https://www.aclweb.org/anthology/Q18-1041/), Bender and Friedman
* [Datasheets for Datasets](https://arxiv.org/abs/1803.09010), Gebru et al.

This guide and template is an NLG-specific variant of the one produced by [HuggingFace](https://github.com/huggingface/datasets/blob/master/templates/README_guide.md).
