import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const tasksDirectory = path.join(process.cwd(), 'data', '2022', 'data_cards')

export function getSortedTasksData() {
  // Get file names in the folder
  const fileNames = fs.readdirSync(tasksDirectory)
  const allPostsData = fileNames.filter(
    function (fileName) {
      return path.extname(fileName) == ".yaml";
    }
  ).map(fileName => {
    // Remove extension from file name to get id.
    const id = fileName.replace(/\.yaml$/, '')
    // Read file as string.
    const fullPath = path.join(tasksDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // Use gray-matter to parse the post metadata section.
    const matterResult = matter(fileContents)
    // Combine the data with the id
    return {
      id,
      ...matterResult.data

    }
  })

  // Sort datasets by type and title.
  return allPostsData.sort((a, b) => {
    if (a.type.toLowerCase() != b.type.toLowerCase()) {
      return a.type.toLowerCase() < b.type.toLowerCase() ? -1 : 1;
    }
    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
  })
}

export function getAllTaskIds() {
  const fileNames = fs.readdirSync(tasksDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.filter(
    function (fileName) {
      return path.extname(fileName) == ".yaml";
    }
  ).map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.yaml$/, '')
      }
    }
  })
}

export async function getTaskData(id) {
  const fullPath = path.join(tasksDirectory, `${id}.yaml`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(gfm)
  //   .use(toc, { tight: true })
  //   .use(slug)
  //   .use(html)
  //   .process(matterResult.content);
  // const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id: id,
    contentHtml: matterResult.content,
    ...matterResult.data
  }

}

