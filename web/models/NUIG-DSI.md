---
title: 'NUIG-DSI'
type: 'Shared Task 2021'
background: 'Finetuned T5 with additional pretraining data.'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Model Description

- **Paper:** [NUIG-DSI’s submission to The GEM Benchmark 2021](https://aclanthology.org/2021.gem-1.13/)
- **Creators:** Nivranshu Pasricha, Mihael Arcan, Paul Buitelaar
- **Point of Contact:** Nivranshu Pasricha (n.pasricha1@nuigalway.ie)

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

We used additional data from DBpedia. Particularly, we used abstracts from DBpedia for the entities present in the training set of DART and WebNLG datasets


### Training Process

*Describe the training or fine tuning setup, including whether the final model was trained on a single task or in a multi-task setting. If a data augmentation technique was used, describe the technique*

We use pre-trained T5 model (base variant with ~220M parameters) for submissions on DART, WebNLG, CommonGen and E2E datasets. A single model was used for DART and WebNLG where we additionally train on DBpedia abstracts before fine-tuning on the DART training set. For the other two datasets, we perform additional masked pre-training on the target texts before fine-tuning on the respective training sets. We experiment with different masking strategies focussing on masking entities/predicates/concepts as well as randomly masked spans. We will provide more details on this in our system description.

### Real-World Use
*Describe a possible real-use application of your model, then choose one of the steps (e.g. choice of the pre-trained model, data source, data augmentation, training loss, etc.) above and describe a negative impact it may have on the user experience*

Possible applications can include automatically generating texts conditioned on some input data. A negative impact would be generation of factually incorrect texts as models such as T5 are prone to hallucinations and can generate text which might contradict real-world facts.

### Measuring Impact

*Propose a method to test the magnitude of the impact identified in your previous answer*

Strong evaluation methods, automatic or manual would be required to ensure the correctness of generated texts.

## Reproducibility

*In this section, we ask you to provide any information that would be required for someone to reproduce your model and experimental results. These questions are derived from the suggested model card in [1] and the reproducibility checklist in [2].*

*[1] Dodge, Jesse, et al. "Show Your Work: Improved Reporting of Experimental Results." EMNLP. 2019.*

*[1] Mitchell et al. "Model cards for model reporting." Proceedings of the conference on fairness, accountability, and transparency. 2019.*

### Model Description

*Provide basic information about your model, including (1) the model type (e.g., BART, Pointer Network), (2) model version/date if multiple versions are available, (3) training algorithms used. Please cite papers or other resources where further information about the model can be found. Also include the model license and citation details.*

We used pre-trained T5-base model implemented in HuggingFace's transformers library. Model version is from April-May 2021 and for training we follow a similar approach to the baseline model described in the GEM benchmark paper of fine-tuning on the GEM training datasets. We performed additional pre-training on target texts and in one case on abstracts from DBpedia where we experimented with different masking strategies for pre-training. Mainly, we tried a strategy of masking random spans and compared it with another strategy where we masked entities/predicates/concepts present in the input data.


### Model Hyperparameters

*Provide the range of hyperparameters that would be required to reproduce your final model (e.g., optimizer used, number of epochs, learning rate, etc.). If hyperparameter search was used, please describe (1) the bounds for each hyperparameter, (2) the number of hyperparameter search trials, (3) the method for choosing hyperparameter values (e.g., uniform sampling, manual tuning, evolutionary optimization, etc.).*

We mostly used the default hyperparameter values. The values changed are mentioned below:
Epochs: 10 (Best model chosen with minimum loss on the validation set)
Learning Rate: 1e-3
Beam Size: 5
Seed: 2601

### Dataset Details
*Include relevant training data statistics (e.g., number of samples used, whether some subsets of the dataset were discarded), the training/validation/test splits for the number of samples and any pre-processing steps if used.*

We use the data from the 'training' subset for each dataset.


### Dependencies and External Libraries

*Include a specification of library dependencies*

N/A


### Link to downloadable source code

N/A

### Computing Infrastructure Used

*Describe the computing infrastructure used to train your model (e.g., number of GPUs, GPU type and vRAM) and the time taken to train your final model.*

NVIDIA GeForce GTX 1080 GPU. Model training would have taken approximately 12-15 hours on all the datasets where we make a submission.

### Evaluation Details

*How were your models evaluated? Please include evaluation metric details (including links to code), train/validation/test splits, and model performance on both test and validation sets. If more than one model was trained and evaluated, what was the number of training and evaluation runs, and the variance in scores? If human evaluation was used, please describe the experimental setup.*

We used the GEM metrics evaluation script for automatic evaluation.
