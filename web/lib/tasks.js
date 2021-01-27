import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import slug from "remark-slug";
import toc from "remark-toc";
import gfm from "remark-gfm";

const tasksDirectory = path.join(process.cwd(), 'tasks')

export function getSortedTasksData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(tasksDirectory)
  const allPostsData = fileNames.filter(
    function (fileName) {
      return path.extname(fileName) == ".md";
    }
  ).map(fileName => {
    // Remove ".md" from file name to get id.
    const id = fileName.replace(/\.md$/, '')
    // Read markdown file as string.
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
    if (a.type < b.type) {
      return 1
    } if (a.title < b.title) {
      return 1
    }
    else {
      return -1
    }
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
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getTaskData(id) {
  const fullPath = path.join(tasksDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(gfm)
    .use(toc, { tight: true })
    .use(slug)
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }

}

