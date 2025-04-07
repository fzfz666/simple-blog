"use client"

import { useState, useEffect } from "react"
import type { PostsData } from "@/types/post"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedPostsAction } from "@/app/actions/posts"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/app/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { List } from "lucide-react"
import { Footer } from "@/components/footer"
import { PaginationButtons } from "@/components/pagination-buttons"
import { HeaderNav } from "@/components/header-nav"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const layout = 'list';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getPaginatedPostsAction(currentPage, 10); // 增加每页显示的文章数量从5篇到10篇
      setPostsData(data as PostsData);
      setLoading(false);
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <header className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/cat.jpg"  
            alt="Jimmy's avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 
            className="text-xl font-medium tracking-tight hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            Jimmy's Blog
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <ThemeToggle />
        </div>
      </header>

      <main>
        <div className="space-y-6">
          {loading ? (
            // 加载状态显示骨架屏
            Array.from({ length: 10 }).map((_, index) => (
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
                  <h2 className="text-base font-normal group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 relative inline-block">
                    {post.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-zinc-700 dark:bg-zinc-300 group-hover:w-full transition-all duration-500"></span>
                  </h2>
                  <time className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 block">
                    {formatDate(post.date)}
                  </time>
                </Link>
              </article>
            ))
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              暂无文章。
            </p>
          )}
        </div>

        {/* 分页控制 */}
        {postsData.totalPages > 1 && (
          <div className="mt-8">
            <PaginationButtons 
              currentPage={currentPage} 
              totalPages={postsData.totalPages} 
              onPageChange={setCurrentPage} 
              className="animate-in fade-in duration-300"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

