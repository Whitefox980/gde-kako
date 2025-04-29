import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export async function getArticleContent(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    title: data.title || slug,
    content: htmlContent
  };
}
