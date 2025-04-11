import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Note } from "@/types/note"

export function NoteCard({ note }: { note: Note }) {
  return (
    <div className="group relative p-6 rounded-2xl 
      bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
      border border-zinc-200/50 dark:border-zinc-800/50
      hover:border-zinc-300/50 dark:hover:border-zinc-700/50
      shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] dark:shadow-[0_1px_3px_0_rgb(0,0,0,0.2)]
      hover:shadow-[0_5px_15px_0_rgb(0,0,0,0.05)] dark:hover:shadow-[0_5px_15px_0_rgb(0,0,0,0.2)]
      transition-all duration-300 ease-out">
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

      {/* 内容主体 */}
      <div className="text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed 
        whitespace-pre-wrap break-words
        group-hover:text-zinc-900 dark:group-hover:text-zinc-100
        transition-colors duration-300">
        {note.content}
      </div>
    </div>
  )
}