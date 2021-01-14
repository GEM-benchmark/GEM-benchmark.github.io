---
title: 'WebNLG'
type: 'Structure-to-text'
motivation: 'The WebNLG dataset is a large bi-lingual dataset with crowdsourced reference texts and a rather large variety of knowledge in the inputs. A web-based evaluation platform is already existing.'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** <https://webnlg-challenge.loria.fr/>
- **Repository:** <https://gitlab.com/shimorina/webnlg-dataset>
- **Paper:** [First Dataset Release](http://www.aclweb.org/anthology/P17-1017), [WebNLG Challenge 2017 Report](https://www.aclweb.org/anthology/W17-3518/), [WebNLG Challenge 2020 Report](https://webnlg-challenge.loria.fr/files/2020.webnlg-papers.7.pdf)
- **Point of Contact:** <webnlg-challenge@inria.fr>

### Dataset and Task Summary

WebNLG is a bi-lingual dataset (English, Russian) of parallel DBpedia triple sets and short texts that cover about 450 different DBpedia properties. The WebNLG data was originally created to promote the development of RDF verbalisers able to generate short text and to handle micro-planning (i.e., sentence segmentation and ordering, referring expression generation, aggregation); the goal of the task is to generate texts starting from 1 to 7 input triples which have entities in common (so the input is actually a connected Knowledge Graph). The dataset contains about 17,000 triple sets and 45,000 crowdsourced texts in English, and 7,000 triples sets and 19,000 crowdsourced texts in Russian. A challenging test set section with entities and/or properties that have not been seen at training time is available.

### Why is this dataset part of GEM?

The WebNLG 2020 dataset (version 3.0) is a large bi-lingual dataset with crowdsourced reference texts and a rather large variety of knowledge in the inputs.

### Languages

English (`en`, all dataset versions), Russian (`ru`, from the version 3.0 on).

## Meta Information

### Dataset Curators

The principle curator of the dataset is Anastasia Shimorina (Université de Lorraine / LORIA, France). Throughout the WebNLG releases, several people contributed to their construction: Claire Gardent (CNRS / LORIA, France), Shashi Narayan (Google, UK), Laura Perez-Beltrachini (University of Edinburgh, UK), Elena Khasanova, and Thiago Castro Ferreira (Federal University of Minas Gerais, Brazil).
The dataset construction was funded by the French National Research Agency (ANR).

### Licensing Information

[CC Attribution-Noncommercial-Share Alike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/).

### Citation Information

Initial release of the dataset:
```
@inproceedings{gardent2017creating,
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
```

The latest version 3.0:
```
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
```

### Leaderboard

The dataset supports an active leaderboard, the best results are tracked here: <https://beng.dice-research.org/gerbil/>. The model outputs are evaluated against the crowdsourced references; the leaderboard reports BLEU-4, METEOR, chrF++, TER, BERTScore and BLEURT scores.

## Dataset Structure

### Data Instances

English instance:

```
{
"entry": {
	"category": "Company",
	"size": "4",
	"shape": "(X (X) (X) (X) (X))",
	"shape_type": "sibling",
	"eid": "Id21",
	"lexs": [
	    {
		"comment": "good",
		"lex": "Trane, which was founded on January 1st 1913 in La Crosse, Wisconsin, is based in Ireland. It has 29,000 employees.",
		"lid": "Id1"
	    }
	],
	"modifiedtripleset": [
	    {
		"subject": "Trane",
		"property": "foundingDate",
		"object": "1913-01-01"
	    },
	    {
		"subject": "Trane",
		"property": "location",
		"object": "Ireland"
	    },
	    {
		"subject": "Trane",
		"property": "foundationPlace",
		"object": "La_Crosse,_Wisconsin"
	    },
	    {
		"subject": "Trane",
		"property": "numberOfEmployees",
		"object": "29000"
	    }

	],
	"originaltriplesets": {
	    "originaltripleset": [
		    {
			"subject": "Trane",
			"property": "foundingDate",
			"object": "1913-01-01"
		    },
		    {
			"subject": "Trane",
			"property": "location",
			"object": "Ireland"
		    },
		    {
			"subject": "Trane",
			"property": "foundationPlace",
			"object": "La_Crosse,_Wisconsin"
		    },
		    {
			"subject": "Trane",
			"property": "numberOfEmployees",
			"object": "29000"
		    }
	    ]
	}

	}
}
```

The XML-formatted example is [here](https://webnlg-challenge.loria.fr/docs/#example).


Russian instance:

```
{
"entry": {
	"category": "Building",
	"size": "3",
	"shape": "(X (X (X (X))))",
	"shape_type": "chain",
	"eid": "Id2",
	"lexs": [
	    {
		"lang": "en",
		"lex": "Andrew Mitchell is a leader in Birmingham where the architect John Madin who designed 103 Colmore Row was born.",
		"lid": "Id2"
	    },
	    {
		"lang": "ru",
		"lex": "Эндрю Митчелл - лидер в Бирмингеме, где родился архитектор Джон Мадин, который спроектировал Колмор-роу 103.",
		"lid": "Id2"
	    }
	],
	"modifiedtripleset": [
		    {
			"subject": "103_Colmore_Row",
			"property": "architect",
			"object": "John_Madin"
		    },
		    {
			"subject": "John_Madin",
			"property": "birthPlace",
			"object": "Birmingham"
		    },
		    {
			"subject": "Birmingham",
			"property": "leaderName",
			"object": "Andrew_Mitchell"
		    }

	],
	"originaltriplesets": {
	    "originaltripleset": [
		    {
			"subject": "103_Colmore_Row",
			"property": "architect",
			"object": "John_Madin"
		    },
		    {
			"subject": "John_Madin",
			"property": "birthPlace",
			"object": "Birmingham"
		    },
		    {
			"subject": "Birmingham",
			"property": "leaderName",
			"object": "Andrew_Mitchell"
		    }
	    ]
	},

	"dbpedialinks" : [
		    {
			"subject": "Birmingham",
			"property": "sameAs",
			"object": "Бирмингем"
		    }
	],

	"links" : [
		    {
			"subject": "Andrew Mitchell",
			"property": "sameAs",
			"object": "Эндрю Митчелл (муж)"
		    },
		    {
			"subject": "John Madin",
			"property": "sameAs",
			"object": "Джон Мадин (муж)"
		    },
		    {
			"subject": "103 Colmore Row",
			"property": "sameAs",
			"object": "Колмор-роу 103"
		    }
	]

	}
}
```

### Data Fields

See [official documentation](https://webnlg-challenge.loria.fr/docs/).


`entry`: a data instance of the benchmark. Each entry has five attributes: a DBpedia category (`category`), entry ID (`eid`), shape, shape type, and triple set size (`size`).
	
	- `shape`: a string representation of the RDF tree with nested parentheses where `X` is a node (see [Newick tree format](https://en.wikipedia.org/wiki/Newick_format)).

	- `shape_type`: a type of the tree shape. We [identify](https://www.aclweb.org/anthology/C16-1141.pdf) three types of tree shapes:
		    * `chain` (the object of one triple is the subject of the other);
		    * `sibling` (triples with a shared subject);
		    * `mixed` (both `chain` and `sibling` types present).
	- `eid`: an entry ID. It is unique only within a category and a size.
	- `category`: a DBpedia category (Astronaut, City, MusicalWork, Politician, etc.).
	- `size`: the number of RDF triples in a set. Ranges from 1 to 7.

Each `entry` has three fields: `originaltripleset`, `modifiedtripleset`, and `lexs`.

`originaltripleset`: a set of RDF triples as extracted from [DBpedia](https://wiki.dbpedia.org/). Each set of RDF triples is a tree. Triples have the subject-predicate-object structure.

`modifiedtripleset`: a set of RDF triples as presented to crowdworkers (for more details on modifications, see below).

Original and modified triples serve different purposes: the original triples — to link data to a knowledge base (DBpedia), whereas the modified triples — to ensure consistency and homogeneity throughout the data. To train models, the modified triples should be used.

`lexs` (shortened for lexicalisations): a natural language text verbalising the triples. Each lexicalisation has two attributes: a comment (`comment`), and a lexicalisation ID (`lid`). By default, comments have the value `good`, except rare cases when they were manually marked as `toFix`. That was done during the corpus creation, when it was seen that a lexicalisation did not exactly match a triple set.

Russian data has additional optional fields comparing to English:

`<dbpedialinks>`: RDF triples extracted from DBpedia between English and Russian entities by means of the property `sameAs`.

`<links>`: RDF triples created manually for some entities to serve as pointers to translators. There are two types of them:
    * with `sameAs` (`Spaniards | sameAs | испанцы`)
    * with `includes` (`Tomatoes, guanciale, cheese, olive oil | includes | гуанчиале`). Those were mostly created for string literals to translate some parts of them.

Lexicalisations in the Russian WebNLG have a new parameter `lang` (values: `en`, `ru`) because original English texts were kept in the Russian version (see the example above).


### Data Statistics


|  English (v3.0) | Train  | Dev   | Test  |
|-----------------|--------|-------|-------|
| **triple sets** | 13,211 | 1,667 | 1,779 |
| **texts**       | 35,426 | 4,464 | 5,150 |
|**properties**   | 372    | 290   | 220   |


|  Russian (v3.0) | Train  | Dev   | Test  |
|-----------------|--------|-------|-------|
| **triple sets** | 5,573  | 790   | 1,102 |
| **texts**       | 14,239 | 2,026 | 2,780 |
|**properties**   | 226    | 115   | 192   |

## Dataset Creation

### Curation Rationale

The WebNLG dataset was created to promote the development (_i_) of RDF verbalisers and (_ii_) of microplanners able to handle a wide range of linguistic constructions. The dataset aims at covering knowledge in different domains ("categories"). The same properties and entities can appear in several categories.

### Communicative Goal

The systems are required to produce one text (one or more sentences) that verbalises all and only the input triples in a grammatical and natural way.

### Source Data

The data was compiled from raw DBpedia triples. [This paper](https://www.aclweb.org/anthology/C16-1141/) explains how the triples were selected.

#### Initial Data Collection and Normalization

Initial triples extracted from DBpedia were modified in several ways. See [official documentation](https://webnlg-challenge.loria.fr/docs/) for the most frequent changes that have been made. An original tripleset and a modified tripleset usually represent a one-to-one mapping. However, there are cases with many-to-one mappings when several original triplesets are mapped to one modified tripleset.

Entities that served as roots of RDF trees are listed in [this file](https://gitlab.com/shimorina/webnlg-dataset/-/blob/master/supplementary/entities_dict.json).

The English WebNLG 2020 dataset (v3.0) for training comprises data-text pairs for 16 distinct DBpedia categories:
- The 10 seen categories used in the 2017 version: Airport, Astronaut, Building, City, ComicsCharacter, Food, Monument, SportsTeam, University, and WrittenWork.
- The 5 unseen categories of 2017, which are now part of the seen data: Athlete, Artist, CelestialBody, MeanOfTransportation, Politician.
- 1 new category: Company.

The Russian dataset (v3.0) comprises data-text pairs for 9 distinct categories: Airport, Astronaut, Building, CelestialBody, ComicsCharacter, Food, Monument, SportsTeam, and University.

#### Who are the source language producers?

There are no source texts, all textual material was compiled during the annotation process.

### Annotations

#### Annotation process

Annotators were first asked to create sentences that verbalise single triples. In a second round, annotators were asked to combine single-triple sentences together into sentences that cover 2 triples. And so on until 7 triples. Quality checks were performed to ensure the quality of the annotations. See Section 3.3 in [the dataset paper](https://www.aclweb.org/anthology/P17-1017.pdf).

Russian data was translated from English with an MT system and then was post-edited by crowdworkers. See Section 2.2 of [this paper](https://webnlg-challenge.loria.fr/files/2020.webnlg-papers.7.pdf).

#### Who are the annotators?

All references were collected through crowdsourcing platforms (CrowdFlower/Figure 8 and Amazon Mechanical Turk). For Russian, post-editing was done using the Yandex.Toloka crowdsourcing platform.

### Personal and Sensitive Information

Neither the dataset as published or the annotation process involves the collection or sharing of any kind of personal / demographic information.

## Changes to the Original Dataset for GEM

No changes. The [version 3.0](https://gitlab.com/shimorina/webnlg-dataset/-/tree/master/release_v3.0) of the dataset is used.

## Considerations for Using the Data

### Social Impact of the Dataset

We do not foresee any negative social impact in particular from this dataset or task.

Positive outlooks: Being able to generate good quality text from RDF data would permit, e.g., making this data more accessible to lay users, enriching existing text with information drawn from knowledge bases such as DBpedia or describing, comparing and relating entities present in these knowledge bases.

### Impact on Underserved Communities

N/A

### Discussion of Biases

This dataset is created using DBpedia RDF triples which naturally exhibit biases that have been found to exist in Wikipedia such as some forms of, e.g., gender bias.

The choice of [entities](https://gitlab.com/shimorina/webnlg-dataset/-/blob/master/supplementary/entities_dict.json), described by RDF trees, was not controlled. As such, they may contain gender biases; for instance, all the astronauts described by RDF triples are male. Hence, in texts, pronouns _he/him/his_ occur more often. Similarly, entities can be related to the Western culture more often than to other cultures.

### Other Known Limitations

The quality of the crowdsourced references is limited, in particular in terms of fluency/naturalness of the collected texts.

Russian data was machine-translated and then post-edited by crowdworkers, so some examples may still exhibit issues related to bad translations.

## Getting started with in-depth research on the task

Dataset construction: [main dataset paper](https://www.aclweb.org/anthology/P17-1017/), [RDF triple extraction](https://www.aclweb.org/anthology/C16-1141/), [Russian translation](https://www.aclweb.org/anthology/W19-3706/)

WebNLG Challenge 2017: [webpage](https://webnlg-challenge.loria.fr/challenge_2017/), [paper](https://www.aclweb.org/anthology/W17-3518/)

WebNLG Challenge 2020: [webpage](https://webnlg-challenge.loria.fr/challenge_2020/), [paper](https://webnlg-challenge.loria.fr/files/2020.webnlg-papers.7.pdf)

Enriched version of WebNLG: [repository](https://github.com/ThiagoCF05/webnlg), [paper](https://www.aclweb.org/anthology/W18-6521/)

Related research papers: [webpage](https://webnlg-challenge.loria.fr/research/)
