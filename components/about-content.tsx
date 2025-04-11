"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Twitter, Mail, Copy } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Header } from "@/components/header"

const use3DEffect = (ref: React.RefObject<HTMLDivElement | null>, intensity: number = 10) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / intensity
    const rotateY = (centerX - x) / intensity

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    }
  }

  return {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  }
}

export function AboutContent() {
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const { onMouseMove, onMouseLeave } = use3DEffect(imageRef, 8)

  useEffect(() => {
    // 减少加载延迟到 100ms
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
      <Header showBackButton={true} title="关于" />

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
              <div 
                ref={imageRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="w-32 h-32 md:w-48 md:h-48 relative rounded-xl overflow-hidden 
                  ring-2 ring-zinc-100/50 dark:ring-zinc-800/50
                  border border-zinc-200/50 dark:border-zinc-700/50
                  hover:border-zinc-300/50 dark:hover:border-zinc-600/50
                  transition-all duration-300 ease-out
                  group shrink-0"
              >
                <Image
                  src="/logo2.png"
                  alt="Jimmy's photo"
                  fill
                  className="object-cover transition-all duration-300 ease-out"
                  priority
                  sizes="(max-width: 768px) 128px, 192px"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent 
                  opacity-0 dark:opacity-100
                  transition-all duration-300 ease-out" />
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
                    className="flex items-center px-4 py-2 rounded-lg 
                      bg-zinc-100/50 dark:bg-zinc-800/50
                      hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50
                      border border-zinc-200/50 dark:border-zinc-700/50
                      hover:border-zinc-300/50 dark:hover:border-zinc-600/50
                      text-zinc-600 dark:text-zinc-400
                      hover:text-zinc-800 dark:hover:text-zinc-200
                      transition-colors"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                  <a
                    href="https://okjk.co/ITgDUG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg 
                      bg-zinc-100/50 dark:bg-zinc-800/50
                      hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50
                      border border-zinc-200/50 dark:border-zinc-700/50
                      hover:border-zinc-300/50 dark:hover:border-zinc-600/50
                      text-zinc-600 dark:text-zinc-400
                      hover:text-zinc-800 dark:hover:text-zinc-200
                      transition-colors"
                  >
                    <span className="h-5 w-5 mr-2 flex items-center justify-center font-medium">J</span>
                    即刻
                  </a>
                  <button
                    onClick={copyEmail}
                    className="flex items-center px-4 py-2 rounded-lg 
                      bg-zinc-100/50 dark:bg-zinc-800/50
                      hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50
                      border border-zinc-200/50 dark:border-zinc-700/50
                      hover:border-zinc-300/50 dark:hover:border-zinc-600/50
                      text-zinc-600 dark:text-zinc-400
                      hover:text-zinc-800 dark:hover:text-zinc-200
                      transition-colors group relative"
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
              <div className="bg-zinc-50/50 dark:bg-zinc-800/50 rounded-xl p-6 
                hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 
                border border-zinc-200/50 dark:border-zinc-700/50
                hover:border-zinc-300/50 dark:hover:border-zinc-600/50
                transition-colors">
                <h2 className="text-xl font-semibold mb-4">个人简介</h2>
                <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
                  <p>你好，我是 Jimmy，一名热爱技术和分享的开发者。</p>
                  <p>喜欢探索新技术，关注开发体验和工程化，同时也热衷于写作和分享。</p>
                </div>
              </div>

              <div className="bg-zinc-50/50 dark:bg-zinc-800/50 rounded-xl p-6 
                hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 
                border border-zinc-200/50 dark:border-zinc-700/50
                hover:border-zinc-300/50 dark:hover:border-zinc-600/50
                transition-colors">
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