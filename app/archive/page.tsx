"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { formatDate } from "@/app/lib/utils"
import { Footer } from "@/components/footer"
import { HeaderNav } from "@/components/header-nav"
import { Layout } from "@/components/layout"
import { getAllTags, getPostsByYear } from "@/app/actions/posts"

export default function ArchivePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>([])
  const [postsByYear, setPostsByYear] = useState<Record<string, any[]>>({})

  // 获取初始数据
  useEffect(() => {
    const fetchData = async () => {
      const [tags, posts] = await Promise.all([
        getAllTags(),
        getPostsByYear(selectedTag)
      ])
      setAllTags(tags)
      setPostsByYear(posts)
    }
    fetchData()
  }, [selectedTag])

  const years = Object.keys(postsByYear)
    .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

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

          {years.length > 0 ? (
            years.map((year) => (
              <div key={year} className="mb-8">
                <h2 className="text-sm font-medium mb-4">{year}</h2>
                <ul className="space-y-3">
                  {postsByYear[year].map((post) => (
                    <li key={post.id}>
                      <Link href={`/posts/${post.id}`} className="group flex justify-between items-baseline gap-4">
                        <span className="text-sm group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 truncate max-w-[75%]">
                          {post.title}
                        </span>
                        <time className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0 min-w-[4rem] text-right">
                          {formatDate(post.date).split("年")[1]}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              暂无文章
            </p>
          )}
        </main>

        <Footer />
      </div>
    </Layout>
  )
}

