---
title: 'WikiLingua'
type: Summarization
motivation: Large-scale multilingual dataset for evaluating cross-lingual abstractive summarization
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** None (See **Repository**)
- **Repository:** [Wikilingua Repository](https://github.com/esdurmus/Wikilingua)
- **Paper:** [WikiLingua: A New Benchmark Dataset for Cross-Lingual Abstractive Summarization](https://www.aclweb.org/anthology/2020.findings-emnlp.360/)
- **Point of Contact:** {faisal,kathy}@cs.columbia.edu, {ed459}@cornell.edu, {cardie}@cs.cornell.edu

### Dataset and Task Summary

Wikilingua is a large-scale (~770k article-summary pairs), multilingual dataset for the evaluation of cross-lingual abstractive systems. It consists of parallel articles and summaries (article-summary pairs) from WikiHow across 18 languages (i.e. all the languages available on WikiHow). It contains 141,457 unique English articles and each of the other 17 languages has on average, 42, 783 articles that align with an article in English.

### Why is this dataset part of GEM?

This dataset is part of the benchmark for the task of summarization, alongside MLSum and Xsum.

### Languages

Wikilingua contains artcile-summary pairs across 18 languages. The statistics are presented below. Num. parallel corresponds to the number of articles with a parallel article in English.

| Language      | ISO 639-1 | Num Parallel     |
| :---        |    :----:   |          ---: |
| English      | en       | 141,457   |
| Spanish   | es        | 113,215      |
| Portuguese   | pt        | 81,695      |
| French   | fr        | 63,692      |
| German   | de        | 58,375      |
| Russian   | ru        | 52,928      |
| Italian   | it        | 50,968      |
| Indonesian   | id        | 47,511      |
| Dutch   | nl        | 31,270      |
| Arabic   | ar        | 29,229      |
| Chinese   | zh        | 18,887      |
| Vietnamese   | vi        | 19,600      |
| Thai   | th        | 14,770      |
| Japanese   | ja        | 12,669      |
| Korean   | ko        | 12,189      |
| Hindi   | hi        | 9,929      |
| Czech   | cs        | 7,200      |
| Turkish   | tr        | 4,503      |

## Meta Information



### Dataset Curators

This dataset was curated by a team of researchers from Columbia and Cornell Universities.

### Licensing Information

- Article provided by wikiHow <https://www.wikihow.com/Main-Page>, a wiki building the world's largest, highest quality how-to manual. Please edit this article and find author credits at wikiHow.com. Content on wikiHow can be shared under a [Creative Commons license](http://creativecommons.org/licenses/by-nc-sa/3.0/).

- Refer to [this webpage](https://www.wikihow.com/wikiHow:Attribution) for the specific attribution guidelines.

### Citation Information

Please cite the following paper: 

```
@inproceedings{ladhak-wiki-2020,
    title={WikiLingua: A New Benchmark Dataset for Multilingual Abstractive Summarization},
    author={Faisal Ladhak, Esin Durmus, Claire Cardie and Kathleen McKeown},
    booktitle={Findings of EMNLP, 2020},
    year={2020}
}
```

### Leaderboard

This dataset has no corresponding public leaderboard.

## Dataset Structure

### Data Instances

Each language is provided a dictionary, where the key is the url of the corresponding WikiHow article and the value itself is a dictionary. This inner dictionary has section names as the keys and dictionary (with keys 'document' and 'summary') as values. For languages other than English, the inner-most dictionary has additional keys 'english_section_name' and 'english_url' which are the corresponding section name and the url for the corresponding parallel English article.

```
( 'https://www.wikihow.com/Avoid-Drinking-and-Driving',

   {'Designating a Driver': 
   
         {
             'document': "Designating a driver is a very popular tactic to avoid drinking and driving.  It is important to plan in advance, because your brain function will slow down and your decision making skills will be impaired once you start drinking. Decide before you begin drinking that you will not drive.  Figure out who will be getting you home before you leave. Make sure this person is responsible and keep them in your sight while you are drinking.  Have their contact information handy in case you can’t find them when you are ready to leave.  Choose a friend who doesn’t drink alcohol.  You likely have someone in your friend group who doesn’t drink.  This person is the most likely to remain sober. Decide on one person who will remain sober.  You can take turns within your friend group, alternating who will be the designated driver on each occasion.  Be sure that the designated driver actually remains sober.  The person who has drank the least is still not sober. If you don’t have your car with you, you can guarantee that you won’t make the choice to drive it home. If you are drinking at your home.  Give your keys to a responsible friend to ensure that you don't choose to drive somewhere after you have been drinking. It may be tempting to stay longer or leave with someone else.  Stick to the plan you made in advance and only leave with your sober, designated driver.  Keep the phone number of your driver handy in case you can't find them when you are ready to leave. If your designated driver drinks alcohol, find alternate transportation to get home.",
   
             'summary': 'Plan in advance. Assign a designated driver. Leave your car at home. Leave the venue with your designated driver.'
         }
   }
)
```
   
The inner dictionary is named 'article' in the [Huggingface API](https://huggingface.co/datasets/wiki_lingua).

### Data Fields

The article-summary pairs are organized in 'document' and 'summary' fields in the data structure provided above. 

### Data Statistics

Please refer to the Languages section for details on the number of article-summary pairs per language. Below table provides the number of examples in Train/Validation/Test splits per language.

|             | Train | Validation     | Test     |
| :---        |    :----:   |         :---: |          ---: |
| Spanish      | 81,514       | 9,057   | 22,643   |
| Russian   | 38,107        | 4,234      | 10,586      |
| Vietnamese   | 9,473        | 9,473      | 2,632      |
| Turkish   | 3,241        | 360      | 901      |

## Dataset Creation

The authors extracted gold-standard article-summary alignments across languages by aligning the images that are used to describe each how-to step in an article.

### Curation Rationale

The dataset was created in order to enable new approaches for cross-lingual and multilingual summarization, which are currently understudied as well as open up inetersting new directions for research in summarization. E.g., exploration of multi-source cross-lingual architectures, i.e. models that can summarize from multiple source languages into a target language, building models that can summarize articles from any language to any other language for a given set of languages.

### Communicative Goal

The speaker is required to produce high quality summaries of articles.

### Source Data

WikiHow is used as the data source. The articles cover 19 broad categories including health, arts and entertainment, personal care and style, travel, education and communications, etc. The categories covered a broad set of genres and topics.

#### Initial Data Collection and Normalization


#### Who are the source language producers?

The authors did not have access to the demograhics of the writers and editors of the articles.

### Annotations

Any additional annotations are not collected for this dataset.

#### Annotation process


#### Who are the annotators?


### Personal and Sensitive Information

[N/A]

## Changes to the Original Dataset for GEM

None

## Considerations for Using the Data

### Social Impact of the Dataset

### Impact on Underserved Communities

### Discussion of Biases

### Other Known Limitations

## Getting started with in-depth research on the task

Download the dataset using [this link](https://drive.google.com/drive/folders/1PFvXUOsW_KSEzFm5ixB8J8BDB8zRRfHW?usp=sharing). Please refer to this [Collab notebook](https://colab.research.google.com/drive/1HxonmcM7EOQVal2I6oTi9QWEP257BgDP?usp=sharing) to see how to align articles in other languages with the parallel English articles. 

The authors also propose a method for direct cross-lingual summarization by leveraging synthetic data and Neural Machine Translation as a pre-training step. Table 4 and Table 6 in the dataset paper presents the results for this method for automated and human evaluation metrics.
