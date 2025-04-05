"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function getPaginatedPostsAction(page: number = 1, pageSize: number = 5) {
  const postsDirectory = path.join(process.cwd(), "content/posts")
  const fileNames = fs.readdirSync(postsDirectory)

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)

      return {
        id,
        title: matterResult.data.title || "无标题",
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || "",
      }
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))

  const start = (page - 1) * pageSize
  const paginatedPosts = allPosts.slice(start, start + pageSize)

  return {
    posts: paginatedPosts,
    total: allPosts.length,
    totalPages: Math.ceil(allPosts.length / pageSize)
  }
}