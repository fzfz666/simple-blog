"use client"

import { useState, useEffect } from "react"
import type { PostsData } from "@/types/post"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedPostsAction } from "@/app/actions/posts"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/app/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getPaginatedPostsAction(currentPage, 5);
      setPostsData(data as PostsData);
      setLoading(false);
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-light">Jimmy的博客</h1>
        </div>
        <ThemeToggle />
      </header>

      <main>
        <div className="space-y-6">
          {loading ? (
            // 加载状态显示骨架屏
            Array.from({ length: 5 }).map((_, index) => (
              <article key={index} className="border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </article>
            ))
          ) : postsData.posts.length > 0 ? (
            postsData.posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0"
              >
                <Link href={`/posts/${post.id}`} className="group block">
                  <h2 className="text-base font-normal group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <time className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 block">{formatDate(post.date)}</time>
                </Link>
              </article>
            ))
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              暂无文章。添加你的第一篇文章到 content/posts 目录。
            </p>
          )}
        </div>

        {/* 分页控制 */}
        {postsData.totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              上一页
            </Button>
            <span className="flex items-center px-4 text-sm text-zinc-500">
              {currentPage} / {postsData.totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(postsData.totalPages, p + 1))}
              disabled={currentPage === postsData.totalPages}
            >
              下一页
            </Button>
          </div>
        )}
      </main>

      <footer className="mt-12 pt-4 text-zinc-400 dark:text-zinc-500 text-xs flex justify-between items-center">
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

