import path from "path";
import fs from "fs";


export function getResultsData() {
  


  // step 1: read the default and task-specific schemas.
  const resultsSchemaFilePath = path.join(process.cwd(), "results/schemas/default_schema.json");
  const schema = JSON.parse(fs.readFileSync(resultsSchemaFilePath, 'utf8')).columns;
  let task_schema2 = {};
  const schemaFilesDir = path.join(process.cwd(), "results/schemas/task_specific");
  fs.readdirSync(schemaFilesDir).forEach(file => { // task_schema.json
    let taskName = file.slice(0, file.lastIndexOf("_"));
    task_schema2[taskName] = schema.concat(JSON.parse(fs.readFileSync(path.join(schemaFilesDir, file))).columns);
  });

  // step 2: read the scores from submissions
  var scores = {};
  const submissionsFilesDir = path.join(process.cwd(), "results/submissions/");
  fs.readdirSync(submissionsFilesDir).forEach(submissionFile => {
    // each submission file has scores from multiple tasks
    var taskMetricsDict = parseSubmission(path.join(submissionsFilesDir, submissionFile));
    for (var taskName in taskMetricsDict) {
      if (taskName in scores) {
        scores[taskName].push(taskMetricsDict[taskName]);
      } else {
        scores[taskName] = [taskMetricsDict[taskName]];
      }
    }
  });
  // scores maps each task to a list of submissions available for the task.
  
  for (var key in scores) {
    console.log(key);
  }

  for (var key in task_schema2) {
    console.log(key);
  }
  //
  let task_schema = {};



    // read the results schema

  
  

  // // read the task specific schemas and scores
  // const tasks = ["simplification", "summarization", "struct_to_text", "table_to_text", "dialog"]
  
  // let task_scores = {};
  // tasks.forEach(task => {
  //   let tmp = JSON.parse(fs.readFileSync(path.join(process.cwd(), `results/${task}_schema.json`), 'utf8')).columns;
  //   task_schema[task] = schema.concat(tmp)  // task schema: global schema + task specific columns
  //    let scores = [];
  //   fs.readFileSync(path.join(process.cwd(), `results/${task}_scores.jsonl`), 'utf-8').split(/\r?\n/).forEach(function(line){  //  task scores 
  //     scores.push(JSON.parse(line));
  //   })
  //   task_scores[task] = scores;
  // });

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
  var taskMetricsDict = {};
  for (var key in submissionData) {
    if (key == "submission_name") {
      continue;
    }
    var taskMetrics = submissionData[key];
    var taskName = key.slice(0, key.lastIndexOf("_"));
    taskMetrics["task_name"] = taskName;
    console.log(taskName);
    taskMetrics["submission_name"] = submissionName;
    taskMetricsDict[taskName] = taskMetrics;
  }
  return taskMetricsDict;
}
