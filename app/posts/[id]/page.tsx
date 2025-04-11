import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAllPostIds, getPostById } from "@/app/lib/posts"
import { formatDate } from "@/app/lib/utils"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Layout } from "@/components/layout"
import { Tags } from "@/components/tag"
import { Header } from "@/components/header"
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
  const { id } = await params
  
  if (!id) {
    notFound()
  }

  try {
    const post = await getPostById(id)

    if (!post) {
      notFound()
    }

    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Header showBackButton={true} />

          <article>
            <header className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              <time className="block text-xs text-zinc-400 dark:text-zinc-500">{formatDate(post.date)}</time>
              {post.tags && post.tags.length > 0 && (
                <Tags tags={post.tags} className="mt-2" interactive={false} />
              )}
            </header>

            <div
              className="prose prose-zinc dark:prose-invert prose-sm max-w-none dark:text-zinc-200"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          <Footer />
        </div>
      </Layout>
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }
}

