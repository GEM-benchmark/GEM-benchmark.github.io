// import path from "path";
// import fs from "fs";

import path from "path";
import * as fs from "fs";

export interface EvalConfiguration {
  common_metrics: { [key: string]: { citation: string, description: string, show_as: string } }
  challenges: { [key: string]: { datasets: string[], metrics: string[] } }
  measures: { [key: string]: string[] }
};

export interface ScoreData {
  predictions_file: string,
  N: number,
  total_length: number,
  mean_pred_length: number,

  [key: string]: string | number | object

}

export interface Scores {
  submission_name: string,

  [key: string]: ScoreData | string
}

export function getEvalConfiguration(): EvalConfiguration {
  const schemaFile = path.join(process.cwd(), "results/baselines/eval_config.json");
  const res =  JSON.parse(fs.readFileSync(schemaFile).toString("utf-8"))
  return res;
}

export function getSubmissionScores(): Scores[] {
  const baselinePath = path.join(process.cwd(), "results/baselines");
  const scores = []
  fs.readdirSync(baselinePath).forEach((fileName) => {
    if (fileName === "eval_config.json") return;
    if (!fileName.endsWith("scores.json")) return;

    // const scores = fileName.endsWith("scores.json");
    const submissionName = fileName.slice(0, fileName.lastIndexOf("_"));

    const submissionFileName = path.join(baselinePath, fileName);
    scores.push(JSON.parse(
      fs.readFileSync(submissionFileName).toString("utf-8"))
    )
  })

  return scores
}
