Shared Task - GEM 2024
======================

General information
-------------------

Our **[pre-registration form](https://nyustern.az1.qualtrics.com/jfe/form/SV_8qRqfdN3qBy3Bqe)** is now available. Although this step is needed in order to receive the test data, submission will NOT be mandatory, so don't hesitate to fill in the form and play with the data! And if you do, please make sure you record the details of your experiments since you will be asked to write one model card per submission.

This year, the GEM shared task features two main tasks: **Data-to-text generation** and **Summarization**, with a special emphasis on multilinguality; furthermore, no training data is provided, and the test data includes previously unpublished test sets; data illustrations are provided in [this online document](https://docs.google.com/document/d/1xaGRNl-f6aOH7GWZCOwb745rGvBu-Mz7FtTyvOSmqBM/edit?usp=sharing).

Data-to-text Task
------------------------

The data-to-text task consists in generating texts from input triple sets in the WebNLG fashion, where each triple is made of Subject | Property | Object. There are two subtasks:

*   **Subtask 1: WebNLG-based (D2T-1)**: we use the official WebNLG test set (1,779 inputs) for the “seen” subtask; even though the WebNLG test set contains properties and entities not seen in the training/dev data, we consider the whole WebNLG dataset as seen since all splits (training/dev/test) have been available online for 3 years. The dataset contains 220 different properties; the original dataset specifications can be found on the [WebNLG website](https://synalp.gitlabpages.inria.fr/webnlg-challenge/challenge_2020/).
*   **Subtask 2: Wikidata-based (D2T-2)**: we use new triple sets compiled from Wikidata (i.e. new properties and entities, 1,800 inputs) for the “unseen” subtask. The dataset contains 74 different properties, none of which were in WebNLG; more information about the Wikidata-based inputs can be found in [this paper](https://aclanthology.org/2023.mmnlg-1.5.pdf)

For each subtask, there are 3 parallel datasets (see examples [here](https://docs.google.com/document/d/1xaGRNl-f6aOH7GWZCOwb745rGvBu-Mz7FtTyvOSmqBM/edit?usp=sharing)):

*   **Dataset 1: Factual (FA)**: we use the triples as found in the WebNLG data and on Wikidata.
*   **Dataset 2: Counterfactual (CFA)**: entities in the factual dataset are switched based on their class (e.g. a person entity is replaced by another person entity, a date by another date, etc.).
*   **Dataset 3: Fictional (FI)**: entities in the factual datasets are replaced by made up entities (obtained via LLM prompting).

**Data and languages:** No training or development data is provided, only test data (2 sets of 3 test files); to get access to the test data, please pre-register using the link at the top of the page. We accept submissions of outputs in the following languages: English (en), Chinese (zh), German (de), Russian (ru), Spanish (es), Korean (ko), Hindi (hi), Swahili (sw), Arabic (ar). For both subtasks, a subset of the data/languages will be selected for human evaluation based on the number of submissions we receive for each language.

**DISCLAIMER:** This dataset contains counterfactual and fictional data, so it is possible that in some (rare) cases, the resulting data could be judged offensive. In the counterfactual dataset for instance, real person names, roles, dates, locations etc. are switched, which can result in some unfortunate combinations; e.g. a work or a person can end up being associated with Adolf Hitler as author, employee, spouse… In the fictional dataset, entity names are made up by a language model and in theory cannot have the same form as existing known entities, but we cannot ensure that no entity will have a label that one could consider offensive.

**Submissions:** Please submit your model outputs [here (to be communicated soon)](TOUPDATE). Each team is expected to submit outputs for the 3 datasets of the subtask(s) they participate in, in three different files. As for the WebNLG shared tasks, each submission file must be a .txt file (UTF-8 encoding) where each text is true-cased and detokenized; see an [example](https://synalp.gitlabpages.inria.fr/webnlg-challenge/files/submission-example-2020-nlg.txt) for English on the WebNLG page. In the submission files, each line should correspond to the verbalisation of one triple set: Line 1 should represent the verbalisation of the triple set with the ID=1, line 2 — the triple set with the ID=2, etc. If no output is produced, an empty line is expected, so all output files are expected to contain as many lines as there are inputs. Each submission file should be named with the (i) system name, (ii) subtask and dataset, and (iii) ISO 639-1 standard language id (see Data and languages above), separated by underscores: SystemX\_[subtask]-[dataset]\_[lang id].txt; for instance for a submission for the WebNLG subtask, Factual dataset in English: **SystemX\_D2T-1-FA\_en.txt**.

**Evaluation:** Only human evaluation will be carried out, via 4 quality criteria: Grammaticality, Fluency, No-omissions, No-Additions; see definitions [here.](https://docs.google.com/document/d/1xaGRNl-f6aOH7GWZCOwb745rGvBu-Mz7FtTyvOSmqBM/edit?usp=sharing)

Summarization Task
-------------------------

The summarization task generates a concise summary based on the input text document. To make this task challenging, we focus on several different aspects of the task: underrepresented language (Swahili), cross-lingual, and long-context input.

There are three subtasks corresponding to the above aspects (see examples [here](https://docs.google.com/document/d/1xaGRNl-f6aOH7GWZCOwb745rGvBu-Mz7FtTyvOSmqBM/edit?usp=sharing)):

*   **Subtask 1: Underrepresented Language Summarization (Swahili).** Both the input text document and the generated summary in this subtask are Swahili, which is usually not covered sufficiently in large language models (LLMs) as an underrepresented language. The dataset we use is the [Swahili news dataset](https://zenodo.org/records/4300294), which contains Swahili news articles collected from different websites. It was originally created for a classification task but we’ll use the input text (news article) as our input article for summarization \[23,268 articles in train.csv\].
*   **Subtask 2: Cross-lingual Summarization.** This subtask checks the cross-lingual summarization setting between English and another language for both directions. The data is scraped from news websites similar to [XLSum](https://huggingface.co/datasets/csebuetnlp/xlsum) [(Hasan et al., 2021)](https://aclanthology.org/2021.findings-acl.413/). For example, the input document is English and the generated summary is Chinese (en document → zh summary); the input document is Chinese and the generated summary is English (zh document → en summary). The languages covered can be found in the “Data and Languages” section below.
*   **Subtask 3: English Book Chapter Summarization.** We test the English summarization with long-context input (e.g. book chapters) in this subtask. A recent work ( [Kryściński et al., 2021](https://arxiv.org/abs/2105.08209)) has introduced an available dataset for long-context input along with human-written summaries. We’ll also leverage the undergraduate student reading group at NYU to acquire human references.

**Data and languages:** No training or development data is provided, only test data (1 testset per subtask); to get access to the test data, please pre-register using the link at the top of the page. For subtask 2, we require submissions of outputs in the following languages for the cross-lingual task: English (en), Chinese (zh), German (de), Russian (ru), Spanish (es), Korean (ko), Hindi (hi), Swahili (sw), Arabic (ar). For all tasks, a subset of the data/languages will be selected for human evaluation based on the number of submissions we receive for each language and on the available annotators.

**Submissions:** Please submit your model outputs [here (to be communicated soon)](TOUPDATE). Each team is expected to submit outputs for the subtask(s) they participate in. Each submission file should be named with the (i) system name, (ii) subtask, and (iii) ISO 639-1 standard language id.

*   For subtask 1, we expect one output file in Swahili. The expected filename is **SystemX\_Summ-1\_sw.jsonl**.
*   For subtask 2, we expect at least one cross-lingual file and up to 8 files of the different languages from the input language. The file name for each language output should be in the format of SystemX\_Summ-2\_\[lang id\].jsonl (e.g., for Chinese: **SystemX\_Summ-2\_zh.jsonl**).
*   For subtask 3, we expect one output file in English that only includes the information in the book chapters. The expected filename is **SystemX\_Summ-3\_en.jsonl**.

Each submission file must be a jsonl file (UTF-8 encoding) where each text is true-cased and detokenized; see an [example](https://drive.google.com/file/d/1oeYfxX05BP_099AboVy499HVvgWBmcmY/view?usp=sharing) for English.

**Evaluation:** Only human evaluation will be carried out, via 5 quality criteria: Understandability, Compactness, Grammaticality, Coherence, Faithfulness, Saliency; see definitions [here.](https://docs.google.com/document/d/1xaGRNl-f6aOH7GWZCOwb745rGvBu-Mz7FtTyvOSmqBM/edit?usp=sharing)

Important Dates
---------------

`February 20` GEM shared task launched, pre-registration open.

`March 8` Deadline for pre-registering systems.

`April 5` Deadline for output submission (all tasks).

`April 6` Human evaluation starts.

`Before summer` Human evaluation results.

**System Descriptions and Analyses**

`TBD` System Descriptions and Analyses due

`TBD` Notification of Acceptance

`TBD` Camera-ready due

To stay up-to-date on announcements, please join our [Google Group](https://groups.google.com/g/gem-benchmark). The same group may be used for questions and discussions.

