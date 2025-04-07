import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { NoteCard } from "@/components/note-card"
import { Footer } from "@/components/footer"
import { PaginationButtons } from "@/components/pagination-buttons"

export default async function NotesPage() {
  const { notes, total, totalPages } = await getPaginatedNotesAction(1, 20)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回</span>
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
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))
          ) : (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
              还没有随笔内容...
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <PaginationButtons
              currentPage={1}
              totalPages={totalPages}
              onPageChange={() => {}}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}