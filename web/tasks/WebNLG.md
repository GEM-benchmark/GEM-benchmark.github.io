---
title: 'WebNLG'
type: 'data-to-text'
motivation: 'The WebNLG dataset is a large bi-lingual dataset with crowdsourced reference texts and a rather large variety of knowledge in the inputs. A web-based evaluation platform is already existing.'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:https://webnlg-challenge.loria.fr/challenge_2020/**
- **Repository:https://gitlab.com/shimorina/webnlg-dataset.**
- **Paper:https://webnlg-challenge.loria.fr/files/2020.webnlg-papers.7.pdf**
- **Point of Contact:webnlg-challenge@inria.fr**

### Dataset and Task Summary

WebNLG is a bi-lingual dataset (English, Russian) of parallel DBpedia triple sets and short texts that cover about 450 different DBpedia properties. The WebNLG data was originally created to promote the development of RDF verbalisers able to generate short text and to handle micro-planning (i.e., sentence segmentation and ordering, referring expression generation, aggregation); the goal of the task is to generate texts starting from 1 to 7 input triples which have entities in common (so the input is actually a connected Knowledge Graph). The dataset contains about 17,000 triple sets and 45,000 crowdsourced texts in English, and 7,000 triples sets and 19,000 crowdsourced texts in Russian. A challenging test set section with entities and/or properties that have not been seen at training time is available.

### Why is this dataset part of GEM?

The WebNLG 2020 dataset is a large bi-lingual dataset with crowdsourced reference texts and a rather large variety of knowledge in the inputs.

### Languages

English, Russian.

## Meta Information

### Dataset Curators

It was compiled mostly by Anastasia Shimorina (Université de Lorraine / LORIA, France) and Thiago Castro Ferreira (Federal University of Minas Gerais, Brazil).

### Licensing Information

CC Attribution-Noncommercial-Share Alike 4.0 International.

### Citation Information
@InProceedings{gardent2017creating,
  author = 	"Gardent, Claire
		and Shimorina, Anastasia
		and Narayan, Shashi
		and Perez-Beltrachini, Laura",
  title = 	"Creating Training Corpora for NLG Micro-Planners",
  booktitle = 	"Proceedings of the 55th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)",
  year = 	"2017",
  publisher = 	"Association for Computational Linguistics",
  pages = 	"179--188",
  location = 	"Vancouver, Canada",
  doi = 	"10.18653/v1/P17-1017",
  url = 	"http://www.aclweb.org/anthology/P17-1017"
}

@inproceedings{castro-ferreira20:bilin-bi-direc-webnl-shared,
  title={The 2020 Bilingual, Bi-Directional WebNLG+ Shared Task Overview and Evaluation Results (WebNLG+ 2020)},
  author={Castro Ferreira, Thiago and
                  Gardent, Claire and
		  Ilinykh, Nikolai and
		  van der Lee, Chris and
		  Mille, Simon and
		  Moussallem, Diego and
		  Shimorina, Anastasia},
  booktitle = {Proceedings of the 3rd WebNLG Workshop on Natural Language Generation from the Semantic Web (WebNLG+ 2020)},
    pages = "55--76",
  year = 	 2020,
  address = 	 {Dublin, Ireland (Virtual)},
  publisher = {Association for Computational Linguistics}}


### Leaderboard

The dataset supports an active leaderboard, the best results are tracked here: https://beng.dice-research.org/gerbil/. The model outputs are evaluated against the crowdsourced references; the leaderboard reports BLEU-4, METEOR, CHRF++, TER, BERT and BLEURT scores.

## Dataset Structure

### Data Instances

Input:

<entry category="Company" eid="Id21" shape="(X (X) (X) (X) (X))" shape_type="sibling" size="4">
    <modifiedtripleset>
        <mtriple>Trane | foundingDate | 1913-01-01</mtriple>
        <mtriple>Trane | location | Ireland</mtriple>
        <mtriple>Trane | foundationPlace | La_Crosse,_Wisconsin</mtriple>
        <mtriple>Trane | numberOfEmployees | 29000</mtriple>
    </modifiedtripleset>
</entry>

Output:

One English reference text: Trane, which was founded on January 1st 1913 in La Crosse, Wisconsin, is based in Ireland. It has 29,000 employees.
One Russian text: Компания "Тране", основанная 1 января 1913 года в Ла-Кроссе в штате Висконсин, находится в Ирландии. В компании работают 29 тысяч человек.


### Data Fields

Copied from https://webnlg-challenge.loria.fr/docs/

Everything is wrapped in the root tag <benchmark>.

The main unit of the benchmark is <entry>. All the entries are wrapped in the tag <entries>. Each entry has five attributes: a DBpedia category, entry ID, shape, shape type, and triple set size.

<entry category="Food" eid="Id65" shape="(X (X) (X))" shape_type="sibling" size="2">
Each entry consists of three sections: <originaltripleset>, <modifiedtripleset>, and <lex>.

Original tripleset represents a set of triples as they were extracted from DBpedia. Each original triple is wrapped with the tag <otriple>.

Modified tripleset represents a set of triples as they were presented to crowdworkers (for more details on modifications, see below). The order of triples in the benchmark is the same as the order in which triples were presented to the crowd. Each modified triple is wrapped with the tag <mtriple>.

Lex (shortened for lexicalisation) represents a natural language text corresponding to triples. Each lexicalisation has two attributes: a comment, and a lexicalisation ID. By default, comments have the value good, except rare cases when they were manually marked as toFix. That was done during the corpus creation, when it was seen that a lexicalisation did not exactly match a triple set.


