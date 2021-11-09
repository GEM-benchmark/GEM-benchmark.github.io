---
title: 'From pretrained model to submission'
type: Modeling
background: This tutorial shows the entire pipeline from loading the data, creating a model, to formatting the submission file from predictions.
---

This tutorial presents a full walk-through how to get started with GEM, how to load and inspect data, how to finetune a baseline model, and how to generate predictions.
Throughout this tutorial, we will focus on the CommonGen task, but we will note
what changes to make to use another of the GEM datasets.

**SUBMITTING** Our [submission form](https://forms.gle/vbTZDMCuqzok8tTA9) is permanently open! Please account for some extra time to write your model card.

## Table of Contents

## Preliminaries

This tutorial uses PyTorch and the HuggingFace infrastructure to finetune models. You need to install the following dependencies:

```bash
pip install git+https://github.com/huggingface/datasets.git
pip install rouge_score
pip install sentencepiece
pip install transformers
```

We further assume access to a GPU in this tutorial. You should be able to run all the code inside of a [colab notebook for free GPU access](https://colab.research.google.com/).

## Loading the Data

We will be using [HuggingFace datasets](https://huggingface.co/docs/datasets/gem), but the GEM datasets are available in [TFDS](https://www.tensorflow.org/datasets) as well.

You can load and inspect datasets like this:

```python
>> from datasets import load_dataset
>> data = load_dataset("gem", "common_gen")
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

```py
['common_gen', 'cs_restaurants', 'dart', 'mlsum_de', 'mlsum_es', 'xsum',
 'e2e_nlg', 'schema_guided_dialog', 'totto', 'web_nlg_en', 'web_nlg_ru',
  'wiki_auto_asset_turk', 'wiki_lingua_arabic_ar', 'wiki_lingua_chinese_zh',
  'wiki_lingua_czech_cs', 'wiki_lingua_dutch_nl', 'wiki_lingua_english_en',
  'wiki_lingua_french_fr', 'wiki_lingua_german_de', 'wiki_lingua_hindi_hi',
  'wiki_lingua_indonesian_id', 'wiki_lingua_italian_it',
  'wiki_lingua_japanese_ja', 'wiki_lingua_korean_ko',
  'wiki_lingua_portuguese_pt', 'wiki_lingua_russian_ru',
  'wiki_lingua_spanish_es', 'wiki_lingua_thai_th',
  'wiki_lingua_turkish_tr', 'wiki_lingua_vietnamese_vi']
```

### Loading a single example


Now let's look at a single example:

```python
>> data['train'][0]

{'concept_set_id': 0,
 'concepts': ['mountain', 'ski', 'skier'],
 'gem_id': 'common_gen-train-0',
 'references': [],
 'target': 'Skier skis down the mountain'}
```

CommonGen is a task that asks for the production of a sentence (`target`) from a set of concepts (`concepts`). Since one concept set can generate multiple meaningful sentences, the example also includes a unique identifier (`concept_set_idx`) so that multiple references can be linked to an input.

Next, let's define utility functions that can generate batches of (tokenized) examples which we can use during training.

```python
def construct_input_for_batch(batch):
  """
  Function that takes a batch from a dataset and constructs the corresponding
  input string.
  """
  source = [' '.join(concepts) for concepts in batch ["concepts"]]
  target = batch["target"]
  return source, target

def batch_tokenize(dataset_batch, tokenizer, decoder_max_length=32):
  """
  Construct the batch (source, target) and run them through a tokenizer.
  """
  source, target = construct_input_for_batch(dataset_batch)
  res = {
      "input_ids": tokenizer(source)["input_ids"],
      "labels": tokenizer(
          target,
          padding='max_length',
          truncation=True,
          max_length=decoder_max_length
      )["input_ids"],
  }
  return res
```

All we need to do now to preprocess the dataset is to call `batch_tokenize` on it. For our example, we are using BART-base as a model and we need to load the corresponding tokenizer:

```python
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained('facebook/bart-base')

train_data_tokenized = data['train'].map(
  lambda batch: batch_tokenize(batch, tokenizer, DATASET_NAME, decoder_max_length=DECODER_MAX_LENGTH),
  batched=True
)
valid_data_tokenized = data['validation'].map(
  lambda batch: batch_tokenize(batch, tokenizer, DATASET_NAME, decoder_max_length=DECODER_MAX_LENGTH),
  batched=True
)
```

## Finetuning a pretrained model

We can now utilize the preprocessed data to finetune a model. To do so, we will utilize the [Trainer API](https://huggingface.co/transformers/main_classes/trainer.html#seq2seqtrainingarguments) which handles gradient updates, model selection, and evaluation for us.

```python
from transformers import AutoModelForSeq2SeqLM, Seq2SeqTrainer, Seq2SeqTrainingArguments
```

To improve model selection, let's pick the model that has the best test performance on ROUGE-2, a metric that is typically associated with higher fluency. We can do this by constructing a function that returns a function that computes the score and we only have to pass it to our trainer.

```python
from datasets import load_metric

rouge_scorer = load_metric("rouge")

def rouge_metric_builder(tokenizer):
  def compute_rouge_metrics(pred):
    """utility to compute ROUGE during training."""
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

Fantastic, now all we have to do is set up our trainer class with everything we defined so far and train it!

```python
model = AutoModelForSeq2SeqLM.from_pretrained('facebook/bart-base')
model = model.to('cuda:0')

train_args = Seq2SeqTrainingArguments(
    output_dir="BART-commongen",
    do_train=True,
    do_eval=True,
    evaluation_strategy="epoch",
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
    seed=42,
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

trainer._max_length = DECODER_MAX_LENGTH
trainer._num_beams = BEAM_SIZE
```

And finally:

```python
>> trainer.train()

Epoch	Training Loss	Validation Loss	Rouge2	    Rougel
1	1.081300	1.063452	0.121900	0.319900
2	0.948100	1.086376	0.134000	0.329800
3	0.820100	1.077763	0.133900	0.328000
```

We now have a model that achieves 13.4 ROUGE-2 which can obviously still be tuned, but it is a great starting point.

## Generating and evaluating Predictions

Given that we now have a model, we also want to generate model outputs now. For this, let's build another two utility functions that generate a batch with only model inputs and which generate and detokenize text with a model.

```python
def make_batch_inputs(batch, tokenizer, device='cuda:0'):
  """
  Function that takes a batch from a dataset and formats it as input to model.
  """
  # Concatenate the concept names for each example in the batch.
  input_lists, _ = construct_input_for_batch(batch)
  # Use the model's tokenizer to create the batch input_ids.
  batch_features = tokenizer(input_lists, padding=True, return_tensors='pt')
  # Move all inputs to the device.
  batch_features = dict([(k, v.to(device)) for k, v in batch_features.items()])
  return batch_features

def beam_generate_sentences(batch,
                            model,
                            tokenizer,
                            num_beams=4,
                            max_length=32,
                            device='cuda:0'):
  """
  Function to generate outputs from a model with beam search decoding.
  """
  # Create batch inputs.
  features = make_batch_inputs(
      batch=batch,
      tokenizer=tokenizer,
      device=device)
  # Generate with beam search.
  generated_ids = model.generate(
      input_ids=features['input_ids'],
      attention_mask=features['attention_mask'],
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
        max_length=MAX_GENERATION_LENGTH)
    },
    batched=True,
    batch_size=128,
)

rouge_scorer = load_metric("rouge")
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
'R-2: 0.134 R-L: 0.329'
```

## Generating and Submitting Test Predictions

### Format Description

Please format submissions in the following format

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

### Formatting your predictions

To format your model outputs for GEM, let's first assume that we have the test and challenge set outputs similar to our validation outputs above. The code is adding a `generated` field into the dataset which makes analysis much easier.
However, in our submission file we only want the actual values and corresponding IDs. Thus, we filter:

```python
valid_formatted = [o['generated'] for o in valid_output]
valid_keys = [o['gem_id'] for o in data['validation']]

test_formatted = [o['generated'] for o in test_output]
test_keys = [o['gem_id'] for o in data['test']]

challenge_train_sample_formatted = [o['generated'] for o in challenge_train_sample_output]
challenge_train_sample_keys = [o['gem_id'] for o in data['challenge_train_sample']]
```

In our final step, we only have to add the outputs to our larger submission construct.

```python
submission_dict = {
    "submission_name": "BART-base",
    "param_count": sum(p.numel() for p in model.parameters()),
    "description": "Baseline for the task based on BART-base.",
    "tasks": {
      "common_gen_validation": {"values": valid_formatted, "keys": valid_keys},
      "common_gen_test": {"values": test_formatted, "keys": test_keys},
      "common_gen_challenge_train_sample": {"values": challenge_train_sample_formatted,
                                            "keys": challenge_train_sample_keys}
    }
}
```

This format is scalable to more tasks, you simply need to add more outputs to the `tasks` subfield.
The last step is to write our submission dictionary to a file.

```python
import json
with open('gem_submission.json', 'w') as f:
  f.write(json.dumps(submission_dict, indent=2))
```

## Evaluating your submission file with the GEM evaluation framework.

Obviously, we do not want to rely only on ROUGE scores. For this, we developed the GEM evaluation framework. You can download it by running

```bash
git clone git@github.com:GEM-benchmark/GEM-metrics.git
```

Assuming that you formatted your outputs correctly, you can now run

```bash
python run_metrics.py [-r references.json] [-o outputs.scores.json] outputs.json
```

which will create a json file with your scores per task and challenge set. Please follow the [README](https://github.com/GEM-benchmark/GEM-metrics) for more detailed usage information.
