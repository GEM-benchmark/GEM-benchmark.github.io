/*
Reads the leaderboard data from a server-side csv file 
located in 'leaderboard/leaderboard.csv'.
The file should have the following fields:
task,model,param_size,score
*/
import path from "path";
import fs from "fs";
const parse = require("csv-parse/lib/sync");

export function getLeaderboardData() {
  
  // read the leaderboard schema
  const leaderboardSchemaFilePath = path.join(
    process.cwd(),
    "leaderboard/leaderboard.json"
  );
  const schema = JSON.parse(fs.readFileSync(leaderboardSchemaFilePath, 'utf8')).columns
  

  // read the leaderboard data from a csv
  const leaderboardDataFilePath = path.join(
    process.cwd(),
    "leaderboard/leaderboard.csv"
  );
  
  const leaderboardData = fs.readFileSync(leaderboardDataFilePath, "utf8");
  const records = parse(leaderboardData, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  return {
    data: records,
    schema: schema,
  };
}
