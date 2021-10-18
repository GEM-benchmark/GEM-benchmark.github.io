---
title: 'Self-Training, Acceptability Classifiers and Context-Conditioning'
type: 'Shared Task 2021'
background: 'BART together with RoBERTa classifiers and context.'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Model Description

- **Paper:** [Structure-to-Text Generation with Self-Training, Acceptability Classifiers and Context-Conditioning for the GEM Shared Task](https://aclanthology.org/2021.gem-1.12)
- **Creators:** Shreyan Bakshi, Soumya Batra, Peyman Heidari, Ankit Arun, Shashank Jain, Michael White
- **Point of Contact:** Shreyan Bakshi (shreyanb@fb.com)

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

For generation (including self-training), a Pre-trained BART-Large Model as described/published (and available) here: https://github.com/pytorch/fairseq/blob/master/examples/bart/README.md was used.

This was published (https://arxiv.org/pdf/1910.13461.pdf) in 2019 by Facebook AI, under the MIT License (https://github.com/pytorch/fairseq).

We also used the templates that Kale & Rastogi used in their EMNLP-20 paper, available here: https://github.com/google-research/schema-guided-dialogue/tree/main/generation

For the Acceptability Classification, we used a Pre-trained RoBERTa-Base Model as described/published (and available) here:
https://github.com/pytorch/fairseq/blob/master/examples/roberta/README.md

This was published (https://arxiv.org/pdf/1907.11692.pdf) in 2019 by Facebook AI, under the MIT License (https://github.com/pytorch/fairseq).


### Training Process

*Describe the training or fine tuning setup, including whether the final model was trained on a single task or in a multi-task setting. If a data augmentation technique was used, describe the technique*

We passed the SGD through the Google templates and augmented with the service name and five turns of preceding context.

For WebNLG, we preprocessed the dataset based on the implicit tree structure ordering from Yang et al. (2020). We additionally sorted siblings by increasing subtree depth, breaking ties by sorting alphabetically on predicate names.

For E2E, no additional pre-processing of that data was performed.

We then fine-tuned a BART-Large model to generate the target responses using these inputs.  We also trained a BART-Large model to reconstruct the input from the generated response.  For SGD and WebNLG, this model included the service/domain name in the input as well and was trained to reconstruct the templated input (without context for SGD).

Using these models, we ran 2 iterations of self-training, where we created unpaired inputs by deleting subsets of the input dialog acts, randomly choosing up to 20 unpaired inputs per original input.  In each self-training iteration, we ran the generator on the unpaired inputs and then the reconstruction model on the resulting responses, keeping those that yielded an exact match with the original input and adding them to the training data for retraining the generator and reconstruction models.

We noted that for the case of SGD, the self-trained model was susceptible to stuttering, i.e., repeating the same phrase over and over again. This was not observed in the BART-Large generation model. Hence, to control for stuttering, for each response generated by the self-trained model, we used the heuristic that if any word (excluding stop words such as articles, conjunctions, etc.) was repeated in the generated response more than 5 times; we preferred the response generated by the BART-Large model instead.

Finally, we passed the generated responses for a dataset to an acceptability classifier that selected the first generated response in a 5-best list that passed the acceptability test for output (or the 1-best output if no responses passed the test). We filtered out the responses from the 5-best list that had an unacceptability score > threshold, and the top response was selected from the remaining. In the case of all responses getting filtered out, the original 1-best response was selected.

We trained an acceptability classifier for each dataset using the training data provided for that dataset and further augmenting it by generating synthetic positive and negative responses to augment those in the training data. The synthetic data was created by mask filling using the BART-Large generator (prior to self-training) fine-tuned on the original training data, with the resulting synthesized responses passed through a RoBERTa-large-mnli entailment model to determine whether they were acceptable (i.e., paraphrases of the seed response) or unacceptable (semantically inaccurate compared to the seed response).  Finally, the resulting data was used to train a RoBERTa-base classifier for predicting response acceptability.

### Real-World Use
*Describe a possible real-use application of your model, then choose one of the steps (e.g. choice of the pre-trained model, data source, data augmentation, training loss, etc.) above and describe a negative impact it may have on the user experience*

BART is a pre-trained model whose training data is perhaps not as well-studied as it could be (as is apparently true of all pre-trained models).   Our SGD model conditions on the context and uses BART, and thus would be susceptible to being triggered into generating unsafe (malicious, racist, sexist, etc.) language by certain words that the user provides if it were to be deployed with no safety rails. We could estimate how susceptible the model might be to adversarial attacks by examining how often it copied a word from the context that was outside the training vocabulary. More sophisticated analyses could follow the methods of Dinan et al. (https://arxiv.org/abs/1908.06083).  As noted above, this could lead to unsafe responses getting generated in real-word use-cases such as Dialog systems for Assistants.

### Measuring Impact

*Propose a method to test the magnitude of the impact identified in your previous answer*

As noted earlier, Dinan et al. have proposed a method (https://arxiv.org/abs/1908.06083) for adversarial analysis that could be pursued to investigate this issue.  Subsequent work (e.g., Xu et al., https://arxiv.org/abs/2010.07079) has investigated ways of improving safety, but this remains an open problem.

## Reproducibility

*In this section, we ask you to provide any information that would be required for someone to reproduce your model and experimental results. These questions are derived from the suggested model card in [1] and the reproducibility checklist in [2].*

*[1] Dodge, Jesse, et al. "Show Your Work: Improved Reporting of Experimental Results." EMNLP. 2019.*

*[1] Mitchell et al. "Model cards for model reporting." Proceedings of the conference on fairness, accountability, and transparency. 2019.*

### Model Description

*Provide basic information about your model, including (1) the model type (e.g., BART, Pointer Network), (2) model version/date if multiple versions are available, (3) training algorithms used. Please cite papers or other resources where further information about the model can be found. Also include the model license and citation details.*

As noted earlier, we use BART-Large and RoBERTa-Base models.

For generation (including self-training), a Pre-trained BART-Large Model as described/published (and available) here: https://github.com/pytorch/fairseq/blob/master/examples/bart/README.md was used.

This was published (https://arxiv.org/pdf/1910.13461.pdf) in 2019 by Facebook AI, under the MIT License (https://github.com/pytorch/fairseq).

We also used the templates that Kale & Rastogi used in their EMNLP-20 paper, available here: https://github.com/google-research/schema-guided-dialogue/tree/main/generation

For the Acceptability Classification, we used a Pre-trained RoBERTa-Base Model as described/published (and available) here:
https://github.com/pytorch/fairseq/blob/master/examples/roberta/README.md

This was published (https://arxiv.org/pdf/1907.11692.pdf) in 2019 by Facebook AI, under the MIT License (https://github.com/pytorch/fairseq).

 Our self-training and acceptability classifier methods are drawn from two papers under submission; further details will eventually be available in these papers.


### Model Hyperparameters

*Provide the range of hyperparameters that would be required to reproduce your final model (e.g., optimizer used, number of epochs, learning rate, etc.). If hyperparameter search was used, please describe (1) the bounds for each hyperparameter, (2) the number of hyperparameter search trials, (3) the method for choosing hyperparameter values (e.g., uniform sampling, manual tuning, evolutionary optimization, etc.).*

BART-Large Generation/Reconstruction Hyperparameters

Tokenizer: BPE
Tokenizer Max Length: 256
Dropout: 0.3
Encoder/Decoder Embedding Dim: 1024
Optimizer: Adam
LR: 0.000005
Weight Decay: 0.00001
Number of Model Params: 514484225


Acceptability Classifier Roberta-Base Hyperparameters


Tokenizer: BPE
Tokenizer Max Length: 1024
Encoder output dropout: 0.1
Encoder embedding dim: 768
#encoder layers: 12
#encoder attention heads: 12
Decoder dropout: 0
Decoder activation: relu
Optimizer: Adam
Learning rate: 0.000001
Adam betas: [0.9, 0.999]
Weight Decay: 0
#Model Params: 124055810

Acceptability Classifier Data Generation Model Hyperparameters

Beam Size: 5
topk: 3
Mask normal: 0.5
Mask insert: 0.3

### The Hyperparameter specifications for best performing models

Acceptability Classification RoBERTa

In addition to the above hyperparameters, best performing model on the val set had the following unacceptability confidence thresholds at which filtering out took place:


            Dataset                    |     Unacceptability Threshold

            webnlg                     |            0.7

              e2e                         |            0.6

Schema guided dialog      |             0.6

Bounds used to calculate this were: [0.1 - 0.9] with 0.1 step size.


### Dataset Details
*Include relevant training data statistics (e.g., number of samples used, whether some subsets of the dataset were discarded), the training/validation/test splits for the number of samples and any pre-processing steps if used.*

All the GEM End to End, WebNLG and Schema Guided Dialog train set samples were (transformed and then) used for finetuning the (pre-trained) BART-Large generation model.  The data transforms we performed for WebNLG were:   Pre-processed the dataset based on the implicit tree structure ordering from Yang et al. (2020). We additionally sorted siblings by increasing subtree depth, breaking ties by sorting alphabetically on predicate names.  The data transforms we performed for SGD were:   Create inputs with the service name, templatized inputs and five preceding turns of dialog context separated by a separator token Using the Google templates required additionally retrieving the service method call from the original SGD dataset Preceding turns were listed in order, prefixed by “user:” or “sys:”


### Dependencies and External Libraries

*Include a specification of library dependencies*

The following Python Libraries:

PyText, FairSeq, Pandas, Numpy, Json, csv, math, sacrebleu, nltk


### Link to downloadable source code

N/A

### Computing Infrastructure Used

*Describe the computing infrastructure used to train your model (e.g., number of GPUs, GPU type and vRAM) and the time taken to train your final model.*

For dataset transforms: single CPU


For training each generation BART-Large model: 8 GPUs, about 3.5 hours for larger datasets like SGD


For training accuracy classifier RoBERTa-base model: 8 GPUs, data prep + training time is a function of the dataset size, taking upto 2 days on larger datasets like SGD

All experiments were conducted on 32GB Quadro GV100 GPUs. The GPUs are part of a shared distributed cluster, which adds its own time overheads.

### Evaluation Details

*How were your models evaluated? Please include evaluation metric details (including links to code), train/validation/test splits, and model performance on both test and validation sets. If more than one model was trained and evaluated, what was the number of training and evaluation runs, and the variance in scores? If human evaluation was used, please describe the experimental setup.*

We used the BLEU score from the GEM-metrics script to verify that a BART-Base model with no context was slightly better than the T5 baseline on the validation data.  The small increase could be explained by the inclusion of the service name in the input.  Subsequently, we used a different version of BLEU to compare models as the GEM-metrics were not easy to use in our standard computing environment.  We compared BART-Base and BART-Large models with and without templatizing the inputs and with 0, 1 or 5 turns of preceding context, finding that BART-Large with 5 turns of preceding context and templatized inputs worked the best. We then ran 2 rounds of self-training (each round having alternating generation and reconstruction), and observed improvements in the reconstruction match accuracy during this process, even though BLEU scores were either slightly decreased or stayed the same.

When selecting responses using acceptability classifier, we further analyzed the cases where the selected response was different than the one outputted by the generation model, using a 2-way entailment (to establish paraphrases) via Roberta-large-mnli model between target and selected responses as well as target and original responses. We verified that there were more paraphrases in the former compared to the latter, as well as manually looked at a random sample in each case. We noted that BLEU scores were slightly changed (either increased or decreased) when adding the Acceptability Classifier, but the number of paraphrases (generated response w.r.t target response) were increased.
