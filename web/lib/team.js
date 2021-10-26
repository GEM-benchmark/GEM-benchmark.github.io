import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

var basePath = path.join(process.cwd(), 'data')


export async function getTeamData(year) {
  const teamPath = path.join(basePath, year, 'team.yaml')
  const fileContents = fs.readFileSync(teamPath, "utf8");

  // Use gray-matter to parse the team data.
  const matterResult = matter(fileContents);
  // Extract only the members array.
  const teamMembers = matterResult.data.members
  return {
    teamMembers,
  };
}
