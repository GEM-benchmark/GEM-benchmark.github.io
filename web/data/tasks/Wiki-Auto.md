---
title: 'Wiki-Auto'
type: Simplification
motivation: Wiki-Auto is the largest open text simplification dataset currently available. For GEM, Wiki-Auto acts as the training set.
---

## Table of Contents


## Dataset Description

- **Homepage:** None (See **Repository**)
- **Repository:** [Wiki-Auto repository](https://github.com/chaojiang06/wiki-auto)
- **Paper:** [Neural CRF Model for Sentence Alignment in Text Simplification](https://aclanthology.org/2020.acl-main.709/)
- **Point of Contact:** [Chao Jiang](jiang.1530@osu.edu)

### Dataset and Task Summary

WikiAuto provides a set of aligned sentences from English Wikipedia and Simple English Wikipedia as a resource to train sentence simplification systems.

The authors first crowd-sourced a set of manual alignments between sentences in a subset of the Simple English Wikipedia and their corresponding versions in English Wikipedia (this corresponds to the `manual` config in this version of the dataset), then trained a neural CRF system to predict these alignments.

The trained alignment prediction model was then applied to the other articles in Simple English Wikipedia with an English counterpart to create a larger corpus of aligned sentences (corresponding to the `auto` and `auto_acl` configs here).

### Why is this dataset part of GEM?

Wiki-Auto is the largest open text simplification dataset currently available. It is the training dataset for the text simplification task in GEM.

### Languages

Wiki-Auto contains English text only (BCP-47: `en`). It is presented as a translation task where Wikipedia Simple English is treated as its own idiom. For a statement of what is intended (but not always observed) to constitute Simple English on this platform, see [Simple English in Wikipedia](https://simple.wikipedia.org/wiki/Wikipedia:About#Simple_English).

## Meta Information

### Dataset Curators

The dataset was created by Chao Jiang, Mounica Maddela, Wuwei Lan, Yang Zhong, and Wei Xu from Ohio State University. The research is based upon work supported in part by the NSF awards IIS-1755898 and IIS-1822754, ODNI and  IARPA  via the  BETTER  program contract 19051600004, ARO and DARPA via the Social-Sim program contract W911NF-17-C-0095, Figure Eight AI for Everyone Award, and Criteo Faculty Research Award to Wei Xu.

### Licensing Information

The dataset is not licensed by itself, but the source Wikipedia data is under a `cc-by-sa-3.0` license.

### Citation Information

```
@inproceedings{jiang-etal-2020-neural,
    title = "Neural {CRF} Model for Sentence Alignment in Text Simplification",
    author = "Jiang, Chao  and
      Maddela, Mounica  and
      Lan, Wuwei  and
      Zhong, Yang  and
      Xu, Wei",
    booktitle = "Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics",
    month = jul,
    year = "2020",
    address = "Online",
    publisher = "Association for Computational Linguistics",
    url = "https://www.aclweb.org/anthology/2020.acl-main.709",
    doi = "10.18653/v1/2020.acl-main.709",
    pages = "7943--7960",
}
```

### Leaderboard

There is no official leaderboard associated with Wiki-Auto.

## Dataset Structure

### Data Instances

The data in all of the configurations look a little different.

A `manual` config instance consists of a sentence from the Simple English Wikipedia article, one from the linked English Wikipedia article, IDs for each of them, and a label indicating whether they are aligned. Sentences on either side can be repeated so that the aligned sentences are in the same instances. For example:
```
{'alignment_label': 1,
 'normal_sentence': 'The Local Government Act 1985 is an Act of Parliament in the United Kingdom.',
 'normal_sentence_id': '0_66252-1-0-0',
 'simple_sentence': 'The Local Government Act 1985 was an Act of Parliament in the United Kingdom.',
 'simple_sentence_id': '0_66252-0-0-0'}
```
Is followed by
```
{'alignment_label': 0,
 'normal_sentence': 'Its main effect was to abolish the six county councils of the metropolitan counties that had been set up in 1974, 11 years earlier, by the Local Government Act 1972, along with the Greater London Council that had been established in 1965.',
 'normal_sentence_id': '0_66252-1-0-1',
 'simple_sentence': 'The Local Government Act 1985 was an Act of Parliament in the United Kingdom.',
 'simple_sentence_id': '0_66252-0-0-0'}
```

The `auto` config shows a pair of an English and corresponding Simple English Wikipedia as an instance, with an alignment at the paragraph and sentence level:
```
{'example_id': '0',
 'normal': {'normal_article_content': {'normal_sentence': ["Lata Mondal ( ; born: 16 January 1993, Dhaka) is a Bangladeshi cricketer who plays for the Bangladesh national women's cricket team.",
    'She is a right handed batter.',
    'Mondal was born on January 16, 1993 in Dhaka, Bangladesh.',
    "Mondal made her ODI career against the Ireland women's cricket team on November 26, 2011.",
    "Mondal made her T20I career against the Ireland women's cricket team on August 28, 2012.",
    "In October 2018, she was named in Bangladesh's squad for the 2018 ICC Women's World Twenty20 tournament in the West Indies.",
    "Mondal was a member of the team that won a silver medal in cricket against the China national women's cricket team at the 2010 Asian Games in Guangzhou, China."],
   'normal_sentence_id': ['normal-41918715-0-0',
    'normal-41918715-0-1',
    'normal-41918715-1-0',
    'normal-41918715-2-0',
    'normal-41918715-3-0',
    'normal-41918715-3-1',
    'normal-41918715-4-0']},
  'normal_article_id': 41918715,
  'normal_article_title': 'Lata Mondal',
  'normal_article_url': 'https://en.wikipedia.org/wiki?curid=41918715'},
 'paragraph_alignment': {'normal_paragraph_id': ['normal-41918715-0'],
  'simple_paragraph_id': ['simple-702227-0']},
 'sentence_alignment': {'normal_sentence_id': ['normal-41918715-0-0',
   'normal-41918715-0-1'],
  'simple_sentence_id': ['simple-702227-0-0', 'simple-702227-0-1']},
 'simple': {'simple_article_content': {'simple_sentence': ["Lata Mondal (born: 16 January 1993) is a Bangladeshi cricketer who plays for the Bangladesh national women's cricket team.",
    'She is a right handed bat.'],
   'simple_sentence_id': ['simple-702227-0-0', 'simple-702227-0-1']},
  'simple_article_id': 702227,
  'simple_article_title': 'Lata Mondal',
  'simple_article_url': 'https://simple.wikipedia.org/wiki?curid=702227'}}
```

 Finally, the `auto_acl`, the `auto_full_no_split`, and the `auto_full_with_split` configs were obtained by selecting the aligned pairs of sentences from `auto` to provide a ready-to-go aligned dataset to train a sequence-to-sequence system. While `auto_acl` corresponds to the filtered version of the data used to train the systems in the paper, `auto_full_no_split` and `auto_full_with_split` correspond to the unfiltered versions with and without sentence splits respectively. In the `auto_full_with_split` config, we join the sentences in the simple article mapped to the same sentence in the complex article to capture sentence splitting. Split sentences are seperated by a `<SEP>` token. In the `auto_full_no_split config`, we do not join the splits and treat them as seperate pairs. An instance is a single pair of sentences:

```
{'normal_sentence': 'In early work, Rutherford discovered the concept of radioactive half-life , the radioactive element radon, and differentiated and named alpha and beta radiation .\n',
 'simple_sentence': 'Rutherford discovered the radioactive half-life, and the three parts of radiation which he named Alpha, Beta, and Gamma.\n'}
```

Thus, for training a text simplification model for GEM, the data with the `auto_acl` config can be directly used.

### Data Fields

The data has the following field:
- `normal_sentence`: a sentence from English Wikipedia.
- `normal_sentence_id`: a unique ID for each English Wikipedia sentence. The last two dash-separated numbers correspond to the paragraph number in the article and the sentence number in the paragraph.
- `simple_sentence`: a sentence from Simple English Wikipedia.
- `simple_sentence_id`: a unique ID for each Simple English Wikipedia sentence. The last two dash-separated numbers correspond to the paragraph number in the article and the sentence number in the paragraph.
- `alignment_label`: signifies whether a pair of sentences is aligned: labels are `>=1:aligned` and `0:notAligned`
- `paragraph_alignment`: a first step of alignment mapping English and Simple English paragraphs from linked articles
- `sentence_alignment`: the full alignment mapping English and Simple English sentences from linked articles

### Data Statistics

In `auto`, the `part_2` split corresponds to the articles used in `manual`, and `part_1` has the rest of Wikipedia.

The `manual` config is provided with a `train`/`dev`/`test` split with the following amounts of data:
|                            | Tain   | Dev   | Test   |
| -----                      | ------ | ----- | ----   |
| Total sentence pairs       | 373801 | 73249 | 118074 |
| Aligned sentence pairs     |  1889  |  346  | 677    |

The `auto_acl` has 488,332 complex-sentence pairs that are to be used for training the model. The average sentence length for complex and simple sentences are 26.6 and 18.7 respectively.

## Dataset Creation

### Curation Rationale

Wiki-Auto provides a new version of the Wikipedia corpus that is larger, contains 75% less defective pairs and has more complex rewrites than the previous WIKILARGE dataset.

### Communicative Goal

The goal is to communicate the same information as the source sentence using simpler words and grammar.

### Source Data

#### Initial Data Collection and Normalization

The authors mention that they "extracted 138,095 article pairs from the 2019/09 Wikipedia dump using an improved version of the [WikiExtractor](https://github.com/attardi/wikiextractor) library". The [SpaCy](https://spacy.io/) library is used for sentence splitting.

#### Who are the source language producers?

The dataset uses language from Wikipedia: some demographic information is provided [here](https://en.wikipedia.org/wiki/Wikipedia:Who_writes_Wikipedia%3F).

### Annotations

#### Annotation process

Sentence alignment labels were crowdsourced for 500 randomly sampled document pairs (10,123 sentence pairs total). The authors pre-selected several alignment candidates from English Wikipedia for each Simple Wikipedia sentence based on various similarity metrics, then asked the crowd-workers to annotate these pairs. Finally, they trained their alignment model on this manually annotated dataset to obtain automatically aligned sentences (138,095 document pairs, 488,332 sentence pairs).

#### Who are the annotators?

No demographic annotation is provided for the crowd workers. The [Figure Eight](https://www.figure-eight.com/) platform was used for the annotation process.

### Personal and Sensitive Information

Since the dataset is created from Wikipedia/Simple Wikipedia, all the information contained in the dataset is already in the public domain.

## Changes to the Original Dataset for GEM

No change is made to the original dataset.

## Considerations for Using the Data

### Social Impact of the Dataset

The dataset helps move forward the research towards text simplification by creating a larger and more accurate dataset. Progress in text simplification in turn has the potential to increase the accessibility of written documents to wider audiences.

### Impact on Underserved Communities

The dataset is in English, a language with an abundance of existing resources.

### Discussion of Biases

The dataset may contain some social biases, as the input sentences are based on Wikipedia. Studies have shown that the English Wikipedia contains both gender biases [(Schmahl et al., 2020)](https://research.tudelft.nl/en/publications/is-wikipedia-succeeding-in-reducing-gender-bias-assessing-changes) and racial biases [(Adams et al., 2019)](https://journals.sagepub.com/doi/pdf/10.1177/2378023118823946).

### Other Known Limitations

Since the data is created using an automatic alignment model (which is not perfect) there could be still some alignment issues in the data.

## Getting started with in-depth research on the task

The dataset can be downloaded from the original repository [(here)](https://github.com/chaojiang06/wiki-auto) by the authors or can also be used via [HuggingFace](https://huggingface.co/datasets/wiki_auto) and [TFDS](https://www.tensorflow.org/datasets/overview).

The dataset repository provided by the authors also contains instructions to load a transformer-based sequence-to-sequence model trained on the dataset. There are also other recent supervised ([Martin et al., 2019](https://arxiv.org/abs/1910.02677), [Kriz et al., 2019](https://www.aclweb.org/anthology/N19-1317/), [Dong et al., 2019](https://www.aclweb.org/anthology/P19-1331/), [Zhang and Lapata, 2017](https://www.aclweb.org/anthology/D17-1062/)) and unsupervised ([Martin et al., 2020](https://arxiv.org/abs/2005.00352v1), [Kumar et al., 2020](https://www.aclweb.org/anthology/2020.acl-main.707/), [Surya et al., 2019](https://www.aclweb.org/anthology/P19-1198/)) text simplification models that can be used as baselines.

The common metric used for automatic evaluation is SARI [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029/).



