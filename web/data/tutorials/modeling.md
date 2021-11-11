---
title: 'From pretrained model to submission'
type: Modeling
background: This tutorial shows the entire pipeline from loading the data, creating a model, to formatting the submission file from predictions.
---

This tutorial presents a full walk-through on how to get started with GEM, how to load and inspect data, how to finetune a baseline model, and how to generate predictions.
Throughout this tutorial, we will focus on the CommonGen task, but we will note
what changes to make to use another of the [GEM datasets](/data_cards).

You can also run this tutorial as a notebook [here](https://colab.research.google.com/drive/1iREkGABObpdluTBNAnLhvyABEtdbLokT?usp=sharing).

**SUBMITTING** Our [submission form](https://forms.gle/vbTZDMCuqzok8tTA9) is permanently open! Please account for some extra time to write your model card.


## Table of Contents

## Preliminaries

This tutorial uses PyTorch and the HuggingFace infrastructure to finetune models. 
You need to install the following dependencies:

```bash
pip install git+https://github.com/huggingface/datasets.git
pip install rouge_score
pip install sentencepiece
pip install transformers
```

We recommend you use a GPU machine. You should be able to run all the code inside of a [colab notebook for free GPU access](https://colab.research.google.com/).

## Loading the data

We will be using [HuggingFace datasets](https://huggingface.co/datasets/gem), but the GEM datasets are available in [TFDS](https://www.tensorflow.org/datasets) as well.

You can load and inspect datasets like this:

```python
>> from datasets import load_dataset
>> DATASET_NAME = "common_gen"
>> data = load_dataset("gem", DATASET_NAME)
>> data

DatasetDict({
    train: Dataset({
        features: ['gem_id', 'gem_parent_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 67389
    })
    validation: Dataset({
        features: ['gem_id', 'gem_parent_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 993
    })
    test: Dataset({
        features: ['gem_id', 'gem_parent_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 1497
    })
    challenge_train_sample: Dataset({
        features: ['gem_id', 'gem_parent_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 500
    })
    challenge_validation_sample: Dataset({
        features: ['gem_id', 'gem_parent_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 500
    })
    challenge_test_scramble: Dataset({
        features: ['gem_id', 'gem_parent_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 500
    })
})
```

You can notice that challenge sets created as part of GEM act just like any other data split, which means that you can use them with exactly the same code!

GEM supports many other datasets, simply pick one from this list and check out the corresponding [data cards](/data_cards).


### Loading a single example


Now let's look at a single example:

```python
>> data['train'][0]

{
    'concept_set_id': 0,
    'concepts': ['mountain', 'ski', 'skier'],
    'gem_id': 'common_gen-train-0',
    'references': [],
    'target': 'Skier skis down the mountain'
}
```

CommonGen is a task that asks for the production of a sentence (`target`) from a set of concepts (`concepts`). Since one concept set can generate multiple meaningful sentences, the example also includes a unique identifier (`concept_set_id`) so that multiple references can be linked to an input.

Next, let's define utility functions that can generate batches of (tokenized) examples which we can use during training. 

We create a function that takes a batch from a dataset and constructs the corresponding input string. In our CommonGen example, we concatenate concepts into a single string for each instance. 

```python
def construct_input_for_batch(batch):
    """Construct input strings from a batch."""
    source = [' '.join(concepts) for concepts in batch["concepts"]]
    target = batch["target"]
    return source, target
```

We then create a function that tokenizes the batches. Depending on your task, you might want to consider adjusting the `max_length`.
```python
def batch_tokenize(batch, tokenizer, max_length=32):
    """Construct the batch (source, target) and run them through a tokenizer."""
    source, target = construct_input_for_batch(batch)
    res = {
        "input_ids": tokenizer(source)["input_ids"],
        "labels": tokenizer(
            target,
            padding="max_length",
            truncation=True,
            max_length=max_length
        )["input_ids"],
    }
    return res
```

All we need to do now to preprocess the dataset is to call `batch_tokenize` on it. For our example, we are using BART-base as a model and we need to load the corresponding tokenizer. 

```python
from transformers import AutoTokenizer

MODEL_NAME = "facebook/bart-base"
MAX_LENGTH = 32

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

train_data_tokenized = data['train'].map(
    lambda batch: batch_tokenize(batch, tokenizer, max_length=MAX_LENGTH),
    batched=True
)
valid_data_tokenized = data['validation'].map(
    lambda batch: batch_tokenize(batch, tokenizer, max_length=MAX_LENGTH),
    batched=True
)
```

## Finetuning a pretrained model

We can now utilize the preprocessed data to finetune a model. To do so, we will use the [Trainer API](https://huggingface.co/transformers/main_classes/trainer.html#seq2seqtrainingarguments) which handles gradient updates, model selection, and evaluation for us.

```python
from transformers import AutoModelForSeq2SeqLM, Seq2SeqTrainer, Seq2SeqTrainingArguments
```

To improve model selection, let's pick the model that has the best test performance on ROUGE-2, a metric that is typically associated with higher fluency. We can do this by constructing a function that returns a function that computes the score and we only have to pass it to our trainer.

```python
from datasets import load_metric

rouge_scorer = load_metric("rouge")

def rouge_metric_builder(tokenizer):
    def compute_rouge_metrics(pred):
        """Utility to compute ROUGE during training."""
        labels_ids = pred.label_ids
        pred_ids = pred.predictions
        # All special tokens are removed.
        pred_str = tokenizer.batch_decode(pred_ids, skip_special_tokens=True)
        labels_ids[labels_ids == -100] = tokenizer.pad_token_id
        label_str = tokenizer.batch_decode(labels_ids, skip_special_tokens=True)
        # Compute the metric.
        rouge_results = rouge_scorer.compute(
            predictions=pred_str,
            references=label_str,
            rouge_types=["rouge2", "rougeL"],
            use_agregator=True,
            use_stemmer=False,
        )
        return {
            "rouge2": round(rouge_results['rouge2'].mid.fmeasure, 4),
            "rougeL": round(rouge_results['rougeL'].mid.fmeasure, 4),
        }
    return compute_rouge_metrics

rouge_metric_fn = rouge_metric_builder(tokenizer)
```

We load our model and set some parameters for training and generating.

```python
import torch

DEVICE = "cuda:0" if torch.cuda.is_available() else "cpu"
RANDOM_SEED = 42
BEAM_SIZE = 4

model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
model = model.to(DEVICE)
```

Fantastic, now all we have to do is set up our trainer class with everything we defined so far and run it! 
```python
train_args = Seq2SeqTrainingArguments(
    output_dir="BART-commongen",
    evaluation_strategy="epoch", 
    save_strategy="epoch",
    logging_steps=100,
    # optimization args, the trainer uses the Adam optimizer
    # and has a linear warmup for the learning rate
    per_device_train_batch_size=32,
    per_device_eval_batch_size=32,
    gradient_accumulation_steps=1,
    learning_rate=1e-04,
    num_train_epochs=3,
    warmup_steps=1000,
    # misc args
    seed=RANDOM_SEED,
    disable_tqdm=False,
    load_best_model_at_end=True,
    metric_for_best_model="rouge2",
    # generation
    predict_with_generate=True,
)

trainer = Seq2SeqTrainer(
    model=model,
    args=train_args,
    train_dataset=train_data_tokenized,
    eval_dataset=valid_data_tokenized,
    tokenizer=tokenizer,
    compute_metrics=rouge_metric_fn,
)

trainer._max_length = MAX_LENGTH
trainer._num_beams = BEAM_SIZE
```

And finally:

```python
>> trainer.train()

Epoch	Training Loss	Validation Loss	Rouge2	    Rougel
1	0.953500	1.113132	0.122500	0.322200
2	0.825300	1.132310	0.133800	0.324600
3	0.709400	1.133418	0.129300	0.324700
```

We now have a model that achieves 12.9 ROUGE-2 which can obviously still be tuned, but it is a great starting point.

## Generating and evaluating predictions

Given that we now have our fine-tuned model, we can use it to generate outputs for evaluation. For this, let's build another utility function that handles tokenizing, generating with beam search decoding, and de-tokenizing. 

```python
def beam_generate_sentences(
    batch,
    model,
    tokenizer,
    num_beams=4,
    max_length=32,
    device='cuda:0'
):
    """Generate outputs from a model with beam search decoding."""
    # Create batch inputs.
    source, _ = construct_input_for_batch(batch)
    # Use the model's tokenizer to create the batch input_ids.
    batch_features = tokenizer(source, padding=True, return_tensors='pt')
    # Move all inputs to the device.
    batch_features = dict([(k, v.to(device)) for k, v in batch_features.items()])

    # Generate with beam search.
    generated_ids = model.generate(
        **batch_features,
        num_beams=num_beams,
        max_length=max_length,
    )

    # Use model tokenizer to decode to text.
    generated_sentences = [
        tokenizer.decode(gen_ids.tolist(), skip_special_tokens=True)
        for gen_ids in generated_ids
    ]
    return generated_sentences
```

We can quickly apply this function across our validation set as a sanity check.

```python
valid_output = data['validation'].map(
    lambda batch: {'generated': beam_generate_sentences(
        batch,
        model,
        tokenizer,
        num_beams=BEAM_SIZE,
        max_length=MAX_LENGTH,
        device=DEVICE)
    },
    batched=True,
    batch_size=128,
)

# Evaluate for ROUGE-2/L
rouge_results = rouge_scorer.compute(
    predictions=valid_output["generated"],
    references=valid_output["target"],
    rouge_types=["rouge2", "rougeL"],
    use_agregator=True, use_stemmer=False,
)

f"R-2: {rouge_results['rouge2'].mid.fmeasure:.3f} R-L: {rouge_results['rougeL'].mid.fmeasure:.3f}"
```

As expected, this yields the following output:

```python
'R-2: 0.134 R-L: 0.325'
```

## Generating and submitting test predictions

You can submit your model along with test predictions via our [submission form](https://forms.gle/vbTZDMCuqzok8tTA9). 

### Format description

Please follow this format for your submission file:

```json
{
  "submission_name": "An identifying name of your system",
  "param_count": 123, # the number of parameters your system has.
  "description": "An optional brief description of the system that will be shown on the website",
  "tasks":
    {
      "dataset_identifier": {
        "values": ["output1", "output2", "..."], # A list of system outputs
        # Optionally, you can add the keys which are part of an example to ensure that there is no shuffling mistakes.
        "keys": ["schema_guided_dialog-test-9585", "schema_guided_dialog-test-9585", ...]
        }
    }
}

```

In this case, `dataset_identifier` is the identifier of the dataset followed by an identifier of the set the outputs were created from, for example `_validation` or `_test`. That means, the common_gen validation set would have the identifier `common_gen_validation`.

The `keys` field can be set to avoid accidental shuffling to impact your metrics. Simply add a list of the `gem_id` for each output example in the same order as your values.

### Formatting Your Predictions

For our tutorial, let's say we want to include results for the validation set and challenge set (`common_gen_challenge_train_sample`) outputs.

```python
challenge_train_sample_output = data["challenge_train_sample"].map(
    lambda batch: {
        'generated': beam_generate_sentences(
            batch,
            model,
            tokenizer,
            num_beams=BEAM_SIZE,
            max_length=MAX_LENGTH,
            device=DEVICE)
    },
    batched=True,
    batch_size=128,
)
```

We add a `generated` field into the dataset which makes analysis much easier. However, in our submission file we only want the actual values and corresponding IDs. Thus, we filter:

```python
valid_formatted = [o['generated'] for o in valid_output]
valid_keys = [o['gem_id'] for o in data['validation']]

challenge_train_sample_formatted = [o['generated'] for o in challenge_train_sample_output]
challenge_train_sample_keys = [o['gem_id'] for o in data['challenge_train_sample']]
```

In our final step, we only have to add the outputs to our larger submission construct.

```python
SUBMISSION_NAME = "An identifying name of your system"
DESCRIPTION = "An optional brief description of the system that will be shown on the website"

submission_dict = {
    "submission_name": SUBMISSION_NAME ,
    "param_count": sum(p.numel() for p in model.parameters()),
    "description": DESCRIPTION,
    "tasks": {
      "common_gen_validation": {
          "values": valid_formatted, 
          "keys": valid_keys
          }
    }
}
```

This format is scalable to more tasks: you simply need to add more outputs to the `tasks` subfield.

```python
# Submit results for challenge set.
new_task_name = "common_gen_challenge_train_sample"
new_task_data = {
    "values": challenge_train_sample_formatted, 
    "keys": challenge_train_sample_keys
} 
submission_dict["tasks"][new_task_name] = new_task_data
```
The last step is to write our submission dictionary to a file.

```python
import json
with open('gem_submission.json', 'w') as f:
    f.write(json.dumps(submission_dict))
```

## Evaluating your submission file with the GEM evaluation framework

Obviously, we do not want to rely only on ROUGE scores. For this, we developed the GEM evaluation framework. 

You can download it by running:

```bash
git clone git@github.com:GEM-benchmark/GEM-metrics.git
```

Install the required packages:
```bash
cd GEM-metrics
pip install -r requirements.txt
```

Assuming that you formatted and saved your outputs correctly, you can now run

```bash
python run_metrics.py [-r references.json] [-o outputs.scores.json] gem_submission.json
```

which will create a json file with your scores per task and challenge set. Please follow the [README](https://github.com/GEM-benchmark/GEM-metrics) for more detailed usage information.
