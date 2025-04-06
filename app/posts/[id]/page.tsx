import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAllPostIds, getPostById } from "@/app/lib/posts"
import { formatDate } from "@/app/lib/utils"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
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
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            首页
          </Link>
          <Link
            href="/archive"
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200"
          >
            文章列表
          </Link>
        </div>
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

      <Footer />
    </div>
  )
}

