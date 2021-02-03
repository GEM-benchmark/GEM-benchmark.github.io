---
title: "Getting Started with GEM"
---

This tutorial presents a full walk-through how to get started with GEM, how to load and inspect data, how to finetune a baseline model, and how to generate predictions. If you are
only interested in an overview how to load the datasets, you can look [here](/shared_task).
Throughout this tutorial, we will focus on the CommonGen task, but we will note
what changes to make to use another of the GEM datasets.

## Table of Contents

## Preliminaries

This tutorial uses PyTorch and the HuggingFace infrastructure to finetune models. You need to install the following dependencies:

```bash
pip install git+https://github.com/huggingface/datasets.git
pip install rouge_score
pip install sentencepiece
pip install transformers
```

The device management can be done via the following imports:

```py
# Device and fp16 management.
import torch
from packaging import version
if version.parse(torch.__version__) < version.parse("1.6"):
    from .file_utils import is_apex_available
    if is_apex_available():
        from apex import amp
    _use_apex = True
else:
    _use_native_amp = True
    from torch.cuda.amp import autocast
```

## Loading the Data

We will be using [HuggingFace datasets](https://huggingface.co/docs/datasets/gem) for this tutorial, but the GEM datasets are available in [TFDS](https://www.tensorflow.org/datasets) as well.

You can load and inspect datasets like this:

```python
>> from datasets import load_dataset
>> data = load_dataset("gem", "common_gen")
>> data

DatasetDict({
    train: Dataset({
        features: ['gem_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 67389
    })
    validation: Dataset({
        features: ['gem_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 993
    })
    test: Dataset({
        features: ['gem_id', 'concept_set_id', 'concepts', 'target', 'references'],
        num_rows: 1497
    })
})
```

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

def batch_tokenize(dataset_batch, tokenizer, dataset_name, decoder_max_length=32):
  """
  Construct the batch (source, target) and run them through a tokenizer.
  """
  source, target = construct_input_for_batch(dataset_batch, dataset_name)
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

We can now utilize the preprocessed data to finetune a model. To do so, we will utilize the [Trainer API](https://huggingface.co/transformers/main_classes/trainer.html#trainingarguments) which handles gradient updates, model selection, and evaluation for us.

```python
from transformers import Seq2SeqTrainer, TrainingArguments
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

train_args = TrainingArguments(
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
)

trainer = Seq2SeqTrainer(
    num_beams=4,
    max_length=32,
    model=model,
    args=train_args,
    train_dataset=train_data_tokenized,
    eval_dataset=valid_data_tokenized,
    tokenizer=tokenizer,
    compute_metrics=rouge_metric_fn,
)
```

And finally:

```python
>> trainer.train()

Epoch	Training Loss	Validation Loss	Rouge2	Rougel
1	0.981596	1.074378	0.143700	0.344500
2	0.819494	1.053480	0.154700	0.353600
3	0.729006	1.067981	0.156200	0.355500
```

We now have a model that achieves 15.6 ROUGE-2 which can obviously still be tuned, but it is a great starting point.

## Generating and evaluating Predictions

Given that we now have a model, we also want to generate model outputs now. For this, let's build another two utility functions that generate a batch with only model inputs and which generate and detokenize text with a model.

```python
def make_batch_inputs(batch, tokenizer, dataset_name, device='cuda:0'):
  """
  Function that takes a batch from a dataset and formats it as input to model.
  """
  # Concatenate the concept names for each example in the batch.
  input_lists, _ = construct_input_for_batch(batch, dataset_name)
  # Use the model's tokenizer to create the batch input_ids.
  batch_features = tokenizer(input_lists, padding=True, return_tensors='pt')
  # Move all inputs to the device.
  batch_features = dict([(k, v.to(device)) for k, v in batch_features.items()])
  return batch_features

def beam_generate_sentences(batch,
                            model,
                            tokenizer,
                            dataset_name,
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
      dataset_name=dataset_name,
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
        DATASET_NAME,
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
'R-2: 0.156 R-L: 0.356'
```

## Generating and Submitting Test Predictions

To format your model outputs for GEM, let's first assume that we have the test outputs similar to our validation outputs above:

```python
test_output = data['test'].map(
    lambda batch: {'generated': beam_generate_sentences(
        batch,
        model,
        tokenizer,
        DATASET_NAME,
        num_beams=BEAM_SIZE,
        max_length=MAX_GENERATION_LENGTH)
    },
    batched=True,
    batch_size=128,
)
```

The code is adding a `generated` field into the dataset which makes analysis much easier.
However, in our submission file we only want the actual values. Thus, we filter:

```python
valid_formatted = [o['generated'] for o in valid_output]
test_formatted = [o['generated'] for o in test_output]
```

In our final step, we only have to add the outputs to our larger submission construct.

```python
submission_dict = {
    "submission_name": "BART-base",
    "param_count": sum(p.numel() for p in model.parameters()),
    "description": "Baseline for the task based on BART-base."
    "tasks": {
      "common_gen_val": {"language": "en", "values": valid_formatted},
      "common_gen_test": {"language": "en", "values": test_formatted},
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

Obviously, we do not want to rely only on ROUGE scores. For this, we developed the GEM evaluation framework.

Coming soon :)
