import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAllPostIds, getPostById } from "@/app/lib/posts"
import { formatDate } from "@/app/lib/utils"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = getAllPostIds()
  return posts
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

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

      <article>
        <header className="mb-6">
          <h1 className="text-xl font-normal mb-2">{post.title}</h1>
          <time className="block text-xs text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
        </header>

        <div
          className="prose prose-zinc dark:prose-invert prose-sm max-w-none dark:text-zinc-200"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

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

