---
title: "Getting Started with GEM"
---

In this tutorial, we will walk you through how to get started with GEM, how to load and inspect data, how to finetune a baseline model, and how to generate predictions.
Throughout this tutorial, we will focus on the CommonGen task, but we will note
what changes to make to use another of the GEM datasets.

## Table of Contents

## Preliminaries

This tutorial uses PyTorch and the HuggingFace infrastructure to finetune models. You need to install the following dependencies:

```
pip install datasets
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

We will be using [HuggingFace datasets](https://huggingface.co/docs/datasets/) for this tutorial, but the GEM datasets are available in [TFDS](https://www.tensorflow.org/datasets) as well.

You can load and inspect datasets like this:

```python
>> from datasets import load_dataset
>> data = load_dataset("common_gen")
>> data

DatasetDict({
    train: Dataset({
        features: ['concept_set_idx', 'concepts', 'target'],
        num_rows: 67389
    })
    validation: Dataset({
        features: ['concept_set_idx', 'concepts', 'target'],
        num_rows: 4018
    })
    test: Dataset({
        features: ['concept_set_idx', 'concepts', 'target'],
        num_rows: 1497
    })
})
```

Now let's look at a single example:

```python
>> data['train'][0]

{'concept_set_idx': 0,
 'concepts': ['ski', 'mountain', 'skier'],
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

We can now utilize the preprocessed data to finetune a model. To do so, we will utilize the [Trainer API](https://huggingface.co/transformers/main_classes/trainer.html#trainingarguments) by defining a `Seq2SeqTrainer` class that handles gradient updates, model selection, and evaluation for us.

```python
from transformers import Trainer, TrainingArguments

class Seq2SeqTrainer(Trainer):
  """Class to finetune a Seq2Seq model."""
  def __init__(
    self,
    num_beams=4,
    max_length=32,
    *args, **kwargs
  ):
    super().__init__(*args, **kwargs)
    self.num_beams = num_beams
    self.max_length = max_length

  def prediction_step(self, model, inputs, prediction_loss_only, ignore_keys=None):
    """
    Runs the model to either generate a sequence and/or compute the loss.
    """
    has_labels = all(inputs.get(k) is not None for k in self.label_names)
    inputs = self._prepare_inputs(inputs)
    # Compute loss with labels first.
    with torch.no_grad():
      if self.args.fp16 and _use_native_amp:
        with autocast():
          outputs = model(**inputs)
      else:
        outputs = model(**inputs)
      if has_labels:
        loss = outputs[0].mean().detach()
      else:
        loss = None
    # If we're only computing the conditional log-likelihood, return.
    if prediction_loss_only:
      return (loss, None, None)
    # Otherwise run model.generate() to get predictions.
    if isinstance(model, torch.nn.DataParallel):
      preds = model.module.generate(
        input_ids=inputs['input_ids'],
        attention_mask=inputs['attention_mask'],
        num_beams=self.num_beams,
        max_length=self.max_length,
      )
    else:
      preds = model.generate(
        input_ids=inputs['input_ids'],
        attention_mask=inputs['attention_mask'],
        num_beams=self.num_beams,
        max_length=self.max_length,
      )
    if len(preds) == 1:
      preds = preds[0]
    # Pad predictions if necessary so they can be concatenated across batches.
    if preds.shape[-1] < self.max_length:
      preds = torch.nn.functional.pad(
        preds, (0, self.max_length-preds.shape[-1]),
        mode='constant',
        value=self.tokenizer.pad_token_id
      )
    # Post-process labels.
    if has_labels:
      labels = inputs.get('labels')
    else:
      labels = None
    return (loss, preds, labels)
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

Since CommonGen is multi-reference and we are using a deterministic search algorithm, the test data currently holds many duplicates. We need to merge predictions on the concept set ID. To do so, let's define a formatter:

```python
def postprocess_inference_list(
    output_list: list,
    merge_identifier: str = None,
    target_field: str = None):
  """Merges duplicate outputs with multiple references."""
  postprocessed_list = []
  added_identifiers = set()
  for item in output_list:
    del item[target_field]
    if merge_identifier is not None:
      if item[merge_identifier] not in added_identifiers:
        added_identifiers.add(item[merge_identifier])
      else:
        # Was already added, skip example.
        continue
    postprocessed_list.append(item)
  return postprocessed_list

valid_formatted = postprocess_inference_list(
  list(valid_output),
  merge_identifier='concept_set_idx',
  target_field='target')
test_formatted = postprocess_inference_list(
  list(test_output),
  merge_identifier='concept_set_idx',
  target_field='target')
```

In our final step, we only have to add the formatted outputs to our larger submission construct.

```python
submission_dict = {
    "submission_name": 'BART-base',
    "param_count": sum(p.numel() for p in model.parameters()),
    "common_gen_val": valid_formatted,
    "common_gen_test": test_formatted,
}
```

With this, the last step is to write our submission dictionary to a file.

```python
import json
with open('gem_submission.json', 'w') as f:
  f.write(json.dumps(submission_dict, indent=2))
```

## Evaluating your submission file with the GEM evaluation framework.

Obviously, we do not want to rely only on ROUGE scores. For this, we developed the GEM evaluation framework.

Coming soon :)
