---
title: 'Adding a data loader'
type: Data
background: This tutorial shows how to add your dataset to GEM.
---

We are using the HuggingFace hub to host all new datasets. All you will have to do is to upload your dataset, along with potential challenge splits, using the steps outlined below.


## Table of Contents



## Setup

### Create a HuggingFace account

To upload the dataset, you will need a HuggingFace account. If you already have one, you can skip this step.

If not, go to [huggingface.co/join](https://huggingface.co/join) and create an account.

### Join the GEM Organization

We are hosting all datasets in the GEM organization which you can join by following [this link](https://huggingface.co/organizations/GEM/share/PDrZPZBSZTtlPlsgCCYfTCbrQAOgrUNZmk).

### Install prerequisites


To install all the requirements, follow the steps below:


```bash
# Install the hub interface.
pip install huggingface_hub
# Install Git for large files.
git lfs install
# Log in to the hub
huggingface-cli login
```

Great, you are now prepared to create your dataset!

## Creating the dataset

The following steps largely follow [this tutorial](https://huggingface.co/docs/datasets/share.html#add-a-community-dataset).

### Set-up the repository

First, we will create the empty repository we will use to host the dataset.

```bash
huggingface-cli repo create YOUR_DATASET_NAME --type dataset --organization GEM
# Once created, we can download it.
git clone https://huggingface.co/datasets/GEM/YOUR_DATASET_NAME
```

### Preparing the files

You will need to add the following files to the repository.


1) `README.md` is a Dataset card that is created following our other tutorial. If you are completing the data part first, feel free to leave it empty for now. However, only a dataset with completed data card is part of GEM, so please add it once it is ready.

2) The raw data files of the dataset (optional, if they are hosted elsewhere you can specify the URLs in the dataset script).

3) `your_dataset_name.py` is your dataset loading script (optional if your data files are already in the supported formats csv/jsonl/json/parquet/txt). For information on how to create a dataset script, see the [documentation](https://huggingface.co/docs/datasets/dataset_script.html). You can start from the [template](https://github.com/huggingface/datasets/blob/master/templates/new_dataset_script.py) and simply fill in the details.

4) `dataset_infos.json` contains metadata about the dataset (required only if you have a dataset script).


While we don't have strong restrictions on the dataset formats, please follow the guidelines:
1) Each dataset should have splits named `train`, `validation`, and `test`. Additional challenge sets splits can be named `challenge_${name}` for consistency.
2) Each split should have a field called `gem_id` which has the naming convention of `GEM-${DATASET_NAME}_${SPLIT-NAME}_${id}` where `id` is an incrementing number starting at 1.

### Uploading the dataset

First add all the dataset files to `git lfs` tracking and then use git as usual to track all other files.

```bash
cp /somewhere/data/*.json .
git lfs track *.json
git add .gitattributes
git add *.json
git commit -m "add json files"
```

Afterwards you can also add the `README.md` and all other files and commit them. Once everything is ready, simply run `git push`. After you enter your HuggingFace username and password, everything will be uploaded to the Hub!

You can update the dataset simply by pushing updates the same way.

## Potential Errors


### git: 'lfs' is not a git command.

git lfs needs to be installed separately. Depending on your operating system, you can follow [this post](https://stackoverflow.com/questions/48734119/git-lfs-is-not-a-git-command-unclear) to solve the issue.

### 403 Client Error: Forbidden for url

You may encounter the following when trying to create a dataset:
`403 Client Error: Forbidden for url: https://huggingface.co/api/repos/create - You don't have the rights to create a dataset under this namespace`

This happens when you are not part of the organization or have a typo in the creation command. Ensure that you are (1) logged in, (2) member of the GEM organization, and (3) have typed the `--organization GEM` command using all upper case letters.

