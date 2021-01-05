
---
title: 'ToTTo'
type:  'Structure-To-Text'
motivation: 'Controlled Table2Text task with non-divergent, annotator-revised text outputs'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:**     None (See **Repository**)
- **Repository:**   [ToTTo Main Repo](https://github.com/google-research-datasets/totto) + [ToTTo Supplementary Repo](https://github.com/google-research/language/tree/master/language/totto)
- **Paper:**     [ToTTo: A Controlled Table-to-Text Generation Dataset](https://arxiv.org/pdf/2004.14373.pdf) 
- **Point of Contact:** [totto@google.com](totto@google.com)

### Dataset and Task Summary

ToTTo is a Table-to-Text NLG task, as the paper title says. The task is as follows: Given a Wikipedia table with row names, column names and table cells, with a subset of cells highlighted, generate a natural language description for the highlighted part of the table . The table need not be exactly rectangular in that - cells can sometimes be multi-row or multi-column.  

An earlier example of a Table-to-Text NLG task is [Wikibio](https://arxiv.org/abs/1603.07771) - here the inputs were Wikipedia infoboxes (from the top right corner of entity-related Wiki pages). In contrast, ToTTo mostly has Wikipedia tables from the main article content itself. In general, Table-To-Text NLG tasks can be seen as a subclass of Data-To-Text NLG tasks - where the task is to generate natural language descriptions of inputs which are in the form of structured or semi-structured data. In general, all Data-To-Text NLG tasks need not have an explicit table or other structure - e.g the input in [WebNLG](https://www.aclweb.org/anthology/W16-6626.pdf) is simply a list of triples.  

Importantly, ToTTo differs from earlier examples of Table-To-Text NLG in that:

1. It does not suffer from the problem of divergent references - where ground truth descriptions themselves have additional information not found in the table. ToTTo overcomes this by having a multi-step annotation process to edit the initial, free-form table descriptions (which are from Wikipedia) to make them faithful, unambiguous and independent of article context.

2. Since it provides **control** in the form of highlighted table cells, it prevents the problem of there being a large number of valid descriptions focussing on different parts of the table.     

### Why is this dataset part of GEM?

ToTTo is one of the two datasets representing Table-to-Text NLG in GEM, the other one being [DART](https://arxiv.org/pdf/2007.02871.pdf). Unlike DART, which combines datasets from multiple sources and furnishes them in a unified setting, ToTTo is from a homogeneous source. As explained in the Task Summary above, it also has an annotation process explicitly crafted to reduce divergent descriptions, which is not true of DART. 

Furthermore, ToTTo is also an instance of a **controlled** generation task - where in addition to the input (in this case the table) an additional **control** (in this case the highlighted cells) is given as an additional goal for the generation. The DART task formulation does not include controls.

### Languages

ToTTo examples are English only (BCP-47: `en`). 
Some amounts of what may be called non-English text, including characters such as French accents or Cyrillic characters, could sometimes occur, especially through fields with entity names as values in the input table cells.   

## Meta Information

### Dataset Curators

This dataset was curated by a team of researchers from Google Research and Georgia Tech.

### Licensing Information

As mentioned in the `README.md` on the [ToTTo Main Repo](https://github.com/google-research-datasets/totto), this dataset is shared under a [Creative Commons Share-Alike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license. 

### Citation Information

    article{parikh2020totto,
      title={ToTTo: A Controlled Table-To-Text Generation Dataset},
      author={Parikh, Ankur P and Wang, Xuezhi and Gehrmann, Sebastian and Faruqui, Manaal and Dhingra, Bhuwan and Yang, Diyi and Das, Dipanjan},
      journal={arXiv preprint arXiv:2004.14373},
      year={2020}

### Leaderboard

This dataset has an associated, active [leaderboard](https://github.com/google-research-datasets/totto#leaderboard) maintained by the authors.
The test set ground truth targets / references are private, i.e they are not publicly shared or downloadable - hence, leaderboard submission is necessary for test set evaluation. 
To evaluate your model on the dev or test set AND/OR submit to the leaderboard, you need to submit your model files through this [form](https://forms.gle/AcF9TRqWrPhPzztt7) (The form provides an option to opt-out of going on the leaderboard).

The leaderboard reports three sets of BLEU, PARENT and BLEURT scores for each submission - on the overall test set, the *Overlap* subset of the test set and the *non-Overlap* subset of the test set. 

## Dataset Structure
Since the original repo `README.md` nicely illustrates the dataset structure, we largely reproduce their examples to explain the dataset structure (with some small modifications). We also link to some images from the paper for the sake of illustration.

### Data Instances

The main repository's `README.md` already provides a thorough walkthrough of data instances and fields [here](https://github.com/google-research-datasets/totto#dataset-description)

Below is the instance for a table from the wiki-page for the musical artist _Weird Al' Yankovic_ , likely listing his on-television appearances.

    {
      "table_page_title": "'Weird Al' Yankovic",
      "table_webpage_url": "https://en.wikipedia.org/wiki/%22Weird_Al%22_Yankovic",
      "table_section_title": "Television",
      "table_section_text": "",
      "table": "[Described below]",
      "highlighted_cells": [[22, 2], [22, 3], [22, 0], [22, 1], [23, 3], [23, 1], [23, 0]],
      "example_id": 12345678912345678912,
      "sentence_annotations": [{"original_sentence": "In 2016, Al appeared in 2 episodes of BoJack Horseman as Mr. Peanutbutter's brother, Captain Peanutbutter, and was hired to voice the lead role in the 2016 Disney XD series Milo Murphy's Law.",
		      "sentence_after_deletion": "In 2016, Al appeared in 2 episodes of BoJack Horseman as Captain Peanutbutter, and was hired to the lead role in the 2016 series Milo Murphy's Law.",
		      "sentence_after_ambiguity": "In 2016, Al appeared in 2 episodes of BoJack Horseman as Captain Peanutbutter, and was hired for the lead role in the 2016 series Milo Murphy's 'Law.",
		      "final_sentence": "In 2016, Al appeared in 2 episodes of BoJack Horseman as Captain Peanutbutter and was hired for the lead role in the 2016 series Milo Murphy's Law."}],
    }

The `table` field is expanded as below:

    [ 
     [   
        {	 
            "column_span": 1,
             "is_header": true,
             "row_span": 1,
             "value": "Year"},
        {    "column_span": 1,
             "is_header": true,
             "row_span": 1,
             "value": "Title"},
        {    "column_span": 1,
             "is_header": true,
             "row_span": 1,
             "value": "Role"},
        {    "column_span": 1,
             "is_header": true,
             "row_span": 1,
             "value": "Notes"}
      ],
      [
        {    "column_span": 1,
             "is_header": false,
             "row_span": 1,
             "value": "1997"},
        {    "column_span": 1,
             "is_header": false,
             "row_span": 1,
             "value": "Eek! The Cat"},
        {    "column_span": 1,
             "is_header": false,
             "row_span": 1,
             "value": "Himself"},
        {    "column_span": 1,
             "is_header": false,
             "row_span": 1,
             "value": "Episode: 'The FugEektive'"}
      ], ...
    ]

The [Supplementary Repo](https://github.com/google-research/language/tree/master/language/totto) also provides browsable samples under its `sample/` folder. It additionally provides HTML visualization scripts with their outputs located under the aforementioned folder. The instructions to access and visualize these samples can also be found [here](https://github.com/google-research/language/tree/master/language/totto#visualizing-sample-data). 

### Data Fields

- The `table` field is a `List[List[Dict]]` in row-major order, with outer lists representing rows and the inner lists columns. 
- Each `Dict` has the fields `column_span: int`, `is_header: bool`, `row_span: int`, and `value: str`.
- Table metadata consists of `table_page_title`, `table_section_title` and `table_section_texts`
- The `highlighted_cells` are represented as `List[[row_index,column_index]]`, with each `[row_index,column_index]` indicating that `table[row_index][column_index]` is highlighted.
- `example_id` is the unique id per example.
- `sentence_annotations[final_sentence]` which is the table description/generation target

### Data Statistics

The dataset consists of 120,000 train examples and equi-sized dev and test sets with 7700 examples.

The dev and test splits are further equally distributed between  _Overlap_ and _non-Overlap_ .
The examples in the _Overlap_ set are harder on account of the domain shift resulting from them having none of their header (row and column) names in common with those seen during training. 

Refer to Table 5 in the paper for a more extensive list of properties about table size, target vocabulary etc and their aggregates.

## Dataset Creation

### Curation Rationale

Tables occurring in Wikipedia articles were chosen as the data source with the following reasons in mind:

1. Wide coverage in terms of both vocabulary and concepts.
2. Wikipedia tables are not confined to a regular structure, with multi-row or multi-column cells occurring with a sufficient frequency.
3. Likely to contain reasonable-quality, natural text descriptions in the proximity of the table, which are also extractable by heuristics. (see the start of Section 4 for the heuristics used)


To prevent an overlap with the earlier [Wikibio](https://arxiv.org/abs/1603.07771)  dataset which focussed on Infobox-first sentence pairs from Wikipedia biography articles, the authors avoid using Infoboxes as a data source.

The overall curation process of initially collecting free text and then annotator-revising it, was designed to combine the advantages of free-form text descriptions (which are fluent, high-quality and unhurriedly written, but also divergent and unfaithful) with annotator descriptions (which can be tailored to be faithful and to conform exactly to desired task requirements)


### Communicative Goal

The speaker is required to produce a single, coherent English sentence that describes the highlighted cells in the given table, also using metadata and any other information from the table as applicable.


### Source Data

#### Initial Data Collection and Normalization

[More Information Needed]

#### Who are the source language producers?

The basic source language producers are Wikipedia authors and/or editors, since the annotation starts with the natural text description near the Wikipedia table.
The auxiliary source language producers are the annotators (two per example) who iteratively revise these descriptions to make them unambiguous and faithful to a subset of highlighted cells in the table.

### Annotations

#### Annotation process

The initial table-description pairs are tables from Wikipedia articles, extracted through heuristics such as Number Matching (tables and sentences that overlap with a non-date number of atleast 3 non-zero digits) (Refer to Section 4 of the paper for more)

1. Table Readability: Tables which are deemed non-readable (due to foreign language, poor formatting etc - a very small fraction of 0.5%) are removed from the dataset here.
2. Cell Highlighting: The annotator highlights the cells of the table which support the description. 
3. Deletion: The annotator removes phrases in the description which are not supported by the highlighted cells
4. Decontextualization: Descriptions may contain pronouns or other forms of anaphora, or other phenomena which depend on the overall article topic - these are fixed by replacement (e.g replacing pronouns with the entity, provided it occurs in the table). The replacements allowed are limited to one, and annotators are also instructed to conserve fluency.
5. Secondary Annotation: A second set of annotators is shown the output of Stage 4, and asked to fix it if required to ensure it is grammatical.

#### Who are the annotators?
The paper does not specifically describe the annotation platform or location profiles of the annotators. 

### Personal and Sensitive Information

Neither the dataset as published or the annotation process involves the collection or sharing of any kind of personal / demographic information.

## Changes to the Original Dataset for GEM

No changes were made to the original dataset for GEM at the moment of writing this. 
We may, at some future point, introduce additional test set annotation (related to difficulty/challenging-ness) or introduce challenge sets - these are at the moment only tentatively planned.

## Considerations for Using the Data

### Social Impact of the Dataset
We do not foresee any negative social impact in particular from this dataset or task.

### Impact on Underserved Communities

This dataset is in English, which is a high-resource language.

### Discussion of Biases

This dataset is created using tables and the table cell contents may hence naturally exhibit biases which have been found to exist in Wikipedia such as some forms of gender bias (e.g [(Graells-Garido et al.,2015)](https://labtomarket.files.wordpress.com/2018/01/wiki_gender_bias.pdf) notes that spouse information is more likely discussed for females than males) 

The table descriptions (targets/references) are, as discussed earlier, collected through a two-step process.
1. The natural text description near the table is taken as a starting point. This is Wikipedia article text as created upto that point in time by a chain of collaborative edits from Wikipedia authors.
2. The initial description is revised by chain of two or more annotated revisions, to make it unambiguous and faithful to a set of highlighted table cells.

From their origin in 1), the descriptions may exhibit biases seen in Wikipedia text as mentioned above. From their revisions in 2), the descriptions may show biases originating from annotator-authored text, such as a preference for shorter descriptions since they're faster to write, or linguistic preferences influenced by the locations dominant in the annotator distribution.  (However, note that these are likely to be much reduced since the annotators here are merely revising rather than completely authoring. Moreover, each sentence goes through atleast two annotators, which acts as a check against the personal biases of a single annotator.)

Naturally-occurring text is also known to suffer from other biases such as reporting bias [(Gordon and Van Durme, 2013)](https://openreview.net/forum?id=AzxEzvpdE3Wcy&noteId=vmR8qaby8fqxittps://labtomarket.files.wordpress.com/2018/01/wiki_gender_bias.pdf) - this also applies to this dataset via its origin from Wikipedia.


### Other Known Limitations

The dataset is limited to topics that are present in Wikipedia, more specifically those topics that are present in articles which contain atleast one table
_Sports_ and _Countries_ form 53.4% of the dataset. The remaining fraction is made up of broader topics like _Europe_, *North America*and _Politics_ 

## Getting started with in-depth research on the task

- The highest spot on the leaderboard is currently held by an anonymous method, with BLEU=49.2, PARENT=58.7 and BLEURT=0.249 on the _Overall_ test set.
- The **highest scoring non-anonymous** method is the T5-based method of [Kale, 2020](https://arxiv.org/abs/2005.10433). This method uses a simple row-major linearization scheme to convert the table (it chooses only the highlighted cells and ignores the other cells - table titles and section titles are prefixed at the start of the respective section table) to a flat string. The linearized input - output description pairs from training examples are then used to finetune T5, with BLEU being used as the dev metric to pick checkpoints, and beam search with beam size 10 being the decoding method.

    Though the best numbers from this method are naturally from the largest T5-pretrained architecture (T5-3B), the paper shows improvements over the next-highest BERT-to-BERT method even when using T5-Base or T5-Small, which have the same and lesser parameters than BERT-to-BERT respectively. 

- The [Supplementary Repo](https://github.com/google-research/language/tree/master/language/totto) provides several useful modules to get started with for new approach implementation:

    1. Code for the particular preprocessing / linearization scheme used to linearize the tables into flat sequences for the baseline approaches described in the paper has been described and shared [herein](https://github.com/google-research/language/tree/master/language/totto#baseline-preprocessing) 

    2. An [evaluation script](https://github.com/google-research/language/tree/master/language/totto#running-the-evaluation-scripts-locally) for locally scoring BLEU and PARENT system outputs on dev (or train) sets. Since BLEURT is a model-based metric, a [slightly separate](https://github.com/google-research/language/tree/master/language/totto#running-the-evaluation-scripts-locall://github.com/google-research/language/tree/master/language/totto#computing-the-bleurt-score) set of instructions is provided to evaluate on the same.
