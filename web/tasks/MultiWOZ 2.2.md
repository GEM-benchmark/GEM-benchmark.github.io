---
title: 'MultiWOZ 2.2'
type: Dialog
motivation: Modeling task-oriented dialog.
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** [Main Dataset](https://github.com/budzianowski/multiwoz/tree/master/data/MultiWOZ_2.2)
- **Repository:** [MultiWOZ 2.2](https://github.com/budzianowski/multiwoz/tree/master/data/MultiWOZ_2.2), [MultiWOZ](https://github.com/budzianowski/multiwoz)
- **Paper:** [MultiWOZ 2.2](https://www.aclweb.org/anthology/2020.nlp4convai-1.13.pdf), [MultiWOZ](https://www.aclweb.org/anthology/D18-1547.pdf)
- **Point of Contact:** Contacting via creating an issue on [github repo](https://github.com/budzianowski/multiwoz/tree/master/data/MultiWOZ_2.2)

### Dataset and Task Summary

Multi-Domain Wizard-of-Oz (MultiWOZ) dataset, a large-scale multi-turn conversational corpus with dialogues spanning across several domains and topics. The version 2.2 corrects for annotation errors, dialog state inconsistencies and ontology issues. The dataset contains ~10K dialog instances, a magnitude bigger than other existing goal-oreinted dialog datasets.

There are 3,406 single-domain dialogues that include booking if the domain allows for that and 7,032 multi-domain dialogues consisting of at least 2 up to 5 domains. To enforce reproducibility of results, the corpus was randomly split into a train, test and development set. The test and development sets contain 1k examples each.

### Why is this dataset part of GEM?

MultiWOZ2.2 is one of the three datasets representing Dialog Generation NLG in GEM.

### Languages

Only English.

## Meta Information

### Dataset Curators

MultiWOZ was originally curated by researchers from  University of Cambridge and PolyAI, UK. The most recent version is further contributed by researchers from Google and University of Chicago. See complete list of authors in the original papers ([1](https://www.aclweb.org/anthology/D18-1547.pdf) , [2](https://www.aclweb.org/anthology/2020.nlp4convai-1.13.pdf))

### Licensing Information

MultiWOZ is an open source dataset released by Paweł Budzianowski from Cambridge Dialogue Systems Group under Apache License 2.0.

### Citation Information

```
[Budzianowski et al. 2018]
BibTex
@inproceedings{budzianowski2018large,
    Author = {Budzianowski, Pawe{\l} and Wen, Tsung-Hsien and Tseng, Bo-Hsiang  and Casanueva, I{\~n}igo and Ultes Stefan and Ramadan Osman and Ga{\v{s}}i\'c, Milica},
    title={MultiWOZ - A Large-Scale Multi-Domain Wizard-of-Oz Dataset for Task-Oriented Dialogue Modelling},
    booktitle={Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing (EMNLP)},
    year={2018}
}

[Ramadan et al. 2018]
BibTex
@inproceedings{ramadan2018large,
  title={Large-Scale Multi-Domain Belief Tracking with Knowledge Sharing},
  author={Ramadan, Osman and Budzianowski, Pawe{\l} and Gasic, Milica},
  booktitle={Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics},
  volume={2},
  pages={432--437},
  year={2018}
}

[Eric et al. 2019]
BibTex
@article{eric2019multiwoz,
  title={MultiWOZ 2.1: Multi-Domain Dialogue State Corrections and State Tracking Baselines},
  author={Eric, Mihail and Goel, Rahul and Paul, Shachi and Sethi, Abhishek and Agarwal, Sanchit and Gao, Shuyag and Hakkani-Tur, Dilek},
  journal={arXiv preprint arXiv:1907.01669},
  year={2019}
}

[Zang et al. 2020]
BibTex
@inproceedings{zang2020multiwoz,
  title={MultiWOZ 2.2: A Dialogue Dataset with Additional Annotation Corrections and State Tracking Baselines},
  author={Zang, Xiaoxue and Rastogi, Abhinav and Sunkara, Srinivas and Gupta, Raghav and Zhang, Jianguo and Chen, Jindong},
  booktitle={Proceedings of the 2nd Workshop on Natural Language Processing for Conversational AI, ACL 2020},
  pages={109--117},
  year={2020}
}
```

### Leaderboard

[Leaderboard](https://github.com/budzianowski/multiwoz#benchmarks) is maintained in the original MultiWOZ repository.

## Dataset Structure

### Data Instances

```
{
    "dialogue_id": "PMUL0698.json",
    "services": [
      "restaurant",
      "train"
    ],
    "turns": [
      {
        "frames": [
          {
            "actions": [],
            "service": "restaurant",
            "slots": [
              {
                "exclusive_end": 71,
                "slot": "restaurant-food",
                "start": 64,
                "value": "chinese"
              }
            ],
            "state": {
              "active_intent": "find_restaurant",
              "requested_slots": [],
              "slot_values": {
                "restaurant-area": [
                  "centre"
                ],
                "restaurant-food": [
                  "chinese"
                ]
              }
            }
          },
          {
            "actions": [],
            "service": "taxi",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          },
          {
            "actions": [],
            "service": "train",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          },
          {
            "actions": [],
            "service": "bus",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          },
          {
            "actions": [],
            "service": "police",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          },
          {
            "actions": [],
            "service": "hotel",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          },
          {
            "actions": [],
            "service": "attraction",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          },
          {
            "actions": [],
            "service": "hospital",
            "slots": [],
            "state": {
              "active_intent": "NONE",
              "requested_slots": [],
              "slot_values": {}
            }
          }
        ],
        "speaker": "USER",
        "turn_id": "0",
        "utterance": "I'm looking for a local place to dine in the centre that serves chinese food."
      }
    ]
}
```

### Data Fields

`dialogue_id` - indicates Dialog Instance number
`services` - indicates potential domains involved
`turns` - indicates an object consisting information (slot, value, etc) for a dialog turn
`slot` - conatins annotation for slot values (important entities)
`utterance` - contins text utterance for the turn
``

Complete details can be obtained from the [original repository](https://github.com/budzianowski/multiwoz/tree/master/data/MultiWOZ_2.2).

### Data Statistics

Some statistics of the dataset combining all splits:

`\# Dialogues`: 8,438
`Total \# turns`: 115,424
`Total \# tokens`: 1,520,970
`Avg. turns per dialogue`: 13.68
`Avg. tokens per turn`: 13.18
`Total unique tokens`: 24,071
`\# Slots`: 61

## Dataset Creation

### Curation Rationale

The broad goal of collecting human-human written conversations spanning over multiple domains and topics to train models that can replace a facillitator to help users for certain tasks, similar to the procedure in Wizard of Oz experiments. TO be specific, the dataset consists of highly natural conversations between a tourist and a clerk from an information center in a touristic

### Communicative Goal

The tourists asks for a range os issues such as requesting basic information about attractions through booking a hotel room or travelling between cities. The information provider navigates users query to provide the most informative answer.

### Source Data

#### Initial Data Collection and Normalization

From the paper, this contains a total of 10, 438 dialogues with around 70% of dialogues having more than 10 turns. The average number of turns are 8.93 and 15.39 for single and multi-domain dialogues respectively with 115, 434 turns in total. The wizard replies are much longer - the average sentence lengths are 11.75 and 15.12 for users and wizards respectively.

<!-- #### Who are the source language producers?

[More Information Needed] -->

### Annotations

#### Annotation process

The data is collected via an Wizard-of-OZ setup. As detailedd in the paper;

A task initialized by a template (through act type and slots). For example: inform, request, recommend etc. could be act types and adress, post codes, arking etc. could be slots.

User side: Each task template is realized in natural language. The goal description presented to the user is dependent on the number of turns already performed. Moreover, if the user is required to perform a sub-task (for example - booking a venue), these sub-goals are shown straight-away along with the main goal in the given domain.

System side: The wizard is asked to perform a role of a clerk by providing information required by the user. He
is given an easy-to-operate graphical user interface to the back-end database. The wizard conveys the information provided by the current user input through a web form. This information is persistent across turns and is used to query the database. At each system turn, the wizard starts with the results of the query from the previous turn.

#### Who are the annotators?

Crowdworkers were recruited for data collection.

### Personal and Sensitive Information

N/A

## Changes to the Original Dataset for GEM

None at present

## Considerations for Using the Data

### Social Impact of the Dataset

A goal-oriented conversational system maybe useful for users to navigate their query. The data collection and annotation framework provides ways to collect such datasets in critical domains such as education, healthcare.

### Impact on Underserved Communities

The dataset is in English language only. The domains are also restricted which might not be representative of the need of all communities.

### Discussion of Biases

The topics are crowdsourced, and it is possible that domain knowledge maybe limited to only some group of workers based on communities (location, culture). Moreover, dialogues are mainly on tourism which may also limit the range of the discussion and invite biases thorugh information assymetry. 

<!-- ### Other Known Limitations

[More Information Needed] -->

## Getting started with in-depth research on the task

[Papers, codes and models for other baselines and SOTA](https://github.com/budzianowski/multiwoz#benchmarks) 
[Codes for baselines](https://github.com/budzianowski/multiwoz)
[Huggingface Dataset](https://huggingface.co/datasets/woz_dialogue)
