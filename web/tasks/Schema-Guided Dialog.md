
---
title: 'Schema-Guided Dialog'
type: Dialog
motivation: Modeling task-oriented dialog.
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** None (See **Repository**)
- **Repository:** [The Schema-Guided Dialogue Dataset](https://github.com/google-research-datasets/dstc8-schema-guided-dialogue)
- **Paper:** [Towards Scalable Multi-Domain Conversational Agents: The Schema-Guided Dialogue Dataset](https://arxiv.org/pdf/1909.05855.pdf)
- **Point of Contact:** <schema-guided-dst@google.com>

### Dataset and Task Summary

The Schema-Guided Dialogue (SGD) dataset contains 18K multi-domain task-oriented dialogues between a human and a virtual assistant, which covers 17 domains ranging from banks and events to media, calendar, travel, and weather.
The language presents in the datset is only English.  
The SGD dataset provides a challenging testbed for a number of tasks in task-oriented dialogue, including language understanding, slot filling, dialogue state tracking and response generation.
For the creation of the SGD dataset, they developed a multi-domain dialogue simulator that generates dialogue outlines over an arbitrary combination of APIs, dialogue states and system actions. Then, they used a crowd-sourcing procedure to paraphrase these outlines to natural language utterances.
This novel crowd-sourcing procedure preserves all annotations obtained from the simulator and does not require any extra annotations after dialogue collection.


### Why is this dataset part of GEM?

Schema-Guided Dialog is one of the three datasets representing Dialog Generation NLG in GEM.

### Languages

The text in the datset is in English (`en`).

## Meta Information

### Dataset Curators

The dataset was curated by a team of researchers from Google: Abhinav Rastogi, Xiaoxue Zang, Srinivas Sunkara, Raghav Gupta, Pranav Khaitan, Amir Fayazi, Maria Wang, and Guan-Lin Chao.

### Licensing Information

The dataset is released under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) license. For the full license, see [LICENSE.txt](https://github.com/google-research-datasets/dstc8-schema-guided-dialogue/blob/master/LICENSE.txt). 

### Citation Information
Please cite the following paper if you use this dataset in your work:

```
@article{rastogi2019towards,
  title={Towards Scalable Multi-domain Conversational Agents: The Schema-Guided Dialogue Dataset},
  author={Rastogi, Abhinav and Zang, Xiaoxue and Sunkara, Srinivas and Gupta, Raghav and Khaitan, Pranav},
  journal={arXiv preprint arXiv:1909.05855},
  year={2019}
}
```

### Leaderboard
'Schema-Guided Dialogue State Tracking' track results at the [DSTC8 workshop](https://aaai.org/Conferences/AAAI-20/ws20workshops/#ws09) at [AAAI-20](https://aaai.org/Conferences/AAAI-20/) are available [here](https://docs.google.com/spreadsheets/d/19Z1e1mXch4HnPoXfMGxw2UEHBt3cTTcwulZ1H_7U7DM/edit#gid=0).

The models are evaluated on the SGD test set with the following metrics: Average Goal Accuracy, Average Intent Accuracy, Requested Slots F1, Slot Tagging F1.

## Dataset Structure

### Data Instances

Here is a JSON-formatted example in the dataset:
```
{'dialogue_id': '1_00000',
 'services': ['Restaurants_1'],
 'turns': 
 {'frames': 
 	[{'actions': [{'act': [6],
      'canonical_values': [['FindRestaurants']],
      'slot': ['intent'],
      'values': [['FindRestaurants']]}],
      'service': ['Restaurants_1'],
      'service_call': [{'method': '',
      'parameters': {'parameter_canonical_value': [],
       'parameter_slot_name': []}}],
      'service_results': [{'service_results_list': []}],
      'slots': [{'exclusive_end': [], 'slot': [], 'start': []}],
      'state': [{'active_intent': 'FindRestaurants',
      			 'requested_slots': [],
      			 'slot_values': {'slot_name': [], 'slot_value_list': []}}]},
     {'actions': [{'act': [13],
      'canonical_values': [[]],
      'slot': ['city'],
      'values': [[]]}],
      'service': ['Restaurants_1'],
      'service_call': [{'method': '',
      'parameters': {'parameter_canonical_value': [],
       'parameter_slot_name': []}}],
      'service_results': [{'service_results_list': []}],
      'slots': [{'exclusive_end': [], 'slot': [], 'start': []}],
      'state': [{'active_intent': '',
      		   'requested_slots': [],
      		   'slot_values': {'slot_name': [], 'slot_value_list': []}}]},
    ...,]}
 'speaker': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
 'utterance': [
   'I am feeling hungry so I would like to find a place to eat.',
   'Do you have a specific which you want the eating place to be located at?',
   'I would like for it to be in San Jose.',
   'Is there a specific cuisine type you enjoy, such as Mexican, Italian or something else?',
   'I usually like eating the American type of food.',
   'I see that at 71 Saint Peter there is a good restaurant which is in San Jose.',
   'Can you give me the address of this restaurant.',
   'If you want to go to this restaurant you can find it at 71 North San Pedro Street.',
   'Can you give me the phone number that I can contact them with?',
   'If you want to phone them you can at 408-971-8523.',
   'Is there some other restaurant which you can suggest?',
   'How would you like Bazille restaurant which is situated in San Jose.',
   'Do you have another restaurant matching my needs? For example a restaurant which is economical and is located in Palo Alto.',
   'I see that 7 restaurants suit to what you requested. Bird Dog seems as a good restaurant and is located in Palo Alto.',
   'Alright, that seems good. I would like to make a booking at this restaurant.',
   'For which time do you want the booking to be?',
   'I will be eating there at 11:30 am so make it for then.',
   'Can you please confirm that you want to book a table for 2 at 11:30 am at the Bird Dog restaurant in Palo Alto for today.',
   'That suits me well. Can you tell me if they feature live music?',
   'Your booking has been made without errors, but unfortunately they do not have live music.',
   'Will I be able to find liquor there? Can you give me the address of their location?',
   'The restaurant is located at 420 Ramona Street. Unfortunately they do not serve alcohol at the restaurant.',
   'I appreciate it very much. That would be all.',
   'Have a good time!'
 ]}   
```

### Data Fields

Each dialog instance has the following fields:
* `dialogue_id`: A unique identifier for a dialogue.
* `services`: A list of services present in the dialogue.
* `turns`: A list of annotated system or user utterances. Each turn consists of the following fields:
	* `speaker`: The speaker for the turn, either `USER` or `SYSTEM`.
	* `utterance`: A string containing the natural language utterance.
	* `frames`: A list of frames, each frame containing annotations for a single service and consists of the following fields:
		* `service`: The name of the service corresponding to the frame. The slots and intents used in the following fields are taken from the schema of this service.
		* `slots`: A list of slot spans in the utterance, only provided for non-categorical slots. Each slot span contains the following fields:
			* `slot`: The name of the slot.
			* `start`: The index of the starting character in the utterance corresponding to the slot value.
			* `exclusive_end`: The index of the character just after the last character corresponding to the slot value in the utterance.
		* `actions`: A list of actions corresponding to the system. Each action has the following fields:
			* `act`: The type of action.
			* `slot`: (optional) A slot argument for some of the actions.
			* `values`: (optional) A list of values assigned to the slot. If the values list is non-empty, then the slot must be present.
			* `canonical_values`: (optional) The values in their canonicalized form as used by the service. It is a list of strings of the same length as values.
		* `service_call`: (system turns only, optional) The request sent to the service. It consists of the following fields:
			* `method`: The name of the intent or function of the service or API being executed.
			* `parameters`: A pair of lists of the same lengths: `parameter_slot_name` contains slot names and `parameter_canonical_value` contains the corresponding values in their canonicalized form.
		* `service_results`: (system turns only, optional) A list of entities containing the results obtained from the service. It is only available for turns in which a service call is made. Each entity is represented as a pair of lists of the same length: `service_slot_name` contains slot names and `service_canonical_value` contains the corresponding canonical values.
		* `state`: (user turns only) The dialogue state corresponding to the service. It consists of the following fields:
			* `active_intent`: The intent corresponding to the service of the frame which is currently being fulfilled by the system. It takes the value "NONE" if none of the intents are active.
			* `requested_slots`: A list of slots requested by the user in the current turn.
			* `slot_values`: A pair of lists of the same lengths: `slot_name` contains slot names and `slot_value_list` contains the corresponding lists of strings. For categorical slots, this list contains a single value assigned to the slot. For non-categorical slots, all the values in this list are spoken variations of each other and are equivalent (e.g, "6 pm", "six in the evening", "evening at 6" etc.).


### Data Statistics

The dataset is split into a train, validation, and test set with the following sizes:

| | Train | Validation | Test |
| --- | --- | --- | --- | 
| \# of dialogues | 16142 | 2482 | 4201 |
| \# of turns | 48426 | 7446 | 12603 |
   

## Dataset Creation

### Curation Rationale

Previous multi-domain task-oriented dialogue datsets do not sufficiently capture the real-world challenges in virtual assistants, since they cover few domains and assume a single static ontology per domain.
The SGD datset is created to cover 17 domains with over 16K dialogues, and contain multiple different APIs in most domains, many of which have overlapping functionalities but different interfaces, which reflects common real-world scenarios.
The wide range of available annotations can be used for intent prediction, slot filling, dialogue state tracking, policy imitation learning, language generation, user simulation learning, among other tasks in large-scale virtual assistants. 

### Communicative Goal

The goal of a speaker who generates the target utterance is to help users accomplish tasks including but not limited to finding flights, booking restaurants, searching for nearby events and movies.


### Source Data

#### Initial Data Collection and Normalization

The dialogue outlines are first generated by a simulator. The dialogue simulator interacts with the services to generate dialogue outlines. It consists of two agents playing the roles of the user and the system, interacting with each other using a finite set of actions specified through dialogue acts over a probabilistic automaton designed to capture varied dialogue trajectories. It is worth noting that the simulation automaton does not include any domain-specific constraints: all domain-specific constraints are encoded in the schema and scenario.

The dialogue paraphrasing framework then converts the outlines generated by the simulator into a natural conversation. Users may refer to the slot values in the dialogue acts in various different ways during the conversation, e.g., “los angeles” may be referred to as “LA” or “LAX”. To introduce these natural variations in the slot values, different slot values are replaced with a randomly selected variation while being kept consistent across user turns in a dialogue. The actions are then converted to pseudo-natural language utterances using a set of manually defined action-to-text templates, and the resulting utterances for the different actions in a turn are concatenated together.

Finally, the dialogue transformed by these steps is sent to the crowd workers to be reformulated into more natural language. One crowd worker is tasked with paraphrasing all utterances of a dialogue to ensure naturalness and coherence. The crowd workers are asked to exactly repeat the slot values in their paraphrases so that the span indices for the slots can be recovered via string matching.


#### Who are the source language producers?

The language structure is machine-generated, and the language realizations are produced by crowd workers. 
The dataset paper does not provide demographic information for the crowd workers.

### Annotations

The annotations are automatically obtained during the initial sampling process and by string matching after reformulation. Therefore, no further annotation is needed.

<!-- #### Annotation process

[More Information Needed]

#### Who are the annotators?

[More Information Needed]-->

### Personal and Sensitive Information

The SGD dataset does not use identity categories.
The SGD dataset does not contain sensitive data.

## Changes to the Original Dataset for GEM

No changes have been made to the original dataset.

## Considerations for Using the Data

### Social Impact of the Dataset

The SGD dataset will be a good benchmark for developing dialogue models which can improve user experience in virtual assistant products.
The virtual assistants can help people search information from the internet, provide recommendations and deal with daily routines. But when providing the services, virtual assistants also gain direct access to user's private information, which might be risky if user private information is not well protected.

<!--### Impact on Underserved Communities

[More Information Needed]-->

### Discussion of Biases

The dialogues under each domain distributed unevenly, where the flights domain has 3644 dialogues while the payment domain only contains 222 dialogues.
Besides, all dialogues are paraphrased by crowd-workers, and it is possible that crow-workers with different culture backgrounds will exhibit biased opinions. 

<!--### Other Known Limitations

[More Information Needed]-->

## Getting started with in-depth research on the task

* [Paper for dataset and DST baseline](https://arxiv.org/pdf/1909.05855.pdf)
* [DSTC8 overview paper](https://arxiv.org/pdf/2002.01359.pdf)
* [Code for DST baseline](https://github.com/google-research/google-research/tree/master/schema_guided_dst)
* [Natural language generation baseline paper](https://arxiv.org/pdf/2004.15006.pdf)
* [Blog post announcing the dataset](https://ai.googleblog.com/2019/10/introducing-schema-guided-dialogue.html)
