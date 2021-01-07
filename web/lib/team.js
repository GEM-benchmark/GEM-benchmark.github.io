import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const teamPath = path.join(process.cwd(), 'data', 'team.yaml')


export async function getTeamData() {
  const fileContents = fs.readFileSync(teamPath, "utf8");

  // Use gray-matter to parse the team data.
  const matterResult = matter(fileContents);
  // Extract only the members array.
  const teamMembers = matterResult.data.members
  return {
    teamMembers,
  };
}
