---
title: 'ASSET'
type: simplification
---

# Dataset Card for ASSET

## Dataset Description

ASSET is multi-reference dataset for the evaluation of sentence simplification in English. The dataset uses the same 2,359 sentences from [TurkCorpus]( https://github.com/cocoxu/simplification/) [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf) and each sentence is associated with 10 crowdsourced simplifications. Unlike previous simplification datasets, which contain a single transformation (e.g., lexical paraphrasing in TurkCorpus or sentence
splitting in [HSplit](https://www.aclweb.org/anthology/D18-1081.pdf)), the simplifications in ASSET encompass a variety of rewriting transformations.

**Data set developer(s):**

ASSET was developed by researchers at the University of Sheffield, Inria, 
Facebook AI Research, and Imperial College London. The work was partly supported by Benoît Sagot's chair in the PRAIRIE institute, funded by the French National Research Agency (ANR) as part of the "Investissements d’avenir" program (reference ANR-19-P3IA-0001).

**Dataset license:**
[Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)

**Dataset availability:**
https://github.com/facebookresearch/asset,
https://www.aclweb.org/anthology/attachments/2020.acl-main.424.Dataset.zip

**Citation:**

```bibtex
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

## Curation Rationale 

ASSET was created in order to improve the evaluation of sentence simplification. It uses the same input sentences as the [TurkCorpus]( https://github.com/cocoxu/simplification/) dataset from [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf). The 2,359 input sentences of TurkCorpus are a sample of "standard" (not simple) sentences from the [Parallel Wikipedia Simplification (PWKP)](https://www.informatik.tu-darmstadt.de/ukp/research_6/data/sentence_simplification/simple_complex_sentence_pairs/index.en.jsp) dataset [(Zhu et al., 2010)](https://www.aclweb.org/anthology/C10-1152.pdf), which come from the August 22, 2009 version of Wikipedia. The sentences of TurkCorpus were chosen to be of similar length [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf). No further information is provided on the sampling strategy.

The TurkCorpus dataset was developed in order to overcome some of the problems with sentence pairs from Standard and Simple Wikipedia: a large fraction of sentences were misaligned, or not actually simpler [(Xu et al., 2016)](https://www.aclweb.org/anthology/Q16-1029.pdf). However, TurkCorpus mainly focused on *lexical paraphrasing*, and so cannot be used to evaluate simplifications involving *compression* (deletion) or *sentence splitting*. HSplit [(Sulem et al., 2018)](https://www.aclweb.org/anthology/D18-1081.pdf), on the other hand, can only be used to evaluate sentence splitting. The reference sentences in ASSET include a wider variety of sentence rewriting strategies, combining splitting, compression and paraphrasing. Annotators were given examples of each kind of transformation individually, as well as all three transformations used at once, but were allowed to decide which transformations to use for any given sentence.

An example illustrating the differences between TurkCorpus, HSplit and ASSET is given below:

> **Original:** He settled in London, devoting himself chiefly to practical teaching.
>
> **TurkCorpus:** He rooted in London, devoting himself mainly to practical teaching.
>
> **HSplit:** He settled in London. He devoted himself chiefly to practical teaching.
>
> **ASSET:** He lived in London. He was a teacher.

The instructions given to the annotators are available [here](https://github.com/facebookresearch/asset/blob/master/crowdsourcing/AMT_AnnotationInstructions.pdf).


## Data Characteristics

#### Data split

ASSET does not contain a training set; many models use [WikiLarge](https://github.com/XingxingZhang/dress) (Zhang and Lapata, 2017) for training.

Each input sentence has 10 associated reference simplified sentences. The statistics of ASSET are given below.

|                            | Dev    | Test | Total |
| -----                      | ------ | ---- | ----- |
| Input Sentences            | 2000   | 359  | 2359  |
| Reference Simplifications  | 20000  | 3590 | 23590 |

The test and validation sets are the same as those of TurkCorpus. The split was random.

#### Personal and sensitive information

The dataset does not identify any subpopulations, and does not contain any sensitive personal information.

#### Other statistics

There are 19.04 tokens per reference on average (lower than 21.29 and 25.49 for TurkCorpus and HSplit, respectively). Most (17,245) of the referece sentences do not involve sentence splitting.

## Language Variety and Speaker/Annotator Demographic

#### Language variety

* BCP-47 language tag:
    - input sentences: en
    - reference sentences: en-US, en-GB, en-CA 
* Language variety description: English. Annotators of reference sentences were required to be residents of the United States, United Kingdom or Canada.

#### Input sentences

The input sentences are from English Wikipedia (August 22, 2009 version). No demographic information is available for the writers of these sentences. However, most Wikipedia editors are male (Lam, 2011; Graells-Garrido, 2015), which has an impact on the topics covered (see also [the Wikipedia page on Wikipedia gender bias](https://en.wikipedia.org/wiki/Gender_bias_on_Wikipedia)). In addition, Wikipedia editors are mostly white, young, and from the Northern Hemisphere [(Wikipedia: Systemic bias)](https://en.wikipedia.org/wiki/Wikipedia:Systemic_bias).


#### Reference sentences

Reference sentences were written by 42 workers on Amazon Mechanical Turk (AMT). The requirements for being an annotator were:
- Passing a Qualification Test (appropriately simplifying sentences). Out of 100 workers, 42 passed the test.
- Being a resident of the United States, United Kingdom or Canada.
- Having a HIT approval rate over 95%, and over 1000 HITs approved.

No other demographic or compensation information is provided in the ASSET paper.

## Possible Biases

The dataset may contain some social biases, as the input sentences are based on Wikipedia. Studies have shown that the English Wikipedia contains both gender biases (Schmahl et al., 2020) and racial  biases (Adams et al., 2019).

## See also

For a selection of papers and systems that have evaluated sentence simplification on a variety of datasets (including TurkCorpus and PWKP), see:
http://nlpprogress.com/english/simplification.html

## References

Adams, Julia, Hannah Brückner, and Cambria Naslund. "Who Counts as a Notable Sociologist on Wikipedia? Gender, Race, and the “Professor Test”." Socius 5 (2019): 2378023118823946.

Alva-Manchego, Fernando, et al. "ASSET: A Dataset for Tuning and Evaluation of Sentence Simplification Models with Multiple Rewriting Transformations." In Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics, pages 4668–4679, Online.

Graells-Garrido, Eduardo, Mounia Lalmas, and Filippo Menczer. "First women, second sex: Gender bias in Wikipedia." Proceedings of the 26th ACM Conference on Hypertext & Social Media. 2015.

Lam, Shyong (Tony) K., et al. "WP: clubhouse? An exploration of Wikipedia's gender imbalance." Proceedings of the 7th international symposium on Wikis and open collaboration. 2011.

Schmahl, Katja Geertruida, et al. "Is Wikipedia succeeding in reducing gender bias? Assessing changes in gender bias in Wikipedia using word embeddings." Proceedings of the Fourth Workshop on Natural Language Processing and Computational Social Science. 2020.

Sulem, Elior, Omri Abend, and Ari Rappoport. "BLEU is Not Suitable for the Evaluation of Text Simplification." Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing. 2018.

Xu, Wei, et al. "Optimizing statistical machine translation for text simplification." Transactions of the Association for Computational Linguistics 4 (2016): 401-415.

Zhang, Xingxing, and Mirella Lapata. "Sentence Simplification with Deep Reinforcement Learning." Proceedings of the 2017 Conference on Empirical Methods in Natural Language Processing. 2017.

Zhu, Zhemin, Delphine Bernhard, and Iryna Gurevych. "A monolingual tree-based translation model for sentence simplification." Proceedings of the 23rd International Conference on Computational Linguistics (Coling 2010). 2010.

