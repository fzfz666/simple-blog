"use client"

import { useState, useEffect } from "react"
import type { PostsData } from "@/types/post"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedPostsAction, getAllTags } from "@/app/actions/posts"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/app/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { List } from "lucide-react"
import { Footer } from "@/components/footer"
import { PaginationButtons } from "@/components/pagination-buttons"
import { HeaderNav } from "@/components/header-nav"
import { Layout } from "@/components/layout"
import { Tags } from "@/components/tag"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>([]);
  const layout = 'list';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [posts, tags] = await Promise.all([
        getPaginatedPostsAction(currentPage, 10, selectedTag),
        getAllTags()
      ]);
      setPostsData(posts as PostsData);
      setAllTags(tags);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, selectedTag]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">
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
          {loading ? (
            <>
              {/* 标签云骨架 */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                  <Skeleton className="h-6 w-18 rounded-full" />
                  <Skeleton className="h-6 w-10 rounded-full" />
                </div>
              </div>

              {/* 文章列表骨架 */}
              <div className="space-y-6">
                {Array.from({ length: 10 }).map((_, index) => (
                  <article key={index} className="border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* 标签云区域 */}
              {allTags.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        selectedTag === null
                          ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      全部
                    </button>
                    {allTags.map(({ tag }) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          selectedTag === tag
                            ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {postsData.posts.length > 0 ? (
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
            </>
          )}

          {/* 分页控制 */}
          {!loading && postsData.totalPages > 1 && (
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
    </Layout>
  )
}

