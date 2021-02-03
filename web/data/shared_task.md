---
title: "GEM Shared Task at ACL 2021"
---

The GEM workshop features a two-part shared task: **Modeling** and **Evaluation**. In the modeling shared task, we ask participants to submit model outputs on the GEM tasks. For the evaluation shared task, participants will have access to outputs from the modeling shared task and computed evaluation metrics. The goal is to draw open-ended insights from the set of data, for example by finding shortcuts models have taken, or by exposing limitations in the metrics.

Neither of the shared tasks will have a winner or loser and there will be no leaderboard that ranks the results. Instead, we see this as a shared quest toward understanding the limitations and opportunities of current NLG systems. We thus encourage widespread participation for systems of all shapes and sizes.

To stay up-to-date on announcements, please join our [Google Group](https://groups.google.com/g/gem-benchmark). The same group may be used for questions and discussions.

## Modeling Shared Task

To participate in the task, simply train a system on one or more of the included tasks (the more, the better, but even outputs on one task help!) and submit your validation and test outputs.

Similar to [WMT](http://www.statmt.org/wmt20/translation-task.html), we additionally ask every participant of this task to sign up for approximately five hours of labeling time to produce gold-data for our human evaluation. More information on this is coming soon.

### Data

The training and validation sets are available through [Huggingface Datasets](https://huggingface.co/docs/datasets/) and [Tensorflow Datasets](https://www.tensorflow.org/datasets). Using Huggingface, you can load a dataset as follows:

```python
from datasets import load_dataset
data = load_dataset('GEM', 'dataset_identifier')
```

For detailed information on the fields in each of our datasets, have a look at the [documentation](https://huggingface.co/datasets/gem#dataset-description). For more information on how to get started training models, see our [tutorial](/get_started).

### Submitting Outputs

Please format submissions in the following format

```json
{
  "submission_name": "An identifying name of your system",
  "param_count": 123, # the number of parameters your system has.
  "description": "An optional brief description of the system that will be shown on the website",
  "citation": "if applicable, link a paper here",
  "tasks":
    {
      "dataset_identifier": {
        "language": "en/vi/tu...", # a two-letter denominator of the sets language.
        "values": ["output1", "output2", "..."] # A list of system outputs
        }
    }
}
```

In this case, `dataset_identifier` is the identifier of the dataset followed by an identifier of the set the outputs were created from, for example `_val` or `_test`. That means, the CommonGEN validation set would have the identifier `commongen_val`.

More information about our submission system is coming soon :)

## Evaluation and Analysis Shared Task

The evaluation and analysis shared task will start once the system outputs are submitted and we have run the automatic evaluation. Participants will be able to download the outputs and metrics and run their own analyses. The resulting findings can be submitted to our workshop.

## Important Dates

**Modeling**

`February 2` Release of the Training Data

`March 29` Release of the Test Sets

`May 14` Modeling Submissions due


**Evaluation**

`March 29` Release of the Baseline Outputs

`May 17` Release of the Submission Outputs


**System Descriptions and Analyses**

`June 11` System Descriptions and Analyses due

`June 25` Notification of Acceptance

`July 9` Camera-ready due

`August 5-6` Workshop Dates