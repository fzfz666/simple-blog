import Link from "next/link"
import { Home, Archive, Info, BookOpen } from "lucide-react"

export function HeaderNav() {
  return (
    <nav className="flex items-center space-x-4 text-sm">

      <Link href="/notes" className="flex items-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors group">
        <BookOpen className="h-4 w-4 mr-2 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
        <span className="hidden md:inline">随笔</span>
      </Link>
      <Link href="/archive" className="flex items-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors group">
        <Archive className="h-4 w-4 mr-2 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
        <span className="hidden md:inline">归档</span>
      </Link>
      <Link href="/about" className="flex items-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors group">
        <Info className="h-4 w-4 mr-2 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
        <span className="hidden md:inline">关于</span>
      </Link>
    </nav>
  )
}