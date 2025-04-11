import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderNav } from "@/components/header-nav"
import { Layout } from "@/components/layout"
import { NotesPagination } from "@/components/notes-pagination"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default async function NotesPage() {
  const { notes, total } = await getPaginatedNotesAction(1, 15)

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Header showBackButton={true} />

        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-zinc-200/50 to-zinc-300/50 dark:from-zinc-700/50 dark:to-zinc-600/50 blur-sm group-hover:blur transition-all duration-300"></div>
            <img
              src="/cat.jpg"
              alt="Jimmy's avatar"
              className="relative w-12 h-12 rounded-full object-cover ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-base font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">Jimmy</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">记录想法和感受</p>
          </div>
        </div>

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