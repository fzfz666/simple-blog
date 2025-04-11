"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function getPaginatedPostsAction(page: number = 1, pageSize: number = 10, tag?: string | null) {
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
        tags: matterResult.data.tags || [],
      }
    })
    .filter(post => !tag || (post.tags && post.tags.includes(tag)))
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))

  const start = (page - 1) * pageSize
  const paginatedPosts = allPosts.slice(start, start + pageSize)

  return {
    posts: paginatedPosts,
    total: allPosts.length,
    totalPages: Math.ceil(allPosts.length / pageSize)
  }
}

export async function getAllTags() {
  const fileNames = fs.readdirSync(postsDirectory)
  const tagCounts: Record<string, number> = {}

  fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)
      const tags = matterResult.data.tags || []

      tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getPostsByYear(tag?: string | null) {
  const fileNames = fs.readdirSync(postsDirectory)
  const postsByYear: Record<string, any[]> = {}

  fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .forEach((fileName) => {
      const id = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)

      const post = {
        id,
        title: matterResult.data.title || "无标题",
        date: matterResult.data.date || new Date().toISOString(),
        tags: matterResult.data.tags || [],
      }

      if (!tag || (post.tags && post.tags.includes(tag))) {
        const year = new Date(post.date).getFullYear().toString()
        if (!postsByYear[year]) {
          postsByYear[year] = []
        }
        postsByYear[year].push(post)
      }
    })

  // 按年份排序
  Object.keys(postsByYear).forEach((year) => {
    postsByYear[year].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  return postsByYear
}