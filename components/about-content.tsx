"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Twitter, Mail, Copy } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export function AboutContent() {
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // 减少加载延迟到 300ms
    const timer = setTimeout(() => {
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sxy1308075897@gmail.com")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <ThemeToggle />
        </div>
      </header>

      <main>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {loading ? (
            <>
              <Skeleton className="w-32 h-32 md:w-48 md:h-48 rounded-xl shrink-0" />
              <div className="space-y-4 flex-1 w-full">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-10 w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-xl overflow-hidden ring-2 ring-zinc-100 dark:ring-zinc-800 shrink-0">
                <Image
                  src="/logo2.png"
                  alt="Jimmy's photo"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 128px, 192px"
                  quality={75}
                />
              </div>
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <h1 className="text-3xl font-bold mb-2">关于</h1>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">O Captain! My Captain!</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <a
                    href="https://github.com/Lily-404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                  <a
                    href="https://okjk.co/ITgDUG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <span className="h-5 w-5 mr-2 flex items-center justify-center font-medium">J</span>
                    即刻
                  </a>
                  <button
                    onClick={copyEmail}
                    className="flex items-center px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group relative"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span className="text-sm">Email</span>
                    {copied && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded-md whitespace-nowrap">
                        已复制到剪贴板
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {loading ? (
            <>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <h2 className="text-xl font-semibold mb-4">个人简介</h2>
                <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
                  <p>你好，我是 Jimmy，一名热爱技术和分享的开发者。</p>
                  <p>喜欢探索新技术，关注开发体验和工程化，同时也热衷于写作和分享。</p>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <h2 className="text-xl font-semibold mb-4">关于本站</h2>
                <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
                  <p>这个博客使用 Next.js构建，主要记录我在技术学习和工作中的心得体会。</p>
                  <p>同时也会分享一些关于生活、阅读的想法。</p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
} 