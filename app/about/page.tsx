import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function About() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200"
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          返回
        </Link>
        <ThemeToggle />
      </header>

      <main>
        <h1 className="text-xl font-normal mb-4">关于</h1>
        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none text-zinc-800 dark:text-zinc-200">
          <p>「极简思考」是一个专注于设计、简约和思考的博客。</p>
          <p>我们相信少即是多的理念，并通过这个平台分享关于设计、生活和技术的极简主义思考。</p>
          <p>如果您有任何问题或建议，请随时联系我们。</p>
        </div>
      </main>

      <footer className="mt-12 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs flex justify-between">
        <p>© 2025</p>
        <nav className="flex space-x-4">
          <Link href="/about" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
            关于
          </Link>
          <Link href="/archive" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
            归档
          </Link>
        </nav>
      </footer>
    </div>
  )
}

