"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Tags } from "@/components/tag"
import { getPostsByYearAction, getAllTagsAction } from "@/app/actions/posts"
import { formatDate } from "@/app/lib/utils"
import { delay } from "@/app/lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"

export function ArchiveContent() {
  const [postsByYear, setPostsByYear] = useState<Record<number, Array<{
    id: string
    title: string
    date: string
    tags?: string[]
  }>>>({})
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const startTime = Date.now()
      
      try {
        const [postsData, tagsData] = await Promise.all([
          getPostsByYearAction(selectedTag),
          getAllTagsAction()
        ])
        
        // 计算已经过去的时间
        const elapsedTime = Date.now() - startTime
        // 如果加载时间少于100ms，则等待剩余时间
        if (elapsedTime < 100) {
          await delay(100 - elapsedTime)
        }
        
        setPostsByYear(postsData)
        setAllTags(tagsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedTag])

  // 按年份降序排序
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

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
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, yearIndex) => (
                <div key={yearIndex} className="space-y-4">
                  <Skeleton className="h-6 w-16" />
                  {Array.from({ length: 5 }).map((_, postIndex) => (
                    <div key={postIndex} className="space-y-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  ))}
                </div>
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

            {/* 文章列表 */}
            <div className="space-y-8">
              {years.map((year) => (
                <div key={year} className="space-y-4">
                  <h2 className="text-xl font-medium">{year}</h2>
                  <div className="space-y-4">
                    {postsByYear[year].map((post) => (
                      <article key={post.id} className="border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
                        <Link href={`/posts/${post.id}`} className="group block">
                          <h3 className="text-base font-normal group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 relative inline-block">
                            {post.title}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-zinc-700 dark:bg-zinc-300 group-hover:w-full transition-all duration-500"></span>
                          </h3>
                          <time className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 block">
                            {formatDate(post.date)}
                          </time>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
} 