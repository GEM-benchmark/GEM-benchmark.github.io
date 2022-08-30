import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from 'remark';
import html from "remark-html";
import slug from "remark-slug";
import toc from "remark-toc";
import gfm from "remark-gfm";
import highlight from "remark-highlight.js";

var basePath = path.join(process.cwd(), "data");

export async function getData(relPath) {
  const workshopPath = path.join(basePath, relPath);
  const fileContents = fs.readFileSync(workshopPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(gfm)
    .use(toc, { tight: true })
    .use(slug)
    .use(highlight)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data,
  };
}
