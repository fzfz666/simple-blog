import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPostsByYear } from "@/app/lib/posts"
import { formatDate } from "@/app/lib/utils"

export default function Archive() {
  const postsByYear = getPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

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
        <h1 className="text-xl font-normal mb-6">归档</h1>

        {years.length > 0 ? (
          years.map((year) => (
            <div key={year} className="mb-8">
              <h2 className="text-sm font-medium mb-4">{year}</h2>
              <ul className="space-y-3">
                {postsByYear[year].map((post) => (
                  <li key={post.id}>
                    <Link href={`/posts/${post.id}`} className="group flex justify-between items-baseline">
                      <span className="text-sm group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200">
                        {post.title}
                      </span>
                      <time className="text-xs text-zinc-400 dark:text-zinc-500">
                        {formatDate(post.date).split("年")[1]}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            暂无文章。添加你的第一篇文章到 content/posts 目录。
          </p>
        )}
      </main>

      <footer className="mt-12 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs flex justify-between">
        <p>© {new Date().getFullYear()}</p>
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

