import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-12 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs flex justify-between">
      <p>© {new Date().getFullYear()} Jimmy</p>
      <nav className="flex space-x-4">
        <Link href="/about" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
          关于
        </Link>
        <Link href="/notes" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
          随笔
        </Link>
        <Link href="/archive" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
          归档
        </Link>
      </nav>
    </footer>
  )
}