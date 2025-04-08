import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAllPostIds, getPostById } from "@/app/lib/posts"
import { formatDate } from "@/app/lib/utils"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
// 添加类型定义
type PostId = {
  id: string;
  params?: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = getAllPostIds() as PostId[]
    return posts.map(post => ({
      id: String(post.id || post.params?.id || '')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  if (!params?.id) {
    notFound()
  }

  try {
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
              返回
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
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
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }
}

