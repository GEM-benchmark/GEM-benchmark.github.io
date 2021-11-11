---
title: 'Writing a data card'
type: Data
background: This guide describes how to fill each section in the data card (GEMv1 version).
---


## Table of Contents

## Dataset and Task Description

* **Homepage:** [Add homepage URL here if available (unless it's a GitHub repository)](#dataset-description)
* **Repository:** [If the dataset is hosted on github or has a github homepage, add URL here](#dataset-description)
* **Paper:** [If the dataset was introduced by a paper or there was a paper written describing the dataset, add URL here (landing page for Arxiv paper preferred)](#dataset-description)
* **Point of Contact:** [If known, name and email of at least one person the reader can contact for questions about the dataset.](#dataset-description)

### Dataset and Task Summary

Briefly describe the task that is captured within this dataset (e.g., *description of a restaurant from a structured representation of its attributes*). Give an overview of how and why the dataset was created and how it differs from other datasets that capture the task. The summary should explicitly mention the languages present in the dataset (possibly in broad terms, e.g., *translations between several pairs of European languages*), and describe the domain(s), topic(s), or genre(s) covered.

### Why is this dataset part of GEM?

In 1-2 sentences, describe how this dataset can contribute to GEM's goals and how it stands out from other datasets we chose. In the template, add this answer to the `motivation` tag at the top which will render it as part of the overview page.

### Languages

Provide a brief overview of the languages represented in the dataset. Describe relevant details about specifics of the language such as whether it is social media text, African American English, ...

If possible, please provide [BCP-47 codes](https://tools.ietf.org/html/bcp47), which consist of a [primary language subtag](https://tools.ietf.org/html/bcp47#section-2.2.1), with a [script subtag](https://tools.ietf.org/html/bcp47#section-2.2.3) and/or [region subtag](https://tools.ietf.org/html/bcp47#section-2.2.4) if available.

## Meta Information

### Dataset Curators

List the people involved in collecting the dataset and their affiliation(s). If funding information is known, include it here.

### Licensing Information

Provide the license and link to the license webpage if available.

### Citation Information

Provide the [BibTex](http://www.bibtex.org/)-formatted reference for the dataset. For example:

```
@article{article_id,
  author    = {Author List},
  title     = {Dataset Paper Title},
  journal   = {Publication Venue},
  year      = {2525}
}
```

If the dataset has a [DOI](https://www.doi.org/), please provide it here.

### Leaderboard

If the dataset supports an active leaderboard, add a link here and describe how models are evaluated.

## Dataset Structure

### Data Instances

Provide an JSON-formatted example and brief description of a typical instance in the dataset. If available, provide a link to further examples.

```
{
  'example_field': ...,
  ...
}
```

Provide any additional information that is not covered in the other sections about the data here. In particular describe any relationships between data points and if these relationships are made explicit.

### Data Fields

List and describe the fields present in the dataset. Mention their data type, and whether and how they are used as part of the generation pipeline. Describe each fields' attributes, such as whether they are at the character level or word level, whether they are contiguous or not, etc. If the datasets contains example IDs, state whether they have an inherent meaning, such as a mapping to other datasets or pointing to relationships between data points.

* `example_field`: description of `example_field`

### Data Statistics

Describe and name the splits in the dataset if there are more than one.

Describe any criteria for splitting the data, if used. If there are differences between the splits (e.g., if the training annotations are machine-generated and the dev and test ones are created by humans, or if different numbers of annotators contributed to each example), describe them here.

Provide the sizes of each split. As appropriate, provide any descriptive statistics for the features, such as average lengths of input and output.  For example:

|                    | Train         | Valid     | Test        |
|--------------------|-------        |-------    |------       |
| # Input Sentences  |   125         |   55      |   10        |
| Avg. Input Length  |   10 words    |  5 words  |   5 words   |
| Avg. Output Length |   3 words     |   5 words |   4.6 words |

## Dataset Creation

### Curation Rationale

What need motivated the creation of this dataset? What are some of the reasons underlying the major choices involved in putting it together?

### Communicative Goal

What is the goal of a speaker who generates the target utterance (e.g., *describe a restaurant*).

### Source Data

This section describes the source data (e.g., *news text and headlines, social media posts, translated sentences, ...*)

#### Initial Data Collection and Normalization

Describe the data collection process. Describe any criteria for data selection or filtering. List any key words or search terms used. If possible, include runtime information for the collection process. If data was collected from other pre-existing datasets, link to source here. If the data was modified or normalized after being collected, describe the process and the tools used.

#### Who are the source language producers?

State whether the data was produced by humans or machine generated. Describe the people or systems who originally created the data.

If available, include self-reported demographic or identity information for the source data creators, but avoid inferring this information. Instead state that this information is unknown. See [Larson 2017](https://www.aclweb.org/anthology/W17-1601.pdf) for using identity categories as a variables, particularly gender.

Describe the conditions under which the data was created (for example, if the producers were crowdworkers, state what platform was used, or if the data was found, what website the data was found on). If compensation was provided, include that information here.

Describe other people represented or mentioned in the data. Where possible, link to references for the information.

### Annotations

If the dataset contains annotations which are not part of the initial data collection, describe them in the following paragraphs.

#### Annotation process

If applicable, describe the annotation process and any tools used, or state otherwise. Describe the amount of data annotated, if not all. Describe or reference annotation guidelines provided to the annotators. If available, provide inter-annotator statistics. Describe any annotation validation processes.
In case multiple sets of annotators were used, please answer all questions for all sets of annotators.

#### Who are the annotators?

If annotations were collected for the source data (such as class labels or syntactic parses), state whether the annotations were produced by humans or machine generated.

Describe the people or systems who originally created the annotations and their selection criteria if applicable.

If available, include self-reported demographic or identity information for the annotators, but avoid inferring this information. Instead state that this information is unknown. See [Larson 2017](https://www.aclweb.org/anthology/W17-1601.pdf) for using identity categories as a variables, particularly gender.

Describe the conditions under which the data was annotated (for example, if the annotators were crowdworkers, state what platform was used, or if the data was found, what website the data was found on). If compensation was provided, include that information here.

### Personal and Sensitive Information

State whether the dataset uses identity categories and, if so, how the information is used. Describe where this information comes from (i.e. self-reporting, collecting from profiles, inferring, etc.). See [Larson 2017](https://www.aclweb.org/anthology/W17-1601.pdf) for using identity categories as a variables, particularly gender. State whether the data is linked to individuals and whether those individuals can be identified in the dataset, either directly or indirectly (i.e., in combination with other data).

State whether the dataset contains other data that might be considered sensitive (e.g., data that reveals racial or ethnic origins, sexual orientations, religious beliefs, political opinions or union memberships, or locations; financial or health data; biometric or genetic data; forms of government identification, such as social security numbers; criminal history).

If efforts were made to anonymize the data, describe the anonymization process.

## Changes to the Original Dataset for GEM

If the originally published dataset was modified in any way for GEM, please record the changes here. These could include data cleaning, exclusion of certain languages, changes to the data splits, additional challenge examples, among others.

## Considerations for Using the Data

### Social Impact of the Dataset

Please discuss some of the ways you believe the use of this dataset will impact society.

The statement should include both positive outlooks, such as outlining how technologies developed through its use may improve people's lives, and discuss the accompanying risks. These risks may range from making important decisions more opaque to people who are affected by the technology, to reinforcing existing harmful biases (whose specifics should be discussed in the next section), among other considerations.

### Impact on Underserved Communities

Describe in this section if the proposed dataset contains a *low-resource* or under-represented language. If this is the case or if this task has any impact on underserved communities, please elaborate on the previous section.

### Discussion of Biases

Provide descriptions of specific biases that are likely to be reflected in the data, and state whether any steps were taken to reduce their impact.

For Wikipedia text, see for example [Dinan et al 2020 on biases in Wikipedia (esp. Table 1)](https://arxiv.org/abs/2005.00614), or [Blodgett et al 2020](https://www.aclweb.org/anthology/2020.acl-main.485/) for a more general discussion of the topic.

If analyses have been run quantifying these biases, please add brief summaries and links to the studies here.

### Other Known Limitations

If studies of the datasets have outlined other limitations of the dataset, such as annotation artifacts, please outline and cite them here.

## Getting started with in-depth research on the task

In this section, add relevant pointers to resources that researchers can consult when they want to get started digging deeper into the task. These can include blog posts, research papers, literature surveys, etc.

## Credits

Data sheets were introduced by the following two publications:

* [Data Statements for Natural Language Processing: Toward Mitigating System Bias and Enabling Better Science](https://www.aclweb.org/anthology/Q18-1041/), Bender and Friedman
* [Datasheets for Datasets](https://arxiv.org/abs/1803.09010), Gebru et al.

This guide and template is an NLG-specific variant of the one produced by [HuggingFace](https://github.com/huggingface/datasets/blob/master/templates/README_guide.md).
