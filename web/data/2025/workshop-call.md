# GEM2 Workshop: Generation, Evaluation & Metrics - ACL 2025

The fourth iteration of the Generation, Evaluation & Metrics (GEM) Workshop will be held as part of [ACL](https://2025.aclweb.org/), July 27–August 1st, 2025. This year we’re planning a major upgrade to the workshop, which we dub GEM2, through the introduction of large-scale prediction benchmarks ([DOVE](https://slab-nlp.github.io/DOVE/), [DataDecide](https://huggingface.co/datasets/allenai/DataDecide-eval-instances)), encouraging researchers from all backgrounds to submit work on meaningful, efficient and robust evaluation of LLMs. The workshop will also host the [ReproNLP shared task on reproducibility of evaluations in NLP](https://repronlp.github.io/), with a presentation of (i) the task and results overview by the organisers, and (ii) the results of the individual reproductions by the participants.

## Overview

Evaluating large language models (LLMs) is challenging. Running LLMs over medium or large scale corpus can be prohibitively expensive; they are consistently shown to be highly sensitive to prompt phrasing, and it is hard to formulate metrics which differentiate and rank different LLMs in a meaningful way. Consequently, the validity of the results obtained over popular benchmarks such as [HELM](https://arxiv.org/abs/2211.09110) or [MMLU](https://arxiv.org/pdf/2009.03300v3), lead to brittle conclusions ([Sclar er al., 2024](https://arxiv.org/pdf/2310.11324), [Mizrahi et al., 2024](https://aclanthology.org/2024.tacl-1.52/), [Alzahrani et al., 2024](https://arxiv.org/pdf/2402.01781v2)). We believe that meaningful, efficient, and robust evaluation is one of the cornerstones of the scientific method, and that achieving it should be a community-wide goal.

In this workshop we seek innovative research relating to the evaluation of LLMs and language generation systems in general. This includes, but is not limited to, robust, reproducible and efficient evaluation metrics, as well as new approaches for collecting evaluation data which can help in better differentiating between different systems and understanding their current bottlenecks.

To facilitate and spur research in this field we publish two large datasets of model predictions together with prompts and gold standard references: [DOVE](https://slab-nlp.github.io/DOVE/) and [DataDecide](https://huggingface.co/datasets/allenai/DataDecide-eval-instances). These datasets go beyond reporting just the accuracy of a model on a given sample, and also include various axes which identify how the prompt was created and which were found to affect performance (instruction template, few-shot examples, their order, delimiters, etc.), as well as any known information about the model (pre training corpora, type of instruction-tuning, different checkpoints, and more), and the annotated gold label. Through this dataset, researchers will be able to investigate key questions such as: Are larger models more robust across different prompting configurations? Are common enumerators (e.g., A/B, 1/2) less sensitive compared to rare ones (e.g., I/IV, #/$)? Which evaluation axes should be prioritized when testing with limited resources? Can we identify patterns distinguishing examples where models show high robustness (consistent answers across configurations) versus low robustness (varying answers)?

We welcome submissions related, but not limited to, the following topics:

*   💎 Automatic evaluation of generation systems ([Wang et al., 2021](https://aclanthology.org/2021.gem-1.8/), [Tanprasert and Kauchak, 2021](https://aclanthology.org/2021.gem-1.1/), [Popović et al., 2022](https://aclanthology.org/2022.gem-1.26/)).
*   💎 Creating evaluation corpora and challenge sets ([Kerutzer et al., 2022](https://aclanthology.org/2022.tacl-1.4/), [Mille et al., 2021](https://openreview.net/forum?id=CSi1eu_2q96), [Chuklin et al., 2022](https://aclanthology.org/2022.gem-1.6/)).
*   💎 Critiques of benchmarking efforts and responsibly measuring progress in LLMs ([Ethayarajh and Jurafsky, 2020](https://aclanthology.org/2020.emnlp-main.393/), [Raji et al., 2021](https://openreview.net/forum?id=j6NxpQbREA1)).
*   💎 Effective and/or efficient NLG methods that can be applied to a wide range of languages and/or scenarios ([Liu et al., 2020](https://aclanthology.org/2020.tacl-1.47/), [DeLucia et al., 2021](https://aclanthology.org/2021.gem-1.16/), [Pernes et al., 2022](https://aclanthology.org/2022.gem-1.1/)).
*   💎 Application and evaluation of LLMs interacting with external data and tools ([Schick et al., 2023](https://arxiv.org/abs/2302.04761), [Lu et al., 2023](https://arxiv.org/abs/2304.09842), [Mialon et al., 2023](https://arxiv.org/abs/2302.07842)).
*   💎 Evaluation of sociotechnical systems employing large language models ([Weidinger et al., 2022](https://dl.acm.org/doi/abs/10.1145/3531146.3533088)).
*   💎 Standardizing human evaluation and making it more robust ([Freitag et al., 2021](https://aclanthology.org/2021.tacl-1.87/), [Saldías Fuentes et al., 2022](https://aclanthology.org/2022.humeval-1.7/), [Mousavi et al., 2022](https://aclanthology.org/2022.gem-1.12/)).

We further invite submissions that conduct in-depth analyses of outputs of existing systems, for example through error analyses, by applying new metrics, or by testing the system on new test sets. While we encourage the use of the infrastructure the organizing team has developed as part of the [GEM benchmark](https://arxiv.org/abs/2206.11249), its use is not required.

If you are interested, you can check out last year's workshop websites from [ACL 2021](https://gem-benchmark.com/workshop/2021), [EMNLP 2022](https://gem-benchmark.com/workshop/2022), and [EMNLP 2023](https://gem-benchmark.com/workshop/2023).

## Industrial Track - Unleashing the Power of NLP: Bridging the Gap between Academia and Industry

Following the success of last iterations, GEM2 will hold an Industrial Track, which aims to provide actionable insights to industry professionals and to foster collaborations between academia and industry. This track will address the unique challenges faced by non-academic colleagues, highlighting the differences in evaluation practices between academic and industrial research, and explore the challenges in evaluating generative models with real-world data.

The Industrial Track invites submissions covering the following topics, including (but not limited to):

*   💎 Breaking Barriers: Bridging the Gap between Academic and Industrial Research ([Dahlmeier 2017](https://aclanthology.org/P17-2015)).
*   💎 From Data Diversity to Model Robustness: Challenges in Evaluating Generative Models with Real-World Data ([Heidari et al., 2021](https://aclanthology.org/2021.sigdial-1.8/)).
*   💎 Beyond Metrics: Evaluating Generative Models for Real-World Business Impact ([Strubell et al., 2019](https://arxiv.org/abs/1906.02243), [Hovy et al., 2016](https://aclanthology.org/P16-2096), [Howell et al., 2023](https://arxiv.org/abs/2306.07402)).

## ReproNLP
Make sure your paper was validated by the ReproNLP organisers, and that you select the appropriate track on OpenReview. Further details will be provided at a later stage.

## How to submit?

Submissions can take either of the following forms:

*   💎 **Archival Papers (with no ARR reviews available)** describing original and unpublished work can be submitted in a between 4 and 8 page format.
*   💎 **ARR-Reviewed Archival Papers** describing original and unpublished work that already has ARR reviews can be submitted in a between 4 and 8 page format.
*   💎 **Non-Archival Abstracts** To discuss work already presented or under review at a peer-reviewed venue, we allow the submission of 2-page abstracts.

All submissions are allowed unlimited space for references and appendices and should conform to [ACL 2025 style guidelines](https://2025.aclweb.org/calls/main_conference_papers/#paper-submission-details). Archival paper submissions must be anonymized while abstract submissions may include author information. Final versions of accepted papers will be allowed 1 additional page of content so that reviewer comments can be taken into account.

Pre-reviewed ARR papers should be submitted by filling <a href="https://docs.google.com/forms/d/e/1FAIpQLSdDUoxvdwKgwv6mOsxL7aFJ3InkyHxkPugicbnj1wbm9lSngg/viewform?usp=dialog" > this short form </a>. Papers to be reviewed should be submitted directly through [OpenReview](https://openreview.net/group?id=aclweb.org/ACL/2025/Workshop/GEM), selecting the appropriate track. **We additionally welcome presentations by authors of papers in the Findings of the ACL**. The selection process is managed centrally by the workshop chairs for the conference and we thus cannot respond to individual inquiries about Findings papers. However, we will try our best to accommodate authors’ requests.

## Important Dates

Note: For any questions, please email gem-benchmark-chairs@googlegroups.com.

**Paper Submission Dates**

*   📅 **April 11:** Direct paper submission deadline (ARR).
*   📅 ~~May 5~~ **May 17:** Pre-reviewed (ARR) commitment deadline.
*   📅 ~~May 19~~ **May 25:** Notification of acceptance.
*   📅 ~~June 6~~ **June 12:** Camera-ready paper deadline.
*   📅 **July 7:** Pre-recorded videos due.
*   📅 **July 31 - August 1:** Workshop at ACL in Vienna.

## Organizers
* Ofir Arviv, IBM Research
* Miruna Clinciu, Heriot Watt University
* Kaustubh Dhole, Emory University
* Rotem Dror, University of Haifa
* Sebastian Gehrmann, Bloomberg
* Eliya Habba, Hebrew University of Jerusalem
* Itay Itzhak, Hebrew University of Jerusalem
* Yotam Perlitz, IBM Research
* Simon Mille, Dublin City University
* Enrico Santus, Bloomberg
* Michal Shmueli Scheuer, IBM Research
* João Sedoc, New York University
* Gabriel Stanovsky, Hebrew University of Jerusalem
* Oyvind Tafjord, Allen Institute for Artificial Intelligence
