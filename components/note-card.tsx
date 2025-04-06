import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Note } from "@/types/note"

export function NoteCard({ note }: { note: Note }) {
  return (
    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3 mb-4">
        <img
          src="/cat.jpg"
          alt="Jimmy's avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-medium">Jimmy</div>
          <time className="text-xs text-zinc-500 dark:text-zinc-400">
            {format(new Date(note.date), "PPP", { locale: zhCN })}
          </time>
        </div>
      </div>
      
      <div className="prose prose-zinc dark:prose-invert prose-sm text-zinc-900 dark:text-zinc-100">
        {note.content}
      </div>
    </div>
  )
}