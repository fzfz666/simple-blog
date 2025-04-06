"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function getPaginatedNotesAction(page: number = 1, pageSize: number = 10) {
  const notesDirectory = path.join(process.cwd(), "content/notes")
  
  if (!fs.existsSync(notesDirectory)) {
    fs.mkdirSync(notesDirectory, { recursive: true })
    return { notes: [], total: 0, totalPages: 0 }
  }

  const fileNames = fs.readdirSync(notesDirectory)

  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "")
      const fullPath = path.join(notesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)

      return {
        id,
        content: matterResult.content,
        date: matterResult.data.date || new Date().toISOString(),
      }
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))

  const start = (page - 1) * pageSize
  const paginatedNotes = allNotes.slice(start, start + pageSize)

  return {
    notes: paginatedNotes,
    total: allNotes.length,
    totalPages: Math.ceil(allNotes.length / pageSize)
  }
}