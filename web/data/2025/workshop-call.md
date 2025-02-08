# GEM2 Workshop: Generation, Evaluation & Metrics - ACL 2025

The fourth iteration of the Generation, Evaluation & Metrics (GEM) Workshop will be held as part of ACL, July 27–August 1st, 2025. This year we’re planning a major upgrade to the workshop, which we dub GEM2, through the introduction of a large-scale prediction benchmark, encouraging researchers from all backgrounds to submit work on meaningful, efficient and robust evaluation of LLMs.

## Overview

Evaluating large language models (LLMs) is challenging. Running LLMs over medium or large scale corpus can be prohibitively expensive; they are consistently shown to be highly sensitive to prompt phrasing, and it is hard to formulate metrics which differentiate and rank different LLMs in a meaningful way. Consequently, the validity of the results obtained over popular benchmarks such as HELM or MMLU, lead to brittle conclusions. We believe that meaningful, efficient, and robust evaluation is one of the cornerstones of the scientific method, and that achieving it should be a community-wide goal.

In this workshop we seek innovative research relating to the evaluation of LLMs and language generation systems in general. This includes, but is not limited to, robust, reproducible and efficient evaluation metrics, as well as new approaches for collecting evaluation data which can help in better differentiating between different systems and understanding their current bottlenecks.

To facilitate and spur research in this field we will publish a large dataset of 1B model predictions together with prompts and gold standard references. This dataset will go beyond reporting just the accuracy of a model on a given sample, and will also include various axes which identify how the prompt was created and which were found to affect performance (instruction template, few-shot examples, their order, delimiters, etc.), as well as any known information about the model (pre training corpora, type of instruction-tuning, different checkpoints, and more), and the annotated gold label. Through this dataset, researchers will be able to investigate key questions such as: Are larger models more robust across different prompting configurations? Are common enumerators (e.g., A/B, 1/2) less sensitive compared to rare ones (e.g., I/IV, #/$)? Which evaluation axes should be prioritized when testing with limited resources? Can we identify patterns distinguishing examples where models show high robustness (consistent answers across configurations) versus low robustness (varying answers)?

We welcome submissions related, but not limited to, the following topics:

*   💎 Automatic evaluation of generation systems (example, example, example)
*   💎 Creating evaluation corpora and challenge sets (example, example, example)
*   💎 Critiques of benchmarking efforts and responsibly measuring progress in LLMs (example, example)
*   💎 Effective and/or efficient NLG methods that can be applied to a wide range of languages and/or scenarios (example, example, example)
*   💎 Application and evaluation of LLMs interacting with external data and tools (example, example, example)
*   💎 Evaluation of sociotechnical systems employing large language models (example)
*   💎 Standardizing human evaluation and making it more robust (example, example, example)

We further invite submissions that conduct in-depth analyses of outputs of existing systems, for example through error analyses, by applying new metrics, or by testing the system on new test sets. While we encourage the use of the infrastructure the organizing team has developed as part of the GEM benchmark, its use is not required.

If you are interested, you can check out last year's workshop websites from ACL 2021, EMNLP 2022, and EMNLP 2023.

## Industrial Track - Unleashing the Power of NLP: Bridging the Gap between Academia and Industry

Following the success of last iterations, GEM2 will hold an Industrial Track, which aims to provide actionable insights to industry professionals and to foster collaborations between academia and industry. This track will address the unique challenges faced by non-academic colleagues, highlighting the differences in evaluation practices between academic and industrial research, and explore the challenges in evaluating generative models with real-world data.

The Industrial Track invites submissions covering the following topics, including (but not limited to):

*   💎 Breaking Barriers: Bridging the Gap between Academic and Industrial Research (example)
*   💎 From Data Diversity to Model Robustness: Challenges in Evaluating Generative Models with Real-World Data (example)
*   💎 Beyond Metrics: Evaluating Generative Models for Real-World Business Impact (example, example, example)

## How to submit?

Submissions can take either of the following forms:

*   💎 **Archival Papers** describing original and unpublished work can be submitted in a between 4 and 8 page format.
*   💎 **Non-Archival Abstracts** To discuss work already presented or under review at a peer-reviewed venue, we allow the submission of 2-page abstracts.

All submissions are allowed unlimited space for references and appendices and should conform to ACL 2025 style guidelines. Archival paper submissions must be anonymized while abstract submissions may include author information. Final versions of accepted papers will be allowed 1 additional page of content so that reviewer comments can be taken into account.

Papers should be submitted directly through OpenReview, selecting the appropriate track. We additionally welcome presentations by authors of papers in the Findings of the ACL. The selection process is managed centrally by the workshop chairs for the conference and we thus cannot respond to individual inquiries about Findings papers. However, we will try our best to accommodate authors’ requests.

## Important Dates

Note: For any questions, please email gem-benchmark-chairs@googlegroups.com.

**Paper Submission Dates**

*   📅 **April 11:** Direct paper submission deadline (ARR).
*   📅 **May 5:** Pre-reviewed (ARR) commitment deadline.
*   📅 **May 19:** Notification of acceptance.
*   📅 **June 6:** Camera-ready paper deadline.
*   📅 **July 7:** Pre-recorded videos due.
*   📅 **July 31 - August 1:** Workshop at ACL in Vienna.