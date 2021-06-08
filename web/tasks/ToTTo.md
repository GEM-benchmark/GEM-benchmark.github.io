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

### Special test sets

9 challenge sets for ToTTo were added to the GEM evaluation suite, 8 created specifically for the task and 1 coming from the original data.

#### Data shift

We created subsets of the training and development sets of 500 randomly selected inputs each.

#### Transformations
We applied input scrambling on a subset of 500 randomly selected test instances; the order of the highlighted cells was randomly reassigned.

#### Subpopulations
For the input size, we created subpopulations based on the number of input highlighted cells in the whole table.

| Input length  | Frequency English |
|---------------|-------------------|
| 1             |               898 |
| 2             |              1850 |
| 3             |              2221 |
| 4             |              1369 |
| 5             |               483 |
| 6             |               379 |
| 7             |               124 |
| 8             |               128 |
| 9             |                61 |
| 10            |                40 |
| 11            |                20 |
| 12            |                26 |
| 13            |                10 |
| 14            |                14 |
| 15            |                14 |
| 16            |                 7 |
| 17            |                 6 |
| 18            |                 5 |
| 19            |                 5 |
| 20            |                 5 |
| 21            |                 4 |
| 22            |                 1 |
| 23            |                 2 |
| 24            |                 4 |
| 25            |                 1 |
| 27            |                 2 |
| 28            |                 2 |
| 32            |                 1 |
| 33            |                 1 |
| 34            |                 1 |
| 35            |                 2 |
| 38            |                 1 |
| 40            |                 1 |
| 41            |                 1 |
| 42            |                 1 |
| 52            |                 1 |
| 60            |                 2 |
| 75            |                 1 |
| 100           |                 1 |
| 123           |                 1 |
| 125           |                 1 |
| 127           |                 1 |
| 133           |                 1 |
| 496           |                 1 |

We also divided the test set according to the size of the whole table, based on the idea that larger tables represent a bigger space to take into account when generating the highlighted cells; a larger table could be more challenging to generate accurate text than a smaller table. There are 693 different table sizes, ranging from 2 to 15834 cells.

