import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Note } from "@/types/note"

export function NoteCard({ note }: { note: Note }) {
  return (
    <div className="group relative p-6 rounded-xl
      bg-zinc-50/50 dark:bg-zinc-800/50
      hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 
      border border-zinc-200/50 dark:border-zinc-700/50
      hover:border-zinc-300/50 dark:hover:border-zinc-600/50
      transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <img
          src="/cat.jpg"
          alt="Jimmy's avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Jimmy</div>
          <time className="text-xs text-zinc-500/90 dark:text-zinc-400/90">
            {format(new Date(note.date), "PPP", { locale: zhCN })}
          </time>
        </div>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed 
        whitespace-pre-wrap break-words
        group-hover:text-zinc-800 dark:group-hover:text-zinc-300
        transition-colors duration-300">
        {note.content}
      </div>
    </div>
  )
}