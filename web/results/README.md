## Handling Submissions and Results

### Workflow

1. Teams submit their outputs in a file `output.txt`.
2. `output.txt` is processed by the metrics calculator, generating a `metrics.json`.
3. `metrics.json` is added to `web/results/submissions/`, and is processed by the results framework to populate the tables.

### Format of `metrics.json`

```js
{
    "submission_name": "",
    "task_1_test": {
        //task_1 specific metrics for split test
    },
    .
    .
    .
    "task_N_val": {
        //task_N specific metrics for split val
    },
}
```

### Task specific schema

```
results/schemas/
├── default_schema.json
└── task_specific
    ├── common_gen_schema.json
    └── e2e_nlg_cleaned_schema.json
```

- The metrics and other meta-columns for the tasks are defined by schema files present in `web/schemas`.

- `default_schema.json` contains the columns that are expected to be present in any submission.

- Task specific schemas are present in `web/schemas/task_specific`.