| Table size      |Frequency English|
|-----------------|-----------------|
| 2               |             71  |
| 3               |             52  |
| 4               |             36  |
| 5               |             41  |
| 6               |            144  |
| 7               |             47  |
| 8               |             59  |
| 9               |            105  |
| 10              |            162  |
| 11              |             36  |
| 12              |            158  |
| 13              |             35  |
| 14              |             79  |
| 15              |            136  |
| 16              |            111  |
| 17              |             48  |
| 18              |            123  |
| 19              |             29  |
| 20              |            112  |
| 21              |             91  |
| 22              |             17  |
| 23              |              7  |
| 24              |            169  |
| 25              |             56  |
| 26              |             12  |
| 27              |             40  |
| 28              |             77  |
| 29              |              7  |
| 30              |            122  |
| 31              |              4  |
| 32              |             49  |
| 33              |             21  |
| 34              |              7  |
| 35              |            103  |
| 36              |            131  |
| 37              |             10  |
| 38              |              6  |
| 39              |             26  |
| 40              |            110  |
| 41              |              1  |
| 42              |             54  |
| 43              |              6  |
| 44              |             47  |
| 45              |             79  |
| 46              |              4  |
| 47              |              2  |
| 48              |            114  |
| 49              |             18  |
| 50              |             55  |
| 51              |             11  |
| 52              |             43  |
| 54              |             80  |
| 55              |             73  |
| 56              |             64  |
| 57              |             12  |
| 58              |              1  |
| 60              |            114  |
| 61              |              4  |
| 63              |             39  |
| 64              |             36  |
| 65              |             62  |
| 66              |             48  |
| 67              |              1  |
| 68              |             36  |
| 69              |              6  |
| 70              |             81  |
| 72              |             76  |
| 73              |              1  |
| 74              |              1  |
| 75              |             44  |
| 76              |             33  |
| 77              |             30  |
| 78              |             66  |
| 79              |              1  |
| 80              |             83  |
| 81              |             12  |
| 82              |              1  |
| 84              |             80  |
| 85              |             25  |
| 86              |              1  |
| 87              |              3  |
| 88              |             35  |
| 90              |             78  |
| 91              |             18  |
| 92              |             22  |
| 93              |              5  |
| 94              |              2  |
| 95              |             31  |
| 96              |             50  |
| 98              |             11  |
| 99              |             14  |
| 100             |             48  |
| 102             |             24  |
| 104             |             29  |
| 105             |             36  |
| 106             |              2  |
| 108             |             51  |
| 110             |             31  |
| 111             |              1  |
| 112             |             47  |
| 114             |             28  |
| 115             |             20  |
| 116             |             17  |
| 117             |              8  |
| 119             |              7  |
| 120             |             75  |
| 121             |              4  |
| 123             |              4  |
| 124             |             14  |
| 125             |              6  |
| 126             |             57  |
| 127             |              1  |
| 128             |             20  |
| 130             |             31  |
| 132             |             43  |
| 133             |             11  |
| 134             |              1  |
| 135             |             23  |
| 136             |             23  |
| 138             |             19  |
| 140             |             42  |
| 141             |              5  |
| 143             |             10  |
| 144             |             46  |
| 145             |             17  |
| 146             |              1  |
| 147             |             17  |
| 148             |             10  |
| 150             |             37  |
| 152             |             24  |
| 153             |             11  |
| 154             |             17  |
| 155             |             17  |
| 156             |             32  |
| 159             |              2  |
| 160             |             29  |
| 161             |              9  |
| 162             |             26  |
| 164             |             12  |
| 165             |             19  |
| 168             |             44  |
| 169             |              3  |
| 170             |             15  |
| 171             |              6  |
| 172             |             10  |
| 174             |             11  |
| 175             |             21  |
| 176             |             23  |
| 177             |              3  |
| 180             |             42  |
| 182             |             14  |
| 183             |              1  |
| 184             |             18  |
| 185             |              8  |
| 186             |             14  |
| 187             |              1  |
| 188             |              3  |
| 189             |             18  |
| 190             |             13  |
| 192             |             31  |
| 194             |              1  |
| 195             |             15  |
| 196             |             18  |
| 198             |             18  |
| 200             |             25  |
| 203             |              5  |
| 204             |             12  |
| 205             |             12  |
| 207             |              3  |
| 208             |             23  |
| 209             |              1  |
| 210             |             31  |
| 212             |             15  |
| 215             |              6  |
| 216             |             35  |
| 217             |              3  |
| 219             |              2  |
| 220             |             16  |
| 221             |              5  |
| 222             |             11  |
| 224             |             18  |
| 225             |             17  |
| 228             |             11  |
| 230             |             10  |
| 231             |             16  |
| 232             |              9  |
| 234             |             14  |
| 235             |              7  |
| 238             |             31  |
| 243             |              2  |
| 244             |              6  |
| 245             |             20  |
| 246             |              5  |
| 247             |              4  |
| 248             |              8  |
| 250             |             16  |
| 252             |             19  |
| 253             |              2  |
| 255             |              6  |
| 256             |             10  |
| 258             |              9  |
| 259             |              5  |
| 260             |             22  |
| 261             |              2  |
| 264             |              6  |
| 265             |              6  |
| 266             |              8  |
| 268             |              5  |
| 270             |             31  |
| 272             |              7  |
| 273             |             14  |
| 275             |              8  |
| 276             |             18  |
| 279             |              2  |
| 280             |             25  |
| 282             |              1  |
| 284             |              1  |
| 285             |              7  |
| 286             |              4  |
| 287             |              4  |
| 288             |             12  |
| 289             |              1  |
| 290             |             13  |
| 291             |              1  |
| 292             |              2  |
| 294             |              8  |
| 295             |             11  |
| 296             |              7  |
| 297             |              2  |
| 299             |              1  |
| 300             |             29  |
| 301             |              2  |
| 302             |              1  |
| 304             |              6  |
| 305             |              1  |
| 306             |             12  |
| 308             |              8  |
| 309             |              1  |
| 310             |             14  |
| 312             |             14  |
| 315             |             13  |
| 318             |              5  |
| 320             |             14  |
| 322             |              2  |
| 324             |             11  |
| 325             |              5  |
| 328             |              6  |
| 329             |              6  |
| 330             |              7  |
| 332             |              1  |
| 333             |              1  |
| 335             |              4  |
| 336             |             17  |
| 339             |              1  |
| 340             |              8  |
| 342             |              5  |
| 343             |              6  |
| 344             |              7  |
| 345             |              8  |
| 348             |              3  |
| 350             |              7  |
| 351             |              1  |
| 352             |              2  |
| 354             |              1  |
| 355             |              4  |
| 357             |              8  |
| 360             |             20  |
| 364             |              4  |
| 365             |              3  |
| 366             |              3  |
| 368             |              7  |
| 369             |              4  |
| 370             |              7  |
| 371             |              1  |
| 372             |              3  |
| 375             |              8  |
| 376             |              8  |
| 378             |              7  |
| 380             |              8  |
| 382             |              1  |
| 384             |              9  |
| 385             |              2  |
| 387             |              4  |
| 390             |              8  |
| 392             |             13  |
| 395             |              1  |
| 396             |              8  |
| 399             |              1  |
| 400             |             10  |
| 402             |              3  |
| 403             |              2  |
| 404             |              2  |
| 405             |              1  |
| 406             |              3  |
| 407             |              1  |
| 408             |             15  |
| 410             |             10  |
| 413             |              1  |
| 414             |              2  |
| 416             |              3  |
| 420             |             11  |
| 423             |              2  |
| 424             |              4  |
| 425             |              1  |
| 426             |              3  |
| 427             |              3  |
| 428             |              1  |
| 429             |              3  |
| 430             |              8  |
| 432             |              5  |
| 434             |              2  |
| 435             |              4  |
| 436             |              1  |
| 438             |              1  |
| 440             |              8  |
| 441             |              3  |
| 442             |              1  |
| 445             |              2  |
| 448             |              4  |
| 450             |              4  |
| 452             |              1  |
| 455             |              2  |
| 456             |              2  |
| 459             |              2  |
| 460             |              4  |
| 462             |              4  |
| 464             |              1  |
| 465             |              2  |
| 468             |              6  |
| 469             |              3  |
| 472             |              1  |
| 473             |              1  |
| 474             |              2  |
| 475             |              7  |
| 476             |              2  |
| 477             |              2  |
| 480             |             10  |
| 483             |              3  |
| 485             |              1  |
| 486             |              4  |
| 488             |              1  |
| 490             |              5  |
| 492             |              3  |
| 495             |              4  |
| 496             |              3  |
| 498             |              1  |
| 500             |              2  |
| 504             |              5  |
| 505             |              5  |
| 510             |              2  |
| 512             |              1  |
| 513             |              1  |
| 515             |              3  |
| 516             |              4  |
| 519             |              1  |
| 520             |              7  |
| 522             |              1  |
| 524             |              1  |
| 525             |              1  |
| 528             |              2  |
| 529             |              1  |
| 530             |              5  |
| 531             |              1  |
| 532             |              3  |
| 534             |              3  |
| 535             |              1  |
| 536             |              3  |
| 539             |              1  |
| 540             |              5  |
| 543             |              1  |
| 544             |              1  |
| 545             |              2  |
| 549             |              2  |
| 550             |              2  |
| 552             |              3  |
| 553             |              3  |
| 555             |              1  |
| 560             |              3  |
| 561             |              1  |
| 564             |              2  |
| 567             |              2  |
| 570             |              1  |
| 574             |              1  |
| 575             |              1  |
| 576             |              3  |
| 580             |              5  |
| 581             |              1  |
| 582             |              4  |
| 584             |              1  |
| 585             |              6  |
| 588             |              1  |
| 590             |              3  |
| 592             |              1  |
| 594             |              2  |
| 595             |              2  |
| 600             |              3  |
| 603             |              1  |
| 604             |              1  |
| 605             |              1  |
| 606             |              4  |
| 608             |              2  |
| 609             |              1  |
| 610             |              1  |
| 612             |              3  |
| 615             |              3  |
| 616             |              4  |
| 618             |              3  |
| 620             |              1  |
| 621             |              1  |
| 623             |              1  |
| 624             |              4  |
| 625             |              1  |
| 627             |              1  |
| 630             |              4  |
| 632             |              1  |
| 635             |              1  |
| 636             |              1  |
| 637             |              1  |
| 640             |              4  |
| 642             |              3  |
| 644             |              2  |
| 645             |              1  |
| 648             |              1  |
| 650             |              1  |
| 651             |              1  |
| 654             |              1  |
| 656             |              1  |
| 657             |              2  |
| 660             |              3  |
| 663             |              3  |
| 665             |              1  |
| 667             |              1  |
| 670             |              1  |
| 672             |              2  |
| 675             |              1  |
| 678             |              1  |
| 680             |              2  |
| 682             |              1  |
| 684             |              6  |
| 686             |              1  |
| 693             |              1  |
| 695             |              2  |
| 696             |              3  |
| 700             |              2  |
| 702             |              1  |
| 705             |              1  |
| 707             |              1  |
| 708             |              3  |
| 720             |              4  |
| 721             |              2  |
| 726             |              3  |
| 728             |              2  |
| 735             |              1  |
| 736             |              2  |
| 740             |              1  |
| 742             |              1  |
| 748             |              2  |
| 749             |              1  |
| 752             |              1  |
| 755             |              2  |
| 756             |              1  |
| 760             |              4  |
| 764             |              1  |
| 765             |              1  |
| 770             |              1  |
| 774             |              2  |
| 780             |              1  |
| 785             |              2  |
| 791             |              1  |
| 792             |              2  |
| 795             |              1  |
| 798             |              3  |
| 800             |              3  |
| 805             |              1  |
| 808             |              1  |
| 810             |              2  |
| 812             |              1  |
| 815             |              2  |
| 816             |              5  |
| 822             |              2  |
| 828             |              2  |
| 830             |              1  |
| 833             |              1  |
| 834             |              1  |
| 840             |              5  |
| 845             |              1  |
| 849             |              1  |
| 852             |              1  |
| 854             |              3  |
| 855             |              1  |
| 856             |              1  |
| 858             |              1  |
| 860             |              1  |
| 864             |              1  |
| 868             |              2  |
| 873             |              1  |
| 876             |              1  |
| 882             |              2  |
| 888             |              4  |
| 889             |              1  |
| 890             |              1  |
| 895             |              2  |
| 896             |              8  |
| 900             |              2  |
| 903             |              1  |
| 909             |              3  |
| 910             |              2  |
| 912             |              4  |
| 915             |              3  |
| 918             |              1  |
| 920             |              3  |
| 924             |              1  |
| 925             |              1  |
| 931             |              1  |
| 936             |              2  |
| 938             |              1  |
| 940             |              1  |
| 945             |              2  |
| 952             |              1  |
| 960             |              4  |
| 966             |              1  |
| 968             |              1  |
| 972             |              1  |
| 976             |              1  |
| 980             |              1  |
| 990             |              2  |
| 1000            |              1  |
| 1005            |              1  |
| 1010            |              1  |
| 1014            |              1  |
| 1015            |              2  |
| 1020            |              2  |
| 1022            |              1  |
| 1032            |              1  |
| 1036            |              2  |
| 1043            |              1  |
| 1050            |              1  |
| 1055            |              1  |
| 1056            |              1  |
| 1072            |              2  |
| 1080            |              1  |
| 1098            |              1  |
| 1100            |              2  |
| 1113            |              1  |
| 1122            |              1  |
| 1128            |              1  |
| 1135            |              1  |
| 1140            |              1  |
| 1141            |              1  |
| 1152            |              1  |
| 1155            |              1  |
| 1164            |              2  |
| 1165            |              1  |
| 1168            |              1  |
| 1170            |              1  |
| 1172            |              1  |
| 1174            |              2  |
| 1176            |              2  |
| 1180            |              2  |
| 1182            |              1  |
| 1188            |              1  |
| 1194            |              1  |
| 1206            |              2  |
| 1210            |              1  |
| 1216            |              1  |
| 1260            |              2  |
| 1272            |              1  |
| 1296            |              1  |
| 1302            |              1  |
| 1304            |              1  |
| 1310            |              1  |
| 1315            |              1  |
| 1320            |              1  |
| 1330            |              2  |
| 1359            |              1  |
| 1379            |              1  |
| 1384            |              1  |
| 1400            |              1  |
| 1408            |              1  |
| 1428            |              1  |
| 1441            |              3  |
| 1446            |              1  |
| 1470            |              4  |
| 1503            |              1  |
| 1552            |              1  |
| 1560            |              2  |
| 1573            |              1  |
| 1582            |              2  |
| 1638            |              1  |
| 1640            |              1  |
| 1656            |              1  |
| 1680            |              1  |
| 1683            |              1  |
| 1685            |              1  |
| 1688            |              1  |
| 1692            |              2  |
| 1700            |              1  |
| 1730            |              3  |
| 1770            |              1  |
| 1773            |              1  |
| 1782            |              1  |
| 1788            |              1  |
| 1792            |              1  |
| 1800            |              2  |
| 1809            |              1  |
| 1820            |              1  |
| 1824            |              1  |
| 1836            |              1  |
| 1840            |              1  |
| 1878            |              2  |
| 1890            |              1  |
| 1908            |              1  |
| 1914            |              1  |
| 1926            |              1  |
| 1928            |              1  |
| 1936            |              2  |
| 1969            |              1  |
| 1974            |              2  |
| 1980            |              1  |
| 2040            |              2  |
| 2080            |              1  |
| 2104            |              1  |
| 2112            |              1  |
| 2123            |              1  |
| 2148            |              1  |
| 2205            |              1  |
| 2232            |              1  |
| 2233            |              1  |
| 2247            |              3  |
| 2248            |              1  |
| 2260            |              1  |
| 2262            |              1  |
| 2280            |              1  |
| 2282            |              1  |
| 2290            |              1  |
| 2304            |              2  |
| 2313            |              2  |
| 2385            |              1  |
| 2392            |              3  |
| 2400            |              1  |
| 2422            |              1  |
| 2490            |              1  |
| 2640            |              1  |
| 2667            |              2  |
| 2681            |              1  |
| 2682            |              1  |
| 2718            |              1  |
| 2884            |              1  |
| 2940            |              2  |
| 2960            |              1  |
| 2976            |              1  |
| 3000            |              1  |
| 3008            |              1  |
| 3016            |              1  |
| 3047            |              2  |
| 3141            |              1  |
| 3204            |              1  |
| 3222            |              1  |
| 3432            |              1  |
| 3479            |              1  |
| 3492            |              1  |
| 3540            |              1  |
| 3546            |              1  |
| 3591            |              1  |
| 3612            |              1  |
| 3720            |              2  |
| 3908            |              1  |
| 3944            |              1  |
| 4050            |              1  |
| 4060            |              2  |
| 4320            |              2  |
| 4340            |              1  |
| 4352            |              1  |
| 5082            |              1  |
| 5094            |              1  |
| 5166            |              1  |
| 5360            |              1  |
| 5418            |              1  |
| 5455            |              1  |
| 5538            |              1  |
| 5550            |              1  |
| 5656            |              2  |
| 6225            |              1  |
| 6643            |              1  |
| 8082            |              1  |
| 8822            |              2  |
| 8946            |              1  |
| 10500           |              1  |
| 13590           |              2  |
| 14710           |              1  |
| 15144           |              1  |
| 15834           |              1  |

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
