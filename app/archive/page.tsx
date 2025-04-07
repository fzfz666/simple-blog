import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPostsByYear } from "@/app/lib/posts"
import { formatDate } from "@/app/lib/utils"
import { Footer } from "@/components/footer"
import { HeaderNav } from "@/components/header-nav"

export default function Archive() {
  const postsByYear = getPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200"
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          返回
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <ThemeToggle />
        </div>
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
                    <Link href={`/posts/${post.id}`} className="group flex justify-between items-baseline gap-4">
                      <span className="text-sm group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 truncate max-w-[75%]">
                        {post.title}
                      </span>
                      <time className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0 min-w-[4rem] text-right">
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
            暂无文章
          </p>
        )}
      </main>

      <Footer />
    </div>
  )
}

