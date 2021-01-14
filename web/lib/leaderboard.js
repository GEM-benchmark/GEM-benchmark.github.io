/*
Reads the leaderboard data from a server-side csv file 
located in 'leaderboard/leaderboard.csv'.
The file should have the following fields:
task,model,param_size,score
*/
import path from "path";
import fs from "fs";

export function getLeaderboardData() {
  
  // read the leaderboard schema
  const leaderboardSchemaFilePath = path.join(
    process.cwd(),
    "leaderboard/leaderboard_schema.json"
  );
  const schema = JSON.parse(fs.readFileSync(leaderboardSchemaFilePath, 'utf8')).columns;

  // read the task specific schemas and scores
  const tasks = ["simplification", "summarization", "struct_to_text", "table_to_text", "dialog"]
  let task_schema = {};
  let task_scores = {};
  tasks.forEach(task => {
    let tmp = JSON.parse(fs.readFileSync(path.join(process.cwd(), `leaderboard/${task}_schema.json`), 'utf8')).columns;
    task_schema[task] = schema.concat(tmp)  // task schema: global schema + task specific columns
     let scores = [];
    fs.readFileSync(path.join(process.cwd(), `leaderboard/${task}_scores.jsonl`), 'utf-8').split(/\r?\n/).forEach(function(line){
      console.log(line);
      scores.push(JSON.parse(line));
    })
    task_scores[task] = scores;
  });

  return {
    data: task_scores,
    taskschema: task_schema,
  };
}
