"use client"

import { useState, useEffect } from "react"
import type { PostsByYear } from "@/types/post"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPostsByYearAction, getAllTagsAction } from "@/app/actions/posts"
import { formatDate, delay } from "@/app/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { Tag } from "@/components/tag"
import { Header } from "@/components/header"

export function ArchiveContent() {
  const [postsByYear, setPostsByYear] = useState<PostsByYear>({})
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 只在组件挂载时获取标签列表
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTagsAction()
        setAllTags(tags)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }
    fetchTags()
  }, [])

  // 获取文章列表
  useEffect(() => {
    const fetchData = async () => {
      if (isTransitioning) return
      
      setLoading(true)
      const startTime = Date.now()
      
      try {
        const posts = await getPostsByYearAction(selectedTag)
        
        // 计算已经过去的时间
        const elapsedTime = Date.now() - startTime
        // 如果加载时间少于100ms，则等待剩余时间
        if (elapsedTime < 100) {
          await delay(100 - elapsedTime)
        }
        
        setPostsByYear(posts)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedTag, isTransitioning])

  // 处理标签点击
  const handleTagClick = async (tag: string | null) => {
    setIsTransitioning(true)
    setSelectedTag(tag)
    
    // 添加平滑过渡效果
    await new Promise(resolve => setTimeout(resolve, 300))
    setIsTransitioning(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Header showBackButton={true} title="归档" />

      <main>
        {/* 标签云区域 */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Tag
                tag="全部"
                onClick={() => handleTagClick(null)}
                interactive={true}
                className={selectedTag === null ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' : ''}
              />
              {allTags.map(({ tag }) => (
                <Tag
                  key={tag}
                  tag={tag}
                  onClick={() => handleTagClick(tag)}
                  interactive={true}
                  className={selectedTag === tag ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' : ''}
                />
              ))}
            </div>
          </div>
        )}

        {/* 文章列表 */}
        <div className={`space-y-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          {loading ? (
            <>
              {/* 标签云骨架 */}
              {/* <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                  <Skeleton className="h-6 w-18 rounded-full" />
                  <Skeleton className="h-6 w-10 rounded-full" />
                </div>
              </div> */}

              {/* 文章列表骨架 */}
              {Array.from({ length: 3 }).map((_, yearIndex) => (
                <div key={yearIndex} className="space-y-4">
                  <Skeleton className="h-6 w-16" />
                  {Array.from({ length: 5 }).map((_, postIndex) => (
                    <div key={postIndex} className="flex items-center justify-between">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              {Object.entries(postsByYear).length > 0 ? (
                Object.entries(postsByYear).map(([year, posts]) => (
                  <div key={year} className="space-y-4">
                    <h2 className="text-lg font-medium">{year}</h2>
                    <div className="space-y-2">
                      {posts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/posts/${post.id}`}
                          className="flex items-center justify-between group"
                        >
                          <span className="text-base font-normal group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200">
                            {post.title}
                          </span>
                          <time className="text-xs text-zinc-400 dark:text-zinc-500">
                            {formatDate(post.date)}
                          </time>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  暂无文章。
                </p>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
} 