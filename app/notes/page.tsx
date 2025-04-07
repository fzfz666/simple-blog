"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { NoteCard } from "@/components/note-card"
import { Footer } from "@/components/footer"
import { PaginationButtons } from "@/components/pagination-buttons"
import { BackToTop } from "@/components/back-to-top"
import type { NotesData } from "@/types/note"

export default function NotesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [notesData, setNotesData] = useState<NotesData>({ notes: [], total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      const data = await getPaginatedNotesAction(currentPage, 20)
      setNotesData(data)
      setLoading(false)
    }
    fetchNotes()
  }, [currentPage])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回首页</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src="/cat.jpg"
            alt="Jimmy's avatar"
            className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
          />
          <div>
            <h1 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Jimmy</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              记录一些想法和感受
            </p>
          </div>
        </div>
      </header>

      <main>
        <div className="space-y-3">
          {notesData.notes.length > 0 ? (
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
            />
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}