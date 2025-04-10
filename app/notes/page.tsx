"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { NoteCard } from "@/components/note-card"
import { Footer } from "@/components/footer"
import { PaginationButtons } from "@/components/pagination-buttons"
import { HeaderNav } from "@/components/header-nav"
import { Layout } from "@/components/layout"
import { Skeleton } from "@/components/ui/skeleton"

interface Note {
  id: string
  content: string
  date: string
}

interface NotesData {
  notes: Note[]
  total: number
  totalPages: number
}

export default function NotesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [notesData, setNotesData] = useState<NotesData>({ notes: [], total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const data = await getPaginatedNotesAction(currentPage, 7)
        setNotesData(data as NotesData)
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 100)
      }
    }
    fetchNotes()
  }, [currentPage])

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="flex flex-col gap-4 mb-6">
          <header className="flex justify-between items-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              返回
            </Link>
            <div className="flex items-center gap-4">
              <HeaderNav />
              <ThemeToggle />
            </div>
          </header>

          <div className="flex flex-col items-center gap-2 text-center">
            {loading ? (
              <>
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </>
            ) : (
              <>
                <img
                  src="/cat.jpg"
                  alt="Jimmy's avatar"
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                  loading="eager"
                />
                <div>
                  <h1 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Jimmy</h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">记录想法和感受</p>
                </div>
              </>
            )}
          </div>
        </header>

        <main>
          <div className="space-y-3">
            {loading ? (
              // 显示7个笔记的骨架屏
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : notesData.notes.length > 0 ? (
              notesData.notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))
            ) : (
              <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                还没有随笔内容...
              </p>
            )}
          </div>

          {notesData.totalPages > 1 && (
            <div className="mt-8">
              <PaginationButtons
                currentPage={currentPage}
                totalPages={notesData.totalPages}
                onPageChange={setCurrentPage}
                className="animate-in fade-in duration-300"
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </Layout>
  )
}