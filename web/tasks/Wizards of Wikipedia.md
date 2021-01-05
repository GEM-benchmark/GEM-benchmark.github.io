---
title: 'Wizards of Wikipedia'
type: Dialog
motivation: Knowledge conditioned open domain dialog.
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Dataset Description

- **Homepage:** [Wizard of Wikipedia Homepage](https://parl.ai/projects/wizard_of_wikipedia/)
- **Repository:** [Wizard of Wikipedia task in PARLAI repo](https://github.com/facebookresearch/ParlAI/tree/master/parlai/tasks/wizard_of_wikipedia)
- **Paper:** [Wizard of Wikipedia: Knowledge-Powered Conversational agents
](https://arxiv.org/abs/1811.01241)
- **Point of Contact:** Option 1: Contacting via creating an issue on PARLAI [github repo](https://github.com/facebookresearch/ParlAI). Option 2: 
[Contact authors on the above paper]({edinan,roller,kshuster,angelafan,michaelauli,jase}@fb.com)


### Dataset and Task Summary

Task Summary:
The Wizard of Wikipedia is an open-domain dialogue task for training agents that can converse knowledgably about open-domain topics. In open-domain dialogue intelligent agents should exhibit the use of knowledge. This could simply be done by training models which "generate and hope" generic utterances that can be memorized in the weights of the model when mapping from input utterance(s) to output. Through grounded dialog datasets, one could rather train models that employing recalled knowledge as context. The goal here is to retrieving knowledge (relevant to context) from wikipedia, reading and conditioning on it, and finally generating natural responses.

Dataset:
The dataset consists of conversations grounded with knowledge retrieved from Wikipedia. It contains 201k utterances from 22k dialogues spanning over 1300 diverse topics, split into train, test, and valid sets. The associated Wikipedia knowledge base has 5.4M articles and 93M sentences.

### Why is this dataset part of GEM?

Wizard-of-Wikipedia is one of the three datasets representing Dialog Generation NLG in GEM.


### Languages

Contains English text only

## Meta Information

### Dataset Curators

The dataset was curated by a team of researchers from Facebook: Emily Dinan, Stephen Roller, Kurt Shuster, Angela Fan, Michael Auli, Jason Weston.

### Licensing Information

The [project page](https://parl.ai/projects/wizard_of_wikipedia/) does not mention a license for the dataset. ParlAI repository has [MIT License](https://github.com/facebookresearch/ParlAI/blob/master/LICENSE) 

### Citation Information

```
@inproceedings{dinan2019wizard,
  author={Emily Dinan and Stephen Roller and Kurt Shuster and Angela Fan and Michael Auli and Jason Weston},
  title={{W}izard of {W}ikipedia: Knowledge-powered Conversational Agents},
  booktitle = {Proceedings of the International Conference on Learning Representations (ICLR)},
  year={2019},
}
```

### Leaderboard

Project page has a [leaderboard](https://parl.ai/projects/wizard_of_wikipedia/).

## Dataset Structure

### Data Instances
Data example (Source: Running ```parlai display_data -t wizard_of_wikipedia -dt train``` after installing ParlAI library)

```
chosen_topic: Science fiction 
A: I think science fiction is an amazing genre for anything. Future science, technology, time travel, FTL travel, they're all such interesting concepts.
W: I'm a huge fan of science fiction myself! 
A: Awesome! I really love how sci-fi storytellers focus on political/social/philosophical issues that would still be around even in the future. Makes them relatable.
W: I agree. One of my favorite forms of science fiction is anything related to time travel! I find it fascinating.
A: It's not quite sci-fi, but my favorite version of time travel is in Harry Potter and the Prisoner of Azkaban. Breaks zero logical rules.
W: And that's difficult to do when dealing with time travel. I actually haven't seen the latest Harry Potter movies. Guess it's time to check them out!
A: If you really want a look at the potential negative consequences of scientific innovation, what you should check out is the TV show Fringe. Incredibly well written.
```


### Data Fields

Brief description of some of the fields:
- ```chosen_topic```: topic of dialog
- ```checked_sentence```: selected knowledge
- ```actor_id```: 'apprentice' or 'wizard'
- ```text```: dialog utterance text

Thr original repository has more [details](https://github.com/facebookresearch/ParlAI/blob/master/parlai/tasks/wizard_of_wikipedia/worlds.py)

### Data Statistics

Some statistics for train split:
- Number of Utterances : 166,787
- Number of Dialogues: 18,430 
- Number of Topics: 1,247
- Average Turns per Dialogue: 9.0

## Dataset Creation

### Curation Rationale

As mentioned in the Wizard-of-Wikipedia paper, goal of collecting data of wizard-apprentice conversations between humans is to then be able to train models which can replace the human wizard and speak to a human apprentice, similar to the procedure in Wizard of Oz experiments.

### Communicative Goal

Apprentice talks to the wizard freely, playing the role of a curious learner, eager to chat.
Human Wizard is asked discuss a topic with an eager apprentice.


### Source Data

A set of 1365 natural, open-domain dialogue topics, each linked to a Wikipedia article, was crowd-sourced. These dialogues are on diverse topics such as commuting, Gouda cheese, music festivals, podcasts, and bowling.

At each step of the dialogue the wizard has access to a set of passages of knowledge which may be relevant to the given dialogue context. The top 7 articles (first paragraph only) for the last two turns of dialogue (by wizard and apprentice) and the article (first 10 sentences only) for the original topic, and present these articles to the wizard as knowledge context, along with their titles. 

#### Initial Data Collection and Normalization

The final dialogue dataset consists of 22,311 dialogues with
201,999 turns, which is divided into 166,787 for train, 17,715 for validation, and 17,497 for test. The test set is split into two subsets, Test Seen and Test Unseen. Test Seen contains 533 overlapping topics with the training set with new dialogues about those topics. Test Unseen consists of 58 topics never seen before in train or validation. 



### Annotations

#### Annotation process

Authors stated the following annotation procedure in their paper:
1. Either the wizard or apprentice is picked to choose the topic and speak first. The other
player receives the topic information, and the conversation begins.
2. When the apprentice sends the wizard a message, the wizard is shown relevant knowledge
(described below), and chooses a relevant sentence in order to construct a response, or else
chooses the no sentence used option.
3. The Wizard responds to the apprentice basing their response on their chosen sentence.
4. The conversation repeats until one of the conversation partners ends the chat (after a minimum of 4 or 5 turns each, randomly chosen beforehand).

#### Who are the annotators?

Crowdworkers were recruited for data collection. More details about crowdworkers are not provided in the paper. 

### Personal and Sensitive Information

[N/A]

## Changes to the Original Dataset for GEM

None at present

## Considerations for Using the Data

### Social Impact of the Dataset

The dataset would probably have similar societal impacts as most other open domain dialog datasets. There are several resources available for social impact of open domain dialog agents (such as [SIG: chatbots for social good. Følstad et al 2018](https://dl.acm.org/doi/10.1145/3170427.3185372)).

### Impact on Underserved Communities

The dataset is in English language only. 
The set of seed topics used, though diverse, might not be representative of all communities. 


### Discussion of Biases

The topics are crowdsourced, and maybe limited to topics relevant to only some communities. 
Moreover, dialogues are collected through crowdsourcing, and may exhibit biased opinions on various topics.

### Other Known Limitations



## Getting started with in-depth research on the task

Some useful resources:
- [Link to paper](https://arxiv.org/abs/1811.01241)
- [ParlAI code for Wizards of Wikipedia](https://github.com/facebookresearch/ParlAI/tree/master/parlai/tasks/wizard_of_wikipedia)
- [Huggingface datasets](https://huggingface.co/datasets/woz_dialogue#social-impact-of-dataset)




