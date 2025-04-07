import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Note } from "@/types/note"

export function NoteCard({ note }: { note: Note }) {
  return (
    <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
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

      {/* 内容主体 */}
      <div className="text-zinc-900 dark:text-zinc-100 text-[15px] leading-relaxed whitespace-pre-wrap break-words">
        {note.content}
      </div>
    </div>
  )
}