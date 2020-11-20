
---
title: 'CommonGen'
type: data-to-text
---

# Dataset Card for CommonGen

## Dataset Description

CommonGen is a constrained text generation task, associated with a benchmark dataset, to explicitly test machines for the ability of generative commonsense reasoning. Given a set of common concepts; the task is to generate a coherent sentence describing an everyday scenario using these concepts.

The dataset was introduced in the paper [CommonGen: A Constrained Text Generation Challenge for Generative Commonsense Reasoning](https://arxiv.org/abs/1911.03705) published in the Findings of EMNLP 2020. It was built by selecting concept sets and corresponding training sentences from a set of image and video captioning datasets, and having Amazon Mechanical Turk crowd workers write additional sentences to provide references for the development and test set.

## Data Characteristics

### Tasks Supported

The proposed task is a data-to-text generation task. The creators maintain a [**leaderboard**](https://inklab.usc.edu/CommonGen/leaderboard.html) which ranks model submission based on their [*SPICE*](https://arxiv.org/abs/1607.08822) score to the references (and also records BLEU-4, METEOR, and CIDEr).

The data can be requested from the authors via a form accessible on their [website](https://inklab.usc.edu/CommonGen/index.html), or downloaded through the Hugging Face [datasets library](https://huggingface.co/datasets/common_gen). The authors maintain a [GitHub repository](https://github.com/INK-USC/CommonGen) with useful scripts.

### Languages
 CommonGen contains English text (BCP-47: en)

### Personal and sensitive information

The sentences in the dataset were either selected from the source image and video captioning datasets or written by crowd-workers to describe generic concepts and do not contain any personal or sensitive information.

### Data Statistics

#### Data Sizes

Each example in the dataset consists in a set of 3 to 5 concepts denoted by a single noun, verb, or adjective (the input), and a sentence using these concepts (the output). The dataset provides several such sentences for each such concept.

|                           | Train  | Dev   | Test  |
|---------------------------|--------|-------|-------|
| **Total concept-sets**    | 32,651 | 993   | 1,497 |
| **Total sentences**       | 67,389 | 4,018 | 6,042 |
|**Average sentence length**| 10.54  | 11.55 | 13.34 |

#### Data Split

The dev and test set were created by sampling sets of concepts of size 4 or 5 (and as many of size 3 for the dev set) present in the source captioning datasets and having crowd-workers write reference sentences using these concepts.

Conversely, the training set has more concept sets of size 3 than of size 4 and 5, and uses the original captions from the source datasets as references.

The authors also ensured that the training, dev and test set have different combinations of unique concepts to ensure compositionality (details in [Table 1](https://arxiv.org/pdf/1911.03705v3.pdf)).

## Dataset Creation

The dataset re-uses data from the following pre-existing resources:

- Image captioning datasets:
-- [Flickr30k](https://www.mitpressjournals.org/doi/abs/10.1162/tacl_a_00166)
-- [MSCOCO](https://link.springer.com/chapter/10.1007/978-3-319-10602-1_48)
-- [Conceptual Captions](https://www.aclweb.org/anthology/P18-1238/)
- Video captioning datasets:
--[LSMDC](https://link.springer.com/article/10.1007/s11263-016-0987-1)
--[ActivityNet](https://openaccess.thecvf.com/content_iccv_2017/html/Krishna_Dense-Captioning_Events_in_ICCV_2017_paper.html)
--[VaTeX](https://openaccess.thecvf.com/content_ICCV_2019/html/Wang_VaTeX_A_Large-Scale_High-Quality_Multilingual_Dataset_for_Video-and-Language_Research_ICCV_2019_paper.html)

We refer the reader to the papers describing these sources for further information.

#### Curation rationale

The dataset creators selected sets of concepts that appeared in image and video captions (as identified by a POS tagger) to ensure that a likely real-world scenario including the set could be imagined and constructed. Section 3.1 of the [paper](https://arxiv.org/pdf/1911.03705v3.pdf) describes a sampling scheme which encourages diversity of sets while selecting common concepts.

The dev and test set sentences were created by Amazon Mechanical Turk crowd workers. The workers were shown an example generation and a set of 4 or 5 concept names along with their part-of-speech and asked to write:
1. One sentence mentioning all of the concepts
2. A rationale explaining how the sentence connects the concept

A screenshot of the interface is provided in Figure 7 of the [Appendix](https://arxiv.org/pdf/1911.03705v3.pdf).

During the data collection, workers who provided too short rationales, failed to have good coverage of the input in their sentences, or workers whose output had a high perplexity under a GPT-2 model were disqualified from the pool and replaced with newcomers.
 
#### Who are the dataset curators?

The dataset was created by a team comprising members of the University of Southern California, the Allen Institute for Artificial Intelligence, and the University of Washington. The paper does not give funding information.

#### Who are the language producers (who wrote the text / created the base content)?

No demographic or compensation information for the AMT workers is provided in the dataset paper.

#### Notes on possible biases

The dataset is created using data from image captioning systems and might inherit some of the social biases represented therein (see e.g. [Tang et al. 2020](https://arxiv.org/abs/2006.08315)).  

The use of GPT-2 to validate development ant test sentences [might be cause for similar concern](https://www.aclweb.org/anthology/D19-1339.pdf), but we do note that the authors only use the model to discount very high perplexity sequences which is less likely to surface those biases.

## Tutorials for the data we should include

- The following script shows how to download and load the data, fine-tune, and evaluate a model using the ROUGE, BLEU, and METEOR metrics: [GEM sample script](https://github.com/GEM-benchmark/GEM-baseline-models/blob/main/examples/GEM-common_gen.ipynb).
