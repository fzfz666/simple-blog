"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { formatDate } from "@/app/lib/utils"
import { Footer } from "@/components/footer"
import { HeaderNav } from "@/components/header-nav"
import { Layout } from "@/components/layout"
import { getAllTags, getPostsByYear } from "@/app/actions/posts"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

// 使用 React.memo 优化标签按钮组件
const TagButton = React.memo(({ 
  tag, 
  isSelected, 
  onClick 
}: { 
  tag: string; 
  isSelected: boolean; 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
      isSelected
        ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
    }`}
  >
    {tag}
  </button>
))

TagButton.displayName = 'TagButton'

// 使用 React.memo 优化文章列表项组件
const PostItem = React.memo(({ 
  post 
}: { 
  post: { id: string; title: string; date: string } 
}) => (
  <li>
    <Link href={`/posts/${post.id}`} className="group flex justify-between items-baseline gap-4">
      <span className="text-sm group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 truncate max-w-[75%]">
        {post.title}
      </span>
      <time className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0 min-w-[4rem] text-right">
        {formatDate(post.date).split("年")[1]}
      </time>
    </Link>
  </li>
))

PostItem.displayName = 'PostItem'

// 使用 React.memo 优化年份文章列表组件
const YearPosts = React.memo(({ 
  year, 
  posts 
}: { 
  year: string; 
  posts: any[] 
}) => (
  <div className="mb-8">
    <h2 className="text-sm font-medium mb-4">{year}</h2>
    <ul className="space-y-3">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  </div>
))

YearPosts.displayName = 'YearPosts'

export default function ArchivePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>([])
  const [postsByYear, setPostsByYear] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)

  // 使用 useCallback 优化标签点击处理函数
  const handleTagClick = useCallback((tag: string | null) => {
    setSelectedTag(tag)
  }, [])

  // 使用 useMemo 优化年份排序
  const years = useMemo(() => 
    Object.keys(postsByYear)
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a)),
    [postsByYear]
  )

  // 优化数据获取
  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      setLoading(true)
      try {
        const [tags, posts] = await Promise.all([
          getAllTags(),
          getPostsByYear(selectedTag)
        ])
        if (mounted) {
          setAllTags(tags)
          setPostsByYear(posts)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [selectedTag])

  return (
    <Layout>
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
                  <div key={yearIndex} className="mb-8">
                    <Skeleton className="h-5 w-12 mb-4" />
                    <ul className="space-y-3">
                      {Array.from({ length: 5 }).map((_, postIndex) => (
                        <li key={postIndex}>
                          <div className="flex justify-between items-baseline gap-4">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </li>
                      ))}
                    </ul>
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
                    <TagButton
                      tag="全部"
                      isSelected={selectedTag === null}
                      onClick={() => handleTagClick(null)}
                    />
                    {allTags.map(({ tag }) => (
                      <TagButton
                        key={tag}
                        tag={tag}
                        isSelected={selectedTag === tag}
                        onClick={() => handleTagClick(tag)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {years.length > 0 ? (
                years.map((year) => (
                  <YearPosts
                    key={year}
                    year={year}
                    posts={postsByYear[year]}
                  />
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  暂无文章
                </p>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </Layout>
  )
}

