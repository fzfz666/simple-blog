import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderNav } from "@/components/header-nav"
import { Layout } from "@/components/layout"
import { NotesPagination } from "@/components/notes-pagination"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { Footer } from "@/components/footer"

export default async function NotesPage() {
  const { notes, total } = await getPaginatedNotesAction(1, 15)

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <HeaderNav />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <img
              src="/cat.jpg"
              alt="Jimmy's avatar"
              className="w-12 h-12 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
            />
            <div>
              <h1 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Jimmy</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">记录想法和感受</p>
            </div>
          </div>
        </header>

        <main>
          <NotesPagination 
            initialNotes={notes}
            initialTotal={total}
          />
        </main>

        <Footer />
      </div>
    </Layout>
  )
}