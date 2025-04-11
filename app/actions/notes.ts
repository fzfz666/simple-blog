"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

// 缓存实例
let notesCache: {
  notes: any[];
  lastUpdated: number;
} | null = null;

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24小时缓存

// 初始化缓存
async function initNotesCache() {
  if (notesCache && Date.now() - notesCache.lastUpdated < CACHE_DURATION) {
    return notesCache.notes;
  }

  const notesDirectory = path.join(process.cwd(), "content/notes")
  
  if (!fs.existsSync(notesDirectory)) {
    fs.mkdirSync(notesDirectory, { recursive: true })
    notesCache = { notes: [], lastUpdated: Date.now() }
    return []
  }

  const fileNames = fs.readdirSync(notesDirectory)

  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(notesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)
      
      // 获取文件修改时间
      const stats = fs.statSync(fullPath)
      const mtime = stats.mtimeMs
      
      // 使用文件名和修改时间的组合作为唯一 ID
      const id = `${fileName.replace(/\.md$/, "")}-${mtime}`

      return {
        id,
        content: matterResult.content,
        date: matterResult.data.date || new Date().toISOString(),
      }
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))

  notesCache = {
    notes: allNotes,
    lastUpdated: Date.now()
  }

  return allNotes
}

export async function getPaginatedNotesAction(page: number = 1, pageSize: number = 10) {
  const allNotes = await initNotesCache()
  const start = (page - 1) * pageSize
  const paginatedNotes = allNotes.slice(start, start + pageSize)

  return {
    notes: paginatedNotes,
    total: allNotes.length,
    totalPages: Math.ceil(allNotes.length / pageSize)
  }
}