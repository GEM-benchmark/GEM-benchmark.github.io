---
title: 'Using and Adding Transformation to NL-Augmenter'
type: Transformation
background: This tutorial shows how to use and add your transformation to NL-Augmenter.
---

This tutorial will demonstrate how to add a new transformation process to the NL-Augmenter library, which researchers can then use to generate new augmented datasets.
We will not cover using filters in this tutorial. If you are interested in using filters, check out the tutorial [here](https://github.com/GEM-benchmark/GEM-benchmark.github.io/blob/main/web/data/notebooks/GEM_Hackathon_2021_filters_tutorial.ipynb).

## Using transformations
A transformation is represented as a python class.
To use a transformation, instantiate an instance of the transformation class and call it via `transformation.generate`.
See the code snippet below for an example.
Note that most transformations have unique parameters and `generate` signatures. 
Please refer to the README and code of the specific transformation you're interested in using for details.
You can find a full list of transformations [here](https://github.com/GEM-benchmark/NL-Augmenter/tree/main/transformations).

```python
from transformations.butter_fingers_perturbation import ButterFingersPerturbation
transform = ButterFingersPerturbation(prob=0.2)
corpus = ['This is the first sentence.', 'This is the second sentence.']
# transformations return a list 
transformed_corpus = [transform.generate(sentence)[0] for sentence in corpus]
```

Currently, transformations *do not* support batch mode, so you will need to pass your sentences into `transform.generate` individually.
After transforming your corpus, save your data in the preferred format (ideally `json` or `jsonlines`).
Then follow [this tutorial](https://gem-benchmark.com/tutorials/new_data_loader) to add your dataset to GEM.


## Adding transformations

### Preliminaries

#### Check for novelty
First step, and probably the most important one, is to carefully read through the [list of existing transformations](https://github.com/GEM-benchmark/NL-Augmenter/tree/main/transformations), making sure that no one has already covered the ground you’re proposing. There are dozens of existing systems and many more that are under review, so why duplicate existing work?

Make sure to check the **transformations** subdirectory in the project repo, as well as the [list of pull requests](https://github.com/GEM-benchmark/NL-Augmenter/pulls).

#### Check the documentation

So, you’re certain that your contribution will be novel. Now, the next step is to go to the project repo and carefully read through the documentation. Most important for our purposes are the [main readme document](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/README.md), plus the readmes for the [**interfaces**](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/interfaces/README.md) and [**evaluation**](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/evaluation/README.md) directories. 

Reading these will give you a solid understanding of the rest of the steps we’re going to cover.

### Setup

#### Fork the project repo

Once you’re clear on the documentation, go ahead and fork the repository. New transformations should be submitted as pull requests to the main NL-Augmenter repo.

<a href="https://docs.github.com/en/github/getting-started-with-github/fork-a-repo">
<div style="text-align:center"><img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="fork button" width="500"/></div>
</a>

Clone to your machine, and create a new branch to work in.

```bash
git clone $PATH_TO_YOUR_FORK
cd NL-Augmenter
git checkout -b new_transformation
```

#### Copy an existing transformation as a base

We’re going to start creating our own transformation by copying an existing simple example. 

```bash
cd transformations/
cp -r butter_fingers_perturbation new_transformation
cd new_transformation
```

### Create your transformation

#### Update the existing class info

Open the `transformation.py` file in your editor of choice. Make sure to rename the class to a name that describes your transformation.

The first thing to define is [what kind of interface](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/interfaces/README.md) our transformation is going to implement, which tells us what it should accept as input and return as output. As an example, we could choose to implement the QuestionAnswerOperation, which expects a question as a string, some context as a string, and answers as a list of strings, and returns a transformed version. 

For our purposes, we’ll be implementing the SentenceOperation interface, which expects only a single piece of text as input and output.

```python
class KeyphraseInsertion(SentenceOperation):
```

You’ll also need to decide which downstream tasks you think your class can be applied to: here, we’re going to choose text classification as an example.

```python
tasks = [TaskType.TEXT_CLASSIFICATION]
```

Pick the languages this transformation can accept as input using ISO codes here. We’ll stick with English as a default.

```python
languages = ["en"]
```

The keywords list is important to fill out. This will give reviewers some idea of the purpose of your transformation, as well as the consequences of using it. You can find a full list and explanation in the [docs/keywords.md](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/docs/keywords.md) file. I’m going to leave the existing set as they are.

```python
keywords = ["morphological", "noise", "rule-based", "high-coverage", "high-precision"]
```

#### Override the generate method

Now the preliminaries are done, it’s time to create our transformation. We need to override the generate method to carry out our transformation, paying attention to the expected types of the returned values.

Remember, for SentenceOperations, the type of the output is a list of strings, so that’s what we should provide. You’ll see our sample class includes a max outputs parameter that controls the number of new outputs generated from a single input sequence. It’s recommended that you use the same format to control how many texts are returned from your transformation.

In our example class, we’re going to insert a keyphrase between every second element in our string. 

```python
def __init__(self, seed=0, max_outputs=1, insert_every=2, keyphrase="kp_test"):
    super().__init__(seed, max_outputs=max_outputs)
    self.insert_every = insert_every
    self.keyphrase = keyphrase

def generate(self, sentence: str):
    perturbed_texts = []
    itertext = [sentence.split()[i:i + self.insert_every] for i in
                range(0, len(sentence.split()), self.insert_every)]
    for i in range(self.max_outputs):
        new_text = [f"{' '.join(x)} {self.keyphrase}" for x in itertext]
        perturbed_texts.append(' '.join(new_text))
    return perturbed_texts
```

#### Add your requirements

If you’ve added any new package requirements, you’re going to need to add them to a `requirements.txt` in the same directory as your transformation. This helps to keep each transformations’ imports separate.

For example, lets add sklearn here, just in case.

```bash
scikit-learn==1.0.1
```

### Test your solution

Now, it’s time to test your solution on some sample data to make sure it works. First, create a test.json file in the same directory as your transformation, and add at least five test cases.

```json
{
  "type": "new_transformation",
  "test_cases": [
    {
      "class": "KeyphraseInsertion",
      "inputs": {
        "sentence": "Andrew finally returned the French book to Chris that I bought last week"
      },
      "outputs": [{
        "sentence": "Andrew finally kp_test returned the kp_test French book kp_test to Chris kp_test that I kp_test bought last kp_test week kp_test"
      }]
    }
  ]
}
```

Then we’ll use pytest to check how it runs.

```bash
pytest -s --t=new_transformation
```

### Finishing up

#### Write the readme
Once we’re sure our transformation is producing good results, it’s time to document it. Open up the `readme.md` document and add all the important details. 

Make sure to include your name and contact details, along with referencing any prior work you rely on. Add an explanation of the purpose of your transformation, plus some discussion of the kind of tasks you think it will benefit, plus any limitations you’ve identified.

If you think it would be useful, you can check the [evaluation documentation](https://github.com/GEM-benchmark/NL-Augmenter/blob/main/evaluation/README.md) for details of how to test your work against benchmark datasets and models, and how to add that to your documentation.

#### Create your pull request

Finally, you’re ready to submit! 

Commit all your changes to your new branch, then push them back to the origin. The easiest way to create a pull request from your commit is to [use the Github website](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request).

<a href="https://docs.github.com/en/github/getting-started-with-github/fork-a-repo">
<div style="text-align:center"><img src="https://docs.github.com/assets/images/help/desktop/windows-create-pull-request.png" alt="pull request" width="500"/></div>
</a>

## Conclusion

And that’s it. NL-Augmenter has an active community of maintainers who will review your request and add your work to the project. In the meantime, others can try out your tranformation by cloning your fork.

Congratulations on contributing!