### Data Statistics

All numbers below are for Train, Dev, Test respectively.

English Triple sets: 13,211; 1,667; 1,779
English texts: 35,426; 4,464; 2,155
Properties: 372; 290; 220

Russian Triple sets: 5,573; 790; 1,102
Russian texts: 14,239; 2,026; 2,780
Russian: 226; 115; 192

## Dataset Creation

### Curation Rationale

The WebNLG dataset aims at covering knowledge in different domains ("categories"). The same properties and entities can appear in several categories.

The English WebNLG 2020 dataset for training comprises data-text pairs for 16 distinct DBpedia categories:
- The 10 seen categories used in 2017: Airport, Astronaut, Building, City, ComicsCharacter, Food, Monument, SportsTeam, University, and WrittenWork.
- The 5 unseen categories of 2017, which are now part of the seen data: Athlete, Artist, CelestialBody, MeanOfTransportation, Politician.
- 1 new category: Company.

### Communicative Goal

The sytems are required to produce one text (one or more sentences) that verbalises all and only the input triples in a grammatical and natural way.

### Source Data

 The data was compiled from raw DBpedia properties.

#### Initial Data Collection and Normalization

Copied from https://webnlg-challenge.loria.fr/docs/.

Initial triples extracted from DBpedia were modified in several ways. We describe below the most frequent changes that have been made. Full mapping information can be found here.

1- Unclear properties were renamed.
<otriple>Karnataka | west | Arabian_Sea</otriple>
<mtriple>Karnataka | has to its west | Arabian_Sea</mtriple>

2- Properties whose semantics does not differ were merged to the same property to avoid redundancy in data.
<otriple>Stuart_Parker_(footballer) | club | Chesterfield_F.C.</otriple>
<otriple>Stuart_Parker_(footballer) | team | Chesterfield_F.C.</otriple>

<mtriple>Stuart_Parker_(footballer) | club | Chesterfield_F.C.</mtriple>

3- Inexact subjects and objects were clarified.
<otriple>1_Decembrie_1918_University,_Alba_Iulia | nickname | Uab</otriple>
<mtriple>1_Decembrie_1918_University | nickname | Uab</mtriple>
This example demonstrates the motivation to have only the name of the university (1_Decembrie_1918_University), rather than its name together with its location (Alba_Iulia).

4- Objects were replaced due to the following reasons:
- incorrect DBpedia data (quite often stemming from the bad parsing of infoboxes);
<otriple>Ab_Klink | almaMater | Law</otriple>
<mtriple>Ab_Klink | almaMater | Leiden_University</mtriple>
This incorrect original triple resulted from having Ab Klink who studied Law at the Leiden University.
- same data, but in different measurement units (e.g., feet/metres, Celsius/Fahrenheit, etc);
<otriple>320_South_Boston_Building | height | 400.0 (feet)</otriple>
<otriple>320_South_Boston_Building | height | 121.92 (metres)</otriple>
<mtriple>320_South_Boston_Building | height | 121.92 (metres)</mtriple>
- same data, but in different formats (e.g., using double quotes, datatypes);
<otriple>Elliot_See | deathDate | "1966-02-28"^^xsd:date</otriple>
<otriple>Elliot_See | deathDate | 1966-02-28</otriple>
<mtriple>Elliot_See | deathDate | 1966-02-28</mtriple>
etc.

The changes that have been made were sometimes quite drastic especially in the case of incorrect DBpedia data, so do not be surprised to see how original triples were converted to modified ones.

An original tripleset and a modified tripleset usually represent a one-to-one mapping. However, there are cases with many-to-one mappings when several original triplesets are mapped to one modified tripleset.

<originaltripleset>
    <otriple>Jens_Härtel | team | 1._FC_Magdeburg</otriple>
</originaltripleset>
<originaltripleset>
    <otriple>Jens_Härtel | managerClub | 1._FC_Magdeburg</otriple>
</originaltripleset>
<modifiedtripleset>
    <mtriple>Jens_Härtel | club | 1._FC_Magdeburg</mtriple>
</modifiedtripleset>
We model the difference between original and modified triples as follows. They serve different purposes: the original triples — to link data to a knowledge base (DBpedia), whereas the modified triples — to ensure consistency and homogeneity throughout the data. To train models, the modified triples should be used.

#### Who are the source language producers?

There are no source texts, all textual material was compiled during the annotation process.

### Annotations

#### Annotation process

Annotators were first asked to create sentences that verbalise single triples. In a second round, annotators were asked to combine single-triple sentences together into sentences that cover 2 triples. And so on until 7 triples. Quality checks were performed to ensure the quality of the annotations.

#### Who are the annotators?

All references were collected through crowdsourcing platforms (Figure 8 and Amazon Mechanical Turk).

### Personal and Sensitive Information

Neither the dataset as published or the annotation process involves the collection or sharing of any kind of personal / demographic information.

## Changes to the Original Dataset for GEM

[More Information Needed]

## Considerations for Using the Data

### Social Impact of the Dataset

We do not foresee any negative social impact in particular from this dataset or task.

### Impact on Underserved Communities

[More Information Needed]

### Discussion of Biases

This dataset is created using DBpedia properties which naturally exhibit biases that have been found to exist in Wikipedia such as some forms of gender bias.

### Other Known Limitations

The quality of the rowdsourced references is limited, in particular in terms of fluency/naturalness of the collected texts.

## Getting started with in-depth research on the task

[More Information Needed]
