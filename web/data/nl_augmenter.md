The NL-Augmenter is a collaborative effort intended to add transformations of datasets dealing with natural language. Transformations augment text datasets in diverse ways, including: introducing spelling errors, translating to a different language, randomizing names and numbers, paraphrasing, changing the style ... and whatever creative augmentation you contribute. We invite submissions of transformations to this framework by way of a [GitHub](https://github.com/GEM-benchmark/NL-Augmenter) pull request, through September 1, 2021. **All submitters of accepted transformations (and filters) will be included as co-authors on a paper announcing this framework**.

The framework is hosted as a [GitHub repository](https://github.com/GEM-benchmark/NL-Augmenter). The organizers can be contacted at nl-augmenter@googlegroups.com.

**Submission timeline**

`August 5, 2021` Early Should-Out Date - Should your PR be accepted and merged before this date, we will give you an additional shoutout at our talk at the [ACL GEM workshop](https://gem-benchmark.com/workshop)."

`September  1, 2021` Pull request must be opened to be eligible for inclusion in the framework and associated paper

`September 22, 2021` Review process for pull request above must be complete

A transformation can be revised between the pull request submission and pull request merge deadlines. We will provide reviewer feedback to help with the revisions.

The transformations which are already accepted to NL-Augmenter are summarized in [this table](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/transformations/README.md). Transformations undergoing review can be seen as [pull requests](https://github.com/GEM-benchmark/NL-Augmenter/pulls).

## Motivation
Natural Language Transformation or Augmentation comprises methods for increasing the variety of training data for natural language tasks without having to manually collect additional examples. Most strategies either modify existing data, called transformations, or create synthetic data, for example through counterfactual data augmentation, with the aim of having the extended data act as a regularizer to reduce overfitting or biases when training ML models. However, the space of natural language is discrete and simple perturbations cannot capture the entirety and complexity of natural language phenomena.
Due to this complexity, we all need to work together to ensure that datasets can be properly evaluated. Toward this goal, NL-Augmenter seeks to gather transformations, perturbations, and filters which can generate additional data to serve for training or to test model robustness. Following the success of open collaborative efforts like [BIG-bench](https://github.com/google/BIG-bench) and [many](https://arxiv.org/pdf/2010.02353.pdf) others, we invite submissions via a participant driven repository.

## Task Specificity
NLP tasks often radically differ in their linguistic properties of interest — changing the word “happy” to “very happy” in an input is more relevant for sentiment analysis than for summarization. However, many transformations and filters are relevant to many datasets and hence NL-Augmenter is designed to be flexible enough to encourage [format specific](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/interfaces) transformations. Such a mechanism also enables quick and rapid testing of transformations over models (and datasets) which share similar formats. 

## Publication of transformations

A paper will be written describing the framework and analyzing the performance of common NLP models. All submitters of accepted contributions will be invited to be co-authors on this paper. The framework itself will provide a final artifact, which we hope will prove useful for data augmentation and generating evaluation suites to evaluate robustness of models. 

## Submission review process

Transformations will be subject to a lightweight, public, and non-anonymous review process. Communication will be via discussion on the transformation's pull request. Reviews will focus on technical correctness and completeness, basic clarity of the proposal, and whether the transformation plausibly generates what it aims to generate.

Each transformation will receive two reviews and the transformation may be edited in response to the reviews. Final decisions will then be made by a meta-review committee. Authors of transformation submissions may be asked to join the reviewer pool after their own transformation is accepted.
Check the review criteria on our [GitHub page](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/docs/doc.md#review-criteria-for-submissions).

## Organization

- Kaustubh Dhole (Amelia R&D)
- Sebastian Gehrmann (Google Research)
- Jascha Sohl-Dickstein (Google Brain)
- Varun Prashant Gangal (LTI, Carnegie Mellon University)
- Tongshuang Wu (University of Washington)
- Simon Mille (Universitat Pompeu Fabra) 
- Zhenhao Li (Imperial College, London)
- Aadesh Gupta (Amelia R&D)
- Samson Tan (National University of Singapore & Salesforce Research)
- Saad Mahmood (Trivago R&D)
- Ashish Shrivastava (Amelia R&D)
- Ondrej Dusek (Charles University)
- Jinho D. Choi (Emory University)
