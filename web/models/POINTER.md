---
title: 'POINTER'
type: Shared Task 2021
background: POINTER is a hybrid architecture, combining transformers with insertion-based networks.
---

## Table of Contents


## Model Description

- **Paper:** [System Description for the CommonGen task with the POINTER model](https://aclanthology.org/2021.gem-1.15/)
- **Creator:** Anna Shvets
- **Point of Contact:** Anna Shvets (anna.shvets@inetum.com)

## Social Impact

In this section, we ask you to provide information on all of the steps that went into obtaining your models, especially in regards to how they would affect a user’s interactions with the technology if it was deployed in a live system.

Then, please choose one of these steps to analyze in terms of possible negative impacts on potential direct and indirect users, and propose a test to evaluate the existence and magnitude of that impact. We provide examples of such analyses in the following two paragraphs.

Consider for example a model pre-trained on English Wikipedia and fine-tuned on a summarization dataset, and imagine that such a model is deployed in a news website to provide automatic summaries. Given the gender gap on Wikipedia, we can imagine two possible effects:
1) the model could systematically produce summaries with lower ROUGE scores when compared to a reference for articles describing women than it would for articles describing men.
2) the model may be less likely to name the subject of an article if the subject is a woman than if the subject is a man.
We can measure either of these effects by running an entity linking system on the articles, for example, and comparing subsets of the test set where the gender of the actors is known.

Alternatively, imagine that a system that is fine-tuned on WikiAuto, which aligns English Wikipedia text to its Simple English Wikipedia version, is used in an attempt to make a blog where the writer talks about their personal experience more accessible. How well does the model handle the shift from a third person to a first person point of view? One way we can check whether the behavior is roughly the same is by comparing the copy rate (number of words from the input that are re-used in the output) between the Wikipedia and blog setting.

We ask you to take a similar approach to analyzing your model:

### Additional Data
*If you used a model that was pre-trained on additional data or used additional data, please describe it. Provide a link to a datasheet or data statement if there is one available, otherwise, provide as much relevant information as possible on the source of the data, the people represented in it, its languages, licensing, pre-processing, etc.*

The model used for CommonGEN task is based on pre-trained POINTER model available at https://github.com/dreasysnail/POINTER. According to authors of the article, describing the pre-training process (https://arxiv.org/abs/2005.00558), 12Ga of English Wikipedia corpora has been used to produce above-metioned pre-trained wiki model. The pretrained model is distributed under MIT licence: https://github.com/dreasysnail/POINTER/blob/master/LICENSE.

### Training Process

*Describe the training or fine tuning setup, including whether the final model was trained on a single task or in a multi-task setting. If a data augmentation technique was used, describe the technique*

The fune tuning was done using training data for CommonGEN task. The data pre-processing included the ml masks formation with a special NOI tag on 3 data epochs, which resulted in data augmentation from  67.389 source entries to 160.680 processed entries.


### Real-World Use
*Describe a possible real-use application of your model, then choose one of the steps (e.g. choice of the pre-trained model, data source, data augmentation, training loss, etc.) above and describe a negative impact it may have on the user experience*

Since the model was pre-trained on English Wikipedia corpora, the bias inherent to the dataset will potentially influence the generated texts, leading to potential discrimination of minority groups or marginalized communities.

### Measuring Impact

*Propose a method to test the magnitude of the impact identified in your previous answer*

There are several methodologies to measure bias in a dataset, reflected in a devoted study: https://arxiv.org/abs/1908.09635. In order to measure the fairness of the generated text, one of the fairness metrics might be applied, including equalized odds, predictive parity, counterfactual fairness or demographic parity.

## Reproducibility

*In this section, we ask you to provide any information that would be required for someone to reproduce your model and experimental results. These questions are derived from the suggested model card in [1] and the reproducibility checklist in [2].*

*[1] Dodge, Jesse, et al. "Show Your Work: Improved Reporting of Experimental Results." EMNLP. 2019.*

*[1] Mitchell et al. "Model cards for model reporting." Proceedings of the conference on fairness, accountability, and transparency. 2019.*

### Model Description

*Provide basic information about your model, including (1) the model type (e.g., BART, Pointer Network), (2) model version/date if multiple versions are available, (3) training algorithms used. Please cite papers or other resources where further information about the model can be found. Also include the model license and citation details.*

POINTER is a hybrid architecture, combining transformers with insertion-based networks. The original paper was published in 2020 (https://arxiv.org/abs/2005.00558), along with the pretrained wiki model available for download, along with the source code at https://github.com/dreasysnail/POINTER

### Model Hyperparameters

*Provide the range of hyperparameters that would be required to reproduce your final model (e.g., optimizer used, number of epochs, learning rate, etc.). If hyperparameter search was used, please describe (1) the bounds for each hyperparameter, (2) the number of hyperparameter search trials, (3) the method for choosing hyperparameter values (e.g., uniform sampling, manual tuning, evolutionary optimization, etc.).*

Optimizer: AdamW

Learningrate: 1e-5

Adam epsilon: 1e-8

Warmup steps: 10

Seed: 1

Epochs: 10

Batch size: 64

### The Hyperparameter specifications for best performing models

There are two sampling methods used while the inference phase - greedy and sampling. Greedy is based on a greedy search algorithm, while sampling uses top-k, top-p and temperature parameters to render model predictions. Here is a set for both of sampling strategies:


1. Greedy:
noi_decay: 1,
reduce_decay: 1,
prevent: True,
reduce_stop: True,
lessrepeat: True.

2. Sampling:
top_k: 10,
top_p: 0.9,
temperature: 1.


### Dataset Details
*Include relevant training data statistics (e.g., number of samples used, whether some subsets of the dataset were discarded), the training/validation/test splits for the number of samples and any pre-processing steps if used.*

67.389 source entries from training set of CommonGEM dataset were converted to 160.680 processed entries. The main purpose of pre-processing consists of creation of lm labels with a special NOI tag, masking the word that should be further inserted at the inference phase.


### Dependencies and External Libraries

*Include a specification of library dependencies*

Since the TPU was used for training, XLA support is necessary.


### Link to downloadable source code

https://github.com/dreasysnail/POINTER

### Computing Infrastructure Used

*Describe the computing infrastructure used to train your model (e.g., number of GPUs, GPU type and vRAM) and the time taken to train your final model.*

The training was done using TPU-v3-8, following the multiprocessing paradigm. The total training time was 3 hours.

### Evaluation Details

*How were your models evaluated? Please include evaluation metric details (including links to code), train/validation/test splits, and model performance on both test and validation sets. If more than one model was trained and evaluated, what was the number of training and evaluation runs, and the variance in scores? If human evaluation was used, please describe the experimental setup.*

The model performance was evaluated using different metrics for lexical similarity (ROUGE 1/2/L, BLEU, Meteor), semantic similarity (BERTscore, BLEURT) and diversity (MSTTR, Distinct 1/2/3, Unique 1/2/3, Entropy 1/2/3) measures. The file with all described metrics and their results is available at https://github.com/asnota/metrics
