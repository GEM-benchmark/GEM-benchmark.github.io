---
title: 'SimpleNER'
type: 'Shared Task 2021'
background: 'Finetuned Transformer architecture for simplification.'
---

## Table of Contents

[Leave this blank, we autogenerate this section and overwrite content]

## Model Description

- **Paper:** [SimpleNER Sentence Simplification System for GEM 2021](https://aclanthology.org/2021.gem-1.14/)
- **Creators:** K V Aditya Srivatsa, Monil Gokani, Manish Shrivastava
- **Point of Contact:** K V Aditya Srivatsa (k.v.aditya@research.iiit.ac.in)

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

1. WikiLarge Training data (Zhang and Lapata, 2017) (https://github.com/XingxingZhang/dress):
    - Aligned complex-simple sentence pairs: 296,402
    - Created by aggregating several simplification corpora: Kauchak (2013), Woodsend and Lapata (2011), and the WikiSmall dataset (Zhu, 2010)
    - Languages: English
    - Licensing: The MIT License (MIT) Copyright © 2018 Zalando SE

2. FastText pretrained word-vectors (Mikolov et. al., 2018) (https://dl.fbaipublicfiles.com/fasttext/vectors-english/wiki-news-300d-1M.vec.zip):
    - 1 million word vectors trained on Wikipedia 2017, UMBC webbase corpus and statmt.org news dataset (16B tokens).
    - Language: English
    - License: Creative Commons Attribution-Share-Alike License 3.0.

3. Flair Ontonotes NER Tagger (Schweter and Akbik, 2020) (https://github.com/flairNLP/flair):
    - Uses train, development and test sets of CoNLL 2012 shared task for coreference resolution (Pradhan et al., 2012)
    - Language: English
    - License: The MIT License (MIT) Copyright © 2018 Zalando SE


### Training Process

*Describe the training or fine tuning setup, including whether the final model was trained on a single task or in a multi-task setting. If a data augmentation technique was used, describe the technique*

The transformer model is trained (single-task) from scratch on the ~290k sentence pairs from the WikiLarge corpus (already having the named-entities replaced by special tokens), with pre-trained FastText embeddings loaded.

1. Named-Entity tagging:
Instances of named entities identified by Flair’s Ontonotes model, occurring on the complex half of the data, are replaced by respective special tokens:

Eg. New York --> LOC (tag predicted by NER model) --> LOC@1 (‘New York’ replaced by unique tag, while the respective token-tag mapping is saved sentence-wise for de-tagging after output generation)

2. Adding Control Tokens:
Once the sentence pairs have been pruned and NER-tagged, four control attributes (Martin et. al., 2020) (https://arxiv.org/pdf/1910.02677) are calculated between each of the complex and simple sentence pairs:
    - Compression Ratio: Simple ratio between token lengths of the simple and complex sentences. (recorded as: <NbChars_x.xx>)
    - Levenshtein Distance: Normalised character level Levenshtein distance between the complex and simple sentence. (recorded as: <LevSim_x.xx> )
    - Word Rank: Ratio of the average of the third-quartile log ranks of the words (excluding stopwords and special tokens) in the simple and complex sentence (extracted from the order of FastText word embeddings being used for training). (recorded as: <WordRank_x.xx>)
    - Dependency Tree Depth: Ratio of the maximum dependency tree depth of the simple and complex sentence. (recorded as: <DepTreeDepth_x.xx>)

Eg.
Complex: it is particularly famous for the cultivation of kiwifruit .
Simple: it is mostly famous for the growing of kiwifruit .

Rewriting complex:
<NbChars_0.8> <LevSim_0.76> <WordRank_0.79> it is particularly famous for the cultivation of kiwifruit .

### Real-World Use
*Describe a possible real-use application of your model, then choose one of the steps (e.g. choice of the pre-trained model, data source, data augmentation, training loss, etc.) above and describe a negative impact it may have on the user experience*

Text Simplification has always found crucial importance in making it easier for people with cognitive disabilities such as aphasia, dyslexia and autism, to read and understand text. Additionally, it proves helpful for second language learners, especially in public service centres such as airports or health clinics. A model such as ours can be utilized to produce point-to-point simplifications for such people, and therefore must be made more accessible, but more importantly, must be made more reliable and faithful in terms of the original information/ message it must convey.  Even with nearly 300k aligned sentence pairs, train sets such as WikiLarge fail to help large transformer models being trained from scratch to generalize well,  which causes them to suffer from data sparsity, which can be observed with words in the vocabulary having very high word ranks (ordered by frequency), such as named entities. We attempted to mitigate this issue by replacing the named entities in our data with (18) special tokens before training, which are promptly replaced back with the original tokens. This helps to reduce the model vocabulary, and allows for greater generalization.  Although this step is beneficial to the overall performance of the model, it also brings with it a negative effect. The idea of replacing NEs is based on the assumption that such tokens or phrases need not be modified or deleted during the task of simplification. Although this is true for the most part when it comes to evaluation sets like the TurkCorpus and ASSET, potentially complex named entities need to be simplified or elaborated upon in real life uses, especially if the use involves second language learners or people with reading disabilities.  Eg. Consider an input statement as “Counters 3-6 are reserved for Commissioned Military Personnel.” Ideally, a simplified sentence should read something along the lines of “Counters 3-6 may be used only by army officers.” However, since Commissioned Military Personnel would be excluded from the simplification process by virtue of being a named entity, this simplification would not take place.

### Measuring Impact

*Propose a method to test the magnitude of the impact identified in your previous answer*

Gauging the need for elaboration or replacement of a named entity in a sentence requires a strong proficiency in the parent language and at least some knowledge of the named entity itself. Therefore this task is best suited for manual evaluation where annotators must be asked to rate the simplification upon how well were the constituent named entities simplified or elaborated. This can be done using a simple Likert-scale.

However, as manual evaluation is slow and resource intensive, there is a need for automated evaluation methods to approximate human judgment. A possible way to quantify the need for replacement or elaboration of named entities is the average similarity the NE holds to the other words in the sentence. If a NE with a high word rank shows very little similarity to the words in the sentence, it is likely that the sentence does not attempt to elaborate/ explain the NE. On the other hand, a high average similarity indicates that there are other words in the sentence that are related to the NE, and are most likely being used to elaborate upon the NE. A simple formulation of this measure can be the product of the word rank of the NE and its average similarity with other words in the sentence. Still, there is clearly a need for more nuanced methods of evaluation for text simplification, which capture the performance of a model on such attributes and expected operations.

## Reproducibility

*In this section, we ask you to provide any information that would be required for someone to reproduce your model and experimental results. These questions are derived from the suggested model card in [1] and the reproducibility checklist in [2].*

*[1] Dodge, Jesse, et al. "Show Your Work: Improved Reporting of Experimental Results." EMNLP. 2019.*

*[1] Mitchell et al. "Model cards for model reporting." Proceedings of the conference on fairness, accountability, and transparency. 2019.*

### Model Description

*Provide basic information about your model, including (1) the model type (e.g., BART, Pointer Network), (2) model version/date if multiple versions are available, (3) training algorithms used. Please cite papers or other resources where further information about the model can be found. Also include the model license and citation details.*

 - Model architecture: Transformer (Vaswani et. al., 2017) (Facebook’s FairSequence Implementation)
 - Encoder and decoder layers: 6
 - Encoder and decoder attentions heads: 6
 - Encoder and decoder embedding dimensionality: 300
 - Encoder and decoder fully-connected layer dimensionality: 2048
 - Training Algorithm: Fairseq task set to ‘translation’. Complex and simple sentence pairs set as source and target language pairs for translation.
 - Version: fairseq@v0.10.0 (https://github.com/pytorch/fairseq@v0.10.0)

 - Model architecture citation:
	@article{DBLP:journals/corr/VaswaniSPUJGKP17,
	  author    = {Ashish Vaswani and
	               Noam Shazeer and
        	       Niki Parmar and
        	       Jakob Uszkoreit and
        	       Llion Jones and
        	       Aidan N. Gomez and
        	       Lukasz Kaiser and
        	       Illia Polosukhin},
	  title     = {Attention Is All You Need},
	  journal   = {CoRR},
  	  volume    = {abs/1706.03762},
 	  year      = {2017},
  	  url       = {http://arxiv.org/abs/1706.03762},
  	  archivePrefix = {arXiv},
  	  eprint    = {1706.03762},
  	  timestamp = {Sat, 23 Jan 2021 01:20:40 +0100},
  	  biburl    = {https://dblp.org/rec/journals/corr/VaswaniSPUJGKP17.bib},
  	bibsource = {dblp computer science bibliography, https://dblp.org}
	}

 - Model implementation citation:
	@inproceedings{ott2019fairseq,
  	  title = {fairseq: A Fast, Extensible Toolkit for Sequence Modeling},
  	  author = {Myle Ott and Sergey Edunov and Alexei Baevski and Angela Fan and Sam Gross and Nathan Ng and David Grangier and Michael Auli},
  	  booktitle = {Proceedings of NAACL-HLT 2019: Demonstrations},
 	  year = {2019},
	}

 - Model implementation license: The MIT License (MIT) Copyright © 2018 Zalando SE (https://github.com/pytorch/fairseq/blob/master/LICENSE)


### Model Hyperparameters

*Provide the range of hyperparameters that would be required to reproduce your final model (e.g., optimizer used, number of epochs, learning rate, etc.). If hyperparameter search was used, please describe (1) the bounds for each hyperparameter, (2) the number of hyperparameter search trials, (3) the method for choosing hyperparameter values (e.g., uniform sampling, manual tuning, evolutionary optimization, etc.).*

Number of epochs, learning rate, optimizer, dropout, number of warmup updates. (No hyperparameter search was used)

### The Hyperparameter specifications for best performing models

 - Number of epochs: 20 (best checkpoint: epoch_13)
 - Learning rate: 0.00011
 - Optimizer: adam (betas: (0.9, 0.999) ; eps: (1e-8))
 - Dropout: 0.2
 - Warmup updates: 4000


### Dataset Details
*Include relevant training data statistics (e.g., number of samples used, whether some subsets of the dataset were discarded), the training/validation/test splits for the number of samples and any pre-processing steps if used.*

1. Training Dataset: WikiLarge (Zhang and Lapata, 2017) train set  - Aligned complex-simple sentence pairs: 296,402  - Link: https://github.com/XingxingZhang/dress  2. Validation and Testing Datasets:     a. TurkCorpus (Xu et. al., 2016) (https://gem-benchmark.com/data_cards/TURK):         i. Test split: 359 complex sentences each with 8 different simplifications.         ii. Validation split: 2000 complex sentences each with 8 different simplifications.     b. ASSET (Alva-Manchego et. al., 2020) (https://gem-benchmark.com/data_cards/ASSET):          i. Test split: 359 complex sentences each with 10 different simplifications.         ii. Validation split: 2000 complex sentences each with 10 different simplifications.  3. Preprocessing:  - All three (train, validation and test) data splits were converted to lowercase.  - For train set (WikiLarge):      - Sentence pairs with either instance having token length lower than 3 were removed.      - Sentence pairs with compression ratio (len(target)/len(source)) out of the closed bounds [0.2, 1.5] were removed.  - For all three data splits, flair’s ontonotes NER tagger (https://github.com/flairNLP/flair) was used to replace all detectable named entities with respective special tokens (see system description) for training.


### Dependencies and External Libraries

*Include a specification of library dependencies*

 - torch==1.7.0
 - fairseq (git+https://github.com/pytorch/fairseq@v0.10.0)
 - easse (git+https://github.com/feralvam/easse.git)
 - datasets (datasets@git+https://github.com/huggingface/datasets.git@a5e45816a72fbb20dc9122f88238ef8acba43ee3)
 - flair
 - numpy==1.20.3
 - spacy ; en_core_web_sm
 - nltk ; stopwords
 - Levenshtein
 - wget

(Included in the install script of the code repository.)


### Link to downloadable source code

https://github.com/kvadityasrivatsa/gem_2021_simplification_task

### Computing Infrastructure Used

*Describe the computing infrastructure used to train your model (e.g., number of GPUs, GPU type and vRAM) and the time taken to train your final model.*

 - Number of GPUs: 4
 - Type of GPUs: Nvidia GeForce GTX 1080 Ti
 - vRAM: 64GB
 - Time taken for training (for 20 epochs): ~27 hours

### Evaluation Details

*How were your models evaluated? Please include evaluation metric details (including links to code), train/validation/test splits, and model performance on both test and validation sets. If more than one model was trained and evaluated, what was the number of training and evaluation runs, and the variance in scores? If human evaluation was used, please describe the experimental setup.*

The model was trained on the WikiLarge corpus and evaluated on the validation and test sets of TurkCorups (Xu et. al., 2016) (https://gem-benchmark.com/data_cards/TURK) & (https://huggingface.co/datasets/turk) as well as the ASSET (Alva-Manchego et. al., 2020) (https://gem-benchmark.com/data_cards/ASSET) & (https://huggingface.co/datasets/asset) dataset. The evaluation metrics used were BLEU (Papineni et. al., 2002) and SARI (Xu et. al., 2016), with the best model checkpoint chosen according to the respective SARI score on the validation sets. The evaluation for both metrics were carried out using the EASSE (Alva-Manchego et. al., 2019) package (link: https://github.com/feralvam/easse).

Model Performance (on automatic metrics BLEU and SARI):
 - on ASSET-test | BLEU: 66.722 | SARI: 38.922
 - on ASSET-validation | BLEU: 73.935 | SARI: 37.588
 - on TurkCorpus-test | BLEU: 67.667 | SARI: 39.695
 - on TurkCorpus-validation | BLEU: 75.672 | SARI: 39.407
