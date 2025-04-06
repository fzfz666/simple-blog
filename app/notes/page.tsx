import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { NoteCard } from "@/components/note-card"
import { Footer } from "@/components/footer"

export default async function NotesPage() {
  const { notes } = await getPaginatedNotesAction(1, 20)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
        <Link href="/" className="relative group w-10 h-10 block">
      <img
        src="/cat.jpg"
        alt="Jimmy's avatar"
        className="w-10 h-10 rounded-full object-cover transition duration-300 group-hover:blur-sm"
      />

        <div className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition duration-300">
          
        <div className="w-6 h-6 rounded-full bg-zinc-800 bg-opacity-40 flex 
        items-center justify-center shadow-md">
        <ArrowLeft className="w-3 h-3 text-white" />
        </div>
      </div>
    </Link>
        
          <div>
            <h1 className="text-base font-medium">Jimmy</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              记录一些想法和感受
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main>
        <div className="space-y-6">
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
      </main>

      <Footer />
    </div>
  )
}