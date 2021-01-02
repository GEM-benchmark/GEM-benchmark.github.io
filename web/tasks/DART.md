
---
title: DART
type: Table-to-Text
motivation: Hierarchical, structured format with its open-domain nature 
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** None (See **Repository**)
- **Repository:** [DART repository](https://github.com/Yale-LILY/dart)
- **Paper:** [DART: Open-Domain Structured Data Record to Text Generation](https://arxiv.org/abs/2007.02871)
- **Point of Contact:** {dragomir.radev, r.zhang}@yale.edu, {nazneen.rajani}@salesforce.com !!!NOT SURE

### Dataset and Task Summary

DART is a large and open-domain structured DAta Record to Text generation corpus with high-quality sentence annotations with each input being a set of entity-relation triples following a tree-structured ontology. It consists of 82191 examples across different domains with each input being a semantic RDF triple set derived from data records in tables and the tree ontology of table schema, annotated with sentence description that covers all facts in the triple set.

### Why is this dataset part of GEM?

DART is one of the two datasets representing Table-to-Text NLG in GEM.

### Languages

DART contains English text only (BCP-47: en).

## Meta Information

### Dataset Curators

The dataset was curated by a joint team of researchers from the Yale University, Salesforce Research, the University of Hong Kong, MIT and the University of the Chinese Academy of Sciences.
{dragomir.radev, r.zhang}@yale.edu, {nazneen.rajani}@salesforce.com

### Licensing Information

The dataset was obtained by using multiple complementary methods: (1) human annotation on open-domain Wikipedia tables from WikiTableQuestions ([Pasupat and Liang, 2015](https://www.aclweb.org/anthology/P15-1142.pdf)) and WikiSQL ([Zhong et al., 2017](https://arxiv.org/pdf/1709.00103.pdf)), (2) automatic conversion of questions in WikiSQL to declarative sentences and (3) incorporation of existing datasets including WebNLG 2017 (Gardent et al., 2017[a](https://www.aclweb.org/anthology/P17-1017.pdf),[b](https://www.aclweb.org/anthology/W17-3518.pdf); [Shimorina and Gardent, 2018](https://www.aclweb.org/anthology/W18-6543.pdf)) and Cleaned E2E ([Novikova et al., 2017b](https://arxiv.org/pdf/1706.09254.pdf); Dušek et al., [2018](https://arxiv.org/pdf/1810.01170.pdf), [2019](https://www.aclweb.org/anthology/W19-8652.pdf))

The repository code is under an [MIT license](https://github.com/Yale-LILY/dart/blob/master/LICENSE).

### Citation Information

@article{radev2020dart,
  title={DART: Open-Domain Structured Data Record to Text Generation},
  author={Dragomir Radev and Rui Zhang and Amrit Rau and Abhinand Sivaprasad and Chiachun Hsieh and Nazneen Fatema Rajani and Xiangru Tang and Aadit Vyas and Neha Verma and Pranav Krishna and Yangxiaokang Liu and Nadia Irwanto and Jessica Pan and Faiaz Rahman and Ahmad Zaidi and Murori Mutuma and Yasin Tarabar and Ankit Gupta and Tao Yu and Yi Chern Tan and Xi Victoria Lin and Caiming Xiong and Richard Socher},
  journal={arXiv preprint arXiv:2007.02871},
  year={2020}
}

### Leaderboard

The dataset supports an active leaderboard, the best results are tracked [here](https://github.com/Yale-LILY/dart#leaderboard). Several state-of-the-art table-to-text models were evaluated on DART, such as BART ([Lewis et al., 2020](https://arxiv.org/pdf/1910.13461.pdf)), Seq2Seq-Att ([MELBOURNE](https://webnlg-challenge.loria.fr/files/melbourne_report.pdf)) and End-to-End Transformer ([Castro Ferreira et al., 2019](https://arxiv.org/pdf/1908.09022.pdf)). 
The leaderboard reports BLEU, METEOR, TER, MoverScore, BERTScore and BLEURT scores.

## Dataset Structure

### Data Instances

The DART dataset is available in the data/ directory. The dataset consists of JSON files in data/. Each JSON file contains a list of tripleset-annotation pairs of the form:
 {
    "tripleset": [
      [
        "Ben Mauk",
        "High school",
        "Kenton"
      ],
      [
        "Ben Mauk",
        "College",
        "Wake Forest Cincinnati"
      ]
    ],
    "subtree_was_extended": false,
    "annotations": [
      {
        "source": "WikiTableQuestions_lily",
        "text": "Ben Mauk, who attended Kenton High School, attended Wake Forest Cincinnati for college."
      }
    ]
  }

Creators provided delexicalization dictionaries in data/**/delex/ that map string entities to entity categories.

### Data Fields  

tripleset: a list of tuples, each tuple has 3 items
subtree_was_extended: a boolean variable (true or false)
annotations: a list of dict, each with source and text keys.
source: a string mentioning the name of the source table.
text: a sentence string.

### Data Statistics

|Input Unit | Examples | Vocab Size | Words per SR | Sents per SR | Tables |
| ------------- | ------------- || ------------- || ------------- || ------------- || ------------- |
|Triple Set | 82,191 | 33.2K | 21.6 | 1.5 | 5,623 |

| Train | Dev | Test|
| ------------- | ------------- || ------------- |
| 62,659 | 6,980 | 12,552|


Statistics of DART decomposed by different collection methods. DART exhibits a great deal of topical variety in terms of the number of unique predicates, the number of unique triples, and the vocabulary size. These statistics are computed from DART v1.1.1; the number of unique predicates reported is post-unification (see Section 3.4). SR: Surface Realization.
([details in Table 1 and 2](https://arxiv.org/pdf/2007.02871.pdf)).


## Dataset Creation 

### Curation Rationale

The dataset creators encourage through DART further research in natural language generation from semantic data.
DART provides high-quality sentence annotations with each input being a set of entity-relation triples in a tree structure. 

### Communicative Goal 

The speaker is required to produce coherent sentences and construct a trees structured ontology of the column headers.

### Source Data

The dataset re-uses data from the following pre-existing resources:
(1) human annotation on open-domain Wikipedia tables from WikiTableQuestions ([Pasupat and Liang,
2015](https://www.aclweb.org/anthology/P15-1142.pdf)) and WikiSQL ([Zhong et al., 2017](https://arxiv.org/pdf/1709.00103.pdf))
(2) automatic conversion of questions in
WikiSQL to declarative sentences
(3) incorporation of existing datasets including WebNLG 2017 (Gardent et al., 2017[a](https://www.aclweb.org/anthology/P17-1017.pdf),[b](https://www.aclweb.org/anthology/W17-3518.pdf); [Shimorina and Gardent, 2018](https://www.aclweb.org/anthology/W18-6543.pdf)) and Cleaned E2E ([Novikova et al., 2017b](https://arxiv.org/pdf/1706.09254.pdf); Dušek et al., [2018](https://arxiv.org/pdf/1810.01170.pdf), [2019](https://www.aclweb.org/anthology/W19-8652.pdf))

Creators also explored automatic alignments between the knowledge base and text including Neural Wikipedian ([Vougiouklis et al., 2018](https://arxiv.org/pdf/1711.00155.pdf)) and TRex ([Elsahar et al., 2018](https://www.aclweb.org/anthology/L18-1544.pdf)).

We refer the reader to the papers describing these sources for further information.

#### Initial Data Collection and Normalization

The training data consists of concept sets and captions for the source datasets listed above.
For conversion of a meaning representation (MR) to a triple set, where the NAME slot was represented as the subject.

#### Who are the source language producers?

Human annotations and an automatic conversion procedure.

### Annotations

#### Annotation process

We propose a two-stage annotation process for constructing triple set sentence pairs based on a tree-structured ontology
of each table. First, internal skilled annotators denote the parent column for each column header.
Then, a larger number of annotators provide a sentential description of an automatically-chosen subset of table cells in a row. To form a triple set sentence pair, the highlighted cells can be converted to a connected triple set automatically according to the column ontology for the given table.

#### Who are the annotators?

Internal annotators from the research group ([Figure 7](https://arxiv.org/pdf/2007.02871.pdf)) and Amazon Mechanical Turk (MTurk) workers ([Figure 9](https://arxiv.org/pdf/2007.02871.pdf)).

### Personal and Sensitive Information

[N/A]

## Changes to the Original Dataset for GEM

No changes were made to the original dataset for GEM at the moment of writing this. 
We may, at some future point, introduce additional test set annotation (related to difficulty/challenging-ness) or introduce challenge sets - these are at the moment only tentatively planned.

## Considerations for Using the Data

### Social Impact of the Dataset

The task is presented as a stepping stone towards building models that achieve more human-like text generation. 

### Impact on Underserved Communities

The dataset is in English, a language with an abundance of existing resources.

### Discussion of Biases

The dataset may contain some social biases, as the input sentences are based on Wikipedia. Studies have shown that the English Wikipedia contains gender biases([Dinan et al., 2020](https://www.aclweb.org/anthology/2020.emnlp-main.23.pdf)), racial  biases([Papakyriakopoulos et al., 2020](https://dl.acm.org/doi/pdf/10.1145/3351095.3372843)) and geographical bias([Livingstone et al., 2010](https://doi.org/10.5204/mcj.315)). [More info](https://en.wikipedia.org/wiki/Racial_bias_on_Wikipedia#cite_note-23).


### Other Known Limitations

The end-to-end transformer has the lowest performance since the transformer model needs intermediate pipeline planning steps to have higher performance. Similar findings can be found in [Castro Ferreira et al., 2019](https://arxiv.org/pdf/1908.09022.pdf).

## Getting started with in-depth research on the task

Experimental results on DART shows that BART model as the highest performance among three models with a BLEU score of 37.06. This is attributed to BART’s generalization ability due to pretraining ([Table 4](https://arxiv.org/pdf/2007.02871.pdf)).
