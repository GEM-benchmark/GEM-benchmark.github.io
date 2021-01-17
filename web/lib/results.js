import path from "path";
import fs from "fs";

export function getResultsData() {
  // step 1: read the default and task-specific schemas.
  const resultsSchemaFilePath = path.join(
    process.cwd(),
    "results/schemas/default_schema.json"
  );
  const schema = JSON.parse(fs.readFileSync(resultsSchemaFilePath, "utf8"))
    .columns;
  let task_schema2 = {};
  const schemaFilesDir = path.join(
    process.cwd(),
    "results/schemas/task_specific"
  );
  fs.readdirSync(schemaFilesDir).forEach((file) => {
    // task_schema.json
    let taskName = file.slice(0, file.lastIndexOf("_"));
    task_schema2[taskName] = schema.concat(
      JSON.parse(fs.readFileSync(path.join(schemaFilesDir, file))).columns
    );
  });

  // step 2: read the scores from submissions
  var scores = {};
  const submissionsFilesDir = path.join(process.cwd(), "results/submissions/");
  fs.readdirSync(submissionsFilesDir).forEach((submissionFile) => {
    // each submission file has scores from multiple tasks
    var taskMetricsList = parseSubmission(
      path.join(submissionsFilesDir, submissionFile)
    );
    taskMetricsList.forEach((taskMetrics, i) => {
      var taskName = taskMetrics["task_name"];
      if (taskName in scores) {
        scores[taskName].push(taskMetrics);
      } else {
        scores[taskName] = [taskMetrics];
      }
    });
  });

  return {
    data: scores,
    taskschema: task_schema2,
  };
}

function parseSubmission(path) {
  /*
  Parses a submission located at `path`. 
  Returns a dictionary from taskName -> scores
  */
  var submissionData = JSON.parse(fs.readFileSync(path));
  var submissionName = submissionData["submission_name"];
  var taskMetricsList = [];
  for (var key in submissionData) {
    if (key == "submission_name") {
      continue;
    }
    var taskMetrics = submissionData[key];
    var taskName = key.slice(0, key.lastIndexOf("_"));
    var split = key.slice(key.lastIndexOf("_") + 1);
    taskMetrics["split"] = split;
    taskMetrics["task_name"] = taskName;
    taskMetrics["submission_name"] = submissionName;
    taskMetricsList.push(roundMetrics(taskMetrics, 2));
    //taskMetricsList.push(taskMetrics);
  }
  return taskMetricsList;
}

function roundMetrics(obj, places) {
  // round off all the numbers in the metrics to `places` decimal places.
  var adj = 10 ** places;
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "number") {
      obj[key] = Math.round((value + Number.EPSILON) * adj) / adj;
    }
  });
  return obj;
}
